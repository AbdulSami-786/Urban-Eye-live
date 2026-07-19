





































// // // // import { useState, useEffect, useCallback } from "react";
// // // // import { PRODUCTS_DATA } from "../prodcut.js";
// // // // import { BLACK, CREAM, ff, mono, COLLECTIONS,
// // // //          HERO_SLIDES, HOME_PRODUCTS, TINTS, TESTIMONIALS, PROCESS_STEPS, CATEGORIES_HOME,
// // // //          tagColors } from "../contants/store.js";
// // // // import { applyProductFilters, getProductColorOptions, getProductBrandOptions, getProductSizeOptions, getProductDisplayPrice, getProductDiscountPercent, getRelatedProducts, getProductVariants, normalizeCategory, formatPriceValue } from "../services/productUtils.js";
// // // // import { YBtn, OutlineBtn, FadeIn, Counter, Frame, ProductCard, WishlistHeart, WishlistSkeleton } from "../components/shared";
// // // // import { useCart } from "../contexts/CardContext";
// // // // import { useAuth } from "../Auth/auth.jsx";
// // // // import {
// // // //   getWishlist, removeFromWishlist, getReviews, getAddresses,
// // // //   submitReview, updateReview, getProductReviewStats, getUserReviews,
// // // // } from "../services/service.js";

// // // // const BRAND      = "#0c2c41";
// // // // const BRAND_TEXT = "#ffffff";
// // // // const NAVY = BRAND;

// // // // // ============================================
// // // // // RESPONSIVE HOOK
// // // // // ============================================
// // // // function useMediaQuery(query) {
// // // //   const [matches, setMatches] = useState(false);
// // // //   useEffect(() => {
// // // //     const media = window.matchMedia(query);
// // // //     if (media.matches !== matches) setMatches(media.matches);
// // // //     const listener = () => setMatches(media.matches);
// // // //     media.addEventListener("change", listener);
// // // //     return () => media.removeEventListener("change", listener);
// // // //   }, [query, matches]);
// // // //   return matches;
// // // // }

// // // // // ============================================
// // // // // SHARED VARIANT HELPERS
// // // // // ============================================
// // // // function normalizeVariantName(value) {
// // // //   return String(value || "").trim().toLowerCase();
// // // // }

// // // // function getStoredVariantName(productId) {
// // // //   try {
// // // //     return localStorage.getItem(`product-color:${productId}`) || "";
// // // //   } catch {
// // // //     return "";
// // // //   }
// // // // }

// // // // function setStoredVariantName(productId, name) {
// // // //   try {
// // // //     localStorage.setItem(`product-color:${productId}`, name);
// // // //   } catch {
// // // //     // ignore storage write failures
// // // //   }
// // // // }

// // // // // ============================================
// // // // // HELPER — Join raw wishlist rows with product details
// // // // // ============================================
// // // // function enrichWishlistItems(rawItems) {
// // // //   return rawItems
// // // //     .map(item => {
// // // //       const product = PRODUCTS_DATA.find(p => String(p.id) === String(item.productId));
// // // //       if (!product) return null;
// // // //       return {
// // // //         ...item,
// // // //         product: {
// // // //           name       : product.name,
// // // //           price      : product.price,
// // // //           salePrice  : product.discountPrice,
// // // //           imageUrl   : product.gallery?.[0] || product.image || "",
// // // //           color      : product.color,
// // // //           subcategory: product.subcategory,
// // // //           gender     : product.gender,
// // // //         },
// // // //       };
// // // //     })
// // // //     .filter(item => item !== null);
// // // // }

// // // // // ============================================
// // // // // COLLECTIONS DATA
// // // // // ============================================
// // // // const COLLECTIONS_PAGE_DATA = [
// // // //   { slug: "best-sellers", name: "Best Sellers", count: 24, desc: "The frames everyone's talking about.", tag: "MOST POPULAR", bg: BLACK, dark: true, shape: "round" },
// // // //   { slug: "new-arrivals", name: "New Arrivals", count: 18, desc: "Fresh styles, just landed.", tag: "NEW", bg: BRAND, dark: false, shape: "square" },
// // // //   { slug: "custom-tints", name: "Custom Made Tints™", count: 32, desc: "20+ hand-applied shades. Any frame.", tag: "EXCLUSIVE", bg: "#1a1a1a", dark: true, shape: "cateye" },
// // // //   { slug: "reading-glasses", name: "Reading Glasses", count: 12, desc: "Crystal clear. Beautifully crafted.", tag: null, bg: CREAM, dark: false, shape: "round" },
// // // //   { slug: "blue-light", name: "Blue Light Glasses", count: 15, desc: "Protect your eyes in the digital age.", tag: "DIGITAL RELIEF", bg: "#1a2a4a", dark: true, shape: "square" },
// // // //   { slug: "mens-collection", name: "Men's Collection", count: 48, desc: "Bold frames for every face.", tag: null, bg: "#f5f5f5", dark: false, shape: "aviator" },
// // // //   { slug: "womens-collection", name: "Women's Collection", count: 52, desc: "Refined eyewear for every occasion.", tag: null, bg: "#fdf4f4", dark: false, shape: "cateye" },
// // // //   { slug: "limited-editions", name: "Limited Editions", count: 8, desc: "Before they're gone.", tag: "LIMITED", bg: "#2a1a3a", dark: true, shape: "round" },
// // // //   { slug: "round", name: "Round Frames", count: 21, desc: "The timeless silhouette.", tag: null, bg: CREAM, dark: false, shape: "round" },
// // // //   { slug: "square", name: "Square Frames", count: 19, desc: "Sharp. Structured. Striking.", tag: null, bg: "#f5f5f0", dark: false, shape: "square" },
// // // // ];

// // // // // ============================================
// // // // // BREADCRUMB
// // // // // ============================================
// // // // function Breadcrumb({ crumbs }) {
// // // //   return (
// // // //     <nav aria-label="breadcrumb" style={{ background: CREAM, borderBottom: "1px solid #e8e0d0", padding: "12px 20px" }}>
// // // //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
// // // //         {crumbs.map((crumb, i) => (
// // // //           <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // //             {i > 0 && <span style={{ color: "#bbb", fontSize: 10 }}>›</span>}
// // // //             {crumb.path
// // // //               ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
// // // //               : <span aria-current="page" style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
// // // //           </span>
// // // //         ))}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // }

// // // // // ─────────────────────────────────────────────
// // // // // SORT OPTIONS
// // // // // ─────────────────────────────────────────────
// // // // const SORT_OPTS = [
// // // //   { key: "featured",    label: "Featured" },
// // // //   { key: "relevant",    label: "Most relevant" },
// // // //   { key: "bestSelling", label: "Best selling" },
// // // //   { key: "alphaAZ",     label: "Alphabetically, A-Z" },
// // // //   { key: "alphaZA",     label: "Alphabetically, Z-A" },
// // // //   { key: "priceLow",    label: "Price, low to high" },
// // // //   { key: "priceHigh",   label: "Price, high to low" },
// // // //   { key: "dateNew",     label: "Date, new to old" },
// // // //   { key: "dateOld",     label: "Date, old to new" },
// // // // ];

// // // // // ============================================
// // // // // FILTER + SORT FUNCTIONS (UPDATED)
// // // // // ============================================

// // // // function applyFilters(products, activeFilters, sort, searchTerm = "") {
// // // //   let filtered = products;

// // // //   // 1. Apply search
// // // //   if (searchTerm && searchTerm.trim()) {
// // // //     const term = searchTerm.trim().toLowerCase();
// // // //     filtered = filtered.filter(p =>
// // // //       p.name.toLowerCase().includes(term) ||
// // // //       (p.category && p.category.toLowerCase().includes(term)) ||
// // // //       (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
// // // //       (p.gender && p.gender.toLowerCase().includes(term))
// // // //     );
// // // //   }

// // // //   // 2. Apply size filter (exact match from product.js sizes)
// // // //   if (activeFilters.size && activeFilters.size.length) {
// // // //     filtered = filtered.filter(p =>
// // // //       p.sizes && p.sizes.some(s => activeFilters.size.includes(s))
// // // //     );
// // // //   }

// // // //   // 3. Remove size from activeFilters so that applyProductFilters doesn't filter it again
// // // //   const otherFilters = { ...activeFilters };
// // // //   delete otherFilters.size;

// // // //   // 4. Apply all other filters (category, brand, price, rating, shape, etc.) and sort
// // // //   filtered = applyProductFilters(filtered, otherFilters, sort, "");

// // // //   return filtered;
// // // // }

// // // // function sortProducts(arr, sort) {
// // // //   const a = [...arr];
// // // //   if (sort === "alphaAZ")   return a.sort((x, y) => x.name.localeCompare(y.name));
// // // //   if (sort === "alphaZA")   return a.sort((x, y) => y.name.localeCompare(x.name));
// // // //   if (sort === "priceLow")  return a.sort((x, y) => getProductDisplayPrice(x).discountPrice - getProductDisplayPrice(y).discountPrice);
// // // //   if (sort === "priceHigh") return a.sort((x, y) => getProductDisplayPrice(y).discountPrice - getProductDisplayPrice(x).discountPrice);
// // // //   if (sort === "dateNew")   return a.reverse();
// // // //   return a;
// // // // }

// // // // const SHAPE_CONFIG = [
// // // //   { key: "Round", label: "Round" },
// // // //   { key: "Square", label: "Square" },
// // // //   { key: "Aviator", label: "Aviator" },
// // // //   { key: "Cat-Eye", label: "Cat-Eye" },
// // // //   { key: "Geometric", label: "Geometric" },
// // // //   { key: "Browline", label: "Browline" },
// // // // ];

// // // // // const ShapeIcon = ... (as in original, not changed)

// // // // // ============================================
// // // // // FILTER SIDEBAR (UPDATED SIZE SECTION)
// // // // // ============================================

// // // // function FilterSidebar({ allProducts, activeFilters, setActiveFilters, filtersOpen, isMobile, onClose }) {
// // // //   const [open, setOpen] = useState({ category: true, color: true, brand: false, rating: false, price: true, size: false, availability: false });
// // // //   if (!filtersOpen) return null;

// // // //   const toggleSec = k => setOpen(s => ({ ...s, [k]: !s[k] }));
// // // //   const toggle = (group, value) =>
// // // //     setActiveFilters(prev => {
// // // //       const cur = prev[group] || [];
// // // //       return { ...prev, [group]: cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value] };
// // // //     });
// // // //   const isOn = (group, value) => (activeFilters[group] || []).includes(value);

// // // //   const Section = ({ id, title, children }) => (
// // // //     <div style={{ borderBottom: "1px solid #e8e0d0" }}>
// // // //       <button onClick={() => toggleSec(id)} style={{
// // // //         width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
// // // //         padding: "14px 0", background: "none", border: "none", cursor: "pointer",
// // // //         fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.14em", color: BLACK,
// // // //       }}>
// // // //         {title}
// // // //         <span style={{ fontSize: 10, color: "#999", display: "block", transition: "transform 0.2s", transform: open[id] ? "rotate(180deg)" : "none" }}>▲</span>
// // // //       </button>
// // // //       {open[id] && <div style={{ paddingBottom: 14 }}>{children}</div>}
// // // //     </div>
// // // //   );

// // // //   const Check = ({ group, value, label, count }) => {
// // // //     const on = isOn(group, value);
// // // //     return (
// // // //       <label onClick={() => toggle(group, value)} style={{
// // // //         display: "flex", alignItems: "center", justifyContent: "space-between",
// // // //         gap: 8, padding: "5px 0", cursor: "pointer",
// // // //         fontSize: 13, color: on ? BLACK : "#555", fontFamily: mono,
// // // //       }}>
// // // //         <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
// // // //           <div style={{
// // // //             width: 15, height: 15, flexShrink: 0,
// // // //             border: `1.5px solid ${on ? BRAND : "#ccc"}`,
// // // //             background: on ? BRAND : "#fff",
// // // //             display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
// // // //           }}>
// // // //             {on && <span style={{ color: BRAND_TEXT, fontSize: 9, lineHeight: 1 }}>✓</span>}
// // // //           </div>
// // // //           <span>{label}</span>
// // // //         </div>
// // // //         {count !== undefined && <span style={{ fontSize: 11, color: "#bbb", fontFamily: ff }}>({count})</span>}
// // // //       </label>
// // // //     );
// // // //   };

// // // //   const wrapStyle = isMobile
// // // //     ? { position: "fixed", inset: 0, zIndex: 200, background: "#fff", padding: "20px 16px 80px", overflowY: "auto" }
// // // //     : { width: 210, flexShrink: 0, padding: "20px 20px 80px 0", borderRight: "1px solid #e8e0d0" };

// // // //   return (
// // // //     <div style={wrapStyle}>
// // // //       {isMobile && (
// // // //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// // // //           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em" }}>FILTER</div>
// // // //           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: BLACK, lineHeight: 1 }}>×</button>
// // // //         </div>
// // // //       )}

// // // //       <Section id="shape" title="SHAPE">
// // // //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, paddingTop: 4 }}>
// // // //           {SHAPE_CONFIG.map((shape) => {
// // // //             const count = allProducts.filter((product) => product.subcategory === shape.key).length;
// // // //             if (count === 0) return null;
// // // //             const on = isOn("shape", shape.key);
// // // //             return (
// // // //               <button key={shape.key} onClick={() => toggle("shape", shape.key)} style={{
// // // //                 border: `1.5px solid ${on ? BRAND : "#ddd"}`,
// // // //                 background: on ? BRAND : "#fff",
// // // //                 padding: "10px 6px 8px", cursor: "pointer",
// // // //                 display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.18s",
// // // //               }}>
// // // //                 <ShapeIcon shape={shape.key} active={on} />
// // // //                 <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", fontFamily: ff, color: on ? BRAND_TEXT : "#555" }}>
// // // //                   {shape.label.toUpperCase()}
// // // //                 </span>
// // // //                 <span style={{ fontSize: 9, color: on ? "rgba(255,255,255,0.6)" : "#aaa", fontFamily: mono }}>({count})</span>
// // // //               </button>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </Section>

// // // //       <Section id="category" title="CATEGORY">
// // // //         {Array.from(new Set(allProducts.map((product) => normalizeCategory(product.category || "Eyeglasses")).filter(Boolean))).map((value) => (
// // // //           <Check key={value} group="category" value={value} label={value} count={allProducts.filter((product) => normalizeCategory(product.category || "Eyeglasses") === value).length} />
// // // //         ))}
// // // //       </Section>

// // // //       {/* ====== NEW DYNAMIC SIZE SECTION ====== */}
// // // //       <Section id="size" title="SIZE">
// // // //         {(() => {
// // // //           // Collect all unique sizes from all products
// // // //           const allSizes = new Set();
// // // //           allProducts.forEach(p => (p.sizes || []).forEach(s => allSizes.add(s)));
// // // //           const sizeOptions = Array.from(allSizes).sort();
// // // //           if (sizeOptions.length === 0) return <div style={{ color: '#aaa', fontSize: 12 }}>No sizes available</div>;
// // // //           return sizeOptions.map(size => {
// // // //             const count = allProducts.filter(p => (p.sizes || []).includes(size)).length;
// // // //             return (
// // // //               <Check
// // // //                 key={size}
// // // //                 group="size"
// // // //                 value={size}          // stores the exact size string
// // // //                 label={size}
// // // //                 count={count}
// // // //               />
// // // //             );
// // // //           });
// // // //         })()}
// // // //       </Section>

// // // //       {/* Other sections remain unchanged (color, brand, rating, etc.) */}
// // // //       {/* <Section id="color" title="COLOR">... */}
// // // //       {/* <Section id="brand" title="BRAND">... */}
// // // //       {/* <Section id="rating" title="RATING">... */}
// // // //       {/* <Section id="price" title="PRICE">... */}

// // // //       {isMobile && (
// // // //         <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#fff", borderTop: "1px solid #e8e0d0" }}>
// // // //           <YBtn onClick={onClose} style={{ width: "100%", padding: "14px" }}>APPLY FILTERS</YBtn>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // const PRICE_LABELS = { under20: "Under 20K", "20to30": "20K–30K", above30: "Above 30K" };

// // // // // ============================================
// // // // // FILTER SORT BAR (UPDATED labelFor)
// // // // // ============================================

// // // // function FilterSortBar({ filtersOpen, toggleFilters, isMobile, sort, setSort, count, activeFilters, setActiveFilters }) {
// // // //   const allActive = Object.entries(activeFilters).flatMap(([grp, vals]) => vals.map(v => ({ grp, v })));
// // // //   const labelFor = (grp, v) => {
// // // //     if (grp === "price") return PRICE_LABELS[v];
// // // //     if (grp === "size") return v;   // exact size string
// // // //     return v;
// // // //   };

// // // //   return (
// // // //     <div style={{ background: "#fff", borderBottom: "1px solid #e8e0d0", position: "sticky", top: 62, zIndex: 20 }}>
// // // //       <div style={{
// // // //         maxWidth: 1400, margin: "0 auto", padding: "0 16px",
// // // //         display: "flex", alignItems: "center", justifyContent: "space-between", height: 50,
// // // //         flexWrap: "wrap",
// // // //       }}>
// // // //         <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0, overflow: "hidden", flexWrap: "wrap" }}>
// // // //           <button onClick={toggleFilters} style={{
// // // //             background: "none", border: "none", cursor: "pointer",
// // // //             display: "flex", alignItems: "center", gap: 8,
// // // //             fontSize: 12, fontWeight: 900, letterSpacing: "0.12em",
// // // //             color: BLACK, fontFamily: ff, padding: 0, whiteSpace: "nowrap", flexShrink: 0,
// // // //           }}>
// // // //             <svg width="17" height="13" viewBox="0 0 18 14" fill="none">
// // // //               <line x1="0" y1="2"  x2="18" y2="2"  stroke="currentColor" strokeWidth="1.5"/>
// // // //               <line x1="0" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
// // // //               <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"/>
// // // //               <circle cx="5"  cy="2"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// // // //               <circle cx="11" cy="7"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// // // //               <circle cx="7"  cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// // // //             </svg>
// // // //             {filtersOpen ? "Hide Filter" : "Show Filter"}
// // // //           </button>

// // // //           {allActive.length > 0 && (
// // // //             <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", overflow: "hidden" }}>
// // // //               {allActive.slice(0, isMobile ? 2 : 6).map(({ grp, v }) => (
// // // //                 <button key={`${grp}-${v}`}
// // // //                   onClick={() => setActiveFilters(prev => ({ ...prev, [grp]: (prev[grp] || []).filter(x => x !== v) }))}
// // // //                   style={{
// // // //                     display: "flex", alignItems: "center", gap: 4,
// // // //                     background: BRAND, color: BRAND_TEXT, border: "none",
// // // //                     padding: "3px 8px 3px 9px", fontSize: 9, fontWeight: 900,
// // // //                     letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap",
// // // //                   }}>
// // // //                   {labelFor(grp, v)} <span style={{ fontSize: 12, lineHeight: 1 }}>×</span>
// // // //                 </button>
// // // //               ))}
// // // //               <button onClick={() => setActiveFilters({})} style={{
// // // //                 background: "none", border: "none", fontSize: 10, color: "#999",
// // // //                 cursor: "pointer", fontFamily: ff, fontWeight: 700, textDecoration: "underline", whiteSpace: "nowrap",
// // // //               }}>Clear all</button>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
// // // //           <span style={{ fontSize: 12, color: "#999", fontFamily: mono, whiteSpace: "nowrap" }}>{count} products</span>
// // // //           <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // // //             <span style={{ fontSize: 12, color: "#666", fontFamily: mono, display: isMobile ? "none" : "inline" }}>Sort by:</span>
// // // //             <select value={sort} onChange={e => setSort(e.target.value)} style={{
// // // //               background: "none", border: "1px solid #ddd", padding: "5px 8px",
// // // //               fontSize: 12, color: BLACK, fontFamily: mono, cursor: "pointer", outline: "none",
// // // //               maxWidth: isMobile ? "120px" : "auto",
// // // //             }}>
// // // //               {SORT_OPTS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
// // // //             </select>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ COLLECTIONS LANDING PAGE ============
// // // // export function CollectionsLandingPage({ navigate }) {
// // // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // // //       <div style={{ background: BLACK, padding: "72px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// // // //           <Frame shape="cateye" size={700} color="#fff" />
// // // //         </div>
// // // //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// // // //           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }} />
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10 }}>URBAN EYE</div>
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", margin: "0 0 20px" }}>COLLECTIONS</h1>
// // // //           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>Curated groups of frames for every occasion, face, and personality.</p>
// // // //         </div>
// // // //       </div>

// // // //       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "COLLECTIONS", path: null }]} />

// // // //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 20px 80px" }}>
// // // //         <div style={{ marginBottom: 60 }}>
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>FEATURED</div>
// // // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 3 }}>
// // // //             {COLLECTIONS_PAGE_DATA.slice(0, 2).map((col, i) => (
// // // //               <FadeIn key={col.slug} delay={i * 80}>
// // // //                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 380, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 36, transition: "opacity 0.2s" }}
// // // //                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.92"}
// // // //                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
// // // //                   <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }}>
// // // //                     <Frame shape={col.shape} size={220} color={col.dark ? "#fff" : "#000"} />
// // // //                   </div>
// // // //                   {col.tag && <div style={{ position: "absolute", top: 20, left: 20, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "5px 12px", fontFamily: ff }}>{col.tag}</div>}
// // // //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 6 }}>{col.count} STYLES</div>
// // // //                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: 32, color: col.dark ? "#fff" : BLACK, margin: "0 0 8px", letterSpacing: "0.02em" }}>{col.name.toUpperCase()}</h2>
// // // //                   <p style={{ fontSize: 13, color: col.dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontFamily: mono, margin: "0 0 16px" }}>{col.desc}</p>
// // // //                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1", fontFamily: ff }}>SHOP COLLECTION →</div>
// // // //                 </div>
// // // //               </FadeIn>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         <div>
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>ALL COLLECTIONS</div>
// // // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
// // // //             {COLLECTIONS_PAGE_DATA.slice(2).map((col, i) => (
// // // //               <FadeIn key={col.slug} delay={i * 60}>
// // // //                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 260, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, transition: "opacity 0.2s" }}
// // // //                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
// // // //                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
// // // //                   <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
// // // //                     <Frame shape={col.shape} size={160} color={col.dark ? "#fff" : "#000"} />
// // // //                   </div>
// // // //                   {col.tag && <div style={{ position: "absolute", top: 14, left: 14, background: BRAND, color: BRAND_TEXT, fontSize: 8, fontWeight: 900, letterSpacing: "0.16em", padding: "4px 10px", fontFamily: ff }}>{col.tag}</div>}
// // // //                   <div style={{ fontSize: 9, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginBottom: 4 }}>{col.count} STYLES</div>
// // // //                   <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: 20, color: col.dark ? "#fff" : BLACK, margin: "0 0 6px" }}>{col.name.toUpperCase()}</h3>
// // // //                   <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1" }}>EXPLORE →</div>
// // // //                 </div>
// // // //               </FadeIn>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ HOME PAGE ============
// // // // export function HomePage({ navigate }) {
// // // //   const [heroSlide, setHeroSlide] = useState(0);
// // // //   const [filter, setFilter] = useState("All");
// // // //   const [testimonialIdx, setTIdx] = useState(0);
// // // //   const { addToCart } = useCart();
// // // //   const catalogProducts = PRODUCTS_DATA.slice(0, 8);

// // // //   // Responsive
// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // // //   // Auto-slide
// // // //   useEffect(() => {
// // // //     const t = setInterval(() => setHeroSlide(i => (i + 1) % HERO_SLIDES.length), 6000);
// // // //     return () => clearInterval(t);
// // // //   }, []);
// // // //   useEffect(() => {
// // // //     const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
// // // //     return () => clearInterval(t);
// // // //   }, []);

// // // //   const slide = HERO_SLIDES[heroSlide];
// // // //   const FILTERS = ["All", "Eyeglasses", "Sunglasses"];
// // // //   const filtered = filter === "All"
// // // //     ? catalogProducts
// // // //     : catalogProducts.filter((p) => p.category === (filter === "Eyeglasses" ? "Optical" : "Sunglass"));

// // // //   // ====== Product Card Component (inner) ======
// // // //   const HomeProductCard = ({ product }) => {
// // // //     const [hov, setHov] = useState(false);
// // // //     const [addedMsg, setAddedMsg] = useState(false);
// // // //     const { price, discountPrice } = getProductDisplayPrice(product);
// // // //     const discount = getProductDiscountPercent(product);
// // // //     const variants = getProductVariants(product);

// // // //     const [selectedVariantName, setSelectedVariantName] = useState(() => {
// // // //       const stored = getStoredVariantName(product?.id);
// // // //       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// // // //       return match ? match.name : (variants[0]?.name || "");
// // // //     });

// // // //     useEffect(() => {
// // // //       const stored = getStoredVariantName(product?.id);
// // // //       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// // // //       const nextName = match ? match.name : (variants[0]?.name || "");
// // // //       setSelectedVariantName(nextName);
// // // //     }, [product?.id, variants.length]);

// // // //     const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
// // // //     const displayImage = selectedVariant?.image || product.image || "";

// // // //     const handleSelectColor = (variant, e) => {
// // // //       e.stopPropagation();
// // // //       setSelectedVariantName(variant.name);
// // // //       setStoredVariantName(product.id, variant.name);
// // // //     };

// // // //     return (
// // // //       <div
// // // //         onMouseEnter={() => setHov(true)}
// // // //         onMouseLeave={() => setHov(false)}
// // // //         onClick={() => navigate(`#/products/${product.id}`)}
// // // //         onKeyDown={(event) => {
// // // //           if (event.key === "Enter" || event.key === " ") {
// // // //             event.preventDefault();
// // // //             navigate(`#/products/${product.id}`);
// // // //           }
// // // //         }}
// // // //         role="button"
// // // //         tabIndex={0}
// // // //         style={{
// // // //           background: "#fff",
// // // //           border: "1.5px solid #e5e0d8",
// // // //           position: "relative",
// // // //           cursor: "pointer",
// // // //           transition: "box-shadow 0.3s, transform 0.3s",
// // // //           boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
// // // //           transform: hov ? "translateY(-3px)" : "none"
// // // //         }}
// // // //       >
// // // //         {discount > 0 && !product.tag && (
// // // //           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 8px" }}>−{discount}%</div>
// // // //         )}
// // // //         {product.tag && (
// // // //           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BLACK, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "4px 10px" }}>{product.tag}</div>
// // // //         )}

// // // //         <WishlistHeart productId={product.id} size="md" placement="card" />

// // // //         <div style={{ height: isMobile ? 140 : 190, display: "flex", alignItems: "center", justifyContent: "center", background: hov ? CREAM : "#FAFAF5", transition: "background 0.3s", position: "relative" }}>
// // // //           {displayImage ? (
// // // //             <img src={displayImage} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 18, transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s" }} />
// // // //           ) : (
// // // //             <Frame shape="round" size={130} color={hov ? BRAND : "#4a4a4a"} />
// // // //           )}

// // // //           {variants.length > 1 && (
// // // //             <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 6, zIndex: 3 }}>
// // // //               {variants.map((variant) => {
// // // //                 const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
// // // //                 return (
// // // //                   <button
// // // //                     key={variant.name}
// // // //                     onClick={(e) => handleSelectColor(variant, e)}
// // // //                     title={variant.name}
// // // //                     style={{
// // // //                       width: 20,
// // // //                       height: 20,
// // // //                       borderRadius: "50%",
// // // //                       border: active ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.1)",
// // // //                       background: variant.swatch || "#d9d9d9",
// // // //                       cursor: "pointer",
// // // //                       padding: 0,
// // // //                       boxShadow: active ? "0 0 0 2px rgba(12,44,65,0.12)" : "none",
// // // //                     }}
// // // //                   />
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //         <div style={{ padding: "6px 14px 14px" }}>
// // // //           <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.14em", marginBottom: 2 }}>{(product.category || "Eyeglasses").toUpperCase()}</div>
// // // //           <div style={{ fontFamily: ff, fontSize: isMobile ? 14 : 16, fontWeight: 900, letterSpacing: "0.05em", color: BLACK, marginBottom: 10 }}>
// // // //             {product.name}
// // // //           </div>
// // // //           <div style={{ fontSize: 12, color: "#666", fontFamily: mono, marginBottom: 10, minHeight: 36 }}>{product.shortDescription || product.description?.slice(0, 80)}</div>
// // // //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // //             <div style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>PKR {discountPrice.toLocaleString()}</div>
// // // //             <button
// // // //               onClick={(e) => { e.stopPropagation(); addToCart(product, 1); setAddedMsg(true); setTimeout(() => setAddedMsg(false), 1800); }}
// // // //               style={{
// // // //                 border: `1.5px solid ${BRAND}`,
// // // //                 padding: "7px 16px",
// // // //                 fontSize: 10,
// // // //                 fontWeight: 900,
// // // //                 letterSpacing: "0.12em",
// // // //                 cursor: "pointer",
// // // //                 background: addedMsg ? "#16a34a" : hov ? BRAND : "transparent",
// // // //                 color: addedMsg ? "#fff" : hov ? BRAND_TEXT : BRAND,
// // // //                 transition: "all 0.22s"
// // // //               }}
// // // //             >
// // // //               {addedMsg ? "✓ ADDED" : hov ? "ADD TO BAG" : "SELECT"}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // ====== RENDER ======
// // // //   return (
// // // //     <div style={{ color: BLACK }}>
// // // //       {/* ====== HERO ====== */}
// // // //       <section
// // // //         style={{
// // // //           minHeight: isMobile ? "60vh" : "88vh",
// // // //           backgroundImage: `url(${slide.image})`,
// // // //           backgroundSize: "cover",
// // // //           backgroundPosition: "center",
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           position: "relative",
// // // //           overflow: "hidden",
// // // //           transition: "background-image 1.1s ease",
// // // //         }}
// // // //       >
// // // //         <div style={{
// // // //           position: "absolute",
// // // //           inset: 0,
// // // //           background: slide.dark
// // // //             ? "rgba(0,0,0,0.55)"
// // // //             : "rgba(255,255,255,0.25)",
// // // //           zIndex: 0,
// // // //         }} />

// // // //         <div style={{
// // // //           maxWidth: 1200,
// // // //           margin: "0 auto",
// // // //           padding: isMobile ? "40px 20px" : "80px 40px",
// // // //           display: "grid",
// // // //           gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
// // // //           gap: isMobile ? 40 : 80,
// // // //           alignItems: "center",
// // // //           width: "100%",
// // // //           position: "relative",
// // // //           zIndex: 1,
// // // //         }}>
// // // //           <div>
// // // //             <div style={{
// // // //               display: "inline-block",
// // // //               fontSize: 10,
// // // //               letterSpacing: "0.2em",
// // // //               border: `1px solid ${slide.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
// // // //               color: slide.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
// // // //               padding: "5px 14px",
// // // //               marginBottom: 24
// // // //             }}>
// // // //               {slide.label}
// // // //             </div>
// // // //             <h1 style={{
// // // //               fontWeight: 900,
// // // //               fontSize: isMobile ? "clamp(40px, 12vw, 60px)" : "clamp(54px, 8vw, 108px)",
// // // //               lineHeight: 0.92,
// // // //               margin: "0 0 20px",
// // // //               color: slide.dark ? "#fff" : BLACK,
// // // //               letterSpacing: "0.01em",
// // // //               whiteSpace: "pre-line"
// // // //             }}>
// // // //               {slide.heading}
// // // //             </h1>
// // // //             <p style={{
// // // //               fontSize: isMobile ? 14 : 15,
// // // //               lineHeight: 1.8,
// // // //               maxWidth: 400,
// // // //               margin: "0 0 36px",
// // // //               color: slide.dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
// // // //               fontFamily: mono
// // // //             }}>
// // // //               {slide.sub}
// // // //             </p>
// // // //             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// // // //               <button onClick={() => navigate("#/products")} style={{ background: BRAND, color: "#fff", border: "none", padding: "12px 24px", fontSize: isMobile ? 13 : 15, cursor: "pointer" }}>
// // // //                 SHOP NOW
// // // //               </button>
// // // //               <OutlineBtn dark={!!slide.dark}>{slide.ctaSecond} →</OutlineBtn>
// // // //             </div>
// // // //           </div>
// // // //           <div />
// // // //         </div>

// // // //         <div style={{
// // // //           position: "absolute",
// // // //           bottom: 28,
// // // //           left: "50%",
// // // //           transform: "translateX(-50%)",
// // // //           display: "flex",
// // // //           gap: 10,
// // // //           zIndex: 2,
// // // //         }}>
// // // //           {HERO_SLIDES.map((_, i) => (
// // // //             <button
// // // //               key={i}
// // // //               onClick={() => setHeroSlide(i)}
// // // //               style={{
// // // //                 height: 3,
// // // //                 border: "none",
// // // //                 cursor: "pointer",
// // // //                 borderRadius: 0,
// // // //                 background: i === heroSlide ? BRAND : slide.dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
// // // //                 width: i === heroSlide ? 32 : 10,
// // // //                 transition: "all 0.35s"
// // // //               }}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       </section>

// // // //       {/* ====== STATS ====== */}
// // // //       <section style={{ background: BLACK, padding: isMobile ? "32px 20px" : "56px 40px" }}>
// // // //         <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 16 : 0 }}>
// // // //           {[{ v: 150, s: "+", l: "Frame Styles" }, { v: 10, s: "+", l: "Years in Karachi" }, { v: 8500, s: "+", l: "Happy Customers" }, { v: 99, s: "%", l: "Satisfaction Rate" }].map((st, i) => (
// // // //             <FadeIn key={st.l} delay={i * 100} style={{ textAlign: "center", padding: "16px 0", borderRight: (i < 3 && !isMobile) ? "1px solid #1e1e1e" : "none" }}>
// // // //               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(40px,5vw,64px)", color: BRAND, lineHeight: 1 }}><Counter target={st.v} suffix={st.s}/></div>
// // // //               <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginTop: 8 }}>{st.l.toUpperCase()}</div>
// // // //             </FadeIn>
// // // //           ))}
// // // //         </div>
// // // //       </section>

// // // //       {/* ====== HERITAGE QUOTE ====== */}
// // // //       <section style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center", borderBottom: "2px solid #e8ddd0" }}>
// // // //         <FadeIn>
// // // //           <div style={{ maxWidth: 680, margin: "0 auto" }}>
// // // //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 28px" }}/>
// // // //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 18 }}>EYE-CONIC EYEWEAR, SINCE 2015</div>
// // // //             <blockquote style={{ fontFamily: mono, fontSize: isMobile ? "clamp(16px, 5vw, 22px)" : "clamp(18px, 2.8vw, 28px)", lineHeight: 1.5, color: BLACK, margin: "0 0 20px", fontStyle: "italic" }}>"For over a decade, our name has been on the front door. That means something."</blockquote>
// // // //             <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#666", fontFamily: ff }}>TARIQ HASSAN · FOUNDER, URBAN EYE</div>
// // // //             <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
// // // //               <a href="#/story" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>OUR STORY</a>
// // // //               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", borderBottom: "2px solid #ddd", paddingBottom: 2 }}>SHOP EYEGLASSES</a>
// // // //             </div>
// // // //           </div>
// // // //         </FadeIn>
// // // //       </section>

// // // //       {/* ====== CATEGORIES ====== */}
// // // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#fff" }}>
// // // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // // //           <FadeIn>
// // // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
// // // //               <div>
// // // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>BROWSE</div>
// // // //                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>SHOP BY CATEGORY</h2>
// // // //               </div>
// // // //               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: "#888", textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>VIEW ALL →</a>
// // // //             </div>
// // // //           </FadeIn>
// // // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 2 }}>
// // // //             {CATEGORIES_HOME.map((cat, i) => (
// // // //               <FadeIn key={cat.label} delay={i * 80}>
// // // //                 <div onClick={() => navigate(`#/collections/${cat.slug}`)} style={{ height: isMobile ? 220 : 330, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 16 : 28, cursor: "pointer", position: "relative", overflow: "hidden", background: cat.dark ? BLACK : CREAM, color: cat.dark ? "#fff" : BLACK }}>
// // // //                   <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: BRAND }}/>
// // // //                   <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
// // // //                     <Frame shape={cat.shape} size={isMobile ? 120 : 190} color={cat.dark ? "#fff" : "#000"}/>
// // // //                   </div>
// // // //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", marginBottom: 6, opacity: 0.5 }}>{cat.count.toUpperCase()}</div>
// // // //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 16 : 20, fontWeight: 900, letterSpacing: "0.04em" }}>{cat.label.toUpperCase()}</div>
// // // //                   <div style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 12, color: cat.dark ? "#89c4e1" : BRAND, fontWeight: 900 }}>SHOP NOW →</div>
// // // //                 </div>
// // // //               </FadeIn>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* ====== BEST SELLERS ====== */}
// // // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#FAFAF5" }}>
// // // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // // //           <FadeIn>
// // // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
// // // //               <div>
// // // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>HANDPICKED</div>
// // // //                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>BEST SELLERS</h2>
// // // //               </div>
// // // //               <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// // // //                 {FILTERS.map(f => (
// // // //                   <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", fontSize: isMobile ? 8 : 10, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", border: `1.5px solid ${filter === f ? BRAND : "#ddd"}`, background: filter === f ? BRAND : "transparent", color: filter === f ? BRAND_TEXT : "#888", fontFamily: ff, transition: "all 0.2s" }}>{f.toUpperCase()}</button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </FadeIn>
// // // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 14 }}>
// // // //             {filtered.map((p, i) => <FadeIn key={p.name} delay={i * 55}><HomeProductCard product={p} /></FadeIn>)}
// // // //           </div>
// // // //           <FadeIn delay={280}>
// // // //             <div style={{ textAlign: "center", marginTop: 44 }}>
// // // //               <YBtn onClick={() => navigate("#/collections/family-favorites")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>VIEW ALL FRAMES</YBtn>
// // // //             </div>
// // // //           </FadeIn>
// // // //         </div>
// // // //       </section>

// // // //       {/* ====== CUSTOM TINTS ====== */}
// // // //       {/* <section style={{ background: BLACK, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // // //           <Frame shape="cateye" size={isMobile ? 400 : 900} color="#fff"/>
// // // //         </div>
// // // //         <FadeIn>
// // // //           <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
// // // //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // // //             <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#444", marginBottom: 12 }}>EXCLUSIVE TO URBAN EYE</div>
// // // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: "#fff", lineHeight: 0.92, margin: "0 0 6px" }}>CUSTOM MADE</h2>
// // // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: "#89c4e1", lineHeight: 0.92, margin: "0 0 28px" }}>TINTS™</h2>
// // // //             <p style={{ fontSize: isMobile ? 13 : 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontFamily: mono }}>Choose any frame. Choose any tint. Our opticians hand-apply your chosen colour — 20+ shades to make it yours.</p>
// // // //             <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
// // // //               {TINTS.map(t => (
// // // //                 <div key={t.name} title={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
// // // //                   <div style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: "50%", background: t.color, boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}/>
// // // //                   <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", fontFamily: ff }}>{t.name}</span>
// // // //                 </div>
// // // //               ))}
// // // //               <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>+12 more</div>
// // // //             </div>
// // // //             <YBtn onClick={() => navigate("#/collections/custom-made-tints")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>SHOP CUSTOM TINTS™</YBtn>
// // // //           </div>
// // // //         </FadeIn>
// // // //       </section>


// // // // {/* ====== CUSTOM TINTS ====== */}
// // // // <section style={{ background: CREAM, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "2px solid #e8ddd0", borderBottom: "2px solid #e8ddd0" }}>
// // // //   <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
// // // //     <Frame shape="cateye" size={isMobile ? 400 : 900} color={BLACK}/>
// // // //   </div>
// // // //   <FadeIn>
// // // //     <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
// // // //       <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // // //       <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#888", marginBottom: 12 }}>EXCLUSIVE TO URBAN EYE</div>
// // // //       <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BLACK, lineHeight: 0.92, margin: "0 0 6px" }}>CUSTOM MADE</h2>
// // // //       <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BRAND, lineHeight: 0.92, margin: "0 0 28px" }}>TINTS™</h2>
// // // //       <p style={{ fontSize: isMobile ? 13 : 15, color: "#666", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontFamily: mono }}>Choose any frame. Choose any tint. Our opticians hand-apply your chosen colour — 20+ shades to make it yours.</p>
// // // //       <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
// // // //         {TINTS.map(t => (
// // // //           <div key={t.name} title={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
// // // //             <div style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: "50%", background: t.color, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}/>
// // // //             <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#999", fontFamily: ff }}>{t.name}</span>
// // // //           </div>
// // // //         ))}
// // // //         <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#999", marginLeft: 8 }}>+12 more</div>
// // // //       </div>
// // // //       <YBtn onClick={() => navigate("#/collections/custom-made-tints")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>SHOP CUSTOM TINTS™</YBtn>
// // // //     </div>
// // // //   </FadeIn>
// // // // </section>









// // // //       {/* ====== HOW IT WORKS ====== */}
// // // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: BLACK }}>
// // // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // // //           <FadeIn>
// // // //             <div style={{ textAlign: "center", marginBottom: 56 }}>
// // // //               <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
// // // //               <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#444", marginBottom: 10 }}>HOW IT WORKS</div>
// // // //               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,48px)", color: "#fff", margin: 0 }}>FROM BROWSE TO DELIVERED</h2>
// // // //             </div>
// // // //           </FadeIn>
// // // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: 28, position: "relative" }}>
// // // //             {!isMobile && <div style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 1, background: "#1e1e1e" }}/>}
// // // //             {PROCESS_STEPS.map((step, i) => (
// // // //               <FadeIn key={step.num} delay={i * 90}>
// // // //                 <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
// // // //                   <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${BRAND}`, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: ff, fontSize: 15, fontWeight: 900, color: "#89c4e1" }}>{step.num}</div>
// // // //                   <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.08em", marginBottom: 8 }}>{step.title}</div>
// // // //                   <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, fontFamily: mono }}>{step.desc}</div>
// // // //                 </div>
// // // //               </FadeIn>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </section> */}

// // // //       {/* ====== TESTIMONIALS ====== */}
// // // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: CREAM }}>
// // // //         <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
// // // //           <FadeIn>
// // // //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
// // // //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>REVIEWS</div>
// // // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", marginBottom: 52, letterSpacing: "0.02em" }}>WHAT OUR CUSTOMERS SAY</h2>
// // // //             <div style={{ position: "relative", minHeight: isMobile ? 280 : 200 }}>
// // // //               {TESTIMONIALS.map((t, i) => (
// // // //                 <div key={t.name} style={{ position: "absolute", inset: 0, opacity: i === testimonialIdx ? 1 : 0, transform: i === testimonialIdx ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s ease", pointerEvents: i === testimonialIdx ? "auto" : "none" }}>
// // // //                   <div style={{ fontSize: 20, color: BRAND, marginBottom: 18, letterSpacing: 4 }}>{"★".repeat(t.rating)}</div>
// // // //                   <blockquote style={{ fontFamily: mono, fontStyle: "italic", lineHeight: 1.65, fontSize: isMobile ? "clamp(14px, 4vw, 18px)" : "clamp(15px,2.2vw,20px)", color: BLACK, margin: "0 0 24px" }}>"{t.text}"</blockquote>
// // // //                   <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em" }}>{t.name}</div>
// // // //                   <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.1em", marginTop: 4 }}>{t.city}</div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: isMobile ? 280 : 210 }}>
// // // //               {TESTIMONIALS.map((_, i) => (
// // // //                 <button key={i} onClick={() => setTIdx(i)} style={{ height: 3, border: "none", cursor: "pointer", background: i === testimonialIdx ? BRAND : "#ccc", width: i === testimonialIdx ? 28 : 10, transition: "all 0.35s" }}/>
// // // //               ))}
// // // //             </div>
// // // //           </FadeIn>
// // // //         </div>
// // // //       </section>

// // // //       {/* ====== FINAL CTA ====== */}
// // // //       <section style={{ background: BLACK, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // // //           <Frame shape="aviator" size={isMobile ? 400 : 1000} color="#fff"/>
// // // //         </div>
// // // //         <FadeIn>
// // // //           <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#444", marginBottom: 14 }}>START YOUR JOURNEY</div>
// // // //           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#fff", lineHeight: 0.92, margin: "0 0 8px" }}>FIND YOUR</h2>
// // // //           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#89c4e1", lineHeight: 0.92, margin: "0 0 28px" }}>FRAME.</h2>
// // // //           <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.35)", maxWidth: 420, margin: "0 auto 44px", lineHeight: 1.85, fontFamily: mono }}>150+ premium frames. Expert fitting. Free shipping across Pakistan.</p>
// // // //           <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
// // // //             <YBtn onClick={() => navigate("#/collections/eyeglasses")} style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>SHOP ALL FRAMES</YBtn>
// // // //             <OutlineBtn dark style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>VIRTUAL TRY-ON →</OutlineBtn>
// // // //           </div>
// // // //         </FadeIn>
// // // //       </section>

// // // //       <style>{`@keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.5; } 50% { transform:scale(1.07); opacity:0.9; } }`}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ PRODUCTS PAGE ============
// // // // export function ProductsPage({ navigate, queryParams }) {
// // // //   const buildFiltersFromQuery = (qp) => {
// // // //     if (!qp) return {};
// // // //     const result = {};
// // // //     if (qp.category) result.category = [qp.category];
// // // //     if (qp.shape)     result.shape    = [qp.shape];
// // // //     if (qp.gender)    result.gender   = [qp.gender];
// // // //     if (qp.tag)       result.tag      = [qp.tag];
// // // //     if (qp.price)     result.price    = [qp.price];
// // // //     return result;
// // // //   };

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // // //   const [activeFilters, setActiveFilters] = useState(() => buildFiltersFromQuery(queryParams));
// // // //   const [sort, setSort] = useState("featured");
// // // //   const [filtersOpen, setFiltersOpen] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState("");

// // // //   useEffect(() => {
// // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     setActiveFilters(buildFiltersFromQuery(queryParams));
// // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // //   }, [JSON.stringify(queryParams)]);

// // // //   const filtered = applyFilters(PRODUCTS_DATA, activeFilters, sort, searchTerm);
// // // //   let cols = 4;
// // // //   if (isMobile) cols = 2;
// // // //   else if (isTablet) cols = 2;
// // // //   else cols = filtersOpen ? 3 : 4;

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // // //       <div style={{ background: BLACK, padding: isMobile ? "48px 20px" : "72px 40px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// // // //           <Frame shape="round" size={isMobile ? 400 : 700} color="#fff"/>
// // // //         </div>
// // // //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// // // //           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10, fontFamily: ff }}>URBAN EYE · ALL FRAMES</div>
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: "0 0 20px" }}>THE COLLECTION</h1>
// // // //           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>{PRODUCTS_DATA.length} frames. Each handpicked. All obsessively crafted.</p>
// // // //           <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
// // // //             <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, category, or keyword" style={{ width: "min(520px, 100%)", border: "none", padding: "12px 16px", fontSize: 13, fontFamily: mono, outline: "none" }} />
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => setFiltersOpen(v => !v)} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// // // //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
// // // //         <FilterSidebar allProducts={PRODUCTS_DATA} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
// // // //         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
// // // //           {filtered.length === 0 ? (
// // // //             <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: mono }}>No frames match the current filters.</div>
// // // //           ) : (
// // // //             <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 12 : 20, transition: "grid-template-columns 0.3s" }}>
// // // //               {filtered.map((p, i) => (
// // // //                 <FadeIn key={p.id} delay={Math.min(i * 40, 400)}>
// // // //                   <ProductCard product={p} navigate={navigate} />
// // // //                 </FadeIn>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ COLLECTION DETAIL PAGE ============
// // // // export function CollectionDetailPage({ slug, navigate }) {
// // // //   const col = COLLECTIONS[slug] || COLLECTIONS["default"];
// // // //   const baseProducts = PRODUCTS_DATA.filter(col.filter);
// // // //   const [activeFilters, setActiveFilters] = useState({});
// // // //   const [sort, setSort] = useState("featured");
// // // //   const [filtersOpen, setFiltersOpen] = useState(() => {
// // // //     try { return JSON.parse(localStorage.getItem("os_filters_open") ?? "true"); } catch { return true; }
// // // //   });
// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // // //   useEffect(() => {
// // // //     const fn = () => {};
// // // //     window.addEventListener("resize", fn);
// // // //     return () => window.removeEventListener("resize", fn);
// // // //   }, []);
// // // //   useEffect(() => { localStorage.setItem("os_filters_open", JSON.stringify(filtersOpen)); }, [filtersOpen]);
// // // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveFilters({}); }, [slug]);

// // // //   const filtered = applyFilters(baseProducts, activeFilters, sort);
// // // //   let cols = 4;
// // // //   if (isMobile) cols = 2;
// // // //   else if (isTablet) cols = 2;
// // // //   else cols = filtersOpen ? 3 : 4;

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // // //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // // //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
// // // //         </div>
// // // //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// // // //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginBottom: 12, fontFamily: ff }}>
// // // //             <a href="#/" style={{ color: "#555", textDecoration: "none" }}>HOME</a>
// // // //             <span style={{ margin: "0 8px", color: "#333" }}>›</span>
// // // //             <span style={{ color: "#aaa" }}>{col.title}</span>
// // // //           </div>
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 6vw, 72px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 16px" }}>{col.title}</h1>
// // // //           <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>{col.desc}</p>
// // // //         </div>
// // // //       </div>

// // // //       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => { isMobile ? setFiltersOpen(true) : setFiltersOpen(v => !v); }} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// // // //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
// // // //         <FilterSidebar allProducts={baseProducts} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
// // // //         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
// // // //           {filtered.length === 0 ? (
// // // //             <div style={{ textAlign: "center", padding: "80px 0" }}>
// // // //               <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
// // // //               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 22, color: BLACK, marginBottom: 10, letterSpacing: "0.04em" }}>NO FRAMES FOUND</div>
// // // //               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 28 }}>Try adjusting your filters.</div>
// // // //               <button onClick={() => setActiveFilters({})} style={{ background: BLACK, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff }}>CLEAR FILTERS</button>
// // // //             </div>
// // // //           ) : (
// // // //             <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 12 : 16, transition: "grid-template-columns 0.35s ease" }}>
// // // //               {filtered.map((p, i) => (
// // // //                 <FadeIn key={p.id} delay={Math.min(i * 35, 300)}>
// // // //                   <ProductCard product={p} navigate={navigate} />
// // // //                 </FadeIn>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ PRODUCT DETAIL PAGE ============
// // // // export function ProductDetailPage({ productId, navigate }) {
// // // //   const product = PRODUCTS_DATA.find(p => p.id === productId);
// // // //   const [activeImg, setActiveImg] = useState(0);
// // // //   const [qty, setQty] = useState(1);
// // // //   const [added, setAdded] = useState(false);
// // // //   const [openTab, setOpenTab] = useState("details");
// // // //   const [selectedSize, setSelectedSize] = useState(null);
// // // //   const [selectedVariantName, setSelectedVariantName] = useState("");
// // // //   const { addToCart } = useCart();

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // // //   useEffect(() => {
// // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // //     setActiveImg(0); setAdded(false); setSelectedSize(null);
// // // //   }, [productId]);

// // // //   useEffect(() => {
// // // //     if (!product) return;
// // // //     const variants = getProductVariants(product);
// // // //     const stored = getStoredVariantName(product.id);
// // // //     const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// // // //     const nextName = match ? match.name : variants[0]?.name || "";
// // // //     setSelectedVariantName(nextName);
// // // //     setActiveImg(0);
// // // //   }, [product?.id]);

// // // //   if (!product) return (
// // // //     <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
// // // //       <div style={{ fontSize: 48, fontWeight: 900, color: BLACK, marginBottom: 16 }}>404</div>
// // // //       <div style={{ fontSize: 14, color: "#888", fontFamily: mono, marginBottom: 28 }}>Frame not found.</div>
// // // //       <YBtn onClick={() => navigate("#/products")}>← BACK TO COLLECTION</YBtn>
// // // //     </div>
// // // //   );

// // // //   const related = getRelatedProducts(PRODUCTS_DATA, product);
// // // //   const { price, discountPrice } = getProductDisplayPrice(product);
// // // //   const discount = getProductDiscountPercent(product);
// // // //   const tc = product.tag ? tagColors[product.tag] : null;
// // // //   const sizes = product.sizes?.length ? product.sizes : ["44 (Narrow)", "46 (Average)", "49 (Wide)", "52 (Extra Wide)"];
// // // //   const variants = getProductVariants(product);
// // // //   const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
// // // //   const galleryImages = selectedVariant?.gallery?.length
// // // //     ? selectedVariant.gallery
// // // //     : (product.gallery?.length ? product.gallery : (selectedVariant?.image ? [selectedVariant.image] : []));
// // // //   const displayImage = galleryImages[activeImg] || selectedVariant?.image || product.image || "";
// // // //   const displayLabel = selectedVariant?.name || product.color || "Default";

// // // //   const handleSelectVariant = (variant) => {
// // // //     setSelectedVariantName(variant.name);
// // // //     setStoredVariantName(product.id, variant.name);
// // // //     setActiveImg(0);
// // // //   };

// // // //   const AccordionItem = ({ id, label, children }) => {
// // // //     const isOpen = openTab === id;
// // // //     return (
// // // //       <div style={{ borderBottom: "1px solid #e8e0d0" }}>
// // // //         <button onClick={() => setOpenTab(isOpen ? null : id)} style={{ width: "100%", background: "none", border: "none", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: ff, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textAlign: "left" }}>
// // // //           {label}
// // // //           <span style={{ fontSize: 22, fontWeight: 300, lineHeight: 1, color: BLACK }}>{isOpen ? "−" : "+"}</span>
// // // //         </button>
// // // //         {isOpen && <div style={{ paddingBottom: 20 }}>{children}</div>}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: ff }}>
// // // //       <div style={{ borderBottom: "1px solid #e8e0d0", padding: "13px 20px" }}>
// // // //         <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
// // // //           {[{ label: "HOME", path: "#/" }, { label: "COLLECTION", path: "#/products" }, { label: product.name.toUpperCase(), path: null }].map((crumb, i) => (
// // // //             <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // // //               {i > 0 && <span style={{ color: "#ccc", fontSize: 10 }}>›</span>}
// // // //               {crumb.path ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
// // // //                 : <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
// // // //             </span>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px 60px" : "0 40px 80px" }}>
// // // //         <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "55% 45%", gap: 0, alignItems: "flex-start" }}>
// // // //           <FadeIn>
// // // //             <div style={{ paddingRight: isMobile ? 0 : 72 }}>
// // // //               <div style={{ position: "relative", overflow: "hidden", background: CREAM, marginBottom: 10, height: isMobile ? "50vh" : "calc(100vh - 110px)", minHeight: isMobile ? 300 : 560, maxHeight: isMobile ? 400 : 740, border: "1px solid #e8e0d0", boxSizing: "border-box", padding: isMobile ? "20px" : "64px 80px" }}>
// // // //                 {product.tag && tc && (
// // // //                   <div style={{ position: "absolute", top: 20, left: 20, zIndex: 3, background: tc.bg, color: tc.color, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", padding: "6px 14px", fontFamily: ff }}>{product.tag}</div>
// // // //                 )}
// // // //                 {discount > 0 && (
// // // //                   <div style={{ position: "absolute", top: 20, right: 20, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "5px 12px", fontFamily: ff }}>−{discount}% OFF</div>
// // // //                 )}
// // // //                 <div style={{ width: "100%", height: "100%", border: "1.5px solid #d8cfc0", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
// // // //                   <img key={`${product.id}-${activeImg}-${displayLabel}`} src={`${displayImage}`} alt={`${product.name} - ${displayLabel}`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 12 : 24, animation: "fadeImgIn 0.35s ease", boxSizing: "border-box" }} />
// // // //                 </div>
// // // //               </div>
// // // //               {galleryImages.length > 1 && (
// // // //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// // // //                   {galleryImages.map((img, i) => (
// // // //                     <div key={`${product.id}-${i}`} onClick={() => setActiveImg(i)} style={{ width: isMobile ? 60 : 100, height: isMobile ? 50 : 76, overflow: "hidden", cursor: "pointer", background: CREAM, flexShrink: 0, border: i === activeImg ? `2px solid ${BLACK}` : "1px solid #e8e0d0", opacity: i === activeImg ? 1 : 0.45, transition: "border-color 0.15s, opacity 0.15s", boxSizing: "border-box" }}>
// // // //                       <img src={`${img}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 4 : 8, boxSizing: "border-box" }} />
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </FadeIn>

// // // //           <FadeIn delay={120}>
// // // //             <div style={{ paddingTop: isMobile ? 32 : 52 }}>
// // // //               <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
// // // //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.category?.toUpperCase()}</span>
// // // //                 <span style={{ color: "#ddd" }}>·</span>
// // // //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.subcategory?.toUpperCase()}</span>
// // // //                 <span style={{ color: "#ddd" }}>·</span>
// // // //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.gender?.toUpperCase()}</span>
// // // //               </div>

// // // //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7, flexWrap: "wrap" }}>
// // // //                 <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3.2vw, 42px)", lineHeight: 1, color: BLACK, margin: 0, letterSpacing: "0.04em", flex: 1, paddingRight: 16 }}>
// // // //                   {product.name}
// // // //                 </h1>
// // // //                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginTop: 4 }}>
// // // //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 600, color: BLACK, whiteSpace: "nowrap" }}>
// // // //                     PKR {formatPriceValue(discountPrice)}
// // // //                   </div>
// // // //                   <WishlistHeart productId={product.id} size="lg" placement="detail" />
// // // //                 </div>
// // // //               </div>

// // // //               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 16, letterSpacing: "0.04em" }}>{displayLabel}</div>
// // // //               {variants.length > 1 && (
// // // //                 <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
// // // //                   {variants.map((variant) => {
// // // //                     const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
// // // //                     return (
// // // //                       <button
// // // //                         key={variant.name}
// // // //                         onClick={() => handleSelectVariant(variant)}
// // // //                         style={{
// // // //                           display: "inline-flex",
// // // //                           alignItems: "center",
// // // //                           gap: 8,
// // // //                           border: active ? `1.5px solid ${BLACK}` : "1px solid #d8d0c8",
// // // //                           background: active ? "#fff" : "#faf7f2",
// // // //                           padding: "8px 12px",
// // // //                           cursor: "pointer",
// // // //                           fontFamily: ff,
// // // //                           fontSize: 11,
// // // //                           letterSpacing: "0.08em",
// // // //                           color: BLACK,
// // // //                         }}
// // // //                       >
// // // //                         <span style={{ width: 14, height: 14, borderRadius: "50%", background: variant.swatch || "#d9d9d9", border: "1px solid rgba(0,0,0,0.12)" }} />
// // // //                         {variant.name}
// // // //                       </button>
// // // //                     );
// // // //                   })}
// // // //                 </div>
// // // //               )}
// // // //               <div style={{ width: 36, height: 3, background: BRAND, marginBottom: 18 }} />

// // // //               {discountPrice < price && (
// // // //                 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
// // // //                   <span style={{ fontFamily: mono, fontSize: isMobile ? 13 : 15, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</span>
// // // //                   {discount > 0 && <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 900, background: BRAND, color: BRAND_TEXT, padding: "4px 10px", letterSpacing: "0.1em" }}>SAVE {discount}%</span>}
// // // //                 </div>
// // // //               )}

// // // //               <p style={{ fontSize: isMobile ? 12 : 13, color: "#555", lineHeight: 1.9, fontFamily: mono, marginBottom: 28, maxWidth: 420 }}>{product.description}</p>

// // // //               <div style={{ marginBottom: 26 }}>
// // // //                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
// // // //                   <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>SIZE</span>
// // // //                   <span style={{ fontSize: 11, color: "#888", fontFamily: mono, textDecoration: "underline", cursor: "pointer", letterSpacing: "0.04em" }}>Size Chart</span>
// // // //                 </div>
// // // //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// // // //                   {sizes.map(size => (
// // // //                     <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", fontFamily: ff, cursor: "pointer", border: "1.5px solid", borderColor: selectedSize === size ? BLACK : "#d8d0c8", background: selectedSize === size ? BLACK : "#fff", color: selectedSize === size ? "#fff" : BLACK, transition: "all 0.15s" }}>
// // // //                       {size}
// // // //                     </button>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>

// // // //               <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
// // // //                 <div style={{ display: "flex", border: "1.5px solid #e8e0d0", alignItems: "center", flexShrink: 0 }}>
// // // //                   <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", width: 42, height: 50, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>−</button>
// // // //                   <span style={{ width: 38, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{qty}</span>
// // // //                   <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", width: 42, height: 50, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>+</button>
// // // //                 </div>
// // // //                 <button onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ flex: 1, background: added ? "#16a34a" : "#0c2c41", color: "#fff", border: "none", padding: "15px 24px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, transition: "background 0.3s" }}>
// // // //                   {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
// // // //                 </button>
// // // //               </div>

// // // //               {added && (
// // // //                 <button onClick={() => navigate("#/cart")} style={{ width: "100%", background: BRAND, color: BRAND_TEXT, border: "none", padding: "13px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, marginBottom: 14 }}>
// // // //                   VIEW BAG & CHECKOUT →
// // // //                 </button>
// // // //               )}

// // // //               <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "18px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4", marginBottom: 28 }}>
// // // //                 {[{ icon: "🚚", text: "Free shipping across Pakistan" }, { icon: "↩", text: "30-day hassle-free returns" }, { icon: "✦", text: "Prescription lenses available" }, { icon: "★", text: "Genuine Italian / Japanese craftsmanship" }].map((b, i) => (
// // // //                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // // //                     <span style={{ fontSize: 13 }}>{b.icon}</span>
// // // //                     <span style={{ fontSize: 12, color: "#666", fontFamily: mono, letterSpacing: "0.02em" }}>{b.text}</span>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <div style={{ borderTop: "1px solid #e8e0d0" }}>
// // // //                 <AccordionItem id="details" label="DETAILS">
// // // //                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // // //                     <tbody>
// // // //                       {Object.entries(product.specifications || {}).map(([k, v], i) => (
// // // //                         <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
// // // //                           <td style={{ padding: "9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%" }}>{k.toUpperCase()}</td>
// // // //                           <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 </AccordionItem>
// // // //                 <AccordionItem id="measurements" label="MEASUREMENTS">
// // // //                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // // //                     <tbody>
// // // //                       {Object.entries(product.measurements || {}).map(([k, v], i) => (
// // // //                         <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
// // // //                           <td style={{ padding: "9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%" }}>{k.toUpperCase()}</td>
// // // //                           <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 </AccordionItem>
// // // //               </div>
// // // //             </div>
// // // //           </FadeIn>
// // // //         </div>
// // // //       </div>

// // // //       <ProductReviewsSection productId={productId} navigate={navigate} />

// // // //       {related.length > 0 && (
// // // //         <div style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", borderTop: "2px solid #e8ddd0" }}>
// // // //           <div style={{ maxWidth: 1400, margin: "0 auto" }}>
// // // //             <FadeIn>
// // // //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 44, flexWrap: "wrap", gap: 12 }}>
// // // //                 <div>
// // // //                   <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>YOU MAY ALSO LIKE</div>
// // // //                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(26px, 4vw, 42px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>RELATED FRAMES</h2>
// // // //                 </div>
// // // //                 <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid ${BLACK}`, padding: "10px 20px", fontSize: isMobile ? 10 : 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: BLACK, fontFamily: ff }}>VIEW ALL →</button>
// // // //               </div>
// // // //             </FadeIn>
// // // //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
// // // //               {related.map((p, i) => (
// // // //                 <FadeIn key={p.id} delay={i * 80}>
// // // //                   <ProductCard product={p} navigate={navigate} />
// // // //                 </FadeIn>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <style>{`@keyframes fadeImgIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }`}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ CART PAGE ============
// // // // export function CartPage({ navigate }) {
// // // //   const { cartItems, removeFromCart, updateQty, cartTotal, clearCart, loading, syncing, pendingSync } = useCart();
// // // //   const { user } = useAuth();
// // // //   const [localCart, setLocalCart] = useState([]);

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
// // // //   useEffect(() => { setLocalCart(cartItems); }, [cartItems]);

// // // //   const shipping = cartTotal >= 5000 ? 0 : 350;
// // // //   const grandTotal = cartTotal + shipping;

// // // //   if (loading) {
// // // //     return (
// // // //       <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0" }}>
// // // //         <div style={{ textAlign: "center" }}>
// // // //           <div style={{ fontSize: 12, letterSpacing: "0.2em", color: NAVY }}>LOADING YOUR CART...</div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (localCart.length === 0) return (
// // // //     <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0", padding: "20px" }}>
// // // //       <div style={{ width: 72, height: 72, border: "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 28 }}>🛍️</div>
// // // //       <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#bbb", marginBottom: 12 }}>YOUR CART</div>
// // // //       <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 24 : 32, letterSpacing: "0.06em", color: BLACK, marginBottom: 10, textAlign: "center" }}>YOUR CART IS EMPTY</h2>
// // // //       <p style={{ fontSize: 13, color: "#999", fontFamily: mono, marginBottom: 32, letterSpacing: "0.04em", textAlign: "center" }}>Add some frames to get started.</p>
// // // //       <button onClick={() => navigate("#/products")} style={{ background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px 32px", cursor: "pointer" }}
// // // //         onMouseEnter={e => e.currentTarget.style.background = "#0a2236"}
// // // //         onMouseLeave={e => e.currentTarget.style.background = NAVY}>SHOP THE COLLECTION</button>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#f5f4f0", fontFamily: ff }}>
// // // //       {pendingSync && (
// // // //         <div style={{ background: "#fff3cd", borderBottom: `2px solid #ffc107`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// // // //           <span style={{ fontSize: 15, color: "#856404" }}>⚠️</span>
// // // //           <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#856404" }}>YOUR CART NEEDS TO BE SYNCED. PLEASE PROCEED TO CHECKOUT TO SAVE YOUR ITEMS.</span>
// // // //         </div>
// // // //       )}
// // // //       <div style={{ background: "#eef4f8", borderBottom: `2px solid ${NAVY}`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// // // //         <span style={{ fontSize: 15, color: NAVY }}>✓</span>
// // // //         <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: NAVY }}>
// // // //           {shipping === 0 ? "YOU'VE UNLOCKED FREE WORLDWIDE EXPRESS SHIPPING!" : `ADD PKR ${(5000 - cartTotal).toLocaleString()} MORE FOR FREE SHIPPING`}
// // // //         </span>
// // // //       </div>
// // // //       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "40px 40px 36px", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none", fontSize: 320, lineHeight: 1, color: "#fff", fontWeight: 900 }}>◻</div>
// // // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // // //           <div style={{ width: 32, height: 3, background: NAVY, marginBottom: 14 }} />
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: 0, letterSpacing: "0.04em" }}>YOUR CART</h1>
// // // //           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: mono, marginTop: 12, letterSpacing: "0.06em" }}>
// // // //             {localCart.length} ITEM{localCart.length !== 1 ? "S" : ""} &nbsp;·&nbsp; PKR {cartTotal.toLocaleString()} SUBTOTAL
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "40px 40px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
// // // //         <div>
// // // //           {!isMobile && (
// // // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: 16, padding: "0 0 12px", borderBottom: `2px solid ${BLACK}`, marginBottom: 0 }}>
// // // //               {["PRODUCT", "PRICE", "QUANTITY", ""].map((h, i) => (
// // // //                 <div key={i} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", color: "#aaa" }}>{h}</div>
// // // //               ))}
// // // //             </div>
// // // //           )}

// // // //           {localCart.map(item => {
// // // //             const itemDiscount = item.price && item.discountPrice && item.price > item.discountPrice ? Math.round(((item.price - item.discountPrice) / item.price) * 100) : 0;
// // // //             return (
// // // //               <div key={item.id} style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: isMobile ? 12 : 16, alignItems: "center", padding: isMobile ? "12px 0" : "20px 0", borderBottom: "1px solid #e0ddd6", flexDirection: isMobile ? "column" : "row" }}>
// // // //                 <div style={{ display: "flex", gap: 14, alignItems: "center", width: isMobile ? "100%" : "auto" }}>
// // // //                   <div style={{ width: isMobile ? 60 : 88, height: isMobile ? 50 : 70, flexShrink: 0, overflow: "hidden", background: CREAM, cursor: "pointer", border: "1px solid #e8e8e8" }} onClick={() => navigate(`#/products/${item.id}`)}>
// // // //                     <img src={`${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //                   </div>
// // // //                   <div>
// // // //                     <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.16em", fontFamily: ff, marginBottom: 3 }}>{item.category?.toUpperCase()}{item.gender ? ` · ${item.gender.toUpperCase()}` : ""}</div>
// // // //                     <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, letterSpacing: "0.04em", marginBottom: 3, cursor: "pointer" }} onClick={() => navigate(`#/products/${item.id}`)}>{item.name}</div>
// // // //                     <div style={{ fontSize: 11, color: "#999", fontFamily: mono }}>{item.color}</div>
// // // //                     {itemDiscount > 0 && <div style={{ fontSize: 9, fontWeight: 900, background: NAVY, color: "#fff", display: "inline-block", padding: "2px 7px", letterSpacing: "0.1em", marginTop: 5 }}>−{itemDiscount}% OFF</div>}
// // // //                   </div>
// // // //                 </div>
// // // //                 <div style={{ display: "flex", justifyContent: isMobile ? "space-between" : "flex-start", alignItems: "center", width: isMobile ? "100%" : "auto", gap: 8 }}>
// // // //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 14, fontWeight: 900, color: BLACK }}>PKR {(item.discountPrice || item.price || 0).toLocaleString()}</div>
// // // //                   {item.discountPrice && item.price && item.discountPrice < item.price && <div style={{ fontSize: 11, color: "#bbb", textDecoration: "line-through", fontFamily: mono }}>PKR {item.price.toLocaleString()}</div>}
// // // //                 </div>
// // // //                 <div style={{ display: "flex", border: "1.5px solid #ccc", alignItems: "center", width: "fit-content" }}>
// // // //                   <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
// // // //                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
// // // //                     onMouseLeave={e => e.currentTarget.style.background = "none"}>−</button>
// // // //                   <span style={{ width: 30, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{item.qty || 1}</span>
// // // //                   <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
// // // //                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
// // // //                     onMouseLeave={e => e.currentTarget.style.background = "none"}>+</button>
// // // //                 </div>
// // // //                 <button onClick={() => removeFromCart(item.id)} disabled={syncing} style={{ background: "none", border: "none", cursor: syncing ? "not-allowed" : "pointer", color: "#ccc", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
// // // //                   onMouseEnter={e => { if (!syncing) e.currentTarget.style.color = "#dc2626" }}
// // // //                   onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>×</button>
// // // //               </div>
// // // //             );
// // // //           })}

// // // //           <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
// // // //             <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: "pointer", color: "#888", fontFamily: ff }}
// // // //               onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
// // // //               onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>← CONTINUE SHOPPING</button>
// // // //             <button onClick={clearCart} disabled={syncing} style={{ background: "none", border: "1.5px solid #fecaca", padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: syncing ? "not-allowed" : "pointer", color: "#dc2626", fontFamily: ff }}
// // // //               onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#fef2f2" }}
// // // //               onMouseLeave={e => e.currentTarget.style.background = "none"}>CLEAR CART</button>
// // // //           </div>
// // // //         </div>

// // // //         <div style={{ background: "#fff", border: "1px solid #e0ddd6", position: "sticky", top: 80 }}>
// // // //           <div style={{ background: BLACK, padding: "18px 24px" }}>
// // // //             <div style={{ width: 26, height: 3, background: NAVY, marginBottom: 10 }} />
// // // //             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.16em" }}>ORDER SUMMARY</div>
// // // //           </div>
// // // //           <div style={{ padding: "22px 24px" }}>
// // // //             {localCart.map(item => (
// // // //               <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
// // // //                 <span style={{ fontSize: 12, color: "#666", fontFamily: mono, flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{item.name} × {item.qty || 1}</span>
// // // //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK, flexShrink: 0 }}>PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
// // // //               </div>
// // // //             ))}
// // // //             <div style={{ display: "flex", marginTop: 4, marginBottom: 16, flexWrap: "wrap" }}>
// // // //               <input placeholder="DISCOUNT CODE" style={{ flex: 1, border: "1.5px solid #ccc", borderRight: "none", padding: "9px 12px", fontSize: 11, fontFamily: ff, letterSpacing: "0.08em", outline: "none", color: BLACK, minWidth: "100px" }}
// // // //                 onFocus={e => e.currentTarget.style.borderColor = NAVY}
// // // //                 onBlur={e => e.currentTarget.style.borderColor = "#ccc"} />
// // // //               <button style={{ background: BLACK, color: "#fff", border: "none", padding: "9px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer", fontFamily: ff }}>APPLY</button>
// // // //             </div>
// // // //             <div style={{ borderTop: "1px solid #eee", paddingTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
// // // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // // //                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SUBTOTAL</span>
// // // //                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
// // // //               </div>
// // // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // // //                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SHIPPING</span>
// // // //                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
// // // //               </div>
// // // //               {shipping === 0 && <div style={{ fontSize: 10, color: "#16a34a", fontFamily: ff, letterSpacing: "0.1em", fontWeight: 800 }}>✓ FREE WORLDWIDE SHIPPING APPLIED</div>}
// // // //             </div>
// // // //             <div style={{ borderTop: `2px solid ${BLACK}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
// // // //               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", color: BLACK }}>TOTAL</span>
// // // //               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 18 : 20, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
// // // //             </div>
// // // //             <div style={{ fontSize: 10, color: "#bbb", fontFamily: ff, letterSpacing: "0.08em", marginBottom: 20 }}>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
// // // //             <button onClick={() => navigate("#/checkout")} disabled={syncing || localCart.length === 0} style={{ width: "100%", background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px", cursor: (syncing || localCart.length === 0) ? "not-allowed" : "pointer", display: "block", textAlign: "center", marginBottom: 8, opacity: (syncing || localCart.length === 0) ? 0.5 : 1 }}
// // // //               onMouseEnter={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = "#0a2236" }}
// // // //               onMouseLeave={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = NAVY }}>
// // // //               {syncing ? "UPDATING..." : "PROCEED TO CHECKOUT →"}
// // // //             </button>
// // // //             <button onClick={() => navigate("#/products")} style={{ width: "100%", background: "#fff", border: `1.5px solid ${BLACK}`, color: BLACK, fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.16em", padding: "11px", cursor: "pointer", display: "block", textAlign: "center" }}
// // // //               onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
// // // //               onMouseLeave={e => e.currentTarget.style.background = "#fff"}>CONTINUE SHOPPING</button>
// // // //             <div style={{ marginTop: 16, display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
// // // //               {["VISA", "MC", "AMEX", "APPLE PAY", "COD"].map(c => (
// // // //                 <span key={c} style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", border: "1px solid #e0e0e0", padding: "3px 6px", color: "#aaa", fontFamily: ff }}>{c}</span>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ WISHLIST PAGE — REDESIGNED ============
// // // // export function WishlistPage({ navigate }) {
// // // //   const { user } = useAuth();
// // // //   const [wishlist, setWishlist] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const [removing, setRemoving] = useState(null);
// // // //   const { addToCart } = useCart();

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

// // // //   useEffect(() => {
// // // //     if (!user) { navigate("#/"); return; }
// // // //     loadWishlist();
// // // //   }, [user]);

// // // //   const loadWishlist = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await getWishlist();
// // // //       const rawItems = res.data || [];
// // // //       setWishlist(enrichWishlistItems(rawItems));
// // // //     } catch (err) {
// // // //       setError(err.message);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   const handleRemove = async (wishlistId) => {
// // // //     setRemoving(wishlistId);
// // // //     try {
// // // //       await removeFromWishlist({ wishlistId });
// // // //       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
// // // //     } catch (err) {
// // // //       setError(err.message);
// // // //     }
// // // //     setRemoving(null);
// // // //   };

// // // //   const handleMoveToCart = async (item) => {
// // // //     if (item.product) {
// // // //       addToCart({ id: item.productId, ...item.product, discountPrice: item.product.salePrice || item.product.price }, 1);
// // // //       await handleRemove(item.wishlistId);
// // // //     }
// // // //   };

// // // //   if (!user) return null;

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // // //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // // //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
// // // //         </div>
// // // //         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
// // // //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT</div>
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(36px, 6vw, 68px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
// // // //             MY WISHLIST
// // // //           </h1>
// // // //           {!loading && (
// // // //             <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono }}>
// // // //               {wishlist.length} saved {wishlist.length === 1 ? "frame" : "frames"}
// // // //             </p>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "MY ACCOUNT", path: "#/dashboard" }, { label: "WISHLIST", path: null }]} />

// // // //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "48px 40px 80px" }}>
// // // //         {error && (
// // // //           <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, marginBottom: 24, fontFamily: mono }}>
// // // //             {error}
// // // //           </div>
// // // //         )}

// // // //         {loading ? (
// // // //           <WishlistSkeleton />
// // // //         ) : wishlist.length === 0 ? (
// // // //           <FadeIn>
// // // //             <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 480, margin: "0 auto" }}>
// // // //               <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                 <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fef0f0", animation: "pulseSlow 3s ease-in-out infinite" }}/>
// // // //                 <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
// // // //                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
// // // //                 </svg>
// // // //               </div>
// // // //               <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
// // // //               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 4vw, 36px)", color: BLACK, margin: "0 0 12px", letterSpacing: "0.04em" }}>
// // // //                 YOUR WISHLIST IS EMPTY
// // // //               </h2>
// // // //               <p style={{ fontSize: 14, color: "#888", fontFamily: mono, lineHeight: 1.7, marginBottom: 32 }}>
// // // //                 Save frames you love by tapping the heart icon. They'll wait here for you.
// // // //               </p>
// // // //               <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// // // //                 <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 28px" }}>BROWSE ALL FRAMES</YBtn>
// // // //                 <button onClick={() => navigate("#/collections/new-arrivals")} style={{ background: "none", border: `1.5px solid ${BRAND}`, color: BRAND, fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.12em", padding: "14px 24px", cursor: "pointer" }}>
// // // //                   NEW ARRIVALS
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </FadeIn>
// // // //         ) : (
// // // //           <>
// // // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
// // // //               <div>
// // // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 4 }}>SAVED ITEMS</div>
// // // //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(22px, 3vw, 32px)", color: BLACK, letterSpacing: "0.02em" }}>
// // // //                   {wishlist.length} {wishlist.length === 1 ? "FRAME" : "FRAMES"} SAVED
// // // //                 </div>
// // // //               </div>
// // // //               <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: "#888", fontFamily: ff, transition: "all 0.2s" }}
// // // //                 onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
// // // //                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>
// // // //                 CONTINUE SHOPPING →
// // // //               </button>
// // // //             </div>

// // // //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, minmax(200px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 24 }}>
// // // //               {wishlist.map((item, idx) => {
// // // //                 const isRemoving = removing === item.wishlistId;
// // // //                 const price = Number(item.product?.salePrice || item.product?.price || 0);
// // // //                 const origPrice = Number(item.product?.price || 0);
// // // //                 const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

// // // //                 return (
// // // //                   <FadeIn key={item.wishlistId} delay={idx * 60}>
// // // //                     <div style={{
// // // //                       background: "#fff", border: "1px solid #e8e0d0",
// // // //                       overflow: "hidden", position: "relative",
// // // //                       transition: "box-shadow 0.3s, transform 0.3s, opacity 0.3s",
// // // //                       opacity: isRemoving ? 0.4 : 1,
// // // //                       transform: isRemoving ? "scale(0.97)" : "scale(1)",
// // // //                       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
// // // //                       display: "flex", flexDirection: "column"
// // // //                     }}
// // // //                       onMouseEnter={e => { if (!isRemoving) { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
// // // //                       onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}
// // // //                     >
// // // //                       {discount > 0 && (
// // // //                         <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 9px", fontFamily: ff }}>
// // // //                           −{discount}%
// // // //                         </div>
// // // //                       )}

// // // //                       <button
// // // //                         onClick={() => handleRemove(item.wishlistId)}
// // // //                         disabled={isRemoving}
// // // //                         style={{
// // // //                           position: "absolute", top: 10, right: 10, zIndex: 4,
// // // //                           width: 32, height: 32, borderRadius: "50%",
// // // //                           background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)",
// // // //                           display: "flex", alignItems: "center", justifyContent: "center",
// // // //                           cursor: isRemoving ? "wait" : "pointer", fontSize: 14, color: "#aaa",
// // // //                           transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
// // // //                         }}
// // // //                         onMouseEnter={e => { e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.borderColor = "#dc2626"; }}
// // // //                         onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
// // // //                         aria-label="Remove from wishlist"
// // // //                       >
// // // //                         ×
// // // //                       </button>

// // // //                       <div
// // // //                         onClick={() => navigate(`#/products/${item.productId}`)}
// // // //                         style={{ height: isMobile ? 160 : 220, overflow: "hidden", background: "#FAFAF5", cursor: "pointer", position: "relative", flexShrink: 0 }}
// // // //                       >
// // // //                         {item.product?.imageUrl ? (
// // // //                           <img
// // // //                             src={`${item.product.imageUrl}`}
// // // //                             alt={item.product.name}
// // // //                             style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? "16px 20px" : "24px 32px", transition: "transform 0.4s ease" }}
// // // //                             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
// // // //                             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
// // // //                           />
// // // //                         ) : (
// // // //                           <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                             <Frame shape="round" size={isMobile ? 80 : 120} color={BRAND} />
// // // //                           </div>
// // // //                         )}
// // // //                         <div style={{
// // // //                           position: "absolute", bottom: 0, left: 0, right: 0,
// // // //                           background: BRAND, color: BRAND_TEXT, textAlign: "center",
// // // //                           padding: "9px", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff,
// // // //                           transform: "translateY(100%)", transition: "transform 0.25s ease"
// // // //                         }}
// // // //                           className="wishlist-view-overlay">
// // // //                           VIEW DETAILS →
// // // //                         </div>
// // // //                       </div>

// // // //                       <div style={{ padding: isMobile ? "10px 12px 12px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
// // // //                         <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.16em", marginBottom: 3, fontFamily: ff }}>
// // // //                           {item.product?.subcategory?.toUpperCase()} {item.product?.gender ? `· ${item.product.gender.toUpperCase()}` : ""}
// // // //                         </div>
// // // //                         <div
// // // //                           onClick={() => navigate(`#/products/${item.productId}`)}
// // // //                           style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, marginBottom: 4, letterSpacing: "0.03em", cursor: "pointer", lineHeight: 1.2 }}>
// // // //                           {item.product?.name || "Unnamed Frame"}
// // // //                         </div>
// // // //                         <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 10, lineHeight: 1.4 }}>
// // // //                           {item.product?.color || ""}
// // // //                         </div>

// // // //                         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
// // // //                           <span style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK }}>
// // // //                             PKR {price.toLocaleString()}
// // // //                           </span>
// // // //                           {discount > 0 && (
// // // //                             <span style={{ fontFamily: mono, fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>
// // // //                               PKR {origPrice.toLocaleString()}
// // // //                             </span>
// // // //                           )}
// // // //                         </div>

// // // //                         <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
// // // //                           <button
// // // //                             onClick={() => handleMoveToCart(item)}
// // // //                             disabled={isRemoving}
// // // //                             style={{
// // // //                               flex: 1, background: NAVY, color: "#fff", border: "none",
// // // //                               padding: "10px 0", fontSize: isMobile ? 9 : 10, fontWeight: 900,
// // // //                               letterSpacing: "0.12em", cursor: isRemoving ? "not-allowed" : "pointer",
// // // //                               fontFamily: ff, transition: "background 0.18s"
// // // //                             }}
// // // //                             onMouseEnter={e => { if (!isRemoving) e.currentTarget.style.background = "#0a2236"; }}
// // // //                             onMouseLeave={e => e.currentTarget.style.background = NAVY}
// // // //                           >
// // // //                             + ADD TO BAG
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => navigate(`#/products/${item.productId}`)}
// // // //                             style={{
// // // //                               background: "none", border: `1.5px solid #e8e0d0`,
// // // //                               padding: "10px 14px", fontSize: 11, cursor: "pointer",
// // // //                               color: BLACK, transition: "border-color 0.18s", fontFamily: ff
// // // //                             }}
// // // //                             onMouseEnter={e => e.currentTarget.style.borderColor = BRAND}
// // // //                             onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e0d0"}
// // // //                             aria-label="View product"
// // // //                           >
// // // //                             ↗
// // // //                           </button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </FadeIn>
// // // //                 );
// // // //               })}
// // // //             </div>

// // // //             <FadeIn delay={200}>
// // // //               <div style={{ textAlign: "center", marginTop: 56, padding: "40px 20px", background: "#fff", border: "1px solid #e8e0d0" }}>
// // // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 10 }}>DISCOVER MORE</div>
// // // //                 <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(20px, 3vw, 28px)", color: BLACK, margin: "0 0 20px", letterSpacing: "0.04em" }}>
// // // //                   KEEP EXPLORING
// // // //                 </h3>
// // // //                 <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// // // //                   <YBtn onClick={() => navigate("#/collections/new-arrivals")} style={{ padding: "12px 24px" }}>NEW ARRIVALS</YBtn>
// // // //                   <YBtn onClick={() => navigate("#/products")} style={{ padding: "12px 24px" }}>ALL FRAMES</YBtn>
// // // //                 </div>
// // // //               </div>
// // // //             </FadeIn>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //       <style>{`
// // // //         .wishlist-card:hover .wishlist-view-overlay { transform: translateY(0) !important; }
// // // //         @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.08); opacity:1; } }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ IMPROVED CHECKOUT PAGE ============
// // // // const AddressCard = ({ addr, selected, onSelect }) => {
// // // //   const isDefault = addr.isDefault === true || addr.isDefault === "TRUE";
// // // //   return (
// // // //     <div
// // // //       onClick={onSelect}
// // // //       style={{
// // // //         border: `2px solid ${selected ? BRAND : "#dde"}`,
// // // //         borderRadius: 4,
// // // //         padding: "16px 18px",
// // // //         cursor: "pointer",
// // // //         background: selected ? "#f0f6fa" : "#fff",
// // // //         position: "relative",
// // // //         transition: "border-color 0.15s, background 0.15s",
// // // //         userSelect: "none",
// // // //       }}
// // // //     >
// // // //       <div style={{
// // // //         position: "absolute",
// // // //         top: 14,
// // // //         right: 14,
// // // //         width: 18,
// // // //         height: 18,
// // // //         borderRadius: "50%",
// // // //         border: `2px solid ${selected ? BRAND : "#bbb"}`,
// // // //         background: selected ? BRAND : "transparent",
// // // //         display: "flex",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //         transition: "all 0.15s",
// // // //       }}>
// // // //         {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
// // // //       </div>
// // // //       {isDefault && (
// // // //         <span style={{
// // // //           display: "inline-block",
// // // //           background: BRAND,
// // // //           color: "#fff",
// // // //           fontSize: 8,
// // // //           fontWeight: 900,
// // // //           padding: "2px 7px",
// // // //           letterSpacing: "0.12em",
// // // //           fontFamily: ff,
// // // //           marginBottom: 8,
// // // //         }}>
// // // //           DEFAULT
// // // //         </span>
// // // //       )}
// // // //       <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, marginBottom: 4, fontFamily: ff, paddingRight: 28 }}>
// // // //         {addr.fullName}
// // // //       </div>
// // // //       <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7 }}>
// // // //         {addr.address}<br />
// // // //         {addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ""}<br />
// // // //         {addr.country || "Pakistan"}<br />
// // // //         {addr.phone}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const Field = ({ label, value, onChange, placeholder, type = "text", error, full = false }) => (
// // // //   <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: full ? "1 / -1" : "auto" }}>
// // // //     <label style={{
// // // //       fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
// // // //       color: error ? "#dc2626" : "#888", fontFamily: ff,
// // // //     }}>
// // // //       {label}{error ? ` — ${error}` : ""}
// // // //     </label>
// // // //     <input
// // // //       type={type}
// // // //       placeholder={placeholder}
// // // //       value={value}
// // // //       onChange={e => onChange(e.target.value)}
// // // //       style={{
// // // //         border: `1.5px solid ${error ? "#dc2626" : "#e0e8ee"}`,
// // // //         padding: "11px 14px",
// // // //         fontSize: 13,
// // // //         fontFamily: mono,
// // // //         color: BLACK,
// // // //         background: "#fafaf8",
// // // //         outline: "none",
// // // //         transition: "border-color 0.15s",
// // // //       }}
// // // //       onFocus={e => { if (!error) e.target.style.borderColor = BRAND; }}
// // // //       onBlur={e => { if (!error) e.target.style.borderColor = "#e0e8ee"; }}
// // // //     />
// // // //   </div>
// // // // );

// // // // export function CheckoutPage({ navigate }) {
// // // //   const { cartItems, cartTotal, clearCart, loading: cartLoading, syncCartToDatabase, getCheckoutItems } = useCart();
// // // //   const { user } = useAuth();

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

// // // //   const [step, setStep] = useState(1);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [syncingCart, setSyncingCart] = useState(false);
// // // //   const [orderPlaced, setOrderPlaced] = useState(false);
// // // //   const [errors, setErrors] = useState({});

// // // //   const [savedAddresses, setSavedAddresses] = useState([]);
// // // //   const [addressesLoading, setAddressesLoading] = useState(true);
// // // //   const [selectedAddressId, setSelectedAddressId] = useState(null);
// // // //   const [showCustomForm, setShowCustomForm] = useState(false);

// // // //   const [customForm, setCustomForm] = useState({
// // // //     fullName: "",
// // // //     phone: "",
// // // //     address: "",
// // // //     city: "",
// // // //     postalCode: "",
// // // //     country: "Pakistan",
// // // //     notes: "",
// // // //   });
// // // //   const setCustomField = k => v => setCustomForm(f => ({ ...f, [k]: v }));

// // // //   const shipping = cartTotal >= 5000 ? 0 : 350;
// // // //   const grandTotal = cartTotal + shipping;

// // // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
// // // //   useEffect(() => {
// // // //     if (!cartLoading && cartItems.length === 0 && !orderPlaced) navigate("#/products");
// // // //   }, [cartItems, cartLoading, navigate, orderPlaced]);

// // // //   useEffect(() => {
// // // //     if (!user) return;
// // // //     setAddressesLoading(true);
// // // //     getAddresses()
// // // //       .then(res => {
// // // //         const addrs = res.data || [];
// // // //         setSavedAddresses(addrs);
// // // //         if (addrs.length > 0) {
// // // //           const def = addrs.find(a => a.isDefault === true || a.isDefault === "TRUE");
// // // //           setSelectedAddressId(def ? def.addressId : addrs[0].addressId);
// // // //           setShowCustomForm(false);
// // // //         } else {
// // // //           setShowCustomForm(true);
// // // //           setSelectedAddressId(null);
// // // //         }
// // // //       })
// // // //       .catch(() => {
// // // //         setShowCustomForm(true);
// // // //         setSelectedAddressId(null);
// // // //       })
// // // //       .finally(() => setAddressesLoading(false));
// // // //   }, [user]);

// // // //   const activeAddress = (() => {
// // // //     if (selectedAddressId) {
// // // //       const saved = savedAddresses.find(a => a.addressId === selectedAddressId);
// // // //       if (saved) {
// // // //         return {
// // // //           fullName: String(saved.fullName ?? ""),
// // // //           phone: String(saved.phone ?? ""),
// // // //           email: user?.email || "",
// // // //           address: String(saved.address ?? ""),
// // // //           city: String(saved.city ?? ""),
// // // //           country: String(saved.country ?? "Pakistan"),
// // // //           postalCode: String(saved.postalCode ?? ""),
// // // //           notes: "",
// // // //         };
// // // //       }
// // // //     }
// // // //     return {
// // // //       ...customForm,
// // // //       fullName: String(customForm.fullName ?? ""),
// // // //       phone: String(customForm.phone ?? ""),
// // // //       address: String(customForm.address ?? ""),
// // // //       city: String(customForm.city ?? ""),
// // // //       email: user?.email || "",
// // // //     };
// // // //   })();

// // // //   const validate = () => {
// // // //     const e = {};
// // // //     if (!String(activeAddress.fullName ?? "").trim()) e.fullName = "Required";
// // // //     if (!String(activeAddress.phone ?? "").trim()) e.phone = "Required";
// // // //     if (!String(activeAddress.address ?? "").trim()) e.address = "Required";
// // // //     if (!String(activeAddress.city ?? "").trim()) e.city = "Required";
// // // //     setErrors(e);
// // // //     return Object.keys(e).length === 0;
// // // //   };

// // // //   const handleProceedToReview = async () => {
// // // //     if (!validate()) return;
// // // //     if (!user) { alert("Please log in to proceed."); return; }
// // // //     setSyncingCart(true);
// // // //     const syncResult = await syncCartToDatabase();
// // // //     setSyncingCart(false);
// // // //     if (!syncResult.success) { alert(syncResult.error || "Failed to sync cart."); return; }
// // // //     setStep(2);
// // // //   };

// // // //   const handlePlaceOrder = async () => {
// // // //     if (!user) { alert("Please log in to complete your order."); return; }
// // // //     setSubmitting(true);
// // // //     try {
// // // //       const { checkout } = await import("../services/service.js");
// // // //       const checkoutItems = getCheckoutItems();
// // // //       const res = await checkout({
// // // //         cartItems: checkoutItems,
// // // //         subtotal: cartTotal,
// // // //         shipping,
// // // //         total: grandTotal,
// // // //         address: activeAddress,
// // // //         paymentMethod: "COD",
// // // //       });
// // // //       if (res.success) {
// // // //         setOrderPlaced(true);
// // // //         await clearCart();
// // // //         navigate("#/order-success");
// // // //       } else {
// // // //         alert(res.error || "Failed to place order.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Checkout error:", err);
// // // //       alert("Failed to place order. Please try again.");
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   if (cartLoading) return (
// // // //     <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
// // // //       <div style={{ fontSize: 12, letterSpacing: "0.2em", color: BRAND }}>LOADING...</div>
// // // //     </div>
// // // //   );
// // // //   if (cartItems.length === 0 && !orderPlaced) return null;

// // // //   const userName = user?.name || user?.fullName || "";
// // // //   const userEmail = user?.email || "";

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // // //       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "44px 40px 36px" }}>
// // // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // // //           <div style={{ width: 32, height: 3, background: BRAND, marginBottom: 14 }} />
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: "0 0 12px" }}>CHECKOUT</h1>
// // // //           <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
// // // //             {[{ n: 1, l: "DELIVERY" }, { n: 2, l: "REVIEW & PAY" }].map((s, i) => (
// // // //               <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // // //                 {i > 0 && <div style={{ width: isMobile ? 20 : 40, height: 1, background: step > i ? BRAND : "#333" }} />}
// // // //                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // //                   <div style={{
// // // //                     width: 28, height: 28, borderRadius: "50%",
// // // //                     background: step >= s.n ? BRAND : "#222",
// // // //                     border: `2px solid ${step >= s.n ? BRAND : "#333"}`,
// // // //                     display: "flex", alignItems: "center", justifyContent: "center",
// // // //                     fontSize: 11, fontWeight: 900, color: step >= s.n ? BRAND_TEXT : "#555", fontFamily: ff,
// // // //                   }}>
// // // //                     {step > s.n ? "✓" : s.n}
// // // //                   </div>
// // // //                   <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: step >= s.n ? "#fff" : "#555", fontFamily: ff }}>
// // // //                     {s.l}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 16px 60px" : "48px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
// // // //         <div>
// // // //           {step === 1 && (
// // // //             <FadeIn>
// // // //               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
// // // //                 <div style={{ background: "#f0f6fa", border: `1.5px solid #89c4e1`, padding: "14px 20px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
// // // //                     <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRAND, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, fontFamily: ff, flexShrink: 0 }}>
// // // //                       {userName.charAt(0).toUpperCase() || "?"}
// // // //                     </div>
// // // //                     <div>
// // // //                       <div style={{ fontSize: 13, fontWeight: 900, color: BRAND, fontFamily: ff, letterSpacing: "0.04em" }}>{userName}</div>
// // // //                       <div style={{ fontSize: 11, color: "#666", fontFamily: mono, marginTop: 2 }}>{userEmail}</div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", color: "#2a8a50", background: "#eaf5ef", padding: "4px 10px", fontFamily: ff }}>SIGNED IN</span>
// // // //                 </div>

// // // //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff }}>
// // // //                   DELIVERY ADDRESS
// // // //                 </div>

// // // //                 {addressesLoading ? (
// // // //                   <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#aaa", letterSpacing: "0.14em", fontFamily: ff }}>
// // // //                     LOADING ADDRESSES…
// // // //                   </div>
// // // //                 ) : (
// // // //                   <>
// // // //                     {savedAddresses.length > 0 && (
// // // //                       <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
// // // //                         {savedAddresses.map(addr => (
// // // //                           <AddressCard
// // // //                             key={addr.addressId}
// // // //                             addr={addr}
// // // //                             selected={selectedAddressId === addr.addressId && !showCustomForm}
// // // //                             onSelect={() => {
// // // //                               setSelectedAddressId(addr.addressId);
// // // //                               setShowCustomForm(false);
// // // //                               setErrors({});
// // // //                             }}
// // // //                           />
// // // //                         ))}
// // // //                       </div>
// // // //                     )}

// // // //                     <button
// // // //                       onClick={() => {
// // // //                         const next = !showCustomForm;
// // // //                         setShowCustomForm(next);
// // // //                         if (next) setSelectedAddressId(null);
// // // //                         else if (savedAddresses.length > 0) {
// // // //                           const def = savedAddresses.find(a => a.isDefault === true || a.isDefault === "TRUE");
// // // //                           setSelectedAddressId(def ? def.addressId : savedAddresses[0].addressId);
// // // //                         }
// // // //                         setErrors({});
// // // //                       }}
// // // //                       style={{
// // // //                         display: "flex", alignItems: "center", gap: 8,
// // // //                         background: "none", border: `1.5px dashed ${showCustomForm ? BRAND : "#bcd"}`,
// // // //                         color: showCustomForm ? BRAND : "#6a8ea0", padding: "11px 20px",
// // // //                         fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
// // // //                         fontFamily: ff, cursor: "pointer", width: "100%",
// // // //                         justifyContent: "center", marginBottom: 4, transition: "all 0.15s",
// // // //                       }}
// // // //                     >
// // // //                       <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>
// // // //                         {showCustomForm ? "×" : "+"}
// // // //                       </span>
// // // //                       {showCustomForm ? "CANCEL — USE SAVED ADDRESS" : "USE A DIFFERENT ADDRESS"}
// // // //                     </button>

// // // //                     {showCustomForm && (
// // // //                       <FadeIn delay={0.05}>
// // // //                         <div style={{ border: `1.5px solid ${BRAND}`, padding: isMobile ? "16px" : "24px 20px", marginTop: 16, background: "#f8fbfd" }}>
// // // //                           <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: BRAND, marginBottom: 20, fontFamily: ff }}>
// // // //                             ENTER DELIVERY DETAILS
// // // //                           </div>
// // // //                           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
// // // //                             <Field label="FULL NAME" value={customForm.fullName} onChange={setCustomField("fullName")} placeholder="Ahmad Khan" error={errors.fullName} />
// // // //                             <Field label="PHONE" value={customForm.phone} onChange={setCustomField("phone")} placeholder="0300 1234567" type="tel" error={errors.phone} />
// // // //                             <Field label="STREET ADDRESS" value={customForm.address} onChange={setCustomField("address")} placeholder="House #12, Street 4, Block B" error={errors.address} full />
// // // //                             <Field label="CITY" value={customForm.city} onChange={setCustomField("city")} placeholder="Karachi" error={errors.city} />
// // // //                             <Field label="POSTAL CODE (optional)" value={customForm.postalCode} onChange={setCustomField("postalCode")} placeholder="75500" />
// // // //                             <Field label="ORDER NOTES (optional)" value={customForm.notes} onChange={setCustomField("notes")} placeholder="e.g. Leave at gate" full />
// // // //                           </div>
// // // //                         </div>
// // // //                       </FadeIn>
// // // //                     )}
// // // //                   </>
// // // //                 )}

// // // //                 <div style={{ marginTop: 32 }}>
// // // //                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 20, fontFamily: ff }}>
// // // //                     PAYMENT METHOD
// // // //                   </div>
// // // //                   <div style={{ border: `2px solid #89c4e1`, background: "#e8f2f8", padding: "18px 20px" }}>
// // // //                     <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
// // // //                       <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#89c4e1", border: `2px solid #89c4e1`, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
// // // //                       </div>
// // // //                       <div>
// // // //                         <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.1em", color: BLACK, marginBottom: 4 }}>
// // // //                           CASH ON DELIVERY (COD)
// // // //                         </div>
// // // //                         <p style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7, margin: 0 }}>
// // // //                           Pay in cash when your order arrives. Available across all major cities in Pakistan.
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div style={{ marginTop: 32 }}>
// // // //                   <YBtn onClick={handleProceedToReview} disabled={syncingCart || addressesLoading} style={{ width: "100%", padding: 15, fontSize: 12, letterSpacing: "0.14em" }}>
// // // //                     {syncingCart ? "SYNCING CART…" : "REVIEW ORDER →"}
// // // //                   </YBtn>
// // // //                 </div>
// // // //               </div>
// // // //             </FadeIn>
// // // //           )}

// // // //           {step === 2 && (
// // // //             <FadeIn>
// // // //               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
// // // //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.1em", color: BLACK, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #f0ece4" }}>
// // // //                   REVIEW YOUR ORDER
// // // //                 </div>
// // // //                 <div style={{ background: "#FAFAF8", border: "1px solid #e0e8ee", padding: "18px 20px", marginBottom: 24 }}>
// // // //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// // // //                     <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>DELIVERY TO</div>
// // // //                     <button onClick={() => setStep(1)} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#888", background: "none", border: "none", cursor: "pointer", fontFamily: ff, textDecoration: "underline" }}>EDIT</button>
// // // //                   </div>
// // // //                   <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, fontFamily: ff, marginBottom: 6 }}>{activeAddress.fullName}</div>
// // // //                   <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
// // // //                     {activeAddress.address}<br />
// // // //                     {activeAddress.city}{activeAddress.postalCode ? `, ${activeAddress.postalCode}` : ""}<br />
// // // //                     {activeAddress.phone}<br />
// // // //                     {activeAddress.email}
// // // //                   </div>
// // // //                 </div>

// // // //                 {cartItems.map(item => (
// // // //                   <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0ece4" }}>
// // // //                     <div style={{ width: 72, height: 56, flexShrink: 0, overflow: "hidden", background: CREAM }}>
// // // //                       <img src={`${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //                     </div>
// // // //                     <div style={{ flex: 1 }}>
// // // //                       <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>{item.name}</div>
// // // //                       <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>{item.color} · Qty: {item.qty}</div>
// // // //                     </div>
// // // //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>
// // // //                       PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}

// // // //                 <div style={{ background: "#e8f2f8", border: `1.5px solid #89c4e1`, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
// // // //                   <span style={{ fontSize: 18 }}>💵</span>
// // // //                   <div>
// // // //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", color: BLACK }}>CASH ON DELIVERY</div>
// // // //                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>Pay PKR {grandTotal.toLocaleString()} when your order arrives</div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div style={{ marginTop: 28 }}>
// // // //                   <YBtn onClick={handlePlaceOrder} disabled={submitting} style={{ width: "100%", padding: 16, fontSize: 13, letterSpacing: "0.16em" }}>
// // // //                     {submitting ? "PLACING YOUR ORDER…" : `PLACE ORDER · PKR ${grandTotal.toLocaleString()}`}
// // // //                   </YBtn>
// // // //                 </div>
// // // //               </div>
// // // //             </FadeIn>
// // // //           )}
// // // //         </div>

// // // //         <div style={{ background: "#fff", border: "1px solid #e0e8ee", position: "sticky", top: 80 }}>
// // // //           <div style={{ background: BLACK, padding: "18px 22px" }}>
// // // //             <div style={{ width: 24, height: 3, background: BRAND, marginBottom: 8 }} />
// // // //             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>ORDER SUMMARY</div>
// // // //           </div>
// // // //           <div style={{ padding: 20 }}>
// // // //             {cartItems.map(item => (
// // // //               <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
// // // //                 <div style={{ width: 52, height: 40, flexShrink: 0, overflow: "hidden", background: CREAM }}>
// // // //                   <img src={`${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //                 </div>
// // // //                 <div style={{ flex: 1 }}>
// // // //                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>{item.name}</div>
// // // //                   <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono }}>× {item.qty}</div>
// // // //                 </div>
// // // //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>
// // // //                   PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //             <div style={{ borderTop: "1px solid #f0ece4", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
// // // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // // //                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Subtotal</span>
// // // //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
// // // //               </div>
// // // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // // //                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Shipping</span>
// // // //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>
// // // //                   {shipping === 0 ? "FREE" : `PKR ${shipping}`}
// // // //                 </span>
// // // //               </div>
// // // //               <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "2px solid #e8e0d0", marginTop: 4 }}>
// // // //                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", color: BLACK }}>TOTAL</span>
// // // //                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 16 : 18, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ ORDER SUCCESS PAGE ============
// // // // export function OrderSuccessPage({ navigate }) {
// // // //   const [count, setCount] = useState(8);
// // // //   const isMobile = useMediaQuery("(max-width: 767px)");

// // // //   useEffect(() => {
// // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // //     const t = setInterval(() => setCount(c => {
// // // //       if (c <= 1) { clearInterval(t); navigate("#/"); return 0; }
// // // //       return c - 1;
// // // //     }), 1000);
// // // //     return () => clearInterval(t);
// // // //   }, [navigate]);

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, position: "relative", overflow: "hidden", padding: "20px" }}>
// // // //       <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// // // //         <Frame shape="round" size={isMobile ? 400 : 900} color="#fff"/>
// // // //       </div>
// // // //       <div style={{ textAlign: "center", maxWidth: 560, padding: "0 20px", position: "relative", zIndex: 1 }}>
// // // //         <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 36, color: BRAND_TEXT }}>✓</div>
// // // //         <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // // //         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#fff", margin: "0 0 10px" }}>ORDER</h1>
// // // //         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#89c4e1", margin: "0 0 28px" }}>PLACED!</h1>
// // // //         <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.45)", fontFamily: mono, lineHeight: 1.8, marginBottom: 36 }}>
// // // //           Thank you for your order. Our team will call you to confirm delivery details. Your frames will arrive within 5–7 business days.
// // // //         </p>
// // // //         <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// // // //           <YBtn onClick={() => navigate("#/products")} style={{ padding: "13px 28px", fontSize: isMobile ? 10 : 12 }}>SHOP MORE FRAMES</YBtn>
// // // //           <button onClick={() => navigate("#/")} style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.2)", padding: "13px 24px", fontSize: 12, fontWeight: 900, letterSpacing: "0.1em", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontFamily: ff }}>GO HOME</button>
// // // //         </div>
// // // //         <div style={{ marginTop: 28, fontSize: 11, color: "#444", fontFamily: mono }}>Redirecting to home in {count}s...</div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ REVIEW SUBMISSION PAGE ============
// // // // export function ReviewSubmissionPage({ productId, reviewId, navigate }) {
// // // //   const { user } = useAuth();
// // // //   const [product, setProduct] = useState(null);
// // // //   const [existingReview, setExistingReview] = useState(null);
// // // //   const [rating, setRating] = useState(0);
// // // //   const [reviewText, setReviewText] = useState("");
// // // //   const [hovered, setHovered] = useState(0);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [msg, setMsg] = useState({ type: "", text: "" });
// // // //   const [loading, setLoading] = useState(true);

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");

// // // //   useEffect(() => {
// // // //     if (!user) { navigate("#/"); return; }
// // // //     window.scrollTo({ top: 0, behavior: "smooth" });

// // // //     const found = PRODUCTS_DATA.find(p => p.id === productId);
// // // //     setProduct(found || { id: productId, name: `Product #${productId}`, gallery: [], discountPrice: 0, price: 0 });

// // // //     const loadExisting = async () => {
// // // //       if (reviewId) {
// // // //         try {
// // // //           const res = await getUserReviews();
// // // //           const reviews = res.data || [];
// // // //           const match = reviews.find(r => r.reviewId === reviewId);
// // // //           if (match) {
// // // //             setExistingReview(match);
// // // //             setRating(Number(match.rating) || 0);
// // // //             setReviewText(match.review || "");
// // // //           }
// // // //         } catch {}
// // // //       }
// // // //       setLoading(false);
// // // //     };
// // // //     loadExisting();
// // // //   }, [productId, reviewId, user, navigate]);

// // // //   const handleSubmit = async () => {
// // // //     if (!rating) { setMsg({ type: "error", text: "Please select a star rating before submitting." }); return; }
// // // //     setSubmitting(true);
// // // //     setMsg({ type: "", text: "" });
// // // //     try {
// // // //       if (existingReview && reviewId) {
// // // //         await updateReview({ reviewId, rating, review: reviewText });
// // // //       } else {
// // // //         await submitReview({ productId, rating, review: reviewText });
// // // //       }
// // // //       setMsg({ type: "success", text: existingReview ? "Review updated successfully!" : "Review submitted! It will appear after approval." });
// // // //       setTimeout(() => navigate("#/dashboard?tab=reviews"), 2200);
// // // //     } catch (err) {
// // // //       setMsg({ type: "error", text: err.message || "Submission failed. Please try again." });
// // // //     }
// // // //     setSubmitting(false);
// // // //   };

// // // //   if (!user) return null;

// // // //   const LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // // //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // // //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff" />
// // // //         </div>
// // // //         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
// // // //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }} />
// // // //           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT · REVIEWS</div>
// // // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 8vw, 36px)" : "clamp(32px, 5vw, 60px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
// // // //             {existingReview ? "EDIT REVIEW" : "WRITE A REVIEW"}
// // // //           </h1>
// // // //         </div>
// // // //       </div>

// // // //       <Breadcrumb crumbs={[
// // // //         { label: "HOME", path: "#/" },
// // // //         { label: "MY ACCOUNT", path: "#/dashboard" },
// // // //         { label: "REVIEWS", path: "#/dashboard?tab=reviews" },
// // // //         { label: existingReview ? "EDIT REVIEW" : "SUBMIT REVIEW", path: null },
// // // //       ]} />

// // // //       <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "56px 24px 80px" }}>
// // // //         {loading ? (
// // // //           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING…</div>
// // // //         ) : (
// // // //           <FadeIn>
// // // //             {product && (
// // // //               <div style={{ display: "flex", gap: 20, alignItems: "center", background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "12px" : "20px", marginBottom: 36, flexWrap: "wrap" }}>
// // // //                 <div style={{ width: 90, height: 72, background: CREAM, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                   {product.gallery?.[0]
// // // //                     ? <img src={`${product.gallery[0]}`} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
// // // //                     : <span style={{ fontSize: 28 }}>👓</span>
// // // //                   }
// // // //                 </div>
// // // //                 <div>
// // // //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#aaa", fontFamily: ff, marginBottom: 4 }}>
// // // //                     {product.category?.toUpperCase() || "EYEWEAR"}
// // // //                   </div>
// // // //                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 16, color: BLACK, letterSpacing: "0.04em", marginBottom: 4 }}>
// // // //                     {product.name}
// // // //                   </div>
// // // //                   {product.discountPrice > 0 && (
// // // //                     <div style={{ fontFamily: ff, fontSize: 13, color: BRAND, fontWeight: 700 }}>
// // // //                       PKR {product.discountPrice.toLocaleString()}
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             <div style={{ background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "20px" : "32px" }}>
// // // //               <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 28, fontFamily: ff }}>
// // // //                 {existingReview ? "UPDATE YOUR REVIEW" : "YOUR REVIEW"}
// // // //               </div>

// // // //               <div style={{ marginBottom: 28 }}>
// // // //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 12 }}>
// // // //                   OVERALL RATING <span style={{ color: "#e74c3c" }}>*</span>
// // // //                 </div>
// // // //                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
// // // //                   <div style={{ display: "flex", gap: 4 }}>
// // // //                     {[1, 2, 3, 4, 5].map(star => (
// // // //                       <button
// // // //                         key={star}
// // // //                         onClick={() => setRating(star)}
// // // //                         onMouseEnter={() => setHovered(star)}
// // // //                         onMouseLeave={() => setHovered(0)}
// // // //                         style={{
// // // //                           background: "none", border: "none", cursor: "pointer",
// // // //                           fontSize: isMobile ? 28 : 36, padding: "0 3px",
// // // //                           color: star <= (hovered || rating) ? "#f5a623" : "#e0ddd6",
// // // //                           transition: "color 0.12s, transform 0.1s",
// // // //                           transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
// // // //                         }}
// // // //                       >★</button>
// // // //                     ))}
// // // //                   </div>
// // // //                   {(hovered || rating) > 0 && (
// // // //                     <span style={{ fontSize: 12, color: "#888", fontFamily: mono, letterSpacing: "0.04em" }}>
// // // //                       {LABEL[hovered || rating]}
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               <div style={{ marginBottom: 28 }}>
// // // //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 8 }}>
// // // //                   WRITTEN REVIEW <span style={{ fontSize: 10, color: "#aaa", fontWeight: 400 }}>(optional)</span>
// // // //                 </div>
// // // //                 <textarea
// // // //                   value={reviewText}
// // // //                   onChange={e => setReviewText(e.target.value)}
// // // //                   placeholder="Share your experience with this frame — fit, quality, style..."
// // // //                   rows={5}
// // // //                   style={{
// // // //                     width: "100%", padding: "14px 16px", border: "1.5px solid #e8e0d0",
// // // //                     fontSize: 13, fontFamily: mono, color: BLACK, lineHeight: 1.7,
// // // //                     resize: "vertical", outline: "none", boxSizing: "border-box",
// // // //                     background: "#fafaf8",
// // // //                   }}
// // // //                   onFocus={e => e.target.style.borderColor = BRAND}
// // // //                   onBlur={e => e.target.style.borderColor = "#e8e0d0"}
// // // //                 />
// // // //                 <div style={{ fontSize: 10, color: "#bbb", fontFamily: mono, marginTop: 6, textAlign: "right" }}>
// // // //                   {reviewText.length} characters
// // // //                 </div>
// // // //               </div>

// // // //               {msg.text && (
// // // //                 <div style={{
// // // //                   padding: "12px 16px", fontSize: 12, fontFamily: mono, marginBottom: 20,
// // // //                   background: msg.type === "success" ? "#eaf5ef" : "#fef0f0",
// // // //                   border: `1px solid ${msg.type === "success" ? "#a3d9b5" : "#f5c0c0"}`,
// // // //                   color: msg.type === "success" ? "#2a8a50" : "#a33",
// // // //                 }}>
// // // //                   {msg.type === "success" ? "✓ " : "⚠ "}{msg.text}
// // // //                 </div>
// // // //               )}

// // // //               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// // // //                 <button
// // // //                   onClick={handleSubmit}
// // // //                   disabled={submitting || rating === 0}
// // // //                   style={{
// // // //                     background: submitting || rating === 0 ? "#ccc" : BRAND, color: "#fff",
// // // //                     border: "none", padding: "14px 28px", fontSize: 11, fontWeight: 900,
// // // //                     letterSpacing: "0.14em", fontFamily: ff,
// // // //                     cursor: submitting || rating === 0 ? "not-allowed" : "pointer",
// // // //                     transition: "background 0.2s",
// // // //                   }}
// // // //                 >
// // // //                   {submitting ? "SUBMITTING…" : existingReview ? "UPDATE REVIEW" : "SUBMIT REVIEW"}
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => navigate("#/dashboard?tab=reviews")}
// // // //                   style={{
// // // //                     background: "none", border: `1.5px solid #ccc`, color: "#888",
// // // //                     padding: "14px 24px", fontSize: 11, fontWeight: 900,
// // // //                     letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// // // //                   }}
// // // //                 >
// // // //                   ← BACK TO REVIEWS
// // // //                 </button>
// // // //               </div>

// // // //               <div style={{ marginTop: 20, padding: "12px 16px", background: "#f8f8f4", border: "1px solid #eee" }}>
// // // //                 <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, lineHeight: 1.8 }}>
// // // //                   ★ Reviews are verified and approved before publishing. Only customers who have purchased this product may submit a review.
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </FadeIn>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ============ PRODUCT REVIEWS SECTION ============
// // // // function ProductReviewsSection({ productId, navigate }) {
// // // //   const { user } = useAuth();
// // // //   const [reviews, setReviews] = useState([]);
// // // //   const [stats, setStats] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [showAll, setShowAll] = useState(false);

// // // //   const isMobile = useMediaQuery("(max-width: 767px)");

// // // //   const load = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await getReviews({ productId });
// // // //       const data = res.data || [];
// // // //       setReviews(Array.isArray(data) ? data : []);

// // // //       if (data.length > 0) {
// // // //         const total = data.length;
// // // //         const avg = data.reduce((s, r) => s + Number(r.rating || 0), 0) / total;
// // // //         const breakdown = [5, 4, 3, 2, 1].map(star => ({
// // // //           star,
// // // //           count: data.filter(r => Number(r.rating) === star).length,
// // // //         }));
// // // //         setStats({ avg: Math.round(avg * 10) / 10, total, breakdown });
// // // //       } else {
// // // //         setStats({ avg: 0, total: 0, breakdown: [] });
// // // //       }
// // // //     } catch {
// // // //       setReviews([]);
// // // //       setStats({ avg: 0, total: 0, breakdown: [] });
// // // //     }
// // // //     setLoading(false);
// // // //   }, [productId]);

// // // //   useEffect(() => { load(); }, [load]);

// // // //   const displayed = showAll ? reviews : reviews.slice(0, 3);

// // // //   return (
// // // //     <div style={{ background: CREAM, borderTop: "2px solid #e8ddd0", padding: isMobile ? "40px 20px" : "64px 40px" }}>
// // // //       <div style={{ maxWidth: 1400, margin: "0 auto" }}>

// // // //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
// // // //           <div>
// // // //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>VERIFIED BUYERS</div>
// // // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 3.5vw, 36px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>
// // // //               CUSTOMER REVIEWS
// // // //             </h2>
// // // //           </div>
// // // //           {user && (
// // // //             <button
// // // //               onClick={() => navigate(`#/review/${productId}`)}
// // // //               style={{
// // // //                 background: BRAND, color: "#fff", border: "none",
// // // //                 padding: "12px 24px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
// // // //                 letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
// // // //               }}
// // // //             >
// // // //               WRITE A REVIEW
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {loading ? (
// // // //           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING REVIEWS…</div>
// // // //         ) : (
// // // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", gap: isMobile ? 32 : 48, alignItems: "flex-start" }}>

// // // //             <div>
// // // //               {stats && stats.total > 0 ? (
// // // //                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24 }}>
// // // //                   <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ece4" }}>
// // // //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 52, color: BLACK, lineHeight: 1 }}>
// // // //                       {stats.avg.toFixed(1)}
// // // //                     </div>
// // // //                     <div style={{ color: "#f5a623", fontSize: 20, letterSpacing: 3, margin: "6px 0" }}>
// // // //                       {"★".repeat(Math.round(stats.avg))}{"☆".repeat(5 - Math.round(stats.avg))}
// // // //                     </div>
// // // //                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>
// // // //                       Based on {stats.total} review{stats.total !== 1 ? "s" : ""}
// // // //                     </div>
// // // //                   </div>
// // // //                   {stats.breakdown.map(({ star, count }) => (
// // // //                     <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
// // // //                       <span style={{ fontSize: 10, fontFamily: ff, fontWeight: 900, color: "#888", minWidth: 28, textAlign: "right" }}>{star}★</span>
// // // //                       <div style={{ flex: 1, height: 6, background: "#f0ece4", overflow: "hidden" }}>
// // // //                         <div style={{ height: "100%", background: "#f5a623", width: stats.total > 0 ? `${(count / stats.total) * 100}%` : "0%", transition: "width 0.4s ease" }} />
// // // //                       </div>
// // // //                       <span style={{ fontSize: 10, fontFamily: mono, color: "#aaa", minWidth: 14 }}>{count}</span>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               ) : (
// // // //                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24, textAlign: "center" }}>
// // // //                   <div style={{ fontSize: 32, marginBottom: 8 }}>☆</div>
// // // //                   <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, lineHeight: 1.7 }}>No reviews yet. Be the first!</div>
// // // //                   {user && (
// // // //                     <button
// // // //                       onClick={() => navigate(`#/review/${productId}`)}
// // // //                       style={{
// // // //                         marginTop: 14, background: BRAND, color: "#fff", border: "none",
// // // //                         padding: "10px 20px", fontSize: 10, fontWeight: 900,
// // // //                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// // // //                       }}
// // // //                     >
// // // //                       WRITE A REVIEW
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <div>
// // // //               {reviews.length === 0 ? (
// // // //                 <div style={{ padding: "32px 0", color: "#aaa", fontFamily: mono, fontSize: 13 }}>
// // // //                   No reviews yet for this product.
// // // //                 </div>
// // // //               ) : (
// // // //                 <>
// // // //                   {displayed.map((r, i) => (
// // // //                     <div key={r.reviewId || i} style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 22, marginBottom: 14 }}>
// // // //                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
// // // //                         <div>
// // // //                           <div style={{ color: "#f5a623", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>
// // // //                             {"★".repeat(Number(r.rating) || 0)}{"☆".repeat(5 - (Number(r.rating) || 0))}
// // // //                           </div>
// // // //                           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 12, color: BLACK, letterSpacing: "0.04em" }}>
// // // //                             {r.authorName || r.fullName || "Verified Buyer"}
// // // //                           </div>
// // // //                         </div>
// // // //                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
// // // //                           {(r.verifiedPurchase === true || r.verifiedPurchase === "TRUE" || r.verifiedPurchase === "true") && (
// // // //                             <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", background: "#eaf5ef", color: "#2a8a50", fontFamily: ff }}>
// // // //                               ✓ VERIFIED PURCHASE
// // // //                             </span>
// // // //                           )}
// // // //                           <span style={{ fontSize: 10, color: "#bbb", fontFamily: mono }}>
// // // //                             {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) : ""}
// // // //                           </span>
// // // //                         </div>
// // // //                       </div>
// // // //                       {r.review && (
// // // //                         <p style={{ fontSize: 13, color: "#555", fontFamily: mono, margin: 0, lineHeight: 1.8 }}>
// // // //                           {r.review}
// // // //                         </p>
// // // //                       )}
// // // //                     </div>
// // // //                   ))}

// // // //                   {reviews.length > 3 && (
// // // //                     <button
// // // //                       onClick={() => setShowAll(v => !v)}
// // // //                       style={{
// // // //                         background: "none", border: `1.5px solid ${BLACK}`, color: BLACK,
// // // //                         padding: "11px 24px", fontSize: 11, fontWeight: 900,
// // // //                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer", marginTop: 8,
// // // //                       }}
// // // //                     >
// // // //                       {showAll ? `SHOW FEWER ↑` : `VIEW ALL ${reviews.length} REVIEWS ↓`}
// // // //                     </button>
// // // //                   )}
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // export const CollectionPage = CollectionsLandingPage;















































// // // import { useState, useEffect, useCallback } from "react";
// // // import { PRODUCTS_DATA } from "../prodcut.js";
// // // import { BLACK, CREAM, ff, mono, COLLECTIONS,
// // //          HERO_SLIDES, HOME_PRODUCTS, TINTS, TESTIMONIALS, PROCESS_STEPS, CATEGORIES_HOME,
// // //          tagColors } from "../contants/store.js";
// // // import { applyProductFilters, getProductColorOptions, getProductBrandOptions, getProductSizeOptions, getProductDisplayPrice, getProductDiscountPercent, getRelatedProducts, getProductVariants, normalizeCategory, formatPriceValue } from "../services/productUtils.js";
// // // import { YBtn, OutlineBtn, FadeIn, Counter, Frame, ProductCard, WishlistHeart, WishlistSkeleton } from "../components/shared";
// // // import { useCart } from "../contexts/CardContext";
// // // import { useAuth } from "../Auth/auth.jsx";
// // // import {
// // //   getWishlist, removeFromWishlist, getReviews, getAddresses,
// // //   submitReview, updateReview, getProductReviewStats, getUserReviews,
// // // } from "../services/service.js";

// // // const BRAND      = "#0c2c41";
// // // const BRAND_TEXT = "#ffffff";
// // // const NAVY = BRAND;

// // // // ============================================
// // // // RESPONSIVE HOOK
// // // // ============================================
// // // function useMediaQuery(query) {
// // //   const [matches, setMatches] = useState(false);
// // //   useEffect(() => {
// // //     const media = window.matchMedia(query);
// // //     if (media.matches !== matches) setMatches(media.matches);
// // //     const listener = () => setMatches(media.matches);
// // //     media.addEventListener("change", listener);
// // //     return () => media.removeEventListener("change", listener);
// // //   }, [query, matches]);
// // //   return matches;
// // // }

// // // // ============================================
// // // // SHARED VARIANT HELPERS
// // // // ============================================
// // // function normalizeVariantName(value) {
// // //   return String(value || "").trim().toLowerCase();
// // // }

// // // function getStoredVariantName(productId) {
// // //   try {
// // //     return localStorage.getItem(`product-color:${productId}`) || "";
// // //   } catch {
// // //     return "";
// // //   }
// // // }

// // // function setStoredVariantName(productId, name) {
// // //   try {
// // //     localStorage.setItem(`product-color:${productId}`, name);
// // //   } catch {
// // //     // ignore storage write failures
// // //   }
// // // }

// // // // ============================================
// // // // HELPER — Join raw wishlist rows with product details
// // // // ============================================
// // // function enrichWishlistItems(rawItems) {
// // //   return rawItems
// // //     .map(item => {
// // //       const product = PRODUCTS_DATA.find(p => String(p.id) === String(item.productId));
// // //       if (!product) return null;
// // //       return {
// // //         ...item,
// // //         product: {
// // //           name       : product.name,
// // //           price      : product.price,
// // //           salePrice  : product.discountPrice,
// // //           imageUrl   : product.gallery?.[0] || product.image || "",
// // //           color      : product.color,
// // //           subcategory: product.subcategory,
// // //           gender     : product.gender,
// // //         },
// // //       };
// // //     })
// // //     .filter(item => item !== null);
// // // }

// // // // ============================================
// // // // COLLECTIONS DATA
// // // // ============================================
// // // const COLLECTIONS_PAGE_DATA = [
// // //   { slug: "best-sellers", name: "Best Sellers", count: 24, desc: "The frames everyone's talking about.", tag: "MOST POPULAR", bg: BLACK, dark: true, shape: "round" },
// // //   { slug: "new-arrivals", name: "New Arrivals", count: 18, desc: "Fresh styles, just landed.", tag: "NEW", bg: BRAND, dark: false, shape: "square" },
// // //   { slug: "custom-tints", name: "Custom Made Tints™", count: 32, desc: "20+ hand-applied shades. Any frame.", tag: "EXCLUSIVE", bg: "#1a1a1a", dark: true, shape: "cateye" },
// // //   { slug: "reading-glasses", name: "Reading Glasses", count: 12, desc: "Crystal clear. Beautifully crafted.", tag: null, bg: CREAM, dark: false, shape: "round" },
// // //   { slug: "blue-light", name: "Blue Light Glasses", count: 15, desc: "Protect your eyes in the digital age.", tag: "DIGITAL RELIEF", bg: "#1a2a4a", dark: true, shape: "square" },
// // //   { slug: "mens-collection", name: "Men's Collection", count: 48, desc: "Bold frames for every face.", tag: null, bg: "#f5f5f5", dark: false, shape: "aviator" },
// // //   { slug: "womens-collection", name: "Women's Collection", count: 52, desc: "Refined eyewear for every occasion.", tag: null, bg: "#fdf4f4", dark: false, shape: "cateye" },
// // //   { slug: "limited-editions", name: "Limited Editions", count: 8, desc: "Before they're gone.", tag: "LIMITED", bg: "#2a1a3a", dark: true, shape: "round" },
// // //   { slug: "round", name: "Round Frames", count: 21, desc: "The timeless silhouette.", tag: null, bg: CREAM, dark: false, shape: "round" },
// // //   { slug: "square", name: "Square Frames", count: 19, desc: "Sharp. Structured. Striking.", tag: null, bg: "#f5f5f0", dark: false, shape: "square" },
// // // ];

// // // // ============================================
// // // // BREADCRUMB
// // // // ============================================
// // // function Breadcrumb({ crumbs }) {
// // //   return (
// // //     <nav aria-label="breadcrumb" style={{ background: CREAM, borderBottom: "1px solid #e8e0d0", padding: "12px 20px" }}>
// // //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
// // //         {crumbs.map((crumb, i) => (
// // //           <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // //             {i > 0 && <span style={{ color: "#bbb", fontSize: 10 }}>›</span>}
// // //             {crumb.path
// // //               ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
// // //               : <span aria-current="page" style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
// // //           </span>
// // //         ))}
// // //       </div>
// // //     </nav>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────
// // // // SORT OPTIONS
// // // // ─────────────────────────────────────────────
// // // const SORT_OPTS = [
// // //   { key: "featured",    label: "Featured" },
// // //   { key: "relevant",    label: "Most relevant" },
// // //   { key: "bestSelling", label: "Best selling" },
// // //   { key: "alphaAZ",     label: "Alphabetically, A-Z" },
// // //   { key: "alphaZA",     label: "Alphabetically, Z-A" },
// // //   { key: "priceLow",    label: "Price, low to high" },
// // //   { key: "priceHigh",   label: "Price, high to low" },
// // //   { key: "dateNew",     label: "Date, new to old" },
// // //   { key: "dateOld",     label: "Date, old to new" },
// // // ];

// // // // ============================================
// // // // FILTER + SORT FUNCTIONS (UPDATED)
// // // // ============================================

// // // function applyFilters(products, activeFilters, sort, searchTerm = "") {
// // //   let filtered = products;

// // //   // 1. Apply search
// // //   if (searchTerm && searchTerm.trim()) {
// // //     const term = searchTerm.trim().toLowerCase();
// // //     filtered = filtered.filter(p =>
// // //       p.name.toLowerCase().includes(term) ||
// // //       (p.category && p.category.toLowerCase().includes(term)) ||
// // //       (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
// // //       (p.gender && p.gender.toLowerCase().includes(term))
// // //     );
// // //   }

// // //   // 2. Apply size filter (exact match from product.js sizes)
// // //   if (activeFilters.size && activeFilters.size.length) {
// // //     filtered = filtered.filter(p =>
// // //       p.sizes && p.sizes.some(s => activeFilters.size.includes(s))
// // //     );
// // //   }

// // //   // 3. Remove size from activeFilters so that applyProductFilters doesn't filter it again
// // //   const otherFilters = { ...activeFilters };
// // //   delete otherFilters.size;

// // //   // 4. Apply all other filters (category, brand, price, rating, shape, etc.) and sort
// // //   filtered = applyProductFilters(filtered, otherFilters, sort, "");

// // //   return filtered;
// // // }

// // // function sortProducts(arr, sort) {
// // //   const a = [...arr];
// // //   if (sort === "alphaAZ")   return a.sort((x, y) => x.name.localeCompare(y.name));
// // //   if (sort === "alphaZA")   return a.sort((x, y) => y.name.localeCompare(x.name));
// // //   if (sort === "priceLow")  return a.sort((x, y) => getProductDisplayPrice(x).discountPrice - getProductDisplayPrice(y).discountPrice);
// // //   if (sort === "priceHigh") return a.sort((x, y) => getProductDisplayPrice(y).discountPrice - getProductDisplayPrice(x).discountPrice);
// // //   if (sort === "dateNew")   return a.reverse();
// // //   return a;
// // // }

// // // const SHAPE_CONFIG = [
// // //   { key: "Round", label: "Round" },
// // //   { key: "Square", label: "Square" },
// // //   { key: "Aviator", label: "Aviator" },
// // //   { key: "Cat-Eye", label: "Cat-Eye" },
// // //   { key: "Geometric", label: "Geometric" },
// // //   { key: "Browline", label: "Browline" },
// // // ];

// // // // Define ShapeIcon component to avoid ReferenceError
// // // function ShapeIcon({ shape, active }) {
// // //   const color = active ? "#fff" : "#555";
// // //   // Simple SVG placeholders – you can replace with actual shape icons
// // //   const svgMap = {
// // //     "Round": <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />,
// // //     "Square": <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth="1.5" fill="none" />,
// // //     "Aviator": <path d="M4 18 L12 6 L20 18 L16 18 L12 12 L8 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
// // //     "Cat-Eye": <path d="M6 8 L10 4 L18 6 L22 12 L18 18 L10 18 L4 14 Z" stroke={color} strokeWidth="1.5" fill="none" />,
// // //     "Geometric": <polygon points="6,6 18,6 20,12 14,18 6,18 4,12" stroke={color} strokeWidth="1.5" fill="none" />,
// // //     "Browline": <path d="M4 12 L8 8 L16 8 L20 12 L18 18 L6 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
// // //   };
// // //   return (
// // //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //       {svgMap[shape] || <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />}
// // //     </svg>
// // //   );
// // // }

// // // // ============================================
// // // // FILTER SIDEBAR (UPDATED SIZE SECTION)
// // // // ============================================

// // // function FilterSidebar({ allProducts, activeFilters, setActiveFilters, filtersOpen, isMobile, onClose }) {
// // //   const [open, setOpen] = useState({ category: true, color: true, brand: false, rating: false, price: true, size: false, availability: false });
// // //   if (!filtersOpen) return null;

// // //   const toggleSec = k => setOpen(s => ({ ...s, [k]: !s[k] }));
// // //   const toggle = (group, value) =>
// // //     setActiveFilters(prev => {
// // //       const cur = prev[group] || [];
// // //       return { ...prev, [group]: cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value] };
// // //     });
// // //   const isOn = (group, value) => (activeFilters[group] || []).includes(value);

// // //   const Section = ({ id, title, children }) => (
// // //     <div style={{ borderBottom: "1px solid #e8e0d0" }}>
// // //       <button onClick={() => toggleSec(id)} style={{
// // //         width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
// // //         padding: "14px 0", background: "none", border: "none", cursor: "pointer",
// // //         fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.14em", color: BLACK,
// // //       }}>
// // //         {title}
// // //         <span style={{ fontSize: 10, color: "#999", display: "block", transition: "transform 0.2s", transform: open[id] ? "rotate(180deg)" : "none" }}>▲</span>
// // //       </button>
// // //       {open[id] && <div style={{ paddingBottom: 14 }}>{children}</div>}
// // //     </div>
// // //   );

// // //   const Check = ({ group, value, label, count }) => {
// // //     const on = isOn(group, value);
// // //     return (
// // //       <label onClick={() => toggle(group, value)} style={{
// // //         display: "flex", alignItems: "center", justifyContent: "space-between",
// // //         gap: 8, padding: "5px 0", cursor: "pointer",
// // //         fontSize: 13, color: on ? BLACK : "#555", fontFamily: mono,
// // //       }}>
// // //         <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
// // //           <div style={{
// // //             width: 15, height: 15, flexShrink: 0,
// // //             border: `1.5px solid ${on ? BRAND : "#ccc"}`,
// // //             background: on ? BRAND : "#fff",
// // //             display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
// // //           }}>
// // //             {on && <span style={{ color: BRAND_TEXT, fontSize: 9, lineHeight: 1 }}>✓</span>}
// // //           </div>
// // //           <span>{label}</span>
// // //         </div>
// // //         {count !== undefined && <span style={{ fontSize: 11, color: "#bbb", fontFamily: ff }}>({count})</span>}
// // //       </label>
// // //     );
// // //   };

// // //   const wrapStyle = isMobile
// // //     ? { position: "fixed", inset: 0, zIndex: 200, background: "#fff", padding: "20px 16px 80px", overflowY: "auto" }
// // //     : { width: 210, flexShrink: 0, padding: "20px 20px 80px 0", borderRight: "1px solid #e8e0d0" };

// // //   return (
// // //     <div style={wrapStyle}>
// // //       {isMobile && (
// // //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// // //           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em" }}>FILTER</div>
// // //           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: BLACK, lineHeight: 1 }}>×</button>
// // //         </div>
// // //       )}

// // //       <Section id="shape" title="SHAPE">
// // //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, paddingTop: 4 }}>
// // //           {SHAPE_CONFIG.map((shape) => {
// // //             const count = allProducts.filter((product) => product.subcategory === shape.key).length;
// // //             if (count === 0) return null;
// // //             const on = isOn("shape", shape.key);
// // //             return (
// // //               <button key={shape.key} onClick={() => toggle("shape", shape.key)} style={{
// // //                 border: `1.5px solid ${on ? BRAND : "#ddd"}`,
// // //                 background: on ? BRAND : "#fff",
// // //                 padding: "10px 6px 8px", cursor: "pointer",
// // //                 display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.18s",
// // //               }}>
// // //                 <ShapeIcon shape={shape.key} active={on} />
// // //                 <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", fontFamily: ff, color: on ? BRAND_TEXT : "#555" }}>
// // //                   {shape.label.toUpperCase()}
// // //                 </span>
// // //                 <span style={{ fontSize: 9, color: on ? "rgba(255,255,255,0.6)" : "#aaa", fontFamily: mono }}>({count})</span>
// // //               </button>
// // //             );
// // //           })}
// // //         </div>
// // //       </Section>

// // //       <Section id="category" title="CATEGORY">
// // //         {Array.from(new Set(allProducts.map((product) => normalizeCategory(product.category || "Eyeglasses")).filter(Boolean))).map((value) => (
// // //           <Check key={value} group="category" value={value} label={value} count={allProducts.filter((product) => normalizeCategory(product.category || "Eyeglasses") === value).length} />
// // //         ))}
// // //       </Section>

// // //       <Section id="size" title="SIZE">
// // //         {(() => {
// // //           const allSizes = new Set();
// // //           allProducts.forEach(p => (p.sizes || []).forEach(s => allSizes.add(s)));
// // //           const sizeOptions = Array.from(allSizes).sort();
// // //           if (sizeOptions.length === 0) return <div style={{ color: '#aaa', fontSize: 12 }}>No sizes available</div>;
// // //           return sizeOptions.map(size => {
// // //             const count = allProducts.filter(p => (p.sizes || []).includes(size)).length;
// // //             return (
// // //               <Check
// // //                 key={size}
// // //                 group="size"
// // //                 value={size}
// // //                 label={size}
// // //                 count={count}
// // //               />
// // //             );
// // //           });
// // //         })()}
// // //       </Section>

// // //       {/* Other sections (color, brand, rating, price) omitted for brevity but can be added back */}

// // //       {isMobile && (
// // //         <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#fff", borderTop: "1px solid #e8e0d0" }}>
// // //           <YBtn onClick={onClose} style={{ width: "100%", padding: "14px" }}>APPLY FILTERS</YBtn>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // const PRICE_LABELS = { under20: "Under 20K", "20to30": "20K–30K", above30: "Above 30K" };

// // // function FilterSortBar({ filtersOpen, toggleFilters, isMobile, sort, setSort, count, activeFilters, setActiveFilters }) {
// // //   const allActive = Object.entries(activeFilters).flatMap(([grp, vals]) => vals.map(v => ({ grp, v })));
// // //   const labelFor = (grp, v) => {
// // //     if (grp === "price") return PRICE_LABELS[v];
// // //     if (grp === "size") return v;
// // //     return v;
// // //   };

// // //   return (
// // //     <div style={{ background: "#fff", borderBottom: "1px solid #e8e0d0", position: "sticky", top: 62, zIndex: 20 }}>
// // //       <div style={{
// // //         maxWidth: 1400, margin: "0 auto", padding: "0 16px",
// // //         display: "flex", alignItems: "center", justifyContent: "space-between", height: 50,
// // //         flexWrap: "wrap",
// // //       }}>
// // //         <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0, overflow: "hidden", flexWrap: "wrap" }}>
// // //           <button onClick={toggleFilters} style={{
// // //             background: "none", border: "none", cursor: "pointer",
// // //             display: "flex", alignItems: "center", gap: 8,
// // //             fontSize: 12, fontWeight: 900, letterSpacing: "0.12em",
// // //             color: BLACK, fontFamily: ff, padding: 0, whiteSpace: "nowrap", flexShrink: 0,
// // //           }}>
// // //             <svg width="17" height="13" viewBox="0 0 18 14" fill="none">
// // //               <line x1="0" y1="2"  x2="18" y2="2"  stroke="currentColor" strokeWidth="1.5"/>
// // //               <line x1="0" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
// // //               <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"/>
// // //               <circle cx="5"  cy="2"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// // //               <circle cx="11" cy="7"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// // //               <circle cx="7"  cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// // //             </svg>
// // //             {filtersOpen ? "Hide Filter" : "Show Filter"}
// // //           </button>

// // //           {allActive.length > 0 && (
// // //             <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", overflow: "hidden" }}>
// // //               {allActive.slice(0, isMobile ? 2 : 6).map(({ grp, v }) => (
// // //                 <button key={`${grp}-${v}`}
// // //                   onClick={() => setActiveFilters(prev => ({ ...prev, [grp]: (prev[grp] || []).filter(x => x !== v) }))}
// // //                   style={{
// // //                     display: "flex", alignItems: "center", gap: 4,
// // //                     background: BRAND, color: BRAND_TEXT, border: "none",
// // //                     padding: "3px 8px 3px 9px", fontSize: 9, fontWeight: 900,
// // //                     letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap",
// // //                   }}>
// // //                   {labelFor(grp, v)} <span style={{ fontSize: 12, lineHeight: 1 }}>×</span>
// // //                 </button>
// // //               ))}
// // //               <button onClick={() => setActiveFilters({})} style={{
// // //                 background: "none", border: "none", fontSize: 10, color: "#999",
// // //                 cursor: "pointer", fontFamily: ff, fontWeight: 700, textDecoration: "underline", whiteSpace: "nowrap",
// // //               }}>Clear all</button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
// // //           <span style={{ fontSize: 12, color: "#999", fontFamily: mono, whiteSpace: "nowrap" }}>{count} products</span>
// // //           <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // //             <span style={{ fontSize: 12, color: "#666", fontFamily: mono, display: isMobile ? "none" : "inline" }}>Sort by:</span>
// // //             <select value={sort} onChange={e => setSort(e.target.value)} style={{
// // //               background: "none", border: "1px solid #ddd", padding: "5px 8px",
// // //               fontSize: 12, color: BLACK, fontFamily: mono, cursor: "pointer", outline: "none",
// // //               maxWidth: isMobile ? "120px" : "auto",
// // //             }}>
// // //               {SORT_OPTS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
// // //             </select>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ COLLECTIONS LANDING PAGE ============
// // // export function CollectionsLandingPage({ navigate }) {
// // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // //       <div style={{ background: BLACK, padding: "72px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// // //           <Frame shape="cateye" size={700} color="#fff" />
// // //         </div>
// // //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// // //           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }} />
// // //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10 }}>URBAN EYE</div>
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", margin: "0 0 20px" }}>COLLECTIONS</h1>
// // //           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>Curated groups of frames for every occasion, face, and personality.</p>
// // //         </div>
// // //       </div>

// // //       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "COLLECTIONS", path: null }]} />

// // //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 20px 80px" }}>
// // //         <div style={{ marginBottom: 60 }}>
// // //           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>FEATURED</div>
// // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 3 }}>
// // //             {COLLECTIONS_PAGE_DATA.slice(0, 2).map((col, i) => (
// // //               <FadeIn key={col.slug} delay={i * 80}>
// // //                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 380, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 36, transition: "opacity 0.2s" }}
// // //                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.92"}
// // //                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
// // //                   <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }}>
// // //                     <Frame shape={col.shape} size={220} color={col.dark ? "#fff" : "#000"} />
// // //                   </div>
// // //                   {col.tag && <div style={{ position: "absolute", top: 20, left: 20, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "5px 12px", fontFamily: ff }}>{col.tag}</div>}
// // //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 6 }}>{col.count} STYLES</div>
// // //                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: 32, color: col.dark ? "#fff" : BLACK, margin: "0 0 8px", letterSpacing: "0.02em" }}>{col.name.toUpperCase()}</h2>
// // //                   <p style={{ fontSize: 13, color: col.dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontFamily: mono, margin: "0 0 16px" }}>{col.desc}</p>
// // //                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1", fontFamily: ff }}>SHOP COLLECTION →</div>
// // //                 </div>
// // //               </FadeIn>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <div>
// // //           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>ALL COLLECTIONS</div>
// // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
// // //             {COLLECTIONS_PAGE_DATA.slice(2).map((col, i) => (
// // //               <FadeIn key={col.slug} delay={i * 60}>
// // //                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 260, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, transition: "opacity 0.2s" }}
// // //                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
// // //                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
// // //                   <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
// // //                     <Frame shape={col.shape} size={160} color={col.dark ? "#fff" : "#000"} />
// // //                   </div>
// // //                   {col.tag && <div style={{ position: "absolute", top: 14, left: 14, background: BRAND, color: BRAND_TEXT, fontSize: 8, fontWeight: 900, letterSpacing: "0.16em", padding: "4px 10px", fontFamily: ff }}>{col.tag}</div>}
// // //                   <div style={{ fontSize: 9, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginBottom: 4 }}>{col.count} STYLES</div>
// // //                   <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: 20, color: col.dark ? "#fff" : BLACK, margin: "0 0 6px" }}>{col.name.toUpperCase()}</h3>
// // //                   <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1" }}>EXPLORE →</div>
// // //                 </div>
// // //               </FadeIn>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ HOME PAGE ============
// // // export function HomePage({ navigate }) {
// // //   const [heroSlide, setHeroSlide] = useState(0);
// // //   const [filter, setFilter] = useState("All");
// // //   const [testimonialIdx, setTIdx] = useState(0);
// // //   const { addToCart } = useCart();
// // //   const catalogProducts = PRODUCTS_DATA.slice(0, 8);

// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // //   useEffect(() => {
// // //     const t = setInterval(() => setHeroSlide(i => (i + 1) % HERO_SLIDES.length), 6000);
// // //     return () => clearInterval(t);
// // //   }, []);
// // //   useEffect(() => {
// // //     const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
// // //     return () => clearInterval(t);
// // //   }, []);

// // //   const slide = HERO_SLIDES[heroSlide];
// // //   const FILTERS = ["All", "Eyeglasses", "Sunglasses"];
// // //   const filtered = filter === "All"
// // //     ? catalogProducts
// // //     : catalogProducts.filter((p) => p.category === (filter === "Eyeglasses" ? "Optical" : "Sunglass"));

// // //   const HomeProductCard = ({ product }) => {
// // //     const [hov, setHov] = useState(false);
// // //     const [addedMsg, setAddedMsg] = useState(false);
// // //     const { price, discountPrice } = getProductDisplayPrice(product);
// // //     const discount = getProductDiscountPercent(product);
// // //     const variants = getProductVariants(product);

// // //     const [selectedVariantName, setSelectedVariantName] = useState(() => {
// // //       const stored = getStoredVariantName(product?.id);
// // //       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// // //       return match ? match.name : (variants[0]?.name || "");
// // //     });

// // //     useEffect(() => {
// // //       const stored = getStoredVariantName(product?.id);
// // //       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// // //       const nextName = match ? match.name : (variants[0]?.name || "");
// // //       setSelectedVariantName(nextName);
// // //     }, [product?.id, variants.length]);

// // //     const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
// // //     const displayImage = selectedVariant?.image || product.image || "";

// // //     const handleSelectColor = (variant, e) => {
// // //       e.stopPropagation();
// // //       setSelectedVariantName(variant.name);
// // //       setStoredVariantName(product.id, variant.name);
// // //     };

// // //     return (
// // //       <div
// // //         onMouseEnter={() => setHov(true)}
// // //         onMouseLeave={() => setHov(false)}
// // //         onClick={() => navigate(`#/products/${product.id}`)}
// // //         onKeyDown={(event) => {
// // //           if (event.key === "Enter" || event.key === " ") {
// // //             event.preventDefault();
// // //             navigate(`#/products/${product.id}`);
// // //           }
// // //         }}
// // //         role="button"
// // //         tabIndex={0}
// // //         style={{
// // //           background: "#fff",
// // //           border: "1.5px solid #e5e0d8",
// // //           position: "relative",
// // //           cursor: "pointer",
// // //           transition: "box-shadow 0.3s, transform 0.3s",
// // //           boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
// // //           transform: hov ? "translateY(-3px)" : "none"
// // //         }}
// // //       >
// // //         {discount > 0 && !product.tag && (
// // //           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 8px" }}>−{discount}%</div>
// // //         )}
// // //         {product.tag && (
// // //           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BLACK, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "4px 10px" }}>{product.tag}</div>
// // //         )}

// // //         <WishlistHeart productId={product.id} size="md" placement="card" />

// // //         <div style={{ height: isMobile ? 140 : 190, display: "flex", alignItems: "center", justifyContent: "center", background: hov ? CREAM : "#FAFAF5", transition: "background 0.3s", position: "relative" }}>
// // //           {displayImage ? (
// // //             <img src={displayImage} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 18, transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s" }} />
// // //           ) : (
// // //             <Frame shape="round" size={130} color={hov ? BRAND : "#4a4a4a"} />
// // //           )}

// // //           {variants.length > 1 && (
// // //             <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 6, zIndex: 3 }}>
// // //               {variants.map((variant) => {
// // //                 const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
// // //                 return (
// // //                   <button
// // //                     key={variant.name}
// // //                     onClick={(e) => handleSelectColor(variant, e)}
// // //                     title={variant.name}
// // //                     style={{
// // //                       width: 20,
// // //                       height: 20,
// // //                       borderRadius: "50%",
// // //                       border: active ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.1)",
// // //                       background: variant.swatch || "#d9d9d9",
// // //                       cursor: "pointer",
// // //                       padding: 0,
// // //                       boxShadow: active ? "0 0 0 2px rgba(12,44,65,0.12)" : "none",
// // //                     }}
// // //                   />
// // //                 );
// // //               })}
// // //             </div>
// // //           )}
// // //         </div>
// // //         <div style={{ padding: "6px 14px 14px" }}>
// // //           <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.14em", marginBottom: 2 }}>{(product.category || "Eyeglasses").toUpperCase()}</div>
// // //           <div style={{ fontFamily: ff, fontSize: isMobile ? 14 : 16, fontWeight: 900, letterSpacing: "0.05em", color: BLACK, marginBottom: 10 }}>
// // //             {product.name}
// // //           </div>
// // //           <div style={{ fontSize: 12, color: "#666", fontFamily: mono, marginBottom: 10, minHeight: 36 }}>{product.shortDescription || product.description?.slice(0, 80)}</div>
// // //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //             <div style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>PKR {discountPrice.toLocaleString()}</div>
// // //             <button
// // //               onClick={(e) => { e.stopPropagation(); addToCart(product, 1); setAddedMsg(true); setTimeout(() => setAddedMsg(false), 1800); }}
// // //               style={{
// // //                 border: `1.5px solid ${BRAND}`,
// // //                 padding: "7px 16px",
// // //                 fontSize: 10,
// // //                 fontWeight: 900,
// // //                 letterSpacing: "0.12em",
// // //                 cursor: "pointer",
// // //                 background: addedMsg ? "#16a34a" : hov ? BRAND : "transparent",
// // //                 color: addedMsg ? "#fff" : hov ? BRAND_TEXT : BRAND,
// // //                 transition: "all 0.22s"
// // //               }}
// // //             >
// // //               {addedMsg ? "✓ ADDED" : hov ? "ADD TO BAG" : "SELECT"}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div style={{ color: BLACK }}>
// // //       {/* HERO */}
// // //       <section
// // //         style={{
// // //           minHeight: isMobile ? "60vh" : "88vh",
// // //           backgroundImage: `url(${slide.image})`,
// // //           backgroundSize: "cover",
// // //           backgroundPosition: "center",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           position: "relative",
// // //           overflow: "hidden",
// // //           transition: "background-image 1.1s ease",
// // //         }}
// // //       >
// // //         <div style={{
// // //           position: "absolute",
// // //           inset: 0,
// // //           background: slide.dark
// // //             ? "rgba(0,0,0,0.55)"
// // //             : "rgba(255,255,255,0.25)",
// // //           zIndex: 0,
// // //         }} />

// // //         <div style={{
// // //           maxWidth: 1200,
// // //           margin: "0 auto",
// // //           padding: isMobile ? "40px 20px" : "80px 40px",
// // //           display: "grid",
// // //           gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
// // //           gap: isMobile ? 40 : 80,
// // //           alignItems: "center",
// // //           width: "100%",
// // //           position: "relative",
// // //           zIndex: 1,
// // //         }}>
// // //           <div>
// // //             <div style={{
// // //               display: "inline-block",
// // //               fontSize: 10,
// // //               letterSpacing: "0.2em",
// // //               border: `1px solid ${slide.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
// // //               color: slide.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
// // //               padding: "5px 14px",
// // //               marginBottom: 24
// // //             }}>
// // //               {slide.label}
// // //             </div>
// // //             <h1 style={{
// // //               fontWeight: 900,
// // //               fontSize: isMobile ? "clamp(40px, 12vw, 60px)" : "clamp(54px, 8vw, 108px)",
// // //               lineHeight: 0.92,
// // //               margin: "0 0 20px",
// // //               color: slide.dark ? "#fff" : BLACK,
// // //               letterSpacing: "0.01em",
// // //               whiteSpace: "pre-line"
// // //             }}>
// // //               {slide.heading}
// // //             </h1>
// // //             <p style={{
// // //               fontSize: isMobile ? 14 : 15,
// // //               lineHeight: 1.8,
// // //               maxWidth: 400,
// // //               margin: "0 0 36px",
// // //               color: slide.dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
// // //               fontFamily: mono
// // //             }}>
// // //               {slide.sub}
// // //             </p>
// // //             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// // //               <button onClick={() => navigate("#/products")} style={{ background: BRAND, color: "#fff", border: "none", padding: "12px 24px", fontSize: isMobile ? 13 : 15, cursor: "pointer" }}>
// // //                 SHOP NOW
// // //               </button>
// // //               <OutlineBtn dark={!!slide.dark}>{slide.ctaSecond} →</OutlineBtn>
// // //             </div>
// // //           </div>
// // //           <div />
// // //         </div>

// // //         <div style={{
// // //           position: "absolute",
// // //           bottom: 28,
// // //           left: "50%",
// // //           transform: "translateX(-50%)",
// // //           display: "flex",
// // //           gap: 10,
// // //           zIndex: 2,
// // //         }}>
// // //           {HERO_SLIDES.map((_, i) => (
// // //             <button
// // //               key={i}
// // //               onClick={() => setHeroSlide(i)}
// // //               style={{
// // //                 height: 3,
// // //                 border: "none",
// // //                 cursor: "pointer",
// // //                 borderRadius: 0,
// // //                 background: i === heroSlide ? BRAND : slide.dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
// // //                 width: i === heroSlide ? 32 : 10,
// // //                 transition: "all 0.35s"
// // //               }}
// // //             />
// // //           ))}
// // //         </div>
// // //       </section>

// // //       {/* STATS */}
// // //       <section style={{ background: BLACK, padding: isMobile ? "32px 20px" : "56px 40px" }}>
// // //         <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 16 : 0 }}>
// // //           {[{ v: 150, s: "+", l: "Frame Styles" }, { v: 10, s: "+", l: "Years in Karachi" }, { v: 8500, s: "+", l: "Happy Customers" }, { v: 99, s: "%", l: "Satisfaction Rate" }].map((st, i) => (
// // //             <FadeIn key={st.l} delay={i * 100} style={{ textAlign: "center", padding: "16px 0", borderRight: (i < 3 && !isMobile) ? "1px solid #1e1e1e" : "none" }}>
// // //               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(40px,5vw,64px)", color: BRAND, lineHeight: 1 }}><Counter target={st.v} suffix={st.s}/></div>
// // //               <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginTop: 8 }}>{st.l.toUpperCase()}</div>
// // //             </FadeIn>
// // //           ))}
// // //         </div>
// // //       </section>

// // //       {/* HERITAGE QUOTE */}
// // //       <section style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center", borderBottom: "2px solid #e8ddd0" }}>
// // //         <FadeIn>
// // //           <div style={{ maxWidth: 680, margin: "0 auto" }}>
// // //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 28px" }}/>
// // //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 18 }}>EYE-CONIC EYEWEAR, SINCE 2015</div>
// // //             <blockquote style={{ fontFamily: mono, fontSize: isMobile ? "clamp(16px, 5vw, 22px)" : "clamp(18px, 2.8vw, 28px)", lineHeight: 1.5, color: BLACK, margin: "0 0 20px", fontStyle: "italic" }}>"For over a decade, our name has been on the front door. That means something."</blockquote>
// // //             <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#666", fontFamily: ff }}>TARIQ HASSAN · FOUNDER, URBAN EYE</div>
// // //             <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
// // //               <a href="#/story" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>OUR STORY</a>
// // //               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", borderBottom: "2px solid #ddd", paddingBottom: 2 }}>SHOP EYEGLASSES</a>
// // //             </div>
// // //           </div>
// // //         </FadeIn>
// // //       </section>

// // //       {/* CATEGORIES */}
// // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#fff" }}>
// // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // //           <FadeIn>
// // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
// // //               <div>
// // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>BROWSE</div>
// // //                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>SHOP BY CATEGORY</h2>
// // //               </div>
// // //               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: "#888", textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>VIEW ALL →</a>
// // //             </div>
// // //           </FadeIn>
// // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 2 }}>
// // //             {CATEGORIES_HOME.map((cat, i) => (
// // //               <FadeIn key={cat.label} delay={i * 80}>
// // //                 <div onClick={() => navigate(`#/collections/${cat.slug}`)} style={{ height: isMobile ? 220 : 330, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 16 : 28, cursor: "pointer", position: "relative", overflow: "hidden", background: cat.dark ? BLACK : CREAM, color: cat.dark ? "#fff" : BLACK }}>
// // //                   <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: BRAND }}/>
// // //                   <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
// // //                     <Frame shape={cat.shape} size={isMobile ? 120 : 190} color={cat.dark ? "#fff" : "#000"}/>
// // //                   </div>
// // //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", marginBottom: 6, opacity: 0.5 }}>{cat.count.toUpperCase()}</div>
// // //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 16 : 20, fontWeight: 900, letterSpacing: "0.04em" }}>{cat.label.toUpperCase()}</div>
// // //                   <div style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 12, color: cat.dark ? "#89c4e1" : BRAND, fontWeight: 900 }}>SHOP NOW →</div>
// // //                 </div>
// // //               </FadeIn>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* BEST SELLERS */}
// // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#FAFAF5" }}>
// // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // //           <FadeIn>
// // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
// // //               <div>
// // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>HANDPICKED</div>
// // //                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>BEST SELLERS</h2>
// // //               </div>
// // //               <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// // //                 {FILTERS.map(f => (
// // //                   <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", fontSize: isMobile ? 8 : 10, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", border: `1.5px solid ${filter === f ? BRAND : "#ddd"}`, background: filter === f ? BRAND : "transparent", color: filter === f ? BRAND_TEXT : "#888", fontFamily: ff, transition: "all 0.2s" }}>{f.toUpperCase()}</button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </FadeIn>
// // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 14 }}>
// // //             {filtered.map((p, i) => <FadeIn key={p.name} delay={i * 55}><HomeProductCard product={p} /></FadeIn>)}
// // //           </div>
// // //           <FadeIn delay={280}>
// // //             <div style={{ textAlign: "center", marginTop: 44 }}>
// // //               <YBtn onClick={() => navigate("#/collections/family-favorites")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>VIEW ALL FRAMES</YBtn>
// // //             </div>
// // //           </FadeIn>
// // //         </div>
// // //       </section>

// // //       {/* CUSTOM TINTS (active version) */}
// // //       <section style={{ background: CREAM, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "2px solid #e8ddd0", borderBottom: "2px solid #e8ddd0" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
// // //           <Frame shape="cateye" size={isMobile ? 400 : 900} color={BLACK}/>
// // //         </div>
// // //         <FadeIn>
// // //           <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
// // //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // //             <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#888", marginBottom: 12 }}>EXCLUSIVE TO URBAN EYE</div>
// // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BLACK, lineHeight: 0.92, margin: "0 0 6px" }}>CUSTOM MADE</h2>
// // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BRAND, lineHeight: 0.92, margin: "0 0 28px" }}>TINTS™</h2>
// // //             <p style={{ fontSize: isMobile ? 13 : 15, color: "#666", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontFamily: mono }}>Choose any frame. Choose any tint. Our opticians hand-apply your chosen colour — 20+ shades to make it yours.</p>
// // //             <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
// // //               {TINTS.map(t => (
// // //                 <div key={t.name} title={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
// // //                   <div style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: "50%", background: t.color, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}/>
// // //                   <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#999", fontFamily: ff }}>{t.name}</span>
// // //                 </div>
// // //               ))}
// // //               <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#999", marginLeft: 8 }}>+12 more</div>
// // //             </div>
// // //             <YBtn onClick={() => navigate("#/collections/custom-made-tints")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>SHOP CUSTOM TINTS™</YBtn>
// // //           </div>
// // //         </FadeIn>
// // //       </section>

// // //       {/* HOW IT WORKS - now fixed and included */}
// // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: BLACK }}>
// // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // //           <FadeIn>
// // //             <div style={{ textAlign: "center", marginBottom: 56 }}>
// // //               <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
// // //               <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#444", marginBottom: 10 }}>HOW IT WORKS</div>
// // //               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,48px)", color: "#fff", margin: 0 }}>FROM BROWSE TO DELIVERED</h2>
// // //             </div>
// // //           </FadeIn>
// // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: 28, position: "relative" }}>
// // //             {!isMobile && <div style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 1, background: "#1e1e1e" }}/>}
// // //             {PROCESS_STEPS.map((step, i) => (
// // //               <FadeIn key={step.num} delay={i * 90}>
// // //                 <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
// // //                   <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${BRAND}`, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: ff, fontSize: 15, fontWeight: 900, color: "#89c4e1" }}>{step.num}</div>
// // //                   <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.08em", marginBottom: 8 }}>{step.title}</div>
// // //                   <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, fontFamily: mono }}>{step.desc}</div>
// // //                 </div>
// // //               </FadeIn>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* TESTIMONIALS */}
// // //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: CREAM }}>
// // //         <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
// // //           <FadeIn>
// // //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
// // //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>REVIEWS</div>
// // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", marginBottom: 52, letterSpacing: "0.02em" }}>WHAT OUR CUSTOMERS SAY</h2>
// // //             <div style={{ position: "relative", minHeight: isMobile ? 280 : 200 }}>
// // //               {TESTIMONIALS.map((t, i) => (
// // //                 <div key={t.name} style={{ position: "absolute", inset: 0, opacity: i === testimonialIdx ? 1 : 0, transform: i === testimonialIdx ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s ease", pointerEvents: i === testimonialIdx ? "auto" : "none" }}>
// // //                   <div style={{ fontSize: 20, color: BRAND, marginBottom: 18, letterSpacing: 4 }}>{"★".repeat(t.rating)}</div>
// // //                   <blockquote style={{ fontFamily: mono, fontStyle: "italic", lineHeight: 1.65, fontSize: isMobile ? "clamp(14px, 4vw, 18px)" : "clamp(15px,2.2vw,20px)", color: BLACK, margin: "0 0 24px" }}>"{t.text}"</blockquote>
// // //                   <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em" }}>{t.name}</div>
// // //                   <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.1em", marginTop: 4 }}>{t.city}</div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: isMobile ? 280 : 210 }}>
// // //               {TESTIMONIALS.map((_, i) => (
// // //                 <button key={i} onClick={() => setTIdx(i)} style={{ height: 3, border: "none", cursor: "pointer", background: i === testimonialIdx ? BRAND : "#ccc", width: i === testimonialIdx ? 28 : 10, transition: "all 0.35s" }}/>
// // //               ))}
// // //             </div>
// // //           </FadeIn>
// // //         </div>
// // //       </section>

// // //       {/* FINAL CTA */}
// // //       <section style={{ background: BLACK, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // //           <Frame shape="aviator" size={isMobile ? 400 : 1000} color="#fff"/>
// // //         </div>
// // //         <FadeIn>
// // //           <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#444", marginBottom: 14 }}>START YOUR JOURNEY</div>
// // //           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#fff", lineHeight: 0.92, margin: "0 0 8px" }}>FIND YOUR</h2>
// // //           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#89c4e1", lineHeight: 0.92, margin: "0 0 28px" }}>FRAME.</h2>
// // //           <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.35)", maxWidth: 420, margin: "0 auto 44px", lineHeight: 1.85, fontFamily: mono }}>150+ premium frames. Expert fitting. Free shipping across Pakistan.</p>
// // //           <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
// // //             <YBtn onClick={() => navigate("#/collections/eyeglasses")} style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>SHOP ALL FRAMES</YBtn>
// // //             <OutlineBtn dark style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>VIRTUAL TRY-ON →</OutlineBtn>
// // //           </div>
// // //         </FadeIn>
// // //       </section>

// // //       <style>{`@keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.5; } 50% { transform:scale(1.07); opacity:0.9; } }`}</style>
// // //     </div>
// // //   );
// // // }

// // // // ============ PRODUCTS PAGE ============
// // // export function ProductsPage({ navigate, queryParams }) {
// // //   const buildFiltersFromQuery = (qp) => {
// // //     if (!qp) return {};
// // //     const result = {};
// // //     if (qp.category) result.category = [qp.category];
// // //     if (qp.shape)     result.shape    = [qp.shape];
// // //     if (qp.gender)    result.gender   = [qp.gender];
// // //     if (qp.tag)       result.tag      = [qp.tag];
// // //     if (qp.price)     result.price    = [qp.price];
// // //     return result;
// // //   };

// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // //   const [activeFilters, setActiveFilters] = useState(() => buildFiltersFromQuery(queryParams));
// // //   const [sort, setSort] = useState("featured");
// // //   const [filtersOpen, setFiltersOpen] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   useEffect(() => {
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   }, []);

// // //   useEffect(() => {
// // //     setActiveFilters(buildFiltersFromQuery(queryParams));
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   }, [JSON.stringify(queryParams)]);

// // //   const filtered = applyFilters(PRODUCTS_DATA, activeFilters, sort, searchTerm);
// // //   let cols = 4;
// // //   if (isMobile) cols = 2;
// // //   else if (isTablet) cols = 2;
// // //   else cols = filtersOpen ? 3 : 4;

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // //       <div style={{ background: BLACK, padding: isMobile ? "48px 20px" : "72px 40px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// // //           <Frame shape="round" size={isMobile ? 400 : 700} color="#fff"/>
// // //         </div>
// // //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// // //           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
// // //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10, fontFamily: ff }}>URBAN EYE · ALL FRAMES</div>
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: "0 0 20px" }}>THE COLLECTION</h1>
// // //           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>{PRODUCTS_DATA.length} frames. Each handpicked. All obsessively crafted.</p>
// // //           <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
// // //             <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, category, or keyword" style={{ width: "min(520px, 100%)", border: "none", padding: "12px 16px", fontSize: 13, fontFamily: mono, outline: "none" }} />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => setFiltersOpen(v => !v)} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// // //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
// // //         <FilterSidebar allProducts={PRODUCTS_DATA} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
// // //         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
// // //           {filtered.length === 0 ? (
// // //             <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: mono }}>No frames match the current filters.</div>
// // //           ) : (
// // //             <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 12 : 20, transition: "grid-template-columns 0.3s" }}>
// // //               {filtered.map((p, i) => (
// // //                 <FadeIn key={p.id} delay={Math.min(i * 40, 400)}>
// // //                   <ProductCard product={p} navigate={navigate} />
// // //                 </FadeIn>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ COLLECTION DETAIL PAGE ============
// // // export function CollectionDetailPage({ slug, navigate }) {
// // //   const col = COLLECTIONS[slug] || COLLECTIONS["default"];
// // //   const baseProducts = PRODUCTS_DATA.filter(col.filter);
// // //   const [activeFilters, setActiveFilters] = useState({});
// // //   const [sort, setSort] = useState("featured");
// // //   const [filtersOpen, setFiltersOpen] = useState(() => {
// // //     try { return JSON.parse(localStorage.getItem("os_filters_open") ?? "true"); } catch { return true; }
// // //   });
// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // //   useEffect(() => {
// // //     const fn = () => {};
// // //     window.addEventListener("resize", fn);
// // //     return () => window.removeEventListener("resize", fn);
// // //   }, []);
// // //   useEffect(() => { localStorage.setItem("os_filters_open", JSON.stringify(filtersOpen)); }, [filtersOpen]);
// // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveFilters({}); }, [slug]);

// // //   const filtered = applyFilters(baseProducts, activeFilters, sort);
// // //   let cols = 4;
// // //   if (isMobile) cols = 2;
// // //   else if (isTablet) cols = 2;
// // //   else cols = filtersOpen ? 3 : 4;

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
// // //         </div>
// // //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// // //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
// // //           <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginBottom: 12, fontFamily: ff }}>
// // //             <a href="#/" style={{ color: "#555", textDecoration: "none" }}>HOME</a>
// // //             <span style={{ margin: "0 8px", color: "#333" }}>›</span>
// // //             <span style={{ color: "#aaa" }}>{col.title}</span>
// // //           </div>
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 6vw, 72px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 16px" }}>{col.title}</h1>
// // //           <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>{col.desc}</p>
// // //         </div>
// // //       </div>

// // //       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => { isMobile ? setFiltersOpen(true) : setFiltersOpen(v => !v); }} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// // //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
// // //         <FilterSidebar allProducts={baseProducts} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
// // //         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
// // //           {filtered.length === 0 ? (
// // //             <div style={{ textAlign: "center", padding: "80px 0" }}>
// // //               <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
// // //               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 22, color: BLACK, marginBottom: 10, letterSpacing: "0.04em" }}>NO FRAMES FOUND</div>
// // //               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 28 }}>Try adjusting your filters.</div>
// // //               <button onClick={() => setActiveFilters({})} style={{ background: BLACK, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff }}>CLEAR FILTERS</button>
// // //             </div>
// // //           ) : (
// // //             <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 12 : 16, transition: "grid-template-columns 0.35s ease" }}>
// // //               {filtered.map((p, i) => (
// // //                 <FadeIn key={p.id} delay={Math.min(i * 35, 300)}>
// // //                   <ProductCard product={p} navigate={navigate} />
// // //                 </FadeIn>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ PRODUCT DETAIL PAGE ============
// // // export function ProductDetailPage({ productId, navigate }) {
// // //   const product = PRODUCTS_DATA.find(p => p.id === productId);
// // //   const [activeImg, setActiveImg] = useState(0);
// // //   const [qty, setQty] = useState(1);
// // //   const [added, setAdded] = useState(false);
// // //   const [openTab, setOpenTab] = useState("details");
// // //   const [selectedSize, setSelectedSize] = useState(null);
// // //   const [selectedVariantName, setSelectedVariantName] = useState("");
// // //   const { addToCart } = useCart();

// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // //   useEffect(() => {
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //     setActiveImg(0); setAdded(false); setSelectedSize(null);
// // //   }, [productId]);

// // //   useEffect(() => {
// // //     if (!product) return;
// // //     const variants = getProductVariants(product);
// // //     const stored = getStoredVariantName(product.id);
// // //     const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// // //     const nextName = match ? match.name : variants[0]?.name || "";
// // //     setSelectedVariantName(nextName);
// // //     setActiveImg(0);
// // //   }, [product?.id]);

// // //   if (!product) return (
// // //     <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
// // //       <div style={{ fontSize: 48, fontWeight: 900, color: BLACK, marginBottom: 16 }}>404</div>
// // //       <div style={{ fontSize: 14, color: "#888", fontFamily: mono, marginBottom: 28 }}>Frame not found.</div>
// // //       <YBtn onClick={() => navigate("#/products")}>← BACK TO COLLECTION</YBtn>
// // //     </div>
// // //   );

// // //   const related = getRelatedProducts(PRODUCTS_DATA, product);
// // //   const { price, discountPrice } = getProductDisplayPrice(product);
// // //   const discount = getProductDiscountPercent(product);
// // //   const tc = product.tag ? tagColors[product.tag] : null;
// // //   const sizes = product.sizes?.length ? product.sizes : ["44 (Narrow)", "46 (Average)", "49 (Wide)", "52 (Extra Wide)"];
// // //   const variants = getProductVariants(product);
// // //   const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
// // //   const galleryImages = selectedVariant?.gallery?.length
// // //     ? selectedVariant.gallery
// // //     : (product.gallery?.length ? product.gallery : (selectedVariant?.image ? [selectedVariant.image] : []));
// // //   const displayImage = galleryImages[activeImg] || selectedVariant?.image || product.image || "";
// // //   const displayLabel = selectedVariant?.name || product.color || "Default";

// // //   const handleSelectVariant = (variant) => {
// // //     setSelectedVariantName(variant.name);
// // //     setStoredVariantName(product.id, variant.name);
// // //     setActiveImg(0);
// // //   };

// // //   const AccordionItem = ({ id, label, children }) => {
// // //     const isOpen = openTab === id;
// // //     return (
// // //       <div style={{ borderBottom: "1px solid #e8e0d0" }}>
// // //         <button onClick={() => setOpenTab(isOpen ? null : id)} style={{ width: "100%", background: "none", border: "none", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: ff, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textAlign: "left" }}>
// // //           {label}
// // //           <span style={{ fontSize: 22, fontWeight: 300, lineHeight: 1, color: BLACK }}>{isOpen ? "−" : "+"}</span>
// // //         </button>
// // //         {isOpen && <div style={{ paddingBottom: 20 }}>{children}</div>}
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: ff }}>
// // //       <div style={{ borderBottom: "1px solid #e8e0d0", padding: "13px 20px" }}>
// // //         <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
// // //           {[{ label: "HOME", path: "#/" }, { label: "COLLECTION", path: "#/products" }, { label: product.name.toUpperCase(), path: null }].map((crumb, i) => (
// // //             <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //               {i > 0 && <span style={{ color: "#ccc", fontSize: 10 }}>›</span>}
// // //               {crumb.path ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
// // //                 : <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
// // //             </span>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px 60px" : "0 40px 80px" }}>
// // //         <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "55% 45%", gap: 0, alignItems: "flex-start" }}>
// // //           <FadeIn>
// // //             <div style={{ paddingRight: isMobile ? 0 : 72 }}>
// // //               <div style={{ position: "relative", overflow: "hidden", background: CREAM, marginBottom: 10, height: isMobile ? "50vh" : "calc(100vh - 110px)", minHeight: isMobile ? 300 : 560, maxHeight: isMobile ? 400 : 740, border: "1px solid #e8e0d0", boxSizing: "border-box", padding: isMobile ? "20px" : "64px 80px" }}>
// // //                 {product.tag && tc && (
// // //                   <div style={{ position: "absolute", top: 20, left: 20, zIndex: 3, background: tc.bg, color: tc.color, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", padding: "6px 14px", fontFamily: ff }}>{product.tag}</div>
// // //                 )}
// // //                 {discount > 0 && (
// // //                   <div style={{ position: "absolute", top: 20, right: 20, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "5px 12px", fontFamily: ff }}>−{discount}% OFF</div>
// // //                 )}
// // //                 <div style={{ width: "100%", height: "100%", border: "1.5px solid #d8cfc0", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
// // //                   <img key={`${product.id}-${activeImg}-${displayLabel}`} src={`${displayImage}`} alt={`${product.name} - ${displayLabel}`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 12 : 24, animation: "fadeImgIn 0.35s ease", boxSizing: "border-box" }} />
// // //                 </div>
// // //               </div>
// // //               {galleryImages.length > 1 && (
// // //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// // //                   {galleryImages.map((img, i) => (
// // //                     <div key={`${product.id}-${i}`} onClick={() => setActiveImg(i)} style={{ width: isMobile ? 60 : 100, height: isMobile ? 50 : 76, overflow: "hidden", cursor: "pointer", background: CREAM, flexShrink: 0, border: i === activeImg ? `2px solid ${BLACK}` : "1px solid #e8e0d0", opacity: i === activeImg ? 1 : 0.45, transition: "border-color 0.15s, opacity 0.15s", boxSizing: "border-box" }}>
// // //                       <img src={`${img}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 4 : 8, boxSizing: "border-box" }} />
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </FadeIn>

// // //           <FadeIn delay={120}>
// // //             <div style={{ paddingTop: isMobile ? 32 : 52 }}>
// // //               <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
// // //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.category?.toUpperCase()}</span>
// // //                 <span style={{ color: "#ddd" }}>·</span>
// // //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.subcategory?.toUpperCase()}</span>
// // //                 <span style={{ color: "#ddd" }}>·</span>
// // //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.gender?.toUpperCase()}</span>
// // //               </div>

// // //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7, flexWrap: "wrap" }}>
// // //                 <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3.2vw, 42px)", lineHeight: 1, color: BLACK, margin: 0, letterSpacing: "0.04em", flex: 1, paddingRight: 16 }}>
// // //                   {product.name}
// // //                 </h1>
// // //                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginTop: 4 }}>
// // //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 600, color: BLACK, whiteSpace: "nowrap" }}>
// // //                     PKR {formatPriceValue(discountPrice)}
// // //                   </div>
// // //                   <WishlistHeart productId={product.id} size="lg" placement="detail" />
// // //                 </div>
// // //               </div>

// // //               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 16, letterSpacing: "0.04em" }}>{displayLabel}</div>
// // //               {variants.length > 1 && (
// // //                 <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
// // //                   {variants.map((variant) => {
// // //                     const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
// // //                     return (
// // //                       <button
// // //                         key={variant.name}
// // //                         onClick={() => handleSelectVariant(variant)}
// // //                         style={{
// // //                           display: "inline-flex",
// // //                           alignItems: "center",
// // //                           gap: 8,
// // //                           border: active ? `1.5px solid ${BLACK}` : "1px solid #d8d0c8",
// // //                           background: active ? "#fff" : "#faf7f2",
// // //                           padding: "8px 12px",
// // //                           cursor: "pointer",
// // //                           fontFamily: ff,
// // //                           fontSize: 11,
// // //                           letterSpacing: "0.08em",
// // //                           color: BLACK,
// // //                         }}
// // //                       >
// // //                         <span style={{ width: 14, height: 14, borderRadius: "50%", background: variant.swatch || "#d9d9d9", border: "1px solid rgba(0,0,0,0.12)" }} />
// // //                         {variant.name}
// // //                       </button>
// // //                     );
// // //                   })}
// // //                 </div>
// // //               )}
// // //               <div style={{ width: 36, height: 3, background: BRAND, marginBottom: 18 }} />

// // //               {discountPrice < price && (
// // //                 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
// // //                   <span style={{ fontFamily: mono, fontSize: isMobile ? 13 : 15, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</span>
// // //                   {discount > 0 && <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 900, background: BRAND, color: BRAND_TEXT, padding: "4px 10px", letterSpacing: "0.1em" }}>SAVE {discount}%</span>}
// // //                 </div>
// // //               )}

// // //               <p style={{ fontSize: isMobile ? 12 : 13, color: "#555", lineHeight: 1.9, fontFamily: mono, marginBottom: 28, maxWidth: 420 }}>{product.description}</p>

// // //               <div style={{ marginBottom: 26 }}>
// // //                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
// // //                   <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>SIZE</span>
// // //                   <span style={{ fontSize: 11, color: "#888", fontFamily: mono, textDecoration: "underline", cursor: "pointer", letterSpacing: "0.04em" }}>Size Chart</span>
// // //                 </div>
// // //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// // //                   {sizes.map(size => (
// // //                     <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", fontFamily: ff, cursor: "pointer", border: "1.5px solid", borderColor: selectedSize === size ? BLACK : "#d8d0c8", background: selectedSize === size ? BLACK : "#fff", color: selectedSize === size ? "#fff" : BLACK, transition: "all 0.15s" }}>
// // //                       {size}
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //               <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
// // //                 <div style={{ display: "flex", border: "1.5px solid #e8e0d0", alignItems: "center", flexShrink: 0 }}>
// // //                   <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", width: 42, height: 50, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>−</button>
// // //                   <span style={{ width: 38, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{qty}</span>
// // //                   <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", width: 42, height: 50, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>+</button>
// // //                 </div>
// // //                 <button onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ flex: 1, background: added ? "#16a34a" : "#0c2c41", color: "#fff", border: "none", padding: "15px 24px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, transition: "background 0.3s" }}>
// // //                   {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
// // //                 </button>
// // //               </div>

// // //               {added && (
// // //                 <button onClick={() => navigate("#/cart")} style={{ width: "100%", background: BRAND, color: BRAND_TEXT, border: "none", padding: "13px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, marginBottom: 14 }}>
// // //                   VIEW BAG & CHECKOUT →
// // //                 </button>
// // //               )}

// // //               <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "18px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4", marginBottom: 28 }}>
// // //                 {[{ icon: "🚚", text: "Free shipping across Pakistan" }, { icon: "↩", text: "30-day hassle-free returns" }, { icon: "✦", text: "Prescription lenses available" }, { icon: "★", text: "Genuine Italian / Japanese craftsmanship" }].map((b, i) => (
// // //                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //                     <span style={{ fontSize: 13 }}>{b.icon}</span>
// // //                     <span style={{ fontSize: 12, color: "#666", fontFamily: mono, letterSpacing: "0.02em" }}>{b.text}</span>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               <div style={{ borderTop: "1px solid #e8e0d0" }}>
// // //                 <AccordionItem id="details" label="DETAILS">
// // //                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // //                     <tbody>
// // //                       {Object.entries(product.specifications || {}).map(([k, v], i) => (
// // //                         <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
// // //                           <td style={{ padding: "9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%" }}>{k.toUpperCase()}</td>
// // //                           <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </AccordionItem>
// // //                 <AccordionItem id="measurements" label="MEASUREMENTS">
// // //                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // //                     <tbody>
// // //                       {Object.entries(product.measurements || {}).map(([k, v], i) => (
// // //                         <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
// // //                           <td style={{ padding: "9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%" }}>{k.toUpperCase()}</td>
// // //                           <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </AccordionItem>
// // //               </div>
// // //             </div>
// // //           </FadeIn>
// // //         </div>
// // //       </div>

// // //       <ProductReviewsSection productId={productId} navigate={navigate} />

// // //       {related.length > 0 && (
// // //         <div style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", borderTop: "2px solid #e8ddd0" }}>
// // //           <div style={{ maxWidth: 1400, margin: "0 auto" }}>
// // //             <FadeIn>
// // //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 44, flexWrap: "wrap", gap: 12 }}>
// // //                 <div>
// // //                   <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>YOU MAY ALSO LIKE</div>
// // //                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(26px, 4vw, 42px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>RELATED FRAMES</h2>
// // //                 </div>
// // //                 <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid ${BLACK}`, padding: "10px 20px", fontSize: isMobile ? 10 : 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: BLACK, fontFamily: ff }}>VIEW ALL →</button>
// // //               </div>
// // //             </FadeIn>
// // //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
// // //               {related.map((p, i) => (
// // //                 <FadeIn key={p.id} delay={i * 80}>
// // //                   <ProductCard product={p} navigate={navigate} />
// // //                 </FadeIn>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <style>{`@keyframes fadeImgIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }`}</style>
// // //     </div>
// // //   );
// // // }

// // // // ============ CART PAGE ============
// // // export function CartPage({ navigate }) {
// // //   const { cartItems, removeFromCart, updateQty, cartTotal, clearCart, loading, syncing, pendingSync } = useCart();
// // //   const { user } = useAuth();
// // //   const [localCart, setLocalCart] = useState([]);

// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// // //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
// // //   useEffect(() => { setLocalCart(cartItems); }, [cartItems]);

// // //   const shipping = cartTotal >= 5000 ? 0 : 350;
// // //   const grandTotal = cartTotal + shipping;

// // //   if (loading) {
// // //     return (
// // //       <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0" }}>
// // //         <div style={{ textAlign: "center" }}>
// // //           <div style={{ fontSize: 12, letterSpacing: "0.2em", color: NAVY }}>LOADING YOUR CART...</div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (localCart.length === 0) return (
// // //     <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0", padding: "20px" }}>
// // //       <div style={{ width: 72, height: 72, border: "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 28 }}>🛍️</div>
// // //       <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#bbb", marginBottom: 12 }}>YOUR CART</div>
// // //       <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 24 : 32, letterSpacing: "0.06em", color: BLACK, marginBottom: 10, textAlign: "center" }}>YOUR CART IS EMPTY</h2>
// // //       <p style={{ fontSize: 13, color: "#999", fontFamily: mono, marginBottom: 32, letterSpacing: "0.04em", textAlign: "center" }}>Add some frames to get started.</p>
// // //       <button onClick={() => navigate("#/products")} style={{ background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px 32px", cursor: "pointer" }}
// // //         onMouseEnter={e => e.currentTarget.style.background = "#0a2236"}
// // //         onMouseLeave={e => e.currentTarget.style.background = NAVY}>SHOP THE COLLECTION</button>
// // //     </div>
// // //   );

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#f5f4f0", fontFamily: ff }}>
// // //       {pendingSync && (
// // //         <div style={{ background: "#fff3cd", borderBottom: `2px solid #ffc107`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// // //           <span style={{ fontSize: 15, color: "#856404" }}>⚠️</span>
// // //           <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#856404" }}>YOUR CART NEEDS TO BE SYNCED. PLEASE PROCEED TO CHECKOUT TO SAVE YOUR ITEMS.</span>
// // //         </div>
// // //       )}
// // //       <div style={{ background: "#eef4f8", borderBottom: `2px solid ${NAVY}`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// // //         <span style={{ fontSize: 15, color: NAVY }}>✓</span>
// // //         <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: NAVY }}>
// // //           {shipping === 0 ? "YOU'VE UNLOCKED FREE WORLDWIDE EXPRESS SHIPPING!" : `ADD PKR ${(5000 - cartTotal).toLocaleString()} MORE FOR FREE SHIPPING`}
// // //         </span>
// // //       </div>
// // //       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "40px 40px 36px", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none", fontSize: 320, lineHeight: 1, color: "#fff", fontWeight: 900 }}>◻</div>
// // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // //           <div style={{ width: 32, height: 3, background: NAVY, marginBottom: 14 }} />
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: 0, letterSpacing: "0.04em" }}>YOUR CART</h1>
// // //           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: mono, marginTop: 12, letterSpacing: "0.06em" }}>
// // //             {localCart.length} ITEM{localCart.length !== 1 ? "S" : ""} &nbsp;·&nbsp; PKR {cartTotal.toLocaleString()} SUBTOTAL
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "40px 40px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
// // //         <div>
// // //           {!isMobile && (
// // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: 16, padding: "0 0 12px", borderBottom: `2px solid ${BLACK}`, marginBottom: 0 }}>
// // //               {["PRODUCT", "PRICE", "QUANTITY", ""].map((h, i) => (
// // //                 <div key={i} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", color: "#aaa" }}>{h}</div>
// // //               ))}
// // //             </div>
// // //           )}

// // //           {localCart.map(item => {
// // //             const itemDiscount = item.price && item.discountPrice && item.price > item.discountPrice ? Math.round(((item.price - item.discountPrice) / item.price) * 100) : 0;
// // //             return (
// // //               <div key={item.id} style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: isMobile ? 12 : 16, alignItems: "center", padding: isMobile ? "12px 0" : "20px 0", borderBottom: "1px solid #e0ddd6", flexDirection: isMobile ? "column" : "row" }}>
// // //                 <div style={{ display: "flex", gap: 14, alignItems: "center", width: isMobile ? "100%" : "auto" }}>
// // //                   <div style={{ width: isMobile ? 60 : 88, height: isMobile ? 50 : 70, flexShrink: 0, overflow: "hidden", background: CREAM, cursor: "pointer", border: "1px solid #e8e8e8" }} onClick={() => navigate(`#/products/${item.id}`)}>
// // //                     <img src={`${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // //                   </div>
// // //                   <div>
// // //                     <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.16em", fontFamily: ff, marginBottom: 3 }}>{item.category?.toUpperCase()}{item.gender ? ` · ${item.gender.toUpperCase()}` : ""}</div>
// // //                     <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, letterSpacing: "0.04em", marginBottom: 3, cursor: "pointer" }} onClick={() => navigate(`#/products/${item.id}`)}>{item.name}</div>
// // //                     <div style={{ fontSize: 11, color: "#999", fontFamily: mono }}>{item.color}</div>
// // //                     {itemDiscount > 0 && <div style={{ fontSize: 9, fontWeight: 900, background: NAVY, color: "#fff", display: "inline-block", padding: "2px 7px", letterSpacing: "0.1em", marginTop: 5 }}>−{itemDiscount}% OFF</div>}
// // //                   </div>
// // //                 </div>
// // //                 <div style={{ display: "flex", justifyContent: isMobile ? "space-between" : "flex-start", alignItems: "center", width: isMobile ? "100%" : "auto", gap: 8 }}>
// // //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 14, fontWeight: 900, color: BLACK }}>PKR {(item.discountPrice || item.price || 0).toLocaleString()}</div>
// // //                   {item.discountPrice && item.price && item.discountPrice < item.price && <div style={{ fontSize: 11, color: "#bbb", textDecoration: "line-through", fontFamily: mono }}>PKR {item.price.toLocaleString()}</div>}
// // //                 </div>
// // //                 <div style={{ display: "flex", border: "1.5px solid #ccc", alignItems: "center", width: "fit-content" }}>
// // //                   <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
// // //                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
// // //                     onMouseLeave={e => e.currentTarget.style.background = "none"}>−</button>
// // //                   <span style={{ width: 30, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{item.qty || 1}</span>
// // //                   <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
// // //                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
// // //                     onMouseLeave={e => e.currentTarget.style.background = "none"}>+</button>
// // //                 </div>
// // //                 <button onClick={() => removeFromCart(item.id)} disabled={syncing} style={{ background: "none", border: "none", cursor: syncing ? "not-allowed" : "pointer", color: "#ccc", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
// // //                   onMouseEnter={e => { if (!syncing) e.currentTarget.style.color = "#dc2626" }}
// // //                   onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>×</button>
// // //               </div>
// // //             );
// // //           })}

// // //           <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
// // //             <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: "pointer", color: "#888", fontFamily: ff }}
// // //               onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
// // //               onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>← CONTINUE SHOPPING</button>
// // //             <button onClick={clearCart} disabled={syncing} style={{ background: "none", border: "1.5px solid #fecaca", padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: syncing ? "not-allowed" : "pointer", color: "#dc2626", fontFamily: ff }}
// // //               onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#fef2f2" }}
// // //               onMouseLeave={e => e.currentTarget.style.background = "none"}>CLEAR CART</button>
// // //           </div>
// // //         </div>

// // //         <div style={{ background: "#fff", border: "1px solid #e0ddd6", position: "sticky", top: 80 }}>
// // //           <div style={{ background: BLACK, padding: "18px 24px" }}>
// // //             <div style={{ width: 26, height: 3, background: NAVY, marginBottom: 10 }} />
// // //             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.16em" }}>ORDER SUMMARY</div>
// // //           </div>
// // //           <div style={{ padding: "22px 24px" }}>
// // //             {localCart.map(item => (
// // //               <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
// // //                 <span style={{ fontSize: 12, color: "#666", fontFamily: mono, flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{item.name} × {item.qty || 1}</span>
// // //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK, flexShrink: 0 }}>PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
// // //               </div>
// // //             ))}
// // //             <div style={{ display: "flex", marginTop: 4, marginBottom: 16, flexWrap: "wrap" }}>
// // //               <input placeholder="DISCOUNT CODE" style={{ flex: 1, border: "1.5px solid #ccc", borderRight: "none", padding: "9px 12px", fontSize: 11, fontFamily: ff, letterSpacing: "0.08em", outline: "none", color: BLACK, minWidth: "100px" }}
// // //                 onFocus={e => e.currentTarget.style.borderColor = NAVY}
// // //                 onBlur={e => e.currentTarget.style.borderColor = "#ccc"} />
// // //               <button style={{ background: BLACK, color: "#fff", border: "none", padding: "9px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer", fontFamily: ff }}>APPLY</button>
// // //             </div>
// // //             <div style={{ borderTop: "1px solid #eee", paddingTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
// // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // //                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SUBTOTAL</span>
// // //                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
// // //               </div>
// // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // //                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SHIPPING</span>
// // //                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
// // //               </div>
// // //               {shipping === 0 && <div style={{ fontSize: 10, color: "#16a34a", fontFamily: ff, letterSpacing: "0.1em", fontWeight: 800 }}>✓ FREE WORLDWIDE SHIPPING APPLIED</div>}
// // //             </div>
// // //             <div style={{ borderTop: `2px solid ${BLACK}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
// // //               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", color: BLACK }}>TOTAL</span>
// // //               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 18 : 20, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
// // //             </div>
// // //             <div style={{ fontSize: 10, color: "#bbb", fontFamily: ff, letterSpacing: "0.08em", marginBottom: 20 }}>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
// // //             <button onClick={() => navigate("#/checkout")} disabled={syncing || localCart.length === 0} style={{ width: "100%", background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px", cursor: (syncing || localCart.length === 0) ? "not-allowed" : "pointer", display: "block", textAlign: "center", marginBottom: 8, opacity: (syncing || localCart.length === 0) ? 0.5 : 1 }}
// // //               onMouseEnter={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = "#0a2236" }}
// // //               onMouseLeave={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = NAVY }}>
// // //               {syncing ? "UPDATING..." : "PROCEED TO CHECKOUT →"}
// // //             </button>
// // //             <button onClick={() => navigate("#/products")} style={{ width: "100%", background: "#fff", border: `1.5px solid ${BLACK}`, color: BLACK, fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.16em", padding: "11px", cursor: "pointer", display: "block", textAlign: "center" }}
// // //               onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
// // //               onMouseLeave={e => e.currentTarget.style.background = "#fff"}>CONTINUE SHOPPING</button>
// // //             <div style={{ marginTop: 16, display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
// // //               {["VISA", "MC", "AMEX", "APPLE PAY", "COD"].map(c => (
// // //                 <span key={c} style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", border: "1px solid #e0e0e0", padding: "3px 6px", color: "#aaa", fontFamily: ff }}>{c}</span>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ WISHLIST PAGE ============
// // // export function WishlistPage({ navigate }) {
// // //   const { user } = useAuth();
// // //   const [wishlist, setWishlist] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [removing, setRemoving] = useState(null);
// // //   const { addToCart } = useCart();

// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

// // //   useEffect(() => {
// // //     if (!user) { navigate("#/"); return; }
// // //     loadWishlist();
// // //   }, [user]);

// // //   const loadWishlist = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await getWishlist();
// // //       const rawItems = res.data || [];
// // //       setWishlist(enrichWishlistItems(rawItems));
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //     setLoading(false);
// // //   };

// // //   const handleRemove = async (wishlistId) => {
// // //     setRemoving(wishlistId);
// // //     try {
// // //       await removeFromWishlist({ wishlistId });
// // //       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //     setRemoving(null);
// // //   };

// // //   const handleMoveToCart = async (item) => {
// // //     if (item.product) {
// // //       addToCart({ id: item.productId, ...item.product, discountPrice: item.product.salePrice || item.product.price }, 1);
// // //       await handleRemove(item.wishlistId);
// // //     }
// // //   };

// // //   if (!user) return null;

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
// // //         </div>
// // //         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
// // //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
// // //           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT</div>
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(36px, 6vw, 68px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
// // //             MY WISHLIST
// // //           </h1>
// // //           {!loading && (
// // //             <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono }}>
// // //               {wishlist.length} saved {wishlist.length === 1 ? "frame" : "frames"}
// // //             </p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "MY ACCOUNT", path: "#/dashboard" }, { label: "WISHLIST", path: null }]} />

// // //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "48px 40px 80px" }}>
// // //         {error && (
// // //           <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, marginBottom: 24, fontFamily: mono }}>
// // //             {error}
// // //           </div>
// // //         )}

// // //         {loading ? (
// // //           <WishlistSkeleton />
// // //         ) : wishlist.length === 0 ? (
// // //           <FadeIn>
// // //             <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 480, margin: "0 auto" }}>
// // //               <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                 <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fef0f0", animation: "pulseSlow 3s ease-in-out infinite" }}/>
// // //                 <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
// // //                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
// // //                 </svg>
// // //               </div>
// // //               <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
// // //               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 4vw, 36px)", color: BLACK, margin: "0 0 12px", letterSpacing: "0.04em" }}>
// // //                 YOUR WISHLIST IS EMPTY
// // //               </h2>
// // //               <p style={{ fontSize: 14, color: "#888", fontFamily: mono, lineHeight: 1.7, marginBottom: 32 }}>
// // //                 Save frames you love by tapping the heart icon. They'll wait here for you.
// // //               </p>
// // //               <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// // //                 <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 28px" }}>BROWSE ALL FRAMES</YBtn>
// // //                 <button onClick={() => navigate("#/collections/new-arrivals")} style={{ background: "none", border: `1.5px solid ${BRAND}`, color: BRAND, fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.12em", padding: "14px 24px", cursor: "pointer" }}>
// // //                   NEW ARRIVALS
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </FadeIn>
// // //         ) : (
// // //           <>
// // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
// // //               <div>
// // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 4 }}>SAVED ITEMS</div>
// // //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(22px, 3vw, 32px)", color: BLACK, letterSpacing: "0.02em" }}>
// // //                   {wishlist.length} {wishlist.length === 1 ? "FRAME" : "FRAMES"} SAVED
// // //                 </div>
// // //               </div>
// // //               <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: "#888", fontFamily: ff, transition: "all 0.2s" }}
// // //                 onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
// // //                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>
// // //                 CONTINUE SHOPPING →
// // //               </button>
// // //             </div>

// // //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, minmax(200px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 24 }}>
// // //               {wishlist.map((item, idx) => {
// // //                 const isRemoving = removing === item.wishlistId;
// // //                 const price = Number(item.product?.salePrice || item.product?.price || 0);
// // //                 const origPrice = Number(item.product?.price || 0);
// // //                 const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

// // //                 return (
// // //                   <FadeIn key={item.wishlistId} delay={idx * 60}>
// // //                     <div style={{
// // //                       background: "#fff", border: "1px solid #e8e0d0",
// // //                       overflow: "hidden", position: "relative",
// // //                       transition: "box-shadow 0.3s, transform 0.3s, opacity 0.3s",
// // //                       opacity: isRemoving ? 0.4 : 1,
// // //                       transform: isRemoving ? "scale(0.97)" : "scale(1)",
// // //                       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
// // //                       display: "flex", flexDirection: "column"
// // //                     }}
// // //                       onMouseEnter={e => { if (!isRemoving) { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
// // //                       onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}
// // //                     >
// // //                       {discount > 0 && (
// // //                         <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 9px", fontFamily: ff }}>
// // //                           −{discount}%
// // //                         </div>
// // //                       )}

// // //                       <button
// // //                         onClick={() => handleRemove(item.wishlistId)}
// // //                         disabled={isRemoving}
// // //                         style={{
// // //                           position: "absolute", top: 10, right: 10, zIndex: 4,
// // //                           width: 32, height: 32, borderRadius: "50%",
// // //                           background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)",
// // //                           display: "flex", alignItems: "center", justifyContent: "center",
// // //                           cursor: isRemoving ? "wait" : "pointer", fontSize: 14, color: "#aaa",
// // //                           transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
// // //                         }}
// // //                         onMouseEnter={e => { e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.borderColor = "#dc2626"; }}
// // //                         onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
// // //                         aria-label="Remove from wishlist"
// // //                       >
// // //                         ×
// // //                       </button>

// // //                       <div
// // //                         onClick={() => navigate(`#/products/${item.productId}`)}
// // //                         style={{ height: isMobile ? 160 : 220, overflow: "hidden", background: "#FAFAF5", cursor: "pointer", position: "relative", flexShrink: 0 }}
// // //                       >
// // //                         {item.product?.imageUrl ? (
// // //                           <img
// // //                             src={`${item.product.imageUrl}`}
// // //                             alt={item.product.name}
// // //                             style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? "16px 20px" : "24px 32px", transition: "transform 0.4s ease" }}
// // //                             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
// // //                             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
// // //                           />
// // //                         ) : (
// // //                           <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                             <Frame shape="round" size={isMobile ? 80 : 120} color={BRAND} />
// // //                           </div>
// // //                         )}
// // //                         <div style={{
// // //                           position: "absolute", bottom: 0, left: 0, right: 0,
// // //                           background: BRAND, color: BRAND_TEXT, textAlign: "center",
// // //                           padding: "9px", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff,
// // //                           transform: "translateY(100%)", transition: "transform 0.25s ease"
// // //                         }}
// // //                           className="wishlist-view-overlay">
// // //                           VIEW DETAILS →
// // //                         </div>
// // //                       </div>

// // //                       <div style={{ padding: isMobile ? "10px 12px 12px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
// // //                         <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.16em", marginBottom: 3, fontFamily: ff }}>
// // //                           {item.product?.subcategory?.toUpperCase()} {item.product?.gender ? `· ${item.product.gender.toUpperCase()}` : ""}
// // //                         </div>
// // //                         <div
// // //                           onClick={() => navigate(`#/products/${item.productId}`)}
// // //                           style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, marginBottom: 4, letterSpacing: "0.03em", cursor: "pointer", lineHeight: 1.2 }}>
// // //                           {item.product?.name || "Unnamed Frame"}
// // //                         </div>
// // //                         <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 10, lineHeight: 1.4 }}>
// // //                           {item.product?.color || ""}
// // //                         </div>

// // //                         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
// // //                           <span style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK }}>
// // //                             PKR {price.toLocaleString()}
// // //                           </span>
// // //                           {discount > 0 && (
// // //                             <span style={{ fontFamily: mono, fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>
// // //                               PKR {origPrice.toLocaleString()}
// // //                             </span>
// // //                           )}
// // //                         </div>

// // //                         <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
// // //                           <button
// // //                             onClick={() => handleMoveToCart(item)}
// // //                             disabled={isRemoving}
// // //                             style={{
// // //                               flex: 1, background: NAVY, color: "#fff", border: "none",
// // //                               padding: "10px 0", fontSize: isMobile ? 9 : 10, fontWeight: 900,
// // //                               letterSpacing: "0.12em", cursor: isRemoving ? "not-allowed" : "pointer",
// // //                               fontFamily: ff, transition: "background 0.18s"
// // //                             }}
// // //                             onMouseEnter={e => { if (!isRemoving) e.currentTarget.style.background = "#0a2236"; }}
// // //                             onMouseLeave={e => e.currentTarget.style.background = NAVY}
// // //                           >
// // //                             + ADD TO BAG
// // //                           </button>
// // //                           <button
// // //                             onClick={() => navigate(`#/products/${item.productId}`)}
// // //                             style={{
// // //                               background: "none", border: `1.5px solid #e8e0d0`,
// // //                               padding: "10px 14px", fontSize: 11, cursor: "pointer",
// // //                               color: BLACK, transition: "border-color 0.18s", fontFamily: ff
// // //                             }}
// // //                             onMouseEnter={e => e.currentTarget.style.borderColor = BRAND}
// // //                             onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e0d0"}
// // //                             aria-label="View product"
// // //                           >
// // //                             ↗
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </FadeIn>
// // //                 );
// // //               })}
// // //             </div>

// // //             <FadeIn delay={200}>
// // //               <div style={{ textAlign: "center", marginTop: 56, padding: "40px 20px", background: "#fff", border: "1px solid #e8e0d0" }}>
// // //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 10 }}>DISCOVER MORE</div>
// // //                 <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(20px, 3vw, 28px)", color: BLACK, margin: "0 0 20px", letterSpacing: "0.04em" }}>
// // //                   KEEP EXPLORING
// // //                 </h3>
// // //                 <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// // //                   <YBtn onClick={() => navigate("#/collections/new-arrivals")} style={{ padding: "12px 24px" }}>NEW ARRIVALS</YBtn>
// // //                   <YBtn onClick={() => navigate("#/products")} style={{ padding: "12px 24px" }}>ALL FRAMES</YBtn>
// // //                 </div>
// // //               </div>
// // //             </FadeIn>
// // //           </>
// // //         )}
// // //       </div>
// // //       <style>{`
// // //         .wishlist-card:hover .wishlist-view-overlay { transform: translateY(0) !important; }
// // //         @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.08); opacity:1; } }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // // // ============ CHECKOUT PAGE ============
// // // const AddressCard = ({ addr, selected, onSelect }) => {
// // //   const isDefault = addr.isDefault === true || addr.isDefault === "TRUE";
// // //   return (
// // //     <div
// // //       onClick={onSelect}
// // //       style={{
// // //         border: `2px solid ${selected ? BRAND : "#dde"}`,
// // //         borderRadius: 4,
// // //         padding: "16px 18px",
// // //         cursor: "pointer",
// // //         background: selected ? "#f0f6fa" : "#fff",
// // //         position: "relative",
// // //         transition: "border-color 0.15s, background 0.15s",
// // //         userSelect: "none",
// // //       }}
// // //     >
// // //       <div style={{
// // //         position: "absolute",
// // //         top: 14,
// // //         right: 14,
// // //         width: 18,
// // //         height: 18,
// // //         borderRadius: "50%",
// // //         border: `2px solid ${selected ? BRAND : "#bbb"}`,
// // //         background: selected ? BRAND : "transparent",
// // //         display: "flex",
// // //         alignItems: "center",
// // //         justifyContent: "center",
// // //         transition: "all 0.15s",
// // //       }}>
// // //         {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
// // //       </div>
// // //       {isDefault && (
// // //         <span style={{
// // //           display: "inline-block",
// // //           background: BRAND,
// // //           color: "#fff",
// // //           fontSize: 8,
// // //           fontWeight: 900,
// // //           padding: "2px 7px",
// // //           letterSpacing: "0.12em",
// // //           fontFamily: ff,
// // //           marginBottom: 8,
// // //         }}>
// // //           DEFAULT
// // //         </span>
// // //       )}
// // //       <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, marginBottom: 4, fontFamily: ff, paddingRight: 28 }}>
// // //         {addr.fullName}
// // //       </div>
// // //       <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7 }}>
// // //         {addr.address}<br />
// // //         {addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ""}<br />
// // //         {addr.country || "Pakistan"}<br />
// // //         {addr.phone}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const Field = ({ label, value, onChange, placeholder, type = "text", error, full = false }) => (
// // //   <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: full ? "1 / -1" : "auto" }}>
// // //     <label style={{
// // //       fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
// // //       color: error ? "#dc2626" : "#888", fontFamily: ff,
// // //     }}>
// // //       {label}{error ? ` — ${error}` : ""}
// // //     </label>
// // //     <input
// // //       type={type}
// // //       placeholder={placeholder}
// // //       value={value}
// // //       onChange={e => onChange(e.target.value)}
// // //       style={{
// // //         border: `1.5px solid ${error ? "#dc2626" : "#e0e8ee"}`,
// // //         padding: "11px 14px",
// // //         fontSize: 13,
// // //         fontFamily: mono,
// // //         color: BLACK,
// // //         background: "#fafaf8",
// // //         outline: "none",
// // //         transition: "border-color 0.15s",
// // //       }}
// // //       onFocus={e => { if (!error) e.target.style.borderColor = BRAND; }}
// // //       onBlur={e => { if (!error) e.target.style.borderColor = "#e0e8ee"; }}
// // //     />
// // //   </div>
// // // );

// // // export function CheckoutPage({ navigate }) {
// // //   const { cartItems, cartTotal, clearCart, loading: cartLoading, syncCartToDatabase, getCheckoutItems } = useCart();
// // //   const { user } = useAuth();

// // //   const isMobile = useMediaQuery("(max-width: 767px)");
// // //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

// // //   const [step, setStep] = useState(1);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [syncingCart, setSyncingCart] = useState(false);
// // //   const [orderPlaced, setOrderPlaced] = useState(false);
// // //   const [errors, setErrors] = useState({});

// // //   const [savedAddresses, setSavedAddresses] = useState([]);
// // //   const [addressesLoading, setAddressesLoading] = useState(true);
// // //   const [selectedAddressId, setSelectedAddressId] = useState(null);
// // //   const [showCustomForm, setShowCustomForm] = useState(false);

// // //   const [customForm, setCustomForm] = useState({
// // //     fullName: "",
// // //     phone: "",
// // //     address: "",
// // //     city: "",
// // //     postalCode: "",
// // //     country: "Pakistan",
// // //     notes: "",
// // //   });
// // //   const setCustomField = k => v => setCustomForm(f => ({ ...f, [k]: v }));

// // //   const shipping = cartTotal >= 5000 ? 0 : 350;
// // //   const grandTotal = cartTotal + shipping;

// // //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
// // //   useEffect(() => {
// // //     if (!cartLoading && cartItems.length === 0 && !orderPlaced) navigate("#/products");
// // //   }, [cartItems, cartLoading, navigate, orderPlaced]);

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     setAddressesLoading(true);
// // //     getAddresses()
// // //       .then(res => {
// // //         const addrs = res.data || [];
// // //         setSavedAddresses(addrs);
// // //         if (addrs.length > 0) {
// // //           const def = addrs.find(a => a.isDefault === true || a.isDefault === "TRUE");
// // //           setSelectedAddressId(def ? def.addressId : addrs[0].addressId);
// // //           setShowCustomForm(false);
// // //         } else {
// // //           setShowCustomForm(true);
// // //           setSelectedAddressId(null);
// // //         }
// // //       })
// // //       .catch(() => {
// // //         setShowCustomForm(true);
// // //         setSelectedAddressId(null);
// // //       })
// // //       .finally(() => setAddressesLoading(false));
// // //   }, [user]);

// // //   const activeAddress = (() => {
// // //     if (selectedAddressId) {
// // //       const saved = savedAddresses.find(a => a.addressId === selectedAddressId);
// // //       if (saved) {
// // //         return {
// // //           fullName: String(saved.fullName ?? ""),
// // //           phone: String(saved.phone ?? ""),
// // //           email: user?.email || "",
// // //           address: String(saved.address ?? ""),
// // //           city: String(saved.city ?? ""),
// // //           country: String(saved.country ?? "Pakistan"),
// // //           postalCode: String(saved.postalCode ?? ""),
// // //           notes: "",
// // //         };
// // //       }
// // //     }
// // //     return {
// // //       ...customForm,
// // //       fullName: String(customForm.fullName ?? ""),
// // //       phone: String(customForm.phone ?? ""),
// // //       address: String(customForm.address ?? ""),
// // //       city: String(customForm.city ?? ""),
// // //       email: user?.email || "",
// // //     };
// // //   })();

// // //   const validate = () => {
// // //     const e = {};
// // //     if (!String(activeAddress.fullName ?? "").trim()) e.fullName = "Required";
// // //     if (!String(activeAddress.phone ?? "").trim()) e.phone = "Required";
// // //     if (!String(activeAddress.address ?? "").trim()) e.address = "Required";
// // //     if (!String(activeAddress.city ?? "").trim()) e.city = "Required";
// // //     setErrors(e);
// // //     return Object.keys(e).length === 0;
// // //   };

// // //   const handleProceedToReview = async () => {
// // //     if (!validate()) return;
// // //     if (!user) { alert("Please log in to proceed."); return; }
// // //     setSyncingCart(true);
// // //     const syncResult = await syncCartToDatabase();
// // //     setSyncingCart(false);
// // //     if (!syncResult.success) { alert(syncResult.error || "Failed to sync cart."); return; }
// // //     setStep(2);
// // //   };

// // //   const handlePlaceOrder = async () => {
// // //     if (!user) { alert("Please log in to complete your order."); return; }
// // //     setSubmitting(true);
// // //     try {
// // //       const { checkout } = await import("../services/service.js");
// // //       const checkoutItems = getCheckoutItems();
// // //       const res = await checkout({
// // //         cartItems: checkoutItems,
// // //         subtotal: cartTotal,
// // //         shipping,
// // //         total: grandTotal,
// // //         address: activeAddress,
// // //         paymentMethod: "COD",
// // //       });
// // //       if (res.success) {
// // //         setOrderPlaced(true);
// // //         await clearCart();
// // //         navigate("#/order-success");
// // //       } else {
// // //         alert(res.error || "Failed to place order.");
// // //       }
// // //     } catch (err) {
// // //       console.error("Checkout error:", err);
// // //       alert("Failed to place order. Please try again.");
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   if (cartLoading) return (
// // //     <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
// // //       <div style={{ fontSize: 12, letterSpacing: "0.2em", color: BRAND }}>LOADING...</div>
// // //     </div>
// // //   );
// // //   if (cartItems.length === 0 && !orderPlaced) return null;

// // //   const userName = user?.name || user?.fullName || "";
// // //   const userEmail = user?.email || "";

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // //       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "44px 40px 36px" }}>
// // //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// // //           <div style={{ width: 32, height: 3, background: BRAND, marginBottom: 14 }} />
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: "0 0 12px" }}>CHECKOUT</h1>
// // //           <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
// // //             {[{ n: 1, l: "DELIVERY" }, { n: 2, l: "REVIEW & PAY" }].map((s, i) => (
// // //               <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //                 {i > 0 && <div style={{ width: isMobile ? 20 : 40, height: 1, background: step > i ? BRAND : "#333" }} />}
// // //                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // //                   <div style={{
// // //                     width: 28, height: 28, borderRadius: "50%",
// // //                     background: step >= s.n ? BRAND : "#222",
// // //                     border: `2px solid ${step >= s.n ? BRAND : "#333"}`,
// // //                     display: "flex", alignItems: "center", justifyContent: "center",
// // //                     fontSize: 11, fontWeight: 900, color: step >= s.n ? BRAND_TEXT : "#555", fontFamily: ff,
// // //                   }}>
// // //                     {step > s.n ? "✓" : s.n}
// // //                   </div>
// // //                   <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: step >= s.n ? "#fff" : "#555", fontFamily: ff }}>
// // //                     {s.l}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 16px 60px" : "48px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
// // //         <div>
// // //           {step === 1 && (
// // //             <FadeIn>
// // //               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
// // //                 <div style={{ background: "#f0f6fa", border: `1.5px solid #89c4e1`, padding: "14px 20px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
// // //                   <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
// // //                     <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRAND, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, fontFamily: ff, flexShrink: 0 }}>
// // //                       {userName.charAt(0).toUpperCase() || "?"}
// // //                     </div>
// // //                     <div>
// // //                       <div style={{ fontSize: 13, fontWeight: 900, color: BRAND, fontFamily: ff, letterSpacing: "0.04em" }}>{userName}</div>
// // //                       <div style={{ fontSize: 11, color: "#666", fontFamily: mono, marginTop: 2 }}>{userEmail}</div>
// // //                     </div>
// // //                   </div>
// // //                   <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", color: "#2a8a50", background: "#eaf5ef", padding: "4px 10px", fontFamily: ff }}>SIGNED IN</span>
// // //                 </div>

// // //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff }}>
// // //                   DELIVERY ADDRESS
// // //                 </div>

// // //                 {addressesLoading ? (
// // //                   <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#aaa", letterSpacing: "0.14em", fontFamily: ff }}>
// // //                     LOADING ADDRESSES…
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     {savedAddresses.length > 0 && (
// // //                       <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
// // //                         {savedAddresses.map(addr => (
// // //                           <AddressCard
// // //                             key={addr.addressId}
// // //                             addr={addr}
// // //                             selected={selectedAddressId === addr.addressId && !showCustomForm}
// // //                             onSelect={() => {
// // //                               setSelectedAddressId(addr.addressId);
// // //                               setShowCustomForm(false);
// // //                               setErrors({});
// // //                             }}
// // //                           />
// // //                         ))}
// // //                       </div>
// // //                     )}

// // //                     <button
// // //                       onClick={() => {
// // //                         const next = !showCustomForm;
// // //                         setShowCustomForm(next);
// // //                         if (next) setSelectedAddressId(null);
// // //                         else if (savedAddresses.length > 0) {
// // //                           const def = savedAddresses.find(a => a.isDefault === true || a.isDefault === "TRUE");
// // //                           setSelectedAddressId(def ? def.addressId : savedAddresses[0].addressId);
// // //                         }
// // //                         setErrors({});
// // //                       }}
// // //                       style={{
// // //                         display: "flex", alignItems: "center", gap: 8,
// // //                         background: "none", border: `1.5px dashed ${showCustomForm ? BRAND : "#bcd"}`,
// // //                         color: showCustomForm ? BRAND : "#6a8ea0", padding: "11px 20px",
// // //                         fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
// // //                         fontFamily: ff, cursor: "pointer", width: "100%",
// // //                         justifyContent: "center", marginBottom: 4, transition: "all 0.15s",
// // //                       }}
// // //                     >
// // //                       <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>
// // //                         {showCustomForm ? "×" : "+"}
// // //                       </span>
// // //                       {showCustomForm ? "CANCEL — USE SAVED ADDRESS" : "USE A DIFFERENT ADDRESS"}
// // //                     </button>

// // //                     {showCustomForm && (
// // //                       <FadeIn delay={0.05}>
// // //                         <div style={{ border: `1.5px solid ${BRAND}`, padding: isMobile ? "16px" : "24px 20px", marginTop: 16, background: "#f8fbfd" }}>
// // //                           <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: BRAND, marginBottom: 20, fontFamily: ff }}>
// // //                             ENTER DELIVERY DETAILS
// // //                           </div>
// // //                           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
// // //                             <Field label="FULL NAME" value={customForm.fullName} onChange={setCustomField("fullName")} placeholder="Ahmad Khan" error={errors.fullName} />
// // //                             <Field label="PHONE" value={customForm.phone} onChange={setCustomField("phone")} placeholder="0300 1234567" type="tel" error={errors.phone} />
// // //                             <Field label="STREET ADDRESS" value={customForm.address} onChange={setCustomField("address")} placeholder="House #12, Street 4, Block B" error={errors.address} full />
// // //                             <Field label="CITY" value={customForm.city} onChange={setCustomField("city")} placeholder="Karachi" error={errors.city} />
// // //                             <Field label="POSTAL CODE (optional)" value={customForm.postalCode} onChange={setCustomField("postalCode")} placeholder="75500" />
// // //                             <Field label="ORDER NOTES (optional)" value={customForm.notes} onChange={setCustomField("notes")} placeholder="e.g. Leave at gate" full />
// // //                           </div>
// // //                         </div>
// // //                       </FadeIn>
// // //                     )}
// // //                   </>
// // //                 )}

// // //                 <div style={{ marginTop: 32 }}>
// // //                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 20, fontFamily: ff }}>
// // //                     PAYMENT METHOD
// // //                   </div>
// // //                   <div style={{ border: `2px solid #89c4e1`, background: "#e8f2f8", padding: "18px 20px" }}>
// // //                     <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
// // //                       <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#89c4e1", border: `2px solid #89c4e1`, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
// // //                       </div>
// // //                       <div>
// // //                         <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.1em", color: BLACK, marginBottom: 4 }}>
// // //                           CASH ON DELIVERY (COD)
// // //                         </div>
// // //                         <p style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7, margin: 0 }}>
// // //                           Pay in cash when your order arrives. Available across all major cities in Pakistan.
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div style={{ marginTop: 32 }}>
// // //                   <YBtn onClick={handleProceedToReview} disabled={syncingCart || addressesLoading} style={{ width: "100%", padding: 15, fontSize: 12, letterSpacing: "0.14em" }}>
// // //                     {syncingCart ? "SYNCING CART…" : "REVIEW ORDER →"}
// // //                   </YBtn>
// // //                 </div>
// // //               </div>
// // //             </FadeIn>
// // //           )}

// // //           {step === 2 && (
// // //             <FadeIn>
// // //               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
// // //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.1em", color: BLACK, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #f0ece4" }}>
// // //                   REVIEW YOUR ORDER
// // //                 </div>
// // //                 <div style={{ background: "#FAFAF8", border: "1px solid #e0e8ee", padding: "18px 20px", marginBottom: 24 }}>
// // //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// // //                     <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>DELIVERY TO</div>
// // //                     <button onClick={() => setStep(1)} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#888", background: "none", border: "none", cursor: "pointer", fontFamily: ff, textDecoration: "underline" }}>EDIT</button>
// // //                   </div>
// // //                   <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, fontFamily: ff, marginBottom: 6 }}>{activeAddress.fullName}</div>
// // //                   <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
// // //                     {activeAddress.address}<br />
// // //                     {activeAddress.city}{activeAddress.postalCode ? `, ${activeAddress.postalCode}` : ""}<br />
// // //                     {activeAddress.phone}<br />
// // //                     {activeAddress.email}
// // //                   </div>
// // //                 </div>

// // //                 {cartItems.map(item => (
// // //                   <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0ece4" }}>
// // //                     <div style={{ width: 72, height: 56, flexShrink: 0, overflow: "hidden", background: CREAM }}>
// // //                       <img src={`${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // //                     </div>
// // //                     <div style={{ flex: 1 }}>
// // //                       <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>{item.name}</div>
// // //                       <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>{item.color} · Qty: {item.qty}</div>
// // //                     </div>
// // //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>
// // //                       PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
// // //                     </div>
// // //                   </div>
// // //                 ))}

// // //                 <div style={{ background: "#e8f2f8", border: `1.5px solid #89c4e1`, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
// // //                   <span style={{ fontSize: 18 }}>💵</span>
// // //                   <div>
// // //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", color: BLACK }}>CASH ON DELIVERY</div>
// // //                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>Pay PKR {grandTotal.toLocaleString()} when your order arrives</div>
// // //                   </div>
// // //                 </div>

// // //                 <div style={{ marginTop: 28 }}>
// // //                   <YBtn onClick={handlePlaceOrder} disabled={submitting} style={{ width: "100%", padding: 16, fontSize: 13, letterSpacing: "0.16em" }}>
// // //                     {submitting ? "PLACING YOUR ORDER…" : `PLACE ORDER · PKR ${grandTotal.toLocaleString()}`}
// // //                   </YBtn>
// // //                 </div>
// // //               </div>
// // //             </FadeIn>
// // //           )}
// // //         </div>

// // //         <div style={{ background: "#fff", border: "1px solid #e0e8ee", position: "sticky", top: 80 }}>
// // //           <div style={{ background: BLACK, padding: "18px 22px" }}>
// // //             <div style={{ width: 24, height: 3, background: BRAND, marginBottom: 8 }} />
// // //             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>ORDER SUMMARY</div>
// // //           </div>
// // //           <div style={{ padding: 20 }}>
// // //             {cartItems.map(item => (
// // //               <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
// // //                 <div style={{ width: 52, height: 40, flexShrink: 0, overflow: "hidden", background: CREAM }}>
// // //                   <img src={`${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // //                 </div>
// // //                 <div style={{ flex: 1 }}>
// // //                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>{item.name}</div>
// // //                   <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono }}>× {item.qty}</div>
// // //                 </div>
// // //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>
// // //                   PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             <div style={{ borderTop: "1px solid #f0ece4", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
// // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // //                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Subtotal</span>
// // //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
// // //               </div>
// // //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// // //                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Shipping</span>
// // //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>
// // //                   {shipping === 0 ? "FREE" : `PKR ${shipping}`}
// // //                 </span>
// // //               </div>
// // //               <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "2px solid #e8e0d0", marginTop: 4 }}>
// // //                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", color: BLACK }}>TOTAL</span>
// // //                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 16 : 18, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ ORDER SUCCESS PAGE ============
// // // export function OrderSuccessPage({ navigate }) {
// // //   const [count, setCount] = useState(8);
// // //   const isMobile = useMediaQuery("(max-width: 767px)");

// // //   useEffect(() => {
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //     const t = setInterval(() => setCount(c => {
// // //       if (c <= 1) { clearInterval(t); navigate("#/"); return 0; }
// // //       return c - 1;
// // //     }), 1000);
// // //     return () => clearInterval(t);
// // //   }, [navigate]);

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, position: "relative", overflow: "hidden", padding: "20px" }}>
// // //       <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// // //         <Frame shape="round" size={isMobile ? 400 : 900} color="#fff"/>
// // //       </div>
// // //       <div style={{ textAlign: "center", maxWidth: 560, padding: "0 20px", position: "relative", zIndex: 1 }}>
// // //         <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 36, color: BRAND_TEXT }}>✓</div>
// // //         <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// // //         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#fff", margin: "0 0 10px" }}>ORDER</h1>
// // //         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#89c4e1", margin: "0 0 28px" }}>PLACED!</h1>
// // //         <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.45)", fontFamily: mono, lineHeight: 1.8, marginBottom: 36 }}>
// // //           Thank you for your order. Our team will call you to confirm delivery details. Your frames will arrive within 5–7 business days.
// // //         </p>
// // //         <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// // //           <YBtn onClick={() => navigate("#/products")} style={{ padding: "13px 28px", fontSize: isMobile ? 10 : 12 }}>SHOP MORE FRAMES</YBtn>
// // //           <button onClick={() => navigate("#/")} style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.2)", padding: "13px 24px", fontSize: 12, fontWeight: 900, letterSpacing: "0.1em", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontFamily: ff }}>GO HOME</button>
// // //         </div>
// // //         <div style={{ marginTop: 28, fontSize: 11, color: "#444", fontFamily: mono }}>Redirecting to home in {count}s...</div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ REVIEW SUBMISSION PAGE ============
// // // export function ReviewSubmissionPage({ productId, reviewId, navigate }) {
// // //   const { user } = useAuth();
// // //   const [product, setProduct] = useState(null);
// // //   const [existingReview, setExistingReview] = useState(null);
// // //   const [rating, setRating] = useState(0);
// // //   const [reviewText, setReviewText] = useState("");
// // //   const [hovered, setHovered] = useState(0);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [msg, setMsg] = useState({ type: "", text: "" });
// // //   const [loading, setLoading] = useState(true);

// // //   const isMobile = useMediaQuery("(max-width: 767px)");

// // //   useEffect(() => {
// // //     if (!user) { navigate("#/"); return; }
// // //     window.scrollTo({ top: 0, behavior: "smooth" });

// // //     const found = PRODUCTS_DATA.find(p => p.id === productId);
// // //     setProduct(found || { id: productId, name: `Product #${productId}`, gallery: [], discountPrice: 0, price: 0 });

// // //     const loadExisting = async () => {
// // //       if (reviewId) {
// // //         try {
// // //           const res = await getUserReviews();
// // //           const reviews = res.data || [];
// // //           const match = reviews.find(r => r.reviewId === reviewId);
// // //           if (match) {
// // //             setExistingReview(match);
// // //             setRating(Number(match.rating) || 0);
// // //             setReviewText(match.review || "");
// // //           }
// // //         } catch {}
// // //       }
// // //       setLoading(false);
// // //     };
// // //     loadExisting();
// // //   }, [productId, reviewId, user, navigate]);

// // //   const handleSubmit = async () => {
// // //     if (!rating) { setMsg({ type: "error", text: "Please select a star rating before submitting." }); return; }
// // //     setSubmitting(true);
// // //     setMsg({ type: "", text: "" });
// // //     try {
// // //       if (existingReview && reviewId) {
// // //         await updateReview({ reviewId, rating, review: reviewText });
// // //       } else {
// // //         await submitReview({ productId, rating, review: reviewText });
// // //       }
// // //       setMsg({ type: "success", text: existingReview ? "Review updated successfully!" : "Review submitted! It will appear after approval." });
// // //       setTimeout(() => navigate("#/dashboard?tab=reviews"), 2200);
// // //     } catch (err) {
// // //       setMsg({ type: "error", text: err.message || "Submission failed. Please try again." });
// // //     }
// // //     setSubmitting(false);
// // //   };

// // //   if (!user) return null;

// // //   const LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// // //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// // //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// // //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff" />
// // //         </div>
// // //         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
// // //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }} />
// // //           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT · REVIEWS</div>
// // //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 8vw, 36px)" : "clamp(32px, 5vw, 60px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
// // //             {existingReview ? "EDIT REVIEW" : "WRITE A REVIEW"}
// // //           </h1>
// // //         </div>
// // //       </div>

// // //       <Breadcrumb crumbs={[
// // //         { label: "HOME", path: "#/" },
// // //         { label: "MY ACCOUNT", path: "#/dashboard" },
// // //         { label: "REVIEWS", path: "#/dashboard?tab=reviews" },
// // //         { label: existingReview ? "EDIT REVIEW" : "SUBMIT REVIEW", path: null },
// // //       ]} />

// // //       <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "56px 24px 80px" }}>
// // //         {loading ? (
// // //           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING…</div>
// // //         ) : (
// // //           <FadeIn>
// // //             {product && (
// // //               <div style={{ display: "flex", gap: 20, alignItems: "center", background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "12px" : "20px", marginBottom: 36, flexWrap: "wrap" }}>
// // //                 <div style={{ width: 90, height: 72, background: CREAM, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                   {product.gallery?.[0]
// // //                     ? <img src={`${product.gallery[0]}`} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
// // //                     : <span style={{ fontSize: 28 }}>👓</span>
// // //                   }
// // //                 </div>
// // //                 <div>
// // //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#aaa", fontFamily: ff, marginBottom: 4 }}>
// // //                     {product.category?.toUpperCase() || "EYEWEAR"}
// // //                   </div>
// // //                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 16, color: BLACK, letterSpacing: "0.04em", marginBottom: 4 }}>
// // //                     {product.name}
// // //                   </div>
// // //                   {product.discountPrice > 0 && (
// // //                     <div style={{ fontFamily: ff, fontSize: 13, color: BRAND, fontWeight: 700 }}>
// // //                       PKR {product.discountPrice.toLocaleString()}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             <div style={{ background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "20px" : "32px" }}>
// // //               <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 28, fontFamily: ff }}>
// // //                 {existingReview ? "UPDATE YOUR REVIEW" : "YOUR REVIEW"}
// // //               </div>

// // //               <div style={{ marginBottom: 28 }}>
// // //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 12 }}>
// // //                   OVERALL RATING <span style={{ color: "#e74c3c" }}>*</span>
// // //                 </div>
// // //                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
// // //                   <div style={{ display: "flex", gap: 4 }}>
// // //                     {[1, 2, 3, 4, 5].map(star => (
// // //                       <button
// // //                         key={star}
// // //                         onClick={() => setRating(star)}
// // //                         onMouseEnter={() => setHovered(star)}
// // //                         onMouseLeave={() => setHovered(0)}
// // //                         style={{
// // //                           background: "none", border: "none", cursor: "pointer",
// // //                           fontSize: isMobile ? 28 : 36, padding: "0 3px",
// // //                           color: star <= (hovered || rating) ? "#f5a623" : "#e0ddd6",
// // //                           transition: "color 0.12s, transform 0.1s",
// // //                           transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
// // //                         }}
// // //                       >★</button>
// // //                     ))}
// // //                   </div>
// // //                   {(hovered || rating) > 0 && (
// // //                     <span style={{ fontSize: 12, color: "#888", fontFamily: mono, letterSpacing: "0.04em" }}>
// // //                       {LABEL[hovered || rating]}
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div style={{ marginBottom: 28 }}>
// // //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 8 }}>
// // //                   WRITTEN REVIEW <span style={{ fontSize: 10, color: "#aaa", fontWeight: 400 }}>(optional)</span>
// // //                 </div>
// // //                 <textarea
// // //                   value={reviewText}
// // //                   onChange={e => setReviewText(e.target.value)}
// // //                   placeholder="Share your experience with this frame — fit, quality, style..."
// // //                   rows={5}
// // //                   style={{
// // //                     width: "100%", padding: "14px 16px", border: "1.5px solid #e8e0d0",
// // //                     fontSize: 13, fontFamily: mono, color: BLACK, lineHeight: 1.7,
// // //                     resize: "vertical", outline: "none", boxSizing: "border-box",
// // //                     background: "#fafaf8",
// // //                   }}
// // //                   onFocus={e => e.target.style.borderColor = BRAND}
// // //                   onBlur={e => e.target.style.borderColor = "#e8e0d0"}
// // //                 />
// // //                 <div style={{ fontSize: 10, color: "#bbb", fontFamily: mono, marginTop: 6, textAlign: "right" }}>
// // //                   {reviewText.length} characters
// // //                 </div>
// // //               </div>

// // //               {msg.text && (
// // //                 <div style={{
// // //                   padding: "12px 16px", fontSize: 12, fontFamily: mono, marginBottom: 20,
// // //                   background: msg.type === "success" ? "#eaf5ef" : "#fef0f0",
// // //                   border: `1px solid ${msg.type === "success" ? "#a3d9b5" : "#f5c0c0"}`,
// // //                   color: msg.type === "success" ? "#2a8a50" : "#a33",
// // //                 }}>
// // //                   {msg.type === "success" ? "✓ " : "⚠ "}{msg.text}
// // //                 </div>
// // //               )}

// // //               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// // //                 <button
// // //                   onClick={handleSubmit}
// // //                   disabled={submitting || rating === 0}
// // //                   style={{
// // //                     background: submitting || rating === 0 ? "#ccc" : BRAND, color: "#fff",
// // //                     border: "none", padding: "14px 28px", fontSize: 11, fontWeight: 900,
// // //                     letterSpacing: "0.14em", fontFamily: ff,
// // //                     cursor: submitting || rating === 0 ? "not-allowed" : "pointer",
// // //                     transition: "background 0.2s",
// // //                   }}
// // //                 >
// // //                   {submitting ? "SUBMITTING…" : existingReview ? "UPDATE REVIEW" : "SUBMIT REVIEW"}
// // //                 </button>
// // //                 <button
// // //                   onClick={() => navigate("#/dashboard?tab=reviews")}
// // //                   style={{
// // //                     background: "none", border: `1.5px solid #ccc`, color: "#888",
// // //                     padding: "14px 24px", fontSize: 11, fontWeight: 900,
// // //                     letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// // //                   }}
// // //                 >
// // //                   ← BACK TO REVIEWS
// // //                 </button>
// // //               </div>

// // //               <div style={{ marginTop: 20, padding: "12px 16px", background: "#f8f8f4", border: "1px solid #eee" }}>
// // //                 <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, lineHeight: 1.8 }}>
// // //                   ★ Reviews are verified and approved before publishing. Only customers who have purchased this product may submit a review.
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </FadeIn>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ============ PRODUCT REVIEWS SECTION ============
// // // function ProductReviewsSection({ productId, navigate }) {
// // //   const { user } = useAuth();
// // //   const [reviews, setReviews] = useState([]);
// // //   const [stats, setStats] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showAll, setShowAll] = useState(false);

// // //   const isMobile = useMediaQuery("(max-width: 767px)");

// // //   const load = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await getReviews({ productId });
// // //       const data = res.data || [];
// // //       setReviews(Array.isArray(data) ? data : []);

// // //       if (data.length > 0) {
// // //         const total = data.length;
// // //         const avg = data.reduce((s, r) => s + Number(r.rating || 0), 0) / total;
// // //         const breakdown = [5, 4, 3, 2, 1].map(star => ({
// // //           star,
// // //           count: data.filter(r => Number(r.rating) === star).length,
// // //         }));
// // //         setStats({ avg: Math.round(avg * 10) / 10, total, breakdown });
// // //       } else {
// // //         setStats({ avg: 0, total: 0, breakdown: [] });
// // //       }
// // //     } catch {
// // //       setReviews([]);
// // //       setStats({ avg: 0, total: 0, breakdown: [] });
// // //     }
// // //     setLoading(false);
// // //   }, [productId]);

// // //   useEffect(() => { load(); }, [load]);

// // //   const displayed = showAll ? reviews : reviews.slice(0, 3);

// // //   return (
// // //     <div style={{ background: CREAM, borderTop: "2px solid #e8ddd0", padding: isMobile ? "40px 20px" : "64px 40px" }}>
// // //       <div style={{ maxWidth: 1400, margin: "0 auto" }}>

// // //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
// // //           <div>
// // //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>VERIFIED BUYERS</div>
// // //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 3.5vw, 36px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>
// // //               CUSTOMER REVIEWS
// // //             </h2>
// // //           </div>
// // //           {user && (
// // //             <button
// // //               onClick={() => navigate(`#/review/${productId}`)}
// // //               style={{
// // //                 background: BRAND, color: "#fff", border: "none",
// // //                 padding: "12px 24px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
// // //                 letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
// // //               }}
// // //             >
// // //               WRITE A REVIEW
// // //             </button>
// // //           )}
// // //         </div>

// // //         {loading ? (
// // //           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING REVIEWS…</div>
// // //         ) : (
// // //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", gap: isMobile ? 32 : 48, alignItems: "flex-start" }}>

// // //             <div>
// // //               {stats && stats.total > 0 ? (
// // //                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24 }}>
// // //                   <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ece4" }}>
// // //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 52, color: BLACK, lineHeight: 1 }}>
// // //                       {stats.avg.toFixed(1)}
// // //                     </div>
// // //                     <div style={{ color: "#f5a623", fontSize: 20, letterSpacing: 3, margin: "6px 0" }}>
// // //                       {"★".repeat(Math.round(stats.avg))}{"☆".repeat(5 - Math.round(stats.avg))}
// // //                     </div>
// // //                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>
// // //                       Based on {stats.total} review{stats.total !== 1 ? "s" : ""}
// // //                     </div>
// // //                   </div>
// // //                   {stats.breakdown.map(({ star, count }) => (
// // //                     <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
// // //                       <span style={{ fontSize: 10, fontFamily: ff, fontWeight: 900, color: "#888", minWidth: 28, textAlign: "right" }}>{star}★</span>
// // //                       <div style={{ flex: 1, height: 6, background: "#f0ece4", overflow: "hidden" }}>
// // //                         <div style={{ height: "100%", background: "#f5a623", width: stats.total > 0 ? `${(count / stats.total) * 100}%` : "0%", transition: "width 0.4s ease" }} />
// // //                       </div>
// // //                       <span style={{ fontSize: 10, fontFamily: mono, color: "#aaa", minWidth: 14 }}>{count}</span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24, textAlign: "center" }}>
// // //                   <div style={{ fontSize: 32, marginBottom: 8 }}>☆</div>
// // //                   <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, lineHeight: 1.7 }}>No reviews yet. Be the first!</div>
// // //                   {user && (
// // //                     <button
// // //                       onClick={() => navigate(`#/review/${productId}`)}
// // //                       style={{
// // //                         marginTop: 14, background: BRAND, color: "#fff", border: "none",
// // //                         padding: "10px 20px", fontSize: 10, fontWeight: 900,
// // //                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// // //                       }}
// // //                     >
// // //                       WRITE A REVIEW
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div>
// // //               {reviews.length === 0 ? (
// // //                 <div style={{ padding: "32px 0", color: "#aaa", fontFamily: mono, fontSize: 13 }}>
// // //                   No reviews yet for this product.
// // //                 </div>
// // //               ) : (
// // //                 <>
// // //                   {displayed.map((r, i) => (
// // //                     <div key={r.reviewId || i} style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 22, marginBottom: 14 }}>
// // //                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
// // //                         <div>
// // //                           <div style={{ color: "#f5a623", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>
// // //                             {"★".repeat(Number(r.rating) || 0)}{"☆".repeat(5 - (Number(r.rating) || 0))}
// // //                           </div>
// // //                           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 12, color: BLACK, letterSpacing: "0.04em" }}>
// // //                             {r.authorName || r.fullName || "Verified Buyer"}
// // //                           </div>
// // //                         </div>
// // //                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
// // //                           {(r.verifiedPurchase === true || r.verifiedPurchase === "TRUE" || r.verifiedPurchase === "true") && (
// // //                             <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", background: "#eaf5ef", color: "#2a8a50", fontFamily: ff }}>
// // //                               ✓ VERIFIED PURCHASE
// // //                             </span>
// // //                           )}
// // //                           <span style={{ fontSize: 10, color: "#bbb", fontFamily: mono }}>
// // //                             {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) : ""}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                       {r.review && (
// // //                         <p style={{ fontSize: 13, color: "#555", fontFamily: mono, margin: 0, lineHeight: 1.8 }}>
// // //                           {r.review}
// // //                         </p>
// // //                       )}
// // //                     </div>
// // //                   ))}

// // //                   {reviews.length > 3 && (
// // //                     <button
// // //                       onClick={() => setShowAll(v => !v)}
// // //                       style={{
// // //                         background: "none", border: `1.5px solid ${BLACK}`, color: BLACK,
// // //                         padding: "11px 24px", fontSize: 11, fontWeight: 900,
// // //                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer", marginTop: 8,
// // //                       }}
// // //                     >
// // //                       {showAll ? `SHOW FEWER ↑` : `VIEW ALL ${reviews.length} REVIEWS ↓`}
// // //                     </button>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export const CollectionPage = CollectionsLandingPage;






























// // // Complete file (the same structure as before, only HomePage modified)

// // import { useState, useEffect, useCallback } from "react";
// // import { PRODUCTS_DATA } from "../prodcut.js";
// // import { BLACK, CREAM, ff, mono, COLLECTIONS,
// //          HERO_SLIDES, HOME_PRODUCTS, TINTS, TESTIMONIALS, PROCESS_STEPS, CATEGORIES_HOME,
// //          tagColors } from "../contants/store.js";
// // import { applyProductFilters, getProductColorOptions, getProductBrandOptions, getProductSizeOptions, getProductDisplayPrice, getProductDiscountPercent, getRelatedProducts, getProductVariants, normalizeCategory, formatPriceValue, matchesSearchTerm } from "../services/productUtils.js";
// // import { YBtn, OutlineBtn, FadeIn, Counter, Frame, ProductCard, ProductSlider, WishlistHeart, WishlistSkeleton } from "../components/shared";
// // import { useCart } from "../contexts/CardContext";
// // import { useAuth } from "../Auth/auth.jsx";
// // import {
// //   getWishlist, removeFromWishlist, getReviews, getAddresses,
// //   submitReview, updateReview, getProductReviewStats, getUserReviews,
// // } from "../services/service.js";

// // const BRAND      = "#0c2c41";
// // const BRAND_TEXT = "#ffffff";
// // const NAVY = BRAND;

// // // ============================================
// // // RESPONSIVE HOOK
// // // ============================================
// // function useMediaQuery(query) {
// //   const [matches, setMatches] = useState(false);
// //   useEffect(() => {
// //     const media = window.matchMedia(query);
// //     if (media.matches !== matches) setMatches(media.matches);
// //     const listener = () => setMatches(media.matches);
// //     media.addEventListener("change", listener);
// //     return () => media.removeEventListener("change", listener);
// //   }, [query, matches]);
// //   return matches;
// // }

// // // ============================================
// // // SHARED VARIANT HELPERS
// // // ============================================
// // function normalizeVariantName(value) {
// //   return String(value || "").trim().toLowerCase();
// // }

// // function getStoredVariantName(productId) {
// //   try {
// //     return localStorage.getItem(`product-color:${productId}`) || "";
// //   } catch {
// //     return "";
// //   }
// // }

// // function setStoredVariantName(productId, name) {
// //   try {
// //     localStorage.setItem(`product-color:${productId}`, name);
// //   } catch {
// //     // ignore storage write failures
// //   }
// // }

// // // ============================================
// // // HELPER — Join raw wishlist rows with product details
// // // ============================================
// // function enrichWishlistItems(rawItems) {
// //   return rawItems
// //     .map(item => {
// //       const product = PRODUCTS_DATA.find(p => String(p.id) === String(item.productId));
// //       if (!product) return null;
// //       return {
// //         ...item,
// //         product: {
// //           name       : product.name,
// //           price      : product.price,
// //           salePrice  : product.discountPrice,
// //           imageUrl   : product.gallery?.[0] || product.image || "",
// //           color      : product.color,
// //           subcategory: product.subcategory,
// //           gender     : product.gender,
// //         },
// //       };
// //     })
// //     .filter(item => item !== null);
// // }

// // // ============================================
// // // COLLECTIONS DATA
// // // ============================================
// // const COLLECTIONS_PAGE_DATA = [
// //   { slug: "best-sellers", name: "Best Sellers", count: 24, desc: "The frames everyone's talking about.", tag: "MOST POPULAR", bg: BLACK, dark: true, shape: "round" },
// //   { slug: "new-arrivals", name: "New Arrivals", count: 18, desc: "Fresh styles, just landed.", tag: "NEW", bg: BRAND, dark: false, shape: "square" },
// //   { slug: "custom-tints", name: "Custom Made Tints™", count: 32, desc: "20+ hand-applied shades. Any frame.", tag: "EXCLUSIVE", bg: "#1a1a1a", dark: true, shape: "cateye" },
// //   { slug: "reading-glasses", name: "Reading Glasses", count: 12, desc: "Crystal clear. Beautifully crafted.", tag: null, bg: CREAM, dark: false, shape: "round" },
// //   { slug: "blue-light", name: "Blue Light Glasses", count: 15, desc: "Protect your eyes in the digital age.", tag: "DIGITAL RELIEF", bg: "#1a2a4a", dark: true, shape: "square" },
// //   { slug: "mens-collection", name: "Men's Collection", count: 48, desc: "Bold frames for every face.", tag: null, bg: "#f5f5f5", dark: false, shape: "aviator" },
// //   { slug: "womens-collection", name: "Women's Collection", count: 52, desc: "Refined eyewear for every occasion.", tag: null, bg: "#fdf4f4", dark: false, shape: "cateye" },
// //   { slug: "limited-editions", name: "Limited Editions", count: 8, desc: "Before they're gone.", tag: "LIMITED", bg: "#2a1a3a", dark: true, shape: "round" },
// //   { slug: "round", name: "Round Frames", count: 21, desc: "The timeless silhouette.", tag: null, bg: CREAM, dark: false, shape: "round" },
// //   { slug: "square", name: "Square Frames", count: 19, desc: "Sharp. Structured. Striking.", tag: null, bg: "#f5f5f0", dark: false, shape: "square" },
// // ];

// // // ============================================
// // // BREADCRUMB
// // // ============================================
// // function Breadcrumb({ crumbs }) {
// //   return (
// //     <nav aria-label="breadcrumb" style={{ background: CREAM, borderBottom: "1px solid #e8e0d0", padding: "12px 20px" }}>
// //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
// //         {crumbs.map((crumb, i) => (
// //           <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //             {i > 0 && <span style={{ color: "#bbb", fontSize: 10 }}>›</span>}
// //             {crumb.path
// //               ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
// //               : <span aria-current="page" style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
// //           </span>
// //         ))}
// //       </div>
// //     </nav>
// //   );
// // }

// // // ─────────────────────────────────────────────
// // // SORT OPTIONS
// // // ─────────────────────────────────────────────
// // const SORT_OPTS = [
// //   { key: "featured",    label: "Featured" },
// //   { key: "relevant",    label: "Most relevant" },
// //   { key: "bestSelling", label: "Best selling" },
// //   { key: "alphaAZ",     label: "Alphabetically, A-Z" },
// //   { key: "alphaZA",     label: "Alphabetically, Z-A" },
// //   { key: "priceLow",    label: "Price, low to high" },
// //   { key: "priceHigh",   label: "Price, high to low" },
// //   { key: "dateNew",     label: "Date, new to old" },
// //   { key: "dateOld",     label: "Date, old to new" },
// // ];

// // // ============================================
// // // FILTER + SORT FUNCTIONS (UPDATED)
// // // ============================================

// // function applyFilters(products, activeFilters, sort, searchTerm = "") {
// //   let filtered = products;

// //   // 1. Apply search
// //   if (searchTerm && searchTerm.trim()) {
// //     const term = searchTerm.trim().toLowerCase();
// //     filtered = filtered.filter(p =>
// //       p.name.toLowerCase().includes(term) ||
// //       (p.category && p.category.toLowerCase().includes(term)) ||
// //       (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
// //       (p.gender && p.gender.toLowerCase().includes(term))
// //     );
// //   }

// //   // 2. Apply size filter (now using Small/Medium/Large categories)
// //   if (activeFilters.size && activeFilters.size.length) {
// //     filtered = filtered.filter(p =>
// //       p.sizes && p.sizes.some(s =>
// //         activeFilters.size.some(cat => s.includes(`(${cat})`))
// //       )
// //     );
// //   }

// //   // 3. Remove size from activeFilters so that applyProductFilters doesn't filter it again
// //   const otherFilters = { ...activeFilters };
// //   delete otherFilters.size;

// //   // 4. Apply all other filters (category, brand, price, rating, shape, etc.) and sort
// //   filtered = applyProductFilters(filtered, otherFilters, sort, "");

// //   return filtered;
// // }

// // // NOTE: price parsing + free-text search matching now live in
// // // ../services/productUtils.js (matchesSearchTerm / searchProducts) so the navbar
// // // search box and this Products page share one implementation.

// // // Build a "related products" list for a set of matched products. Pulls each
// // // match's explicit relatedIds first, then fills with frames sharing the same
// // // category / subcategory / gender. Excludes anything already on screen.
// // function getRelatedForMatches(allProducts, matches, excludeIds = [], limit = 8) {
// //   const exclude = new Set(excludeIds.map(String));
// //   const picked = [];
// //   const pushUnique = (p) => {
// //     if (!p) return;
// //     if (exclude.has(String(p.id))) return;
// //     if (picked.some((x) => x.id === p.id)) return;
// //     picked.push(p);
// //   };

// //   // 1. Explicit relatedIds from each matched product.
// //   matches.forEach((m) => {
// //     (m.relatedIds || []).forEach((rid) => pushUnique(allProducts.find((p) => p.id === rid)));
// //   });

// //   // 2. Same category / subcategory / gender as any match.
// //   if (picked.length < limit) {
// //     matches.forEach((m) => {
// //       allProducts.forEach((p) => {
// //         if (picked.length >= limit) return;
// //         const sameCat = normalizeCategory(p.category) === normalizeCategory(m.category);
// //         const sameSub = m.subcategory && p.subcategory && p.subcategory === m.subcategory;
// //         const sameGender = m.gender && p.gender && p.gender.toLowerCase() === m.gender.toLowerCase();
// //         if (sameCat || sameSub || sameGender) pushUnique(p);
// //       });
// //     });
// //   }

// //   return picked.slice(0, limit);
// // }

// // function sortProducts(arr, sort) {
// //   const a = [...arr];
// //   if (sort === "alphaAZ")   return a.sort((x, y) => x.name.localeCompare(y.name));
// //   if (sort === "alphaZA")   return a.sort((x, y) => y.name.localeCompare(x.name));
// //   if (sort === "priceLow")  return a.sort((x, y) => getProductDisplayPrice(x).discountPrice - getProductDisplayPrice(y).discountPrice);
// //   if (sort === "priceHigh") return a.sort((x, y) => getProductDisplayPrice(y).discountPrice - getProductDisplayPrice(x).discountPrice);
// //   if (sort === "dateNew")   return a.reverse();
// //   return a;
// // }

// // const SHAPE_CONFIG = [
// //   { key: "Round", label: "Round" },
// //   { key: "Square", label: "Square" },
// //   { key: "Aviator", label: "Aviator" },
// //   { key: "Cat-Eye", label: "Cat-Eye" },
// //   { key: "Geometric", label: "Geometric" },
// //   { key: "Browline", label: "Browline" },
// // ];

// // // Define ShapeIcon component to avoid ReferenceError
// // function ShapeIcon({ shape, active }) {
// //   const color = active ? "#fff" : "#555";
// //   // Simple SVG placeholders – you can replace with actual shape icons
// //   const svgMap = {
// //     "Round": <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />,
// //     "Square": <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth="1.5" fill="none" />,
// //     "Aviator": <path d="M4 18 L12 6 L20 18 L16 18 L12 12 L8 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
// //     "Cat-Eye": <path d="M6 8 L10 4 L18 6 L22 12 L18 18 L10 18 L4 14 Z" stroke={color} strokeWidth="1.5" fill="none" />,
// //     "Geometric": <polygon points="6,6 18,6 20,12 14,18 6,18 4,12" stroke={color} strokeWidth="1.5" fill="none" />,
// //     "Browline": <path d="M4 12 L8 8 L16 8 L20 12 L18 18 L6 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
// //   };
// //   return (
// //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //       {svgMap[shape] || <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />}
// //     </svg>
// //   );
// // }

// // // ============================================
// // // FILTER SIDEBAR (UPDATED SIZE SECTION)
// // // ============================================

// // function FilterSidebar({ allProducts, activeFilters, setActiveFilters, filtersOpen, isMobile, onClose }) {
// //   const [open, setOpen] = useState({ category: true, color: true, brand: false, rating: false, price: true, size: false, availability: false });
// //   if (!filtersOpen) return null;

// //   const toggleSec = k => setOpen(s => ({ ...s, [k]: !s[k] }));
// //   const toggle = (group, value) =>
// //     setActiveFilters(prev => {
// //       const cur = prev[group] || [];
// //       return { ...prev, [group]: cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value] };
// //     });
// //   const isOn = (group, value) => (activeFilters[group] || []).includes(value);

// //   const Section = ({ id, title, children }) => (
// //     <div style={{ borderBottom: "1px solid #e8e0d0" }}>
// //       <button onClick={() => toggleSec(id)} style={{
// //         width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
// //         padding: "14px 0", background: "none", border: "none", cursor: "pointer",
// //         fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.14em", color: BLACK,
// //       }}>
// //         {title}
// //         <span style={{ fontSize: 10, color: "#999", display: "block", transition: "transform 0.2s", transform: open[id] ? "rotate(180deg)" : "none" }}>▲</span>
// //       </button>
// //       {open[id] && <div style={{ paddingBottom: 14 }}>{children}</div>}
// //     </div>
// //   );

// //   const Check = ({ group, value, label, count }) => {
// //     const on = isOn(group, value);
// //     return (
// //       <label onClick={() => toggle(group, value)} style={{
// //         display: "flex", alignItems: "center", justifyContent: "space-between",
// //         gap: 8, padding: "5px 0", cursor: "pointer",
// //         fontSize: 13, color: on ? BLACK : "#555", fontFamily: mono,
// //       }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
// //           <div style={{
// //             width: 15, height: 15, flexShrink: 0,
// //             border: `1.5px solid ${on ? BRAND : "#ccc"}`,
// //             background: on ? BRAND : "#fff",
// //             display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
// //           }}>
// //             {on && <span style={{ color: BRAND_TEXT, fontSize: 9, lineHeight: 1 }}>✓</span>}
// //           </div>
// //           <span>{label}</span>
// //         </div>
// //         {count !== undefined && <span style={{ fontSize: 11, color: "#bbb", fontFamily: ff }}>({count})</span>}
// //       </label>
// //     );
// //   };

// //   const wrapStyle = isMobile
// //     ? { position: "fixed", inset: 0, zIndex: 1000, background: "#fff", padding: "20px 16px 80px", overflowY: "auto" }
// //     : { width: 210, flexShrink: 0, padding: "20px 20px 80px 0", borderRight: "1px solid #e8e0d0" };

// //   // Define size categories and compute counts
// //   const sizeCategories = ["Small", "Medium", "Large"];
// //   const sizeCounts = sizeCategories.map(cat => ({
// //     label: cat,
// //     count: allProducts.filter(p =>
// //       p.sizes && p.sizes.some(s => s.includes(`(${cat})`))
// //     ).length
// //   }));

// //   return (
// //     <div style={wrapStyle}>
// //       {isMobile && (
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// //           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em" }}>FILTER</div>
// //           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: BLACK, lineHeight: 1 }}>×</button>
// //         </div>
// //       )}

// //       <Section id="shape" title="SHAPE">
// //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, paddingTop: 4 }}>
// //           {SHAPE_CONFIG.map((shape) => {
// //             const count = allProducts.filter((product) => product.subcategory === shape.key).length;
// //             if (count === 0) return null;
// //             const on = isOn("shape", shape.key);
// //             return (
// //               <button key={shape.key} onClick={() => toggle("shape", shape.key)} style={{
// //                 border: `1.5px solid ${on ? BRAND : "#ddd"}`,
// //                 background: on ? BRAND : "#fff",
// //                 padding: "10px 6px 8px", cursor: "pointer",
// //                 display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.18s",
// //               }}>
// //                 <ShapeIcon shape={shape.key} active={on} />
// //                 <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", fontFamily: ff, color: on ? BRAND_TEXT : "#555" }}>
// //                   {shape.label.toUpperCase()}
// //                 </span>
// //                 <span style={{ fontSize: 9, color: on ? "rgba(255,255,255,0.6)" : "#aaa", fontFamily: mono }}>({count})</span>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </Section>

// //       <Section id="category" title="CATEGORY">
// //         {Array.from(new Set(allProducts.map((product) => normalizeCategory(product.category || "Eyeglasses")).filter(Boolean))).map((value) => (
// //           <Check key={value} group="category" value={value} label={value} count={allProducts.filter((product) => normalizeCategory(product.category || "Eyeglasses") === value).length} />
// //         ))}
// //       </Section>

// //       <Section id="size" title="SIZE">
// //         {sizeCounts.map(({ label, count }) => (
// //           <Check
// //             key={label}
// //             group="size"
// //             value={label}
// //             label={label}
// //             count={count}
// //           />
// //         ))}
// //       </Section>

// //       {/* Other sections (color, brand, rating, price) omitted for brevity but can be added back */}

// //       {isMobile && (
// //         <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#fff", borderTop: "1px solid #e8e0d0" }}>
// //           <YBtn onClick={onClose} style={{ width: "100%", padding: "14px" }}>APPLY FILTERS</YBtn>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const PRICE_LABELS = { under20: "Under 20K", "20to30": "20K–30K", above30: "Above 30K" };

// // function FilterSortBar({ filtersOpen, toggleFilters, isMobile, sort, setSort, count, activeFilters, setActiveFilters }) {
// //   const allActive = Object.entries(activeFilters).flatMap(([grp, vals]) => vals.map(v => ({ grp, v })));
// //   const labelFor = (grp, v) => {
// //     if (grp === "price") return PRICE_LABELS[v];
// //     if (grp === "size") return v; // already Small/Medium/Large
// //     return v;
// //   };

// //   return (
// //     <div style={{ background: "#fff", borderBottom: "1px solid #e8e0d0", position: "sticky", top: isMobile ? 56 : 62, zIndex: 20 }}>
// //       <div style={{
// //         maxWidth: 1400, margin: "0 auto", padding: "0 16px",
// //         display: "flex", alignItems: "center", justifyContent: "space-between", height: 50,
// //         flexWrap: "wrap",
// //       }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0, overflow: "hidden", flexWrap: "wrap" }}>
// //           <button onClick={toggleFilters} style={{
// //             background: "none", border: "none", cursor: "pointer",
// //             display: "flex", alignItems: "center", gap: 8,
// //             fontSize: 12, fontWeight: 900, letterSpacing: "0.12em",
// //             color: BLACK, fontFamily: ff, padding: 0, whiteSpace: "nowrap", flexShrink: 0,
// //           }}>
// //             <svg width="17" height="13" viewBox="0 0 18 14" fill="none">
// //               <line x1="0" y1="2"  x2="18" y2="2"  stroke="currentColor" strokeWidth="1.5"/>
// //               <line x1="0" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
// //               <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"/>
// //               <circle cx="5"  cy="2"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// //               <circle cx="11" cy="7"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// //               <circle cx="7"  cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
// //             </svg>
// //             {filtersOpen ? "Hide Filter" : "Show Filter"}
// //           </button>

// //           {allActive.length > 0 && (
// //             <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", overflow: "hidden" }}>
// //               {allActive.slice(0, isMobile ? 2 : 6).map(({ grp, v }) => (
// //                 <button key={`${grp}-${v}`}
// //                   onClick={() => setActiveFilters(prev => ({ ...prev, [grp]: (prev[grp] || []).filter(x => x !== v) }))}
// //                   style={{
// //                     display: "flex", alignItems: "center", gap: 4,
// //                     background: BRAND, color: BRAND_TEXT, border: "none",
// //                     padding: "3px 8px 3px 9px", fontSize: 9, fontWeight: 900,
// //                     letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap",
// //                   }}>
// //                   {labelFor(grp, v)} <span style={{ fontSize: 12, lineHeight: 1 }}>×</span>
// //                 </button>
// //               ))}
// //               <button onClick={() => setActiveFilters({})} style={{
// //                 background: "none", border: "none", fontSize: 10, color: "#999",
// //                 cursor: "pointer", fontFamily: ff, fontWeight: 700, textDecoration: "underline", whiteSpace: "nowrap",
// //               }}>Clear all</button>
// //             </div>
// //           )}
// //         </div>

// //         <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
// //           <span style={{ fontSize: 12, color: "#999", fontFamily: mono, whiteSpace: "nowrap" }}>{count} products</span>
// //           <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// //             <span style={{ fontSize: 12, color: "#666", fontFamily: mono, display: isMobile ? "none" : "inline" }}>Sort by:</span>
// //             <select value={sort} onChange={e => setSort(e.target.value)} style={{
// //               background: "none", border: "1px solid #ddd", padding: "5px 8px",
// //               fontSize: 12, color: BLACK, fontFamily: mono, cursor: "pointer", outline: "none",
// //               maxWidth: isMobile ? "120px" : "auto",
// //             }}>
// //               {SORT_OPTS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
// //             </select>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ COLLECTIONS LANDING PAGE ============
// // export function CollectionsLandingPage({ navigate }) {
// //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// //       <div style={{ background: BLACK, padding: "72px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// //           <Frame shape="cateye" size={700} color="#fff" />
// //         </div>
// //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// //           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }} />
// //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10 }}>URBAN EYE</div>
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", margin: "0 0 20px" }}>COLLECTIONS</h1>
// //           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>Curated groups of frames for every occasion, face, and personality.</p>
// //         </div>
// //       </div>

// //       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "COLLECTIONS", path: null }]} />

// //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 20px 80px" }}>
// //         <div style={{ marginBottom: 60 }}>
// //           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>FEATURED</div>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 3 }}>
// //             {COLLECTIONS_PAGE_DATA.slice(0, 2).map((col, i) => (
// //               <FadeIn key={col.slug} delay={i * 80}>
// //                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 380, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 36, transition: "opacity 0.2s" }}
// //                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.92"}
// //                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
// //                   <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }}>
// //                     <Frame shape={col.shape} size={220} color={col.dark ? "#fff" : "#000"} />
// //                   </div>
// //                   {col.tag && <div style={{ position: "absolute", top: 20, left: 20, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "5px 12px", fontFamily: ff }}>{col.tag}</div>}
// //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 6 }}>{col.count} STYLES</div>
// //                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: 32, color: col.dark ? "#fff" : BLACK, margin: "0 0 8px", letterSpacing: "0.02em" }}>{col.name.toUpperCase()}</h2>
// //                   <p style={{ fontSize: 13, color: col.dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontFamily: mono, margin: "0 0 16px" }}>{col.desc}</p>
// //                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1", fontFamily: ff }}>SHOP COLLECTION →</div>
// //                 </div>
// //               </FadeIn>
// //             ))}
// //           </div>
// //         </div>

// //         <div>
// //           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>ALL COLLECTIONS</div>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
// //             {COLLECTIONS_PAGE_DATA.slice(2).map((col, i) => (
// //               <FadeIn key={col.slug} delay={i * 60}>
// //                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 260, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, transition: "opacity 0.2s" }}
// //                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
// //                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
// //                   <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
// //                     <Frame shape={col.shape} size={160} color={col.dark ? "#fff" : "#000"} />
// //                   </div>
// //                   {col.tag && <div style={{ position: "absolute", top: 14, left: 14, background: BRAND, color: BRAND_TEXT, fontSize: 8, fontWeight: 900, letterSpacing: "0.16em", padding: "4px 10px", fontFamily: ff }}>{col.tag}</div>}
// //                   <div style={{ fontSize: 9, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginBottom: 4 }}>{col.count} STYLES</div>
// //                   <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: 20, color: col.dark ? "#fff" : BLACK, margin: "0 0 6px" }}>{col.name.toUpperCase()}</h3>
// //                   <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1" }}>EXPLORE →</div>
// //                 </div>
// //               </FadeIn>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ HOME PAGE (FIXED) ============
// // export function HomePage({ navigate }) {
// //   const [heroSlide, setHeroSlide] = useState(0);
// //   const [filter, setFilter] = useState("All");
// //   const [testimonialIdx, setTIdx] = useState(0);
// //   const { addToCart } = useCart();
// //   // Use all products for filtering, then slice to 8 for display
// //   const allProducts = PRODUCTS_DATA;

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// //   useEffect(() => {
// //     const t = setInterval(() => setHeroSlide(i => (i + 1) % HERO_SLIDES.length), 6000);
// //     return () => clearInterval(t);
// //   }, []);
// //   useEffect(() => {
// //     const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
// //     return () => clearInterval(t);
// //   }, []);

// //   const slide = HERO_SLIDES[heroSlide];
// //   const FILTERS = ["All", "Eyeglasses", "Sunglasses"];
// //   // Apply filter first, then take first 8
// //   const filtered = filter === "All"
// //     ? allProducts.slice(0, 8)
// //     : allProducts.filter(p => p.category === (filter === "Eyeglasses" ? "Optical" : "Sunglass")).slice(0, 8);

// //   const HomeProductCard = ({ product }) => {
// //     const [hov, setHov] = useState(false);
// //     const [addedMsg, setAddedMsg] = useState(false);
// //     const { price, discountPrice } = getProductDisplayPrice(product);
// //     const discount = getProductDiscountPercent(product);
// //     const variants = getProductVariants(product);

// //     const [selectedVariantName, setSelectedVariantName] = useState(() => {
// //       const stored = getStoredVariantName(product?.id);
// //       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// //       return match ? match.name : (variants[0]?.name || "");
// //     });

// //     useEffect(() => {
// //       const stored = getStoredVariantName(product?.id);
// //       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// //       const nextName = match ? match.name : (variants[0]?.name || "");
// //       setSelectedVariantName(nextName);
// //     }, [product?.id, variants.length]);

// //     const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
// //     const displayImage = selectedVariant?.image || product.image || "";

// //     const handleSelectColor = (variant, e) => {
// //       e.stopPropagation();
// //       setSelectedVariantName(variant.name);
// //       setStoredVariantName(product.id, variant.name);
// //     };

// //     return (
// //       <div
// //         onMouseEnter={() => setHov(true)}
// //         onMouseLeave={() => setHov(false)}
// //         onClick={() => navigate(`#/products/${product.id}`)}
// //         onKeyDown={(event) => {
// //           if (event.key === "Enter" || event.key === " ") {
// //             event.preventDefault();
// //             navigate(`#/products/${product.id}`);
// //           }
// //         }}
// //         role="button"
// //         tabIndex={0}
// //         style={{
// //           background: "#fff",
// //           border: "1.5px solid #e5e0d8",
// //           position: "relative",
// //           cursor: "pointer",
// //           transition: "box-shadow 0.3s, transform 0.3s",
// //           boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
// //           transform: hov ? "translateY(-3px)" : "none"
// //         }}
// //       >
// //         {discount > 0 && !product.tag && (
// //           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 8px" }}>−{discount}%</div>
// //         )}
// //         {product.tag && (
// //           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BLACK, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "4px 10px" }}>{product.tag}</div>
// //         )}

// //         <WishlistHeart productId={product.id} size="md" placement="card" />

// //         <div style={{ height: isMobile ? 140 : 190, display: "flex", alignItems: "center", justifyContent: "center", background: hov ? CREAM : "#FAFAF5", transition: "background 0.3s", position: "relative" }}>
// //           {displayImage ? (
// //             <img src={displayImage} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 18, transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s" }} />
// //           ) : (
// //             <Frame shape="round" size={130} color={hov ? BRAND : "#4a4a4a"} />
// //           )}

// //           {variants.length > 1 && (
// //             <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 8, zIndex: 3 }}>
// //               {variants.map((variant) => {
// //                 const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
// //                 return (
// //                   <button
// //                     key={variant.name}
// //                     onClick={(e) => handleSelectColor(variant, e)}
// //                     title={variant.name}
// //                     style={{
// //                       width: 28,
// //                       height: 28,
// //                       borderRadius: "50%",
// //                       border: active ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.1)",
// //                       background: variant.swatch || "#d9d9d9",
// //                       cursor: "pointer",
// //                       padding: 0,
// //                       boxShadow: active ? "0 0 0 2px rgba(12,44,65,0.12)" : "none",
// //                     }}
// //                   />
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //         <div style={{ padding: "6px 14px 14px" }}>
// //           <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.14em", marginBottom: 2 }}>{(product.category || "Eyeglasses").toUpperCase()}</div>
// //           <div style={{ fontFamily: ff, fontSize: isMobile ? 14 : 16, fontWeight: 900, letterSpacing: "0.05em", color: BLACK, marginBottom: 10 }}>
// //             {product.name}
// //           </div>
// //           <div style={{ fontSize: 12, color: "#666", fontFamily: mono, marginBottom: 10, minHeight: 36 }}>{product.shortDescription || product.description?.slice(0, 80)}</div>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //             <div style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>PKR {discountPrice.toLocaleString()}</div>
// //             <button
// //               onClick={(e) => { e.stopPropagation(); addToCart(product, 1); setAddedMsg(true); setTimeout(() => setAddedMsg(false), 1800); }}
// //               style={{
// //                 border: `1.5px solid ${BRAND}`,
// //                 padding: "7px 16px",
// //                 fontSize: 10,
// //                 fontWeight: 900,
// //                 letterSpacing: "0.12em",
// //                 cursor: "pointer",
// //                 background: addedMsg ? "#16a34a" : hov ? BRAND : "transparent",
// //                 color: addedMsg ? "#fff" : hov ? BRAND_TEXT : BRAND,
// //                 transition: "all 0.22s"
// //               }}
// //             >
// //               {addedMsg ? "✓ ADDED" : hov ? "ADD TO BAG" : "SELECT"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div style={{ color: BLACK }}>
// //       {/* HERO */}
// //       <section
// //         style={{
// //           minHeight: isMobile ? "60vh" : "88vh",
// //           backgroundImage: `url(${slide.image})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           position: "relative",
// //           overflow: "hidden",
// //           transition: "background-image 1.1s ease",
// //         }}
// //       >
// //         <div style={{
// //           position: "absolute",
// //           inset: 0,
// //           background: slide.dark
// //             ? "rgba(0,0,0,0.55)"
// //             : "rgba(255,255,255,0.25)",
// //           zIndex: 0,
// //         }} />

// //         <div style={{
// //           maxWidth: 1200,
// //           margin: "0 auto",
// //           padding: isMobile ? "40px 20px" : "80px 40px",
// //           display: "grid",
// //           gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
// //           gap: isMobile ? 40 : 80,
// //           alignItems: "center",
// //           width: "100%",
// //           position: "relative",
// //           zIndex: 1,
// //         }}>
// //           <div>
// //             <div style={{
// //               display: "inline-block",
// //               fontSize: 10,
// //               letterSpacing: "0.2em",
// //               border: `1px solid ${slide.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
// //               color: slide.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
// //               padding: "5px 14px",
// //               marginBottom: 24
// //             }}>
// //               {slide.label}
// //             </div>
// //             <h1 style={{
// //               fontWeight: 900,
// //               fontSize: isMobile ? "clamp(40px, 12vw, 60px)" : "clamp(54px, 8vw, 108px)",
// //               lineHeight: 0.92,
// //               margin: "0 0 20px",
// //               color: slide.dark ? "#fff" : BLACK,
// //               letterSpacing: "0.01em",
// //               whiteSpace: "pre-line"
// //             }}>
// //               {slide.heading}
// //             </h1>
// //             <p style={{
// //               fontSize: isMobile ? 14 : 15,
// //               lineHeight: 1.8,
// //               maxWidth: 400,
// //               margin: "0 0 36px",
// //               color: slide.dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
// //               fontFamily: mono
// //             }}>
// //               {slide.sub}
// //             </p>
// //             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// //               <button onClick={() => navigate("#/products")} style={{ background: BRAND, color: "#fff", border: "none", padding: "12px 24px", fontSize: isMobile ? 13 : 15, cursor: "pointer" }}>
// //                 SHOP NOW
// //               </button>
// //               <OutlineBtn dark={!!slide.dark}>{slide.ctaSecond} →</OutlineBtn>
// //             </div>
// //           </div>
// //           <div />
// //         </div>

// //         <div style={{
// //           position: "absolute",
// //           bottom: 28,
// //           left: "50%",
// //           transform: "translateX(-50%)",
// //           display: "flex",
// //           gap: 10,
// //           zIndex: 2,
// //         }}>
// //           {HERO_SLIDES.map((_, i) => (
// //             <button
// //               key={i}
// //               onClick={() => setHeroSlide(i)}
// //               style={{
// //                 height: 3,
// //                 border: "none",
// //                 cursor: "pointer",
// //                 borderRadius: 0,
// //                 background: i === heroSlide ? BRAND : slide.dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
// //                 width: i === heroSlide ? 32 : 10,
// //                 transition: "all 0.35s"
// //               }}
// //             />
// //           ))}
// //         </div>
// //       </section>

// //       {/* STATS */}
// //       <section style={{ background: BLACK, padding: isMobile ? "32px 20px" : "56px 40px" }}>
// //         <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 16 : 0 }}>
// //           {[{ v: 150, s: "+", l: "Frame Styles" }, { v: 10, s: "+", l: "Years in Karachi" }, { v: 8500, s: "+", l: "Happy Customers" }, { v: 99, s: "%", l: "Satisfaction Rate" }].map((st, i) => (
// //             <FadeIn key={st.l} delay={i * 100} style={{ textAlign: "center", padding: "16px 0", borderRight: (i < 3 && !isMobile) ? "1px solid #1e1e1e" : "none" }}>
// //               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(40px,5vw,64px)", color: BRAND, lineHeight: 1 }}><Counter target={st.v} suffix={st.s}/></div>
// //               <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginTop: 8 }}>{st.l.toUpperCase()}</div>
// //             </FadeIn>
// //           ))}
// //         </div>
// //       </section>

// //       {/* HERITAGE QUOTE */}
// //       <section style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center", borderBottom: "2px solid #e8ddd0" }}>
// //         <FadeIn>
// //           <div style={{ maxWidth: 680, margin: "0 auto" }}>
// //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 28px" }}/>
// //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 18 }}>EYE-CONIC EYEWEAR, SINCE 2015</div>
// //             <blockquote style={{ fontFamily: mono, fontSize: isMobile ? "clamp(16px, 5vw, 22px)" : "clamp(18px, 2.8vw, 28px)", lineHeight: 1.5, color: BLACK, margin: "0 0 20px", fontStyle: "italic" }}>"For over a decade, our name has been on the front door. That means something."</blockquote>
// //             <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#666", fontFamily: ff }}>TARIQ HASSAN · FOUNDER, URBAN EYE</div>
// //             <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
// //               <a href="#/story" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>OUR STORY</a>
// //               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", borderBottom: "2px solid #ddd", paddingBottom: 2 }}>SHOP EYEGLASSES</a>
// //             </div>
// //           </div>
// //         </FadeIn>
// //       </section>

// //       {/* CATEGORIES */}
// //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#fff" }}>
// //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// //           <FadeIn>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
// //               <div>
// //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>BROWSE</div>
// //                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>SHOP BY CATEGORY</h2>
// //               </div>
// //               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: "#888", textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>VIEW ALL →</a>
// //             </div>
// //           </FadeIn>
// //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 2 }}>
// //             {CATEGORIES_HOME.map((cat, i) => (
// //               <FadeIn key={cat.label} delay={i * 80}>
// //                 <div onClick={() => navigate(`#/collections/${cat.slug}`)} style={{ minHeight: isMobile ? 220 : 330, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 16 : 28, cursor: "pointer", position: "relative", overflow: "hidden", background: cat.dark ? BLACK : CREAM, color: cat.dark ? "#fff" : BLACK }}>
// //                   <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: BRAND }}/>
// //                   <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
// //                     <Frame shape={cat.shape} size={isMobile ? 120 : 190} color={cat.dark ? "#fff" : "#000"}/>
// //                   </div>
// //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", marginBottom: 6, opacity: 0.5 }}>{cat.count.toUpperCase()}</div>
// //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 16 : 20, fontWeight: 900, letterSpacing: "0.04em" }}>{cat.label.toUpperCase()}</div>
// //                   <div style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 12, color: cat.dark ? "#89c4e1" : BRAND, fontWeight: 900 }}>SHOP NOW →</div>
// //                 </div>
// //               </FadeIn>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* BEST SELLERS - FIXED: filter from all products, then slice */}
// //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#FAFAF5" }}>
// //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// //           <FadeIn>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
// //               <div>
// //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>HANDPICKED</div>
// //                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>BEST SELLERS</h2>
// //               </div>
// //               <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// //                 {FILTERS.map(f => (
// //                   <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", fontSize: isMobile ? 8 : 10, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", border: `1.5px solid ${filter === f ? BRAND : "#ddd"}`, background: filter === f ? BRAND : "transparent", color: filter === f ? BRAND_TEXT : "#888", fontFamily: ff, transition: "all 0.2s" }}>{f.toUpperCase()}</button>
// //                 ))}
// //               </div>
// //             </div>
// //           </FadeIn>
// //           <ProductSlider products={filtered} navigate={navigate} isMobile={isMobile} />
// //           <FadeIn delay={280}>
// //             <div style={{ textAlign: "center", marginTop: 44 }}>
// //               {/* FIX: navigate to Products page instead of Collections */}
// //               <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>VIEW ALL FRAMES</YBtn>
// //             </div>
// //           </FadeIn>
// //         </div>
// //       </section>

// //       {/* CUSTOM TINTS (active version) */}
// //       <section style={{ background: CREAM, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "2px solid #e8ddd0", borderBottom: "2px solid #e8ddd0" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
// //           <Frame shape="cateye" size={isMobile ? 400 : 900} color={BLACK}/>
// //         </div>
// //         <FadeIn>
// //           <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
// //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// //             <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#888", marginBottom: 12 }}>EXCLUSIVE TO URBAN EYE</div>
// //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BLACK, lineHeight: 0.92, margin: "0 0 6px" }}>CUSTOM MADE</h2>
// //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BRAND, lineHeight: 0.92, margin: "0 0 28px" }}>TINTS™</h2>
// //             <p style={{ fontSize: isMobile ? 13 : 15, color: "#666", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontFamily: mono }}>Choose any frame. Choose any tint. Our opticians hand-apply your chosen colour — 20+ shades to make it yours.</p>
// //             <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
// //               {TINTS.map(t => (
// //                 <div key={t.name} title={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
// //                   <div style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: "50%", background: t.color, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}/>
// //                   <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#999", fontFamily: ff }}>{t.name}</span>
// //                 </div>
// //               ))}
// //               <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#999", marginLeft: 8 }}>+12 more</div>
// //             </div>
// //             <YBtn onClick={() => navigate("#/collections/custom-made-tints")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>SHOP CUSTOM TINTS™</YBtn>
// //           </div>
// //         </FadeIn>
// //       </section>

// //       {/* HOW IT WORKS */}
// //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: BLACK }}>
// //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// //           <FadeIn>
// //             <div style={{ textAlign: "center", marginBottom: 56 }}>
// //               <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
// //               <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#444", marginBottom: 10 }}>HOW IT WORKS</div>
// //               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,48px)", color: "#fff", margin: 0 }}>FROM BROWSE TO DELIVERED</h2>
// //             </div>
// //           </FadeIn>
// //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: 28, position: "relative" }}>
// //             {!isMobile && <div style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 1, background: "#1e1e1e" }}/>}
// //             {PROCESS_STEPS.map((step, i) => (
// //               <FadeIn key={step.num} delay={i * 90}>
// //                 <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
// //                   <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${BRAND}`, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: ff, fontSize: 15, fontWeight: 900, color: "#89c4e1" }}>{step.num}</div>
// //                   <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.08em", marginBottom: 8 }}>{step.title}</div>
// //                   <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, fontFamily: mono }}>{step.desc}</div>
// //                 </div>
// //               </FadeIn>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* TESTIMONIALS */}
// //       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: CREAM }}>
// //         <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
// //           <FadeIn>
// //             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
// //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>REVIEWS</div>
// //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", marginBottom: 52, letterSpacing: "0.02em" }}>WHAT OUR CUSTOMERS SAY</h2>
// //             <div style={{ position: "relative", minHeight: isMobile ? 280 : 200 }}>
// //               {TESTIMONIALS.map((t, i) => (
// //                 <div key={t.name} style={{ position: "absolute", inset: 0, opacity: i === testimonialIdx ? 1 : 0, transform: i === testimonialIdx ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s ease", pointerEvents: i === testimonialIdx ? "auto" : "none" }}>
// //                   <div style={{ fontSize: 20, color: BRAND, marginBottom: 18, letterSpacing: 4 }}>{"★".repeat(t.rating)}</div>
// //                   <blockquote style={{ fontFamily: mono, fontStyle: "italic", lineHeight: 1.65, fontSize: isMobile ? "clamp(14px, 4vw, 18px)" : "clamp(15px,2.2vw,20px)", color: BLACK, margin: "0 0 24px" }}>"{t.text}"</blockquote>
// //                   <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em" }}>{t.name}</div>
// //                   <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.1em", marginTop: 4 }}>{t.city}</div>
// //                 </div>
// //               ))}
// //             </div>
// //             <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: isMobile ? 280 : 210 }}>
// //               {TESTIMONIALS.map((_, i) => (
// //                 <button key={i} onClick={() => setTIdx(i)} style={{ height: 3, border: "none", cursor: "pointer", background: i === testimonialIdx ? BRAND : "#ccc", width: i === testimonialIdx ? 28 : 10, transition: "all 0.35s" }}/>
// //               ))}
// //             </div>
// //           </FadeIn>
// //         </div>
// //       </section>

// //       {/* FINAL CTA */}
// //       <section style={{ background: BLACK, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// //           <Frame shape="aviator" size={isMobile ? 400 : 1000} color="#fff"/>
// //         </div>
// //         <FadeIn>
// //           <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#444", marginBottom: 14 }}>START YOUR JOURNEY</div>
// //           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#fff", lineHeight: 0.92, margin: "0 0 8px" }}>FIND YOUR</h2>
// //           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#89c4e1", lineHeight: 0.92, margin: "0 0 28px" }}>FRAME.</h2>
// //           <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.35)", maxWidth: 420, margin: "0 auto 44px", lineHeight: 1.85, fontFamily: mono }}>150+ premium frames. Expert fitting. Free shipping across Pakistan.</p>
// //           <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
// //             <YBtn onClick={() => navigate("#/collections/eyeglasses")} style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>SHOP ALL FRAMES</YBtn>
// //             <OutlineBtn dark style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>VIRTUAL TRY-ON →</OutlineBtn>
// //           </div>
// //         </FadeIn>
// //       </section>

// //       <style>{`@keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.5; } 50% { transform:scale(1.07); opacity:0.9; } }`}</style>
// //     </div>
// //   );
// // }

// // // ============ PRODUCTS PAGE ============
// // export function ProductsPage({ navigate, queryParams }) {
// //   const buildFiltersFromQuery = (qp) => {
// //     if (!qp) return {};
// //     const result = {};
// //     if (qp.category) result.category = [qp.category];
// //     if (qp.shape)     result.shape    = [qp.shape];
// //     if (qp.gender)    result.gender   = [qp.gender];
// //     if (qp.tag)       result.tag      = [qp.tag];
// //     if (qp.price)     result.price    = [qp.price];
// //     return result;
// //   };

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// //   const [activeFilters, setActiveFilters] = useState(() => buildFiltersFromQuery(queryParams));
// //   const [sort, setSort] = useState("featured");
// //   const [filtersOpen, setFiltersOpen] = useState(() => !window.matchMedia("(max-width: 767px)").matches);
// //   // `?q=` comes from the navbar search — seed the on-page search box with it.
// //   const [searchTerm, setSearchTerm] = useState(() => queryParams?.q || "");

// //   useEffect(() => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   }, []);

// //   useEffect(() => {
// //     setActiveFilters(buildFiltersFromQuery(queryParams));
// //     setSearchTerm(queryParams?.q || "");
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   }, [JSON.stringify(queryParams)]);

// //   // Local filter function using the updated size logic
// //   const applyFiltersLocal = (products, activeFilters, sort, searchTerm) => {
// //     let filtered = products;

// //     // 1. Apply search (matches name, category, color, tag — and price, e.g.
// //     //    "8000", "under 10000", "8k-12k")
// //     if (searchTerm && searchTerm.trim()) {
// //       filtered = filtered.filter(p => matchesSearchTerm(p, searchTerm));
// //     }

// //     // 2. Apply size filter (Small/Medium/Large categories)
// //     if (activeFilters.size && activeFilters.size.length) {
// //       filtered = filtered.filter(p =>
// //         p.sizes && p.sizes.some(s =>
// //           activeFilters.size.some(cat => s.includes(`(${cat})`))
// //         )
// //       );
// //     }

// //     // 3. Remove size from activeFilters for the utility function
// //     const otherFilters = { ...activeFilters };
// //     delete otherFilters.size;

// //     // 4. Apply all other filters and sort
// //     filtered = applyProductFilters(filtered, otherFilters, sort, "");

// //     return filtered;
// //   };

// //   const filtered = applyFiltersLocal(PRODUCTS_DATA, activeFilters, sort, searchTerm);
// //   let cols = 4;
// //   if (isMobile) cols = 1;
// //   else if (isTablet) cols = 2;
// //   else cols = filtersOpen ? 3 : 4;

// //   // Related products to surface alongside a search. When there are matches we
// //   // relate to them; when nothing matched we suggest a few popular frames so the
// //   // page never dead-ends on an empty result.
// //   const searchActive = searchTerm.trim().length > 0;
// //   const relatedLimit = isMobile ? 4 : 8;
// //   let relatedProducts = [];
// //   if (searchActive) {
// //     if (filtered.length) {
// //       relatedProducts = getRelatedForMatches(PRODUCTS_DATA, filtered, filtered.map(p => p.id), relatedLimit);
// //     } else {
// //       relatedProducts = PRODUCTS_DATA.filter(p => p.tag).slice(0, relatedLimit);
// //       if (!relatedProducts.length) relatedProducts = PRODUCTS_DATA.slice(0, relatedLimit);
// //     }
// //   }

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// //       <div style={{ background: BLACK, padding: isMobile ? "48px 20px" : "72px 40px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// //           <Frame shape="round" size={isMobile ? 400 : 700} color="#fff"/>
// //         </div>
// //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// //           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
// //           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10, fontFamily: ff }}>URBAN EYE · ALL FRAMES</div>
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: "0 0 20px" }}>THE COLLECTION</h1>
// //           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>{PRODUCTS_DATA.length} frames. Each handpicked. All obsessively crafted.</p>
// //           <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
// //             <div style={{ display: "flex", width: "min(520px, 100%)", background: "#fff", overflow: "hidden" }}>
// //               <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, price, or keyword — e.g. “Alex” or “under 8000”" style={{ flex: 1, minWidth: 0, border: "none", padding: "12px 16px", fontSize: 13, fontFamily: mono, outline: "none" }} />
// //               {searchActive && (
// //                 <button onClick={() => setSearchTerm("")} aria-label="Clear search" style={{ border: "none", background: BRAND, color: BRAND_TEXT, padding: "0 16px", fontFamily: ff, fontWeight: 900, fontSize: 14, cursor: "pointer" }}>✕</button>
// //               )}
// //             </div>
// //           </div>
// //           {searchActive && (
// //             <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: mono, letterSpacing: "0.04em" }}>
// //               {filtered.length} {filtered.length === 1 ? "frame" : "frames"} found for “{searchTerm.trim()}”
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => setFiltersOpen(v => !v)} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
// //         <FilterSidebar allProducts={PRODUCTS_DATA} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
// //         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
// //           {filtered.length === 0 ? (
// //             <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: mono }}>
// //               {searchActive
// //                 ? `No frames match “${searchTerm.trim()}”.${relatedProducts.length ? " Here are some you might like instead:" : ""}`
// //                 : "No frames match the current filters."}
// //             </div>
// //           ) : (
// //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "75%" : `repeat(${cols}, 1fr)`, justifyContent: isMobile ? "center" : "stretch", gap: isMobile ? 12 : 20, transition: "grid-template-columns 0.3s" }}>
// //               {filtered.map((p, i) => (
// //                 <FadeIn key={p.id} delay={Math.min(i * 40, 400)}>
// //                   <ProductCard product={p} navigate={navigate} />
// //                 </FadeIn>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {searchActive && relatedProducts.length > 0 && (
// //         <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 12px 60px" : "0 24px 80px" }}>
// //           <div style={{ borderTop: "1px solid #e8e0d0", paddingTop: isMobile ? 28 : 40 }}>
// //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>
// //               {filtered.length ? "YOU MAY ALSO LIKE" : "POPULAR PICKS"}
// //             </div>
// //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(22px, 3vw, 34px)", margin: "0 0 24px", letterSpacing: "0.02em", color: BLACK }}>
// //               RELATED FRAMES
// //             </h2>
// //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 12 : 20 }}>
// //               {relatedProducts.map((p, i) => (
// //                 <FadeIn key={p.id} delay={Math.min(i * 60, 360)}>
// //                   <ProductCard product={p} navigate={navigate} />
// //                 </FadeIn>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ============ COLLECTION DETAIL PAGE ============
// // export function CollectionDetailPage({ slug, navigate }) {
// //   const col = COLLECTIONS[slug] || COLLECTIONS["default"];
// //   const baseProducts = PRODUCTS_DATA.filter(col.filter);
// //   const [activeFilters, setActiveFilters] = useState({});
// //   const [sort, setSort] = useState("featured");
// //   const [filtersOpen, setFiltersOpen] = useState(() => {
// //     if (window.matchMedia("(max-width: 767px)").matches) return false;
// //     try { return JSON.parse(localStorage.getItem("os_filters_open") ?? "true"); } catch { return true; }
// //   });
// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// //   useEffect(() => {
// //     const fn = () => {};
// //     window.addEventListener("resize", fn);
// //     return () => window.removeEventListener("resize", fn);
// //   }, []);
// //   useEffect(() => { localStorage.setItem("os_filters_open", JSON.stringify(filtersOpen)); }, [filtersOpen]);
// //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveFilters({}); }, [slug]);

// //   // Local filter function with updated size logic
// //   const applyFiltersLocal = (products, activeFilters, sort) => {
// //     let filtered = products;

// //     // 1. Apply size filter (Small/Medium/Large categories)
// //     if (activeFilters.size && activeFilters.size.length) {
// //       filtered = filtered.filter(p =>
// //         p.sizes && p.sizes.some(s =>
// //           activeFilters.size.some(cat => s.includes(`(${cat})`))
// //         )
// //       );
// //     }

// //     // 2. Remove size from activeFilters for utility
// //     const otherFilters = { ...activeFilters };
// //     delete otherFilters.size;

// //     // 3. Apply other filters and sort
// //     filtered = applyProductFilters(filtered, otherFilters, sort, "");

// //     return filtered;
// //   };

// //   const filtered = applyFiltersLocal(baseProducts, activeFilters, sort);
// //   let cols = 4;
// //   if (isMobile) cols = 1;
// //   else if (isTablet) cols = 2;
// //   else cols = filtersOpen ? 3 : 4;

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
// //         </div>
// //         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
// //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
// //           <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginBottom: 12, fontFamily: ff }}>
// //             <a href="#/" style={{ color: "#555", textDecoration: "none" }}>HOME</a>
// //             <span style={{ margin: "0 8px", color: "#333" }}>›</span>
// //             <span style={{ color: "#aaa" }}>{col.title}</span>
// //           </div>
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 6vw, 72px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 16px" }}>{col.title}</h1>
// //           <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>{col.desc}</p>
// //         </div>
// //       </div>

// //       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => { isMobile ? setFiltersOpen(true) : setFiltersOpen(v => !v); }} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// //       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
// //         <FilterSidebar allProducts={baseProducts} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
// //         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
// //           {filtered.length === 0 ? (
// //             <div style={{ textAlign: "center", padding: "80px 0" }}>
// //               <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
// //               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 22, color: BLACK, marginBottom: 10, letterSpacing: "0.04em" }}>NO FRAMES FOUND</div>
// //               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 28 }}>Try adjusting your filters.</div>
// //               <button onClick={() => setActiveFilters({})} style={{ background: BLACK, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff }}>CLEAR FILTERS</button>
// //             </div>
// //           ) : (
// //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "75%" : `repeat(${cols}, 1fr)`, justifyContent: isMobile ? "center" : "stretch", gap: isMobile ? 12 : 16, transition: "grid-template-columns 0.35s ease" }}>
// //               {filtered.map((p, i) => (
// //                 <FadeIn key={p.id} delay={Math.min(i * 35, 300)}>
// //                   <ProductCard product={p} navigate={navigate} />
// //                 </FadeIn>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ PRODUCT DETAIL PAGE ============
// // export function ProductDetailPage({ productId, navigate }) {
// //   const product = PRODUCTS_DATA.find(p => p.id === productId);
// //   const [activeImg, setActiveImg] = useState(0);
// //   const [qty, setQty] = useState(1);
// //   const [added, setAdded] = useState(false);
// //   const [openTab, setOpenTab] = useState("details");
// //   const [selectedSize, setSelectedSize] = useState(null);
// //   const [selectedVariantName, setSelectedVariantName] = useState("");
// //   const { addToCart } = useCart();

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// //   useEffect(() => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //     setActiveImg(0); setAdded(false); setSelectedSize(null);
// //   }, [productId]);

// //   useEffect(() => {
// //     if (!product) return;
// //     const variants = getProductVariants(product);
// //     const stored = getStoredVariantName(product.id);
// //     const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
// //     const nextName = match ? match.name : variants[0]?.name || "";
// //     setSelectedVariantName(nextName);
// //     setActiveImg(0);
// //   }, [product?.id]);

// //   if (!product) return (
// //     <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
// //       <div style={{ fontSize: 48, fontWeight: 900, color: BLACK, marginBottom: 16 }}>404</div>
// //       <div style={{ fontSize: 14, color: "#888", fontFamily: mono, marginBottom: 28 }}>Frame not found.</div>
// //       <YBtn onClick={() => navigate("#/products")}>← BACK TO COLLECTION</YBtn>
// //     </div>
// //   );

// //   const related = getRelatedProducts(PRODUCTS_DATA, product);
// //   const { price, discountPrice } = getProductDisplayPrice(product);
// //   const discount = getProductDiscountPercent(product);
// //   const tc = product.tag ? tagColors[product.tag] : null;
// //   const sizes = product.sizes?.length ? product.sizes : ["44 (Narrow)", "46 (Average)", "49 (Wide)", "52 (Extra Wide)"];
// //   const variants = getProductVariants(product);
// //   const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
// //   const galleryImages = selectedVariant?.gallery?.length
// //     ? selectedVariant.gallery
// //     : (product.gallery?.length ? product.gallery : (selectedVariant?.image ? [selectedVariant.image] : []));
// //   const displayImage = galleryImages[activeImg] || selectedVariant?.image || product.image || "";
// //   const displayLabel = selectedVariant?.name || product.color || "Default";

// //   const handleSelectVariant = (variant) => {
// //     setSelectedVariantName(variant.name);
// //     setStoredVariantName(product.id, variant.name);
// //     setActiveImg(0);
// //   };

// //   const AccordionItem = ({ id, label, children }) => {
// //     const isOpen = openTab === id;
// //     return (
// //       <div style={{ borderBottom: "1px solid #e8e0d0" }}>
// //         <button onClick={() => setOpenTab(isOpen ? null : id)} style={{ width: "100%", background: "none", border: "none", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: ff, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textAlign: "left" }}>
// //           {label}
// //           <span style={{ fontSize: 22, fontWeight: 300, lineHeight: 1, color: BLACK }}>{isOpen ? "−" : "+"}</span>
// //         </button>
// //         {isOpen && <div style={{ paddingBottom: 20 }}>{children}</div>}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: ff }}>
// //       <div style={{ borderBottom: "1px solid #e8e0d0", padding: "13px 20px" }}>
// //         <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
// //           {[{ label: "HOME", path: "#/" }, { label: "COLLECTION", path: "#/products" }, { label: product.name.toUpperCase(), path: null }].map((crumb, i) => (
// //             <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               {i > 0 && <span style={{ color: "#ccc", fontSize: 10 }}>›</span>}
// //               {crumb.path ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
// //                 : <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
// //             </span>
// //           ))}
// //         </div>
// //       </div>

// //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px 60px" : "0 40px 80px" }}>
// //         <div style={{ display: "grid", gridTemplateColumns: (isMobile || isTablet) ? "1fr" : "70% 30%", gap: 0, alignItems: "flex-start" }}>
// //           <FadeIn>
// //             <div style={{ paddingRight: (isMobile || isTablet) ? 0 : 72 }}>
// //               <div style={{ position: "relative", overflow: "hidden", background: CREAM, marginBottom: 10, height: isMobile ? "50vh" : "calc(100vh - 110px)", minHeight: isMobile ? 300 : 560, maxHeight: isMobile ? 400 : 740, border: "1px solid #e8e0d0", boxSizing: "border-box", padding: isMobile ? "20px" : "64px 80px" }}>
// //                 {product.tag && tc && (
// //                   <div style={{ position: "absolute", top: 20, left: 20, zIndex: 3, background: tc.bg, color: tc.color, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", padding: "6px 14px", fontFamily: ff }}>{product.tag}</div>
// //                 )}
// //                 {discount > 0 && (
// //                   <div style={{ position: "absolute", top: 20, right: 20, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "5px 12px", fontFamily: ff }}>−{discount}% OFF</div>
// //                 )}
// //                 <div style={{ width: "100%", height: "100%", border: "1.5px solid #d8cfc0", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
// //                   <img key={`${product.id}-${activeImg}-${displayLabel}`} src={`${displayImage}`} alt={`${product.name} - ${displayLabel}`} loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 12 : 24, animation: "fadeImgIn 0.35s ease", boxSizing: "border-box" }} />
// //                 </div>
// //               </div>
// //               {galleryImages.length > 1 && (
// //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //                   {galleryImages.map((img, i) => (
// //                     <div key={`${product.id}-${i}`} onClick={() => setActiveImg(i)} style={{ width: isMobile ? 64 : isTablet ? 80 : 100, height: isMobile ? 54 : isTablet ? 64 : 76, overflow: "hidden", cursor: "pointer", background: CREAM, flexShrink: 0, border: i === activeImg ? `2px solid ${BLACK}` : "1px solid #e8e0d0", opacity: i === activeImg ? 1 : 0.45, transition: "border-color 0.15s, opacity 0.15s", boxSizing: "border-box" }}>
// //                       <img src={`${img}`} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 4 : 8, boxSizing: "border-box" }} />
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </FadeIn>

// //           <FadeIn delay={120}>
// //             <div style={{ paddingTop: isMobile ? 24 : 4 }}>
// //               <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
// //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.category?.toUpperCase()}</span>
// //                 <span style={{ color: "#ddd" }}>·</span>
// //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.subcategory?.toUpperCase()}</span>
// //                 <span style={{ color: "#ddd" }}>·</span>
// //                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.gender?.toUpperCase()}</span>
// //               </div>

// //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7, flexWrap: "wrap" }}>
// //                 <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3.2vw, 42px)", lineHeight: 1, color: BLACK, margin: 0, letterSpacing: "0.04em", flex: 1, paddingRight: 16 }}>
// //                   {product.name}
// //                 </h1>
// //                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginTop: 4 }}>
// //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 600, color: BLACK, whiteSpace: "nowrap" }}>
// //                     PKR {formatPriceValue(discountPrice)}
// //                   </div>
// //                   <WishlistHeart productId={product.id} size="lg" placement="detail" />
// //                 </div>
// //               </div>

// //               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 16, letterSpacing: "0.04em" }}>{displayLabel}</div>
// //               {variants.length > 1 && (
// //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff, marginBottom: 10 }}>{variants.length} COLOURS</div>
// //               )}
// //               {variants.length > 1 && (
// //                 <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
// //                   {variants.map((variant) => {
// //                     const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
// //                     return (
// //                       <button
// //                         key={variant.name}
// //                         onClick={() => handleSelectVariant(variant)}
// //                         style={{
// //                           display: "inline-flex",
// //                           alignItems: "center",
// //                           gap: 8,
// //                           border: active ? `1.5px solid ${BLACK}` : "1px solid #d8d0c8",
// //                           background: active ? "#fff" : "#faf7f2",
// //                           padding: "8px 12px",
// //                           cursor: "pointer",
// //                           fontFamily: ff,
// //                           fontSize: 11,
// //                           letterSpacing: "0.08em",
// //                           color: BLACK,
// //                         }}
// //                       >
// //                         <span style={{ width: 14, height: 14, borderRadius: "50%", background: variant.swatch || "#d9d9d9", border: "1px solid rgba(0,0,0,0.12)" }} />
// //                         {variant.name}
// //                       </button>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //               <div style={{ width: 36, height: 3, background: BRAND, marginBottom: 18 }} />

// //               {discountPrice < price && (
// //                 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
// //                   <span style={{ fontFamily: mono, fontSize: isMobile ? 13 : 15, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</span>
// //                   {discount > 0 && <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 900, background: BRAND, color: BRAND_TEXT, padding: "4px 10px", letterSpacing: "0.1em" }}>SAVE {discount}%</span>}
// //                 </div>
// //               )}

// //               <div style={{ marginBottom: 26 }}>
// //                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
// //                   <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>SIZE</span>
// //                   <span style={{ fontSize: 11, color: "#888", fontFamily: mono, textDecoration: "underline", cursor: "pointer", letterSpacing: "0.04em" }}>Size Chart</span>
// //                 </div>
// //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //                   {sizes.map(size => (
// //                     <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", fontFamily: ff, cursor: "pointer", border: "1.5px solid", borderColor: selectedSize === size ? BLACK : "#d8d0c8", background: selectedSize === size ? BLACK : "#fff", color: selectedSize === size ? "#fff" : BLACK, transition: "all 0.15s" }}>
// //                       {size}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div style={{ marginBottom: 14 }}>
// //                 <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff, display: "block", marginBottom: 10 }}>QUANTITY</span>
// //                 <div style={{ display: "inline-flex", border: "1.5px solid #e8e0d0", alignItems: "center" }}>
// //                   <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", width: 42, height: 46, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>−</button>
// //                   <span style={{ width: 46, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{qty}</span>
// //                   <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", width: 42, height: 46, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>+</button>
// //                 </div>
// //               </div>

// //               <button onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ width: "100%", background: added ? "#16a34a" : "#0c2c41", color: "#fff", border: "none", padding: "16px 24px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, transition: "background 0.3s", marginBottom: 12 }}>
// //                 {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
// //               </button>

// //               {added && (
// //                 <button onClick={() => navigate("#/cart")} style={{ width: "100%", background: BRAND, color: BRAND_TEXT, border: "none", padding: "13px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, marginBottom: 14 }}>
// //                   VIEW BAG & CHECKOUT →
// //                 </button>
// //               )}

// //               <p style={{ fontSize: isMobile ? 12 : 13, color: "#555", lineHeight: 1.9, fontFamily: mono, marginBottom: 28, maxWidth: 420 }}>{product.description}</p>

// //               <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "18px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4", marginBottom: 28 }}>
// //                 {[{ icon: "🚚", text: "Free shipping across Pakistan" }, { icon: "↩", text: "30-day hassle-free returns" }, { icon: "✦", text: "Prescription lenses available" }, { icon: "★", text: "Genuine Italian / Japanese craftsmanship" }].map((b, i) => (
// //                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                     <span style={{ fontSize: 13 }}>{b.icon}</span>
// //                     <span style={{ fontSize: 12, color: "#666", fontFamily: mono, letterSpacing: "0.02em" }}>{b.text}</span>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div style={{ borderTop: "1px solid #e8e0d0" }}>
// //                 <AccordionItem id="details" label="DETAILS">
// //                   <div style={{ width: "100%", overflowX: "auto" }}>
// //                     <table style={{ width: "100%", minWidth: 280, borderCollapse: "collapse" }}>
// //                       <tbody>
// //                         {Object.entries(product.specifications || {}).map(([k, v], i) => (
// //                           <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
// //                             <td style={{ padding: "9px 12px 9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%", whiteSpace: "nowrap" }}>{k.toUpperCase()}</td>
// //                             <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </AccordionItem>
// //                 <AccordionItem id="measurements" label="MEASUREMENTS">
// //                   <div style={{ width: "100%", overflowX: "auto" }}>
// //                     <table style={{ width: "100%", minWidth: 280, borderCollapse: "collapse" }}>
// //                       <tbody>
// //                         {Object.entries(product.measurements || {}).map(([k, v], i) => (
// //                           <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
// //                             <td style={{ padding: "9px 12px 9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%", whiteSpace: "nowrap" }}>{k.toUpperCase()}</td>
// //                             <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </AccordionItem>
// //               </div>
// //             </div>
// //           </FadeIn>
// //         </div>
// //       </div>

// //       <ProductReviewsSection productId={productId} navigate={navigate} />

// //       {related.length > 0 && (
// //         <div style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", borderTop: "2px solid #e8ddd0" }}>
// //           <div style={{ maxWidth: 1400, margin: "0 auto" }}>
// //             <FadeIn>
// //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 44, flexWrap: "wrap", gap: 12 }}>
// //                 <div>
// //                   <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>YOU MAY ALSO LIKE</div>
// //                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(26px, 4vw, 42px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>RELATED FRAMES</h2>
// //                 </div>
// //                 <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid ${BLACK}`, padding: "10px 20px", fontSize: isMobile ? 10 : 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: BLACK, fontFamily: ff }}>VIEW ALL →</button>
// //               </div>
// //             </FadeIn>
// //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
// //               {related.map((p, i) => (
// //                 <FadeIn key={p.id} delay={i * 80}>
// //                   <ProductCard product={p} navigate={navigate} />
// //                 </FadeIn>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`@keyframes fadeImgIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }`}</style>
// //     </div>
// //   );
// // }

// // // ============ CART PAGE ============
// // export function CartPage({ navigate }) {
// //   const { cartItems, removeFromCart, updateQty, cartTotal, clearCart, loading, syncing, pendingSync } = useCart();
// //   const { user } = useAuth();
// //   const [localCart, setLocalCart] = useState([]);

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
// //   useEffect(() => { setLocalCart(cartItems); }, [cartItems]);

// //   const shipping = cartTotal >= 5000 ? 0 : 350;
// //   const grandTotal = cartTotal + shipping;

// //   if (loading) {
// //     return (
// //       <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0" }}>
// //         <div style={{ textAlign: "center" }}>
// //           <div style={{ fontSize: 12, letterSpacing: "0.2em", color: NAVY }}>LOADING YOUR CART...</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (localCart.length === 0) return (
// //     <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0", padding: "20px" }}>
// //       <div style={{ width: 72, height: 72, border: "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 28 }}>🛍️</div>
// //       <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#bbb", marginBottom: 12 }}>YOUR CART</div>
// //       <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 24 : 32, letterSpacing: "0.06em", color: BLACK, marginBottom: 10, textAlign: "center" }}>YOUR CART IS EMPTY</h2>
// //       <p style={{ fontSize: 13, color: "#999", fontFamily: mono, marginBottom: 32, letterSpacing: "0.04em", textAlign: "center" }}>Add some frames to get started.</p>
// //       <button onClick={() => navigate("#/products")} style={{ background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px 32px", cursor: "pointer" }}
// //         onMouseEnter={e => e.currentTarget.style.background = "#0a2236"}
// //         onMouseLeave={e => e.currentTarget.style.background = NAVY}>SHOP THE COLLECTION</button>
// //     </div>
// //   );

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#f5f4f0", fontFamily: ff }}>
// //       {pendingSync && (
// //         <div style={{ background: "#fff3cd", borderBottom: `2px solid #ffc107`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// //           <span style={{ fontSize: 15, color: "#856404" }}>⚠️</span>
// //           <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#856404" }}>YOUR CART NEEDS TO BE SYNCED. PLEASE PROCEED TO CHECKOUT TO SAVE YOUR ITEMS.</span>
// //         </div>
// //       )}
// //       <div style={{ background: "#eef4f8", borderBottom: `2px solid ${NAVY}`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// //         <span style={{ fontSize: 15, color: NAVY }}>✓</span>
// //         <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: NAVY }}>
// //           {shipping === 0 ? "YOU'VE UNLOCKED FREE WORLDWIDE EXPRESS SHIPPING!" : `ADD PKR ${(5000 - cartTotal).toLocaleString()} MORE FOR FREE SHIPPING`}
// //         </span>
// //       </div>
// //       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "40px 40px 36px", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none", fontSize: 320, lineHeight: 1, color: "#fff", fontWeight: 900 }}>◻</div>
// //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// //           <div style={{ width: 32, height: 3, background: NAVY, marginBottom: 14 }} />
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: 0, letterSpacing: "0.04em" }}>YOUR CART</h1>
// //           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: mono, marginTop: 12, letterSpacing: "0.06em" }}>
// //             {localCart.length} ITEM{localCart.length !== 1 ? "S" : ""} &nbsp;·&nbsp; PKR {cartTotal.toLocaleString()} SUBTOTAL
// //           </p>
// //         </div>
// //       </div>

// //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "40px 40px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
// //         <div>
// //           {!isMobile && (
// //             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: 16, padding: "0 0 12px", borderBottom: `2px solid ${BLACK}`, marginBottom: 0 }}>
// //               {["PRODUCT", "PRICE", "QUANTITY", ""].map((h, i) => (
// //                 <div key={i} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", color: "#aaa" }}>{h}</div>
// //               ))}
// //             </div>
// //           )}

// //           {localCart.map(item => {
// //             const itemDiscount = item.price && item.discountPrice && item.price > item.discountPrice ? Math.round(((item.price - item.discountPrice) / item.price) * 100) : 0;
// //             return (
// //               <div key={item.id} style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: isMobile ? 12 : 16, alignItems: "center", padding: isMobile ? "12px 0" : "20px 0", borderBottom: "1px solid #e0ddd6", flexDirection: isMobile ? "column" : "row" }}>
// //                 <div style={{ display: "flex", gap: 14, alignItems: "center", width: isMobile ? "100%" : "auto" }}>
// //                   <div style={{ width: isMobile ? 60 : 88, height: isMobile ? 50 : 70, flexShrink: 0, overflow: "hidden", background: CREAM, cursor: "pointer", border: "1px solid #e8e8e8" }} onClick={() => navigate(`#/products/${item.id}`)}>
// //                     <img src={item.image} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //                   </div>
// //                   <div>
// //                     <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.16em", fontFamily: ff, marginBottom: 3 }}>{item.category?.toUpperCase()}{item.gender ? ` · ${item.gender.toUpperCase()}` : ""}</div>
// //                     <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, letterSpacing: "0.04em", marginBottom: 3, cursor: "pointer" }} onClick={() => navigate(`#/products/${item.id}`)}>{item.name}</div>
// //                     <div style={{ fontSize: 11, color: "#999", fontFamily: mono }}>{item.color}</div>
// //                     {itemDiscount > 0 && <div style={{ fontSize: 9, fontWeight: 900, background: NAVY, color: "#fff", display: "inline-block", padding: "2px 7px", letterSpacing: "0.1em", marginTop: 5 }}>−{itemDiscount}% OFF</div>}
// //                   </div>
// //                 </div>
// //                 <div style={{ display: "flex", justifyContent: isMobile ? "space-between" : "flex-start", alignItems: "center", width: isMobile ? "100%" : "auto", gap: 8 }}>
// //                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 14, fontWeight: 900, color: BLACK }}>PKR {(item.discountPrice || item.price || 0).toLocaleString()}</div>
// //                   {item.discountPrice && item.price && item.discountPrice < item.price && <div style={{ fontSize: 11, color: "#bbb", textDecoration: "line-through", fontFamily: mono }}>PKR {item.price.toLocaleString()}</div>}
// //                 </div>
// //                 <div style={{ display: "flex", border: "1.5px solid #ccc", alignItems: "center", width: "fit-content" }}>
// //                   <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
// //                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
// //                     onMouseLeave={e => e.currentTarget.style.background = "none"}>−</button>
// //                   <span style={{ width: 30, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{item.qty || 1}</span>
// //                   <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
// //                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
// //                     onMouseLeave={e => e.currentTarget.style.background = "none"}>+</button>
// //                 </div>
// //                 <button onClick={() => removeFromCart(item.id)} disabled={syncing} style={{ background: "none", border: "none", cursor: syncing ? "not-allowed" : "pointer", color: "#ccc", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
// //                   onMouseEnter={e => { if (!syncing) e.currentTarget.style.color = "#dc2626" }}
// //                   onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>×</button>
// //               </div>
// //             );
// //           })}

// //           <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
// //             <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: "pointer", color: "#888", fontFamily: ff }}
// //               onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
// //               onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>← CONTINUE SHOPPING</button>
// //             <button onClick={clearCart} disabled={syncing} style={{ background: "none", border: "1.5px solid #fecaca", padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: syncing ? "not-allowed" : "pointer", color: "#dc2626", fontFamily: ff }}
// //               onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#fef2f2" }}
// //               onMouseLeave={e => e.currentTarget.style.background = "none"}>CLEAR CART</button>
// //           </div>
// //         </div>

// //         <div style={{ background: "#fff", border: "1px solid #e0ddd6", position: "sticky", top: 80 }}>
// //           <div style={{ background: BLACK, padding: "18px 24px" }}>
// //             <div style={{ width: 26, height: 3, background: NAVY, marginBottom: 10 }} />
// //             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.16em" }}>ORDER SUMMARY</div>
// //           </div>
// //           <div style={{ padding: "22px 24px" }}>
// //             {localCart.map(item => (
// //               <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
// //                 <span style={{ fontSize: 12, color: "#666", fontFamily: mono, flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{item.name} × {item.qty || 1}</span>
// //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK, flexShrink: 0 }}>PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
// //               </div>
// //             ))}
// //             <div style={{ display: "flex", marginTop: 4, marginBottom: 16, flexWrap: "wrap" }}>
// //               <input placeholder="DISCOUNT CODE" style={{ flex: 1, border: "1.5px solid #ccc", borderRight: "none", padding: "9px 12px", fontSize: 11, fontFamily: ff, letterSpacing: "0.08em", outline: "none", color: BLACK, minWidth: "100px" }}
// //                 onFocus={e => e.currentTarget.style.borderColor = NAVY}
// //                 onBlur={e => e.currentTarget.style.borderColor = "#ccc"} />
// //               <button style={{ background: BLACK, color: "#fff", border: "none", padding: "9px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer", fontFamily: ff }}>APPLY</button>
// //             </div>
// //             <div style={{ borderTop: "1px solid #eee", paddingTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
// //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SUBTOTAL</span>
// //                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
// //               </div>
// //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SHIPPING</span>
// //                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
// //               </div>
// //               {shipping === 0 && <div style={{ fontSize: 10, color: "#16a34a", fontFamily: ff, letterSpacing: "0.1em", fontWeight: 800 }}>✓ FREE WORLDWIDE SHIPPING APPLIED</div>}
// //             </div>
// //             <div style={{ borderTop: `2px solid ${BLACK}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
// //               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", color: BLACK }}>TOTAL</span>
// //               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 18 : 20, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
// //             </div>
// //             <div style={{ fontSize: 10, color: "#bbb", fontFamily: ff, letterSpacing: "0.08em", marginBottom: 20 }}>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
// //             <button onClick={() => navigate("#/checkout")} disabled={syncing || localCart.length === 0} style={{ width: "100%", background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px", cursor: (syncing || localCart.length === 0) ? "not-allowed" : "pointer", display: "block", textAlign: "center", marginBottom: 8, opacity: (syncing || localCart.length === 0) ? 0.5 : 1 }}
// //               onMouseEnter={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = "#0a2236" }}
// //               onMouseLeave={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = NAVY }}>
// //               {syncing ? "UPDATING..." : "PROCEED TO CHECKOUT →"}
// //             </button>
// //             <button onClick={() => navigate("#/products")} style={{ width: "100%", background: "#fff", border: `1.5px solid ${BLACK}`, color: BLACK, fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.16em", padding: "11px", cursor: "pointer", display: "block", textAlign: "center" }}
// //               onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
// //               onMouseLeave={e => e.currentTarget.style.background = "#fff"}>CONTINUE SHOPPING</button>
// //             <div style={{ marginTop: 16, display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
// //               {["VISA", "MC", "AMEX", "APPLE PAY", "COD"].map(c => (
// //                 <span key={c} style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", border: "1px solid #e0e0e0", padding: "3px 6px", color: "#aaa", fontFamily: ff }}>{c}</span>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ WISHLIST PAGE ============
// // export function WishlistPage({ navigate }) {
// //   const { user } = useAuth();
// //   const [wishlist, setWishlist] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [removing, setRemoving] = useState(null);
// //   const { addToCart } = useCart();

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

// //   useEffect(() => {
// //     if (!user) { navigate("#/"); return; }
// //     loadWishlist();
// //   }, [user]);

// //   const loadWishlist = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getWishlist();
// //       const rawItems = res.data || [];
// //       setWishlist(enrichWishlistItems(rawItems));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //     setLoading(false);
// //   };

// //   const handleRemove = async (wishlistId) => {
// //     setRemoving(wishlistId);
// //     try {
// //       await removeFromWishlist({ wishlistId });
// //       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //     setRemoving(null);
// //   };

// //   const handleMoveToCart = async (item) => {
// //     if (item.product) {
// //       addToCart({ id: item.productId, ...item.product, discountPrice: item.product.salePrice || item.product.price }, 1);
// //       await handleRemove(item.wishlistId);
// //     }
// //   };

// //   if (!user) return null;

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
// //         </div>
// //         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
// //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
// //           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT</div>
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(36px, 6vw, 68px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
// //             MY WISHLIST
// //           </h1>
// //           {!loading && (
// //             <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono }}>
// //               {wishlist.length} saved {wishlist.length === 1 ? "frame" : "frames"}
// //             </p>
// //           )}
// //         </div>
// //       </div>

// //       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "MY ACCOUNT", path: "#/dashboard" }, { label: "WISHLIST", path: null }]} />

// //       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "48px 40px 80px" }}>
// //         {error && (
// //           <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, marginBottom: 24, fontFamily: mono }}>
// //             {error}
// //           </div>
// //         )}

// //         {loading ? (
// //           <WishlistSkeleton />
// //         ) : wishlist.length === 0 ? (
// //           <FadeIn>
// //             <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 480, margin: "0 auto" }}>
// //               <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                 <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fef0f0", animation: "pulseSlow 3s ease-in-out infinite" }}/>
// //                 <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
// //                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
// //                 </svg>
// //               </div>
// //               <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
// //               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 4vw, 36px)", color: BLACK, margin: "0 0 12px", letterSpacing: "0.04em" }}>
// //                 YOUR WISHLIST IS EMPTY
// //               </h2>
// //               <p style={{ fontSize: 14, color: "#888", fontFamily: mono, lineHeight: 1.7, marginBottom: 32 }}>
// //                 Save frames you love by tapping the heart icon. They'll wait here for you.
// //               </p>
// //               <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// //                 <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 28px" }}>BROWSE ALL FRAMES</YBtn>
// //                 <button onClick={() => navigate("#/collections/new-arrivals")} style={{ background: "none", border: `1.5px solid ${BRAND}`, color: BRAND, fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.12em", padding: "14px 24px", cursor: "pointer" }}>
// //                   NEW ARRIVALS
// //                 </button>
// //               </div>
// //             </div>
// //           </FadeIn>
// //         ) : (
// //           <>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
// //               <div>
// //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 4 }}>SAVED ITEMS</div>
// //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(22px, 3vw, 32px)", color: BLACK, letterSpacing: "0.02em" }}>
// //                   {wishlist.length} {wishlist.length === 1 ? "FRAME" : "FRAMES"} SAVED
// //                 </div>
// //               </div>
// //               <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: "#888", fontFamily: ff, transition: "all 0.2s" }}
// //                 onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
// //                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>
// //                 CONTINUE SHOPPING →
// //               </button>
// //             </div>

// //             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, minmax(200px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 24 }}>
// //               {wishlist.map((item, idx) => {
// //                 const isRemoving = removing === item.wishlistId;
// //                 const price = Number(item.product?.salePrice || item.product?.price || 0);
// //                 const origPrice = Number(item.product?.price || 0);
// //                 const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

// //                 return (
// //                   <FadeIn key={item.wishlistId} delay={idx * 60}>
// //                     <div style={{
// //                       background: "#fff", border: "1px solid #e8e0d0",
// //                       overflow: "hidden", position: "relative",
// //                       transition: "box-shadow 0.3s, transform 0.3s, opacity 0.3s",
// //                       opacity: isRemoving ? 0.4 : 1,
// //                       transform: isRemoving ? "scale(0.97)" : "scale(1)",
// //                       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
// //                       display: "flex", flexDirection: "column"
// //                     }}
// //                       onMouseEnter={e => { if (!isRemoving) { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
// //                       onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}
// //                     >
// //                       {discount > 0 && (
// //                         <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 9px", fontFamily: ff }}>
// //                           −{discount}%
// //                         </div>
// //                       )}

// //                       <button
// //                         onClick={() => handleRemove(item.wishlistId)}
// //                         disabled={isRemoving}
// //                         style={{
// //                           position: "absolute", top: 10, right: 10, zIndex: 4,
// //                           width: 32, height: 32, borderRadius: "50%",
// //                           background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)",
// //                           display: "flex", alignItems: "center", justifyContent: "center",
// //                           cursor: isRemoving ? "wait" : "pointer", fontSize: 14, color: "#aaa",
// //                           transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
// //                         }}
// //                         onMouseEnter={e => { e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.borderColor = "#dc2626"; }}
// //                         onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
// //                         aria-label="Remove from wishlist"
// //                       >
// //                         ×
// //                       </button>

// //                       <div
// //                         onClick={() => navigate(`#/products/${item.productId}`)}
// //                         style={{ height: isMobile ? 160 : 220, overflow: "hidden", background: "#FAFAF5", cursor: "pointer", position: "relative", flexShrink: 0 }}
// //                       >
// //                         {item.product?.imageUrl ? (
// //                           <img
// //                             src={`${item.product.imageUrl}`}
// //                             alt={item.product.name}
// //                             loading="lazy"
// //                             decoding="async"
// //                             style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? "16px 20px" : "24px 32px", transition: "transform 0.4s ease" }}
// //                             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
// //                             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
// //                           />
// //                         ) : (
// //                           <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                             <Frame shape="round" size={isMobile ? 80 : 120} color={BRAND} />
// //                           </div>
// //                         )}
// //                         <div style={{
// //                           position: "absolute", bottom: 0, left: 0, right: 0,
// //                           background: BRAND, color: BRAND_TEXT, textAlign: "center",
// //                           padding: "9px", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff,
// //                           transform: "translateY(100%)", transition: "transform 0.25s ease"
// //                         }}
// //                           className="wishlist-view-overlay">
// //                           VIEW DETAILS →
// //                         </div>
// //                       </div>

// //                       <div style={{ padding: isMobile ? "10px 12px 12px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
// //                         <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.16em", marginBottom: 3, fontFamily: ff }}>
// //                           {item.product?.subcategory?.toUpperCase()} {item.product?.gender ? `· ${item.product.gender.toUpperCase()}` : ""}
// //                         </div>
// //                         <div
// //                           onClick={() => navigate(`#/products/${item.productId}`)}
// //                           style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, marginBottom: 4, letterSpacing: "0.03em", cursor: "pointer", lineHeight: 1.2 }}>
// //                           {item.product?.name || "Unnamed Frame"}
// //                         </div>
// //                         <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 10, lineHeight: 1.4 }}>
// //                           {item.product?.color || ""}
// //                         </div>

// //                         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
// //                           <span style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK }}>
// //                             PKR {price.toLocaleString()}
// //                           </span>
// //                           {discount > 0 && (
// //                             <span style={{ fontFamily: mono, fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>
// //                               PKR {origPrice.toLocaleString()}
// //                             </span>
// //                           )}
// //                         </div>

// //                         <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
// //                           <button
// //                             onClick={() => handleMoveToCart(item)}
// //                             disabled={isRemoving}
// //                             style={{
// //                               flex: 1, background: NAVY, color: "#fff", border: "none",
// //                               padding: "10px 0", fontSize: isMobile ? 9 : 10, fontWeight: 900,
// //                               letterSpacing: "0.12em", cursor: isRemoving ? "not-allowed" : "pointer",
// //                               fontFamily: ff, transition: "background 0.18s"
// //                             }}
// //                             onMouseEnter={e => { if (!isRemoving) e.currentTarget.style.background = "#0a2236"; }}
// //                             onMouseLeave={e => e.currentTarget.style.background = NAVY}
// //                           >
// //                             + ADD TO BAG
// //                           </button>
// //                           <button
// //                             onClick={() => navigate(`#/products/${item.productId}`)}
// //                             style={{
// //                               background: "none", border: `1.5px solid #e8e0d0`,
// //                               padding: "10px 14px", fontSize: 11, cursor: "pointer",
// //                               color: BLACK, transition: "border-color 0.18s", fontFamily: ff
// //                             }}
// //                             onMouseEnter={e => e.currentTarget.style.borderColor = BRAND}
// //                             onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e0d0"}
// //                             aria-label="View product"
// //                           >
// //                             ↗
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </FadeIn>
// //                 );
// //               })}
// //             </div>

// //             <FadeIn delay={200}>
// //               <div style={{ textAlign: "center", marginTop: 56, padding: "40px 20px", background: "#fff", border: "1px solid #e8e0d0" }}>
// //                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 10 }}>DISCOVER MORE</div>
// //                 <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(20px, 3vw, 28px)", color: BLACK, margin: "0 0 20px", letterSpacing: "0.04em" }}>
// //                   KEEP EXPLORING
// //                 </h3>
// //                 <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// //                   <YBtn onClick={() => navigate("#/collections/new-arrivals")} style={{ padding: "12px 24px" }}>NEW ARRIVALS</YBtn>
// //                   <YBtn onClick={() => navigate("#/products")} style={{ padding: "12px 24px" }}>ALL FRAMES</YBtn>
// //                 </div>
// //               </div>
// //             </FadeIn>
// //           </>
// //         )}
// //       </div>
// //       <style>{`
// //         .wishlist-card:hover .wishlist-view-overlay { transform: translateY(0) !important; }
// //         @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.08); opacity:1; } }
// //       `}</style>
// //     </div>
// //   );
// // }

// // // ============ CHECKOUT PAGE ============
// // const AddressCard = ({ addr, selected, onSelect }) => {
// //   const isDefault = addr.isDefault === true || addr.isDefault === "TRUE";
// //   return (
// //     <div
// //       onClick={onSelect}
// //       style={{
// //         border: `2px solid ${selected ? BRAND : "#dde"}`,
// //         borderRadius: 4,
// //         padding: "16px 18px",
// //         cursor: "pointer",
// //         background: selected ? "#f0f6fa" : "#fff",
// //         position: "relative",
// //         transition: "border-color 0.15s, background 0.15s",
// //         userSelect: "none",
// //       }}
// //     >
// //       <div style={{
// //         position: "absolute",
// //         top: 14,
// //         right: 14,
// //         width: 18,
// //         height: 18,
// //         borderRadius: "50%",
// //         border: `2px solid ${selected ? BRAND : "#bbb"}`,
// //         background: selected ? BRAND : "transparent",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         transition: "all 0.15s",
// //       }}>
// //         {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
// //       </div>
// //       {isDefault && (
// //         <span style={{
// //           display: "inline-block",
// //           background: BRAND,
// //           color: "#fff",
// //           fontSize: 8,
// //           fontWeight: 900,
// //           padding: "2px 7px",
// //           letterSpacing: "0.12em",
// //           fontFamily: ff,
// //           marginBottom: 8,
// //         }}>
// //           DEFAULT
// //         </span>
// //       )}
// //       <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, marginBottom: 4, fontFamily: ff, paddingRight: 28 }}>
// //         {addr.fullName}
// //       </div>
// //       <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7 }}>
// //         {addr.address}<br />
// //         {addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ""}<br />
// //         {addr.country || "Pakistan"}<br />
// //         {addr.phone}
// //       </div>
// //     </div>
// //   );
// // };

// // const Field = ({ label, value, onChange, placeholder, type = "text", error, full = false }) => (
// //   <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: full ? "1 / -1" : "auto" }}>
// //     <label style={{
// //       fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
// //       color: error ? "#dc2626" : "#888", fontFamily: ff,
// //     }}>
// //       {label}{error ? ` — ${error}` : ""}
// //     </label>
// //     <input
// //       type={type}
// //       placeholder={placeholder}
// //       value={value}
// //       onChange={e => onChange(e.target.value)}
// //       style={{
// //         border: `1.5px solid ${error ? "#dc2626" : "#e0e8ee"}`,
// //         padding: "11px 14px",
// //         fontSize: 13,
// //         fontFamily: mono,
// //         color: BLACK,
// //         background: "#fafaf8",
// //         outline: "none",
// //         transition: "border-color 0.15s",
// //       }}
// //       onFocus={e => { if (!error) e.target.style.borderColor = BRAND; }}
// //       onBlur={e => { if (!error) e.target.style.borderColor = "#e0e8ee"; }}
// //     />
// //   </div>
// // );

// // export function CheckoutPage({ navigate }) {
// //   const { cartItems, cartTotal, clearCart, loading: cartLoading, syncCartToDatabase, getCheckoutItems } = useCart();
// //   const { user } = useAuth();

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

// //   const [step, setStep] = useState(1);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [syncingCart, setSyncingCart] = useState(false);
// //   const [orderPlaced, setOrderPlaced] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   const [savedAddresses, setSavedAddresses] = useState([]);
// //   const [addressesLoading, setAddressesLoading] = useState(true);
// //   const [selectedAddressId, setSelectedAddressId] = useState(null);
// //   const [showCustomForm, setShowCustomForm] = useState(false);

// //   const [customForm, setCustomForm] = useState({
// //     fullName: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     postalCode: "",
// //     country: "Pakistan",
// //     notes: "",
// //   });
// //   const setCustomField = k => v => setCustomForm(f => ({ ...f, [k]: v }));

// //   const shipping = cartTotal >= 5000 ? 0 : 350;
// //   const grandTotal = cartTotal + shipping;

// //   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
// //   useEffect(() => {
// //     if (!cartLoading && cartItems.length === 0 && !orderPlaced) navigate("#/products");
// //   }, [cartItems, cartLoading, navigate, orderPlaced]);

// //   useEffect(() => {
// //     if (!user) return;
// //     setAddressesLoading(true);
// //     getAddresses()
// //       .then(res => {
// //         const addrs = res.data || [];
// //         setSavedAddresses(addrs);
// //         if (addrs.length > 0) {
// //           const def = addrs.find(a => a.isDefault === true || a.isDefault === "TRUE");
// //           setSelectedAddressId(def ? def.addressId : addrs[0].addressId);
// //           setShowCustomForm(false);
// //         } else {
// //           setShowCustomForm(true);
// //           setSelectedAddressId(null);
// //         }
// //       })
// //       .catch(() => {
// //         setShowCustomForm(true);
// //         setSelectedAddressId(null);
// //       })
// //       .finally(() => setAddressesLoading(false));
// //   }, [user]);

// //   const activeAddress = (() => {
// //     if (selectedAddressId) {
// //       const saved = savedAddresses.find(a => a.addressId === selectedAddressId);
// //       if (saved) {
// //         return {
// //           fullName: String(saved.fullName ?? ""),
// //           phone: String(saved.phone ?? ""),
// //           email: user?.email || "",
// //           address: String(saved.address ?? ""),
// //           city: String(saved.city ?? ""),
// //           country: String(saved.country ?? "Pakistan"),
// //           postalCode: String(saved.postalCode ?? ""),
// //           notes: "",
// //         };
// //       }
// //     }
// //     return {
// //       ...customForm,
// //       fullName: String(customForm.fullName ?? ""),
// //       phone: String(customForm.phone ?? ""),
// //       address: String(customForm.address ?? ""),
// //       city: String(customForm.city ?? ""),
// //       email: user?.email || "",
// //     };
// //   })();

// //   const validate = () => {
// //     const e = {};
// //     if (!String(activeAddress.fullName ?? "").trim()) e.fullName = "Required";
// //     if (!String(activeAddress.phone ?? "").trim()) e.phone = "Required";
// //     if (!String(activeAddress.address ?? "").trim()) e.address = "Required";
// //     if (!String(activeAddress.city ?? "").trim()) e.city = "Required";
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const handleProceedToReview = async () => {
// //     if (!validate()) return;
// //     if (!user) { alert("Please log in to proceed."); return; }
// //     setSyncingCart(true);
// //     const syncResult = await syncCartToDatabase();
// //     setSyncingCart(false);
// //     if (!syncResult.success) { alert(syncResult.error || "Failed to sync cart."); return; }
// //     setStep(2);
// //   };

// //   const handlePlaceOrder = async () => {
// //     if (!user) { alert("Please log in to complete your order."); return; }
// //     setSubmitting(true);
// //     try {
// //       const { checkout } = await import("../services/service.js");
// //       const checkoutItems = getCheckoutItems();
// //       const res = await checkout({
// //         cartItems: checkoutItems,
// //         subtotal: cartTotal,
// //         shipping,
// //         total: grandTotal,
// //         address: activeAddress,
// //         paymentMethod: "COD",
// //       });
// //       if (res.success) {
// //         setOrderPlaced(true);
// //         await clearCart();
// //         navigate("#/order-success");
// //       } else {
// //         alert(res.error || "Failed to place order.");
// //       }
// //     } catch (err) {
// //       console.error("Checkout error:", err);
// //       alert("Failed to place order. Please try again.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (cartLoading) return (
// //     <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
// //       <div style={{ fontSize: 12, letterSpacing: "0.2em", color: BRAND }}>LOADING...</div>
// //     </div>
// //   );
// //   if (cartItems.length === 0 && !orderPlaced) return null;

// //   const userName = user?.name || user?.fullName || "";
// //   const userEmail = user?.email || "";

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// //       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "44px 40px 36px" }}>
// //         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
// //           <div style={{ width: 32, height: 3, background: BRAND, marginBottom: 14 }} />
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: "0 0 12px" }}>CHECKOUT</h1>
// //           <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
// //             {[{ n: 1, l: "DELIVERY" }, { n: 2, l: "REVIEW & PAY" }].map((s, i) => (
// //               <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                 {i > 0 && <div style={{ width: isMobile ? 20 : 40, height: 1, background: step > i ? BRAND : "#333" }} />}
// //                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //                   <div style={{
// //                     width: 28, height: 28, borderRadius: "50%",
// //                     background: step >= s.n ? BRAND : "#222",
// //                     border: `2px solid ${step >= s.n ? BRAND : "#333"}`,
// //                     display: "flex", alignItems: "center", justifyContent: "center",
// //                     fontSize: 11, fontWeight: 900, color: step >= s.n ? BRAND_TEXT : "#555", fontFamily: ff,
// //                   }}>
// //                     {step > s.n ? "✓" : s.n}
// //                   </div>
// //                   <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: step >= s.n ? "#fff" : "#555", fontFamily: ff }}>
// //                     {s.l}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 16px 60px" : "48px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
// //         <div>
// //           {step === 1 && (
// //             <FadeIn>
// //               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
// //                 <div style={{ background: "#f0f6fa", border: `1.5px solid #89c4e1`, padding: "14px 20px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
// //                   <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
// //                     <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRAND, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, fontFamily: ff, flexShrink: 0 }}>
// //                       {userName.charAt(0).toUpperCase() || "?"}
// //                     </div>
// //                     <div>
// //                       <div style={{ fontSize: 13, fontWeight: 900, color: BRAND, fontFamily: ff, letterSpacing: "0.04em" }}>{userName}</div>
// //                       <div style={{ fontSize: 11, color: "#666", fontFamily: mono, marginTop: 2 }}>{userEmail}</div>
// //                     </div>
// //                   </div>
// //                   <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", color: "#2a8a50", background: "#eaf5ef", padding: "4px 10px", fontFamily: ff }}>SIGNED IN</span>
// //                 </div>

// //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff }}>
// //                   DELIVERY ADDRESS
// //                 </div>

// //                 {addressesLoading ? (
// //                   <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#aaa", letterSpacing: "0.14em", fontFamily: ff }}>
// //                     LOADING ADDRESSES…
// //                   </div>
// //                 ) : (
// //                   <>
// //                     {savedAddresses.length > 0 && (
// //                       <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
// //                         {savedAddresses.map(addr => (
// //                           <AddressCard
// //                             key={addr.addressId}
// //                             addr={addr}
// //                             selected={selectedAddressId === addr.addressId && !showCustomForm}
// //                             onSelect={() => {
// //                               setSelectedAddressId(addr.addressId);
// //                               setShowCustomForm(false);
// //                               setErrors({});
// //                             }}
// //                           />
// //                         ))}
// //                       </div>
// //                     )}

// //                     <button
// //                       onClick={() => {
// //                         const next = !showCustomForm;
// //                         setShowCustomForm(next);
// //                         if (next) setSelectedAddressId(null);
// //                         else if (savedAddresses.length > 0) {
// //                           const def = savedAddresses.find(a => a.isDefault === true || a.isDefault === "TRUE");
// //                           setSelectedAddressId(def ? def.addressId : savedAddresses[0].addressId);
// //                         }
// //                         setErrors({});
// //                       }}
// //                       style={{
// //                         display: "flex", alignItems: "center", gap: 8,
// //                         background: "none", border: `1.5px dashed ${showCustomForm ? BRAND : "#bcd"}`,
// //                         color: showCustomForm ? BRAND : "#6a8ea0", padding: "11px 20px",
// //                         fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
// //                         fontFamily: ff, cursor: "pointer", width: "100%",
// //                         justifyContent: "center", marginBottom: 4, transition: "all 0.15s",
// //                       }}
// //                     >
// //                       <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>
// //                         {showCustomForm ? "×" : "+"}
// //                       </span>
// //                       {showCustomForm ? "CANCEL — USE SAVED ADDRESS" : "USE A DIFFERENT ADDRESS"}
// //                     </button>

// //                     {showCustomForm && (
// //                       <FadeIn delay={0.05}>
// //                         <div style={{ border: `1.5px solid ${BRAND}`, padding: isMobile ? "16px" : "24px 20px", marginTop: 16, background: "#f8fbfd" }}>
// //                           <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: BRAND, marginBottom: 20, fontFamily: ff }}>
// //                             ENTER DELIVERY DETAILS
// //                           </div>
// //                           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
// //                             <Field label="FULL NAME" value={customForm.fullName} onChange={setCustomField("fullName")} placeholder="Ahmad Khan" error={errors.fullName} />
// //                             <Field label="PHONE" value={customForm.phone} onChange={setCustomField("phone")} placeholder="0300 1234567" type="tel" error={errors.phone} />
// //                             <Field label="STREET ADDRESS" value={customForm.address} onChange={setCustomField("address")} placeholder="House #12, Street 4, Block B" error={errors.address} full />
// //                             <Field label="CITY" value={customForm.city} onChange={setCustomField("city")} placeholder="Karachi" error={errors.city} />
// //                             <Field label="POSTAL CODE (optional)" value={customForm.postalCode} onChange={setCustomField("postalCode")} placeholder="75500" />
// //                             <Field label="ORDER NOTES (optional)" value={customForm.notes} onChange={setCustomField("notes")} placeholder="e.g. Leave at gate" full />
// //                           </div>
// //                         </div>
// //                       </FadeIn>
// //                     )}
// //                   </>
// //                 )}

// //                 <div style={{ marginTop: 32 }}>
// //                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 20, fontFamily: ff }}>
// //                     PAYMENT METHOD
// //                   </div>
// //                   <div style={{ border: `2px solid #89c4e1`, background: "#e8f2f8", padding: "18px 20px" }}>
// //                     <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
// //                       <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#89c4e1", border: `2px solid #89c4e1`, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
// //                       </div>
// //                       <div>
// //                         <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.1em", color: BLACK, marginBottom: 4 }}>
// //                           CASH ON DELIVERY (COD)
// //                         </div>
// //                         <p style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7, margin: 0 }}>
// //                           Pay in cash when your order arrives. Available across all major cities in Pakistan.
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div style={{ marginTop: 32 }}>
// //                   <YBtn onClick={handleProceedToReview} disabled={syncingCart || addressesLoading} style={{ width: "100%", padding: 15, fontSize: 12, letterSpacing: "0.14em" }}>
// //                     {syncingCart ? "SYNCING CART…" : "REVIEW ORDER →"}
// //                   </YBtn>
// //                 </div>
// //               </div>
// //             </FadeIn>
// //           )}

// //           {step === 2 && (
// //             <FadeIn>
// //               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
// //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.1em", color: BLACK, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #f0ece4" }}>
// //                   REVIEW YOUR ORDER
// //                 </div>
// //                 <div style={{ background: "#FAFAF8", border: "1px solid #e0e8ee", padding: "18px 20px", marginBottom: 24 }}>
// //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //                     <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>DELIVERY TO</div>
// //                     <button onClick={() => setStep(1)} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#888", background: "none", border: "none", cursor: "pointer", fontFamily: ff, textDecoration: "underline" }}>EDIT</button>
// //                   </div>
// //                   <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, fontFamily: ff, marginBottom: 6 }}>{activeAddress.fullName}</div>
// //                   <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
// //                     {activeAddress.address}<br />
// //                     {activeAddress.city}{activeAddress.postalCode ? `, ${activeAddress.postalCode}` : ""}<br />
// //                     {activeAddress.phone}<br />
// //                     {activeAddress.email}
// //                   </div>
// //                 </div>

// //                 {cartItems.map(item => (
// //                   <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0ece4" }}>
// //                     <div style={{ width: 72, height: 56, flexShrink: 0, overflow: "hidden", background: CREAM }}>
// //                       <img src={`${item.image}`} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //                     </div>
// //                     <div style={{ flex: 1 }}>
// //                       <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>{item.name}</div>
// //                       <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>{item.color} · Qty: {item.qty}</div>
// //                     </div>
// //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>
// //                       PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
// //                     </div>
// //                   </div>
// //                 ))}

// //                 <div style={{ background: "#e8f2f8", border: `1.5px solid #89c4e1`, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
// //                   <span style={{ fontSize: 18 }}>💵</span>
// //                   <div>
// //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", color: BLACK }}>CASH ON DELIVERY</div>
// //                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>Pay PKR {grandTotal.toLocaleString()} when your order arrives</div>
// //                   </div>
// //                 </div>

// //                 <div style={{ marginTop: 28 }}>
// //                   <YBtn onClick={handlePlaceOrder} disabled={submitting} style={{ width: "100%", padding: 16, fontSize: 13, letterSpacing: "0.16em" }}>
// //                     {submitting ? "PLACING YOUR ORDER…" : `PLACE ORDER · PKR ${grandTotal.toLocaleString()}`}
// //                   </YBtn>
// //                 </div>
// //               </div>
// //             </FadeIn>
// //           )}
// //         </div>

// //         <div style={{ background: "#fff", border: "1px solid #e0e8ee", position: "sticky", top: 80 }}>
// //           <div style={{ background: BLACK, padding: "18px 22px" }}>
// //             <div style={{ width: 24, height: 3, background: BRAND, marginBottom: 8 }} />
// //             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>ORDER SUMMARY</div>
// //           </div>
// //           <div style={{ padding: 20 }}>
// //             {cartItems.map(item => (
// //               <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
// //                 <div style={{ width: 52, height: 40, flexShrink: 0, overflow: "hidden", background: CREAM }}>
// //                   <img src={`${item.image}`} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //                 </div>
// //                 <div style={{ flex: 1 }}>
// //                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>{item.name}</div>
// //                   <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono }}>× {item.qty}</div>
// //                 </div>
// //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>
// //                   PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
// //                 </div>
// //               </div>
// //             ))}
// //             <div style={{ borderTop: "1px solid #f0ece4", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
// //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Subtotal</span>
// //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
// //               </div>
// //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Shipping</span>
// //                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>
// //                   {shipping === 0 ? "FREE" : `PKR ${shipping}`}
// //                 </span>
// //               </div>
// //               <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "2px solid #e8e0d0", marginTop: 4 }}>
// //                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", color: BLACK }}>TOTAL</span>
// //                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 16 : 18, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ ORDER SUCCESS PAGE ============
// // export function OrderSuccessPage({ navigate }) {
// //   const [count, setCount] = useState(8);
// //   const isMobile = useMediaQuery("(max-width: 767px)");

// //   useEffect(() => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //     const t = setInterval(() => setCount(c => {
// //       if (c <= 1) { clearInterval(t); navigate("#/"); return 0; }
// //       return c - 1;
// //     }), 1000);
// //     return () => clearInterval(t);
// //   }, [navigate]);

// //   return (
// //     <div style={{ minHeight: "100vh", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, position: "relative", overflow: "hidden", padding: "20px" }}>
// //       <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
// //         <Frame shape="round" size={isMobile ? 400 : 900} color="#fff"/>
// //       </div>
// //       <div style={{ textAlign: "center", maxWidth: 560, padding: "0 20px", position: "relative", zIndex: 1 }}>
// //         <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 36, color: BRAND_TEXT }}>✓</div>
// //         <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
// //         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#fff", margin: "0 0 10px" }}>ORDER</h1>
// //         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#89c4e1", margin: "0 0 28px" }}>PLACED!</h1>
// //         <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.45)", fontFamily: mono, lineHeight: 1.8, marginBottom: 36 }}>
// //           Thank you for your order. Our team will call you to confirm delivery details. Your frames will arrive within 5–7 business days.
// //         </p>
// //         <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// //           <YBtn onClick={() => navigate("#/products")} style={{ padding: "13px 28px", fontSize: isMobile ? 10 : 12 }}>SHOP MORE FRAMES</YBtn>
// //           <button onClick={() => navigate("#/")} style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.2)", padding: "13px 24px", fontSize: 12, fontWeight: 900, letterSpacing: "0.1em", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontFamily: ff }}>GO HOME</button>
// //         </div>
// //         <div style={{ marginTop: 28, fontSize: 11, color: "#444", fontFamily: mono }}>Redirecting to home in {count}s...</div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ REVIEW SUBMISSION PAGE ============
// // export function ReviewSubmissionPage({ productId, reviewId, navigate }) {
// //   const { user } = useAuth();
// //   const [product, setProduct] = useState(null);
// //   const [existingReview, setExistingReview] = useState(null);
// //   const [rating, setRating] = useState(0);
// //   const [reviewText, setReviewText] = useState("");
// //   const [hovered, setHovered] = useState(0);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [msg, setMsg] = useState({ type: "", text: "" });
// //   const [loading, setLoading] = useState(true);

// //   const isMobile = useMediaQuery("(max-width: 767px)");

// //   useEffect(() => {
// //     if (!user) { navigate("#/"); return; }
// //     window.scrollTo({ top: 0, behavior: "smooth" });

// //     const found = PRODUCTS_DATA.find(p => p.id === productId);
// //     setProduct(found || { id: productId, name: `Product #${productId}`, gallery: [], discountPrice: 0, price: 0 });

// //     const loadExisting = async () => {
// //       if (reviewId) {
// //         try {
// //           const res = await getUserReviews();
// //           const reviews = res.data || [];
// //           const match = reviews.find(r => r.reviewId === reviewId);
// //           if (match) {
// //             setExistingReview(match);
// //             setRating(Number(match.rating) || 0);
// //             setReviewText(match.review || "");
// //           }
// //         } catch {}
// //       }
// //       setLoading(false);
// //     };
// //     loadExisting();
// //   }, [productId, reviewId, user, navigate]);

// //   const handleSubmit = async () => {
// //     if (!rating) { setMsg({ type: "error", text: "Please select a star rating before submitting." }); return; }
// //     setSubmitting(true);
// //     setMsg({ type: "", text: "" });
// //     try {
// //       if (existingReview && reviewId) {
// //         await updateReview({ reviewId, rating, review: reviewText });
// //       } else {
// //         await submitReview({ productId, rating, review: reviewText });
// //       }
// //       setMsg({ type: "success", text: existingReview ? "Review updated successfully!" : "Review submitted! It will appear after approval." });
// //       setTimeout(() => navigate("#/dashboard?tab=reviews"), 2200);
// //     } catch (err) {
// //       setMsg({ type: "error", text: err.message || "Submission failed. Please try again." });
// //     }
// //     setSubmitting(false);
// //   };

// //   if (!user) return null;

// //   const LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
// //       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
// //         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
// //           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff" />
// //         </div>
// //         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
// //           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }} />
// //           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT · REVIEWS</div>
// //           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 8vw, 36px)" : "clamp(32px, 5vw, 60px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
// //             {existingReview ? "EDIT REVIEW" : "WRITE A REVIEW"}
// //           </h1>
// //         </div>
// //       </div>

// //       <Breadcrumb crumbs={[
// //         { label: "HOME", path: "#/" },
// //         { label: "MY ACCOUNT", path: "#/dashboard" },
// //         { label: "REVIEWS", path: "#/dashboard?tab=reviews" },
// //         { label: existingReview ? "EDIT REVIEW" : "SUBMIT REVIEW", path: null },
// //       ]} />

// //       <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "56px 24px 80px" }}>
// //         {loading ? (
// //           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING…</div>
// //         ) : (
// //           <FadeIn>
// //             {product && (
// //               <div style={{ display: "flex", gap: 20, alignItems: "center", background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "12px" : "20px", marginBottom: 36, flexWrap: "wrap" }}>
// //                 <div style={{ width: 90, height: 72, background: CREAM, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                   {product.gallery?.[0]
// //                     ? <img src={`${product.gallery[0]}`} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
// //                     : <span style={{ fontSize: 28 }}>👓</span>
// //                   }
// //                 </div>
// //                 <div>
// //                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#aaa", fontFamily: ff, marginBottom: 4 }}>
// //                     {product.category?.toUpperCase() || "EYEWEAR"}
// //                   </div>
// //                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 16, color: BLACK, letterSpacing: "0.04em", marginBottom: 4 }}>
// //                     {product.name}
// //                   </div>
// //                   {product.discountPrice > 0 && (
// //                     <div style={{ fontFamily: ff, fontSize: 13, color: BRAND, fontWeight: 700 }}>
// //                       PKR {product.discountPrice.toLocaleString()}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             <div style={{ background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "20px" : "32px" }}>
// //               <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 28, fontFamily: ff }}>
// //                 {existingReview ? "UPDATE YOUR REVIEW" : "YOUR REVIEW"}
// //               </div>

// //               <div style={{ marginBottom: 28 }}>
// //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 12 }}>
// //                   OVERALL RATING <span style={{ color: "#e74c3c" }}>*</span>
// //                 </div>
// //                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
// //                   <div style={{ display: "flex", gap: 4 }}>
// //                     {[1, 2, 3, 4, 5].map(star => (
// //                       <button
// //                         key={star}
// //                         onClick={() => setRating(star)}
// //                         onMouseEnter={() => setHovered(star)}
// //                         onMouseLeave={() => setHovered(0)}
// //                         style={{
// //                           background: "none", border: "none", cursor: "pointer",
// //                           fontSize: isMobile ? 28 : 36, padding: "0 3px",
// //                           color: star <= (hovered || rating) ? "#f5a623" : "#e0ddd6",
// //                           transition: "color 0.12s, transform 0.1s",
// //                           transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
// //                         }}
// //                       >★</button>
// //                     ))}
// //                   </div>
// //                   {(hovered || rating) > 0 && (
// //                     <span style={{ fontSize: 12, color: "#888", fontFamily: mono, letterSpacing: "0.04em" }}>
// //                       {LABEL[hovered || rating]}
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>

// //               <div style={{ marginBottom: 28 }}>
// //                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 8 }}>
// //                   WRITTEN REVIEW <span style={{ fontSize: 10, color: "#aaa", fontWeight: 400 }}>(optional)</span>
// //                 </div>
// //                 <textarea
// //                   value={reviewText}
// //                   onChange={e => setReviewText(e.target.value)}
// //                   placeholder="Share your experience with this frame — fit, quality, style..."
// //                   rows={5}
// //                   style={{
// //                     width: "100%", padding: "14px 16px", border: "1.5px solid #e8e0d0",
// //                     fontSize: 13, fontFamily: mono, color: BLACK, lineHeight: 1.7,
// //                     resize: "vertical", outline: "none", boxSizing: "border-box",
// //                     background: "#fafaf8",
// //                   }}
// //                   onFocus={e => e.target.style.borderColor = BRAND}
// //                   onBlur={e => e.target.style.borderColor = "#e8e0d0"}
// //                 />
// //                 <div style={{ fontSize: 10, color: "#bbb", fontFamily: mono, marginTop: 6, textAlign: "right" }}>
// //                   {reviewText.length} characters
// //                 </div>
// //               </div>

// //               {msg.text && (
// //                 <div style={{
// //                   padding: "12px 16px", fontSize: 12, fontFamily: mono, marginBottom: 20,
// //                   background: msg.type === "success" ? "#eaf5ef" : "#fef0f0",
// //                   border: `1px solid ${msg.type === "success" ? "#a3d9b5" : "#f5c0c0"}`,
// //                   color: msg.type === "success" ? "#2a8a50" : "#a33",
// //                 }}>
// //                   {msg.type === "success" ? "✓ " : "⚠ "}{msg.text}
// //                 </div>
// //               )}

// //               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// //                 <button
// //                   onClick={handleSubmit}
// //                   disabled={submitting || rating === 0}
// //                   style={{
// //                     background: submitting || rating === 0 ? "#ccc" : BRAND, color: "#fff",
// //                     border: "none", padding: "14px 28px", fontSize: 11, fontWeight: 900,
// //                     letterSpacing: "0.14em", fontFamily: ff,
// //                     cursor: submitting || rating === 0 ? "not-allowed" : "pointer",
// //                     transition: "background 0.2s",
// //                   }}
// //                 >
// //                   {submitting ? "SUBMITTING…" : existingReview ? "UPDATE REVIEW" : "SUBMIT REVIEW"}
// //                 </button>
// //                 <button
// //                   onClick={() => navigate("#/dashboard?tab=reviews")}
// //                   style={{
// //                     background: "none", border: `1.5px solid #ccc`, color: "#888",
// //                     padding: "14px 24px", fontSize: 11, fontWeight: 900,
// //                     letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// //                   }}
// //                 >
// //                   ← BACK TO REVIEWS
// //                 </button>
// //               </div>

// //               <div style={{ marginTop: 20, padding: "12px 16px", background: "#f8f8f4", border: "1px solid #eee" }}>
// //                 <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, lineHeight: 1.8 }}>
// //                   ★ Reviews are verified and approved before publishing. Only customers who have purchased this product may submit a review.
// //                 </div>
// //               </div>
// //             </div>
// //           </FadeIn>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // ============ PRODUCT REVIEWS SECTION ============
// // function ProductReviewsSection({ productId, navigate }) {
// //   const { user } = useAuth();
// //   const [reviews, setReviews] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [showAll, setShowAll] = useState(false);

// //   const isMobile = useMediaQuery("(max-width: 767px)");

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getReviews({ productId });
// //       const data = res.data || [];
// //       setReviews(Array.isArray(data) ? data : []);

// //       if (data.length > 0) {
// //         const total = data.length;
// //         const avg = data.reduce((s, r) => s + Number(r.rating || 0), 0) / total;
// //         const breakdown = [5, 4, 3, 2, 1].map(star => ({
// //           star,
// //           count: data.filter(r => Number(r.rating) === star).length,
// //         }));
// //         setStats({ avg: Math.round(avg * 10) / 10, total, breakdown });
// //       } else {
// //         setStats({ avg: 0, total: 0, breakdown: [] });
// //       }
// //     } catch {
// //       setReviews([]);
// //       setStats({ avg: 0, total: 0, breakdown: [] });
// //     }
// //     setLoading(false);
// //   }, [productId]);

// //   useEffect(() => { load(); }, [load]);

// //   const displayed = showAll ? reviews : reviews.slice(0, 3);

// //   return (
// //     <div style={{ background: CREAM, borderTop: "2px solid #e8ddd0", padding: isMobile ? "40px 20px" : "64px 40px" }}>
// //       <div style={{ maxWidth: 1400, margin: "0 auto" }}>

// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
// //           <div>
// //             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>VERIFIED BUYERS</div>
// //             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 3.5vw, 36px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>
// //               CUSTOMER REVIEWS
// //             </h2>
// //           </div>
// //           {user && (
// //             <button
// //               onClick={() => navigate(`#/review/${productId}`)}
// //               style={{
// //                 background: BRAND, color: "#fff", border: "none",
// //                 padding: "12px 24px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
// //                 letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
// //               }}
// //             >
// //               WRITE A REVIEW
// //             </button>
// //           )}
// //         </div>

// //         {loading ? (
// //           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING REVIEWS…</div>
// //         ) : (
// //           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", gap: isMobile ? 32 : 48, alignItems: "flex-start" }}>

// //             <div>
// //               {stats && stats.total > 0 ? (
// //                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24 }}>
// //                   <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ece4" }}>
// //                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 52, color: BLACK, lineHeight: 1 }}>
// //                       {stats.avg.toFixed(1)}
// //                     </div>
// //                     <div style={{ color: "#f5a623", fontSize: 20, letterSpacing: 3, margin: "6px 0" }}>
// //                       {"★".repeat(Math.round(stats.avg))}{"☆".repeat(5 - Math.round(stats.avg))}
// //                     </div>
// //                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>
// //                       Based on {stats.total} review{stats.total !== 1 ? "s" : ""}
// //                     </div>
// //                   </div>
// //                   {stats.breakdown.map(({ star, count }) => (
// //                     <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
// //                       <span style={{ fontSize: 10, fontFamily: ff, fontWeight: 900, color: "#888", minWidth: 28, textAlign: "right" }}>{star}★</span>
// //                       <div style={{ flex: 1, height: 6, background: "#f0ece4", overflow: "hidden" }}>
// //                         <div style={{ height: "100%", background: "#f5a623", width: stats.total > 0 ? `${(count / stats.total) * 100}%` : "0%", transition: "width 0.4s ease" }} />
// //                       </div>
// //                       <span style={{ fontSize: 10, fontFamily: mono, color: "#aaa", minWidth: 14 }}>{count}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24, textAlign: "center" }}>
// //                   <div style={{ fontSize: 32, marginBottom: 8 }}>☆</div>
// //                   <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, lineHeight: 1.7 }}>No reviews yet. Be the first!</div>
// //                   {user && (
// //                     <button
// //                       onClick={() => navigate(`#/review/${productId}`)}
// //                       style={{
// //                         marginTop: 14, background: BRAND, color: "#fff", border: "none",
// //                         padding: "10px 20px", fontSize: 10, fontWeight: 900,
// //                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// //                       }}
// //                     >
// //                       WRITE A REVIEW
// //                     </button>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             <div>
// //               {reviews.length === 0 ? (
// //                 <div style={{ padding: "32px 0", color: "#aaa", fontFamily: mono, fontSize: 13 }}>
// //                   No reviews yet for this product.
// //                 </div>
// //               ) : (
// //                 <>
// //                   {displayed.map((r, i) => (
// //                     <div key={r.reviewId || i} style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 22, marginBottom: 14 }}>
// //                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
// //                         <div>
// //                           <div style={{ color: "#f5a623", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>
// //                             {"★".repeat(Number(r.rating) || 0)}{"☆".repeat(5 - (Number(r.rating) || 0))}
// //                           </div>
// //                           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 12, color: BLACK, letterSpacing: "0.04em" }}>
// //                             {r.authorName || r.fullName || "Verified Buyer"}
// //                           </div>
// //                         </div>
// //                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
// //                           {(r.verifiedPurchase === true || r.verifiedPurchase === "TRUE" || r.verifiedPurchase === "true") && (
// //                             <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", background: "#eaf5ef", color: "#2a8a50", fontFamily: ff }}>
// //                               ✓ VERIFIED PURCHASE
// //                             </span>
// //                           )}
// //                           <span style={{ fontSize: 10, color: "#bbb", fontFamily: mono }}>
// //                             {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) : ""}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       {r.review && (
// //                         <p style={{ fontSize: 13, color: "#555", fontFamily: mono, margin: 0, lineHeight: 1.8 }}>
// //                           {r.review}
// //                         </p>
// //                       )}
// //                     </div>
// //                   ))}

// //                   {reviews.length > 3 && (
// //                     <button
// //                       onClick={() => setShowAll(v => !v)}
// //                       style={{
// //                         background: "none", border: `1.5px solid ${BLACK}`, color: BLACK,
// //                         padding: "11px 24px", fontSize: 11, fontWeight: 900,
// //                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer", marginTop: 8,
// //                       }}
// //                     >
// //                       {showAll ? `SHOW FEWER ↑` : `VIEW ALL ${reviews.length} REVIEWS ↓`}
// //                     </button>
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export const CollectionPage = CollectionsLandingPage;










































// // Complete file (the same structure as before, only shape filtering + HomePage modified)

// import { useState, useEffect, useCallback } from "react";
// import { PRODUCTS_DATA } from "../prodcut.js";
// import { BLACK, CREAM, ff, mono, COLLECTIONS,
//          HERO_SLIDES, HOME_PRODUCTS, TINTS, TESTIMONIALS, PROCESS_STEPS, CATEGORIES_HOME,
//          tagColors } from "../contants/store.js";
// import { applyProductFilters, getProductColorOptions, getProductBrandOptions, getProductSizeOptions, getProductDisplayPrice, getProductDiscountPercent, getRelatedProducts, getProductVariants, normalizeCategory, formatPriceValue, matchesSearchTerm } from "../services/productUtils.js";
// import { YBtn, OutlineBtn, FadeIn, Counter, Frame, ProductCard, ProductSlider, WishlistHeart, WishlistSkeleton } from "../components/shared";
// import { useCart } from "../contexts/CardContext";
// import { useAuth } from "../Auth/auth.jsx";
// import {
//   getWishlist, removeFromWishlist, getReviews, getAddresses,
//   submitReview, updateReview, getProductReviewStats, getUserReviews,
// } from "../services/service.js";

// const BRAND      = "#0c2c41";
// const BRAND_TEXT = "#ffffff";
// const NAVY = BRAND;

// // ============================================
// // RESPONSIVE HOOK
// // ============================================
// function useMediaQuery(query) {
//   const [matches, setMatches] = useState(false);
//   useEffect(() => {
//     const media = window.matchMedia(query);
//     if (media.matches !== matches) setMatches(media.matches);
//     const listener = () => setMatches(media.matches);
//     media.addEventListener("change", listener);
//     return () => media.removeEventListener("change", listener);
//   }, [query, matches]);
//   return matches;
// }

// // ============================================
// // SHARED VARIANT HELPERS
// // ============================================
// function normalizeVariantName(value) {
//   return String(value || "").trim().toLowerCase();
// }

// function getStoredVariantName(productId) {
//   try {
//     return localStorage.getItem(`product-color:${productId}`) || "";
//   } catch {
//     return "";
//   }
// }

// function setStoredVariantName(productId, name) {
//   try {
//     localStorage.setItem(`product-color:${productId}`, name);
//   } catch {
//     // ignore storage write failures
//   }
// }

// // ============================================
// // SHAPE HELPERS — single source of truth: product.js
// // ============================================
// // Resolves the shape value for a product. Some catalog entries may store the
// // shape under `shape`, others under `subcategory` — this keeps both working
// // consistently across the whole app (navbar + sidebar filter) without ever
// // hardcoding a fixed list anywhere in the UI.
// function getProductShape(product) {
//   return String(product?.shape || product?.subcategory || "").trim();
// }

// // Unique, alphabetically sorted list of shapes actually present in a given
// // product set (e.g. all products, or a collection's base products).
// function getUniqueShapesFromProducts(products) {
//   const shapes = new Set();
//   (products || []).forEach((p) => {
//     const shape = getProductShape(p);
//     if (shape) shapes.add(shape);
//   });
//   return Array.from(shapes).sort();
// }

// // ============================================
// // HELPER — Join raw wishlist rows with product details
// // ============================================
// function enrichWishlistItems(rawItems) {
//   return rawItems
//     .map(item => {
//       const product = PRODUCTS_DATA.find(p => String(p.id) === String(item.productId));
//       if (!product) return null;
//       return {
//         ...item,
//         product: {
//           name       : product.name,
//           price      : product.price,
//           salePrice  : product.discountPrice,
//           imageUrl   : product.gallery?.[0] || product.image || "",
//           color      : product.color,
//           subcategory: product.subcategory,
//           gender     : product.gender,
//         },
//       };
//     })
//     .filter(item => item !== null);
// }

// // ============================================
// // COLLECTIONS DATA
// // ============================================
// const COLLECTIONS_PAGE_DATA = [
//   { slug: "best-sellers", name: "Best Sellers", count: 24, desc: "The frames everyone's talking about.", tag: "MOST POPULAR", bg: BLACK, dark: true, shape: "round" },
//   { slug: "new-arrivals", name: "New Arrivals", count: 18, desc: "Fresh styles, just landed.", tag: "NEW", bg: BRAND, dark: false, shape: "square" },
//   { slug: "custom-tints", name: "Custom Made Tints™", count: 32, desc: "20+ hand-applied shades. Any frame.", tag: "EXCLUSIVE", bg: "#1a1a1a", dark: true, shape: "cateye" },
//   { slug: "reading-glasses", name: "Reading Glasses", count: 12, desc: "Crystal clear. Beautifully crafted.", tag: null, bg: CREAM, dark: false, shape: "round" },
//   { slug: "blue-light", name: "Blue Light Glasses", count: 15, desc: "Protect your eyes in the digital age.", tag: "DIGITAL RELIEF", bg: "#1a2a4a", dark: true, shape: "square" },
//   { slug: "mens-collection", name: "Men's Collection", count: 48, desc: "Bold frames for every face.", tag: null, bg: "#f5f5f5", dark: false, shape: "aviator" },
//   { slug: "womens-collection", name: "Women's Collection", count: 52, desc: "Refined eyewear for every occasion.", tag: null, bg: "#fdf4f4", dark: false, shape: "cateye" },
//   { slug: "limited-editions", name: "Limited Editions", count: 8, desc: "Before they're gone.", tag: "LIMITED", bg: "#2a1a3a", dark: true, shape: "round" },
//   { slug: "round", name: "Round Frames", count: 21, desc: "The timeless silhouette.", tag: null, bg: CREAM, dark: false, shape: "round" },
//   { slug: "square", name: "Square Frames", count: 19, desc: "Sharp. Structured. Striking.", tag: null, bg: "#f5f5f0", dark: false, shape: "square" },
// ];

// // ============================================
// // BREADCRUMB
// // ============================================
// function Breadcrumb({ crumbs }) {
//   return (
//     <nav aria-label="breadcrumb" style={{ background: CREAM, borderBottom: "1px solid #e8e0d0", padding: "12px 20px" }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
//         {crumbs.map((crumb, i) => (
//           <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             {i > 0 && <span style={{ color: "#bbb", fontSize: 10 }}>›</span>}
//             {crumb.path
//               ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
//               : <span aria-current="page" style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
//           </span>
//         ))}
//       </div>
//     </nav>
//   );
// }

// // ─────────────────────────────────────────────
// // SORT OPTIONS
// // ─────────────────────────────────────────────
// const SORT_OPTS = [
//   { key: "featured",    label: "Featured" },
//   { key: "relevant",    label: "Most relevant" },
//   { key: "bestSelling", label: "Best selling" },
//   { key: "alphaAZ",     label: "Alphabetically, A-Z" },
//   { key: "alphaZA",     label: "Alphabetically, Z-A" },
//   { key: "priceLow",    label: "Price, low to high" },
//   { key: "priceHigh",   label: "Price, high to low" },
//   { key: "dateNew",     label: "Date, new to old" },
//   { key: "dateOld",     label: "Date, old to new" },
// ];

// // ============================================
// // FILTER + SORT FUNCTIONS (UPDATED)
// // ============================================

// function applyFilters(products, activeFilters, sort, searchTerm = "") {
//   let filtered = products;

//   // 1. Apply search
//   if (searchTerm && searchTerm.trim()) {
//     const term = searchTerm.trim().toLowerCase();
//     filtered = filtered.filter(p =>
//       p.name.toLowerCase().includes(term) ||
//       (p.category && p.category.toLowerCase().includes(term)) ||
//       (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
//       (p.gender && p.gender.toLowerCase().includes(term))
//     );
//   }

//   // 2. Apply size filter (now using Small/Medium/Large categories)
//   if (activeFilters.size && activeFilters.size.length) {
//     filtered = filtered.filter(p =>
//       p.sizes && p.sizes.some(s =>
//         activeFilters.size.some(cat => s.includes(`(${cat})`))
//       )
//     );
//   }

//   // 3. Apply shape filter (dynamic — sourced from product.js via getProductShape)
//   if (activeFilters.shape && activeFilters.shape.length) {
//     filtered = filtered.filter(p => activeFilters.shape.includes(getProductShape(p)));
//   }

//   // 4. Remove size/shape from activeFilters so applyProductFilters doesn't filter them again
//   const otherFilters = { ...activeFilters };
//   delete otherFilters.size;
//   delete otherFilters.shape;

//   // 5. Apply all other filters (category, brand, price, rating, etc.) and sort
//   filtered = applyProductFilters(filtered, otherFilters, sort, "");

//   return filtered;
// }

// // NOTE: price parsing + free-text search matching now live in
// // ../services/productUtils.js (matchesSearchTerm / searchProducts) so the navbar
// // search box and this Products page share one implementation.

// // Build a "related products" list for a set of matched products. Pulls each
// // match's explicit relatedIds first, then fills with frames sharing the same
// // category / subcategory / gender. Excludes anything already on screen.
// function getRelatedForMatches(allProducts, matches, excludeIds = [], limit = 8) {
//   const exclude = new Set(excludeIds.map(String));
//   const picked = [];
//   const pushUnique = (p) => {
//     if (!p) return;
//     if (exclude.has(String(p.id))) return;
//     if (picked.some((x) => x.id === p.id)) return;
//     picked.push(p);
//   };

//   // 1. Explicit relatedIds from each matched product.
//   matches.forEach((m) => {
//     (m.relatedIds || []).forEach((rid) => pushUnique(allProducts.find((p) => p.id === rid)));
//   });

//   // 2. Same category / subcategory / gender as any match.
//   if (picked.length < limit) {
//     matches.forEach((m) => {
//       allProducts.forEach((p) => {
//         if (picked.length >= limit) return;
//         const sameCat = normalizeCategory(p.category) === normalizeCategory(m.category);
//         const sameSub = m.subcategory && p.subcategory && p.subcategory === m.subcategory;
//         const sameGender = m.gender && p.gender && p.gender.toLowerCase() === m.gender.toLowerCase();
//         if (sameCat || sameSub || sameGender) pushUnique(p);
//       });
//     });
//   }

//   return picked.slice(0, limit);
// }

// function sortProducts(arr, sort) {
//   const a = [...arr];
//   if (sort === "alphaAZ")   return a.sort((x, y) => x.name.localeCompare(y.name));
//   if (sort === "alphaZA")   return a.sort((x, y) => y.name.localeCompare(x.name));
//   if (sort === "priceLow")  return a.sort((x, y) => getProductDisplayPrice(x).discountPrice - getProductDisplayPrice(y).discountPrice);
//   if (sort === "priceHigh") return a.sort((x, y) => getProductDisplayPrice(y).discountPrice - getProductDisplayPrice(x).discountPrice);
//   if (sort === "dateNew")   return a.reverse();
//   return a;
// }

// // Define ShapeIcon component to avoid ReferenceError
// function ShapeIcon({ shape, active }) {
//   const color = active ? "#fff" : "#555";
//   // Known shape icons — any shape not listed here falls back to a generic
//   // circle glyph, so new shapes added in product.js render fine automatically.
//   const svgMap = {
//     "Round": <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Square": <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Aviator": <path d="M4 18 L12 6 L20 18 L16 18 L12 12 L8 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Cat-Eye": <path d="M6 8 L10 4 L18 6 L22 12 L18 18 L10 18 L4 14 Z" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Geometric": <polygon points="6,6 18,6 20,12 14,18 6,18 4,12" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Browline": <path d="M4 12 L8 8 L16 8 L20 12 L18 18 L6 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Rectangle": <rect x="3" y="6" width="18" height="12" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Oval": <ellipse cx="12" cy="12" rx="9" ry="7" stroke={color} strokeWidth="1.5" fill="none" />,
//     "Hexagon": <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" stroke={color} strokeWidth="1.5" fill="none" />,
//   };
//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       {svgMap[shape] || <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />}
//     </svg>
//   );
// }

// // ============================================
// // FILTER SIDEBAR (UPDATED — SHAPE IS NOW DYNAMIC)
// // ============================================

// function FilterSidebar({ allProducts, activeFilters, setActiveFilters, filtersOpen, isMobile, onClose }) {
//   const [open, setOpen] = useState({ category: true, color: true, brand: false, rating: false, price: true, size: false, availability: false });
//   if (!filtersOpen) return null;

//   const toggleSec = k => setOpen(s => ({ ...s, [k]: !s[k] }));
//   const toggle = (group, value) =>
//     setActiveFilters(prev => {
//       const cur = prev[group] || [];
//       return { ...prev, [group]: cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value] };
//     });
//   const isOn = (group, value) => (activeFilters[group] || []).includes(value);

//   const Section = ({ id, title, children }) => (
//     <div style={{ borderBottom: "1px solid #e8e0d0" }}>
//       <button onClick={() => toggleSec(id)} style={{
//         width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
//         padding: "14px 0", background: "none", border: "none", cursor: "pointer",
//         fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.14em", color: BLACK,
//       }}>
//         {title}
//         <span style={{ fontSize: 10, color: "#999", display: "block", transition: "transform 0.2s", transform: open[id] ? "rotate(180deg)" : "none" }}>▲</span>
//       </button>
//       {open[id] && <div style={{ paddingBottom: 14 }}>{children}</div>}
//     </div>
//   );

//   const Check = ({ group, value, label, count }) => {
//     const on = isOn(group, value);
//     return (
//       <label onClick={() => toggle(group, value)} style={{
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         gap: 8, padding: "5px 0", cursor: "pointer",
//         fontSize: 13, color: on ? BLACK : "#555", fontFamily: mono,
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
//           <div style={{
//             width: 15, height: 15, flexShrink: 0,
//             border: `1.5px solid ${on ? BRAND : "#ccc"}`,
//             background: on ? BRAND : "#fff",
//             display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
//           }}>
//             {on && <span style={{ color: BRAND_TEXT, fontSize: 9, lineHeight: 1 }}>✓</span>}
//           </div>
//           <span>{label}</span>
//         </div>
//         {count !== undefined && <span style={{ fontSize: 11, color: "#bbb", fontFamily: ff }}>({count})</span>}
//       </label>
//     );
//   };

//   const wrapStyle = isMobile
//     ? { position: "fixed", inset: 0, zIndex: 1000, background: "#fff", padding: "20px 16px 80px", overflowY: "auto" }
//     : { width: 210, flexShrink: 0, padding: "20px 20px 80px 0", borderRight: "1px solid #e8e0d0" };

//   // Define size categories and compute counts
//   const sizeCategories = ["Small", "Medium", "Large"];
//   const sizeCounts = sizeCategories.map(cat => ({
//     label: cat,
//     count: allProducts.filter(p =>
//       p.sizes && p.sizes.some(s => s.includes(`(${cat})`))
//     ).length
//   }));

//   // Shapes are pulled ONLY from the current product set (product.js) — no
//   // hardcoded list. Automatically picks up any new shape added to the catalog.
//   const dynamicShapes = getUniqueShapesFromProducts(allProducts);

//   return (
//     <div style={wrapStyle}>
//       {isMobile && (
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em" }}>FILTER</div>
//           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: BLACK, lineHeight: 1 }}>×</button>
//         </div>
//       )}

//       <Section id="shape" title="SHAPE">
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, paddingTop: 4 }}>
//           {dynamicShapes.map((shapeValue) => {
//             const count = allProducts.filter((product) => getProductShape(product) === shapeValue).length;
//             if (count === 0) return null;
//             const on = isOn("shape", shapeValue);
//             return (
//               <button key={shapeValue} onClick={() => toggle("shape", shapeValue)} style={{
//                 border: `1.5px solid ${on ? BRAND : "#ddd"}`,
//                 background: on ? BRAND : "#fff",
//                 padding: "10px 6px 8px", cursor: "pointer",
//                 display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.18s",
//               }}>
//                 <ShapeIcon shape={shapeValue} active={on} />
//                 <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", fontFamily: ff, color: on ? BRAND_TEXT : "#555" }}>
//                   {shapeValue.toUpperCase()}
//                 </span>
//                 <span style={{ fontSize: 9, color: on ? "rgba(255,255,255,0.6)" : "#aaa", fontFamily: mono }}>({count})</span>
//               </button>
//             );
//           })}
//           {dynamicShapes.length === 0 && (
//             <div style={{ fontSize: 11, color: "#aaa", fontFamily: mono, gridColumn: "1 / -1" }}>
//               No shapes available
//             </div>
//           )}
//         </div>
//       </Section>

//       <Section id="category" title="CATEGORY">
//         {Array.from(new Set(allProducts.map((product) => normalizeCategory(product.category || "Eyeglasses")).filter(Boolean))).map((value) => (
//           <Check key={value} group="category" value={value} label={value} count={allProducts.filter((product) => normalizeCategory(product.category || "Eyeglasses") === value).length} />
//         ))}
//       </Section>

//       <Section id="size" title="SIZE">
//         {sizeCounts.map(({ label, count }) => (
//           <Check
//             key={label}
//             group="size"
//             value={label}
//             label={label}
//             count={count}
//           />
//         ))}
//       </Section>

//       {/* Other sections (color, brand, rating, price) omitted for brevity but can be added back */}

//       {isMobile && (
//         <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#fff", borderTop: "1px solid #e8e0d0" }}>
//           <YBtn onClick={onClose} style={{ width: "100%", padding: "14px" }}>APPLY FILTERS</YBtn>
//         </div>
//       )}
//     </div>
//   );
// }

// const PRICE_LABELS = { under20: "Under 20K", "20to30": "20K–30K", above30: "Above 30K" };

// function FilterSortBar({ filtersOpen, toggleFilters, isMobile, sort, setSort, count, activeFilters, setActiveFilters }) {
//   const allActive = Object.entries(activeFilters).flatMap(([grp, vals]) => vals.map(v => ({ grp, v })));
//   const labelFor = (grp, v) => {
//     if (grp === "price") return PRICE_LABELS[v];
//     if (grp === "size") return v; // already Small/Medium/Large
//     if (grp === "shape") return v; // already the raw shape value from product.js
//     return v;
//   };

//   return (
//     <div style={{ background: "#fff", borderBottom: "1px solid #e8e0d0", position: "sticky", top: isMobile ? 56 : 62, zIndex: 20 }}>
//       <div style={{
//         maxWidth: 1400, margin: "0 auto", padding: "0 16px",
//         display: "flex", alignItems: "center", justifyContent: "space-between", height: 50,
//         flexWrap: "wrap",
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0, overflow: "hidden", flexWrap: "wrap" }}>
//           <button onClick={toggleFilters} style={{
//             background: "none", border: "none", cursor: "pointer",
//             display: "flex", alignItems: "center", gap: 8,
//             fontSize: 12, fontWeight: 900, letterSpacing: "0.12em",
//             color: BLACK, fontFamily: ff, padding: 0, whiteSpace: "nowrap", flexShrink: 0,
//           }}>
//             <svg width="17" height="13" viewBox="0 0 18 14" fill="none">
//               <line x1="0" y1="2"  x2="18" y2="2"  stroke="currentColor" strokeWidth="1.5"/>
//               <line x1="0" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
//               <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"/>
//               <circle cx="5"  cy="2"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
//               <circle cx="11" cy="7"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
//               <circle cx="7"  cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
//             </svg>
//             {filtersOpen ? "Hide Filter" : "Show Filter"}
//           </button>

//           {allActive.length > 0 && (
//             <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", overflow: "hidden" }}>
//               {allActive.slice(0, isMobile ? 2 : 6).map(({ grp, v }) => (
//                 <button key={`${grp}-${v}`}
//                   onClick={() => setActiveFilters(prev => ({ ...prev, [grp]: (prev[grp] || []).filter(x => x !== v) }))}
//                   style={{
//                     display: "flex", alignItems: "center", gap: 4,
//                     background: BRAND, color: BRAND_TEXT, border: "none",
//                     padding: "3px 8px 3px 9px", fontSize: 9, fontWeight: 900,
//                     letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap",
//                   }}>
//                   {labelFor(grp, v)} <span style={{ fontSize: 12, lineHeight: 1 }}>×</span>
//                 </button>
//               ))}
//               <button onClick={() => setActiveFilters({})} style={{
//                 background: "none", border: "none", fontSize: 10, color: "#999",
//                 cursor: "pointer", fontFamily: ff, fontWeight: 700, textDecoration: "underline", whiteSpace: "nowrap",
//               }}>Clear all</button>
//             </div>
//           )}
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
//           <span style={{ fontSize: 12, color: "#999", fontFamily: mono, whiteSpace: "nowrap" }}>{count} products</span>
//           <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             <span style={{ fontSize: 12, color: "#666", fontFamily: mono, display: isMobile ? "none" : "inline" }}>Sort by:</span>
//             <select value={sort} onChange={e => setSort(e.target.value)} style={{
//               background: "none", border: "1px solid #ddd", padding: "5px 8px",
//               fontSize: 12, color: BLACK, fontFamily: mono, cursor: "pointer", outline: "none",
//               maxWidth: isMobile ? "120px" : "auto",
//             }}>
//               {SORT_OPTS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============ COLLECTIONS LANDING PAGE ============
// export function CollectionsLandingPage({ navigate }) {
//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

//   return (
//     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
//       <div style={{ background: BLACK, padding: "72px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
//           <Frame shape="cateye" size={700} color="#fff" />
//         </div>
//         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
//           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }} />
//           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10 }}>URBAN EYE</div>
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", margin: "0 0 20px" }}>COLLECTIONS</h1>
//           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>Curated groups of frames for every occasion, face, and personality.</p>
//         </div>
//       </div>

//       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "COLLECTIONS", path: null }]} />

//       <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 20px 80px" }}>
//         <div style={{ marginBottom: 60 }}>
//           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>FEATURED</div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 3 }}>
//             {COLLECTIONS_PAGE_DATA.slice(0, 2).map((col, i) => (
//               <FadeIn key={col.slug} delay={i * 80}>
//                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 380, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 36, transition: "opacity 0.2s" }}
//                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.92"}
//                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
//                   <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }}>
//                     <Frame shape={col.shape} size={220} color={col.dark ? "#fff" : "#000"} />
//                   </div>
//                   {col.tag && <div style={{ position: "absolute", top: 20, left: 20, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "5px 12px", fontFamily: ff }}>{col.tag}</div>}
//                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 6 }}>{col.count} STYLES</div>
//                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: 32, color: col.dark ? "#fff" : BLACK, margin: "0 0 8px", letterSpacing: "0.02em" }}>{col.name.toUpperCase()}</h2>
//                   <p style={{ fontSize: 13, color: col.dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontFamily: mono, margin: "0 0 16px" }}>{col.desc}</p>
//                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1", fontFamily: ff }}>SHOP COLLECTION →</div>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         <div>
//           <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>ALL COLLECTIONS</div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
//             {COLLECTIONS_PAGE_DATA.slice(2).map((col, i) => (
//               <FadeIn key={col.slug} delay={i * 60}>
//                 <div onClick={() => navigate(`#/collections/${col.slug}`)} style={{ height: 260, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, transition: "opacity 0.2s" }}
//                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
//                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
//                   <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
//                     <Frame shape={col.shape} size={160} color={col.dark ? "#fff" : "#000"} />
//                   </div>
//                   {col.tag && <div style={{ position: "absolute", top: 14, left: 14, background: BRAND, color: BRAND_TEXT, fontSize: 8, fontWeight: 900, letterSpacing: "0.16em", padding: "4px 10px", fontFamily: ff }}>{col.tag}</div>}
//                   <div style={{ fontSize: 9, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginBottom: 4 }}>{col.count} STYLES</div>
//                   <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: 20, color: col.dark ? "#fff" : BLACK, margin: "0 0 6px" }}>{col.name.toUpperCase()}</h3>
//                   <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1" }}>EXPLORE →</div>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============ HOME PAGE (FIXED) ============
// export function HomePage({ navigate }) {
//   const [heroSlide, setHeroSlide] = useState(0);
//   const [filter, setFilter] = useState("All");
//   const [testimonialIdx, setTIdx] = useState(0);
//   const { addToCart } = useCart();
//   // Use all products for filtering, then slice to 8 for display
//   const allProducts = PRODUCTS_DATA;

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");

//   useEffect(() => {
//     const t = setInterval(() => setHeroSlide(i => (i + 1) % HERO_SLIDES.length), 6000);
//     return () => clearInterval(t);
//   }, []);
//   useEffect(() => {
//     const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
//     return () => clearInterval(t);
//   }, []);

//   const slide = HERO_SLIDES[heroSlide];
//   const FILTERS = ["All", "Eyeglasses", "Sunglasses"];
//   // Apply filter first, then take first 8
//   const filtered = filter === "All"
//     ? allProducts.slice(0, 8)
//     : allProducts.filter(p => p.category === (filter === "Eyeglasses" ? "Optical" : "Sunglass")).slice(0, 8);

//   const HomeProductCard = ({ product }) => {
//     const [hov, setHov] = useState(false);
//     const [addedMsg, setAddedMsg] = useState(false);
//     const { price, discountPrice } = getProductDisplayPrice(product);
//     const discount = getProductDiscountPercent(product);
//     const variants = getProductVariants(product);

//     const [selectedVariantName, setSelectedVariantName] = useState(() => {
//       const stored = getStoredVariantName(product?.id);
//       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
//       return match ? match.name : (variants[0]?.name || "");
//     });

//     useEffect(() => {
//       const stored = getStoredVariantName(product?.id);
//       const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
//       const nextName = match ? match.name : (variants[0]?.name || "");
//       setSelectedVariantName(nextName);
//     }, [product?.id, variants.length]);

//     const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
//     const displayImage = selectedVariant?.image || product.image || "";

//     const handleSelectColor = (variant, e) => {
//       e.stopPropagation();
//       setSelectedVariantName(variant.name);
//       setStoredVariantName(product.id, variant.name);
//     };

//     return (
//       <div
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//         onClick={() => navigate(`#/products/${product.id}`)}
//         onKeyDown={(event) => {
//           if (event.key === "Enter" || event.key === " ") {
//             event.preventDefault();
//             navigate(`#/products/${product.id}`);
//           }
//         }}
//         role="button"
//         tabIndex={0}
//         style={{
//           background: "#fff",
//           border: "1.5px solid #e5e0d8",
//           position: "relative",
//           cursor: "pointer",
//           transition: "box-shadow 0.3s, transform 0.3s",
//           boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
//           transform: hov ? "translateY(-3px)" : "none"
//         }}
//       >
//         {discount > 0 && !product.tag && (
//           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 8px" }}>−{discount}%</div>
//         )}
//         {product.tag && (
//           <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BLACK, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "4px 10px" }}>{product.tag}</div>
//         )}

//         <WishlistHeart productId={product.id} size="md" placement="card" />

//         <div style={{ height: isMobile ? 140 : 190, display: "flex", alignItems: "center", justifyContent: "center", background: hov ? CREAM : "#FAFAF5", transition: "background 0.3s", position: "relative" }}>
//           {displayImage ? (
//             <img src={displayImage} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 18, transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s" }} />
//           ) : (
//             <Frame shape="round" size={130} color={hov ? BRAND : "#4a4a4a"} />
//           )}

//           {variants.length > 1 && (
//             <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 8, zIndex: 3 }}>
//               {variants.map((variant) => {
//                 const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
//                 return (
//                   <button
//                     key={variant.name}
//                     onClick={(e) => handleSelectColor(variant, e)}
//                     title={variant.name}
//                     style={{
//                       width: 28,
//                       height: 28,
//                       borderRadius: "50%",
//                       border: active ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.1)",
//                       background: variant.swatch || "#d9d9d9",
//                       cursor: "pointer",
//                       padding: 0,
//                       boxShadow: active ? "0 0 0 2px rgba(12,44,65,0.12)" : "none",
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           )}
//         </div>
//         <div style={{ padding: "6px 14px 14px" }}>
//           <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.14em", marginBottom: 2 }}>{(product.category || "Eyeglasses").toUpperCase()}</div>
//           <div style={{ fontFamily: ff, fontSize: isMobile ? 14 : 16, fontWeight: 900, letterSpacing: "0.05em", color: BLACK, marginBottom: 10 }}>
//             {product.name}
//           </div>
//           <div style={{ fontSize: 12, color: "#666", fontFamily: mono, marginBottom: 10, minHeight: 36 }}>{product.shortDescription || product.description?.slice(0, 80)}</div>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <div style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>PKR {discountPrice.toLocaleString()}</div>
//             <button
//               onClick={(e) => { e.stopPropagation(); addToCart(product, 1); setAddedMsg(true); setTimeout(() => setAddedMsg(false), 1800); }}
//               style={{
//                 border: `1.5px solid ${BRAND}`,
//                 padding: "7px 16px",
//                 fontSize: 10,
//                 fontWeight: 900,
//                 letterSpacing: "0.12em",
//                 cursor: "pointer",
//                 background: addedMsg ? "#16a34a" : hov ? BRAND : "transparent",
//                 color: addedMsg ? "#fff" : hov ? BRAND_TEXT : BRAND,
//                 transition: "all 0.22s"
//               }}
//             >
//               {addedMsg ? "✓ ADDED" : hov ? "ADD TO BAG" : "SELECT"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={{ color: BLACK }}>
//       {/* HERO */}
//       <section
//         style={{
//           minHeight: isMobile ? "60vh" : "88vh",
//           backgroundImage: `url(${slide.image})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//           overflow: "hidden",
//           transition: "background-image 1.1s ease",
//         }}
//       >
//         <div style={{
//           position: "absolute",
//           inset: 0,
//           background: slide.dark
//             ? "rgba(0,0,0,0.55)"
//             : "rgba(255,255,255,0.25)",
//           zIndex: 0,
//         }} />

//         <div style={{
//           maxWidth: 1200,
//           margin: "0 auto",
//           padding: isMobile ? "40px 20px" : "80px 40px",
//           display: "grid",
//           gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
//           gap: isMobile ? 40 : 80,
//           alignItems: "center",
//           width: "100%",
//           position: "relative",
//           zIndex: 1,
//         }}>
//           <div>
//             <div style={{
//               display: "inline-block",
//               fontSize: 10,
//               letterSpacing: "0.2em",
//               border: `1px solid ${slide.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
//               color: slide.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
//               padding: "5px 14px",
//               marginBottom: 24
//             }}>
//               {slide.label}
//             </div>
//             <h1 style={{
//               fontWeight: 900,
//               fontSize: isMobile ? "clamp(40px, 12vw, 60px)" : "clamp(54px, 8vw, 108px)",
//               lineHeight: 0.92,
//               margin: "0 0 20px",
//               color: slide.dark ? "#fff" : BLACK,
//               letterSpacing: "0.01em",
//               whiteSpace: "pre-line"
//             }}>
//               {slide.heading}
//             </h1>
//             <p style={{
//               fontSize: isMobile ? 14 : 15,
//               lineHeight: 1.8,
//               maxWidth: 400,
//               margin: "0 0 36px",
//               color: slide.dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
//               fontFamily: mono
//             }}>
//               {slide.sub}
//             </p>
//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//               <button onClick={() => navigate("#/products")} style={{ background: BRAND, color: "#fff", border: "none", padding: "12px 24px", fontSize: isMobile ? 13 : 15, cursor: "pointer" }}>
//                 SHOP NOW
//               </button>
//               <OutlineBtn dark={!!slide.dark}>{slide.ctaSecond} →</OutlineBtn>
//             </div>
//           </div>
//           <div />
//         </div>

//         <div style={{
//           position: "absolute",
//           bottom: 28,
//           left: "50%",
//           transform: "translateX(-50%)",
//           display: "flex",
//           gap: 10,
//           zIndex: 2,
//         }}>
//           {HERO_SLIDES.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setHeroSlide(i)}
//               style={{
//                 height: 3,
//                 border: "none",
//                 cursor: "pointer",
//                 borderRadius: 0,
//                 background: i === heroSlide ? BRAND : slide.dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
//                 width: i === heroSlide ? 32 : 10,
//                 transition: "all 0.35s"
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* STATS */}
//       <section style={{ background: BLACK, padding: isMobile ? "32px 20px" : "56px 40px" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 16 : 0 }}>
//           {[{ v: 150, s: "+", l: "Frame Styles" }, { v: 10, s: "+", l: "Years in Karachi" }, { v: 8500, s: "+", l: "Happy Customers" }, { v: 99, s: "%", l: "Satisfaction Rate" }].map((st, i) => (
//             <FadeIn key={st.l} delay={i * 100} style={{ textAlign: "center", padding: "16px 0", borderRight: (i < 3 && !isMobile) ? "1px solid #1e1e1e" : "none" }}>
//               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(40px,5vw,64px)", color: BRAND, lineHeight: 1 }}><Counter target={st.v} suffix={st.s}/></div>
//               <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginTop: 8 }}>{st.l.toUpperCase()}</div>
//             </FadeIn>
//           ))}
//         </div>
//       </section>

//       {/* HERITAGE QUOTE */}
//       <section style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center", borderBottom: "2px solid #e8ddd0" }}>
//         <FadeIn>
//           <div style={{ maxWidth: 680, margin: "0 auto" }}>
//             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 28px" }}/>
//             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 18 }}>EYE-CONIC EYEWEAR, SINCE 2015</div>
//             <blockquote style={{ fontFamily: mono, fontSize: isMobile ? "clamp(16px, 5vw, 22px)" : "clamp(18px, 2.8vw, 28px)", lineHeight: 1.5, color: BLACK, margin: "0 0 20px", fontStyle: "italic" }}>"For over a decade, our name has been on the front door. That means something."</blockquote>
//             <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#666", fontFamily: ff }}>TARIQ HASSAN · FOUNDER, URBAN EYE</div>
//             <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
//               <a href="#/story" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>OUR STORY</a>
//               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", borderBottom: "2px solid #ddd", paddingBottom: 2 }}>SHOP EYEGLASSES</a>
//             </div>
//           </div>
//         </FadeIn>
//       </section>

//       {/* CATEGORIES */}
//       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#fff" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <FadeIn>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
//               <div>
//                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>BROWSE</div>
//                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>SHOP BY CATEGORY</h2>
//               </div>
//               <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: "#888", textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>VIEW ALL →</a>
//             </div>
//           </FadeIn>
//           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 2 }}>
//             {CATEGORIES_HOME.map((cat, i) => (
//               <FadeIn key={cat.label} delay={i * 80}>
//                 <div onClick={() => navigate(`#/collections/${cat.slug}`)} style={{ minHeight: isMobile ? 220 : 330, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 16 : 28, cursor: "pointer", position: "relative", overflow: "hidden", background: cat.dark ? BLACK : CREAM, color: cat.dark ? "#fff" : BLACK }}>
//                   <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: BRAND }}/>
//                   <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
//                     <Frame shape={cat.shape} size={isMobile ? 120 : 190} color={cat.dark ? "#fff" : "#000"}/>
//                   </div>
//                   <div style={{ fontSize: 10, letterSpacing: "0.16em", marginBottom: 6, opacity: 0.5 }}>{cat.count.toUpperCase()}</div>
//                   <div style={{ fontFamily: ff, fontSize: isMobile ? 16 : 20, fontWeight: 900, letterSpacing: "0.04em" }}>{cat.label.toUpperCase()}</div>
//                   <div style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 12, color: cat.dark ? "#89c4e1" : BRAND, fontWeight: 900 }}>SHOP NOW →</div>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* BEST SELLERS - FIXED: filter from all products, then slice */}
//       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#FAFAF5" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <FadeIn>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
//               <div>
//                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>HANDPICKED</div>
//                 <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>BEST SELLERS</h2>
//               </div>
//               <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 {FILTERS.map(f => (
//                   <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", fontSize: isMobile ? 8 : 10, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", border: `1.5px solid ${filter === f ? BRAND : "#ddd"}`, background: filter === f ? BRAND : "transparent", color: filter === f ? BRAND_TEXT : "#888", fontFamily: ff, transition: "all 0.2s" }}>{f.toUpperCase()}</button>
//                 ))}
//               </div>
//             </div>
//           </FadeIn>
//           <ProductSlider products={filtered} navigate={navigate} isMobile={isMobile} />
//           <FadeIn delay={280}>
//             <div style={{ textAlign: "center", marginTop: 44 }}>
//               {/* FIX: navigate to Products page instead of Collections */}
//               <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>VIEW ALL FRAMES</YBtn>
//             </div>
//           </FadeIn>
//         </div>
//       </section>

//       {/* CUSTOM TINTS (active version) */}
//       <section style={{ background: CREAM, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "2px solid #e8ddd0", borderBottom: "2px solid #e8ddd0" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
//           <Frame shape="cateye" size={isMobile ? 400 : 900} color={BLACK}/>
//         </div>
//         <FadeIn>
//           <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
//             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
//             <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#888", marginBottom: 12 }}>EXCLUSIVE TO URBAN EYE</div>
//             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BLACK, lineHeight: 0.92, margin: "0 0 6px" }}>CUSTOM MADE</h2>
//             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BRAND, lineHeight: 0.92, margin: "0 0 28px" }}>TINTS™</h2>
//             <p style={{ fontSize: isMobile ? 13 : 15, color: "#666", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontFamily: mono }}>Choose any frame. Choose any tint. Our opticians hand-apply your chosen colour — 20+ shades to make it yours.</p>
//             <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
//               {TINTS.map(t => (
//                 <div key={t.name} title={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
//                   <div style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: "50%", background: t.color, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}/>
//                   <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#999", fontFamily: ff }}>{t.name}</span>
//                 </div>
//               ))}
//               <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#999", marginLeft: 8 }}>+12 more</div>
//             </div>
//             <YBtn onClick={() => navigate("#/collections/custom-made-tints")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>SHOP CUSTOM TINTS™</YBtn>
//           </div>
//         </FadeIn>
//       </section>

//       {/* HOW IT WORKS */}
//       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: BLACK }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <FadeIn>
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
//               <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#444", marginBottom: 10 }}>HOW IT WORKS</div>
//               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,48px)", color: "#fff", margin: 0 }}>FROM BROWSE TO DELIVERED</h2>
//             </div>
//           </FadeIn>
//           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: 28, position: "relative" }}>
//             {!isMobile && <div style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 1, background: "#1e1e1e" }}/>}
//             {PROCESS_STEPS.map((step, i) => (
//               <FadeIn key={step.num} delay={i * 90}>
//                 <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
//                   <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${BRAND}`, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: ff, fontSize: 15, fontWeight: 900, color: "#89c4e1" }}>{step.num}</div>
//                   <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.08em", marginBottom: 8 }}>{step.title}</div>
//                   <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, fontFamily: mono }}>{step.desc}</div>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: CREAM }}>
//         <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
//           <FadeIn>
//             <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
//             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>REVIEWS</div>
//             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", marginBottom: 52, letterSpacing: "0.02em" }}>WHAT OUR CUSTOMERS SAY</h2>
//             <div style={{ position: "relative", minHeight: isMobile ? 280 : 200 }}>
//               {TESTIMONIALS.map((t, i) => (
//                 <div key={t.name} style={{ position: "absolute", inset: 0, opacity: i === testimonialIdx ? 1 : 0, transform: i === testimonialIdx ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s ease", pointerEvents: i === testimonialIdx ? "auto" : "none" }}>
//                   <div style={{ fontSize: 20, color: BRAND, marginBottom: 18, letterSpacing: 4 }}>{"★".repeat(t.rating)}</div>
//                   <blockquote style={{ fontFamily: mono, fontStyle: "italic", lineHeight: 1.65, fontSize: isMobile ? "clamp(14px, 4vw, 18px)" : "clamp(15px,2.2vw,20px)", color: BLACK, margin: "0 0 24px" }}>"{t.text}"</blockquote>
//                   <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em" }}>{t.name}</div>
//                   <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.1em", marginTop: 4 }}>{t.city}</div>
//                 </div>
//               ))}
//             </div>
//             <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: isMobile ? 280 : 210 }}>
//               {TESTIMONIALS.map((_, i) => (
//                 <button key={i} onClick={() => setTIdx(i)} style={{ height: 3, border: "none", cursor: "pointer", background: i === testimonialIdx ? BRAND : "#ccc", width: i === testimonialIdx ? 28 : 10, transition: "all 0.35s" }}/>
//               ))}
//             </div>
//           </FadeIn>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section style={{ background: BLACK, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
//           <Frame shape="aviator" size={isMobile ? 400 : 1000} color="#fff"/>
//         </div>
//         <FadeIn>
//           <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
//           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#444", marginBottom: 14 }}>START YOUR JOURNEY</div>
//           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#fff", lineHeight: 0.92, margin: "0 0 8px" }}>FIND YOUR</h2>
//           <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#89c4e1", lineHeight: 0.92, margin: "0 0 28px" }}>FRAME.</h2>
//           <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.35)", maxWidth: 420, margin: "0 auto 44px", lineHeight: 1.85, fontFamily: mono }}>150+ premium frames. Expert fitting. Free shipping across Pakistan.</p>
//           <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
//             <YBtn onClick={() => navigate("#/collections/eyeglasses")} style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>SHOP ALL FRAMES</YBtn>
//             <OutlineBtn dark style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>VIRTUAL TRY-ON →</OutlineBtn>
//           </div>
//         </FadeIn>
//       </section>

//       <style>{`@keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.5; } 50% { transform:scale(1.07); opacity:0.9; } }`}</style>
//     </div>
//   );
// }

// // ============ PRODUCTS PAGE ============
// export function ProductsPage({ navigate, queryParams }) {
//   const buildFiltersFromQuery = (qp) => {
//     if (!qp) return {};
//     const result = {};
//     if (qp.category) result.category = [qp.category];
//     if (qp.shape)     result.shape    = [qp.shape];
//     if (qp.gender)    result.gender   = [qp.gender];
//     if (qp.tag)       result.tag      = [qp.tag];
//     if (qp.price)     result.price    = [qp.price];
//     return result;
//   };

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");

//   const [activeFilters, setActiveFilters] = useState(() => buildFiltersFromQuery(queryParams));
//   const [sort, setSort] = useState("featured");
//   const [filtersOpen, setFiltersOpen] = useState(() => !window.matchMedia("(max-width: 767px)").matches);
//   // `?q=` comes from the navbar search — seed the on-page search box with it.
//   const [searchTerm, setSearchTerm] = useState(() => queryParams?.q || "");

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     setActiveFilters(buildFiltersFromQuery(queryParams));
//     setSearchTerm(queryParams?.q || "");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [JSON.stringify(queryParams)]);

//   // Local filter function using the updated size + shape logic
//   const applyFiltersLocal = (products, activeFilters, sort, searchTerm) => {
//     let filtered = products;

//     // 1. Apply search (matches name, category, color, tag — and price, e.g.
//     //    "8000", "under 10000", "8k-12k")
//     if (searchTerm && searchTerm.trim()) {
//       filtered = filtered.filter(p => matchesSearchTerm(p, searchTerm));
//     }

//     // 2. Apply size filter (Small/Medium/Large categories)
//     if (activeFilters.size && activeFilters.size.length) {
//       filtered = filtered.filter(p =>
//         p.sizes && p.sizes.some(s =>
//           activeFilters.size.some(cat => s.includes(`(${cat})`))
//         )
//       );
//     }

//     // 3. Apply shape filter — dynamic, sourced only from product.js
//     if (activeFilters.shape && activeFilters.shape.length) {
//       filtered = filtered.filter(p => activeFilters.shape.includes(getProductShape(p)));
//     }

//     // 4. Remove size/shape from activeFilters for the utility function
//     const otherFilters = { ...activeFilters };
//     delete otherFilters.size;
//     delete otherFilters.shape;

//     // 5. Apply all other filters and sort
//     filtered = applyProductFilters(filtered, otherFilters, sort, "");

//     return filtered;
//   };

//   const filtered = applyFiltersLocal(PRODUCTS_DATA, activeFilters, sort, searchTerm);
//   let cols = 4;
//   if (isMobile) cols = 1;
//   else if (isTablet) cols = 2;
//   else cols = filtersOpen ? 3 : 4;

//   // Related products to surface alongside a search. When there are matches we
//   // relate to them; when nothing matched we suggest a few popular frames so the
//   // page never dead-ends on an empty result.
//   const searchActive = searchTerm.trim().length > 0;
//   const relatedLimit = isMobile ? 4 : 8;
//   let relatedProducts = [];
//   if (searchActive) {
//     if (filtered.length) {
//       relatedProducts = getRelatedForMatches(PRODUCTS_DATA, filtered, filtered.map(p => p.id), relatedLimit);
//     } else {
//       relatedProducts = PRODUCTS_DATA.filter(p => p.tag).slice(0, relatedLimit);
//       if (!relatedProducts.length) relatedProducts = PRODUCTS_DATA.slice(0, relatedLimit);
//     }
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
//       <div style={{ background: BLACK, padding: isMobile ? "48px 20px" : "72px 40px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
//           <Frame shape="round" size={isMobile ? 400 : 700} color="#fff"/>
//         </div>
//         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
//           <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
//           <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10, fontFamily: ff }}>URBAN EYE · ALL FRAMES</div>
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: "0 0 20px" }}>THE COLLECTION</h1>
//           <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>{PRODUCTS_DATA.length} frames. Each handpicked. All obsessively crafted.</p>
//           <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
//             <div style={{ display: "flex", width: "min(520px, 100%)", background: "#fff", overflow: "hidden" }}>
//               <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, price, or keyword — e.g. “Alex” or “under 8000”" style={{ flex: 1, minWidth: 0, border: "none", padding: "12px 16px", fontSize: 13, fontFamily: mono, outline: "none" }} />
//               {searchActive && (
//                 <button onClick={() => setSearchTerm("")} aria-label="Clear search" style={{ border: "none", background: BRAND, color: BRAND_TEXT, padding: "0 16px", fontFamily: ff, fontWeight: 900, fontSize: 14, cursor: "pointer" }}>✕</button>
//               )}
//             </div>
//           </div>
//           {searchActive && (
//             <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: mono, letterSpacing: "0.04em" }}>
//               {filtered.length} {filtered.length === 1 ? "frame" : "frames"} found for “{searchTerm.trim()}”
//             </div>
//           )}
//         </div>
//       </div>

//       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => setFiltersOpen(v => !v)} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

//       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
//         <FilterSidebar allProducts={PRODUCTS_DATA} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
//         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
//           {filtered.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: mono }}>
//               {searchActive
//                 ? `No frames match “${searchTerm.trim()}”.${relatedProducts.length ? " Here are some you might like instead:" : ""}`
//                 : "No frames match the current filters."}
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "75%" : `repeat(${cols}, 1fr)`, justifyContent: isMobile ? "center" : "stretch", gap: isMobile ? 12 : 20, transition: "grid-template-columns 0.3s" }}>
//               {filtered.map((p, i) => (
//                 <FadeIn key={p.id} delay={Math.min(i * 40, 400)}>
//                   <ProductCard product={p} navigate={navigate} />
//                 </FadeIn>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {searchActive && relatedProducts.length > 0 && (
//         <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 12px 60px" : "0 24px 80px" }}>
//           <div style={{ borderTop: "1px solid #e8e0d0", paddingTop: isMobile ? 28 : 40 }}>
//             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>
//               {filtered.length ? "YOU MAY ALSO LIKE" : "POPULAR PICKS"}
//             </div>
//             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(22px, 3vw, 34px)", margin: "0 0 24px", letterSpacing: "0.02em", color: BLACK }}>
//               RELATED FRAMES
//             </h2>
//             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 12 : 20 }}>
//               {relatedProducts.map((p, i) => (
//                 <FadeIn key={p.id} delay={Math.min(i * 60, 360)}>
//                   <ProductCard product={p} navigate={navigate} />
//                 </FadeIn>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ============ COLLECTION DETAIL PAGE ============
// export function CollectionDetailPage({ slug, navigate }) {
//   const col = COLLECTIONS[slug] || COLLECTIONS["default"];
//   const baseProducts = PRODUCTS_DATA.filter(col.filter);
//   const [activeFilters, setActiveFilters] = useState({});
//   const [sort, setSort] = useState("featured");
//   const [filtersOpen, setFiltersOpen] = useState(() => {
//     if (window.matchMedia("(max-width: 767px)").matches) return false;
//     try { return JSON.parse(localStorage.getItem("os_filters_open") ?? "true"); } catch { return true; }
//   });
//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");

//   useEffect(() => {
//     const fn = () => {};
//     window.addEventListener("resize", fn);
//     return () => window.removeEventListener("resize", fn);
//   }, []);
//   useEffect(() => { localStorage.setItem("os_filters_open", JSON.stringify(filtersOpen)); }, [filtersOpen]);
//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveFilters({}); }, [slug]);

//   // Local filter function with updated size + shape logic
//   const applyFiltersLocal = (products, activeFilters, sort) => {
//     let filtered = products;

//     // 1. Apply size filter (Small/Medium/Large categories)
//     if (activeFilters.size && activeFilters.size.length) {
//       filtered = filtered.filter(p =>
//         p.sizes && p.sizes.some(s =>
//           activeFilters.size.some(cat => s.includes(`(${cat})`))
//         )
//       );
//     }

//     // 2. Apply shape filter — dynamic, sourced only from product.js
//     if (activeFilters.shape && activeFilters.shape.length) {
//       filtered = filtered.filter(p => activeFilters.shape.includes(getProductShape(p)));
//     }

//     // 3. Remove size/shape from activeFilters for utility
//     const otherFilters = { ...activeFilters };
//     delete otherFilters.size;
//     delete otherFilters.shape;

//     // 4. Apply other filters and sort
//     filtered = applyProductFilters(filtered, otherFilters, sort, "");

//     return filtered;
//   };

//   const filtered = applyFiltersLocal(baseProducts, activeFilters, sort);
//   let cols = 4;
//   if (isMobile) cols = 1;
//   else if (isTablet) cols = 2;
//   else cols = filtersOpen ? 3 : 4;

//   return (
//     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
//       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
//           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
//         </div>
//         <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
//           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
//           <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginBottom: 12, fontFamily: ff }}>
//             <a href="#/" style={{ color: "#555", textDecoration: "none" }}>HOME</a>
//             <span style={{ margin: "0 8px", color: "#333" }}>›</span>
//             <span style={{ color: "#aaa" }}>{col.title}</span>
//           </div>
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 6vw, 72px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 16px" }}>{col.title}</h1>
//           <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>{col.desc}</p>
//         </div>
//       </div>

//       <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => { isMobile ? setFiltersOpen(true) : setFiltersOpen(v => !v); }} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

//       <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
//         <FilterSidebar allProducts={baseProducts} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
//         <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
//           {filtered.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "80px 0" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
//               <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 22, color: BLACK, marginBottom: 10, letterSpacing: "0.04em" }}>NO FRAMES FOUND</div>
//               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 28 }}>Try adjusting your filters.</div>
//               <button onClick={() => setActiveFilters({})} style={{ background: BLACK, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff }}>CLEAR FILTERS</button>
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "75%" : `repeat(${cols}, 1fr)`, justifyContent: isMobile ? "center" : "stretch", gap: isMobile ? 12 : 16, transition: "grid-template-columns 0.35s ease" }}>
//               {filtered.map((p, i) => (
//                 <FadeIn key={p.id} delay={Math.min(i * 35, 300)}>
//                   <ProductCard product={p} navigate={navigate} />
//                 </FadeIn>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============ PRODUCT DETAIL PAGE ============
// export function ProductDetailPage({ productId, navigate }) {
//   const product = PRODUCTS_DATA.find(p => p.id === productId);
//   const [activeImg, setActiveImg] = useState(0);
//   const [qty, setQty] = useState(1);
//   const [added, setAdded] = useState(false);
//   const [openTab, setOpenTab] = useState("details");
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedVariantName, setSelectedVariantName] = useState("");
//   const { addToCart } = useCart();

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setActiveImg(0); setAdded(false); setSelectedSize(null);
//   }, [productId]);

//   useEffect(() => {
//     if (!product) return;
//     const variants = getProductVariants(product);
//     const stored = getStoredVariantName(product.id);
//     const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
//     const nextName = match ? match.name : variants[0]?.name || "";
//     setSelectedVariantName(nextName);
//     setActiveImg(0);
//   }, [product?.id]);

//   if (!product) return (
//     <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
//       <div style={{ fontSize: 48, fontWeight: 900, color: BLACK, marginBottom: 16 }}>404</div>
//       <div style={{ fontSize: 14, color: "#888", fontFamily: mono, marginBottom: 28 }}>Frame not found.</div>
//       <YBtn onClick={() => navigate("#/products")}>← BACK TO COLLECTION</YBtn>
//     </div>
//   );

//   const related = getRelatedProducts(PRODUCTS_DATA, product);
//   const { price, discountPrice } = getProductDisplayPrice(product);
//   const discount = getProductDiscountPercent(product);
//   const tc = product.tag ? tagColors[product.tag] : null;
//   const sizes = product.sizes?.length ? product.sizes : ["44 (Narrow)", "46 (Average)", "49 (Wide)", "52 (Extra Wide)"];
//   const variants = getProductVariants(product);
//   const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
//   const galleryImages = selectedVariant?.gallery?.length
//     ? selectedVariant.gallery
//     : (product.gallery?.length ? product.gallery : (selectedVariant?.image ? [selectedVariant.image] : []));
//   const displayImage = galleryImages[activeImg] || selectedVariant?.image || product.image || "";
//   const displayLabel = selectedVariant?.name || product.color || "Default";

//   const handleSelectVariant = (variant) => {
//     setSelectedVariantName(variant.name);
//     setStoredVariantName(product.id, variant.name);
//     setActiveImg(0);
//   };

//   const AccordionItem = ({ id, label, children }) => {
//     const isOpen = openTab === id;
//     return (
//       <div style={{ borderBottom: "1px solid #e8e0d0" }}>
//         <button onClick={() => setOpenTab(isOpen ? null : id)} style={{ width: "100%", background: "none", border: "none", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: ff, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textAlign: "left" }}>
//           {label}
//           <span style={{ fontSize: 22, fontWeight: 300, lineHeight: 1, color: BLACK }}>{isOpen ? "−" : "+"}</span>
//         </button>
//         {isOpen && <div style={{ paddingBottom: 20 }}>{children}</div>}
//       </div>
//     );
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: ff }}>
//       <div style={{ borderBottom: "1px solid #e8e0d0", padding: "13px 20px" }}>
//         <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
//           {[{ label: "HOME", path: "#/" }, { label: "COLLECTION", path: "#/products" }, { label: product.name.toUpperCase(), path: null }].map((crumb, i) => (
//             <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               {i > 0 && <span style={{ color: "#ccc", fontSize: 10 }}>›</span>}
//               {crumb.path ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
//                 : <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px 60px" : "0 40px 80px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: (isMobile || isTablet) ? "1fr" : "70% 30%", gap: 0, alignItems: "flex-start" }}>
//           <FadeIn>
//             <div style={{ paddingRight: (isMobile || isTablet) ? 0 : 72 }}>
//               <div style={{ position: "relative", overflow: "hidden", background: CREAM, marginBottom: 10, height: isMobile ? "50vh" : "calc(100vh - 110px)", minHeight: isMobile ? 300 : 560, maxHeight: isMobile ? 400 : 740, border: "1px solid #e8e0d0", boxSizing: "border-box", padding: isMobile ? "20px" : "64px 80px" }}>
//                 {product.tag && tc && (
//                   <div style={{ position: "absolute", top: 20, left: 20, zIndex: 3, background: tc.bg, color: tc.color, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", padding: "6px 14px", fontFamily: ff }}>{product.tag}</div>
//                 )}
//                 {discount > 0 && (
//                   <div style={{ position: "absolute", top: 20, right: 20, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "5px 12px", fontFamily: ff }}>−{discount}% OFF</div>
//                 )}
//                 <div style={{ width: "100%", height: "100%", border: "1.5px solid #d8cfc0", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
//                   <img key={`${product.id}-${activeImg}-${displayLabel}`} src={`${displayImage}`} alt={`${product.name} - ${displayLabel}`} loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 12 : 24, animation: "fadeImgIn 0.35s ease", boxSizing: "border-box" }} />
//                 </div>
//               </div>
//               {galleryImages.length > 1 && (
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   {galleryImages.map((img, i) => (
//                     <div key={`${product.id}-${i}`} onClick={() => setActiveImg(i)} style={{ width: isMobile ? 64 : isTablet ? 80 : 100, height: isMobile ? 54 : isTablet ? 64 : 76, overflow: "hidden", cursor: "pointer", background: CREAM, flexShrink: 0, border: i === activeImg ? `2px solid ${BLACK}` : "1px solid #e8e0d0", opacity: i === activeImg ? 1 : 0.45, transition: "border-color 0.15s, opacity 0.15s", boxSizing: "border-box" }}>
//                       <img src={`${img}`} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 4 : 8, boxSizing: "border-box" }} />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FadeIn>

//           <FadeIn delay={120}>
//             <div style={{ paddingTop: isMobile ? 24 : 4 }}>
//               <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
//                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.category?.toUpperCase()}</span>
//                 <span style={{ color: "#ddd" }}>·</span>
//                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.subcategory?.toUpperCase()}</span>
//                 <span style={{ color: "#ddd" }}>·</span>
//                 <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.gender?.toUpperCase()}</span>
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7, flexWrap: "wrap" }}>
//                 <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3.2vw, 42px)", lineHeight: 1, color: BLACK, margin: 0, letterSpacing: "0.04em", flex: 1, paddingRight: 16 }}>
//                   {product.name}
//                 </h1>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginTop: 4 }}>
//                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 600, color: BLACK, whiteSpace: "nowrap" }}>
//                     PKR {formatPriceValue(discountPrice)}
//                   </div>
//                   <WishlistHeart productId={product.id} size="lg" placement="detail" />
//                 </div>
//               </div>

//               <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 16, letterSpacing: "0.04em" }}>{displayLabel}</div>
//               {variants.length > 1 && (
//                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff, marginBottom: 10 }}>{variants.length} COLOURS</div>
//               )}
//               {variants.length > 1 && (
//                 <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
//                   {variants.map((variant) => {
//                     const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
//                     return (
//                       <button
//                         key={variant.name}
//                         onClick={() => handleSelectVariant(variant)}
//                         style={{
//                           display: "inline-flex",
//                           alignItems: "center",
//                           gap: 8,
//                           border: active ? `1.5px solid ${BLACK}` : "1px solid #d8d0c8",
//                           background: active ? "#fff" : "#faf7f2",
//                           padding: "8px 12px",
//                           cursor: "pointer",
//                           fontFamily: ff,
//                           fontSize: 11,
//                           letterSpacing: "0.08em",
//                           color: BLACK,
//                         }}
//                       >
//                         <span style={{ width: 14, height: 14, borderRadius: "50%", background: variant.swatch || "#d9d9d9", border: "1px solid rgba(0,0,0,0.12)" }} />
//                         {variant.name}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}
//               <div style={{ width: 36, height: 3, background: BRAND, marginBottom: 18 }} />

//               {discountPrice < price && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
//                   <span style={{ fontFamily: mono, fontSize: isMobile ? 13 : 15, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</span>
//                   {discount > 0 && <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 900, background: BRAND, color: BRAND_TEXT, padding: "4px 10px", letterSpacing: "0.1em" }}>SAVE {discount}%</span>}
//                 </div>
//               )}

//               <div style={{ marginBottom: 26 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//                   <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>SIZE</span>
//                   <span style={{ fontSize: 11, color: "#888", fontFamily: mono, textDecoration: "underline", cursor: "pointer", letterSpacing: "0.04em" }}>Size Chart</span>
//                 </div>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   {sizes.map(size => (
//                     <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", fontFamily: ff, cursor: "pointer", border: "1.5px solid", borderColor: selectedSize === size ? BLACK : "#d8d0c8", background: selectedSize === size ? BLACK : "#fff", color: selectedSize === size ? "#fff" : BLACK, transition: "all 0.15s" }}>
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div style={{ marginBottom: 14 }}>
//                 <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff, display: "block", marginBottom: 10 }}>QUANTITY</span>
//                 <div style={{ display: "inline-flex", border: "1.5px solid #e8e0d0", alignItems: "center" }}>
//                   <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", width: 42, height: 46, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>−</button>
//                   <span style={{ width: 46, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{qty}</span>
//                   <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", width: 42, height: 46, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>+</button>
//                 </div>
//               </div>

//               <button onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ width: "100%", background: added ? "#16a34a" : "#0c2c41", color: "#fff", border: "none", padding: "16px 24px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, transition: "background 0.3s", marginBottom: 12 }}>
//                 {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
//               </button>

//               {added && (
//                 <button onClick={() => navigate("#/cart")} style={{ width: "100%", background: BRAND, color: BRAND_TEXT, border: "none", padding: "13px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, marginBottom: 14 }}>
//                   VIEW BAG & CHECKOUT →
//                 </button>
//               )}

//               <p style={{ fontSize: isMobile ? 12 : 13, color: "#555", lineHeight: 1.9, fontFamily: mono, marginBottom: 28, maxWidth: 420 }}>{product.description}</p>

//               <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "18px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4", marginBottom: 28 }}>
//                 {[{ icon: "🚚", text: "Free shipping across Pakistan" }, { icon: "↩", text: "30-day hassle-free returns" }, { icon: "✦", text: "Prescription lenses available" }, { icon: "★", text: "Genuine Italian / Japanese craftsmanship" }].map((b, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <span style={{ fontSize: 13 }}>{b.icon}</span>
//                     <span style={{ fontSize: 12, color: "#666", fontFamily: mono, letterSpacing: "0.02em" }}>{b.text}</span>
//                   </div>
//                 ))}
//               </div>

//               <div style={{ borderTop: "1px solid #e8e0d0" }}>
//                 <AccordionItem id="details" label="DETAILS">
//                   <div style={{ width: "100%", overflowX: "auto" }}>
//                     <table style={{ width: "100%", minWidth: 280, borderCollapse: "collapse" }}>
//                       <tbody>
//                         {Object.entries(product.specifications || {}).map(([k, v], i) => (
//                           <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
//                             <td style={{ padding: "9px 12px 9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%", whiteSpace: "nowrap" }}>{k.toUpperCase()}</td>
//                             <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </AccordionItem>
//                 <AccordionItem id="measurements" label="MEASUREMENTS">
//                   <div style={{ width: "100%", overflowX: "auto" }}>
//                     <table style={{ width: "100%", minWidth: 280, borderCollapse: "collapse" }}>
//                       <tbody>
//                         {Object.entries(product.measurements || {}).map(([k, v], i) => (
//                           <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
//                             <td style={{ padding: "9px 12px 9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%", whiteSpace: "nowrap" }}>{k.toUpperCase()}</td>
//                             <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </AccordionItem>
//               </div>
//             </div>
//           </FadeIn>
//         </div>
//       </div>

//       <ProductReviewsSection productId={productId} navigate={navigate} />

//       {related.length > 0 && (
//         <div style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", borderTop: "2px solid #e8ddd0" }}>
//           <div style={{ maxWidth: 1400, margin: "0 auto" }}>
//             <FadeIn>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 44, flexWrap: "wrap", gap: 12 }}>
//                 <div>
//                   <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>YOU MAY ALSO LIKE</div>
//                   <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(26px, 4vw, 42px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>RELATED FRAMES</h2>
//                 </div>
//                 <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid ${BLACK}`, padding: "10px 20px", fontSize: isMobile ? 10 : 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: BLACK, fontFamily: ff }}>VIEW ALL →</button>
//               </div>
//             </FadeIn>
//             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
//               {related.map((p, i) => (
//                 <FadeIn key={p.id} delay={i * 80}>
//                   <ProductCard product={p} navigate={navigate} />
//                 </FadeIn>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`@keyframes fadeImgIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }`}</style>
//     </div>
//   );
// }

// // ============ CART PAGE ============
// export function CartPage({ navigate }) {
//   const { cartItems, removeFromCart, updateQty, cartTotal, clearCart, loading, syncing, pendingSync } = useCart();
//   const { user } = useAuth();
//   const [localCart, setLocalCart] = useState([]);

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");

//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
//   useEffect(() => { setLocalCart(cartItems); }, [cartItems]);

//   const shipping = cartTotal >= 5000 ? 0 : 350;
//   const grandTotal = cartTotal + shipping;

//   if (loading) {
//     return (
//       <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0" }}>
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: 12, letterSpacing: "0.2em", color: NAVY }}>LOADING YOUR CART...</div>
//         </div>
//       </div>
//     );
//   }

//   if (localCart.length === 0) return (
//     <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0", padding: "20px" }}>
//       <div style={{ width: 72, height: 72, border: "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 28 }}>🛍️</div>
//       <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#bbb", marginBottom: 12 }}>YOUR CART</div>
//       <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 24 : 32, letterSpacing: "0.06em", color: BLACK, marginBottom: 10, textAlign: "center" }}>YOUR CART IS EMPTY</h2>
//       <p style={{ fontSize: 13, color: "#999", fontFamily: mono, marginBottom: 32, letterSpacing: "0.04em", textAlign: "center" }}>Add some frames to get started.</p>
//       <button onClick={() => navigate("#/products")} style={{ background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px 32px", cursor: "pointer" }}
//         onMouseEnter={e => e.currentTarget.style.background = "#0a2236"}
//         onMouseLeave={e => e.currentTarget.style.background = NAVY}>SHOP THE COLLECTION</button>
//     </div>
//   );

//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f4f0", fontFamily: ff }}>
//       {pendingSync && (
//         <div style={{ background: "#fff3cd", borderBottom: `2px solid #ffc107`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//           <span style={{ fontSize: 15, color: "#856404" }}>⚠️</span>
//           <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#856404" }}>YOUR CART NEEDS TO BE SYNCED. PLEASE PROCEED TO CHECKOUT TO SAVE YOUR ITEMS.</span>
//         </div>
//       )}
//       <div style={{ background: "#eef4f8", borderBottom: `2px solid ${NAVY}`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//         <span style={{ fontSize: 15, color: NAVY }}>✓</span>
//         <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: NAVY }}>
//           {shipping === 0 ? "YOU'VE UNLOCKED FREE WORLDWIDE EXPRESS SHIPPING!" : `ADD PKR ${(5000 - cartTotal).toLocaleString()} MORE FOR FREE SHIPPING`}
//         </span>
//       </div>
//       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "40px 40px 36px", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none", fontSize: 320, lineHeight: 1, color: "#fff", fontWeight: 900 }}>◻</div>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <div style={{ width: 32, height: 3, background: NAVY, marginBottom: 14 }} />
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: 0, letterSpacing: "0.04em" }}>YOUR CART</h1>
//           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: mono, marginTop: 12, letterSpacing: "0.06em" }}>
//             {localCart.length} ITEM{localCart.length !== 1 ? "S" : ""} &nbsp;·&nbsp; PKR {cartTotal.toLocaleString()} SUBTOTAL
//           </p>
//         </div>
//       </div>

//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "40px 40px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
//         <div>
//           {!isMobile && (
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: 16, padding: "0 0 12px", borderBottom: `2px solid ${BLACK}`, marginBottom: 0 }}>
//               {["PRODUCT", "PRICE", "QUANTITY", ""].map((h, i) => (
//                 <div key={i} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", color: "#aaa" }}>{h}</div>
//               ))}
//             </div>
//           )}

//           {localCart.map(item => {
//             const itemDiscount = item.price && item.discountPrice && item.price > item.discountPrice ? Math.round(((item.price - item.discountPrice) / item.price) * 100) : 0;
//             return (
//               <div key={item.id} style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: isMobile ? 12 : 16, alignItems: "center", padding: isMobile ? "12px 0" : "20px 0", borderBottom: "1px solid #e0ddd6", flexDirection: isMobile ? "column" : "row" }}>
//                 <div style={{ display: "flex", gap: 14, alignItems: "center", width: isMobile ? "100%" : "auto" }}>
//                   <div style={{ width: isMobile ? 60 : 88, height: isMobile ? 50 : 70, flexShrink: 0, overflow: "hidden", background: CREAM, cursor: "pointer", border: "1px solid #e8e8e8" }} onClick={() => navigate(`#/products/${item.id}`)}>
//                     <img src={item.image} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                   </div>
//                   <div>
//                     <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.16em", fontFamily: ff, marginBottom: 3 }}>{item.category?.toUpperCase()}{item.gender ? ` · ${item.gender.toUpperCase()}` : ""}</div>
//                     <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, letterSpacing: "0.04em", marginBottom: 3, cursor: "pointer" }} onClick={() => navigate(`#/products/${item.id}`)}>{item.name}</div>
//                     <div style={{ fontSize: 11, color: "#999", fontFamily: mono }}>{item.color}</div>
//                     {itemDiscount > 0 && <div style={{ fontSize: 9, fontWeight: 900, background: NAVY, color: "#fff", display: "inline-block", padding: "2px 7px", letterSpacing: "0.1em", marginTop: 5 }}>−{itemDiscount}% OFF</div>}
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: isMobile ? "space-between" : "flex-start", alignItems: "center", width: isMobile ? "100%" : "auto", gap: 8 }}>
//                   <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 14, fontWeight: 900, color: BLACK }}>PKR {(item.discountPrice || item.price || 0).toLocaleString()}</div>
//                   {item.discountPrice && item.price && item.discountPrice < item.price && <div style={{ fontSize: 11, color: "#bbb", textDecoration: "line-through", fontFamily: mono }}>PKR {item.price.toLocaleString()}</div>}
//                 </div>
//                 <div style={{ display: "flex", border: "1.5px solid #ccc", alignItems: "center", width: "fit-content" }}>
//                   <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
//                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
//                     onMouseLeave={e => e.currentTarget.style.background = "none"}>−</button>
//                   <span style={{ width: 30, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{item.qty || 1}</span>
//                   <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
//                     onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
//                     onMouseLeave={e => e.currentTarget.style.background = "none"}>+</button>
//                 </div>
//                 <button onClick={() => removeFromCart(item.id)} disabled={syncing} style={{ background: "none", border: "none", cursor: syncing ? "not-allowed" : "pointer", color: "#ccc", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
//                   onMouseEnter={e => { if (!syncing) e.currentTarget.style.color = "#dc2626" }}
//                   onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>×</button>
//               </div>
//             );
//           })}

//           <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
//             <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: "pointer", color: "#888", fontFamily: ff }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>← CONTINUE SHOPPING</button>
//             <button onClick={clearCart} disabled={syncing} style={{ background: "none", border: "1.5px solid #fecaca", padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: syncing ? "not-allowed" : "pointer", color: "#dc2626", fontFamily: ff }}
//               onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#fef2f2" }}
//               onMouseLeave={e => e.currentTarget.style.background = "none"}>CLEAR CART</button>
//           </div>
//         </div>

//         <div style={{ background: "#fff", border: "1px solid #e0ddd6", position: "sticky", top: 80 }}>
//           <div style={{ background: BLACK, padding: "18px 24px" }}>
//             <div style={{ width: 26, height: 3, background: NAVY, marginBottom: 10 }} />
//             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.16em" }}>ORDER SUMMARY</div>
//           </div>
//           <div style={{ padding: "22px 24px" }}>
//             {localCart.map(item => (
//               <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
//                 <span style={{ fontSize: 12, color: "#666", fontFamily: mono, flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{item.name} × {item.qty || 1}</span>
//                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK, flexShrink: 0 }}>PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
//               </div>
//             ))}
//             <div style={{ display: "flex", marginTop: 4, marginBottom: 16, flexWrap: "wrap" }}>
//               <input placeholder="DISCOUNT CODE" style={{ flex: 1, border: "1.5px solid #ccc", borderRight: "none", padding: "9px 12px", fontSize: 11, fontFamily: ff, letterSpacing: "0.08em", outline: "none", color: BLACK, minWidth: "100px" }}
//                 onFocus={e => e.currentTarget.style.borderColor = NAVY}
//                 onBlur={e => e.currentTarget.style.borderColor = "#ccc"} />
//               <button style={{ background: BLACK, color: "#fff", border: "none", padding: "9px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer", fontFamily: ff }}>APPLY</button>
//             </div>
//             <div style={{ borderTop: "1px solid #eee", paddingTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SUBTOTAL</span>
//                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SHIPPING</span>
//                 <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
//               </div>
//               {shipping === 0 && <div style={{ fontSize: 10, color: "#16a34a", fontFamily: ff, letterSpacing: "0.1em", fontWeight: 800 }}>✓ FREE WORLDWIDE SHIPPING APPLIED</div>}
//             </div>
//             <div style={{ borderTop: `2px solid ${BLACK}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", color: BLACK }}>TOTAL</span>
//               <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 18 : 20, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
//             </div>
//             <div style={{ fontSize: 10, color: "#bbb", fontFamily: ff, letterSpacing: "0.08em", marginBottom: 20 }}>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
//             <button onClick={() => navigate("#/checkout")} disabled={syncing || localCart.length === 0} style={{ width: "100%", background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px", cursor: (syncing || localCart.length === 0) ? "not-allowed" : "pointer", display: "block", textAlign: "center", marginBottom: 8, opacity: (syncing || localCart.length === 0) ? 0.5 : 1 }}
//               onMouseEnter={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = "#0a2236" }}
//               onMouseLeave={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = NAVY }}>
//               {syncing ? "UPDATING..." : "PROCEED TO CHECKOUT →"}
//             </button>
//             <button onClick={() => navigate("#/products")} style={{ width: "100%", background: "#fff", border: `1.5px solid ${BLACK}`, color: BLACK, fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.16em", padding: "11px", cursor: "pointer", display: "block", textAlign: "center" }}
//               onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
//               onMouseLeave={e => e.currentTarget.style.background = "#fff"}>CONTINUE SHOPPING</button>
//             <div style={{ marginTop: 16, display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
//               {["VISA", "MC", "AMEX", "APPLE PAY", "COD"].map(c => (
//                 <span key={c} style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", border: "1px solid #e0e0e0", padding: "3px 6px", color: "#aaa", fontFamily: ff }}>{c}</span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============ WISHLIST PAGE ============
// export function WishlistPage({ navigate }) {
//   const { user } = useAuth();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [removing, setRemoving] = useState(null);
//   const { addToCart } = useCart();

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

//   useEffect(() => {
//     if (!user) { navigate("#/"); return; }
//     loadWishlist();
//   }, [user]);

//   const loadWishlist = async () => {
//     setLoading(true);
//     try {
//       const res = await getWishlist();
//       const rawItems = res.data || [];
//       setWishlist(enrichWishlistItems(rawItems));
//     } catch (err) {
//       setError(err.message);
//     }
//     setLoading(false);
//   };

//   const handleRemove = async (wishlistId) => {
//     setRemoving(wishlistId);
//     try {
//       await removeFromWishlist({ wishlistId });
//       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
//     } catch (err) {
//       setError(err.message);
//     }
//     setRemoving(null);
//   };

//   const handleMoveToCart = async (item) => {
//     if (item.product) {
//       addToCart({ id: item.productId, ...item.product, discountPrice: item.product.salePrice || item.product.price }, 1);
//       await handleRemove(item.wishlistId);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
//       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
//           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff"/>
//         </div>
//         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
//           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
//           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT</div>
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(36px, 6vw, 68px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
//             MY WISHLIST
//           </h1>
//           {!loading && (
//             <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono }}>
//               {wishlist.length} saved {wishlist.length === 1 ? "frame" : "frames"}
//             </p>
//           )}
//         </div>
//       </div>

//       <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "MY ACCOUNT", path: "#/dashboard" }, { label: "WISHLIST", path: null }]} />

//       <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "48px 40px 80px" }}>
//         {error && (
//           <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, marginBottom: 24, fontFamily: mono }}>
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <WishlistSkeleton />
//         ) : wishlist.length === 0 ? (
//           <FadeIn>
//             <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 480, margin: "0 auto" }}>
//               <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fef0f0", animation: "pulseSlow 3s ease-in-out infinite" }}/>
//                 <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </div>
//               <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
//               <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 4vw, 36px)", color: BLACK, margin: "0 0 12px", letterSpacing: "0.04em" }}>
//                 YOUR WISHLIST IS EMPTY
//               </h2>
//               <p style={{ fontSize: 14, color: "#888", fontFamily: mono, lineHeight: 1.7, marginBottom: 32 }}>
//                 Save frames you love by tapping the heart icon. They'll wait here for you.
//               </p>
//               <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
//                 <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 28px" }}>BROWSE ALL FRAMES</YBtn>
//                 <button onClick={() => navigate("#/collections/new-arrivals")} style={{ background: "none", border: `1.5px solid ${BRAND}`, color: BRAND, fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.12em", padding: "14px 24px", cursor: "pointer" }}>
//                   NEW ARRIVALS
//                 </button>
//               </div>
//             </div>
//           </FadeIn>
//         ) : (
//           <>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
//               <div>
//                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 4 }}>SAVED ITEMS</div>
//                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(22px, 3vw, 32px)", color: BLACK, letterSpacing: "0.02em" }}>
//                   {wishlist.length} {wishlist.length === 1 ? "FRAME" : "FRAMES"} SAVED
//                 </div>
//               </div>
//               <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: "#888", fontFamily: ff, transition: "all 0.2s" }}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>
//                 CONTINUE SHOPPING →
//               </button>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, minmax(200px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 24 }}>
//               {wishlist.map((item, idx) => {
//                 const isRemoving = removing === item.wishlistId;
//                 const price = Number(item.product?.salePrice || item.product?.price || 0);
//                 const origPrice = Number(item.product?.price || 0);
//                 const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

//                 return (
//                   <FadeIn key={item.wishlistId} delay={idx * 60}>
//                     <div style={{
//                       background: "#fff", border: "1px solid #e8e0d0",
//                       overflow: "hidden", position: "relative",
//                       transition: "box-shadow 0.3s, transform 0.3s, opacity 0.3s",
//                       opacity: isRemoving ? 0.4 : 1,
//                       transform: isRemoving ? "scale(0.97)" : "scale(1)",
//                       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//                       display: "flex", flexDirection: "column"
//                     }}
//                       onMouseEnter={e => { if (!isRemoving) { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
//                       onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}
//                     >
//                       {discount > 0 && (
//                         <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 9px", fontFamily: ff }}>
//                           −{discount}%
//                         </div>
//                       )}

//                       <button
//                         onClick={() => handleRemove(item.wishlistId)}
//                         disabled={isRemoving}
//                         style={{
//                           position: "absolute", top: 10, right: 10, zIndex: 4,
//                           width: 32, height: 32, borderRadius: "50%",
//                           background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)",
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           cursor: isRemoving ? "wait" : "pointer", fontSize: 14, color: "#aaa",
//                           transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
//                         }}
//                         onMouseEnter={e => { e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.borderColor = "#dc2626"; }}
//                         onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
//                         aria-label="Remove from wishlist"
//                       >
//                         ×
//                       </button>

//                       <div
//                         onClick={() => navigate(`#/products/${item.productId}`)}
//                         style={{ height: isMobile ? 160 : 220, overflow: "hidden", background: "#FAFAF5", cursor: "pointer", position: "relative", flexShrink: 0 }}
//                       >
//                         {item.product?.imageUrl ? (
//                           <img
//                             src={`${item.product.imageUrl}`}
//                             alt={item.product.name}
//                             loading="lazy"
//                             decoding="async"
//                             style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? "16px 20px" : "24px 32px", transition: "transform 0.4s ease" }}
//                             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
//                             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//                           />
//                         ) : (
//                           <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                             <Frame shape="round" size={isMobile ? 80 : 120} color={BRAND} />
//                           </div>
//                         )}
//                         <div style={{
//                           position: "absolute", bottom: 0, left: 0, right: 0,
//                           background: BRAND, color: BRAND_TEXT, textAlign: "center",
//                           padding: "9px", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff,
//                           transform: "translateY(100%)", transition: "transform 0.25s ease"
//                         }}
//                           className="wishlist-view-overlay">
//                           VIEW DETAILS →
//                         </div>
//                       </div>

//                       <div style={{ padding: isMobile ? "10px 12px 12px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
//                         <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.16em", marginBottom: 3, fontFamily: ff }}>
//                           {item.product?.subcategory?.toUpperCase()} {item.product?.gender ? `· ${item.product.gender.toUpperCase()}` : ""}
//                         </div>
//                         <div
//                           onClick={() => navigate(`#/products/${item.productId}`)}
//                           style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, marginBottom: 4, letterSpacing: "0.03em", cursor: "pointer", lineHeight: 1.2 }}>
//                           {item.product?.name || "Unnamed Frame"}
//                         </div>
//                         <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 10, lineHeight: 1.4 }}>
//                           {item.product?.color || ""}
//                         </div>

//                         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
//                           <span style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK }}>
//                             PKR {price.toLocaleString()}
//                           </span>
//                           {discount > 0 && (
//                             <span style={{ fontFamily: mono, fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>
//                               PKR {origPrice.toLocaleString()}
//                             </span>
//                           )}
//                         </div>

//                         <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
//                           <button
//                             onClick={() => handleMoveToCart(item)}
//                             disabled={isRemoving}
//                             style={{
//                               flex: 1, background: NAVY, color: "#fff", border: "none",
//                               padding: "10px 0", fontSize: isMobile ? 9 : 10, fontWeight: 900,
//                               letterSpacing: "0.12em", cursor: isRemoving ? "not-allowed" : "pointer",
//                               fontFamily: ff, transition: "background 0.18s"
//                             }}
//                             onMouseEnter={e => { if (!isRemoving) e.currentTarget.style.background = "#0a2236"; }}
//                             onMouseLeave={e => e.currentTarget.style.background = NAVY}
//                           >
//                             + ADD TO BAG
//                           </button>
//                           <button
//                             onClick={() => navigate(`#/products/${item.productId}`)}
//                             style={{
//                               background: "none", border: `1.5px solid #e8e0d0`,
//                               padding: "10px 14px", fontSize: 11, cursor: "pointer",
//                               color: BLACK, transition: "border-color 0.18s", fontFamily: ff
//                             }}
//                             onMouseEnter={e => e.currentTarget.style.borderColor = BRAND}
//                             onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e0d0"}
//                             aria-label="View product"
//                           >
//                             ↗
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </FadeIn>
//                 );
//               })}
//             </div>

//             <FadeIn delay={200}>
//               <div style={{ textAlign: "center", marginTop: 56, padding: "40px 20px", background: "#fff", border: "1px solid #e8e0d0" }}>
//                 <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 10 }}>DISCOVER MORE</div>
//                 <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(20px, 3vw, 28px)", color: BLACK, margin: "0 0 20px", letterSpacing: "0.04em" }}>
//                   KEEP EXPLORING
//                 </h3>
//                 <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
//                   <YBtn onClick={() => navigate("#/collections/new-arrivals")} style={{ padding: "12px 24px" }}>NEW ARRIVALS</YBtn>
//                   <YBtn onClick={() => navigate("#/products")} style={{ padding: "12px 24px" }}>ALL FRAMES</YBtn>
//                 </div>
//               </div>
//             </FadeIn>
//           </>
//         )}
//       </div>
//       <style>{`
//         .wishlist-card:hover .wishlist-view-overlay { transform: translateY(0) !important; }
//         @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.08); opacity:1; } }
//       `}</style>
//     </div>
//   );
// }

// // ============ CHECKOUT PAGE ============
// const AddressCard = ({ addr, selected, onSelect }) => {
//   const isDefault = addr.isDefault === true || addr.isDefault === "TRUE";
//   return (
//     <div
//       onClick={onSelect}
//       style={{
//         border: `2px solid ${selected ? BRAND : "#dde"}`,
//         borderRadius: 4,
//         padding: "16px 18px",
//         cursor: "pointer",
//         background: selected ? "#f0f6fa" : "#fff",
//         position: "relative",
//         transition: "border-color 0.15s, background 0.15s",
//         userSelect: "none",
//       }}
//     >
//       <div style={{
//         position: "absolute",
//         top: 14,
//         right: 14,
//         width: 18,
//         height: 18,
//         borderRadius: "50%",
//         border: `2px solid ${selected ? BRAND : "#bbb"}`,
//         background: selected ? BRAND : "transparent",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "all 0.15s",
//       }}>
//         {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
//       </div>
//       {isDefault && (
//         <span style={{
//           display: "inline-block",
//           background: BRAND,
//           color: "#fff",
//           fontSize: 8,
//           fontWeight: 900,
//           padding: "2px 7px",
//           letterSpacing: "0.12em",
//           fontFamily: ff,
//           marginBottom: 8,
//         }}>
//           DEFAULT
//         </span>
//       )}
//       <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, marginBottom: 4, fontFamily: ff, paddingRight: 28 }}>
//         {addr.fullName}
//       </div>
//       <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7 }}>
//         {addr.address}<br />
//         {addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ""}<br />
//         {addr.country || "Pakistan"}<br />
//         {addr.phone}
//       </div>
//     </div>
//   );
// };

// const Field = ({ label, value, onChange, placeholder, type = "text", error, full = false }) => (
//   <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: full ? "1 / -1" : "auto" }}>
//     <label style={{
//       fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
//       color: error ? "#dc2626" : "#888", fontFamily: ff,
//     }}>
//       {label}{error ? ` — ${error}` : ""}
//     </label>
//     <input
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       style={{
//         border: `1.5px solid ${error ? "#dc2626" : "#e0e8ee"}`,
//         padding: "11px 14px",
//         fontSize: 13,
//         fontFamily: mono,
//         color: BLACK,
//         background: "#fafaf8",
//         outline: "none",
//         transition: "border-color 0.15s",
//       }}
//       onFocus={e => { if (!error) e.target.style.borderColor = BRAND; }}
//       onBlur={e => { if (!error) e.target.style.borderColor = "#e0e8ee"; }}
//     />
//   </div>
// );

// export function CheckoutPage({ navigate }) {
//   const { cartItems, cartTotal, clearCart, loading: cartLoading, syncCartToDatabase, getCheckoutItems } = useCart();
//   const { user } = useAuth();

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

//   const [step, setStep] = useState(1);
//   const [submitting, setSubmitting] = useState(false);
//   const [syncingCart, setSyncingCart] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [addressesLoading, setAddressesLoading] = useState(true);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [showCustomForm, setShowCustomForm] = useState(false);

//   const [customForm, setCustomForm] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "Pakistan",
//     notes: "",
//   });
//   const setCustomField = k => v => setCustomForm(f => ({ ...f, [k]: v }));

//   const shipping = cartTotal >= 5000 ? 0 : 350;
//   const grandTotal = cartTotal + shipping;

//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
//   useEffect(() => {
//     if (!cartLoading && cartItems.length === 0 && !orderPlaced) navigate("#/products");
//   }, [cartItems, cartLoading, navigate, orderPlaced]);

//   useEffect(() => {
//     if (!user) return;
//     setAddressesLoading(true);
//     getAddresses()
//       .then(res => {
//         const addrs = res.data || [];
//         setSavedAddresses(addrs);
//         if (addrs.length > 0) {
//           const def = addrs.find(a => a.isDefault === true || a.isDefault === "TRUE");
//           setSelectedAddressId(def ? def.addressId : addrs[0].addressId);
//           setShowCustomForm(false);
//         } else {
//           setShowCustomForm(true);
//           setSelectedAddressId(null);
//         }
//       })
//       .catch(() => {
//         setShowCustomForm(true);
//         setSelectedAddressId(null);
//       })
//       .finally(() => setAddressesLoading(false));
//   }, [user]);

//   const activeAddress = (() => {
//     if (selectedAddressId) {
//       const saved = savedAddresses.find(a => a.addressId === selectedAddressId);
//       if (saved) {
//         return {
//           fullName: String(saved.fullName ?? ""),
//           phone: String(saved.phone ?? ""),
//           email: user?.email || "",
//           address: String(saved.address ?? ""),
//           city: String(saved.city ?? ""),
//           country: String(saved.country ?? "Pakistan"),
//           postalCode: String(saved.postalCode ?? ""),
//           notes: "",
//         };
//       }
//     }
//     return {
//       ...customForm,
//       fullName: String(customForm.fullName ?? ""),
//       phone: String(customForm.phone ?? ""),
//       address: String(customForm.address ?? ""),
//       city: String(customForm.city ?? ""),
//       email: user?.email || "",
//     };
//   })();

//   const validate = () => {
//     const e = {};
//     if (!String(activeAddress.fullName ?? "").trim()) e.fullName = "Required";
//     if (!String(activeAddress.phone ?? "").trim()) e.phone = "Required";
//     if (!String(activeAddress.address ?? "").trim()) e.address = "Required";
//     if (!String(activeAddress.city ?? "").trim()) e.city = "Required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleProceedToReview = async () => {
//     if (!validate()) return;
//     if (!user) { alert("Please log in to proceed."); return; }
//     setSyncingCart(true);
//     const syncResult = await syncCartToDatabase();
//     setSyncingCart(false);
//     if (!syncResult.success) { alert(syncResult.error || "Failed to sync cart."); return; }
//     setStep(2);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) { alert("Please log in to complete your order."); return; }
//     setSubmitting(true);
//     try {
//       const { checkout } = await import("../services/service.js");
//       const checkoutItems = getCheckoutItems();
//       const res = await checkout({
//         cartItems: checkoutItems,
//         subtotal: cartTotal,
//         shipping,
//         total: grandTotal,
//         address: activeAddress,
//         paymentMethod: "COD",
//       });
//       if (res.success) {
//         setOrderPlaced(true);
//         await clearCart();
//         navigate("#/order-success");
//       } else {
//         alert(res.error || "Failed to place order.");
//       }
//     } catch (err) {
//       console.error("Checkout error:", err);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (cartLoading) return (
//     <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
//       <div style={{ fontSize: 12, letterSpacing: "0.2em", color: BRAND }}>LOADING...</div>
//     </div>
//   );
//   if (cartItems.length === 0 && !orderPlaced) return null;

//   const userName = user?.name || user?.fullName || "";
//   const userEmail = user?.email || "";

//   return (
//     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
//       <div style={{ background: BLACK, padding: isMobile ? "32px 20px" : "44px 40px 36px" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <div style={{ width: 32, height: 3, background: BRAND, marginBottom: 14 }} />
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: "0 0 12px" }}>CHECKOUT</h1>
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
//             {[{ n: 1, l: "DELIVERY" }, { n: 2, l: "REVIEW & PAY" }].map((s, i) => (
//               <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 {i > 0 && <div style={{ width: isMobile ? 20 : 40, height: 1, background: step > i ? BRAND : "#333" }} />}
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <div style={{
//                     width: 28, height: 28, borderRadius: "50%",
//                     background: step >= s.n ? BRAND : "#222",
//                     border: `2px solid ${step >= s.n ? BRAND : "#333"}`,
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     fontSize: 11, fontWeight: 900, color: step >= s.n ? BRAND_TEXT : "#555", fontFamily: ff,
//                   }}>
//                     {step > s.n ? "✓" : s.n}
//                   </div>
//                   <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: step >= s.n ? "#fff" : "#555", fontFamily: ff }}>
//                     {s.l}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 16px 60px" : "48px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
//         <div>
//           {step === 1 && (
//             <FadeIn>
//               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
//                 <div style={{ background: "#f0f6fa", border: `1.5px solid #89c4e1`, padding: "14px 20px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                     <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRAND, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, fontFamily: ff, flexShrink: 0 }}>
//                       {userName.charAt(0).toUpperCase() || "?"}
//                     </div>
//                     <div>
//                       <div style={{ fontSize: 13, fontWeight: 900, color: BRAND, fontFamily: ff, letterSpacing: "0.04em" }}>{userName}</div>
//                       <div style={{ fontSize: 11, color: "#666", fontFamily: mono, marginTop: 2 }}>{userEmail}</div>
//                     </div>
//                   </div>
//                   <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", color: "#2a8a50", background: "#eaf5ef", padding: "4px 10px", fontFamily: ff }}>SIGNED IN</span>
//                 </div>

//                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff }}>
//                   DELIVERY ADDRESS
//                 </div>

//                 {addressesLoading ? (
//                   <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#aaa", letterSpacing: "0.14em", fontFamily: ff }}>
//                     LOADING ADDRESSES…
//                   </div>
//                 ) : (
//                   <>
//                     {savedAddresses.length > 0 && (
//                       <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
//                         {savedAddresses.map(addr => (
//                           <AddressCard
//                             key={addr.addressId}
//                             addr={addr}
//                             selected={selectedAddressId === addr.addressId && !showCustomForm}
//                             onSelect={() => {
//                               setSelectedAddressId(addr.addressId);
//                               setShowCustomForm(false);
//                               setErrors({});
//                             }}
//                           />
//                         ))}
//                       </div>
//                     )}

//                     <button
//                       onClick={() => {
//                         const next = !showCustomForm;
//                         setShowCustomForm(next);
//                         if (next) setSelectedAddressId(null);
//                         else if (savedAddresses.length > 0) {
//                           const def = savedAddresses.find(a => a.isDefault === true || a.isDefault === "TRUE");
//                           setSelectedAddressId(def ? def.addressId : savedAddresses[0].addressId);
//                         }
//                         setErrors({});
//                       }}
//                       style={{
//                         display: "flex", alignItems: "center", gap: 8,
//                         background: "none", border: `1.5px dashed ${showCustomForm ? BRAND : "#bcd"}`,
//                         color: showCustomForm ? BRAND : "#6a8ea0", padding: "11px 20px",
//                         fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
//                         fontFamily: ff, cursor: "pointer", width: "100%",
//                         justifyContent: "center", marginBottom: 4, transition: "all 0.15s",
//                       }}
//                     >
//                       <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>
//                         {showCustomForm ? "×" : "+"}
//                       </span>
//                       {showCustomForm ? "CANCEL — USE SAVED ADDRESS" : "USE A DIFFERENT ADDRESS"}
//                     </button>

//                     {showCustomForm && (
//                       <FadeIn delay={0.05}>
//                         <div style={{ border: `1.5px solid ${BRAND}`, padding: isMobile ? "16px" : "24px 20px", marginTop: 16, background: "#f8fbfd" }}>
//                           <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: BRAND, marginBottom: 20, fontFamily: ff }}>
//                             ENTER DELIVERY DETAILS
//                           </div>
//                           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
//                             <Field label="FULL NAME" value={customForm.fullName} onChange={setCustomField("fullName")} placeholder="Ahmad Khan" error={errors.fullName} />
//                             <Field label="PHONE" value={customForm.phone} onChange={setCustomField("phone")} placeholder="0300 1234567" type="tel" error={errors.phone} />
//                             <Field label="STREET ADDRESS" value={customForm.address} onChange={setCustomField("address")} placeholder="House #12, Street 4, Block B" error={errors.address} full />
//                             <Field label="CITY" value={customForm.city} onChange={setCustomField("city")} placeholder="Karachi" error={errors.city} />
//                             <Field label="POSTAL CODE (optional)" value={customForm.postalCode} onChange={setCustomField("postalCode")} placeholder="75500" />
//                             <Field label="ORDER NOTES (optional)" value={customForm.notes} onChange={setCustomField("notes")} placeholder="e.g. Leave at gate" full />
//                           </div>
//                         </div>
//                       </FadeIn>
//                     )}
//                   </>
//                 )}

//                 <div style={{ marginTop: 32 }}>
//                   <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 20, fontFamily: ff }}>
//                     PAYMENT METHOD
//                   </div>
//                   <div style={{ border: `2px solid #89c4e1`, background: "#e8f2f8", padding: "18px 20px" }}>
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
//                       <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#89c4e1", border: `2px solid #89c4e1`, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
//                       </div>
//                       <div>
//                         <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.1em", color: BLACK, marginBottom: 4 }}>
//                           CASH ON DELIVERY (COD)
//                         </div>
//                         <p style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7, margin: 0 }}>
//                           Pay in cash when your order arrives. Available across all major cities in Pakistan.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ marginTop: 32 }}>
//                   <YBtn onClick={handleProceedToReview} disabled={syncingCart || addressesLoading} style={{ width: "100%", padding: 15, fontSize: 12, letterSpacing: "0.14em" }}>
//                     {syncingCart ? "SYNCING CART…" : "REVIEW ORDER →"}
//                   </YBtn>
//                 </div>
//               </div>
//             </FadeIn>
//           )}

//           {step === 2 && (
//             <FadeIn>
//               <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
//                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.1em", color: BLACK, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #f0ece4" }}>
//                   REVIEW YOUR ORDER
//                 </div>
//                 <div style={{ background: "#FAFAF8", border: "1px solid #e0e8ee", padding: "18px 20px", marginBottom: 24 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                     <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>DELIVERY TO</div>
//                     <button onClick={() => setStep(1)} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#888", background: "none", border: "none", cursor: "pointer", fontFamily: ff, textDecoration: "underline" }}>EDIT</button>
//                   </div>
//                   <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, fontFamily: ff, marginBottom: 6 }}>{activeAddress.fullName}</div>
//                   <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
//                     {activeAddress.address}<br />
//                     {activeAddress.city}{activeAddress.postalCode ? `, ${activeAddress.postalCode}` : ""}<br />
//                     {activeAddress.phone}<br />
//                     {activeAddress.email}
//                   </div>
//                 </div>

//                 {cartItems.map(item => (
//                   <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0ece4" }}>
//                     <div style={{ width: 72, height: 56, flexShrink: 0, overflow: "hidden", background: CREAM }}>
//                       <img src={`${item.image}`} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>{item.name}</div>
//                       <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>{item.color} · Qty: {item.qty}</div>
//                     </div>
//                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>
//                       PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
//                     </div>
//                   </div>
//                 ))}

//                 <div style={{ background: "#e8f2f8", border: `1.5px solid #89c4e1`, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
//                   <span style={{ fontSize: 18 }}>💵</span>
//                   <div>
//                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", color: BLACK }}>CASH ON DELIVERY</div>
//                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>Pay PKR {grandTotal.toLocaleString()} when your order arrives</div>
//                   </div>
//                 </div>

//                 <div style={{ marginTop: 28 }}>
//                   <YBtn onClick={handlePlaceOrder} disabled={submitting} style={{ width: "100%", padding: 16, fontSize: 13, letterSpacing: "0.16em" }}>
//                     {submitting ? "PLACING YOUR ORDER…" : `PLACE ORDER · PKR ${grandTotal.toLocaleString()}`}
//                   </YBtn>
//                 </div>
//               </div>
//             </FadeIn>
//           )}
//         </div>

//         <div style={{ background: "#fff", border: "1px solid #e0e8ee", position: "sticky", top: 80 }}>
//           <div style={{ background: BLACK, padding: "18px 22px" }}>
//             <div style={{ width: 24, height: 3, background: BRAND, marginBottom: 8 }} />
//             <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>ORDER SUMMARY</div>
//           </div>
//           <div style={{ padding: 20 }}>
//             {cartItems.map(item => (
//               <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
//                 <div style={{ width: 52, height: 40, flexShrink: 0, overflow: "hidden", background: CREAM }}>
//                   <img src={`${item.image}`} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>{item.name}</div>
//                   <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono }}>× {item.qty}</div>
//                 </div>
//                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>
//                   PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
//                 </div>
//               </div>
//             ))}
//             <div style={{ borderTop: "1px solid #f0ece4", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Subtotal</span>
//                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Shipping</span>
//                 <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>
//                   {shipping === 0 ? "FREE" : `PKR ${shipping}`}
//                 </span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "2px solid #e8e0d0", marginTop: 4 }}>
//                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", color: BLACK }}>TOTAL</span>
//                 <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 16 : 18, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============ ORDER SUCCESS PAGE ============
// export function OrderSuccessPage({ navigate }) {
//   const [count, setCount] = useState(8);
//   const isMobile = useMediaQuery("(max-width: 767px)");

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     const t = setInterval(() => setCount(c => {
//       if (c <= 1) { clearInterval(t); navigate("#/"); return 0; }
//       return c - 1;
//     }), 1000);
//     return () => clearInterval(t);
//   }, [navigate]);

//   return (
//     <div style={{ minHeight: "100vh", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, position: "relative", overflow: "hidden", padding: "20px" }}>
//       <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
//         <Frame shape="round" size={isMobile ? 400 : 900} color="#fff"/>
//       </div>
//       <div style={{ textAlign: "center", maxWidth: 560, padding: "0 20px", position: "relative", zIndex: 1 }}>
//         <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 36, color: BRAND_TEXT }}>✓</div>
//         <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
//         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#fff", margin: "0 0 10px" }}>ORDER</h1>
//         <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#89c4e1", margin: "0 0 28px" }}>PLACED!</h1>
//         <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.45)", fontFamily: mono, lineHeight: 1.8, marginBottom: 36 }}>
//           Thank you for your order. Our team will call you to confirm delivery details. Your frames will arrive within 5–7 business days.
//         </p>
//         <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
//           <YBtn onClick={() => navigate("#/products")} style={{ padding: "13px 28px", fontSize: isMobile ? 10 : 12 }}>SHOP MORE FRAMES</YBtn>
//           <button onClick={() => navigate("#/")} style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.2)", padding: "13px 24px", fontSize: 12, fontWeight: 900, letterSpacing: "0.1em", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontFamily: ff }}>GO HOME</button>
//         </div>
//         <div style={{ marginTop: 28, fontSize: 11, color: "#444", fontFamily: mono }}>Redirecting to home in {count}s...</div>
//       </div>
//     </div>
//   );
// }

// // ============ REVIEW SUBMISSION PAGE ============
// export function ReviewSubmissionPage({ productId, reviewId, navigate }) {
//   const { user } = useAuth();
//   const [product, setProduct] = useState(null);
//   const [existingReview, setExistingReview] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [hovered, setHovered] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [msg, setMsg] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(true);

//   const isMobile = useMediaQuery("(max-width: 767px)");

//   useEffect(() => {
//     if (!user) { navigate("#/"); return; }
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     const found = PRODUCTS_DATA.find(p => p.id === productId);
//     setProduct(found || { id: productId, name: `Product #${productId}`, gallery: [], discountPrice: 0, price: 0 });

//     const loadExisting = async () => {
//       if (reviewId) {
//         try {
//           const res = await getUserReviews();
//           const reviews = res.data || [];
//           const match = reviews.find(r => r.reviewId === reviewId);
//           if (match) {
//             setExistingReview(match);
//             setRating(Number(match.rating) || 0);
//             setReviewText(match.review || "");
//           }
//         } catch {}
//       }
//       setLoading(false);
//     };
//     loadExisting();
//   }, [productId, reviewId, user, navigate]);

//   const handleSubmit = async () => {
//     if (!rating) { setMsg({ type: "error", text: "Please select a star rating before submitting." }); return; }
//     setSubmitting(true);
//     setMsg({ type: "", text: "" });
//     try {
//       if (existingReview && reviewId) {
//         await updateReview({ reviewId, rating, review: reviewText });
//       } else {
//         await submitReview({ productId, rating, review: reviewText });
//       }
//       setMsg({ type: "success", text: existingReview ? "Review updated successfully!" : "Review submitted! It will appear after approval." });
//       setTimeout(() => navigate("#/dashboard?tab=reviews"), 2200);
//     } catch (err) {
//       setMsg({ type: "error", text: err.message || "Submission failed. Please try again." });
//     }
//     setSubmitting(false);
//   };

//   if (!user) return null;

//   const LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

//   return (
//     <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
//       <div style={{ background: BLACK, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
//           <Frame shape="round" size={isMobile ? 300 : 600} color="#fff" />
//         </div>
//         <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
//           <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }} />
//           <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT · REVIEWS</div>
//           <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 8vw, 36px)" : "clamp(32px, 5vw, 60px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
//             {existingReview ? "EDIT REVIEW" : "WRITE A REVIEW"}
//           </h1>
//         </div>
//       </div>

//       <Breadcrumb crumbs={[
//         { label: "HOME", path: "#/" },
//         { label: "MY ACCOUNT", path: "#/dashboard" },
//         { label: "REVIEWS", path: "#/dashboard?tab=reviews" },
//         { label: existingReview ? "EDIT REVIEW" : "SUBMIT REVIEW", path: null },
//       ]} />

//       <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "56px 24px 80px" }}>
//         {loading ? (
//           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING…</div>
//         ) : (
//           <FadeIn>
//             {product && (
//               <div style={{ display: "flex", gap: 20, alignItems: "center", background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "12px" : "20px", marginBottom: 36, flexWrap: "wrap" }}>
//                 <div style={{ width: 90, height: 72, background: CREAM, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   {product.gallery?.[0]
//                     ? <img src={`${product.gallery[0]}`} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
//                     : <span style={{ fontSize: 28 }}>👓</span>
//                   }
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#aaa", fontFamily: ff, marginBottom: 4 }}>
//                     {product.category?.toUpperCase() || "EYEWEAR"}
//                   </div>
//                   <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 16, color: BLACK, letterSpacing: "0.04em", marginBottom: 4 }}>
//                     {product.name}
//                   </div>
//                   {product.discountPrice > 0 && (
//                     <div style={{ fontFamily: ff, fontSize: 13, color: BRAND, fontWeight: 700 }}>
//                       PKR {product.discountPrice.toLocaleString()}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             <div style={{ background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "20px" : "32px" }}>
//               <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 28, fontFamily: ff }}>
//                 {existingReview ? "UPDATE YOUR REVIEW" : "YOUR REVIEW"}
//               </div>

//               <div style={{ marginBottom: 28 }}>
//                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 12 }}>
//                   OVERALL RATING <span style={{ color: "#e74c3c" }}>*</span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
//                   <div style={{ display: "flex", gap: 4 }}>
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <button
//                         key={star}
//                         onClick={() => setRating(star)}
//                         onMouseEnter={() => setHovered(star)}
//                         onMouseLeave={() => setHovered(0)}
//                         style={{
//                           background: "none", border: "none", cursor: "pointer",
//                           fontSize: isMobile ? 28 : 36, padding: "0 3px",
//                           color: star <= (hovered || rating) ? "#f5a623" : "#e0ddd6",
//                           transition: "color 0.12s, transform 0.1s",
//                           transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
//                         }}
//                       >★</button>
//                     ))}
//                   </div>
//                   {(hovered || rating) > 0 && (
//                     <span style={{ fontSize: 12, color: "#888", fontFamily: mono, letterSpacing: "0.04em" }}>
//                       {LABEL[hovered || rating]}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div style={{ marginBottom: 28 }}>
//                 <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 8 }}>
//                   WRITTEN REVIEW <span style={{ fontSize: 10, color: "#aaa", fontWeight: 400 }}>(optional)</span>
//                 </div>
//                 <textarea
//                   value={reviewText}
//                   onChange={e => setReviewText(e.target.value)}
//                   placeholder="Share your experience with this frame — fit, quality, style..."
//                   rows={5}
//                   style={{
//                     width: "100%", padding: "14px 16px", border: "1.5px solid #e8e0d0",
//                     fontSize: 13, fontFamily: mono, color: BLACK, lineHeight: 1.7,
//                     resize: "vertical", outline: "none", boxSizing: "border-box",
//                     background: "#fafaf8",
//                   }}
//                   onFocus={e => e.target.style.borderColor = BRAND}
//                   onBlur={e => e.target.style.borderColor = "#e8e0d0"}
//                 />
//                 <div style={{ fontSize: 10, color: "#bbb", fontFamily: mono, marginTop: 6, textAlign: "right" }}>
//                   {reviewText.length} characters
//                 </div>
//               </div>

//               {msg.text && (
//                 <div style={{
//                   padding: "12px 16px", fontSize: 12, fontFamily: mono, marginBottom: 20,
//                   background: msg.type === "success" ? "#eaf5ef" : "#fef0f0",
//                   border: `1px solid ${msg.type === "success" ? "#a3d9b5" : "#f5c0c0"}`,
//                   color: msg.type === "success" ? "#2a8a50" : "#a33",
//                 }}>
//                   {msg.type === "success" ? "✓ " : "⚠ "}{msg.text}
//                 </div>
//               )}

//               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={submitting || rating === 0}
//                   style={{
//                     background: submitting || rating === 0 ? "#ccc" : BRAND, color: "#fff",
//                     border: "none", padding: "14px 28px", fontSize: 11, fontWeight: 900,
//                     letterSpacing: "0.14em", fontFamily: ff,
//                     cursor: submitting || rating === 0 ? "not-allowed" : "pointer",
//                     transition: "background 0.2s",
//                   }}
//                 >
//                   {submitting ? "SUBMITTING…" : existingReview ? "UPDATE REVIEW" : "SUBMIT REVIEW"}
//                 </button>
//                 <button
//                   onClick={() => navigate("#/dashboard?tab=reviews")}
//                   style={{
//                     background: "none", border: `1.5px solid #ccc`, color: "#888",
//                     padding: "14px 24px", fontSize: 11, fontWeight: 900,
//                     letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
//                   }}
//                 >
//                   ← BACK TO REVIEWS
//                 </button>
//               </div>

//               <div style={{ marginTop: 20, padding: "12px 16px", background: "#f8f8f4", border: "1px solid #eee" }}>
//                 <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, lineHeight: 1.8 }}>
//                   ★ Reviews are verified and approved before publishing. Only customers who have purchased this product may submit a review.
//                 </div>
//               </div>
//             </div>
//           </FadeIn>
//         )}
//       </div>
//     </div>
//   );
// }

// // ============ PRODUCT REVIEWS SECTION ============
// function ProductReviewsSection({ productId, navigate }) {
//   const { user } = useAuth();
//   const [reviews, setReviews] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   const isMobile = useMediaQuery("(max-width: 767px)");

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getReviews({ productId });
//       const data = res.data || [];
//       setReviews(Array.isArray(data) ? data : []);

//       if (data.length > 0) {
//         const total = data.length;
//         const avg = data.reduce((s, r) => s + Number(r.rating || 0), 0) / total;
//         const breakdown = [5, 4, 3, 2, 1].map(star => ({
//           star,
//           count: data.filter(r => Number(r.rating) === star).length,
//         }));
//         setStats({ avg: Math.round(avg * 10) / 10, total, breakdown });
//       } else {
//         setStats({ avg: 0, total: 0, breakdown: [] });
//       }
//     } catch {
//       setReviews([]);
//       setStats({ avg: 0, total: 0, breakdown: [] });
//     }
//     setLoading(false);
//   }, [productId]);

//   useEffect(() => { load(); }, [load]);

//   const displayed = showAll ? reviews : reviews.slice(0, 3);

//   return (
//     <div style={{ background: CREAM, borderTop: "2px solid #e8ddd0", padding: isMobile ? "40px 20px" : "64px 40px" }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto" }}>

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
//           <div>
//             <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>VERIFIED BUYERS</div>
//             <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 3.5vw, 36px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>
//               CUSTOMER REVIEWS
//             </h2>
//           </div>
//           {user && (
//             <button
//               onClick={() => navigate(`#/review/${productId}`)}
//               style={{
//                 background: BRAND, color: "#fff", border: "none",
//                 padding: "12px 24px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
//                 letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
//               }}
//             >
//               WRITE A REVIEW
//             </button>
//           )}
//         </div>

//         {loading ? (
//           <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING REVIEWS…</div>
//         ) : (
//           <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", gap: isMobile ? 32 : 48, alignItems: "flex-start" }}>

//             <div>
//               {stats && stats.total > 0 ? (
//                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24 }}>
//                   <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ece4" }}>
//                     <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 52, color: BLACK, lineHeight: 1 }}>
//                       {stats.avg.toFixed(1)}
//                     </div>
//                     <div style={{ color: "#f5a623", fontSize: 20, letterSpacing: 3, margin: "6px 0" }}>
//                       {"★".repeat(Math.round(stats.avg))}{"☆".repeat(5 - Math.round(stats.avg))}
//                     </div>
//                     <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>
//                       Based on {stats.total} review{stats.total !== 1 ? "s" : ""}
//                     </div>
//                   </div>
//                   {stats.breakdown.map(({ star, count }) => (
//                     <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
//                       <span style={{ fontSize: 10, fontFamily: ff, fontWeight: 900, color: "#888", minWidth: 28, textAlign: "right" }}>{star}★</span>
//                       <div style={{ flex: 1, height: 6, background: "#f0ece4", overflow: "hidden" }}>
//                         <div style={{ height: "100%", background: "#f5a623", width: stats.total > 0 ? `${(count / stats.total) * 100}%` : "0%", transition: "width 0.4s ease" }} />
//                       </div>
//                       <span style={{ fontSize: 10, fontFamily: mono, color: "#aaa", minWidth: 14 }}>{count}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24, textAlign: "center" }}>
//                   <div style={{ fontSize: 32, marginBottom: 8 }}>☆</div>
//                   <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, lineHeight: 1.7 }}>No reviews yet. Be the first!</div>
//                   {user && (
//                     <button
//                       onClick={() => navigate(`#/review/${productId}`)}
//                       style={{
//                         marginTop: 14, background: BRAND, color: "#fff", border: "none",
//                         padding: "10px 20px", fontSize: 10, fontWeight: 900,
//                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
//                       }}
//                     >
//                       WRITE A REVIEW
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div>
//               {reviews.length === 0 ? (
//                 <div style={{ padding: "32px 0", color: "#aaa", fontFamily: mono, fontSize: 13 }}>
//                   No reviews yet for this product.
//                 </div>
//               ) : (
//                 <>
//                   {displayed.map((r, i) => (
//                     <div key={r.reviewId || i} style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 22, marginBottom: 14 }}>
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
//                         <div>
//                           <div style={{ color: "#f5a623", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>
//                             {"★".repeat(Number(r.rating) || 0)}{"☆".repeat(5 - (Number(r.rating) || 0))}
//                           </div>
//                           <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 12, color: BLACK, letterSpacing: "0.04em" }}>
//                             {r.authorName || r.fullName || "Verified Buyer"}
//                           </div>
//                         </div>
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
//                           {(r.verifiedPurchase === true || r.verifiedPurchase === "TRUE" || r.verifiedPurchase === "true") && (
//                             <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", background: "#eaf5ef", color: "#2a8a50", fontFamily: ff }}>
//                               ✓ VERIFIED PURCHASE
//                             </span>
//                           )}
//                           <span style={{ fontSize: 10, color: "#bbb", fontFamily: mono }}>
//                             {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) : ""}
//                           </span>
//                         </div>
//                       </div>
//                       {r.review && (
//                         <p style={{ fontSize: 13, color: "#555", fontFamily: mono, margin: 0, lineHeight: 1.8 }}>
//                           {r.review}
//                         </p>
//                       )}
//                     </div>
//                   ))}

//                   {reviews.length > 3 && (
//                     <button
//                       onClick={() => setShowAll(v => !v)}
//                       style={{
//                         background: "none", border: `1.5px solid ${BLACK}`, color: BLACK,
//                         padding: "11px 24px", fontSize: 11, fontWeight: 900,
//                         letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer", marginTop: 8,
//                       }}
//                     >
//                       {showAll ? `SHOW FEWER ↑` : `VIEW ALL ${reviews.length} REVIEWS ↓`}
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export const CollectionPage = CollectionsLandingPage;























































// Complete file (the same structure as before, only shape filtering + HomePage modified)

import { useState, useEffect, useCallback } from "react";
import { PRODUCTS_DATA } from "../prodcut.js";
import { BLACK, CREAM, ff, mono, COLLECTIONS,
         HERO_SLIDES, HOME_PRODUCTS, TINTS, TESTIMONIALS, PROCESS_STEPS, CATEGORIES_HOME,
         tagColors } from "../contants/store.js";
import { applyProductFilters, getProductColorOptions, getProductBrandOptions, getProductSizeOptions, getProductDisplayPrice, getProductDiscountPercent, getProductDisplayImage, getRelatedProducts, getProductVariants, productMatchesShape, getUniqueShapesFromProducts, normalizeCategory, normalizeGender, formatPriceValue, matchesSearchTerm } from "../services/productUtils.js";
import { YBtn, OutlineBtn, FadeIn, Counter, Frame, ProductCard, ProductSlider, WishlistHeart, WishlistSkeleton } from "../components/shared";
import { useCart } from "../contexts/CardContext";
import { useAuth } from "../Auth/auth.jsx";
import {
  getWishlist, removeFromWishlist, getReviews, getAddresses,
  submitReview, updateReview, getProductReviewStats, getUserReviews,
} from "../services/service.js";

const BRAND      = "#0c2c41";
const BRAND_TEXT = "#ffffff";
const NAVY = BRAND;

// ============================================
// RESPONSIVE HOOK
// ============================================
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);
  return matches;
}

// ============================================
// SHARED VARIANT HELPERS
// ============================================
function normalizeVariantName(value) {
  return String(value || "").trim().toLowerCase();
}

function getStoredVariantName(productId) {
  try {
    return localStorage.getItem(`product-color:${productId}`) || "";
  } catch {
    return "";
  }
}

function setStoredVariantName(productId, name) {
  try {
    localStorage.setItem(`product-color:${productId}`, name);
  } catch {
    // ignore storage write failures
  }
}

// ============================================
// SHAPE HELPERS — single source of truth: product.js
// ============================================
// Resolves the shape value for a product. Some catalog entries may store the
// shape under `shape`, others under `subcategory` — this keeps both working
// consistently across the whole app (navbar + sidebar filter) without ever
// hardcoding a fixed list anywhere in the UI.
// (getProductShape / getUniqueShapesFromProducts now live in productUtils.js
// so App.jsx's navbar and this file's filter sidebar share one implementation.)

// ============================================
// HELPER — Join raw wishlist rows with product details
// ============================================
function enrichWishlistItems(rawItems) {
  return rawItems
    .map(item => {
      const product = PRODUCTS_DATA.find(p => String(p.id) === String(item.productId));
      if (!product) return null;
      return {
        ...item,
        product: {
          name       : product.name,
          price      : product.price,
          salePrice  : product.discountPrice,
          imageUrl   : product.gallery?.[0] || product.image || "",
          color      : product.color,
          subcategory: product.subcategory,
          gender     : product.gender,
        },
      };
    })
    .filter(item => item !== null);
}

// ============================================
// COLLECTIONS DATA
// ============================================
// Only collections backed by a real, matching filter in COLLECTIONS (contants/store.js)
// belong here — every card must open the exact matching set of products.
// Each tile links straight to the filtered products page (not another
// collection page) — `query` becomes the ?category=&gender=&shape= on
// #/products, same params the navbar's shape/gender links already use.
const COLLECTIONS_PAGE_DATA = [
  { slug: "mens-collection", name: "Men's Collection", desc: "Bold frames for every face.", tag: null, bg: "#f5f5f5", dark: false, shape: "aviator", query: { gender: "Men" } },
  { slug: "womens-collection", name: "Women's Collection", desc: "Refined eyewear for every occasion.", tag: null, bg: "#fdf4f4", dark: false, shape: "cateye", query: { gender: "Women" } },
  { slug: "custom-made-tints", name: "Custom Made Tints™", desc: "20+ hand-applied shades. Any frame.", tag: "EXCLUSIVE", bg: "#1a1a1a", dark: true, shape: "cateye", query: { category: "Sunglasses" } },
  { slug: "round", name: "Round Frames", desc: "The timeless silhouette.", tag: null, bg: CREAM, dark: false, shape: "round", query: { shape: "Round" } },
  { slug: "square", name: "Square Frames", desc: "Sharp. Structured. Striking.", tag: null, bg: "#f5f5f0", dark: false, shape: "square", query: { shape: "Square" } },
];

// ============================================
// BREADCRUMB
// ============================================
function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="breadcrumb" style={{ background: CREAM, borderBottom: "1px solid #e8e0d0", padding: "12px 20px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && <span style={{ color: "#bbb", fontSize: 10 }}>›</span>}
            {crumb.path
              ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
              : <span aria-current="page" style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// SORT OPTIONS
// ─────────────────────────────────────────────
const SORT_OPTS = [
  { key: "featured",    label: "Featured" },
  { key: "relevant",    label: "Most relevant" },
  { key: "bestSelling", label: "Best selling" },
  { key: "alphaAZ",     label: "Alphabetically, A-Z" },
  { key: "alphaZA",     label: "Alphabetically, Z-A" },
  { key: "priceLow",    label: "Price, low to high" },
  { key: "priceHigh",   label: "Price, high to low" },
  { key: "dateNew",     label: "Date, new to old" },
  { key: "dateOld",     label: "Date, old to new" },
];

// ============================================
// FILTER + SORT FUNCTIONS (UPDATED)
// ============================================

function applyFilters(products, activeFilters, sort, searchTerm = "") {
  let filtered = products;

  // 1. Apply search
  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      (p.category && p.category.toLowerCase().includes(term)) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
      (p.gender && p.gender.toLowerCase().includes(term))
    );
  }

  // 2. Apply size filter (now using Small/Medium/Large categories)
  if (activeFilters.size && activeFilters.size.length) {
    filtered = filtered.filter(p =>
      p.sizes && p.sizes.some(s =>
        activeFilters.size.some(cat => s.includes(`(${cat})`))
      )
    );
  }

  // 3. Apply shape filter (dynamic — sourced from product.js via getProductShape)
  if (activeFilters.shape && activeFilters.shape.length) {
    filtered = filtered.filter(p => activeFilters.shape.some(shapeValue => productMatchesShape(p, shapeValue)));
  }

  // 4. Remove size/shape from activeFilters so applyProductFilters doesn't filter them again
  const otherFilters = { ...activeFilters };
  delete otherFilters.size;
  delete otherFilters.shape;

  // 5. Apply all other filters (category, brand, price, rating, etc.) and sort
  filtered = applyProductFilters(filtered, otherFilters, sort, "");

  return filtered;
}

// NOTE: price parsing + free-text search matching now live in
// ../services/productUtils.js (matchesSearchTerm / searchProducts) so the navbar
// search box and this Products page share one implementation.

// Build a "related products" list for a set of matched products. Pulls each
// match's explicit relatedIds first, then fills with frames sharing the same
// category / subcategory / gender. Excludes anything already on screen.
function getRelatedForMatches(allProducts, matches, excludeIds = [], limit = 8) {
  const exclude = new Set(excludeIds.map(String));
  const picked = [];
  const pushUnique = (p) => {
    if (!p) return;
    if (exclude.has(String(p.id))) return;
    if (picked.some((x) => x.id === p.id)) return;
    picked.push(p);
  };

  // 1. Explicit relatedIds from each matched product.
  matches.forEach((m) => {
    (m.relatedIds || []).forEach((rid) => pushUnique(allProducts.find((p) => p.id === rid)));
  });

  // 2. Same category / subcategory / gender as any match.
  if (picked.length < limit) {
    matches.forEach((m) => {
      allProducts.forEach((p) => {
        if (picked.length >= limit) return;
        const sameCat = normalizeCategory(p.category) === normalizeCategory(m.category);
        const sameSub = m.subcategory && p.subcategory && p.subcategory === m.subcategory;
        const sameGender = m.gender && p.gender && p.gender.toLowerCase() === m.gender.toLowerCase();
        if (sameCat || sameSub || sameGender) pushUnique(p);
      });
    });
  }

  return picked.slice(0, limit);
}

function sortProducts(arr, sort) {
  const a = [...arr];
  if (sort === "alphaAZ")   return a.sort((x, y) => x.name.localeCompare(y.name));
  if (sort === "alphaZA")   return a.sort((x, y) => y.name.localeCompare(x.name));
  if (sort === "priceLow")  return a.sort((x, y) => getProductDisplayPrice(x).discountPrice - getProductDisplayPrice(y).discountPrice);
  if (sort === "priceHigh") return a.sort((x, y) => getProductDisplayPrice(y).discountPrice - getProductDisplayPrice(x).discountPrice);
  if (sort === "dateNew")   return a.reverse();
  return a;
}

// Define ShapeIcon component to avoid ReferenceError
function ShapeIcon({ shape, active }) {
  const color = active ? "#fff" : "#555";
  // Known shape icons — any shape not listed here falls back to a generic
  // circle glyph, so new shapes added in product.js render fine automatically.
  const svgMap = {
    "Round": <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />,
    "Square": <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth="1.5" fill="none" />,
    "Aviator": <path d="M4 18 L12 6 L20 18 L16 18 L12 12 L8 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
    "Cat-Eye": <path d="M6 8 L10 4 L18 6 L22 12 L18 18 L10 18 L4 14 Z" stroke={color} strokeWidth="1.5" fill="none" />,
    "Geometric": <polygon points="6,6 18,6 20,12 14,18 6,18 4,12" stroke={color} strokeWidth="1.5" fill="none" />,
    "Browline": <path d="M4 12 L8 8 L16 8 L20 12 L18 18 L6 18 Z" stroke={color} strokeWidth="1.5" fill="none" />,
    "Rectangle": <rect x="3" y="6" width="18" height="12" stroke={color} strokeWidth="1.5" fill="none" />,
    "Oval": <ellipse cx="12" cy="12" rx="9" ry="7" stroke={color} strokeWidth="1.5" fill="none" />,
    "Hexagon": <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" stroke={color} strokeWidth="1.5" fill="none" />,
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgMap[shape] || <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />}
    </svg>
  );
}

// ============================================
// FILTER SIDEBAR (UPDATED — SHAPE IS NOW DYNAMIC)
// ============================================

function FilterSidebar({ allProducts, activeFilters, setActiveFilters, filtersOpen, isMobile, onClose }) {
  const [open, setOpen] = useState({ category: true, gender: true, color: true, brand: false, rating: false, price: true, size: false, availability: false });
  if (!filtersOpen) return null;

  const toggleSec = k => setOpen(s => ({ ...s, [k]: !s[k] }));
  const toggle = (group, value) =>
    setActiveFilters(prev => {
      const cur = prev[group] || [];
      return { ...prev, [group]: cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value] };
    });
  const isOn = (group, value) => (activeFilters[group] || []).includes(value);

  const Section = ({ id, title, children }) => (
    <div style={{ borderBottom: "1px solid #e8e0d0" }}>
      <button onClick={() => toggleSec(id)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 0", background: "none", border: "none", cursor: "pointer",
        fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.14em", color: BLACK,
      }}>
        {title}
        <span style={{ fontSize: 10, color: "#999", display: "block", transition: "transform 0.2s", transform: open[id] ? "rotate(180deg)" : "none" }}>▲</span>
      </button>
      {open[id] && <div style={{ paddingBottom: 14 }}>{children}</div>}
    </div>
  );

  const Check = ({ group, value, label, count }) => {
    const on = isOn(group, value);
    return (
      <label onClick={() => toggle(group, value)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, padding: "5px 0", cursor: "pointer",
        fontSize: 13, color: on ? BLACK : "#555", fontFamily: mono,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 15, height: 15, flexShrink: 0,
            border: `1.5px solid ${on ? BRAND : "#ccc"}`,
            background: on ? BRAND : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
          }}>
            {on && <span style={{ color: BRAND_TEXT, fontSize: 9, lineHeight: 1 }}>✓</span>}
          </div>
          <span>{label}</span>
        </div>
        {count !== undefined && <span style={{ fontSize: 11, color: "#bbb", fontFamily: ff }}>({count})</span>}
      </label>
    );
  };

  const wrapStyle = isMobile
    ? { position: "fixed", inset: 0, zIndex: 1000, background: "#fff", padding: "20px 16px 80px", overflowY: "auto" }
    : { width: 210, flexShrink: 0, padding: "20px 20px 80px 0", borderRight: "1px solid #e8e0d0" };

  // Define size categories and compute counts
  const sizeCategories = ["Small", "Medium", "Large"];
  const sizeCounts = sizeCategories.map(cat => ({
    label: cat,
    count: allProducts.filter(p =>
      p.sizes && p.sizes.some(s => s.includes(`(${cat})`))
    ).length
  }));

  // Shapes are pulled ONLY from the current product set (product.js) — no
  // hardcoded list. Automatically picks up any new shape added to the catalog.
  const dynamicShapes = getUniqueShapesFromProducts(allProducts);

  return (
    <div style={wrapStyle}>
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em" }}>FILTER</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: BLACK, lineHeight: 1 }}>×</button>
        </div>
      )}

      <Section id="shape" title="SHAPE">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, paddingTop: 4 }}>
          {dynamicShapes.map((shapeValue) => {
            const matches = allProducts.filter((product) => productMatchesShape(product, shapeValue));
            if (matches.length === 0) return null;
            const on = isOn("shape", shapeValue);
            const thumbSrc = getProductDisplayImage(matches[0]).displayImage;
            return (
              <button key={shapeValue} onClick={() => toggle("shape", shapeValue)} style={{
                border: `1.5px solid ${on ? BRAND : "#ddd"}`,
                background: on ? BRAND : "#fff",
                padding: "10px 6px 8px", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.18s",
              }}>
                {thumbSrc ? (
                  <img src={thumbSrc} alt={shapeValue} style={{ width: 28, height: 28, objectFit: "cover", borderRadius: "50%", border: `1.5px solid ${on ? "#fff" : "#eee"}`, background: "#fff" }} />
                ) : (
                  <ShapeIcon shape={shapeValue} active={on} />
                )}
                <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", fontFamily: ff, color: on ? BRAND_TEXT : "#555" }}>
                  {shapeValue.toUpperCase()}
                </span>
                <span style={{ fontSize: 9, color: on ? "rgba(255,255,255,0.6)" : "#aaa", fontFamily: mono }}>({matches.length})</span>
              </button>
            );
          })}
          {dynamicShapes.length === 0 && (
            <div style={{ fontSize: 11, color: "#aaa", fontFamily: mono, gridColumn: "1 / -1" }}>
              No shapes available
            </div>
          )}
        </div>
      </Section>

      <Section id="category" title="CATEGORY">
        {Array.from(new Set(allProducts.map((product) => normalizeCategory(product.category || "Eyeglasses")).filter(Boolean))).map((value) => (
          <Check key={value} group="category" value={value} label={value} count={allProducts.filter((product) => normalizeCategory(product.category || "Eyeglasses") === value).length} />
        ))}
      </Section>

      <Section id="gender" title="GENDER">
        {["Men", "Women", "Unisex"].map((value) => (
          <Check
            key={value}
            group="gender"
            value={value}
            label={value}
            count={allProducts.filter((product) => {
              const gender = normalizeGender(product.gender);
              return gender === "Unisex" || gender === value;
            }).length}
          />
        ))}
      </Section>

      <Section id="size" title="SIZE">
        {sizeCounts.map(({ label, count }) => (
          <Check
            key={label}
            group="size"
            value={label}
            label={label}
            count={count}
          />
        ))}
      </Section>

      {/* Other sections (color, brand, rating, price) omitted for brevity but can be added back */}

      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#fff", borderTop: "1px solid #e8e0d0" }}>
          <YBtn onClick={onClose} style={{ width: "100%", padding: "14px" }}>APPLY FILTERS</YBtn>
        </div>
      )}
    </div>
  );
}

const PRICE_LABELS = { under20: "Under 20K", "20to30": "20K–30K", above30: "Above 30K" };

function FilterSortBar({ filtersOpen, toggleFilters, isMobile, sort, setSort, count, activeFilters, setActiveFilters }) {
  const allActive = Object.entries(activeFilters).flatMap(([grp, vals]) => vals.map(v => ({ grp, v })));
  const labelFor = (grp, v) => {
    if (grp === "price") return PRICE_LABELS[v];
    if (grp === "size") return v; // already Small/Medium/Large
    if (grp === "shape") return v; // already the raw shape value from product.js
    return v;
  };

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e8e0d0", position: "sticky", top: isMobile ? 56 : 62, zIndex: 20 }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 50,
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0, overflow: "hidden", flexWrap: "wrap" }}>
          <button onClick={toggleFilters} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 900, letterSpacing: "0.12em",
            color: BLACK, fontFamily: ff, padding: 0, whiteSpace: "nowrap", flexShrink: 0,
          }}>
            <svg width="17" height="13" viewBox="0 0 18 14" fill="none">
              <line x1="0" y1="2"  x2="18" y2="2"  stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="5"  cy="2"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="11" cy="7"  r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="7"  cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {filtersOpen ? "Hide Filter" : "Show Filter"}
          </button>

          {allActive.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", overflow: "hidden" }}>
              {allActive.slice(0, isMobile ? 2 : 6).map(({ grp, v }) => (
                <button key={`${grp}-${v}`}
                  onClick={() => setActiveFilters(prev => ({ ...prev, [grp]: (prev[grp] || []).filter(x => x !== v) }))}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    background: BRAND, color: BRAND_TEXT, border: "none",
                    padding: "3px 8px 3px 9px", fontSize: 9, fontWeight: 900,
                    letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap",
                  }}>
                  {labelFor(grp, v)} <span style={{ fontSize: 12, lineHeight: 1 }}>×</span>
                </button>
              ))}
              <button onClick={() => setActiveFilters({})} style={{
                background: "none", border: "none", fontSize: 10, color: "#999",
                cursor: "pointer", fontFamily: ff, fontWeight: 700, textDecoration: "underline", whiteSpace: "nowrap",
              }}>Clear all</button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 12, color: "#999", fontFamily: mono, whiteSpace: "nowrap" }}>{count} products</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12, color: "#666", fontFamily: mono, display: isMobile ? "none" : "inline" }}>Sort by:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background: "none", border: "1px solid #ddd", padding: "5px 8px",
              fontSize: 12, color: BLACK, fontFamily: mono, cursor: "pointer", outline: "none",
              maxWidth: isMobile ? "120px" : "auto",
            }}>
              {SORT_OPTS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ COLLECTIONS LANDING PAGE ============
export function CollectionsLandingPage({ navigate }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/DSC08359.jpg) center/cover no-repeat`, padding: "72px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10 }}>URBAN EYE</div>
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", margin: "0 0 20px" }}>COLLECTIONS</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>Curated groups of frames for every occasion, face, and personality.</p>
        </div>
      </div>

      <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "COLLECTIONS", path: null }]} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 20px 80px" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>FEATURED</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 3 }}>
            {COLLECTIONS_PAGE_DATA.slice(0, 2).map((col, i) => (
              <FadeIn key={col.slug} delay={i * 80}>
                <div onClick={() => navigate(`#/products?${new URLSearchParams(col.query).toString()}`)} style={{ height: 380, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 36, transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.92"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                  <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }}>
                    <Frame shape={col.shape} size={220} color={col.dark ? "#fff" : "#000"} />
                  </div>
                  {col.tag && <div style={{ position: "absolute", top: 20, left: 20, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "5px 12px", fontFamily: ff }}>{col.tag}</div>}
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 6 }}>{PRODUCTS_DATA.filter(COLLECTIONS[col.slug]?.filter || (() => false)).length} STYLES</div>
                  <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: 32, color: col.dark ? "#fff" : BLACK, margin: "0 0 8px", letterSpacing: "0.02em" }}>{col.name.toUpperCase()}</h2>
                  <p style={{ fontSize: 13, color: col.dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontFamily: mono, margin: "0 0 16px" }}>{col.desc}</p>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1", fontFamily: ff }}>SHOP COLLECTION →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>ALL COLLECTIONS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
            {COLLECTIONS_PAGE_DATA.slice(2).map((col, i) => (
              <FadeIn key={col.slug} delay={i * 60}>
                <div onClick={() => navigate(`#/products?${new URLSearchParams(col.query).toString()}`)} style={{ height: 260, background: col.bg, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                  <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
                    <Frame shape={col.shape} size={160} color={col.dark ? "#fff" : "#000"} />
                  </div>
                  {col.tag && <div style={{ position: "absolute", top: 14, left: 14, background: BRAND, color: BRAND_TEXT, fontSize: 8, fontWeight: 900, letterSpacing: "0.16em", padding: "4px 10px", fontFamily: ff }}>{col.tag}</div>}
                  <div style={{ fontSize: 9, letterSpacing: "0.16em", color: col.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginBottom: 4 }}>{PRODUCTS_DATA.filter(COLLECTIONS[col.slug]?.filter || (() => false)).length} STYLES</div>
                  <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: 20, color: col.dark ? "#fff" : BLACK, margin: "0 0 6px" }}>{col.name.toUpperCase()}</h3>
                  <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", color: "#89c4e1" }}>EXPLORE →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ABOUT US / OUR STORY PAGE ============
const SHOP_IMAGES = ["/contact/20251018_175251.jpg", "/contact/20251018_180105.jpg"];
const CRAFT_IMAGES = [
  "/content/20250304_164413.jpg",
  "/content/20250304_183750.jpg",
  "/content/20250305_192958.jpg",
  "/content/20250306_181037.jpg",
  "/content/20250306_184828.jpg",
  "/content/20250306_190752.jpg",
];
const CRAFT_VIDEO = "/content/1.mp4";

export function AboutUsPage({ navigate }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20251018_140030.jpg) center/cover no-repeat`, padding: isMobile ? "56px 20px" : "80px 40px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10 }}>URBAN EYE</div>
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", margin: "0 0 16px" }}>OUR STORY</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>Eye-conic eyewear, crafted with care — since 2015.</p>
        </div>
      </div>

      <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "OUR STORY", path: null }]} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <FadeIn>
          <blockquote style={{ fontFamily: mono, fontSize: isMobile ? "clamp(16px, 5vw, 20px)" : "clamp(18px, 2.4vw, 26px)", lineHeight: 1.6, color: BLACK, textAlign: "center", margin: "0 0 20px", fontStyle: "italic" }}>
            "For over a decade, our name has been on the front door. That means something."
          </blockquote>
          <div style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.16em", color: "#666", marginBottom: 60 }}>TARIQ HASSAN · FOUNDER, URBAN EYE</div>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8, textAlign: "center" }}>VISIT US</div>
          <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "clamp(28px, 3.6vw, 40px)", textAlign: "center", margin: "0 0 40px" }}>OUR STORE</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            {SHOP_IMAGES.map((src, i) => (
              <div key={i} style={{ background: CREAM, display: "flex" }}>
                <img src={src} alt="Urban Eye store" loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8, textAlign: "center", marginTop: 64 }}>THE CRAFT</div>
          <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "clamp(28px, 3.6vw, 40px)", textAlign: "center", margin: "0 0 40px" }}>EVERY FRAME, UP CLOSE</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 10, marginBottom: 32 }}>
            {CRAFT_IMAGES.map((src) => (
              <div key={src} style={{ background: CREAM, display: "flex" }}>
                <img src={src} alt="Urban Eye craftsmanship detail" loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
          <video
            src={CRAFT_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={CRAFT_IMAGES[0]}
            style={{ width: "100%", maxHeight: isMobile ? 300 : 480, objectFit: "cover", display: "block", background: CREAM }}
          />
        </FadeIn>
      </div>
    </div>
  );
}

// ============ HOME PAGE (FIXED) ============
const GALLERY_IMAGES = [
  "/content/DSC08310.jpg",
  "/content/DSC08314.jpg",
  "/content/DSC08347.jpg",
  "/content/DSC08357.jpg",
  "/content/DSC08362.jpg",
  "/content/DSC08367.jpg",
  "/content/DSC08374.jpg",
  "/content/20251018_140021.jpg",
];
const GALLERY_VIDEO = "/content/2.mp4";

export function HomePage({ navigate }) {
  const [heroSlide, setHeroSlide] = useState(0);
  const [filter, setFilter] = useState("All");
  const [testimonialIdx, setTIdx] = useState(0);
  const { addToCart } = useCart();
  // Use all products for filtering, then slice to 8 for display
  const allProducts = PRODUCTS_DATA;

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(i => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[heroSlide];
  const FILTERS = ["All", "Eyeglasses", "Sunglasses"];
  // Apply filter first, then take first 8
  const filtered = filter === "All"
    ? allProducts.slice(0, 8)
    : allProducts.filter(p => p.category === (filter === "Eyeglasses" ? "Optical" : "Sunglass")).slice(0, 8);

  const HomeProductCard = ({ product }) => {
    const [hov, setHov] = useState(false);
    const [addedMsg, setAddedMsg] = useState(false);
    const { price, discountPrice } = getProductDisplayPrice(product);
    const discount = getProductDiscountPercent(product);
    const variants = getProductVariants(product);

    const [selectedVariantName, setSelectedVariantName] = useState(() => {
      const stored = getStoredVariantName(product?.id);
      const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
      return match ? match.name : (variants[0]?.name || "");
    });

    useEffect(() => {
      const stored = getStoredVariantName(product?.id);
      const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
      const nextName = match ? match.name : (variants[0]?.name || "");
      setSelectedVariantName(nextName);
    }, [product?.id, variants.length]);

    const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
    const displayImage = selectedVariant?.image || product.image || "";

    const handleSelectColor = (variant, e) => {
      e.stopPropagation();
      setSelectedVariantName(variant.name);
      setStoredVariantName(product.id, variant.name);
    };

    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => navigate(`#/products/${product.id}`)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(`#/products/${product.id}`);
          }
        }}
        role="button"
        tabIndex={0}
        style={{
          background: "#fff",
          border: "1.5px solid #e5e0d8",
          position: "relative",
          cursor: "pointer",
          transition: "box-shadow 0.3s, transform 0.3s",
          boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
          transform: hov ? "translateY(-3px)" : "none"
        }}
      >
        {discount > 0 && !product.tag && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 8px" }}>−{discount}%</div>
        )}
        {product.tag && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: BLACK, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", padding: "4px 10px" }}>{product.tag}</div>
        )}

        <WishlistHeart productId={product.id} size="md" placement="card" />

        <div style={{ height: isMobile ? 140 : 190, display: "flex", alignItems: "center", justifyContent: "center", background: hov ? CREAM : "#FAFAF5", transition: "background 0.3s", position: "relative" }}>
          {displayImage ? (
            <img src={displayImage} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 18, transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s" }} />
          ) : (
            <Frame shape="round" size={130} color={hov ? BRAND : "#4a4a4a"} />
          )}

          {variants.length > 1 && (
            <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 8, zIndex: 3 }}>
              {variants.map((variant) => {
                const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
                return (
                  <button
                    key={variant.name}
                    onClick={(e) => handleSelectColor(variant, e)}
                    title={variant.name}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: active ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.1)",
                      background: variant.swatch || "#d9d9d9",
                      cursor: "pointer",
                      padding: 0,
                      boxShadow: active ? "0 0 0 2px rgba(12,44,65,0.12)" : "none",
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div style={{ padding: "6px 14px 14px" }}>
          <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.14em", marginBottom: 2 }}>{(product.category || "Eyeglasses").toUpperCase()}</div>
          <div style={{ fontFamily: ff, fontSize: isMobile ? 14 : 16, fontWeight: 900, letterSpacing: "0.05em", color: BLACK, marginBottom: 10 }}>
            {product.name}
          </div>
          <div style={{ fontSize: 12, color: "#666", fontFamily: mono, marginBottom: 10, minHeight: 36 }}>{product.shortDescription || product.description?.slice(0, 80)}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>PKR {discountPrice.toLocaleString()}</div>
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product, 1); setAddedMsg(true); setTimeout(() => setAddedMsg(false), 1800); }}
              style={{
                border: `1.5px solid ${BRAND}`,
                padding: "7px 16px",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.12em",
                cursor: "pointer",
                background: addedMsg ? "#16a34a" : hov ? BRAND : "transparent",
                color: addedMsg ? "#fff" : hov ? BRAND_TEXT : BRAND,
                transition: "all 0.22s"
              }}
            >
              {addedMsg ? "✓ ADDED" : hov ? "ADD TO BAG" : "SELECT"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ color: BLACK }}>
      {/* HERO */}
      <section
        style={{
          minHeight: isMobile ? "60vh" : "88vh",
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "background-image 1.1s ease",
        }}
      >
        <div style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          zIndex: 2,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                height: 3,
                border: "none",
                cursor: "pointer",
                borderRadius: 0,
                background: i === heroSlide ? BRAND : slide.dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
                width: i === heroSlide ? 32 : 10,
                transition: "all 0.35s"
              }}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      {/* <section style={{ background: BLACK, padding: isMobile ? "32px 20px" : "56px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 16 : 0 }}>
          {[{ v: 150, s: "+", l: "Frame Styles" }, { v: 10, s: "+", l: "Years in Karachi" }, { v: 8500, s: "+", l: "Happy Customers" }, { v: 99, s: "%", l: "Satisfaction Rate" }].map((st, i) => (
            <FadeIn key={st.l} delay={i * 100} style={{ textAlign: "center", padding: "16px 0", borderRight: (i < 3 && !isMobile) ? "1px solid #1e1e1e" : "none" }}>
              <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(40px,5vw,64px)", color: BRAND, lineHeight: 1 }}><Counter target={st.v} suffix={st.s}/></div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginTop: 8 }}>{st.l.toUpperCase()}</div>
            </FadeIn>
          ))}
        </div>
      </section> */}

      {/* HERITAGE QUOTE */}
      <section style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center", borderBottom: "2px solid #e8ddd0" }}>
        <FadeIn>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 28px" }}/>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 18 }}>EYE-CONIC EYEWEAR, SINCE 2015</div>
            <blockquote style={{ fontFamily: mono, fontSize: isMobile ? "clamp(16px, 5vw, 22px)" : "clamp(18px, 2.8vw, 28px)", lineHeight: 1.5, color: BLACK, margin: "0 0 20px", fontStyle: "italic" }}>"For over a decade, our name has been on the front door. That means something."</blockquote>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#666", fontFamily: ff }}>TARIQ HASSAN · FOUNDER, URBAN EYE</div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
              <a href="#/story" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>OUR STORY</a>
              <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#888", textDecoration: "none", borderBottom: "2px solid #ddd", paddingBottom: 2 }}>SHOP EYEGLASSES</a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>BROWSE</div>
                <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>SHOP BY CATEGORY</h2>
              </div>
              <a href="#/collections/eyeglasses" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: "#888", textDecoration: "none", borderBottom: `2px solid ${BRAND}`, paddingBottom: 2 }}>VIEW ALL →</a>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 2 }}>
            {CATEGORIES_HOME.map((cat, i) => (
              <FadeIn key={cat.label} delay={i * 80}>
                <div onClick={() => navigate(`#/collections/${cat.slug}`)} style={{ minHeight: isMobile ? 220 : 330, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 16 : 28, cursor: "pointer", position: "relative", overflow: "hidden", background: cat.dark ? BLACK : CREAM, color: cat.dark ? "#fff" : BLACK }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: BRAND }}/>
                  <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
                    <Frame shape={cat.shape} size={isMobile ? 120 : 190} color={cat.dark ? "#fff" : "#000"}/>
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", marginBottom: 6, opacity: 0.5 }}>{cat.count.toUpperCase()}</div>
                  <div style={{ fontFamily: ff, fontSize: isMobile ? 16 : 20, fontWeight: 900, letterSpacing: "0.04em" }}>{cat.label.toUpperCase()}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 12, color: cat.dark ? "#89c4e1" : BRAND, fontWeight: 900 }}>SHOP NOW →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS - FIXED: filter from all products, then slice */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#FAFAF5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>HANDPICKED</div>
                <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>BEST SELLERS</h2>
              </div>
              <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", fontSize: isMobile ? 8 : 10, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", border: `1.5px solid ${filter === f ? BRAND : "#ddd"}`, background: filter === f ? BRAND : "transparent", color: filter === f ? BRAND_TEXT : "#888", fontFamily: ff, transition: "all 0.2s" }}>{f.toUpperCase()}</button>
                ))}
              </div>
            </div>
          </FadeIn>
          <ProductSlider products={filtered} navigate={navigate} isMobile={isMobile} />
          <FadeIn delay={280}>
            <div style={{ textAlign: "center", marginTop: 44 }}>
              {/* FIX: navigate to Products page instead of Collections */}
              <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>VIEW ALL FRAMES</YBtn>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CUSTOM TINTS (active version) */}
      <section style={{ background: CREAM, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "2px solid #e8ddd0", borderBottom: "2px solid #e8ddd0" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <Frame shape="cateye" size={isMobile ? 400 : 900} color={BLACK}/>
        </div>
        <FadeIn>
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
            <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
            <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#888", marginBottom: 12 }}>EXCLUSIVE TO URBAN EYE</div>
            <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BLACK, lineHeight: 0.92, margin: "0 0 6px" }}>CUSTOM MADE</h2>
            <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(44px,8vw,88px)", color: BRAND, lineHeight: 0.92, margin: "0 0 28px" }}>TINTS™</h2>
            <p style={{ fontSize: isMobile ? 13 : 15, color: "#666", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontFamily: mono }}>Choose any frame. Choose any tint. Our opticians hand-apply your chosen colour — 20+ shades to make it yours.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
              {TINTS.map(t => (
                <div key={t.name} title={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <div style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: "50%", background: t.color, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}/>
                  <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#999", fontFamily: ff }}>{t.name}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#999", marginLeft: 8 }}>+12 more</div>
            </div>
            <YBtn onClick={() => navigate("#/collections/custom-made-tints")} style={{ padding: "14px 32px", fontSize: isMobile ? 10 : 12 }}>SHOP CUSTOM TINTS™</YBtn>
          </div>
        </FadeIn>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: BLACK }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
              <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#444", marginBottom: 10 }}>HOW IT WORKS</div>
              <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,48px)", color: "#fff", margin: 0 }}>FROM BROWSE TO DELIVERED</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: 28, position: "relative" }}>
            {!isMobile && <div style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 1, background: "#1e1e1e" }}/>}
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 90}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${BRAND}`, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: ff, fontSize: 15, fontWeight: 900, color: "#89c4e1" }}>{step.num}</div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.08em", marginBottom: 8 }}>{step.title}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, fontFamily: mono }}>{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: CREAM }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 20px" }}/>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 8 }}>REVIEWS</div>
            <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", marginBottom: 52, letterSpacing: "0.02em" }}>WHAT OUR CUSTOMERS SAY</h2>
            <div style={{ position: "relative", minHeight: isMobile ? 280 : 200 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} style={{ position: "absolute", inset: 0, opacity: i === testimonialIdx ? 1 : 0, transform: i === testimonialIdx ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s ease", pointerEvents: i === testimonialIdx ? "auto" : "none" }}>
                  <div style={{ fontSize: 20, color: BRAND, marginBottom: 18, letterSpacing: 4 }}>{"★".repeat(t.rating)}</div>
                  <blockquote style={{ fontFamily: mono, fontStyle: "italic", lineHeight: 1.65, fontSize: isMobile ? "clamp(14px, 4vw, 18px)" : "clamp(15px,2.2vw,20px)", color: BLACK, margin: "0 0 24px" }}>"{t.text}"</blockquote>
                  <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.1em", marginTop: 4 }}>{t.city}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: isMobile ? 280 : 210 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTIdx(i)} style={{ height: 3, border: "none", cursor: "pointer", background: i === testimonialIdx ? BRAND : "#ccc", width: i === testimonialIdx ? 28 : 10, transition: "all 0.35s" }}/>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY — real studio shots from public/content */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 6 }}>CRAFTSMANSHIP</div>
              <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px,4vw,46px)", margin: 0, letterSpacing: "0.02em" }}>UP CLOSE</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 3, marginBottom: 3 }}>
            {GALLERY_IMAGES.map((src, i) => (
              <FadeIn key={src} delay={i * 60}>
                <div style={{ background: CREAM, display: "flex" }}>
                  <img src={src} alt="Urban Eye frame detail" loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={GALLERY_IMAGES.length * 60}>
            <video
              src={GALLERY_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={GALLERY_IMAGES[0]}
              style={{ width: "100%", maxHeight: isMobile ? 320 : 560, objectFit: "cover", display: "block", background: CREAM }}
            />
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: BLACK, padding: isMobile ? "60px 20px" : "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.025, pointerEvents: "none" }}>
          <Frame shape="aviator" size={isMobile ? 400 : 1000} color="#fff"/>
        </div>
        <FadeIn>
          <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
          <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#444", marginBottom: 14 }}>START YOUR JOURNEY</div>
          <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#fff", lineHeight: 0.92, margin: "0 0 8px" }}>FIND YOUR</h2>
          <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 10vw, 48px)" : "clamp(48px,9vw,100px)", color: "#89c4e1", lineHeight: 0.92, margin: "0 0 28px" }}>FRAME.</h2>
          <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.35)", maxWidth: 420, margin: "0 auto 44px", lineHeight: 1.85, fontFamily: mono }}>150+ premium frames. Expert fitting. Free shipping across Pakistan.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <YBtn onClick={() => navigate("#/collections/eyeglasses")} style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>SHOP ALL FRAMES</YBtn>
            <OutlineBtn dark style={{ padding: "15px 32px", fontSize: isMobile ? 11 : 13 }}>VIRTUAL TRY-ON →</OutlineBtn>
          </div>
        </FadeIn>
      </section>

      <style>{`@keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.5; } 50% { transform:scale(1.07); opacity:0.9; } }`}</style>
    </div>
  );
}

// ============ PRODUCTS PAGE ============
export function ProductsPage({ navigate, queryParams }) {
  const buildFiltersFromQuery = (qp) => {
    if (!qp) return {};
    const result = {};
    if (qp.category) result.category = [qp.category];
    if (qp.shape)     result.shape    = [qp.shape];
    if (qp.gender)    result.gender   = [qp.gender];
    if (qp.tag)       result.tag      = [qp.tag];
    if (qp.price)     result.price    = [qp.price];
    return result;
  };

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [activeFilters, setActiveFilters] = useState(() => buildFiltersFromQuery(queryParams));
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(() => !window.matchMedia("(max-width: 767px)").matches);
  // `?q=` comes from the navbar search — seed the on-page search box with it.
  const [searchTerm, setSearchTerm] = useState(() => queryParams?.q || "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setActiveFilters(buildFiltersFromQuery(queryParams));
    setSearchTerm(queryParams?.q || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [JSON.stringify(queryParams)]);

  // Local filter function using the updated size + shape logic
  const applyFiltersLocal = (products, activeFilters, sort, searchTerm) => {
    let filtered = products;

    // 1. Apply search (matches name, category, color, tag — and price, e.g.
    //    "8000", "under 10000", "8k-12k")
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(p => matchesSearchTerm(p, searchTerm));
    }

    // 2. Apply size filter (Small/Medium/Large categories)
    if (activeFilters.size && activeFilters.size.length) {
      filtered = filtered.filter(p =>
        p.sizes && p.sizes.some(s =>
          activeFilters.size.some(cat => s.includes(`(${cat})`))
        )
      );
    }

    // 3. Apply shape filter — dynamic, sourced only from product.js
    if (activeFilters.shape && activeFilters.shape.length) {
      filtered = filtered.filter(p => activeFilters.shape.some(shapeValue => productMatchesShape(p, shapeValue)));
    }

    // 4. Remove size/shape from activeFilters for the utility function
    const otherFilters = { ...activeFilters };
    delete otherFilters.size;
    delete otherFilters.shape;

    // 5. Apply all other filters and sort
    filtered = applyProductFilters(filtered, otherFilters, sort, "");

    return filtered;
  };

  const filtered = applyFiltersLocal(PRODUCTS_DATA, activeFilters, sort, searchTerm);
  let cols = 4;
  if (isMobile) cols = 1;
  else if (isTablet) cols = 2;
  else cols = filtersOpen ? 3 : 4;

  // Related products to surface alongside a search. When there are matches we
  // relate to them; when nothing matched we suggest a few popular frames so the
  // page never dead-ends on an empty result.
  const searchActive = searchTerm.trim().length > 0;
  const relatedLimit = isMobile ? 4 : 8;
  let relatedProducts = [];
  if (searchActive) {
    if (filtered.length) {
      relatedProducts = getRelatedForMatches(PRODUCTS_DATA, filtered, filtered.map(p => p.id), relatedLimit);
    } else {
      relatedProducts = PRODUCTS_DATA.filter(p => p.tag).slice(0, relatedLimit);
      if (!relatedProducts.length) relatedProducts = PRODUCTS_DATA.slice(0, relatedLimit);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20251018_140450.jpg) center/cover no-repeat`, padding: isMobile ? "48px 20px" : "72px 40px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ width: 40, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
          <div style={{ fontSize: 10, letterSpacing: "0.26em", color: "#555", marginBottom: 10, fontFamily: ff }}>URBAN EYE · ALL FRAMES</div>
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 88px)", lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: "0 0 20px" }}>THE COLLECTION</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>{PRODUCTS_DATA.length} frames. Each handpicked. All obsessively crafted.</p>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", width: "min(520px, 100%)", background: "#fff", overflow: "hidden" }}>
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, price, or keyword — e.g. “Alex” or “under 8000”" style={{ flex: 1, minWidth: 0, border: "none", padding: "12px 16px", fontSize: 13, fontFamily: mono, outline: "none" }} />
              {searchActive && (
                <button onClick={() => setSearchTerm("")} aria-label="Clear search" style={{ border: "none", background: BRAND, color: BRAND_TEXT, padding: "0 16px", fontFamily: ff, fontWeight: 900, fontSize: 14, cursor: "pointer" }}>✕</button>
              )}
            </div>
          </div>
          {searchActive && (
            <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: mono, letterSpacing: "0.04em" }}>
              {filtered.length} {filtered.length === 1 ? "frame" : "frames"} found for “{searchTerm.trim()}”
            </div>
          )}
        </div>
      </div>

      <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => setFiltersOpen(v => !v)} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
        <FilterSidebar allProducts={PRODUCTS_DATA} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
        <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: mono }}>
              {searchActive
                ? `No frames match “${searchTerm.trim()}”.${relatedProducts.length ? " Here are some you might like instead:" : ""}`
                : "No frames match the current filters."}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "75%" : `repeat(${cols}, 1fr)`, justifyContent: isMobile ? "center" : "stretch", gap: isMobile ? 12 : 20, transition: "grid-template-columns 0.3s" }}>
              {filtered.map((p, i) => (
                <FadeIn key={p.id} delay={Math.min(i * 40, 400)}>
                  <ProductCard product={p} navigate={navigate} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>

      {searchActive && relatedProducts.length > 0 && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 12px 60px" : "0 24px 80px" }}>
          <div style={{ borderTop: "1px solid #e8e0d0", paddingTop: isMobile ? 28 : 40 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>
              {filtered.length ? "YOU MAY ALSO LIKE" : "POPULAR PICKS"}
            </div>
            <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(22px, 3vw, 34px)", margin: "0 0 24px", letterSpacing: "0.02em", color: BLACK }}>
              RELATED FRAMES
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 12 : 20 }}>
              {relatedProducts.map((p, i) => (
                <FadeIn key={p.id} delay={Math.min(i * 60, 360)}>
                  <ProductCard product={p} navigate={navigate} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ COLLECTION DETAIL PAGE ============
export function CollectionDetailPage({ slug, navigate }) {
  const col = COLLECTIONS[slug] || COLLECTIONS["default"];
  const baseProducts = PRODUCTS_DATA.filter(col.filter);
  const [activeFilters, setActiveFilters] = useState({});
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return false;
    try { return JSON.parse(localStorage.getItem("os_filters_open") ?? "true"); } catch { return true; }
  });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const fn = () => {};
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  useEffect(() => { localStorage.setItem("os_filters_open", JSON.stringify(filtersOpen)); }, [filtersOpen]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveFilters({}); }, [slug]);

  // Local filter function with updated size + shape logic
  const applyFiltersLocal = (products, activeFilters, sort) => {
    let filtered = products;

    // 1. Apply size filter (Small/Medium/Large categories)
    if (activeFilters.size && activeFilters.size.length) {
      filtered = filtered.filter(p =>
        p.sizes && p.sizes.some(s =>
          activeFilters.size.some(cat => s.includes(`(${cat})`))
        )
      );
    }

    // 2. Apply shape filter — dynamic, sourced only from product.js
    if (activeFilters.shape && activeFilters.shape.length) {
      filtered = filtered.filter(p => activeFilters.shape.some(shapeValue => productMatchesShape(p, shapeValue)));
    }

    // 3. Remove size/shape from activeFilters for utility
    const otherFilters = { ...activeFilters };
    delete otherFilters.size;
    delete otherFilters.shape;

    // 4. Apply other filters and sort
    filtered = applyProductFilters(filtered, otherFilters, sort, "");

    return filtered;
  };

  const filtered = applyFiltersLocal(baseProducts, activeFilters, sort);
  let cols = 4;
  if (isMobile) cols = 1;
  else if (isTablet) cols = 2;
  else cols = filtersOpen ? 3 : 4;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20251018_140653.jpg) center/cover no-repeat`, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginBottom: 12, fontFamily: ff }}>
            <a href="#/" style={{ color: "#555", textDecoration: "none" }}>HOME</a>
            <span style={{ margin: "0 8px", color: "#333" }}>›</span>
            <span style={{ color: "#aaa" }}>{col.title}</span>
          </div>
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 6vw, 72px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 16px" }}>{col.title}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>{col.desc}</p>
        </div>
      </div>

      <FilterSortBar filtersOpen={filtersOpen} toggleFilters={() => { isMobile ? setFiltersOpen(true) : setFiltersOpen(v => !v); }} isMobile={isMobile} sort={sort} setSort={setSort} count={filtered.length} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
        <FilterSidebar allProducts={baseProducts} activeFilters={activeFilters} setActiveFilters={setActiveFilters} filtersOpen={filtersOpen} isMobile={isMobile} onClose={() => setFiltersOpen(false)} />
        <div style={{ flex: 1, padding: isMobile ? "20px 12px 60px" : "32px 24px 80px", minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 22, color: BLACK, marginBottom: 10, letterSpacing: "0.04em" }}>NO FRAMES FOUND</div>
              <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 28 }}>Try adjusting your filters.</div>
              <button onClick={() => setActiveFilters({})} style={{ background: BLACK, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff }}>CLEAR FILTERS</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "75%" : `repeat(${cols}, 1fr)`, justifyContent: isMobile ? "center" : "stretch", gap: isMobile ? 12 : 16, transition: "grid-template-columns 0.35s ease" }}>
              {filtered.map((p, i) => (
                <FadeIn key={p.id} delay={Math.min(i * 35, 300)}>
                  <ProductCard product={p} navigate={navigate} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ PRODUCT DETAIL PAGE ============
export function ProductDetailPage({ productId, navigate }) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openTab, setOpenTab] = useState("details");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariantName, setSelectedVariantName] = useState("");
  const { addToCart } = useCart();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImg(0); setAdded(false); setSelectedSize(null);
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    const variants = getProductVariants(product);
    const stored = getStoredVariantName(product.id);
    const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
    const nextName = match ? match.name : variants[0]?.name || "";
    setSelectedVariantName(nextName);
    setActiveImg(0);
  }, [product?.id]);

  if (!product) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
      <div style={{ fontSize: 48, fontWeight: 900, color: BLACK, marginBottom: 16 }}>404</div>
      <div style={{ fontSize: 14, color: "#888", fontFamily: mono, marginBottom: 28 }}>Frame not found.</div>
      <YBtn onClick={() => navigate("#/products")}>← BACK TO COLLECTION</YBtn>
    </div>
  );

  const related = getRelatedProducts(PRODUCTS_DATA, product);
  const { price, discountPrice } = getProductDisplayPrice(product);
  const discount = getProductDiscountPercent(product);
  const tc = product.tag ? tagColors[product.tag] : null;
  // Same collection slugs the navbar's Eyeglasses/Sunglasses + gender links use,
  // so tapping the category or gender tag here lands on the matching collection.
  const categorySlug = normalizeCategory(product.category) === "Sunglasses" ? "sunglasses" : "eyeglasses";
  const genderNorm = normalizeGender(product.gender);
  const genderCollectionSlug = genderNorm === "Men" ? `mens-${categorySlug}` : genderNorm === "Women" ? `womens-${categorySlug}` : categorySlug;
  const sizes = product.sizes?.length ? product.sizes : ["44 (Narrow)", "46 (Average)", "49 (Wide)", "52 (Extra Wide)"];
  const variants = getProductVariants(product);
  const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
  const galleryImages = selectedVariant?.gallery?.length
    ? selectedVariant.gallery
    : (product.gallery?.length ? product.gallery : (selectedVariant?.image ? [selectedVariant.image] : []));
  const displayImage = galleryImages[activeImg] || selectedVariant?.image || product.image || "";
  const displayLabel = selectedVariant?.name || product.color || "Default";

  const handleSelectVariant = (variant) => {
    setSelectedVariantName(variant.name);
    setStoredVariantName(product.id, variant.name);
    setActiveImg(0);
  };

  const AccordionItem = ({ id, label, children }) => {
    const isOpen = openTab === id;
    return (
      <div style={{ borderBottom: "1px solid #e8e0d0" }}>
        <button onClick={() => setOpenTab(isOpen ? null : id)} style={{ width: "100%", background: "none", border: "none", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: ff, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, textAlign: "left" }}>
          {label}
          <span style={{ fontSize: 22, fontWeight: 300, lineHeight: 1, color: BLACK }}>{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && <div style={{ paddingBottom: 20 }}>{children}</div>}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: ff }}>
      <div style={{ borderBottom: "1px solid #e8e0d0", padding: "13px 20px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {[{ label: "HOME", path: "#/" }, { label: "COLLECTION", path: `#/collections/${categorySlug}` }, { label: product.name.toUpperCase(), path: null }].map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {i > 0 && <span style={{ color: "#ccc", fontSize: 10 }}>›</span>}
              {crumb.path ? <a href={crumb.path} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#888", textDecoration: "none", fontFamily: ff }}>{crumb.label}</a>
                : <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>{crumb.label}</span>}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px 60px" : "0 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: (isMobile || isTablet) ? "1fr" : "76% 24%", gap: 0, alignItems: "flex-start" }}>
          <FadeIn>
            <div style={{ paddingRight: (isMobile || isTablet) ? 0 : 48 }}>
              <div style={{ position: "relative", overflow: "hidden", background: CREAM, marginBottom: 10, height: isMobile ? "78vh" : "calc(100vh - 10px)", minHeight: isMobile ? 460 : 780, maxHeight: isMobile ? 620 : 1080, boxSizing: "border-box", padding: isMobile ? "2px" : "4px 6px" }}>
                {product.tag && tc && (
                  <div style={{ position: "absolute", top: 20, left: 20, zIndex: 3, background: tc.bg, color: tc.color, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", padding: "6px 14px", fontFamily: ff }}>{product.tag}</div>
                )}
                {discount > 0 && (
                  <div style={{ position: "absolute", top: 20, right: 20, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "5px 12px", fontFamily: ff }}>−{discount}% OFF</div>
                )}
                <div style={{ width: "100%", height: "100%", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                  <img key={`${product.id}-${activeImg}-${displayLabel}`} src={`${displayImage}`} alt={`${product.name} - ${displayLabel}`} loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", padding: 0, animation: "fadeImgIn 0.35s ease", boxSizing: "border-box" }} />
                </div>
              </div>
              {galleryImages.length > 1 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {galleryImages.map((img, i) => (
                    <div key={`${product.id}-${i}`} onClick={() => setActiveImg(i)} style={{ width: isMobile ? 64 : isTablet ? 80 : 100, height: isMobile ? 54 : isTablet ? 64 : 76, overflow: "hidden", cursor: "pointer", background: CREAM, flexShrink: 0, border: i === activeImg ? `2px solid ${BLACK}` : "1px solid #e8e0d0", opacity: i === activeImg ? 1 : 0.45, transition: "border-color 0.15s, opacity 0.15s", boxSizing: "border-box" }}>
                      <img src={`${img}`} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? 4 : 8, boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div style={{ paddingTop: isMobile ? 24 : 4 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                <a href={`#/collections/${categorySlug}`} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff, textDecoration: "none" }}>{product.category?.toUpperCase()}</a>
                <span style={{ color: "#ddd" }}>·</span>
                <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff }}>{product.subcategory?.toUpperCase()}</span>
                <span style={{ color: "#ddd" }}>·</span>
                <a href={`#/collections/${genderCollectionSlug}`} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#aaa", fontFamily: ff, textDecoration: "none" }}>{product.gender?.toUpperCase()}</a>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7, flexWrap: "wrap" }}>
                <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3.2vw, 42px)", lineHeight: 1, color: BLACK, margin: 0, letterSpacing: "0.04em", flex: 1, paddingRight: 16 }}>
                  {product.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginTop: 4 }}>
                  <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 600, color: BLACK, whiteSpace: "nowrap" }}>
                    PKR {formatPriceValue(discountPrice)}
                  </div>
                  <WishlistHeart productId={product.id} size="lg" placement="detail" />
                </div>
              </div>

              <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 16, letterSpacing: "0.04em" }}>{displayLabel}</div>
              {variants.length > 1 && (
                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff, marginBottom: 10 }}>{variants.length} COLOURS</div>
              )}
              {variants.length > 1 && (
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
                  {variants.map((variant) => {
                    const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
                    return (
                      <button
                        key={variant.name}
                        onClick={() => handleSelectVariant(variant)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          border: active ? `1.5px solid ${BLACK}` : "1px solid #d8d0c8",
                          background: active ? "#fff" : "#faf7f2",
                          padding: "8px 12px",
                          cursor: "pointer",
                          fontFamily: ff,
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          color: BLACK,
                        }}
                      >
                        <span style={{ width: 14, height: 14, borderRadius: "50%", background: variant.swatch || "#d9d9d9", border: "1px solid rgba(0,0,0,0.12)" }} />
                        {variant.name}
                      </button>
                    );
                  })}
                </div>
              )}
              <div style={{ width: 36, height: 3, background: BRAND, marginBottom: 18 }} />

              {discountPrice < price && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: isMobile ? 13 : 15, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</span>
                  {discount > 0 && <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 900, background: BRAND, color: BRAND_TEXT, padding: "4px 10px", letterSpacing: "0.1em" }}>SAVE {discount}%</span>}
                </div>
              )}

              <div style={{ marginBottom: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff }}>SIZE</span>
                  <span style={{ fontSize: 11, color: "#888", fontFamily: mono, textDecoration: "underline", cursor: "pointer", letterSpacing: "0.04em" }}>Size Chart</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", fontFamily: ff, cursor: "pointer", border: "1.5px solid", borderColor: selectedSize === size ? BLACK : "#d8d0c8", background: selectedSize === size ? BLACK : "#fff", color: selectedSize === size ? "#fff" : BLACK, transition: "all 0.15s" }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: BLACK, fontFamily: ff, display: "block", marginBottom: 10 }}>QUANTITY</span>
                <div style={{ display: "inline-flex", border: "1.5px solid #e8e0d0", alignItems: "center" }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", width: 42, height: 46, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>−</button>
                  <span style={{ width: 46, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", width: 42, height: 46, fontSize: 18, cursor: "pointer", color: BLACK, fontFamily: ff, fontWeight: 900 }}>+</button>
                </div>
              </div>

              <button onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ width: "100%", background: added ? "#16a34a" : "#0c2c41", color: "#fff", border: "none", padding: "16px 24px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, transition: "background 0.3s", marginBottom: 12 }}>
                {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
              </button>

              {added && (
                <button onClick={() => navigate("#/cart")} style={{ width: "100%", background: BRAND, color: BRAND_TEXT, border: "none", padding: "13px", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff, marginBottom: 14 }}>
                  VIEW BAG & CHECKOUT →
                </button>
              )}

              <p style={{ fontSize: isMobile ? 12 : 13, color: "#555", lineHeight: 1.9, fontFamily: mono, marginBottom: 28, maxWidth: 420 }}>{product.description}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "18px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4", marginBottom: 28 }}>
                {(product.features || []).map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: BRAND, fontFamily: ff }}>{i + 1}.</span>
                    <span style={{ fontSize: 12, color: "#666", fontFamily: mono, letterSpacing: "0.02em" }}>{feature}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #e8e0d0" }}>
                {product.features?.length > 0 && (
                  <AccordionItem id="features" label="FEATURES">
                    <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: BLACK, fontFamily: mono, lineHeight: 2 }}>
                      {product.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ol>
                  </AccordionItem>
                )}
                <AccordionItem id="details" label="DETAILS">
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: 280, borderCollapse: "collapse" }}>
                      <tbody>
                        {Object.entries(product.specifications || {}).map(([k, v], i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
                            <td style={{ padding: "9px 12px 9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%", whiteSpace: "nowrap" }}>{k.toUpperCase()}</td>
                            <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionItem>
                <AccordionItem id="measurements" label="MEASUREMENTS">
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: 280, borderCollapse: "collapse" }}>
                      <tbody>
                        {Object.entries(product.measurements || {}).map(([k, v], i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
                            <td style={{ padding: "9px 12px 9px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#999", fontFamily: ff, width: "44%", whiteSpace: "nowrap" }}>{k.toUpperCase()}</td>
                            <td style={{ padding: "9px 0", fontSize: 12, color: BLACK, fontFamily: mono }}>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionItem>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <ProductReviewsSection productId={productId} navigate={navigate} />

      {related.length > 0 && (
        <div style={{ background: CREAM, padding: isMobile ? "48px 20px" : "72px 40px", borderTop: "2px solid #e8ddd0" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 44, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>YOU MAY ALSO LIKE</div>
                  <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(26px, 4vw, 42px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>RELATED FRAMES</h2>
                </div>
                <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid ${BLACK}`, padding: "10px 20px", fontSize: isMobile ? 10 : 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: BLACK, fontFamily: ff }}>VIEW ALL →</button>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 80}>
                  <ProductCard product={p} navigate={navigate} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes fadeImgIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

// ============ CART PAGE ============
export function CartPage({ navigate }) {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart, loading, syncing, pendingSync } = useCart();
  const { user } = useAuth();
  const [localCart, setLocalCart] = useState([]);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  useEffect(() => { setLocalCart(cartItems); }, [cartItems]);

  const shipping = cartTotal >= 5000 ? 0 : 350;
  const grandTotal = cartTotal + shipping;

  if (loading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", color: NAVY }}>LOADING YOUR CART...</div>
        </div>
      </div>
    );
  }

  if (localCart.length === 0) return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ff, background: "#f5f4f0", padding: "20px" }}>
      <div style={{ width: 72, height: 72, border: "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 28 }}>🛍️</div>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#bbb", marginBottom: 12 }}>YOUR CART</div>
      <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 24 : 32, letterSpacing: "0.06em", color: BLACK, marginBottom: 10, textAlign: "center" }}>YOUR CART IS EMPTY</h2>
      <p style={{ fontSize: 13, color: "#999", fontFamily: mono, marginBottom: 32, letterSpacing: "0.04em", textAlign: "center" }}>Add some frames to get started.</p>
      <button onClick={() => navigate("#/products")} style={{ background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px 32px", cursor: "pointer" }}
        onMouseEnter={e => e.currentTarget.style.background = "#0a2236"}
        onMouseLeave={e => e.currentTarget.style.background = NAVY}>SHOP THE COLLECTION</button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f0", fontFamily: ff }}>
      {pendingSync && (
        <div style={{ background: "#fff3cd", borderBottom: `2px solid #ffc107`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, color: "#856404" }}>⚠️</span>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#856404" }}>YOUR CART NEEDS TO BE SYNCED. PLEASE PROCEED TO CHECKOUT TO SAVE YOUR ITEMS.</span>
        </div>
      )}
      <div style={{ background: "#eef4f8", borderBottom: `2px solid ${NAVY}`, padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 15, color: NAVY }}>✓</span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: NAVY }}>
          {shipping === 0 ? "YOU'VE UNLOCKED FREE WORLDWIDE EXPRESS SHIPPING!" : `ADD PKR ${(5000 - cartTotal).toLocaleString()} MORE FOR FREE SHIPPING`}
        </span>
      </div>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20250306_172543.jpg) center/cover no-repeat`, padding: isMobile ? "32px 20px" : "40px 40px 36px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ width: 32, height: 3, background: NAVY, marginBottom: 14 }} />
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: 0, letterSpacing: "0.04em" }}>YOUR CART</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: mono, marginTop: 12, letterSpacing: "0.06em" }}>
            {localCart.length} ITEM{localCart.length !== 1 ? "S" : ""} &nbsp;·&nbsp; PKR {cartTotal.toLocaleString()} SUBTOTAL
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "40px 40px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
        <div>
          {!isMobile && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: 16, padding: "0 0 12px", borderBottom: `2px solid ${BLACK}`, marginBottom: 0 }}>
              {["PRODUCT", "PRICE", "QUANTITY", ""].map((h, i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", color: "#aaa" }}>{h}</div>
              ))}
            </div>
          )}

          {localCart.map(item => {
            const itemDiscount = item.price && item.discountPrice && item.price > item.discountPrice ? Math.round(((item.price - item.discountPrice) / item.price) * 100) : 0;
            return (
              <div key={item.id} style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "1fr 130px 150px 40px", gap: isMobile ? 12 : 16, alignItems: "center", padding: isMobile ? "12px 0" : "20px 0", borderBottom: "1px solid #e0ddd6", flexDirection: isMobile ? "column" : "row" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", width: isMobile ? "100%" : "auto" }}>
                  <div style={{ width: isMobile ? 60 : 88, height: isMobile ? 50 : 70, flexShrink: 0, overflow: "hidden", background: CREAM, cursor: "pointer", border: "1px solid #e8e8e8" }} onClick={() => navigate(`#/products/${item.id}`)}>
                    <img src={item.image} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.16em", fontFamily: ff, marginBottom: 3 }}>{item.category?.toUpperCase()}{item.gender ? ` · ${item.gender.toUpperCase()}` : ""}</div>
                    <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, letterSpacing: "0.04em", marginBottom: 3, cursor: "pointer" }} onClick={() => navigate(`#/products/${item.id}`)}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#999", fontFamily: mono }}>{item.color}</div>
                    {itemDiscount > 0 && <div style={{ fontSize: 9, fontWeight: 900, background: NAVY, color: "#fff", display: "inline-block", padding: "2px 7px", letterSpacing: "0.1em", marginTop: 5 }}>−{itemDiscount}% OFF</div>}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: isMobile ? "space-between" : "flex-start", alignItems: "center", width: isMobile ? "100%" : "auto", gap: 8 }}>
                  <div style={{ fontFamily: ff, fontSize: isMobile ? 13 : 14, fontWeight: 900, color: BLACK }}>PKR {(item.discountPrice || item.price || 0).toLocaleString()}</div>
                  {item.discountPrice && item.price && item.discountPrice < item.price && <div style={{ fontSize: 11, color: "#bbb", textDecoration: "line-through", fontFamily: mono }}>PKR {item.price.toLocaleString()}</div>}
                </div>
                <div style={{ display: "flex", border: "1.5px solid #ccc", alignItems: "center", width: "fit-content" }}>
                  <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}>−</button>
                  <span style={{ width: 30, textAlign: "center", fontFamily: ff, fontWeight: 900, fontSize: 14, color: BLACK }}>{item.qty || 1}</span>
                  <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} disabled={syncing} style={{ background: "none", border: "none", width: 34, height: 34, fontSize: 16, cursor: syncing ? "not-allowed" : "pointer", color: BLACK, fontFamily: ff, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#f0f0f0" }}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} disabled={syncing} style={{ background: "none", border: "none", cursor: syncing ? "not-allowed" : "pointer", color: "#ccc", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => { if (!syncing) e.currentTarget.style.color = "#dc2626" }}
                  onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>×</button>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: "pointer", color: "#888", fontFamily: ff }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>← CONTINUE SHOPPING</button>
            <button onClick={clearCart} disabled={syncing} style={{ background: "none", border: "1.5px solid #fecaca", padding: "10px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", cursor: syncing ? "not-allowed" : "pointer", color: "#dc2626", fontFamily: ff }}
              onMouseEnter={e => { if (!syncing) e.currentTarget.style.background = "#fef2f2" }}
              onMouseLeave={e => e.currentTarget.style.background = "none"}>CLEAR CART</button>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e0ddd6", position: "sticky", top: 80 }}>
          <div style={{ background: BLACK, padding: "18px 24px" }}>
            <div style={{ width: 26, height: 3, background: NAVY, marginBottom: 10 }} />
            <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.16em" }}>ORDER SUMMARY</div>
          </div>
          <div style={{ padding: "22px 24px" }}>
            {localCart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
                <span style={{ fontSize: 12, color: "#666", fontFamily: mono, flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{item.name} × {item.qty || 1}</span>
                <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK, flexShrink: 0 }}>PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: "flex", marginTop: 4, marginBottom: 16, flexWrap: "wrap" }}>
              <input placeholder="DISCOUNT CODE" style={{ flex: 1, border: "1.5px solid #ccc", borderRight: "none", padding: "9px 12px", fontSize: 11, fontFamily: ff, letterSpacing: "0.08em", outline: "none", color: BLACK, minWidth: "100px" }}
                onFocus={e => e.currentTarget.style.borderColor = NAVY}
                onBlur={e => e.currentTarget.style.borderColor = "#ccc"} />
              <button style={{ background: BLACK, color: "#fff", border: "none", padding: "9px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer", fontFamily: ff }}>APPLY</button>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SUBTOTAL</span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#999", fontFamily: ff, fontWeight: 700, letterSpacing: "0.1em" }}>SHIPPING</span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
              </div>
              {shipping === 0 && <div style={{ fontSize: 10, color: "#16a34a", fontFamily: ff, letterSpacing: "0.1em", fontWeight: 800 }}>✓ FREE WORLDWIDE SHIPPING APPLIED</div>}
            </div>
            <div style={{ borderTop: `2px solid ${BLACK}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", color: BLACK }}>TOTAL</span>
              <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 18 : 20, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
            </div>
            <div style={{ fontSize: 10, color: "#bbb", fontFamily: ff, letterSpacing: "0.08em", marginBottom: 20 }}>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
            <button onClick={() => navigate("#/checkout")} disabled={syncing || localCart.length === 0} style={{ width: "100%", background: NAVY, border: "none", color: "#fff", fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", padding: "15px", cursor: (syncing || localCart.length === 0) ? "not-allowed" : "pointer", display: "block", textAlign: "center", marginBottom: 8, opacity: (syncing || localCart.length === 0) ? 0.5 : 1 }}
              onMouseEnter={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = "#0a2236" }}
              onMouseLeave={e => { if (!syncing && localCart.length > 0) e.currentTarget.style.background = NAVY }}>
              {syncing ? "UPDATING..." : "PROCEED TO CHECKOUT →"}
            </button>
            <button onClick={() => navigate("#/products")} style={{ width: "100%", background: "#fff", border: `1.5px solid ${BLACK}`, color: BLACK, fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.16em", padding: "11px", cursor: "pointer", display: "block", textAlign: "center" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>CONTINUE SHOPPING</button>
            <div style={{ marginTop: 16, display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
              {["VISA", "MC", "AMEX", "APPLE PAY", "COD"].map(c => (
                <span key={c} style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", border: "1px solid #e0e0e0", padding: "3px 6px", color: "#aaa", fontFamily: ff }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ WISHLIST PAGE ============
export function WishlistPage({ navigate }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState(null);
  const { addToCart } = useCart();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  useEffect(() => {
    if (!user) { navigate("#/"); return; }
    loadWishlist();
  }, [user]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const res = await getWishlist();
      const rawItems = res.data || [];
      setWishlist(enrichWishlistItems(rawItems));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleRemove = async (wishlistId) => {
    setRemoving(wishlistId);
    try {
      await removeFromWishlist({ wishlistId });
      setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
    } catch (err) {
      setError(err.message);
    }
    setRemoving(null);
  };

  const handleMoveToCart = async (item) => {
    if (item.product) {
      addToCart({ id: item.productId, ...item.product, discountPrice: item.product.salePrice || item.product.price }, 1);
      await handleRemove(item.wishlistId);
    }
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20251018_140811.jpg) center/cover no-repeat`, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }}/>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT</div>
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(36px, 6vw, 68px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
            MY WISHLIST
          </h1>
          {!loading && (
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: mono }}>
              {wishlist.length} saved {wishlist.length === 1 ? "frame" : "frames"}
            </p>
          )}
        </div>
      </div>

      <Breadcrumb crumbs={[{ label: "HOME", path: "#/" }, { label: "MY ACCOUNT", path: "#/dashboard" }, { label: "WISHLIST", path: null }]} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "48px 40px 80px" }}>
        {error && (
          <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, marginBottom: 24, fontFamily: mono }}>
            {error}
          </div>
        )}

        {loading ? (
          <WishlistSkeleton />
        ) : wishlist.length === 0 ? (
          <FadeIn>
            <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 480, margin: "0 auto" }}>
              <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fef0f0", animation: "pulseSlow 3s ease-in-out infinite" }}/>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 20px" }}/>
              <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 4vw, 36px)", color: BLACK, margin: "0 0 12px", letterSpacing: "0.04em" }}>
                YOUR WISHLIST IS EMPTY
              </h2>
              <p style={{ fontSize: 14, color: "#888", fontFamily: mono, lineHeight: 1.7, marginBottom: 32 }}>
                Save frames you love by tapping the heart icon. They'll wait here for you.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <YBtn onClick={() => navigate("#/products")} style={{ padding: "14px 28px" }}>BROWSE ALL FRAMES</YBtn>
                <button onClick={() => navigate("#/collections/new-arrivals")} style={{ background: "none", border: `1.5px solid ${BRAND}`, color: BRAND, fontFamily: ff, fontWeight: 900, fontSize: 12, letterSpacing: "0.12em", padding: "14px 24px", cursor: "pointer" }}>
                  NEW ARRIVALS
                </button>
              </div>
            </div>
          </FadeIn>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 4 }}>SAVED ITEMS</div>
                <div style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(22px, 3vw, 32px)", color: BLACK, letterSpacing: "0.02em" }}>
                  {wishlist.length} {wishlist.length === 1 ? "FRAME" : "FRAMES"} SAVED
                </div>
              </div>
              <button onClick={() => navigate("#/products")} style={{ background: "none", border: `1.5px solid #ccc`, padding: "10px 18px", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", cursor: "pointer", color: "#888", fontFamily: ff, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = BLACK; e.currentTarget.style.color = BLACK; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#888"; }}>
                CONTINUE SHOPPING →
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, minmax(200px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 24 }}>
              {wishlist.map((item, idx) => {
                const isRemoving = removing === item.wishlistId;
                const price = Number(item.product?.salePrice || item.product?.price || 0);
                const origPrice = Number(item.product?.price || 0);
                const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

                return (
                  <FadeIn key={item.wishlistId} delay={idx * 60}>
                    <div style={{
                      background: "#fff", border: "1px solid #e8e0d0",
                      overflow: "hidden", position: "relative",
                      transition: "box-shadow 0.3s, transform 0.3s, opacity 0.3s",
                      opacity: isRemoving ? 0.4 : 1,
                      transform: isRemoving ? "scale(0.97)" : "scale(1)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      display: "flex", flexDirection: "column"
                    }}
                      onMouseEnter={e => { if (!isRemoving) { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}
                    >
                      {discount > 0 && (
                        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "4px 9px", fontFamily: ff }}>
                          −{discount}%
                        </div>
                      )}

                      <button
                        onClick={() => handleRemove(item.wishlistId)}
                        disabled={isRemoving}
                        style={{
                          position: "absolute", top: 10, right: 10, zIndex: 4,
                          width: 32, height: 32, borderRadius: "50%",
                          background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: isRemoving ? "wait" : "pointer", fontSize: 14, color: "#aaa",
                          transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.borderColor = "#dc2626"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
                        aria-label="Remove from wishlist"
                      >
                        ×
                      </button>

                      <div
                        onClick={() => navigate(`#/products/${item.productId}`)}
                        style={{ height: isMobile ? 160 : 220, overflow: "hidden", background: "#FAFAF5", cursor: "pointer", position: "relative", flexShrink: 0 }}
                      >
                        {item.product?.imageUrl ? (
                          <img
                            src={`${item.product.imageUrl}`}
                            alt={item.product.name}
                            loading="lazy"
                            decoding="async"
                            style={{ width: "100%", height: "100%", objectFit: "contain", padding: isMobile ? "16px 20px" : "24px 32px", transition: "transform 0.4s ease" }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Frame shape="round" size={isMobile ? 80 : 120} color={BRAND} />
                          </div>
                        )}
                        <div style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          background: BRAND, color: BRAND_TEXT, textAlign: "center",
                          padding: "9px", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff,
                          transform: "translateY(100%)", transition: "transform 0.25s ease"
                        }}
                          className="wishlist-view-overlay">
                          VIEW DETAILS →
                        </div>
                      </div>

                      <div style={{ padding: isMobile ? "10px 12px 12px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.16em", marginBottom: 3, fontFamily: ff }}>
                          {item.product?.subcategory?.toUpperCase()} {item.product?.gender ? `· ${item.product.gender.toUpperCase()}` : ""}
                        </div>
                        <div
                          onClick={() => navigate(`#/products/${item.productId}`)}
                          style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK, marginBottom: 4, letterSpacing: "0.03em", cursor: "pointer", lineHeight: 1.2 }}>
                          {item.product?.name || "Unnamed Frame"}
                        </div>
                        <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 10, lineHeight: 1.4 }}>
                          {item.product?.color || ""}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: ff, fontSize: isMobile ? 13 : 15, fontWeight: 900, color: BLACK }}>
                            PKR {price.toLocaleString()}
                          </span>
                          {discount > 0 && (
                            <span style={{ fontFamily: mono, fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>
                              PKR {origPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                          <button
                            onClick={() => handleMoveToCart(item)}
                            disabled={isRemoving}
                            style={{
                              flex: 1, background: NAVY, color: "#fff", border: "none",
                              padding: "10px 0", fontSize: isMobile ? 9 : 10, fontWeight: 900,
                              letterSpacing: "0.12em", cursor: isRemoving ? "not-allowed" : "pointer",
                              fontFamily: ff, transition: "background 0.18s"
                            }}
                            onMouseEnter={e => { if (!isRemoving) e.currentTarget.style.background = "#0a2236"; }}
                            onMouseLeave={e => e.currentTarget.style.background = NAVY}
                          >
                            + ADD TO BAG
                          </button>
                          <button
                            onClick={() => navigate(`#/products/${item.productId}`)}
                            style={{
                              background: "none", border: `1.5px solid #e8e0d0`,
                              padding: "10px 14px", fontSize: 11, cursor: "pointer",
                              color: BLACK, transition: "border-color 0.18s", fontFamily: ff
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = BRAND}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e0d0"}
                            aria-label="View product"
                          >
                            ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={200}>
              <div style={{ textAlign: "center", marginTop: 56, padding: "40px 20px", background: "#fff", border: "1px solid #e8e0d0" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#888", marginBottom: 10 }}>DISCOVER MORE</div>
                <h3 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(20px, 3vw, 28px)", color: BLACK, margin: "0 0 20px", letterSpacing: "0.04em" }}>
                  KEEP EXPLORING
                </h3>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <YBtn onClick={() => navigate("#/collections/new-arrivals")} style={{ padding: "12px 24px" }}>NEW ARRIVALS</YBtn>
                  <YBtn onClick={() => navigate("#/products")} style={{ padding: "12px 24px" }}>ALL FRAMES</YBtn>
                </div>
              </div>
            </FadeIn>
          </>
        )}
      </div>
      <style>{`
        .wishlist-card:hover .wishlist-view-overlay { transform: translateY(0) !important; }
        @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.08); opacity:1; } }
      `}</style>
    </div>
  );
}

// ============ CHECKOUT PAGE ============
const AddressCard = ({ addr, selected, onSelect }) => {
  const isDefault = addr.isDefault === true || addr.isDefault === "TRUE";
  return (
    <div
      onClick={onSelect}
      style={{
        border: `2px solid ${selected ? BRAND : "#dde"}`,
        borderRadius: 4,
        padding: "16px 18px",
        cursor: "pointer",
        background: selected ? "#f0f6fa" : "#fff",
        position: "relative",
        transition: "border-color 0.15s, background 0.15s",
        userSelect: "none",
      }}
    >
      <div style={{
        position: "absolute",
        top: 14,
        right: 14,
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: `2px solid ${selected ? BRAND : "#bbb"}`,
        background: selected ? BRAND : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
      </div>
      {isDefault && (
        <span style={{
          display: "inline-block",
          background: BRAND,
          color: "#fff",
          fontSize: 8,
          fontWeight: 900,
          padding: "2px 7px",
          letterSpacing: "0.12em",
          fontFamily: ff,
          marginBottom: 8,
        }}>
          DEFAULT
        </span>
      )}
      <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, marginBottom: 4, fontFamily: ff, paddingRight: 28 }}>
        {addr.fullName}
      </div>
      <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7 }}>
        {addr.address}<br />
        {addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ""}<br />
        {addr.country || "Pakistan"}<br />
        {addr.phone}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text", error, full = false }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: full ? "1 / -1" : "auto" }}>
    <label style={{
      fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
      color: error ? "#dc2626" : "#888", fontFamily: ff,
    }}>
      {label}{error ? ` — ${error}` : ""}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        border: `1.5px solid ${error ? "#dc2626" : "#e0e8ee"}`,
        padding: "11px 14px",
        fontSize: 13,
        fontFamily: mono,
        color: BLACK,
        background: "#fafaf8",
        outline: "none",
        transition: "border-color 0.15s",
      }}
      onFocus={e => { if (!error) e.target.style.borderColor = BRAND; }}
      onBlur={e => { if (!error) e.target.style.borderColor = "#e0e8ee"; }}
    />
  </div>
);

export function CheckoutPage({ navigate }) {
  const { cartItems, cartTotal, clearCart, loading: cartLoading, syncCartToDatabase, getCheckoutItems } = useCart();
  const { user } = useAuth();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [syncingCart, setSyncingCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const [customForm, setCustomForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    notes: "",
  });
  const setCustomField = k => v => setCustomForm(f => ({ ...f, [k]: v }));

  const shipping = cartTotal >= 5000 ? 0 : 350;
  const grandTotal = cartTotal + shipping;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  useEffect(() => {
    if (!cartLoading && cartItems.length === 0 && !orderPlaced) navigate("#/products");
  }, [cartItems, cartLoading, navigate, orderPlaced]);

  useEffect(() => {
    if (!user) return;
    setAddressesLoading(true);
    getAddresses()
      .then(res => {
        const addrs = res.data || [];
        setSavedAddresses(addrs);
        if (addrs.length > 0) {
          const def = addrs.find(a => a.isDefault === true || a.isDefault === "TRUE");
          setSelectedAddressId(def ? def.addressId : addrs[0].addressId);
          setShowCustomForm(false);
        } else {
          setShowCustomForm(true);
          setSelectedAddressId(null);
        }
      })
      .catch(() => {
        setShowCustomForm(true);
        setSelectedAddressId(null);
      })
      .finally(() => setAddressesLoading(false));
  }, [user]);

  const activeAddress = (() => {
    if (selectedAddressId) {
      const saved = savedAddresses.find(a => a.addressId === selectedAddressId);
      if (saved) {
        return {
          fullName: String(saved.fullName ?? ""),
          phone: String(saved.phone ?? ""),
          email: user?.email || "",
          address: String(saved.address ?? ""),
          city: String(saved.city ?? ""),
          country: String(saved.country ?? "Pakistan"),
          postalCode: String(saved.postalCode ?? ""),
          notes: "",
        };
      }
    }
    return {
      ...customForm,
      fullName: String(customForm.fullName ?? ""),
      phone: String(customForm.phone ?? ""),
      address: String(customForm.address ?? ""),
      city: String(customForm.city ?? ""),
      email: user?.email || "",
    };
  })();

  const validate = () => {
    const e = {};
    if (!String(activeAddress.fullName ?? "").trim()) e.fullName = "Required";
    if (!String(activeAddress.phone ?? "").trim()) e.phone = "Required";
    if (!String(activeAddress.address ?? "").trim()) e.address = "Required";
    if (!String(activeAddress.city ?? "").trim()) e.city = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleProceedToReview = async () => {
    if (!validate()) return;
    if (!user) { alert("Please log in to proceed."); return; }
    setSyncingCart(true);
    const syncResult = await syncCartToDatabase();
    setSyncingCart(false);
    if (!syncResult.success) { alert(syncResult.error || "Failed to sync cart."); return; }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (!user) { alert("Please log in to complete your order."); return; }
    setSubmitting(true);
    try {
      const { checkout } = await import("../services/service.js");
      const checkoutItems = getCheckoutItems();
      const res = await checkout({
        cartItems: checkoutItems,
        subtotal: cartTotal,
        shipping,
        total: grandTotal,
        address: activeAddress,
        paymentMethod: "COD",
      });
      if (res.success) {
        setOrderPlaced(true);
        await clearCart();
        navigate("#/order-success");
      } else {
        alert(res.error || "Failed to place order.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff }}>
      <div style={{ fontSize: 12, letterSpacing: "0.2em", color: BRAND }}>LOADING...</div>
    </div>
  );
  if (cartItems.length === 0 && !orderPlaced) return null;

  const userName = user?.name || user?.fullName || "";
  const userEmail = user?.email || "";

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20250306_183818.jpg) center/cover no-repeat`, padding: isMobile ? "32px 20px" : "44px 40px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ width: 32, height: 3, background: BRAND, marginBottom: 14 }} />
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 5vw, 64px)", lineHeight: 0.92, color: "#fff", margin: "0 0 12px" }}>CHECKOUT</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            {[{ n: 1, l: "DELIVERY" }, { n: 2, l: "REVIEW & PAY" }].map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {i > 0 && <div style={{ width: isMobile ? 20 : 40, height: 1, background: step > i ? BRAND : "#333" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: step >= s.n ? BRAND : "#222",
                    border: `2px solid ${step >= s.n ? BRAND : "#333"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 900, color: step >= s.n ? BRAND_TEXT : "#555", fontFamily: ff,
                  }}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: step >= s.n ? "#fff" : "#555", fontFamily: ff }}>
                    {s.l}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 16px 60px" : "48px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: isMobile ? 24 : 40, alignItems: "flex-start" }}>
        <div>
          {step === 1 && (
            <FadeIn>
              <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
                <div style={{ background: "#f0f6fa", border: `1.5px solid #89c4e1`, padding: "14px 20px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRAND, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, fontFamily: ff, flexShrink: 0 }}>
                      {userName.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: BRAND, fontFamily: ff, letterSpacing: "0.04em" }}>{userName}</div>
                      <div style={{ fontSize: 11, color: "#666", fontFamily: mono, marginTop: 2 }}>{userEmail}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", color: "#2a8a50", background: "#eaf5ef", padding: "4px 10px", fontFamily: ff }}>SIGNED IN</span>
                </div>

                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff }}>
                  DELIVERY ADDRESS
                </div>

                {addressesLoading ? (
                  <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#aaa", letterSpacing: "0.14em", fontFamily: ff }}>
                    LOADING ADDRESSES…
                  </div>
                ) : (
                  <>
                    {savedAddresses.length > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
                        {savedAddresses.map(addr => (
                          <AddressCard
                            key={addr.addressId}
                            addr={addr}
                            selected={selectedAddressId === addr.addressId && !showCustomForm}
                            onSelect={() => {
                              setSelectedAddressId(addr.addressId);
                              setShowCustomForm(false);
                              setErrors({});
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        const next = !showCustomForm;
                        setShowCustomForm(next);
                        if (next) setSelectedAddressId(null);
                        else if (savedAddresses.length > 0) {
                          const def = savedAddresses.find(a => a.isDefault === true || a.isDefault === "TRUE");
                          setSelectedAddressId(def ? def.addressId : savedAddresses[0].addressId);
                        }
                        setErrors({});
                      }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "none", border: `1.5px dashed ${showCustomForm ? BRAND : "#bcd"}`,
                        color: showCustomForm ? BRAND : "#6a8ea0", padding: "11px 20px",
                        fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
                        fontFamily: ff, cursor: "pointer", width: "100%",
                        justifyContent: "center", marginBottom: 4, transition: "all 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>
                        {showCustomForm ? "×" : "+"}
                      </span>
                      {showCustomForm ? "CANCEL — USE SAVED ADDRESS" : "USE A DIFFERENT ADDRESS"}
                    </button>

                    {showCustomForm && (
                      <FadeIn delay={0.05}>
                        <div style={{ border: `1.5px solid ${BRAND}`, padding: isMobile ? "16px" : "24px 20px", marginTop: 16, background: "#f8fbfd" }}>
                          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", color: BRAND, marginBottom: 20, fontFamily: ff }}>
                            ENTER DELIVERY DETAILS
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                            <Field label="FULL NAME" value={customForm.fullName} onChange={setCustomField("fullName")} placeholder="Ahmad Khan" error={errors.fullName} />
                            <Field label="PHONE" value={customForm.phone} onChange={setCustomField("phone")} placeholder="0300 1234567" type="tel" error={errors.phone} />
                            <Field label="STREET ADDRESS" value={customForm.address} onChange={setCustomField("address")} placeholder="House #12, Street 4, Block B" error={errors.address} full />
                            <Field label="CITY" value={customForm.city} onChange={setCustomField("city")} placeholder="Karachi" error={errors.city} />
                            <Field label="POSTAL CODE (optional)" value={customForm.postalCode} onChange={setCustomField("postalCode")} placeholder="75500" />
                            <Field label="ORDER NOTES (optional)" value={customForm.notes} onChange={setCustomField("notes")} placeholder="e.g. Leave at gate" full />
                          </div>
                        </div>
                      </FadeIn>
                    )}
                  </>
                )}

                <div style={{ marginTop: 32 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 20, fontFamily: ff }}>
                    PAYMENT METHOD
                  </div>
                  <div style={{ border: `2px solid #89c4e1`, background: "#e8f2f8", padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#89c4e1", border: `2px solid #89c4e1`, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.1em", color: BLACK, marginBottom: 4 }}>
                          CASH ON DELIVERY (COD)
                        </div>
                        <p style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.7, margin: 0 }}>
                          Pay in cash when your order arrives. Available across all major cities in Pakistan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 32 }}>
                  <YBtn onClick={handleProceedToReview} disabled={syncingCart || addressesLoading} style={{ width: "100%", padding: 15, fontSize: 12, letterSpacing: "0.14em" }}>
                    {syncingCart ? "SYNCING CART…" : "REVIEW ORDER →"}
                  </YBtn>
                </div>
              </div>
            </FadeIn>
          )}

          {step === 2 && (
            <FadeIn>
              <div style={{ background: "#fff", border: "1px solid #e0e8ee", padding: isMobile ? "20px" : "36px" }}>
                <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 14, letterSpacing: "0.1em", color: BLACK, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #f0ece4" }}>
                  REVIEW YOUR ORDER
                </div>
                <div style={{ background: "#FAFAF8", border: "1px solid #e0e8ee", padding: "18px 20px", marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff }}>DELIVERY TO</div>
                    <button onClick={() => setStep(1)} style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#888", background: "none", border: "none", cursor: "pointer", fontFamily: ff, textDecoration: "underline" }}>EDIT</button>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: BRAND, fontFamily: ff, marginBottom: 6 }}>{activeAddress.fullName}</div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
                    {activeAddress.address}<br />
                    {activeAddress.city}{activeAddress.postalCode ? `, ${activeAddress.postalCode}` : ""}<br />
                    {activeAddress.phone}<br />
                    {activeAddress.email}
                  </div>
                </div>

                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0ece4" }}>
                    <div style={{ width: 72, height: 56, flexShrink: 0, overflow: "hidden", background: CREAM }}>
                      <img src={`${item.image}`} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>{item.color} · Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: BLACK }}>
                      PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}

                <div style={{ background: "#e8f2f8", border: `1.5px solid #89c4e1`, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>💵</span>
                  <div>
                    <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", color: BLACK }}>CASH ON DELIVERY</div>
                    <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>Pay PKR {grandTotal.toLocaleString()} when your order arrives</div>
                  </div>
                </div>

                <div style={{ marginTop: 28 }}>
                  <YBtn onClick={handlePlaceOrder} disabled={submitting} style={{ width: "100%", padding: 16, fontSize: 13, letterSpacing: "0.16em" }}>
                    {submitting ? "PLACING YOUR ORDER…" : `PLACE ORDER · PKR ${grandTotal.toLocaleString()}`}
                  </YBtn>
                </div>
              </div>
            </FadeIn>
          )}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e0e8ee", position: "sticky", top: 80 }}>
          <div style={{ background: BLACK, padding: "18px 22px" }}>
            <div style={{ width: 24, height: 3, background: BRAND, marginBottom: 8 }} />
            <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>ORDER SUMMARY</div>
          </div>
          <div style={{ padding: 20 }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
                <div style={{ width: 52, height: 40, flexShrink: 0, overflow: "hidden", background: CREAM }}>
                  <img src={`${item.image}`} alt={item.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono }}>× {item.qty}</div>
                </div>
                <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 11, color: BLACK }}>
                  PKR {((item.discountPrice || item.price || 0) * (item.qty || 1)).toLocaleString()}
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #f0ece4", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Subtotal</span>
                <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: BLACK }}>PKR {cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#888", fontFamily: mono }}>Shipping</span>
                <span style={{ fontSize: 12, fontWeight: 900, fontFamily: ff, color: shipping === 0 ? "#16a34a" : BLACK }}>
                  {shipping === 0 ? "FREE" : `PKR ${shipping}`}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "2px solid #e8e0d0", marginTop: 4 }}>
                <span style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", color: BLACK }}>TOTAL</span>
                <span style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? 16 : 18, color: BLACK }}>PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ORDER SUCCESS PAGE ============
export function OrderSuccessPage({ navigate }) {
  const [count, setCount] = useState(8);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = setInterval(() => setCount(c => {
      if (c <= 1) { clearInterval(t); navigate("#/"); return 0; }
      return c - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/content/15-1.png) center/cover no-repeat`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, position: "relative", overflow: "hidden", padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: 560, padding: "0 20px", position: "relative", zIndex: 1 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 36, color: BRAND_TEXT }}>✓</div>
        <div style={{ width: 48, height: 4, background: BRAND, margin: "0 auto 24px" }}/>
        <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#fff", margin: "0 0 10px" }}>ORDER</h1>
        <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(48px, 8vw, 80px)", lineHeight: 0.92, color: "#89c4e1", margin: "0 0 28px" }}>PLACED!</h1>
        <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.45)", fontFamily: mono, lineHeight: 1.8, marginBottom: 36 }}>
          Thank you for your order. Our team will call you to confirm delivery details. Your frames will arrive within 5–7 business days.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <YBtn onClick={() => navigate("#/products")} style={{ padding: "13px 28px", fontSize: isMobile ? 10 : 12 }}>SHOP MORE FRAMES</YBtn>
          <button onClick={() => navigate("#/")} style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.2)", padding: "13px 24px", fontSize: 12, fontWeight: 900, letterSpacing: "0.1em", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontFamily: ff }}>GO HOME</button>
        </div>
        <div style={{ marginTop: 28, fontSize: 11, color: "#444", fontFamily: mono }}>Redirecting to home in {count}s...</div>
      </div>
    </div>
  );
}

// ============ REVIEW SUBMISSION PAGE ============
export function ReviewSubmissionPage({ productId, reviewId, navigate }) {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [existingReview, setExistingReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!user) { navigate("#/"); return; }
    window.scrollTo({ top: 0, behavior: "smooth" });

    const found = PRODUCTS_DATA.find(p => p.id === productId);
    setProduct(found || { id: productId, name: `Product #${productId}`, gallery: [], discountPrice: 0, price: 0 });

    const loadExisting = async () => {
      if (reviewId) {
        try {
          const res = await getUserReviews();
          const reviews = res.data || [];
          const match = reviews.find(r => r.reviewId === reviewId);
          if (match) {
            setExistingReview(match);
            setRating(Number(match.rating) || 0);
            setReviewText(match.review || "");
          }
        } catch {}
      }
      setLoading(false);
    };
    loadExisting();
  }, [productId, reviewId, user, navigate]);

  const handleSubmit = async () => {
    if (!rating) { setMsg({ type: "error", text: "Please select a star rating before submitting." }); return; }
    setSubmitting(true);
    setMsg({ type: "", text: "" });
    try {
      if (existingReview && reviewId) {
        await updateReview({ reviewId, rating, review: reviewText });
      } else {
        await submitReview({ productId, rating, review: reviewText });
      }
      setMsg({ type: "success", text: existingReview ? "Review updated successfully!" : "Review submitted! It will appear after approval." });
      setTimeout(() => navigate("#/dashboard?tab=reviews"), 2200);
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Submission failed. Please try again." });
    }
    setSubmitting(false);
  };

  if (!user) return null;

  const LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: ff }}>
      <div style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/content/20250306_175757.jpg) center/cover no-repeat`, padding: isMobile ? "40px 20px" : "56px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ width: 36, height: 3, background: BRAND, margin: "0 auto 16px" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 10, fontFamily: ff }}>MY ACCOUNT · REVIEWS</div>
          <h1 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(24px, 8vw, 36px)" : "clamp(32px, 5vw, 60px)", lineHeight: 0.92, color: "#fff", letterSpacing: "0.02em", margin: "0 0 12px" }}>
            {existingReview ? "EDIT REVIEW" : "WRITE A REVIEW"}
          </h1>
        </div>
      </div>

      <Breadcrumb crumbs={[
        { label: "HOME", path: "#/" },
        { label: "MY ACCOUNT", path: "#/dashboard" },
        { label: "REVIEWS", path: "#/dashboard?tab=reviews" },
        { label: existingReview ? "EDIT REVIEW" : "SUBMIT REVIEW", path: null },
      ]} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "32px 16px 60px" : "56px 24px 80px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING…</div>
        ) : (
          <FadeIn>
            {product && (
              <div style={{ display: "flex", gap: 20, alignItems: "center", background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "12px" : "20px", marginBottom: 36, flexWrap: "wrap" }}>
                <div style={{ width: 90, height: 72, background: CREAM, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {product.gallery?.[0]
                    ? <img src={`${product.gallery[0]}`} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                    : <span style={{ fontSize: 28 }}>👓</span>
                  }
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#aaa", fontFamily: ff, marginBottom: 4 }}>
                    {product.category?.toUpperCase() || "EYEWEAR"}
                  </div>
                  <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 16, color: BLACK, letterSpacing: "0.04em", marginBottom: 4 }}>
                    {product.name}
                  </div>
                  {product.discountPrice > 0 && (
                    <div style={{ fontFamily: ff, fontSize: 13, color: BRAND, fontWeight: 700 }}>
                      PKR {product.discountPrice.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{ background: "#fff", border: "1.5px solid #e8e0d0", padding: isMobile ? "20px" : "32px" }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: BRAND, borderBottom: `2px solid ${BRAND}`, paddingBottom: 10, marginBottom: 28, fontFamily: ff }}>
                {existingReview ? "UPDATE YOUR REVIEW" : "YOUR REVIEW"}
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 12 }}>
                  OVERALL RATING <span style={{ color: "#e74c3c" }}>*</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontSize: isMobile ? 28 : 36, padding: "0 3px",
                          color: star <= (hovered || rating) ? "#f5a623" : "#e0ddd6",
                          transition: "color 0.12s, transform 0.1s",
                          transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
                        }}
                      >★</button>
                    ))}
                  </div>
                  {(hovered || rating) > 0 && (
                    <span style={{ fontSize: 12, color: "#888", fontFamily: mono, letterSpacing: "0.04em" }}>
                      {LABEL[hovered || rating]}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: BLACK, fontFamily: ff, marginBottom: 8 }}>
                  WRITTEN REVIEW <span style={{ fontSize: 10, color: "#aaa", fontWeight: 400 }}>(optional)</span>
                </div>
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Share your experience with this frame — fit, quality, style..."
                  rows={5}
                  style={{
                    width: "100%", padding: "14px 16px", border: "1.5px solid #e8e0d0",
                    fontSize: 13, fontFamily: mono, color: BLACK, lineHeight: 1.7,
                    resize: "vertical", outline: "none", boxSizing: "border-box",
                    background: "#fafaf8",
                  }}
                  onFocus={e => e.target.style.borderColor = BRAND}
                  onBlur={e => e.target.style.borderColor = "#e8e0d0"}
                />
                <div style={{ fontSize: 10, color: "#bbb", fontFamily: mono, marginTop: 6, textAlign: "right" }}>
                  {reviewText.length} characters
                </div>
              </div>

              {msg.text && (
                <div style={{
                  padding: "12px 16px", fontSize: 12, fontFamily: mono, marginBottom: 20,
                  background: msg.type === "success" ? "#eaf5ef" : "#fef0f0",
                  border: `1px solid ${msg.type === "success" ? "#a3d9b5" : "#f5c0c0"}`,
                  color: msg.type === "success" ? "#2a8a50" : "#a33",
                }}>
                  {msg.type === "success" ? "✓ " : "⚠ "}{msg.text}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || rating === 0}
                  style={{
                    background: submitting || rating === 0 ? "#ccc" : BRAND, color: "#fff",
                    border: "none", padding: "14px 28px", fontSize: 11, fontWeight: 900,
                    letterSpacing: "0.14em", fontFamily: ff,
                    cursor: submitting || rating === 0 ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {submitting ? "SUBMITTING…" : existingReview ? "UPDATE REVIEW" : "SUBMIT REVIEW"}
                </button>
                <button
                  onClick={() => navigate("#/dashboard?tab=reviews")}
                  style={{
                    background: "none", border: `1.5px solid #ccc`, color: "#888",
                    padding: "14px 24px", fontSize: 11, fontWeight: 900,
                    letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
                  }}
                >
                  ← BACK TO REVIEWS
                </button>
              </div>

              <div style={{ marginTop: 20, padding: "12px 16px", background: "#f8f8f4", border: "1px solid #eee" }}>
                <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, lineHeight: 1.8 }}>
                  ★ Reviews are verified and approved before publishing. Only customers who have purchased this product may submit a review.
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

// ============ PRODUCT REVIEWS SECTION ============
function ProductReviewsSection({ productId, navigate }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getReviews({ productId });
      const data = res.data || [];
      setReviews(Array.isArray(data) ? data : []);

      if (data.length > 0) {
        const total = data.length;
        const avg = data.reduce((s, r) => s + Number(r.rating || 0), 0) / total;
        const breakdown = [5, 4, 3, 2, 1].map(star => ({
          star,
          count: data.filter(r => Number(r.rating) === star).length,
        }));
        setStats({ avg: Math.round(avg * 10) / 10, total, breakdown });
      } else {
        setStats({ avg: 0, total: 0, breakdown: [] });
      }
    } catch {
      setReviews([]);
      setStats({ avg: 0, total: 0, breakdown: [] });
    }
    setLoading(false);
  }, [productId]);

  useEffect(() => { load(); }, [load]);

  const displayed = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div style={{ background: CREAM, borderTop: "2px solid #e8ddd0", padding: isMobile ? "40px 20px" : "64px 40px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#aaa", marginBottom: 6, fontFamily: ff }}>VERIFIED BUYERS</div>
            <h2 style={{ fontFamily: ff, fontWeight: 900, fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(24px, 3.5vw, 36px)", margin: 0, letterSpacing: "0.02em", color: BLACK }}>
              CUSTOMER REVIEWS
            </h2>
          </div>
          {user && (
            <button
              onClick={() => navigate(`#/review/${productId}`)}
              style={{
                background: BRAND, color: "#fff", border: "none",
                padding: "12px 24px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
                letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
              }}
            >
              WRITE A REVIEW
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>LOADING REVIEWS…</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", gap: isMobile ? 32 : 48, alignItems: "flex-start" }}>

            <div>
              {stats && stats.total > 0 ? (
                <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24 }}>
                  <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ece4" }}>
                    <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 52, color: BLACK, lineHeight: 1 }}>
                      {stats.avg.toFixed(1)}
                    </div>
                    <div style={{ color: "#f5a623", fontSize: 20, letterSpacing: 3, margin: "6px 0" }}>
                      {"★".repeat(Math.round(stats.avg))}{"☆".repeat(5 - Math.round(stats.avg))}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", fontFamily: mono }}>
                      Based on {stats.total} review{stats.total !== 1 ? "s" : ""}
                    </div>
                  </div>
                  {stats.breakdown.map(({ star, count }) => (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontFamily: ff, fontWeight: 900, color: "#888", minWidth: 28, textAlign: "right" }}>{star}★</span>
                      <div style={{ flex: 1, height: 6, background: "#f0ece4", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "#f5a623", width: stats.total > 0 ? `${(count / stats.total) * 100}%` : "0%", transition: "width 0.4s ease" }} />
                      </div>
                      <span style={{ fontSize: 10, fontFamily: mono, color: "#aaa", minWidth: 14 }}>{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>☆</div>
                  <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, lineHeight: 1.7 }}>No reviews yet. Be the first!</div>
                  {user && (
                    <button
                      onClick={() => navigate(`#/review/${productId}`)}
                      style={{
                        marginTop: 14, background: BRAND, color: "#fff", border: "none",
                        padding: "10px 20px", fontSize: 10, fontWeight: 900,
                        letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
                      }}
                    >
                      WRITE A REVIEW
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              {reviews.length === 0 ? (
                <div style={{ padding: "32px 0", color: "#aaa", fontFamily: mono, fontSize: 13 }}>
                  No reviews yet for this product.
                </div>
              ) : (
                <>
                  {displayed.map((r, i) => (
                    <div key={r.reviewId || i} style={{ background: "#fff", border: "1.5px solid #e8ddd0", padding: 22, marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <div style={{ color: "#f5a623", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>
                            {"★".repeat(Number(r.rating) || 0)}{"☆".repeat(5 - (Number(r.rating) || 0))}
                          </div>
                          <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 12, color: BLACK, letterSpacing: "0.04em" }}>
                            {r.authorName || r.fullName || "Verified Buyer"}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                          {(r.verifiedPurchase === true || r.verifiedPurchase === "TRUE" || r.verifiedPurchase === "true") && (
                            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", background: "#eaf5ef", color: "#2a8a50", fontFamily: ff }}>
                              ✓ VERIFIED PURCHASE
                            </span>
                          )}
                          <span style={{ fontSize: 10, color: "#bbb", fontFamily: mono }}>
                            {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) : ""}
                          </span>
                        </div>
                      </div>
                      {r.review && (
                        <p style={{ fontSize: 13, color: "#555", fontFamily: mono, margin: 0, lineHeight: 1.8 }}>
                          {r.review}
                        </p>
                      )}
                    </div>
                  ))}

                  {reviews.length > 3 && (
                    <button
                      onClick={() => setShowAll(v => !v)}
                      style={{
                        background: "none", border: `1.5px solid ${BLACK}`, color: BLACK,
                        padding: "11px 24px", fontSize: 11, fontWeight: 900,
                        letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer", marginTop: 8,
                      }}
                    >
                      {showAll ? `SHOW FEWER ↑` : `VIEW ALL ${reviews.length} REVIEWS ↓`}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const CollectionPage = CollectionsLandingPage;




