import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Package, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/my-bookings")({
  component: MyBookings,
  head: () => ({
    meta: [
      { title: "My Bookings — Sanjeevani Clinc Private Limited" },
      { name: "description", content: "View your Sanjeevani Clinc Private Limited appointments and orders." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/my-bookings" }],
  }),
});

type Booking = { id: string; service: string; preferred_date: string; preferred_time: string; status: string; created_at: string };
type Order = { id: string; total_amount: number; status: string; items: { title: string; qty: number }[]; created_at: string; payment_method: string };

function MyBookings() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setBusy(true);
      const [b, o] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
      ]);
      setBookings((b.data as unknown as Booking[]) ?? []);
      setOrders((o.data as unknown as Order[]) ?? []);
      setBusy(false);
    })();
  }, [user]);

  if (loading || !user) return <SiteLayout><div className="mx-auto max-w-md px-4 py-24 text-center text-sm text-muted-foreground">Loading…</div></SiteLayout>;

  return (
    <SiteLayout>
      <PageHero eyebrow="My Bookings" title="Your appointments & orders" intro="Track everything you've booked or purchased with us." crumbs={[{ label: "Home", to: "/" }, { label: "My Bookings" }]} />
      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold"><Calendar className="h-5 w-5 text-primary" /> Appointments</h2>
          {busy ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          ) : bookings.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-primary-soft/40 p-6 text-center text-sm text-muted-foreground">
              No appointments yet. <Link to="/book-appointment" className="text-primary underline">Book one</Link>.
            </div>
          ) : (
            <div className="mt-4 divide-y divide-primary/10">
              {bookings.map((b) => (
                <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <div className="font-semibold text-foreground">{b.service}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{b.preferred_date} · {b.preferred_time}</span>
                    </div>
                  </div>
                  <StatusPill status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold"><Package className="h-5 w-5 text-primary" /> Orders</h2>
          {busy ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          ) : orders.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-primary-soft/40 p-6 text-center text-sm text-muted-foreground">
              No orders yet. <Link to="/shop" className="text-primary underline">Browse shop</Link>.
            </div>
          ) : (
            <div className="mt-4 divide-y divide-primary/10">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <div className="font-semibold text-foreground">
                      {o.items.map((i) => `${i.title} × ${i.qty}`).join(", ")}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Payment: {o.payment_method.toUpperCase()} · {new Date(o.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-bold">{formatINR(Number(o.total_amount))}</span>
                    <StatusPill status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-primary/10 text-primary",
    cancelled: "bg-rose-100 text-rose-800",
  };
  const cls = map[status] || "bg-muted text-muted-foreground";
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${cls}`}>{status}</span>;
}
