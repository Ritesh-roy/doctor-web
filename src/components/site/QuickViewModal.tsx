import { Link } from "@tanstack/react-router";
import { X, Heart, ShoppingCart, Calendar, Check } from "lucide-react";
import { useEffect } from "react";
import { formatINR, PRODUCT_IMAGE_FALLBACK, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

export function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const wished = inWishlist(product.slug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-glow sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="aspect-square overflow-hidden bg-primary-soft/30">
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
            }}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">{product.categoryLabel}</div>
          <h2 className="font-display text-2xl font-semibold text-foreground">{product.title}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-foreground">{formatINR(product.price)}</span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">{formatINR(product.oldPrice)}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{product.description}</p>

          <ul className="mt-1 space-y-1.5">
            {product.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 text-emerald-accent" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => {
                addToCart(product.slug);
                onClose();
              }}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <Link
              to="/book-appointment"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary/20 px-4 py-2.5 text-sm font-semibold text-foreground"
              onClick={onClose}
            >
              <Calendar className="h-4 w-4" /> Book
            </Link>
            <button
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Wishlist"
              className={`grid h-11 w-11 place-items-center rounded-full border border-primary/20 ${
                wished ? "text-emerald-accent" : "text-foreground"
              }`}
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
            </button>
          </div>

          <Link to="/product/$slug" params={{ slug: product.slug }} onClick={onClose} className="mt-1 text-center text-xs text-primary underline">
            View full details
          </Link>
        </div>
      </div>
    </div>
  );
}
