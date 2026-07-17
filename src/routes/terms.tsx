import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CLINIC } from "@/data/clinic";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Sanjeevani Clinic Pvt. Ltd." },
      { name: "description", content: "Terms governing the use of Sanjeevani Clinic Pvt. Ltd.'s website and services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="Please read these terms carefully before using our website or services."
        crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed">
        <p>These terms are maintained by Sanjeevani Clinic Pvt. Ltd. and apply to visits to our website and to services provided at our clinic in Kirari, Delhi.</p>
        <h2>Use of the website</h2>
        <p>You agree to use this website only for lawful purposes and not to misuse any information or forms provided.</p>
        <h2>Appointments</h2>
        <p>Appointment requests submitted online are confirmed by our team. Timings may be adjusted based on doctor availability and clinical priorities.</p>
        <h2>Medical disclaimer</h2>
        <p>Content on this website is for general information only and does not replace professional medical advice. Please consult us for any personal medical decision.</p>
        <h2>Intellectual property</h2>
        <p>All content and design on this site are owned by Sanjeevani Clinic Pvt. Ltd.. Please do not reuse without written permission.</p>
        <h2>Contact</h2>
        <p>For questions about these terms, write to {CLINIC.email} or call {CLINIC.phone}.</p>
      </article>
    </SiteLayout>
  );
}
