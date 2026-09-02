// scripts/seed-reviews.mjs
//
// One-off data-seeding script: signs up a batch of distinct fake customer
// accounts against the live Urban Eye Apps Script API and submits one
// positive review per account, spread across every product in
// src/prodcut.js. Reviews land in the backend as "pending approval" —
// they will not show publicly until approved (by the store owner) in the
// Google Sheet / admin flow.
//
// Usage:
//   node scripts/seed-reviews.mjs                 # run for real
//   node scripts/seed-reviews.mjs --dry-run        # print what would happen, no network calls
//   node scripts/seed-reviews.mjs --start=10       # resume from product index 10
//   node scripts/seed-reviews.mjs --only=alex,felix  # limit to specific product ids
//
// Progress/results are appended to scripts/seed-reviews.log.jsonl so the run
// can be audited or resumed after a failure.

import { appendFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const API_URL =
  "https://script.google.com/macros/s/AKfycbz20WORJgVWxJlAtZ13zeKAuUGxyh0hn8GY7PxQWxBqpnFb3a2xuLtgAtonyS15qSU/exec";

const LOG_FILE = path.join(__dirname, "seed-reviews.log.jsonl");

// ─── CLI args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const startArg = args.find((a) => a.startsWith("--start="));
const START_INDEX = startArg ? parseInt(startArg.split("=")[1], 10) : 0;
const onlyArg = args.find((a) => a.startsWith("--only="));
const ONLY_IDS = onlyArg ? onlyArg.split("=")[1].split(",").map((s) => s.trim()) : null;
const MIN_REVIEWS = 5;
const MAX_REVIEWS = 10;
const DELAY_MS = 700; // polite pacing between API calls

// ─── Load products straight from the frontend source of truth ────────────
const { PRODUCTS_DATA } = await import(
  pathToFileURL(path.join(ROOT, "src", "prodcut.js")).href
);

let products = PRODUCTS_DATA.map((p) => ({ id: p.id, name: p.name }));
if (ONLY_IDS) products = products.filter((p) => ONLY_IDS.includes(p.id));
products = products.slice(START_INDEX);

// ─── Fake identity pool (unique per review) ───────────────────────────────
const FIRST_NAMES = [
  "Ahmed", "Muhammad", "Ali", "Hassan", "Hussain", "Omar", "Bilal", "Imran",
  "Zain", "Yusuf", "Ibrahim", "Usman", "Kabir", "Rayyan", "Faisal", "Tariq",
  "Adeel", "Asad", "Danish", "Farhan", "Hamza", "Jawad", "Kashif", "Nabeel",
  "Rizwan", "Saad", "Shahzad", "Waqas", "Zeeshan", "Junaid",
  "Ayesha", "Fatima", "Zainab", "Mariam", "Sana", "Hina", "Amna", "Nadia",
  "Sadia", "Rabia", "Saba", "Iqra", "Mahnoor", "Aleena", "Areeba", "Bushra",
  "Farah", "Hira", "Kiran", "Laiba", "Maryam", "Noor", "Rimsha", "Sadaf",
  "Sumaira", "Tahira", "Uzma", "Yusra", "Zara", "Khadija",
];
const LAST_NAMES = [
  "Khan", "Ahmed", "Ali", "Malik", "Hussain", "Sheikh", "Siddiqui", "Qureshi",
  "Farooq", "Chaudhry", "Raza", "Abbasi", "Baig", "Iqbal", "Shaikh", "Rashid",
  "Hashmi", "Zaidi", "Rizvi", "Butt", "Mirza", "Anwar", "Aziz", "Bukhari",
  "Chughtai", "Dar", "Gilani", "Hashemi", "Javed", "Kazmi",
];

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deterministic-ish unique name generator so two reviews on the same
// product never share a display name.
function makeNamePool(count) {
  const firsts = shuffled(FIRST_NAMES);
  const lasts = shuffled(LAST_NAMES);
  const pool = [];
  let fi = 0, li = 0;
  while (pool.length < count) {
    const first = firsts[fi % firsts.length];
    const last = lasts[li % lasts.length];
    pool.push(`${first} ${last}`);
    fi++;
    li++;
    if (fi % firsts.length === 0) li += 1; // vary pairing after a full cycle
  }
  return pool;
}

function slugifyEmail(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

function randomPhone() {
  // Indian-style 10-digit mobile number, random but plausible.
  const first = ["6", "7", "8", "9"][Math.floor(Math.random() * 4)];
  let rest = "";
  for (let i = 0; i < 9; i++) rest += Math.floor(Math.random() * 10);
  return first + rest;
}

function randomPassword() {
  return "Ux" + Math.random().toString(36).slice(2, 10) + "!9";
}

// ─── Review text bank (positive: 4-5 stars only) ──────────────────────────
const OPENERS = [
  "Absolutely love these!",
  "Really impressed with the quality.",
  "Exceeded my expectations.",
  "Great purchase, no regrets.",
  "These are exactly what I was looking for.",
  "Super happy with this one.",
  "Didn't expect them to be this good for the price.",
  "Been wearing these for a few weeks now and still love them.",
  "My second pair from Urban Eye and just as good as the first.",
  "Ordered on a whim and honestly glad I did.",
  "Quality feels premium right out of the box.",
  "Perfect fit and finish.",
];
const BODY_FIT = [
  "The fit is comfortable and doesn't pinch behind the ears even after a full day.",
  "Lightweight and barely notice I'm wearing them.",
  "The frame sits really well on my face, not too tight or loose.",
  "Fits true to size, exactly as described on the product page.",
  "Comfortable enough to wear all day at work without any pressure marks.",
  "The nose pads are well placed, no slipping at all.",
];
const BODY_QUALITY = [
  "Build quality feels sturdy, not flimsy like some other brands I've tried.",
  "The finish looks premium and the color is exactly as shown in the photos.",
  "Material quality is solid, doesn't feel cheap at all.",
  "The hinge feels durable and well made.",
  "Packaging was neat and the product looked well protected in transit.",
  "The lenses are clear with zero distortion.",
];
const BODY_SERVICE = [
  "Delivery was quick and the whole ordering process was smooth.",
  "Customer service was helpful when I had a sizing question before ordering.",
  "Arrived earlier than expected, well packed.",
  "Easy checkout and fast shipping, will order again.",
];
const CLOSERS = [
  "Would definitely recommend to anyone looking for a good pair.",
  "Worth every rupee.",
  "Already thinking about getting another color.",
  "Highly recommend Urban Eye for anyone on the fence.",
  "Five stars, will be back for more.",
  "Great value for the price point.",
  "Very satisfied with this purchase.",
  "Can't wait to order another pair.",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildReviewText(productName) {
  const opener = pick(OPENERS);
  const body = pick([...BODY_FIT, ...BODY_QUALITY, ...BODY_SERVICE]);
  const closer = pick(CLOSERS);
  return `${opener} ${body} ${closer}`.replace(/\s+/g, " ").trim();
}

function randomRating() {
  // Skew toward 5 stars, occasional 4 star for realism.
  return Math.random() < 0.75 ? 5 : 4;
}

function randomReviewCount() {
  return MIN_REVIEWS + Math.floor(Math.random() * (MAX_REVIEWS - MIN_REVIEWS + 1));
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function log(entry) {
  appendFileSync(LOG_FILE, JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n");
}

// ─── API helpers (mirrors src/services/service.js exactly) ───────────────
async function apiPost(action, body, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action, ...body, ...(token ? { token } : {}) }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Request failed");
  return json;
}

async function signupFakeUser(fullName, index) {
  const email = `${slugifyEmail(fullName)}.ue${index}.${Date.now().toString(36)}@gmail.com`;
  const phone = randomPhone();
  const password = randomPassword();
  const res = await apiPost("signup", { fullName, email, phone, password });
  return { token: res.data.token, email, phone, userId: res.data.user?.userId };
}

async function submitReviewAs(token, productId, productName, rating, review) {
  return await apiPost(
    "submitReview",
    { productId, rating, review, productName },
    token
  );
}

// ─── Main run ──────────────────────────────────────────────────────────────
async function main() {
  console.log(`Products to seed: ${products.length} (start index ${START_INDEX})`);
  console.log(`Dry run: ${DRY_RUN}`);

  let totalReviews = 0;
  let totalFailures = 0;

  for (let p = 0; p < products.length; p++) {
    const product = products[p];
    const count = randomReviewCount();
    const names = makeNamePool(count);

    console.log(`\n[${p + 1}/${products.length}] ${product.name} (${product.id}) — ${count} reviews`);

    for (let i = 0; i < count; i++) {
      const fullName = names[i];
      const rating = randomRating();
      const reviewText = buildReviewText(product.name);

      if (DRY_RUN) {
        console.log(`  [dry-run] ${fullName} -> ${rating}★ "${reviewText.slice(0, 60)}..."`);
        continue;
      }

      try {
        const user = await signupFakeUser(fullName, `${p}${i}`);
        await sleep(DELAY_MS);

        await submitReviewAs(user.token, product.id, product.name, rating, reviewText);
        totalReviews++;
        console.log(`  ✓ ${fullName} (${user.email}) -> ${rating}★`);
        log({
          status: "ok",
          productId: product.id,
          productName: product.name,
          fullName,
          email: user.email,
          rating,
          review: reviewText,
        });
      } catch (err) {
        totalFailures++;
        console.error(`  ✗ ${fullName} failed: ${err.message}`);
        log({
          status: "error",
          productId: product.id,
          productName: product.name,
          fullName,
          error: err.message,
        });
      }

      await sleep(DELAY_MS);
    }
  }

  console.log(`\nDone. Reviews submitted: ${totalReviews}, failures: ${totalFailures}`);
  if (!DRY_RUN) console.log(`Log written to ${LOG_FILE}`);
  console.log(`Reminder: all reviews are "pending approval" until approved in your admin/Sheet flow.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
