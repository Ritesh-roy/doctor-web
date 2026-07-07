import { Link } from "@tanstack/react-router";
import { Calendar, Phone, MessageCircle } from "lucide-react";
import { CLINIC } from "@/data/clinic";

export function CtaBanner({
  title = "Book your consultation today",
  subtitle = "Walk-ins welcome. Same-day appointments usually available.",
}: { title?: string; subtitle?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary via-primary to-primary/90 px-6 py-12 text-primary-foreground shadow-glow sm:px-12 sm:py-16">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-accent/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-sm text-primary-foreground/80 sm:text-base">{subtitle}</p>
          </div>
          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            <Link
              to="/book-appointment"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-primary sm:w-auto"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </Link>
            <a
              href={`tel:${CLINIC.phoneTel}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/40 px-5 text-sm font-semibold text-white sm:w-auto"
            >
              <Phone className="h-4 w-4" /> Call {CLINIC.phone}
            </a>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-accent px-5 text-sm font-semibold text-white sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
