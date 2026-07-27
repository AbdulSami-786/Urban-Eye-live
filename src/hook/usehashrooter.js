// usehashrooter.js
//
// Despite the filename, this now drives real path-based routing
// (history.pushState) instead of #-fragment routing, so that /products,
// /collections/:slug, /products/:id etc. are real, distinct URLs that
// Google can crawl and index individually — the old #/ scheme meant every
// route resolved to the exact same URL as far as search engines were
// concerned, so only the homepage could ever appear in search results.
//
// `navigate()` still accepts legacy "#/products"-style arguments (there are
// many call sites across the app) by stripping a leading "#" — so existing
// navigate("#/...")/goTo("#/...") calls keep working unchanged. Anchor tags
// using a literal href="#/..." do need their href updated to "/..." though,
// since a real "#/..." href is just a same-page fragment link to a browser
// and never reaches this router at all.
import { useState, useEffect, useCallback } from "react";

const LOCATION_CHANGE_EVENT = "urbaneye:locationchange";

function getCurrentPath() {
  return window.location.pathname + window.location.search;
}

function normalizePath(to) {
  let target = String(to ?? "/");
  if (target.startsWith("#")) target = target.slice(1);
  if (!target.startsWith("/")) target = `/${target}`;
  return target;
}

export function useHashRouter() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const onLocationChange = () => setPath(getCurrentPath());
    window.addEventListener("popstate", onLocationChange);
    window.addEventListener(LOCATION_CHANGE_EVENT, onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener(LOCATION_CHANGE_EVENT, onLocationChange);
    };
  }, []);

  const navigate = useCallback((to) => {
    const target = normalizePath(to);
    if (target !== getCurrentPath()) {
      window.history.pushState(null, "", target);
      window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
    }
    window.scrollTo(0, 0);
  }, []);

  // Catches clicks on same-origin <a href="/..."> tags that have no onClick
  // of their own (e.g. the logo, plain nav links) so they route through
  // pushState instead of falling through to a full page load / 404. Anchors
  // that already call preventDefault() in their own onClick (e.g. product
  // cards) are left alone.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target.closest("a[href]");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;
      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(url.pathname + url.search);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  let route = "home";
  let productId = null;
  let collectionSlug = null;
  let reviewProductId = null;
  let reviewId = null;
  let queryParams = {};

  const [rawPath, rawQuery] = path.split("?");

  if (rawQuery) {
    const qp = new URLSearchParams(rawQuery);
    for (const [key, value] of qp.entries()) {
      queryParams[key] = value;
    }
  }

  if (rawPath === "/") route = "home";
  else if (rawPath === "/products") route = "products";
  else if (rawPath === "/cart") route = "cart";
  else if (rawPath === "/checkout") route = "checkout";
  else if (rawPath === "/order-success") route = "order-success";
  else if (rawPath === "/collections") route = "collections-landing";
  else if (rawPath === "/story") route = "story";
  else if (rawPath === "/stores") route = "stores";
  else if (rawPath === "/wishlist") route = "wishlist";
  else if (rawPath.startsWith("/dashboard")) route = "dashboard";
  else if (rawPath.startsWith("/review/")) {
    route = "review";
    reviewProductId = rawPath.replace("/review/", "");
    reviewId = queryParams.reviewId || null;
  }
  else if (rawPath.startsWith("/collections/")) {
    route = "collection";
    collectionSlug = rawPath.replace("/collections/", "");
  }
  else if (rawPath.startsWith("/products/")) {
    route = "product";
    productId = rawPath.replace("/products/", "");
  }

  return { route, productId, collectionSlug, reviewProductId, reviewId, queryParams, navigate };
}
