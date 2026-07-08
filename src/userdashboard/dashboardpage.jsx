




// // // // ============================================================
// // // // DashboardPage.jsx — User Dashboard
// // // // Sections: Profile, Orders, Addresses, Wishlist, Reviews
// // // // ============================================================
// // // import { useState, useEffect } from "react";
// // // import { useAuth } from "../Auth/auth.jsx";
// // // import {
// // //   getOrders,
// // //   getAddresses,
// // //   addAddress,
// // //   updateAddress,
// // //   deleteAddress,
// // //   getWishlist,
// // //   removeFromWishlist,
// // //   getReviews,
// // // } from "../services/service.js";
// // // import { useCart } from "../contexts/CardContext.jsx";

// // // const NAVY   = "#0c2c41";
// // // const ACCENT = "#89c4e1";
// // // const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
// // // const mono   = "'Courier New', Courier, monospace";

// // // const TABS = [
// // //   { key: "profile",   label: "PROFILE"   },
// // //   { key: "orders",    label: "ORDERS"    },
// // //   { key: "addresses", label: "ADDRESSES" },
// // //   { key: "wishlist",  label: "WISHLIST"  },
// // //   { key: "reviews",   label: "REVIEWS"   },
// // // ];

// // // // ─── Address Form ─────────────────────────────────────────────────────────────
// // // function AddressForm({ initial = {}, onSave, onCancel, saving }) {
// // //   const [form, setForm] = useState({
// // //     fullName  : initial.fullName   || "",
// // //     phone     : initial.phone      || "",
// // //     address   : initial.address    || "",
// // //     city      : initial.city       || "",
// // //     country   : initial.country    || "Pakistan",
// // //     postalCode: initial.postalCode || "",
// // //     isDefault : initial.isDefault === true || initial.isDefault === "TRUE",
// // //   });
// // //   const set = k => v => setForm(f => ({ ...f, [k]: v }));

// // //   return (
// // //     <div style={{ background: "#f8fbfd", border: `1.5px solid ${NAVY}`, padding: 24, marginBottom: 20 }}>
// // //       <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em", color: NAVY, marginBottom: 16 }}>
// // //         {initial.addressId ? "EDIT ADDRESS" : "NEW ADDRESS"}
// // //       </div>
// // //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
// // //         {[
// // //           { label: "FULL NAME",   key: "fullName",   placeholder: "Jane Smith"             },
// // //           { label: "PHONE",       key: "phone",      placeholder: "+92 300 0000000"        },
// // //           { label: "ADDRESS",     key: "address",    placeholder: "123 Main St", full: true },
// // //           { label: "CITY",        key: "city",       placeholder: "Karachi"                },
// // //           { label: "COUNTRY",     key: "country",    placeholder: "Pakistan"               },
// // //           { label: "POSTAL CODE", key: "postalCode", placeholder: "75500"                  },
// // //         ].map(f => (
// // //           <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
// // //             <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 4, fontFamily: ff }}>
// // //               {f.label}
// // //             </div>
// // //             <input
// // //               value={form[f.key]}
// // //               onChange={e => set(f.key)(e.target.value)}
// // //               placeholder={f.placeholder}
// // //               style={{
// // //                 width: "100%", padding: "9px 12px", border: `1.5px solid #cde`,
// // //                 fontSize: 13, fontFamily: mono, outline: "none",
// // //                 background: "#fff", color: NAVY, boxSizing: "border-box",
// // //               }}
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 16 }}>
// // //         <input type="checkbox" checked={form.isDefault} onChange={e => set("isDefault")(e.target.checked)} />
// // //         <span style={{ fontSize: 12, fontFamily: ff, color: NAVY }}>Set as default address</span>
// // //       </label>
// // //       <div style={{ display: "flex", gap: 10 }}>
// // //         <button onClick={() => onSave(form)} disabled={saving}
// // //           style={{
// // //             background: NAVY, color: "#fff", border: "none", padding: "10px 24px",
// // //             fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", fontFamily: ff,
// // //             cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
// // //           }}>
// // //           {saving ? "SAVING…" : "SAVE ADDRESS"}
// // //         </button>
// // //         <button onClick={onCancel}
// // //           style={{
// // //             background: "none", color: NAVY, border: `1.5px solid ${NAVY}`,
// // //             padding: "10px 20px", fontSize: 11, fontWeight: 900,
// // //             letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// // //           }}>
// // //           CANCEL
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Stars ────────────────────────────────────────────────────────────────────
// // // function Stars({ rating, max = 5 }) {
// // //   return (
// // //     <span style={{ color: "#f5a623", fontSize: 14, letterSpacing: 2 }}>
// // //       {Array.from({ length: max }, (_, i) => i < Math.round(rating) ? "★" : "☆").join("")}
// // //     </span>
// // //   );
// // // }

// // // // ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
// // // export default function DashboardPage({ navigate }) {
// // //   const { user, updateProfile, logout } = useAuth();

// // //   const hashParams = new URLSearchParams(
// // //     window.location.hash.replace(/^[^?]*/, "").replace("?", "")
// // //   );
// // //   const [activeTab, setActiveTab] = useState(hashParams.get("tab") || "profile");

// // //   const [orders,    setOrders]    = useState([]);
// // //   const [addresses, setAddresses] = useState([]);
// // //   const [wishlist,  setWishlist]  = useState([]);
// // //   const [reviews,   setReviews]   = useState([]);
// // //   const [loading,   setLoading]   = useState(false);
// // //   const [error,     setError]     = useState("");

// // //   const [profileForm,   setProfileForm]   = useState({ fullName: user?.fullName || user?.name || "", phone: user?.phone || "" });
// // //   const [profileMsg,    setProfileMsg]    = useState("");
// // //   const [profileSaving, setProfileSaving] = useState(false);

// // //   const [addrModal,  setAddrModal]  = useState(null);
// // //   const [addrSaving, setAddrSaving] = useState(false);

// // //   const { addToCart } = useCart();

// // //   // Redirect if not logged in
// // //   useEffect(() => {
// // //     if (!user) navigate("#/");
// // //   }, [user, navigate]);

// // //   // ─── Load data per tab ──────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!user) return;
// // //     setError("");
// // //     setLoading(true);

// // //     const load = async () => {
// // //       try {
// // //         if (activeTab === "orders") {
// // //           const res = await getOrders();
// // //           const ordersData = res.data || [];

// // //           // ✅ FIX: Process orders with products from OrderItems sheet
// // //           const processedOrders = ordersData.map(order => {
// // //             // Ensure products is always an array
// // //             let products = order.products || [];
            
// // //             // If products came as string (fallback safety)
// // //             if (typeof products === 'string') {
// // //               try {
// // //                 products = JSON.parse(products);
// // //               } catch (e) {
// // //                 products = [];
// // //               }
// // //             }
            
// // //             // Ensure each product has both quantity fields and price
// // //             products = products.map(p => ({
// // //               ...p,
// // //               qty: p.quantity || p.qty || 1,
// // //               quantity: p.quantity || p.qty || 1,
// // //               price: p.unitPrice || p.price || 0
// // //             }));
            
// // //             // Parse address if it's a string
// // //             let address = order.address;
// // //             try {
// // //               if (typeof order.address === 'string') {
// // //                 address = JSON.parse(order.address);
// // //               }
// // //             } catch (e) {
// // //               address = order.address;
// // //             }
            
// // //             return { ...order, products, address };
// // //           });
          
// // //           console.log("✅ Processed orders:", processedOrders);
// // //           setOrders(processedOrders);
          
// // //         } else if (activeTab === "addresses") {
// // //           const res = await getAddresses();
// // //           setAddresses(res.data || []);
          
// // //         } else if (activeTab === "wishlist") {
// // //           const res = await getWishlist();
// // //           setWishlist(res.data || []);
          
// // //         } else if (activeTab === "reviews") {
// // //           const res = await getReviews(null);
// // //           const all = res.data?.reviews || res.data || [];
// // //           setReviews(
// // //             Array.isArray(all)
// // //               ? all.filter(r => String(r.userId) === String(user.userId))
// // //               : []
// // //           );
// // //         }
// // //       } catch (err) {
// // //         console.error("Load error:", err);
// // //         setError(err.message);
// // //       }
// // //       setLoading(false);
// // //     };

// // //     load();
// // //   }, [activeTab, user]);

// // //   // ─── Handlers ───────────────────────────────────────────────────────────────
// // //   const handleSaveProfile = async () => {
// // //     if (!profileForm.fullName.trim()) { setProfileMsg("Name is required"); return; }
// // //     setProfileSaving(true);
// // //     try {
// // //       const res = await updateProfile({ fullName: profileForm.fullName, phone: profileForm.phone });
// // //       setProfileMsg(res.success ? "Profile updated successfully!" : res.error || "Failed to update");
// // //     } catch (err) {
// // //       setProfileMsg(err.message);
// // //     }
// // //     setProfileSaving(false);
// // //     setTimeout(() => setProfileMsg(""), 3000);
// // //   };

// // //   const handleSaveAddress = async (form) => {
// // //     if (!user) return;
// // //     setAddrSaving(true);
// // //     try {
// // //       if (addrModal?.addressId) {
// // //         await updateAddress({ ...form, addressId: addrModal.addressId });
// // //       } else {
// // //         await addAddress(form);
// // //       }
// // //       const res = await getAddresses();
// // //       setAddresses(res.data || []);
// // //       setAddrModal(null);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //     setAddrSaving(false);
// // //   };

// // //   const handleDeleteAddress = async (addressId) => {
// // //     if (!window.confirm("Delete this address?")) return;
// // //     try {
// // //       await deleteAddress({ addressId });
// // //       setAddresses(prev => prev.filter(a => a.addressId !== addressId));
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   const handleRemoveWishlist = async (wishlistId) => {
// // //     try {
// // //       await removeFromWishlist({ wishlistId });
// // //       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   const handleMoveToCart = (item) => {
// // //     if (item.product) {
// // //       addToCart({
// // //         id           : item.productId,
// // //         ...item.product,
// // //         discountPrice: item.product.salePrice || item.product.price,
// // //       });
// // //       handleRemoveWishlist(item.wishlistId);
// // //     }
// // //   };

// // //   if (!user) return null;

// // //   const tabNav = (key) => {
// // //     setActiveTab(key);
// // //     window.history.replaceState(null, "", `#/dashboard?tab=${key}`);
// // //   };

// // //   // ─── RENDER ─────────────────────────────────────────────────────────────────
// // //   return (
// // //     <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px", fontFamily: ff }}>

// // //       {/* Header */}
// // //       <div style={{ borderBottom: `3px solid ${NAVY}`, paddingBottom: 24, marginBottom: 36 }}>
// // //         <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#888", marginBottom: 6 }}>MY ACCOUNT</div>
// // //         <h1 style={{ fontSize: 32, fontWeight: 900, color: NAVY, margin: 0, letterSpacing: "0.02em" }}>
// // //           {(user.name || user.fullName || "").toUpperCase()}
// // //         </h1>
// // //         <div style={{ fontSize: 13, color: "#777", marginTop: 4, fontFamily: mono }}>{user.email}</div>
// // //       </div>

// // //       <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

// // //         {/* Sidebar */}
// // //         <nav style={{ width: 180, flexShrink: 0 }}>
// // //           {TABS.map(tab => (
// // //             <button key={tab.key} onClick={() => tabNav(tab.key)}
// // //               style={{
// // //                 display      : "block", width: "100%", textAlign: "left",
// // //                 background   : activeTab === tab.key ? NAVY : "none",
// // //                 color        : activeTab === tab.key ? "#fff" : NAVY,
// // //                 border       : "none",
// // //                 borderLeft   : `3px solid ${activeTab === tab.key ? ACCENT : "transparent"}`,
// // //                 padding      : "12px 16px", fontSize: 11, fontWeight: 900,
// // //                 letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff,
// // //                 marginBottom : 2, transition: "all 0.15s",
// // //               }}>
// // //               {tab.label}
// // //             </button>
// // //           ))}
// // //           <button onClick={() => { logout(); navigate("#/"); }}
// // //             style={{
// // //               display      : "block", width: "100%", textAlign: "left",
// // //               background   : "none", color: "#c0392b", border: "none",
// // //               borderLeft   : "3px solid transparent", padding: "12px 16px",
// // //               fontSize     : 11, fontWeight: 900, letterSpacing: "0.14em",
// // //               cursor       : "pointer", fontFamily: ff, marginTop: 16,
// // //             }}>
// // //             SIGN OUT
// // //           </button>
// // //         </nav>

// // //         {/* Content */}
// // //         <div style={{ flex: 1 }}>
// // //           {error && (
// // //             <div style={{
// // //               background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33",
// // //               padding: "10px 14px", fontSize: 13, marginBottom: 20,
// // //             }}>
// // //               {error}
// // //             </div>
// // //           )}

// // //           {/* ── PROFILE ── */}
// // //           {activeTab === "profile" && (
// // //             <div>
// // //               <SectionTitle>PERSONAL INFORMATION</SectionTitle>
// // //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 520 }}>
// // //                 <FormField label="FULL NAME" value={profileForm.fullName}
// // //                   onChange={v => setProfileForm(f => ({ ...f, fullName: v }))} />
// // //                 <FormField label="PHONE" value={profileForm.phone}
// // //                   onChange={v => setProfileForm(f => ({ ...f, phone: v }))} />
// // //                 <FormField label="EMAIL" value={user.email} disabled />
// // //               </div>
// // //               {profileMsg && (
// // //                 <div style={{
// // //                   fontSize: 13, marginTop: 12, fontFamily: mono,
// // //                   color: profileMsg.includes("success") ? "#2a8a50" : "#a33",
// // //                 }}>
// // //                   {profileMsg}
// // //                 </div>
// // //               )}
// // //               <button onClick={handleSaveProfile} disabled={profileSaving}
// // //                 style={{
// // //                   marginTop    : 20, background: NAVY, color: "#fff", border: "none",
// // //                   padding      : "12px 28px", fontSize: 11, fontWeight: 900,
// // //                   letterSpacing: "0.14em", fontFamily: ff,
// // //                   cursor       : profileSaving ? "not-allowed" : "pointer",
// // //                   opacity      : profileSaving ? 0.7 : 1,
// // //                 }}>
// // //                 {profileSaving ? "SAVING…" : "SAVE CHANGES"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {/* ── ORDERS ── */}
// // //           {activeTab === "orders" && (
// // //             <div>
// // //               <SectionTitle>MY ORDERS</SectionTitle>
// // //               {loading ? <Loader /> : orders.length === 0 ? (
// // //                 <EmptyState
// // //                   msg="No orders yet. Start shopping!"
// // //                   action={() => navigate("#/products")}
// // //                   actionLabel="SHOP NOW"
// // //                 />
// // //               ) : (
// // //                 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// // //                   {orders.map(order => {
// // //                     // Get products from the order (already attached by backend)
// // //                     const products = Array.isArray(order.products) ? order.products : [];

// // //                     return (
// // //                       <div key={order.orderId} style={{ border: `1.5px solid #dde`, padding: 20 }}>
// // //                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// // //                           <div>
// // //                             <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.1em" }}>
// // //                               ORDER #{order.orderId}
// // //                             </div>
// // //                             <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginTop: 2 }}>
// // //                               {order.createdAt
// // //                                 ? new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })
// // //                                 : "Date unknown"}
// // //                             </div>
// // //                           </div>
// // //                           <StatusBadge status={order.status} />
// // //                         </div>

// // //                         {/* Product rows */}
// // //                         <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
// // //                           {products.length === 0 ? (
// // //                             <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, padding: "10px 0" }}>
// // //                               No items found for this order
// // //                             </div>
// // //                           ) : (
// // //                             products.map((p, i) => {
// // //                               // Support both qty and quantity field names
// // //                               const qty = p.qty ?? p.quantity ?? 1;
// // //                               const price = p.price ?? p.unitPrice ?? 0;
// // //                               const subtotal = price * qty;

// // //                               return (
// // //                                 <div key={i} style={{
// // //                                   display: "flex",
// // //                                   justifyContent: "space-between",
// // //                                   marginBottom: 8,
// // //                                   fontSize: 13,
// // //                                   fontFamily: mono,
// // //                                   color: "#444",
// // //                                   padding: "4px 0",
// // //                                 }}>
// // //                                   <span>
// // //                                     {p.name || p.productName || `Product #${p.productId}`}
// // //                                     <span style={{ color: "#888", marginLeft: "8px" }}>×{qty}</span>
// // //                                   </span>
// // //                                   <span style={{ fontWeight: 600, color: NAVY }}>
// // //                                     PKR {subtotal.toLocaleString()}
// // //                                   </span>
// // //                                 </div>
// // //                               );
// // //                             })
// // //                           )}
// // //                         </div>

// // //                         {/* Order footer */}
// // //                         <div style={{
// // //                           borderTop: "1px solid #eee",
// // //                           paddingTop: 10,
// // //                           marginTop: 6,
// // //                           display: "flex",
// // //                           justifyContent: "space-between",
// // //                           alignItems: "center",
// // //                         }}>
// // //                           <span style={{ fontSize: 11, color: "#888", fontFamily: ff, letterSpacing: "0.08em" }}>
// // //                             {order.paymentMethod || "COD"} · {products.length} item(s)
// // //                           </span>
// // //                           <span style={{ fontSize: 14, fontWeight: 900, color: NAVY, fontFamily: ff }}>
// // //                             PKR {Number(order.total).toLocaleString()}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* ── ADDRESSES ── */}
// // //           {activeTab === "addresses" && (
// // //             <div>
// // //               <SectionTitle>SAVED ADDRESSES</SectionTitle>
// // //               {addrModal !== null && (
// // //                 <AddressForm
// // //                   initial={addrModal}
// // //                   onSave={handleSaveAddress}
// // //                   onCancel={() => setAddrModal(null)}
// // //                   saving={addrSaving}
// // //                 />
// // //               )}
// // //               {loading ? <Loader /> : (
// // //                 <>
// // //                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
// // //                     {addresses.map(addr => (
// // //                       <div key={addr.addressId}
// // //                         style={{
// // //                           border  : `1.5px solid ${addr.isDefault === true || addr.isDefault === "TRUE" ? NAVY : "#dde"}`,
// // //                           padding : 18,
// // //                           position: "relative",
// // //                         }}>
// // //                         {(addr.isDefault === true || addr.isDefault === "TRUE") && (
// // //                           <span style={{
// // //                             position     : "absolute", top: 10, right: 10,
// // //                             background   : NAVY, color: "#fff", fontSize: 9,
// // //                             fontWeight   : 900, padding: "3px 8px",
// // //                             letterSpacing: "0.1em", fontFamily: ff,
// // //                           }}>
// // //                             DEFAULT
// // //                           </span>
// // //                         )}
// // //                         <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
// // //                           {addr.fullName}
// // //                         </div>
// // //                         <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
// // //                           {addr.address}<br />
// // //                           {addr.city}, {addr.country} {addr.postalCode}<br />
// // //                           {addr.phone}
// // //                         </div>
// // //                         <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
// // //                           <InlineBtn onClick={() => setAddrModal(addr)}>EDIT</InlineBtn>
// // //                           <InlineBtn onClick={() => handleDeleteAddress(addr.addressId)} danger>DELETE</InlineBtn>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                   <button onClick={() => setAddrModal({})}
// // //                     style={{
// // //                       background   : "none", border: `1.5px dashed ${NAVY}`, color: NAVY,
// // //                       padding      : "12px 24px", fontSize: 11, fontWeight: 900,
// // //                       letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// // //                     }}>
// // //                     + ADD NEW ADDRESS
// // //                   </button>
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* ── WISHLIST ── */}
// // //           {activeTab === "wishlist" && (
// // //             <div>
// // //               <SectionTitle>MY WISHLIST</SectionTitle>
// // //               {loading ? <Loader /> : wishlist.length === 0 ? (
// // //                 <EmptyState
// // //                   msg="Your wishlist is empty."
// // //                   action={() => navigate("#/products")}
// // //                   actionLabel="EXPLORE FRAMES"
// // //                 />
// // //               ) : (
// // //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
// // //                   {wishlist.map(item => (
// // //                     <div key={item.wishlistId} style={{ border: "1.5px solid #eee", padding: 16 }}>
// // //                       {item.product?.imageUrl && (
// // //                         <img
// // //                           src={item.product.imageUrl}
// // //                           alt={item.product.name}
// // //                           style={{ width: "100%", height: 140, objectFit: "contain", background: "#f8f8f8", marginBottom: 10 }}
// // //                         />
// // //                       )}
// // //                       <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.06em", marginBottom: 4 }}>
// // //                         {item.product?.name || "Unknown Product"}
// // //                       </div>
// // //                       <div style={{ fontSize: 13, color: NAVY, fontFamily: mono, marginBottom: 12 }}>
// // //                         PKR {Number(item.product?.salePrice || item.product?.price || 0).toLocaleString()}
// // //                       </div>
// // //                       <div style={{ display: "flex", gap: 8 }}>
// // //                         <button onClick={() => handleMoveToCart(item)}
// // //                           style={{
// // //                             flex         : 1, background: NAVY, color: "#fff", border: "none",
// // //                             padding      : "8px", fontSize: 10, fontWeight: 900,
// // //                             letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// // //                           }}>
// // //                           ADD TO CART
// // //                         </button>
// // //                         <button onClick={() => handleRemoveWishlist(item.wishlistId)}
// // //                           style={{
// // //                             background: "none", border: "1.5px solid #ddd",
// // //                             color: "#888", padding: "8px 10px", fontSize: 14, cursor: "pointer",
// // //                           }}>
// // //                           ×
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* ── REVIEWS ── */}
// // //           {activeTab === "reviews" && (
// // //             <div>
// // //               <SectionTitle>MY REVIEWS</SectionTitle>
// // //               {loading ? <Loader /> : reviews.length === 0 ? (
// // //                 <EmptyState msg="You haven't submitted any reviews yet." />
// // //               ) : (
// // //                 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// // //                   {reviews.map(r => (
// // //                     <div key={r.reviewId} style={{ border: "1.5px solid #eee", padding: 18 }}>
// // //                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
// // //                         <div>
// // //                           <Stars rating={r.rating} />
// // //                           <span style={{ fontSize: 11, color: "#888", fontFamily: mono, marginLeft: 8 }}>
// // //                             Product #{r.productId}
// // //                           </span>
// // //                         </div>
// // //                         <div style={{ display: "flex", gap: 8 }}>
// // //                           {(r.verifiedPurchase === true || r.verifiedPurchase === "TRUE") && (
// // //                             <span style={{
// // //                               background   : "#eaf5ef", color: "#2a8a50", fontSize: 9,
// // //                               fontWeight   : 900, padding: "3px 8px",
// // //                               letterSpacing: "0.1em", fontFamily: ff,
// // //                             }}>
// // //                               VERIFIED PURCHASE
// // //                             </span>
// // //                           )}
// // //                           <span style={{
// // //                             background   : r.approved === true || r.approved === "TRUE" ? "#eaf5ef" : "#fef0f0",
// // //                             color        : r.approved === true || r.approved === "TRUE" ? "#2a8a50" : "#a33",
// // //                             fontSize     : 9, fontWeight: 900, padding: "3px 8px",
// // //                             letterSpacing: "0.1em", fontFamily: ff,
// // //                           }}>
// // //                             {r.approved === true || r.approved === "TRUE" ? "PUBLISHED" : "PENDING APPROVAL"}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                       <p style={{ fontSize: 13, color: "#444", fontFamily: mono, margin: 0, lineHeight: 1.6 }}>
// // //                         {r.review || "(No written review)"}
// // //                       </p>
// // //                       <div style={{ fontSize: 11, color: "#aaa", marginTop: 8, fontFamily: mono }}>
// // //                         {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Date unknown"}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Sub-components ───────────────────────────────────────────────────────────

// // // function SectionTitle({ children }) {
// // //   return (
// // //     <div style={{
// // //       fontSize     : 11, fontWeight: 900, letterSpacing: "0.2em", color: NAVY,
// // //       borderBottom : `2px solid ${NAVY}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff,
// // //     }}>
// // //       {children}
// // //     </div>
// // //   );
// // // }

// // // function FormField({ label, value, onChange, disabled }) {
// // //   return (
// // //     <div>
// // //       <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 5, fontFamily: ff }}>
// // //         {label}
// // //       </div>
// // //       <input
// // //         value={value}
// // //         onChange={onChange ? e => onChange(e.target.value) : undefined}
// // //         disabled={disabled}
// // //         style={{
// // //           width     : "100%", padding: "10px 12px", border: "1.5px solid #cde",
// // //           fontSize  : 13, fontFamily: mono, outline: "none",
// // //           background: disabled ? "#f5f5f5" : "#fff", color: NAVY, boxSizing: "border-box",
// // //         }}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // function InlineBtn({ children, onClick, danger }) {
// // //   return (
// // //     <button onClick={onClick}
// // //       style={{
// // //         background   : "none",
// // //         border       : `1px solid ${danger ? "#e74c3c" : "#cde"}`,
// // //         color        : danger ? "#e74c3c" : NAVY,
// // //         padding      : "5px 12px", fontSize: 10, fontWeight: 900,
// // //         letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// // //       }}>
// // //       {children}
// // //     </button>
// // //   );
// // // }

// // // function StatusBadge({ status }) {
// // //   const colors = {
// // //     pending  : { bg: "#fff8e1", color: "#b8860b" },
// // //     confirmed: { bg: "#e8f5e9", color: "#2e7d32" },
// // //     shipped  : { bg: "#e3f2fd", color: "#1565c0" },
// // //     delivered: { bg: "#e8f5e9", color: "#1b5e20" },
// // //     cancelled: { bg: "#fce4ec", color: "#c62828" },
// // //     complete  : { bg: "#e8f5e9", color: "#1b5e20" },
// // //   };
// // //   const c = colors[(status || "").toLowerCase()] || { bg: "#f5f5f5", color: "#555" };
// // //   return (
// // //     <span style={{
// // //       background   : c.bg, color: c.color, fontSize: 9, fontWeight: 900,
// // //       padding      : "4px 10px", letterSpacing: "0.12em", fontFamily: ff,
// // //     }}>
// // //       {(status || "pending").toUpperCase()}
// // //     </span>
// // //   );
// // // }

// // // function Loader() {
// // //   return (
// // //     <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>
// // //       LOADING…
// // //     </div>
// // //   );
// // // }

// // // function EmptyState({ msg, action, actionLabel }) {
// // //   return (
// // //     <div style={{ textAlign: "center", padding: "60px 0" }}>
// // //       <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 20 }}>{msg}</div>
// // //       {action && (
// // //         <button onClick={action}
// // //           style={{
// // //             background   : NAVY, color: "#fff", border: "none", padding: "12px 28px",
// // //             fontSize     : 11, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
// // //           }}>
// // //           {actionLabel}
// // //         </button>
// // //       )}
// // //     </div>
// // //   );
// // // }






































// // // ============================================================
// // // DashboardPage.jsx — User Dashboard
// // // Sections: Profile, Orders, Addresses, Wishlist, Reviews
// // // ============================================================
// // import { useState, useEffect, useCallback } from "react";
// // import { useAuth } from "../Auth/auth.jsx";
// // import {
// //   getOrders,
// //   getAddresses,
// //   addAddress,
// //   updateAddress,
// //   deleteAddress,
// //   getWishlist,
// //   removeFromWishlist,
// //   getUserReviews,
// //   getPurchasedProducts,
// // } from "../services/service.js";
// // import { useCart } from "../contexts/CardContext.jsx";

// // const NAVY   = "#0c2c41";
// // const ACCENT = "#89c4e1";
// // const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
// // const mono   = "'Courier New', Courier, monospace";

// // const TABS = [
// //   { key: "profile",   label: "PROFILE"   },
// //   { key: "orders",    label: "ORDERS"    },
// //   { key: "addresses", label: "ADDRESSES" },
// //   { key: "wishlist",  label: "WISHLIST"  },
// //   { key: "reviews",   label: "REVIEWS"   },
// // ];

// // // ─── Address Form ─────────────────────────────────────────────────────────────
// // function AddressForm({ initial = {}, onSave, onCancel, saving }) {
// //   const [form, setForm] = useState({
// //     fullName  : initial.fullName   || "",
// //     phone     : initial.phone      || "",
// //     address   : initial.address    || "",
// //     city      : initial.city       || "",
// //     country   : initial.country    || "Pakistan",
// //     postalCode: initial.postalCode || "",
// //     isDefault : initial.isDefault === true || initial.isDefault === "TRUE",
// //   });
// //   const set = k => v => setForm(f => ({ ...f, [k]: v }));

// //   return (
// //     <div style={{ background: "#f8fbfd", border: `1.5px solid ${NAVY}`, padding: 24, marginBottom: 20 }}>
// //       <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em", color: NAVY, marginBottom: 16 }}>
// //         {initial.addressId ? "EDIT ADDRESS" : "NEW ADDRESS"}
// //       </div>
// //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
// //         {[
// //           { label: "FULL NAME",   key: "fullName",   placeholder: "Jane Smith"             },
// //           { label: "PHONE",       key: "phone",      placeholder: "+92 300 0000000"        },
// //           { label: "ADDRESS",     key: "address",    placeholder: "123 Main St", full: true },
// //           { label: "CITY",        key: "city",       placeholder: "Karachi"                },
// //           { label: "COUNTRY",     key: "country",    placeholder: "Pakistan"               },
// //           { label: "POSTAL CODE", key: "postalCode", placeholder: "75500"                  },
// //         ].map(f => (
// //           <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
// //             <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 4, fontFamily: ff }}>
// //               {f.label}
// //             </div>
// //             <input
// //               value={form[f.key]}
// //               onChange={e => set(f.key)(e.target.value)}
// //               placeholder={f.placeholder}
// //               style={{
// //                 width: "100%", padding: "9px 12px", border: `1.5px solid #cde`,
// //                 fontSize: 13, fontFamily: mono, outline: "none",
// //                 background: "#fff", color: NAVY, boxSizing: "border-box",
// //               }}
// //             />
// //           </div>
// //         ))}
// //       </div>
// //       <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 16 }}>
// //         <input type="checkbox" checked={form.isDefault} onChange={e => set("isDefault")(e.target.checked)} />
// //         <span style={{ fontSize: 12, fontFamily: ff, color: NAVY }}>Set as default address</span>
// //       </label>
// //       <div style={{ display: "flex", gap: 10 }}>
// //         <button onClick={() => onSave(form)} disabled={saving}
// //           style={{
// //             background: NAVY, color: "#fff", border: "none", padding: "10px 24px",
// //             fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", fontFamily: ff,
// //             cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
// //           }}>
// //           {saving ? "SAVING…" : "SAVE ADDRESS"}
// //         </button>
// //         <button onClick={onCancel}
// //           style={{
// //             background: "none", color: NAVY, border: `1.5px solid ${NAVY}`,
// //             padding: "10px 20px", fontSize: 11, fontWeight: 900,
// //             letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// //           }}>
// //           CANCEL
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Stars Display ────────────────────────────────────────────────────────────
// // function Stars({ rating, max = 5, size = 14 }) {
// //   return (
// //     <span style={{ color: "#f5a623", fontSize: size, letterSpacing: 2 }}>
// //       {Array.from({ length: max }, (_, i) => i < Math.round(rating) ? "★" : "☆").join("")}
// //     </span>
// //   );
// // }

// // // ─── Interactive Star Selector ────────────────────────────────────────────────
// // function StarSelector({ value, onChange }) {
// //   const [hovered, setHovered] = useState(0);
// //   return (
// //     <div style={{ display: "flex", gap: 4 }}>
// //       {[1, 2, 3, 4, 5].map(star => (
// //         <button
// //           key={star}
// //           onClick={() => onChange(star)}
// //           onMouseEnter={() => setHovered(star)}
// //           onMouseLeave={() => setHovered(0)}
// //           style={{
// //             background: "none", border: "none", cursor: "pointer",
// //             fontSize: 32, color: star <= (hovered || value) ? "#f5a623" : "#ddd",
// //             padding: "0 2px", transition: "color 0.15s",
// //           }}
// //         >
// //           ★
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // // ─── Reviews Tab ─────────────────────────────────────────────────────────────
// // function ReviewsTab({ navigate, user }) {
// //   const [purchasedProducts, setPurchasedProducts] = useState([]);
// //   const [userReviews, setUserReviews] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       // Fetch orders to get purchased products
// //       const ordersRes = await getOrders();
// //       const orders = ordersRes.data || [];

// //       // Flatten all purchased products across all orders (deduplicated by productId)
// //       const seen = new Set();
// //       const allProducts = [];
// //       orders.forEach(order => {
// //         const products = Array.isArray(order.products) ? order.products : [];
// //         products.forEach(p => {
// //           const key = String(p.productId || p.id || "");
// //           if (key && !seen.has(key)) {
// //             seen.add(key);
// //             allProducts.push({
// //               productId : key,
// //               name      : p.name || p.productName || `Product #${key}`,
// //               unitPrice : p.unitPrice || p.price || 0,
// //               image     : p.image || "",
// //               orderId   : order.orderId,
// //               orderDate : order.createdAt,
// //             });
// //           }
// //         });
// //       });
// //       setPurchasedProducts(allProducts);

// //       // Fetch user's own reviews
// //       try {
// //         const reviewsRes = await getUserReviews();
// //         const reviews = reviewsRes.data || [];
// //         setUserReviews(Array.isArray(reviews) ? reviews : []);
// //       } catch {
// //         // If getUserReviews not yet on backend, fall back to empty
// //         setUserReviews([]);
// //       }
// //     } catch (err) {
// //       setError(err.message || "Failed to load data");
// //     }
// //     setLoading(false);
// //   }, []);

// //   useEffect(() => { load(); }, [load]);

// //   if (loading) return <Loader />;

// //   if (error) return (
// //     <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, fontFamily: mono }}>
// //       {error}
// //     </div>
// //   );

// //   if (purchasedProducts.length === 0) return (
// //     <EmptyState msg="You haven't purchased any products yet. Reviews can be submitted after purchase." />
// //   );

// //   // Build a map: productId → review object (if exists)
// //   const reviewMap = {};
// //   userReviews.forEach(r => {
// //     reviewMap[String(r.productId)] = r;
// //   });

// //   return (
// //     <div>
// //       <SectionTitle>MY REVIEWS</SectionTitle>
// //       <p style={{ fontSize: 12, color: "#888", fontFamily: mono, marginBottom: 24, lineHeight: 1.7 }}>
// //         Below are all products you've purchased. You can submit a review for each one.
// //       </p>

// //       <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// //         {purchasedProducts.map(product => {
// //           const review = reviewMap[product.productId];
// //           const hasReview = !!review;

// //           return (
// //             <div key={product.productId} style={{
// //               border: `1.5px solid ${hasReview ? ACCENT : "#e8e8e8"}`,
// //               padding: 20,
// //               background: hasReview ? "#f8fcff" : "#fff",
// //               display: "flex", alignItems: "flex-start", gap: 16,
// //             }}>
// //               {/* Product Image */}
// //               <div style={{
// //                 width: 80, height: 64, background: "#f5f0e8", flexShrink: 0,
// //                 overflow: "hidden", border: "1px solid #eee",
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //               }}>
// //                 {product.image
// //                   ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
// //                   : <span style={{ fontSize: 24 }}>👓</span>
// //                 }
// //               </div>

// //               {/* Product Info */}
// //               <div style={{ flex: 1, minWidth: 0 }}>
// //                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: NAVY, marginBottom: 3, letterSpacing: "0.04em" }}>
// //                   {product.name}
// //                 </div>
// //                 <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginBottom: 6 }}>
// //                   ORDER #{product.orderId}
// //                   {product.orderDate && (
// //                     <span style={{ marginLeft: 8 }}>
// //                       · {new Date(product.orderDate).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Review Status */}
// //                 {hasReview ? (
// //                   <div>
// //                     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
// //                       <Stars rating={Number(review.rating) || 0} />
// //                       <span style={{
// //                         fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
// //                         padding: "3px 8px", fontFamily: ff,
// //                         background: review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
// //                           ? "#eaf5ef" : "#fff8e1",
// //                         color: review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
// //                           ? "#2a8a50" : "#b8860b",
// //                       }}>
// //                         {review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
// //                           ? "✓ PUBLISHED" : "⏳ PENDING APPROVAL"}
// //                       </span>
// //                     </div>
// //                     {review.review && (
// //                       <p style={{ fontSize: 12, color: "#555", fontFamily: mono, margin: "0 0 10px", lineHeight: 1.6, maxWidth: 480 }}>
// //                         "{review.review}"
// //                       </p>
// //                     )}
// //                     <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, marginBottom: 10 }}>
// //                       Submitted {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div style={{ fontSize: 11, color: "#aaa", fontFamily: mono, marginBottom: 10, letterSpacing: "0.04em" }}>
// //                     No review submitted yet
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Action Buttons */}
// //               <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
// //                 {hasReview ? (
// //                   <>
// //                     <button
// //                       onClick={() => navigate(`#/review/${product.productId}?reviewId=${review.reviewId}`)}
// //                       style={{
// //                         background: "none", border: `1.5px solid ${NAVY}`, color: NAVY,
// //                         padding: "8px 14px", fontSize: 10, fontWeight: 900,
// //                         letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// //                         whiteSpace: "nowrap",
// //                       }}
// //                     >
// //                       EDIT REVIEW
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <button
// //                     onClick={() => navigate(`#/review/${product.productId}`)}
// //                     style={{
// //                       background: NAVY, color: "#fff", border: "none",
// //                       padding: "8px 14px", fontSize: 10, fontWeight: 900,
// //                       letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// //                       whiteSpace: "nowrap",
// //                     }}
// //                   >
// //                     SUBMIT REVIEW
// //                   </button>
// //                 )}
// //                 <button
// //                   onClick={() => navigate(`#/products/${product.productId}`)}
// //                   style={{
// //                     background: "none", border: "1.5px solid #dde", color: "#888",
// //                     padding: "8px 14px", fontSize: 10, fontWeight: 900,
// //                     letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// //                     whiteSpace: "nowrap",
// //                   }}
// //                 >
// //                   VIEW PRODUCT
// //                 </button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
// // export default function DashboardPage({ navigate }) {
// //   const { user, updateProfile, logout } = useAuth();

// //   const hashParams = new URLSearchParams(
// //     window.location.hash.replace(/^[^?]*/, "").replace("?", "")
// //   );
// //   const [activeTab, setActiveTab] = useState(hashParams.get("tab") || "profile");

// //   const [orders,    setOrders]    = useState([]);
// //   const [addresses, setAddresses] = useState([]);
// //   const [wishlist,  setWishlist]  = useState([]);
// //   const [loading,   setLoading]   = useState(false);
// //   const [error,     setError]     = useState("");

// //   const [profileForm,   setProfileForm]   = useState({ fullName: user?.fullName || user?.name || "", phone: user?.phone || "" });
// //   const [profileMsg,    setProfileMsg]    = useState("");
// //   const [profileSaving, setProfileSaving] = useState(false);

// //   const [addrModal,  setAddrModal]  = useState(null);
// //   const [addrSaving, setAddrSaving] = useState(false);

// //   const { addToCart } = useCart();

// //   // Redirect if not logged in
// //   useEffect(() => {
// //     if (!user) navigate("#/");
// //   }, [user, navigate]);

// //   // ─── Load data per tab ──────────────────────────────────────────────────────
// //   useEffect(() => {
// //     if (!user) return;
// //     if (activeTab === "reviews") return; // ReviewsTab loads its own data
// //     setError("");
// //     setLoading(true);

// //     const load = async () => {
// //       try {
// //         if (activeTab === "orders") {
// //           const res = await getOrders();
// //           const ordersData = res.data || [];

// //           const processedOrders = ordersData.map(order => {
// //             let products = order.products || [];
// //             if (typeof products === 'string') {
// //               try { products = JSON.parse(products); } catch { products = []; }
// //             }
// //             products = products.map(p => ({
// //               ...p,
// //               qty: p.quantity || p.qty || 1,
// //               quantity: p.quantity || p.qty || 1,
// //               price: p.unitPrice || p.price || 0,
// //             }));
// //             let address = order.address;
// //             try {
// //               if (typeof order.address === 'string') address = JSON.parse(order.address);
// //             } catch { address = order.address; }
// //             return { ...order, products, address };
// //           });
// //           setOrders(processedOrders);

// //         } else if (activeTab === "addresses") {
// //           const res = await getAddresses();
// //           setAddresses(res.data || []);

// //         } else if (activeTab === "wishlist") {
// //           const res = await getWishlist();
// //           setWishlist(res.data || []);
// //         }
// //       } catch (err) {
// //         console.error("Load error:", err);
// //         setError(err.message);
// //       }
// //       setLoading(false);
// //     };

// //     load();
// //   }, [activeTab, user]);

// //   // ─── Handlers ───────────────────────────────────────────────────────────────
// //   const handleSaveProfile = async () => {
// //     if (!profileForm.fullName.trim()) { setProfileMsg("Name is required"); return; }
// //     setProfileSaving(true);
// //     try {
// //       const res = await updateProfile({ fullName: profileForm.fullName, phone: profileForm.phone });
// //       setProfileMsg(res.success ? "Profile updated successfully!" : res.error || "Failed to update");
// //     } catch (err) {
// //       setProfileMsg(err.message);
// //     }
// //     setProfileSaving(false);
// //     setTimeout(() => setProfileMsg(""), 3000);
// //   };

// //   const handleSaveAddress = async (form) => {
// //     if (!user) return;
// //     setAddrSaving(true);
// //     try {
// //       if (addrModal?.addressId) {
// //         await updateAddress({ ...form, addressId: addrModal.addressId });
// //       } else {
// //         await addAddress(form);
// //       }
// //       const res = await getAddresses();
// //       setAddresses(res.data || []);
// //       setAddrModal(null);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //     setAddrSaving(false);
// //   };

// //   const handleDeleteAddress = async (addressId) => {
// //     if (!window.confirm("Delete this address?")) return;
// //     try {
// //       await deleteAddress({ addressId });
// //       setAddresses(prev => prev.filter(a => a.addressId !== addressId));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   const handleRemoveWishlist = async (wishlistId) => {
// //     try {
// //       await removeFromWishlist({ wishlistId });
// //       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   const handleMoveToCart = (item) => {
// //     if (item.product) {
// //       addToCart({
// //         id           : item.productId,
// //         ...item.product,
// //         discountPrice: item.product.salePrice || item.product.price,
// //       });
// //       handleRemoveWishlist(item.wishlistId);
// //     }
// //   };

// //   if (!user) return null;

// //   const tabNav = (key) => {
// //     setActiveTab(key);
// //     window.history.replaceState(null, "", `#/dashboard?tab=${key}`);
// //   };

// //   // ─── RENDER ─────────────────────────────────────────────────────────────────
// //   return (
// //     <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px", fontFamily: ff }}>

// //       {/* Header */}
// //       <div style={{ borderBottom: `3px solid ${NAVY}`, paddingBottom: 24, marginBottom: 36 }}>
// //         <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#888", marginBottom: 6 }}>MY ACCOUNT</div>
// //         <h1 style={{ fontSize: 32, fontWeight: 900, color: NAVY, margin: 0, letterSpacing: "0.02em" }}>
// //           {(user.name || user.fullName || "").toUpperCase()}
// //         </h1>
// //         <div style={{ fontSize: 13, color: "#777", marginTop: 4, fontFamily: mono }}>{user.email}</div>
// //       </div>

// //       <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

// //         {/* Sidebar */}
// //         <nav style={{ width: 180, flexShrink: 0 }}>
// //           {TABS.map(tab => (
// //             <button key={tab.key} onClick={() => tabNav(tab.key)}
// //               style={{
// //                 display      : "block", width: "100%", textAlign: "left",
// //                 background   : activeTab === tab.key ? NAVY : "none",
// //                 color        : activeTab === tab.key ? "#fff" : NAVY,
// //                 border       : "none",
// //                 borderLeft   : `3px solid ${activeTab === tab.key ? ACCENT : "transparent"}`,
// //                 padding      : "12px 16px", fontSize: 11, fontWeight: 900,
// //                 letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff,
// //                 marginBottom : 2, transition: "all 0.15s",
// //               }}>
// //               {tab.label}
// //             </button>
// //           ))}
// //           <button onClick={() => { logout(); navigate("#/"); }}
// //             style={{
// //               display      : "block", width: "100%", textAlign: "left",
// //               background   : "none", color: "#c0392b", border: "none",
// //               borderLeft   : "3px solid transparent", padding: "12px 16px",
// //               fontSize     : 11, fontWeight: 900, letterSpacing: "0.14em",
// //               cursor       : "pointer", fontFamily: ff, marginTop: 16,
// //             }}>
// //             SIGN OUT
// //           </button>
// //         </nav>

// //         {/* Content */}
// //         <div style={{ flex: 1 }}>
// //           {error && (
// //             <div style={{
// //               background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33",
// //               padding: "10px 14px", fontSize: 13, marginBottom: 20,
// //             }}>
// //               {error}
// //             </div>
// //           )}

// //           {/* ── PROFILE ── */}
// //           {activeTab === "profile" && (
// //             <div>
// //               <SectionTitle>PERSONAL INFORMATION</SectionTitle>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 520 }}>
// //                 <FormField label="FULL NAME" value={profileForm.fullName}
// //                   onChange={v => setProfileForm(f => ({ ...f, fullName: v }))} />
// //                 <FormField label="PHONE" value={profileForm.phone}
// //                   onChange={v => setProfileForm(f => ({ ...f, phone: v }))} />
// //                 <FormField label="EMAIL" value={user.email} disabled />
// //               </div>
// //               {profileMsg && (
// //                 <div style={{
// //                   fontSize: 13, marginTop: 12, fontFamily: mono,
// //                   color: profileMsg.includes("success") ? "#2a8a50" : "#a33",
// //                 }}>
// //                   {profileMsg}
// //                 </div>
// //               )}
// //               <button onClick={handleSaveProfile} disabled={profileSaving}
// //                 style={{
// //                   marginTop    : 20, background: NAVY, color: "#fff", border: "none",
// //                   padding      : "12px 28px", fontSize: 11, fontWeight: 900,
// //                   letterSpacing: "0.14em", fontFamily: ff,
// //                   cursor       : profileSaving ? "not-allowed" : "pointer",
// //                   opacity      : profileSaving ? 0.7 : 1,
// //                 }}>
// //                 {profileSaving ? "SAVING…" : "SAVE CHANGES"}
// //               </button>
// //             </div>
// //           )}

// //           {/* ── ORDERS ── */}
// //           {activeTab === "orders" && (
// //             <div>
// //               <SectionTitle>MY ORDERS</SectionTitle>
// //               {loading ? <Loader /> : orders.length === 0 ? (
// //                 <EmptyState
// //                   msg="No orders yet. Start shopping!"
// //                   action={() => navigate("#/products")}
// //                   actionLabel="SHOP NOW"
// //                 />
// //               ) : (
// //                 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// //                   {orders.map(order => {
// //                     const products = Array.isArray(order.products) ? order.products : [];
// //                     return (
// //                       <div key={order.orderId} style={{ border: `1.5px solid #dde`, padding: 20 }}>
// //                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //                           <div>
// //                             <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.1em" }}>
// //                               ORDER #{order.orderId}
// //                             </div>
// //                             <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginTop: 2 }}>
// //                               {order.createdAt
// //                                 ? new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })
// //                                 : "Date unknown"}
// //                             </div>
// //                           </div>
// //                           <StatusBadge status={order.status} />
// //                         </div>
// //                         <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
// //                           {products.length === 0 ? (
// //                             <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, padding: "10px 0" }}>
// //                               No items found for this order
// //                             </div>
// //                           ) : (
// //                             products.map((p, i) => {
// //                               const qty = p.qty ?? p.quantity ?? 1;
// //                               const price = p.price ?? p.unitPrice ?? 0;
// //                               const subtotal = price * qty;
// //                               return (
// //                                 <div key={i} style={{
// //                                   display: "flex", justifyContent: "space-between",
// //                                   marginBottom: 8, fontSize: 13, fontFamily: mono,
// //                                   color: "#444", padding: "4px 0",
// //                                 }}>
// //                                   <span>
// //                                     {p.name || p.productName || `Product #${p.productId}`}
// //                                     <span style={{ color: "#888", marginLeft: "8px" }}>×{qty}</span>
// //                                   </span>
// //                                   <span style={{ fontWeight: 600, color: NAVY }}>
// //                                     PKR {subtotal.toLocaleString()}
// //                                   </span>
// //                                 </div>
// //                               );
// //                             })
// //                           )}
// //                         </div>
// //                         <div style={{
// //                           borderTop: "1px solid #eee", paddingTop: 10, marginTop: 6,
// //                           display: "flex", justifyContent: "space-between", alignItems: "center",
// //                         }}>
// //                           <span style={{ fontSize: 11, color: "#888", fontFamily: ff, letterSpacing: "0.08em" }}>
// //                             {order.paymentMethod || "COD"} · {products.length} item(s)
// //                           </span>
// //                           <span style={{ fontSize: 14, fontWeight: 900, color: NAVY, fontFamily: ff }}>
// //                             PKR {Number(order.total).toLocaleString()}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* ── ADDRESSES ── */}
// //           {activeTab === "addresses" && (
// //             <div>
// //               <SectionTitle>SAVED ADDRESSES</SectionTitle>
// //               {addrModal !== null && (
// //                 <AddressForm
// //                   initial={addrModal}
// //                   onSave={handleSaveAddress}
// //                   onCancel={() => setAddrModal(null)}
// //                   saving={addrSaving}
// //                 />
// //               )}
// //               {loading ? <Loader /> : (
// //                 <>
// //                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
// //                     {addresses.map(addr => (
// //                       <div key={addr.addressId}
// //                         style={{
// //                           border  : `1.5px solid ${addr.isDefault === true || addr.isDefault === "TRUE" ? NAVY : "#dde"}`,
// //                           padding : 18, position: "relative",
// //                         }}>
// //                         {(addr.isDefault === true || addr.isDefault === "TRUE") && (
// //                           <span style={{
// //                             position: "absolute", top: 10, right: 10,
// //                             background: NAVY, color: "#fff", fontSize: 9,
// //                             fontWeight: 900, padding: "3px 8px",
// //                             letterSpacing: "0.1em", fontFamily: ff,
// //                           }}>
// //                             DEFAULT
// //                           </span>
// //                         )}
// //                         <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{addr.fullName}</div>
// //                         <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
// //                           {addr.address}<br />
// //                           {addr.city}, {addr.country} {addr.postalCode}<br />
// //                           {addr.phone}
// //                         </div>
// //                         <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
// //                           <InlineBtn onClick={() => setAddrModal(addr)}>EDIT</InlineBtn>
// //                           <InlineBtn onClick={() => handleDeleteAddress(addr.addressId)} danger>DELETE</InlineBtn>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                   <button onClick={() => setAddrModal({})}
// //                     style={{
// //                       background: "none", border: `1.5px dashed ${NAVY}`, color: NAVY,
// //                       padding: "12px 24px", fontSize: 11, fontWeight: 900,
// //                       letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
// //                     }}>
// //                     + ADD NEW ADDRESS
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           )}

// //           {/* ── WISHLIST ── */}
// //           {activeTab === "wishlist" && (
// //             <div>
// //               <SectionTitle>MY WISHLIST</SectionTitle>
// //               {loading ? <Loader /> : wishlist.length === 0 ? (
// //                 <EmptyState
// //                   msg="Your wishlist is empty."
// //                   action={() => navigate("#/products")}
// //                   actionLabel="EXPLORE FRAMES"
// //                 />
// //               ) : (
// //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
// //                   {wishlist.map(item => (
// //                     <div key={item.wishlistId} style={{ border: "1.5px solid #eee", padding: 16 }}>
// //                       {item.product?.imageUrl && (
// //                         <img
// //                           src={item.product.imageUrl}
// //                           alt={item.product.name}
// //                           style={{ width: "100%", height: 140, objectFit: "contain", background: "#f8f8f8", marginBottom: 10 }}
// //                         />
// //                       )}
// //                       <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.06em", marginBottom: 4 }}>
// //                         {item.product?.name || "Unknown Product"}
// //                       </div>
// //                       <div style={{ fontSize: 13, color: NAVY, fontFamily: mono, marginBottom: 12 }}>
// //                         PKR {Number(item.product?.salePrice || item.product?.price || 0).toLocaleString()}
// //                       </div>
// //                       <div style={{ display: "flex", gap: 8 }}>
// //                         <button onClick={() => handleMoveToCart(item)}
// //                           style={{
// //                             flex: 1, background: NAVY, color: "#fff", border: "none",
// //                             padding: "8px", fontSize: 10, fontWeight: 900,
// //                             letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// //                           }}>
// //                           ADD TO CART
// //                         </button>
// //                         <button onClick={() => handleRemoveWishlist(item.wishlistId)}
// //                           style={{
// //                             background: "none", border: "1.5px solid #ddd",
// //                             color: "#888", padding: "8px 10px", fontSize: 14, cursor: "pointer",
// //                           }}>
// //                           ×
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* ── REVIEWS ── */}
// //           {activeTab === "reviews" && (
// //             <ReviewsTab navigate={navigate} user={user} />
// //           )}

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Sub-components ───────────────────────────────────────────────────────────

// // function SectionTitle({ children }) {
// //   return (
// //     <div style={{
// //       fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: NAVY,
// //       borderBottom: `2px solid ${NAVY}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff,
// //     }}>
// //       {children}
// //     </div>
// //   );
// // }

// // function FormField({ label, value, onChange, disabled }) {
// //   return (
// //     <div>
// //       <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 5, fontFamily: ff }}>
// //         {label}
// //       </div>
// //       <input
// //         value={value}
// //         onChange={onChange ? e => onChange(e.target.value) : undefined}
// //         disabled={disabled}
// //         style={{
// //           width: "100%", padding: "10px 12px", border: "1.5px solid #cde",
// //           fontSize: 13, fontFamily: mono, outline: "none",
// //           background: disabled ? "#f5f5f5" : "#fff", color: NAVY, boxSizing: "border-box",
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // function InlineBtn({ children, onClick, danger }) {
// //   return (
// //     <button onClick={onClick}
// //       style={{
// //         background: "none",
// //         border: `1px solid ${danger ? "#e74c3c" : "#cde"}`,
// //         color: danger ? "#e74c3c" : NAVY,
// //         padding: "5px 12px", fontSize: 10, fontWeight: 900,
// //         letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
// //       }}>
// //       {children}
// //     </button>
// //   );
// // }

// // function StatusBadge({ status }) {
// //   const colors = {
// //     pending  : { bg: "#fff8e1", color: "#b8860b" },
// //     confirmed: { bg: "#e8f5e9", color: "#2e7d32" },
// //     shipped  : { bg: "#e3f2fd", color: "#1565c0" },
// //     delivered: { bg: "#e8f5e9", color: "#1b5e20" },
// //     cancelled: { bg: "#fce4ec", color: "#c62828" },
// //     complete  : { bg: "#e8f5e9", color: "#1b5e20" },
// //   };
// //   const c = colors[(status || "").toLowerCase()] || { bg: "#f5f5f5", color: "#555" };
// //   return (
// //     <span style={{
// //       background: c.bg, color: c.color, fontSize: 9, fontWeight: 900,
// //       padding: "4px 10px", letterSpacing: "0.12em", fontFamily: ff,
// //     }}>
// //       {(status || "pending").toUpperCase()}
// //     </span>
// //   );
// // }

// // function Loader() {
// //   return (
// //     <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>
// //       LOADING…
// //     </div>
// //   );
// // }

// // function EmptyState({ msg, action, actionLabel }) {
// //   return (
// //     <div style={{ textAlign: "center", padding: "60px 0" }}>
// //       <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 20 }}>{msg}</div>
// //       {action && (
// //         <button onClick={action}
// //           style={{
// //             background: NAVY, color: "#fff", border: "none", padding: "12px 28px",
// //             fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
// //           }}>
// //           {actionLabel}
// //         </button>
// //       )}
// //     </div>
// //   );
// // }
















































// // ============================================================
// // DashboardPage.jsx — User Dashboard
// // Sections: Profile, Orders, Addresses, Wishlist, Reviews
// // ============================================================
// import { useState, useEffect, useCallback } from "react";
// import { useAuth } from "../Auth/auth.jsx";
// import {
//   getOrders,
//   getAddresses,
//   addAddress,
//   updateAddress,
//   deleteAddress,
//   getWishlist,
//   removeFromWishlist,
//   getUserReviews,
//   getPurchasedProducts,
// } from "../services/service.js";
// import { useCart } from "../contexts/CardContext.jsx";

// const NAVY   = "#0c2c41";
// const ACCENT = "#89c4e1";
// const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
// const mono   = "'Courier New', Courier, monospace";

// const TABS = [
//   { key: "profile",   label: "PROFILE"   },
//   { key: "orders",    label: "ORDERS"    },
//   { key: "addresses", label: "ADDRESSES" },
//   { key: "wishlist",  label: "WISHLIST"  },
//   { key: "reviews",   label: "REVIEWS"   },
// ];

// // ─── Address Form ─────────────────────────────────────────────────────────────
// function AddressForm({ initial = {}, onSave, onCancel, saving }) {
//   const [form, setForm] = useState({
//     fullName  : initial.fullName   || "",
//     phone     : initial.phone      || "",
//     address   : initial.address    || "",
//     city      : initial.city       || "",
//     country   : initial.country    || "Pakistan",
//     postalCode: initial.postalCode || "",
//     isDefault : initial.isDefault === true || initial.isDefault === "TRUE",
//   });
//   const set = k => v => setForm(f => ({ ...f, [k]: v }));

//   return (
//     <div style={{ background: "#f8fbfd", border: `1.5px solid ${NAVY}`, padding: 24, marginBottom: 20 }}>
//       <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em", color: NAVY, marginBottom: 16 }}>
//         {initial.addressId ? "EDIT ADDRESS" : "NEW ADDRESS"}
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
//         {[
//           { label: "FULL NAME",   key: "fullName",   placeholder: "Jane Smith"             },
//           { label: "PHONE",       key: "phone",      placeholder: "+92 300 0000000"        },
//           { label: "ADDRESS",     key: "address",    placeholder: "123 Main St", full: true },
//           { label: "CITY",        key: "city",       placeholder: "Karachi"                },
//           { label: "COUNTRY",     key: "country",    placeholder: "Pakistan"               },
//           { label: "POSTAL CODE", key: "postalCode", placeholder: "75500"                  },
//         ].map(f => (
//           <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
//             <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 4, fontFamily: ff }}>
//               {f.label}
//             </div>
//             <input
//               value={form[f.key]}
//               onChange={e => set(f.key)(e.target.value)}
//               placeholder={f.placeholder}
//               style={{
//                 width: "100%", padding: "9px 12px", border: `1.5px solid #cde`,
//                 fontSize: 13, fontFamily: mono, outline: "none",
//                 background: "#fff", color: NAVY, boxSizing: "border-box",
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 16 }}>
//         <input type="checkbox" checked={form.isDefault} onChange={e => set("isDefault")(e.target.checked)} />
//         <span style={{ fontSize: 12, fontFamily: ff, color: NAVY }}>Set as default address</span>
//       </label>
//       <div style={{ display: "flex", gap: 10 }}>
//         <button onClick={() => onSave(form)} disabled={saving}
//           style={{
//             background: NAVY, color: "#fff", border: "none", padding: "10px 24px",
//             fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", fontFamily: ff,
//             cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
//           }}>
//           {saving ? "SAVING…" : "SAVE ADDRESS"}
//         </button>
//         <button onClick={onCancel}
//           style={{
//             background: "none", color: NAVY, border: `1.5px solid ${NAVY}`,
//             padding: "10px 20px", fontSize: 11, fontWeight: 900,
//             letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
//           }}>
//           CANCEL
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Stars Display ────────────────────────────────────────────────────────────
// function Stars({ rating, max = 5, size = 14 }) {
//   return (
//     <span style={{ color: "#f5a623", fontSize: size, letterSpacing: 2 }}>
//       {Array.from({ length: max }, (_, i) => i < Math.round(rating) ? "★" : "☆").join("")}
//     </span>
//   );
// }

// // ─── Interactive Star Selector ────────────────────────────────────────────────
// function StarSelector({ value, onChange }) {
//   const [hovered, setHovered] = useState(0);
//   return (
//     <div style={{ display: "flex", gap: 4 }}>
//       {[1, 2, 3, 4, 5].map(star => (
//         <button
//           key={star}
//           onClick={() => onChange(star)}
//           onMouseEnter={() => setHovered(star)}
//           onMouseLeave={() => setHovered(0)}
//           style={{
//             background: "none", border: "none", cursor: "pointer",
//             fontSize: 32, color: star <= (hovered || value) ? "#f5a623" : "#ddd",
//             padding: "0 2px", transition: "color 0.15s",
//           }}
//         >
//           ★
//         </button>
//       ))}
//     </div>
//   );
// }

// // ─── Reviews Tab ─────────────────────────────────────────────────────────────
// function ReviewsTab({ navigate, user }) {
//   const [purchasedProducts, setPurchasedProducts] = useState([]);
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     try {
//       // Fetch orders to get purchased products
//       const ordersRes = await getOrders();
//       const orders = ordersRes.data || [];

//       // Flatten all purchased products across all orders (deduplicated by productId)
//       const seen = new Set();
//       const allProducts = [];
//       orders.forEach(order => {
//         const products = Array.isArray(order.products) ? order.products : [];
//         products.forEach(p => {
//           const key = String(p.productId || p.id || "");
//           if (key && !seen.has(key)) {
//             seen.add(key);
//             allProducts.push({
//               productId : key,
//               name      : p.name || p.productName || `Product #${key}`,
//               unitPrice : p.unitPrice || p.price || 0,
//               image     : p.image || "",
//               orderId   : order.orderId,
//               orderDate : order.createdAt,
//             });
//           }
//         });
//       });
//       setPurchasedProducts(allProducts);

//       // Fetch user's own reviews
//       try {
//         const reviewsRes = await getUserReviews();
//         const reviews = reviewsRes.data || [];
//         setUserReviews(Array.isArray(reviews) ? reviews : []);
//       } catch {
//         // If getUserReviews not yet on backend, fall back to empty
//         setUserReviews([]);
//       }
//     } catch (err) {
//       setError(err.message || "Failed to load data");
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   if (loading) return <Loader />;

//   if (error) return (
//     <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, fontFamily: mono }}>
//       {error}
//     </div>
//   );

//   if (purchasedProducts.length === 0) return (
//     <EmptyState msg="You haven't purchased any products yet. Reviews can be submitted after purchase." />
//   );

//   // Build a map: productId → review object (if exists)
//   const reviewMap = {};
//   userReviews.forEach(r => {
//     reviewMap[String(r.productId)] = r;
//   });

//   return (
//     <div>
//       <SectionTitle>MY REVIEWS</SectionTitle>
//       <p style={{ fontSize: 12, color: "#888", fontFamily: mono, marginBottom: 24, lineHeight: 1.7 }}>
//         Below are all products you've purchased. You can submit a review for each one.
//       </p>

//       <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//         {purchasedProducts.map(product => {
//           const review = reviewMap[product.productId];
//           const hasReview = !!review;

//           return (
//             <div key={product.productId} style={{
//               border: `1.5px solid ${hasReview ? ACCENT : "#e8e8e8"}`,
//               padding: 20,
//               background: hasReview ? "#f8fcff" : "#fff",
//               display: "flex", alignItems: "flex-start", gap: 16,
//             }}>
//               {/* Product Image */}
//               <div style={{
//                 width: 80, height: 64, background: "#f5f0e8", flexShrink: 0,
//                 overflow: "hidden", border: "1px solid #eee",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//               }}>
//                 {product.image
//                   ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
//                   : <span style={{ fontSize: 24 }}>👓</span>
//                 }
//               </div>

//               {/* Product Info */}
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: NAVY, marginBottom: 3, letterSpacing: "0.04em" }}>
//                   {product.name}
//                 </div>
//                 <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginBottom: 6 }}>
//                   ORDER #{product.orderId}
//                   {product.orderDate && (
//                     <span style={{ marginLeft: 8 }}>
//                       · {new Date(product.orderDate).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}
//                     </span>
//                   )}
//                 </div>

//                 {/* Review Status */}
//                 {hasReview ? (
//                   <div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
//                       <Stars rating={Number(review.rating) || 0} />
//                       <span style={{
//                         fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
//                         padding: "3px 8px", fontFamily: ff,
//                         background: review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
//                           ? "#eaf5ef" : "#fff8e1",
//                         color: review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
//                           ? "#2a8a50" : "#b8860b",
//                       }}>
//                         {review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
//                           ? "✓ PUBLISHED" : "⏳ PENDING APPROVAL"}
//                       </span>
//                     </div>
//                     {review.review && (
//                       <p style={{ fontSize: 12, color: "#555", fontFamily: mono, margin: "0 0 10px", lineHeight: 1.6, maxWidth: 480 }}>
//                         "{review.review}"
//                       </p>
//                     )}
//                     <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, marginBottom: 10 }}>
//                       Submitted {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
//                     </div>
//                   </div>
//                 ) : (
//                   <div style={{ fontSize: 11, color: "#aaa", fontFamily: mono, marginBottom: 10, letterSpacing: "0.04em" }}>
//                     No review submitted yet
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
//                 {hasReview ? (
//                   <>
//                     <button
//                       onClick={() => navigate(`#/review/${product.productId}?reviewId=${review.reviewId}`)}
//                       style={{
//                         background: "none", border: `1.5px solid ${NAVY}`, color: NAVY,
//                         padding: "8px 14px", fontSize: 10, fontWeight: 900,
//                         letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       EDIT REVIEW
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate(`#/review/${product.productId}`)}
//                     style={{
//                       background: NAVY, color: "#fff", border: "none",
//                       padding: "8px 14px", fontSize: 10, fontWeight: 900,
//                       letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     SUBMIT REVIEW
//                   </button>
//                 )}
//                 <button
//                   onClick={() => navigate(`#/products/${product.productId}`)}
//                   style={{
//                     background: "none", border: "1.5px solid #dde", color: "#888",
//                     padding: "8px 14px", fontSize: 10, fontWeight: 900,
//                     letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   VIEW PRODUCT
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
// export default function DashboardPage({ navigate }) {
//   const { user, updateProfile, logout } = useAuth();

//   const hashParams = new URLSearchParams(
//     window.location.hash.replace(/^[^?]*/, "").replace("?", "")
//   );
//   const [activeTab, setActiveTab] = useState(hashParams.get("tab") || "profile");

//   const [orders,    setOrders]    = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [wishlist,  setWishlist]  = useState([]);
//   const [loading,   setLoading]   = useState(false);
//   const [error,     setError]     = useState("");

//   const [profileForm,   setProfileForm]   = useState({ fullName: user?.fullName || user?.name || "", phone: user?.phone || "" });
//   const [profileMsg,    setProfileMsg]    = useState("");
//   const [profileSaving, setProfileSaving] = useState(false);

//   const [addrModal,  setAddrModal]  = useState(null);
//   const [addrSaving, setAddrSaving] = useState(false);

//   const { addToCart } = useCart();

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!user) navigate("#/");
//   }, [user, navigate]);

//   // ─── Load data per tab ──────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!user) return;
//     if (activeTab === "reviews") return; // ReviewsTab loads its own data
//     setError("");
//     setLoading(true);

//     const load = async () => {
//       try {
//         if (activeTab === "orders") {
//           const res = await getOrders();
//           const ordersData = res.data || [];

//           const processedOrders = ordersData.map(order => {
//             let products = order.products || [];
//             if (typeof products === 'string') {
//               try { products = JSON.parse(products); } catch { products = []; }
//             }
//             products = products.map(p => ({
//               ...p,
//               qty: p.quantity || p.qty || 1,
//               quantity: p.quantity || p.qty || 1,
//               price: p.unitPrice || p.price || 0,
//             }));
//             let address = order.address;
//             try {
//               if (typeof order.address === 'string') address = JSON.parse(order.address);
//             } catch { address = order.address; }
//             return { ...order, products, address };
//           });
//           setOrders(processedOrders);

//         } else if (activeTab === "addresses") {
//           const res = await getAddresses();
//           setAddresses(res.data || []);

//         } else if (activeTab === "wishlist") {
//           const res = await getWishlist();
//           setWishlist(res.data || []);
//         }
//       } catch (err) {
//         console.error("Load error:", err);
//         setError(err.message);
//       }
//       setLoading(false);
//     };

//     load();
//   }, [activeTab, user]);

//   // ─── Handlers ───────────────────────────────────────────────────────────────
//   const handleSaveProfile = async () => {
//     if (!profileForm.fullName.trim()) { setProfileMsg("Name is required"); return; }
//     setProfileSaving(true);
//     try {
//       const res = await updateProfile({ fullName: profileForm.fullName, phone: profileForm.phone });
//       setProfileMsg(res.success ? "Profile updated successfully!" : res.error || "Failed to update");
//     } catch (err) {
//       setProfileMsg(err.message);
//     }
//     setProfileSaving(false);
//     setTimeout(() => setProfileMsg(""), 3000);
//   };

//   const handleSaveAddress = async (form) => {
//     if (!user) return;
//     setAddrSaving(true);
//     try {
//       if (addrModal?.addressId) {
//         await updateAddress({ ...form, addressId: addrModal.addressId });
//       } else {
//         await addAddress(form);
//       }
//       const res = await getAddresses();
//       setAddresses(res.data || []);
//       setAddrModal(null);
//     } catch (err) {
//       setError(err.message);
//     }
//     setAddrSaving(false);
//   };

//   const handleDeleteAddress = async (addressId) => {
//     if (!window.confirm("Delete this address?")) return;
//     try {
//       await deleteAddress({ addressId });
//       setAddresses(prev => prev.filter(a => a.addressId !== addressId));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleRemoveWishlist = async (wishlistId) => {
//     try {
//       await removeFromWishlist({ wishlistId });
//       setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleMoveToCart = (item) => {
//     if (item.product) {
//       addToCart({
//         id           : item.productId,
//         ...item.product,
//         discountPrice: item.product.salePrice || item.product.price,
//       });
//       handleRemoveWishlist(item.wishlistId);
//     }
//   };

//   if (!user) return null;

//   const tabNav = (key) => {
//     setActiveTab(key);
//     window.history.replaceState(null, "", `#/dashboard?tab=${key}`);
//   };

//   // ─── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px", fontFamily: ff }}>

//       {/* Header */}
//       <div style={{ borderBottom: `3px solid ${NAVY}`, paddingBottom: 24, marginBottom: 36 }}>
//         <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#888", marginBottom: 6 }}>MY ACCOUNT</div>
//         <h1 style={{ fontSize: 32, fontWeight: 900, color: NAVY, margin: 0, letterSpacing: "0.02em" }}>
//           {(user.name || user.fullName || "").toUpperCase()}
//         </h1>
//         <div style={{ fontSize: 13, color: "#777", marginTop: 4, fontFamily: mono }}>{user.email}</div>
//       </div>

//       <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

//         {/* Sidebar */}
//         <nav style={{ width: 180, flexShrink: 0 }}>
//           {TABS.map(tab => (
//             <button key={tab.key} onClick={() => tabNav(tab.key)}
//               style={{
//                 display      : "block", width: "100%", textAlign: "left",
//                 background   : activeTab === tab.key ? NAVY : "none",
//                 color        : activeTab === tab.key ? "#fff" : NAVY,
//                 border       : "none",
//                 borderLeft   : `3px solid ${activeTab === tab.key ? ACCENT : "transparent"}`,
//                 padding      : "12px 16px", fontSize: 11, fontWeight: 900,
//                 letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff,
//                 marginBottom : 2, transition: "all 0.15s",
//               }}>
//               {tab.label}
//             </button>
//           ))}
//           <button onClick={() => { logout(); navigate("#/"); }}
//             style={{
//               display      : "block", width: "100%", textAlign: "left",
//               background   : "none", color: "#c0392b", border: "none",
//               borderLeft   : "3px solid transparent", padding: "12px 16px",
//               fontSize     : 11, fontWeight: 900, letterSpacing: "0.14em",
//               cursor       : "pointer", fontFamily: ff, marginTop: 16,
//             }}>
//             SIGN OUT
//           </button>
//         </nav>

//         {/* Content */}
//         <div style={{ flex: 1 }}>
//           {error && (
//             <div style={{
//               background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33",
//               padding: "10px 14px", fontSize: 13, marginBottom: 20,
//             }}>
//               {error}
//             </div>
//           )}

//           {/* ── PROFILE ── */}
//           {activeTab === "profile" && (
//             <div>
//               <SectionTitle>PERSONAL INFORMATION</SectionTitle>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 520 }}>
//                 <FormField label="FULL NAME" value={profileForm.fullName}
//                   onChange={v => setProfileForm(f => ({ ...f, fullName: v }))} />
//                 <FormField label="PHONE" value={profileForm.phone}
//                   onChange={v => setProfileForm(f => ({ ...f, phone: v }))} />
//                 <FormField label="EMAIL" value={user.email} disabled />
//               </div>
//               {profileMsg && (
//                 <div style={{
//                   fontSize: 13, marginTop: 12, fontFamily: mono,
//                   color: profileMsg.includes("success") ? "#2a8a50" : "#a33",
//                 }}>
//                   {profileMsg}
//                 </div>
//               )}
//               <button onClick={handleSaveProfile} disabled={profileSaving}
//                 style={{
//                   marginTop    : 20, background: NAVY, color: "#fff", border: "none",
//                   padding      : "12px 28px", fontSize: 11, fontWeight: 900,
//                   letterSpacing: "0.14em", fontFamily: ff,
//                   cursor       : profileSaving ? "not-allowed" : "pointer",
//                   opacity      : profileSaving ? 0.7 : 1,
//                 }}>
//                 {profileSaving ? "SAVING…" : "SAVE CHANGES"}
//               </button>
//             </div>
//           )}

//           {/* ── ORDERS ── */}
//           {activeTab === "orders" && (
//             <div>
//               <SectionTitle>MY ORDERS</SectionTitle>
//               {loading ? <Loader /> : orders.length === 0 ? (
//                 <EmptyState
//                   msg="No orders yet. Start shopping!"
//                   action={() => navigate("#/products")}
//                   actionLabel="SHOP NOW"
//                 />
//               ) : (
//                 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//                   {orders.map(order => {
//                     const products = Array.isArray(order.products) ? order.products : [];
//                     return (
//                       <div key={order.orderId} style={{ border: `1.5px solid #dde`, padding: 20 }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                           <div>
//                             <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.1em" }}>
//                               ORDER #{order.orderId}
//                             </div>
//                             <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginTop: 2 }}>
//                               {order.createdAt
//                                 ? new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })
//                                 : "Date unknown"}
//                             </div>
//                           </div>
//                           <StatusBadge status={order.status} />
//                         </div>
//                         <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
//                           {products.length === 0 ? (
//                             <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, padding: "10px 0" }}>
//                               No items found for this order
//                             </div>
//                           ) : (
//                             products.map((p, i) => {
//                               const qty = p.qty ?? p.quantity ?? 1;
//                               const price = p.price ?? p.unitPrice ?? 0;
//                               const subtotal = price * qty;
//                               return (
//                                 <div key={i} style={{
//                                   display: "flex", justifyContent: "space-between",
//                                   marginBottom: 8, fontSize: 13, fontFamily: mono,
//                                   color: "#444", padding: "4px 0",
//                                 }}>
//                                   <span>
//                                     {p.name || p.productName || `Product #${p.productId}`}
//                                     <span style={{ color: "#888", marginLeft: "8px" }}>×{qty}</span>
//                                   </span>
//                                   <span style={{ fontWeight: 600, color: NAVY }}>
//                                     PKR {subtotal.toLocaleString()}
//                                   </span>
//                                 </div>
//                               );
//                             })
//                           )}
//                         </div>
//                         <div style={{
//                           borderTop: "1px solid #eee", paddingTop: 10, marginTop: 6,
//                           display: "flex", justifyContent: "space-between", alignItems: "center",
//                         }}>
//                           <span style={{ fontSize: 11, color: "#888", fontFamily: ff, letterSpacing: "0.08em" }}>
//                             {order.paymentMethod || "COD"} · {products.length} item(s)
//                           </span>
//                           <span style={{ fontSize: 14, fontWeight: 900, color: NAVY, fontFamily: ff }}>
//                             PKR {Number(order.total).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── ADDRESSES ── */}
//           {activeTab === "addresses" && (
//             <div>
//               <SectionTitle>SAVED ADDRESSES</SectionTitle>
//               {addrModal !== null && (
//                 <AddressForm
//                   initial={addrModal}
//                   onSave={handleSaveAddress}
//                   onCancel={() => setAddrModal(null)}
//                   saving={addrSaving}
//                 />
//               )}
//               {loading ? <Loader /> : (
//                 <>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
//                     {addresses.map(addr => (
//                       <div key={addr.addressId}
//                         style={{
//                           border  : `1.5px solid ${addr.isDefault === true || addr.isDefault === "TRUE" ? NAVY : "#dde"}`,
//                           padding : 18, position: "relative",
//                         }}>
//                         {(addr.isDefault === true || addr.isDefault === "TRUE") && (
//                           <span style={{
//                             position: "absolute", top: 10, right: 10,
//                             background: NAVY, color: "#fff", fontSize: 9,
//                             fontWeight: 900, padding: "3px 8px",
//                             letterSpacing: "0.1em", fontFamily: ff,
//                           }}>
//                             DEFAULT
//                           </span>
//                         )}
//                         <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{addr.fullName}</div>
//                         <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
//                           {addr.address}<br />
//                           {addr.city}, {addr.country} {addr.postalCode}<br />
//                           {addr.phone}
//                         </div>
//                         <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
//                           <InlineBtn onClick={() => setAddrModal(addr)}>EDIT</InlineBtn>
//                           <InlineBtn onClick={() => handleDeleteAddress(addr.addressId)} danger>DELETE</InlineBtn>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <button onClick={() => setAddrModal({})}
//                     style={{
//                       background: "none", border: `1.5px dashed ${NAVY}`, color: NAVY,
//                       padding: "12px 24px", fontSize: 11, fontWeight: 900,
//                       letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
//                     }}>
//                     + ADD NEW ADDRESS
//                   </button>
//                 </>
//               )}
//             </div>
//           )}

//           {/* ── WISHLIST ── */}
//           {activeTab === "wishlist" && (
//             <div>
//               <SectionTitle>MY WISHLIST</SectionTitle>
//               {loading ? <Loader /> : wishlist.length === 0 ? (
//                 <EmptyState
//                   msg="Your wishlist is empty."
//                   action={() => navigate("#/products")}
//                   actionLabel="EXPLORE FRAMES"
//                 />
//               ) : (
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
//                   {wishlist.map(item => (
//                     <div key={item.wishlistId} style={{ border: "1.5px solid #eee", padding: 16 }}>
//                       {item.product?.imageUrl && (
//                         <img
//                           src={item.product.imageUrl}
//                           alt={item.product.name}
//                           style={{ width: "100%", height: 140, objectFit: "contain", background: "#f8f8f8", marginBottom: 10 }}
//                         />
//                       )}
//                       <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.06em", marginBottom: 4 }}>
//                         {item.product?.name || "Unknown Product"}
//                       </div>
//                       <div style={{ fontSize: 13, color: NAVY, fontFamily: mono, marginBottom: 12 }}>
//                         PKR {Number(item.product?.salePrice || item.product?.price || 0).toLocaleString()}
//                       </div>
//                       <div style={{ display: "flex", gap: 8 }}>
//                         <button onClick={() => handleMoveToCart(item)}
//                           style={{
//                             flex: 1, background: NAVY, color: "#fff", border: "none",
//                             padding: "8px", fontSize: 10, fontWeight: 900,
//                             letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
//                           }}>
//                           ADD TO CART
//                         </button>
//                         <button onClick={() => handleRemoveWishlist(item.wishlistId)}
//                           style={{
//                             background: "none", border: "1.5px solid #ddd",
//                             color: "#888", padding: "8px 10px", fontSize: 14, cursor: "pointer",
//                           }}>
//                           ×
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── REVIEWS ── */}
//           {activeTab === "reviews" && (
//             <ReviewsTab navigate={navigate} user={user} />
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function SectionTitle({ children }) {
//   return (
//     <div style={{
//       fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: NAVY,
//       borderBottom: `2px solid ${NAVY}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff,
//     }}>
//       {children}
//     </div>
//   );
// }

// function FormField({ label, value, onChange, disabled }) {
//   return (
//     <div>
//       <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 5, fontFamily: ff }}>
//         {label}
//       </div>
//       <input
//         value={value}
//         onChange={onChange ? e => onChange(e.target.value) : undefined}
//         disabled={disabled}
//         style={{
//           width: "100%", padding: "10px 12px", border: "1.5px solid #cde",
//           fontSize: 13, fontFamily: mono, outline: "none",
//           background: disabled ? "#f5f5f5" : "#fff", color: NAVY, boxSizing: "border-box",
//         }}
//       />
//     </div>
//   );
// }

// function InlineBtn({ children, onClick, danger }) {
//   return (
//     <button onClick={onClick}
//       style={{
//         background: "none",
//         border: `1px solid ${danger ? "#e74c3c" : "#cde"}`,
//         color: danger ? "#e74c3c" : NAVY,
//         padding: "5px 12px", fontSize: 10, fontWeight: 900,
//         letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
//       }}>
//       {children}
//     </button>
//   );
// }

// function StatusBadge({ status }) {
//   const colors = {
//     pending  : { bg: "#fff8e1", color: "#b8860b" },
//     confirmed: { bg: "#e8f5e9", color: "#2e7d32" },
//     shipped  : { bg: "#e3f2fd", color: "#1565c0" },
//     delivered: { bg: "#e8f5e9", color: "#1b5e20" },
//     cancelled: { bg: "#fce4ec", color: "#c62828" },
//     complete  : { bg: "#e8f5e9", color: "#1b5e20" },
//   };
//   const c = colors[(status || "").toLowerCase()] || { bg: "#f5f5f5", color: "#555" };
//   return (
//     <span style={{
//       background: c.bg, color: c.color, fontSize: 9, fontWeight: 900,
//       padding: "4px 10px", letterSpacing: "0.12em", fontFamily: ff,
//     }}>
//       {(status || "pending").toUpperCase()}
//     </span>
//   );
// }

// function Loader() {
//   return (
//     <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>
//       LOADING…
//     </div>
//   );
// }

// function EmptyState({ msg, action, actionLabel }) {
//   return (
//     <div style={{ textAlign: "center", padding: "60px 0" }}>
//       <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 20 }}>{msg}</div>
//       {action && (
//         <button onClick={action}
//           style={{
//             background: NAVY, color: "#fff", border: "none", padding: "12px 28px",
//             fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
//           }}>
//           {actionLabel}
//         </button>
//       )}
//     </div>
//   );
// }





























// ============================================================
// DashboardPage.jsx — User Dashboard
// Sections: Profile, Orders, Addresses, Wishlist, Reviews
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../Auth/auth.jsx";
import { PRODUCTS_DATA } from "../prodcut.js";
import {
  getOrders,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getWishlist,
  removeFromWishlist,
  getUserReviews,
  getPurchasedProducts,
} from "../services/service.js";
import { useCart } from "../contexts/CardContext.jsx";

const NAVY   = "#0c2c41";
const ACCENT = "#89c4e1";
const ff     = "'Franklin Gothic Medium','Arial Narrow', Arial, sans-serif";
const mono   = "'Courier New', Courier, monospace";

const TABS = [
  { key: "profile",   label: "PROFILE"   },
  { key: "orders",    label: "ORDERS"    },
  { key: "addresses", label: "ADDRESSES" },
  { key: "wishlist",  label: "WISHLIST"  },
  { key: "reviews",   label: "REVIEWS"   },
];

// ─── HELPER — Join raw wishlist rows (wishlistId, userId, productId) with
// product details from PRODUCTS_DATA, since the backend (Code.gs) has
// no Products sheet — products live entirely in the frontend. ─────────────
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
    .filter(item => item !== null); // drop wishlist rows whose product no longer exists
}

// ─── Address Form ─────────────────────────────────────────────────────────────
function AddressForm({ initial = {}, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    fullName  : initial.fullName   || "",
    phone     : initial.phone      || "",
    address   : initial.address    || "",
    city      : initial.city       || "",
    country   : initial.country    || "Pakistan",
    postalCode: initial.postalCode || "",
    isDefault : initial.isDefault === true || initial.isDefault === "TRUE",
  });
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ background: "#f8fbfd", border: `1.5px solid ${NAVY}`, padding: 24, marginBottom: 20 }}>
      <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 900, letterSpacing: "0.14em", color: NAVY, marginBottom: 16 }}>
        {initial.addressId ? "EDIT ADDRESS" : "NEW ADDRESS"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {[
          { label: "FULL NAME",   key: "fullName",   placeholder: "Jane Smith"             },
          { label: "PHONE",       key: "phone",      placeholder: "+92 300 0000000"        },
          { label: "ADDRESS",     key: "address",    placeholder: "123 Main St", full: true },
          { label: "CITY",        key: "city",       placeholder: "Karachi"                },
          { label: "COUNTRY",     key: "country",    placeholder: "Pakistan"               },
          { label: "POSTAL CODE", key: "postalCode", placeholder: "75500"                  },
        ].map(f => (
          <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 4, fontFamily: ff }}>
              {f.label}
            </div>
            <input
              value={form[f.key]}
              onChange={e => set(f.key)(e.target.value)}
              placeholder={f.placeholder}
              style={{
                width: "100%", padding: "9px 12px", border: `1.5px solid #cde`,
                fontSize: 13, fontFamily: mono, outline: "none",
                background: "#fff", color: NAVY, boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 16 }}>
        <input type="checkbox" checked={form.isDefault} onChange={e => set("isDefault")(e.target.checked)} />
        <span style={{ fontSize: 12, fontFamily: ff, color: NAVY }}>Set as default address</span>
      </label>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => onSave(form)} disabled={saving}
          style={{
            background: NAVY, color: "#fff", border: "none", padding: "10px 24px",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", fontFamily: ff,
            cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
          }}>
          {saving ? "SAVING…" : "SAVE ADDRESS"}
        </button>
        <button onClick={onCancel}
          style={{
            background: "none", color: NAVY, border: `1.5px solid ${NAVY}`,
            padding: "10px 20px", fontSize: 11, fontWeight: 900,
            letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
          }}>
          CANCEL
        </button>
      </div>
    </div>
  );
}

// ─── Stars Display ────────────────────────────────────────────────────────────
function Stars({ rating, max = 5, size = 14 }) {
  return (
    <span style={{ color: "#f5a623", fontSize: size, letterSpacing: 2 }}>
      {Array.from({ length: max }, (_, i) => i < Math.round(rating) ? "★" : "☆").join("")}
    </span>
  );
}

// ─── Interactive Star Selector ────────────────────────────────────────────────
function StarSelector({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 32, color: star <= (hovered || value) ? "#f5a623" : "#ddd",
            padding: "0 2px", transition: "color 0.15s",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ─── Reviews Tab ─────────────────────────────────────────────────────────────
function ReviewsTab({ navigate, user }) {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch orders to get purchased products
      const ordersRes = await getOrders();
      const orders = ordersRes.data || [];

      // Flatten all purchased products across all orders (deduplicated by productId)
      const seen = new Set();
      const allProducts = [];
      orders.forEach(order => {
        const products = Array.isArray(order.products) ? order.products : [];
        products.forEach(p => {
          const key = String(p.productId || p.id || "");
          if (key && !seen.has(key)) {
            seen.add(key);
            allProducts.push({
              productId : key,
              name      : p.name || p.productName || `Product #${key}`,
              unitPrice : p.unitPrice || p.price || 0,
              image     : p.image || "",
              orderId   : order.orderId,
              orderDate : order.createdAt,
            });
          }
        });
      });
      setPurchasedProducts(allProducts);

      // Fetch user's own reviews
      try {
        const reviewsRes = await getUserReviews();
        const reviews = reviewsRes.data || [];
        setUserReviews(Array.isArray(reviews) ? reviews : []);
      } catch {
        // If getUserReviews not yet on backend, fall back to empty
        setUserReviews([]);
      }
    } catch (err) {
      setError(err.message || "Failed to load data");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <Loader />;

  if (error) return (
    <div style={{ background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33", padding: "12px 16px", fontSize: 13, fontFamily: mono }}>
      {error}
    </div>
  );

  if (purchasedProducts.length === 0) return (
    <EmptyState msg="You haven't purchased any products yet. Reviews can be submitted after purchase." />
  );

  // Build a map: productId → review object (if exists)
  const reviewMap = {};
  userReviews.forEach(r => {
    reviewMap[String(r.productId)] = r;
  });

  return (
    <div>
      <SectionTitle>MY REVIEWS</SectionTitle>
      <p style={{ fontSize: 12, color: "#888", fontFamily: mono, marginBottom: 24, lineHeight: 1.7 }}>
        Below are all products you've purchased. You can submit a review for each one.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {purchasedProducts.map(product => {
          const review = reviewMap[product.productId];
          const hasReview = !!review;

          return (
            <div key={product.productId} style={{
              border: `1.5px solid ${hasReview ? ACCENT : "#e8e8e8"}`,
              padding: 20,
              background: hasReview ? "#f8fcff" : "#fff",
              display: "flex", alignItems: "flex-start", gap: 16,
            }}>
              {/* Product Image */}
              <div style={{
                width: 80, height: 64, background: "#f5f0e8", flexShrink: 0,
                overflow: "hidden", border: "1px solid #eee",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {product.image
                  ? <img src={product.image} alt={product.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                  : <span style={{ fontSize: 24 }}>👓</span>
                }
              </div>

              {/* Product Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: ff, fontWeight: 900, fontSize: 13, color: NAVY, marginBottom: 3, letterSpacing: "0.04em" }}>
                  {product.name}
                </div>
                <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginBottom: 6 }}>
                  ORDER #{product.orderId}
                  {product.orderDate && (
                    <span style={{ marginLeft: 8 }}>
                      · {new Date(product.orderDate).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  )}
                </div>

                {/* Review Status */}
                {hasReview ? (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Stars rating={Number(review.rating) || 0} />
                      <span style={{
                        fontSize: 9, fontWeight: 900, letterSpacing: "0.1em",
                        padding: "3px 8px", fontFamily: ff,
                        background: review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
                          ? "#eaf5ef" : "#fff8e1",
                        color: review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
                          ? "#2a8a50" : "#b8860b",
                      }}>
                        {review.approved === true || review.approved === "TRUE" || String(review.approved).toLowerCase() === "true"
                          ? "✓ PUBLISHED" : "⏳ PENDING APPROVAL"}
                      </span>
                    </div>
                    {review.review && (
                      <p style={{ fontSize: 12, color: "#555", fontFamily: mono, margin: "0 0 10px", lineHeight: 1.6, maxWidth: 480 }}>
                        "{review.review}"
                      </p>
                    )}
                    <div style={{ fontSize: 10, color: "#aaa", fontFamily: mono, marginBottom: 10 }}>
                      Submitted {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: "#aaa", fontFamily: mono, marginBottom: 10, letterSpacing: "0.04em" }}>
                    No review submitted yet
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                {hasReview ? (
                  <>
                    <button
                      onClick={() => navigate(`#/review/${product.productId}?reviewId=${review.reviewId}`)}
                      style={{
                        background: "none", border: `1.5px solid ${NAVY}`, color: NAVY,
                        padding: "8px 14px", fontSize: 10, fontWeight: 900,
                        letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      EDIT REVIEW
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate(`#/review/${product.productId}`)}
                    style={{
                      background: NAVY, color: "#fff", border: "none",
                      padding: "8px 14px", fontSize: 10, fontWeight: 900,
                      letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    SUBMIT REVIEW
                  </button>
                )}
                <button
                  onClick={() => navigate(`#/products/${product.productId}`)}
                  style={{
                    background: "none", border: "1.5px solid #dde", color: "#888",
                    padding: "8px 14px", fontSize: 10, fontWeight: 900,
                    letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  VIEW PRODUCT
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function DashboardPage({ navigate }) {
  const { user, updateProfile, logout } = useAuth();

  const hashParams = new URLSearchParams(
    window.location.hash.replace(/^[^?]*/, "").replace("?", "")
  );
  const [activeTab, setActiveTab] = useState(hashParams.get("tab") || "profile");

  const [orders,    setOrders]    = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [wishlist,  setWishlist]  = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const [profileForm,   setProfileForm]   = useState({ fullName: user?.fullName || user?.name || "", phone: user?.phone || "" });
  const [profileMsg,    setProfileMsg]    = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  const [addrModal,  setAddrModal]  = useState(null);
  const [addrSaving, setAddrSaving] = useState(false);

  const { addToCart } = useCart();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("#/");
  }, [user, navigate]);

  // ─── Load data per tab ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    if (activeTab === "reviews") return; // ReviewsTab loads its own data
    setError("");
    setLoading(true);

    const load = async () => {
      try {
        if (activeTab === "orders") {
          const res = await getOrders();
          const ordersData = res.data || [];

          const processedOrders = ordersData.map(order => {
            let products = order.products || [];
            if (typeof products === 'string') {
              try { products = JSON.parse(products); } catch { products = []; }
            }
            products = products.map(p => ({
              ...p,
              qty: p.quantity || p.qty || 1,
              quantity: p.quantity || p.qty || 1,
              price: p.unitPrice || p.price || 0,
            }));
            let address = order.address;
            try {
              if (typeof order.address === 'string') address = JSON.parse(order.address);
            } catch { address = order.address; }
            return { ...order, products, address };
          });
          setOrders(processedOrders);

        } else if (activeTab === "addresses") {
          const res = await getAddresses();
          setAddresses(res.data || []);

        } else if (activeTab === "wishlist") {
          // ─── FIXED: enrich raw wishlist rows (wishlistId, userId, productId)
          // with product details from PRODUCTS_DATA, since Code.gs has no
          // Products sheet and only returns the raw join keys.
          const res = await getWishlist();
          const rawItems = res.data || [];
          setWishlist(enrichWishlistItems(rawItems));
        }
      } catch (err) {
        console.error("Load error:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    load();
  }, [activeTab, user]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!profileForm.fullName.trim()) { setProfileMsg("Name is required"); return; }
    setProfileSaving(true);
    try {
      const res = await updateProfile({ fullName: profileForm.fullName, phone: profileForm.phone });
      setProfileMsg(res.success ? "Profile updated successfully!" : res.error || "Failed to update");
    } catch (err) {
      setProfileMsg(err.message);
    }
    setProfileSaving(false);
    setTimeout(() => setProfileMsg(""), 3000);
  };

  const handleSaveAddress = async (form) => {
    if (!user) return;
    setAddrSaving(true);
    try {
      if (addrModal?.addressId) {
        await updateAddress({ ...form, addressId: addrModal.addressId });
      } else {
        await addAddress(form);
      }
      const res = await getAddresses();
      setAddresses(res.data || []);
      setAddrModal(null);
    } catch (err) {
      setError(err.message);
    }
    setAddrSaving(false);
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteAddress({ addressId });
      setAddresses(prev => prev.filter(a => a.addressId !== addressId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveWishlist = async (wishlistId) => {
    try {
      await removeFromWishlist({ wishlistId });
      setWishlist(prev => prev.filter(w => w.wishlistId !== wishlistId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMoveToCart = (item) => {
    if (item.product) {
      addToCart({
        id           : item.productId,
        ...item.product,
        discountPrice: item.product.salePrice || item.product.price,
      });
      handleRemoveWishlist(item.wishlistId);
    }
  };

  if (!user) return null;

  const tabNav = (key) => {
    setActiveTab(key);
    window.history.replaceState(null, "", `#/dashboard?tab=${key}`);
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px", fontFamily: ff }}>

      {/* Header */}
      <div style={{ borderBottom: `3px solid ${NAVY}`, paddingBottom: 24, marginBottom: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#888", marginBottom: 6 }}>MY ACCOUNT</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: NAVY, margin: 0, letterSpacing: "0.02em" }}>
          {(user.name || user.fullName || "").toUpperCase()}
        </h1>
        <div style={{ fontSize: 13, color: "#777", marginTop: 4, fontFamily: mono }}>{user.email}</div>
      </div>

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* Sidebar */}
        <nav style={{ width: 180, flexShrink: 0 }}>
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => tabNav(tab.key)}
              style={{
                display      : "block", width: "100%", textAlign: "left",
                background   : activeTab === tab.key ? NAVY : "none",
                color        : activeTab === tab.key ? "#fff" : NAVY,
                border       : "none",
                borderLeft   : `3px solid ${activeTab === tab.key ? ACCENT : "transparent"}`,
                padding      : "12px 16px", fontSize: 11, fontWeight: 900,
                letterSpacing: "0.14em", cursor: "pointer", fontFamily: ff,
                marginBottom : 2, transition: "all 0.15s",
              }}>
              {tab.label}
            </button>
          ))}
          <button onClick={() => { logout(); navigate("#/"); }}
            style={{
              display      : "block", width: "100%", textAlign: "left",
              background   : "none", color: "#c0392b", border: "none",
              borderLeft   : "3px solid transparent", padding: "12px 16px",
              fontSize     : 11, fontWeight: 900, letterSpacing: "0.14em",
              cursor       : "pointer", fontFamily: ff, marginTop: 16,
            }}>
            SIGN OUT
          </button>
        </nav>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {error && (
            <div style={{
              background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33",
              padding: "10px 14px", fontSize: 13, marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <div>
              <SectionTitle>PERSONAL INFORMATION</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 520 }}>
                <FormField label="FULL NAME" value={profileForm.fullName}
                  onChange={v => setProfileForm(f => ({ ...f, fullName: v }))} />
                <FormField label="PHONE" value={profileForm.phone}
                  onChange={v => setProfileForm(f => ({ ...f, phone: v }))} />
                <FormField label="EMAIL" value={user.email} disabled />
              </div>
              {profileMsg && (
                <div style={{
                  fontSize: 13, marginTop: 12, fontFamily: mono,
                  color: profileMsg.includes("success") ? "#2a8a50" : "#a33",
                }}>
                  {profileMsg}
                </div>
              )}
              <button onClick={handleSaveProfile} disabled={profileSaving}
                style={{
                  marginTop    : 20, background: NAVY, color: "#fff", border: "none",
                  padding      : "12px 28px", fontSize: 11, fontWeight: 900,
                  letterSpacing: "0.14em", fontFamily: ff,
                  cursor       : profileSaving ? "not-allowed" : "pointer",
                  opacity      : profileSaving ? 0.7 : 1,
                }}>
                {profileSaving ? "SAVING…" : "SAVE CHANGES"}
              </button>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div>
              <SectionTitle>MY ORDERS</SectionTitle>
              {loading ? <Loader /> : orders.length === 0 ? (
                <EmptyState
                  msg="No orders yet. Start shopping!"
                  action={() => navigate("#/products")}
                  actionLabel="SHOP NOW"
                />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {orders.map(order => {
                    const products = Array.isArray(order.products) ? order.products : [];
                    return (
                      <div key={order.orderId} style={{ border: `1.5px solid #dde`, padding: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.1em" }}>
                              ORDER #{order.orderId}
                            </div>
                            <div style={{ fontSize: 11, color: "#888", fontFamily: mono, marginTop: 2 }}>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })
                                : "Date unknown"}
                            </div>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>
                        <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
                          {products.length === 0 ? (
                            <div style={{ fontSize: 12, color: "#aaa", fontFamily: mono, padding: "10px 0" }}>
                              No items found for this order
                            </div>
                          ) : (
                            products.map((p, i) => {
                              const qty = p.qty ?? p.quantity ?? 1;
                              const price = p.price ?? p.unitPrice ?? 0;
                              const subtotal = price * qty;
                              return (
                                <div key={i} style={{
                                  display: "flex", justifyContent: "space-between",
                                  marginBottom: 8, fontSize: 13, fontFamily: mono,
                                  color: "#444", padding: "4px 0",
                                }}>
                                  <span>
                                    {p.name || p.productName || `Product #${p.productId}`}
                                    <span style={{ color: "#888", marginLeft: "8px" }}>×{qty}</span>
                                  </span>
                                  <span style={{ fontWeight: 600, color: NAVY }}>
                                    PKR {subtotal.toLocaleString()}
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </div>
                        <div style={{
                          borderTop: "1px solid #eee", paddingTop: 10, marginTop: 6,
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}>
                          <span style={{ fontSize: 11, color: "#888", fontFamily: ff, letterSpacing: "0.08em" }}>
                            {order.paymentMethod || "COD"} · {products.length} item(s)
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 900, color: NAVY, fontFamily: ff }}>
                            PKR {Number(order.total).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── ADDRESSES ── */}
          {activeTab === "addresses" && (
            <div>
              <SectionTitle>SAVED ADDRESSES</SectionTitle>
              {addrModal !== null && (
                <AddressForm
                  initial={addrModal}
                  onSave={handleSaveAddress}
                  onCancel={() => setAddrModal(null)}
                  saving={addrSaving}
                />
              )}
              {loading ? <Loader /> : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                    {addresses.map(addr => (
                      <div key={addr.addressId}
                        style={{
                          border  : `1.5px solid ${addr.isDefault === true || addr.isDefault === "TRUE" ? NAVY : "#dde"}`,
                          padding : 18, position: "relative",
                        }}>
                        {(addr.isDefault === true || addr.isDefault === "TRUE") && (
                          <span style={{
                            position: "absolute", top: 10, right: 10,
                            background: NAVY, color: "#fff", fontSize: 9,
                            fontWeight: 900, padding: "3px 8px",
                            letterSpacing: "0.1em", fontFamily: ff,
                          }}>
                            DEFAULT
                          </span>
                        )}
                        <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{addr.fullName}</div>
                        <div style={{ fontSize: 12, color: "#555", fontFamily: mono, lineHeight: 1.8 }}>
                          {addr.address}<br />
                          {addr.city}, {addr.country} {addr.postalCode}<br />
                          {addr.phone}
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                          <InlineBtn onClick={() => setAddrModal(addr)}>EDIT</InlineBtn>
                          <InlineBtn onClick={() => handleDeleteAddress(addr.addressId)} danger>DELETE</InlineBtn>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setAddrModal({})}
                    style={{
                      background: "none", border: `1.5px dashed ${NAVY}`, color: NAVY,
                      padding: "12px 24px", fontSize: 11, fontWeight: 900,
                      letterSpacing: "0.12em", fontFamily: ff, cursor: "pointer",
                    }}>
                    + ADD NEW ADDRESS
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── WISHLIST ── */}
          {activeTab === "wishlist" && (
            <div>
              <SectionTitle>MY WISHLIST</SectionTitle>
              {loading ? <Loader /> : wishlist.length === 0 ? (
                <EmptyState
                  msg="Your wishlist is empty."
                  action={() => navigate("#/products")}
                  actionLabel="EXPLORE FRAMES"
                />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                  {wishlist.map(item => (
                    <div key={item.wishlistId} style={{ border: "1.5px solid #eee", padding: 16 }}>
                      {item.product?.imageUrl && (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          loading="lazy" decoding="async"
                          style={{ width: "100%", height: 140, objectFit: "contain", background: "#f8f8f8", marginBottom: 10 }}
                        />
                      )}
                      <div style={{ fontSize: 12, fontWeight: 900, color: NAVY, letterSpacing: "0.06em", marginBottom: 4 }}>
                        {item.product?.name || "Unknown Product"}
                      </div>
                      <div style={{ fontSize: 13, color: NAVY, fontFamily: mono, marginBottom: 12 }}>
                        PKR {Number(item.product?.salePrice || item.product?.price || 0).toLocaleString()}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => handleMoveToCart(item)}
                          style={{
                            flex: 1, background: NAVY, color: "#fff", border: "none",
                            padding: "8px", fontSize: 10, fontWeight: 900,
                            letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
                          }}>
                          ADD TO CART
                        </button>
                        <button onClick={() => handleRemoveWishlist(item.wishlistId)}
                          style={{
                            background: "none", border: "1.5px solid #ddd",
                            color: "#888", padding: "8px 10px", fontSize: 14, cursor: "pointer",
                          }}>
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── REVIEWS ── */}
          {activeTab === "reviews" && (
            <ReviewsTab navigate={navigate} user={user} />
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: NAVY,
      borderBottom: `2px solid ${NAVY}`, paddingBottom: 10, marginBottom: 24, fontFamily: ff,
    }}>
      {children}
    </div>
  );
}

function FormField({ label, value, onChange, disabled }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: NAVY, marginBottom: 5, fontFamily: ff }}>
        {label}
      </div>
      <input
        value={value}
        onChange={onChange ? e => onChange(e.target.value) : undefined}
        disabled={disabled}
        style={{
          width: "100%", padding: "10px 12px", border: "1.5px solid #cde",
          fontSize: 13, fontFamily: mono, outline: "none",
          background: disabled ? "#f5f5f5" : "#fff", color: NAVY, boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function InlineBtn({ children, onClick, danger }) {
  return (
    <button onClick={onClick}
      style={{
        background: "none",
        border: `1px solid ${danger ? "#e74c3c" : "#cde"}`,
        color: danger ? "#e74c3c" : NAVY,
        padding: "5px 12px", fontSize: 10, fontWeight: 900,
        letterSpacing: "0.1em", fontFamily: ff, cursor: "pointer",
      }}>
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const colors = {
    pending  : { bg: "#fff8e1", color: "#b8860b" },
    confirmed: { bg: "#e8f5e9", color: "#2e7d32" },
    shipped  : { bg: "#e3f2fd", color: "#1565c0" },
    delivered: { bg: "#e8f5e9", color: "#1b5e20" },
    cancelled: { bg: "#fce4ec", color: "#c62828" },
    complete  : { bg: "#e8f5e9", color: "#1b5e20" },
  };
  const c = colors[(status || "").toLowerCase()] || { bg: "#f5f5f5", color: "#555" };
  return (
    <span style={{
      background: c.bg, color: c.color, fontSize: 9, fontWeight: 900,
      padding: "4px 10px", letterSpacing: "0.12em", fontFamily: ff,
    }}>
      {(status || "pending").toUpperCase()}
    </span>
  );
}

function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontFamily: ff, fontSize: 11, letterSpacing: "0.14em" }}>
      LOADING…
    </div>
  );
}

function EmptyState({ msg, action, actionLabel }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: 13, color: "#888", fontFamily: mono, marginBottom: 20 }}>{msg}</div>
      {action && (
        <button onClick={action}
          style={{
            background: NAVY, color: "#fff", border: "none", padding: "12px 28px",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", fontFamily: ff, cursor: "pointer",
          }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}