import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, type Product } from "@/lib/products";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products — GripNova Admin" }] }),
  component: AdminProducts,
});

const empty = (): Product => ({
  id: "", slug: "", name: "", sku: "", category: CATEGORIES[0].slug,
  price: 0, mrp: 0, shortDescription: "", description: "", benefits: [], specifications: [],
  usage: "", faqs: [], images: [], rating: 4.5, reviewCount: 0, inStock: true,
});

function AdminProducts() {
  const products = useCatalog((s) => s.products);
  const upsert = useCatalog((s) => s.upsertProduct);
  const remove = useCatalog((s) => s.deleteProduct);
  const [editing, setEditing] = useState<Product | null>(null);
  const [q, setQ] = useState("");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-extrabold">Products</h1>
          <p className="mt-1 text-muted-foreground">Add, edit and manage your product catalog.</p>
        </div>
        <button onClick={() => setEditing(empty())} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Plus className="size-4" /> New Product
        </button>
      </header>

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…"
        className="mb-4 w-full max-w-sm rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary" />

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">MRP</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3">₹{p.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-muted-foreground">₹{p.mrp.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(p)} className="mr-2 inline-flex size-8 items-center justify-center rounded-lg hover:bg-secondary"><Pencil className="size-4" /></button>
                  <button onClick={() => { if (confirm("Delete this product?")) { remove(p.id); toast.success("Deleted"); }}} className="inline-flex size-8 items-center justify-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <ProductEditor
          product={editing}
          onClose={() => setEditing(null)}
          onSave={(p) => { upsert(p); toast.success("Saved"); setEditing(null); }}
        />
      )}
    </div>
  );
}

function ProductEditor({ product, onClose, onSave }: { product: Product; onClose: () => void; onSave: (p: Product) => void }) {
  const [p, setP] = useState<Product>(product);
  const isNew = !p.id;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <form
        className="w-full max-w-2xl space-y-4 rounded-3xl bg-card p-6 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          onSave({
            ...p,
            id: p.id || String(Date.now()),
            slug: p.slug || slug,
            sku: p.sku || "GN" + String(Date.now()).slice(-4),
          });
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">{isNew ? "New" : "Edit"} Product</h2>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-secondary"><X className="size-4" /></button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name"><input required value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} className={input} /></Field>
          <Field label="Category">
            <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })} className={input}>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Price (₹)"><input type="number" required value={p.price} onChange={(e) => setP({ ...p, price: +e.target.value })} className={input} /></Field>
          <Field label="MRP (₹)"><input type="number" required value={p.mrp} onChange={(e) => setP({ ...p, mrp: +e.target.value })} className={input} /></Field>
          <Field label="SKU"><input value={p.sku} onChange={(e) => setP({ ...p, sku: e.target.value })} className={input} /></Field>
          <Field label="Image URL (optional)"><input value={p.images[0] ?? ""} onChange={(e) => setP({ ...p, images: e.target.value ? [e.target.value] : [] })} className={input} /></Field>
        </div>
        <Field label="Short description"><input value={p.shortDescription} onChange={(e) => setP({ ...p, shortDescription: e.target.value })} className={input} /></Field>
        <Field label="Description"><textarea rows={4} value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} className={input} /></Field>
        <Field label="Benefits (one per line)">
          <textarea rows={3} value={p.benefits.join("\n")} onChange={(e) => setP({ ...p, benefits: e.target.value.split("\n").filter(Boolean) })} className={input} />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-full border border-input px-5 py-2 text-sm font-semibold">Cancel</button>
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save</button>
        </div>
      </form>
    </div>
  );
}

const input = "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm"><span className="font-semibold">{label}</span><div className="mt-1">{children}</div></label>;
}
