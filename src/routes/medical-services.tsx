import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/data/services";
import { PRODUCT_IMAGE_FALLBACK } from "@/data/products";
import { Activity, Microscope, Sparkles, Eye, Stethoscope, HeartPulse, ArrowRight } from "lucide-react";

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
  const icons = { activity: Activity, microscope: Microscope, sparkles: Sparkles, eye: Eye, stethoscope: Stethoscope, heart: HeartPulse } as const;
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
          {SERVICES.map((service) => {
            const Icon = icons[service.icon];
            return (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-primary shadow-soft backdrop-blur"><Icon className="h-5 w-5" /></span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View service <ArrowRight className="h-4 w-4" />
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
