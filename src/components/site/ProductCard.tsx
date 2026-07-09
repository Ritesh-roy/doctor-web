import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Eye, Calendar, Star } from "lucide-react";
import { useState } from "react";
import { formatINR, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { QuickViewModal } from "./QuickViewModal";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [qv, setQv] = useState(false);
  const wished = inWishlist(product.slug);
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-primary-soft/30">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="rounded-full bg-emerald-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                −{discount}%
              </span>
            )}
            {product.onSale && discount === 0 && (
              <span className="rounded-full bg-emerald-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Sale
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Add to wishlist"
              className={`grid h-9 w-9 place-items-center rounded-full bg-white shadow-soft transition-colors ${
                wished ? "text-emerald-accent" : "text-foreground hover:text-emerald-accent"
              }`}
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => setQv(true)}
              aria-label="Quick view"
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-foreground shadow-soft hover:text-primary"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {product.categoryLabel}
          </div>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="mt-1 font-display text-base font-semibold leading-tight text-foreground hover:text-primary"
          >
            {product.title}
          </Link>
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{product.shortDescription}</p>

          {product.rating ? (
            <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < product.rating! ? "fill-current" : ""}`} />
              ))}
              <span className="ml-1 text-muted-foreground">({product.rating.toFixed(2)})</span>
            </div>
          ) : null}

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-foreground">{formatINR(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatINR(product.oldPrice)}</span>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => addToCart(product.slug)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              <ShoppingCart className="h-3.5 w-3.5" /> Select Options
            </button>
            <Link
              to="/book-appointment"
              search={{ service: product.slug } as never}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/20 px-3 py-2 text-xs font-semibold text-foreground hover:bg-primary-soft/60"
            >
              <Calendar className="h-3.5 w-3.5" /> Book Now
            </Link>
          </div>
        </div>
      </div>

      {qv && <QuickViewModal product={product} onClose={() => setQv(false)} />}
    </>
  );
}
