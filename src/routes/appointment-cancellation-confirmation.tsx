import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/appointment-cancellation-confirmation")({
  component: CancellationConfirm,
  head: () => ({
    meta: [
      { title: "Cancellation Confirmed — Sanjeevani Clinic" },
      { name: "description", content: "We have confirmed the cancellation of your Sanjeevani Clinic appointment." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/appointment-cancellation-confirmation" },
    ],
    links: [{ rel: "canonical", href: "/appointment-cancellation-confirmation" }],
  }),
});

function CancellationConfirm() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Cancellation Confirmed" title="Your cancellation is confirmed." intro="A confirmation has been sent to your registered mobile number." crumbs={[{ label: "Home", to: "/" }, { label: "Cancellation Confirmed" }]} />
      <section className="mx-auto max-w-2xl px-4 pb-24 text-center sm:px-6">
        <p className="text-muted-foreground">
          If any payment was made, our team will process the refund according to our{" "}
          <Link to="/terms" className="text-primary underline">cancellation policy</Link>. For any questions please call{" "}
          <a href="tel:+917701986188" className="font-semibold text-primary">+91 77019 86188</a>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Rebook</Link>
          <Link to="/" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Back to Home</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
