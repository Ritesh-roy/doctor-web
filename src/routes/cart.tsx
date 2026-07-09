import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [
      { title: "Your Cart — Sanjeevani Clinic" },
      { name: "description", content: "Review the services and medicines in your Sanjeevani Clinic cart before checkout." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
});

function Cart() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Cart" title="Your cart" intro="Review your selected services or medicines before you check out." crumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-card">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
            <ShoppingCart className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-2xl text-foreground">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">Browse our services or pharmacy to add items to your cart.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/services" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Browse Services</Link>
            <Link to="/pharmacy" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Visit Pharmacy</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
