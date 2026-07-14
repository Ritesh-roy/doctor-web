import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreditCard, Lock, Wallet, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useStore } from "@/lib/store";
import { formatINR, PRODUCT_IMAGE_FALLBACK } from "@/data/products";
import { useAuth } from "@/lib/auth";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/razorpay.functions";
import {
  isValidName,
  isValidPhone,
  isValidEmail,
  isFutureOrToday,
  sanitizeNameInput,
  sanitizePhoneInput,
  todayISO,
} from "@/lib/validators";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (x: unknown) => void) => void };
  }
}

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_SCRIPT;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Sanjeevani Clinic" },
      { name: "description", content: "Complete your Sanjeevani Clinic booking securely with Razorpay." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
});

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useStore();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"cod" | "razorpay">("razorpay");
  const [placing, setPlacing] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const minDate = todayISO();

  useEffect(() => {
    loadRazorpay();
  }, []);

  if (!loading && !user) {
    return (
      <SiteLayout>
        <PageHero eyebrow="Checkout" title="Please sign in to complete your booking." crumbs={[{ label: "Home", to: "/" }, { label: "Checkout" }]} />
        <section className="mx-auto max-w-2xl px-4 pb-24 text-center sm:px-6">
          <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
            <p className="text-sm text-muted-foreground">You need an account to place an order. Your cart is safe — sign in and come right back.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/login" className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5">Sign in</Link>
              <Link to="/signup" className="inline-flex h-11 items-center rounded-full border border-primary/20 px-6 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-soft/60">Create account</Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const persistLastOrder = (order: {
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
  }) => {
    try {
      sessionStorage.setItem("sanjeevani.lastOrder", JSON.stringify(order));
    } catch {
      /* ignore storage errors */
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidName(name)) return toast.error("Name may only contain letters and spaces");
    if (!isValidPhone(mobile)) return toast.error("Enter a valid mobile number");
    if (email && !isValidEmail(email)) return toast.error("Enter a valid email");
    if (!date || !isFutureOrToday(date)) return toast.error("Choose today or a future date");
    if (!time) return toast.error("Please pick a preferred time slot");
    if (cartItems.length === 0) return toast.error("Your cart is empty");

    setPlacing(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: userData } = await supabase.auth.getUser();

      const therapyTitles = cartItems.map((i) => `${i.product.title} × ${i.qty}`).join(", ");

      const { data: inserted, error: insertErr } = await supabase
        .from("orders")
        .insert({
          user_id: userData.user?.id ?? null,
          customer_name: name.trim(),
          phone: mobile.trim(),
          email: email.trim() || null,
          address: address.trim() || null,
          preferred_date: date,
          preferred_time: time,
          items: cartItems.map((i) => ({ slug: i.slug, title: i.product.title, price: i.product.price, qty: i.qty })),
          total_amount: cartTotal,
          payment_method: payment,
          therapy_titles: therapyTitles,
          status: "pending",
        })
        .select("id, order_number")
        .single();

      if (insertErr || !inserted) throw insertErr ?? new Error("Could not create order");

      // ------- COD flow -------
      if (payment === "cod") {
        await supabase.from("orders").update({ status: "confirmed_cod" }).eq("id", inserted.id);
        persistLastOrder({
          order_number: inserted.order_number,
          id: inserted.id,
          customer_name: name.trim(),
          therapy_titles: therapyTitles,
          total_amount: cartTotal,
          payment_status: "Pay at clinic",
          payment_method: "cod",
          appointment_status: "Awaiting confirmation call",
          preferred_date: date,
          preferred_time: time,
        });
        clearCart();
        toast.success("Booking confirmed! We'll call you soon.");
        navigate({ to: "/thank-you" });
        return;
      }

      // ------- Razorpay flow -------
      const ready = await loadRazorpay();
      if (!ready || !window.Razorpay) {
        throw new Error("Payment gateway failed to load. Please check your internet and try again.");
      }

      const rzpOrder = await createRazorpayOrder({
        data: { orderDbId: inserted.id, amount: Math.round(cartTotal), currency: "INR" },
      });

      await new Promise<void>((resolve, reject) => {
        const options = {
          key: rzpOrder.keyId,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          order_id: rzpOrder.orderId,
          name: "Sanjeevani Clinic",
          description: therapyTitles.slice(0, 80),
          prefill: { name: name.trim(), email: email.trim() || undefined, contact: mobile.trim() },
          notes: { orderDbId: inserted.id },
          theme: { color: "#0d9488" },
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled")),
          },
          handler: async (response: RazorpayResponse) => {
            try {
              await verifyRazorpayPayment({
                data: {
                  orderDbId: inserted.id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              });
              persistLastOrder({
                order_number: inserted.order_number,
                id: inserted.id,
                customer_name: name.trim(),
                therapy_titles: therapyTitles,
                total_amount: cartTotal,
                payment_status: "Paid (Razorpay)",
                payment_method: "razorpay",
                appointment_status: "Confirmed — team will call to schedule",
                preferred_date: date,
                preferred_time: time,
              });
              clearCart();
              toast.success("Payment successful!");
              navigate({ to: "/thank-you" });
              resolve();
            } catch (err) {
              reject(err instanceof Error ? err : new Error("Verification failed"));
            }
          },
        };
        const rzp = new window.Razorpay!(options);
        rzp.on("payment.failed", (resp: unknown) => {
          console.error("Razorpay payment failed", resp);
          reject(new Error("Payment failed. Please try again."));
        });
        rzp.open();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not place order";
      if (msg !== "Payment cancelled") toast.error(msg);
      else toast("Payment cancelled");
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <SiteLayout>
        <PageHero eyebrow="Checkout" title="Nothing to check out yet" crumbs={[{ label: "Home", to: "/" }, { label: "Checkout" }]} />
        <section className="mx-auto max-w-2xl px-4 pb-24 text-center">
          <p className="text-muted-foreground">Add services to your cart to proceed.</p>
          <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">Browse Shop</Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Checkout" title="Complete your booking" intro="Confirm your details, pick a slot and pay securely with Razorpay." crumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Patient details</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(sanitizeNameInput(e.target.value))}
                    pattern="[A-Za-z][A-Za-z\s.'\-]{1,79}"
                    title="Letters and spaces only"
                    autoComplete="name"
                    className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm"
                  />
                </Field>
                <Field label="Mobile" required>
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    value={mobile}
                    onChange={(e) => setMobile(sanitizePhoneInput(e.target.value))}
                    pattern="\+?\d{10,15}"
                    title="10–15 digits, digits only"
                    placeholder="+91"
                    autoComplete="tel"
                    className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm"
                  />
                </Field>
                <Field label="Age"><input type="number" min={1} max={120} className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm" /></Field>
                <Field label="Address (for home visit)" full><textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} maxLength={300} className="w-full rounded-2xl border border-primary/15 bg-background p-3 text-sm" /></Field>
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Preferred slot</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Date" required>
                  <input
                    required
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm"
                  />
                </Field>
                <Field label="Time" required>
                  <select required value={time} onChange={(e) => setTime(e.target.value)} className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-3 text-sm">
                    <option value="">Select…</option>
                    <option>9:00 – 11:00 AM</option>
                    <option>11:00 AM – 1:00 PM</option>
                    <option>5:00 – 7:00 PM</option>
                    <option>7:00 – 9:00 PM</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Payment method</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <PayOption id="razorpay" active={payment === "razorpay"} onSelect={setPayment} icon={<CreditCard className="h-5 w-5" />} label="Pay Online (Razorpay)" sub="UPI, Cards, NetBanking, Wallets" />
                <PayOption id="cod" active={payment === "cod"} onSelect={setPayment} icon={<Wallet className="h-5 w-5" />} label="Pay at clinic" sub="Cash / card on visit" />
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-emerald-accent" /> 100% secure. Payments handled by Razorpay — we never store card details.</p>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground">Order summary</h3>
            <div className="mt-4 space-y-3 border-b border-primary/10 pb-4">
              {cartItems.map((i) => (
                <div key={i.slug} className="flex items-center gap-3">
                  <img
                    src={i.product.image}
                    alt={i.product.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                    }}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{i.product.title}</div>
                    <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                  </div>
                  <div className="text-sm font-semibold">{formatINR(i.product.price * i.qty)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatINR(cartTotal)} />
              <Row label="Booking fee" value="Free" />
              <Row label="GST" value="Included" />
              <div className="mt-3 flex justify-between border-t border-primary/10 pt-3 text-base"><span className="font-semibold">Total (INR)</span><span className="font-display text-xl font-bold text-foreground">{formatINR(cartTotal)}</span></div>
            </div>
            <button
              disabled={placing}
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-70"
            >
              {placing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  {payment === "razorpay" ? `Pay ${formatINR(cartTotal)} Securely` : "Confirm Booking"}
                </>
              )}
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">By placing this order you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.</p>
          </aside>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, required, children, full }: { label: string; required?: boolean; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block font-medium text-foreground/85">{label}{required && <span className="text-emerald-accent"> *</span>}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></div>;
}

function PayOption({ id, active, onSelect, icon, label, sub }: { id: "cod" | "razorpay"; active: boolean; onSelect: (v: "cod" | "razorpay") => void; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`flex flex-col gap-1 rounded-2xl border p-4 text-left transition-colors ${
        active ? "border-primary bg-primary-soft/60" : "border-primary/15 hover:border-primary/30"
      }`}
    >
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-sm font-semibold text-foreground">{label}</span></div>
      <span className="text-xs text-muted-foreground">{sub}</span>
    </button>
  );
}
