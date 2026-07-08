// // // // COLORS & FONTS
// // // export const YELLOW = "#F5C800";
// // // export const BLACK  = "#0A0A0A";
// // // export const CREAM  = "#F5F0E8";
// // // export const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
// // // export const mono   = "'Courier New', Courier, monospace";

// // // // COLLECTIONS
// // // export const COLLECTIONS = {
// // //   "eyeglasses": { title: "EYEGLASSES", desc: "MOSCOT combines over 100 years of eyewear expertise.", filter: p => p.category === "Eyeglasses" },
// // //   "sunglasses": { title: "SUNGLASSES", desc: "All of our sunglasses reflect rich heritage.", filter: p => p.category === "Sunglasses" },
// // //   "mens-eyeglasses": { title: "MEN'S EYEGLASSES", desc: "Timeless frames for the modern gentleman.", filter: p => p.category === "Eyeglasses" && (p.gender === "Men" || p.gender === "Unisex") },
// // //   "womens-eyeglasses": { title: "WOMEN'S EYEGLASSES", desc: "Refined, bold, and beautifully crafted.", filter: p => p.category === "Eyeglasses" && (p.gender === "Women" || p.gender === "Unisex") },
// // //   "mens-sunglasses": { title: "MEN'S SUNGLASSES", desc: "UV protection meets effortless cool.", filter: p => p.category === "Sunglasses" && (p.gender === "Men" || p.gender === "Unisex") },
// // //   "womens-sunglasses": { title: "WOMEN'S SUNGLASSES", desc: "From oversized cat-eyes to sleek aviators.", filter: p => p.category === "Sunglasses" && (p.gender === "Women" || p.gender === "Unisex") },
// // //   "best-selling-eyeglasses": { title: "BEST SELLERS — EYEGLASSES", desc: "The frames everyone is wearing.", filter: p => p.category === "Eyeglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
// // //   "best-selling-sunglasses": { title: "BEST SELLERS — SUNGLASSES", desc: "Sun protection, elevated.", filter: p => p.category === "Sunglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
// // //   "new-eyeglasses-sunglasses": { title: "NEW ARRIVALS", desc: "Fresh off the bench.", filter: p => p.tag === "NEW" },
// // //   "family-favorites": { title: "BEST SELLERS", desc: "Eye-conic frames chosen by the community.", filter: p => p.tag === "BEST SELLER" || p.tag === "ICONIC" },
// // //   "round-eyeglasses": { title: "ROUND EYEGLASSES", desc: "The shape that defined a generation.", filter: p => p.subcategory === "Round" && p.category === "Eyeglasses" },
// // //   "square-eyeglasses": { title: "SQUARE EYEGLASSES", desc: "Bold geometry. Sharp lines.", filter: p => p.subcategory === "Square" && p.category === "Eyeglasses" },
// // //   "aviator-sunglasses": { title: "AVIATOR SUNGLASSES", desc: "Heritage aviation style, reborn.", filter: p => p.subcategory === "Aviator" },
// // //   "cateye-eyeglasses-sunglasses": { title: "CAT-EYE FRAMES", desc: "Old Hollywood glamour meets downtown cool.", filter: p => p.subcategory === "Cat-Eye" },
// // //   "black-eyeglasses": { title: "BLACK FRAMES", desc: "Classic. Timeless.", filter: p => p.color?.toLowerCase().includes("black") },
// // //   "tortoise-shell-eyeglasses": { title: "TORTOISE FRAMES", desc: "Warm tones, rich character.", filter: p => p.color?.toLowerCase().includes("tortoise") },
// // //   "polarized-sunglasses": { title: "POLARIZED SUNGLASSES", desc: "Cut the glare.", filter: p => p.category === "Sunglasses" },
// // //   "custom-made-tints": { title: "CUSTOM MADE TINTS™", desc: "20+ hand-applied tints.", filter: p => p.category === "Sunglasses" },
// // //   "default": { title: "ALL FRAMES", desc: "Every frame. Handpicked.", filter: () => true },
// // // };

// // // // FILTERS
// // // export const FILTER_GROUPS = [
// // //   { key: "category", label: "FRAME TYPE", options: ["Eyeglasses", "Sunglasses"] },
// // //   { key: "gender", label: "GENDER", options: ["Men", "Women", "Unisex"] },
// // //   { key: "shape", label: "FRAME SHAPE", options: ["Round", "Square", "Aviator", "Cat-Eye", "Geometric", "Browline"] },
// // //   { key: "color", label: "COLOR", options: ["Black", "Tortoise", "Crystal", "Amber", "Cobalt", "Olive", "Lavender", "Wine", "Rose Gold", "Ivory"] },
// // //   { key: "price", label: "PRICE", options: ["Under PKR 20K", "PKR 20K–30K", "Above PKR 30K"] },
// // // ];

// // // export const SORT_OPTS = [
// // //   { label: "FEATURED", key: "featured" },
// // //   { label: "PRICE: LOW–HIGH", key: "priceAsc" },
// // //   { label: "PRICE: HIGH–LOW", key: "priceDesc" },
// // //   { label: "DISCOUNT %", key: "discount" },
// // //   { label: "NEWEST", key: "newest" },
// // // ];

// // // // HOME PAGE DATA
// // // export const HERO_SLIDES = [
// // //   { bg: "#F5F0E8", label: "SPRING 2026 — NEW ARRIVALS", heading: "THE LEMTOSH", sub: "The frame that started it all.", cta: "SHOP NEW ARRIVALS", ctaSecond: "VIRTUAL TRY-ON", shape: "round" },
// // //   { bg: "#0A0A0A", label: "CUSTOM MADE TINTS™", heading: "20+ SHADES.\nONE FRAME.", sub: "Hand-tinted by our opticians.", cta: "SHOP CUSTOM TINTS", ctaSecond: "LEARN MORE", shape: "cateye", dark: true },
// // //   { bg: "#1a1a1a", label: "EYE-CONIC BEST SELLERS", heading: "CLASSICS\nNEVER FADE.", sub: "Frames that defined generations.", cta: "SHOP BEST SELLERS", ctaSecond: "OUR STORY", shape: "square", dark: true },
// // // ];

// // // export const HOME_PRODUCTS = [
// // //   { name: "LEMTOSH", article: "The", type: "Eyeglasses", price: "PKR 24,500", tag: "BEST SELLER", shape: "round", tints: ["#2a1a0a", "#5c3d1e", "#1a1a1a", "#8B7355"], id: "lemtosh-matte-black" },
// // //   { name: "MILTZEN", article: "The", type: "Eyeglasses", price: "PKR 19,800", tag: "NEW", shape: "square", tints: ["#0a0a0a", "#4a3728", "#c9a96e", "#1a2a1a"], id: "miltzen-tortoise" },
// // //   { name: "ZOLMAN", article: "The", type: "Sunglasses", price: "PKR 28,900", tag: "ICONIC", shape: "aviator", tints: ["#2a2a2a", "#6b4423", "#1a1a2a", "#3d3d3d"], id: "zolman-smoke" },
// // //   { name: "AIDANNS", article: "The", type: "Sunglasses", price: "PKR 22,400", tag: "NEW", shape: "round", tints: ["#1a1a1a", "#8B7355", "#4a6b4a", "#2a1a3d"], id: "aidanns-amber" },
// // //   { name: "SPINA", article: "The", type: "Eyeglasses", price: "PKR 17,600", tag: null, shape: "square", tints: ["#c9a96e", "#0a0a0a", "#3d2a1a", "#4a4a4a"], id: "spina-crystal" },
// // //   { name: "FRANKIE", article: "The", type: "Sunglasses", price: "PKR 31,200", tag: "LIMITED", shape: "cateye", tints: ["#1a0a0a", "#6b1a1a", "#0a1a0a", "#1a1a2a"], id: "frankie-wine" },
// // //   { name: "GRUNYA", article: "The", type: "Eyeglasses", price: "PKR 16,800", tag: null, shape: "round", tints: ["#2a1a1a", "#c9a96e", "#1a2a2a", "#3d3d2a"], id: "grunya-ivory" },
// // //   { name: "NASH", article: "The", type: "Sunglasses", price: "PKR 26,500", tag: "BEST SELLER", shape: "square", tints: ["#0a0a0a", "#5c4a2a", "#1a3d1a", "#2a2a3d"], id: "nash-black" },
// // // ];

// // // export const TINTS = [
// // //   { name: "AMBER", color: "#C9A96E" }, { name: "SMOKE", color: "#666" }, { name: "OLIVE", color: "#6B7C4A" },
// // //   { name: "BLUSH", color: "#D4908A" }, { name: "COBALT", color: "#3A6BAD" }, { name: "FOREST", color: "#2D5A3D" },
// // //   { name: "LAVENDER", color: "#8B7BAD" }, { name: "WINE", color: "#722F37" },
// // // ];

// // // export const TESTIMONIALS = [
// // //   { name: "Aisha R.", city: "Karachi", text: "The LEMTOSH is everything. Perfect fit, incredible quality.", rating: 5 },
// // //   { name: "Omar K.", city: "Lahore", text: "Skeptical about buying glasses online but the virtual try-on made it simple.", rating: 5 },
// // //   { name: "Sara M.", city: "Islamabad", text: "The custom tints are unreal — I got amber on a round frame.", rating: 5 },
// // //   { name: "Bilal H.", city: "Karachi", text: "Exceptional service. These glasses are art.", rating: 5 },
// // // ];

// // // export const PROCESS_STEPS = [
// // //   { num: "01", title: "SHOP THE COLLECTION", desc: "Browse 150+ curated frames." },
// // //   { num: "02", title: "VIRTUAL TRY-ON", desc: "See how each frame looks on your face." },
// // //   { num: "03", title: "ENTER PRESCRIPTION", desc: "Securely upload your Rx." },
// // //   { num: "04", title: "LENS CUSTOMISATION", desc: "Single vision, progressive, blue-light." },
// // //   { num: "05", title: "RECEIVE & ENJOY", desc: "Ships within 5–7 days." },
// // // ];

// // // export const CATEGORIES_HOME = [
// // //   { label: "Men's Eyeglasses", count: "48 styles", dark: false, shape: "square", slug: "mens-eyeglasses" },
// // //   { label: "Women's Eyeglasses", count: "52 styles", dark: true, shape: "cateye", slug: "womens-eyeglasses" },
// // //   { label: "Men's Sunglasses", count: "36 styles", dark: false, shape: "aviator", slug: "mens-sunglasses" },
// // //   { label: "Women's Sunglasses", count: "41 styles", dark: true, shape: "round", slug: "womens-sunglasses" },
// // // ];

// // // // TAG COLORS (FIXED - ADD THIS)
// // // export const tagColors = { 
// // //   "BEST SELLER": { bg: "#0A0A0A", color: "#fff" }, 
// // //   "NEW": { bg: "#F5C800", color: "#0A0A0A" }, 
// // //   "LIMITED": { bg: "#7c3aed", color: "#fff" }, 
// // //   "ICONIC": { bg: "#1a1a1a", color: "#F5C800" }, 
// // //   "PREMIUM": { bg: "#b45309", color: "#fff" } 
// // // };

// // // // UTILITY FUNCTIONS
// // // export function applyFilters(products, activeFilters, sort) {
// // //   let list = [...products];
// // //   if (activeFilters.category?.length) list = list.filter(p => activeFilters.category.includes(p.category));
// // //   if (activeFilters.gender?.length)   list = list.filter(p => activeFilters.gender.includes(p.gender));
// // //   if (activeFilters.shape?.length)    list = list.filter(p => activeFilters.shape.some(s => p.subcategory?.toLowerCase().includes(s.toLowerCase())));
// // //   if (activeFilters.color?.length)    list = list.filter(p => activeFilters.color.some(c => p.color?.toLowerCase().includes(c.toLowerCase())));
// // //   if (activeFilters.price?.length) {
// // //     list = list.filter(p => {
// // //       return activeFilters.price.some(pr => {
// // //         if (pr === "Under PKR 20K") return p.discountPrice < 20000;
// // //         if (pr === "PKR 20K–30K")   return p.discountPrice >= 20000 && p.discountPrice <= 30000;
// // //         if (pr === "Above PKR 30K") return p.discountPrice > 30000;
// // //         return true;
// // //       });
// // //     });
// // //   }
// // //   if (sort === "priceAsc")  list.sort((a,b) => a.discountPrice - b.discountPrice);
// // //   if (sort === "priceDesc") list.sort((a,b) => b.discountPrice - a.discountPrice);
// // //   if (sort === "discount")  list.sort((a,b) => (b.price - b.discountPrice) - (a.price - a.discountPrice));
// // //   if (sort === "newest")    list.sort((a,b) => (b.tag === "NEW" ? 1 : 0) - (a.tag === "NEW" ? 1 : 0));
// // //   return list;
// // // }






















// // // COLORS & FONTS
// // export const YELLOW = "#F5C800";
// // export const BLACK  = "#0A0A0A";
// // export const CREAM  = "#F5F0E8";
// // export const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
// // export const mono   = "'Courier New', Courier, monospace";

// // // COLLECTIONS
// // export const COLLECTIONS = {
// //   "eyeglasses": { title: "EYEGLASSES", desc: "MOSCOT combines over 100 years of eyewear expertise.", filter: p => p.category === "Eyeglasses" },
// //   "sunglasses": { title: "SUNGLASSES", desc: "All of our sunglasses reflect rich heritage.", filter: p => p.category === "Sunglasses" },
// //   "mens-eyeglasses": { title: "MEN'S EYEGLASSES", desc: "Timeless frames for the modern gentleman.", filter: p => p.category === "Eyeglasses" && (p.gender === "Men" || p.gender === "Unisex") },
// //   "womens-eyeglasses": { title: "WOMEN'S EYEGLASSES", desc: "Refined, bold, and beautifully crafted.", filter: p => p.category === "Eyeglasses" && (p.gender === "Women" || p.gender === "Unisex") },
// //   "mens-sunglasses": { title: "MEN'S SUNGLASSES", desc: "UV protection meets effortless cool.", filter: p => p.category === "Sunglasses" && (p.gender === "Men" || p.gender === "Unisex") },
// //   "womens-sunglasses": { title: "WOMEN'S SUNGLASSES", desc: "From oversized cat-eyes to sleek aviators.", filter: p => p.category === "Sunglasses" && (p.gender === "Women" || p.gender === "Unisex") },
// //   "best-selling-eyeglasses": { title: "BEST SELLERS — EYEGLASSES", desc: "The frames everyone is wearing.", filter: p => p.category === "Eyeglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
// //   "best-selling-sunglasses": { title: "BEST SELLERS — SUNGLASSES", desc: "Sun protection, elevated.", filter: p => p.category === "Sunglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
// //   "new-eyeglasses-sunglasses": { title: "NEW ARRIVALS", desc: "Fresh off the bench.", filter: p => p.tag === "NEW" },
// //   "family-favorites": { title: "BEST SELLERS", desc: "Eye-conic frames chosen by the community.", filter: p => p.tag === "BEST SELLER" || p.tag === "ICONIC" },
// //   "round-eyeglasses": { title: "ROUND EYEGLASSES", desc: "The shape that defined a generation.", filter: p => p.subcategory === "Round" && p.category === "Eyeglasses" },
// //   "square-eyeglasses": { title: "SQUARE EYEGLASSES", desc: "Bold geometry. Sharp lines.", filter: p => p.subcategory === "Square" && p.category === "Eyeglasses" },
// //   "aviator-sunglasses": { title: "AVIATOR SUNGLASSES", desc: "Heritage aviation style, reborn.", filter: p => p.subcategory === "Aviator" },
// //   "cateye-eyeglasses-sunglasses": { title: "CAT-EYE FRAMES", desc: "Old Hollywood glamour meets downtown cool.", filter: p => p.subcategory === "Cat-Eye" },
// //   "black-eyeglasses": { title: "BLACK FRAMES", desc: "Classic. Timeless.", filter: p => p.color?.toLowerCase().includes("black") },
// //   "tortoise-shell-eyeglasses": { title: "TORTOISE FRAMES", desc: "Warm tones, rich character.", filter: p => p.color?.toLowerCase().includes("tortoise") },
// //   "polarized-sunglasses": { title: "POLARIZED SUNGLASSES", desc: "Cut the glare.", filter: p => p.category === "Sunglasses" },
// //   "custom-made-tints": { title: "CUSTOM MADE TINTS™", desc: "20+ hand-applied tints.", filter: p => p.category === "Sunglasses" },
// //   "default": { title: "ALL FRAMES", desc: "Every frame. Handpicked.", filter: () => true },
// // };

// // // FILTERS
// // export const FILTER_GROUPS = [
// //   { key: "category", label: "FRAME TYPE", options: ["Eyeglasses", "Sunglasses"] },
// //   { key: "gender", label: "GENDER", options: ["Men", "Women", "Unisex"] },
// //   { key: "shape", label: "FRAME SHAPE", options: ["Round", "Square", "Aviator", "Cat-Eye", "Geometric", "Browline"] },
// //   { key: "color", label: "COLOR", options: ["Black", "Tortoise", "Crystal", "Amber", "Cobalt", "Olive", "Lavender", "Wine", "Rose Gold", "Ivory"] },
// //   { key: "price", label: "PRICE", options: ["Under PKR 20K", "PKR 20K–30K", "Above PKR 30K"] },
// // ];

// // export const SORT_OPTS = [
// //   { label: "FEATURED", key: "featured" },
// //   { label: "PRICE: LOW–HIGH", key: "priceAsc" },
// //   { label: "PRICE: HIGH–LOW", key: "priceDesc" },
// //   { label: "DISCOUNT %", key: "discount" },
// //   { label: "NEWEST", key: "newest" },
// // ];

// // // HOME PAGE DATA
// // export const HERO_SLIDES = [
// //   { bg: "#F5F0E8", label: "SPRING 2026 — NEW ARRIVALS", heading: "THE LEMTOSH", sub: "The frame that started it all.", cta: "SHOP NEW ARRIVALS", ctaSecond: "VIRTUAL TRY-ON", shape: "round", Image:".." },
// //   { bg: "#0A0A0A", label: "CUSTOM MADE TINTS™", heading: "20+ SHADES.\nONE FRAME.", sub: "Hand-tinted by our opticians.", cta: "SHOP CUSTOM TINTS", ctaSecond: "LEARN MORE", shape: "cateye", dark: true },
// //   { bg: "#1a1a1a", label: "EYE-CONIC BEST SELLERS", heading: "CLASSICS\nNEVER FADE.", sub: "Frames that defined generations.", cta: "SHOP BEST SELLERS", ctaSecond: "OUR STORY", shape: "square", dark: true },
// // ];

// // export const HOME_PRODUCTS = [
// //   { name: "LEMTOSH", article: "The", type: "Eyeglasses", price: "PKR 24,500", tag: "BEST SELLER", shape: "round", tints: ["#2a1a0a", "#5c3d1e", "#1a1a1a", "#8B7355"], id: "lemtosh-matte-black" },
// //   { name: "MILTZEN", article: "The", type: "Eyeglasses", price: "PKR 19,800", tag: "NEW", shape: "square", tints: ["#0a0a0a", "#4a3728", "#c9a96e", "#1a2a1a"], id: "miltzen-tortoise" },
// //   { name: "ZOLMAN", article: "The", type: "Sunglasses", price: "PKR 28,900", tag: "ICONIC", shape: "aviator", tints: ["#2a2a2a", "#6b4423", "#1a1a2a", "#3d3d3d"], id: "zolman-smoke" },
// //   { name: "AIDANNS", article: "The", type: "Sunglasses", price: "PKR 22,400", tag: "NEW", shape: "round", tints: ["#1a1a1a", "#8B7355", "#4a6b4a", "#2a1a3d"], id: "aidanns-amber" },
// //   { name: "SPINA", article: "The", type: "Eyeglasses", price: "PKR 17,600", tag: null, shape: "square", tints: ["#c9a96e", "#0a0a0a", "#3d2a1a", "#4a4a4a"], id: "spina-crystal" },
// //   { name: "FRANKIE", article: "The", type: "Sunglasses", price: "PKR 31,200", tag: "LIMITED", shape: "cateye", tints: ["#1a0a0a", "#6b1a1a", "#0a1a0a", "#1a1a2a"], id: "frankie-wine" },
// //   { name: "GRUNYA", article: "The", type: "Eyeglasses", price: "PKR 16,800", tag: null, shape: "round", tints: ["#2a1a1a", "#c9a96e", "#1a2a2a", "#3d3d2a"], id: "grunya-ivory" },
// //   { name: "NASH", article: "The", type: "Sunglasses", price: "PKR 26,500", tag: "BEST SELLER", shape: "square", tints: ["#0a0a0a", "#5c4a2a", "#1a3d1a", "#2a2a3d"], id: "nash-black" },
// // ];

// // export const TINTS = [
// //   { name: "AMBER", color: "#C9A96E" }, { name: "SMOKE", color: "#666" }, { name: "OLIVE", color: "#6B7C4A" },
// //   { name: "BLUSH", color: "#D4908A" }, { name: "COBALT", color: "#3A6BAD" }, { name: "FOREST", color: "#2D5A3D" },
// //   { name: "LAVENDER", color: "#8B7BAD" }, { name: "WINE", color: "#722F37" },
// // ];

// // export const TESTIMONIALS = [
// //   { name: "Aisha R.", city: "Karachi", text: "The LEMTOSH is everything. Perfect fit, incredible quality.", rating: 5 },
// //   { name: "Omar K.", city: "Lahore", text: "Skeptical about buying glasses online but the virtual try-on made it simple.", rating: 5 },
// //   { name: "Sara M.", city: "Islamabad", text: "The custom tints are unreal — I got amber on a round frame.", rating: 5 },
// //   { name: "Bilal H.", city: "Karachi", text: "Exceptional service. These glasses are art.", rating: 5 },
// // ];

// // export const PROCESS_STEPS = [
// //   { num: "01", title: "SHOP THE COLLECTION", desc: "Browse 150+ curated frames." },
// //   { num: "02", title: "VIRTUAL TRY-ON", desc: "See how each frame looks on your face." },
// //   { num: "03", title: "ENTER PRESCRIPTION", desc: "Securely upload your Rx." },
// //   { num: "04", title: "LENS CUSTOMISATION", desc: "Single vision, progressive, blue-light." },
// //   { num: "05", title: "RECEIVE & ENJOY", desc: "Ships within 5–7 days." },
// // ];

// // export const CATEGORIES_HOME = [
// //   { label: "Men's Eyeglasses", count: "48 styles", dark: false, shape: "square", slug: "mens-eyeglasses" },
// //   { label: "Women's Eyeglasses", count: "52 styles", dark: true, shape: "cateye", slug: "womens-eyeglasses" },
// //   { label: "Men's Sunglasses", count: "36 styles", dark: false, shape: "aviator", slug: "mens-sunglasses" },
// //   { label: "Women's Sunglasses", count: "41 styles", dark: true, shape: "round", slug: "womens-sunglasses" },
// // ];

// // // TAG COLORS (FIXED - ADD THIS)
// // export const tagColors = { 
// //   "BEST SELLER": { bg: "#0A0A0A", color: "#fff" }, 
// //   "NEW": { bg: "#F5C800", color: "#0A0A0A" }, 
// //   "LIMITED": { bg: "#7c3aed", color: "#fff" }, 
// //   "ICONIC": { bg: "#1a1a1a", color: "#F5C800" }, 
// //   "PREMIUM": { bg: "#b45309", color: "#fff" } 
// // };

// // // UTILITY FUNCTIONS
// // export function applyFilters(products, activeFilters, sort) {
// //   let list = [...products];
// //   if (activeFilters.category?.length) list = list.filter(p => activeFilters.category.includes(p.category));
// //   if (activeFilters.gender?.length)   list = list.filter(p => activeFilters.gender.includes(p.gender));
// //   if (activeFilters.shape?.length)    list = list.filter(p => activeFilters.shape.some(s => p.subcategory?.toLowerCase().includes(s.toLowerCase())));
// //   if (activeFilters.color?.length)    list = list.filter(p => activeFilters.color.some(c => p.color?.toLowerCase().includes(c.toLowerCase())));
// //   if (activeFilters.price?.length) {
// //     list = list.filter(p => {
// //       return activeFilters.price.some(pr => {
// //         if (pr === "Under PKR 20K") return p.discountPrice < 20000;
// //         if (pr === "PKR 20K–30K")   return p.discountPrice >= 20000 && p.discountPrice <= 30000;
// //         if (pr === "Above PKR 30K") return p.discountPrice > 30000;
// //         return true;
// //       });
// //     });
// //   }
// //   if (sort === "priceAsc")  list.sort((a,b) => a.discountPrice - b.discountPrice);
// //   if (sort === "priceDesc") list.sort((a,b) => b.discountPrice - a.discountPrice);
// //   if (sort === "discount")  list.sort((a,b) => (b.price - b.discountPrice) - (a.price - a.discountPrice));
// //   if (sort === "newest")    list.sort((a,b) => (b.tag === "NEW" ? 1 : 0) - (a.tag === "NEW" ? 1 : 0));
// //   return list;
// // }




































// // COLORS & FONTS
// export const YELLOW = "#F5C800";
// export const BLACK  = "#0A0A0A";
// export const CREAM  = "#F5F0E8";
// export const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
// export const mono   = "'Courier New', Courier, monospace";

// // COLLECTIONS
// export const COLLECTIONS = {
//   "eyeglasses": { title: "EYEGLASSES", desc: "MOSCOT combines over 100 years of eyewear expertise.", filter: p => p.category === "Eyeglasses" },
//   "sunglasses": { title: "SUNGLASSES", desc: "All of our sunglasses reflect rich heritage.", filter: p => p.category === "Sunglasses" },
//   "mens-eyeglasses": { title: "MEN'S EYEGLASSES", desc: "Timeless frames for the modern gentleman.", filter: p => p.category === "Eyeglasses" && (p.gender === "Men" || p.gender === "Unisex") },
//   "womens-eyeglasses": { title: "WOMEN'S EYEGLASSES", desc: "Refined, bold, and beautifully crafted.", filter: p => p.category === "Eyeglasses" && (p.gender === "Women" || p.gender === "Unisex") },
//   "mens-sunglasses": { title: "MEN'S SUNGLASSES", desc: "UV protection meets effortless cool.", filter: p => p.category === "Sunglasses" && (p.gender === "Men" || p.gender === "Unisex") },
//   "womens-sunglasses": { title: "WOMEN'S SUNGLASSES", desc: "From oversized cat-eyes to sleek aviators.", filter: p => p.category === "Sunglasses" && (p.gender === "Women" || p.gender === "Unisex") },
//   "best-selling-eyeglasses": { title: "BEST SELLERS — EYEGLASSES", desc: "The frames everyone is wearing.", filter: p => p.category === "Eyeglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
//   "best-selling-sunglasses": { title: "BEST SELLERS — SUNGLASSES", desc: "Sun protection, elevated.", filter: p => p.category === "Sunglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
//   "new-eyeglasses-sunglasses": { title: "NEW ARRIVALS", desc: "Fresh off the bench.", filter: p => p.tag === "NEW" },
//   "family-favorites": { title: "BEST SELLERS", desc: "Eye-conic frames chosen by the community.", filter: p => p.tag === "BEST SELLER" || p.tag === "ICONIC" },
//   "round-eyeglasses": { title: "ROUND EYEGLASSES", desc: "The shape that defined a generation.", filter: p => p.subcategory === "Round" && p.category === "Eyeglasses" },
//   "square-eyeglasses": { title: "SQUARE EYEGLASSES", desc: "Bold geometry. Sharp lines.", filter: p => p.subcategory === "Square" && p.category === "Eyeglasses" },
//   "aviator-sunglasses": { title: "AVIATOR SUNGLASSES", desc: "Heritage aviation style, reborn.", filter: p => p.subcategory === "Aviator" },
//   "cateye-eyeglasses-sunglasses": { title: "CAT-EYE FRAMES", desc: "Old Hollywood glamour meets downtown cool.", filter: p => p.subcategory === "Cat-Eye" },
//   "black-eyeglasses": { title: "BLACK FRAMES", desc: "Classic. Timeless.", filter: p => p.color?.toLowerCase().includes("black") },
//   "tortoise-shell-eyeglasses": { title: "TORTOISE FRAMES", desc: "Warm tones, rich character.", filter: p => p.color?.toLowerCase().includes("tortoise") },
//   "polarized-sunglasses": { title: "POLARIZED SUNGLASSES", desc: "Cut the glare.", filter: p => p.category === "Sunglasses" },
//   "custom-made-tints": { title: "CUSTOM MADE TINTS™", desc: "20+ hand-applied tints.", filter: p => p.category === "Sunglasses" },
//   "default": { title: "ALL FRAMES", desc: "Every frame. Handpicked.", filter: () => true },
// };

// // FILTERS
// export const FILTER_GROUPS = [
//   { key: "category", label: "FRAME TYPE", options: ["Eyeglasses", "Sunglasses"] },
//   { key: "gender", label: "GENDER", options: ["Men", "Women", "Unisex"] },
//   { key: "shape", label: "FRAME SHAPE", options: ["Round", "Square", "Aviator", "Cat-Eye", "Geometric", "Browline"] },
//   { key: "color", label: "COLOR", options: ["Black", "Tortoise", "Crystal", "Amber", "Cobalt", "Olive", "Lavender", "Wine", "Rose Gold", "Ivory"] },
//   { key: "price", label: "PRICE", options: ["Under PKR 20K", "PKR 20K–30K", "Above PKR 30K"] },
// ];

// export const SORT_OPTS = [
//   { label: "FEATURED", key: "featured" },
//   { label: "PRICE: LOW–HIGH", key: "priceAsc" },
//   { label: "PRICE: HIGH–LOW", key: "priceDesc" },
//   { label: "DISCOUNT %", key: "discount" },
//   { label: "NEWEST", key: "newest" },
// ];

// // // HOME PAGE DATA
// // export const HERO_SLIDES = [
// //   { bg: "#F5F0E8", label: "SPRING 2026 — NEW ARRIVALS", heading: "THE LEMTOSH", sub: "The frame that started it all.", cta: "SHOP NEW ARRIVALS", ctaSecond: "VIRTUAL TRY-ON", shape: "round", image: "./assets/DSC08310.jpg" },
// //   { bg: "#0A0A0A", label: "CUSTOM MADE TINTS™", heading: "20+ SHADES.\nONE FRAME.", sub: "Hand-tinted by our opticians.", cta: "SHOP CUSTOM TINTS", ctaSecond: "LEARN MORE", shape: "cateye", dark: true, image: "/assets/hero2.jpg" },
// //   { bg: "#1a1a1a", label: "EYE-CONIC BEST SELLERS", heading: "CLASSICS\nNEVER FADE.", sub: "Frames that defined generations.", cta: "SHOP BEST SELLERS", ctaSecond: "OUR STORY", shape: "square", dark: true, image: "/assets/hero3.jpg" },
// // ];




// // ============ HOME PAGE DATA ============
// export const HERO_SLIDES = [
//   {
//     image: "../banners/banner1.png`",  // ✅ imported image
//     label: "NEW ARRIVALS",
//     heading: "SEE THE\nDIFFERENCE",
//     sub: "Explore our latest collection.",
//     cta: "SHOP NOW",
//     ctaSecond: "LEARN MORE",
//     dark: false,      // light overlay ke liye
//     shape: "round",   // optional
//   },
//   {
//     image: "../banners/DSC08314.jpg",
//     label: "OUR COLLECTION",
//     heading: "STYLE THAT\nSPEAKS",
//     sub: "Handpicked frames for every look.",
//     cta: "SHOP NOW",
//     ctaSecond: "LEARN MORE",
//     dark: false,
//     shape: "round",
//   },
//   {
//     image:"../banners/DSC08347.jpg" ,
//     label: "LIMITED TIME",
//     heading: "FIND YOUR\nFRAME",
//     sub: "Quality eyewear, made for you.",
//     cta: "SHOP NOW",
//     ctaSecond: "LEARN MORE",
//     dark: true,       // dark overlay for better text readability
//     shape: "cateye",
//   },
// ];











// export const HOME_PRODUCTS = [
//   { name: "LEMTOSH", article: "The", type: "Eyeglasses", price: "PKR 24,500", tag: "BEST SELLER", shape: "round", tints: ["#2a1a0a", "#5c3d1e", "#1a1a1a", "#8B7355"], id: "lemtosh-matte-black" },
//   { name: "MILTZEN", article: "The", type: "Eyeglasses", price: "PKR 19,800", tag: "NEW", shape: "square", tints: ["#0a0a0a", "#4a3728", "#c9a96e", "#1a2a1a"], id: "miltzen-tortoise" },
//   { name: "ZOLMAN", article: "The", type: "Sunglasses", price: "PKR 28,900", tag: "ICONIC", shape: "aviator", tints: ["#2a2a2a", "#6b4423", "#1a1a2a", "#3d3d3d"], id: "zolman-smoke" },
//   { name: "AIDANNS", article: "The", type: "Sunglasses", price: "PKR 22,400", tag: "NEW", shape: "round", tints: ["#1a1a1a", "#8B7355", "#4a6b4a", "#2a1a3d"], id: "aidanns-amber" },
//   { name: "SPINA", article: "The", type: "Eyeglasses", price: "PKR 17,600", tag: null, shape: "square", tints: ["#c9a96e", "#0a0a0a", "#3d2a1a", "#4a4a4a"], id: "spina-crystal" },
//   { name: "FRANKIE", article: "The", type: "Sunglasses", price: "PKR 31,200", tag: "LIMITED", shape: "cateye", tints: ["#1a0a0a", "#6b1a1a", "#0a1a0a", "#1a1a2a"], id: "frankie-wine" },
//   { name: "GRUNYA", article: "The", type: "Eyeglasses", price: "PKR 16,800", tag: null, shape: "round", tints: ["#2a1a1a", "#c9a96e", "#1a2a2a", "#3d3d2a"], id: "grunya-ivory" },
//   { name: "NASH", article: "The", type: "Sunglasses", price: "PKR 26,500", tag: "BEST SELLER", shape: "square", tints: ["#0a0a0a", "#5c4a2a", "#1a3d1a", "#2a2a3d"], id: "nash-black" },
// ];

// export const TINTS = [
//   { name: "AMBER", color: "#C9A96E" }, { name: "SMOKE", color: "#666" }, { name: "OLIVE", color: "#6B7C4A" },
//   { name: "BLUSH", color: "#D4908A" }, { name: "COBALT", color: "#3A6BAD" }, { name: "FOREST", color: "#2D5A3D" },
//   { name: "LAVENDER", color: "#8B7BAD" }, { name: "WINE", color: "#722F37" },
// ];

// export const TESTIMONIALS = [
//   { name: "Aisha R.", city: "Karachi", text: "The LEMTOSH is everything. Perfect fit, incredible quality.", rating: 5 },
//   { name: "Omar K.", city: "Lahore", text: "Skeptical about buying glasses online but the virtual try-on made it simple.", rating: 5 },
//   { name: "Sara M.", city: "Islamabad", text: "The custom tints are unreal — I got amber on a round frame.", rating: 5 },
//   { name: "Bilal H.", city: "Karachi", text: "Exceptional service. These glasses are art.", rating: 5 },
// ];

// export const PROCESS_STEPS = [
//   { num: "01", title: "SHOP THE COLLECTION", desc: "Browse 150+ curated frames." },
//   { num: "02", title: "VIRTUAL TRY-ON", desc: "See how each frame looks on your face." },
//   { num: "03", title: "ENTER PRESCRIPTION", desc: "Securely upload your Rx." },
//   { num: "04", title: "LENS CUSTOMISATION", desc: "Single vision, progressive, blue-light." },
//   { num: "05", title: "RECEIVE & ENJOY", desc: "Ships within 5–7 days." },
// ];

// export const CATEGORIES_HOME = [
//   { label: "Men's Eyeglasses", count: "48 styles", dark: false, shape: "square", slug: "mens-eyeglasses" },
//   { label: "Women's Eyeglasses", count: "52 styles", dark: true, shape: "cateye", slug: "womens-eyeglasses" },
//   { label: "Men's Sunglasses", count: "36 styles", dark: false, shape: "aviator", slug: "mens-sunglasses" },
//   { label: "Women's Sunglasses", count: "41 styles", dark: true, shape: "round", slug: "womens-sunglasses" },
// ];

// // TAG COLORS (FIXED - ADD THIS)
// export const tagColors = { 
//   "BEST SELLER": { bg: "#0A0A0A", color: "#fff" }, 
//   "NEW": { bg: "#F5C800", color: "#0A0A0A" }, 
//   "LIMITED": { bg: "#7c3aed", color: "#fff" }, 
//   "ICONIC": { bg: "#1a1a1a", color: "#F5C800" }, 
//   "PREMIUM": { bg: "#b45309", color: "#fff" } 
// };

// // UTILITY FUNCTIONS
// export function applyFilters(products, activeFilters, sort) {
//   let list = [...products];
//   if (activeFilters.category?.length) list = list.filter(p => activeFilters.category.includes(p.category));
//   if (activeFilters.gender?.length)   list = list.filter(p => activeFilters.gender.includes(p.gender));
//   if (activeFilters.shape?.length)    list = list.filter(p => activeFilters.shape.some(s => p.subcategory?.toLowerCase().includes(s.toLowerCase())));
//   if (activeFilters.color?.length)    list = list.filter(p => activeFilters.color.some(c => p.color?.toLowerCase().includes(c.toLowerCase())));
//   if (activeFilters.price?.length) {
//     list = list.filter(p => {
//       return activeFilters.price.some(pr => {
//         if (pr === "Under PKR 20K") return p.discountPrice < 20000;
//         if (pr === "PKR 20K–30K")   return p.discountPrice >= 20000 && p.discountPrice <= 30000;
//         if (pr === "Above PKR 30K") return p.discountPrice > 30000;
//         return true;
//       });
//     });
//   }
//   if (sort === "priceAsc")  list.sort((a,b) => a.discountPrice - b.discountPrice);
//   if (sort === "priceDesc") list.sort((a,b) => b.discountPrice - a.discountPrice);
//   if (sort === "discount")  list.sort((a,b) => (b.price - b.discountPrice) - (a.price - a.discountPrice));
//   if (sort === "newest")    list.sort((a,b) => (b.tag === "NEW" ? 1 : 0) - (a.tag === "NEW" ? 1 : 0));
//   return list;
// }































// COLORS & FONTS
export const YELLOW = "#F5C800";
export const BLACK  = "#0A0A0A";
export const CREAM  = "#F5F0E8";
export const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
export const mono   = "'Courier New', Courier, monospace";

// COLLECTIONS
export const COLLECTIONS = {
  "eyeglasses": { title: "EYEGLASSES", desc: "MOSCOT combines over 100 years of eyewear expertise.", filter: p => p.category === "Eyeglasses" },
  "sunglasses": { title: "SUNGLASSES", desc: "All of our sunglasses reflect rich heritage.", filter: p => p.category === "Sunglasses" },
  "mens-eyeglasses": { title: "MEN'S EYEGLASSES", desc: "Timeless frames for the modern gentleman.", filter: p => p.category === "Eyeglasses" && (p.gender === "Men" || p.gender === "Unisex") },
  "womens-eyeglasses": { title: "WOMEN'S EYEGLASSES", desc: "Refined, bold, and beautifully crafted.", filter: p => p.category === "Eyeglasses" && (p.gender === "Women" || p.gender === "Unisex") },
  "mens-sunglasses": { title: "MEN'S SUNGLASSES", desc: "UV protection meets effortless cool.", filter: p => p.category === "Sunglasses" && (p.gender === "Men" || p.gender === "Unisex") },
  "womens-sunglasses": { title: "WOMEN'S SUNGLASSES", desc: "From oversized cat-eyes to sleek aviators.", filter: p => p.category === "Sunglasses" && (p.gender === "Women" || p.gender === "Unisex") },
  "best-selling-eyeglasses": { title: "BEST SELLERS — EYEGLASSES", desc: "The frames everyone is wearing.", filter: p => p.category === "Eyeglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
  "best-selling-sunglasses": { title: "BEST SELLERS — SUNGLASSES", desc: "Sun protection, elevated.", filter: p => p.category === "Sunglasses" && (p.tag === "BEST SELLER" || p.tag === "ICONIC") },
  "new-eyeglasses-sunglasses": { title: "NEW ARRIVALS", desc: "Fresh off the bench.", filter: p => p.tag === "NEW" },
  "family-favorites": { title: "BEST SELLERS", desc: "Eye-conic frames chosen by the community.", filter: p => p.tag === "BEST SELLER" || p.tag === "ICONIC" },
  "round-eyeglasses": { title: "ROUND EYEGLASSES", desc: "The shape that defined a generation.", filter: p => p.subcategory === "Round" && p.category === "Eyeglasses" },
  "square-eyeglasses": { title: "SQUARE EYEGLASSES", desc: "Bold geometry. Sharp lines.", filter: p => p.subcategory === "Square" && p.category === "Eyeglasses" },
  "aviator-sunglasses": { title: "AVIATOR SUNGLASSES", desc: "Heritage aviation style, reborn.", filter: p => p.subcategory === "Aviator" },
  "cateye-eyeglasses-sunglasses": { title: "CAT-EYE FRAMES", desc: "Old Hollywood glamour meets downtown cool.", filter: p => p.subcategory === "Cat-Eye" },
  "black-eyeglasses": { title: "BLACK FRAMES", desc: "Classic. Timeless.", filter: p => p.color?.toLowerCase().includes("black") },
  "tortoise-shell-eyeglasses": { title: "TORTOISE FRAMES", desc: "Warm tones, rich character.", filter: p => p.color?.toLowerCase().includes("tortoise") },
  "polarized-sunglasses": { title: "POLARIZED SUNGLASSES", desc: "Cut the glare.", filter: p => p.category === "Sunglasses" },
  "custom-made-tints": { title: "CUSTOM MADE TINTS™", desc: "20+ hand-applied tints.", filter: p => p.category === "Sunglasses" },
  "default": { title: "ALL FRAMES", desc: "Every frame. Handpicked.", filter: () => true },
};

// FILTERS
export const FILTER_GROUPS = [
  { key: "category", label: "FRAME TYPE", options: ["Eyeglasses", "Sunglasses"] },
  { key: "gender", label: "GENDER", options: ["Men", "Women", "Unisex"] },
  { key: "shape", label: "FRAME SHAPE", options: ["Round", "Square", "Aviator", "Cat-Eye", "Geometric", "Browline"] },
  { key: "color", label: "COLOR", options: ["Black", "Tortoise", "Crystal", "Amber", "Cobalt", "Olive", "Lavender", "Wine", "Rose Gold", "Ivory"] },
  { key: "price", label: "PRICE", options: ["Under PKR 20K", "PKR 20K–30K", "Above PKR 30K"] },
];

export const SORT_OPTS = [
  { label: "FEATURED", key: "featured" },
  { label: "PRICE: LOW–HIGH", key: "priceAsc" },
  { label: "PRICE: HIGH–LOW", key: "priceDesc" },
  { label: "DISCOUNT %", key: "discount" },
  { label: "NEWEST", key: "newest" },
];

// ============ HOME PAGE DATA ============
// ⚠️ IMPORTANT: Place your banner images inside the "public/banners/" folder
// e.g. public/banners/banner1.png, public/banners/DSC08314.jpg, public/banners/DSC08347.jpg
// Paths below start with "/" (root-relative) — this works correctly in both
// dev server and production build, unlike "../banners/..." relative paths.
export const HERO_SLIDES = [
  {
    image: "/assets/banners/banner1.png",
    label: "NEW ARRIVALS",
    heading: "SEE THE\nDIFFERENCE",
    sub: "Explore our latest collection.",
    cta: "SHOP NOW",
    ctaSecond: "LEARN MORE",
    dark: false,
    // shape: "round",
  },
  {
    image: "/assets/banners/banneer2.png",
    label: "OUR COLLECTION",
    heading: "STYLE THAT\nSPEAKS",
    // sub: "Handpicked frames for every look.",
    cta: "SHOP NOW",
    ctaSecond: "LEARN MORE",
    dark: false,
    // shape: "round",
  },
  {
    image: "/assets/banners/DSC08310.jpg",
    label: "LIMITED TIME",
    heading: "FIND YOUR\nFRAME",
    sub: "Quality eyewear, made for you.",
    cta: "SHOP NOW",
    ctaSecond: "LEARN MORE",
    dark:false ,
    // shape: "cateye",
  },
];

export const HOME_PRODUCTS = [
  { name: "LEMTOSH", article: "The", type: "Eyeglasses", price: "PKR 24,500", tag: "BEST SELLER", shape: "round", tints: ["#2a1a0a", "#5c3d1e", "#1a1a1a", "#8B7355"], id: "lemtosh-matte-black" },
  { name: "MILTZEN", article: "The", type: "Eyeglasses", price: "PKR 19,800", tag: "NEW", shape: "square", tints: ["#0a0a0a", "#4a3728", "#c9a96e", "#1a2a1a"], id: "miltzen-tortoise" },
  { name: "ZOLMAN", article: "The", type: "Sunglasses", price: "PKR 28,900", tag: "ICONIC", shape: "aviator", tints: ["#2a2a2a", "#6b4423", "#1a1a2a", "#3d3d3d"], id: "zolman-smoke" },
  { name: "AIDANNS", article: "The", type: "Sunglasses", price: "PKR 22,400", tag: "NEW", shape: "round", tints: ["#1a1a1a", "#8B7355", "#4a6b4a", "#2a1a3d"], id: "aidanns-amber" },
  { name: "SPINA", article: "The", type: "Eyeglasses", price: "PKR 17,600", tag: null, shape: "square", tints: ["#c9a96e", "#0a0a0a", "#3d2a1a", "#4a4a4a"], id: "spina-crystal" },
  { name: "FRANKIE", article: "The", type: "Sunglasses", price: "PKR 31,200", tag: "LIMITED", shape: "cateye", tints: ["#1a0a0a", "#6b1a1a", "#0a1a0a", "#1a1a2a"], id: "frankie-wine" },
  { name: "GRUNYA", article: "The", type: "Eyeglasses", price: "PKR 16,800", tag: null, shape: "round", tints: ["#2a1a1a", "#c9a96e", "#1a2a2a", "#3d3d2a"], id: "grunya-ivory" },
  { name: "NASH", article: "The", type: "Sunglasses", price: "PKR 26,500", tag: "BEST SELLER", shape: "square", tints: ["#0a0a0a", "#5c4a2a", "#1a3d1a", "#2a2a3d"], id: "nash-black" },
];

export const TINTS = [
  { name: "AMBER", color: "#C9A96E" }, { name: "SMOKE", color: "#666" }, { name: "OLIVE", color: "#6B7C4A" },
  { name: "BLUSH", color: "#D4908A" }, { name: "COBALT", color: "#3A6BAD" }, { name: "FOREST", color: "#2D5A3D" },
  { name: "LAVENDER", color: "#8B7BAD" }, { name: "WINE", color: "#722F37" },
];

export const TESTIMONIALS = [
  { name: "Aisha R.", city: "Karachi", text: "The LEMTOSH is everything. Perfect fit, incredible quality.", rating: 5 },
  { name: "Omar K.", city: "Lahore", text: "Skeptical about buying glasses online but the virtual try-on made it simple.", rating: 5 },
  { name: "Sara M.", city: "Islamabad", text: "The custom tints are unreal — I got amber on a round frame.", rating: 5 },
  { name: "Bilal H.", city: "Karachi", text: "Exceptional service. These glasses are art.", rating: 5 },
];

export const PROCESS_STEPS = [
  { num: "01", title: "SHOP THE COLLECTION", desc: "Browse 150+ curated frames." },
  { num: "02", title: "VIRTUAL TRY-ON", desc: "See how each frame looks on your face." },
  { num: "03", title: "ENTER PRESCRIPTION", desc: "Securely upload your Rx." },
  { num: "04", title: "LENS CUSTOMISATION", desc: "Single vision, progressive, blue-light." },
  { num: "05", title: "RECEIVE & ENJOY", desc: "Ships within 5–7 days." },
];

export const CATEGORIES_HOME = [
  { label: "Men's Eyeglasses", count: "48 styles", dark: false, shape: "square", slug: "mens-eyeglasses" },
  { label: "Women's Eyeglasses", count: "52 styles", dark: true, shape: "cateye", slug: "womens-eyeglasses" },
  { label: "Men's Sunglasses", count: "36 styles", dark: false, shape: "aviator", slug: "mens-sunglasses" },
  { label: "Women's Sunglasses", count: "41 styles", dark: true, shape: "round", slug: "womens-sunglasses" },
];

// TAG COLORS
export const tagColors = {
  "BEST SELLER": { bg: "#0A0A0A", color: "#fff" },
  "NEW": { bg: "#F5C800", color: "#0A0A0A" },
  "LIMITED": { bg: "#7c3aed", color: "#fff" },
  "ICONIC": { bg: "#1a1a1a", color: "#F5C800" },
  "PREMIUM": { bg: "#b45309", color: "#fff" }
};

// UTILITY FUNCTIONS
export function applyFilters(products, activeFilters, sort) {
  let list = [...products];
  if (activeFilters.category?.length) list = list.filter(p => activeFilters.category.includes(p.category));
  if (activeFilters.gender?.length)   list = list.filter(p => activeFilters.gender.includes(p.gender));
  if (activeFilters.shape?.length)    list = list.filter(p => activeFilters.shape.some(s => p.subcategory?.toLowerCase().includes(s.toLowerCase())));
  if (activeFilters.color?.length)    list = list.filter(p => activeFilters.color.some(c => p.color?.toLowerCase().includes(c.toLowerCase())));
  if (activeFilters.price?.length) {
    list = list.filter(p => {
      return activeFilters.price.some(pr => {
        if (pr === "Under PKR 20K") return p.discountPrice < 20000;
        if (pr === "PKR 20K–30K")   return p.discountPrice >= 20000 && p.discountPrice <= 30000;
        if (pr === "Above PKR 30K") return p.discountPrice > 30000;
        return true;
      });
    });
  }
  if (sort === "priceAsc")  list.sort((a,b) => a.discountPrice - b.discountPrice);
  if (sort === "priceDesc") list.sort((a,b) => b.discountPrice - a.discountPrice);
  if (sort === "discount")  list.sort((a,b) => (b.price - b.discountPrice) - (a.price - a.discountPrice));
  if (sort === "newest")    list.sort((a,b) => (b.tag === "NEW" ? 1 : 0) - (a.tag === "NEW" ? 1 : 0));
  return list;
}