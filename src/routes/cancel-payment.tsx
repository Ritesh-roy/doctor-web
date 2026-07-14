import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/cancel-payment")({
  component: CancelPayment,
  head: () => ({
    meta: [
      { title: "Payment Cancelled — Sanjeevani Clinic" },
      { name: "description", content: "Your payment for the Sanjeevani Clinic service was cancelled and no amount has been charged." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/cancel-payment" },
    ],
    links: [{ rel: "canonical", href: "/cancel-payment" }],
  }),
});

function CancelPayment() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Payment Cancelled" title="Your payment was not completed." intro="No amount has been charged to your account. You can try again anytime." crumbs={[{ label: "Home", to: "/" }, { label: "Payment Cancelled" }]} />
      <section className="mx-auto max-w-2xl px-4 pb-24 text-center sm:px-6">
        <p className="text-muted-foreground">
          If money was deducted, it will be automatically refunded by your bank within 5–7 working days. For any concerns, please contact us at{" "}
          <a href="tel:+917701986188" className="font-semibold text-primary">+91 77019 86188</a>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Try Again</Link>
          <Link to="/contact" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Contact Support</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
