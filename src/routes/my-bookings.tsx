import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/my-bookings")({
  component: MyBookings,
  head: () => ({
    meta: [
      { title: "My Bookings — Sanjeevani Clinic" },
      { name: "description", content: "View, reschedule or cancel your Sanjeevani Clinic appointments." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/my-bookings" }],
  }),
});

function MyBookings() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-4 py-24 text-center text-sm text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="My Bookings" title="Your appointments" intro="Track upcoming and past appointments with Sanjeevani Clinic." crumbs={[{ label: "Home", to: "/" }, { label: "My Bookings" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-card">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary"><Calendar className="h-6 w-6" /></div>
          <h2 className="mt-4 font-display text-2xl text-foreground">No bookings yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Once you book an appointment, it will appear here with status and reports.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Book Appointment</Link>
            <Link to="/shop" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Browse Services</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
