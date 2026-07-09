import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [
      { title: "Forgot Password — Sanjeevani Clinic" },
      { name: "description", content: "Reset your Sanjeevani Clinic password using a one-time password sent to your email or phone." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/forgot-password" }],
  }),
});

function normalizePhone(v: string) {
  const digits = v.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+91${digits}`;
  return digits.startsWith("91") ? `+${digits}` : `+${digits}`;
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"send" | "verify" | "reset">("send");
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!identifier.trim()) return toast.error("Enter your email or mobile");
    setLoading(true);
    try {
      const { error } =
        channel === "email"
          ? await supabase.auth.signInWithOtp({ email: identifier.trim(), options: { shouldCreateUser: false } })
          : await supabase.auth.signInWithOtp({ phone: normalizePhone(identifier), options: { shouldCreateUser: false } });
      if (error) throw error;
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
      toast.success("Verified. Set a new password.");
      setStep("reset");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid or expired OTP";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated");
      navigate({ to: "/my-account" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not update password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Password Reset" title="Forgot your password?" intro="Verify with an OTP sent to your email or mobile, then set a new password." crumbs={[{ label: "Home", to: "/" }, { label: "Login", to: "/login" }, { label: "Forgot Password" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          {step === "send" && (
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
                <span className="mb-1 block font-medium text-foreground">Registered {channel === "email" ? "email" : "mobile"}</span>
                <input
                  type={channel === "email" ? "email" : "tel"}
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
          )}
          {step === "verify" && (
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
                {loading ? "Verifying…" : "Verify OTP"}
              </button>
              <button onClick={sendOtp} disabled={loading} className="mt-2 flex h-10 w-full items-center justify-center text-xs font-semibold text-primary">
                Resend OTP
              </button>
            </>
          )}
          {step === "reset" && (
            <>
              <p className="text-sm text-muted-foreground">Choose a new password for your account.</p>
              <label className="mt-4 block text-sm">
                <span className="mb-1 block font-medium text-foreground">New password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-1 block font-medium text-foreground">Confirm password</span>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password" className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
              </label>
              <button onClick={resetPassword} disabled={loading} className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {loading ? "Updating…" : "Update password"}
              </button>
            </>
          )}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Remembered it? <Link to="/login" className="text-primary underline">Back to sign in</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
