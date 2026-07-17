import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop All Services — Sanjeevani Clinic" },
      { name: "description", content: "Browse all Sanjeevani Clinic services and packages — physiotherapy, blood tests, radiology, eye care and more. Book online with transparent pricing." },
      { property: "og:title", content: "Shop All Services — Sanjeevani Clinic" },
      { property: "og:description", content: "Every service and package offered by Sanjeevani Clinic with real prices." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
});

type Sort = "default" | "price-asc" | "price-desc" | "name";

function Shop() {
  const [sort, setSort] = useState<Sort>("default");
  const [cat, setCat] = useState<string>("all");

  const list = useMemo(() => {
    const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [sort, cat]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Shop"
        title="All services & packages"
        intro={`Showing ${list.length} of ${PRODUCTS.length} results across ${CATEGORIES.length} categories.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        {/* Category chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              cat === "all" ? "bg-primary text-primary-foreground" : "border border-primary/15 text-foreground hover:bg-primary-soft/60"
            }`}
          >
            All ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((c) => {
            const n = PRODUCTS.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  cat === c.slug ? "bg-primary text-primary-foreground" : "border border-primary/15 text-foreground hover:bg-primary-soft/60"
                }`}
              >
                {c.label} ({n})
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-white/70 px-4 py-3">
          <div className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{list.length}</span> results
          </div>
          <label className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-9 rounded-full border border-primary/15 bg-background px-3 text-xs font-medium"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </label>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {list.length === 0 && (
          <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center">
            <p className="text-muted-foreground">No products match the current filter.</p>
            <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-primary">Reset filters</Link>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
