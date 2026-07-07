import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, type Category } from "@/lib/products";
import { useCatalog } from "@/lib/store";

type Props = {
  activeCategory?: Category;
};

export function ShopBrowser({ activeCategory }: Props) {
  const products = useCatalog((s) => s.products);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const pathCategory = useRouterState({
    select: (state) => state.location.pathname.split("/").filter(Boolean)[1] ?? "",
  });
  const resolvedActiveCategory = activeCategory ?? CATEGORIES.find((c) => c.slug === pathCategory);

  const filtered = useMemo(() => {
    let r = products;
    if (resolvedActiveCategory) r = r.filter((p) => p.category === resolvedActiveCategory.slug);
    if (q.trim()) r = r.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [products, q, sort, resolvedActiveCategory]);

  const groups = Array.from(new Set(CATEGORIES.map((c) => c.group)));

  return (
    <div className="container-page py-8">
      {resolvedActiveCategory ? (
        <nav className="mb-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
          <span className="text-foreground">{resolvedActiveCategory.name}</span>
        </nav>
      ) : null}

      <header className="mb-6">
        {resolvedActiveCategory ? (
          <>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {resolvedActiveCategory.group}
            </span>
            <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
              {resolvedActiveCategory.name}
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{resolvedActiveCategory.description}</p>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              {products.length} physiotherapy & recovery products
            </p>
          </>
        )}
      </header>

      <div className="grid gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-6 md:sticky md:top-20 md:self-start">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Categories</h3>
            <div className="mt-3 space-y-4">
              <div>
                <Link
                  to="/shop"
                  className={`text-sm font-semibold ${!activeCategory ? "text-primary" : "text-foreground hover:text-primary"}`}
                >
                  All products
                </Link>
              </div>
              {groups.map((g) => (
                <div key={g}>
                  <div className="text-xs font-semibold text-foreground">{g}</div>
                  <ul className="mt-1.5 space-y-1.5 text-sm">
                    {CATEGORIES.filter((c) => c.group === g).map((c) => {
                      const active = resolvedActiveCategory?.slug === c.slug;
                      return (
                        <li key={c.slug}>
                          <Link
                            to="/shop/$category"
                            params={{ category: c.slug }}
                            className={active ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary"}
                          >
                            {c.name}
                          </Link>
                        </li>
                      );
                    })}
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
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No products match your filters. Try clearing the search or picking another category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
