import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Health Blog & Guides — Sanjeevani Clinic Pvt. Ltd., Kirari, Delhi" },
      {
        name: "description",
        content:
          "Reliable, doctor-reviewed articles on physiotherapy, eye care, diagnostics, general medicine and preventive health from Sanjeevani Clinic Pvt. Ltd., Kirari.",
      },
      { name: "keywords", content: "health blog Delhi, physiotherapy tips, eye care articles, blood test guide, family health advice Kirari" },
      { property: "og:title", content: "Health Blog & Guides — Sanjeevani Clinic Pvt. Ltd." },
      { property: "og:description", content: "Doctor-reviewed articles on family health, physiotherapy, diagnostics and more." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

function BlogIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog & Guides"
        title="Practical, doctor-reviewed health writing."
        intro="Clear guides on physiotherapy, eye care, blood tests, general medicine and preventive health — written for real families, not textbooks."
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="aspect-[16/10] overflow-hidden bg-primary-soft/30">
                <img src={p.cover} alt={p.featuredImageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex w-fit items-center rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {p.category}
                </span>
                <h2 className="mt-4 font-display text-xl leading-snug text-foreground group-hover:text-primary">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}