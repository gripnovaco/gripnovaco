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
  toggleProductVisible: (id: string) => void;
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
      toggleProductVisible: (id) =>
        set((s) => ({
          products: s.products.map((x) =>
            x.id === id ? { ...x, visible: x.visible === false ? true : false } : x,
          ),
        })),
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
    { name: "gripnova-catalog", version: 9 },
  ),
);

// ---------- Orders (admin, localStorage-backed) ----------
export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Order = {
  id: string;
  createdAt: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  channel: "whatsapp";
  note?: string;
};

type OrdersState = {
  orders: Order[];
  addOrder: (o: Omit<Order, "id" | "createdAt" | "status" | "channel"> & { status?: OrderStatus }) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
  removeOrder: (id: string) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (o) => {
        const order: Order = {
          id: "GN" + Date.now().toString().slice(-8),
          createdAt: Date.now(),
          status: o.status ?? "pending",
          channel: "whatsapp",
          items: o.items,
          total: o.total,
          note: o.note,
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
      setStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      removeOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
    }),
    { name: "gripnova-orders", version: 1 },
  ),
);

// ---------- Admin auth (dev-only, localStorage) ----------
type AdminState = {
  username: string;
  password: string;
  isAuthed: boolean;
  whatsappNumber: string;
  gaMeasurementId: string;
  signIn: (u: string, p: string) => boolean;
  signOut: () => void;
  updateCredentials: (u: string, p: string) => void;
  setWhatsapp: (n: string) => void;
  setGaMeasurementId: (id: string) => void;
};

export const useAdmin = create<AdminState>()(
  persist(
    (set, get) => ({
      username: "administrator",
      password: "administrator",
      isAuthed: false,
      whatsappNumber: "917207682536",
      gaMeasurementId: "",
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
      setGaMeasurementId: (id) => set({ gaMeasurementId: id.trim() }),
    }),
    { name: "gripnova-admin" },
  ),
);
