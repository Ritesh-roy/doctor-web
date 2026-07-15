import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Mail, Phone, Lock } from "lucide-react";
import { isValidEmail, isValidPhone, sanitizePhoneInput, normalizeIndianMobile, MOBILE_INVALID_MSG } from "@/lib/validators";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign In — Sanjeevani Clinc Private Limited" },
      { name: "description", content: "Sign in to Sanjeevani Clinc Private Limited with your email or mobile and password." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
});

function phoneToEmail(phone: string) {
  return `${normalizeIndianMobile(phone)}@phone.sanjeevaniclinc.in`;
}

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/my-account" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channel === "email" && !isValidEmail(identifier)) return toast.error("Enter a valid email");
    if (channel === "phone" && !isValidPhone(identifier)) return toast.error("Enter a valid mobile number");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      const email = channel === "email" ? identifier.trim() : phoneToEmail(identifier);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      // Route admin to admin panel
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user!.id);
      if (roles?.some((r) => r.role === "admin")) navigate({ to: "/admin" });
      else navigate({ to: "/my-account" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid credentials";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Login" title="Sign in to your account" intro="Use your email or mobile number with your password." crumbs={[{ label: "Home", to: "/" }, { label: "Sign In" }]} />
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
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">{channel === "email" ? "Email address" : "Mobile number"}</span>
            <input
              type={channel === "email" ? "email" : "tel"}
              inputMode={channel === "phone" ? "tel" : undefined}
              autoComplete={channel === "email" ? "email" : "tel"}
              value={identifier}
              onChange={(e) => setIdentifier(channel === "phone" ? sanitizePhoneInput(e.target.value) : e.target.value)}
              placeholder={channel === "email" ? "you@email.com" : "+91 XXXXX XXXXX"}
              className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm"
              required
            />
          </label>
          <label className="mt-4 block text-sm">
            <span className="mb-1 block font-medium text-foreground">Password</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="h-12 w-full rounded-2xl border border-primary/15 bg-background pl-10 pr-4 text-sm"
                required
                minLength={6}
              />
            </div>
          </label>
          <button type="submit" disabled={loading} className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            New here? <Link to="/signup" className="text-primary underline">Create an account</Link>
            <br />
            <Link to="/forgot-password" className="mt-1 inline-block text-primary underline">Forgot password?</Link>
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
