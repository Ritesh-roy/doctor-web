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
      { name: "description", content: "A look inside Sanjeevani Clinic — our clinic, doctor, team, community camps and awards." },
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
    src: "/photos/cupping-back-real.jpg",
    alt: "Real hijama / cupping therapy session at Sanjeevani Clinic",
    title: "Cupping Therapy — In Action",
    category: "Clinic",
    description:
      "A real cupping therapy session at Sanjeevani Clinic. Every cup is sterile, single-use and applied by a trained therapist — helpful for back pain, muscle tension and general detoxification.",
    location: "Sanjeevani Clinic · Karan Vihar",
  },
  {
    src: "/photos/massage-back-real.jpg",
    alt: "Deep-tissue back massage therapy at Sanjeevani Clinic",
    title: "Body Massage Therapy",
    category: "Clinic",
    description:
      "Therapeutic back and full-body oil massage — a blend of Swedish and deep-tissue techniques to relieve stress and muscular stiffness.",
  },
  {
    src: "/photos/paraffin-wax-hand.jpg",
    alt: "Paraffin wax therapy — hand dipped in warm therapeutic wax",
    title: "Paraffin Wax — Hand Therapy",
    category: "Clinic",
    description:
      "Warm paraffin wax immersion for arthritis, joint stiffness and dry skin — the wax is kept at a comfortable therapeutic temperature.",
  },
  {
    src: "/photos/paraffin-wax-foot.jpg",
    alt: "Paraffin wax therapy — foot dipped in warm therapeutic wax",
    title: "Paraffin Wax — Foot Therapy",
    category: "Clinic",
    description:
      "Foot paraffin wax therapy — excellent for foot arthritis, plantar fasciitis, dry heels and post-work fatigue.",
  },
  {
    src: "/photos/knee-pain-real.jpg",
    alt: "Knee pain physiotherapy assessment",
    title: "Knee Pain — Diagnosis & Care",
    category: "Clinic",
    description:
      "From assessment to treatment — the clinic offers Jaanu Vasti, TENS, I.F.T and structured physiotherapy programmes for chronic and acute knee pain.",
  },
  {
    src: "/photos/doctor-portrait-1.jpg",
    alt: "Dr. B.P. Singh at his consulting desk with anatomy charts",
    title: "The Original Consulting Room",
    category: "Doctor",
    description:
      "The original consulting room where thousands of Kirari families first met Dr. B.P. Singh — anatomy charts on the wall and a promise to always listen carefully.",
  },
  {
    src: "/photos/doctor-portrait-2.jpg",
    alt: "Dr. B.P. Singh in the modern consulting room",
    title: "The Modern Consulting Room",
    category: "Doctor",
    description:
      "Same doctor, same values — in the upgraded, brightly-lit consulting room of today's Sanjeevani Clinic.",
  },
  {
    src: "/photos/award-unity-desk.jpg",
    alt: "Sardar Patel Unity Award 2026 on the founder's desk",
    title: "Unity Award — On the Desk",
    category: "Awards",
    description:
      "The Sardar Patel Unity Award 2026 sits on the founder's desk — a quiet reminder of the responsibility that comes with 15 years of family trust.",
    date: "21 May 2026",
    location: "New Delhi",
  },
  {
    src: "/photos/clinic-front.jpg",
    alt: "Sanjeevani Clinic front entrance in Karan Vihar, Kirari",
    title: "Sanjeevani Clinic — Karan Vihar",
    category: "Clinic",
    description:
      "Our clinic on Karan Vihar Road — the trusted neighbourhood healthcare address for families across Kirari, Delhi. Open 9 AM – 1 PM and 5 PM – 9 PM, seven days a week.",
    location: "ADD-B, 327a, Karan Vihar Road, Kirari, Delhi 110086",
  },
  {
    src: "/photos/clinic-street-bw.jpg",
    alt: "Sanjeevani Clinic street view",
    title: "A familiar corner of Kirari",
    category: "Clinic",
    description:
      "You can spot the red Sanjeevani Clinic signboard from the top of Karan Vihar Road. A quiet, easy landmark for anyone walking in for the first time.",
    location: "Karan Vihar, Kirari",
  },
  {
    src: "/photos/doctor-desk-1.jpg",
    alt: "Dr. B.P. Singh at his consulting desk",
    title: "Dr. B.P. Singh — Consulting Room",
    category: "Doctor",
    description:
      "Unhurried one-on-one consultations. Every patient is heard before a single prescription is written. Behind the doctor are 15+ years of certificates, awards and continued-education proofs.",
  },
  {
    src: "/photos/doctor-desk-2.jpg",
    alt: "Doctor reviewing a patient chart",
    title: "Reviewing Reports Together",
    category: "Doctor",
    description:
      "Every blood report, ECG or scan is walked through with the patient — in Hindi, English or Bhojpuri — until the plan is clearly understood.",
  },
  {
    src: "/photos/doctor-desk-3.jpg",
    alt: "Doctor at work in the consulting room",
    title: "Behind the Desk",
    category: "Doctor",
    description:
      "A calm, brightly lit consulting room designed so families feel comfortable talking about their health without hesitation.",
  },
  {
    src: "/photos/doctor-desk-4.jpg",
    alt: "Doctor writing notes",
    title: "Clinical Notes",
    category: "Doctor",
    description:
      "Detailed clinical notes for every patient — because good follow-up starts with a good record.",
  },
  {
    src: "/photos/doctor-with-award.jpg",
    alt: "Dr. B.P. Singh holding an award plaque",
    title: "A Quiet Moment of Pride",
    category: "Doctor",
    description:
      "Dr. B.P. Singh with a recognition plaque from a national health foundation — awarded for consistent contribution to community medicine.",
  },
  {
    src: "/photos/team-selfie.jpg",
    alt: "Sanjeevani Clinic team selfie",
    title: "The Sanjeevani Team",
    category: "Team",
    description:
      "Our doctors, nurses, phlebotomists and therapists — the people who make Sanjeevani feel like family.",
  },
  {
    src: "/photos/team-back-blue.jpg",
    alt: "Sanjeevani team in blue uniform",
    title: "Uniform of Care",
    category: "Team",
    description:
      "The Sanjeevani blue — worn every day by the physiotherapy and OPD team.",
  },
  {
    src: "/photos/family-with-doctor.jpg",
    alt: "A family with Dr. B.P. Singh at a community event",
    title: "Family Medicine, Literally",
    category: "Community",
    description:
      "Many of our patients are second-generation — we now care for the children of the families we started with in 2009.",
  },
  {
    src: "/photos/award-unity-frame-1.jpg",
    alt: "Sardar Patel Unity Award 2026 frame",
    title: "Sardar Patel Unity Award — 2026",
    category: "Awards",
    description:
      "Awarded to Dr. Bhanu Pratap Singh (Director, Sanjeevani Clinic) for Outstanding Contribution to Healthcare Services.",
    date: "21 May 2026",
    location: "Shangri-La's Eros, New Delhi",
  },
  {
    src: "/photos/award-unity-frame-2.jpg",
    alt: "Sardar Patel Unity Award — framed close-up",
    title: "The Unity Award — Framed",
    category: "Awards",
    description:
      "A close-up of the framed Sardar Patel Unity Award 2026 citation.",
    date: "2026",
  },
  {
    src: "/photos/award-unity-side.jpg",
    alt: "Sardar Patel Unity Award frame side view",
    title: "The Unity Citation",
    category: "Awards",
    description:
      "The Unity Award citation on display at the clinic's certificate wall.",
  },
  {
    src: "/photos/award-trophy-black.jpg",
    alt: "Sardar Patel Unity Award trophy",
    title: "Unity Award Trophy",
    category: "Awards",
    description:
      "The obsidian-black Sardar Patel Unity Award trophy — a quiet reminder of why we do this work.",
    date: "2026",
  },
  {
    src: "/photos/award-stage-1.jpg",
    alt: "On-stage award ceremony",
    title: "On-stage Recognition",
    category: "Awards",
    description:
      "Accepting the Sardar Patel Unity Award on stage at a national healthcare summit.",
    location: "New Delhi",
  },
  {
    src: "/photos/award-stage-2.jpg",
    alt: "Award being handed over on stage",
    title: "Receiving the Citation",
    category: "Awards",
    description:
      "The citation being handed over on stage — dedicated to every family that has trusted Sanjeevani over the last 15 years.",
  },
  {
    src: "/photos/award-blood-donor.jpg",
    alt: "Blood Donor & Environment Protection award",
    title: "Blood Donor & Environment Protection Award",
    category: "Awards",
    description:
      "Recognition for continued participation in blood donation drives and environmental health awareness.",
  },
  {
    src: "/photos/award-meghmani.jpg",
    alt: "Meghmani Lifesciences appreciation plaque",
    title: "Meghmani Lifesciences Appreciation",
    category: "Awards",
    description:
      "\"You are a True Hero\" — an appreciation from Meghmani Lifesciences for continued dedication to patient care.",
  },
  {
    src: "/photos/school-checkup-doctor.jpg",
    alt: "Doctor examining a student at Bal Deep Model School",
    title: "Student Screening",
    category: "Camps",
    description:
      "A general physical examination for students during a free school health camp — early detection saves years of trouble later.",
    location: "Bal Deep Model School",
  },
  {
    src: "/photos/school-checkup-hall.jpg",
    alt: "Bal Deep Model School health check-up in the hall",
    title: "School Health Check-up Camp",
    category: "Camps",
    description:
      "A free full health check-up camp for students at Bal Deep Model School — part of our regular community outreach.",
    location: "Bal Deep Model School",
  },
  {
    src: "/photos/school-checkup-students.jpg",
    alt: "Students queued for check-up",
    title: "One School, One Day, Every Child",
    category: "Camps",
    description:
      "A day-long screening drive covering hundreds of children in a single visit.",
    location: "Bal Deep Model School",
  },
  {
    src: "/photos/school-checkup-lineup.jpg",
    alt: "Students in line for the health camp",
    title: "Line Up, Get Checked, Go Play",
    category: "Camps",
    description:
      "Vitals, vision and general examination — students are back in class or on the playground within minutes.",
    location: "Bal Deep Model School",
  },
  {
    src: "/photos/school-checkup-desk.jpg",
    alt: "Doctor consulting a student at a camp desk",
    title: "One Child at a Time",
    category: "Camps",
    description:
      "Every child gets a proper sit-down consultation, not just a rushed vitals check.",
    location: "Bal Deep Model School",
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
