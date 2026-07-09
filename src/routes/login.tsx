import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign In — Sanjeevani Clinic" },
      { name: "description", content: "Sign in to Sanjeevani Clinic to manage your appointments, prescriptions and reports." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/login" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
});

function Login() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Login" title="Sign in to your account" intro="Access your bookings, digital reports and prescription history." crumbs={[{ label: "Home", to: "/" }, { label: "Sign In" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          <form className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Mobile Number</span>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">OTP</span>
              <input type="text" placeholder="Enter OTP" className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
            </label>
            <button type="button" disabled className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground opacity-70">
              Sign in (coming soon)
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            No account yet? <Link to="/book-appointment" className="text-primary underline">Book your first appointment</Link> — an account will be created for you.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
