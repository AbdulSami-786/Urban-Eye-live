import { useEffect } from "react";

const SITE_NAME = "Urban Eye";
const DEFAULT_DESCRIPTION =
  "Urban Eye is Karachi's destination for iconic eyewear since 2015. Browse curated eyeglasses, sunglasses & custom-made tints, with expert fitting and free shipping across Pakistan.";

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

// Updates the document <title> and description/robots <meta> tags for the
// active route. Plain SPAs like this one have no server-side render step, so
// this only affects the browser tab + any crawler that executes JS against
// the specific URL it was given — it does not, by itself, make hash routes
// (#/products etc.) show up as separate Google results.
export function useDocumentHead({ title, description = DEFAULT_DESCRIPTION, noindex = false }) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, follow" : "index, follow");
  }, [title, description, noindex]);
}
