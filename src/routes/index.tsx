import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  Sparkles,
  Eye,
  Star,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Calendar,
  Phone,
  MessageCircle,
  Quote,
  Home as HomeIcon,
  Leaf,
  BookOpen,
  Clock,
  UserRound,
  FlaskConical,
  Scan,
} from "lucide-react";


import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ProductSlider } from "@/components/site/ProductSlider";
import { HeroSlider } from "@/components/site/HeroSlider";
import { CLINIC } from "@/data/clinic";

import doctorAsset from "@/assets/doctor-hero.asset.json";
import neoreoAsset from "@/assets/neoreo-products.png.asset.json";

const HERO_SLIDES = [
  { src: "/photos/doctor-portrait-1.jpg", alt: "Family physician at Sanjeevani Clinic", caption: "Family Physician · Trusted Care" },
  { src: "/photos/doctor-desk-1.jpg", alt: "Doctor consulting a patient", caption: "Warm, unhurried consultations" },
  { src: "/photos/doctor-desk-3.jpg", alt: "Doctor explaining medical reports", caption: "Clear, honest explanations" },
  { src: "/photos/clinic-front.jpg", alt: "Sanjeevani Clinic reception and entrance", caption: "Modern, welcoming reception" },
  { src: "/photos/doctor-desk-4.jpg", alt: "Consultation room at Sanjeevani Clinic", caption: "Private consultation rooms" },
  { src: "/photos/ai-cervical-machine.jpg", alt: "Therapy and treatment equipment", caption: "Modern treatment equipment" },
  { src: "/photos/clinic-street-bw.jpg", alt: "Sanjeevani Clinic exterior — Karan Vihar, Kirari", caption: "Serving Kirari since 2009" },
];

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Sanjeevani Clinic Private Limited — Trusted Family Healthcare in Kirari, Delhi" },
      {
        name: "description",
        content:
          "Sanjeevani Clinic Private Limited, Karan Vihar (Kirari), Delhi. 15+ years of trusted family healthcare led by Dr. B.P. Singh — physiotherapy, diagnostics, radiology, eye care and more.",
      },
      { property: "og:title", content: "Sanjeevani Clinic Private Limited — Premium Family Healthcare" },
      { property: "og:description", content: "Warm, ethical, evidence-based care for you and your family in Kirari, Delhi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: CLINIC.name,
          telephone: CLINIC.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "ADD-B, 327a, Karan Vihar Rd, Karan Vihar Phase I",
            addressLocality: "Kirari, Delhi",
            postalCode: "110086",
            addressCountry: "IN",
          },
          openingHours: ["Mo-Su 09:00-13:00", "Mo-Su 17:00-21:00"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: CLINIC.rating,
            reviewCount: CLINIC.reviewCount,
          },
        }),
      },
    ],
  }),
});



function Hero() {
  return (
    <section className="relative overflow-hidden aurora-bg">
      <div className="absolute inset-0 grid-fade opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
            Now accepting new patients · Kirari, Delhi
          </span>

          <h1 className="mt-6 font-display text-[40px] leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-[72px]">
            Trusted Healthcare<br className="hidden sm:block" /> for You &amp; Your{" "}
            <span className="text-gradient">Family.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            For over {CLINIC.years} years, Sanjeevani Clinic Private Limited has cared for families across
            Delhi with warm, expert medicine — from everyday consultations to
            physiotherapy, diagnostics and eye care, all under one roof.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/book-appointment"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${CLINIC.phoneTel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/70 px-6 text-sm font-semibold text-foreground backdrop-blur hover:bg-white"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald-accent/40 bg-emerald-accent/10 px-6 text-sm font-semibold text-emerald-accent hover:bg-emerald-accent/15"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: `${CLINIC.rating}★`, l: "Google Rating" },
              { v: `${CLINIC.years}+`, l: "Years of Care" },
              { v: `${(CLINIC.patients / 1000).toFixed(0)}k+`, l: "Happy Patients" },
              { v: "20+", l: "Expert Services" },
            ].map((k) => (
              <div key={k.l} className="rounded-2xl border border-primary/10 bg-white/60 p-4 backdrop-blur">
                <div className="font-display text-2xl font-semibold text-foreground">{k.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{k.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-primary/25 via-sky/40 to-emerald-accent/20 blur-2xl" />
            <HeroSlider slides={HERO_SLIDES} className="absolute inset-0 h-full w-full" />

            {/* Family Physician glass badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass-card absolute -left-3 top-8 z-10 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-card backdrop-blur-md sm:-left-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <UserRound className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Family Physician</div>
                <div className="text-xs text-muted-foreground">General &amp; Family Healthcare</div>
              </div>
            </motion.div>

            {/* Day Care card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="glass-card absolute -right-2 bottom-24 z-10 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/75 p-3 shadow-card backdrop-blur-md sm:-right-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-accent/15 text-emerald-accent">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Day Care in 2–5 hrs</div>
                <div className="text-xs text-muted-foreground">Same-day observation &amp; care</div>
              </div>
            </motion.div>

            {/* Google rating pill */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity }}
              className="glass-card absolute -left-2 bottom-6 z-10 flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-1.5 shadow-card backdrop-blur-md sm:-left-4"
            >
              <Star className="h-4 w-4 fill-current text-emerald-accent" />
              <span className="text-xs font-semibold text-foreground">{CLINIC.rating} · Google</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { icon: ShieldCheck, title: "Ethical, evidence-based", body: "Only the tests and treatments you truly need — no over-prescription." },
    { icon: Users, title: "Family-first care", body: "One trusted place for grandparents, parents and children." },
    { icon: Award, title: "15+ years of trust", body: "Serving Karan Vihar and Kirari since 2009 with warmth and skill." },
    { icon: Sparkles, title: "Modern & clean facility", body: "Sanitised OPD, private consultation rooms, in-house lab & imaging support." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><i.icon className="h-5 w-5" /></span>
            <div className="mt-4 font-display text-lg font-semibold text-foreground">{i.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid() {
  const groups = [
    {
      title: "Sanjeevani Diagnose",
      short: "Full-spectrum blood tests, health packages & home sample collection.",
      icon: FlaskConical,
      image: "/photos/doctor-desk-3.jpg",
      to: "/medical-services",
      badge: "Home Sample Available",
      chips: ["CBC", "Lipid Profile", "Thyroid", "Diabetes", "LFT", "KFT", "Vitamin", "Urine"],
    },
    {
      title: "Sanjeevani Eye Services",
      short: "Comprehensive eye check-ups, refraction and specialist referral.",
      icon: Eye,
      image: "/photos/ai-lens-replace.jpg",
      to: "/free-eye-checkup",
      chips: ["Eye Check-up", "Refraction", "Cataract advice"],
    },
    {
      title: "Sanjeevani Physiotherapy Services",
      short: "IFT, TENS, cervical & lumbar traction, cupping and rehab.",
      icon: Activity,
      image: "/photos/ai-cervical-machine.jpg",
      to: "/product-category/$slug",
      params: { slug: "physiotherapy" },
      chips: ["IFT", "TENS", "Cervical", "Lumbar", "Cupping"],
    },
    {
      title: "Sanjeevani Radiology Services",
      short: "In-clinic X-ray coordination, ultrasound and imaging support.",
      icon: Scan,
      image: "/photos/ai-radiology.jpg",
      to: "/medical-services",
      chips: ["X-Ray", "Ultrasound", "ECG"],
    },
  ] as const;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft/50 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Our services</span>
        <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-5xl">A full spectrum of care, under one calm roof.</h2>
        <p className="mt-4 text-muted-foreground">Four dedicated Sanjeevani service lines — thoughtfully coordinated by one clinical team.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {groups.map((g) => {
          const I = g.icon;
          return (
            <Link
              key={g.title}
              to={g.to}
              params={("params" in g ? g.params : undefined) as never}
              className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-primary shadow-soft backdrop-blur"><I className="h-5 w-5" /></span>
                {"badge" in g && g.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-emerald-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                    {g.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="font-display text-xl font-semibold text-foreground">{g.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.short}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.chips.map((c) => (
                    <span key={c} className="rounded-full bg-primary-soft/60 px-2.5 py-1 text-[11px] font-medium text-primary">{c}</span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Explore more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DoctorStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-soft/40 to-white p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white shadow-glow">
            <img src={doctorAsset.url} alt="Dr. B.P. Singh" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Meet your doctor</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">Dr. B.P. Singh — MBBS, MD</h2>
          <p className="mt-4 text-muted-foreground">
            With over 15 years of clinical experience, Dr. Singh is known in Karan Vihar and Kirari for his patience,
            careful listening and honest, ethical advice. He leads Sanjeevani Clinic Private Limited with the belief that great care
            begins with feeling heard.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { k: "15+", l: "Years experience" },
              { k: "70k+", l: "Patients cared for" },
              { k: "4.9★", l: "Google rating" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-primary/10 bg-white p-4">
                <div className="font-display text-2xl font-semibold text-foreground">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/doctor" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background">View profile</Link>
            <Link to="/book-appointment" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Book consultation</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewStrip() {
  const reviews = [
    { n: "Priya S.", t: "Dr. Singh takes time to actually listen. My father's BP is finally under control." },
    { n: "Rahul K.", t: "Clean clinic, quick reports, honest advice. Best in the Kirari area." },
    { n: "Anita M.", t: "Physiotherapy sessions helped me walk pain-free after 6 months of knee trouble." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">Loved by families across Delhi</h2>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 text-emerald-accent">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </span>
          <span>{CLINIC.rating} on Google · {CLINIC.reviewCount}+ reviews</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.n} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
            <Quote className="h-6 w-6 text-primary/50" />
            <p className="mt-3 text-sm leading-relaxed text-foreground">{r.t}</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft font-semibold text-primary">{r.n[0]}</span>
              <div>
                <div className="text-sm font-semibold text-foreground">{r.n}</div>
                <div className="flex items-center gap-0.5 text-emerald-accent">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/testimonials" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read all reviews <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

function FounderPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 overflow-hidden rounded-[32px] border border-primary/10 bg-gradient-to-br from-white via-primary-soft/30 to-white p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/20 to-emerald-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-glow">
            <img src="/photos/doctor-portrait-2.jpg" alt="Mr. D.R. B.P. Singh — Founder" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <BookOpen className="h-3.5 w-3.5" /> Founder Story
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            A single room in 2009. A mission bigger than any wall.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mr. D.R. B.P. Singh started Sanjeevani Clinic Private Limited in Kirari with limited resources
            but a bigger vision — quality healthcare should never be a privilege for a few.
            15 years, 125+ countries and 70,000+ lives later, that mission has only grown.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/founder-story" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
              <BookOpen className="h-4 w-4" /> Read full story
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/20 bg-white px-6 text-sm font-semibold text-foreground">
              About the clinic
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeVisitBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="relative overflow-hidden rounded-[32px] border border-emerald-accent/20 bg-gradient-to-br from-emerald-accent/15 via-white to-primary/10 p-8 sm:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-accent/20 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-accent text-white shadow-glow">
            <HomeIcon className="h-8 w-8" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-accent">Home Visit Available</div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Healthcare at your doorstep — ₹700 only
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Trained therapists visit your home for physiotherapy, cupping, hijama, wax and
              massage therapy. Affordable, fast response and fully sterile equipment.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/book-appointment" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow">
              <Calendar className="h-4 w-4" /> Book Home Visit
            </Link>
            <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-emerald-accent/40 bg-white px-5 text-sm font-semibold text-emerald-accent">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function NeoreoSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-8 overflow-hidden rounded-[32px] border border-primary/10 bg-gradient-to-br from-primary/5 via-white to-emerald-accent/10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-accent/15 px-3 py-1 text-xs font-semibold text-emerald-accent">
            <Leaf className="h-3.5 w-3.5" /> NEOREO Healthcare
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Our own healthcare brand — trusted, affordable, quality assured.
          </h2>
          <p className="mt-4 text-muted-foreground">
            NEOREO is Sanjeevani Clinic Private Limited's in-house healthcare brand. Every product is
            developed with the same ethos we treat patients with — high quality, honest
            pricing and complete transparency. Because good health should never be a luxury.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[{ k: "100%", l: "Quality tested" }, { k: "Made in", l: "India" }, { k: "Fair", l: "Pricing" }].map((s) => (
              <div key={s.l} className="rounded-2xl border border-primary/10 bg-white p-4">
                <div className="font-display text-xl font-semibold text-foreground">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://www.sanjeevnionlineshop.com/" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-accent px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5">
              Visit Online Store <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/shop" className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/20 bg-white px-6 text-sm font-semibold text-foreground">
              Browse clinic shop
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-emerald-accent/25 to-primary/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-white shadow-glow">
            <img src={neoreoAsset.url} alt="NEOREO Healthcare product range" loading="lazy" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <ValueProps />
      <ServicesGrid />
      <HomeVisitBanner />
      <FounderPreview />
      <DoctorStrip />
      <NeoreoSection />
      <ProductSlider />
      <ReviewStrip />
      <CtaBanner />
    </SiteLayout>
  );
}
