








// // shared.jsx - Premium Wishlist Heart + Redesigned Components
// import { useState, useEffect, useRef, useCallback } from "react";
// import { BLACK, CREAM, ff, mono, tagColors } from "../contants/store.js";
// import { useCart } from "../contexts/CardContext.jsx";
// import { useAuth } from "../Auth/auth.jsx";
// import { addToWishlist, removeFromWishlist, getWishlist } from "../services/service.js";
// import { getProductDiscountPercent, getProductDisplayPrice } from "../services/productUtils.js";

// const BRAND = "#0c2c41";
// const BRAND_TEXT = "#ffffff";

// // ─── Button Components ────────────────────────────────────────────────────────
// export function YBtn({ children, onClick, style = {}, disabled = false }) {
//   const [h, setH] = useState(false);
//   return (
//     <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//       onClick={onClick} disabled={disabled}
//       style={{
//         background: disabled ? "#ccc" : h ? "#0a2235" : BRAND,
//         color: disabled ? "#888" : BRAND_TEXT,
//         border: "none", padding: "13px 32px", fontSize: 12, fontWeight: 900,
//         letterSpacing: "0.12em", cursor: disabled ? "not-allowed" : "pointer",
//         fontFamily: ff, transition: "background 0.18s", ...style
//       }}>
//       {children}
//     </button>
//   );
// }

// export function OutlineBtn({ children, dark = false, style = {} }) {
//   return (
//     <button style={{
//       background: "transparent",
//       color: dark ? "rgba(255,255,255,0.7)" : BLACK,
//       border: `1.5px solid ${dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}`,
//       padding: "12px 28px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
//       cursor: "pointer", fontFamily: ff, ...style
//     }}>
//       {children}
//     </button>
//   );
// }

// // ─── Animation Components ─────────────────────────────────────────────────────
// export function FadeIn({ children, delay = 0, style = {}, className = "" }) {
//   const [vis, setVis] = useState(false);
//   const ref = useRef(null);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { setVis(true); obs.disconnect(); }
//     }, { threshold: 0.05 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return (
//     <div ref={ref} className={className} style={{
//       opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
//       transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style
//     }}>
//       {children}
//     </div>
//   );
// }

// export function Counter({ target, suffix = "" }) {
//   const [val, setVal] = useState(0);
//   const ref = useRef(null);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) {
//         let n = 0; const step = target / 60;
//         const t = setInterval(() => {
//           n += step;
//           if (n >= target) { setVal(target); clearInterval(t); }
//           else setVal(Math.floor(n));
//         }, 22);
//         obs.disconnect();
//       }
//     }, { threshold: 0.3 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [target]);
//   return <span ref={ref}>{val}{suffix}</span>;
// }

// // ─── Frame SVG ────────────────────────────────────────────────────────────────
// export function Frame({ shape, color = BLACK, size = 100 }) {
//   const s = size;
//   if (shape === "round") return (
//     <svg width={s} height={s * 0.55} viewBox="0 0 120 66" fill="none">
//       <ellipse cx="30" cy="33" rx="25" ry="22" stroke={color} strokeWidth="4" fill="none"/>
//       <ellipse cx="90" cy="33" rx="25" ry="22" stroke={color} strokeWidth="4" fill="none"/>
//       <line x1="55" y1="33" x2="65" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="5" y1="29" x2="0" y2="27" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="115" y1="29" x2="120" y2="27" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//     </svg>
//   );
//   if (shape === "square") return (
//     <svg width={s} height={s * 0.55} viewBox="0 0 120 66" fill="none">
//       <rect x="5" y="11" width="49" height="44" rx="4" stroke={color} strokeWidth="4" fill="none"/>
//       <rect x="66" y="11" width="49" height="44" rx="4" stroke={color} strokeWidth="4" fill="none"/>
//       <line x1="54" y1="33" x2="66" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="5" y1="28" x2="0" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="115" y1="28" x2="120" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//     </svg>
//   );
//   if (shape === "aviator") return (
//     <svg width={s} height={s * 0.6} viewBox="0 0 120 72" fill="none">
//       <path d="M5 20 Q5 60 30 62 Q55 64 55 36" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
//       <path d="M5 20 Q30 10 55 20" stroke={color} strokeWidth="3" fill="none"/>
//       <path d="M115 20 Q115 60 90 62 Q65 64 65 36" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
//       <path d="M115 20 Q90 10 65 20" stroke={color} strokeWidth="3" fill="none"/>
//       <line x1="55" y1="30" x2="65" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="5" y1="22" x2="0" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="115" y1="22" x2="120" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//     </svg>
//   );
//   if (shape === "cateye") return (
//     <svg width={s} height={s * 0.55} viewBox="0 0 120 66" fill="none">
//       <path d="M5 40 Q5 15 35 13 L55 20 Q60 22 55 38 Q50 55 28 55 Q5 55 5 40Z" stroke={color} strokeWidth="4" fill="none"/>
//       <path d="M115 40 Q115 15 85 13 L65 20 Q60 22 65 38 Q70 55 92 55 Q115 55 115 40Z" stroke={color} strokeWidth="4" fill="none"/>
//       <line x1="55" y1="30" x2="65" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="5" y1="35" x2="0" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//       <line x1="115" y1="35" x2="120" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round"/>
//     </svg>
//   );
//   return null;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MODULE-LEVEL WISHLIST CACHE
// // Shared across all WishlistHeart instances so we only fetch once per session,
// // not once per card. Toggle actions update the cache in-place.
// // ─────────────────────────────────────────────────────────────────────────────
// let _wishlistCache = null;       // null = not loaded yet, [] = loaded (empty), [...] = loaded
// let _wishlistPromise = null;     // in-flight fetch promise (deduplicates concurrent calls)
// let _wishlistUser = null;        // track which user the cache belongs to

// async function getCachedWishlist(userId) {
//   // If user changed, invalidate cache
//   if (_wishlistUser !== userId) {
//     _wishlistCache = null;
//     _wishlistPromise = null;
//     _wishlistUser = userId;
//   }

//   // Already loaded
//   if (_wishlistCache !== null) return _wishlistCache;

//   // Already fetching — reuse the same promise
//   if (_wishlistPromise) return _wishlistPromise;

//   // Start a fresh fetch
//   _wishlistPromise = getWishlist()
//     .then(res => {
//       _wishlistCache = res.data || [];
//       _wishlistPromise = null;
//       return _wishlistCache;
//     })
//     .catch(() => {
//       _wishlistCache = [];
//       _wishlistPromise = null;
//       return [];
//     });

//   return _wishlistPromise;
// }

// // Call this after logout so the next user starts fresh
// export function invalidateWishlistCache() {
//   _wishlistCache = null;
//   _wishlistPromise = null;
//   _wishlistUser = null;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // REUSABLE WISHLIST HEART COMPONENT
// // Single source of truth for all wishlist hearts across the site.
// // Uses module-level cache — 20 cards = 1 API call, not 20.
// // ─────────────────────────────────────────────────────────────────────────────
// export function WishlistHeart({ productId, size = "md", placement = "card" }) {
//   const [inWishlist, setInWishlist] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [animating, setAnimating] = useState(false);
//   const { user } = useAuth();

//   // Check wishlist status on mount using shared cache
//   useEffect(() => {
//     if (!user || !productId) {
//       setInWishlist(false);
//       return;
//     }
//     getCachedWishlist(user.id || user.email).then(items => {
//       setInWishlist(items.some(i => String(i.productId) === String(productId)));
//     });
//   }, [user, productId]);

//   const toggle = async (e) => {
//     e.stopPropagation();

//     if (!user) {
//       alert("Please login to save items to your wishlist.");
//       return;
//     }
//     if (loading) return;

//     setLoading(true);
//     setAnimating(true);
//     setTimeout(() => setAnimating(false), 600);

//     try {
//       if (inWishlist) {
//         // Find the wishlistId from cache
//         const items = _wishlistCache || [];
//         const item = items.find(i => String(i.productId) === String(productId));
//         if (item) {
//           await removeFromWishlist({ wishlistId: item.wishlistId });
//           // Update cache in-place — remove item
//           _wishlistCache = (_wishlistCache || []).filter(
//             i => String(i.productId) !== String(productId)
//           );
//           setInWishlist(false);
//         }
//       } else {
//         const res = await addToWishlist({ productId });
//         // Update cache in-place — add item
//         const newItem = {
//           productId,
//           wishlistId: res?.data?.wishlistId || res?.wishlistId || `temp_${Date.now()}`,
//         };
//         _wishlistCache = [...(_wishlistCache || []), newItem];
//         setInWishlist(true);
//       }
//     } catch (err) {
//       alert(err.message || "Something went wrong. Please try again.");
//     }

//     setLoading(false);
//   };

//   // Size presets
//   const sizes = {
//     sm: { btn: 28, icon: 14 },
//     md: { btn: 34, icon: 17 },
//     lg: { btn: 44, icon: 20 },
//   };
//   const sz = sizes[size] || sizes.md;

//   const isCard = placement === "card";

//   const btnStyle = isCard ? {
//     position: "absolute", top: 10, right: 10, zIndex: 4,
//     width: sz.btn, height: sz.btn, borderRadius: "50%",
//     background: "rgba(255,255,255,0.92)",
//     border: inWishlist ? "1.5px solid #e53e3e" : "1.5px solid rgba(0,0,0,0.1)",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     cursor: loading ? "wait" : "pointer",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//     transition: "all 0.22s",
//     backdropFilter: "blur(4px)",
//     transform: animating ? "scale(1.25)" : "scale(1)",
//   } : {
//     width: sz.btn, height: sz.btn, borderRadius: "50%",
//     background: inWishlist ? "#fff0f0" : "#f8f8f8",
//     border: inWishlist ? "1.5px solid #e53e3e" : "1.5px solid #e8e0d0",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     cursor: loading ? "wait" : "pointer",
//     transition: "all 0.22s",
//     transform: animating ? "scale(1.2)" : "scale(1)",
//     flexShrink: 0,
//   };

//   return (
//     <>
//       <button
//         onClick={toggle}
//         disabled={loading}
//         style={btnStyle}
//         onMouseEnter={(e) => {
//           if (!loading) {
//             e.currentTarget.style.transform = animating ? "scale(1.25)" : "scale(1.12)";
//             if (isCard) e.currentTarget.style.background = "rgba(255,255,255,1)";
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!loading && !animating) {
//             e.currentTarget.style.transform = "scale(1)";
//             if (isCard) e.currentTarget.style.background = "rgba(255,255,255,0.92)";
//           }
//         }}
//         aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
//       >
//         <svg
//           width={sz.icon} height={sz.icon}
//           viewBox="0 0 24 24"
//           fill={inWishlist ? "#e53e3e" : "none"}
//           stroke={inWishlist ? "#e53e3e" : "#999"}
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{
//             transition: "all 0.25s",
//             transform: animating ? "scale(1.3)" : "scale(1)",
//             filter: animating && inWishlist ? "drop-shadow(0 0 6px rgba(229,62,62,0.6))" : "none",
//           }}
//         >
//           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//         </svg>
//       </button>
//       <style>{`
//         @keyframes heartPop {
//           0%   { transform: scale(1); }
//           30%  { transform: scale(1.4); }
//           60%  { transform: scale(0.9); }
//           100% { transform: scale(1); }
//         }
//         @keyframes heartFloat {
//           0%   { opacity: 1; transform: translateY(0) scale(1); }
//           100% { opacity: 0; transform: translateY(-30px) scale(0.5); }
//         }
//       `}</style>
//     </>
//   );
// }

// // ─── Skeleton Loader for Wishlist ─────────────────────────────────────────────
// export function WishlistSkeleton() {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
//       {[1, 2, 3, 4].map(i => (
//         <div key={i} style={{ background: "#fff", border: "1px solid #eee", overflow: "hidden" }}>
//           <div style={{ height: 220, background: "linear-gradient(90deg, #f0f0f0 25%, #fafafa 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
//           <div style={{ padding: "16px" }}>
//             <div style={{ height: 10, background: "#f0f0f0", marginBottom: 8, width: "60%", borderRadius: 2 }} />
//             <div style={{ height: 14, background: "#f0f0f0", marginBottom: 8, width: "80%", borderRadius: 2 }} />
//             <div style={{ height: 10, background: "#f0f0f0", marginBottom: 16, width: "40%", borderRadius: 2 }} />
//             <div style={{ display: "flex", gap: 8 }}>
//               <div style={{ flex: 1, height: 38, background: "#f0f0f0", borderRadius: 2 }} />
//               <div style={{ width: 38, height: 38, background: "#f0f0f0", borderRadius: 2 }} />
//             </div>
//           </div>
//         </div>
//       ))}
//       <style>{`@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }`}</style>
//     </div>
//   );
// }

// function normalizeVariantName(value) {
//   return String(value || "").trim().toLowerCase();
// }

// function getProductVariants(product) {
//   if (Array.isArray(product?.colors) && product.colors.length) return product.colors;
//   if (product?.color) {
//     return [{ name: product.color, swatch: null, image: product.image, gallery: product.gallery || [product.image] }];
//   }
//   return [];
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

// // ─── Product Card with Reusable WishlistHeart ─────────────────────────────────
// export function ProductCard({ product, navigate, type = "default" }) {
//   const [hov, setHov] = useState(false);
//   const [addedMsg, setAddedMsg] = useState(false);
//   const { addToCart } = useCart();
//   const variants = getProductVariants(product);
//   const [selectedVariantName, setSelectedVariantName] = useState(() => {
//     const stored = getStoredVariantName(product?.id);
//     const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
//     return match ? match.name : (variants[0]?.name || "");
//   });

//   useEffect(() => {
//     const stored = getStoredVariantName(product?.id);
//     const match = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(stored));
//     const nextName = match ? match.name : (variants[0]?.name || "");
//     setSelectedVariantName(nextName);
//   }, [product?.id, variants.length]);

//   const { price, discountPrice } = getProductDisplayPrice(product);
//   const discount = getProductDiscountPercent(product);
//   const tc = product?.tag ? tagColors[product.tag] : null;
//   const selectedVariant = variants.find(v => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)) || variants[0] || null;
//   const displayImage = selectedVariant?.image || product?.image || product?.gallery?.[0] || "";
//   const displayLabel = selectedVariant?.name || product?.color || "Default";

//   const handleAdd = e => {
//     e.stopPropagation();
//     addToCart(product, 1);
//     setAddedMsg(true);
//     setTimeout(() => setAddedMsg(false), 1800);
//   };

//   const handleSelectColor = (variant, e) => {
//     e.stopPropagation();
//     setSelectedVariantName(variant.name);
//     setStoredVariantName(product.id, variant.name);
//   };

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       onClick={() => navigate(`#/products/${product.id}`)}
//       onKeyDown={(event) => {
//         if (event.key === "Enter" || event.key === " ") {
//           event.preventDefault();
//           navigate(`#/products/${product.id}`);
//         }
//       }}
//       role="button"
//       tabIndex={0}
//       style={{
//         cursor: "pointer", background: "#fff", border: "1px solid #e8e0d0",
//         position: "relative", overflow: "hidden", transition: "box-shadow 0.3s, transform 0.3s",
//         boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.11)" : "0 1px 4px rgba(0,0,0,0.04)",
//         transform: hov ? "translateY(-4px)" : "none", display: "flex", flexDirection: "column"
//       }}>

//       {/* Tag badge */}
//       {product.tag && tc && (
//         <div style={{
//           position: "absolute", top: 12, left: 12, zIndex: 3,
//           background: tc.bg, color: tc.color, fontSize: 9, fontWeight: 900,
//           letterSpacing: "0.18em", padding: "4px 10px", fontFamily: ff
//         }}>{product.tag}</div>
//       )}

//       {/* Discount badge — only show if no tag */}
//       {discount > 0 && !product.tag && (
//         <div style={{
//           position: "absolute", top: 12, left: 12, zIndex: 3,
//           background: BRAND, color: BRAND_TEXT, fontSize: 9, fontWeight: 900,
//           letterSpacing: "0.1em", padding: "4px 8px", fontFamily: ff
//         }}>−{discount}%</div>
//       )}

//       {/* Wishlist Heart — unified component, uses shared cache */}
//       <WishlistHeart productId={product.id} size="md" placement="card" />

//       {/* Image */}
//       <div
//         style={{
//           height: 260, overflow: "hidden",
//           background: hov ? CREAM : "#FAFAF8",
//           transition: "background 0.4s", position: "relative", flexShrink: 0
//         }}>
//         <img
//           src={displayImage} alt={`${product.name} - ${displayLabel}`}
//           style={{
//             width: "100%", height: "100%", objectFit: "cover",
//             transition: "transform 0.5s ease",
//             transform: hov ? "scale(1.06)" : "scale(1)"
//           }}
//         />
//         {variants.length > 1 && (
//           <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 6, zIndex: 3 }}>
//             {variants.map((variant) => {
//               const active = normalizeVariantName(variant.name) === normalizeVariantName(selectedVariantName);
//               return (
//                 <button
//                   key={variant.name}
//                   onClick={(e) => handleSelectColor(variant, e)}
//                   title={variant.name}
//                   style={{
//                     width: 20,
//                     height: 20,
//                     borderRadius: "50%",
//                     border: active ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.1)",
//                     background: variant.swatch || "#d9d9d9",
//                     cursor: "pointer",
//                     padding: 0,
//                     boxShadow: active ? "0 0 0 2px rgba(12,44,65,0.12)" : "none",
//                   }}
//                 />
//               );
//             })}
//           </div>
//         )}
//         <div style={{
//           position: "absolute", bottom: 0, left: 0, right: 0, background: BRAND,
//           color: BRAND_TEXT, textAlign: "center", padding: "10px", fontSize: 10, fontWeight: 900,
//           letterSpacing: "0.14em", fontFamily: ff,
//           transform: hov ? "translateY(0)" : "translateY(100%)",
//           transition: "transform 0.28s ease"
//         }}>
//           VIEW DETAILS →
//         </div>
//       </div>

//       {/* Info */}
//       <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
//         <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.16em", marginBottom: 2, fontFamily: ff }}>
//           {product.subcategory?.toUpperCase()} · {product.gender?.toUpperCase()}
//         </div>
//         <div
//           style={{ fontFamily: ff, fontSize: 16, fontWeight: 900, letterSpacing: "0.03em", color: BLACK, marginBottom: 3, cursor: "pointer", lineHeight: 1.2 }}>
//           {product.name}
//         </div>
//         <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 10, lineHeight: 1.4 }}>
//           {displayLabel}
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//           <span style={{ fontFamily: ff, fontSize: 14, fontWeight: 900, color: BLACK }}>
//             PKR {discountPrice.toLocaleString()}
//           </span>
//           {discountPrice < price && (
//             <span style={{ fontFamily: mono, fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>
//               PKR {price.toLocaleString()}
//             </span>
//           )}
//         </div>
//         <button onClick={handleAdd} style={{
//           marginTop: "auto",
//           background: addedMsg ? "#16a34a" : hov ? BRAND : "transparent",
//           color: addedMsg ? "#fff" : hov ? BRAND_TEXT : BLACK,
//           border: `1.5px solid ${addedMsg ? "#16a34a" : BRAND}`,
//           padding: "8px 0", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
//           cursor: "pointer", fontFamily: ff, transition: "all 0.22s", width: "100%"
//         }}>
//           {addedMsg ? "✓ ADDED TO BAG" : "+ ADD TO BAG"}
//         </button>
//       </div>
//     </div>
//   );
// }




















































// shared.jsx - Premium Wishlist Heart + Redesigned Components (FULLY RESPONSIVE)
import { useState, useEffect, useRef, useCallback } from "react";
import { BLACK, CREAM, ff, mono, tagColors } from "../contants/store.js";
import { useCart } from "../contexts/CardContext.jsx";
import { useAuth } from "../Auth/auth.jsx";
import { addToWishlist, removeFromWishlist, getWishlist } from "../services/service.js";
import { getProductDiscountPercent, getProductDisplayPrice } from "../services/productUtils.js";

const BRAND = "#0c2c41";
const BRAND_TEXT = "#ffffff";

// ─── Button Components ────────────────────────────────────────────────────────
export function YBtn({ children, onClick, style = {}, disabled = false }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#ccc" : h ? "#0a2235" : BRAND,
        color: disabled ? "#888" : BRAND_TEXT,
        border: "none",
        padding: "clamp(10px, 1.5vw, 16px) clamp(18px, 4vw, 32px)",
        fontSize: "clamp(10px, 1.2vw, 14px)",
        fontWeight: 900,
        letterSpacing: "0.12em",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: ff,
        transition: "background 0.18s",
        minHeight: "44px",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function OutlineBtn({ children, dark = false, style = {} }) {
  return (
    <button
      style={{
        background: "transparent",
        color: dark ? "rgba(255,255,255,0.7)" : BLACK,
        border: `1.5px solid ${dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}`,
        padding: "clamp(10px, 1.5vw, 14px) clamp(16px, 3vw, 28px)",
        fontSize: "clamp(10px, 1.2vw, 13px)",
        fontWeight: 700,
        letterSpacing: "0.1em",
        cursor: "pointer",
        fontFamily: ff,
        minHeight: "44px",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Animation Components ─────────────────────────────────────────────────────
export function FadeIn({ children, delay = 0, style = {}, className = "" }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let n = 0;
          const step = target / 60;
          const t = setInterval(() => {
            n += step;
            if (n >= target) {
              setVal(target);
              clearInterval(t);
            } else setVal(Math.floor(n));
          }, 22);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── Frame SVG ────────────────────────────────────────────────────────────────
// Responsive: uses viewBox and scales to container width; size prop acts as maxWidth.
export function Frame({ shape, color = BLACK, size = 100 }) {
  const commonStyle = {
    width: "100%",
    height: "auto",
    maxWidth: size,
    display: "block",
  };

  if (shape === "round")
    return (
      <svg viewBox="0 0 120 66" fill="none" style={commonStyle}>
        <ellipse cx="30" cy="33" rx="25" ry="22" stroke={color} strokeWidth="4" fill="none" />
        <ellipse cx="90" cy="33" rx="25" ry="22" stroke={color} strokeWidth="4" fill="none" />
        <line x1="55" y1="33" x2="65" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="29" x2="0" y2="27" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="115" y1="29" x2="120" y2="27" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );

  if (shape === "square")
    return (
      <svg viewBox="0 0 120 66" fill="none" style={commonStyle}>
        <rect x="5" y="11" width="49" height="44" rx="4" stroke={color} strokeWidth="4" fill="none" />
        <rect x="66" y="11" width="49" height="44" rx="4" stroke={color} strokeWidth="4" fill="none" />
        <line x1="54" y1="33" x2="66" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="28" x2="0" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="115" y1="28" x2="120" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );

  if (shape === "aviator")
    return (
      <svg viewBox="0 0 120 72" fill="none" style={commonStyle}>
        <path
          d="M5 20 Q5 60 30 62 Q55 64 55 36"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M5 20 Q30 10 55 20" stroke={color} strokeWidth="3" fill="none" />
        <path
          d="M115 20 Q115 60 90 62 Q65 64 65 36"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M115 20 Q90 10 65 20" stroke={color} strokeWidth="3" fill="none" />
        <line x1="55" y1="30" x2="65" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="22" x2="0" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="115" y1="22" x2="120" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );

  if (shape === "cateye")
    return (
      <svg viewBox="0 0 120 66" fill="none" style={commonStyle}>
        <path
          d="M5 40 Q5 15 35 13 L55 20 Q60 22 55 38 Q50 55 28 55 Q5 55 5 40Z"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M115 40 Q115 15 85 13 L65 20 Q60 22 65 38 Q70 55 92 55 Q115 55 115 40Z"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
        <line x1="55" y1="30" x2="65" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="35" x2="0" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="115" y1="35" x2="120" y2="33" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE-LEVEL WISHLIST CACHE
// Shared across all WishlistHeart instances so we only fetch once per session,
// not once per card. Toggle actions update the cache in-place.
// ─────────────────────────────────────────────────────────────────────────────
let _wishlistCache = null; // null = not loaded yet, [] = loaded (empty), [...] = loaded
let _wishlistPromise = null; // in-flight fetch promise (deduplicates concurrent calls)
let _wishlistUser = null; // track which user the cache belongs to

async function getCachedWishlist(userId) {
  // If user changed, invalidate cache
  if (_wishlistUser !== userId) {
    _wishlistCache = null;
    _wishlistPromise = null;
    _wishlistUser = userId;
  }

  // Already loaded
  if (_wishlistCache !== null) return _wishlistCache;

  // Already fetching — reuse the same promise
  if (_wishlistPromise) return _wishlistPromise;

  // Start a fresh fetch
  _wishlistPromise = getWishlist()
    .then((res) => {
      _wishlistCache = res.data || [];
      _wishlistPromise = null;
      return _wishlistCache;
    })
    .catch(() => {
      _wishlistCache = [];
      _wishlistPromise = null;
      return [];
    });

  return _wishlistPromise;
}

// Call this after logout so the next user starts fresh
export function invalidateWishlistCache() {
  _wishlistCache = null;
  _wishlistPromise = null;
  _wishlistUser = null;
}

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE WISHLIST HEART COMPONENT
// Single source of truth for all wishlist hearts across the site.
// Uses module-level cache — 20 cards = 1 API call, not 20.
// ─────────────────────────────────────────────────────────────────────────────
export function WishlistHeart({ productId, size = "md", placement = "card" }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { user } = useAuth();

  // Check wishlist status on mount using shared cache
  useEffect(() => {
    if (!user || !productId) {
      setInWishlist(false);
      return;
    }
    getCachedWishlist(user.id || user.email).then((items) => {
      setInWishlist(items.some((i) => String(i.productId) === String(productId)));
    });
  }, [user, productId]);

  const toggle = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to save items to your wishlist.");
      return;
    }
    if (loading) return;

    setLoading(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    try {
      if (inWishlist) {
        // Find the wishlistId from cache
        const items = _wishlistCache || [];
        const item = items.find((i) => String(i.productId) === String(productId));
        if (item) {
          await removeFromWishlist({ wishlistId: item.wishlistId });
          // Update cache in-place — remove item
          _wishlistCache = (_wishlistCache || []).filter(
            (i) => String(i.productId) !== String(productId)
          );
          setInWishlist(false);
        }
      } else {
        const res = await addToWishlist({ productId });
        // Update cache in-place — add item
        const newItem = {
          productId,
          wishlistId:
            res?.data?.wishlistId || res?.wishlistId || `temp_${Date.now()}`,
        };
        _wishlistCache = [...(_wishlistCache || []), newItem];
        setInWishlist(true);
      }
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Responsive size presets (touch‑friendly)
  const sizes = {
    sm: {
      btn: "clamp(32px, 5vw, 40px)",
      icon: "clamp(14px, 2vw, 18px)",
    },
    md: {
      btn: "clamp(38px, 6vw, 46px)",
      icon: "clamp(17px, 2.5vw, 21px)",
    },
    lg: {
      btn: "clamp(48px, 7vw, 56px)",
      icon: "clamp(20px, 3vw, 26px)",
    },
  };
  const sz = sizes[size] || sizes.md;

  const isCard = placement === "card";

  const btnStyle = isCard
    ? {
        position: "absolute",
        top: "clamp(6px, 1.5vw, 12px)",
        right: "clamp(6px, 1.5vw, 12px)",
        zIndex: 4,
        width: sz.btn,
        height: sz.btn,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.92)",
        border: inWishlist
          ? "1.5px solid #e53e3e"
          : "1.5px solid rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: loading ? "wait" : "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        transition: "all 0.22s",
        backdropFilter: "blur(4px)",
        transform: animating ? "scale(1.25)" : "scale(1)",
        minHeight: "44px",
        minWidth: "44px",
        padding: 0,
      }
    : {
        width: sz.btn,
        height: sz.btn,
        borderRadius: "50%",
        background: inWishlist ? "#fff0f0" : "#f8f8f8",
        border: inWishlist
          ? "1.5px solid #e53e3e"
          : "1.5px solid #e8e0d0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: loading ? "wait" : "pointer",
        transition: "all 0.22s",
        transform: animating ? "scale(1.2)" : "scale(1)",
        flexShrink: 0,
        minHeight: "44px",
        minWidth: "44px",
        padding: 0,
      };

  return (
    <>
      <button
        onClick={toggle}
        disabled={loading}
        style={btnStyle}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = animating ? "scale(1.25)" : "scale(1.12)";
            if (isCard) e.currentTarget.style.background = "rgba(255,255,255,1)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && !animating) {
            e.currentTarget.style.transform = "scale(1)";
            if (isCard) e.currentTarget.style.background = "rgba(255,255,255,0.92)";
          }
        }}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          width={sz.icon}
          height={sz.icon}
          viewBox="0 0 24 24"
          fill={inWishlist ? "#e53e3e" : "none"}
          stroke={inWishlist ? "#e53e3e" : "#999"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "all 0.25s",
            transform: animating ? "scale(1.3)" : "scale(1)",
            filter:
              animating && inWishlist
                ? "drop-shadow(0 0 6px rgba(229,62,62,0.6))"
                : "none",
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <style>{`
        @keyframes heartPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.4); }
          60%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes heartFloat {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(0.5); }
        }
      `}</style>
    </>
  );
}

// ─── Skeleton Loader for Wishlist ─────────────────────────────────────────────
export function WishlistSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 30vw, 280px), 1fr))",
        gap: "clamp(16px, 2vw, 24px)",
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #eee",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "clamp(180px, 30vw, 260px)",
              background:
                "linear-gradient(90deg, #f0f0f0 25%, #fafafa 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
            }}
          />
          <div style={{ padding: "clamp(12px, 2vw, 20px)" }}>
            <div
              style={{
                height: 10,
                background: "#f0f0f0",
                marginBottom: 8,
                width: "60%",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                height: 14,
                background: "#f0f0f0",
                marginBottom: 8,
                width: "80%",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                height: 10,
                background: "#f0f0f0",
                marginBottom: 16,
                width: "40%",
                borderRadius: 2,
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 38,
                  background: "#f0f0f0",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: "#f0f0f0",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

function normalizeVariantName(value) {
  return String(value || "").trim().toLowerCase();
}

function getProductVariants(product) {
  if (Array.isArray(product?.colors) && product.colors.length) return product.colors;
  if (product?.color) {
    return [
      {
        name: product.color,
        swatch: null,
        image: product.image,
        gallery: product.gallery || [product.image],
      },
    ];
  }
  return [];
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

// ─── Product Card with Reusable WishlistHeart ─────────────────────────────────
export function ProductCard({ product, navigate, type = "default" }) {
  const [addedMsg, setAddedMsg] = useState(false);
  const { addToCart } = useCart();
  const variants = getProductVariants(product);
  const [selectedVariantName, setSelectedVariantName] = useState(() => {
    const stored = getStoredVariantName(product?.id);
    const match = variants.find(
      (v) => normalizeVariantName(v.name) === normalizeVariantName(stored)
    );
    return match ? match.name : variants[0]?.name || "";
  });

  useEffect(() => {
    const stored = getStoredVariantName(product?.id);
    const match = variants.find(
      (v) => normalizeVariantName(v.name) === normalizeVariantName(stored)
    );
    const nextName = match ? match.name : variants[0]?.name || "";
    setSelectedVariantName(nextName);
  }, [product?.id, variants.length]);

  const { price, discountPrice } = getProductDisplayPrice(product);
  const discount = getProductDiscountPercent(product);
  const tc = product?.tag ? tagColors[product.tag] : null;
  const selectedVariant =
    variants.find(
      (v) => normalizeVariantName(v.name) === normalizeVariantName(selectedVariantName)
    ) || variants[0] || null;
  const displayImage =
    selectedVariant?.image || product?.image || product?.gallery?.[0] || "";
  const displayLabel = selectedVariant?.name || product?.color || "Default";

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 1800);
  };

  const handleSelectColor = (variant, e) => {
    e.stopPropagation();
    setSelectedVariantName(variant.name);
    setStoredVariantName(product.id, variant.name);
  };

  return (
    <div
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
        cursor: "pointer",
        background: "#fff",
        border: "none",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Tag badge */}
      {product.tag && tc && (
        <div
          style={{
            position: "absolute",
            top: "clamp(10px, 1.5vw, 14px)",
            left: "clamp(10px, 1.5vw, 14px)",
            zIndex: 3,
            background: tc.bg,
            color: tc.color,
            fontSize: "clamp(8px, 1.2vw, 11px)",
            fontWeight: 900,
            letterSpacing: "0.16em",
            padding: "clamp(4px, 0.6vw, 6px) clamp(8px, 1vw, 12px)",
            borderRadius: 999,
            fontFamily: ff,
          }}
        >
          {product.tag}
        </div>
      )}

      {/* Discount badge — only show if no tag */}
      {discount > 0 && !product.tag && (
        <div
          style={{
            position: "absolute",
            top: "clamp(10px, 1.5vw, 14px)",
            left: "clamp(10px, 1.5vw, 14px)",
            zIndex: 3,
            background: BRAND,
            color: BRAND_TEXT,
            fontSize: "clamp(8px, 1.2vw, 11px)",
            fontWeight: 900,
            letterSpacing: "0.1em",
            padding: "clamp(4px, 0.6vw, 6px) clamp(8px, 1vw, 12px)",
            borderRadius: 999,
            fontFamily: ff,
          }}
        >
          −{discount}%
        </div>
      )}

      {/* Wishlist Heart — unified component, uses shared cache */}
      <WishlistHeart productId={product.id} size="md" placement="card" />

      {/* Image — full-bleed, no padding/space, fills the whole area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          background: "#fafaf8",
          flexShrink: 0,
        }}
      >
        <img
          src={displayImage}
          alt={`${product.name} - ${displayLabel}`}
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Info — centered, minimal (name · price · swatches) */}
      <div
        style={{
          background: "#fafaf8",
          padding: "clamp(16px, 2.4vw, 22px) clamp(14px, 2vw, 20px) clamp(18px, 2.4vw, 24px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          flex: 1,
          gap: "clamp(6px, 1vw, 9px)",
        }}
      >
        <div
          style={{
            fontFamily: ff,
            fontSize: "clamp(15px, 2vw, 20px)",
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: BLACK,
            lineHeight: 1.2,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {(product.name || "").replace(/^the\s+/i, "").toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "clamp(6px, 1vw, 10px)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: ff,
              fontSize: "clamp(13px, 1.6vw, 16px)",
              fontWeight: 600,
              color: "#3a3a3a",
              letterSpacing: "0.02em",
            }}
          >
            Rs.{Number(discountPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PKR
          </span>
          {discountPrice < price && (
            <span
              style={{
                fontFamily: mono,
                fontSize: "clamp(10px, 1.2vw, 13px)",
                color: "#b8b8b8",
                textDecoration: "line-through",
              }}
            >
              Rs.{Number(price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Color swatches — centered under the price */}
        {variants.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(7px, 1vw, 10px)",
              flexWrap: "wrap",
              marginTop: "clamp(2px, 0.6vw, 5px)",
            }}
          >
            {variants.map((variant) => {
              const active =
                normalizeVariantName(variant.name) ===
                normalizeVariantName(selectedVariantName);
              return (
                <button
                  key={variant.name}
                  onClick={(e) => handleSelectColor(variant, e)}
                  title={variant.name}
                  aria-label={variant.name}
                  style={{
                    width: "clamp(24px, 3vw, 28px)",
                    height: "clamp(24px, 3vw, 28px)",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    background: variant.swatch || "#d9d9d9",
                    cursor: "pointer",
                    padding: 0,
                    boxShadow: active
                      ? `0 0 0 2px ${BRAND}`
                      : "0 0 0 1px rgba(0,0,0,0.12)",
                    transition: "box-shadow 0.2s ease",
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>
        )}

        <button
          onClick={handleAdd}
          onMouseEnter={(e) => {
            if (!addedMsg) e.currentTarget.style.background = "#0a2235";
          }}
          onMouseLeave={(e) => {
            if (!addedMsg) e.currentTarget.style.background = BRAND;
          }}
          style={{
            marginTop: "auto",
            background: addedMsg ? "#16a34a" : BRAND,
            color: BRAND_TEXT,
            border: "none",
            borderRadius: 999,
            padding: "clamp(10px, 1.3vw, 13px) clamp(20px, 3vw, 30px)",
            fontSize: "clamp(9px, 1.2vw, 12px)",
            fontWeight: 800,
            letterSpacing: "0.14em",
            cursor: "pointer",
            fontFamily: ff,
            transition: "background 0.22s ease",
            width: "100%",
            maxWidth: 260,
            minHeight: "44px",
          }}
        >
          {addedMsg ? "✓ ADDED TO BAG" : "ADD TO BAG"}
        </button>
      </div>
    </div>
  );
}

// ─── Product Slider ───────────────────────────────────────────────────────────
// Swipeable, snap-scrolling carousel of ProductCards.
// Mobile: ~1 card per view (with a peek of the next). Desktop: multiple cards.
export function ProductSlider({ products = [], navigate, isMobile = false }) {
  const scrollerRef = useRef(null);

  const scrollByDir = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrowStyle = (side) => ({
    position: "absolute",
    top: "34%",
    [side]: "clamp(-6px, -0.5vw, 8px)",
    transform: "translateY(-50%)",
    zIndex: 5,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#fff",
    border: "1px solid #e5e0d8",
    boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: BRAND,
    fontSize: 18,
    lineHeight: 1,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={scrollerRef}
        className="ue-slider"
        style={{
          display: "flex",
          gap: "clamp(12px, 2vw, 20px)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          padding: "4px 2px 12px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id || p.name}
            style={{
              flex: "0 0 auto",
              width: "clamp(230px, 80vw, 300px)",
              scrollSnapAlign: "start",
            }}
          >
            <ProductCard product={p} navigate={navigate} />
          </div>
        ))}
      </div>

      {!isMobile && products.length > 1 && (
        <>
          <button aria-label="Previous" onClick={() => scrollByDir(-1)} style={arrowStyle("left")}>
            ‹
          </button>
          <button aria-label="Next" onClick={() => scrollByDir(1)} style={arrowStyle("right")}>
            ›
          </button>
        </>
      )}

      <style>{`
        .ue-slider::-webkit-scrollbar { display: none; }
        .ue-slider { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
}