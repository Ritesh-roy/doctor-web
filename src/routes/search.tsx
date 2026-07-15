import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Search — Sanjeevani Clinc Private Limited" },
      { name: "description", content: "Search services, blood tests, therapies and scans at Sanjeevani Clinc Private Limited." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.categoryLabel.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Search" title="Find a service" intro="Search across every service, blood test, scan and therapy we offer." crumbs={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try 'blood test', 'MRI', 'cupping'…"
            className="h-14 w-full rounded-full border border-primary/15 bg-white pl-11 pr-4 text-sm shadow-card"
          />
        </div>

        {q && (
          <p className="mt-4 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} for "{q}"
          </p>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
