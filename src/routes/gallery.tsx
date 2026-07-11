import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — Sanjeevani Clinic, Kirari, Delhi" },
      { name: "description", content: "A look inside Sanjeevani Clinic — our rooms, team, treatments, camps and awards." },
      { property: "og:title", content: "Gallery — Sanjeevani Clinic" },
      { property: "og:description", content: "A look inside our clinic." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: "Clinic" | "Doctor" | "Team" | "Awards" | "Camps" | "Community";
  description: string;
  location?: string;
  date?: string;
};

const items: GalleryItem[] = [
  {
    src: "/photos/clinic-exterior.jpg",
    alt: "Sanjeevani Clinic exterior",
    title: "Our Clinic in Kirari",
    category: "Clinic",
    description:
      "Sanjeevani Clinic on Karan Vihar Road — the trusted neighbourhood healthcare address for families across Kirari, Delhi since 2009.",
    location: "Karan Vihar, Kirari, Delhi",
  },
  {
    src: "/photos/doctor-consultation.jpg",
    alt: "Dr. Bhanu Pratap Singh in consultation",
    title: "Doctor in Consultation",
    category: "Doctor",
    description:
      "Unhurried one-on-one consultations with Dr. Bhanu Pratap Singh — where every patient is heard before a single prescription is written.",
  },
  {
    src: "/photos/doctor.jpg",
    alt: "Doctor's consultation room",
    title: "Consultation Room",
    category: "Clinic",
    description: "Calm, clean and private — designed so families can talk about their health without hesitation.",
  },
  {
    src: "/photos/health-checkup-1.jpg",
    alt: "Bal Deep Model School health check-up",
    title: "School Health Check-up Camp",
    category: "Camps",
    description: "Free full health check-up camp for students at Bal Deep Model School as part of our community outreach.",
    location: "Bal Deep Model School",
  },
  {
    src: "/photos/award-1.jpg",
    alt: "Sardar Patel Unity Award 2026",
    title: "Sardar Patel Unity Award 2026",
    category: "Awards",
    description: "Recognised with the Sardar Patel Unity Award for consistent contribution to community healthcare.",
    date: "2026",
  },
  {
    src: "/photos/health-checkup-2.jpg",
    alt: "Community health check-up in progress",
    title: "Community Health Check-up",
    category: "Camps",
    description: "Screening blood pressure, sugar and vision for community members — completely free of cost.",
  },
  {
    src: "/photos/award-ceremony.jpg",
    alt: "Award ceremony",
    title: "Outstanding Contribution to Healthcare",
    category: "Awards",
    description: "Honoured at a state-level ceremony for outstanding contribution to accessible neighbourhood healthcare.",
  },
  {
    src: "/photos/health-checkup-3.jpg",
    alt: "Doctor examining a student",
    title: "Student Screening",
    category: "Camps",
    description: "General physical examination for students — early detection saves years of trouble later.",
  },
  {
    src: "/photos/team.jpg",
    alt: "Sanjeevani Clinic team",
    title: "The Sanjeevani Team",
    category: "Team",
    description: "Our doctors, nurses, phlebotomists and therapists — the people who make Sanjeevani feel like family.",
  },
  {
    src: "/photos/award-plaque.jpg",
    alt: "Honorary Doctorate Award",
    title: "Honorary Doctorate",
    category: "Awards",
    description: "An honorary doctorate awarded for years of service in community medicine and health education.",
  },
  {
    src: "/photos/health-checkup-4.jpg",
    alt: "Health screening at Bal Deep Model School",
    title: "School Screening Drive",
    category: "Camps",
    description: "A day-long screening drive covering hundreds of children in a single visit.",
    location: "Bal Deep Model School",
  },
  {
    src: "/photos/team-back.jpg",
    alt: "Clinic staff at an event",
    title: "Team at a Community Event",
    category: "Team",
    description: "Our team attending a community health event alongside partner organisations.",
  },
  {
    src: "/photos/award-2.jpg",
    alt: "Sardar Patel Unity Award trophy",
    title: "Unity Award Trophy",
    category: "Awards",
    description: "The Sardar Patel Unity Award trophy — a reminder of why we do this work.",
  },
  {
    src: "/photos/health-checkup-5.jpg",
    alt: "Health check-up camp banner",
    title: "Free Health Check-up Camp",
    category: "Camps",
    description: "Camp banner from a free health check-up event — announced door-to-door in the neighbourhood.",
  },
  {
    src: "/photos/doctor-portrait.jpg",
    alt: "Dr. Bhanu Pratap Singh",
    title: "Dr. Bhanu Pratap Singh",
    category: "Doctor",
    description: "Founder and lead physician at Sanjeevani Clinic — 15+ years of family-medicine experience.",
  },
  {
    src: "/photos/award-ceremony-2.jpg",
    alt: "On-stage award ceremony",
    title: "On-stage Recognition",
    category: "Awards",
    description: "Accepting recognition on stage at a healthcare summit for community medicine work.",
  },
  {
    src: "/photos/award-3.jpg",
    alt: "Meghmani Lifesciences appreciation award",
    title: "Meghmani Lifesciences Appreciation",
    category: "Awards",
    description: "Appreciation from Meghmani Lifesciences for continued dedication to patient care.",
  },
  {
    src: "/photos/doctor-award.jpg",
    alt: "Doctor receiving recognition",
    title: "Recognition Moment",
    category: "Awards",
    description: "A quiet moment of pride at receiving formal recognition for years of service.",
  },
  {
    src: "/photos/family.jpg",
    alt: "Family gathering",
    title: "Our Extended Family",
    category: "Community",
    description: "Patients, well-wishers and family — the community that has grown around Sanjeevani over 15 years.",
  },
];

const CATS = ["All", "Clinic", "Doctor", "Team", "Awards", "Camps", "Community"] as const;

function Gallery() {
  const [filter, setFilter] = useState<(typeof CATS)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const shown = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title="A look inside Sanjeevani Clinic."
        intro="Walk through our clinic, meet our team and see the community camps and awards that shape our everyday care. Click any photo to read the story behind it."
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-soft ${
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary/20 bg-white text-foreground hover:bg-primary-soft/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {shown.map((it, i) => (
            <button
              key={i}
              onClick={() => setActive(it)}
              className="group block w-full break-inside-avoid overflow-hidden rounded-3xl border border-primary/10 bg-white text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <figure className="relative">
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">{it.category}</div>
                  <div className="mt-0.5 font-display text-lg font-semibold">{it.title}</div>
                </figcaption>
              </figure>
            </button>
          ))}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-foreground/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-glow md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-foreground shadow-soft transition-all hover:bg-white hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="bg-primary-soft/30">
              <img src={active.src} alt={active.alt} className="h-full max-h-[70vh] w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">{active.category}</div>
              <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{active.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{active.description}</p>
              <div className="mt-2 space-y-1.5 text-sm">
                {active.location && (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <MapPin className="h-4 w-4 text-primary" /> {active.location}
                  </div>
                )}
                {active.date && (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Calendar className="h-4 w-4 text-primary" /> {active.date}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <CtaBanner />
    </SiteLayout>
  );
}
