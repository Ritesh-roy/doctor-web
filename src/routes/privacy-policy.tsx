import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CLINIC } from "@/data/clinic";

export const Route = createFileRoute("/privacy-policy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sanjeevani Clinic Pvt. Ltd." },
      { name: "description", content: "How Sanjeevani Clinic Pvt. Ltd. collects, uses and protects your personal and medical information." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
});

function Privacy() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="Your trust matters to us. This page explains what information we collect and how we handle it."
        crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-muted-foreground">
        <p>
          This page is maintained by Sanjeevani Clinic Pvt. Ltd. to answer common privacy questions about how we handle your information when you visit our website or receive care at our clinic in Kirari, Delhi.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you share with us (name, phone, email).</li>
          <li>Clinical information you share during a consultation.</li>
          <li>Appointment requests submitted through our website or WhatsApp.</li>
        </ul>
        <h2>How we use your information</h2>
        <ul>
          <li>To provide medical care and follow-up.</li>
          <li>To confirm appointments and share reports.</li>
          <li>To improve the quality of our services.</li>
        </ul>
        <h2>How we protect your information</h2>
        <p>
          Access to your clinical records is restricted to authorised clinic staff. We do not sell or share your personal information with third parties for marketing purposes.
        </p>
        <h2>Your choices</h2>
        <p>
          You can request a copy of your records, ask us to correct them, or ask us to delete personal information we no longer need. Contact us at {CLINIC.email} for any such request.
        </p>
        <h2>Contact</h2>
        <p>For any privacy question, please write to us at {CLINIC.email} or call {CLINIC.phone}.</p>
      </article>
    </SiteLayout>
  );
}
