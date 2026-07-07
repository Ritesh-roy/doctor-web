import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Sanjeevani Clinic logo"
    >
      <defs>
        <linearGradient id="sjv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--emerald-accent)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="14" fill="url(#sjv-grad)" />
      {/* medical cross + pulse */}
      <path
        d="M18 14h12v6h6v8h-6v6H18v-6h-6v-8h6z"
        fill="white"
        fillOpacity="0.12"
      />
      <path
        d="M8 26h8l2-4 3 8 3-12 3 8h15"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 min-w-0">
      <LogoMark className="h-10 w-10 shrink-0 shadow-glow rounded-xl" />
      {!compact && (
        <span className="leading-tight min-w-0">
          <span className="block truncate font-display text-lg font-semibold text-foreground">
            Sanjeevani
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Clinic · Delhi
          </span>
        </span>
      )}
    </Link>
  );
}
