import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/my-bookings")({
  component: MyBookings,
  head: () => ({
    meta: [
      { title: "My Bookings — Sanjeevani Clinic" },
      { name: "description", content: "View, reschedule or cancel your Sanjeevani Clinic appointments." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/my-bookings" },
    ],
    links: [{ rel: "canonical", href: "/my-bookings" }],
  }),
});

function MyBookings() {
  return (
    <SiteLayout>
      <PageHero eyebrow="My Bookings" title="Your appointments" intro="Track upcoming and past appointments with Sanjeevani Clinic." crumbs={[{ label: "Home", to: "/" }, { label: "My Bookings" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-card">
          <h2 className="font-display text-2xl text-foreground">Sign in to view your bookings</h2>
          <p className="mt-2 text-sm text-muted-foreground">Patient accounts will be enabled once online booking goes live. For now, please book on WhatsApp.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/login" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Sign in</Link>
            <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Book Appointment</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
