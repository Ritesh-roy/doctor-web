import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Calendar,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Stethoscope,
  Activity,
  Eye,
  Microscope,
  HeartPulse,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  Building2,
  Wallet,
  Smile,
  Ambulance,
  BadgeCheck,
  ArrowUp,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

import doctorAsset from "@/assets/doctor-hero.asset.json";
import servicePhysio from "@/assets/service-physio.jpg";
import serviceDiagnostic from "@/assets/service-diagnostic.jpg";
import serviceRadiology from "@/assets/service-radiology.jpg";
import serviceEye from "@/assets/service-eye.jpg";
import serviceGeneral from "@/assets/service-general.jpg";
import serviceCheckup from "@/assets/service-checkup.jpg";
import galleryReception from "@/assets/gallery-reception.jpg";
import galleryRoom from "@/assets/gallery-room.jpg";
import galleryWaiting from "@/assets/gallery-waiting.jpg";
import galleryEquipment from "@/assets/gallery-equipment.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const PHONE = "+91 88535 15351";
const PHONE_TEL = "+918853515351";
const WHATSAPP = "https://wa.me/918853515351";
const EMAIL = "care@sanjeevaniclinic.icu";
const MAP_URL = "https://maps.app.goo.gl/KPGuNdS1Pjr9fmt89";
const ADDRESS =
  "ADD-B, 327a, Karan Vihar Rd, Karan Vihar Phase I, Kirari, Delhi 110086";
const HOURS = "Mon–Sun · 9:00 AM – 1:00 PM  &  5:00 PM – 9:00 PM";

/* ---------- shared bits ---------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => spring.on("change", (v) => setVal(Math.round(v))), [spring]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {(eyebrow || title || intro) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-5 text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- top bar + header ---------- */

function TopBar() {
  return (
    <div className="hidden border-b border-primary/10 bg-primary text-primary-foreground lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
        <div className="flex items-center gap-6 opacity-90">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:opacity-100">
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:opacity-100">
            <Mail className="h-3.5 w-3.5" /> {EMAIL}
          </a>
          <span className="hidden items-center gap-2 xl:flex">
            <Clock className="h-3.5 w-3.5" /> {HOURS}
          </span>
        </div>
        <div className="flex items-center gap-5 opacity-90">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current text-emerald-accent" />
            <span className="font-semibold">4.9</span> Google Rating
          </span>
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 rounded-full bg-emerald-accent/90 px-3 py-1 font-semibold text-primary-foreground">
            <Ambulance className="h-3.5 w-3.5" /> Emergency 24×7
          </a>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Doctor", href: "#doctor" },
  { label: "Journey", href: "#journey" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-card shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <HeartPulse className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-foreground">
              Sanjeevani
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Clinic · Delhi
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-primary-soft/60 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden items-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-sm font-medium text-foreground md:inline-flex"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button
            onClick={onBook}
            className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Book Appointment <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-primary/15 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="glass-card border-t border-primary/10 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-primary-soft/60"
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="mt-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- HERO ---------- */

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden aurora-bg">
      <div className="absolute inset-0 grid-fade opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-24 lg:pb-32">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-accent" />
            Now accepting new patients · Kirari, Delhi
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[76px]">
            Trusted Healthcare<br />
            for You &amp; Your <span className="text-gradient">Family.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            For over 15 years, Sanjeevani Clinic has cared for families across
            Delhi with warm, expert medicine — from everyday consultations to
            physiotherapy, diagnostics and eye care, all under one roof.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={onBook}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur hover:bg-white"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-accent/40 bg-emerald-accent/10 px-6 py-3.5 text-sm font-semibold text-emerald-accent hover:bg-emerald-accent/15"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          {/* stats */}
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: 4.9, s: "★", label: "Google Rating", fmt: (n: number) => n.toFixed(1) },
              { v: 15, s: "+", label: "Years of Care" },
              { v: 25000, s: "+", label: "Happy Patients" },
              { v: 20, s: "+", label: "Expert Services" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-primary/10 bg-white/60 p-4 backdrop-blur"
              >
                <div className="font-display text-2xl font-semibold text-foreground">
                  {k.fmt ? (
                    <>
                      {k.fmt(k.v)}
                      <span className="ml-0.5 text-emerald-accent">{k.s}</span>
                    </>
                  ) : (
                    <>
                      <Counter to={k.v} />
                      <span className="text-emerald-accent">{k.s}</span>
                    </>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{k.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* right — doctor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* soft blobs */}
            <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-primary/25 via-sky/40 to-emerald-accent/20 blur-2xl" />
            <div className="absolute inset-0 overflow-hidden rounded-[40px] border border-white/60 bg-white shadow-glow">
              <img
                src={doctorAsset.url}
                alt="Dr. B.P. Singh — Sanjeevani Clinic"
                width={900}
                height={1125}
                className="h-full w-full object-cover"
              />
            </div>

            {/* floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass-card absolute -left-6 top-10 flex items-center gap-3 rounded-2xl p-3 shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-accent/15 text-emerald-accent">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">MBBS · MD</div>
                <div className="text-xs text-muted-foreground">15+ yrs experience</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="glass-card absolute -right-4 bottom-24 flex items-center gap-3 rounded-2xl p-3 shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <Star className="h-5 w-5 fill-current" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">4.9 / 5.0</div>
                <div className="text-xs text-muted-foreground">Google Reviews</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity }}
              className="glass-card absolute -bottom-4 left-8 flex items-center gap-3 rounded-2xl p-3 shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <HeartPulse className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  <Counter to={25000} />+ lives
                </div>
                <div className="text-xs text-muted-foreground">cared for</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */

function About() {
  return (
    <Section
      id="about"
      eyebrow="About the clinic"
      title="Family medicine, delivered with warmth and precision."
      intro="Sanjeevani Clinic is a neighbourhood healthcare home in Karan Vihar, Kirari — built on the belief that ‘Sehat hi asli sampatti hai’. Health is your true wealth."
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/20 to-emerald-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-glow">
            <img
              src={doctorAsset.url}
              alt="Dr. B.P. Singh at Sanjeevani Clinic"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="glass-card absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-emerald-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm text-foreground">
              “Trusted by thousands of families across Delhi.”
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg leading-relaxed text-foreground/85">
            For the last <strong>15 years</strong>, Dr. B.P. Singh and the
            Sanjeevani team have quietly become one of the most trusted medical
            addresses in the Kirari neighbourhood. From newborn check‑ups to
            long‑term care for elders, we treat every visit like it matters —
            because it does.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: HeartPulse,
                title: "Our Mission",
                text: "Provide accessible, high‑quality healthcare so every family in Delhi feels genuinely cared for.",
              },
              {
                icon: Sparkles,
                title: "Our Vision",
                text: "A neighbourhood where prevention, kindness and modern medicine walk hand in hand.",
              },
              {
                icon: ShieldCheck,
                title: "Our Values",
                text: "Honesty in diagnosis, transparency in pricing, and empathy in every consultation.",
              },
              {
                icon: Award,
                title: "Why Choose Us",
                text: "Experienced doctor, modern diagnostics, comfortable spaces and same‑day appointments.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-primary/10 bg-card p-5 transition-transform hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 font-semibold text-foreground">{b.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl border border-primary/10 bg-primary-soft/40 p-6">
            {[
              { n: 15, s: "+", l: "Years of Care" },
              { n: 25000, s: "+", l: "Patients Served" },
              { n: 20, s: "+", l: "Services" },
            ].map((k) => (
              <div key={k.l} className="text-center">
                <div className="font-display text-3xl font-semibold text-primary">
                  <Counter to={k.n} suffix={k.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {k.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- SERVICES ---------- */

const SERVICES = [
  {
    title: "Physiotherapy",
    desc: "Personalised rehabilitation for back pain, joint recovery, sports injuries and post‑op mobility.",
    img: servicePhysio,
    Icon: Activity,
  },
  {
    title: "Diagnostic Services",
    desc: "In‑house pathology & blood work with rapid, accurate reports you can trust.",
    img: serviceDiagnostic,
    Icon: Microscope,
  },
  {
    title: "Radiology & Imaging",
    desc: "Modern ultrasound, X‑ray and CT scan facilities for precise, timely diagnosis.",
    img: serviceRadiology,
    Icon: Sparkles,
  },
  {
    title: "Eye Check‑up",
    desc: "Comprehensive vision assessments and eye care for children and adults.",
    img: serviceEye,
    Icon: Eye,
  },
  {
    title: "General Medicine",
    desc: "Everyday consultations, fever, infections, lifestyle diseases and family health.",
    img: serviceGeneral,
    Icon: Stethoscope,
  },
  {
    title: "Full Body Check‑up",
    desc: "Preventive health packages designed for early detection and long‑term wellness.",
    img: serviceCheckup,
    Icon: HeartPulse,
  },
];

function Services() {
  return (
    <Section
      id="services"
      eyebrow="Medical services"
      title="Complete care, under one roof."
      intro="From routine consultations to advanced diagnostics — every service is delivered with hospital‑grade standards and neighbourhood‑clinic warmth."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
              <span className="glass-card absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl text-primary">
                <s.Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Read more <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- WHY CHOOSE US ---------- */

const WHY = [
  { Icon: Award, title: "Experienced Doctor", text: "15+ years of trusted clinical experience." },
  { Icon: Microscope, title: "Modern Equipment", text: "Latest diagnostic and imaging technology." },
  { Icon: Wallet, title: "Affordable Care", text: "Transparent, honest pricing for every family." },
  { Icon: ShieldCheck, title: "Trusted Clinic", text: "Highly rated across Google and word of mouth." },
  { Icon: Calendar, title: "Easy Appointment", text: "Book online, on call or WhatsApp in seconds." },
  { Icon: Sparkles, title: "Clean Environment", text: "Sanitised rooms, comfortable waiting area." },
  { Icon: Ambulance, title: "Emergency Support", text: "Rapid response for urgent medical needs." },
  { Icon: Smile, title: "Patient Satisfaction", text: "Thousands of happy families across Delhi." },
];

function WhyUs() {
  return (
    <Section
      eyebrow="Why choose us"
      title="Reasons families keep coming back."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-soft/60 blur-2xl transition-opacity group-hover:opacity-100" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <w.Icon className="h-5 w-5" />
            </span>
            <div className="relative mt-4 font-semibold text-foreground">{w.title}</div>
            <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {w.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- DOCTOR ---------- */

function Doctor({ onBook }: { onBook: () => void }) {
  return (
    <Section id="doctor" eyebrow="Meet the doctor" title="Dr. B.P. Singh">
      <div className="grid gap-10 rounded-[36px] border border-primary/10 bg-gradient-to-br from-primary-soft/60 via-white to-white p-6 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-primary/25 to-emerald-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-glow">
            <img
              src={doctorAsset.url}
              alt="Dr. B.P. Singh"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              MBBS, MD
            </span>
            <span className="rounded-full bg-emerald-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-accent">
              General Physician
            </span>
          </div>
          <h3 className="mt-4 font-display text-4xl font-semibold text-foreground">
            Dr. B.P. Singh
          </h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Founder & Chief Consulting Physician, Sanjeevani Clinic
          </p>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            With over 15 years of clinical practice, Dr. B.P. Singh has built
            Sanjeevani Clinic on one simple promise — honest medicine, delivered
            with time and empathy. His practice spans general medicine,
            preventive care, chronic disease management and family health.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Award, t: "Specialisation", d: "General Medicine · Family Care" },
              { icon: Users, t: "Patients Treated", d: "25,000+ across Delhi NCR" },
              { icon: BadgeCheck, t: "Experience", d: "15+ years of trusted practice" },
              { icon: Clock, t: "Consultation Timings", d: "9:00 AM – 1:00 PM · 5:00 – 9:00 PM" },
            ].map((r) => (
              <div key={r.t} className="flex gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <r.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {r.t}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-foreground">
                    {r.d}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onBook}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </button>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-foreground"
            >
              <Phone className="h-4 w-4" /> Call the Doctor
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- JOURNEY ---------- */

const JOURNEY = [
  { title: "Book Appointment", text: "Choose a time via web, phone or WhatsApp in seconds.", Icon: Calendar },
  { title: "Visit the Clinic", text: "Walk into a calm, sanitised space — no long queues.", Icon: Building2 },
  { title: "Diagnosis", text: "Detailed consultation with in‑house diagnostic support.", Icon: Stethoscope },
  { title: "Treatment", text: "A personalised care plan explained in your own language.", Icon: HeartPulse },
  { title: "Recovery", text: "Physiotherapy and guided recovery whenever needed.", Icon: Activity },
  { title: "Follow‑up", text: "We stay in touch until you’re back to feeling like you.", Icon: Smile },
];

function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Patient journey"
      title="A calm, guided experience — every step of the way."
    >
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 lg:block" />
        <ol className="space-y-8 lg:space-y-14">
          {JOURNEY.map((j, i) => (
            <motion.li
              key={j.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className={`relative grid gap-6 lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className={`lg:${i % 2 === 1 ? "pl-16" : "pr-16"}`}>
                <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <j.Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                    {j.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {j.text}
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/20 bg-white text-lg font-semibold text-primary shadow-card">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- TESTIMONIALS ---------- */

const REVIEWS = [
  {
    name: "Rohit Sharma",
    role: "Karan Vihar, Delhi",
    text: "Dr. Singh gave us so much time and explained everything clearly. My father’s BP is finally under control. Highly recommend Sanjeevani Clinic.",
  },
  {
    name: "Priya Verma",
    role: "Kirari, Delhi",
    text: "Very clean clinic and honest doctor. Got my full body check‑up done at a very reasonable price and the reports came the same evening.",
  },
  {
    name: "Amit Kumar",
    role: "Nithari, Delhi",
    text: "The physiotherapy sessions helped me recover from a back injury in a few weeks. Staff is polite and the space feels calm.",
  },
  {
    name: "Sneha Gupta",
    role: "Sultanpuri, Delhi",
    text: "Booked on WhatsApp, got an appointment within an hour. Doctor was patient with my little one during the eye check‑up. 5 stars!",
  },
  {
    name: "Anil Yadav",
    role: "Mubarakpur, Delhi",
    text: "Trusted our family with Sanjeevani for 6+ years now. Feels like a family doctor, not a hospital. Reliable and affordable.",
  },
  {
    name: "Neha Singh",
    role: "Karan Vihar, Delhi",
    text: "Everything under one roof — consult, lab, X‑ray. Saved us hours of running around. Genuinely premium experience at a local clinic.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <Section
      id="testimonials"
      eyebrow="Patient stories"
      title="Loved by families across Delhi."
      intro="A snapshot of what our patients say — from Google reviews and word of mouth."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* main slider */}
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] border border-primary/10 bg-gradient-to-br from-primary/90 to-primary/70 p-10 text-primary-foreground shadow-glow"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="flex items-center gap-1.5 text-emerald-accent">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="relative mt-6 font-display text-2xl leading-snug sm:text-3xl">
            “{REVIEWS[i].text}”
          </p>
          <div className="relative mt-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 font-semibold text-primary-foreground">
              {REVIEWS[i].name.charAt(0)}
            </span>
            <div>
              <div className="font-semibold">{REVIEWS[i].name}</div>
              <div className="text-sm opacity-80">{REVIEWS[i].role}</div>
            </div>
          </div>
          <div className="relative mt-8 flex gap-1.5">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Review ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-8 bg-white" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* stack */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {REVIEWS.slice(0, 3).map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-primary/10 bg-card p-5 shadow-card"
            >
              <div className="flex items-center gap-1 text-emerald-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                “{r.text}”
              </p>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {r.name} · {r.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- GALLERY ---------- */

function Gallery() {
  const items = [
    { src: galleryReception, span: "sm:col-span-2 sm:row-span-2", alt: "Clinic reception" },
    { src: galleryEquipment, span: "", alt: "Medical equipment" },
    { src: galleryRoom, span: "sm:row-span-2", alt: "Consultation room" },
    { src: servicePhysio, span: "", alt: "Physiotherapy" },
    { src: galleryWaiting, span: "sm:col-span-2", alt: "Waiting area" },
    { src: serviceEye, span: "", alt: "Eye check-up" },
    { src: serviceDiagnostic, span: "", alt: "Diagnostics" },
  ];
  return (
    <Section
      id="gallery"
      eyebrow="Inside the clinic"
      title="A calm, modern space designed for your comfort."
    >
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`group relative overflow-hidden rounded-2xl border border-primary/10 shadow-card ${it.span}`}
          >
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {it.alt}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "Where is Sanjeevani Clinic located?",
    a: "We are at ADD-B, 327a, Karan Vihar Rd, Karan Vihar Phase I, Kirari, Delhi 110086 — easily accessible from Nithari, Mubarakpur, Sultanpuri and Rohini.",
  },
  {
    q: "What are the clinic timings?",
    a: "The clinic is open every day from 9:00 AM to 1:00 PM and again from 5:00 PM to 9:00 PM. Emergency support is available on call.",
  },
  {
    q: "How can I book an appointment?",
    a: "You can book online via the appointment form, call +91 88535 15351, or message us on WhatsApp. Same‑day slots are usually available.",
  },
  {
    q: "Who is the consulting doctor?",
    a: "Dr. B.P. Singh, our founder and Chief Consulting Physician, has over 15 years of experience in general medicine and family care.",
  },
  {
    q: "What services are offered?",
    a: "General medicine, physiotherapy, diagnostics/pathology, radiology & imaging, eye check‑up and preventive full‑body check‑up packages.",
  },
  {
    q: "Do you provide emergency care?",
    a: "Yes — we offer emergency support during and beyond clinic hours. Please call +91 88535 15351 for urgent medical needs.",
  },
  {
    q: "Are the consultation charges affordable?",
    a: "Absolutely. Sanjeevani Clinic is built on transparent, honest pricing so quality healthcare stays within reach for every family.",
  },
];

function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="faqs"
      eyebrow="Questions, answered"
      title="Frequently asked questions."
    >
      <div className="mx-auto max-w-3xl">
        {FAQS.map((f, i) => {
          const active = i === open;
          return (
            <div
              key={f.q}
              className="mb-3 overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-card"
            >
              <button
                onClick={() => setOpen(active ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-base font-semibold text-foreground">
                  {f.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                    active ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- CONTACT + FORM ---------- */

function Contact({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Section
      id="contact"
      eyebrow="Visit or book online"
      title="Let’s take care of your health."
    >
      <div ref={formRef} className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {[
            { Icon: Phone, t: "Phone", d: PHONE, href: `tel:${PHONE_TEL}` },
            { Icon: MessageCircle, t: "WhatsApp", d: "Chat with our team", href: WHATSAPP },
            { Icon: Mail, t: "Email", d: EMAIL, href: `mailto:${EMAIL}` },
            { Icon: MapPin, t: "Address", d: ADDRESS, href: MAP_URL },
            { Icon: Clock, t: "Timings", d: HOURS },
            { Icon: Ambulance, t: "Emergency", d: "24×7 on call · " + PHONE, href: `tel:${PHONE_TEL}` },
          ].map((c) => (
            <a
              key={c.t}
              href={c.href}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.t}
                </div>
                <div className="mt-0.5 truncate font-semibold text-foreground">
                  {c.d}
                </div>
              </div>
            </a>
          ))}
          <div className="overflow-hidden rounded-2xl border border-primary/10 shadow-card">
            <iframe
              title="Sanjeevani Clinic Map"
              src="https://www.google.com/maps?q=Karan+Vihar+Phase+I,+Kirari,+Delhi+110086&output=embed"
              width="100%"
              height="260"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>

        <AppointmentForm />
      </div>
    </Section>
  );
}

function AppointmentForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[28px] border border-primary/10 bg-gradient-to-br from-white to-primary-soft/40 p-6 shadow-glow sm:p-8"
    >
      <h3 className="font-display text-2xl font-semibold text-foreground">
        Book an appointment
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in your details and we’ll confirm your slot on WhatsApp.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" placeholder="Your name" />
        <Field label="Phone" placeholder="+91 …" type="tel" />
        <Field label="Email" placeholder="you@email.com" type="email" />
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Service
          </label>
          <select className="h-11 w-full rounded-xl border border-primary/15 bg-white px-3 text-sm text-foreground focus:border-primary focus:outline-none">
            {SERVICES.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preferred time
          </label>
          <select className="h-11 w-full rounded-xl border border-primary/15 bg-white px-3 text-sm text-foreground focus:border-primary focus:outline-none">
            {["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <Field label="Preferred date" type="date" />
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Message
          </label>
          <textarea
            rows={3}
            placeholder="Tell us briefly what you'd like to discuss…"
            className="w-full rounded-xl border border-primary/15 bg-white px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
      >
        <Calendar className="h-4 w-4" />
        {sent ? "Request sent — we’ll call you back" : "Request appointment"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We usually respond within 15 minutes during clinic hours.
      </p>
    </form>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        {...rest}
        className="h-11 w-full rounded-xl border border-primary/15 bg-white px-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(600px_300px_at_20%_0%,color-mix(in_oklab,var(--primary)_45%,transparent),transparent),radial-gradient(600px_300px_at_80%_100%,color-mix(in_oklab,var(--emerald-accent)_35%,transparent),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-xl font-semibold">Sanjeevani Clinic</div>
              <div className="text-xs uppercase tracking-[0.22em] text-background/60">
                Delhi · since 2010
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-background/70">
            Sehat hi asli sampatti hai. For 15+ years we’ve cared for families
            across Delhi with honest, affordable medicine and modern diagnostic
            care — all under one roof.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-background/20 text-background/80 hover:bg-background hover:text-foreground"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-background/80">
            Quick Links
          </div>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-background">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-background/80">
            Contact
          </div>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{ADDRESS}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{PHONE}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{EMAIL}</li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />{HOURS}</li>
          </ul>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-background hover:opacity-80"
          >
            Open in Google Maps <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="relative border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-background/60">
          <div>© {new Date().getFullYear()} Sanjeevani Clinic. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-background">Privacy Policy</a>
            <a href="#" className="hover:text-background">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating actions + popup ---------- */

function FloatingActions({ onBook }: { onBook: () => void }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 bg-white text-primary shadow-card hover:-translate-y-0.5 transition-transform"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label="Call"
        className="grid h-13 w-13 place-items-center rounded-full bg-primary p-3 text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-13 w-13 place-items-center rounded-full bg-emerald-accent p-3 text-white shadow-glow hover:-translate-y-0.5 transition-transform"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <button
        onClick={onBook}
        className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-glow sm:inline-flex"
      >
        <Calendar className="h-4 w-4" /> Book
      </button>
    </div>
  );
}

function AppointmentPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[28px] border border-white/60 bg-white p-6 shadow-glow animate-scale-in sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Calendar className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Book an appointment
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              We’ll confirm on WhatsApp within minutes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary/15 text-foreground/70 hover:bg-primary-soft/60"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          <Field label="Full name" placeholder="Your name" />
          <Field label="Phone" placeholder="+91 …" type="tel" />
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Service
            </label>
            <select className="h-11 w-full rounded-xl border border-primary/15 bg-white px-3 text-sm text-foreground focus:border-primary focus:outline-none">
              {SERVICES.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <button
            onClick={onClose}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Request appointment
          </button>
          <div className="mt-1 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            or
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-accent px-4 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */

function Home() {
  const [popup, setPopup] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const openBook = () => {
    setPopup(true);
  };

  // auto popup after 20s (once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sanj_popup")) return;
    const t = setTimeout(() => {
      setPopup(true);
      sessionStorage.setItem("sanj_popup", "1");
    }, 20000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Header onBook={openBook} />
      <main>
        <Hero onBook={openBook} />
        <About />
        <Services />
        <WhyUs />
        <Doctor onBook={openBook} />
        <Journey />
        <Testimonials />
        <Gallery />
        <Faqs />
        <Contact formRef={formRef} />
      </main>
      <Footer />
      <FloatingActions onBook={openBook} />
      <AppointmentPopup open={popup} onClose={() => setPopup(false)} />
    </div>
  );
}
