import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
// Real clinic photos.
const clinicExterior = "/photos/clinic-exterior.jpg";
const doctorConsult = "/photos/doctor-consultation.jpg";
const doctorDesk = "/photos/doctor.jpg";
const doctorPortrait = "/photos/doctor-portrait.jpg";
const doctorAward = "/photos/doctor-award.jpg";
const team = "/photos/team.jpg";
const teamBack = "/photos/team-back.jpg";
const award1 = "/photos/award-1.jpg";
const award2 = "/photos/award-2.jpg";
const award3 = "/photos/award-3.jpg";
const awardPlaque = "/photos/award-plaque.jpg";
const awardCeremony = "/photos/award-ceremony.jpg";
const awardCeremony2 = "/photos/award-ceremony-2.jpg";
const healthCheckup1 = "/photos/health-checkup-1.jpg";
const healthCheckup2 = "/photos/health-checkup-2.jpg";
const healthCheckup3 = "/photos/health-checkup-3.jpg";
const healthCheckup4 = "/photos/health-checkup-4.jpg";
const healthCheckup5 = "/photos/health-checkup-5.jpg";
const family = "/photos/family.jpg";

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
  { src: clinicExterior, alt: "Sanjeevani Clinic — Kirari, Delhi" },
  { src: doctorConsult, alt: "Dr. Bhanu Pratap Singh in consultation" },
  { src: doctorDesk, alt: "Doctor's consultation room" },
  { src: healthCheckup1, alt: "Bal Deep Model School health check-up camp" },
  { src: award1, alt: "Sardar Patel Unity Award 2026" },
  { src: healthCheckup2, alt: "Community health check-up in progress" },
  { src: awardCeremony, alt: "Award ceremony — outstanding contribution to healthcare" },
  { src: healthCheckup3, alt: "Doctor examining a student at school camp" },
  { src: team, alt: "Sanjeevani Clinic team" },
  { src: awardPlaque, alt: "Honorary Doctorate Award" },
  { src: healthCheckup4, alt: "Health screening at Bal Deep Model School" },
  { src: teamBack, alt: "Clinic staff attending an event" },
  { src: award2, alt: "Sardar Patel Unity Award trophy" },
  { src: healthCheckup5, alt: "Health check-up camp banner" },
  { src: doctorPortrait, alt: "Dr. Bhanu Pratap Singh at the clinic" },
  { src: awardCeremony2, alt: "On-stage award ceremony" },
  { src: award3, alt: "Meghmani Lifesciences appreciation award" },
  { src: doctorAward, alt: "Doctor receiving recognition" },
  { src: family, alt: "Family gathering — clinic community" },
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
