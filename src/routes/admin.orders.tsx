import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useOrders, type OrderStatus } from "@/lib/store";
import { whatsappOrderUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Grip Nova Co. Admin" }] }),
  component: AdminOrders,
});

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-sky-100 text-sky-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-muted text-muted-foreground",
};

function AdminOrders() {
  const orders = useOrders((s) => s.orders);
  const setStatus = useOrders((s) => s.setStatus);
  const removeOrder = useOrders((s) => s.removeOrder);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-extrabold">Orders</h1>
        <p className="mt-1 text-muted-foreground">
          Every WhatsApp checkout is captured here. Confirm status once the customer replies on WhatsApp, and mark as completed when delivered.
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No orders yet. When a customer taps <span className="font-semibold">Buy Now</span> or checks out from the cart, their order will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold">#{o.id}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[o.status]}`}>{o.status}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString("en-IN")} · via WhatsApp
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-extrabold">₹{o.total.toLocaleString("en-IN")}</div>
                  <div className="text-xs text-muted-foreground">{o.items.reduce((n, i) => n + i.quantity, 0)} items</div>
                </div>
              </div>

              <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
                {o.items.map((i) => (
                  <li key={i.productId} className="flex items-center gap-3 p-3">
                    {i.image ? (
                      <img src={i.image} alt={i.name} className="size-12 rounded-lg object-cover" />
                    ) : (
                      <div className="size-12 rounded-lg bg-muted" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{i.name}</div>
                      <div className="text-xs text-muted-foreground">Qty {i.quantity} · ₹{i.price.toLocaleString("en-IN")} each</div>
                    </div>
                    <div className="text-sm font-semibold">₹{(i.price * i.quantity).toLocaleString("en-IN")}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {o.status !== "confirmed" && (
                  <button onClick={() => { setStatus(o.id, "confirmed"); toast.success("Marked confirmed"); }} className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white">
                    <CheckCircle2 className="size-3.5" /> Mark confirmed
                  </button>
                )}
                {o.status !== "completed" && (
                  <button onClick={() => { setStatus(o.id, "completed"); toast.success("Marked completed"); }} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
                    <CheckCircle2 className="size-3.5" /> Mark completed
                  </button>
                )}
                {o.status !== "cancelled" && (
                  <button onClick={() => { setStatus(o.id, "cancelled"); toast("Marked cancelled"); }} className="inline-flex items-center gap-1.5 rounded-full border border-input px-3 py-1.5 text-xs font-semibold">
                    <XCircle className="size-3.5" /> Cancel
                  </button>
                )}
                <a
                  href={whatsappOrderUrl(o.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, image: i.image })), o.id)}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-xs font-semibold text-whatsapp-foreground"
                >
                  <MessageCircle className="size-3.5" /> Message customer
                </a>
                <button onClick={() => { if (confirm("Delete this order?")) removeOrder(o.id); }} className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
