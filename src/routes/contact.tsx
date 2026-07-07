import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CLINIC } from "@/data/clinic";
import { Phone, Mail, MapPin, Clock, MessageCircle, Ambulance } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Sanjeevani Clinic, Kirari, Delhi" },
      { name: "description", content: `Visit Sanjeevani Clinic at ${CLINIC.address}. Call ${CLINIC.phone} or email ${CLINIC.email}.` },
      { property: "og:title", content: "Contact — Sanjeevani Clinic" },
      { property: "og:description", content: "Address, phone, email and hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hi, I'd like to get in touch.%0A%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AMessage: ${f.get("message")}`;
    window.open(`${CLINIC.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="We're here to help."
        intro="Call, WhatsApp or drop us a note — we usually reply within the hour during clinic timings."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, t: "Address", v: CLINIC.address, href: CLINIC.mapUrl },
            { icon: Phone, t: "Phone", v: CLINIC.phone, href: `tel:${CLINIC.phoneTel}` },
            { icon: MessageCircle, t: "WhatsApp", v: "Chat with us instantly", href: CLINIC.whatsapp },
            { icon: Mail, t: "Email", v: CLINIC.email, href: `mailto:${CLINIC.email}` },
            { icon: Clock, t: "Hours", v: CLINIC.hours },
            { icon: Ambulance, t: "Emergency", v: `24×7 · Call ${CLINIC.phone}`, href: `tel:${CLINIC.phoneTel}` },
          ].map((c) => (
            <a
              key={c.t}
              href={c.href}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-card ${c.href ? "hover:bg-primary-soft/30" : ""}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><c.icon className="h-5 w-5" /></span>
              <div className="min-w-0">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{c.t}</div>
                <div className="mt-1 text-sm font-medium text-foreground break-words">{c.v}</div>
              </div>
            </a>
          ))}
        </div>

        <div>
          <form onSubmit={send} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl text-foreground">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll reply on WhatsApp for the fastest response.</p>
            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Your name</span>
                <input name="name" required className="mt-1 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Phone</span>
                <input name="phone" required inputMode="tel" className="mt-1 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">How can we help?</span>
                <textarea name="message" rows={4} required className="mt-1 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm outline-none focus:border-primary" />
              </label>
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow">
                Send via WhatsApp
              </button>
            </div>
          </form>

          <div className="mt-6 overflow-hidden rounded-3xl border border-primary/10 shadow-card">
            <iframe
              title="Sanjeevani Clinic location"
              src={CLINIC.mapEmbed}
              loading="lazy"
              className="h-72 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
