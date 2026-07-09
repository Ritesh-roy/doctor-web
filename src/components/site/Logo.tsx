import { Link } from "@tanstack/react-router";

/**
 * Inline vector brand mark. Renders as SVG so it stays crisp at every size
 * and is safe to use in favicons, headers and share previews.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Sanjeevani Clinic"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sc-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(174 72% 34%)" />
          <stop offset="100%" stopColor="hsl(196 78% 42%)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#sc-brand)" />
      <path
        d="M32 49s-14-8.4-14-19a8 8 0 0 1 14-5.3A8 8 0 0 1 46 30c0 10.6-14 19-14 19Z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path
        d="M29 27h6v4h4v6h-4v4h-6v-4h-4v-6h4z"
        fill="hsl(174 72% 30%)"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Sanjeevani Clinic — Home">
      <LogoMark className="h-11 w-11 shrink-0 rounded-2xl shadow-soft" />
      {!compact && (
        <span className="leading-tight whitespace-nowrap">
          <span className="block font-display text-lg font-semibold text-foreground">
            Sanjeevani Clinic
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Care · Compassion · Cure
          </span>
        </span>
      )}
    </Link>
  );
}
