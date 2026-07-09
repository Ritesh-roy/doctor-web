import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({
    meta: [
      { title: "Create Account — Sanjeevani Clinic" },
      { name: "description", content: "Sign up to book faster, track prescriptions and access reports at Sanjeevani Clinic." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/signup" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
});

function Signup() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Sign Up" title="Create your account" intro="One account for all your bookings, reports and prescriptions." crumbs={[{ label: "Home", to: "/" }, { label: "Sign Up" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          <form className="space-y-4">
            <Input label="Full Name" placeholder="Your name" />
            <Input label="Mobile Number" placeholder="+91 XXXXX XXXXX" type="tel" />
            <Input label="Email" placeholder="you@email.com" type="email" />
            <Input label="Create Password" placeholder="At least 8 characters" type="password" />
            <button type="button" disabled className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground opacity-70">
              Create account (coming soon)
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      <input {...rest} className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
    </label>
  );
}
