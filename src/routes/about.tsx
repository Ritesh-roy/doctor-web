import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Award, HeartPulse, Users, ShieldCheck, Sparkles, Target, Eye } from "lucide-react";
import { CLINIC } from "@/data/clinic";


export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Sanjeevani Clinic Private Limited — Family Healthcare in Kirari, Delhi" },
      { name: "description", content: "Since 2009, Sanjeevani Clinic Private Limited has cared for families across Karan Vihar and Kirari with honest, evidence-based medicine led by Dr. B.P. Singh." },
      { property: "og:title", content: "About Sanjeevani Clinic Private Limited" },
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
        intro="Founded on the belief that ‘Sehat hi asli sampatti hai’, Sanjeevani Clinic Private Limited has been the trusted first point of care for Kirari families for over 15 years."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/20 to-emerald-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-glow">
              <img src="/photos/clinic-front.jpg" alt="Sanjeevani Clinic Private Limited — Karan Vihar, Kirari, Delhi" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Our story</span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">Care that started in a small room, and never lost its warmth.</h2>
            <p className="mt-5 text-muted-foreground">
              Sanjeevani Clinic Private Limited opened its doors in {CLINIC.since} on Karan Vihar Road with a single consulting room, a small pharmacy shelf and one clear promise:
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
            <div className="mt-6 grid grid-cols-2 gap-3">
              <img src="/photos/doctor-desk-1.jpg" alt="Dr. B.P. Singh consulting a patient at Sanjeevani Clinic Private Limited" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
              <img src="/photos/clinic-street-bw.jpg" alt="Sanjeevani Clinic Private Limited street view" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
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

      <TeamSection />

      <CtaBanner title="Care that treats you like family" subtitle="Visit us in Karan Vihar or book a consultation online." />
    </SiteLayout>
  );
}

const FOUNDER = {
  name: "Dr. B.P. Singh",
  qualification: "MBBS",
  role: "Founder & Director",
  org: "Sanjeevani Clinic Private Limited Private Limited",
} as const;

const TEAM = [
  { name: "Pradeep", role: "Marketing Executive Manager", years: "10+ Years", icon: "📣" },
  { name: "Sandeep", role: "Manager", years: "5+ Years", icon: "🧑‍💼" },
  { name: "Raju", role: "Senior Therapist", years: "5+ Years", icon: "💆" },
  { name: "Firoz", role: "Marketing Executive", years: "5+ Years", icon: "📢" },
  { name: "Sachin", role: "Assistant Manager", years: "2+ Years", icon: "🧑‍💼" },
  { name: "Poonam", role: "Receptionist", years: null, icon: "☎️" },
  { name: "Versha", role: "Nursing Staff", years: null, icon: "👩‍⚕️" },
  { name: "Rupali", role: "Nursing Staff", years: null, icon: "👩‍⚕️" },
  { name: "Prince", role: "Therapy Assistant", years: null, icon: "🤝" },
  { name: "Alok", role: "Inventory Management", years: null, icon: "📦" },
  { name: "Sagar", role: "Inventory Management", years: null, icon: "📦" },
  { name: "Alam", role: "E-Commerce Management", years: null, icon: "🛒" },
  { name: "Ashwani", role: "Graphic Designer", years: null, icon: "🎨" },
] as const;

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("");
}

function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">Our people</span>
        <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
          Meet Our Team
        </h2>
        <p className="mt-5 text-muted-foreground">
          Our experienced healthcare professionals are dedicated to delivering compassionate, ethical,
          and high-quality care to every patient.
        </p>
      </div>

      {/* Hero team photo */}
      <div className="relative mt-12 overflow-hidden rounded-[32px] border border-white/60 shadow-glow">
        <img
          src="/photos/team-selfie.jpg"
          alt="The Sanjeevani Clinic Private Limited team at Karan Vihar, Kirari"
          loading="lazy"
          className="aspect-[21/9] w-full object-cover object-center transition-transform duration-[1200ms] hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
          <div className="text-white">
            <div className="text-xs font-medium uppercase tracking-[0.24em] text-white/80">The Sanjeevani Family</div>
            <div className="mt-1 font-display text-2xl font-semibold sm:text-3xl">One team. One promise. Your health.</div>
          </div>
          <div className="hidden rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:block">
            Karan Vihar · Kirari · Delhi
          </div>
        </div>
      </div>

      {/* Founder & Director */}
      <div className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-primary/20" />
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">Founder & Director</span>
          <span className="h-px flex-1 bg-primary/20" />
        </div>
        <article className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-primary-soft/60 via-white/80 to-emerald-accent/10 p-8 shadow-glow transition-all duration-500 hover:-translate-y-1">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-primary to-emerald-accent font-display text-3xl font-semibold text-white shadow-soft transition-transform duration-500 group-hover:scale-105">
              🩺
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {FOUNDER.name} <span className="text-lg font-medium text-muted-foreground">({FOUNDER.qualification})</span>
              </div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">{FOUNDER.role}</div>
              <div className="mt-2 text-sm text-muted-foreground">{FOUNDER.org}</div>
              <Link to="/founder-story" className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background">
                Read Founder Story
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Professional Team */}
      <div className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-primary/20" />
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">Our Professional Team</span>
          <span className="h-px flex-1 bg-primary/20" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TEAM.map((m, i) => (
            <article
              key={m.name}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: i % 2 ? "var(--emerald-accent)" : "var(--primary)" }}
                aria-hidden
              />
              <div className="flex items-start gap-4">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-emerald-accent font-display text-lg font-semibold text-white shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {initials(m.name)}
                  <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-white text-lg shadow-soft">
                    {m.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="truncate font-display text-lg font-semibold text-foreground">{m.name}</div>
                  <div className="mt-0.5 text-sm font-medium text-primary">{m.role}</div>
                </div>
              </div>
              {m.years && (
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-soft/70 px-3 py-1 text-xs font-medium text-foreground">
                  ⏱ Experience: {m.years}
                </div>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 text-xs">
                <span className="text-muted-foreground">Sanjeevani Clinic Private Limited</span>
                <span className="font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Trusted staff →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

