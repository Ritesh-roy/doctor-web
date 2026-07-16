import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CLINIC } from "@/data/clinic";

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
  head: () => ({
    meta: [
      { title: "FAQs — Sanjeevani Clinic Pvt. Ltd., Kirari" },
      { name: "description", content: "Answers to the most common questions about appointments, timings, services and payments at Sanjeevani Clinic Pvt. Ltd.." },
      { property: "og:title", content: "FAQs — Sanjeevani Clinic Pvt. Ltd." },
      { property: "og:description", content: "Common questions, clearly answered." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const FAQS = [
  { q: "What are your clinic timings?", a: `${CLINIC.hours}. We are open all seven days.` },
  { q: "Do I need to book an appointment?", a: "Walk-ins are welcome, but booking ahead means shorter waiting. You can book via WhatsApp, phone or the online form." },
  { q: "Where is the clinic located?", a: `${CLINIC.address}. It is easy to find on Karan Vihar Road.` },
  { q: "Do you accept insurance?", a: "We accept cash, UPI and cards. For insurance/reimbursement, we provide detailed billing you can submit to your insurer." },
  { q: "Are consultations available for children?", a: "Yes, we care for patients of all ages, from infants to seniors." },
  { q: "Do you offer home sample collection?", a: "Yes, home collection is available for select lab tests in the neighbourhood. Please call to book." },
  { q: "Can I get my reports digitally?", a: "Yes, digital reports are shared via WhatsApp and email as soon as they are ready." },
  { q: "Is there an emergency contact number?", a: `Yes — call ${CLINIC.phone} anytime for urgent concerns.` },
];

function FAQsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help"
        title="Frequently asked questions."
        intro="Everything you need to know before your visit."
        crumbs={[{ label: "Home", to: "/" }, { label: "FAQs" }]}
      />
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Accordion type="single" collapsible>
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
