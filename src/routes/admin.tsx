import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Package, Users, TrendingUp, Trash2, UserCheck } from "lucide-react";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({
    meta: [
      { title: "Admin Panel — Sanjeevani Clinc Pvt. Ltd." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Booking = {
  id: string; patient_name: string; phone: string; email: string | null;
  service: string; preferred_date: string; preferred_time: string;
  notes: string | null; status: string; created_at: string;
};
type Order = {
  id: string; customer_name: string; phone: string; email: string | null; address: string | null;
  preferred_date: string | null; preferred_time: string | null;
  items: { title: string; qty: number; price: number }[];
  total_amount: number; payment_method: string; status: string; created_at: string;
};
type Profile = {
  id: string; full_name: string | null; phone: string | null; email: string | null; created_at: string;
};

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

function Admin() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"bookings" | "orders" | "patients">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
    if (!loading && user && !isAdmin) {
      toast.error("Admin access required");
      navigate({ to: "/" });
    }
  }, [loading, user, isAdmin, navigate]);

  const load = async () => {
    setBusy(true);
    const [b, o, p] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, phone, email, created_at").order("created_at", { ascending: false }),
    ]);
    setBookings((b.data as unknown as Booking[]) ?? []);
    setOrders((o.data as unknown as Order[]) ?? []);
    setProfiles((p.data as unknown as Profile[]) ?? []);
    setBusy(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    load();
  };
  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    load();
  };
  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  if (loading || !user || !isAdmin) {
    return <SiteLayout><div className="mx-auto max-w-md px-4 py-24 text-center text-sm text-muted-foreground">Checking access…</div></SiteLayout>;
  }

  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "confirmed_cod")
    .reduce((s, o) => s + Number(o.total_amount), 0);
  const stats = [
    { label: "Total bookings", value: bookings.length, icon: Calendar },
    { label: "Total orders", value: orders.length, icon: Package },
    { label: "Registered patients", value: profiles.length, icon: UserCheck },
    { label: "Unique customers", value: new Set([...bookings.map((b) => b.phone), ...orders.map((o) => o.phone)]).size, icon: Users },
    { label: "Revenue", value: formatINR(revenue), icon: TrendingUp },
  ];

  return (
    <SiteLayout>
      <PageHero eyebrow="Clinic Admin" title="Admin Dashboard" intro="Real-time view of every appointment and order placed on the website." crumbs={[{ label: "Home", to: "/" }, { label: "Admin" }]} />
      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-primary/10 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="mt-1 font-display text-2xl font-bold text-foreground">{s.value}</div>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white shadow-card">
          <div className="flex border-b border-primary/10">
            <button onClick={() => setTab("bookings")} className={`flex-1 px-6 py-4 text-sm font-semibold ${tab === "bookings" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
              Appointments ({bookings.length})
            </button>
            <button onClick={() => setTab("orders")} className={`flex-1 px-6 py-4 text-sm font-semibold ${tab === "orders" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
              Orders ({orders.length})
            </button>
            <button onClick={() => setTab("patients")} className={`flex-1 px-6 py-4 text-sm font-semibold ${tab === "patients" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
              Patients ({profiles.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            {busy ? (
              <p className="p-8 text-center text-sm text-muted-foreground">Loading…</p>
            ) : tab === "bookings" ? (
              bookings.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">No appointments yet.</p>
              ) : (
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-primary-soft/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="p-3 text-left">Patient</th>
                      <th className="p-3 text-left">Contact</th>
                      <th className="p-3 text-left">Service</th>
                      <th className="p-3 text-left">Date & Time</th>
                      <th className="p-3 text-left">Notes</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="p-3 font-semibold">{b.patient_name}<div className="text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</div></td>
                        <td className="p-3"><div>{b.phone}</div><div className="text-xs text-muted-foreground">{b.email || "—"}</div></td>
                        <td className="p-3">{b.service}</td>
                        <td className="p-3">{b.preferred_date}<div className="text-xs text-muted-foreground">{b.preferred_time}</div></td>
                        <td className="p-3 max-w-xs text-xs text-muted-foreground">{b.notes || "—"}</td>
                        <td className="p-3">
                          <select value={b.status} onChange={(e) => updateBookingStatus(b.id, e.target.value)} className="rounded-lg border border-primary/15 bg-background px-2 py-1 text-xs">
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="p-3"><button onClick={() => deleteBooking(b.id)} className="text-rose-500 hover:text-rose-700"><Trash2 className="h-4 w-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : tab === "orders" ? orders.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-primary-soft/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Contact</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Slot</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Payment</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="p-3 font-semibold">{o.customer_name}<div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div></td>
                      <td className="p-3"><div>{o.phone}</div><div className="text-xs text-muted-foreground">{o.email || "—"}</div>{o.address && <div className="text-xs text-muted-foreground">{o.address}</div>}</td>
                      <td className="p-3 text-xs">
                        {o.items.map((i, idx) => <div key={idx}>{i.title} × {i.qty}</div>)}
                      </td>
                      <td className="p-3 text-xs">{o.preferred_date || "—"}<div className="text-muted-foreground">{o.preferred_time || ""}</div></td>
                      <td className="p-3 font-semibold">{formatINR(Number(o.total_amount))}</td>
                      <td className="p-3 text-xs uppercase">{o.payment_method}</td>
                      <td className="p-3">
                        <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className="rounded-lg border border-primary/15 bg-background px-2 py-1 text-xs">
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="p-3"><button onClick={() => deleteOrder(o.id)} className="text-rose-500 hover:text-rose-700"><Trash2 className="h-4 w-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : profiles.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">No registered patients yet.</p>
            ) : (
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-primary-soft/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Joined</th>
                    <th className="p-3 text-left">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {profiles.map((p) => {
                    const patientBookings = bookings.filter((b) => b.email === p.email || b.phone === p.phone).length;
                    const patientOrders = orders.filter((o) => o.email === p.email || o.phone === p.phone).length;
                    return (
                      <tr key={p.id}>
                        <td className="p-3 font-semibold">{p.full_name || "Patient"}</td>
                        <td className="p-3 text-muted-foreground">{p.email || "—"}</td>
                        <td className="p-3 text-muted-foreground">{p.phone || "—"}</td>
                        <td className="p-3 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</td>
                        <td className="p-3 text-xs text-muted-foreground">{patientBookings} appointments · {patientOrders} orders</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
