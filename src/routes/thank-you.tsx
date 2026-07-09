import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  component: ThankYou,
  head: () => ({
    meta: [
      { title: "Thank You — Sanjeevani Clinic" },
      { name: "description", content: "Thank you for contacting Sanjeevani Clinic. Our team will confirm your appointment shortly." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/thank-you" },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
});

function ThankYou() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Thank you" title="Your request has been received." intro="Our team will call you shortly to confirm your appointment." crumbs={[{ label: "Home", to: "/" }, { label: "Thank You" }]} />
      <section className="mx-auto max-w-2xl px-4 pb-24 text-center sm:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-accent/15 text-emerald-accent">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mt-6 text-muted-foreground">
          You will receive a confirmation on WhatsApp once your slot is assigned. For urgent needs, please call{" "}
          <a href="tel:+918853515351" className="font-semibold text-primary">+91 88535 15351</a>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Back to Home</Link>
          <Link to="/services" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Explore Services</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
