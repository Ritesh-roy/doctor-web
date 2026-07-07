import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Award, HeartPulse, Users, ShieldCheck, Sparkles, Target, Eye } from "lucide-react";
import doctorAsset from "@/assets/doctor-hero.asset.json";
import { CLINIC } from "@/data/clinic";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Sanjeevani Clinic — Family Healthcare in Kirari, Delhi" },
      { name: "description", content: "Since 2009, Sanjeevani Clinic has cared for families across Karan Vihar and Kirari with honest, evidence-based medicine led by Dr. B.P. Singh." },
      { property: "og:title", content: "About Sanjeevani Clinic" },
      { property: "og:description", content: "Our story, mission and values." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="A neighbourhood clinic with the standards of a modern hospital."
        intro="Founded on the belief that ‘Sehat hi asli sampatti hai’, Sanjeevani Clinic has been the trusted first point of care for Kirari families for over 15 years."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/20 to-emerald-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-glow">
              <img src={doctorAsset.url} alt="Dr. B.P. Singh at Sanjeevani Clinic" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Our story</span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">Care that started in a small room, and never lost its warmth.</h2>
            <p className="mt-5 text-muted-foreground">
              Sanjeevani Clinic opened its doors in {CLINIC.since} with a single consulting room, a small pharmacy shelf and one clear promise:
              treat every patient with time, honesty and dignity. Fifteen years on, we're now a full family clinic with in-house pathology,
              physiotherapy, imaging support and preventive health programmes — but that same promise still runs the place.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { k: `${CLINIC.years}+`, l: "Years serving Kirari" },
                { k: "25k+", l: "Families cared for" },
                { k: "4.9★", l: "Google rating" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-card">
                  <div className="font-display text-2xl font-semibold text-foreground">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", body: "To deliver ethical, evidence-based healthcare to every family in Kirari — with kindness, clarity and continuity." },
            { icon: Eye, title: "Our Vision", body: "To be Delhi's most trusted neighbourhood clinic, where great medicine feels human and accessible." },
            { icon: HeartPulse, title: "Our Values", body: "Honesty, empathy, precision. No over-prescription. No shortcuts on care. Ever." },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary"><v.icon className="h-5 w-5" /></span>
              <div className="mt-5 font-display text-xl font-semibold text-foreground">{v.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-soft/40 to-white p-8 sm:p-12">
          <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">What sets us apart</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, k: "Doctor-led", v: "Every plan is designed and reviewed by Dr. Singh personally." },
              { icon: ShieldCheck, k: "Ethical care", v: "We prescribe only what you truly need — nothing more." },
              { icon: Sparkles, k: "All under one roof", v: "OPD, lab, physio and imaging support in one visit." },
              { icon: Award, k: "Consistently rated 4.9★", v: "By hundreds of Kirari families on Google." },
            ].map((c) => (
              <div key={c.k}>
                <c.icon className="h-6 w-6 text-primary" />
                <div className="mt-3 font-display text-lg font-semibold text-foreground">{c.k}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/doctor" className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background">Meet Dr. B.P. Singh</Link>
          </div>
        </div>
      </section>

      <CtaBanner title="Care that treats you like family" subtitle="Visit us in Karan Vihar or book a consultation online." />
    </SiteLayout>
  );
}
