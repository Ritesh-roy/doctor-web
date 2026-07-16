import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Eye, Users, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/free-eye-checkup")({
  component: FreeEyeCheckup,
  head: () => ({
    meta: [
      { title: "Free Eye Check-up Campaign — Sanjeevani Clinc Pvt. Ltd., Kirari" },
      {
        name: "description",
        content:
          "Join Sanjeevani Clinc Pvt. Ltd.'s free eye check-up campaign in Kirari, Delhi — vision test, refraction, cataract and diabetic retinopathy screening at no cost.",
      },
      { name: "keywords", content: "free eye checkup Kirari, free eye camp Delhi, cataract screening, diabetic retinopathy Sanjeevani Clinc Pvt. Ltd." },
      { property: "og:title", content: "Free Eye Check-up Campaign — Sanjeevani Clinc Pvt. Ltd." },
      { property: "og:description", content: "Free vision test, cataract & diabetic retinopathy screening for the community." },
      { property: "og:url", content: "/free-eye-checkup" },
    ],
    links: [{ rel: "canonical", href: "/free-eye-checkup" }],
  }),
});

const includes = [
  { icon: Eye, title: "Full vision test", body: "Distance, near and refraction check with the latest chart-based methods." },
  { icon: Sparkles, title: "Cataract screening", body: "Slit-lamp examination for early cataract signs, with clear guidance." },
  { icon: Users, title: "Diabetic retinopathy", body: "Fundus screening for diabetic patients to prevent vision loss." },
  { icon: Calendar, title: "Doctor consult", body: "Personal review with our physician and, if needed, referral to a trusted eye surgeon." },
];

function FreeEyeCheckup() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Community Campaign"
        title="Free Eye Check-up for our Kirari community."
        intro="A full eye examination — completely free — for residents of Karan Vihar, Kirari, Nithari and nearby areas. Because vision should never be a luxury."
        crumbs={[{ label: "Home", to: "/" }, { label: "Free Eye Check-up" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/book-appointment" className="inline-flex h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Register Now</Link>
          <a href="https://wa.me/918853515351?text=I%20want%20to%20register%20for%20the%20free%20eye%20checkup" className="inline-flex h-12 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-foreground">Register on WhatsApp</a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl text-foreground">What is included</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Every registered patient receives the following, at no charge and with no obligation.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map((h) => (
            <div key={h.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <h.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner title="Book your free slot today" subtitle="Limited slots each day — walk-ins welcome, but registration guarantees your turn." />
    </SiteLayout>
  );
}
