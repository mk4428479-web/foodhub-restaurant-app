import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { FoodItem } from "../data/foodData";
import { promoCodes } from "../data/foodData";

export interface CartLine extends FoodItem {
  qty: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  favoriteRestaurants: string[];
}

type Action =
  | { type: "HYDRATE"; payload: StoreState }
  | { type: "ADD"; item: FoodItem }
  | { type: "REMOVE"; id: string }
  | { type: "QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE_WISH"; id: string }
  | { type: "VIEW"; id: string }
  | { type: "TOGGLE_FAV_REST"; id: string };

const initial: StoreState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  favoriteRestaurants: [],
};

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };
    case "ADD": {
      const existing = state.cart.find((c) => c.id === action.item.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.item.id ? { ...c, qty: c.qty + 1 } : c,
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.item, qty: 1 }] };
    }
    case "REMOVE":
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };
    case "QTY":
      return {
        ...state,
        cart: state.cart
          .map((c) => (c.id === action.id ? { ...c, qty: Math.max(0, action.qty) } : c))
          .filter((c) => c.qty > 0),
      };
    case "CLEAR":
      return { ...state, cart: [] };
    case "TOGGLE_WISH":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((w) => w !== action.id)
          : [...state.wishlist, action.id],
      };
    case "TOGGLE_FAV_REST":
      return {
        ...state,
        favoriteRestaurants: state.favoriteRestaurants.includes(action.id)
          ? state.favoriteRestaurants.filter((w) => w !== action.id)
          : [...state.favoriteRestaurants, action.id],
      };
    case "VIEW":
      return {
        ...state,
        recentlyViewed: [
          action.id,
          ...state.recentlyViewed.filter((r) => r !== action.id),
        ].slice(0, 8),
      };
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  toggleFavRestaurant: (id: string) => void;
  markViewed: (id: string) => void;
  cartCount: number;
  subtotal: number;
  promo: { code: string; rate: number } | null;
  applyPromo: (code: string) => void;
  removePromo: () => void;
  totals: {
    subtotal: number;
    discount: number;
    delivery: number;
    tax: number;
    total: number;
  };
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "foodhub-store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cartOpen, setCartOpen] = useState(false);
  const [promo, setPromo] = useState<{ code: string; rate: number } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
      const t = document.documentElement.classList.contains("dark") ? "dark" : "light";
      setTheme(t);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("foodhub-theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const subtotal = useMemo(
    () => state.cart.reduce((sum, c) => sum + c.price * c.qty, 0),
    [state.cart],
  );

  const totals = useMemo(() => {
    const discount = promo ? Math.round(subtotal * promo.rate) : 0;
    const afterDiscount = subtotal - discount;
    const delivery = afterDiscount > 999 || afterDiscount === 0 ? 0 : 99;
    const tax = Math.round(afterDiscount * 0.05);
    const total = afterDiscount + delivery + tax;
    return { subtotal, discount, delivery, tax, total };
  }, [subtotal, promo]);

  const value: StoreContextValue = {
    ...state,
    theme,
    toggleTheme,
    cartOpen,
    setCartOpen,
    addToCart: (item) => {
      dispatch({ type: "ADD", item });
      toast.success(`${item.name} added to cart`);
    },
    removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
    setQty: (id, qty) => dispatch({ type: "QTY", id, qty }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    toggleWish: (id) => {
      const isWished = state.wishlist.includes(id);
      dispatch({ type: "TOGGLE_WISH", id });
      toast(isWished ? "Removed from wishlist" : "Added to wishlist ❤️");
    },
    toggleFavRestaurant: (id) => dispatch({ type: "TOGGLE_FAV_REST", id }),
    markViewed: (id) => dispatch({ type: "VIEW", id }),
    cartCount: state.cart.reduce((n, c) => n + c.qty, 0),
    subtotal,
    promo,
    applyPromo: (code) => {
      const key = code.trim().toUpperCase();
      if (key in promoCodes) {
        setPromo({ code: key, rate: promoCodes[key] });
        toast.success(`Promo ${key} applied!`);
      } else {
        toast.error("Invalid promo code");
      }
    },
    removePromo: () => setPromo(null),
    totals,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
