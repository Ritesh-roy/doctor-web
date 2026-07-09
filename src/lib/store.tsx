import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data/products";

type CartItem = { slug: string; qty: number };

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (slug: string, qty?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  inWishlist: (slug: string) => boolean;
  cartCount: number;
  cartTotal: number;
  cartItems: (CartItem & { product: Product })[];
  wishlistItems: Product[];
};

const StoreCtx = createContext<StoreState | null>(null);

const CART_KEY = "sanjeevani.cart.v1";
const WISH_KEY = "sanjeevani.wishlist.v1";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLS<CartItem[]>(CART_KEY, []));
    setWishlist(readLS<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((slug: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, qty }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const inWishlist = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const value = useMemo<StoreState>(() => {
    const cartItems = cart
      .map((i) => {
        const product = PRODUCTS.find((p) => p.slug === i.slug);
        return product ? { ...i, product } : null;
      })
      .filter(Boolean) as (CartItem & { product: Product })[];
    const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
    const wishlistItems = wishlist
      .map((s) => PRODUCTS.find((p) => p.slug === s))
      .filter(Boolean) as Product[];
    return {
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      inWishlist,
      cartCount,
      cartTotal,
      cartItems,
      wishlistItems,
    };
  }, [cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, inWishlist]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
