# Urban Eye — Google Apps Script backend

`Code.gs` is the **complete** backend (your existing script **plus** all the new
transactional-email + OTP features). It is not part of the Vite build — it runs
in the Google Apps Script editor. This folder just keeps it version-controlled
alongside the frontend.

## What was added

A single reusable **email engine** (branded, responsive HTML — logo, brand
colours, CTA buttons, footer with support email / website / social links) wired
into the existing flows. No markup is duplicated; every email goes through one
`_emailShell()`.

| Feature | Function(s) | Trigger |
|--------|-------------|---------|
| 1. Order confirmation (customer) | `sendOrderEmail` | `checkout()` |
| 1. New order alert (admin) | `sendAdminOrderEmail` | `checkout()` |
| 2. Delivered + "Leave a Review" | `sendDeliveryEmail` | `adminUpdateOrderStatus()` → `delivered` |
| — Other status updates | `sendStatusEmail` | `adminUpdateOrderStatus()` → other |
| 3. Review received (pending) | `sendReviewPendingEmail` | `submitReview()` |
| 3. Review approved + "View Product" | `sendReviewApprovedEmail` | `adminUpdateReview()` → approved |
| 4. Password reset OTP | `sendOTPEmail` | `forgotPassword()` |
| 5. Wishlist add | `sendWishlistEmail` | `addToWishlist()` (new item only) |

All email sends are wrapped in `try/catch`, so a mail failure **never** blocks
the underlying action (checkout still succeeds, status still updates, etc.).

**Forgot-password OTP** is now: 6 digits, **expires in 5 minutes**, **single-use**
(cleared on successful reset), with a **60-second resend rate-limit** and a
professional HTML email (subject: `Password Reset OTP`).

## Configure before deploying

Open `Code.gs` and set the values in the **`EMAIL / BRAND CONFIG`** block near
the top:

```js
const SITE_URL      = "https://YOUR-URBAN-EYE-DOMAIN.netlify.app"; // ← your live domain, no trailing slash
const ADMIN_EMAIL   = "urbaneye.website@gmail.com";  // gets "New Order Received"
const SUPPORT_EMAIL = "urbaneye.website@gmail.com";  // shown in footers
```

`SITE_URL` **must** be your real deployed domain — every email button
(`View Order`, `Leave a Review`, `View Product`) and the logo/product images are
built from it. The logo is expected at `SITE_URL/logo.jpeg` (already in
`public/logo.jpeg`). Optionally fill `SOCIAL_LINKS`.

## Deploy steps

1. Open your Apps Script project (the one behind the `API_URL` in
   `src/services/service.js`).
2. Replace the whole `Code.gs` contents with this file.
3. Set `SITE_URL` (and socials if you have them).
4. **Deploy → Manage deployments → Edit → New version → Deploy.**
   (Re-deploying a new version is required for changes to go live; the
   `/exec` URL stays the same.)
5. First run will prompt for authorization — approve the Gmail/Sheets scopes.
6. (Optional) In the editor, run **`testAllEmails`** once to send every template
   to `ADMIN_EMAIL` so you can preview the design and confirm sending works.

## Notes

- **No sheet schema changes** were needed. If you have never run it, run
  `initSheets` once; existing sheets keep working as-is.
- Daily Gmail send quota on a consumer account is ~100 emails/day
  (Workspace ~1,500). Order emails count as 2 (customer + admin).
- Product images in emails are hosted from your public site
  (`SITE_URL/assets/...`); Gmail loads them once the URLs are publicly
  reachable.
