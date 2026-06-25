import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/products";
import { useCart, useCatalog } from "@/lib/store";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — GripNova` },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = useCatalog((s) => s.products.find((p) => p.slug === slug));
  const related = useCatalog((s) => s.products.filter((p) => p.slug !== slug && p.category === product?.category).slice(0, 4));
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "usage" | "faqs" | "reviews">("description");
  if (!product) throw notFound();

  const cat = CATEGORIES.find((c) => c.slug === product.category);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="container-page py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
        {cat && (<><Link to="/shop/$category" params={{ category: cat.slug }} className="hover:text-primary">{cat.name}</Link> / </>)}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-muted">
            <ProductImage name={product.name} imageUrl={product.images[0]} />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                <ProductImage name={product.name} imageUrl={product.images[i]} seed={i} />
              </div>
            ))}
          </div>
        </div>

        <div>
          {cat && <span className="text-xs font-semibold uppercase tracking-wider text-primary">{cat.name}</span>}
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
            </div>
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">· {product.reviewCount} reviews · SKU: {product.sku}</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold">₹{product.price.toLocaleString("en-IN")}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">Save {discount}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-5 text-foreground/90">{product.shortDescription}</p>

          <ul className="mt-5 space-y-2 text-sm">
            {product.benefits.slice(0, 4).map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-input">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center hover:bg-secondary" aria-label="Decrease">
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid size-10 place-items-center hover:bg-secondary" aria-label="Increase">
                <Plus className="size-4" />
              </button>
            </div>
            <span className={`text-sm font-semibold ${product.inStock ? "text-success" : "text-destructive"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => { add(product.id, qty); toast.success("Added to cart"); }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold hover:bg-secondary sm:flex-none"
            >
              <ShoppingCart className="size-4" /> Add to Cart
            </button>
            <a
              href={whatsappOrderUrl([{ name: product.name, quantity: qty }])}
              target="_blank" rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:translate-y-[-1px] transition sm:flex-none"
            >
              <MessageCircle className="size-4" /> Buy Now on WhatsApp
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
            <Truck className="size-4 text-primary" /> Fast delivery across India · Easy exchange policy
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex flex-wrap gap-2 border-b border-border">
          {[
            ["description", "Description"],
            ["specs", "Specifications"],
            ["usage", "Usage"],
            ["faqs", "FAQs"],
            ["reviews", "Reviews"],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k as typeof tab)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold ${tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="prose prose-sm max-w-none py-6">
          {tab === "description" && <p className="text-foreground/90 leading-relaxed">{product.description}</p>}
          {tab === "specs" && (
            <table className="w-full text-sm">
              <tbody>
                {product.specifications.map((s) => (
                  <tr key={s.label} className="border-b border-border">
                    <td className="py-3 pr-4 font-semibold">{s.label}</td>
                    <td className="py-3 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "usage" && <p className="text-foreground/90 leading-relaxed">{product.usage}</p>}
          {tab === "faqs" && (
            <div className="space-y-4">
              {product.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-border p-4">
                  <div className="font-semibold">{f.q}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.a}</div>
                </div>
              ))}
            </div>
          )}
          {tab === "reviews" && (
            <div className="space-y-4">
              {["A genuine recovery aid — well-made and effective.", "Quality is exactly as described.", "Highly recommend. Will order again."].map((r, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <div className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="size-3.5 fill-current" />)}</div>
                  <p className="mt-2 text-sm">{r}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Verified customer</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-extrabold">Related Products</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
