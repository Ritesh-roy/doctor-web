import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BLOG_POSTS, getPost } from "@/data/blog";
import { Clock, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article Not Found — Sanjeevani Clinic" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Sanjeevani Clinic Blog` },
        { name: "description", content: p.excerpt },
        { name: "keywords", content: `${p.category}, health blog Delhi, Sanjeevani Clinic Kirari` },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: p.publishedOn },
        { property: "article:author", content: p.author },
        { property: "article:section", content: p.category },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.publishedOn,
            author: { "@type": "Organization", name: p.author },
            publisher: { "@type": "MedicalClinic", name: "Sanjeevani Clinic" },
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={post.excerpt}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: post.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readMinutes} min read</span>
          <span>{new Date(post.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="prose prose-lg max-w-none text-foreground [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_p]:text-muted-foreground [&_p]:leading-relaxed">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {post.excerpt} This article expands on that overview with practical guidance from the doctors and therapists at Sanjeevani Clinic, Kirari.
          </p>
          <h2>Introduction</h2>
          <p>
            The full long-form article for <strong>{post.title}</strong> is being finalised by our clinical team.
            In the meantime, you can call <a href="tel:+918853515351">+91 88535 15351</a> for any personal questions, or book an appointment for a direct consultation.
          </p>
          <h2>Key takeaways</h2>
          <ul>
            <li>Reliable, doctor-reviewed information written for families in Kirari and Rohini.</li>
            <li>Actionable steps you can start today, without medical jargon.</li>
            <li>Clear guidance on when to see a doctor versus wait and watch.</li>
          </ul>
          <h2>Related services</h2>
          <p>
            Explore our related care areas: <Link to="/services/physiotherapy" className="text-primary underline">Physiotherapy</Link>,{" "}
            <Link to="/services/eye-checkup" className="text-primary underline">Eye Care</Link>,{" "}
            <Link to="/services/blood-test" className="text-primary underline">Blood Test</Link>, and{" "}
            <Link to="/services/general-medicine" className="text-primary underline">General Medicine</Link>.
          </p>
        </div>

        <div className="mt-14 border-t border-primary/10 pt-10">
          <h3 className="font-display text-xl text-foreground">Related articles</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="rounded-2xl border border-primary/10 bg-white p-4 text-sm text-foreground shadow-card hover:shadow-glow"
              >
                <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">{r.category}</div>
                <div className="mt-2 font-semibold">{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <CtaBanner />
    </SiteLayout>
  );
}

function NotFound() {
  return (
    <SiteLayout>
      <PageHero title="Article not found" intro="This post may have moved or been removed." crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }]} />
    </SiteLayout>
  );
}
function ErrorView() {
  return (
    <SiteLayout>
      <PageHero title="Something went wrong" intro="Please try again or contact us." crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }]} />
    </SiteLayout>
  );
}
