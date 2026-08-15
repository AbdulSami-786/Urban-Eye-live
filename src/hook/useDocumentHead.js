import { useEffect } from "react";

const SITE_NAME = "Urban Eye";
export const SITE_ORIGIN = "https://www.urbaneye.com.pk";
const DEFAULT_DESCRIPTION =
  "Urban Eye is Karachi's destination for iconic eyewear since 1999. Browse curated eyeglasses, sunglasses & custom-made tints, with expert fitting and free shipping across Pakistan.";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/logo.jpeg`;

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

// Replaces every previously-injected structured-data tag with the ones for
// the current route. Cleared unconditionally (rather than diffed) so a page
// with no jsonLd (e.g. noindex pages) doesn't inherit stale schema left
// behind by whichever route rendered before it.
function setJsonLd(schemas) {
  document.head.querySelectorAll('script[data-jsonld]').forEach((el) => el.remove());
  (schemas || []).forEach(({ id, data }) => {
    if (!data) return;
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-jsonld", id);
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  });
}

// Updates the document <title>, description/robots <meta>, canonical <link>
// and OG/Twitter tags for the active route. Now that routing uses real paths
// (see hook/usehashrooter.js) instead of #-fragments, each route gets its own
// canonical URL — worthwhile for any crawler that fetches that specific path
// directly (e.g. via the sitemap), even though this is still a client-only
// SPA with no server-side render.
export function useDocumentHead({ title, description = DEFAULT_DESCRIPTION, noindex = false, image, jsonLd }) {
  // jsonLd may be a single {id, data} schema or an array of them; normalize
  // to an array of "stringified data" so the effect only re-runs when the
  // actual schema content changes, not on every render's new object identity.
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const jsonLdKey = schemas.map((s) => `${s.id}:${JSON.stringify(s.data)}`).join("|");

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = `${SITE_ORIGIN}${window.location.pathname}`;
    const imageUrl = image ? (image.startsWith("http") ? image : `${SITE_ORIGIN}${image}`) : DEFAULT_IMAGE;

    document.title = fullTitle;
    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, follow" : "index, follow");
    setCanonical(canonicalUrl);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", imageUrl, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);
    setJsonLd(schemas);
  }, [title, description, noindex, image, jsonLdKey]);
}
