import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Star, Quote } from "lucide-react";
import { CLINIC } from "@/data/clinic";

export const Route = createFileRoute("/testimonials")({
  component: Testimonials,
  head: () => ({
    meta: [
      { title: "Reviews — Sanjeevani Clinc Private Limited, Kirari" },
      { name: "description", content: "What Kirari families say about Sanjeevani Clinc Private Limited and Dr. B.P. Singh." },
      { property: "og:title", content: "Patient Reviews — Sanjeevani Clinc Private Limited" },
      { property: "og:description", content: "Real feedback from our patients." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
});

const REVIEWS = [
  { n: "Priya Sharma", t: "Dr. Singh takes real time to listen. My father's BP is finally under control, and I never feel rushed here." },
  { n: "Rahul Kumar", t: "Clean clinic, quick reports, honest advice. Easily the best in Karan Vihar." },
  { n: "Anita Mehra", t: "Physiotherapy sessions helped me walk pain-free after 6 months of knee trouble. Very grateful." },
  { n: "Suresh Yadav", t: "Booked a full-body check-up for my parents. The doctor explained every value patiently." },
  { n: "Neha Gupta", t: "My little one is very anxious with doctors, but Dr. Singh has a way of making children comfortable." },
  { n: "Mohit Verma", t: "Went for a persistent cough. Got the right tests, the right medicines and no unnecessary prescriptions." },
  { n: "Kavita Rani", t: "The staff is polite, the waiting area is calm and reports came the same day. Highly recommend." },
  { n: "Ajay Singh", t: "For my chronic back pain, physiotherapy at Sanjeevani has been the only thing that truly worked." },
  { n: "Ritu Chauhan", t: "Warm, ethical, competent. Everything a family clinic should be." },
];

function Testimonials() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow={`${CLINIC.rating}★ on Google · ${CLINIC.reviewCount}+ reviews`}
        title="What our patients say."
        intro="Real feedback from real families across Kirari and Delhi."
        crumbs={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.n} className="flex h-full flex-col rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="flex items-center gap-1 text-emerald-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <Quote className="mt-4 h-6 w-6 text-primary/40" />
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{r.t}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-primary/10 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft font-semibold text-primary">{r.n[0]}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.n}</div>
                  <div className="text-xs text-muted-foreground">Verified Google review</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
