import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({
    meta: [
      { title: "Create Account — Sanjeevani Clinic" },
      { name: "description", content: "Create your Sanjeevani Clinic account using OTP — no password required." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
});

function normalizePhone(v: string) {
  const digits = v.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+91${digits}`;
  return digits.startsWith("91") ? `+${digits}` : `+${digits}`;
}

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const identifier = channel === "email" ? email.trim() : normalizePhone(phone);

  const sendOtp = async () => {
    if (!fullName.trim()) return toast.error("Enter your full name");
    if (channel === "email" && !email.trim()) return toast.error("Enter your email");
    if (channel === "phone" && !phone.trim()) return toast.error("Enter your mobile");
    setLoading(true);
    try {
      const options = { data: { full_name: fullName.trim() }, shouldCreateUser: true };
      const { error } =
        channel === "email"
          ? await supabase.auth.signInWithOtp({ email: email.trim(), options })
          : await supabase.auth.signInWithOtp({ phone: normalizePhone(phone), options });
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
          ? { email: email.trim(), token: otp, type: "email" as const }
          : { phone: normalizePhone(phone), token: otp, type: "sms" as const };
      const { error } = await supabase.auth.verifyOtp(params);
      if (error) throw error;
      toast.success("Account created");
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
      <PageHero eyebrow="Sign Up" title="Create your account" intro="One account for all your bookings, reports and prescriptions." crumbs={[{ label: "Home", to: "/" }, { label: "Sign Up" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          {step === "form" ? (
            <>
              <div className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-primary-soft/60 p-1 text-sm font-semibold">
                <button onClick={() => setChannel("email")} className={`flex items-center justify-center gap-2 rounded-full py-2 ${channel === "email" ? "bg-white shadow-soft text-primary" : "text-muted-foreground"}`}>
                  <Mail className="h-4 w-4" /> Email
                </button>
                <button onClick={() => setChannel("phone")} className={`flex items-center justify-center gap-2 rounded-full py-2 ${channel === "phone" ? "bg-white shadow-soft text-primary" : "text-muted-foreground"}`}>
                  <Phone className="h-4 w-4" /> Mobile
                </button>
              </div>
              <div className="space-y-4">
                <Field label="Full Name" value={fullName} onChange={setFullName} placeholder="Your name" />
                {channel === "email" ? (
                  <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
                ) : (
                  <Field label="Mobile Number" type="tel" value={phone} onChange={setPhone} placeholder="+91 XXXXX XXXXX" />
                )}
              </div>
              <button onClick={sendOtp} disabled={loading} className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {loading ? "Sending…" : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setStep("form")} className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <ArrowLeft className="h-3 w-3" /> Edit details
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
                {loading ? "Verifying…" : "Verify & Create account"}
              </button>
              <button onClick={sendOtp} disabled={loading} className="mt-2 flex h-10 w-full items-center justify-center text-xs font-semibold text-primary">
                Resend OTP
              </button>
            </>
          )}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, value, onChange, ...rest }: { label: string; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} {...rest} className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" />
    </label>
  );
}
