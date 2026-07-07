import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { SERVICES, getService, type Service } from "@/data/services";
import { Check, ArrowRight, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): Service => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return s;
  },
  component: ServiceDetail,
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Service"} — Sanjeevani Clinic` },
      { name: "description", content: loaderData?.short ?? "Service at Sanjeevani Clinic" },
      { property: "og:title", content: loaderData?.title ?? "Service" },
      { property: "og:description", content: loaderData?.short ?? "" },
      { property: "og:url", content: `/services/${params.slug}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/services/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Service not found" intro="The service you're looking for doesn't exist." crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Not found" }]} />
    </SiteLayout>
  ),
});

function ServiceDetail() {
  const params = Route.useParams();
  const s = getService(params.slug)!;
  const related = SERVICES.filter((r) => r.slug !== s.slug).slice(0, 3);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Service"
        title={s.title}
        intro={s.short}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: s.title }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-glow">
            <img src={s.image} alt={s.title} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-muted-foreground">{s.description}</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {s.benefits.map((b) => (
                <div key={b} className="flex items-start gap-2 rounded-xl border border-primary/10 bg-white p-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-accent" />
                  <span className="text-foreground/90">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book-appointment" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow">
                <Calendar className="h-4 w-4" /> Book Appointment
              </Link>
              <Link to="/contact" className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Ask a question</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">How the treatment works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.process.map((p, i) => (
            <div key={p.step} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Step {i + 1}</div>
              <div className="mt-2 font-display text-lg font-semibold text-foreground">{p.step}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-6">
          {s.faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">Related services</h2>
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">All services <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-transform hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="font-display text-lg font-semibold text-foreground">{r.title}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  );
}
