import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import {
  Award,
  Globe,
  HeartHandshake,
  Leaf,
  MapPin,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/founder-story")({
  component: FounderStory,
  head: () => ({
    meta: [
      { title: "Founder Story — Dr. B.P. Singh | Sanjeevani Clinic Pvt. Ltd." },
      {
        name: "description",
        content:
          "The story of Mr. D.R. B.P. Singh — founder & director of Sanjeevani Clinic Pvt. Ltd. From a single room in 2009 to a mission to bring affordable, ethical healthcare to every Indian family.",
      },
      { property: "og:title", content: "Founder Story — Dr. B.P. Singh" },
      {
        property: "og:description",
        content:
          "From a single room in 2009 to Sardar Patel Unity Award 2026 — the journey of the founder of Sanjeevani Clinic Pvt. Ltd. and NEOREO Healthcare.",
      },
      { property: "og:url", content: "/founder-story" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/photos/award-unity-desk.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/founder-story" }],
  }),
});

const TIMELINE = [
  {
    year: "2009",
    title: "A single room, a bigger vision",
    body: "The journey began in a small consulting room in Karan Vihar, Kirari — with limited resources but the conviction that quality healthcare should never be a privilege reserved for a few.",
    icon: Sparkles,
  },
  {
    year: "2012 – 2016",
    title: "Building trust, family by family",
    body: "Serving thousands of families across Kirari with honest, ethical, evidence-based medicine. The clinic slowly grows into a full-family healthcare address.",
    icon: HeartHandshake,
  },
  {
    year: "2017 – 2020",
    title: "Learning from 125+ countries",
    body: "Over the years, extensive international travel across 125+ countries — learning from different healthcare systems, business models and cultures — strengthens the belief that India deserves accessible, affordable, trust-based healthcare.",
    icon: Globe,
  },
  {
    year: "2021",
    title: "Sanjeevani Clinic Pvt. Ltd. — a mission, not a business",
    body: "Sanjeevani Clinic Pvt. Ltd. is formalised — not just as a healthcare company, but as a mission to build healthier communities, generate employment and empower local entrepreneurs.",
    icon: Target,
  },
  {
    year: "2023",
    title: "NEOREO Healthcare is born",
    body: "To make trusted healthcare products affordable for every household, the in-house brand NEOREO is launched — built on the belief that good health should never become a luxury.",
    icon: Leaf,
  },
  {
    year: "2024",
    title: "Rural India mission",
    body: "A dedicated push into rural healthcare — with the dream of a future where no family is denied treatment because of distance or financial limitations.",
    icon: MapPin,
  },
  {
    year: "2026",
    title: "Sardar Patel Unity Award",
    body: "Dr. Bhanu Pratap Singh is honoured with the Sardar Patel Unity Award 2026 for Outstanding Contribution to Healthcare Services — at Shangri-La's Eros, New Delhi.",
    icon: Trophy,
  },
];

const AWARDS = [
  { src: "/photos/award-unity-desk.jpg", title: "Sardar Patel Unity Award — 2026", subtitle: "Outstanding Contribution to Healthcare Services" },
  { src: "/photos/award-unity-frame-1.jpg", title: "Unity Award — Citation", subtitle: "Framed at the clinic's certificate wall" },
  { src: "/photos/award-trophy-black.jpg", title: "Unity Award Trophy", subtitle: "Obsidian-black trophy · 2026" },
  { src: "/photos/award-blood-donor.jpg", title: "Blood Donor & Environment Protection", subtitle: "Recognised for community drives" },
  { src: "/photos/award-meghmani.jpg", title: "Meghmani Lifesciences — \"A True Hero\"", subtitle: "For dedication to patient care" },
  { src: "/photos/doctor-with-award.jpg", title: "A Quiet Moment of Pride", subtitle: "With a national health foundation plaque" },
];

const AUTOBIOGRAPHY = [
  "I believe that true success is not measured by wealth alone — it is measured by the number of lives we are able to touch and improve.",
  "My journey began in 2009, not from a big office or a luxurious building, but from a small room with a simple dream. At that time, I had very limited resources, but my vision was much bigger than my circumstances. I always believed that quality healthcare should not be a privilege reserved for a few. Every person, regardless of where they live or how much they earn, deserves access to affordable, trusted, and ethical healthcare.",
  "Over the years, I have been fortunate to explore more than 125 countries, learning from different healthcare systems, business models, and cultures. Every journey taught me something valuable and strengthened my belief that India deserves a healthcare ecosystem that is accessible, affordable, and built on trust. That vision remains unchanged even today.",
  "My mission has always been to make quality healthcare reach every corner of India, especially rural communities, where people often travel long distances even for basic medical care. I dream of a future where no family is denied treatment because of distance or financial limitations, and where every patient receives healthcare with dignity, compassion, and strong ethical values.",
  "With this purpose, we built Sanjeevani Clinic Pvt. Ltd. — not just as a healthcare company, but as a mission to create healthier communities while generating employment opportunities and empowering local entrepreneurs.",
  "To make trusted healthcare products affordable for everyone, we also introduced our own brand, NEOREO. Every product under the NEOREO brand is developed with the vision of providing high-quality, reliable healthcare solutions at reasonable prices — because I believe good health should never become a luxury.",
  "For me, healthcare is not just a business. It is a responsibility. Every clinic we establish, every product we create, and every life we touch brings us one step closer to our mission. I know this journey is far from over. My dream is much bigger. I want to continue expanding our healthcare network, reaching more villages, creating more employment opportunities, and building a future where affordable healthcare is available to every Indian family.",
  "Because I truly believe that when you serve humanity with honesty, success becomes a by-product — not the destination.",
  "This is not just my story. It is the beginning of a mission to build a healthier, stronger, and more self-reliant India.",
];

function FounderStory() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Founder Story"
        title="A single room in 2009. A mission that outgrew every wall."
        intro="The story of Mr. D.R. B.P. Singh — Founder & Director of Sanjeevani Clinic Pvt. Ltd., visionary healthcare entrepreneur and the man behind NEOREO Healthcare."
        crumbs={[{ label: "Home", to: "/" }, { label: "Founder Story" }]}
      />

      {/* Portrait + intro */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/25 to-emerald-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-glow">
              <img
                src="/photos/doctor-portrait-2.jpg"
                alt="Mr. D.R. B.P. Singh — Founder, Sanjeevani Clinic Pvt. Ltd."
                loading="eager"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">Founder &amp; Director</span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Mr. D.R. B.P. Singh
            </h2>
            <p className="mt-2 text-sm font-medium text-emerald-accent">
              Visionary Healthcare Entrepreneur · Sanjeevani Clinic Pvt. Ltd.
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              {AUTOBIOGRAPHY.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "125+", l: "Countries explored" },
                { k: "70k+", l: "Lives touched" },
                { k: "2009", l: "Journey began" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-card">
                  <div className="font-display text-2xl font-semibold text-foreground">{s.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">The journey</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            From 2009 → today
          </h2>
          <p className="mt-4 text-muted-foreground">
            A quiet, honest journey — one patient, one village, one product at a time.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute inset-y-0 left-4 w-0.5 rounded-full bg-gradient-to-b from-primary via-emerald-accent to-primary/50 sm:left-1/2 sm:-translate-x-1/2" />
          <ol className="space-y-10">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className={`relative grid gap-4 sm:grid-cols-2 sm:gap-10 ${i % 2 ? "sm:[&>*:first-child]:col-start-2" : ""}`}>
                <div className={`sm:pr-10 ${i % 2 ? "sm:col-start-2 sm:pl-10 sm:pr-0 sm:text-left" : "sm:text-right"} pl-14 sm:pl-0`}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    <t.icon className="h-3.5 w-3.5" /> {t.year}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
                <span className="absolute left-4 top-1 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white text-primary shadow-glow ring-4 ring-primary/10 sm:left-1/2">
                  <t.icon className="h-4 w-4" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Awards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">Recognition</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Awards &amp; Achievements
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every award is a reminder of the families that trusted us — and the responsibility we carry forward.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a) => (
            <article key={a.src} className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={a.src} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-primary shadow-soft backdrop-blur">
                  <Award className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <div className="font-display text-lg font-semibold text-foreground">{a.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{a.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Continued autobiography */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-[32px] border border-primary/10 bg-gradient-to-br from-primary-soft/40 to-white p-8 sm:p-12">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">In his own words</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Mission, vision &amp; the road ahead
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85">
            {AUTOBIOGRAPHY.slice(3).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-primary/10 pt-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-foreground">Mr. D.R. B.P. Singh</div>
              <div className="text-sm text-muted-foreground">Founder &amp; Director · Sanjeevani Clinic Pvt. Ltd.</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEOREO */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-8 overflow-hidden rounded-[32px] border border-emerald-accent/20 bg-gradient-to-br from-emerald-accent/10 via-white to-primary/5 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-accent/15 px-3 py-1 text-xs font-semibold text-emerald-accent">
              <Leaf className="h-3.5 w-3.5" /> NEOREO Healthcare
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Trusted healthcare products, made affordable.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We also manufacture our own healthcare products under the NEOREO brand — because good health should never become a luxury. Every product is developed with quality, affordability and trust at its heart.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.sanjeevnionlineshop.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-accent px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Visit our online store
              </a>
              <Link
                to="/book-appointment"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/20 bg-white px-6 text-sm font-semibold text-foreground"
              >
                Book a consultation
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-emerald-accent/20 to-primary/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-glow">
              <img src="/__l5e/assets-v1/placeholder" alt="NEOREO Healthcare products" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title="Care that treats you like family" subtitle="Visit the clinic in Kirari or book a consultation online." />
    </SiteLayout>
  );
}
