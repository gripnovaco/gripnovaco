import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_PRODUCTS, type Product } from "./products";
import { SEED_POSTS, type BlogPost } from "./blog";

// ---------- Cart ----------
export type CartItem = { productId: string; quantity: number };

type CartState = {
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...s.items, { productId, quantity }] };
        }),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((s) => ({
          items: quantity <= 0
            ? s.items.filter((i) => i.productId !== productId)
            : s.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "gripnova-cart" },
  ),
);

// ---------- Catalog (admin-editable, localStorage-backed) ----------
type CatalogState = {
  products: Product[];
  posts: BlogPost[];
  upsertProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  upsertPost: (p: BlogPost) => void;
  deletePost: (slug: string) => void;
  reset: () => void;
};

export const useCatalog = create<CatalogState>()(
  persist(
    (set) => ({
      products: SEED_PRODUCTS,
      posts: SEED_POSTS,
      upsertProduct: (p) =>
        set((s) => {
          const exists = s.products.some((x) => x.id === p.id);
          return {
            products: exists
              ? s.products.map((x) => (x.id === p.id ? p : x))
              : [{ ...p, id: p.id || String(Date.now()) }, ...s.products],
          };
        }),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
      upsertPost: (p) =>
        set((s) => {
          const exists = s.posts.some((x) => x.slug === p.slug);
          return {
            posts: exists
              ? s.posts.map((x) => (x.slug === p.slug ? p : x))
              : [p, ...s.posts],
          };
        }),
      deletePost: (slug) => set((s) => ({ posts: s.posts.filter((x) => x.slug !== slug) })),
      reset: () => set({ products: SEED_PRODUCTS, posts: SEED_POSTS }),
    }),
    { name: "gripnova-catalog", version: 1 },
  ),
);

// ---------- Admin auth (dev-only, localStorage) ----------
type AdminState = {
  username: string;
  password: string;
  isAuthed: boolean;
  whatsappNumber: string;
  signIn: (u: string, p: string) => boolean;
  signOut: () => void;
  updateCredentials: (u: string, p: string) => void;
  setWhatsapp: (n: string) => void;
};

export const useAdmin = create<AdminState>()(
  persist(
    (set, get) => ({
      username: "administrator",
      password: "administrator",
      isAuthed: false,
      whatsappNumber: "917207682536",
      signIn: (u, p) => {
        if (u === get().username && p === get().password) {
          set({ isAuthed: true });
          return true;
        }
        return false;
      },
      signOut: () => set({ isAuthed: false }),
      updateCredentials: (u, p) => set({ username: u, password: p }),
      setWhatsapp: (n) => set({ whatsappNumber: n }),
    }),
    { name: "gripnova-admin" },
  ),
);
