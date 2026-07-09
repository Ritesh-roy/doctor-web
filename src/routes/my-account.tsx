import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Calendar, Heart, ShoppingCart, FileText, LogOut } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/my-account")({
  component: MyAccount,
  head: () => ({
    meta: [
      { title: "My Account — Sanjeevani Clinic" },
      { name: "description", content: "Manage your profile, bookings, wishlist and prescriptions." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/my-account" }],
  }),
});

const tiles = [
  { icon: Calendar, label: "My Bookings", to: "/my-bookings", desc: "Upcoming and past appointments" },
  { icon: ShoppingCart, label: "Cart", to: "/cart", desc: "Items ready to check out" },
  { icon: Heart, label: "Wishlist", to: "/wishlist", desc: "Saved services & packages" },
  { icon: FileText, label: "Reports", to: "/my-bookings", desc: "Digital prescriptions & lab reports" },
] as const;

function MyAccount() {
  return (
    <SiteLayout>
      <PageHero eyebrow="My Account" title="Welcome back" intro="Manage your profile, bookings and reports in one place." crumbs={[{ label: "Home", to: "/" }, { label: "My Account" }]} />
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"><User className="h-6 w-6" /></div>
              <div>
                <div className="font-display text-xl font-semibold text-foreground">Guest Patient</div>
                <div className="text-sm text-muted-foreground">Sign in to sync your bookings & reports.</div>
              </div>
            </div>
            <Link to="/login" className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/20 px-4 text-sm font-semibold"><LogOut className="h-4 w-4" /> Sign in</Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="group rounded-3xl border border-primary/10 bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary"><t.icon className="h-5 w-5" /></div>
              <div className="mt-3 font-display text-base font-semibold text-foreground group-hover:text-primary">{t.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
