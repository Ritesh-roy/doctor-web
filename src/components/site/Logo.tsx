import { Link } from "@tanstack/react-router";
const logoAsset = { url: "/favicon.png" };

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Sanjeevani Clinc Private Limited"
      className={`${className} object-contain`}
      loading="eager"
      decoding="async"
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Sanjeevani Clinc Private Limited — Home">
      <LogoMark className="h-11 w-11 shrink-0" />
      {!compact && (
        <span className="leading-tight whitespace-nowrap">
          <span className="block font-display text-lg font-semibold text-foreground">
            Sanjeevani Clinc Private Limited
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Care · Compassion · Cure
          </span>
        </span>
      )}
    </Link>
  );
}
