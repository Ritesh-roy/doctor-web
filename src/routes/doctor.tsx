import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import doctorAsset from "@/assets/doctor-hero.asset.json";
import { GraduationCap, Award, Languages, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/doctor")({
  component: Doctor,
  head: () => ({
    meta: [
      { title: "Dr. B.P. Singh — MBBS, MD · Sanjeevani Clinc Private Limited" },
      { name: "description", content: "Meet Dr. B.P. Singh — 15+ years of family medicine experience in Karan Vihar, Kirari, Delhi." },
      { property: "og:title", content: "Dr. B.P. Singh — Sanjeevani Clinc Private Limited" },
      { property: "og:description", content: "Family physician known for honest, patient advice." },
      { property: "og:url", content: "/doctor" },
    ],
    links: [{ rel: "canonical", href: "/doctor" }],
  }),
});

function Doctor() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Meet your doctor"
        title="Dr. B.P. Singh — MBBS, MD"
        intro="A trusted family physician in Kirari with 15+ years of clinical experience, known for careful listening, honest advice and ethical care."
        crumbs={[{ label: "Home", to: "/" }, { label: "Doctor" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/20 to-emerald-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-glow">
              <img src={doctorAsset.url} alt="Dr. B.P. Singh" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: GraduationCap, k: "Education", v: "MBBS, MD (General Medicine)" },
                { icon: Stethoscope, k: "Specialty", v: "Family Medicine · Preventive Care" },
                { icon: Award, k: "Experience", v: "15+ years of practice" },
                { icon: Languages, k: "Languages", v: "Hindi · English · Punjabi" },
              ].map((c) => (
                <div key={c.k} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-card">
                  <c.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{c.k}</div>
                  <div className="mt-1 font-display text-lg text-foreground">{c.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="font-display text-2xl text-foreground">Approach to care</h2>
              <p className="mt-3 text-muted-foreground">
                Dr. Singh believes the best treatment starts with truly hearing the patient. He avoids over-testing and
                over-prescription, and prefers to explain diagnoses in plain language so patients can make informed
                decisions about their own health.
              </p>
              <h3 className="mt-8 font-display text-xl text-foreground">Areas of interest</h3>
              <ul className="mt-3 grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
                {[
                  "Chronic disease management (diabetes, hypertension, thyroid)",
                  "Preventive health & annual check-ups",
                  "Musculoskeletal pain & rehabilitation",
                  "Paediatric primary care",
                  "Geriatric medicine",
                  "Lifestyle counselling",
                ].map((x) => <li key={x} className="rounded-xl border border-primary/10 bg-white p-3">{x}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book-appointment" className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background">Book a consultation</Link>
                <Link to="/contact" className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Visit the clinic</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
