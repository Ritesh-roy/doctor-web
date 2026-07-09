import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useStore } from "@/lib/store";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [
      { title: "Your Cart — Sanjeevani Clinic" },
      { name: "description", content: "Review the services in your Sanjeevani Clinic cart before checkout." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
});

function Cart() {
  const { cartItems, cartTotal, updateQty, removeFromCart, clearCart } = useStore();

  return (
    <SiteLayout>
      <PageHero eyebrow="Cart" title="Your cart" intro="Review your selected services before you check out." crumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]} />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-card">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
              <ShoppingCart className="h-7 w-7" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Browse services to add items to your cart.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Browse Shop</Link>
              <Link to="/services" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">All Services</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-3xl border border-primary/10 bg-white p-4 shadow-card sm:p-6">
              <div className="hidden grid-cols-[80px_1fr_120px_100px_40px] items-center gap-4 border-b border-primary/10 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
                <div className="col-span-2">Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Subtotal</div>
                <div />
              </div>
              <div className="divide-y divide-primary/10">
                {cartItems.map((item) => (
                  <div key={item.slug} className="grid grid-cols-[80px_1fr] items-center gap-4 py-4 sm:grid-cols-[80px_1fr_120px_100px_40px]">
                    <img src={item.product.image} alt={item.product.title} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">{item.product.categoryLabel}</div>
                      <Link to="/product/$slug" params={{ slug: item.slug }} className="font-display text-base font-semibold text-foreground hover:text-primary">
                        {item.product.title}
                      </Link>
                      <div className="mt-1 text-sm text-muted-foreground">{formatINR(item.product.price)}</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:justify-center">
                      <div className="inline-flex items-center rounded-full border border-primary/15">
                        <button onClick={() => updateQty(item.slug, item.qty - 1)} className="grid h-9 w-9 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.slug, item.qty + 1)} className="grid h-9 w-9 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="text-right font-semibold text-foreground sm:hidden">{formatINR(item.product.price * item.qty)}</div>
                    </div>
                    <div className="hidden text-right font-semibold text-foreground sm:block">{formatINR(item.product.price * item.qty)}</div>
                    <button onClick={() => removeFromCart(item.slug)} aria-label="Remove" className="hidden justify-self-end text-muted-foreground hover:text-destructive sm:block">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-3">
                <button onClick={clearCart} className="text-xs font-semibold text-muted-foreground hover:text-destructive">Clear cart</button>
                <Link to="/shop" className="text-xs font-semibold text-primary">Continue shopping</Link>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl font-semibold text-foreground">Order summary</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatINR(cartTotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Booking fee</span><span className="font-semibold">Free</span></div>
                <div className="flex justify-between border-t border-primary/10 pt-3 text-base"><span className="font-semibold">Total</span><span className="font-display text-xl font-bold text-foreground">{formatINR(cartTotal)}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-glow">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">You will confirm slot & payment on the next step.</p>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
