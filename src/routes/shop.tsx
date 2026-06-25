import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/products";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Physiotherapy Products — GripNova" },
      { name: "description", content: "Browse the full GripNova range: resistance bands, TENS, braces, mobility aids and more." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const products = useCatalog((s) => s.products);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo(() => {
    let r = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [products, q, sort]);

  const groups = Array.from(new Set(CATEGORIES.map((c) => c.group)));

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">All Products</h1>
        <p className="mt-2 text-muted-foreground">{products.length} physiotherapy & recovery products</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Categories</h3>
            <div className="mt-3 space-y-4">
              {groups.map((g) => (
                <div key={g}>
                  <div className="text-xs font-semibold text-foreground">{g}</div>
                  <ul className="mt-1.5 space-y-1.5 text-sm">
                    {CATEGORIES.filter((c) => c.group === g).map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$category" params={{ category: c.slug }} className="text-muted-foreground hover:text-primary">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">{filtered.length} products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-input bg-background px-4 py-2 text-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
