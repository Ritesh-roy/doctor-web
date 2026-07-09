import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Lock, Wallet, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useStore } from "@/lib/store";
import { formatINR } from "@/data/products";
import {
  isValidName,
  isValidPhone,
  isValidEmail,
  isFutureOrToday,
  sanitizeNameInput,
  sanitizePhoneInput,
  todayISO,
} from "@/lib/validators";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Sanjeevani Clinic" },
      { name: "description", content: "Complete your Sanjeevani Clinic booking securely." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
});

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"cod" | "upi" | "card">("cod");
  const [placing, setPlacing] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const minDate = todayISO();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidName(name)) return toast.error("Name may only contain letters and spaces");
    if (!isValidPhone(mobile)) return toast.error("Enter a valid mobile number");
    if (email && !isValidEmail(email)) return toast.error("Enter a valid email");
    if (!isFutureOrToday(date)) return toast.error("Choose today or a future date");
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 800));
    clearCart();
    navigate({ to: "/thank-you" });
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
      <PageHero eyebrow="Checkout" title="Complete your booking" intro="Confirm your details and preferred slot to finish." crumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

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
                <Field label="Address (for home visit)" full><textarea rows={2} maxLength={300} className="w-full rounded-2xl border border-primary/15 bg-background p-3 text-sm" /></Field>
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
                  <select required className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-3 text-sm">
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
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <PayOption id="cod" active={payment === "cod"} onSelect={setPayment} icon={<Wallet className="h-5 w-5" />} label="Pay at clinic" sub="Cash / card on visit" />
                <PayOption id="upi" active={payment === "upi"} onSelect={setPayment} icon={<CreditCard className="h-5 w-5" />} label="UPI" sub="GPay, PhonePe, Paytm" />
                <PayOption id="card" active={payment === "card"} onSelect={setPayment} icon={<Lock className="h-5 w-5" />} label="Card" sub="Debit / Credit" />
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-emerald-accent" /> Secured & encrypted. We never store card details.</p>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground">Order summary</h3>
            <div className="mt-4 space-y-3 border-b border-primary/10 pb-4">
              {cartItems.map((i) => (
                <div key={i.slug} className="flex items-center gap-3">
                  <img src={i.product.image} alt={i.product.title} className="h-14 w-14 rounded-xl object-cover" />
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
              <div className="mt-3 flex justify-between border-t border-primary/10 pt-3 text-base"><span className="font-semibold">Total</span><span className="font-display text-xl font-bold text-foreground">{formatINR(cartTotal)}</span></div>
            </div>
            <button disabled={placing} type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-70">
              {placing ? "Placing order…" : "Place Order"}
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

function PayOption({ id, active, onSelect, icon, label, sub }: { id: "cod" | "upi" | "card"; active: boolean; onSelect: (v: "cod" | "upi" | "card") => void; icon: React.ReactNode; label: string; sub: string }) {
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
