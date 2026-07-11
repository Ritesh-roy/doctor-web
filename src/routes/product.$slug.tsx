import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Heart, ShoppingCart, Calendar, Minus, Plus, Star, Home } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { formatINR, getProduct, PRODUCTS, PRODUCT_IMAGE_FALLBACK } from "@/data/products";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";


export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProductDetail,
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Product"} — Sanjeevani Clinic` },
      { name: "description", content: loaderData?.shortDescription ?? "" },
      { property: "og:title", content: loaderData?.title ?? "Product" },
      { property: "og:description", content: loaderData?.shortDescription ?? "" },
      { property: "og:image", content: loaderData?.image ?? "" },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/product/${params.slug}` },
      { property: "product:price:amount", content: String(loaderData?.price ?? "") },
      { property: "product:price:currency", content: "INR" },
    ],
    links: [{ rel: "canonical", href: `/product/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Product not found" intro="It may have been renamed or removed." crumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: "Not found" }]} />
    </SiteLayout>
  ),
});

function ProductDetail() {
  const params = Route.useParams();
  const p = getProduct(params.slug)!;
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const wished = inWishlist(p.slug);
  const related = PRODUCTS.filter((r) => r.category === p.category && r.slug !== p.slug).slice(0, 4);
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  const requireLogin = () => {
    toast.error("Please sign in to continue");
    navigate({ to: "/login" });
  };


  return (
    <SiteLayout>
      <PageHero
        eyebrow={p.categoryLabel}
        title={p.title}
        intro={p.shortDescription}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: p.categoryLabel },
          { label: p.title },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-glow">
            <img
              src={p.image}
              alt={p.title}
              onError={(e) => {
                e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
              }}
              className="aspect-square w-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-emerald-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                −{discount}% Off
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.categoryLabel}</div>
            <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">{p.title}</h1>

            {p.rating ? (
              <div className="mt-3 flex items-center gap-1 text-sm text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < p.rating! ? "fill-current" : ""}`} />
                ))}
                <span className="ml-1 text-muted-foreground">Rated {p.rating.toFixed(2)} / 5</span>
              </div>
            ) : null}

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-foreground">{formatINR(p.price)}</span>
              {p.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatINR(p.oldPrice)}</span>
              )}
            </div>

            <p className="mt-5 text-sm text-foreground/80">{p.description}</p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 rounded-xl border border-primary/10 bg-white p-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {(p.duration || p.homeVisit) && (
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                {p.duration && (
                  <span className="rounded-full bg-primary-soft/60 px-3 py-1.5 font-semibold text-primary">⏱ {p.duration}</span>
                )}
                {p.homeVisit && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-accent/10 px-3 py-1.5 font-semibold text-emerald-accent">
                    <Home className="h-3.5 w-3.5" /> Home visit available
                  </span>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-primary/15">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(p.slug, qty)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(p.slug)}
                aria-label="Wishlist"
                className={`grid h-12 w-12 place-items-center rounded-full border border-primary/20 ${wished ? "text-emerald-accent" : "text-foreground"}`}
              >
                <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>

            <Link
              to="/book-appointment"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-foreground"
            >
              <Calendar className="h-4 w-4" /> Book Appointment Instead
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <h2 className="mb-6 font-display text-2xl font-semibold text-foreground sm:text-3xl">Related products</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
