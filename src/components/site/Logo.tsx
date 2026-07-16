import { Link } from "@tanstack/react-router";
const logoAsset = { url: "/favicon.png" };

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Sanjeevani Clinic Private Limited"
      className={`${className} object-contain`}
      loading="eager"
      decoding="async"
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5 shrink-0" aria-label="Sanjeevani Clinic Private Limited — Home">
      <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      {!compact && (
        <span className="min-w-0 leading-tight">
          <span className="block font-display text-sm font-semibold text-foreground sm:text-base xl:text-lg">
            <span className="xl:hidden">Sanjeevani Clinic Pvt. Ltd.</span>
            <span className="hidden xl:inline">Sanjeevani Clinic Private Limited</span>
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
            Care · Compassion · Cure
          </span>
        </span>
      )}
    </Link>
  );
}
