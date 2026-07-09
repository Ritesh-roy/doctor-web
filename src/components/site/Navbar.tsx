import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Calendar,
  Clock,
  Star,
  Ambulance,
  Mail,
  ChevronDown,
  ShoppingCart,
  Heart,
  User,
  Search,
} from "lucide-react";
import { Logo } from "./Logo";
import { CLINIC } from "@/data/clinic";
import { CATEGORIES } from "@/data/products";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";

type Child = { label: string; to: string; params?: Record<string, string>; description?: string };
type NavItem =
  | { label: string; to: string; children?: undefined }
  | { label: string; to: string; children: Child[] };

const SERVICE_CHILDREN: Child[] = [
  { label: "All Services", to: "/medical-services", description: "Overview of everything we offer" },
  { label: "Shop All (18 packages)", to: "/shop", description: "Every service with real prices" },
  ...CATEGORIES.map((c) => ({
    label: c.label,
    to: "/product-category/$slug",
    params: { slug: c.slug },
    description: c.description,
  })),
  { label: "Pharmacy", to: "/pharmacy", description: "In-house medicines & refills" },
];

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/medical-services", children: SERVICE_CHILDREN },
  { label: "Shop", to: "/shop" },
  { label: "Doctors", to: "/doctor" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function TopBar() {
  const { user, signOut } = useAuth();
  return (
    <div className="hidden border-b border-primary/10 bg-primary text-primary-foreground lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
        <div className="flex items-center gap-6 opacity-95">
          <a href={`tel:${CLINIC.phoneTel}`} className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" /> {CLINIC.phone}
          </a>
          <a href={`mailto:${CLINIC.email}`} className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" /> {CLINIC.email}
          </a>
          <span className="hidden items-center gap-2 xl:flex">
            <Clock className="h-3.5 w-3.5" /> {CLINIC.hours}
          </span>
        </div>
        <div className="flex items-center gap-4 opacity-95">
          {user ? (
            <>
              <Link to="/my-account" className="hover:underline">My Account</Link>
              <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
              <button onClick={() => signOut()} className="hover:underline">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Sign in</Link>
              <Link to="/signup" className="hover:underline">Sign up</Link>
            </>
          )}
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current text-emerald-accent" />
            <span className="font-semibold">{CLINIC.rating}</span> Google
          </span>
          <a
            href={`tel:${CLINIC.phoneTel}`}
            className="flex items-center gap-2 rounded-full bg-emerald-accent/90 px-3 py-1 font-semibold"
          >
            <Ambulance className="h-3.5 w-3.5" /> Emergency 24×7
          </a>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-card shadow-soft" : "bg-background/70 backdrop-blur"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:py-4">
          <Logo />

          <nav className="hidden items-center justify-center gap-1 lg:flex">
            {NAV.map((n) =>
              n.children ? (
                <div key={n.to} className="relative group">
                  <Link
                    to={n.to}
                    activeProps={{ className: "bg-primary-soft/70 text-foreground" }}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-primary-soft/60 hover:text-foreground"
                  >
                    {n.label} <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 mt-1 w-[520px] -translate-x-1/2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-primary/10 bg-background/95 p-3 shadow-glow backdrop-blur">
                      {n.children.map((c) => (
                        <Link
                          key={`${c.to}-${c.label}`}
                          to={c.to}
                          params={c.params as never}
                          className="rounded-xl px-3 py-2 text-sm hover:bg-primary-soft/60"
                        >
                          <div className="font-semibold text-foreground">{c.label}</div>
                          {c.description && (
                            <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{c.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ className: "bg-primary-soft/70 text-foreground" }}
                  className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-primary-soft/60 hover:text-foreground"
                >
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1.5 justify-end">
            <Link to="/search" aria-label="Search" className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 text-foreground hover:bg-primary-soft/60">
              <Search className="h-4 w-4" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative grid h-11 w-11 place-items-center rounded-full border border-primary/15 text-foreground hover:bg-primary-soft/60">
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-emerald-accent px-1 text-[10px] font-bold text-white">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative grid h-11 w-11 place-items-center rounded-full border border-primary/15 text-foreground hover:bg-primary-soft/60">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-emerald-accent px-1 text-[10px] font-bold text-white">{cartCount}</span>
              )}
            </Link>
            <Link to={user ? "/my-account" : "/login"} aria-label={user ? "My account" : "Sign in"} className="hidden h-11 w-11 place-items-center rounded-full border border-primary/15 text-foreground hover:bg-primary-soft/60 sm:grid">
              <User className="h-4 w-4" />
            </Link>
            <Link
              to="/book-appointment"
              className="hidden h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background shadow-soft transition-transform hover:-translate-y-0.5 xl:inline-flex"
            >
              <Calendar className="h-4 w-4" /> Book
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="fixed inset-x-0 top-[64px] z-40 max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-primary/10 bg-background/95 backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV.map((n) =>
                n.children ? (
                  <div key={n.to} className="rounded-xl">
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-foreground/85 hover:bg-primary-soft/60"
                    >
                      {n.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-primary/15 pl-3">
                        {n.children.map((c) => (
                          <Link
                            key={`${c.to}-${c.label}`}
                            to={c.to}
                            params={c.params as never}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-foreground/75 hover:bg-primary-soft/60"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{ className: "bg-primary-soft/70" }}
                    className="rounded-xl px-3 py-3 text-base font-medium text-foreground/85 hover:bg-primary-soft/60"
                  >
                    {n.label}
                  </Link>
                ),
              )}
              <div className="mt-2 grid grid-cols-2 gap-2">
                {user ? (
                  <>
                    <Link to="/my-account" onClick={() => setOpen(false)} className="rounded-xl border border-primary/15 px-3 py-3 text-center text-sm font-semibold">My Account</Link>
                    <button onClick={() => { setOpen(false); signOut(); }} className="rounded-xl border border-primary/15 px-3 py-3 text-center text-sm font-semibold">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl border border-primary/15 px-3 py-3 text-center text-sm font-semibold">Sign in</Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="rounded-xl border border-primary/15 px-3 py-3 text-center text-sm font-semibold">Sign up</Link>
                  </>
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${CLINIC.phoneTel}`}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-primary/20 text-sm font-semibold"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
                <Link
                  to="/book-appointment"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background"
                >
                  <Calendar className="h-4 w-4" /> Book
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
