// Regenerates public/sitemap.xml from the live product & collection data so
// every /products/:id and /collections/:slug page gets its own sitemap entry
// (previously only the 4 static top-level pages were listed, meaning Google
// had no crawl path to any individual product or collection page).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import PRODUCTS_DATA from "../src/prodcut.js";
import { COLLECTIONS } from "../src/contants/store.js";

const SITE_ORIGIN = "https://www.urbaneye.com.pk";
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../public/sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/products", changefreq: "daily", priority: "0.9" },
  { loc: "/collections", changefreq: "weekly", priority: "0.8" },
  { loc: "/story", changefreq: "monthly", priority: "0.5" },
  { loc: "/stores", changefreq: "monthly", priority: "0.5" },
];

const collectionUrls = Object.keys(COLLECTIONS)
  .filter((slug) => slug !== "default")
  .map((slug) => ({ loc: `/collections/${slug}`, changefreq: "weekly", priority: "0.7" }));

const productUrls = PRODUCTS_DATA.map((p) => ({
  loc: `/products/${p.id}`,
  changefreq: "weekly",
  priority: "0.7",
}));

const urls = [...staticUrls, ...collectionUrls, ...productUrls];

const body = urls
  .map(
    (u) => `  <url>
    <loc>${SITE_ORIGIN}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(OUT_PATH, xml, "utf8");
console.log(`sitemap.xml written with ${urls.length} URLs (${productUrls.length} products, ${collectionUrls.length} collections)`);
