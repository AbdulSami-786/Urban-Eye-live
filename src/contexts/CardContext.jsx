// import { createContext, useContext, useState, useCallback, useEffect } from "react";

// export const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     try { return JSON.parse(localStorage.getItem("os_cart") || "[]"); }
//     catch { return []; }
//   });

//   useEffect(() => {
//     localStorage.setItem("os_cart", JSON.stringify(cartItems));
//     window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems }));
//   }, [cartItems]);

//   const addToCart = useCallback((product, qty = 1) => {
//     setCartItems(prev => {
//       const ex = prev.find(i => i.id === product.id);
//       if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
//       return [...prev, { ...product, qty }];
//     });
//   }, []);

//   const removeFromCart = useCallback(id => setCartItems(prev => prev.filter(i => i.id !== id)), []);
//   const updateQty = useCallback((id, qty) => { if (qty < 1) return; setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i)); }, []);
//   const clearCart = useCallback(() => setCartItems([]), []);
//   const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
//   const cartTotal = cartItems.reduce((s, i) => s + i.discountPrice * i.qty, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() { return useContext(CartContext); }

















import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { addToCart as apiAddToCart, updateCart as apiUpdateCart, removeFromCart as apiRemoveFromCart } from "../services/service.js";
import { useAuth } from "../Auth/auth.jsx";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [pendingSync, setPendingSync] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage FIRST on mount (fast)
  useEffect(() => {
    try {
      const localCart = JSON.parse(localStorage.getItem("os_cart") || "[]");
      setCartItems(localCart);
    } catch { 
      setCartItems([]); 
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever cart changes (always keep localStorage updated)
  useEffect(() => {
    if (!syncing) {
      localStorage.setItem("os_cart", JSON.stringify(cartItems));
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems }));
    }
  }, [cartItems, syncing]);

  // Add to Cart - ONLY localStorage, NO database call yet
  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { 
        ...product, 
        qty, 
        id: product.id,
        // Mark as not synced to database yet
        _needsSync: true 
      }];
    });
  }, []);

  // Remove from Cart - ONLY localStorage, NO database call yet
  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }, []);

  // Update quantity - ONLY localStorage, NO database call yet
  const updateQty = useCallback((id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty, _needsSync: true } : i));
  }, [removeFromCart]);

  // Clear cart - ONLY localStorage
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("os_cart");
  }, []);

  // SYNC CART TO DATABASE - Called only when user proceeds to checkout
  const syncCartToDatabase = useCallback(async () => {
    if (!user) {
      return { success: false, error: "Please log in to proceed to checkout" };
    }

    if (cartItems.length === 0) {
      return { success: false, error: "Your cart is empty" };
    }

    setSyncing(true);
    setPendingSync(true);

    try {
      // Sync each item to database
      for (const item of cartItems) {
        await apiAddToCart({ 
          productId: item.id, 
          quantity: item.qty 
        });
      }
      
      // After successful sync, mark all items as synced
      const syncedItems = cartItems.map(item => ({
        ...item,
        _needsSync: false,
        _syncedAt: new Date().toISOString()
      }));
      
      setCartItems(syncedItems);
      localStorage.setItem("os_cart", JSON.stringify(syncedItems));
      
      setPendingSync(false);
      return { success: true };
    } catch (err) {
      console.error("Failed to sync cart:", err);
      setPendingSync(false);
      return { success: false, error: err.message || "Failed to sync cart. Please try again." };
    } finally {
      setSyncing(false);
    }
  }, [user, cartItems]);

  // Get cart items ready for checkout (with full product details)
  const getCheckoutItems = useCallback(() => {
    return cartItems.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.discountPrice || item.price,
      quantity: item.qty,
      image: item.image,
      color: item.color,
      category: item.category,
      gender: item.gender,
      subcategory: item.subcategory
    }));
  }, [cartItems]);

  const cartCount = cartItems.reduce((s, i) => s + (i.qty || 1), 0);
  const cartTotal = cartItems.reduce((s, i) => s + (i.discountPrice || i.price || 0) * (i.qty || 1), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      clearCart, 
      cartCount, 
      cartTotal,
      loading,
      syncing,
      pendingSync,
      syncCartToDatabase,
      getCheckoutItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }


