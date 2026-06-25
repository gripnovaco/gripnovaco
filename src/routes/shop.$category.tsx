import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/products";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/shop/$category")({
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.category);
    return {
      meta: [
        { title: `${cat?.name ?? "Category"} — GripNova` },
        { name: "description", content: cat?.description ?? "Browse our physiotherapy product range." },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === category);
  const products = useCatalog((s) => s.products.filter((p) => p.category === category));
  if (!cat) throw notFound();

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
        <span className="text-foreground">{cat.name}</span>
      </nav>
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{cat.group}</span>
        <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{cat.description}</p>
      </header>
      {products.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No products in this category yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
