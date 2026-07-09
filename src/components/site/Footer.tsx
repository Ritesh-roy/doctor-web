import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { LogoMark } from "./Logo";
import { CLINIC } from "@/data/clinic";

const cols = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Our Doctors", to: "/doctor" },
      { label: "Facilities", to: "/facilities" },
      { label: "Gallery", to: "/gallery" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Medical Services",
    links: [
      { label: "Physiotherapy", to: "/services/physiotherapy" },
      { label: "Eye Care", to: "/services/eye-checkup" },
      { label: "Blood Test", to: "/services/blood-test" },
      { label: "Radiology & Imaging", to: "/services/radiology" },
      { label: "General Medicine", to: "/services/general-medicine" },
      { label: "Pharmacy", to: "/pharmacy" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book Appointment", to: "/book-appointment" },
      { label: "My Bookings", to: "/my-bookings" },
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faqs" },
      { label: "Testimonials", to: "/testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Cancellation Policy", to: "/appointment-cancelled" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-primary/10 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11 rounded-xl" />
              <div>
                <div className="font-display text-xl font-semibold">Sanjeevani Clinic</div>
                <div className="text-xs uppercase tracking-[0.22em] text-background/60">
                  Kirari · Delhi
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/75">
              Trusted family healthcare in Karan Vihar, Kirari for over {CLINIC.years} years.
              Led by Dr. B.P. Singh with a warm, ethical and evidence-based approach.
            </p>
            <div className="mt-6 space-y-3 text-sm text-background/85">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> <span>{CLINIC.address}</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0" /> <a href={`tel:${CLINIC.phoneTel}`}>{CLINIC.phone}</a></div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0" /> <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></div>
              <div className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0" /> <span>{CLINIC.hours}</span></div>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-background/70">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-background/80">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-background">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-background/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} Sanjeevani Clinic · All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-background/70">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-background/15 hover:text-background"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-background/15 hover:text-background"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-background/15 hover:text-background"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
