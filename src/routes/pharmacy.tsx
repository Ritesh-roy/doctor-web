import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Pill, ShieldCheck, Truck, Clock } from "lucide-react";

export const Route = createFileRoute("/pharmacy")({
  component: Pharmacy,
  head: () => ({
    meta: [
      { title: "In-house Pharmacy — Sanjeevani Clinlc, Kirari, Delhi" },
      {
        name: "description",
        content:
          "Sanjeevani Clinlc's in-house pharmacy stocks genuine medicines, chronic-care refills and OTC essentials, with prescription verification by our doctor.",
      },
      { name: "keywords", content: "pharmacy Kirari, medicines near me, chronic care refills, Sanjeevani Clinlc pharma" },
      { property: "og:title", content: "In-house Pharmacy — Sanjeevani Clinlc" },
      { property: "og:description", content: "Genuine medicines and chronic-care refills with doctor verification." },
      { property: "og:url", content: "/pharmacy" },
    ],
    links: [{ rel: "canonical", href: "/pharmacy" }],
  }),
});

const highlights = [
  { icon: ShieldCheck, title: "Genuine medicines", body: "Sourced only from licensed distributors, batch-verified and stored to spec." },
  { icon: Pill, title: "Chronic-care refills", body: "Reliable monthly refills for BP, diabetes, thyroid and cardiac patients." },
  { icon: Truck, title: "Neighbourhood delivery", body: "Doorstep delivery in Karan Vihar, Kirari, Rohini Sector 25 and nearby areas." },
  { icon: Clock, title: "Doctor-verified", body: "Every prescription is checked against your consultation before dispensing." },
];

function Pharmacy() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sanjeevani Clinlc Pharma"
        title="In-house pharmacy you can actually trust."
        intro="Genuine, well-stored medicines dispensed by our clinical team — with clear counselling on how and when to take each one."
        crumbs={[{ label: "Home", to: "/" }, { label: "Pharmacy" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Consult a Doctor</Link>
          <a href="tel:+917701986188" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Order a Refill</a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <h.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner title="Need a repeat prescription?" subtitle="Send us your last prescription on WhatsApp and we will arrange the refill." />
    </SiteLayout>
  );
}
