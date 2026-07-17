import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, getCategory, productsByCategory, type ProductCategorySlug } from "@/data/products";

export const Route = createFileRoute("/product-category/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug as ProductCategorySlug);
    if (!c) throw notFound();
    return c;
  },
  component: CategoryPage,
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.label ?? "Category"} — Sanjeevani Clinlc` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.label ?? "Category"} — Sanjeevani Clinlc` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:image", content: loaderData?.image ?? "" },
      { property: "og:url", content: `/product-category/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/product-category/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Category not found" intro="Try browsing all our services instead." crumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: "Not found" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-24 text-center">
        <Link to="/shop" className="text-primary underline">Back to shop</Link>
      </div>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const params = Route.useParams();
  const cat = getCategory(params.slug as ProductCategorySlug)!;
  const list = productsByCategory(cat.slug);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Category"
        title={cat.label}
        intro={cat.description}
        crumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: cat.label }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/product-category/$slug"
              params={{ slug: c.slug }}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                c.slug === cat.slug ? "bg-primary text-primary-foreground" : "border border-primary/15 text-foreground hover:bg-primary-soft/60"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">Showing all {list.length} results</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
