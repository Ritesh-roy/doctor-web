import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import reception from "@/assets/facility-reception.jpg";
import lab from "@/assets/facility-lab.jpg";
import room from "@/assets/gallery-room.jpg";
import equipment from "@/assets/gallery-equipment.jpg";
import waiting from "@/assets/gallery-waiting.jpg";
import galleryReception from "@/assets/gallery-reception.jpg";
import physio from "@/assets/service-physio.jpg";
import radiology from "@/assets/service-radiology.jpg";
import eye from "@/assets/service-eye.jpg";
import checkup from "@/assets/service-checkup.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — Sanjeevani Clinic, Kirari, Delhi" },
      { name: "description", content: "A look inside Sanjeevani Clinic — our rooms, team and treatments." },
      { property: "og:title", content: "Gallery — Sanjeevani Clinic" },
      { property: "og:description", content: "A look inside our clinic." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

const items = [
  { src: reception, alt: "Reception" },
  { src: room, alt: "Consultation room" },
  { src: lab, alt: "Pathology lab" },
  { src: physio, alt: "Physiotherapy session" },
  { src: equipment, alt: "Medical equipment" },
  { src: radiology, alt: "Radiology suite" },
  { src: waiting, alt: "Waiting lounge" },
  { src: eye, alt: "Eye check-up" },
  { src: checkup, alt: "Preventive check-up" },
  { src: galleryReception, alt: "Front desk" },
];

function Gallery() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title="A look inside Sanjeevani Clinic."
        intro="Take a walk through our spaces — the rooms, equipment and moments that shape everyday care."
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((it, i) => (
            <figure key={i} className="break-inside-avoid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card">
              <img src={it.src} alt={it.alt} loading="lazy" className="w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
