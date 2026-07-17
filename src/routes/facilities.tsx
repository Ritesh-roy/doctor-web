import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
const reception = "/photos/clinic-front.jpg";
const lab = "/photos/school-checkup-desk.jpg";
const room = "/photos/doctor-desk-3.jpg";
const equipment = "/photos/doctor-desk-4.jpg";

import { Wifi, ShieldCheck, Accessibility, ParkingCircle, Stethoscope, Microscope, Building2 } from "lucide-react";

export const Route = createFileRoute("/facilities")({
  component: Facilities,
  head: () => ({
    meta: [
      { title: "Our Facilities — Sanjeevani Clinic, Kirari" },
      { name: "description", content: "Modern, clean, patient-friendly facilities: consultation rooms, in-house lab, physiotherapy bay and imaging support in Kirari, Delhi." },
      { property: "og:title", content: "Our Facilities — Sanjeevani Clinic" },
      { property: "og:description", content: "See the clinic that Kirari families trust." },
      { property: "og:url", content: "/facilities" },
    ],
    links: [{ rel: "canonical", href: "/facilities" }],
  }),
});

function Facilities() {
  const items = [
    { img: reception, title: "Welcoming reception", body: "A calm, spacious waiting area with plants, natural light and no crowding." },
    { img: room, title: "Private consultation rooms", body: "Quiet rooms where you can speak freely with the doctor without rush." },
    { img: lab, title: "In-house pathology lab", body: "Sample collection and processing on-site for faster, coordinated care." },
    { img: equipment, title: "Modern equipment", body: "Digital diagnostics, physiotherapy modalities and imaging support." },
  ];
  const perks = [
    { icon: ParkingCircle, t: "Easy street parking" },
    { icon: Accessibility, t: "Step-free access" },
    { icon: ShieldCheck, t: "Sanitised daily" },
    { icon: Wifi, t: "Free Wi-Fi" },
    { icon: Stethoscope, t: "Doctor-led OPD" },
    { icon: Microscope, t: "In-house lab" },
  ];
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Facilities"
        title="Modern medicine in a calm, welcoming space."
        intro="Every corner of Sanjeevani Clinic is designed for one thing — to help you feel cared for from the moment you walk in."
        crumbs={[{ label: "Home", to: "/" }, { label: "Facilities" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((f) => (
            <div key={f.title} className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card">
              <img src={f.img} alt={f.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <div className="font-display text-xl font-semibold text-foreground">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-soft/40 to-white p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground sm:text-3xl">On-site perks</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {perks.map((p) => (
              <div key={p.t} className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-4">
                <p.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{p.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
