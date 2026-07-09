import servicePhysio from "@/assets/service-physio.jpg";
import serviceRadiology from "@/assets/service-radiology.jpg";
import serviceEye from "@/assets/service-eye.jpg";
import serviceGeneral from "@/assets/service-general.jpg";
import serviceCheckup from "@/assets/service-checkup.jpg";

const serviceBloodTest = "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&w=1200&q=80";
const servicePathology = "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=80";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  icon:
    | "activity"
    | "microscope"
    | "sparkles"
    | "eye"
    | "stethoscope"
    | "heart";
  benefits: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "physiotherapy",
    title: "Physiotherapy & Rehabilitation",
    short:
      "Personalised recovery for back pain, joint issues, sports injuries and post-op mobility.",
    description:
      "Our physiotherapy programme combines hands-on manual therapy, therapeutic exercise and modern modalities to restore movement, reduce pain and prevent recurrence. Sessions are one-to-one, unhurried and progress with you.",
    image: servicePhysio,
    icon: "activity",
    benefits: [
      "Relief from chronic back, neck and joint pain",
      "Faster recovery after surgery or injury",
      "Improved posture, balance and mobility",
      "Sports and workplace injury rehab",
    ],
    process: [
      { step: "Assessment", detail: "Detailed movement and pain assessment with the doctor." },
      { step: "Personal plan", detail: "A weekly plan of therapy, exercises and goals is drawn up." },
      { step: "Guided sessions", detail: "Supervised sessions using ultrasound, TENS, IFT and hands-on therapy." },
      { step: "Home programme", detail: "Simple exercises and lifestyle changes to keep results lasting." },
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Most patients feel meaningful relief within 6–10 sessions; chronic cases may need longer." },
      { q: "Do I need a referral?", a: "No. You can book directly. If you have prior reports, please bring them." },
    ],
  },
  {
    slug: "blood-test",
    title: "Blood Test & Sample Collection",
    short: "Accurate blood work with same-day reports and optional home collection.",
    description:
      "From routine CBC and lipid profiles to specialised hormonal, diabetic and thyroid panels, our in-house pathology unit delivers accurate blood test reports quickly — with trained phlebotomists, low-discomfort sampling and clear pre-test guidance.",
    image: serviceBloodTest,
    icon: "microscope",
    benefits: [
      "Same-day reports for most common blood tests",
      "Optional home sample collection in Kirari and nearby areas",
      "Digital reports on WhatsApp and email",
      "Reviewed personally by the doctor",
    ],
    process: [
      { step: "Book", detail: "Walk-in or call to schedule your fasting slot." },
      { step: "Collection", detail: "Sample taken by a trained phlebotomist at the clinic or your home." },
      { step: "Testing", detail: "Processed in-house on calibrated analysers." },
      { step: "Report", detail: "Digital report shared, then reviewed with you." },
    ],
    faqs: [
      { q: "Do I need to fast before a blood test?", a: "Fasting is required for sugar, lipid and some liver tests — usually 8 to 12 hours." },
      { q: "How quickly will I receive the report?", a: "Most reports are ready the same day; specialised tests may take 24 to 72 hours." },
    ],
  },
  {
    slug: "diagnostics",
    title: "Diagnostic & Pathology",
    short: "In-house pathology and blood work with rapid, accurate reports.",
    description:
      "From routine blood tests to specialised panels, our in-house lab delivers timely, accurate reports so treatment never has to wait. Samples are collected in a clean, comfortable environment with clear pre-test guidance.",
    image: servicePathology,
    icon: "microscope",
    benefits: [
      "Same-day reports for most common tests",
      "Trained phlebotomists, low-discomfort sampling",
      "Digital reports on WhatsApp and email",
      "Home sample collection on request",
    ],
    process: [
      { step: "Consult", detail: "The doctor recommends only the tests you truly need." },
      { step: "Sampling", detail: "Quick, careful sample collection at the clinic or your home." },
      { step: "Analysis", detail: "Processed in-house with certified equipment." },
      { step: "Review", detail: "Reports reviewed with you and next steps explained clearly." },
    ],
    faqs: [
      { q: "Do you offer fasting tests early morning?", a: "Yes, collection starts at 9:00 AM daily." },
      { q: "Will I get a soft copy?", a: "Yes, digital PDF reports are shared on WhatsApp/email." },
    ],
  },
  {
    slug: "radiology",
    title: "Radiology & Imaging",
    short: "Modern ultrasound, X-ray and CT scan support for precise diagnosis.",
    description:
      "Advanced imaging with experienced radiographers helps us reach clear diagnoses fast — with minimal exposure, careful positioning and dignified care throughout your visit.",
    image: serviceRadiology,
    icon: "sparkles",
    benefits: [
      "Digital X-ray with low radiation dose",
      "High-resolution ultrasound for OBG & abdominal studies",
      "Coordinated CT scan support",
      "Reports read by senior radiologists",
    ],
    process: [
      { step: "Booking", detail: "Slot booked based on your test and preparation needed." },
      { step: "Scan", detail: "Trained radiographers perform the scan with clear guidance." },
      { step: "Reporting", detail: "Findings interpreted and delivered digitally." },
      { step: "Follow-up", detail: "Doctor explains results and plans further care." },
    ],
    faqs: [
      { q: "Is fasting required for ultrasound?", a: "For abdominal scans, 6 hours of fasting is usually advised." },
      { q: "How soon are reports ready?", a: "X-ray reports are typically available the same day." },
    ],
  },
  {
    slug: "eye-checkup",
    title: "Eye Check-up & Care",
    short: "Comprehensive eye examinations, refraction and screening for common conditions.",
    description:
      "A relaxed, thorough eye examination for adults and children — visual acuity, refraction, pressure check and retina screening — to catch problems early and prescribe accurately.",
    image: serviceEye,
    icon: "eye",
    benefits: [
      "Accurate power check for spectacles/lenses",
      "Screening for cataract, glaucoma and diabetic retinopathy",
      "Child-friendly examinations",
      "Referral to trusted eye surgeons when needed",
    ],
    process: [
      { step: "History", detail: "Understanding your symptoms, lifestyle and screen time." },
      { step: "Vision test", detail: "Chart-based and refractive assessment." },
      { step: "Detailed exam", detail: "Anterior segment and fundus evaluation." },
      { step: "Advice", detail: "Prescription, lifestyle guidance or specialist referral." },
    ],
    faqs: [
      { q: "How often should I check my eyes?", a: "Once a year for adults; every 6 months if you are diabetic or wear glasses." },
      { q: "Do you dispense spectacles here?", a: "We prescribe; you can use any optician of your choice." },
    ],
  },
  {
    slug: "general-medicine",
    title: "General Medicine & Consultations",
    short: "Everyday care for fever, infections, lifestyle diseases and family health.",
    description:
      "OPD consultations with unhurried listening and honest advice. From acute infections to long-term care for diabetes, hypertension and thyroid issues — we treat you like family.",
    image: serviceGeneral,
    icon: "stethoscope",
    benefits: [
      "Detailed history and honest, ethical advice",
      "Chronic disease management (BP, sugar, thyroid)",
      "Fewer, smarter prescriptions",
      "Coordinated referrals when required",
    ],
    process: [
      { step: "Consult", detail: "Walk-in or book a slot for a focused conversation." },
      { step: "Examine", detail: "Careful clinical examination and vitals." },
      { step: "Investigate", detail: "Only necessary tests suggested." },
      { step: "Plan", detail: "Clear treatment plan and follow-up." },
    ],
    faqs: [
      { q: "Do you accept walk-ins?", a: "Yes, walk-ins are welcome during clinic hours." },
      { q: "Do you do home visits?", a: "For select cases in the neighbourhood — please call ahead." },
    ],
  },
  {
    slug: "health-checkup",
    title: "Preventive Health Check-ups",
    short: "Curated packages to catch problems early and stay ahead of lifestyle disease.",
    description:
      "Sensible check-up packages designed for every stage of life — for professionals, women, seniors and children — with clear explanation of what each test means for you.",
    image: serviceCheckup,
    icon: "heart",
    benefits: [
      "Age and gender-appropriate packages",
      "Combined lab + physician consult",
      "Explanations in plain language",
      "Personalised lifestyle plan",
    ],
    process: [
      { step: "Choose", detail: "Pick a package or let us recommend one." },
      { step: "Fast & test", detail: "Morning fasting sample and vitals." },
      { step: "Consult", detail: "Doctor reviews results with you in detail." },
      { step: "Plan", detail: "Diet, exercise and follow-up plan for the year." },
    ],
    faqs: [
      { q: "How long does a full check-up take?", a: "About 60–90 minutes at the clinic." },
      { q: "Are family packages available?", a: "Yes — we offer combined pricing for couples and families." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
