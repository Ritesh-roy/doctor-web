import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Download, ShoppingBag, Calendar, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { formatINR } from "@/data/products";

type LastOrder = {
  order_number: string | null;
  id: string;
  customer_name: string;
  therapy_titles: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  appointment_status: string;
  preferred_date: string;
  preferred_time: string;
};

export const Route = createFileRoute("/thank-you")({
  component: ThankYou,
  head: () => ({
    meta: [
      { title: "Thank You — Sanjeevani Clinic" },
      { name: "description", content: "Thank you for booking with Sanjeevani Clinic. Your appointment details are below." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/thank-you" },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
});

function ThankYou() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("sanjeevani.lastOrder");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* ignore */
    }
  }, []);

  const downloadInvoice = () => {
    if (!order) return;
    const html = invoiceHtml(order);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.order_number ?? order.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Thank you"
        title={order ? "Your booking is confirmed 🎉" : "Your request has been received"}
        intro={order ? "A copy of your booking details is below. Our team will call you shortly to confirm your slot." : "Our team will call you shortly to confirm your appointment."}
        crumbs={[{ label: "Home", to: "/" }, { label: "Thank You" }]}
      />

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full bg-emerald-accent/15 text-emerald-accent">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        {order ? (
          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card">
            <div className="border-b border-primary/10 bg-primary-soft/40 p-6 text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Order number</div>
              <div className="mt-1 font-display text-2xl font-bold text-foreground">{order.order_number ?? order.id.slice(0, 8)}</div>
            </div>
            <dl className="grid gap-4 p-6 sm:grid-cols-2">
              <Detail label="Customer name" value={order.customer_name} />
              <Detail label="Therapy booked" value={order.therapy_titles} />
              <Detail label="Preferred date" value={order.preferred_date} />
              <Detail label="Preferred time" value={order.preferred_time} />
              <Detail
                label="Payment status"
                value={order.payment_status}
                highlight={order.payment_status.toLowerCase().includes("paid") ? "success" : "info"}
              />
              <Detail label="Appointment status" value={order.appointment_status} highlight="info" />
              <div className="sm:col-span-2 rounded-2xl border border-primary/10 bg-primary-soft/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground">Total amount</span>
                  <span className="font-display text-xl font-bold text-foreground">{formatINR(order.total_amount)}</span>
                </div>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3 border-t border-primary/10 p-6">
              <Link to="/shop" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
                <ShoppingBag className="h-4 w-4" /> Continue Shopping
              </Link>
              <Link to="/book-appointment" className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4" /> Book Another Therapy
              </Link>
              <button onClick={downloadInvoice} className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">
                <Download className="h-4 w-4" /> Download Invoice
              </button>
              <a
                href={`https://wa.me/918853515351?text=${encodeURIComponent(`Hi, my booking ${order.order_number ?? order.id.slice(0, 8)} for ${order.therapy_titles} on ${order.preferred_date} ${order.preferred_time}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-emerald-accent px-5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-card">
            <p className="text-muted-foreground">
              You will receive a confirmation on WhatsApp once your slot is assigned. For urgent needs, please call{" "}
              <a href="tel:+917701986188" className="font-semibold text-primary">+91 77019 86188</a>.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Back to Home</Link>
              <Link to="/shop" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Explore Therapies</Link>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Detail({ label, value, highlight }: { label: string; value: string; highlight?: "success" | "info" }) {
  const tone =
    highlight === "success"
      ? "text-emerald-accent"
      : highlight === "info"
      ? "text-primary"
      : "text-foreground";
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-sm font-semibold ${tone}`}>{value}</dd>
    </div>
  );
}

function invoiceHtml(o: LastOrder) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Invoice ${o.order_number ?? o.id}</title>
<style>body{font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:32px auto;padding:0 24px;color:#111}
h1{color:#0d9488;margin:0} .box{border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-top:20px}
table{width:100%;border-collapse:collapse;margin-top:8px} td{padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px}
.total{font-weight:700;font-size:18px;color:#0d9488}</style></head>
<body><h1>Sanjeevani Clinic Private Limited</h1>
<p style="color:#64748b;margin:4px 0">Kirari, Delhi · +91 77019 86188</p>
<div class="box"><h2 style="margin:0 0 8px 0">Booking Invoice</h2>
<table>
<tr><td>Order No.</td><td style="text-align:right"><b>${o.order_number ?? o.id}</b></td></tr>
<tr><td>Customer</td><td style="text-align:right">${o.customer_name}</td></tr>
<tr><td>Therapy</td><td style="text-align:right">${o.therapy_titles}</td></tr>
<tr><td>Date / Time</td><td style="text-align:right">${o.preferred_date} · ${o.preferred_time}</td></tr>
<tr><td>Payment</td><td style="text-align:right">${o.payment_status}</td></tr>
<tr><td>Status</td><td style="text-align:right">${o.appointment_status}</td></tr>
<tr><td class="total">Total (INR)</td><td class="total" style="text-align:right">₹${o.total_amount.toLocaleString("en-IN")}</td></tr>
</table></div>
<p style="color:#64748b;font-size:12px;margin-top:24px">Thank you for choosing Sanjeevani Clinic. This is a system-generated invoice.</p>
</body></html>`;
}
