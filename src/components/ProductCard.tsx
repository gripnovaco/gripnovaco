import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <ProductImage name={product.name} imageUrl={product.images[0]} seed={index} />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {discount}% OFF
          </span>
        )}
        {product.bestSeller && (
          <span className="absolute right-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
            Best Seller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-display font-semibold leading-tight text-foreground group-hover:text-primary">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.reviewCount} reviews</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
