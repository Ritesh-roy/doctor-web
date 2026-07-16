import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/appointment-cancelled")({
  component: AppointmentCancelled,
  head: () => ({
    meta: [
      { title: "Appointment Cancelled — Sanjeevani Clinic Private Limited" },
      { name: "description", content: "Your Sanjeevani Clinic Private Limited appointment has been cancelled. You can rebook any time." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/appointment-cancelled" },
    ],
    links: [{ rel: "canonical", href: "/appointment-cancelled" }],
  }),
});

function AppointmentCancelled() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Appointment Cancelled" title="Your appointment has been cancelled." intro="No further action is needed. You can rebook whenever you are ready." crumbs={[{ label: "Home", to: "/" }, { label: "Appointment Cancelled" }]} />
      <section className="mx-auto max-w-2xl px-4 pb-24 text-center sm:px-6">
        <p className="text-muted-foreground">
          We are sorry we could not see you this time. If this cancellation was unintended or you would like to reschedule, please book again below or call{" "}
          <a href="tel:+911147013018" className="font-semibold text-primary">+91 11 4701 3018</a>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Book Again</Link>
          <Link to="/contact" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Contact Us</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
