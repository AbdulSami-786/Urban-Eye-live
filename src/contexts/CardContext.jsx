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
import { getProductVariants, getVariantLenses, getProductDisplayImage } from "../services/productUtils.js";

export const CartContext = createContext(null);

// One frame can be in the bag in several colour / lens combinations, so a cart
// line is keyed by all three. Carts saved before lenses were tracked only have
// `id`, which still works as their key.
export function getCartLineKey(item) {
  return item.cartKey || item.id;
}

// The frame colour and lens the shopper picked, defaulting to the product's
// first colour and that colour's first lens (what the card / page shows first).
function resolveSelection(product, { color, lens } = {}) {
  const variants = getProductVariants(product);
  const variant = variants.find(v => v.name === color) || variants[0] || null;
  return {
    color: color || variant?.name || "",
    lens: lens || getVariantLenses(variant, product)[0]?.name || "",
  };
}

// "Andrew — Light Brown frame, Pastel lens": the name the order is saved under,
// so the admin panel, order emails and "My Orders" all show what was picked.
export function describeCartLine(item) {
  const parts = [item.color && `${item.color} frame`, item.lens && `${item.lens} lens`].filter(Boolean);
  return parts.length ? `${item.name} — ${parts.join(", ")}` : item.name;
}

// Read the saved cart synchronously so the very first render already has the
// items. Loading it in an effect instead created a race: the "save" effect
// below ran on mount with the empty initial state and overwrote localStorage,
// and under React StrictMode's double-invoked effects the reload permanently
// emptied the cart.
function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("os_cart") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

// Products keep their imagery inside colors[].image / colors[].gallery (and
// sometimes a top-level gallery / imageUrl), not a plain `image`. Resolve one
// here so cart rows, the mini-cart drawer and order emails have a picture.
function resolveCartImage(product) {
  if (!product) return "";
  if (product.image) return product.image;
  if (product.imageUrl) return product.imageUrl;
  if (Array.isArray(product.gallery) && product.gallery[0]) return product.gallery[0];
  const firstColor = Array.isArray(product.colors) ? product.colors[0] : null;
  if (firstColor) {
    if (firstColor.image) return firstColor.image;
    if (Array.isArray(firstColor.gallery) && firstColor.gallery[0]) return firstColor.gallery[0];
  }
  return "";
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pendingSync, setPendingSync] = useState(false);
  const { user } = useAuth();

  // Persist the cart to localStorage whenever it changes. Because cartItems is
  // initialised from storage above, this never clobbers a saved cart on mount.
  useEffect(() => {
    if (!syncing) {
      localStorage.setItem("os_cart", JSON.stringify(cartItems));
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems }));
    }
  }, [cartItems, syncing]);

  // Add to Cart - ONLY localStorage, NO database call yet
  // `options` = { color, lens } picked on the product page / card.
  const addToCart = useCallback((product, qty = 1, options = {}) => {
    const { color, lens } = resolveSelection(product, options);
    const cartKey = [product.id, color, lens].join("|");
    setCartItems(prev => {
      const ex = prev.find(i => getCartLineKey(i) === cartKey);
      if (ex) {
        return prev.map(i => getCartLineKey(i) === cartKey ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        ...product,
        qty,
        id: product.id,
        cartKey,
        color,
        lens,
        // Show the chosen colour + lens in the bag, falling back to any image.
        image: getProductDisplayImage(product, color, lens).displayImage || resolveCartImage(product),
        // Mark as not synced to database yet
        _needsSync: true
      }];
    });
  }, []);

  // Remove from Cart - ONLY localStorage, NO database call yet
  const removeFromCart = useCallback((key) => {
    setCartItems(prev => prev.filter(i => getCartLineKey(i) !== key));
  }, []);

  // Update quantity - ONLY localStorage, NO database call yet
  const updateQty = useCallback((key, qty) => {
    if (qty < 1) {
      removeFromCart(key);
      return;
    }
    setCartItems(prev => prev.map(i => getCartLineKey(i) === key ? { ...i, qty, _needsSync: true } : i));
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
      name: describeCartLine(item),
      price: item.discountPrice || item.price,
      quantity: item.qty,
      image: item.image,
      color: item.color,
      lens: item.lens,
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


