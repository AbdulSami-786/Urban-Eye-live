import { useEffect } from "react";

const SITE_NAME = "Urban Eye";
const SITE_ORIGIN = "https://www.urbaneye.com.pk";
const DEFAULT_DESCRIPTION =
  "Urban Eye is Karachi's destination for iconic eyewear since 1999. Browse curated eyeglasses, sunglasses & custom-made tints, with expert fitting and free shipping across Pakistan.";

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

// Updates the document <title>, description/robots <meta>, canonical <link>
// and OG/Twitter tags for the active route. Now that routing uses real paths
// (see hook/usehashrooter.js) instead of #-fragments, each route gets its own
// canonical URL — worthwhile for any crawler that fetches that specific path
// directly (e.g. via the sitemap), even though this is still a client-only
// SPA with no server-side render.
export function useDocumentHead({ title, description = DEFAULT_DESCRIPTION, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = `${SITE_ORIGIN}${window.location.pathname}`;

    document.title = fullTitle;
    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, follow" : "index, follow");
    setCanonical(canonicalUrl);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
  }, [title, description, noindex]);
}
