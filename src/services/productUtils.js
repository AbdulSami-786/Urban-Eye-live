export function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ");
}

export function normalizeCategory(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "Eyeglasses";
  if (normalized.toLowerCase() === "optical") return "Eyeglasses";
  return normalized;
}

export function normalizeGender(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "men") return "Men";
  if (normalized === "women" || normalized === "woman" || normalized === "female") return "Women";
  if (normalized === "men/women" || normalized === "unisex" || normalized === "both") return "Unisex";
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
    list = list.filter((product) => genderFilters.includes(normalizeGender(product.gender)));
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
