import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const KEY = "sanjeevani_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      // storage unavailable — skip
    }
  }, []);

  if (!visible) return null;

  const accept = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, at: Date.now() }));
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-white/95 p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Cookie className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 text-sm text-foreground/85">
            <div className="font-display text-base font-semibold text-foreground">
              We value your privacy
            </div>
            <p className="mt-1 leading-relaxed">
              We use cookies to keep this site running smoothly, remember your preferences
              and understand how visitors use our services. Read our{" "}
              <Link to="/privacy-policy" className="font-semibold text-primary underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => accept("essential")}
              className="h-10 rounded-full border border-primary/20 px-4 text-xs font-semibold text-foreground hover:bg-primary-soft/60"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => accept("all")}
              className="h-10 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
            >
              Accept all
            </button>
            <button
              type="button"
              aria-label="Dismiss cookie banner"
              onClick={() => accept("essential")}
              className="grid h-10 w-10 place-items-center rounded-full border border-primary/15 text-foreground/70 hover:bg-primary-soft/60"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
