import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CATEGORIES, PRODUCTS, PRODUCT_IMAGE_FALLBACK } from "@/data/products";
import { ArrowRight, Home } from "lucide-react";

export const Route = createFileRoute("/medical-services")({
  component: MedicalServices,
  head: () => ({
    meta: [
      { title: "Medical Services — Sanjeevani Clinlc, Kirari, Delhi" },
      { name: "description", content: "All medical services at Sanjeevani Clinlc — physiotherapy, diagnostics, radiology, eye treatment and more. Home visits available." },
      { property: "og:title", content: "Medical Services — Sanjeevani Clinlc" },
      { property: "og:description", content: "Physiotherapy, diagnostics, radiology, eye treatment, general medical — all under one roof." },
      { property: "og:url", content: "/medical-services" },
    ],
    links: [{ rel: "canonical", href: "/medical-services" }],
  }),
});

function MedicalServices() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Medical Services"
        title="Complete healthcare, under one roof"
        intro="From physiotherapy and blood tests to radiology and eye care — explore every category we offer."
        crumbs={[{ label: "Home", to: "/" }, { label: "Medical Services" }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/product-category/$slug"
                params={{ slug: c.slug }}
                className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.label}
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    {count} {count === 1 ? "Product" : "Products"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">{c.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-accent/10 px-3 py-1 text-xs font-semibold text-emerald-accent">
                    <Home className="h-3.5 w-3.5" /> Home visit available
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View products <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
