import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BLOG_POSTS, getPost, type BlogPost } from "@/data/blog";
import { Clock, User, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article Not Found — Sanjeevani Clinlc Pvt. Ltd." }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Sanjeevani Clinlc Pvt. Ltd. Blog` },
        { name: "description", content: p.excerpt },
        { name: "keywords", content: `${p.category}, health blog Delhi, Sanjeevani Clinlc Pvt. Ltd. Kirari` },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "og:image", content: p.cover },
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
            image: p.cover,
            datePublished: p.publishedOn,
            author: { "@type": "Organization", name: p.author },
            publisher: { "@type": "MedicalClinic", name: "Sanjeevani Clinlc Pvt. Ltd." },
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
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length ? related : fallbackRelated;

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
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(post.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </PageHero>

      {post.video && (
        <section className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
          <figure className="overflow-hidden rounded-3xl border border-primary/10 bg-foreground shadow-glow">
            <video
              src={post.video.src}
              poster="/photos/blog-video-poster.jpg"
              controls
              preload="metadata"
              playsInline
              className="aspect-video w-full object-contain"
            />
            {post.video.caption && (
              <figcaption className="bg-white px-5 py-3 text-center text-sm text-muted-foreground">
                {post.video.caption}
              </figcaption>
            )}
          </figure>
        </section>
      )}

      {!post.video && (
        <section className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-primary/10 bg-primary-soft/30 p-12 shadow-glow">
            <img src="/logo-full.png" alt="Sanjeevani Clinlc logo" className="h-full w-full object-contain" loading="eager" />
          </div>
        </section>
      )}


      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <p className="text-lg leading-relaxed text-muted-foreground">{post.intro}</p>

        {post.keyTakeaways.length > 0 && (
          <div className="mt-8 rounded-3xl border border-primary/10 bg-primary-soft/40 p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Key takeaways</div>
            <ul className="mt-4 space-y-2.5">
              {post.keyTakeaways.map((k) => (
                <li key={k} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-accent" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 space-y-8">
          {post.sections.map((s, i) => (
            <section key={i}>
              {s.heading && (
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{s.heading}</h2>
              )}
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-4 text-base leading-relaxed text-muted-foreground">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-base text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.quote && (
                <blockquote className="mt-6 border-l-4 border-primary/40 bg-primary-soft/20 px-6 py-4 font-display text-lg italic text-foreground">
                  {s.quote}
                </blockquote>
              )}
            </section>
          ))}
        </div>

        {post.faqs.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Frequently asked</h2>
            <Accordion type="single" collapsible className="mt-4">
              {post.faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-soft/50 to-white p-6 sm:p-8">
          <h3 className="font-display text-xl text-foreground">Have a personal question about this?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Book a short consultation with Dr. B.P. Singh at Sanjeevani Clinlc Pvt. Ltd., or WhatsApp us and we will guide you.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/book-appointment" className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Book Appointment</Link>
            <a href="https://wa.me/918853515351" className="inline-flex h-11 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Chat on WhatsApp</a>
          </div>
        </div>

        <div className="mt-14 border-t border-primary/10 pt-10">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-xl text-foreground">Related articles</h3>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">All articles <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {relatedPosts.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-white text-sm text-foreground shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-primary-soft/30 p-5">
                  <img src="/logo-full.png" alt="Sanjeevani Clinlc logo" loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">{r.category}</div>
                  <div className="mt-2 font-semibold leading-snug">{r.title}</div>
                </div>
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
