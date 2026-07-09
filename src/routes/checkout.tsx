import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Sanjeevani Clinic" },
      { name: "description", content: "Complete your Sanjeevani Clinic booking or pharmacy order securely." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
});

function Checkout() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Checkout" title="Complete your booking" intro="Confirm your details and preferred slot to finish your appointment." crumbs={[{ label: "Home", to: "/" }, { label: "Checkout" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-card">
          <h2 className="font-display text-2xl text-foreground">Online checkout is being set up</h2>
          <p className="mt-2 text-sm text-muted-foreground">Please book directly through our appointment form or on WhatsApp for now.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Book Appointment</Link>
            <a href="https://wa.me/918853515351" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
