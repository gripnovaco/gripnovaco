import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";
import { useCart, useCatalog, useOrders } from "@/lib/store";
import { whatsappOrderUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Grip Nova Co." }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const products = useCatalog((s) => s.products);

  const lines = items
    .map((i) => {
      const p = products.find((x) => x.id === i.productId);
      return p ? { ...i, product: p } : null;
    })
    .filter((x): x is { productId: string; quantity: number; product: NonNullable<ReturnType<typeof products.find>> } => Boolean(x));

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  const mrp = lines.reduce((s, l) => s + l.product.mrp * l.quantity, 0);
  const savings = mrp - subtotal;

  if (lines.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-accent text-primary">
          <ShoppingBag className="size-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add a few essentials to get started.</p>
        <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Your Cart</h1>
      <p className="mt-1 text-muted-foreground">{lines.length} item{lines.length > 1 ? "s" : ""}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {lines.map((l, i) => (
            <div key={l.productId} className="grid grid-cols-[96px_minmax(0,1fr)_auto] gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="size-24 overflow-hidden rounded-xl bg-muted">
                <ProductImage name={l.product.name} imageUrl={l.product.images[0]} seed={i} />
              </div>
              <div className="min-w-0">
                <Link to="/product/$slug" params={{ slug: l.product.slug }} className="line-clamp-2 font-semibold hover:text-primary">{l.product.name}</Link>
                <div className="mt-1 text-xs text-muted-foreground">SKU: {l.product.sku}</div>
                <div className="mt-2 inline-flex items-center rounded-full border border-input">
                  <button onClick={() => setQty(l.productId, l.quantity - 1)} className="grid size-8 place-items-center hover:bg-secondary"><Minus className="size-3.5" /></button>
                  <span className="w-8 text-center text-sm font-semibold">{l.quantity}</span>
                  <button onClick={() => setQty(l.productId, l.quantity + 1)} className="grid size-8 place-items-center hover:bg-secondary"><Plus className="size-3.5" /></button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => remove(l.productId)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                  <Trash2 className="size-4" />
                </button>
                <div className="text-right">
                  <div className="font-semibold">₹{(l.product.price * l.quantity).toLocaleString("en-IN")}</div>
                  {l.product.mrp > l.product.price && (
                    <div className="text-xs text-muted-foreground line-through">₹{(l.product.mrp * l.quantity).toLocaleString("en-IN")}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div>
            <div className="flex justify-between text-success"><dt>You save</dt><dd>−₹{savings.toLocaleString("en-IN")}</dd></div>
            <div className="flex justify-between text-muted-foreground"><dt>Shipping</dt><dd>Calculated on WhatsApp</dd></div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold"><dt>Total</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div>
          </dl>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const order = useOrders.getState().addOrder({
                items: lines.map((l) => ({
                  productId: l.productId,
                  name: l.product.name,
                  quantity: l.quantity,
                  price: l.product.price,
                  image: l.product.images[0],
                })),
                total: subtotal,
              });
              const url = whatsappOrderUrl(
                lines.map((l) => ({
                  name: l.product.name,
                  quantity: l.quantity,
                  price: l.product.price,
                  image: l.product.images[0],
                })),
                order.id,
              );
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            <MessageCircle className="size-4" /> Checkout on WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">No online payment — we confirm pricing & delivery on WhatsApp.</p>
        </aside>
      </div>
    </div>
  );
}
