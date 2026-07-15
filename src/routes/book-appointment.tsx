import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CLINIC } from "@/data/clinic";
import { SERVICES } from "@/data/services";
import { Phone, Check, Calendar as CalIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  isValidName,
  isValidPhone,
  isFutureOrToday,
  sanitizeNameInput,
  sanitizePhoneInput,
  todayISO,
} from "@/lib/validators";

export const Route = createFileRoute("/book-appointment")({
  component: Book,
  head: () => ({
    meta: [
      { title: "Book Appointment — Sanjeevani Clinc Private Limited, Kirari" },
      { name: "description", content: "Book your appointment with Dr. B.P. Singh at Sanjeevani Clinc Private Limited, Kirari, Delhi." },
      { property: "og:title", content: "Book Appointment — Sanjeevani Clinc Private Limited" },
      { property: "og:description", content: "Reserve a slot online in seconds." },
      { property: "og:url", content: "/book-appointment" },
    ],
    links: [{ rel: "canonical", href: "/book-appointment" }],
  }),
});

function Book() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const minDate = todayISO();




  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidName(name)) return toast.error("Name may only contain letters and spaces");
    if (!isValidPhone(phone)) return toast.error("Enter a valid phone number (10–15 digits)");
    if (!isFutureOrToday(date)) return toast.error("Choose today or a future date");
    const form = e.currentTarget;
    const f = new FormData(form);
    setSaving(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: user?.id ?? null,
        patient_name: name.trim(),
        phone: phone.trim(),
        email: user?.email ?? null,
        service: String(f.get("service") || "General Consultation"),
        preferred_date: date,
        preferred_time: String(f.get("time") || "Morning · 9 AM – 1 PM"),
        notes: String(f.get("notes") || "") || null,
      });
      if (error) throw error;
      toast.success("Appointment booked — we'll confirm shortly");
      setSent(true);
      form.reset();
      setName(""); setPhone(""); setDate("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not save booking");
    } finally {
      setSaving(false);
    }
  };


  return (
    <SiteLayout>
      <PageHero
        eyebrow="Book appointment"
        title="Reserve your slot in under a minute."
        intro="We'll confirm your appointment on WhatsApp. For urgent visits, please call us directly."
        crumbs={[{ label: "Home", to: "/" }, { label: "Book appointment" }]}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} noValidate className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Full name</span>
              <input
                name="name"
                required
                value={name}
                onChange={(e) => setName(sanitizeNameInput(e.target.value))}
                pattern="[A-Za-z][A-Za-z\s.'\-]{1,79}"
                title="Letters and spaces only"
                autoComplete="name"
                className="mt-1 w-full rounded-xl border border-primary/15 px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Phone</span>
              <input
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                pattern="\+?\d{10,15}"
                title="10–15 digits, digits only"
                className="mt-1 w-full rounded-xl border border-primary/15 px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Service</span>
              <select name="service" defaultValue="General Consultation" className="mt-1 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Preferred date</span>
              <input
                name="date"
                type="date"
                required
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-primary/15 px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Preferred time</span>
              <select name="time" required defaultValue="" className="mt-1 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="" disabled>Select a slot</option>
                <option>Morning · 9 AM – 1 PM</option>
                <option>Evening · 5 PM – 9 PM</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Notes (optional)</span>
              <textarea name="notes" rows={3} maxLength={500} className="mt-1 w-full rounded-xl border border-primary/15 px-4 py-3 text-sm outline-none focus:border-primary" />
            </label>
          </div>
          <button type="submit" disabled={saving} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60 sm:w-auto">
            <CalIcon className="h-4 w-4" /> {saving ? "Booking…" : "Book Appointment"}
          </button>
          {sent && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-accent/10 p-3 text-sm text-emerald-accent">
              <Check className="h-4 w-4" /> Your appointment has been received. Our team will contact you shortly.
            </div>
          )}
        </form>


        <aside className="space-y-4">
          <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-soft/40 to-white p-6 shadow-card">
            <h2 className="font-display text-xl text-foreground">Prefer to call?</h2>
            <p className="mt-2 text-sm text-muted-foreground">We pick up quickly during clinic hours.</p>
            <a href={`tel:${CLINIC.phoneTel}`} className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background">
              <Phone className="h-4 w-4" /> {CLINIC.phone}
            </a>
          </div>
          <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
            <h3 className="font-display text-lg text-foreground">Clinic hours</h3>
            <p className="mt-2 text-sm text-muted-foreground">{CLINIC.hours}</p>
            <h3 className="mt-5 font-display text-lg text-foreground">Address</h3>
            <p className="mt-2 text-sm text-muted-foreground">{CLINIC.address}</p>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
