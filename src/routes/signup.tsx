import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone } from "lucide-react";
import {
  isValidName,
  isValidEmail,
  isValidPhone,
  sanitizeNameInput,
  sanitizePhoneInput,
} from "@/lib/validators";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({
    meta: [
      { title: "Create Account — Sanjeevani Clinc Private Limited" },
      { name: "description", content: "Create your Sanjeevani Clinc Private Limited account using email or mobile and a password." },
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

// Convert a phone number into a stable synthetic email so we can use
// email/password auth even when SMS provider isn't configured.
function phoneToEmail(phone: string) {
  return `${normalizePhone(phone).replace(/\D/g, "")}@phone.sanjeevaniclinc.in`;
}

function Signup() {
  const navigate = useNavigate();
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidName(fullName)) return toast.error("Name may only contain letters and spaces");
    if (channel === "email" && !isValidEmail(email)) return toast.error("Enter a valid email");
    if (channel === "phone" && !isValidPhone(phone)) return toast.error("Enter a valid mobile number");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      const authEmail = channel === "email" ? email.trim() : phoneToEmail(phone);
      const meta: Record<string, string> = { full_name: fullName.trim() };
      if (channel === "phone") meta.phone = normalizePhone(phone);
      const opts = { data: meta, emailRedirectTo: `${window.location.origin}/my-account` };
      const { error } = await supabase.auth.signUp({ email: authEmail, password, options: opts });
      if (error) throw error;
      toast.success("Account created — you're signed in");
      navigate({ to: "/my-account" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not create account";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Sign Up" title="Create your account" intro="One account for all your bookings, reports and prescriptions." crumbs={[{ label: "Home", to: "/" }, { label: "Sign Up" }]} />
      <section className="mx-auto max-w-md px-4 pb-24 sm:px-6">
        <form onSubmit={submit} className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-primary-soft/60 p-1 text-sm font-semibold">
            <button type="button" onClick={() => setChannel("email")} className={`flex items-center justify-center gap-2 rounded-full py-2 ${channel === "email" ? "bg-white shadow-soft text-primary" : "text-muted-foreground"}`}>
              <Mail className="h-4 w-4" /> Email
            </button>
            <button type="button" onClick={() => setChannel("phone")} className={`flex items-center justify-center gap-2 rounded-full py-2 ${channel === "phone" ? "bg-white shadow-soft text-primary" : "text-muted-foreground"}`}>
              <Phone className="h-4 w-4" /> Mobile
            </button>
          </div>
          <div className="space-y-4">
            <Field label="Full name" value={fullName} onChange={(v) => setFullName(sanitizeNameInput(v))} placeholder="Your name" pattern="[A-Za-z][A-Za-z\s.'\-]{1,79}" title="Letters and spaces only" autoComplete="name" required />
            {channel === "email" ? (
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" autoComplete="email" required />
            ) : (
              <Field label="Mobile number" type="tel" inputMode="tel" value={phone} onChange={(v) => setPhone(sanitizePhoneInput(v))} placeholder="+91 XXXXX XXXXX" pattern="\+?\d{10,15}" autoComplete="tel" required />
            )}
            <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" autoComplete="new-password" minLength={6} required />
            <Field label="Confirm password" type="password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" autoComplete="new-password" minLength={6} required />
          </div>
          <button type="submit" disabled={loading} className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Creating…" : "Create account"}
          </button>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link>
          </p>
        </form>
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
