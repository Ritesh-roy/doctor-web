import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [
      { title: "Forgot Password — Sanjeevani Clinic" },
      { name: "description", content: "Reset your Sanjeevani Clinic patient account password." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/forgot-password" }],
  }),
});

function ForgotPassword() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Password Reset" title="Forgot your password?" intro="Enter your registered mobile or email and we will send you an OTP to reset your password." crumbs={[{ label: "Home", to: "/" }, { label: "Login", to: "/login" }, { label: "Forgot Password" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          <form className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Mobile or email</span>
              <input type="text" placeholder="+91 XXXXX XXXXX or you@email.com" className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
            </label>
            <button type="button" disabled className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground opacity-70">
              Send OTP (coming soon)
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Remembered it? <Link to="/login" className="text-primary underline">Back to sign in</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
