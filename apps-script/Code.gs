// ============================================================
// Code.gs  —  Urban Eye Backend
// Google Apps Script  |  Single-file REST API
//
// CORS FIX NOTES:
//   • The frontend sends POST with Content-Type: text/plain
//     (avoids preflight OPTIONS request that GAS can't respond to).
//   • Token is sent inside the JSON body as { action, token, ...fields }
//   • For GETs, token is passed as ?token=xxx URL param.
//   • No Products sheet — products live in the React frontend.
//   • Order line-items are stored in OrderItems sheet.
//
// EMAIL FEATURES (added):
//   1. Order confirmation  → customer + admin           (checkout)
//   2. Delivered email     → customer + "Leave a Review" (adminUpdateOrderStatus)
//   3. Review workflow     → pending + approved emails    (submitReview / adminUpdateReview)
//   4. Forgot Password OTP → 5-min, single-use, rate-limited, HTML (forgotPassword)
//   5. Wishlist email      → once per new wishlist add    (addToWishlist)
//   All email sends are wrapped in try/catch so a mail failure never
//   blocks the underlying business action.
// ============================================================

// ============================================================
// CONFIGURATION
// ============================================================

const SPREADSHEET_ID = "1IBXANoPpviwQ3KFtWRKqC5s1BkU96mE1vJ1bY_CdRyw"; // ← REPLACE WITH YOUR SPREADSHEET ID
const SECRET_KEY     = "0pT!cS#StUd!o@2026$xK9mPa3qR7vL";               // CHANGE IN PRODUCTION
const ADMIN_SECRET   = "URBAN_EYE_ADMIN_2026";                          // ← MUST MATCH service.js ADMIN_SECRET

const SHEETS = {
  USERS      : "Users",
  ORDERS     : "Orders",
  ORDER_ITEMS: "OrderItems",
  CART       : "Cart",
  WISHLIST   : "Wishlist",
  REVIEWS    : "Reviews",
  ADDRESSES  : "Addresses",
};

// ─── EMAIL / BRAND CONFIG ───────────────────────────────────
// ⚠️ SET SITE_URL to your deployed Netlify/Vercel domain (NO trailing slash).
//    Every email button + product/logo image URL is built from it.
//    Example: "https://urban-eye.netlify.app"
const SITE_URL      = "https://YOUR-URBAN-EYE-DOMAIN.netlify.app"; // ← CHANGE ME
const BRAND_NAME    = "Urban Eye";
const ADMIN_EMAIL   = "urbaneye.website@gmail.com"; // receives "New Order Received" alerts
const SUPPORT_EMAIL = "urbaneye.website@gmail.com"; // shown in email footers
const LOGO_URL      = SITE_URL + "/logo.jpeg";      // public/logo.jpeg on your site
const BRAND_NAVY    = "#0c2c41";
const BRAND_GOLD    = "#F5C800";
const BRAND_INK     = "#1f2d38";
// Optional — leave blank to hide. e.g. "https://instagram.com/urbaneye"
const SOCIAL_LINKS  = {
  instagram: "",
  facebook : "",
  tiktok   : "",
};

// ============================================================
// RESPONSE HELPERS
// ============================================================

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _ok(data)  { return _json({ success: true,  data });      }
function _err(msg)  { return _json({ success: false, error: msg }); }

// ============================================================
// ADMIN AUTH GUARD
// ============================================================

/**
 * Verify that the request is from the admin dashboard.
 * Called at the top of every admin* function.
 */
function _isAdmin(body, params) {
  const secret = (body && body.adminSecret) || (params && params.adminSecret) || "";
  return secret === ADMIN_SECRET;
}

// ============================================================
// SHEET HELPERS
// ============================================================

function _sheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

function _rows(sheetName) {
  const sh   = _sheet(sheetName);
  const data = sh.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
}

function _append(sheetName, obj) {
  const sh      = _sheet(sheetName);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const row     = headers.map(h => (obj[h] !== undefined ? obj[h] : ""));
  sh.appendRow(row);
}

function _update(sheetName, key, value, updates) {
  const sh      = _sheet(sheetName);
  const data    = sh.getDataRange().getValues();
  const headers = data[0];
  const keyIdx  = headers.indexOf(key);
  if (keyIdx === -1) return false;
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][keyIdx]) === String(value)) {
      Object.keys(updates).forEach(k => {
        const ci = headers.indexOf(k);
        if (ci !== -1) sh.getRange(r + 1, ci + 1).setValue(updates[k]);
      });
      return true;
    }
  }
  return false;
}

function _delete(sheetName, key, value) {
  const sh      = _sheet(sheetName);
  const data    = sh.getDataRange().getValues();
  const headers = data[0];
  const keyIdx  = headers.indexOf(key);
  if (keyIdx === -1) return false;
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][keyIdx]) === String(value)) {
      sh.deleteRow(r + 1);
      return true;
    }
  }
  return false;
}

function _deleteAllByUserId(sheetName, userId) {
  const sh      = _sheet(sheetName);
  const data    = sh.getDataRange().getValues();
  const headers = data[0];
  const uidIdx  = headers.indexOf("userId");
  if (uidIdx === -1) return false;
  for (let r = data.length - 1; r >= 1; r--) {
    if (String(data[r][uidIdx]) === String(userId)) {
      sh.deleteRow(r + 1);
    }
  }
  return true;
}

function _uuid() { return Utilities.getUuid(); }
function _now()  { return new Date().toISOString(); }

function _hash(str) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str);
  return bytes.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, "0")).join("");
}

function _signToken(payload) {
  const header = Utilities.base64Encode(JSON.stringify({ alg: "HS256" }));
  const body   = Utilities.base64Encode(JSON.stringify(payload));
  const sig    = Utilities.base64Encode(_hash(header + "." + body + SECRET_KEY));
  return header + "." + body + "." + sig;
}

function _verifyToken(token) {
  try {
    const [header, body, sig] = token.split(".");
    const expected = Utilities.base64Encode(_hash(header + "." + body + SECRET_KEY));
    if (sig !== expected) return null;
    return JSON.parse(Utilities.newBlob(Utilities.base64Decode(body)).getDataAsString());
  } catch (e) {
    return null;
  }
}

function _getUser(body, params) {
  const token = (body && body.token) || (params && params.token) || "";
  if (!token) return null;
  return _verifyToken(token);
}

function _safeParse(str) {
  try { return JSON.parse(str); } catch { return str; }
}

// ─── MONTH NAME HELPER ─────────────────────────────────────────────────────
function _monthName(monthIndex) {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][monthIndex];
}

// ============================================================
// ████████████████████████████████████████████████████████████
// EMAIL ENGINE  —  reusable, branded, responsive HTML
// One shell + small builders, used by every email below so no
// markup is duplicated.
// ████████████████████████████████████████████████████████████
// ============================================================

/** HTML-escape a value for safe interpolation into email markup. */
function _esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Format a number as "PKR 24,500" (deterministic — no Intl dependency). */
function _money(n) {
  const num = Math.round(Number(n || 0));
  return "PKR " + String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Format a date as "Mon, 14 July 2026". */
function _fmtDate(d) {
  const dt = (d instanceof Date) ? d : new Date(d);
  if (isNaN(dt.getTime())) return "";
  const days   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  return days[dt.getDay()] + ", " + dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear();
}

/** Estimated delivery window: placed + 5 to 7 days. */
function _estDelivery(placedAt) {
  const base = new Date(placedAt || Date.now());
  const from = new Date(base.getTime() + 5 * 86400000);
  const to   = new Date(base.getTime() + 7 * 86400000);
  return _fmtDate(from) + " – " + _fmtDate(to);
}

/** Format an address (object or JSON string) into multi-line HTML. */
function _fmtAddress(addr) {
  const a = (typeof addr === "string") ? _safeParse(addr) : addr;
  if (!a || typeof a !== "object") return _esc(String(addr || "—"));
  const cityLine = [a.city, a.postalCode].filter(Boolean).join(" ");
  const parts = [
    a.fullName,
    a.address,
    cityLine,
    a.country,
    a.phone ? ("Phone: " + a.phone) : "",
  ].filter(Boolean);
  return parts.map(_esc).join("<br>");
}

/** A branded CTA button. Pass secondary:true for the outline style. */
function _btn(label, url, opts) {
  const secondary = opts && opts.secondary;
  const bg     = secondary ? "#ffffff" : BRAND_NAVY;
  const color  = secondary ? BRAND_NAVY : "#ffffff";
  const border = secondary ? ("2px solid " + BRAND_NAVY) : ("2px solid " + BRAND_NAVY);
  return ''
    + '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0;"><tr>'
    + '<td align="center" style="border-radius:8px;background:' + bg + ';">'
    + '<a href="' + url + '" target="_blank" '
    +   'style="display:inline-block;padding:14px 34px;font-family:Arial,Helvetica,sans-serif;'
    +   'font-size:13px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;'
    +   'color:' + color + ';text-decoration:none;border-radius:8px;border:' + border + ';">'
    +   _esc(label) + '</a>'
    + '</td></tr></table>';
}

/** Content heading block. */
function _h(title, sub) {
  return ''
    + '<h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:22px;'
    +   'line-height:1.25;color:' + BRAND_NAVY + ';font-weight:bold;">' + _esc(title) + '</h1>'
    + (sub
        ? '<p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;'
          + 'line-height:1.65;color:#5a7284;">' + sub + '</p>'
        : '');
}

/** Small label/value info row used in "details" blocks. */
function _infoRow(label, valueHtml) {
  return ''
    + '<tr>'
    + '<td style="padding:7px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;'
    +   'color:#7a8b98;white-space:nowrap;vertical-align:top;width:42%;">' + _esc(label) + '</td>'
    + '<td style="padding:7px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;'
    +   'color:' + BRAND_INK + ';font-weight:bold;text-align:right;vertical-align:top;">' + valueHtml + '</td>'
    + '</tr>';
}

/** Ordered-items table (name / qty / unit price / line total). */
function _orderItemsTable(items) {
  const th = 'font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.06em;'
           + 'text-transform:uppercase;color:#7a8b98;padding:0 0 10px;border-bottom:2px solid #eef2f5;';
  const td = 'font-family:Arial,Helvetica,sans-serif;font-size:13px;color:' + BRAND_INK
           + ';padding:12px 0;border-bottom:1px solid #eef2f5;vertical-align:top;';

  const rows = (items || []).map(function (it) {
    const qty  = Number(it.quantity || 1);
    const unit = Number(it.unitPrice || it.price || 0);
    const line = Number(it.subtotal || unit * qty);
    return ''
      + '<tr>'
      + '<td style="' + td + '">' + _esc(it.name || "Product")
      +   (it.sku ? '<br><span style="font-size:11px;color:#9fb0bd;">SKU: ' + _esc(it.sku) + '</span>' : '')
      + '</td>'
      + '<td style="' + td + 'text-align:center;">' + qty + '</td>'
      + '<td style="' + td + 'text-align:right;white-space:nowrap;">' + _money(unit) + '</td>'
      + '<td style="' + td + 'text-align:right;white-space:nowrap;font-weight:bold;">' + _money(line) + '</td>'
      + '</tr>';
  }).join("");

  return ''
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">'
    + '<tr>'
    +   '<th align="left"   style="' + th + '">Item</th>'
    +   '<th align="center" style="' + th + '">Qty</th>'
    +   '<th align="right"  style="' + th + '">Price</th>'
    +   '<th align="right"  style="' + th + '">Total</th>'
    + '</tr>'
    + rows
    + '</table>';
}

/** Totals summary block (subtotal / shipping / grand total). */
function _totalsBlock(order) {
  const sub  = Number(order.subtotal || 0);
  const ship = Number(order.shipping || 0);
  const tot  = Number(order.total || sub + ship);
  const line = function (label, val, big) {
    const size = big ? "16px" : "13px";
    const wt   = big ? "bold" : "normal";
    const col  = big ? BRAND_NAVY : "#5a7284";
    return '<tr>'
      + '<td style="font-family:Arial,Helvetica,sans-serif;font-size:' + size + ';color:' + col + ';padding:5px 0;">' + _esc(label) + '</td>'
      + '<td style="font-family:Arial,Helvetica,sans-serif;font-size:' + size + ';font-weight:' + wt + ';color:' + BRAND_INK + ';text-align:right;padding:5px 0;">' + val + '</td>'
      + '</tr>';
  };
  return ''
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">'
    + line("Subtotal", _money(sub))
    + line("Shipping", ship > 0 ? _money(ship) : "FREE")
    + '<tr><td colspan="2" style="border-top:2px solid #eef2f5;height:6px;"></td></tr>'
    + line("Total", _money(tot), true)
    + '</table>';
}

/** Social links row (returns "" if none configured). */
function _socialHtml() {
  const links = [];
  const a = function (href, label) {
    return '<a href="' + href + '" target="_blank" style="color:' + BRAND_NAVY
      + ';text-decoration:none;font-weight:bold;font-family:Arial,Helvetica,sans-serif;margin:0 7px;">'
      + label + '</a>';
  };
  if (SOCIAL_LINKS.instagram) links.push(a(SOCIAL_LINKS.instagram, "Instagram"));
  if (SOCIAL_LINKS.facebook)  links.push(a(SOCIAL_LINKS.facebook,  "Facebook"));
  if (SOCIAL_LINKS.tiktok)    links.push(a(SOCIAL_LINKS.tiktok,    "TikTok"));
  return links.join('<span style="color:#c7d2da;">·</span>');
}

/** Shared footer (support email, website, socials, copyright). */
function _footerHtml() {
  const social = _socialHtml();
  return ''
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6ecf0;">'
    + '<tr><td align="center" style="padding-top:22px;font-family:Arial,Helvetica,sans-serif;color:#5a7284;font-size:12px;line-height:1.9;">'
    +   '<div style="font-weight:bold;color:' + BRAND_NAVY + ';letter-spacing:.1em;font-size:13px;">URBAN EYE</div>'
    +   '<div>Premium Eyewear · Crafted in Pakistan</div>'
    +   (social ? '<div style="margin:12px 0;">' + social + '</div>' : '<div style="height:8px;"></div>')
    +   '<div><a href="' + SITE_URL + '" target="_blank" style="color:' + BRAND_NAVY + ';text-decoration:none;font-weight:bold;">'
    +     _esc(SITE_URL.replace(/^https?:\/\//, "")) + '</a></div>'
    +   '<div>Need help? <a href="mailto:' + SUPPORT_EMAIL + '" style="color:' + BRAND_NAVY + ';">' + _esc(SUPPORT_EMAIL) + '</a></div>'
    + '</td></tr></table>';
}

/**
 * Wrap content in the full branded, responsive email shell.
 * @param {{preheader?:string, contentHtml:string}} o
 */
function _emailShell(o) {
  const preheader   = o.preheader || "";
  const contentHtml = o.contentHtml || "";
  return ''
    + '<!DOCTYPE html><html lang="en"><head>'
    + '<meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="x-apple-disable-message-reformatting">'
    + '</head>'
    + '<body style="margin:0;padding:0;background:#eef2f5;-webkit-text-size-adjust:100%;">'
    + '<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">' + _esc(preheader) + '</span>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f5;padding:24px 12px;">'
    + '<tr><td align="center">'
    + '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(12,44,65,0.10);">'
    // Header
    + '<tr><td style="background:' + BRAND_NAVY + ';padding:28px 32px;text-align:center;">'
    +   '<img src="' + LOGO_URL + '" alt="' + _esc(BRAND_NAME) + '" width="54" height="54" style="display:inline-block;border-radius:12px;background:#ffffff;">'
    +   '<div style="font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:.16em;margin-top:12px;">URBAN EYE</div>'
    +   '<div style="height:3px;width:44px;background:' + BRAND_GOLD + ';margin:12px auto 0;border-radius:2px;"></div>'
    + '</td></tr>'
    // Content
    + '<tr><td style="padding:36px 32px 12px;">' + contentHtml + '</td></tr>'
    // Footer
    + '<tr><td style="padding:22px 32px 32px;">' + _footerHtml() + '</td></tr>'
    + '</table>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;color:#9fb0bd;font-size:11px;margin-top:16px;">© '
    +   (new Date().getFullYear()) + ' ' + _esc(BRAND_NAME) + '. All rights reserved.</div>'
    + '</td></tr></table></body></html>';
}

/** Low-level send wrapper — never throws. */
function _sendMail(to, subject, contentHtml, preheader) {
  try {
    if (!to) return false;
    const html = _emailShell({ preheader: preheader || subject, contentHtml: contentHtml });
    MailApp.sendEmail({ to: to, subject: subject, htmlBody: html, name: BRAND_NAME });
    return true;
  } catch (e) {
    console.error("Email send failed [" + subject + "]:", e && e.message);
    return false;
  }
}

// ─── EMAIL BUILDERS (one per feature) ───────────────────────

/** Feature 1a — Order confirmation → CUSTOMER. */
function sendOrderEmail(order, items, user) {
  const name = (user && (user.fullName || user.name)) || order.customerName || "there";
  const content = ''
    + _h("Thank you for your order!", "Hi " + _esc(name) + ", we've received your order and are getting it ready. Here's your summary.")
    + '<div style="background:#f6f9fb;border:1px solid #e6ecf0;border-radius:10px;padding:18px 20px;margin-bottom:22px;">'
    +   '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    +     _infoRow("Order ID", _esc(order.orderId))
    +     _infoRow("Customer", _esc(name))
    +     _infoRow("Order Date", _esc(_fmtDate(order.createdAt)))
    +     _infoRow("Estimated Delivery", _esc(_estDelivery(order.createdAt)))
    +   '</table>'
    + '</div>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND_NAVY + ';margin-bottom:4px;">Order Summary</div>'
    + _orderItemsTable(items)
    + _totalsBlock(order)
    + '<div style="height:24px;"></div>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND_NAVY + ';margin-bottom:8px;">Shipping Address</div>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:' + BRAND_INK + ';background:#f6f9fb;border:1px solid #e6ecf0;border-radius:10px;padding:16px 18px;">' + _fmtAddress(order.address) + '</div>'
    + '<div style="height:28px;"></div>'
    + '<div align="center">' + _btn("View Order", SITE_URL + "/#/dashboard?tab=orders") + '</div>'
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9fb0bd;text-align:center;margin:18px 0 0;">A confirmation of delivery will follow once your order ships.</p>';
  return _sendMail(user && user.email, BRAND_NAME + " — Order Confirmed (" + order.orderId + ")", content,
    "Thanks for your order " + order.orderId + " — total " + _money(order.total));
}

/** Feature 1b — New order alert → ADMIN. */
function sendAdminOrderEmail(order, items, user) {
  const name  = (user && (user.fullName || user.name)) || order.customerName || "Customer";
  const email = (user && user.email) || "—";
  const phone = (order.address && order.address.phone) || (user && user.phone) || "—";
  const content = ''
    + _h("🛎️ New Order Received", "A new order has just been placed on " + _esc(BRAND_NAME) + ".")
    + '<div style="background:#f6f9fb;border:1px solid #e6ecf0;border-radius:10px;padding:18px 20px;margin-bottom:22px;">'
    +   '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    +     _infoRow("Order ID", _esc(order.orderId))
    +     _infoRow("Customer", _esc(name))
    +     _infoRow("Email", _esc(email))
    +     _infoRow("Phone", _esc(phone))
    +     _infoRow("Payment Method", _esc(order.paymentMethod || "COD"))
    +     _infoRow("Total Amount", _money(order.total))
    +   '</table>'
    + '</div>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND_NAVY + ';margin-bottom:4px;">Full Product List</div>'
    + _orderItemsTable(items)
    + _totalsBlock(order)
    + '<div style="height:24px;"></div>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND_NAVY + ';margin-bottom:8px;">Shipping Address</div>'
    + '<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:' + BRAND_INK + ';background:#f6f9fb;border:1px solid #e6ecf0;border-radius:10px;padding:16px 18px;">' + _fmtAddress(order.address) + '</div>'
    + '<div style="height:24px;"></div>'
    + '<div align="center">' + _btn("Open Admin Dashboard", SITE_URL + "/#/admin", { secondary: true }) + '</div>';
  return _sendMail(ADMIN_EMAIL, "🛎️ New Order " + order.orderId + " — " + _money(order.total), content,
    "New order " + order.orderId + " from " + name);
}

/** Feature 2 — Delivered → CUSTOMER, with "Leave a Review" per product. */
function sendDeliveryEmail(order, items, user) {
  const name = (user && (user.fullName || user.name)) || order.customerName || "there";
  const list = (items || []);
  let reviewBlocks = "";
  list.forEach(function (it, idx) {
    const url = SITE_URL + "/#/review/" + encodeURIComponent(it.productId || "") + "?order=" + encodeURIComponent(order.orderId);
    reviewBlocks += ''
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0;border:1px solid #e6ecf0;border-radius:10px;">'
      + '<tr><td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:' + BRAND_INK + ';font-weight:bold;">' + _esc(it.name || "Your product") + '</td>'
      + '<td align="right" style="padding:10px 16px;">'
      + '<a href="' + url + '" target="_blank" style="display:inline-block;padding:10px 20px;background:' + BRAND_NAVY + ';color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border-radius:7px;">Leave a Review</a>'
      + '</td></tr></table>';
  });

  const firstUrl = SITE_URL + "/#/review/" + encodeURIComponent((list[0] && list[0].productId) || "") + "?order=" + encodeURIComponent(order.orderId);

  const content = ''
    + _h("Your order has been delivered 🎉",
         "Hi " + _esc(name) + ", great news — your " + _esc(BRAND_NAME) + " order <b>" + _esc(order.orderId) + "</b> has been successfully delivered. We hope you love it!")
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:' + BRAND_INK + ';margin:0 0 20px;">Your experience matters to us. Would you take a moment to share how it went? Your review helps other customers and helps us keep improving.</p>'
    + (list.length === 1
        ? '<div align="center">' + _btn("Leave a Review", firstUrl) + '</div>'
        : '<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND_NAVY + ';margin-bottom:6px;">Review Your Items</div>' + reviewBlocks)
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9fb0bd;text-align:center;margin:22px 0 0;">Thank you for choosing ' + _esc(BRAND_NAME) + '.</p>';
  return _sendMail(user && user.email, "Your " + BRAND_NAME + " Order Has Been Delivered", content,
    "Order " + order.orderId + " delivered — share your experience");
}

/** Non-delivered status updates → CUSTOMER (processing / shipped / cancelled …). */
function sendStatusEmail(order, user, status) {
  const name = (user && (user.fullName || user.name)) || order.customerName || "there";
  const labels = {
    pending   : { title: "Order Received", msg: "We've received your order and it's awaiting processing." },
    processing: { title: "Order Being Prepared", msg: "Good news — we're now preparing your order for shipment." },
    shipped   : { title: "Order Shipped 🚚", msg: "Your order is on its way! It should arrive within a few days." },
    cancelled : { title: "Order Cancelled", msg: "Your order has been cancelled. If this was a mistake, please contact our support team." },
  };
  const info = labels[status] || { title: "Order Update", msg: "Your order status has been updated to " + status + "." };
  const content = ''
    + _h(info.title, "Hi " + _esc(name) + ", here's an update on your order.")
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:' + BRAND_INK + ';margin:0 0 20px;">' + _esc(info.msg) + '</p>'
    + '<div style="background:#f6f9fb;border:1px solid #e6ecf0;border-radius:10px;padding:16px 20px;margin-bottom:22px;">'
    +   '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    +     _infoRow("Order ID", _esc(order.orderId))
    +     _infoRow("Status", '<span style="color:' + BRAND_NAVY + ';text-transform:capitalize;">' + _esc(status) + '</span>')
    +   '</table>'
    + '</div>'
    + '<div align="center">' + _btn("View Order", SITE_URL + "/#/dashboard?tab=orders") + '</div>';
  return _sendMail(user && user.email, BRAND_NAME + " — Order " + order.orderId + " is now " + status, content,
    "Order " + order.orderId + " update: " + status);
}

/** Feature 5 — Product added to wishlist → CUSTOMER. */
function sendWishlistEmail(user, product) {
  const name = (user && (user.fullName || user.name)) || "there";
  const url  = product.url || (SITE_URL + "/#/products/" + encodeURIComponent(product.productId || ""));
  const imgHtml = product.image
    ? '<img src="' + product.image + '" alt="' + _esc(product.name) + '" width="150" style="display:block;width:150px;max-width:150px;border-radius:10px;border:1px solid #e6ecf0;">'
    : '<div style="width:150px;height:110px;border-radius:10px;background:#f0f4f7;text-align:center;line-height:110px;font-size:34px;">👓</div>';
  const content = ''
    + _h("Saved to your wishlist ❤️", "Hi " + _esc(name) + ", you just added a new favourite. Here it is so you don't lose track of it.")
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6ecf0;border-radius:12px;overflow:hidden;">'
    + '<tr>'
    +   '<td width="170" valign="top" style="padding:18px;">' + imgHtml + '</td>'
    +   '<td valign="top" style="padding:18px 18px 18px 0;font-family:Arial,Helvetica,sans-serif;">'
    +     '<div style="font-size:16px;font-weight:bold;color:' + BRAND_NAVY + ';margin-bottom:6px;">' + _esc(product.name || "Your product") + '</div>'
    +     (product.price ? '<div style="font-size:15px;font-weight:bold;color:' + BRAND_INK + ';margin-bottom:8px;">' + _money(product.price) + '</div>' : '')
    +     (product.description ? '<div style="font-size:13px;line-height:1.6;color:#5a7284;margin-bottom:6px;">' + _esc(product.description) + '</div>' : '')
    +     '<div style="font-size:11px;color:#9fb0bd;">Added on ' + _esc(_fmtDate(new Date())) + '</div>'
    +   '</td>'
    + '</tr>'
    + '</table>'
    + '<div style="height:24px;"></div>'
    + '<div align="center">' + _btn("View Product", url) + '</div>';
  return _sendMail(user && user.email, "Product Added to Your Wishlist", content,
    _esc(product.name || "A product") + " was added to your wishlist");
}

/** Feature 3a — Review submitted (pending moderation) → CUSTOMER. */
function sendReviewPendingEmail(user, productName) {
  const name = (user && (user.fullName || user.name)) || "there";
  const content = ''
    + _h("Thanks for your review!", "Hi " + _esc(name) + ", thank you for taking the time to review " + (productName ? "<b>" + _esc(productName) + "</b>" : "your purchase") + ".")
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:' + BRAND_INK + ';margin:0 0 16px;">Your review is currently <b>under moderation</b>. Our team reviews every submission to keep feedback genuine and helpful.</p>'
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:' + BRAND_INK + ';margin:0 0 20px;">You\'ll receive another email as soon as it\'s approved and live on the site.</p>'
    + '<div align="center">' + _btn("Browse More Frames", SITE_URL + "/#/products", { secondary: true }) + '</div>';
  return _sendMail(user && user.email, "Thank You for Your Review", content,
    "We've received your review — it's under moderation");
}

/** Feature 3b — Review approved → CUSTOMER, with "View Product". */
function sendReviewApprovedEmail(user, review) {
  const name = (user && (user.fullName || user.name)) || "there";
  const productUrl = SITE_URL + "/#/products/" + encodeURIComponent(review.productId || "");
  const stars = Number(review.rating) || 0;
  const starHtml = '<span style="color:' + BRAND_GOLD + ';font-size:18px;letter-spacing:2px;">'
    + "★".repeat(stars) + '<span style="color:#d8dee3;">' + "★".repeat(Math.max(0, 5 - stars)) + '</span></span>';
  const content = ''
    + _h("Your review is now live! ✅", "Hi " + _esc(name) + ", thank you — your review of " + (review.productName ? "<b>" + _esc(review.productName) + "</b>" : "your purchase") + " has been approved and is now published.")
    + '<div style="background:#f6f9fb;border:1px solid #e6ecf0;border-radius:10px;padding:18px 20px;margin-bottom:22px;text-align:center;">'
    +   starHtml
    +   (review.review ? '<p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#5a7284;margin:12px 0 0;font-style:italic;">“' + _esc(review.review) + '”</p>' : '')
    + '</div>'
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:' + BRAND_INK + ';margin:0 0 20px;">Thank you for helping other customers shop with confidence.</p>'
    + '<div align="center">' + _btn("View Product", productUrl) + '</div>';
  return _sendMail(user && user.email, "Your Review Has Been Approved", content,
    "Your review is now live on " + BRAND_NAME);
}

/** Feature 4 — Password reset OTP → CUSTOMER. */
function sendOTPEmail(user, otp) {
  const name = (user && (user.fullName || user.name)) || "there";
  const digits = String(otp).split("").map(function (d) {
    return '<span style="display:inline-block;min-width:40px;padding:12px 0;margin:0 4px;background:#ffffff;border:2px solid ' + BRAND_NAVY + ';border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;color:' + BRAND_NAVY + ';text-align:center;">' + _esc(d) + '</span>';
  }).join("");
  const content = ''
    + _h("Password Reset Code", "Hi " + _esc(name) + ", use the one-time code below to reset your " + _esc(BRAND_NAME) + " password.")
    + '<div style="text-align:center;margin:10px 0 22px;">' + digits + '</div>'
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:' + BRAND_INK + ';text-align:center;margin:0 0 8px;">This code expires in <b>5 minutes</b> and can be used only once.</p>'
    + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9fb0bd;text-align:center;margin:18px 0 0;">Didn\'t request a password reset? You can safely ignore this email — your password won\'t change.</p>';
  return _sendMail(user && user.email, "Password Reset OTP", content,
    "Your " + BRAND_NAME + " password reset code");
}

// ============================================================
// AUTH FUNCTIONS
// ============================================================

function signup(body) {
  const { fullName, email, phone, password } = body;
  if (!fullName || !email || !password)
    return _err("fullName, email and password are required.");

  const users = _rows(SHEETS.USERS);
  if (users.find(u => u.email === email))
    return _err("Email already registered.");

  const userId       = _uuid();
  const passwordHash = _hash(password);
  const createdAt    = _now();

  _append(SHEETS.USERS, {
    userId, fullName, email,
    phone: phone || "", passwordHash,
    role: "customer", createdAt,
    otpCode: "", otpExpiry: "", status: "active",
  });

  const token = _signToken({ userId, email, role: "customer" });
  return _ok({ token, user: { userId, fullName, email, phone: phone || "", role: "customer" } });
}

function login(body) {
  const { email, password } = body;
  if (!email || !password) return _err("Email and password required.");

  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.email === email);
  if (!user) return _err("No account found with that email.");
  if (user.passwordHash !== _hash(password)) return _err("Incorrect password.");
  if (user.status === "suspended") return _err("Your account has been suspended. Contact support.");

  const token = _signToken({ userId: user.userId, email: user.email, role: user.role });
  return _ok({
    token,
    user: { userId: user.userId, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role },
  });
}

/**
 * Feature 4 — Forgot Password OTP.
 *   • 6-digit OTP
 *   • expires in 5 minutes
 *   • single-use (cleared on successful reset)
 *   • resend rate-limit: min 60s between requests (derived from otpExpiry,
 *     so no schema change needed)
 *   • professional HTML email
 */
function forgotPassword(body) {
  const { email } = body;
  if (!email) return _err("Email required.");

  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.email === email);
  if (!user) return _err("No account with that email.");

  // Rate limit: an unexpired OTP issued < 60s ago blocks resend.
  if (user.otpExpiry) {
    const expiryTime = new Date(user.otpExpiry).getTime();
    if (!isNaN(expiryTime) && expiryTime > Date.now()) {
      const issuedAt  = expiryTime - 5 * 60 * 1000;
      const secsSince = (Date.now() - issuedAt) / 1000;
      if (secsSince < 60) {
        return _err("Please wait " + Math.ceil(60 - secsSince) + "s before requesting another OTP.");
      }
    }
  }

  const otp    = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  _update(SHEETS.USERS, "email", email, { otpCode: otp, otpExpiry: expiry });

  sendOTPEmail(user, otp);

  return _ok({ message: "OTP sent to " + email });
}

function verifyOTP(body) {
  const { email, otp } = body;
  if (!email || !otp) return _err("Email and OTP required.");

  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.email === email);
  if (!user) return _err("User not found.");
  if (!user.otpCode) return _err("No active OTP. Please request a new code.");
  if (String(user.otpCode) !== String(otp)) return _err("Invalid OTP.");
  if (new Date(user.otpExpiry) < new Date()) return _err("OTP has expired.");

  return _ok({ verified: true });
}

function resetPassword(body) {
  const { email, otp, newPassword } = body;
  if (!email || !otp || !newPassword) return _err("email, otp and newPassword required.");

  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.email === email);
  if (!user) return _err("User not found.");
  if (!user.otpCode) return _err("No active OTP. Please request a new code.");
  if (String(user.otpCode) !== String(otp)) return _err("Invalid OTP.");
  if (new Date(user.otpExpiry) < new Date()) return _err("OTP has expired.");

  // Clear OTP → enforces single-use.
  _update(SHEETS.USERS, "email", email, {
    passwordHash: _hash(newPassword),
    otpCode     : "",
    otpExpiry   : "",
  });

  return _ok({ message: "Password updated successfully." });
}

function updateProfile(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { fullName, phone } = body;
  _update(SHEETS.USERS, "userId", payload.userId, { fullName, phone });
  return _ok({ message: "Profile updated." });
}

// ============================================================
// CART FUNCTIONS
// ============================================================

function getCart(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");
  const items = _rows(SHEETS.CART).filter(c => c.userId === payload.userId);
  return _ok(items);
}

function addToCart(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { productId, quantity = 1 } = body;
  if (!productId) return _err("productId required.");

  const cartItems = _rows(SHEETS.CART);
  const existing  = cartItems.find(
    c => c.userId === payload.userId && String(c.productId) === String(productId)
  );

  if (existing) {
    _update(SHEETS.CART, "cartId", existing.cartId, {
      quantity: Number(existing.quantity) + Number(quantity),
    });
  } else {
    _append(SHEETS.CART, {
      cartId: _uuid(), userId: payload.userId, productId, quantity, createdAt: _now(),
    });
  }
  return _ok({ message: "Added to cart." });
}

function updateCart(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { cartId, quantity } = body;
  if (!cartId || quantity === undefined) return _err("cartId and quantity required.");
  if (Number(quantity) < 1) return removeFromCart(body, params);

  _update(SHEETS.CART, "cartId", cartId, { quantity });
  return _ok({ message: "Cart updated." });
}

function removeFromCart(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { cartId } = body;
  if (!cartId) return _err("cartId required.");
  _delete(SHEETS.CART, "cartId", cartId);
  return _ok({ message: "Removed from cart." });
}

function clearCart(userId) {
  const sh      = _sheet(SHEETS.CART);
  const data    = sh.getDataRange().getValues();
  const headers = data[0];
  const uidIdx  = headers.indexOf("userId");
  if (uidIdx === -1) return;
  for (let r = data.length - 1; r >= 1; r--) {
    if (String(data[r][uidIdx]) === String(userId)) {
      sh.deleteRow(r + 1);
    }
  }
}

// ============================================================
// WISHLIST FUNCTIONS
// ============================================================

function getWishlist(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");
  const items = _rows(SHEETS.WISHLIST).filter(w => w.userId === payload.userId);
  return _ok(items);
}

/**
 * Add to wishlist. Sends a "Product Added to Your Wishlist" email ONLY when a
 * brand-new row is created (existing item → no email), so no duplicates.
 * Optional product detail fields (productName/productImage/productPrice/
 * productDescription/productUrl) are sent by the frontend purely to enrich the
 * email; they are not persisted.
 */
function addToWishlist(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { productId } = body;
  if (!productId) return _err("productId required.");

  const existing = _rows(SHEETS.WISHLIST).find(
    w => w.userId === payload.userId && String(w.productId) === String(productId)
  );
  if (existing) return _ok({ message: "Already in wishlist." });

  _append(SHEETS.WISHLIST, {
    wishlistId: _uuid(), userId: payload.userId, productId, createdAt: _now(),
  });

  // Send wishlist email (once, only on new addition).
  try {
    const user = _rows(SHEETS.USERS).find(u => u.userId === payload.userId);
    if (user && user.email) {
      sendWishlistEmail(user, {
        productId   : productId,
        name        : body.productName || "",
        image       : body.productImage || "",
        price       : body.productPrice || "",
        description : body.productDescription || "",
        url         : body.productUrl || "",
      });
    }
  } catch (e) {
    console.error("Wishlist email failed:", e && e.message);
  }

  return _ok({ message: "Added to wishlist." });
}

function removeFromWishlist(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { wishlistId } = body;
  if (!wishlistId) return _err("wishlistId required.");
  _delete(SHEETS.WISHLIST, "wishlistId", wishlistId);
  return _ok({ message: "Removed from wishlist." });
}

// ============================================================
// REVIEW FUNCTIONS
// ============================================================

/**
 * Get all APPROVED reviews for a specific product (public — no auth needed).
 */
function getReviews(params) {
  const { productId } = params;
  if (!productId) return _err("productId required.");
  const reviews = _rows(SHEETS.REVIEWS).filter(
    r => String(r.productId) === String(productId) && String(r.approved) === "true"
  );
  return _ok(reviews);
}

/**
 * Get ALL reviews written by the logged-in user, regardless of approval
 * status. Used by the dashboard "Reviews" tab so the user can see their
 * own pending/published reviews.
 */
function getUserReviews(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");
  const reviews = _rows(SHEETS.REVIEWS).filter(r => r.userId === payload.userId);
  return _ok(reviews);
}

/**
 * Get aggregate review stats (average rating + star breakdown) for a
 * product. Only counts approved reviews.
 */
function getProductReviewStats(params) {
  const { productId } = params;
  if (!productId) return _err("productId required.");

  const reviews = _rows(SHEETS.REVIEWS).filter(
    r => String(r.productId) === String(productId) && String(r.approved) === "true"
  );

  const total = reviews.length;
  const avg = total > 0
    ? reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / total
    : 0;

  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Number(r.rating) === star).length,
  }));

  return _ok({ avg: Math.round(avg * 10) / 10, total, breakdown });
}

/**
 * Feature 3 (Step 1) — Submit a review. Saved as PENDING (approved:"false")
 * and NOT published. Immediately sends the "Thank You for Your Review" email.
 */
function submitReview(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { productId, productName, rating, review } = body;
  if (!productId || !rating) return _err("productId and rating required.");

  const existing = _rows(SHEETS.REVIEWS).find(
    r => r.userId === payload.userId && String(r.productId) === String(productId)
  );
  if (existing) return _err("You have already reviewed this product.");

  // Get customer name from Users sheet
  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.userId === payload.userId);
  const customerName = user ? user.fullName : "Unknown";

  _append(SHEETS.REVIEWS, {
    reviewId    : _uuid(),
    userId      : payload.userId,
    customerName,
    productId,
    productName : productName || "",
    rating      : Number(rating),
    review      : review || "",
    approved    : "false",
    createdAt   : _now(),
  });

  // Email: review received / under moderation.
  try {
    if (user && user.email) sendReviewPendingEmail(user, productName || "");
  } catch (e) {
    console.error("Review pending email failed:", e && e.message);
  }

  return _ok({ message: "Review submitted and pending approval." });
}

/**
 * Update an existing review (rating/text). Re-submits it for approval
 * by resetting approved to "false" so admins re-review edited content.
 */
function updateReview(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { reviewId, rating, review } = body;
  if (!reviewId) return _err("reviewId required.");

  const existing = _rows(SHEETS.REVIEWS).find(
    r => r.reviewId === reviewId && r.userId === payload.userId
  );
  if (!existing) return _err("Review not found.");

  const updates = { approved: "false" };
  if (rating !== undefined) updates.rating = Number(rating);
  if (review !== undefined) updates.review = review;

  _update(SHEETS.REVIEWS, "reviewId", reviewId, updates);
  return _ok({ message: "Review updated and pending re-approval." });
}

/**
 * Get all products the user has purchased (from OrderItems).
 * Deduplicated by productId.
 */
function getPurchasedProducts(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const items = _rows(SHEETS.ORDER_ITEMS).filter(i => i.userId === payload.userId);

  const seen = new Set();
  const result = [];
  items.forEach(i => {
    const key = String(i.productId || "");
    if (key && !seen.has(key)) {
      seen.add(key);
      result.push(i);
    }
  });

  return _ok(result);
}

// ============================================================
// ORDER FUNCTIONS
// ============================================================

/**
 * Feature 1 — Place an order. After persisting, sends the order confirmation
 * email to the CUSTOMER and a "New Order Received" alert to the ADMIN.
 */
function checkout(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { products, subtotal, shipping, total, address, paymentMethod } = body;
  if (!products || !total || !address) return _err("products, total and address required.");
  if (!Array.isArray(products) || products.length === 0)
    return _err("products must be a non-empty array.");

  const orderId  = "OS-" + Date.now();
  const placedAt = _now();

  // Get customer name from Users sheet
  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.userId === payload.userId);
  const customerName = user ? user.fullName : "Unknown";

  // address may arrive as an object or a JSON string — normalise for the email.
  const addressObj = (typeof address === "string") ? _safeParse(address) : address;

  _append(SHEETS.ORDERS, {
    orderId,
    userId       : payload.userId,
    customerName,
    itemCount    : products.length,
    subtotal     : subtotal || 0,
    shipping     : shipping || 0,
    total,
    status       : "pending",
    address      : JSON.stringify(addressObj),
    paymentMethod: paymentMethod || "COD",
    createdAt    : placedAt,
  });

  products.forEach(item => {
    _append(SHEETS.ORDER_ITEMS, {
      orderItemId: _uuid(),
      orderId,
      userId     : payload.userId,
      productId  : item.productId  || "",
      name       : item.name       || "",
      sku        : item.sku        || "",
      unitPrice  : item.unitPrice  || 0,
      quantity   : item.quantity   || 1,
      subtotal   : item.subtotal   || 0,
      createdAt  : placedAt,
    });
  });

  clearCart(payload.userId);

  // Feature 1 — order confirmation emails (never block checkout on failure).
  try {
    const orderForEmail = {
      orderId,
      customerName,
      subtotal     : subtotal || 0,
      shipping     : shipping || 0,
      total,
      paymentMethod: paymentMethod || "COD",
      address      : addressObj,
      createdAt    : placedAt,
    };
    if (user && user.email) sendOrderEmail(orderForEmail, products, user);
    sendAdminOrderEmail(orderForEmail, products, user);
  } catch (e) {
    console.error("Order confirmation emails failed:", e && e.message);
  }

  return _ok({ orderId, message: "Order placed successfully." });
}

function getOrders(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const orders = _rows(SHEETS.ORDERS)
    .filter(o => o.userId === payload.userId)
    .map(o => ({ ...o, address: _safeParse(o.address) }));

  const allOrderItems = _rows(SHEETS.ORDER_ITEMS)
    .filter(i => i.userId === payload.userId);

  const ordersWithItems = orders.map(order => {
    const orderItems = allOrderItems.filter(item => item.orderId === order.orderId);
    return { ...order, products: orderItems, itemCount: orderItems.length };
  });

  return _ok(ordersWithItems);
}

function getOrderItems(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const orderId = (body && body.orderId) || (params && params.orderId);
  if (!orderId) return _err("orderId required.");

  const order = _rows(SHEETS.ORDERS).find(
    o => o.orderId === orderId && o.userId === payload.userId
  );
  if (!order) return _err("Order not found.");

  const items = _rows(SHEETS.ORDER_ITEMS).filter(i => i.orderId === orderId);
  return _ok(items);
}

// ============================================================
// ADDRESS FUNCTIONS
// ============================================================

function getAddresses(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");
  const addresses = _rows(SHEETS.ADDRESSES).filter(a => a.userId === payload.userId);
  return _ok(addresses);
}

function addAddress(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { fullName, phone, address, city, country, postalCode, isDefault } = body;
  if (!fullName || !address || !city) return _err("fullName, address and city required.");

  const addressId = _uuid();

  if (isDefault === true || isDefault === "true") {
    const allAddresses = _rows(SHEETS.ADDRESSES).filter(a => a.userId === payload.userId);
    allAddresses.forEach(a => {
      _update(SHEETS.ADDRESSES, "addressId", a.addressId, { isDefault: "false" });
    });
  }

  _append(SHEETS.ADDRESSES, {
    addressId, userId: payload.userId,
    fullName, phone: phone || "", address, city,
    country: country || "Pakistan", postalCode: postalCode || "",
    isDefault: isDefault ? "true" : "false",
  });

  return _ok({ addressId, message: "Address added." });
}

function updateAddress(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { addressId, fullName, phone, address, city, country, postalCode, isDefault } = body;
  if (!addressId) return _err("addressId required.");

  if (isDefault === true || isDefault === "true") {
    const allAddresses = _rows(SHEETS.ADDRESSES).filter(a => a.userId === payload.userId);
    allAddresses.forEach(a => {
      if (a.addressId !== addressId) {
        _update(SHEETS.ADDRESSES, "addressId", a.addressId, { isDefault: "false" });
      }
    });
  }

  _update(SHEETS.ADDRESSES, "addressId", addressId, {
    fullName, phone, address, city, country, postalCode,
    isDefault: isDefault ? "true" : "false",
  });

  return _ok({ message: "Address updated." });
}

function deleteAddress(body, params) {
  const payload = _getUser(body, params);
  if (!payload) return _err("Unauthorised.");

  const { addressId } = body;
  if (!addressId) return _err("addressId required.");
  _delete(SHEETS.ADDRESSES, "addressId", addressId);
  return _ok({ message: "Address deleted." });
}

// ============================================================
// ████████████████████████████████████████████████████████████
// ADMIN FUNCTIONS  —  Dashboard API
// All functions below require adminSecret in request body/params
// ████████████████████████████████████████████████████████████
// ============================================================

// ─── ADMIN: DASHBOARD STATS ───────────────────────────────────────────────────

function adminGetStats(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orders    = _rows(SHEETS.ORDERS);
  const users     = _rows(SHEETS.USERS).filter(u => u.role !== "admin");
  const reviews   = _rows(SHEETS.REVIEWS);
  const wishlist  = _rows(SHEETS.WISHLIST);

  const totalRevenue  = orders
    .filter(o => o.status !== "cancelled")
    .reduce((s, o) => s + Number(o.total || 0), 0);

  const completedOrders = orders.filter(o => o.status === "delivered").length;
  const pendingOrders   = orders.filter(o => o.status === "pending").length;

  // Monthly revenue (current month)
  const now           = new Date();
  const thisMonth     = now.getMonth();
  const thisYear      = now.getFullYear();
  const monthlyRevenue = orders
    .filter(o => {
      const d = new Date(o.createdAt);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear && o.status !== "cancelled";
    })
    .reduce((s, o) => s + Number(o.total || 0), 0);

  // New customers this month
  const newCustomers = users.filter(u => {
    const d = new Date(u.createdAt);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  // Average rating
  const approvedReviews = reviews.filter(r => String(r.approved) === "true");
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((s, r) => s + Number(r.rating), 0) / approvedReviews.length).toFixed(1)
    : 0;

  return _ok({
    totalRevenue,
    totalOrders       : orders.length,
    totalCustomers    : users.length,
    pendingOrders,
    completedOrders,
    monthlyRevenue,
    totalWishlistItems: wishlist.length,
    totalReviews      : reviews.length,
    avgRating         : Number(avgRating),
    newCustomersThisMonth: newCustomers,
  });
}

// ─── ADMIN: CUSTOMERS ─────────────────────────────────────────────────────────

function adminGetCustomers(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const users  = _rows(SHEETS.USERS).filter(u => u.role !== "admin");
  const orders = _rows(SHEETS.ORDERS);

  const customers = users.map(u => {
    const userOrders = orders.filter(o => o.userId === u.userId);
    const totalSpent = userOrders
      .filter(o => o.status !== "cancelled")
      .reduce((s, o) => s + Number(o.total || 0), 0);

    return {
      userId    : u.userId,
      fullName  : u.fullName,
      email     : u.email,
      phone     : u.phone,
      joined    : u.createdAt,
      orders    : userOrders.length,
      spent     : totalSpent,
      status    : u.status || "active",
    };
  });

  return _ok(customers);
}

function adminGetCustomerDetail(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const userId = (body && body.userId) || (params && params.userId);
  if (!userId) return _err("userId required.");

  const users = _rows(SHEETS.USERS);
  const user  = users.find(u => u.userId === userId);
  if (!user) return _err("Customer not found.");

  const orders = _rows(SHEETS.ORDERS)
    .filter(o => o.userId === userId)
    .map(o => ({ ...o, address: _safeParse(o.address) }));

  const totalSpent = orders
    .filter(o => o.status !== "cancelled")
    .reduce((s, o) => s + Number(o.total || 0), 0);

  return _ok({
    userId    : user.userId,
    fullName  : user.fullName,
    email     : user.email,
    phone     : user.phone,
    joined    : user.createdAt,
    status    : user.status || "active",
    orders,
    totalOrders: orders.length,
    totalSpent,
  });
}

function adminUpdateCustomerStatus(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const { userId, status } = body;
  if (!userId || !status) return _err("userId and status required.");
  if (!["active", "suspended"].includes(status)) return _err("status must be 'active' or 'suspended'.");

  _update(SHEETS.USERS, "userId", userId, { status });
  return _ok({ message: `Customer ${status === "suspended" ? "suspended" : "reactivated"} successfully.` });
}

function adminDeleteCustomer(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const { userId } = body;
  if (!userId) return _err("userId required.");

  _deleteAllByUserId(SHEETS.CART, userId);
  _deleteAllByUserId(SHEETS.WISHLIST, userId);
  _deleteAllByUserId(SHEETS.ADDRESSES, userId);
  _deleteAllByUserId(SHEETS.REVIEWS, userId);
  _deleteAllByUserId(SHEETS.ORDER_ITEMS, userId);
  _deleteAllByUserId(SHEETS.ORDERS, userId);
  _delete(SHEETS.USERS, "userId", userId);

  return _ok({ message: "Customer and all related data deleted." });
}

// ─── ADMIN: ORDERS ────────────────────────────────────────────────────────────

function adminGetAllOrders(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orders    = _rows(SHEETS.ORDERS);
  const orderItems = _rows(SHEETS.ORDER_ITEMS);

  const result = orders
    .map(o => {
      const items = orderItems.filter(i => i.orderId === o.orderId);
      return {
        ...o,
        address  : _safeParse(o.address),
        products : items,
        itemCount: items.length,
      };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return _ok(result);
}

function adminGetOrderDetail(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orderId = (body && body.orderId) || (params && params.orderId);
  if (!orderId) return _err("orderId required.");

  const order = _rows(SHEETS.ORDERS).find(o => o.orderId === orderId);
  if (!order) return _err("Order not found.");

  const items = _rows(SHEETS.ORDER_ITEMS).filter(i => i.orderId === orderId);

  return _ok({
    ...order,
    address  : _safeParse(order.address),
    products : items,
    itemCount: items.length,
  });
}

/**
 * Feature 2 — Update order status. When status becomes "delivered", sends the
 * dedicated "Your Urban Eye Order Has Been Delivered" email with a
 * "Leave a Review" button per product. Other statuses get a branded update
 * email. Email failures never block the status change.
 */
function adminUpdateOrderStatus(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const { orderId, status } = body;
  if (!orderId || !status) return _err("orderId and status required.");

  const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
  if (!validStatuses.includes(status)) return _err("Invalid status.");

  const updated = _update(SHEETS.ORDERS, "orderId", orderId, { status });
  if (!updated) return _err("Order not found.");

  // Notify customer via email.
  try {
    const order = _rows(SHEETS.ORDERS).find(o => o.orderId === orderId);
    if (order) {
      order.address = _safeParse(order.address);
      const user = _rows(SHEETS.USERS).find(u => u.userId === order.userId);
      if (user && user.email) {
        if (status === "delivered") {
          const items = _rows(SHEETS.ORDER_ITEMS).filter(i => i.orderId === orderId);
          sendDeliveryEmail(order, items, user);
        } else {
          sendStatusEmail(order, user, status);
        }
      }
    }
  } catch (e) {
    // Email failed — don't block the status update
    console.error("Status email failed:", e && e.message);
  }

  return _ok({ message: `Order status updated to ${status}.` });
}

// ─── ADMIN: REVIEWS ───────────────────────────────────────────────────────────

function adminGetAllReviews(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const reviews = _rows(SHEETS.REVIEWS)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return _ok(reviews);
}

/**
 * Feature 3 (Step 2) — Approve / reject a review. On approval
 * (approved === "true") sends the "Your Review Has Been Approved" email with a
 * "View Product" button. Email failures never block the update.
 */
function adminUpdateReview(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const { reviewId, approved } = body;
  if (!reviewId || approved === undefined) return _err("reviewId and approved required.");

  const updated = _update(SHEETS.REVIEWS, "reviewId", reviewId, { approved: String(approved) });
  if (!updated) return _err("Review not found.");

  // On approval, email the reviewer that their review is live.
  try {
    if (String(approved) === "true") {
      const review = _rows(SHEETS.REVIEWS).find(r => r.reviewId === reviewId);
      if (review) {
        const user = _rows(SHEETS.USERS).find(u => u.userId === review.userId);
        if (user && user.email) sendReviewApprovedEmail(user, review);
      }
    }
  } catch (e) {
    console.error("Review approved email failed:", e && e.message);
  }

  return _ok({ message: `Review ${approved === "true" ? "approved" : "rejected"}.` });
}

function adminDeleteReview(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const { reviewId } = body;
  if (!reviewId) return _err("reviewId required.");

  const deleted = _delete(SHEETS.REVIEWS, "reviewId", reviewId);
  if (!deleted) return _err("Review not found.");

  return _ok({ message: "Review deleted." });
}

// ─── ADMIN: WISHLIST ANALYTICS ────────────────────────────────────────────────

function adminGetWishlistAnalytics(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const wishlist = _rows(SHEETS.WISHLIST);

  // Count per productId
  const countMap = {};
  wishlist.forEach(w => {
    countMap[w.productId] = (countMap[w.productId] || 0) + 1;
  });

  const result = Object.entries(countMap)
    .map(([productId, count]) => ({ productId, count }))
    .sort((a, b) => b.count - a.count);

  return _ok({
    totalWishlistItems: wishlist.length,
    byProduct         : result,
  });
}

// ─── ADMIN: REVENUE ANALYTICS ────────────────────────────────────────────────

function adminGetRevenueByMonth(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orders  = _rows(SHEETS.ORDERS).filter(o => o.status !== "cancelled");
  const now     = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;

  // Build month buckets for current and last year
  const current  = Array(12).fill(0);
  const previous = Array(12).fill(0);
  const orderCounts = Array(12).fill(0);

  orders.forEach(o => {
    const d = new Date(o.createdAt);
    const m = d.getMonth();
    const y = d.getFullYear();
    if (y === thisYear) {
      current[m] += Number(o.total || 0);
      orderCounts[m]++;
    } else if (y === lastYear) {
      previous[m] += Number(o.total || 0);
    }
  });

  const result = Array(12).fill(null).map((_, i) => ({
    month  : _monthName(i),
    revenue: Math.round(current[i] / 1000),   // in ₨K
    orders : orderCounts[i],
    prev   : Math.round(previous[i] / 1000),  // in ₨K
  }));

  return _ok(result);
}

function adminGetDailyRevenue(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orders = _rows(SHEETS.ORDERS).filter(o => o.status !== "cancelled");
  const now    = new Date();

  // Last 30 days
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d    = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayRev  = orders
      .filter(o => o.createdAt && o.createdAt.startsWith(dateStr))
      .reduce((s, o) => s + Number(o.total || 0), 0);

    result.push({
      day    : String(30 - i),
      date   : dateStr,
      revenue: dayRev,
    });
  }

  return _ok(result);
}

function adminGetOrderStatusBreakdown(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orders = _rows(SHEETS.ORDERS);
  const breakdown = {
    pending   : 0,
    processing: 0,
    shipped   : 0,
    delivered : 0,
    cancelled : 0,
  };

  orders.forEach(o => {
    const s = (o.status || "pending").toLowerCase();
    if (breakdown[s] !== undefined) breakdown[s]++;
  });

  return _ok(breakdown);
}

// ─── ADMIN: RECENT ACTIVITY ───────────────────────────────────────────────────

function adminGetRecentActivity(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised.");

  const orders  = _rows(SHEETS.ORDERS);
  const users   = _rows(SHEETS.USERS).filter(u => u.role !== "admin");
  const reviews = _rows(SHEETS.REVIEWS);

  const activity = [];

  // Latest 10 orders
  orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)
    .forEach(o => {
      activity.push({
        type     : "order",
        icon     : "📦",
        text     : `New order ${o.orderId} by ${o.customerName || "customer"} — ₨${Number(o.total).toLocaleString()}`,
        createdAt: o.createdAt,
      });
    });

  // Latest 5 registrations
  users
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .forEach(u => {
      activity.push({
        type     : "customer",
        icon     : "👤",
        text     : `${u.fullName} registered a new account`,
        createdAt: u.createdAt,
      });
    });

  // Latest 5 reviews
  reviews
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .forEach(r => {
      activity.push({
        type     : "review",
        icon     : "⭐",
        text     : `${r.customerName || "Customer"} submitted a ${r.rating}★ review for ${r.productName || "a product"}`,
        createdAt: r.createdAt,
      });
    });

  // Sort all by date
  activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return _ok(activity.slice(0, 20));
}

// ============================================================
// SHEET INITIALISER  —  run once from Apps Script editor
// ============================================================

function initSheets() {
  const schemas = {
    // Added: status to Users, customerName to Orders, productName to Reviews
    Users      : ["userId","fullName","email","phone","passwordHash","role","status","createdAt","otpCode","otpExpiry"],
    Orders     : ["orderId","userId","customerName","itemCount","subtotal","shipping","total","status","address","paymentMethod","createdAt"],
    OrderItems : ["orderItemId","orderId","userId","productId","name","sku","unitPrice","quantity","subtotal","createdAt"],
    Cart       : ["cartId","userId","productId","quantity","createdAt"],
    Wishlist   : ["wishlistId","userId","productId","createdAt"],
    Reviews    : ["reviewId","userId","customerName","productId","productName","rating","review","approved","createdAt"],
    Addresses  : ["addressId","userId","fullName","phone","address","city","country","postalCode","isDefault"],
  };

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  Object.entries(schemas).forEach(([name, headers]) => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) {
      sh.appendRow(headers);
      sh.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0c2c41")
        .setFontColor("#ffffff");
    }
  });

  SpreadsheetApp.getUi().alert("✅ All sheets initialised successfully!");
}

// ============================================================
// FIX SHEET SCHEMAS — Run after initSheets if needed
// ============================================================

function fixSheetSchemas() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const schemas = {
    Users      : ["userId","fullName","email","phone","passwordHash","role","status","createdAt","otpCode","otpExpiry"],
    Orders     : ["orderId","userId","customerName","itemCount","subtotal","shipping","total","status","address","paymentMethod","createdAt"],
    OrderItems : ["orderItemId","orderId","userId","productId","name","sku","unitPrice","quantity","subtotal","createdAt"],
    Cart       : ["cartId","userId","productId","quantity","createdAt"],
    Wishlist   : ["wishlistId","userId","productId","createdAt"],
    Reviews    : ["reviewId","userId","customerName","productId","productName","rating","review","approved","createdAt"],
    Addresses  : ["addressId","userId","fullName","phone","address","city","country","postalCode","isDefault"],
  };

  Object.entries(schemas).forEach(([name, headers]) => {
    let sh = ss.getSheetByName(name);
    if (!sh) {
      sh = ss.insertSheet(name);
      sh.appendRow(headers);
      sh.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0c2c41")
        .setFontColor("#ffffff");
    } else {
      // Only update headers row if schema changed (col count mismatch)
      const existing = sh.getLastRow() > 0
        ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]
        : [];
      if (existing[0] !== headers[0] || existing.length !== headers.length) {
        // Backup existing headers then overwrite
        sh.getRange(1, 1, 1, Math.max(headers.length, existing.length))
          .setValues([headers.concat(Array(Math.max(0, existing.length - headers.length)).fill(""))]);
      }
    }
  });

  SpreadsheetApp.getUi().alert("✅ Database schemas corrected!");
}

// ============================================================
// EMAIL SELF-TEST — run from the editor to preview all templates
// Sends every email type to ADMIN_EMAIL with sample data so you can
// confirm design + that Gmail sending works before going live.
// ============================================================

function testAllEmails() {
  const sampleUser = { fullName: "Test Customer", name: "Test Customer", email: ADMIN_EMAIL, phone: "+92 300 1234567" };
  const sampleOrder = {
    orderId      : "OS-TEST-1234",
    customerName : "Test Customer",
    subtotal     : 24500,
    shipping     : 0,
    total        : 24500,
    paymentMethod: "COD",
    createdAt    : _now(),
    address      : { fullName: "Test Customer", phone: "+92 300 1234567", address: "123 Market Road", city: "Karachi", postalCode: "75500", country: "Pakistan" },
  };
  const sampleItems = [
    { productId: "alex", name: "The Alex", sku: "H2832", unitPrice: 8000, quantity: 1, subtotal: 8000 },
    { productId: "felix", name: "The Felix", sku: "H2901", unitPrice: 16500, quantity: 1, subtotal: 16500 },
  ];

  sendOrderEmail(sampleOrder, sampleItems, sampleUser);
  sendAdminOrderEmail(sampleOrder, sampleItems, sampleUser);
  sendDeliveryEmail(sampleOrder, sampleItems, sampleUser);
  sendStatusEmail(sampleOrder, sampleUser, "shipped");
  sendWishlistEmail(sampleUser, { productId: "alex", name: "The Alex", image: LOGO_URL, price: 8000, description: "Hand-crafted acetate optical frame.", url: SITE_URL + "/#/products/alex" });
  sendReviewPendingEmail(sampleUser, "The Alex");
  sendReviewApprovedEmail(sampleUser, { productId: "alex", productName: "The Alex", rating: 5, review: "Absolutely love these frames!" });
  sendOTPEmail(sampleUser, "123456");

  Logger.log("✅ All sample emails sent to " + ADMIN_EMAIL);
}

/**
 * LIVE EMAIL DIAGNOSTIC — call this from your browser to see exactly which
 * emails send and which fail (with the real error message). Because the normal
 * triggers swallow email errors so they never block checkout, this endpoint is
 * the fastest way to confirm the new backend is actually deployed and that
 * Gmail sending works.
 *
 *   GET  <your /exec URL>?action=adminTestEmails&adminSecret=URBAN_EYE_ADMIN_2026&to=you@gmail.com
 *
 * Returns per-email "sent" / "ERROR: ..." plus your remaining Gmail quota.
 */
function adminTestEmails(body, params) {
  if (!_isAdmin(body, params)) return _err("Unauthorised. Pass adminSecret.");

  const to = (body && body.to) || (params && params.to) || ADMIN_EMAIL;
  const results = {};
  const run = function (label, fn) {
    try {
      const ok = fn();
      results[label] = ok ? "sent ✓" : "send failed (MailApp returned false — check quota/logs)";
    } catch (e) {
      results[label] = "ERROR: " + (e && e.message);
    }
  };

  const user  = { fullName: "Test Customer", name: "Test Customer", email: to, phone: "+92 300 1234567" };
  const order = {
    orderId: "OS-TEST-" + Date.now(), customerName: "Test Customer",
    subtotal: 24500, shipping: 0, total: 24500, paymentMethod: "COD", createdAt: _now(),
    address: { fullName: "Test Customer", phone: "+92 300 1234567", address: "123 Market Road", city: "Karachi", postalCode: "75500", country: "Pakistan" },
  };
  const items = [{ productId: "alex", name: "The Alex", sku: "H2832", unitPrice: 8000, quantity: 1, subtotal: 8000 }];

  run("1_orderConfirmation", function () { return sendOrderEmail(order, items, user); });
  run("1_adminOrderAlert",   function () { return sendAdminOrderEmail(order, items, user); });
  run("2_delivered",         function () { return sendDeliveryEmail(order, items, user); });
  run("2_statusUpdate",      function () { return sendStatusEmail(order, user, "shipped"); });
  run("3_reviewPending",     function () { return sendReviewPendingEmail(user, "The Alex"); });
  run("3_reviewApproved",    function () { return sendReviewApprovedEmail(user, { productId: "alex", productName: "The Alex", rating: 5, review: "Love it!" }); });
  run("4_otp",               function () { return sendOTPEmail(user, "123456"); });
  run("5_wishlist",          function () { return sendWishlistEmail(user, { productId: "alex", name: "The Alex", image: LOGO_URL, price: 8000, description: "Hand-crafted acetate frame.", url: SITE_URL + "/#/products/alex" }); });

  let quota = null;
  try { quota = MailApp.getRemainingDailyQuota(); } catch (e) { quota = "unavailable: " + (e && e.message); }

  return _ok({
    sentTo: to,
    remainingDailyEmailQuota: quota,
    results: results,
    note: "If every line says 'sent ✓' but real emails still don't fire, your frontend/admin panel is calling an OLD /exec deployment. Re-deploy a NEW VERSION of the existing deployment (same URL) or update API_URL.",
  });
}

// ============================================================
// DELETE USER DATA — For testing / GDPR compliance
// ============================================================

function deleteAllUserData(userId) {
  _deleteAllByUserId(SHEETS.CART, userId);
  _deleteAllByUserId(SHEETS.WISHLIST, userId);
  _deleteAllByUserId(SHEETS.ADDRESSES, userId);
  _deleteAllByUserId(SHEETS.REVIEWS, userId);
  _deleteAllByUserId(SHEETS.ORDER_ITEMS, userId);
  _deleteAllByUserId(SHEETS.ORDERS, userId);
  _delete(SHEETS.USERS, "userId", userId);
  return _ok({ message: "All user data deleted." });
}

// ============================================================
// ROUTER  —  doGet + doPost
// ============================================================

function doGet(e) {
  const params = e.parameter || {};
  const action = params.action || "";

  try {
    switch (action) {
      // Customer routes
      case "getCart"               : return getCart({}, params);
      case "getWishlist"           : return getWishlist({}, params);
      case "getReviews"            : return getReviews(params);
      case "getUserReviews"        : return getUserReviews({}, params);
      case "getProductReviewStats" : return getProductReviewStats(params);
      case "getPurchasedProducts"  : return getPurchasedProducts({}, params);
      case "getOrders"             : return getOrders({}, params);
      case "getOrderItems"         : return getOrderItems({}, params);
      case "getAddresses"          : return getAddresses({}, params);

      // ─── Admin routes (GET) ───
      case "adminGetStats"              : return adminGetStats({}, params);
      case "adminGetCustomers"          : return adminGetCustomers({}, params);
      case "adminGetCustomerDetail"     : return adminGetCustomerDetail({}, params);
      case "adminGetAllOrders"          : return adminGetAllOrders({}, params);
      case "adminGetOrderDetail"        : return adminGetOrderDetail({}, params);
      case "adminGetAllReviews"         : return adminGetAllReviews({}, params);
      case "adminGetWishlistAnalytics"  : return adminGetWishlistAnalytics({}, params);
      case "adminGetRevenueByMonth"     : return adminGetRevenueByMonth({}, params);
      case "adminGetDailyRevenue"       : return adminGetDailyRevenue({}, params);
      case "adminGetOrderStatusBreakdown": return adminGetOrderStatusBreakdown({}, params);
      case "adminGetRecentActivity"     : return adminGetRecentActivity({}, params);

      // ─── Email diagnostic (browser-friendly) ───
      case "adminTestEmails"            : return adminTestEmails({}, params);

      default: return _err("Unknown GET action: " + action);
    }
  } catch (err) {
    console.error("GET Error:", err);
    return _err("Server error: " + err.message);
  }
}

function doPost(e) {
  let body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (ex) {
    return _err("Invalid JSON body.");
  }

  const action = body.action || "";
  const params = e.parameter || {};

  try {
    switch (action) {
      // Auth
      case "signup"            : return signup(body);
      case "login"             : return login(body);
      case "forgotPassword"    : return forgotPassword(body);
      case "verifyOTP"         : return verifyOTP(body);
      case "resetPassword"     : return resetPassword(body);
      case "updateProfile"     : return updateProfile(body, params);

      // Cart
      case "addToCart"         : return addToCart(body, params);
      case "updateCart"        : return updateCart(body, params);
      case "removeFromCart"    : return removeFromCart(body, params);

      // Wishlist
      case "addToWishlist"     : return addToWishlist(body, params);
      case "removeFromWishlist": return removeFromWishlist(body, params);

      // Reviews
      case "submitReview"      : return submitReview(body, params);
      case "updateReview"      : return updateReview(body, params);

      // Orders
      case "checkout"          : return checkout(body, params);

      // Addresses
      case "addAddress"        : return addAddress(body, params);
      case "updateAddress"     : return updateAddress(body, params);
      case "deleteAddress"     : return deleteAddress(body, params);

      // ─── Admin routes (POST) ───
      case "adminUpdateCustomerStatus": return adminUpdateCustomerStatus(body, params);
      case "adminDeleteCustomer"      : return adminDeleteCustomer(body, params);
      case "adminUpdateOrderStatus"   : return adminUpdateOrderStatus(body, params);
      case "adminUpdateReview"        : return adminUpdateReview(body, params);
      case "adminDeleteReview"        : return adminDeleteReview(body, params);
      case "adminTestEmails"          : return adminTestEmails(body, params);

      default:
        return _err("Unknown POST action: " + action);
    }
  } catch (err) {
    console.error("POST Error:", err);
    return _err("Server error: " + err.message);
  }
}
