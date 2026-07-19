



















































// // // ============================================================
// // // service.js  —  Urban Eye API Client
// // // Handles all calls to the Google Apps Script backend.
// // // ============================================================

// // // ─── PUT YOUR DEPLOYED APPS SCRIPT URL HERE ─────────────────
// // const API_URL =
// //   "https://script.google.com/macros/s/AKfycbzrqR9acMkIHswXCX6GBd-cMrLq__S2NwCLzo_l1ddESbs1LRnvloXUYx-YCRbgzrSL/exec";

// // // ─── TOKEN HELPERS ──────────────────────────────────────────
// // function getToken() {
// //   try { return localStorage.getItem("os_token") || ""; } catch { return ""; }
// // }
// // function setToken(token) {
// //   try { localStorage.setItem("os_token", token); } catch {}
// // }
// // function clearToken() {
// //   try { localStorage.removeItem("os_token"); localStorage.removeItem("os_user"); } catch {}
// // }

// // // ─── CORE REQUEST HELPERS ───────────────────────────────────

// // /**
// //  * GET request — passes token as URL query param (CORS-safe for GAS).
// //  */
// // async function apiGet(action, params = {}) {
// //   const token = getToken();
// //   const qs = new URLSearchParams({ action, ...params, ...(token ? { token } : {}) });
// //   const res = await fetch(`${API_URL}?${qs.toString()}`, {
// //     method: "GET",
// //     redirect: "follow",
// //   });
// //   if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //   const json = await res.json();
// //   if (!json.success) throw new Error(json.error || "Request failed");
// //   return json;
// // }

// // /**
// //  * POST request — sends JSON body, token included inside body (CORS-safe for GAS).
// //  */
// // async function apiPost(action, body = {}) {
// //   const token = getToken();
// //   const res = await fetch(API_URL, {
// //     method: "POST",
// //     redirect: "follow",
// //     headers: { "Content-Type": "text/plain" },
// //     body: JSON.stringify({ action, ...body, ...(token ? { token } : {}) }),
// //   });
// //   if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //   const json = await res.json();
// //   if (!json.success) throw new Error(json.error || "Request failed");
// //   return json;
// // }

// // // ============================================================
// // // AUTH SERVICES
// // // ============================================================

// // export async function signup({ fullName, email, phone, password }) {
// //   const res = await apiPost("signup", { fullName, email, phone, password });
// //   if (res.data?.token) setToken(res.data.token);
// //   return res;
// // }

// // export async function login({ email, password }) {
// //   const res = await apiPost("login", { email, password });
// //   if (res.data?.token) setToken(res.data.token);
// //   return res;
// // }

// // export function logout() {
// //   clearToken();
// // }

// // export async function forgotPassword({ email }) {
// //   return await apiPost("forgotPassword", { email });
// // }

// // export async function verifyOTP({ email, otp }) {
// //   return await apiPost("verifyOTP", { email, otp });
// // }

// // export async function resetPassword({ email, otp, newPassword }) {
// //   return await apiPost("resetPassword", { email, otp, newPassword });
// // }

// // export async function updateProfile({ fullName, phone }) {
// //   return await apiPost("updateProfile", { fullName, phone });
// // }

// // // ============================================================
// // // CART SERVICES
// // // ============================================================

// // export async function getCart() {
// //   return await apiGet("getCart");
// // }

// // export async function addToCart({ productId, quantity = 1 }) {
// //   return await apiPost("addToCart", { productId, quantity });
// // }

// // export async function updateCart({ cartId, quantity }) {
// //   return await apiPost("updateCart", { cartId, quantity });
// // }

// // export async function removeFromCart({ cartId }) {
// //   return await apiPost("removeFromCart", { cartId });
// // }

// // // ============================================================
// // // WISHLIST SERVICES
// // // ============================================================

// // export async function getWishlist() {
// //   return await apiGet("getWishlist");
// // }

// // export async function addToWishlist({ productId }) {
// //   return await apiPost("addToWishlist", { productId });
// // }

// // export async function removeFromWishlist({ wishlistId }) {
// //   return await apiPost("removeFromWishlist", { wishlistId });
// // }

// // // ============================================================
// // // ORDER SERVICES - UPDATED
// // // ============================================================

// // /**
// //  * Place an order.
// //  *
// //  * cartItems = array of cart objects (from CartContext).
// //  * Each item needs: productId, name, price (discountPrice), quantity.
// //  */
// // export async function checkout({ cartItems, subtotal, shipping, total, address, paymentMethod }) {
// //   // Ensure all product data is properly formatted
// //   const products = cartItems.map(item => ({
// //     productId: item.productId || item.id,
// //     name: item.name || item.productName || "Product",
// //     sku: item.sku || item.id || item.productId || "",
// //     unitPrice: Number(item.discountPrice || item.price || 0),
// //     quantity: Number(item.qty || item.quantity || 1),
// //     subtotal: Number((item.discountPrice || item.price || 0) * (item.qty || item.quantity || 1))
// //   }));

// //   console.log("📦 Submitting order with products:", products); // Debug log

// //   return await apiPost("checkout", {
// //     products,
// //     subtotal: Number(subtotal) || 0,
// //     shipping: Number(shipping) || 0,
// //     total: Number(total),
// //     address: typeof address === 'object' ? JSON.stringify(address) : address,
// //     paymentMethod: paymentMethod || "COD",
// //   });
// // }

// // export async function getOrders() {
// //   const res = await apiGet("getOrders");
// //   console.log("📋 Raw orders response:", res);
// //   return res;
// // }

// // export async function getOrderItems({ orderId }) {
// //   return await apiGet("getOrderItems", { orderId });
// // }

// // // ============================================================
// // // ADDRESS SERVICES
// // // ============================================================

// // export async function getAddresses() {
// //   return await apiGet("getAddresses");
// // }

// // export async function addAddress(addressData) {
// //   return await apiPost("addAddress", addressData);
// // }

// // export async function updateAddress(addressData) {
// //   return await apiPost("updateAddress", addressData);
// // }

// // export async function deleteAddress({ addressId }) {
// //   return await apiPost("deleteAddress", { addressId });
// // }

// // // ============================================================
// // // REVIEW SERVICES
// // // ============================================================

// // export async function getReviews({ productId }) {
// //   return await apiGet("getReviews", { productId });
// // }

// // export async function submitReview({ productId, rating, review }) {
// //   return await apiPost("submitReview", { productId, rating, review });
// // }




































// // ============================================================
// // service.js  —  Urban Eye API Client
// // Handles all calls to the Google Apps Script backend.
// // ============================================================

// const API_URL=
// "https://script.google.com/macros/s/AKfycbzrDgqj-aPVJL7AjSDnYZWEtp9UYodwORMLHVXut4rG2684ea0YmRlWjoc3uNBZ4oKV/exec"
// // ─── TOKEN HELPERS ──────────────────────────────────────────
// function getToken() {
//   try { return localStorage.getItem("os_token") || ""; } catch { return ""; }
// }
// function setToken(token) {
//   try { localStorage.setItem("os_token", token); } catch {}
// }
// function clearToken() {
//   try { localStorage.removeItem("os_token"); localStorage.removeItem("os_user"); } catch {}
// }

// // ─── CORE REQUEST HELPERS ───────────────────────────────────
// async function apiGet(action, params = {}) {
//   const token = getToken();
//   const qs = new URLSearchParams({ action, ...params, ...(token ? { token } : {}) });
//   const res = await fetch(`${API_URL}?${qs.toString()}`, {
//     method: "GET",
//     redirect: "follow",
//   });
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   const json = await res.json();
//   if (!json.success) throw new Error(json.error || "Request failed");
//   return json;
// }

// async function apiPost(action, body = {}) {
//   const token = getToken();
//   const res = await fetch(API_URL, {
//     method: "POST",
//     redirect: "follow",
//     headers: { "Content-Type": "text/plain" },
//     body: JSON.stringify({ action, ...body, ...(token ? { token } : {}) }),
//   });
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   const json = await res.json();
//   if (!json.success) throw new Error(json.error || "Request failed");
//   return json;
// }

// // ============================================================
// // AUTH SERVICES
// // ============================================================

// export async function signup({ fullName, email, phone, password }) {
//   const res = await apiPost("signup", { fullName, email, phone, password });
//   if (res.data?.token) setToken(res.data.token);
//   return res;
// }

// export async function login({ email, password }) {
//   const res = await apiPost("login", { email, password });
//   if (res.data?.token) setToken(res.data.token);
//   return res;
// }

// export function logout() {
//   clearToken();
// }

// export async function forgotPassword({ email }) {
//   return await apiPost("forgotPassword", { email });
// }

// export async function verifyOTP({ email, otp }) {
//   return await apiPost("verifyOTP", { email, otp });
// }

// export async function resetPassword({ email, otp, newPassword }) {
//   return await apiPost("resetPassword", { email, otp, newPassword });
// }

// export async function updateProfile({ fullName, phone }) {
//   return await apiPost("updateProfile", { fullName, phone });
// }

// // ============================================================
// // CART SERVICES
// // ============================================================

// export async function getCart() {
//   return await apiGet("getCart");
// }

// export async function addToCart({ productId, quantity = 1 }) {
//   return await apiPost("addToCart", { productId, quantity });
// }

// export async function updateCart({ cartId, quantity }) {
//   return await apiPost("updateCart", { cartId, quantity });
// }

// export async function removeFromCart({ cartId }) {
//   return await apiPost("removeFromCart", { cartId });
// }

// // ============================================================
// // WISHLIST SERVICES
// // ============================================================

// export async function getWishlist() {
//   return await apiGet("getWishlist");
// }

// export async function addToWishlist({ productId }) {
//   return await apiPost("addToWishlist", { productId });
// }

// export async function removeFromWishlist({ wishlistId }) {
//   return await apiPost("removeFromWishlist", { wishlistId });
// }

// // ============================================================
// // ORDER SERVICES
// // ============================================================

// export async function checkout({ cartItems, subtotal, shipping, total, address, paymentMethod }) {
//   const products = cartItems.map(item => ({
//     productId: item.productId || item.id,
//     name: item.name || item.productName || "Product",
//     sku: item.sku || item.id || item.productId || "",
//     unitPrice: Number(item.discountPrice || item.price || 0),
//     quantity: Number(item.qty || item.quantity || 1),
//     subtotal: Number((item.discountPrice || item.price || 0) * (item.qty || item.quantity || 1))
//   }));

//   return await apiPost("checkout", {
//     products,
//     subtotal: Number(subtotal) || 0,
//     shipping: Number(shipping) || 0,
//     total: Number(total),
//     address: typeof address === 'object' ? JSON.stringify(address) : address,
//     paymentMethod: paymentMethod || "COD",
//   });
// }

// export async function getOrders() {
//   const res = await apiGet("getOrders");
//   return res;
// }

// export async function getOrderItems({ orderId }) {
//   return await apiGet("getOrderItems", { orderId });
// }

// // ============================================================
// // ADDRESS SERVICES
// // ============================================================

// export async function getAddresses() {
//   return await apiGet("getAddresses");
// }

// export async function addAddress(addressData) {
//   return await apiPost("addAddress", addressData);
// }

// export async function updateAddress(addressData) {
//   return await apiPost("updateAddress", addressData);
// }

// export async function deleteAddress({ addressId }) {
//   return await apiPost("deleteAddress", { addressId });
// }

// // ============================================================
// // REVIEW SERVICES — ENHANCED
// // ============================================================

// /**
//  * Get all reviews for a specific product (public — no auth needed).
//  */
// export async function getReviews({ productId }) {
//   return await apiGet("getReviews", { productId });
// }

// /**
//  * Get all reviews written by the logged-in user.
//  */
// export async function getUserReviews() {
//   return await apiGet("getUserReviews");
// }

// /**
//  * Submit a new review for a product.
//  */
// export async function submitReview({ productId, rating, review }) {
//   return await apiPost("submitReview", { productId, rating, review });
// }

// /**
//  * Update an existing review (if user already reviewed this product).
//  */
// export async function updateReview({ reviewId, rating, review }) {
//   return await apiPost("updateReview", { reviewId, rating, review });
// }

// /**
//  * Get review statistics for a product: avgRating, totalCount, breakdown per star.
//  */
// export async function getProductReviewStats({ productId }) {
//   return await apiGet("getProductReviewStats", { productId });
// }

// /**
//  * Get all products the user has purchased (from OrderItems joined with Orders).
//  */
// export async function getPurchasedProducts() {
//   return await apiGet("getPurchasedProducts");
// }























// ============================================================
// service.js  —  Urban Eye API Client
// Handles all calls to the Google Apps Script backend.
// ============================================================

import { PRODUCTS_DATA } from "../prodcut.js";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz20WORJgVWxJlAtZ13zeKAuUGxyh0hn8GY7PxQWxBqpnFb3a2xuLtgAtonyS15qSU/exec";

// ─── PRODUCT ENRICHMENT (for backend emails) ────────────────
// Products live in the React frontend, so we resolve name/image/price/
// description here and pass them to the backend purely so its transactional
// emails (wishlist, review) can be rich. Nothing extra is persisted.

/** Turn a relative asset path ("./assets/x.jpg") into an absolute URL. */
function _absAssetUrl(path) {
  if (!path) return "";
  const s = String(path);
  if (/^https?:\/\//i.test(s)) return s;
  const clean = s.replace(/^\.?\//, ""); // "./assets/x.jpg" -> "assets/x.jpg"
  try {
    return window.location.origin + "/" + encodeURI(clean);
  } catch {
    return clean;
  }
}

/** Look up a product from the frontend catalogue for email enrichment. */
function _productInfo(productId) {
  const p = PRODUCTS_DATA.find((x) => String(x.id) === String(productId));
  if (!p) return null;
  const rawImg =
    (p.colors && p.colors[0] && (p.colors[0].image || (p.colors[0].gallery && p.colors[0].gallery[0]))) ||
    (p.gallery && p.gallery[0]) ||
    "";
  const origin = (typeof window !== "undefined" && window.location) ? window.location.origin : "";
  return {
    productName: p.name || "",
    productImage: _absAssetUrl(rawImg),
    productPrice: p.discountPrice || p.price || "",
    productDescription: (p.description || "").slice(0, 160),
    productUrl: origin ? `${origin}/#/products/${p.id}` : "",
  };
}

// ─── TOKEN HELPERS ──────────────────────────────────────────
function getToken() {
  try { return localStorage.getItem("os_token") || ""; } catch { return ""; }
}
function setToken(token) {
  try { localStorage.setItem("os_token", token); } catch {}
}
function clearToken() {
  try { localStorage.removeItem("os_token"); localStorage.removeItem("os_user"); } catch {}
}

// ─── CORE REQUEST HELPERS ───────────────────────────────────
async function apiGet(action, params = {}) {
  const token = getToken();
  const qs = new URLSearchParams({ action, ...params, ...(token ? { token } : {}) });
  const res = await fetch(`${API_URL}?${qs.toString()}`, {
    method: "GET",
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Request failed");
  return json;
}

async function apiPost(action, body = {}) {
  const token = getToken();
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

// ============================================================
// AUTH SERVICES
// ============================================================

export async function signup({ fullName, email, phone, password }) {
  const res = await apiPost("signup", { fullName, email, phone, password });
  if (res.data?.token) setToken(res.data.token);
  return res;
}

export async function login({ email, password }) {
  const res = await apiPost("login", { email, password });
  if (res.data?.token) setToken(res.data.token);
  return res;
}

export function logout() {
  clearToken();
}

export async function forgotPassword({ email }) {
  return await apiPost("forgotPassword", { email });
}

export async function verifyOTP({ email, otp }) {
  return await apiPost("verifyOTP", { email, otp });
}

export async function resetPassword({ email, otp, newPassword }) {
  return await apiPost("resetPassword", { email, otp, newPassword });
}

export async function updateProfile({ fullName, phone }) {
  return await apiPost("updateProfile", { fullName, phone });
}

// ============================================================
// CART SERVICES
// ============================================================

export async function getCart() {
  return await apiGet("getCart");
}

export async function addToCart({ productId, quantity = 1 }) {
  return await apiPost("addToCart", { productId, quantity });
}

export async function updateCart({ cartId, quantity }) {
  return await apiPost("updateCart", { cartId, quantity });
}

export async function removeFromCart({ cartId }) {
  return await apiPost("removeFromCart", { cartId });
}

// ============================================================
// WISHLIST SERVICES
// ============================================================

export async function getWishlist() {
  return await apiGet("getWishlist");
}

export async function addToWishlist({ productId }) {
  // Enrich with product details so the backend "Product Added to Your
  // Wishlist" email can show image / name / price / description.
  const info = _productInfo(productId) || {};
  return await apiPost("addToWishlist", { productId, ...info });
}

export async function removeFromWishlist({ wishlistId }) {
  return await apiPost("removeFromWishlist", { wishlistId });
}

// ============================================================
// ORDER SERVICES
// ============================================================

export async function checkout({ cartItems, subtotal, shipping, total, address, paymentMethod }) {
  const products = cartItems.map(item => ({
    productId: item.productId || item.id,
    name: item.name || item.productName || "Product",
    sku: item.sku || item.id || item.productId || "",
    unitPrice: Number(item.discountPrice || item.price || 0),
    quantity: Number(item.qty || item.quantity || 1),
    subtotal: Number((item.discountPrice || item.price || 0) * (item.qty || item.quantity || 1))
  }));

  return await apiPost("checkout", {
    products,
    subtotal: Number(subtotal) || 0,
    shipping: Number(shipping) || 0,
    total: Number(total),
    address: typeof address === 'object' ? JSON.stringify(address) : address,
    paymentMethod: paymentMethod || "COD",
  });
}

export async function getOrders() {
  const res = await apiGet("getOrders");
  return res;
}

export async function getOrderItems({ orderId }) {
  return await apiGet("getOrderItems", { orderId });
}

// ============================================================
// ADDRESS SERVICES
// ============================================================

export async function getAddresses() {
  return await apiGet("getAddresses");
}

export async function addAddress(addressData) {
  return await apiPost("addAddress", addressData);
}

export async function updateAddress(addressData) {
  return await apiPost("updateAddress", addressData);
}

export async function deleteAddress({ addressId }) {
  return await apiPost("deleteAddress", { addressId });
}

// ============================================================
// REVIEW SERVICES — ENHANCED
// ============================================================

/**
 * Get all reviews for a specific product (public — no auth needed).
 */
export async function getReviews({ productId }) {
  return await apiGet("getReviews", { productId });
}

/**
 * Get all reviews written by the logged-in user.
 */
export async function getUserReviews() {
  return await apiGet("getUserReviews");
}

/**
 * Submit a new review for a product.
 */
export async function submitReview({ productId, rating, review, productName }) {
  // Pass the product name so the "Thank You for Your Review" email and the
  // admin dashboard can display which product was reviewed.
  const info = _productInfo(productId);
  return await apiPost("submitReview", {
    productId,
    rating,
    review,
    productName: productName || (info ? info.productName : ""),
  });
}

/**
 * Update an existing review (if user already reviewed this product).
 */
export async function updateReview({ reviewId, rating, review }) {
  return await apiPost("updateReview", { reviewId, rating, review });
}

/**
 * Get review statistics for a product: avgRating, totalCount, breakdown per star.
 */
export async function getProductReviewStats({ productId }) {
  return await apiGet("getProductReviewStats", { productId });
}

/**
 * Get all products the user has purchased (from OrderItems joined with Orders).
 */
export async function getPurchasedProducts() {
  return await apiGet("getPurchasedProducts");
}