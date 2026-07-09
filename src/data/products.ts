export type ProductCategorySlug =
  | "physiotherapy"
  | "diognostick"
  | "radiologist"
  | "eye-treatment"
  | "medical";

export type Product = {
  slug: string;
  title: string;
  category: ProductCategorySlug;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  onSale?: boolean;
  rating?: number;
  image: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  duration?: string;
  homeVisit?: boolean;
};

const IMG = {
  physioCategory: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  diagnosticsCategory: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&w=900&q=80",
  radiologyCategory: "https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?auto=format&fit=crop&w=900&q=80",
  eyeCategory: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
  medicalCategory: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  essentialBlood: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  advanceBlood: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=900&q=80",
  premiumBlood: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=900&q=80",
  superPremiumBlood: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80",
  cupping: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
  fireCupping: "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=900&q=80",
  fitness: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  massage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
  hijama: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
  jaanuVasti: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
  katiVasti: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=80",
  yogaMassage: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80",
  ctScan: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=900&q=80",
  mri: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  xray: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?auto=format&fit=crop&w=900&q=80",
  eyeCheckup: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80",
  lensReplace: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80",
  ecg: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=900&q=80",
};

export const PRODUCT_IMAGE_FALLBACK = IMG.medicalCategory;

export const CATEGORIES: { slug: ProductCategorySlug; label: string; description: string; image: string }[] = [
  {
    slug: "physiotherapy",
    label: "Physiotherapy",
    description: "Cupping, hijama, massage, kati-vasti and fitness therapy delivered by trained therapists.",
    image: IMG.physioCategory,
  },
  {
    slug: "diognostick",
    label: "Diagnostics",
    description: "Essential to super-premium blood profiles processed in-house with same-day reports.",
    image: IMG.diagnosticsCategory,
  },
  {
    slug: "radiologist",
    label: "Radiologist",
    description: "X-Ray, CT scan and MRI booked and coordinated through trusted radiology partners.",
    image: IMG.radiologyCategory,
  },
  {
    slug: "eye-treatment",
    label: "Eye Treatment",
    description: "Comprehensive eye check-ups, lens replacement and vision screening for the whole family.",
    image: IMG.eyeCategory,
  },
  {
    slug: "medical",
    label: "General Medical",
    description: "ECG, vitals and general OPD checkups by our resident doctor.",
    image: IMG.medicalCategory,
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "essential-blood-test",
    title: "Blood Test (Essential)",
    category: "diognostick",
    categoryLabel: "Diagnostics",
    price: 999,
    oldPrice: 1499,
    onSale: true,
    image: IMG.essentialBlood,
    shortDescription: "Essential blood profile covering CBC, sugar, lipid & liver markers.",
    description:
      "Our Essential Blood Test bundles the most commonly needed markers — Complete Blood Count (CBC), Fasting Blood Sugar, Lipid Profile, Kidney & Liver Function — into a single low-cost package. Reports are shared digitally the same day and reviewed with you by the doctor.",
    highlights: ["Same-day digital report", "Fasting sample from 9:00 AM", "Reviewed by doctor", "Home collection available"],
    duration: "15 min sampling",
    homeVisit: true,
  },
  {
    slug: "blood-testadvance",
    title: "Blood Test (Advance)",
    category: "diognostick",
    categoryLabel: "Diagnostics",
    price: 1699,
    oldPrice: 2499,
    onSale: true,
    image: IMG.advanceBlood,
    shortDescription: "Advance profile with thyroid, HbA1c, vitamin D & B12 panels.",
    description:
      "The Advance package adds Thyroid Profile, HbA1c, Vitamin D and Vitamin B12 to every essential marker — ideal for a yearly deep-dive or if you have fatigue, weight change or metabolic concerns.",
    highlights: ["50+ parameters", "Thyroid + HbA1c included", "Vitamin D & B12", "Digital PDF report"],
    duration: "15 min sampling",
    homeVisit: true,
  },
  {
    slug: "premium",
    title: "Premium (Profile 2.3)",
    category: "diognostick",
    categoryLabel: "Diagnostics",
    price: 1999,
    oldPrice: 2999,
    onSale: true,
    image: IMG.premiumBlood,
    shortDescription: "Premium 70+ parameter profile with hormonal & cardiac markers.",
    description:
      "A deep 70+ parameter panel including full thyroid, iron studies, cardiac risk markers, electrolytes and inflammation indicators — perfect for anyone over 35 or with a family history of chronic disease.",
    highlights: ["70+ parameters", "Cardiac risk markers", "Iron studies", "Detailed doctor consult"],
    duration: "20 min sampling",
    homeVisit: true,
  },
  {
    slug: "super-premium-blood-test-87-test",
    title: "Super Premium (Blood Test) – 87 Test",
    category: "diognostick",
    categoryLabel: "Diagnostics",
    price: 2499,
    oldPrice: 3999,
    onSale: true,
    image: IMG.superPremiumBlood,
    shortDescription: "Comprehensive 87-parameter yearly master health package.",
    description:
      "The Super Premium package covers 87 parameters across metabolic, cardiac, hepatic, renal, thyroid, inflammatory, vitamin and mineral markers. Includes a detailed consultation to interpret every result.",
    highlights: ["87 parameters", "Full hormonal panel", "Vitamins & minerals", "30-min doctor review"],
    duration: "25 min sampling",
    homeVisit: true,
  },
  {
    slug: "cupping-therapy",
    title: "Cupping Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 400,
    image: IMG.cupping,
    shortDescription: "Traditional dry cupping to release muscle tension and improve circulation.",
    description:
      "Dry cupping uses gentle suction over knots and tight muscles to lift fascia, boost local circulation and speed recovery. Ideal for shoulder, back and neck stiffness.",
    highlights: ["Sterile single-use cups", "Trained therapist", "30-minute session", "Immediate relief"],
    duration: "30 min",
  },
  {
    slug: "fire-cupping-therapy",
    title: "Fire Cupping Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 450,
    image: IMG.fireCupping,
    shortDescription: "Classical fire-cupping for deeper muscular release and detox.",
    description:
      "Fire cupping applies traditional heat-based suction that goes deeper than dry cupping — recommended for chronic back pain, sciatica and post-exercise recovery.",
    highlights: ["Deeper suction", "Chronic pain relief", "Improved circulation", "Trained cupping expert"],
    duration: "35 min",
  },
  {
    slug: "fitness-therapy",
    title: "Fitness Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 300,
    image: IMG.fitness,
    shortDescription: "Guided rehab exercises for posture, mobility and strength.",
    description:
      "One-on-one fitness therapy sessions to correct posture, strengthen core and rehabilitate injuries. Every session includes a home exercise plan.",
    highlights: ["Personal exercise plan", "Posture correction", "Injury rehab", "Home programme"],
    duration: "45 min",
  },
  {
    slug: "full-body-combo",
    title: "Full Body Massage Combo",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 999,
    oldPrice: 2100,
    onSale: true,
    image: IMG.massage,
    shortDescription: "Full-body relaxation and therapeutic massage combo — save over 50%.",
    description:
      "A relaxing yet therapeutic full-body oil massage combined with warm compress — designed to relieve stress, ease muscle stiffness and improve sleep. Best-selling combo.",
    highlights: ["60-minute full-body", "Warm herbal oils", "Relieves stress & pain", "Best value combo"],
    duration: "60 min",
  },
  {
    slug: "hijama-cupping-therapy",
    title: "Hijama Cupping Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 600,
    image: IMG.hijama,
    shortDescription: "Sunnah-style hijama (wet cupping) by certified practitioner.",
    description:
      "Traditional wet cupping (hijama) performed with strict sterile technique — helpful for chronic pain, migraines and detoxification. Performed by a certified hijama practitioner.",
    highlights: ["Certified hijama expert", "Fully sterile setup", "Migraine & pain relief", "Male & female slots"],
    duration: "45 min",
  },
  {
    slug: "jaanu-vasti-therapy",
    title: "Jaanu Vasti Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 500,
    image: IMG.jaanuVasti,
    shortDescription: "Ayurvedic knee therapy for stiffness, arthritis and knee pain.",
    description:
      "Jaanu Vasti pools warm medicated oil around the knee joint to reduce inflammation, lubricate cartilage and relieve chronic knee pain — a proven Ayurvedic therapy.",
    highlights: ["Warm medicated oil", "Knee arthritis relief", "Ayurvedic therapist", "Course of 5–7 sittings recommended"],
    duration: "40 min",
  },
  {
    slug: "kati-vasti-therapy",
    title: "Kati Vasti Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 500,
    image: IMG.katiVasti,
    shortDescription: "Ayurvedic lower-back therapy for sciatica, spondylosis and back pain.",
    description:
      "Kati Vasti retains warm medicated oil over the lumbar spine to soothe muscles, decompress nerves and reduce lower-back pain. Excellent for sciatica and lumbar spondylosis.",
    highlights: ["Lower-back & sciatica", "Warm herbal oil", "Ayurvedic therapist", "Course pricing available"],
    duration: "40 min",
  },
  {
    slug: "yoga-massage-therapy",
    title: "Yoga Massage Therapy",
    category: "physiotherapy",
    categoryLabel: "Physiotherapy",
    price: 400,
    image: IMG.yogaMassage,
    shortDescription: "Assisted yoga stretches with therapeutic massage for full-body mobility.",
    description:
      "A blend of assisted yoga stretches and deep-tissue massage that improves flexibility, releases tight fascia and calms the nervous system.",
    highlights: ["Assisted stretching", "Deep-tissue release", "Improved flexibility", "45-minute session"],
    duration: "45 min",
  },
  {
    slug: "c-t-scan-test",
    title: "C-T Scan Test",
    category: "radiologist",
    categoryLabel: "Radiologist",
    price: 2500,
    image: IMG.ctScan,
    shortDescription: "CT scan booking with trusted radiology partners.",
    description:
      "We coordinate CT scan bookings with senior radiologists at partner imaging centres — with clear preparation instructions, appointment reminders and doctor review of your report.",
    highlights: ["Partner imaging centre", "Senior radiologist", "Report review by doctor", "Home report delivery"],
  },
  {
    slug: "mri-magnetic-resonance-imaging",
    title: "MRI (Magnetic Resonance Imaging)",
    category: "radiologist",
    categoryLabel: "Radiologist",
    price: 3500,
    oldPrice: 7000,
    onSale: true,
    image: IMG.mri,
    shortDescription: "MRI booking at 50% off — via partner radiology centres.",
    description:
      "High-resolution MRI at partner centres at a specially negotiated rate for Sanjeevani patients. Includes booking coordination, doctor's referral and post-report consultation.",
    highlights: ["50% off partner rate", "High-resolution scan", "Referral & booking help", "Doctor report review"],
  },
  {
    slug: "x-ray-test",
    title: "X-Ray Test",
    category: "radiologist",
    categoryLabel: "Radiologist",
    price: 400,
    image: IMG.xray,
    shortDescription: "Digital X-Ray with low radiation dose and same-day report.",
    description:
      "Digital X-Ray imaging with low-dose exposure. Reports are typically ready the same day and reviewed with you by our doctor.",
    highlights: ["Low radiation dose", "Digital plates", "Same-day report", "Doctor interpretation"],
    duration: "15 min",
  },
  {
    slug: "eye-cheackup",
    title: "Eye Checkup",
    category: "eye-treatment",
    categoryLabel: "Eye Treatment",
    price: 1,
    image: IMG.eyeCheckup,
    shortDescription: "Comprehensive eye examination — currently free (₹1 nominal charge).",
    description:
      "Comprehensive eye examination: visual acuity, refraction, pressure check and fundus review. Currently offered at a nominal ₹1 booking charge as part of our community outreach.",
    highlights: ["Full refraction", "Pressure check", "Fundus review", "Child-friendly"],
    duration: "30 min",
  },
  {
    slug: "lens-replace-on-glasses",
    title: "Lens Replace on Glasses",
    category: "eye-treatment",
    categoryLabel: "Eye Treatment",
    price: 500,
    image: IMG.lensReplace,
    shortDescription: "Replace lenses on existing frames — quick and accurate.",
    description:
      "Get new prescription lenses fitted into your existing frames. Includes free power check and 15-day comfort guarantee.",
    highlights: ["Existing frame welcome", "Free power check", "15-day comfort guarantee", "Multiple lens options"],
  },
  {
    slug: "ecg",
    title: "ECG Checkup",
    category: "medical",
    categoryLabel: "General Medical",
    price: 300,
    rating: 5,
    image: IMG.ecg,
    shortDescription: "12-lead ECG with instant tracing and doctor review.",
    description:
      "Quick 12-lead ECG with instant tracing and immediate review by our doctor. Rated 5.0 by patients.",
    highlights: ["12-lead tracing", "Instant results", "Doctor review", "Walk-in available"],
    duration: "10 min",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productsByCategory(slug: ProductCategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: n % 1 === 0 ? 0 : 2 })}`;
}
