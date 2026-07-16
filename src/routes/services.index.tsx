import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { SERVICES } from "@/data/services";
import { PRODUCT_IMAGE_FALLBACK } from "@/data/products";
import { Activity, Microscope, Sparkles, Eye, Stethoscope, HeartPulse, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: "Services — Sanjeevani Clinic Private Limited, Kirari Delhi" },
      { name: "description", content: "Physiotherapy, diagnostics, radiology, eye care, general medicine and preventive health check-ups — under one roof." },
      { property: "og:title", content: "All Services — Sanjeevani Clinic Private Limited" },
      { property: "og:description", content: "A full spectrum of family healthcare services in Kirari, Delhi." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const ICONS = { activity: Activity, microscope: Microscope, sparkles: Sparkles, eye: Eye, stethoscope: Stethoscope, heart: HeartPulse } as const;

function ServicesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our care"
        title="Complete family healthcare — thoughtfully coordinated."
        intro="Explore the full range of services at Sanjeevani Clinic Private Limited. Each is doctor-led, evidence-based and delivered with the warmth we're known for."
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const I = ICONS[s.icon];
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-primary shadow-soft backdrop-blur"><I className="h-5 w-5" /></span>
                </div>
                <div className="p-6">
                  <div className="font-display text-xl font-semibold text-foreground">{s.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
