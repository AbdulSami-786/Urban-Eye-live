
// // // // // App.jsx
// // // // import { useState, useEffect, useRef } from "react";
// // // // import OpticsStudio from "./opticsStudio.jsx";
// // // // import { CartProvider, useCart } from "./contexts/CardContext.jsx";
// // // // import { useHashRouter } from "./hook/usehashrooter.js";
// // // // import { CollectionsLandingPage } from "./page/page.jsx";
// // // // import { AuthProvider, useAuth, AuthModal } from "./Auth/auth.jsx";

// // // // // ─── THEME COLOURS ───────────────────────────────────────────────────────────
// // // // const NAVY = "#0c2c41";
// // // // const ACCENT = "#89c4e1";
// // // // const BLACK = "#0a1628";
// // // // // ─────────────────────────────────────────────────────────────────────────────

// // // // // const NAV_LINKS = [
// // // // //   {
// // // // //     label: "EYEGLASSES",
// // // // //     mega: {
// // // // //       cols: [
// // // // //         { title: "EYEGLASSES", links: ["SHOP ALL", "BEST SELLERS", "NEW", "MEN'S", "WOMEN'S", "BOLD", "THIN", "ADJUSTED FIT"] },
// // // // //         { title: "SHOP BY COLOR", links: ["BLACK", "TORTOISE", "BLUE", "GREEN", "RED", "PINK", "TRANSPARENT", "METAL"] },
// // // // //         { title: "SHOP BY SHAPE", links: ["ROUND", "SQUARE", "AVIATOR", "CATEYE", "GEOMETRIC"] },
// // // // //         { title: "SHOP BY SIZE", links: ["NARROW", "AVERAGE", "WIDE", "EXTRA WIDE"] },
// // // // //       ],
// // // // //       panels: [
// // // // //         { label: "SHOP ALL EYEGLASSES", bg: "#e8f2f8" },
// // // // //         { label: "SHOP PRESCRIPTION", bg: "#d0e8f5" },
// // // // //       ],
// // // // //     },
// // // // //   },
// // // // //   {
// // // // //     label: "SUNGLASSES",
// // // // //     mega: {
// // // // //       cols: [
// // // // //         { title: "SUNGLASSES", links: ["SHOP ALL", "BEST SELLERS", "NEW", "CUSTOM MADE TINTS™", "MEN'S", "WOMEN'S", "POLARIZED", "CLIP-ONS"] },
// // // // //         { title: "SHOP BY COLOR", links: ["BLACK", "TORTOISE", "BROWN", "GOLD", "SILVER", "PINK"] },
// // // // //         { title: "SHOP BY SHAPE", links: ["ROUND", "SQUARE", "AVIATOR", "CATEYE", "GEOMETRIC"] },
// // // // //         { title: "SHOP BY SIZE", links: ["NARROW", "AVERAGE", "WIDE", "EXTRA WIDE"] },
// // // // //       ],
// // // // //       panels: [
// // // // //         { label: "SHOP ALL SUNGLASSES", bg: "#e8f2f8" },
// // // // //         { label: "SHOP PRESCRIPTION", bg: "#d0e8f5" },
// // // // //       ],
// // // // //     },
// // // // //   },
// // // // //   {
// // // // //     label: "COLLECTIONS",
// // // // //     mega: {
// // // // //       cols: [
// // // // //         { title: "FEATURED", links: ["LEMTOSH LEGACY", "SPRING 2026", "FALL 2025", "READING GLASSES", "DIGITAL RELIEF"] },
// // // // //         { title: "NEW ARRIVALS", links: ["NEW ARRIVALS", "TINT+", "SPRING 2026", "FALL 2025"] },
// // // // //       ],
// // // // //       panels: [
// // // // //         { label: "SHOP BEST SELLERS", bg: "#e8f2f8" },
// // // // //         { label: "VIEW ALL FRAMES", bg: "#0c2c41", dark: true },
// // // // //       ],
// // // // //     },
// // // // //   },
// // // // //   { label: "STORY", mega: null },
// // // // // ];




// // // // // ─── NAV LINKS — data-driven; each link's `to` becomes URL query params ────
// // // // const NAV_LINKS = [
// // // //   {
// // // //     label: "EYEGLASSES",
// // // //     mega: {
// // // //       cols: [
// // // //         {
// // // //           title: "EYEGLASSES",
// // // //           links: [
// // // //             { label: "SHOP ALL", to: { category: "Eyeglasses" } },
// // // //             { label: "MEN'S", to: { category: "Eyeglasses", gender: "Men" } },
// // // //             { label: "WOMEN'S", to: { category: "Eyeglasses", gender: "Women" } },
// // // //             { label: "UNISEX", to: { category: "Eyeglasses", gender: "Unisex" } },
// // // //           ],
// // // //         },
// // // //         {
// // // //           title: "SHOP BY SHAPE",
// // // //           links: [
// // // //             { label: "ROUND", to: { category: "Eyeglasses", shape: "Round" } },
// // // //             { label: "SQUARE", to: { category: "Eyeglasses", shape: "Square" } },
// // // //             { label: "AVIATOR", to: { category: "Eyeglasses", shape: "Aviator" } },
// // // //             { label: "CAT-EYE", to: { category: "Eyeglasses", shape: "Cat-Eye" } },
// // // //             { label: "GEOMETRIC", to: { category: "Eyeglasses", shape: "Geometric" } },
// // // //             { label: "BROWLINE", to: { category: "Eyeglasses", shape: "Browline" } },
// // // //           ],
// // // //         },
// // // //       ],
// // // //       panels: [
// // // //         { label: "SHOP ALL EYEGLASSES", bg: "#e8f2f8", to: { category: "Eyeglasses" } },
// // // //       ],
// // // //     },
// // // //   },
// // // //   {
// // // //     label: "SUNGLASSES",
// // // //     mega: {
// // // //       cols: [
// // // //         {
// // // //           title: "SUNGLASSES",
// // // //           links: [
// // // //             { label: "SHOP ALL", to: { category: "Sunglasses" } },
// // // //             { label: "MEN'S", to: { category: "Sunglasses", gender: "Men" } },
// // // //             { label: "WOMEN'S", to: { category: "Sunglasses", gender: "Women" } },
// // // //             { label: "UNISEX", to: { category: "Sunglasses", gender: "Unisex" } },
// // // //           ],
// // // //         },
// // // //         {
// // // //           title: "SHOP BY SHAPE",
// // // //           links: [
// // // //             { label: "ROUND", to: { category: "Sunglasses", shape: "Round" } },
// // // //             { label: "SQUARE", to: { category: "Sunglasses", shape: "Square" } },
// // // //             { label: "AVIATOR", to: { category: "Sunglasses", shape: "Aviator" } },
// // // //             { label: "CAT-EYE", to: { category: "Sunglasses", shape: "Cat-Eye" } },
// // // //           ],
// // // //         },
// // // //       ],
// // // //       panels: [
// // // //         { label: "SHOP ALL SUNGLASSES", bg: "#e8f2f8", to: { category: "Sunglasses" } },
// // // //       ],
// // // //     },
// // // //   },
// // // //   {
// // // //     label: "COLLECTIONS",
// // // //     mega: {
// // // //       cols: [
// // // //         {
// // // //           title: "COLLECTIONS",
// // // //           links: [
// // // //             { label: "NEW ARRIVALS", to: { tag: "NEW" } },
// // // //             { label: "FEATURED", to: { tag: "BEST SELLER" } },
// // // //           ],
// // // //         },
// // // //       ],
// // // //       panels: [
// // // //         { label: "VIEW ALL FRAMES", bg: "#0c2c41", dark: true, to: {} },
// // // //       ],
// // // //     },
// // // //   },
// // // //   { label: "STORY", mega: null },
// // // // ];

// // // // // Builds "#/products?key=value" from a plain { key: value } object.
// // // // function buildProductsLink(to) {
// // // //   const params = new URLSearchParams(to || {});
// // // //   const qs = params.toString();
// // // //   return qs ? `#/products?${qs}` : "#/products";
// // // // }








// // // // const ANNOUNCEMENTS = [
// // // //   "FREE SHIPPING ACROSS PAKISTAN ON ALL ORDERS",
// // // //   "NEW SPRING 2026 COLLECTION — SHOP NOW",
// // // //   "20+ CUSTOM MADE TINTS™ — HANDCRAFTED FOR YOU",
// // // // ];

// // // // const ff = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";

// // // // const iconBtn = {
// // // //   background: "none",
// // // //   border: "none",
// // // //   cursor: "pointer",
// // // //   padding: "8px",
// // // //   display: "flex",
// // // //   alignItems: "center",
// // // //   justifyContent: "center",
// // // //   transition: "opacity 0.2s, transform 0.2s",
// // // //   borderRadius: "50%",
// // // // };

// // // // // ─── FOOTER COLUMN ────────────────────────────────────────────────────────────
// // // // function FooterCol({ title, links }) {
// // // //   return (
// // // //     <div>
// // // //       <div style={{
// // // //         fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#6aadcc",
// // // //         marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
// // // //         paddingBottom: 8, display: "inline-block"
// // // //       }}>
// // // //         {title}
// // // //       </div>
// // // //       <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
// // // //         {links.map((link) => (
// // // //           <li key={link}>
// // // //             <a href="#" style={{
// // // //               fontSize: 13, color: "#7fa8bc", textDecoration: "none",
// // // //               letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace", transition: "color 0.2s"
// // // //             }}
// // // //               onMouseEnter={(e) => (e.target.style.color = ACCENT)}
// // // //               onMouseLeave={(e) => (e.target.style.color = "#7fa8bc")}>
// // // //               {link}
// // // //             </a>
// // // //           </li>
// // // //         ))}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── ACCOUNT BUTTON WITH AVATAR (NO NAME TEXT) ───────────────────────────────
// // // // function AccountBtn({ onOpenModal, navigate }) {
// // // //   const { user, logout } = useAuth();
// // // //   const [hover, setHover] = useState(false);
// // // //   const [dropOpen, setDropOpen] = useState(false);
// // // //   const closeTimer = useRef(null);

// // // //   const handleMouseEnter = () => {
// // // //     if (closeTimer.current) clearTimeout(closeTimer.current);
// // // //     setDropOpen(true);
// // // //   };

// // // //   const handleMouseLeave = () => {
// // // //     closeTimer.current = setTimeout(() => setDropOpen(false), 80);
// // // //   };

// // // //   const getInitial = () => {
// // // //     const name = user?.name || user?.fullName || "";
// // // //     return name.charAt(0).toUpperCase();
// // // //   };

// // // //   const getAvatarColor = () => {
// // // //     const name = user?.name || user?.fullName || "";
// // // //     const colors = ["#1a4a6b", "#2a6a9a", "#3a8aba", "#4aa0d0", "#5ab0e0", "#0c2c41"];
// // // //     let hash = 0;
// // // //     for (let i = 0; i < name.length; i++) {
// // // //       hash = ((hash << 5) - hash) + name.charCodeAt(i);
// // // //       hash |= 0;
// // // //     }
// // // //     return colors[Math.abs(hash) % colors.length];
// // // //   };

// // // //   if (user) {
// // // //     return (
// // // //       <div
// // // //         style={{ position: "relative" }}
// // // //         onMouseEnter={handleMouseEnter}
// // // //         onMouseLeave={handleMouseLeave}
// // // //       >
// // // //         <button
// // // //           onMouseEnter={() => setHover(true)}
// // // //           onMouseLeave={() => setHover(false)}
// // // //           title={`Signed in as ${user.name || user.fullName}`}
// // // //           style={{
// // // //             background: hover ? "#f0f7fc" : "none",
// // // //             border: `1.5px solid ${NAVY}`,
// // // //             cursor: "pointer",
// // // //             padding: "4px 8px 4px 4px",
// // // //             color: NAVY,
// // // //             fontSize: 11,
// // // //             fontWeight: 700,
// // // //             letterSpacing: "0.08em",
// // // //             fontFamily: ff,
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             gap: 6,
// // // //             borderRadius: 40,
// // // //             transition: "background 0.15s",
// // // //           }}>
// // // //           <div style={{
// // // //             width: 28,
// // // //             height: 28,
// // // //             borderRadius: "50%",
// // // //             background: getAvatarColor(),
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             color: "#fff",
// // // //             fontSize: 13,
// // // //             fontWeight: 700,
// // // //             fontFamily: ff,
// // // //           }}>
// // // //             {getInitial()}
// // // //           </div>
// // // //           <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
// // // //             <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
// // // //           </svg>
// // // //         </button>

// // // //         {dropOpen && (
// // // //           <div
// // // //             onMouseEnter={handleMouseEnter}
// // // //             onMouseLeave={handleMouseLeave}
// // // //             style={{
// // // //               position: "absolute",
// // // //               top: "100%",
// // // //               right: 0,
// // // //               paddingTop: 8,
// // // //               zIndex: 100,
// // // //             }}
// // // //           >
// // // //             <div style={{
// // // //               background: "#fff",
// // // //               border: `1.5px solid ${NAVY}`,
// // // //               boxShadow: "0 8px 24px rgba(12,44,65,0.12)",
// // // //               minWidth: 180,
// // // //             }}>
// // // //               {[
// // // //                 { label: "MY DASHBOARD", hash: "#/dashboard" },
// // // //                 { label: "MY ORDERS", hash: "#/dashboard?tab=orders" },
// // // //                 { label: "WISHLIST", hash: "#/wishlist" },
// // // //                 { label: "ADDRESSES", hash: "#/dashboard?tab=addresses" },
// // // //               ].map(item => (
// // // //                 <button
// // // //                   key={item.label}
// // // //                   onClick={() => { navigate(item.hash); setDropOpen(false); }}
// // // //                   style={{
// // // //                     display: "block", width: "100%", textAlign: "left",
// // // //                     background: "none", border: "none", borderBottom: "1px solid #f0f0f0",
// // // //                     padding: "11px 16px", fontSize: 11, fontWeight: 700,
// // // //                     letterSpacing: "0.1em", color: NAVY, cursor: "pointer",
// // // //                     fontFamily: ff, transition: "background 0.15s",
// // // //                   }}
// // // //                   onMouseEnter={e => e.currentTarget.style.background = "#f0f7fc"}
// // // //                   onMouseLeave={e => e.currentTarget.style.background = "none"}
// // // //                 >
// // // //                   {item.label}
// // // //                 </button>
// // // //               ))}
// // // //               <button
// // // //                 onClick={() => { logout(); navigate("#/"); setDropOpen(false); }}
// // // //                 style={{
// // // //                   display: "block", width: "100%", textAlign: "left",
// // // //                   background: "none", border: "none", padding: "11px 16px",
// // // //                   fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
// // // //                   color: "#c0392b", cursor: "pointer", fontFamily: ff,
// // // //                 }}
// // // //                 onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
// // // //                 onMouseLeave={e => e.currentTarget.style.background = "none"}
// // // //               >
// // // //                 SIGN OUT
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Not logged in — show standard account icon
// // // //   return (
// // // //     <button style={iconBtn} aria-label="Account" onClick={onOpenModal}>
// // // //       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
// // // //         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// // // //         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
// // // //         <circle cx="12" cy="7" r="4" />
// // // //       </svg>
// // // //     </button>
// // // //   );
// // // // }

// // // // // ════════════════════════════════════════════════════════════════════════════
// // // // // INNER APP
// // // // // ════════════════════════════════════════════════════════════════════════════
// // // // function AppInner() {
// // // //   const { user, checked } = useAuth();

// // // //   const [annIdx, setAnnIdx] = useState(0);
// // // //   const [annVisible, setAnnVisible] = useState(true);
// // // //   const [megaOpen, setMegaOpen] = useState(null);
// // // //   const [scrolled, setScrolled] = useState(false);
// // // //   const [searchOpen, setSearchOpen] = useState(false);
// // // //   const [searchVal, setSearchVal] = useState("");
// // // //   const [cartCount, setCartCount] = useState(0);
// // // //   const [authModalOpen, setAuthModalOpen] = useState(false);
// // // //   const megaTimer = useRef(null);

// // // //   const { route, productId, collectionSlug, navigate } = useHashRouter();

// // // //   // Scroll to top on every route change (so user lands at top of new page)
// // // //   useEffect(() => {
// // // //     window.scrollTo(0, 0);
// // // //   }, [route]);

// // // //   // Announcement rotation
// // // //   useEffect(() => {
// // // //     const t = setInterval(() => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
// // // //     return () => clearInterval(t);
// // // //   }, []);

// // // //   // Scroll shadow (only for visual effect, not for sticky)
// // // //   useEffect(() => {
// // // //     const fn = () => setScrolled(window.scrollY > 8);
// // // //     window.addEventListener("scroll", fn);
// // // //     return () => window.removeEventListener("scroll", fn);
// // // //   }, []);

// // // //   // Live cart count
// // // //   useEffect(() => {
// // // //     const readCart = () => {
// // // //       try {
// // // //         const items = JSON.parse(localStorage.getItem("os_cart") || "[]");
// // // //         setCartCount(items.reduce((s, i) => s + i.qty, 0));
// // // //       } catch { setCartCount(0); }
// // // //     };
// // // //     readCart();
// // // //     const onCartUpdate = (e) => setCartCount(e.detail.reduce((s, i) => s + i.qty, 0));
// // // //     window.addEventListener("cartUpdated", onCartUpdate);
// // // //     window.addEventListener("storage", readCart);
// // // //     return () => {
// // // //       window.removeEventListener("cartUpdated", onCartUpdate);
// // // //       window.removeEventListener("storage", readCart);
// // // //     };
// // // //   }, []);

// // // //   // Close modal when user becomes logged in
// // // //   useEffect(() => {
// // // //     if (user && authModalOpen) {
// // // //       setAuthModalOpen(false);
// // // //     }
// // // //   }, [user, authModalOpen]);

// // // //   const openMega = (label) => { clearTimeout(megaTimer.current); setMegaOpen(label); };
// // // //   const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 130); };
// // // //   const activeNav = NAV_LINKS.find((n) => n.label === megaOpen);
// // // //   const goTo = (hash) => { navigate(hash); };

// // // //   if (!checked) return null;

// // // //   const renderMainContent = () => {
// // // //     if (route === "collections-landing") {
// // // //       return <CollectionsLandingPage navigate={navigate} />;
// // // //     }
// // // //     return <OpticsStudio />;
// // // //   };

// // // //   return (
// // // //     <div style={{ fontFamily: ff, background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

// // // //       {/* Auth Modal */}
// // // //       <AuthModal
// // // //         isOpen={authModalOpen}
// // // //         onClose={() => setAuthModalOpen(false)}
// // // //       />

// // // //       {/* Announcement Bar (not sticky) */}
// // // //       {annVisible && (
// // // //         <div style={{
// // // //           background: NAVY, color: ACCENT, textAlign: "center", marginTop: 60, fontSize: 11,
// // // //           letterSpacing: "0.14em", padding: "9px 48px", position: "relative", fontFamily: ff
// // // //         }}>
// // // //           {ANNOUNCEMENTS[annIdx]}
// // // //           <button onClick={() => setAnnVisible(false)}
// // // //             style={{
// // // //               position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
// // // //               background: "none", border: "none", color: ACCENT, cursor: "pointer", fontSize: 20, lineHeight: 1
// // // //             }}>
// // // //             ×
// // // //           </button>
// // // //         </div>
// // // //       )}

// // // //       {/* Navbar (normal block, no sticky) */}
// // // //       <header style={{
// // // //         width: "100%",
// // // //         background: "#fff",
// // // //         borderBottom: `3px solid ${NAVY}`,
// // // //         boxShadow: scrolled ? "0 2px 20px rgba(12,44,65,0.12)" : "none",
// // // //         transition: "box-shadow 0.3s",
// // // //         position: "fixed",   // ← ADD THIS
// // // //         top: 0,               // ← ADD THIS
// // // //         zIndex: 49,           // ← ADD THIS

// // // //       }}>
// // // //         <div style={{
// // // //           maxWidth: 1400, margin: "0 auto", padding: "0 24px", height: 62,
// // // //           display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
// // // //         }}>

// // // //           {/* Logo */}
// // // //           <a href="#/" style={{ textDecoration: "none", flexShrink: 0 }}>
// // // //             <img src="./logo.jpeg" alt="Urban Eye" style={{ height: 50, width: "auto" }} />
// // // //           </a>

// // // //           {/* Nav Links */}
// // // //           <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }}>

// // // //             <a href="#/products"
// // // //               style={{
// // // //                 background: "none", border: "none", fontSize: 12, fontWeight: 900,
// // // //                 letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// // // //                 color: BLACK, fontFamily: ff,
// // // //                 borderBottom: window.location.hash === "#/products" ? `3px solid ${NAVY}` : "3px solid transparent",
// // // //                 transition: "border-color 0.2s", display: "flex", alignItems: "center", textDecoration: "none"
// // // //               }}>
// // // //               PRODUCTS
// // // //             </a>

// // // //             <a href="#/collections"
// // // //               style={{
// // // //                 background: "none", border: "none", fontSize: 12, fontWeight: 900,
// // // //                 letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// // // //                 color: BLACK, fontFamily: ff,
// // // //                 borderBottom: window.location.hash === "#/collections" ? `3px solid ${NAVY}` : "3px solid transparent",
// // // //                 transition: "border-color 0.2s", display: "flex", alignItems: "center", textDecoration: "none"
// // // //               }}>
// // // //               COLLECTIONS
// // // //             </a>

// // // //             {NAV_LINKS.map((link) => (
// // // //               <div key={link.label}
// // // //                 onMouseEnter={() => (link.mega ? openMega(link.label) : null)}
// // // //                 onMouseLeave={link.mega ? closeMega : null}
// // // //                 style={{ position: "relative" }}>
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     if (link.label === "STORY") goTo("#/story");
// // // //                   }}
// // // //                   style={{
// // // //                     background: "none", border: "none", fontSize: 12, fontWeight: 900,
// // // //                     letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// // // //                     color: BLACK, fontFamily: ff,
// // // //                     borderBottom: megaOpen === link.label ? `3px solid ${NAVY}` : "3px solid transparent",
// // // //                     transition: "border-color 0.2s", display: "flex", alignItems: "center", gap: 4
// // // //                   }}>
// // // //                   {link.label}
// // // //                   {link.mega && (
// // // //                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
// // // //                       <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
// // // //                     </svg>
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </nav>

// // // //           {/* Right icons */}
// // // //           <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>

// // // //             {/* Account Button */}
// // // //             <AccountBtn onOpenModal={() => setAuthModalOpen(true)} navigate={goTo} />

// // // //             {/* Search */}
// // // //             <button onClick={() => setSearchOpen((v) => !v)} style={iconBtn} aria-label="Search">
// // // //               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
// // // //                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// // // //                 <circle cx="11" cy="11" r="8" />
// // // //                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
// // // //               </svg>
// // // //             </button>
             
// // // //            {/* Cart */}
// // // //             <button onClick={() => goTo("#/cart")}
// // // //               style={{ ...iconBtn, position: "relative" }} aria-label="Cart">
// // // //               <img
// // // //                 src="../public/icon.png"
// // // //                 alt="Cart"
// // // //                 style={{ width: 24, height: 24, objectFit: "contain" }}
// // // //               />
// // // //               {cartCount > 0 && (
// // // //                 <span style={{
// // // //                   position: "absolute", top: -8, right: -8, width: 18, height: 18,
// // // //                   borderRadius: "50%", background: NAVY, color: "#fff",
// // // //                   fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center",
// // // //                   justifyContent: "center", fontFamily: ff, animation: "cartPop 0.25s ease"
// // // //                 }}>
// // // //                   {cartCount > 99 ? "99+" : cartCount}
// // // //                 </span>
// // // //               )}
// // // //             </button>

// // // //             <button onClick={() => goTo("#/products")}
// // // //               style={{
// // // //                 background: NAVY, color: "#fff", border: "none", borderRadius: 0,
// // // //                 padding: "10px 20px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
// // // //                 cursor: "pointer", fontFamily: ff, marginLeft: 4, transition: "opacity 0.18s"
// // // //               }}
// // // //               onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
// // // //               onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
// // // //               SHOP NOW
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Search Bar */}
// // // //         {searchOpen && (
// // // //           <div style={{
// // // //             background: "#f0f8fc", borderTop: `2px solid ${NAVY}`,
// // // //             padding: "12px 24px", animation: "slideDown 0.2s ease both"
// // // //           }}>
// // // //             <div style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}>
// // // //               <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#6aadcc" }}
// // // //                 width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
// // // //                 <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
// // // //               </svg>
// // // //               <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
// // // //                 onKeyDown={(e) => {
// // // //                   if (e.key === "Enter" && searchVal.trim()) {
// // // //                     goTo(`#/search?q=${encodeURIComponent(searchVal)}`);
// // // //                     setSearchOpen(false);
// // // //                     setSearchVal("");
// // // //                   }
// // // //                 }}
// // // //                 placeholder="Search frames, styles, collections..."
// // // //                 style={{
// // // //                   width: "100%", padding: "11px 36px 11px 38px", border: `1.5px solid ${NAVY}`,
// // // //                   fontSize: 13, letterSpacing: "0.02em", outline: "none", background: "#fff",
// // // //                   color: BLACK, fontFamily: "'Courier New',Courier,monospace", boxSizing: "border-box"
// // // //                 }} />
// // // //               {searchVal && (
// // // //                 <button onClick={() => setSearchVal("")}
// // // //                   style={{
// // // //                     position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
// // // //                     background: "none", border: "none", cursor: "pointer", color: "#6aadcc", fontSize: 18
// // // //                   }}>×</button>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Mega Menu */}
// // // //         {megaOpen && activeNav?.mega && (
// // // //           <div onMouseEnter={() => openMega(megaOpen)} onMouseLeave={closeMega}
// // // //             style={{
// // // //               position: "absolute", top: "100%", left: 0, right: 0, background: "#fff",
// // // //               borderTop: `2px solid ${NAVY}`, boxShadow: "0 12px 40px rgba(12,44,65,0.12)",
// // // //               zIndex: 50, animation: "slideDown 0.18s ease both"
// // // //             }}>
// // // //             <div style={{
// // // //               maxWidth: 1400, margin: "0 auto", padding: "32px 40px",
// // // //               display: "grid",
// // // //               gridTemplateColumns: `repeat(${activeNav.mega.cols.length}, 1fr) ${activeNav.mega.panels.length * 160}px`,
// // // //               gap: 0
// // // //             }}>
// // // //               {activeNav.mega.cols.map((col) => (
// // // //                 <div key={col.title} style={{ paddingRight: 24 }}>
// // // //                   <div style={{
// // // //                     fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: NAVY,
// // // //                     marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
// // // //                     paddingBottom: 8, display: "inline-block"
// // // //                   }}>
// // // //                     {col.title}
// // // //                   </div>
// // // //                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
// // // //                     {col.links.map((link) => (
// // // //                       <li key={link}>
// // // //                         <a href="#/products"
// // // //                           style={{
// // // //                             fontSize: 12, color: "#333", textDecoration: "none",
// // // //                             letterSpacing: "0.06em", fontFamily: ff, fontWeight: 700, transition: "color 0.15s"
// // // //                           }}
// // // //                           onMouseEnter={(e) => (e.target.style.color = NAVY)}
// // // //                           onMouseLeave={(e) => (e.target.style.color = "#333")}>
// // // //                           {link}
// // // //                         </a>
// // // //                       </li>
// // // //                     ))}
// // // //                   </ul>
// // // //                 </div>
// // // //               ))}
// // // //               <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
// // // //                 {activeNav.mega.panels.map((panel, pi) => (
// // // //                   <div key={pi}
// // // //                     style={{
// // // //                       width: 148, height: 180, background: panel.bg, cursor: "pointer",
// // // //                       position: "relative", display: "flex", alignItems: "flex-end",
// // // //                       padding: 12, border: `1.5px solid ${NAVY}`
// // // //                     }}>
// // // //                     <div style={{
// // // //                       position: "absolute", top: "30%", left: "50%",
// // // //                       transform: "translate(-50%,-50%)", opacity: 0.3
// // // //                     }}>
// // // //                       <svg width="80" height="44" viewBox="0 0 120 66" fill="none">
// // // //                         <ellipse cx="30" cy="33" rx="25" ry="22"
// // // //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
// // // //                         <ellipse cx="90" cy="33" rx="25" ry="22"
// // // //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
// // // //                         <line x1="55" y1="33" x2="65" y2="33"
// // // //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="3" strokeLinecap="round" />
// // // //                       </svg>
// // // //                     </div>
// // // //                     <div style={{
// // // //                       fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
// // // //                       color: panel.dark ? "#fff" : NAVY, fontFamily: ff, position: "relative", zIndex: 1
// // // //                     }}>
// // // //                       {panel.label}
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <main>{renderMainContent()}</main>

// // // //       {/* Footer */}
// // // //       <footer style={{ background: BLACK, color: "#fff", fontFamily: ff }}>
// // // //         {/* Newsletter */}
// // // //         <div style={{
// // // //           borderBottom: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
// // // //           padding: "52px 40px", display: "flex", flexWrap: "wrap",
// // // //           justifyContent: "space-between", alignItems: "center", gap: 28
// // // //         }}>
// // // //           <div>
// // // //             <div style={{ fontFamily: ff, fontSize: 22, fontWeight: 900, letterSpacing: "0.04em", marginBottom: 6, color: "#fff" }}>
// // // //               JOIN THE FAMILY
// // // //             </div>
// // // //             <div style={{ fontSize: 13, color: "#6aadcc", letterSpacing: "0.03em", fontFamily: "'Courier New',Courier,monospace" }}>
// // // //               Get 10% off your first order — exclusive drops &amp; style guides.
// // // //             </div>
// // // //           </div>
// // // //           <div style={{ display: "flex", maxWidth: 400, width: "100%" }}>
// // // //             <input type="email" placeholder="Your email address"
// // // //               style={{
// // // //                 flex: 1, background: "#0e1f2e", border: `1px solid #1a3a52`, borderRight: "none",
// // // //                 color: "#fff", padding: "12px 16px", fontSize: 13, outline: "none",
// // // //                 letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace"
// // // //               }} />
// // // //             <button style={{
// // // //               background: NAVY, color: ACCENT, border: `1px solid ${NAVY}`,
// // // //               padding: "12px 22px", fontSize: 11, fontWeight: 900,
// // // //               letterSpacing: "0.14em", cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff
// // // //             }}>
// // // //               SUBSCRIBE
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Links */}
// // // //         <div style={{
// // // //           maxWidth: 1400, margin: "0 auto", padding: "56px 40px",
// // // //           display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44
// // // //         }}>
// // // //           <div>
// // // //             <div style={{ fontFamily: ff, fontSize: 22, fontWeight: 900, letterSpacing: "0.06em", marginBottom: 2, color: "#fff" }}>
// // // //               URBAN EYE
// // // //             </div>
// // // //             <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "#3a6a8a", marginBottom: 16 }}>
// // // //               EST. 2015 · KARACHI
// // // //             </div>
// // // //             <div style={{ width: 36, height: 3, background: NAVY, marginBottom: 16 }} />
// // // //             <div style={{ borderLeft: `2px solid #1a3a52`, paddingLeft: 14, marginBottom: 20 }}>
// // // //               <p style={{
// // // //                 fontSize: 13, color: "#6aadcc", lineHeight: 1.8, margin: 0,
// // // //                 fontStyle: "italic", fontFamily: "'Courier New',Courier,monospace"
// // // //               }}>
// // // //                 "Your vision is our concern."
// // // //               </p>
// // // //               <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#3a6a8a", marginTop: 8, fontFamily: ff }}>
// // // //                 TARIQ HASSAN · FOUNDER
// // // //               </div>
// // // //             </div>
// // // //             <p style={{
// // // //               fontSize: 13, color: "#5a8aaa", lineHeight: 1.8, maxWidth: 260,
// // // //               marginBottom: 20, fontFamily: "'Courier New',Courier,monospace"
// // // //             }}>
// // // //               Premium eyewear for those who see the world differently. Karachi's destination for iconic frames since 2015.
// // // //             </p>
// // // //             <div style={{ display: "flex", gap: 8 }}>
// // // //               {["IG", "FB", "TT", "YT"].map((s) => (
// // // //                 <a key={s} href="#"
// // // //                   style={{
// // // //                     width: 32, height: 32, border: `1px solid #1a3a52`, display: "flex",
// // // //                     alignItems: "center", justifyContent: "center", color: "#5a8aaa",
// // // //                     fontSize: 10, textDecoration: "none", fontFamily: ff, fontWeight: 900,
// // // //                     letterSpacing: "0.05em", transition: "border-color 0.2s, color 0.2s"
// // // //                   }}
// // // //                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
// // // //                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; e.currentTarget.style.color = "#5a8aaa"; }}>
// // // //                   {s}
// // // //                 </a>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //           <FooterCol title="SHOP" links={["Eyeglasses", "Sunglasses", "Reading Glasses", "New Arrivals", "Best Sellers", "Virtual Try-On", "Custom Tints™"]} />
// // // //           <FooterCol title="HELP" links={["Shipping & Returns", "Frame Sizing Guide", "Prescription Info", "Contact Us", "Store Locator", "FAQ", "Repairs"]} />
// // // //           <FooterCol title="COMPANY" links={["Our Story", "Craftsmanship", "Careers", "Press", "Sustainability", "Affiliates", "Gift Cards"]} />
// // // //         </div>

// // // //         {/* Bottom bar */}
// // // //         <div style={{
// // // //           borderTop: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
// // // //           padding: "16px 40px", display: "flex", flexWrap: "wrap",
// // // //           justifyContent: "space-between", alignItems: "center", gap: 10
// // // //         }}>
// // // //           <div style={{ fontSize: 11, color: "#3a6a8a", letterSpacing: "0.05em", fontFamily: ff }}>
// // // //             © 2026 Urban Eye. All rights reserved.
// // // //           </div>
// // // //           <div style={{ display: "flex", gap: 18 }}>
// // // //             {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
// // // //               <a key={link} href="#"
// // // //                 style={{
// // // //                   fontSize: 11, color: "#3a6a8a", textDecoration: "none",
// // // //                   letterSpacing: "0.05em", fontFamily: ff, transition: "color 0.2s"
// // // //                 }}
// // // //                 onMouseEnter={(e) => (e.target.style.color = ACCENT)}
// // // //                 onMouseLeave={(e) => (e.target.style.color = "#3a6a8a")}>
// // // //                 {link}
// // // //               </a>
// // // //             ))}
// // // //           </div>
// // // //           <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
// // // //             {["VISA", "MC", "AMEX", "COD"].map((card) => (
// // // //               <span key={card}
// // // //                 style={{
// // // //                   fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
// // // //                   border: `1px solid #1a3a52`, padding: "3px 7px", color: "#3a6a8a", fontFamily: ff
// // // //                 }}>
// // // //                 {card}
// // // //               </span>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </footer>

// // // //       {/* WhatsApp FAB */}
// // // //       <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
// // // //         style={{
// // // //           position: "fixed", bottom: 26, right: 26, width: 52, height: 52, borderRadius: "50%",
// // // //           background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
// // // //           boxShadow: "0 4px 20px rgba(37,211,102,0.35)", zIndex: 999, transition: "transform 0.2s", textDecoration: "none"
// // // //         }}
// // // //         onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
// // // //         onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// // // //         aria-label="Chat on WhatsApp">
// // // //         <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
// // // //           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
// // // //         </svg>
// // // //       </a>

// // // //       <style>{`
// // // //         * {
// // // //           box-sizing: border-box;
// // // //         }
// // // //         @keyframes slideDown {
// // // //           from { opacity: 0; transform: translateY(-8px); }
// // // //           to   { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //         @keyframes cartPop {
// // // //           0%   { transform: scale(0.6); }
// // // //           70%  { transform: scale(1.2); }
// // // //           100% { transform: scale(1); }
// // // //         }
// // // //         button[aria-label="Search"]:hover,
// // // //         button[aria-label="Cart"]:hover {
// // // //           opacity: 0.7;
// // // //           transform: scale(1.05);
// // // //         }
// // // //         .auth-modal-overlay {
// // // //           position: fixed;
// // // //           top: 0; left: 0; right: 0; bottom: 0;
// // // //           background: rgba(0, 0, 0, 0.7);
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           z-index: 1000;
// // // //           backdrop-filter: blur(4px);
// // // //         }
// // // //         .auth-modal-content {
// // // //           position: relative;
// // // //           max-width: 460px;
// // // //           width: 90%;
// // // //           margin: 20px;
// // // //           border-radius: 24px;
// // // //           background: transparent;
// // // //           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ── DEFAULT EXPORT ────────────────────────────────────────────────────────────
// // // // export default function App() {
// // // //   return (
// // // //     <AuthProvider>
// // // //       <AppInner />
// // // //     </AuthProvider>
// // // //   );
// // // // }






















































// // // // App.jsx
// // // import { useState, useEffect, useRef } from "react";
// // // import OpticsStudio from "./opticsStudio.jsx";
// // // import { CartProvider, useCart } from "./contexts/CardContext.jsx";
// // // import { useHashRouter } from "./hook/usehashrooter.js";
// // // import { AuthProvider, useAuth, AuthModal } from "./Auth/auth.jsx";

// // // // ─── THEME COLOURS ───────────────────────────────────────────────────────────
// // // const NAVY = "#0c2c41";
// // // const ACCENT = "#89c4e1";
// // // const BLACK = "#0a1628";
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // // ─── NAV LINKS — data-driven; each link's `to` becomes URL query params ────
// // // // Clicking a link navigates to "#/products?key=value..." which ProductsPage
// // // // reads on mount (and on change) to pre-apply the matching filters.
// // // // `to: {}` (or no `to`) means "shop all" with no filters.
// // // const NAV_LINKS = [
// // //   {
// // //     label: "EYEGLASSES",
// // //     mega: {
// // //       cols: [
// // //         {
// // //           title: "EYEGLASSES",
// // //           links: [
// // //             { label: "SHOP ALL", to: { category: "Eyeglasses" } },
// // //             { label: "MEN'S", to: { category: "Eyeglasses", gender: "Men" } },
// // //             { label: "WOMEN'S", to: { category: "Eyeglasses", gender: "Women" } },
// // //             { label: "UNISEX", to: { category: "Eyeglasses", gender: "Unisex" } },
// // //           ],
// // //         },
// // //         {
// // //           title: "SHOP BY SHAPE",
// // //           links: [
// // //             { label: "ROUND", to: { category: "Eyeglasses", shape: "Round" } },
// // //             { label: "SQUARE", to: { category: "Eyeglasses", shape: "Square" } },
// // //             { label: "AVIATOR", to: { category: "Eyeglasses", shape: "Aviator" } },
// // //             { label: "CAT-EYE", to: { category: "Eyeglasses", shape: "Cat-Eye" } },
// // //             { label: "GEOMETRIC", to: { category: "Eyeglasses", shape: "Geometric" } },
// // //             { label: "BROWLINE", to: { category: "Eyeglasses", shape: "Browline" } },
// // //           ],
// // //         },
// // //       ],
// // //       panels: [
// // //         { label: "SHOP ALL EYEGLASSES", bg: "#e8f2f8", to: { category: "Eyeglasses" } },
// // //       ],
// // //     },
// // //   },
// // //   {
// // //     label: "SUNGLASSES",
// // //     mega: {
// // //       cols: [
// // //         {
// // //           title: "SUNGLASSES",
// // //           links: [
// // //             { label: "SHOP ALL", to: { category: "Sunglasses" } },
// // //             { label: "MEN'S", to: { category: "Sunglasses", gender: "Men" } },
// // //             { label: "WOMEN'S", to: { category: "Sunglasses", gender: "Women" } },
// // //             { label: "UNISEX", to: { category: "Sunglasses", gender: "Unisex" } },
// // //           ],
// // //         },
// // //         {
// // //           title: "SHOP BY SHAPE",
// // //           links: [
// // //             { label: "ROUND", to: { category: "Sunglasses", shape: "Round" } },
// // //             { label: "SQUARE", to: { category: "Sunglasses", shape: "Square" } },
// // //             { label: "AVIATOR", to: { category: "Sunglasses", shape: "Aviator" } },
// // //             { label: "CAT-EYE", to: { category: "Sunglasses", shape: "Cat-Eye" } },
// // //           ],
// // //         },
// // //       ],
// // //       panels: [
// // //         { label: "SHOP ALL SUNGLASSES", bg: "#e8f2f8", to: { category: "Sunglasses" } },
// // //       ],
// // //     },
// // //   },
// // //   {
// // //     label: "COLLECTIONS",
// // //     mega: {
// // //       cols: [
// // //         {
// // //           title: "COLLECTIONS",
// // //           links: [
// // //             { label: "NEW ARRIVALS", to: { tag: "NEW" } },
// // //             { label: "FEATURED", to: { tag: "BEST SELLER" } },
// // //           ],
// // //         },
// // //       ],
// // //       panels: [
// // //         { label: "VIEW ALL FRAMES", bg: "#0c2c41", dark: true, to: {} },
// // //       ],
// // //     },
// // //   },
// // //   { label: "STORY", mega: null },
// // // ];

// // // // Builds "#/products?key=value&key2=value2" from a plain { key: value } object.
// // // // Empty/undefined `to` => "#/products" (shop all, no filters).
// // // function buildProductsLink(to) {
// // //   const params = new URLSearchParams(to || {});
// // //   const qs = params.toString();
// // //   return qs ? `#/products?${qs}` : "#/products";
// // // }

// // // const ANNOUNCEMENTS = [
// // //   "FREE SHIPPING ACROSS PAKISTAN ON ALL ORDERS",
// // //   "NEW SPRING 2026 COLLECTION — SHOP NOW",
// // //   "20+ CUSTOM MADE TINTS™ — HANDCRAFTED FOR YOU",
// // // ];

// // // const ff = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";

// // // const iconBtn = {
// // //   background: "none",
// // //   border: "none",
// // //   cursor: "pointer",
// // //   padding: "8px",
// // //   display: "flex",
// // //   alignItems: "center",
// // //   justifyContent: "center",
// // //   transition: "opacity 0.2s, transform 0.2s",
// // //   borderRadius: "50%",
// // // };

// // // // ─── FOOTER COLUMN ────────────────────────────────────────────────────────────
// // // function FooterCol({ title, links }) {
// // //   return (
// // //     <div>
// // //       <div style={{
// // //         fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#6aadcc",
// // //         marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
// // //         paddingBottom: 8, display: "inline-block"
// // //       }}>
// // //         {title}
// // //       </div>
// // //       <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
// // //         {links.map((link) => (
// // //           <li key={link}>
// // //             <a href="#" style={{
// // //               fontSize: 13, color: "#7fa8bc", textDecoration: "none",
// // //               letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace", transition: "color 0.2s"
// // //             }}
// // //               onMouseEnter={(e) => (e.target.style.color = ACCENT)}
// // //               onMouseLeave={(e) => (e.target.style.color = "#7fa8bc")}>
// // //               {link}
// // //             </a>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // // ─── ACCOUNT BUTTON WITH AVATAR (NO NAME TEXT) ───────────────────────────────
// // // function AccountBtn({ onOpenModal, navigate }) {
// // //   const { user, logout } = useAuth();
// // //   const [hover, setHover] = useState(false);
// // //   const [dropOpen, setDropOpen] = useState(false);
// // //   const closeTimer = useRef(null);

// // //   const handleMouseEnter = () => {
// // //     if (closeTimer.current) clearTimeout(closeTimer.current);
// // //     setDropOpen(true);
// // //   };

// // //   const handleMouseLeave = () => {
// // //     closeTimer.current = setTimeout(() => setDropOpen(false), 80);
// // //   };

// // //   const getInitial = () => {
// // //     const name = user?.name || user?.fullName || "";
// // //     return name.charAt(0).toUpperCase();
// // //   };

// // //   const getAvatarColor = () => {
// // //     const name = user?.name || user?.fullName || "";
// // //     const colors = ["#1a4a6b", "#2a6a9a", "#3a8aba", "#4aa0d0", "#5ab0e0", "#0c2c41"];
// // //     let hash = 0;
// // //     for (let i = 0; i < name.length; i++) {
// // //       hash = ((hash << 5) - hash) + name.charCodeAt(i);
// // //       hash |= 0;
// // //     }
// // //     return colors[Math.abs(hash) % colors.length];
// // //   };

// // //   if (user) {
// // //     return (
// // //       <div
// // //         style={{ position: "relative" }}
// // //         onMouseEnter={handleMouseEnter}
// // //         onMouseLeave={handleMouseLeave}
// // //       >
// // //         <button
// // //           onMouseEnter={() => setHover(true)}
// // //           onMouseLeave={() => setHover(false)}
// // //           title={`Signed in as ${user.name || user.fullName}`}
// // //           style={{
// // //             background: hover ? "#f0f7fc" : "none",
// // //             border: `1.5px solid ${NAVY}`,
// // //             cursor: "pointer",
// // //             padding: "4px 8px 4px 4px",
// // //             color: NAVY,
// // //             fontSize: 11,
// // //             fontWeight: 700,
// // //             letterSpacing: "0.08em",
// // //             fontFamily: ff,
// // //             display: "flex",
// // //             alignItems: "center",
// // //             gap: 6,
// // //             borderRadius: 40,
// // //             transition: "background 0.15s",
// // //           }}>
// // //           <div style={{
// // //             width: 28,
// // //             height: 28,
// // //             borderRadius: "50%",
// // //             background: getAvatarColor(),
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             color: "#fff",
// // //             fontSize: 13,
// // //             fontWeight: 700,
// // //             fontFamily: ff,
// // //           }}>
// // //             {getInitial()}
// // //           </div>
// // //           <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
// // //             <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
// // //           </svg>
// // //         </button>

// // //         {dropOpen && (
// // //           <div
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //             style={{
// // //               position: "absolute",
// // //               top: "100%",
// // //               right: 0,
// // //               paddingTop: 8,
// // //               zIndex: 100,
// // //             }}
// // //           >
// // //             <div style={{
// // //               background: "#fff",
// // //               border: `1.5px solid ${NAVY}`,
// // //               boxShadow: "0 8px 24px rgba(12,44,65,0.12)",
// // //               minWidth: 180,
// // //             }}>
// // //               {[
// // //                 { label: "MY DASHBOARD", hash: "#/dashboard" },
// // //                 { label: "MY ORDERS", hash: "#/dashboard?tab=orders" },
// // //                 { label: "WISHLIST", hash: "#/wishlist" },
// // //                 { label: "ADDRESSES", hash: "#/dashboard?tab=addresses" },
// // //               ].map(item => (
// // //                 <button
// // //                   key={item.label}
// // //                   onClick={() => { navigate(item.hash); setDropOpen(false); }}
// // //                   style={{
// // //                     display: "block", width: "100%", textAlign: "left",
// // //                     background: "none", border: "none", borderBottom: "1px solid #f0f0f0",
// // //                     padding: "11px 16px", fontSize: 11, fontWeight: 700,
// // //                     letterSpacing: "0.1em", color: NAVY, cursor: "pointer",
// // //                     fontFamily: ff, transition: "background 0.15s",
// // //                   }}
// // //                   onMouseEnter={e => e.currentTarget.style.background = "#f0f7fc"}
// // //                   onMouseLeave={e => e.currentTarget.style.background = "none"}
// // //                 >
// // //                   {item.label}
// // //                 </button>
// // //               ))}
// // //               <button
// // //                 onClick={() => { logout(); navigate("#/"); setDropOpen(false); }}
// // //                 style={{
// // //                   display: "block", width: "100%", textAlign: "left",
// // //                   background: "none", border: "none", padding: "11px 16px",
// // //                   fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
// // //                   color: "#c0392b", cursor: "pointer", fontFamily: ff,
// // //                 }}
// // //                 onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
// // //                 onMouseLeave={e => e.currentTarget.style.background = "none"}
// // //               >
// // //                 SIGN OUT
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   }

// // //   // Not logged in — show standard account icon
// // //   return (
// // //     <button style={iconBtn} aria-label="Account" onClick={onOpenModal}>
// // //       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
// // //         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// // //         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
// // //         <circle cx="12" cy="7" r="4" />
// // //       </svg>
// // //     </button>
// // //   );
// // // }

// // // // ════════════════════════════════════════════════════════════════════════════
// // // // INNER APP
// // // // ════════════════════════════════════════════════════════════════════════════
// // // function AppInner() {
// // //   const { user, checked } = useAuth();

// // //   const [annIdx, setAnnIdx] = useState(0);
// // //   const [annVisible, setAnnVisible] = useState(true);
// // //   const [megaOpen, setMegaOpen] = useState(null);
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [searchOpen, setSearchOpen] = useState(false);
// // //   const [searchVal, setSearchVal] = useState("");
// // //   const [cartCount, setCartCount] = useState(0);
// // //   const [authModalOpen, setAuthModalOpen] = useState(false);
// // //   const megaTimer = useRef(null);

// // //   const { route, navigate } = useHashRouter();

// // //   // Scroll to top on every route change (so user lands at top of new page)
// // //   useEffect(() => {
// // //     window.scrollTo(0, 0);
// // //   }, [route]);

// // //   // Announcement rotation
// // //   useEffect(() => {
// // //     const t = setInterval(() => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
// // //     return () => clearInterval(t);
// // //   }, []);

// // //   // Scroll shadow (only for visual effect, not for sticky)
// // //   useEffect(() => {
// // //     const fn = () => setScrolled(window.scrollY > 8);
// // //     window.addEventListener("scroll", fn);
// // //     return () => window.removeEventListener("scroll", fn);
// // //   }, []);

// // //   // Live cart count
// // //   useEffect(() => {
// // //     const readCart = () => {
// // //       try {
// // //         const items = JSON.parse(localStorage.getItem("os_cart") || "[]");
// // //         setCartCount(items.reduce((s, i) => s + i.qty, 0));
// // //       } catch { setCartCount(0); }
// // //     };
// // //     readCart();
// // //     const onCartUpdate = (e) => setCartCount(e.detail.reduce((s, i) => s + i.qty, 0));
// // //     window.addEventListener("cartUpdated", onCartUpdate);
// // //     window.addEventListener("storage", readCart);
// // //     return () => {
// // //       window.removeEventListener("cartUpdated", onCartUpdate);
// // //       window.removeEventListener("storage", readCart);
// // //     };
// // //   }, []);

// // //   // Close modal when user becomes logged in
// // //   useEffect(() => {
// // //     if (user && authModalOpen) {
// // //       setAuthModalOpen(false);
// // //     }
// // //   }, [user, authModalOpen]);

// // //   const openMega = (label) => { clearTimeout(megaTimer.current); setMegaOpen(label); };
// // //   const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 130); };
// // //   const activeNav = NAV_LINKS.find((n) => n.label === megaOpen);
// // //   const goTo = (hash) => { navigate(hash); };

// // //   if (!checked) return null;

// // //   return (
// // //     <div style={{ fontFamily: ff, background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

// // //       {/* Auth Modal */}
// // //       <AuthModal
// // //         isOpen={authModalOpen}
// // //         onClose={() => setAuthModalOpen(false)}
// // //       />

// // //       {/* Announcement Bar (not sticky) */}
// // //       {annVisible && (
// // //         <div style={{
// // //           background: NAVY, color: ACCENT, textAlign: "center", marginTop: 60, fontSize: 11,
// // //           letterSpacing: "0.14em", padding: "9px 48px", position: "relative", fontFamily: ff
// // //         }}>
// // //           {ANNOUNCEMENTS[annIdx]}
// // //           <button onClick={() => setAnnVisible(false)}
// // //             style={{
// // //               position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
// // //               background: "none", border: "none", color: ACCENT, cursor: "pointer", fontSize: 20, lineHeight: 1
// // //             }}>
// // //             ×
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* Navbar (normal block, no sticky) */}
// // //       <header style={{
// // //         width: "100%",
// // //         background: "#fff",
// // //         borderBottom: `3px solid ${NAVY}`,
// // //         boxShadow: scrolled ? "0 2px 20px rgba(12,44,65,0.12)" : "none",
// // //         transition: "box-shadow 0.3s",
// // //         position: "fixed",
// // //         top: 0,
// // //         zIndex: 49,
// // //       }}>
// // //         <div style={{
// // //           maxWidth: 1400, margin: "0 auto", padding: "0 24px", height: 62,
// // //           display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
// // //         }}>

// // //           {/* Logo */}
// // //           <a href="#/" style={{ textDecoration: "none", flexShrink: 0 }}>
// // //             <img src="./logo.jpeg" alt="Urban Eye" style={{ height: 50, width: "auto" }} />
// // //           </a>

// // //           {/* Nav Links */}
// // //           <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }}>

// // //             <a href="#/products"
// // //               style={{
// // //                 background: "none", border: "none", fontSize: 12, fontWeight: 900,
// // //                 letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// // //                 color: BLACK, fontFamily: ff,
// // //                 borderBottom: window.location.hash === "#/products" ? `3px solid ${NAVY}` : "3px solid transparent",
// // //                 transition: "border-color 0.2s", display: "flex", alignItems: "center", textDecoration: "none"
// // //               }}>
// // //               PRODUCTS
// // //             </a>

// // //             {NAV_LINKS.map((link) => (
// // //               <div key={link.label}
// // //                 onMouseEnter={() => (link.mega ? openMega(link.label) : null)}
// // //                 onMouseLeave={link.mega ? closeMega : null}
// // //                 style={{ position: "relative" }}>
// // //                 <button
// // //                   onClick={() => {
// // //                     if (link.label === "STORY") goTo("#/story");
// // //                   }}
// // //                   style={{
// // //                     background: "none", border: "none", fontSize: 12, fontWeight: 900,
// // //                     letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// // //                     color: BLACK, fontFamily: ff,
// // //                     borderBottom: megaOpen === link.label ? `3px solid ${NAVY}` : "3px solid transparent",
// // //                     transition: "border-color 0.2s", display: "flex", alignItems: "center", gap: 4
// // //                   }}>
// // //                   {link.label}
// // //                   {link.mega && (
// // //                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
// // //                       <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
// // //                     </svg>
// // //                   )}
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </nav>

// // //           {/* Right icons */}
// // //           <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>

// // //             {/* Account Button */}
// // //             <AccountBtn onOpenModal={() => setAuthModalOpen(true)} navigate={goTo} />

// // //             {/* Search */}
// // //             <button onClick={() => setSearchOpen((v) => !v)} style={iconBtn} aria-label="Search">
// // //               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
// // //                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// // //                 <circle cx="11" cy="11" r="8" />
// // //                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
// // //               </svg>
// // //             </button>

// // //             {/* Cart */}
// // //             <button onClick={() => goTo("#/cart")}
// // //               style={{ ...iconBtn, position: "relative" }} aria-label="Cart">
// // //               <img
// // //                 src="../icon.png"
// // //                 alt="Cart"
// // //                 style={{ width: 24, height: 24, objectFit: "contain" }}
// // //               />
// // //               {cartCount > 0 && (
// // //                 <span style={{
// // //                   position: "absolute", top: -8, right: -8, width: 18, height: 18,
// // //                   borderRadius: "50%", background: NAVY, color: "#fff",
// // //                   fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center",
// // //                   justifyContent: "center", fontFamily: ff, animation: "cartPop 0.25s ease"
// // //                 }}>
// // //                   {cartCount > 99 ? "99+" : cartCount}
// // //                 </span>
// // //               )}
// // //             </button>

// // //             <button onClick={() => goTo("#/products")}
// // //               style={{
// // //                 background: NAVY, color: "#fff", border: "none", borderRadius: 0,
// // //                 padding: "10px 20px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
// // //                 cursor: "pointer", fontFamily: ff, marginLeft: 4, transition: "opacity 0.18s"
// // //               }}
// // //               onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
// // //               onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
// // //               SHOP NOW
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Search Bar */}
// // //         {searchOpen && (
// // //           <div style={{
// // //             background: "#f0f8fc", borderTop: `2px solid ${NAVY}`,
// // //             padding: "12px 24px", animation: "slideDown 0.2s ease both"
// // //           }}>
// // //             <div style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}>
// // //               <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#6aadcc" }}
// // //                 width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
// // //                 <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
// // //               </svg>
// // //               <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
// // //                 onKeyDown={(e) => {
// // //                   if (e.key === "Enter" && searchVal.trim()) {
// // //                     goTo(`#/search?q=${encodeURIComponent(searchVal)}`);
// // //                     setSearchOpen(false);
// // //                     setSearchVal("");
// // //                   }
// // //                 }}
// // //                 placeholder="Search frames, styles, collections..."
// // //                 style={{
// // //                   width: "100%", padding: "11px 36px 11px 38px", border: `1.5px solid ${NAVY}`,
// // //                   fontSize: 13, letterSpacing: "0.02em", outline: "none", background: "#fff",
// // //                   color: BLACK, fontFamily: "'Courier New',Courier,monospace", boxSizing: "border-box"
// // //                 }} />
// // //               {searchVal && (
// // //                 <button onClick={() => setSearchVal("")}
// // //                   style={{
// // //                     position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
// // //                     background: "none", border: "none", cursor: "pointer", color: "#6aadcc", fontSize: 18
// // //                   }}>×</button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Mega Menu */}
// // //         {megaOpen && activeNav?.mega && (
// // //           <div onMouseEnter={() => openMega(megaOpen)} onMouseLeave={closeMega}
// // //             style={{
// // //               position: "absolute", top: "100%", left: 0, right: 0, background: "#fff",
// // //               borderTop: `2px solid ${NAVY}`, boxShadow: "0 12px 40px rgba(12,44,65,0.12)",
// // //               zIndex: 50, animation: "slideDown 0.18s ease both"
// // //             }}>
// // //             <div style={{
// // //               maxWidth: 1400, margin: "0 auto", padding: "32px 40px",
// // //               display: "grid",
// // //               gridTemplateColumns: `repeat(${activeNav.mega.cols.length}, 1fr) ${activeNav.mega.panels.length * 160}px`,
// // //               gap: 0
// // //             }}>
// // //               {activeNav.mega.cols.map((col) => (
// // //                 <div key={col.title} style={{ paddingRight: 24 }}>
// // //                   <div style={{
// // //                     fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: NAVY,
// // //                     marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
// // //                     paddingBottom: 8, display: "inline-block"
// // //                   }}>
// // //                     {col.title}
// // //                   </div>
// // //                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
// // //                     {col.links.map((link) => (
// // //                       <li key={link.label}>
// // //                         <a href={buildProductsLink(link.to)}
// // //                           onClick={() => setMegaOpen(null)}
// // //                           style={{
// // //                             fontSize: 12, color: "#333", textDecoration: "none",
// // //                             letterSpacing: "0.06em", fontFamily: ff, fontWeight: 700, transition: "color 0.15s"
// // //                           }}
// // //                           onMouseEnter={(e) => (e.target.style.color = NAVY)}
// // //                           onMouseLeave={(e) => (e.target.style.color = "#333")}>
// // //                           {link.label}
// // //                         </a>
// // //                       </li>
// // //                     ))}
// // //                   </ul>
// // //                 </div>
// // //               ))}
// // //               <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
// // //                 {activeNav.mega.panels.map((panel, pi) => (
// // //                   <a key={pi} href={buildProductsLink(panel.to)}
// // //                     onClick={() => setMegaOpen(null)}
// // //                     style={{
// // //                       width: 148, height: 180, background: panel.bg, cursor: "pointer",
// // //                       position: "relative", display: "flex", alignItems: "flex-end",
// // //                       padding: 12, border: `1.5px solid ${NAVY}`, textDecoration: "none"
// // //                     }}>
// // //                     <div style={{
// // //                       position: "absolute", top: "30%", left: "50%",
// // //                       transform: "translate(-50%,-50%)", opacity: 0.3
// // //                     }}>
// // //                       <svg width="80" height="44" viewBox="0 0 120 66" fill="none">
// // //                         <ellipse cx="30" cy="33" rx="25" ry="22"
// // //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
// // //                         <ellipse cx="90" cy="33" rx="25" ry="22"
// // //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
// // //                         <line x1="55" y1="33" x2="65" y2="33"
// // //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="3" strokeLinecap="round" />
// // //                       </svg>
// // //                     </div>
// // //                     <div style={{
// // //                       fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
// // //                       color: panel.dark ? "#fff" : NAVY, fontFamily: ff, position: "relative", zIndex: 1
// // //                     }}>
// // //                       {panel.label}
// // //                     </div>
// // //                   </a>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </header>

// // //       {/* Main Content */}
// // //       <main><OpticsStudio /></main>

// // //       {/* Footer */}
// // //       <footer style={{ background: BLACK, color: "#fff", fontFamily: ff }}>
// // //         {/* Newsletter */}
// // //         <div style={{
// // //           borderBottom: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
// // //           padding: "52px 40px", display: "flex", flexWrap: "wrap",
// // //           justifyContent: "space-between", alignItems: "center", gap: 28
// // //         }}>
// // //           <div>
// // //             <div style={{ fontFamily: ff, fontSize: 22, fontWeight: 900, letterSpacing: "0.04em", marginBottom: 6, color: "#fff" }}>
// // //               JOIN THE FAMILY
// // //             </div>
// // //             <div style={{ fontSize: 13, color: "#6aadcc", letterSpacing: "0.03em", fontFamily: "'Courier New',Courier,monospace" }}>
// // //               Get 10% off your first order — exclusive drops &amp; style guides.
// // //             </div>
// // //           </div>
// // //           <div style={{ display: "flex", maxWidth: 400, width: "100%" }}>
// // //             <input type="email" placeholder="Your email address"
// // //               style={{
// // //                 flex: 1, background: "#0e1f2e", border: `1px solid #1a3a52`, borderRight: "none",
// // //                 color: "#fff", padding: "12px 16px", fontSize: 13, outline: "none",
// // //                 letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace"
// // //               }} />
// // //             <button style={{
// // //               background: NAVY, color: ACCENT, border: `1px solid ${NAVY}`,
// // //               padding: "12px 22px", fontSize: 11, fontWeight: 900,
// // //               letterSpacing: "0.14em", cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff
// // //             }}>
// // //               SUBSCRIBE
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Links */}
// // //         <div style={{
// // //           maxWidth: 1400, margin: "0 auto", padding: "56px 40px",
// // //           display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44
// // //         }}>
// // //           <div>
// // //             <div style={{ fontFamily: ff, fontSize: 22, fontWeight: 900, letterSpacing: "0.06em", marginBottom: 2, color: "#fff" }}>
// // //               URBAN EYE
// // //             </div>
// // //             <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "#3a6a8a", marginBottom: 16 }}>
// // //               EST. 2015 · KARACHI
// // //             </div>
// // //             <div style={{ width: 36, height: 3, background: NAVY, marginBottom: 16 }} />
// // //             <div style={{ borderLeft: `2px solid #1a3a52`, paddingLeft: 14, marginBottom: 20 }}>
// // //               <p style={{
// // //                 fontSize: 13, color: "#6aadcc", lineHeight: 1.8, margin: 0,
// // //                 fontStyle: "italic", fontFamily: "'Courier New',Courier,monospace"
// // //               }}>
// // //                 "Your vision is our concern."
// // //               </p>
// // //               <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#3a6a8a", marginTop: 8, fontFamily: ff }}>
// // //                 TARIQ HASSAN · FOUNDER
// // //               </div>
// // //             </div>
// // //             <p style={{
// // //               fontSize: 13, color: "#5a8aaa", lineHeight: 1.8, maxWidth: 260,
// // //               marginBottom: 20, fontFamily: "'Courier New',Courier,monospace"
// // //             }}>
// // //               Premium eyewear for those who see the world differently. Karachi's destination for iconic frames since 2015.
// // //             </p>
// // //             <div style={{ display: "flex", gap: 8 }}>
// // //               {["IG", "FB", "TT", "YT"].map((s) => (
// // //                 <a key={s} href="#"
// // //                   style={{
// // //                     width: 32, height: 32, border: `1px solid #1a3a52`, display: "flex",
// // //                     alignItems: "center", justifyContent: "center", color: "#5a8aaa",
// // //                     fontSize: 10, textDecoration: "none", fontFamily: ff, fontWeight: 900,
// // //                     letterSpacing: "0.05em", transition: "border-color 0.2s, color 0.2s"
// // //                   }}
// // //                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
// // //                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; e.currentTarget.style.color = "#5a8aaa"; }}>
// // //                   {s}
// // //                 </a>
// // //               ))}
// // //             </div>
// // //           </div>
// // //           <FooterCol title="SHOP" links={["Eyeglasses", "Sunglasses", "Reading Glasses", "New Arrivals", "Best Sellers", "Virtual Try-On", "Custom Tints™"]} />
// // //           <FooterCol title="HELP" links={["Shipping & Returns", "Frame Sizing Guide", "Prescription Info", "Contact Us", "Store Locator", "FAQ", "Repairs"]} />
// // //           <FooterCol title="COMPANY" links={["Our Story", "Craftsmanship", "Careers", "Press", "Sustainability", "Affiliates", "Gift Cards"]} />
// // //         </div>

// // //         {/* Bottom bar */}
// // //         <div style={{
// // //           borderTop: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
// // //           padding: "16px 40px", display: "flex", flexWrap: "wrap",
// // //           justifyContent: "space-between", alignItems: "center", gap: 10
// // //         }}>
// // //           <div style={{ fontSize: 11, color: "#3a6a8a", letterSpacing: "0.05em", fontFamily: ff }}>
// // //             © 2026 Urban Eye. All rights reserved.
// // //           </div>
// // //           <div style={{ display: "flex", gap: 18 }}>
// // //             {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
// // //               <a key={link} href="#"
// // //                 style={{
// // //                   fontSize: 11, color: "#3a6a8a", textDecoration: "none",
// // //                   letterSpacing: "0.05em", fontFamily: ff, transition: "color 0.2s"
// // //                 }}
// // //                 onMouseEnter={(e) => (e.target.style.color = ACCENT)}
// // //                 onMouseLeave={(e) => (e.target.style.color = "#3a6a8a")}>
// // //                 {link}
// // //               </a>
// // //             ))}
// // //           </div>
// // //           <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
// // //             {["VISA", "MC", "AMEX", "COD"].map((card) => (
// // //               <span key={card}
// // //                 style={{
// // //                   fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
// // //                   border: `1px solid #1a3a52`, padding: "3px 7px", color: "#3a6a8a", fontFamily: ff
// // //                 }}>
// // //                 {card}
// // //               </span>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </footer>

// // //       {/* WhatsApp FAB */}
// // //       <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
// // //         style={{
// // //           position: "fixed", bottom: 26, right: 26, width: 52, height: 52, borderRadius: "50%",
// // //           background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
// // //           boxShadow: "0 4px 20px rgba(37,211,102,0.35)", zIndex: 999, transition: "transform 0.2s", textDecoration: "none"
// // //         }}
// // //         onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
// // //         onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// // //         aria-label="Chat on WhatsApp">
// // //         <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
// // //           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
// // //         </svg>
// // //       </a>

// // //       <style>{`
// // //         * {
// // //           box-sizing: border-box;
// // //         }
// // //         @keyframes slideDown {
// // //           from { opacity: 0; transform: translateY(-8px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //         @keyframes cartPop {
// // //           0%   { transform: scale(0.6); }
// // //           70%  { transform: scale(1.2); }
// // //           100% { transform: scale(1); }
// // //         }
// // //         button[aria-label="Search"]:hover,
// // //         button[aria-label="Cart"]:hover {
// // //           opacity: 0.7;
// // //           transform: scale(1.05);
// // //         }
// // //         .auth-modal-overlay {
// // //           position: fixed;
// // //           top: 0; left: 0; right: 0; bottom: 0;
// // //           background: rgba(0, 0, 0, 0.7);
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           z-index: 1000;
// // //           backdrop-filter: blur(4px);
// // //         }
// // //         .auth-modal-content {
// // //           position: relative;
// // //           max-width: 460px;
// // //           width: 90%;
// // //           margin: 20px;
// // //           border-radius: 24px;
// // //           background: transparent;
// // //           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }


// // // // ── DEFAULT EXPORT ────────────────────────────────────────────────────────────
// // // export default function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <AppInner />
// // //     </AuthProvider>
// // //   );
// // // }

































// // // App.jsx
// // import { useState, useEffect, useRef } from "react";
// // import OpticsStudio from "./opticsStudio.jsx";
// // import { CartProvider, useCart } from "./contexts/CardContext.jsx";
// // import { useHashRouter } from "./hook/usehashrooter.js";
// // import { AuthProvider, useAuth, AuthModal } from "./Auth/auth.jsx";
// // import { PRODUCTS_DATA } from "./prodcut.js";
// // import { searchProducts, getProductDisplayPrice, getProductVariants, formatPriceValue } from "./services/productUtils.js";

// // // ─── RESPONSIVE HOOK ────────────────────────────────────────────────────────
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

// // // ─── THEME COLOURS ───────────────────────────────────────────────────────────
// // const NAVY = "#0c2c41";
// // const ACCENT = "#89c4e1";
// // const BLACK = "#0a1628";
// // // ─────────────────────────────────────────────────────────────────────────────

// // // ─── NAV LINKS — data-driven; each link's `to` becomes URL query params ────
// // const NAV_LINKS = [
// //   {
// //     label: "EYEGLASSES",
// //     mega: {
// //       cols: [
// //         {
// //           title: "EYEGLASSES",
// //           links: [
// //             { label: "SHOP ALL", to: { category: "Eyeglasses" } },
// //             { label: "MEN'S", to: { category: "Eyeglasses", gender: "Men" } },
// //             { label: "WOMEN'S", to: { category: "Eyeglasses", gender: "Women" } },
// //             { label: "UNISEX", to: { category: "Eyeglasses", gender: "Unisex" } },
// //           ],
// //         },
// //         {
// //           title: "SHOP BY SHAPE",
// //           links: [
// //             { label: "ROUND", to: { category: "Eyeglasses", shape: "Round" } },
// //             { label: "SQUARE", to: { category: "Eyeglasses", shape: "Square" } },
// //             { label: "AVIATOR", to: { category: "Eyeglasses", shape: "Aviator" } },
// //             { label: "CAT-EYE", to: { category: "Eyeglasses", shape: "Cat-Eye" } },
// //             { label: "GEOMETRIC", to: { category: "Eyeglasses", shape: "Geometric" } },
// //             { label: "BROWLINE", to: { category: "Eyeglasses", shape: "Browline" } },
// //           ],
// //         },
// //       ],
// //       panels: [
// //         { label: "SHOP ALL EYEGLASSES", bg: "#e8f2f8", to: { category: "Eyeglasses" } },
// //       ],
// //     },
// //   },
// //   {
// //     label: "SUNGLASSES",
// //     mega: {
// //       cols: [
// //         {
// //           title: "SUNGLASSES",
// //           links: [
// //             { label: "SHOP ALL", to: { category: "Sunglasses" } },
// //             { label: "MEN'S", to: { category: "Sunglasses", gender: "Men" } },
// //             { label: "WOMEN'S", to: { category: "Sunglasses", gender: "Women" } },
// //             { label: "UNISEX", to: { category: "Sunglasses", gender: "Unisex" } },
// //           ],
// //         },
// //         {
// //           title: "SHOP BY SHAPE",
// //           links: [
// //             { label: "ROUND", to: { category: "Sunglasses", shape: "Round" } },
// //             { label: "SQUARE", to: { category: "Sunglasses", shape: "Square" } },
// //             { label: "AVIATOR", to: { category: "Sunglasses", shape: "Aviator" } },
// //             { label: "CAT-EYE", to: { category: "Sunglasses", shape: "Cat-Eye" } },
// //           ],
// //         },
// //       ],
// //       panels: [
// //         { label: "SHOP ALL SUNGLASSES", bg: "#e8f2f8", to: { category: "Sunglasses" } },
// //       ],
// //     },
// //   },
// //   {
// //     label: "COLLECTIONS",
// //     mega: {
// //       cols: [
// //         {
// //           title: "COLLECTIONS",
// //           links: [
// //             { label: "NEW ARRIVALS", to: { tag: "NEW" } },
// //             { label: "FEATURED", to: { tag: "BEST SELLER" } },
// //           ],
// //         },
// //       ],
// //       panels: [
// //         { label: "VIEW ALL FRAMES", bg: "#0c2c41", dark: true, to: {} },
// //       ],
// //     },
// //   },
// //   { label: "STORY", mega: null },
// // ];

// // // Builds "#/products?key=value&key2=value2" from a plain { key: value } object.
// // function buildProductsLink(to) {
// //   const params = new URLSearchParams(to || {});
// //   const qs = params.toString();
// //   return qs ? `#/products?${qs}` : "#/products";
// // }

// // const ANNOUNCEMENTS = [
// //   "FREE SHIPPING ACROSS PAKISTAN ON ALL ORDERS",
// //   "NEW SPRING 2026 COLLECTION — SHOP NOW",
// //   "20+ CUSTOM MADE TINTS™ — HANDCRAFTED FOR YOU",
// // ];

// // const ff = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";

// // const iconBtn = {
// //   background: "none",
// //   border: "none",
// //   cursor: "pointer",
// //   padding: "10px",
// //   minWidth: "40px",
// //   minHeight: "40px",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// //   transition: "opacity 0.2s, transform 0.2s",
// //   borderRadius: "50%",
// // };

// // // ─── FOOTER COLUMN ────────────────────────────────────────────────────────────
// // function FooterCol({ title, links }) {
// //   return (
// //     <div>
// //       <div style={{
// //         fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#6aadcc",
// //         marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
// //         paddingBottom: 8, display: "inline-block"
// //       }}>
// //         {title}
// //       </div>
// //       <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
// //         {links.map((link) => (
// //           <li key={link}>
// //             <a href="#" style={{
// //               fontSize: 13, color: "#7fa8bc", textDecoration: "none",
// //               letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace", transition: "color 0.2s"
// //             }}
// //               onMouseEnter={(e) => (e.target.style.color = ACCENT)}
// //               onMouseLeave={(e) => (e.target.style.color = "#7fa8bc")}>
// //               {link}
// //             </a>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // // ─── ACCOUNT BUTTON WITH AVATAR (NO NAME TEXT) ───────────────────────────────
// // function AccountBtn({ onOpenModal, navigate }) {
// //   const { user, logout } = useAuth();
// //   const [hover, setHover] = useState(false);
// //   const [dropOpen, setDropOpen] = useState(false);
// //   const closeTimer = useRef(null);

// //   const handleMouseEnter = () => {
// //     if (closeTimer.current) clearTimeout(closeTimer.current);
// //     setDropOpen(true);
// //   };

// //   const handleMouseLeave = () => {
// //     closeTimer.current = setTimeout(() => setDropOpen(false), 80);
// //   };

// //   const getInitial = () => {
// //     const name = user?.name || user?.fullName || "";
// //     return name.charAt(0).toUpperCase();
// //   };

// //   const getAvatarColor = () => {
// //     const name = user?.name || user?.fullName || "";
// //     const colors = ["#1a4a6b", "#2a6a9a", "#3a8aba", "#4aa0d0", "#5ab0e0", "#0c2c41"];
// //     let hash = 0;
// //     for (let i = 0; i < name.length; i++) {
// //       hash = ((hash << 5) - hash) + name.charCodeAt(i);
// //       hash |= 0;
// //     }
// //     return colors[Math.abs(hash) % colors.length];
// //   };

// //   if (user) {
// //     return (
// //       <div
// //         style={{ position: "relative" }}
// //         onMouseEnter={handleMouseEnter}
// //         onMouseLeave={handleMouseLeave}
// //       >
// //         <button
// //           onMouseEnter={() => setHover(true)}
// //           onMouseLeave={() => setHover(false)}
// //           title={`Signed in as ${user.name || user.fullName}`}
// //           style={{
// //             background: hover ? "#f0f7fc" : "none",
// //             border: `1.5px solid ${NAVY}`,
// //             cursor: "pointer",
// //             padding: "4px 8px 4px 4px",
// //             color: NAVY,
// //             fontSize: 11,
// //             fontWeight: 700,
// //             letterSpacing: "0.08em",
// //             fontFamily: ff,
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 6,
// //             borderRadius: 40,
// //             transition: "background 0.15s",
// //           }}>
// //           <div style={{
// //             width: 28,
// //             height: 28,
// //             borderRadius: "50%",
// //             background: getAvatarColor(),
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             color: "#fff",
// //             fontSize: 13,
// //             fontWeight: 700,
// //             fontFamily: ff,
// //           }}>
// //             {getInitial()}
// //           </div>
// //           <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
// //             <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
// //           </svg>
// //         </button>

// //         {dropOpen && (
// //           <div
// //             onMouseEnter={handleMouseEnter}
// //             onMouseLeave={handleMouseLeave}
// //             style={{
// //               position: "absolute",
// //               top: "100%",
// //               right: 0,
// //               paddingTop: 8,
// //               zIndex: 100,
// //             }}
// //           >
// //             <div style={{
// //               background: "#fff",
// //               border: `1.5px solid ${NAVY}`,
// //               boxShadow: "0 8px 24px rgba(12,44,65,0.12)",
// //               minWidth: 180,
// //             }}>
// //               {[
// //                 { label: "MY DASHBOARD", hash: "#/dashboard" },
// //                 { label: "MY ORDERS", hash: "#/dashboard?tab=orders" },
// //                 { label: "WISHLIST", hash: "#/wishlist" },
// //                 { label: "ADDRESSES", hash: "#/dashboard?tab=addresses" },
// //               ].map(item => (
// //                 <button
// //                   key={item.label}
// //                   onClick={() => { navigate(item.hash); setDropOpen(false); }}
// //                   style={{
// //                     display: "block", width: "100%", textAlign: "left",
// //                     background: "none", border: "none", borderBottom: "1px solid #f0f0f0",
// //                     padding: "11px 16px", fontSize: 11, fontWeight: 700,
// //                     letterSpacing: "0.1em", color: NAVY, cursor: "pointer",
// //                     fontFamily: ff, transition: "background 0.15s",
// //                   }}
// //                   onMouseEnter={e => e.currentTarget.style.background = "#f0f7fc"}
// //                   onMouseLeave={e => e.currentTarget.style.background = "none"}
// //                 >
// //                   {item.label}
// //                 </button>
// //               ))}
// //               <button
// //                 onClick={() => { logout(); navigate("#/"); setDropOpen(false); }}
// //                 style={{
// //                   display: "block", width: "100%", textAlign: "left",
// //                   background: "none", border: "none", padding: "11px 16px",
// //                   fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
// //                   color: "#c0392b", cursor: "pointer", fontFamily: ff,
// //                 }}
// //                 onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
// //                 onMouseLeave={e => e.currentTarget.style.background = "none"}
// //               >
// //                 SIGN OUT
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }

// //   // Not logged in — show standard account icon
// //   return (
// //     <button style={iconBtn} aria-label="Account" onClick={onOpenModal}>
// //       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
// //         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
// //         <circle cx="12" cy="7" r="4" />
// //       </svg>
// //     </button>
// //   );
// // }

// // // ════════════════════════════════════════════════════════════════════════════
// // // INNER APP
// // // ════════════════════════════════════════════════════════════════════════════
// // function AppInner() {
// //   const { user, checked } = useAuth();

// //   const isMobile = useMediaQuery("(max-width: 767px)");
// //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");

// //   const [annIdx, setAnnIdx] = useState(0);
// //   const [annVisible, setAnnVisible] = useState(true);
// //   const [megaOpen, setMegaOpen] = useState(null);
// //   const [scrolled, setScrolled] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchVal, setSearchVal] = useState("");
// //   const [cartCount, setCartCount] = useState(0);
// //   const [authModalOpen, setAuthModalOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const megaTimer = useRef(null);

// //   const { route, navigate } = useHashRouter();

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, [route]);

// //   useEffect(() => {
// //     const t = setInterval(() => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
// //     return () => clearInterval(t);
// //   }, []);

// //   useEffect(() => {
// //     const fn = () => setScrolled(window.scrollY > 8);
// //     window.addEventListener("scroll", fn);
// //     return () => window.removeEventListener("scroll", fn);
// //   }, []);

// //   useEffect(() => {
// //     const readCart = () => {
// //       try {
// //         const items = JSON.parse(localStorage.getItem("os_cart") || "[]");
// //         setCartCount(items.reduce((s, i) => s + i.qty, 0));
// //       } catch { setCartCount(0); }
// //     };
// //     readCart();
// //     const onCartUpdate = (e) => setCartCount(e.detail.reduce((s, i) => s + i.qty, 0));
// //     window.addEventListener("cartUpdated", onCartUpdate);
// //     window.addEventListener("storage", readCart);
// //     return () => {
// //       window.removeEventListener("cartUpdated", onCartUpdate);
// //       window.removeEventListener("storage", readCart);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (user && authModalOpen) setAuthModalOpen(false);
// //   }, [user, authModalOpen]);

// //   const openMega = (label) => { clearTimeout(megaTimer.current); setMegaOpen(label); };
// //   const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 130); };
// //   const activeNav = NAV_LINKS.find((n) => n.label === megaOpen);
// //   const goTo = (hash) => { navigate(hash); setMobileMenuOpen(false); setMegaOpen(null); };

// //   // Live product suggestions for the navbar search (top 6 matches).
// //   const searchSuggestions = searchVal.trim() ? searchProducts(PRODUCTS_DATA, searchVal, 6) : [];
// //   const closeSearch = () => { setSearchOpen(false); setSearchVal(""); };
// //   // Enter / "see all" → open the Products page pre-filtered by the query.
// //   const submitSearch = () => {
// //     const q = searchVal.trim();
// //     if (!q) return;
// //     goTo(`#/products?q=${encodeURIComponent(q)}`);
// //     closeSearch();
// //   };
// //   // Clicking a suggestion → jump straight to that product's detail page.
// //   const openProduct = (id) => { goTo(`#/products/${id}`); closeSearch(); };
// //   const suggestionImage = (p) =>
// //     getProductVariants(p)[0]?.image || p.image || p.gallery?.[0] || "";

// //   if (!checked) return null;

// //   return (
// //     <div style={{ fontFamily: ff, background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

// //       {/* Auth Modal */}
// //       <AuthModal
// //         isOpen={authModalOpen}
// //         onClose={() => setAuthModalOpen(false)}
// //       />

// //       {/* Announcement Bar (not sticky) */}
// //       {annVisible && (
// //         <div style={{
// //           background: NAVY, color: ACCENT, textAlign: "center",
// //           marginTop: isMobile ? 56 : 60,
// //           fontSize: isMobile ? 10 : 11,
// //           letterSpacing: "0.14em", padding: isMobile ? "6px 16px" : "9px 48px",
// //           position: "relative", fontFamily: ff
// //         }}>
// //           {ANNOUNCEMENTS[annIdx]}
// //           <button onClick={() => setAnnVisible(false)}
// //             style={{
// //               position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
// //               background: "none", border: "none", color: ACCENT, cursor: "pointer",
// //               fontSize: isMobile ? 16 : 20, lineHeight: 1
// //             }}>
// //             ×
// //           </button>
// //         </div>
// //       )}

// //       {/* Navbar */}
// //       <header style={{
// //         width: "100%",
// //         background: "#fff",
// //         borderBottom: `3px solid ${NAVY}`,
// //         boxShadow: scrolled ? "0 2px 20px rgba(12,44,65,0.12)" : "none",
// //         transition: "box-shadow 0.3s",
// //         position: "fixed",
// //         top: 0,
// //         zIndex: 49,
// //       }}>
// //         <div style={{
// //           maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 12px" : "0 24px",
// //           height: isMobile ? 56 : 62,
// //           display: "flex", alignItems: "center", justifyContent: "space-between", gap: isMobile ? 8 : 12
// //         }}>

// //           {/* Logo */}
// //           <a href="#/" style={{ textDecoration: "none", flexShrink: 0 }}>
// //             <img src="./logo.jpeg" alt="Urban Eye" style={{ height: isMobile ? 38 : 50, width: "auto" }} />
// //           </a>

// //           {/* Nav Links — hidden on mobile (shown in overlay) */}
// //           {!isMobile && (
// //             <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }}>
// //               <a href="#/products"
// //                 style={{
// //                   background: "none", border: "none", fontSize: 12, fontWeight: 900,
// //                   letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// //                   color: BLACK, fontFamily: ff,
// //                   borderBottom: window.location.hash === "#/products" ? `3px solid ${NAVY}` : "3px solid transparent",
// //                   transition: "border-color 0.2s", display: "flex", alignItems: "center", textDecoration: "none"
// //                 }}>
// //                 PRODUCTS
// //               </a>
// //               {NAV_LINKS.map((link) => (
// //                 <div key={link.label}
// //                   onMouseEnter={() => (link.mega ? openMega(link.label) : null)}
// //                   onMouseLeave={link.mega ? closeMega : null}
// //                   style={{ position: "relative" }}>
// //                   <button
// //                     onClick={() => {
// //                       if (link.label === "STORY") goTo("#/story");
// //                     }}
// //                     style={{
// //                       background: "none", border: "none", fontSize: 12, fontWeight: 900,
// //                       letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
// //                       color: BLACK, fontFamily: ff,
// //                       borderBottom: megaOpen === link.label ? `3px solid ${NAVY}` : "3px solid transparent",
// //                       transition: "border-color 0.2s", display: "flex", alignItems: "center", gap: 4
// //                     }}>
// //                     {link.label}
// //                     {link.mega && (
// //                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
// //                         <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
// //                       </svg>
// //                     )}
// //                   </button>
// //                 </div>
// //               ))}
// //             </nav>
// //           )}

// //           {/* Right icons */}
// //           <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 14, flexShrink: 0 }}>

// //             {/* Hamburger (mobile) */}
// //             {isMobile && (
// //               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={iconBtn} aria-label="Menu">
// //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
// //                   {mobileMenuOpen ? (
// //                     <line x1="18" y1="6" x2="6" y2="18" />
// //                   ) : (
// //                     <line x1="3" y1="12" x2="21" y2="12" />
// //                   )}
// //                   {mobileMenuOpen ? (
// //                     <line x1="6" y1="6" x2="18" y2="18" />
// //                   ) : (
// //                     <>
// //                       <line x1="3" y1="6" x2="21" y2="6" />
// //                       <line x1="3" y1="18" x2="21" y2="18" />
// //                     </>
// //                   )}
// //                 </svg>
// //               </button>
// //             )}

// //             {/* Account */}
// //             <AccountBtn onOpenModal={() => setAuthModalOpen(true)} navigate={goTo} />

// //             {/* Search */}
// //             <button onClick={() => setSearchOpen((v) => !v)} style={iconBtn} aria-label="Search">
// //               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
// //                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <circle cx="11" cy="11" r="8" />
// //                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
// //               </svg>
// //             </button>

// //             {/* Cart */}
// //             <button onClick={() => goTo("#/cart")}
// //               style={{ ...iconBtn, position: "relative" }} aria-label="Cart">
// //               <img
// //                 src="../icon.png"
// //                 alt="Cart"
// //                 style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, objectFit: "contain" }}
// //               />
// //               {cartCount > 0 && (
// //                 <span style={{
// //                   position: "absolute", top: -8, right: -8, width: 18, height: 18,
// //                   borderRadius: "50%", background: NAVY, color: "#fff",
// //                   fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center",
// //                   justifyContent: "center", fontFamily: ff, animation: "cartPop 0.25s ease"
// //                 }}>
// //                   {cartCount > 99 ? "99+" : cartCount}
// //                 </span>
// //               )}
// //             </button>

// //             {/* Shop Now — hidden on mobile */}
// //             {!isMobile && (
// //               <button onClick={() => goTo("#/products")}
// //                 style={{
// //                   background: NAVY, color: "#fff", border: "none", borderRadius: 0,
// //                   padding: "10px 20px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
// //                   cursor: "pointer", fontFamily: ff, marginLeft: 4, transition: "opacity 0.18s"
// //                 }}
// //                 onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
// //                 onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
// //                 SHOP NOW
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Search Bar */}
// //         {searchOpen && (
// //           <div style={{
// //             background: "#f0f8fc", borderTop: `2px solid ${NAVY}`,
// //             padding: isMobile ? "10px 12px" : "12px 24px",
// //             animation: "slideDown 0.2s ease both"
// //           }}>
// //             <div style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}>
// //               <svg style={{ position: "absolute", left: 13, top: 18, color: "#6aadcc" }}
// //                 width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
// //                 <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
// //               </svg>
// //               <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") submitSearch();
// //                   else if (e.key === "Escape") closeSearch();
// //                 }}
// //                 placeholder="Search by name or price — e.g. “Alex” or “under 8000”"
// //                 style={{
// //                   width: "100%", padding: "11px 36px 11px 38px", border: `1.5px solid ${NAVY}`,
// //                   fontSize: isMobile ? 12 : 13, letterSpacing: "0.02em", outline: "none", background: "#fff",
// //                   color: BLACK, fontFamily: "'Courier New',Courier,monospace", boxSizing: "border-box"
// //                 }} />
// //               {searchVal && (
// //                 <button onClick={() => setSearchVal("")}
// //                   style={{
// //                     position: "absolute", right: 12, top: 8,
// //                     background: "none", border: "none", cursor: "pointer", color: "#6aadcc", fontSize: 18
// //                   }}>×</button>
// //               )}

// //               {/* Live product suggestions */}
// //               {searchVal.trim() && (
// //                 <div style={{
// //                   marginTop: 6, background: "#fff", border: `1.5px solid ${NAVY}`,
// //                   boxShadow: "0 12px 30px rgba(12,44,65,0.15)", maxHeight: "60vh", overflowY: "auto"
// //                 }}>
// //                   {searchSuggestions.length > 0 ? (
// //                     <>
// //                       {searchSuggestions.map((p) => {
// //                         const { price, discountPrice } = getProductDisplayPrice(p);
// //                         const onSale = discountPrice < price;
// //                         return (
// //                           <button key={p.id} onClick={() => openProduct(p.id)}
// //                             style={{
// //                               display: "flex", alignItems: "center", gap: 12, width: "100%",
// //                               padding: "10px 12px", background: "none", border: "none",
// //                               borderBottom: "1px solid #eef4f8", cursor: "pointer", textAlign: "left"
// //                             }}
// //                             onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f8fc")}
// //                             onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
// //                             <div style={{
// //                               width: 46, height: 46, flexShrink: 0, background: "#f5f5f0",
// //                               border: "1px solid #e8e0d0", display: "flex", alignItems: "center", justifyContent: "center"
// //                             }}>
// //                               <img src={suggestionImage(p)} alt={p.name} loading="lazy"
// //                                 style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />
// //                             </div>
// //                             <div style={{ flex: 1, minWidth: 0 }}>
// //                               <div style={{
// //                                 fontSize: 13, fontWeight: 900, color: BLACK, fontFamily: ff,
// //                                 letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
// //                               }}>{p.name}</div>
// //                               <div style={{ fontSize: 11, color: "#7a8a95", fontFamily: "'Courier New',Courier,monospace" }}>
// //                                 {p.category}{p.subcategory ? ` · ${p.subcategory}` : ""}
// //                               </div>
// //                             </div>
// //                             <div style={{ flexShrink: 0, textAlign: "right", fontFamily: ff }}>
// //                               <span style={{ fontSize: 13, fontWeight: 900, color: NAVY }}>PKR {formatPriceValue(discountPrice)}</span>
// //                               {onSale && (
// //                                 <div style={{ fontSize: 10, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</div>
// //                               )}
// //                             </div>
// //                           </button>
// //                         );
// //                       })}
// //                       <button onClick={submitSearch}
// //                         style={{
// //                           display: "block", width: "100%", padding: "11px 12px", background: "#f0f8fc",
// //                           border: "none", cursor: "pointer", fontSize: 11, fontWeight: 900,
// //                           letterSpacing: "0.12em", color: NAVY, fontFamily: ff
// //                         }}>
// //                         SEE ALL RESULTS FOR “{searchVal.trim().toUpperCase()}” →
// //                       </button>
// //                     </>
// //                   ) : (
// //                     <div style={{ padding: "16px 14px", fontSize: 12, color: "#7a8a95", fontFamily: "'Courier New',Courier,monospace" }}>
// //                       No frames found for “{searchVal.trim()}”.
// //                       <button onClick={submitSearch}
// //                         style={{ marginLeft: 6, background: "none", border: "none", color: NAVY, fontWeight: 900, cursor: "pointer", fontFamily: ff }}>
// //                         Browse all →
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Mobile Menu Overlay */}
// //         {isMobile && mobileMenuOpen && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: isMobile ? 56 : 62,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               background: "#fff",
// //               zIndex: 48,
// //               overflowY: "auto",
// //               padding: "20px 16px",
// //               borderTop: `2px solid ${NAVY}`,
// //               animation: "slideDown 0.2s ease both",
// //             }}
// //           >
// //             <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
// //               <a href="#/products" onClick={() => goTo("#/products")}
// //                 style={{
// //                   padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
// //                   borderBottom: "1px solid #eee", fontFamily: ff, textDecoration: "none",
// //                   letterSpacing: "0.1em"
// //                 }}>
// //                 PRODUCTS
// //               </a>
// //               {NAV_LINKS.map((link) => (
// //                 <div key={link.label}>
// //                   {link.mega ? (
// //                     <>
// //                       <div
// //                         onClick={() => setMegaOpen(megaOpen === link.label ? null : link.label)}
// //                         style={{
// //                           padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
// //                           borderBottom: "1px solid #eee", fontFamily: ff,
// //                           display: "flex", justifyContent: "space-between", alignItems: "center",
// //                           cursor: "pointer", letterSpacing: "0.1em"
// //                         }}
// //                       >
// //                         {link.label}
// //                         <span style={{ fontSize: 18, color: NAVY }}>
// //                           {megaOpen === link.label ? "−" : "+"}
// //                         </span>
// //                       </div>
// //                       {megaOpen === link.label && (
// //                         <div style={{ padding: "8px 0 12px 16px" }}>
// //                           {link.mega.cols.map((col) => (
// //                             <div key={col.title} style={{ marginBottom: 12 }}>
// //                               <div style={{ fontSize: 11, fontWeight: 900, color: NAVY, marginBottom: 6, letterSpacing: "0.1em" }}>
// //                                 {col.title}
// //                               </div>
// //                               <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
// //                                 {col.links.map((sub) => (
// //                                   <li key={sub.label}>
// //                                     <a href={buildProductsLink(sub.to)}
// //                                       onClick={() => { goTo(buildProductsLink(sub.to)); }}
// //                                       style={{
// //                                         display: "block", padding: "6px 0", fontSize: 13,
// //                                         color: "#333", textDecoration: "none", fontFamily: ff,
// //                                         letterSpacing: "0.04em"
// //                                       }}
// //                                     >
// //                                       {sub.label}
// //                                     </a>
// //                                   </li>
// //                                 ))}
// //                               </ul>
// //                             </div>
// //                           ))}
// //                           {link.mega.panels.map((panel) => (
// //                             <a key={panel.label} href={buildProductsLink(panel.to)}
// //                               onClick={() => goTo(buildProductsLink(panel.to))}
// //                               style={{
// //                                 display: "block", background: panel.bg, padding: "10px 12px",
// //                                 marginTop: 8, fontSize: 13, fontWeight: 900, color: panel.dark ? "#fff" : NAVY,
// //                                 textDecoration: "none", textAlign: "center", border: `1px solid ${NAVY}`,
// //                                 letterSpacing: "0.1em"
// //                               }}
// //                             >
// //                               {panel.label}
// //                             </a>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </>
// //                   ) : (
// //                     <button onClick={() => { if (link.label === "STORY") goTo("#/story"); }}
// //                       style={{
// //                         padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
// //                         borderBottom: "1px solid #eee", fontFamily: ff,
// //                         display: "flex", justifyContent: "space-between", alignItems: "center",
// //                         cursor: "pointer", width: "100%", textAlign: "left", background: "none",
// //                         border: "none", borderBottom: "1px solid #eee", letterSpacing: "0.1em"
// //                       }}
// //                     >
// //                       {link.label}
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Desktop Mega Menu */}
// //         {!isMobile && megaOpen && activeNav?.mega && (
// //           <div onMouseEnter={() => openMega(megaOpen)} onMouseLeave={closeMega}
// //             style={{
// //               position: "absolute", top: "100%", left: 0, right: 0, background: "#fff",
// //               borderTop: `2px solid ${NAVY}`, boxShadow: "0 12px 40px rgba(12,44,65,0.12)",
// //               zIndex: 50, animation: "slideDown 0.18s ease both"
// //             }}>
// //             <div style={{
// //               maxWidth: 1400, margin: "0 auto", padding: isTablet ? "24px 20px" : "32px 40px",
// //               display: "grid",
// //               gridTemplateColumns: `repeat(${activeNav.mega.cols.length}, 1fr) ${activeNav.mega.panels.length * 160}px`,
// //               gap: 0
// //             }}>
// //               {activeNav.mega.cols.map((col) => (
// //                 <div key={col.title} style={{ paddingRight: 24 }}>
// //                   <div style={{
// //                     fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: NAVY,
// //                     marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
// //                     paddingBottom: 8, display: "inline-block"
// //                   }}>
// //                     {col.title}
// //                   </div>
// //                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
// //                     {col.links.map((link) => (
// //                       <li key={link.label}>
// //                         <a href={buildProductsLink(link.to)}
// //                           onClick={() => setMegaOpen(null)}
// //                           style={{
// //                             fontSize: 12, color: "#333", textDecoration: "none",
// //                             letterSpacing: "0.06em", fontFamily: ff, fontWeight: 700, transition: "color 0.15s"
// //                           }}
// //                           onMouseEnter={(e) => (e.target.style.color = NAVY)}
// //                           onMouseLeave={(e) => (e.target.style.color = "#333")}>
// //                           {link.label}
// //                         </a>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ))}
// //               <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
// //                 {activeNav.mega.panels.map((panel, pi) => (
// //                   <a key={pi} href={buildProductsLink(panel.to)}
// //                     onClick={() => setMegaOpen(null)}
// //                     style={{
// //                       width: 148, height: 180, background: panel.bg, cursor: "pointer",
// //                       position: "relative", display: "flex", alignItems: "flex-end",
// //                       padding: 12, border: `1.5px solid ${NAVY}`, textDecoration: "none"
// //                     }}>
// //                     <div style={{
// //                       position: "absolute", top: "30%", left: "50%",
// //                       transform: "translate(-50%,-50%)", opacity: 0.3
// //                     }}>
// //                       <svg width="80" height="44" viewBox="0 0 120 66" fill="none">
// //                         <ellipse cx="30" cy="33" rx="25" ry="22"
// //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
// //                         <ellipse cx="90" cy="33" rx="25" ry="22"
// //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
// //                         <line x1="55" y1="33" x2="65" y2="33"
// //                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="3" strokeLinecap="round" />
// //                       </svg>
// //                     </div>
// //                     <div style={{
// //                       fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
// //                       color: panel.dark ? "#fff" : NAVY, fontFamily: ff, position: "relative", zIndex: 1
// //                     }}>
// //                       {panel.label}
// //                     </div>
// //                   </a>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </header>

// //       {/* Main Content */}
// //       <main><OpticsStudio /></main>

// //       {/* Footer */}
// //       <footer style={{ background: BLACK, color: "#fff", fontFamily: ff }}>
// //         {/* Newsletter */}
// //         <div style={{
// //           borderBottom: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
// //           padding: isMobile ? "32px 20px" : "52px 40px",
// //           display: "flex", flexWrap: "wrap",
// //           justifyContent: "space-between", alignItems: "center", gap: 28
// //         }}>
// //           <div>
// //             <div style={{
// //               fontFamily: ff, fontSize: isMobile ? 18 : 22, fontWeight: 900,
// //               letterSpacing: "0.04em", marginBottom: 6, color: "#fff"
// //             }}>
// //               JOIN THE FAMILY
// //             </div>
// //             <div style={{
// //               fontSize: isMobile ? 12 : 13, color: "#6aadcc",
// //               letterSpacing: "0.03em", fontFamily: "'Courier New',Courier,monospace"
// //             }}>
// //               Get 10% off your first order — exclusive drops &amp; style guides.
// //             </div>
// //           </div>
// //           <div style={{ display: "flex", maxWidth: 400, width: "100%" }}>
// //             <input type="email" placeholder="Your email address"
// //               style={{
// //                 flex: 1, background: "#0e1f2e", border: `1px solid #1a3a52`, borderRight: "none",
// //                 color: "#fff", padding: "12px 16px", fontSize: isMobile ? 12 : 13, outline: "none",
// //                 letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace"
// //               }} />
// //             <button style={{
// //               background: NAVY, color: ACCENT, border: `1px solid ${NAVY}`,
// //               padding: "12px 18px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
// //               letterSpacing: "0.14em", cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff
// //             }}>
// //               SUBSCRIBE
// //             </button>
// //           </div>
// //         </div>

// //         {/* Links */}
// //         <div style={{
// //           maxWidth: 1400, margin: "0 auto",
// //           padding: isMobile ? "32px 20px" : "56px 40px",
// //           display: "grid",
// //           gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
// //           gap: isMobile ? 28 : 44
// //         }}>
// //           <div>
// //             <div style={{
// //               fontFamily: ff, fontSize: isMobile ? 18 : 22, fontWeight: 900,
// //               letterSpacing: "0.06em", marginBottom: 2, color: "#fff"
// //             }}>
// //               URBAN EYE
// //             </div>
// //             <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "#3a6a8a", marginBottom: 16 }}>
// //               EST. 2015 · KARACHI
// //             </div>
// //             <div style={{ width: 36, height: 3, background: NAVY, marginBottom: 16 }} />
// //             <div style={{ borderLeft: `2px solid #1a3a52`, paddingLeft: 14, marginBottom: 20 }}>
// //               <p style={{
// //                 fontSize: isMobile ? 12 : 13, color: "#6aadcc", lineHeight: 1.8, margin: 0,
// //                 fontStyle: "italic", fontFamily: "'Courier New',Courier,monospace"
// //               }}>
// //                 "Your vision is our concern."
// //               </p>
// //               <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#3a6a8a", marginTop: 8, fontFamily: ff }}>
// //                 TARIQ HASSAN · FOUNDER
// //               </div>
// //             </div>
// //             <p style={{
// //               fontSize: isMobile ? 12 : 13, color: "#5a8aaa", lineHeight: 1.8, maxWidth: 260,
// //               marginBottom: 20, fontFamily: "'Courier New',Courier,monospace"
// //             }}>
// //               Premium eyewear for those who see the world differently. Karachi's destination for iconic frames since 2015.
// //             </p>
// //             <div style={{ display: "flex", gap: 8 }}>
// //               {["IG", "FB", "TT", "YT"].map((s) => (
// //                 <a key={s} href="#"
// //                   style={{
// //                     width: 32, height: 32, border: `1px solid #1a3a52`, display: "flex",
// //                     alignItems: "center", justifyContent: "center", color: "#5a8aaa",
// //                     fontSize: 10, textDecoration: "none", fontFamily: ff, fontWeight: 900,
// //                     letterSpacing: "0.05em", transition: "border-color 0.2s, color 0.2s"
// //                   }}
// //                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
// //                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; e.currentTarget.style.color = "#5a8aaa"; }}>
// //                   {s}
// //                 </a>
// //               ))}
// //             </div>
// //           </div>
// //           <FooterCol title="SHOP" links={["Eyeglasses", "Sunglasses", "Reading Glasses", "New Arrivals", "Best Sellers", "Virtual Try-On", "Custom Tints™"]} />
// //           <FooterCol title="HELP" links={["Shipping & Returns", "Frame Sizing Guide", "Prescription Info", "Contact Us", "Store Locator", "FAQ", "Repairs"]} />
// //           <FooterCol title="COMPANY" links={["Our Story", "Craftsmanship", "Careers", "Press", "Sustainability", "Affiliates", "Gift Cards"]} />
// //         </div>

// //         {/* Bottom bar */}
// //         <div style={{
// //           borderTop: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
// //           padding: isMobile ? "12px 20px" : "16px 40px",
// //           display: "flex", flexWrap: "wrap",
// //           justifyContent: "space-between", alignItems: "center", gap: 10
// //         }}>
// //           <div style={{ fontSize: isMobile ? 10 : 11, color: "#3a6a8a", letterSpacing: "0.05em", fontFamily: ff }}>
// //             © 2026 Urban Eye. All rights reserved.
// //           </div>
// //           <div style={{ display: "flex", gap: isMobile ? 12 : 18, flexWrap: "wrap" }}>
// //             {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
// //               <a key={link} href="#"
// //                 style={{
// //                   fontSize: isMobile ? 10 : 11, color: "#3a6a8a", textDecoration: "none",
// //                   letterSpacing: "0.05em", fontFamily: ff, transition: "color 0.2s"
// //                 }}
// //                 onMouseEnter={(e) => (e.target.style.color = ACCENT)}
// //                 onMouseLeave={(e) => (e.target.style.color = "#3a6a8a")}>
// //                 {link}
// //               </a>
// //             ))}
// //           </div>
// //           <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
// //             {["VISA", "MC", "AMEX", "COD"].map((card) => (
// //               <span key={card}
// //                 style={{
// //                   fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
// //                   border: `1px solid #1a3a52`, padding: "3px 7px", color: "#3a6a8a", fontFamily: ff
// //                 }}>
// //                 {card}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       </footer>

// //       {/* WhatsApp FAB */}
// //       <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
// //         style={{
// //           position: "fixed", bottom: 26, right: 26, width: isMobile ? 44 : 52,
// //           height: isMobile ? 44 : 52, borderRadius: "50%",
// //           background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
// //           boxShadow: "0 4px 20px rgba(37,211,102,0.35)", zIndex: 999,
// //           transition: "transform 0.2s", textDecoration: "none"
// //         }}
// //         onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
// //         onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// //         aria-label="Chat on WhatsApp">
// //         <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 24 24" fill="white">
// //           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
// //         </svg>
// //       </a>

// //       <style>{`
// //         * {
// //           box-sizing: border-box;
// //         }
// //         @keyframes slideDown {
// //           from { opacity: 0; transform: translateY(-8px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes cartPop {
// //           0%   { transform: scale(0.6); }
// //           70%  { transform: scale(1.2); }
// //           100% { transform: scale(1); }
// //         }
// //         button[aria-label="Search"]:hover,
// //         button[aria-label="Cart"]:hover {
// //           opacity: 0.7;
// //           transform: scale(1.05);
// //         }
// //         .auth-modal-overlay {
// //           position: fixed;
// //           top: 0; left: 0; right: 0; bottom: 0;
// //           background: rgba(0, 0, 0, 0.7);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           z-index: 1000;
// //           backdrop-filter: blur(4px);
// //         }
// //         .auth-modal-content {
// //           position: relative;
// //           max-width: 460px;
// //           width: 90%;
// //           margin: 20px;
// //           border-radius: 24px;
// //           background: transparent;
// //           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }


// // // ── DEFAULT EXPORT ────────────────────────────────────────────────────────────
// // export default function App() {
// //   return (
// //     <AuthProvider>
// //       <AppInner />
// //     </AuthProvider>
// //   );
// // }








































// // App.jsx — Updated with dynamic shape filters and navbar shape links

// import { useState, useEffect, useRef } from "react";
// import OpticsStudio from "./opticsStudio.jsx";
// import { CartProvider, useCart } from "./contexts/CardContext.jsx";
// import { useHashRouter } from "./hook/usehashrooter.js";
// import { AuthProvider, useAuth, AuthModal } from "./Auth/auth.jsx";
// import { PRODUCTS_DATA } from "./prodcut.js";
// import { searchProducts, getProductDisplayPrice, getProductVariants, formatPriceValue } from "./services/productUtils.js";

// // ─── RESPONSIVE HOOK ────────────────────────────────────────────────────────
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

// // ─── THEME COLOURS ───────────────────────────────────────────────────────────
// const NAVY = "#0c2c41";
// const ACCENT = "#89c4e1";
// const BLACK = "#0a1628";
// // ─────────────────────────────────────────────────────────────────────────────

// // ─── HELPER: Get unique shapes from products (optional category filter) ──
// function getUniqueShapes(products, categoryFilter = null) {
//   const shapeSet = new Set();
//   products.forEach(p => {
//     if (p.shape && p.shape.trim()) {
//       // If categoryFilter provided, check if product matches that category (normalized)
//       if (categoryFilter) {
//         const cat = p.category || "";
//         if (cat.toLowerCase() === categoryFilter.toLowerCase()) {
//           shapeSet.add(p.shape.trim());
//         }
//       } else {
//         shapeSet.add(p.shape.trim());
//       }
//     }
//   });
//   return Array.from(shapeSet).sort();
// }

// // ─── NAV LINKS — data-driven; shape links are now generated dynamically ──
// // We keep the structure but remove hardcoded shape links; they will be injected later.
// const NAV_LINKS_BASE = [
//   {
//     label: "EYEGLASSES",
//     mega: {
//       cols: [
//         {
//           title: "EYEGLASSES",
//           links: [
//             { label: "SHOP ALL", to: { category: "Eyeglasses" } },
//             { label: "MEN'S", to: { category: "Eyeglasses", gender: "Men" } },
//             { label: "WOMEN'S", to: { category: "Eyeglasses", gender: "Women" } },
//             { label: "UNISEX", to: { category: "Eyeglasses", gender: "Unisex" } },
//           ],
//         },
//         {
//           title: "SHOP BY SHAPE",
//           // This will be filled dynamically with shape links
//           links: [],
//         },
//       ],
//       panels: [
//         { label: "SHOP ALL EYEGLASSES", bg: "#e8f2f8", to: { category: "Eyeglasses" } },
//       ],
//     },
//   },
//   {
//     label: "SUNGLASSES",
//     mega: {
//       cols: [
//         {
//           title: "SUNGLASSES",
//           links: [
//             { label: "SHOP ALL", to: { category: "Sunglasses" } },
//             { label: "MEN'S", to: { category: "Sunglasses", gender: "Men" } },
//             { label: "WOMEN'S", to: { category: "Sunglasses", gender: "Women" } },
//             { label: "UNISEX", to: { category: "Sunglasses", gender: "Unisex" } },
//           ],
//         },
//         {
//           title: "SHOP BY SHAPE",
//           links: [],
//         },
//       ],
//       panels: [
//         { label: "SHOP ALL SUNGLASSES", bg: "#e8f2f8", to: { category: "Sunglasses" } },
//       ],
//     },
//   },
//   {
//     label: "COLLECTIONS",
//     mega: {
//       cols: [
//         {
//           title: "COLLECTIONS",
//           links: [
//             { label: "NEW ARRIVALS", to: { tag: "NEW" } },
//             { label: "FEATURED", to: { tag: "BEST SELLER" } },
//           ],
//         },
//       ],
//       panels: [
//         { label: "VIEW ALL FRAMES", bg: "#0c2c41", dark: true, to: {} },
//       ],
//     },
//   },
//   { label: "STORY", mega: null },
// ];

// // ─── Build a products link with query params ──────────────────────────────
// function buildProductsLink(to) {
//   const params = new URLSearchParams(to || {});
//   const qs = params.toString();
//   return qs ? `#/products?${qs}` : "#/products";
// }

// // ─── Generate dynamic shape links for a given category ────────────────────
// function getShapeLinksForCategory(category) {
//   const shapes = getUniqueShapes(PRODUCTS_DATA, category);
//   return shapes.map(shape => ({
//     label: shape.toUpperCase(),
//     to: { category, shape },
//   }));
// }

// // ─── Inject dynamic shape links into NAV_LINKS ────────────────────────────
// function buildNavLinks() {
//   const links = JSON.parse(JSON.stringify(NAV_LINKS_BASE));
//   // Eyeglasses shapes
//   const eyeglassesShapes = getShapeLinksForCategory("Eyeglasses");
//   // Sunglasses shapes
//   const sunglassesShapes = getShapeLinksForCategory("Sunglasses");

//   // Find the "EYEGLASSES" entry and set its shape links
//   const eyeglassesEntry = links.find(item => item.label === "EYEGLASSES");
//   if (eyeglassesEntry && eyeglassesEntry.mega) {
//     const shapeCol = eyeglassesEntry.mega.cols.find(col => col.title === "SHOP BY SHAPE");
//     if (shapeCol) {
//       shapeCol.links = eyeglassesShapes;
//     }
//   }

//   const sunglassesEntry = links.find(item => item.label === "SUNGLASSES");
//   if (sunglassesEntry && sunglassesEntry.mega) {
//     const shapeCol = sunglassesEntry.mega.cols.find(col => col.title === "SHOP BY SHAPE");
//     if (shapeCol) {
//       shapeCol.links = sunglassesShapes;
//     }
//   }

//   return links;
// }

// const NAV_LINKS = buildNavLinks();

// // ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
// const ANNOUNCEMENTS = [
//   "FREE SHIPPING ACROSS PAKISTAN ON ALL ORDERS",
//   "NEW SPRING 2026 COLLECTION — SHOP NOW",
//   "20+ CUSTOM MADE TINTS™ — HANDCRAFTED FOR YOU",
// ];

// const ff = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";

// const iconBtn = {
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   padding: "10px",
//   minWidth: "40px",
//   minHeight: "40px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   transition: "opacity 0.2s, transform 0.2s",
//   borderRadius: "50%",
// };

// // ─── FOOTER COLUMN ────────────────────────────────────────────────────────────
// function FooterCol({ title, links }) {
//   return (
//     <div>
//       <div style={{
//         fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#6aadcc",
//         marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
//         paddingBottom: 8, display: "inline-block"
//       }}>
//         {title}
//       </div>
//       <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
//         {links.map((link) => (
//           <li key={link}>
//             <a href="#" style={{
//               fontSize: 13, color: "#7fa8bc", textDecoration: "none",
//               letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace", transition: "color 0.2s"
//             }}
//               onMouseEnter={(e) => (e.target.style.color = ACCENT)}
//               onMouseLeave={(e) => (e.target.style.color = "#7fa8bc")}>
//               {link}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // ─── ACCOUNT BUTTON WITH AVATAR ──────────────────────────────────────────────
// function AccountBtn({ onOpenModal, navigate }) {
//   const { user, logout } = useAuth();
//   const [hover, setHover] = useState(false);
//   const [dropOpen, setDropOpen] = useState(false);
//   const closeTimer = useRef(null);

//   const handleMouseEnter = () => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     setDropOpen(true);
//   };

//   const handleMouseLeave = () => {
//     closeTimer.current = setTimeout(() => setDropOpen(false), 80);
//   };

//   const getInitial = () => {
//     const name = user?.name || user?.fullName || "";
//     return name.charAt(0).toUpperCase();
//   };

//   const getAvatarColor = () => {
//     const name = user?.name || user?.fullName || "";
//     const colors = ["#1a4a6b", "#2a6a9a", "#3a8aba", "#4aa0d0", "#5ab0e0", "#0c2c41"];
//     let hash = 0;
//     for (let i = 0; i < name.length; i++) {
//       hash = ((hash << 5) - hash) + name.charCodeAt(i);
//       hash |= 0;
//     }
//     return colors[Math.abs(hash) % colors.length];
//   };

//   if (user) {
//     return (
//       <div
//         style={{ position: "relative" }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <button
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}
//           title={`Signed in as ${user.name || user.fullName}`}
//           style={{
//             background: hover ? "#f0f7fc" : "none",
//             border: `1.5px solid ${NAVY}`,
//             cursor: "pointer",
//             padding: "4px 8px 4px 4px",
//             color: NAVY,
//             fontSize: 11,
//             fontWeight: 700,
//             letterSpacing: "0.08em",
//             fontFamily: ff,
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             borderRadius: 40,
//             transition: "background 0.15s",
//           }}>
//           <div style={{
//             width: 28,
//             height: 28,
//             borderRadius: "50%",
//             background: getAvatarColor(),
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "#fff",
//             fontSize: 13,
//             fontWeight: 700,
//             fontFamily: ff,
//           }}>
//             {getInitial()}
//           </div>
//           <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
//             <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//         </button>

//         {dropOpen && (
//           <div
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             style={{
//               position: "absolute",
//               top: "100%",
//               right: 0,
//               paddingTop: 8,
//               zIndex: 100,
//             }}
//           >
//             <div style={{
//               background: "#fff",
//               border: `1.5px solid ${NAVY}`,
//               boxShadow: "0 8px 24px rgba(12,44,65,0.12)",
//               minWidth: 180,
//             }}>
//               {[
//                 { label: "MY DASHBOARD", hash: "#/dashboard" },
//                 { label: "MY ORDERS", hash: "#/dashboard?tab=orders" },
//                 { label: "WISHLIST", hash: "#/wishlist" },
//                 { label: "ADDRESSES", hash: "#/dashboard?tab=addresses" },
//               ].map(item => (
//                 <button
//                   key={item.label}
//                   onClick={() => { navigate(item.hash); setDropOpen(false); }}
//                   style={{
//                     display: "block", width: "100%", textAlign: "left",
//                     background: "none", border: "none", borderBottom: "1px solid #f0f0f0",
//                     padding: "11px 16px", fontSize: 11, fontWeight: 700,
//                     letterSpacing: "0.1em", color: NAVY, cursor: "pointer",
//                     fontFamily: ff, transition: "background 0.15s",
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = "#f0f7fc"}
//                   onMouseLeave={e => e.currentTarget.style.background = "none"}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               <button
//                 onClick={() => { logout(); navigate("#/"); setDropOpen(false); }}
//                 style={{
//                   display: "block", width: "100%", textAlign: "left",
//                   background: "none", border: "none", padding: "11px 16px",
//                   fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
//                   color: "#c0392b", cursor: "pointer", fontFamily: ff,
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
//                 onMouseLeave={e => e.currentTarget.style.background = "none"}
//               >
//                 SIGN OUT
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Not logged in
//   return (
//     <button style={iconBtn} aria-label="Account" onClick={onOpenModal}>
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
//         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     </button>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// // INNER APP
// // ════════════════════════════════════════════════════════════════════════════
// function AppInner() {
//   const { user, checked } = useAuth();

//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");

//   const [annIdx, setAnnIdx] = useState(0);
//   const [annVisible, setAnnVisible] = useState(true);
//   const [megaOpen, setMegaOpen] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchVal, setSearchVal] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [authModalOpen, setAuthModalOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const megaTimer = useRef(null);

//   const { route, navigate } = useHashRouter();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [route]);

//   useEffect(() => {
//     const t = setInterval(() => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
//     return () => clearInterval(t);
//   }, []);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 8);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   useEffect(() => {
//     const readCart = () => {
//       try {
//         const items = JSON.parse(localStorage.getItem("os_cart") || "[]");
//         setCartCount(items.reduce((s, i) => s + i.qty, 0));
//       } catch { setCartCount(0); }
//     };
//     readCart();
//     const onCartUpdate = (e) => setCartCount(e.detail.reduce((s, i) => s + i.qty, 0));
//     window.addEventListener("cartUpdated", onCartUpdate);
//     window.addEventListener("storage", readCart);
//     return () => {
//       window.removeEventListener("cartUpdated", onCartUpdate);
//       window.removeEventListener("storage", readCart);
//     };
//   }, []);

//   useEffect(() => {
//     if (user && authModalOpen) setAuthModalOpen(false);
//   }, [user, authModalOpen]);

//   const openMega = (label) => { clearTimeout(megaTimer.current); setMegaOpen(label); };
//   const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 130); };
//   const activeNav = NAV_LINKS.find((n) => n.label === megaOpen);
//   const goTo = (hash) => { navigate(hash); setMobileMenuOpen(false); setMegaOpen(null); };

//   // Live product suggestions for the navbar search
//   const searchSuggestions = searchVal.trim() ? searchProducts(PRODUCTS_DATA, searchVal, 6) : [];
//   const closeSearch = () => { setSearchOpen(false); setSearchVal(""); };
//   const submitSearch = () => {
//     const q = searchVal.trim();
//     if (!q) return;
//     goTo(`#/products?q=${encodeURIComponent(q)}`);
//     closeSearch();
//   };
//   const openProduct = (id) => { goTo(`#/products/${id}`); closeSearch(); };
//   const suggestionImage = (p) =>
//     getProductVariants(p)[0]?.image || p.image || p.gallery?.[0] || "";

//   if (!checked) return null;

//   return (
//     <div style={{ fontFamily: ff, background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

//       {/* Auth Modal */}
//       <AuthModal
//         isOpen={authModalOpen}
//         onClose={() => setAuthModalOpen(false)}
//       />

//       {/* Announcement Bar */}
//       {annVisible && (
//         <div style={{
//           background: NAVY, color: ACCENT, textAlign: "center",
//           marginTop: isMobile ? 56 : 60,
//           fontSize: isMobile ? 10 : 11,
//           letterSpacing: "0.14em", padding: isMobile ? "6px 16px" : "9px 48px",
//           position: "relative", fontFamily: ff
//         }}>
//           {ANNOUNCEMENTS[annIdx]}
//           <button onClick={() => setAnnVisible(false)}
//             style={{
//               position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
//               background: "none", border: "none", color: ACCENT, cursor: "pointer",
//               fontSize: isMobile ? 16 : 20, lineHeight: 1
//             }}>
//             ×
//           </button>
//         </div>
//       )}

//       {/* Navbar */}
//       <header style={{
//         width: "100%",
//         background: "#fff",
//         borderBottom: `3px solid ${NAVY}`,
//         boxShadow: scrolled ? "0 2px 20px rgba(12,44,65,0.12)" : "none",
//         transition: "box-shadow 0.3s",
//         position: "fixed",
//         top: 0,
//         zIndex: 49,
//       }}>
//         <div style={{
//           maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 12px" : "0 24px",
//           height: isMobile ? 56 : 62,
//           display: "flex", alignItems: "center", justifyContent: "space-between", gap: isMobile ? 8 : 12
//         }}>

//           {/* Logo */}
//           <a href="#/" style={{ textDecoration: "none", flexShrink: 0 }}>
//             <img src="./logo.jpeg" alt="Urban Eye" style={{ height: isMobile ? 38 : 50, width: "auto" }} />
//           </a>

//           {/* Nav Links — hidden on mobile */}
//           {!isMobile && (
//             <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }}>
//               <a href="#/products"
//                 style={{
//                   background: "none", border: "none", fontSize: 12, fontWeight: 900,
//                   letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
//                   color: BLACK, fontFamily: ff,
//                   borderBottom: window.location.hash === "#/products" ? `3px solid ${NAVY}` : "3px solid transparent",
//                   transition: "border-color 0.2s", display: "flex", alignItems: "center", textDecoration: "none"
//                 }}>
//                 PRODUCTS
//               </a>
//               {NAV_LINKS.map((link) => (
//                 <div key={link.label}
//                   onMouseEnter={() => (link.mega ? openMega(link.label) : null)}
//                   onMouseLeave={link.mega ? closeMega : null}
//                   style={{ position: "relative" }}>
//                   <button
//                     onClick={() => {
//                       if (link.label === "STORY") goTo("#/story");
//                     }}
//                     style={{
//                       background: "none", border: "none", fontSize: 12, fontWeight: 900,
//                       letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
//                       color: BLACK, fontFamily: ff,
//                       borderBottom: megaOpen === link.label ? `3px solid ${NAVY}` : "3px solid transparent",
//                       transition: "border-color 0.2s", display: "flex", alignItems: "center", gap: 4
//                     }}>
//                     {link.label}
//                     {link.mega && (
//                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
//                         <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               ))}
//             </nav>
//           )}

//           {/* Right icons */}
//           <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 14, flexShrink: 0 }}>

//             {/* Hamburger (mobile) */}
//             {isMobile && (
//               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={iconBtn} aria-label="Menu">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
//                   {mobileMenuOpen ? (
//                     <line x1="18" y1="6" x2="6" y2="18" />
//                   ) : (
//                     <line x1="3" y1="12" x2="21" y2="12" />
//                   )}
//                   {mobileMenuOpen ? (
//                     <line x1="6" y1="6" x2="18" y2="18" />
//                   ) : (
//                     <>
//                       <line x1="3" y1="6" x2="21" y2="6" />
//                       <line x1="3" y1="18" x2="21" y2="18" />
//                     </>
//                   )}
//                 </svg>
//               </button>
//             )}

//             {/* Account */}
//             <AccountBtn onOpenModal={() => setAuthModalOpen(true)} navigate={goTo} />

//             {/* Search */}
//             <button onClick={() => setSearchOpen((v) => !v)} style={iconBtn} aria-label="Search">
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
//                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </button>

//             {/* Cart */}
//             <button onClick={() => goTo("#/cart")}
//               style={{ ...iconBtn, position: "relative" }} aria-label="Cart">
//               <img
//                 src="../icon.png"
//                 alt="Cart"
//                 style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, objectFit: "contain" }}
//               />
//               {cartCount > 0 && (
//                 <span style={{
//                   position: "absolute", top: -8, right: -8, width: 18, height: 18,
//                   borderRadius: "50%", background: NAVY, color: "#fff",
//                   fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center",
//                   justifyContent: "center", fontFamily: ff, animation: "cartPop 0.25s ease"
//                 }}>
//                   {cartCount > 99 ? "99+" : cartCount}
//                 </span>
//               )}
//             </button>

//             {/* Shop Now — hidden on mobile */}
//             {!isMobile && (
//               <button onClick={() => goTo("#/products")}
//                 style={{
//                   background: NAVY, color: "#fff", border: "none", borderRadius: 0,
//                   padding: "10px 20px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
//                   cursor: "pointer", fontFamily: ff, marginLeft: 4, transition: "opacity 0.18s"
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
//                 onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
//                 SHOP NOW
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Search Bar */}
//         {searchOpen && (
//           <div style={{
//             background: "#f0f8fc", borderTop: `2px solid ${NAVY}`,
//             padding: isMobile ? "10px 12px" : "12px 24px",
//             animation: "slideDown 0.2s ease both"
//           }}>
//             <div style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}>
//               <svg style={{ position: "absolute", left: 13, top: 18, color: "#6aadcc" }}
//                 width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//                 <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//               <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") submitSearch();
//                   else if (e.key === "Escape") closeSearch();
//                 }}
//                 placeholder="Search by name or price — e.g. “Alex” or “under 8000”"
//                 style={{
//                   width: "100%", padding: "11px 36px 11px 38px", border: `1.5px solid ${NAVY}`,
//                   fontSize: isMobile ? 12 : 13, letterSpacing: "0.02em", outline: "none", background: "#fff",
//                   color: BLACK, fontFamily: "'Courier New',Courier,monospace", boxSizing: "border-box"
//                 }} />
//               {searchVal && (
//                 <button onClick={() => setSearchVal("")}
//                   style={{
//                     position: "absolute", right: 12, top: 8,
//                     background: "none", border: "none", cursor: "pointer", color: "#6aadcc", fontSize: 18
//                   }}>×</button>
//               )}

//               {/* Live product suggestions */}
//               {searchVal.trim() && (
//                 <div style={{
//                   marginTop: 6, background: "#fff", border: `1.5px solid ${NAVY}`,
//                   boxShadow: "0 12px 30px rgba(12,44,65,0.15)", maxHeight: "60vh", overflowY: "auto"
//                 }}>
//                   {searchSuggestions.length > 0 ? (
//                     <>
//                       {searchSuggestions.map((p) => {
//                         const { price, discountPrice } = getProductDisplayPrice(p);
//                         const onSale = discountPrice < price;
//                         return (
//                           <button key={p.id} onClick={() => openProduct(p.id)}
//                             style={{
//                               display: "flex", alignItems: "center", gap: 12, width: "100%",
//                               padding: "10px 12px", background: "none", border: "none",
//                               borderBottom: "1px solid #eef4f8", cursor: "pointer", textAlign: "left"
//                             }}
//                             onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f8fc")}
//                             onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
//                             <div style={{
//                               width: 46, height: 46, flexShrink: 0, background: "#f5f5f0",
//                               border: "1px solid #e8e0d0", display: "flex", alignItems: "center", justifyContent: "center"
//                             }}>
//                               <img src={suggestionImage(p)} alt={p.name} loading="lazy"
//                                 style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />
//                             </div>
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                               <div style={{
//                                 fontSize: 13, fontWeight: 900, color: BLACK, fontFamily: ff,
//                                 letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
//                               }}>{p.name}</div>
//                               <div style={{ fontSize: 11, color: "#7a8a95", fontFamily: "'Courier New',Courier,monospace" }}>
//                                 {p.category}{p.subcategory ? ` · ${p.subcategory}` : ""}
//                               </div>
//                             </div>
//                             <div style={{ flexShrink: 0, textAlign: "right", fontFamily: ff }}>
//                               <span style={{ fontSize: 13, fontWeight: 900, color: NAVY }}>PKR {formatPriceValue(discountPrice)}</span>
//                               {onSale && (
//                                 <div style={{ fontSize: 10, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</div>
//                               )}
//                             </div>
//                           </button>
//                         );
//                       })}
//                       <button onClick={submitSearch}
//                         style={{
//                           display: "block", width: "100%", padding: "11px 12px", background: "#f0f8fc",
//                           border: "none", cursor: "pointer", fontSize: 11, fontWeight: 900,
//                           letterSpacing: "0.12em", color: NAVY, fontFamily: ff
//                         }}>
//                         SEE ALL RESULTS FOR “{searchVal.trim().toUpperCase()}” →
//                       </button>
//                     </>
//                   ) : (
//                     <div style={{ padding: "16px 14px", fontSize: 12, color: "#7a8a95", fontFamily: "'Courier New',Courier,monospace" }}>
//                       No frames found for “{searchVal.trim()}”.
//                       <button onClick={submitSearch}
//                         style={{ marginLeft: 6, background: "none", border: "none", color: NAVY, fontWeight: 900, cursor: "pointer", fontFamily: ff }}>
//                         Browse all →
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Mobile Menu Overlay */}
//         {isMobile && mobileMenuOpen && (
//           <div
//             style={{
//               position: "fixed",
//               top: isMobile ? 56 : 62,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "#fff",
//               zIndex: 48,
//               overflowY: "auto",
//               padding: "20px 16px",
//               borderTop: `2px solid ${NAVY}`,
//               animation: "slideDown 0.2s ease both",
//             }}
//           >
//             <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//               <a href="#/products" onClick={() => goTo("#/products")}
//                 style={{
//                   padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
//                   borderBottom: "1px solid #eee", fontFamily: ff, textDecoration: "none",
//                   letterSpacing: "0.1em"
//                 }}>
//                 PRODUCTS
//               </a>
//               {NAV_LINKS.map((link) => (
//                 <div key={link.label}>
//                   {link.mega ? (
//                     <>
//                       <div
//                         onClick={() => setMegaOpen(megaOpen === link.label ? null : link.label)}
//                         style={{
//                           padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
//                           borderBottom: "1px solid #eee", fontFamily: ff,
//                           display: "flex", justifyContent: "space-between", alignItems: "center",
//                           cursor: "pointer", letterSpacing: "0.1em"
//                         }}
//                       >
//                         {link.label}
//                         <span style={{ fontSize: 18, color: NAVY }}>
//                           {megaOpen === link.label ? "−" : "+"}
//                         </span>
//                       </div>
//                       {megaOpen === link.label && (
//                         <div style={{ padding: "8px 0 12px 16px" }}>
//                           {link.mega.cols.map((col) => (
//                             <div key={col.title} style={{ marginBottom: 12 }}>
//                               <div style={{ fontSize: 11, fontWeight: 900, color: NAVY, marginBottom: 6, letterSpacing: "0.1em" }}>
//                                 {col.title}
//                               </div>
//                               <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//                                 {col.links.map((sub) => (
//                                   <li key={sub.label}>
//                                     <a href={buildProductsLink(sub.to)}
//                                       onClick={() => { goTo(buildProductsLink(sub.to)); }}
//                                       style={{
//                                         display: "block", padding: "6px 0", fontSize: 13,
//                                         color: "#333", textDecoration: "none", fontFamily: ff,
//                                         letterSpacing: "0.04em"
//                                       }}
//                                     >
//                                       {sub.label}
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                           {link.mega.panels.map((panel) => (
//                             <a key={panel.label} href={buildProductsLink(panel.to)}
//                               onClick={() => goTo(buildProductsLink(panel.to))}
//                               style={{
//                                 display: "block", background: panel.bg, padding: "10px 12px",
//                                 marginTop: 8, fontSize: 13, fontWeight: 900, color: panel.dark ? "#fff" : NAVY,
//                                 textDecoration: "none", textAlign: "center", border: `1px solid ${NAVY}`,
//                                 letterSpacing: "0.1em"
//                               }}
//                             >
//                               {panel.label}
//                             </a>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <button onClick={() => { if (link.label === "STORY") goTo("#/story"); }}
//                       style={{
//                         padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
//                         borderBottom: "1px solid #eee", fontFamily: ff,
//                         display: "flex", justifyContent: "space-between", alignItems: "center",
//                         cursor: "pointer", width: "100%", textAlign: "left", background: "none",
//                         border: "none", borderBottom: "1px solid #eee", letterSpacing: "0.1em"
//                       }}
//                     >
//                       {link.label}
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Desktop Mega Menu */}
//         {!isMobile && megaOpen && activeNav?.mega && (
//           <div onMouseEnter={() => openMega(megaOpen)} onMouseLeave={closeMega}
//             style={{
//               position: "absolute", top: "100%", left: 0, right: 0, background: "#fff",
//               borderTop: `2px solid ${NAVY}`, boxShadow: "0 12px 40px rgba(12,44,65,0.12)",
//               zIndex: 50, animation: "slideDown 0.18s ease both"
//             }}>
//             <div style={{
//               maxWidth: 1400, margin: "0 auto", padding: isTablet ? "24px 20px" : "32px 40px",
//               display: "grid",
//               gridTemplateColumns: `repeat(${activeNav.mega.cols.length}, 1fr) ${activeNav.mega.panels.length * 160}px`,
//               gap: 0
//             }}>
//               {activeNav.mega.cols.map((col) => (
//                 <div key={col.title} style={{ paddingRight: 24 }}>
//                   <div style={{
//                     fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: NAVY,
//                     marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
//                     paddingBottom: 8, display: "inline-block"
//                   }}>
//                     {col.title}
//                   </div>
//                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
//                     {col.links.map((link) => (
//                       <li key={link.label}>
//                         <a href={buildProductsLink(link.to)}
//                           onClick={() => setMegaOpen(null)}
//                           style={{
//                             fontSize: 12, color: "#333", textDecoration: "none",
//                             letterSpacing: "0.06em", fontFamily: ff, fontWeight: 700, transition: "color 0.15s"
//                           }}
//                           onMouseEnter={(e) => (e.target.style.color = NAVY)}
//                           onMouseLeave={(e) => (e.target.style.color = "#333")}>
//                           {link.label}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//               <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
//                 {activeNav.mega.panels.map((panel, pi) => (
//                   <a key={pi} href={buildProductsLink(panel.to)}
//                     onClick={() => setMegaOpen(null)}
//                     style={{
//                       width: 148, height: 180, background: panel.bg, cursor: "pointer",
//                       position: "relative", display: "flex", alignItems: "flex-end",
//                       padding: 12, border: `1.5px solid ${NAVY}`, textDecoration: "none"
//                     }}>
//                     <div style={{
//                       position: "absolute", top: "30%", left: "50%",
//                       transform: "translate(-50%,-50%)", opacity: 0.3
//                     }}>
//                       <svg width="80" height="44" viewBox="0 0 120 66" fill="none">
//                         <ellipse cx="30" cy="33" rx="25" ry="22"
//                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
//                         <ellipse cx="90" cy="33" rx="25" ry="22"
//                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
//                         <line x1="55" y1="33" x2="65" y2="33"
//                           stroke={panel.dark ? ACCENT : NAVY} strokeWidth="3" strokeLinecap="round" />
//                       </svg>
//                     </div>
//                     <div style={{
//                       fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
//                       color: panel.dark ? "#fff" : NAVY, fontFamily: ff, position: "relative", zIndex: 1
//                     }}>
//                       {panel.label}
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main><OpticsStudio /></main>

//       {/* Footer */}
//       <footer style={{ background: BLACK, color: "#fff", fontFamily: ff }}>
//         {/* Newsletter */}
//         <div style={{
//           borderBottom: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
//           padding: isMobile ? "32px 20px" : "52px 40px",
//           display: "flex", flexWrap: "wrap",
//           justifyContent: "space-between", alignItems: "center", gap: 28
//         }}>
//           <div>
//             <div style={{
//               fontFamily: ff, fontSize: isMobile ? 18 : 22, fontWeight: 900,
//               letterSpacing: "0.04em", marginBottom: 6, color: "#fff"
//             }}>
//               JOIN THE FAMILY
//             </div>
//             <div style={{
//               fontSize: isMobile ? 12 : 13, color: "#6aadcc",
//               letterSpacing: "0.03em", fontFamily: "'Courier New',Courier,monospace"
//             }}>
//               Get 10% off your first order — exclusive drops &amp; style guides.
//             </div>
//           </div>
//           <div style={{ display: "flex", maxWidth: 400, width: "100%" }}>
//             <input type="email" placeholder="Your email address"
//               style={{
//                 flex: 1, background: "#0e1f2e", border: `1px solid #1a3a52`, borderRight: "none",
//                 color: "#fff", padding: "12px 16px", fontSize: isMobile ? 12 : 13, outline: "none",
//                 letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace"
//               }} />
//             <button style={{
//               background: NAVY, color: ACCENT, border: `1px solid ${NAVY}`,
//               padding: "12px 18px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
//               letterSpacing: "0.14em", cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff
//             }}>
//               SUBSCRIBE
//             </button>
//           </div>
//         </div>

//         {/* Links */}
//         <div style={{
//           maxWidth: 1400, margin: "0 auto",
//           padding: isMobile ? "32px 20px" : "56px 40px",
//           display: "grid",
//           gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
//           gap: isMobile ? 28 : 44
//         }}>
//           <div>
//             <div style={{
//               fontFamily: ff, fontSize: isMobile ? 18 : 22, fontWeight: 900,
//               letterSpacing: "0.06em", marginBottom: 2, color: "#fff"
//             }}>
//               URBAN EYE
//             </div>
//             <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "#3a6a8a", marginBottom: 16 }}>
//               EST. 2015 · KARACHI
//             </div>
//             <div style={{ width: 36, height: 3, background: NAVY, marginBottom: 16 }} />
//             <div style={{ borderLeft: `2px solid #1a3a52`, paddingLeft: 14, marginBottom: 20 }}>
//               <p style={{
//                 fontSize: isMobile ? 12 : 13, color: "#6aadcc", lineHeight: 1.8, margin: 0,
//                 fontStyle: "italic", fontFamily: "'Courier New',Courier,monospace"
//               }}>
//                 "Your vision is our concern."
//               </p>
//               <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#3a6a8a", marginTop: 8, fontFamily: ff }}>
//                 TARIQ HASSAN · FOUNDER
//               </div>
//             </div>
//             <p style={{
//               fontSize: isMobile ? 12 : 13, color: "#5a8aaa", lineHeight: 1.8, maxWidth: 260,
//               marginBottom: 20, fontFamily: "'Courier New',Courier,monospace"
//             }}>
//               Premium eyewear for those who see the world differently. Karachi's destination for iconic frames since 2015.
//             </p>
//             <div style={{ display: "flex", gap: 8 }}>
//               {["IG", "FB", "TT", "YT"].map((s) => (
//                 <a key={s} href="#"
//                   style={{
//                     width: 32, height: 32, border: `1px solid #1a3a52`, display: "flex",
//                     alignItems: "center", justifyContent: "center", color: "#5a8aaa",
//                     fontSize: 10, textDecoration: "none", fontFamily: ff, fontWeight: 900,
//                     letterSpacing: "0.05em", transition: "border-color 0.2s, color 0.2s"
//                   }}
//                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; e.currentTarget.style.color = "#5a8aaa"; }}>
//                   {s}
//                 </a>
//               ))}
//             </div>
//           </div>
//           <FooterCol title="SHOP" links={["Eyeglasses", "Sunglasses", "Reading Glasses", "New Arrivals", "Best Sellers", "Virtual Try-On", "Custom Tints™"]} />
//           <FooterCol title="HELP" links={["Shipping & Returns", "Frame Sizing Guide", "Prescription Info", "Contact Us", "Store Locator", "FAQ", "Repairs"]} />
//           <FooterCol title="COMPANY" links={["Our Story", "Craftsmanship", "Careers", "Press", "Sustainability", "Affiliates", "Gift Cards"]} />
//         </div>

//         {/* Bottom bar */}
//         <div style={{
//           borderTop: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
//           padding: isMobile ? "12px 20px" : "16px 40px",
//           display: "flex", flexWrap: "wrap",
//           justifyContent: "space-between", alignItems: "center", gap: 10
//         }}>
//           <div style={{ fontSize: isMobile ? 10 : 11, color: "#3a6a8a", letterSpacing: "0.05em", fontFamily: ff }}>
//             © 2026 Urban Eye. All rights reserved.
//           </div>
//           <div style={{ display: "flex", gap: isMobile ? 12 : 18, flexWrap: "wrap" }}>
//             {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
//               <a key={link} href="#"
//                 style={{
//                   fontSize: isMobile ? 10 : 11, color: "#3a6a8a", textDecoration: "none",
//                   letterSpacing: "0.05em", fontFamily: ff, transition: "color 0.2s"
//                 }}
//                 onMouseEnter={(e) => (e.target.style.color = ACCENT)}
//                 onMouseLeave={(e) => (e.target.style.color = "#3a6a8a")}>
//                 {link}
//               </a>
//             ))}
//           </div>
//           <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//             {["VISA", "MC", "AMEX", "COD"].map((card) => (
//               <span key={card}
//                 style={{
//                   fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
//                   border: `1px solid #1a3a52`, padding: "3px 7px", color: "#3a6a8a", fontFamily: ff
//                 }}>
//                 {card}
//               </span>
//             ))}
//           </div>
//         </div>
//       </footer>

//       {/* WhatsApp FAB */}
//       <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
//         style={{
//           position: "fixed", bottom: 26, right: 26, width: isMobile ? 44 : 52,
//           height: isMobile ? 44 : 52, borderRadius: "50%",
//           background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
//           boxShadow: "0 4px 20px rgba(37,211,102,0.35)", zIndex: 999,
//           transition: "transform 0.2s", textDecoration: "none"
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
//         onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         aria-label="Chat on WhatsApp">
//         <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 24 24" fill="white">
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//         </svg>
//       </a>

//       <style>{`
//         * {
//           box-sizing: border-box;
//         }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes cartPop {
//           0%   { transform: scale(0.6); }
//           70%  { transform: scale(1.2); }
//           100% { transform: scale(1); }
//         }
//         button[aria-label="Search"]:hover,
//         button[aria-label="Cart"]:hover {
//           opacity: 0.7;
//           transform: scale(1.05);
//         }
//         .auth-modal-overlay {
//           position: fixed;
//           top: 0; left: 0; right: 0; bottom: 0;
//           background: rgba(0, 0, 0, 0.7);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           backdrop-filter: blur(4px);
//         }
//         .auth-modal-content {
//           position: relative;
//           max-width: 460px;
//           width: 90%;
//           margin: 20px;
//           border-radius: 24px;
//           background: transparent;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// }


// // ── DEFAULT EXPORT ────────────────────────────────────────────────────────────
// export default function App() {
//   return (
//     <AuthProvider>
//       <AppInner />
//     </AuthProvider>
//   );
// }























































// App.jsx — Updated with dynamic shape filters and navbar shape links

import { useState, useEffect, useRef } from "react";
import OpticsStudio from "./opticsStudio.jsx";
import { CartProvider, useCart } from "./contexts/CardContext.jsx";
import { useHashRouter } from "./hook/usehashrooter.js";
import { AuthProvider, useAuth, AuthModal } from "./Auth/auth.jsx";
import { PRODUCTS_DATA } from "./prodcut.js";
import { searchProducts, getProductDisplayPrice, getProductVariants, formatPriceValue, getUniqueShapesFromProducts } from "./services/productUtils.js";

// ─── RESPONSIVE HOOK ────────────────────────────────────────────────────────
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

// ─── THEME COLOURS ───────────────────────────────────────────────────────────
const NAVY = "#0c2c41";
const ACCENT = "#89c4e1";
const BLACK = "#0a1628";
// ─────────────────────────────────────────────────────────────────────────────

// getProductShape / getUniqueShapesFromProducts (which splits compound shapes
// like "Hexagon-Round" so a frame surfaces under both "Hexagon" and "Round")
// now live in productUtils.js, shared with the products page filter sidebar.

// ─── NAV LINKS — data-driven; shape links are now generated dynamically ──
// We keep the structure but remove hardcoded shape links; they will be injected later.
const NAV_LINKS_BASE = [
  {
    label: "EYEGLASSES",
    mega: {
      cols: [
        {
          title: "EYEGLASSES",
          links: [
            { label: "SHOP ALL", to: { category: "Eyeglasses" } },
          ],
        },
        {
          title: "SHOP BY GENDER",
          links: [
            { label: "MEN'S", to: { category: "Eyeglasses", gender: "Men" } },
            { label: "WOMEN'S", to: { category: "Eyeglasses", gender: "Women" } },
            { label: "UNISEX", to: { category: "Eyeglasses", gender: "Unisex" } },
          ],
        },
        {
          title: "SHOP BY SHAPE",
          // This will be filled dynamically with shape links
          links: [],
        },
      ],
      panels: [
        { label: "SHOP ALL EYEGLASSES", bg: "#e8f2f8", to: { category: "Eyeglasses" } },
      ],
    },
  },
  {
    label: "SUNGLASSES",
    mega: {
      cols: [
        {
          title: "SUNGLASSES",
          links: [
            { label: "SHOP ALL", to: { category: "Sunglasses" } },
          ],
        },
        {
          title: "SHOP BY GENDER",
          links: [
            { label: "MEN'S", to: { category: "Sunglasses", gender: "Men" } },
            { label: "WOMEN'S", to: { category: "Sunglasses", gender: "Women" } },
            { label: "UNISEX", to: { category: "Sunglasses", gender: "Unisex" } },
          ],
        },
        {
          title: "SHOP BY SHAPE",
          links: [],
        },
      ],
      panels: [
        { label: "SHOP ALL SUNGLASSES", bg: "#e8f2f8", to: { category: "Sunglasses" } },
      ],
    },
  },
  {
    label: "COLLECTIONS",
    mega: {
      cols: [
        {
          title: "COLLECTIONS",
          links: [
            { label: "NEW ARRIVALS", to: { tag: "NEW" } },
            { label: "FEATURED", to: { tag: "BEST SELLER" } },
          ],
        },
      ],
      panels: [
        { label: "VIEW ALL FRAMES", bg: "#0c2c41", dark: true, to: {} },
      ],
    },
  },
  { label: "STORY", mega: null },
];

// ─── Build a products link with query params ──────────────────────────────
function buildProductsLink(to) {
  const params = new URLSearchParams(to || {});
  const qs = params.toString();
  return qs ? `#/products?${qs}` : "#/products";
}

// ─── Generate dynamic shape links for a given category ────────────────────
function getShapeLinksForCategory(category) {
  const shapes = getUniqueShapesFromProducts(PRODUCTS_DATA, category);
  return shapes.map(shape => ({
    label: shape.toUpperCase(),
    to: { category, shape },
  }));
}

// ─── Inject dynamic shape links into NAV_LINKS ────────────────────────────
function buildNavLinks() {
  const links = JSON.parse(JSON.stringify(NAV_LINKS_BASE));
  // Eyeglasses shapes
  const eyeglassesShapes = getShapeLinksForCategory("Eyeglasses");
  // Sunglasses shapes
  const sunglassesShapes = getShapeLinksForCategory("Sunglasses");

  // Find the "EYEGLASSES" entry and set its shape links
  const eyeglassesEntry = links.find(item => item.label === "EYEGLASSES");
  if (eyeglassesEntry && eyeglassesEntry.mega) {
    const shapeCol = eyeglassesEntry.mega.cols.find(col => col.title === "SHOP BY SHAPE");
    if (shapeCol) {
      shapeCol.links = eyeglassesShapes;
    }
  }

  const sunglassesEntry = links.find(item => item.label === "SUNGLASSES");
  if (sunglassesEntry && sunglassesEntry.mega) {
    const shapeCol = sunglassesEntry.mega.cols.find(col => col.title === "SHOP BY SHAPE");
    if (shapeCol) {
      shapeCol.links = sunglassesShapes;
    }
  }

  return links;
}

const NAV_LINKS = buildNavLinks();

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  "FREE SHIPPING ACROSS PAKISTAN ON ALL ORDERS",
  "NEW SPRING 2026 COLLECTION — SHOP NOW",
  "20+ CUSTOM MADE TINTS™ — HANDCRAFTED FOR YOU",
];

const ff = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";

const iconBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "8px",
  minWidth: "36px",
  minHeight: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.2s, transform 0.2s",
  borderRadius: "50%",
};

// ─── FOOTER COLUMN ────────────────────────────────────────────────────────────
function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#6aadcc",
        marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
        paddingBottom: 8, display: "inline-block"
      }}>
        {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((link) => (
          <li key={link}>
            <a href="#" style={{
              fontSize: 13, color: "#7fa8bc", textDecoration: "none",
              letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace", transition: "color 0.2s"
            }}
              onMouseEnter={(e) => (e.target.style.color = ACCENT)}
              onMouseLeave={(e) => (e.target.style.color = "#7fa8bc")}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── ACCOUNT BUTTON WITH AVATAR ──────────────────────────────────────────────
function AccountBtn({ onOpenModal, navigate }) {
  const { user, logout } = useAuth();
  const [hover, setHover] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const closeTimer = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropOpen(false), 80);
  };

  const getInitial = () => {
    const name = user?.name || user?.fullName || "";
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = () => {
    const name = user?.name || user?.fullName || "";
    const colors = ["#1a4a6b", "#2a6a9a", "#3a8aba", "#4aa0d0", "#5ab0e0", "#0c2c41"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash |= 0;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (user) {
    return (
      <div
        style={{ position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title={`Signed in as ${user.name || user.fullName}`}
          style={{
            background: hover ? "#f0f7fc" : "none",
            border: `1.5px solid ${NAVY}`,
            cursor: "pointer",
            padding: "4px 8px 4px 4px",
            color: NAVY,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            fontFamily: ff,
            display: "flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 40,
            transition: "background 0.15s",
          }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: getAvatarColor(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: ff,
          }}>
            {getInitial()}
          </div>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {dropOpen && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              paddingTop: 8,
              zIndex: 100,
            }}
          >
            <div style={{
              background: "#fff",
              border: `1.5px solid ${NAVY}`,
              boxShadow: "0 8px 24px rgba(12,44,65,0.12)",
              minWidth: 180,
            }}>
              {[
                { label: "MY DASHBOARD", hash: "#/dashboard" },
                { label: "MY ORDERS", hash: "#/dashboard?tab=orders" },
                { label: "WISHLIST", hash: "#/wishlist" },
                { label: "ADDRESSES", hash: "#/dashboard?tab=addresses" },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.hash); setDropOpen(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: "none", border: "none", borderBottom: "1px solid #f0f0f0",
                    padding: "11px 16px", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.1em", color: NAVY, cursor: "pointer",
                    fontFamily: ff, transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0f7fc"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { logout(); navigate("#/"); setDropOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", padding: "11px 16px",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  color: "#c0392b", cursor: "pointer", fontFamily: ff,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                SIGN OUT
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Not logged in
  return (
    <button style={iconBtn} aria-label="Account" onClick={onOpenModal}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// INNER APP
// ════════════════════════════════════════════════════════════════════════════
function AppInner() {
  const { user, checked } = useAuth();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [annIdx, setAnnIdx] = useState(0);
  const [annVisible, setAnnVisible] = useState(true);
  const [megaOpen, setMegaOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const megaTimer = useRef(null);

  const { route, navigate } = useHashRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    const t = setInterval(() => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const readCart = () => {
      try {
        const items = JSON.parse(localStorage.getItem("os_cart") || "[]");
        setCartCount(items.reduce((s, i) => s + i.qty, 0));
      } catch { setCartCount(0); }
    };
    readCart();
    const onCartUpdate = (e) => setCartCount(e.detail.reduce((s, i) => s + i.qty, 0));
    window.addEventListener("cartUpdated", onCartUpdate);
    window.addEventListener("storage", readCart);
    return () => {
      window.removeEventListener("cartUpdated", onCartUpdate);
      window.removeEventListener("storage", readCart);
    };
  }, []);

  useEffect(() => {
    if (user && authModalOpen) setAuthModalOpen(false);
  }, [user, authModalOpen]);

  const openMega = (label) => { clearTimeout(megaTimer.current); setMegaOpen(label); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 130); };
  const activeNav = NAV_LINKS.find((n) => n.label === megaOpen);
  const goTo = (hash) => { navigate(hash); setMobileMenuOpen(false); setMegaOpen(null); };

  // Live product suggestions for the navbar search
  const searchSuggestions = searchVal.trim() ? searchProducts(PRODUCTS_DATA, searchVal, 6) : [];
  const closeSearch = () => { setSearchOpen(false); setSearchVal(""); };
  const submitSearch = () => {
    const q = searchVal.trim();
    if (!q) return;
    goTo(`#/products?q=${encodeURIComponent(q)}`);
    closeSearch();
  };
  const openProduct = (id) => { goTo(`#/products/${id}`); closeSearch(); };
  const suggestionImage = (p) =>
    getProductVariants(p)[0]?.image || p.image || p.gallery?.[0] || "";

  if (!checked) return null;

  return (
    <div style={{ fontFamily: ff, background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Announcement Bar */}
      {annVisible && (
        <div style={{
          background: NAVY, color: ACCENT, textAlign: "center",
          marginTop: isMobile ? 56 : 60,
          fontSize: isMobile ? 10 : 11,
          letterSpacing: "0.14em", padding: isMobile ? "6px 16px" : "9px 48px",
          position: "relative", fontFamily: ff
        }}>
          {ANNOUNCEMENTS[annIdx]}
          <button onClick={() => setAnnVisible(false)}
            style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", color: ACCENT, cursor: "pointer",
              fontSize: isMobile ? 16 : 20, lineHeight: 1
            }}>
            ×
          </button>
        </div>
      )}

      {/* Navbar */}
      <header style={{
        width: "100%",
        background: "#fff",
        borderBottom: `3px solid ${NAVY}`,
        boxShadow: scrolled ? "0 2px 20px rgba(12,44,65,0.12)" : "none",
        transition: "box-shadow 0.3s",
        position: "fixed",
        top: 0,
        zIndex: 49,
      }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 10px" : "0 24px",
          height: isMobile ? 56 : 62,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: isMobile ? 4 : 12
        }}>

          {/* Logo */}
          <a href="#/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <img src="./logo.jpeg" alt="Urban Eye" style={{ height: isMobile ? 38 : 50, width: "auto" }} />
          </a>

          {/* Nav Links — hidden on mobile */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }}>
              <a href="#/products"
                style={{
                  background: "none", border: "none", fontSize: 12, fontWeight: 900,
                  letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
                  color: BLACK, fontFamily: ff,
                  borderBottom: window.location.hash === "#/products" ? `3px solid ${NAVY}` : "3px solid transparent",
                  transition: "border-color 0.2s", display: "flex", alignItems: "center", textDecoration: "none"
                }}>
                PRODUCTS
              </a>
              {NAV_LINKS.map((link) => (
                <div key={link.label}
                  onMouseEnter={() => (link.mega ? openMega(link.label) : null)}
                  onMouseLeave={link.mega ? closeMega : null}
                  style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      if (link.label === "STORY") goTo("#/story");
                    }}
                    style={{
                      background: "none", border: "none", fontSize: 12, fontWeight: 900,
                      letterSpacing: "0.1em", padding: "0 18px", height: 62, cursor: "pointer",
                      color: BLACK, fontFamily: ff,
                      borderBottom: megaOpen === link.label ? `3px solid ${NAVY}` : "3px solid transparent",
                      transition: "border-color 0.2s", display: "flex", alignItems: "center", gap: 4
                    }}>
                    {link.label}
                    {link.mega && (
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </nav>
          )}

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 14, flexShrink: 0 }}>

            {/* Hamburger (mobile) */}
            {isMobile && (
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={iconBtn} aria-label="Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round">
                  {mobileMenuOpen ? (
                    <line x1="18" y1="6" x2="6" y2="18" />
                  ) : (
                    <line x1="3" y1="12" x2="21" y2="12" />
                  )}
                  {mobileMenuOpen ? (
                    <line x1="6" y1="6" x2="18" y2="18" />
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            )}

            {/* Account */}
            <AccountBtn onOpenModal={() => setAuthModalOpen(true)} navigate={goTo} />

            {/* Search */}
            <button onClick={() => setSearchOpen((v) => !v)} style={iconBtn} aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY}
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Cart */}
            <button onClick={() => goTo("#/cart")}
              style={{ ...iconBtn, position: "relative" }} aria-label="Cart">
              <img
                src="../icon.png"
                alt="Cart"
                style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, objectFit: "contain" }}
              />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -8, right: -8, width: 18, height: 18,
                  borderRadius: "50%", background: NAVY, color: "#fff",
                  fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center",
                  justifyContent: "center", fontFamily: ff, animation: "cartPop 0.25s ease"
                }}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Shop Now — hidden on mobile */}
            {!isMobile && (
              <button onClick={() => goTo("#/products")}
                style={{
                  background: NAVY, color: "#fff", border: "none", borderRadius: 0,
                  padding: "10px 20px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
                  cursor: "pointer", fontFamily: ff, marginLeft: 4, transition: "opacity 0.18s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                SHOP NOW
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div style={{
            background: "#f0f8fc", borderTop: `2px solid ${NAVY}`,
            padding: isMobile ? "10px 12px" : "12px 24px",
            animation: "slideDown 0.2s ease both"
          }}>
            <div style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}>
              <svg style={{ position: "absolute", left: 13, top: 18, color: "#6aadcc" }}
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch();
                  else if (e.key === "Escape") closeSearch();
                }}
                placeholder="Search by name or price — e.g. “Alex” or “under 8000”"
                style={{
                  width: "100%", padding: "11px 36px 11px 38px", border: `1.5px solid ${NAVY}`,
                  fontSize: isMobile ? 12 : 13, letterSpacing: "0.02em", outline: "none", background: "#fff",
                  color: BLACK, fontFamily: "'Courier New',Courier,monospace", boxSizing: "border-box"
                }} />
              {searchVal && (
                <button onClick={() => setSearchVal("")}
                  style={{
                    position: "absolute", right: 12, top: 8,
                    background: "none", border: "none", cursor: "pointer", color: "#6aadcc", fontSize: 18
                  }}>×</button>
              )}

              {/* Live product suggestions */}
              {searchVal.trim() && (
                <div style={{
                  marginTop: 6, background: "#fff", border: `1.5px solid ${NAVY}`,
                  boxShadow: "0 12px 30px rgba(12,44,65,0.15)", maxHeight: "60vh", overflowY: "auto"
                }}>
                  {searchSuggestions.length > 0 ? (
                    <>
                      {searchSuggestions.map((p) => {
                        const { price, discountPrice } = getProductDisplayPrice(p);
                        const onSale = discountPrice < price;
                        return (
                          <button key={p.id} onClick={() => openProduct(p.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: 12, width: "100%",
                              padding: "10px 12px", background: "none", border: "none",
                              borderBottom: "1px solid #eef4f8", cursor: "pointer", textAlign: "left"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f8fc")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                            <div style={{
                              width: 46, height: 46, flexShrink: 0, background: "#f5f5f0",
                              border: "1px solid #e8e0d0", display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                              <img src={suggestionImage(p)} alt={p.name} loading="lazy"
                                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 13, fontWeight: 900, color: BLACK, fontFamily: ff,
                                letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                              }}>{p.name}</div>
                              <div style={{ fontSize: 11, color: "#7a8a95", fontFamily: "'Courier New',Courier,monospace" }}>
                                {p.category}{p.subcategory ? ` · ${p.subcategory}` : ""}
                              </div>
                            </div>
                            <div style={{ flexShrink: 0, textAlign: "right", fontFamily: ff }}>
                              <span style={{ fontSize: 13, fontWeight: 900, color: NAVY }}>PKR {formatPriceValue(discountPrice)}</span>
                              {onSale && (
                                <div style={{ fontSize: 10, color: "#aaa", textDecoration: "line-through" }}>PKR {formatPriceValue(price)}</div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                      <button onClick={submitSearch}
                        style={{
                          display: "block", width: "100%", padding: "11px 12px", background: "#f0f8fc",
                          border: "none", cursor: "pointer", fontSize: 11, fontWeight: 900,
                          letterSpacing: "0.12em", color: NAVY, fontFamily: ff
                        }}>
                        SEE ALL RESULTS FOR “{searchVal.trim().toUpperCase()}” →
                      </button>
                    </>
                  ) : (
                    <div style={{ padding: "16px 14px", fontSize: 12, color: "#7a8a95", fontFamily: "'Courier New',Courier,monospace" }}>
                      No frames found for “{searchVal.trim()}”.
                      <button onClick={submitSearch}
                        style={{ marginLeft: 6, background: "none", border: "none", color: NAVY, fontWeight: 900, cursor: "pointer", fontFamily: ff }}>
                        Browse all →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobile && mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: isMobile ? 56 : 62,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#fff",
              zIndex: 48,
              overflowY: "auto",
              padding: "20px 16px",
              borderTop: `2px solid ${NAVY}`,
              animation: "slideDown 0.2s ease both",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="#/products" onClick={() => goTo("#/products")}
                style={{
                  padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
                  borderBottom: "1px solid #eee", fontFamily: ff, textDecoration: "none",
                  letterSpacing: "0.1em"
                }}>
                PRODUCTS
              </a>
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.mega ? (
                    <>
                      <div
                        onClick={() => setMegaOpen(megaOpen === link.label ? null : link.label)}
                        style={{
                          padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
                          borderBottom: "1px solid #eee", fontFamily: ff,
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          cursor: "pointer", letterSpacing: "0.1em"
                        }}
                      >
                        {link.label}
                        <span style={{ fontSize: 18, color: NAVY }}>
                          {megaOpen === link.label ? "−" : "+"}
                        </span>
                      </div>
                      {megaOpen === link.label && (
                        <div style={{ padding: "8px 0 12px 16px" }}>
                          {link.mega.cols.map((col) => (
                            <div key={col.title} style={{ marginBottom: 12 }}>
                              <div style={{ fontSize: 11, fontWeight: 900, color: NAVY, marginBottom: 6, letterSpacing: "0.1em" }}>
                                {col.title}
                              </div>
                              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {col.links.map((sub) => (
                                  <li key={sub.label}>
                                    <a href={buildProductsLink(sub.to)}
                                      onClick={() => { goTo(buildProductsLink(sub.to)); }}
                                      style={{
                                        display: "block", padding: "6px 0", fontSize: 13,
                                        color: "#333", textDecoration: "none", fontFamily: ff,
                                        letterSpacing: "0.04em"
                                      }}
                                    >
                                      {sub.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {link.mega.panels.map((panel) => (
                            <a key={panel.label} href={buildProductsLink(panel.to)}
                              onClick={() => goTo(buildProductsLink(panel.to))}
                              style={{
                                display: "block", background: panel.bg, padding: "10px 12px",
                                marginTop: 8, fontSize: 13, fontWeight: 900, color: panel.dark ? "#fff" : NAVY,
                                textDecoration: "none", textAlign: "center", border: `1px solid ${NAVY}`,
                                letterSpacing: "0.1em"
                              }}
                            >
                              {panel.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button onClick={() => { if (link.label === "STORY") goTo("#/story"); }}
                      style={{
                        padding: "12px 0", fontSize: 14, fontWeight: 900, color: BLACK,
                        borderBottom: "1px solid #eee", fontFamily: ff,
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        cursor: "pointer", width: "100%", textAlign: "left", background: "none",
                        border: "none", borderBottom: "1px solid #eee", letterSpacing: "0.1em"
                      }}
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Mega Menu */}
        {!isMobile && megaOpen && activeNav?.mega && (
          <div onMouseEnter={() => openMega(megaOpen)} onMouseLeave={closeMega}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0, background: "#fff",
              borderTop: `2px solid ${NAVY}`, boxShadow: "0 12px 40px rgba(12,44,65,0.12)",
              zIndex: 50, animation: "slideDown 0.18s ease both"
            }}>
            <div style={{
              maxWidth: 1400, margin: "0 auto", padding: isTablet ? "24px 20px" : "32px 40px",
              display: "grid",
              gridTemplateColumns: `repeat(${activeNav.mega.cols.length}, 1fr) ${activeNav.mega.panels.length * 160}px`,
              gap: 0
            }}>
              {activeNav.mega.cols.map((col) => (
                <div key={col.title} style={{ paddingRight: 24 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: NAVY,
                    marginBottom: 16, fontFamily: ff, borderBottom: `2px solid ${NAVY}`,
                    paddingBottom: 8, display: "inline-block"
                  }}>
                    {col.title}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a href={buildProductsLink(link.to)}
                          onClick={() => setMegaOpen(null)}
                          style={{
                            fontSize: 12, color: "#333", textDecoration: "none",
                            letterSpacing: "0.06em", fontFamily: ff, fontWeight: 700, transition: "color 0.15s"
                          }}
                          onMouseEnter={(e) => (e.target.style.color = NAVY)}
                          onMouseLeave={(e) => (e.target.style.color = "#333")}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                {activeNav.mega.panels.map((panel, pi) => (
                  <a key={pi} href={buildProductsLink(panel.to)}
                    onClick={() => setMegaOpen(null)}
                    style={{
                      width: 148, height: 180, background: panel.bg, cursor: "pointer",
                      position: "relative", display: "flex", alignItems: "flex-end",
                      padding: 12, border: `1.5px solid ${NAVY}`, textDecoration: "none"
                    }}>
                    <div style={{
                      position: "absolute", top: "30%", left: "50%",
                      transform: "translate(-50%,-50%)", opacity: 0.3
                    }}>
                      <svg width="80" height="44" viewBox="0 0 120 66" fill="none">
                        <ellipse cx="30" cy="33" rx="25" ry="22"
                          stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
                        <ellipse cx="90" cy="33" rx="25" ry="22"
                          stroke={panel.dark ? ACCENT : NAVY} strokeWidth="4" fill="none" />
                        <line x1="55" y1="33" x2="65" y2="33"
                          stroke={panel.dark ? ACCENT : NAVY} strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div style={{
                      fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
                      color: panel.dark ? "#fff" : NAVY, fontFamily: ff, position: "relative", zIndex: 1
                    }}>
                      {panel.label}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main><OpticsStudio /></main>

      {/* Footer */}
      <footer style={{ background: BLACK, color: "#fff", fontFamily: ff }}>
        {/* Newsletter */}
        <div style={{
          borderBottom: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
          padding: isMobile ? "32px 20px" : "52px 40px",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 28
        }}>
          <div>
            <div style={{
              fontFamily: ff, fontSize: isMobile ? 18 : 22, fontWeight: 900,
              letterSpacing: "0.04em", marginBottom: 6, color: "#fff"
            }}>
              JOIN THE FAMILY
            </div>
            <div style={{
              fontSize: isMobile ? 12 : 13, color: "#6aadcc",
              letterSpacing: "0.03em", fontFamily: "'Courier New',Courier,monospace"
            }}>
              Get 10% off your first order — exclusive drops &amp; style guides.
            </div>
          </div>
          <div style={{ display: "flex", maxWidth: 400, width: "100%" }}>
            <input type="email" placeholder="Your email address"
              style={{
                flex: 1, minWidth: 0, background: "#0e1f2e", border: `1px solid #1a3a52`, borderRight: "none",
                color: "#fff", padding: isMobile ? "12px 10px" : "12px 16px", fontSize: isMobile ? 12 : 13, outline: "none",
                letterSpacing: "0.02em", fontFamily: "'Courier New',Courier,monospace"
              }} />
            <button style={{
              background: NAVY, color: ACCENT, border: `1px solid ${NAVY}`,
              padding: isMobile ? "12px 12px" : "12px 18px", fontSize: isMobile ? 10 : 11, fontWeight: 900,
              letterSpacing: "0.14em", cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff
            }}>
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Links */}
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: isMobile ? "32px 20px" : "56px 40px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? 28 : 44
        }}>
          <div>
            <div style={{
              fontFamily: ff, fontSize: isMobile ? 18 : 22, fontWeight: 900,
              letterSpacing: "0.06em", marginBottom: 2, color: "#fff"
            }}>
              URBAN EYE
            </div>
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "#3a6a8a", marginBottom: 16 }}>
              EST. 2015 · KARACHI
            </div>
            <div style={{ width: 36, height: 3, background: NAVY, marginBottom: 16 }} />
            <div style={{ borderLeft: `2px solid #1a3a52`, paddingLeft: 14, marginBottom: 20 }}>
              <p style={{
                fontSize: isMobile ? 12 : 13, color: "#6aadcc", lineHeight: 1.8, margin: 0,
                fontStyle: "italic", fontFamily: "'Courier New',Courier,monospace"
              }}>
                "Your vision is our concern."
              </p>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#3a6a8a", marginTop: 8, fontFamily: ff }}>
                TARIQ HASSAN · FOUNDER
              </div>
            </div>
            <p style={{
              fontSize: isMobile ? 12 : 13, color: "#5a8aaa", lineHeight: 1.8, maxWidth: 260,
              marginBottom: 20, fontFamily: "'Courier New',Courier,monospace"
            }}>
              Premium eyewear for those who see the world differently. Karachi's destination for iconic frames since 2015.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["IG", "FB", "TT", "YT"].map((s) => (
                <a key={s} href="#"
                  style={{
                    width: 32, height: 32, border: `1px solid #1a3a52`, display: "flex",
                    alignItems: "center", justifyContent: "center", color: "#5a8aaa",
                    fontSize: 10, textDecoration: "none", fontFamily: ff, fontWeight: 900,
                    letterSpacing: "0.05em", transition: "border-color 0.2s, color 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; e.currentTarget.style.color = "#5a8aaa"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="SHOP" links={["Eyeglasses", "Sunglasses", "Reading Glasses", "New Arrivals", "Best Sellers", "Virtual Try-On", "Custom Tints™"]} />
          <FooterCol title="HELP" links={["Shipping & Returns", "Frame Sizing Guide", "Prescription Info", "Contact Us", "Store Locator", "FAQ", "Repairs"]} />
          <FooterCol title="COMPANY" links={["Our Story", "Craftsmanship", "Careers", "Press", "Sustainability", "Affiliates", "Gift Cards"]} />
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #112236", maxWidth: 1400, margin: "0 auto",
          padding: isMobile ? "12px 20px" : "16px 40px",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 10
        }}>
          <div style={{ fontSize: isMobile ? 10 : 11, color: "#3a6a8a", letterSpacing: "0.05em", fontFamily: ff }}>
            © 2026 Urban Eye. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: isMobile ? 12 : 18, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
              <a key={link} href="#"
                style={{
                  fontSize: isMobile ? 10 : 11, color: "#3a6a8a", textDecoration: "none",
                  letterSpacing: "0.05em", fontFamily: ff, transition: "color 0.2s"
                }}
                onMouseEnter={(e) => (e.target.style.color = ACCENT)}
                onMouseLeave={(e) => (e.target.style.color = "#3a6a8a")}>
                {link}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            {["VISA", "MC", "AMEX", "COD"].map((card) => (
              <span key={card}
                style={{
                  fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
                  border: `1px solid #1a3a52`, padding: "3px 7px", color: "#3a6a8a", fontFamily: ff
                }}>
                {card}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 26, right: 26, width: isMobile ? 44 : 52,
          height: isMobile ? 44 : 52, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.35)", zIndex: 999,
          transition: "transform 0.2s", textDecoration: "none"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Chat on WhatsApp">
        <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style>{`
        * {
          box-sizing: border-box;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cartPop {
          0%   { transform: scale(0.6); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        button[aria-label="Search"]:hover,
        button[aria-label="Cart"]:hover {
          opacity: 0.7;
          transform: scale(1.05);
        }
        .auth-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .auth-modal-content {
          position: relative;
          max-width: 460px;
          width: 90%;
          margin: 20px;
          border-radius: 24px;
          background: transparent;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}


// ── DEFAULT EXPORT ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}