import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Mail, Phone, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign In — Sanjeevani Clinic" },
      { name: "description", content: "Sign in to Sanjeevani Clinic with a one-time password sent to your email or phone." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
});

function normalizePhone(v: string) {
  const digits = v.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+91${digits}`;
  return digits.startsWith("91") ? `+${digits}` : `+${digits}`;
}

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [step, setStep] = useState<"send" | "verify">("send");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    // Already signed in
    setTimeout(() => navigate({ to: "/my-account" }), 0);
  }

  const sendOtp = async () => {
    if (!identifier.trim()) return toast.error("Enter your email or mobile");
    setLoading(true);
    try {
      if (channel === "email") {
        const { error } = await supabase.auth.signInWithOtp({
          email: identifier.trim(),
          options: { shouldCreateUser: true },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          phone: normalizePhone(identifier),
          options: { shouldCreateUser: true },
        });
        if (error) throw error;
      }
      toast.success(`OTP sent to your ${channel}`);
      setStep("verify");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not send OTP";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length < 4) return toast.error("Enter the OTP");
    setLoading(true);
    try {
      const params =
        channel === "email"
          ? { email: identifier.trim(), token: otp, type: "email" as const }
          : { phone: normalizePhone(identifier), token: otp, type: "sms" as const };
      const { error } = await supabase.auth.verifyOtp(params);
      if (error) throw error;
      toast.success("Signed in");
      navigate({ to: "/my-account" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid or expired OTP";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Login" title="Sign in with OTP" intro="Passwordless sign-in — we'll send a one-time code to your email or mobile." crumbs={[{ label: "Home", to: "/" }, { label: "Sign In" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          {step === "send" ? (
            <>
              <div className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-primary-soft/60 p-1 text-sm font-semibold">
                <button onClick={() => setChannel("email")} className={`flex items-center justify-center gap-2 rounded-full py-2 ${channel === "email" ? "bg-white shadow-soft text-primary" : "text-muted-foreground"}`}>
                  <Mail className="h-4 w-4" /> Email
                </button>
                <button onClick={() => setChannel("phone")} className={`flex items-center justify-center gap-2 rounded-full py-2 ${channel === "phone" ? "bg-white shadow-soft text-primary" : "text-muted-foreground"}`}>
                  <Phone className="h-4 w-4" /> Mobile
                </button>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">{channel === "email" ? "Email address" : "Mobile number"}</span>
                <input
                  type={channel === "email" ? "email" : "tel"}
                  autoComplete={channel === "email" ? "email" : "tel"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={channel === "email" ? "you@email.com" : "+91 XXXXX XXXXX"}
                  className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm"
                />
              </label>
              <button onClick={sendOtp} disabled={loading} className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {loading ? "Sending…" : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setStep("send")} className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <ArrowLeft className="h-3 w-3" /> Change {channel}
              </button>
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit code to <span className="font-semibold text-foreground">{identifier}</span>.
              </p>
              <label className="mt-4 block text-sm">
                <span className="mb-1 block font-medium text-foreground">Enter OTP</span>
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit code"
                  className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-center text-lg tracking-[0.4em]"
                />
              </label>
              <button onClick={verifyOtp} disabled={loading} className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {loading ? "Verifying…" : "Verify & Sign in"}
              </button>
              <button onClick={sendOtp} disabled={loading} className="mt-2 flex h-10 w-full items-center justify-center text-xs font-semibold text-primary">
                Resend OTP
              </button>
            </>
          )}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            New here? <Link to="/signup" className="text-primary underline">Create an account</Link>
            <br />
            <Link to="/forgot-password" className="mt-1 inline-block text-primary underline">Forgot password?</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
