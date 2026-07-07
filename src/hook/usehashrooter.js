// import { useState, useEffect, useCallback } from "react";

// export function useHashRouter() {
//   const [hash, setHash] = useState(window.location.hash || "#/");
  
//   useEffect(() => {
//     const fn = () => setHash(window.location.hash || "#/");
//     window.addEventListener("hashchange", fn);
//     return () => window.removeEventListener("hashchange", fn);
//   }, []);
  
//   const navigate = useCallback(path => { 
//     window.location.hash = path; 
//     window.scrollTo(0,0); 
//   }, []);

//   let route = "home"; 
//   let productId = null; 
//   let collectionSlug = null;
  
//   if (hash === "#/products") route = "products";
//   else if (hash === "#/cart") route = "cart";
//   else if (hash === "#/checkout") route = "checkout";
//   else if (hash === "#/order-success") route = "order-success";
//   else if (hash.startsWith("#/collections/")) { 
//     route = "collection"; 
//     collectionSlug = hash.replace("#/collections/", "").split("?")[0]; 
//   }
//   else if (hash.startsWith("#/products/")) { 
//     route = "product"; 
//     productId = hash.replace("#/products/", ""); 
//   }

//   return { route, productId, collectionSlug, navigate };
// }






























// // useHashRouter.js
// import { useState, useEffect, useCallback } from "react";

// export function useHashRouter() {
//   const [hash, setHash] = useState(window.location.hash || "#/");

//   useEffect(() => {
//     const fn = () => setHash(window.location.hash || "#/");
//     window.addEventListener("hashchange", fn);
//     return () => window.removeEventListener("hashchange", fn);
//   }, []);

//   const navigate = useCallback(path => {
//     window.location.hash = path;
//     window.scrollTo(0, 0);
//   }, []);

//   let route = "home";
//   let productId = null;
//   let collectionSlug = null;
//   let reviewProductId = null;
//   let reviewId = null;

//   // Route detection
//   if (hash === "#/") route = "home";
//   else if (hash === "#/products") route = "products";
//   else if (hash === "#/cart") route = "cart";
//   else if (hash === "#/checkout") route = "checkout";
//   else if (hash === "#/order-success") route = "order-success";
//   else if (hash === "#/collections") route = "collections-landing";
//   else if (hash === "#/story") route = "story";
//   else if (hash === "#/stores") route = "stores";
//   else if (hash === "#/wishlist") route = "wishlist";
//   else if (hash.startsWith("#/dashboard")) route = "dashboard";
//   else if (hash.startsWith("#/review/")) {
//     // Format: #/review/:productId or #/review/:productId?reviewId=xxx
//     route = "review";
//     const rawPath = hash.replace("#/review/", "");
//     const [pathPart, queryPart] = rawPath.split("?");
//     reviewProductId = pathPart;
//     if (queryPart) {
//       const qp = new URLSearchParams(queryPart);
//       reviewId = qp.get("reviewId") || null;
//     }
//   }
//   else if (hash.startsWith("#/collections/")) {
//     route = "collection";
//     collectionSlug = hash.replace("#/collections/", "").split("?")[0];
//   }
//   else if (hash.startsWith("#/products/")) {
//     route = "product";
//     productId = hash.replace("#/products/", "");
//   }

//   return { route, productId, collectionSlug, reviewProductId, reviewId, navigate };
// }




















// useHashRouter.js
import { useState, useEffect, useCallback } from "react";

export function useHashRouter() {
  const [hash, setHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const fn = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  const navigate = useCallback(path => {
    window.location.hash = path;
    window.scrollTo(0, 0);
  }, []);

  let route = "home";
  let productId = null;
  let collectionSlug = null;
  let reviewProductId = null;
  let reviewId = null;
  let queryParams = {}; // ← NEW: holds parsed ?key=value pairs

  // Split hash into path + query once, up front
  const [rawHash, rawQuery] = hash.split("?");

  if (rawQuery) {
    const qp = new URLSearchParams(rawQuery);
    for (const [key, value] of qp.entries()) {
      queryParams[key] = value;
    }
  }

  // Route detection (uses rawHash so query strings don't break matching)
  if (rawHash === "#/") route = "home";
  else if (rawHash === "#/products") route = "products";
  else if (rawHash === "#/cart") route = "cart";
  else if (rawHash === "#/checkout") route = "checkout";
  else if (rawHash === "#/order-success") route = "order-success";
  else if (rawHash === "#/collections") route = "collections-landing";
  else if (rawHash === "#/story") route = "story";
  else if (rawHash === "#/stores") route = "stores";
  else if (rawHash === "#/wishlist") route = "wishlist";
  else if (rawHash.startsWith("#/dashboard")) route = "dashboard";
  else if (rawHash.startsWith("#/review/")) {
    // Format: #/review/:productId or #/review/:productId?reviewId=xxx
    route = "review";
    const pathPart = rawHash.replace("#/review/", "");
    reviewProductId = pathPart;
    reviewId = queryParams.reviewId || null;
  }
  else if (rawHash.startsWith("#/collections/")) {
    route = "collection";
    collectionSlug = rawHash.replace("#/collections/", "");
  }
  else if (rawHash.startsWith("#/products/")) {
    route = "product";
    productId = rawHash.replace("#/products/", "");
  }

  return { route, productId, collectionSlug, reviewProductId, reviewId, queryParams, navigate };
}