import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail } from "@/lib/validators";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [
      { title: "Forgot Password — Sanjeevani Clinc Pvt. Ltd." },
      { name: "description", content: "Reset your Sanjeevani Clinc Pvt. Ltd. password via a link sent to your email." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/forgot-password" }],
  }),
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return toast.error("Enter a valid email");
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/my-account`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Reset link sent — check your email");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not send reset email";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Password Reset" title="Forgot your password?" intro="We'll email you a secure link to set a new password." crumbs={[{ label: "Home", to: "/" }, { label: "Login", to: "/login" }, { label: "Forgot Password" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <form onSubmit={submit} className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          {sent ? (
            <p className="text-sm text-foreground">A password reset link has been sent to <span className="font-semibold">{email}</span>. Please check your inbox.</p>
          ) : (
            <>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">Registered email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
              </label>
              <button type="submit" disabled={loading} className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {loading ? "Sending…" : "Send reset link"}
              </button>
            </>
          )}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Remembered it? <Link to="/login" className="text-primary underline">Back to sign in</Link>
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
