import { Phone, MessageCircle } from "lucide-react";
import { CLINIC } from "@/data/clinic";

export function FloatingActions() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={CLINIC.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-accent text-white shadow-glow transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${CLINIC.phoneTel}`}
        aria-label="Call clinic"
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
