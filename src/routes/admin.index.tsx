import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, FileText, MessageCircle, Tag, TrendingUp, Users } from "lucide-react";
import { useCatalog } from "@/lib/store";
import { CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — GripNova Admin" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const products = useCatalog((s) => s.products);
  const posts = useCatalog((s) => s.posts);

  const stats = [
    { label: "Total Products", value: products.length, icon: Box, hue: "from-sky-100 to-blue-200" },
    { label: "Categories", value: CATEGORIES.length, icon: Tag, hue: "from-indigo-100 to-blue-200" },
    { label: "Website Visitors", value: "12,480", icon: Users, hue: "from-cyan-100 to-sky-200" },
    { label: "WhatsApp Leads", value: "342", icon: MessageCircle, hue: "from-blue-100 to-indigo-200" },
    { label: "Blog Articles", value: posts.length, icon: FileText, hue: "from-sky-50 to-blue-100" },
    { label: "Orders (7d)", value: "86", icon: TrendingUp, hue: "from-blue-50 to-cyan-100" },
  ];

  const latest = products.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of your GripNova storefront.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, hue }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <div className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${hue} text-primary`}>
              <Icon className="size-5" />
            </div>
            <div className="mt-4 font-display text-2xl font-extrabold">{value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Latest Products</h2>
          <Link to="/admin/products" className="text-sm font-semibold text-primary hover:underline">Manage all →</Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">SKU</th><th className="px-5 py-3">Category</th><th className="px-5 py-3 text-right">Price</th></tr>
            </thead>
            <tbody>
              {latest.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.sku}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-5 py-3 text-right font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
