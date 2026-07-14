export function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ");
}

export function normalizeCategory(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "Eyeglasses";
  const lower = normalized.toLowerCase();
  if (lower === "optical" || lower === "eyeglass" || lower === "eyeglasses") return "Eyeglasses";
  if (lower === "sunglass" || lower === "sunglasses" || lower === "sun glasses") return "Sunglasses";
  return normalized;
}

export function normalizeGender(value) {
  const lower = String(value ?? "").trim().toLowerCase();
  if (!lower) return "Unisex";
  if (lower === "unisex" || lower === "both") return "Unisex";
  // Data uses messy values: "Men", "Mens", "Women", "Womens", "Men/Women",
  // "Mens/Women", etc. Detect each gender token, then decide.
  const hasWomen = /wom[ae]ns?/.test(lower);
  // Strip women tokens first so "women" doesn't count as containing "men".
  const hasMen = /mens?/.test(lower.replace(/wom[ae]ns?/g, ""));
  if (hasMen && hasWomen) return "Unisex";
  if (hasWomen) return "Women";
  if (hasMen) return "Men";
  return value || "Unisex";
}

export function getProductVariants(product) {
  if (Array.isArray(product?.colors) && product.colors.length) return product.colors;
  if (product?.color) {
    return [{ name: product.color, swatch: null, image: product.image, gallery: product.gallery || [product.image] }];
  }
  return [];
}

export function getProductDisplayPrice(product) {
  const price = Number(product?.price) || 0;
  const discountPrice = Number(product?.discountPrice) || price;
  return { price, discountPrice };
}

export function getProductDiscountPercent(product) {
  const { price, discountPrice } = getProductDisplayPrice(product);
  return price > discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;
}

export function formatPriceValue(value) {
  const numericValue = Number(value) || 0;
  return numericValue.toLocaleString();
}

export function getProductDisplayImage(product, selectedVariantName) {
  const variants = getProductVariants(product);
  const selectedVariant = variants.find((variant) => normalizeText(variant.name) === normalizeText(selectedVariantName)) || variants[0] || null;
  const galleryImages = selectedVariant?.gallery?.length
    ? selectedVariant.gallery
    : (product?.gallery?.length ? product.gallery : (selectedVariant?.image ? [selectedVariant.image] : []));
  return {
    selectedVariant,
    galleryImages,
    displayImage: galleryImages[0] || selectedVariant?.image || product?.image || "",
    displayLabel: selectedVariant?.name || product?.color || "Default",
  };
}

export function getProductColorOptions(products) {
  return [...new Set(products.flatMap((product) => getProductVariants(product).map((variant) => variant.name)).filter(Boolean))].sort();
}

export function getProductBrandOptions(products) {
  return [...new Set(products.map((product) => product.brand).filter(Boolean))].sort();
}

export function getProductSizeOptions(products) {
  return [...new Set(products.flatMap((product) => product.sizes || []).filter(Boolean))].sort();
}

export function sortProducts(products, sort = "featured") {
  const list = [...products];
  switch (sort) {
    case "alphaAZ":
      return list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    case "alphaZA":
      return list.sort((a, b) => String(b.name || "").localeCompare(String(a.name || "")));
    case "priceLow":
      return list.sort((a, b) => getProductDisplayPrice(a).discountPrice - getProductDisplayPrice(b).discountPrice);
    case "priceHigh":
      return list.sort((a, b) => getProductDisplayPrice(b).discountPrice - getProductDisplayPrice(a).discountPrice);
    case "highestRated":
      return list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    case "bestSelling":
      return list.sort((a, b) => {
        const aBest = String(a.tag || "").toLowerCase().includes("best") ? 1 : 0;
        const bBest = String(b.tag || "").toLowerCase().includes("best") ? 1 : 0;
        return bBest - aBest;
      });
    case "dateNew":
      return list.reverse();
    case "dateOld":
      return list;
    case "newest":
      return list.sort((a, b) => {
        const aNew = String(a.tag || "").toLowerCase().includes("new") ? 1 : 0;
        const bNew = String(b.tag || "").toLowerCase().includes("new") ? 1 : 0;
        return bNew - aNew;
      });
    default:
      return list;
  }
}

export function applyProductFilters(products, activeFilters = {}, sort = "featured", searchTerm = "") {
  let list = [...products];
  const search = normalizeText(searchTerm);

  if (search) {
    list = list.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.shortDescription,
        product.description,
        product.brand,
        product.subcategory,
        product.gender,
        ...(product.keywords || []),
      ]
        .filter(Boolean)
        .join(" ");
      return normalizeText(haystack).includes(search);
    });
  }

  const categoryFilters = activeFilters.category || [];
  if (categoryFilters.length) {
    list = list.filter((product) => categoryFilters.includes(normalizeCategory(product.category)));
  }

  const shapeFilters = activeFilters.shape || [];
  if (shapeFilters.length) {
    list = list.filter((product) => shapeFilters.includes(product.subcategory));
  }

  const genderFilters = activeFilters.gender || [];
  if (genderFilters.length) {
    list = list.filter((product) => {
      const gender = normalizeGender(product.gender);
      // Unisex frames belong in both Men's and Women's results.
      return gender === "Unisex" || genderFilters.includes(gender);
    });
  }

  const colorFilters = activeFilters.color || [];
  if (colorFilters.length) {
    list = list.filter((product) => getProductVariants(product).some((variant) => colorFilters.includes(variant.name)));
  }

  const brandFilters = activeFilters.brand || [];
  if (brandFilters.length) {
    list = list.filter((product) => brandFilters.includes(product.brand));
  }

  const ratingFilters = activeFilters.rating || [];
  if (ratingFilters.length) {
    list = list.filter((product) => {
      const rating = Number(product.rating) || 4.5;
      return ratingFilters.some((filter) => {
        if (filter === "4plus") return rating >= 4;
        if (filter === "4.5plus") return rating >= 4.5;
        if (filter === "5") return rating >= 5;
        return false;
      });
    });
  }

  const sizeFilters = activeFilters.size || [];
  if (sizeFilters.length) {
    list = list.filter((product) => (product.sizes || []).some((size) => sizeFilters.includes(size)));
  }

  const availabilityFilters = activeFilters.availability || [];
  if (availabilityFilters.length) {
    list = list.filter((product) => {
      const availability = String(product.availability || "In stock").toLowerCase();
      return availabilityFilters.some((filter) => availability.includes(filter.toLowerCase()));
    });
  }

  const priceFilters = activeFilters.price || [];
  if (priceFilters.length) {
    list = list.filter((product) => {
      const price = getProductDisplayPrice(product).discountPrice;
      return priceFilters.some((filter) => {
        if (filter === "under20") return price < 20000;
        if (filter === "20to30") return price >= 20000 && price <= 30000;
        if (filter === "above30") return price > 30000;
        return false;
      });
    });
  }

  return sortProducts(list, sort);
}

export function getRelatedProducts(products, currentProduct) {
  if (!currentProduct) return [];
  const sameCategory = products.filter((product) => normalizeCategory(product.category) === normalizeCategory(currentProduct.category) && product.id !== currentProduct.id);
  if (sameCategory.length) return sameCategory.slice(0, 3);
  return products.filter((product) => product.id !== currentProduct.id).slice(0, 3);
}

// ─────────────────────────────────────────────
// SEARCH — free-text + price-aware product matching
// (shared by the navbar search box and the Products page)
// ─────────────────────────────────────────────

// Turn a raw token into a number. Supports thousands separators and the "k"
// shorthand: "8000", "8,000" and "8k" all resolve to 8000.
export function parsePriceToken(raw) {
  if (raw == null) return null;
  const m = String(raw).replace(/[, ]/g, "").match(/^(\d+(?:\.\d+)?)(k)?$/i);
  if (!m) return null;
  let n = parseFloat(m[1]);
  if (m[2]) n *= 1000;
  return Number.isFinite(n) ? n : null;
}

// Detect price intent inside a search term. Returns null when the term carries
// no numeric meaning, otherwise a descriptor consumed by matchesPriceQuery().
// Understands: "under 8000", "above 20k", "8000-12000", "8k to 12k", "8000".
export function parsePriceQuery(term) {
  if (!term) return null;
  const t = String(term).toLowerCase().trim();
  const P = "(?:pkr|rs\\.?)?\\s*";
  const N = "([\\d.,]+k?)";

  let m = t.match(new RegExp(`(?:under|below|less than|upto|up to|max|<=?)\\s*${P}${N}`));
  if (m) { const n = parsePriceToken(m[1]); if (n != null) return { type: "max", max: n }; }

  m = t.match(new RegExp(`(?:above|over|more than|from|min|>=?)\\s*${P}${N}`));
  if (m) { const n = parsePriceToken(m[1]); if (n != null) return { type: "min", min: n }; }

  m = t.match(new RegExp(`${P}${N}\\s*(?:-|–|to|and)\\s*${P}${N}`));
  if (m) {
    const a = parsePriceToken(m[1]); const b = parsePriceToken(m[2]);
    if (a != null && b != null) return { type: "range", min: Math.min(a, b), max: Math.max(a, b) };
  }

  m = t.match(new RegExp(`^${P}${N}$`));
  if (m) { const n = parsePriceToken(m[1]); if (n != null) return { type: "approx", value: n }; }

  return null;
}

// Does a product's price (or discounted price) satisfy the parsed price query?
export function matchesPriceQuery(product, pq) {
  if (!pq) return false;
  const { price, discountPrice } = getProductDisplayPrice(product);
  const values = [price, discountPrice].filter((v) => v > 0);
  if (!values.length) return false;
  return values.some((v) => {
    if (pq.type === "max")   return v <= pq.max;
    if (pq.type === "min")   return v >= pq.min;
    if (pq.type === "range") return v >= pq.min && v <= pq.max;
    if (pq.type === "approx") {
      // Match when the price is within ±15% of the typed number, or when the
      // typed digits (3+) literally appear in the price (e.g. "800" → 8000).
      const tol = Math.max(500, pq.value * 0.15);
      const digits = String(Math.round(pq.value));
      const substrMatch = digits.length >= 3 && String(v).includes(digits);
      return Math.abs(v - pq.value) <= tol || substrMatch;
    }
    return false;
  });
}

// Does a product match a free-text / price search term?
export function matchesSearchTerm(product, term) {
  if (!product) return false;
  const t = String(term ?? "").toLowerCase().trim();
  if (!t) return true;
  const textMatch =
    (product.name && product.name.toLowerCase().includes(t)) ||
    (product.category && product.category.toLowerCase().includes(t)) ||
    (product.subcategory && product.subcategory.toLowerCase().includes(t)) ||
    (product.gender && product.gender.toLowerCase().includes(t)) ||
    (product.tag && product.tag.toLowerCase().includes(t)) ||
    (product.color && product.color.toLowerCase().includes(t)) ||
    (Array.isArray(product.colors) && product.colors.some((c) => c.name && c.name.toLowerCase().includes(t)));
  return textMatch || matchesPriceQuery(product, parsePriceQuery(t));
}

// Filter a product list by a search term. `limit > 0` caps the result count
// (handy for a suggestions dropdown).
export function searchProducts(products, term, limit = 0) {
  const t = String(term ?? "").trim();
  if (!t) return [];
  const results = (products || []).filter((product) => matchesSearchTerm(product, t));
  return limit > 0 ? results.slice(0, limit) : results;
}
