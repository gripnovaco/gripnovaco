import { Link } from "@tanstack/react-router";
import { MessageCircle, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart, useOrders } from "@/lib/store";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import { ProductImage } from "./ProductImage";

const MAX_QTY = 10;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const addOrder = useOrders((s) => s.addOrder);

  const handleBuyNow = () => {
    const order = addOrder({
      items: [{
        productId: product.id,
        name: product.name,
        quantity: qty,
        price: product.price,
        image: product.images[0],
      }],
      total: product.price * qty,
    });
    return whatsappOrderUrl(
      [{ name: product.name, quantity: qty, price: product.price, image: product.images[0] }],
      order.id,
    );
  };


  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
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
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="line-clamp-2 font-display font-semibold leading-tight text-foreground hover:text-primary">
            {product.name}
          </h3>
        </Link>
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

        {/* Quantity + Actions */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Qty</span>
          <div className="inline-flex items-center rounded-full border border-input">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid size-7 place-items-center hover:bg-secondary"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-7 text-center text-xs font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
              className="grid size-7 place-items-center hover:bg-secondary"
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </button>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-[2.75rem_minmax(0,1fr)] gap-2">
          <button
            type="button"
            onClick={() => { add(product.id, qty); toast.success(`Added ${qty} × ${product.name}`); }}
            aria-label={`Add ${product.name} to cart`}
            title="Add to cart"
            className="inline-flex h-10 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-1px]"
          >
            <ShoppingCart className="size-4" />
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const url = handleBuyNow();
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground shadow-[0_8px_24px_-8px_oklch(0.6_0.22_25/0.5)] transition hover:translate-y-[-1px]"
          >
            <MessageCircle className="size-3.5" /> Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
