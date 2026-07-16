import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useStore } from "@/lib/store";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({
    meta: [
      { title: "My Wishlist — Sanjeevani Clinic Private Limited" },
      { name: "description", content: "Services and packages you have saved for later at Sanjeevani Clinic Private Limited." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/wishlist" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
});

function Wishlist() {
  const { wishlistItems, toggleWishlist, addToCart } = useStore();

  return (
    <SiteLayout>
      <PageHero eyebrow="Wishlist" title="Your saved services" intro="Services and tests you've saved for later." crumbs={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {wishlistItems.length === 0 ? (
          <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-card">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Browse Shop</Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-primary/10 bg-white p-4 shadow-card sm:p-6">
            <div className="divide-y divide-primary/10">
              {wishlistItems.map((p) => (
                <div key={p.slug} className="flex flex-wrap items-center gap-4 py-4">
                  <img src={p.image} alt={p.title} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">{p.categoryLabel}</div>
                    <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-base font-semibold hover:text-primary">{p.title}</Link>
                    <div className="mt-1 text-sm text-muted-foreground">{formatINR(p.price)}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(p.slug)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground"><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</button>
                    <button onClick={() => toggleWishlist(p.slug)} aria-label="Remove" className="grid h-10 w-10 place-items-center rounded-full border border-primary/20 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
