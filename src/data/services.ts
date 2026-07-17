// The 10 therapies actively offered at Sanjeevani Clinlc Pvt. Ltd..
// Real clinic photos are used wherever available; AI/reference fallbacks
// only fill in for therapies without a matching uploaded photo.

const IMG = {
  cupping: "/photos/cupping-back-real.jpg",
  fireCupping: "/photos/ai-fire-cupping.jpg",
  hijama: "/photos/ai-hijama.jpg",
  massage: "/photos/massage-back-real.jpg",
  footMassage: "/photos/ai-yoga-massage.jpg",
  paraffin: "/photos/paraffin-wax-hand.jpg",
  paraffinFoot: "/photos/paraffin-wax-foot.jpg",
  knee: "/photos/knee-pain-real.jpg",
  ift: "/photos/team-back-blue.jpg",
  tens: "/photos/doctor-desk-4.jpg",
  cervical: "/photos/ai-cervical-machine.jpg",
  lumbar: "/photos/ai-lumbar-machine.jpg",
};

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
  price?: number;
  duration?: string;
  benefits: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "ift-therapy",
    title: "I.F.T Therapy (Interferential)",
    short: "Interferential current therapy for deep muscle & joint pain relief.",
    description:
      "I.F.T (Interferential Therapy) uses two medium-frequency currents to reach deep muscle and joint tissue — reducing chronic pain, easing muscle spasm and speeding recovery. Ideal for arthritis, sciatica, back and shoulder pain.",
    image: IMG.ift,
    icon: "activity",
    price: 300,
    duration: "20 min",
    benefits: [
      "Deep-tissue pain relief without medication",
      "Reduces muscle spasm and inflammation",
      "Great for arthritis, sciatica, back pain",
      "Comfortable, drug-free treatment",
    ],
    process: [
      { step: "Assessment", detail: "Doctor evaluates the pain area and mobility." },
      { step: "Electrode placement", detail: "Sterile electrodes are placed on the target site." },
      { step: "Therapy", detail: "Gentle interferential current is applied for 15–20 minutes." },
      { step: "Reassess", detail: "Pain and mobility are re-checked; home advice given." },
    ],
    faqs: [
      { q: "Is I.F.T painful?", a: "No — it feels like a mild tingling sensation and is fully drug-free." },
      { q: "How many sessions do I need?", a: "Most patients feel relief within 5–8 sessions." },
    ],
  },
  {
    slug: "tens-therapy",
    title: "TENS Therapy",
    short: "Transcutaneous Electrical Nerve Stimulation for fast pain relief.",
    description:
      "TENS delivers low-voltage electrical pulses through skin electrodes to block pain signals and stimulate endorphin release — a proven non-drug approach for chronic back, neck, joint and post-injury pain.",
    image: IMG.tens,
    icon: "activity",
    price: 300,
    duration: "20 min",
    benefits: [
      "Immediate short-term pain relief",
      "Non-invasive and drug-free",
      "Safe for chronic and post-surgical pain",
      "Improves circulation to affected area",
    ],
    process: [
      { step: "Consult", detail: "Doctor confirms TENS is suitable for your condition." },
      { step: "Setup", detail: "Electrodes are placed near the painful area." },
      { step: "Session", detail: "Controlled pulses are delivered for 15–20 minutes." },
      { step: "Follow-up", detail: "Home-use protocol may be advised for chronic pain." },
    ],
    faqs: [
      { q: "Can I use TENS at home?", a: "After 2–3 clinic sessions, we can guide safe home use." },
      { q: "Any side effects?", a: "TENS is very safe; mild skin redness may occur temporarily." },
    ],
  },
  {
    slug: "cupping-therapy",
    title: "Cupping Therapy (Normal)",
    short: "Traditional dry cupping to release muscle tension and improve circulation.",
    description:
      "Dry cupping uses gentle suction over knots and tight muscles to lift fascia, boost local blood flow and speed recovery. Ideal for shoulder, back and neck stiffness — performed by our trained cupping therapist.",
    image: IMG.cupping,
    icon: "activity",
    price: 300,
    duration: "30 min",
    benefits: [
      "Releases deep muscular tension",
      "Improves local blood circulation",
      "Sterile single-use cups",
      "Immediate relief for stiffness",
    ],
    process: [
      { step: "Assessment", detail: "Therapist identifies tight muscle groups." },
      { step: "Cup placement", detail: "Sterile cups are applied with controlled suction." },
      { step: "Retention", detail: "Cups stay in place for 10–15 minutes." },
      { step: "Aftercare", detail: "Warm compress and hydration advice given." },
    ],
    faqs: [
      { q: "Do the marks last long?", a: "Circular marks typically fade within 3–7 days." },
      { q: "Is cupping safe?", a: "Yes — performed with sterile, single-use cups by trained staff." },
    ],
  },
  {
    slug: "fire-cupping-therapy",
    title: "Fire Cupping Therapy",
    short: "Classical fire-cupping for deeper muscular release and detox.",
    description:
      "Fire cupping applies traditional heat-based suction that goes deeper than dry cupping — recommended for chronic back pain, sciatica and post-exercise recovery.",
    image: IMG.fireCupping,
    icon: "activity",
    price: 450,
    duration: "35 min",
    benefits: [
      "Deeper suction than dry cupping",
      "Effective for chronic pain",
      "Improves circulation and lymph flow",
      "Performed by trained cupping expert",
    ],
    process: [
      { step: "Consult", detail: "Therapist reviews suitability and pain history." },
      { step: "Heat & suction", detail: "Warm cups create a stronger vacuum on the target area." },
      { step: "Retention", detail: "Cups remain for 8–12 minutes for deep release." },
      { step: "Aftercare", detail: "Gentle stretches and hydration recommended." },
    ],
    faqs: [
      { q: "Is fire cupping safe?", a: "Yes — the flame heats the cup, never touches your skin." },
      { q: "How many sessions?", a: "Weekly sessions for 4–6 weeks give best results." },
    ],
  },
  {
    slug: "paraffin-wax-therapy",
    title: "Paraffin Wax Therapy",
    short: "Warm paraffin wax bath for arthritis, stiff joints and dry skin.",
    description:
      "Paraffin Wax Therapy immerses hands, feet or joints in warm therapeutic wax to relieve arthritis pain, ease stiffness and hydrate skin. Excellent for rheumatoid & osteoarthritis, tendonitis and post-fracture stiffness.",
    image: IMG.paraffin,
    icon: "sparkles",
    price: 450,
    duration: "30 min",
    benefits: [
      "Relieves joint stiffness & arthritis pain",
      "Increases blood circulation",
      "Softens and hydrates skin",
      "Reduces muscle spasm around joints",
    ],
    process: [
      { step: "Preparation", detail: "Skin is cleaned and inspected." },
      { step: "Wax dipping", detail: "The affected area is dipped into warm paraffin 8–10 times." },
      { step: "Retention", detail: "The area is wrapped and rested for 15–20 minutes." },
      { step: "Removal", detail: "Wax is peeled off and gentle stretching is done." },
    ],
    faqs: [
      { q: "Is the wax too hot?", a: "The wax is kept at a comfortable, therapeutic 50–52°C." },
      { q: "Good for feet as well?", a: "Yes — excellent for foot arthritis, plantar fasciitis and dry heels." },
    ],
  },
  {
    slug: "body-massage-therapy",
    title: "Body Massage Therapy",
    short: "Full-body therapeutic oil massage for stress, stiffness & better sleep.",
    description:
      "A therapeutic full-body oil massage that combines Swedish and deep-tissue techniques to relieve muscular stress, improve circulation and calm the nervous system.",
    image: IMG.massage,
    icon: "heart",
    price: 1299,
    duration: "60 min",
    benefits: [
      "Full-body stress and stiffness relief",
      "Improves sleep quality",
      "Boosts circulation and lymph drainage",
      "Warm herbal oils used",
    ],
    process: [
      { step: "Consult", detail: "Discuss pressure preference and problem areas." },
      { step: "Warm-up", detail: "Warm oil is applied; light strokes begin the session." },
      { step: "Deep work", detail: "Targeted deep-tissue work on tight areas." },
      { step: "Cool-down", detail: "Gentle strokes and stretches finish the session." },
    ],
    faqs: [
      { q: "Which oils are used?", a: "Warm sesame or medicated herbal oils; nut-free options available." },
      { q: "How often should I take it?", a: "Once every 2–4 weeks is ideal for maintenance." },
    ],
  },
  {
    slug: "foot-massage-therapy",
    title: "Body Relaxation & Foot Massage",
    short: "Relaxing foot & lower-leg massage with reflexology pressure points.",
    description:
      "A calming reflexology-based foot and lower-leg massage that eases fatigue, improves circulation and helps relieve headaches, insomnia and everyday stress.",
    image: IMG.footMassage,
    icon: "heart",
    price: 500,
    duration: "40 min",
    benefits: [
      "Deep relaxation and stress relief",
      "Stimulates reflexology pressure points",
      "Reduces foot & calf swelling",
      "Improves sleep",
    ],
    process: [
      { step: "Foot soak", detail: "Warm herbal foot soak to soften tissue." },
      { step: "Reflexology", detail: "Pressure applied to targeted reflex points." },
      { step: "Massage", detail: "Deep massage of calves, ankles and feet." },
      { step: "Finish", detail: "Warm towel wrap and aftercare tips." },
    ],
    faqs: [
      { q: "Good for diabetics?", a: "Yes — with gentle pressure. Please inform the therapist." },
      { q: "Any side effects?", a: "None — it is a fully relaxing, non-invasive treatment." },
    ],
  },
  {
    slug: "hijama-therapy",
    title: "Cupping Hijama Therapy",
    short: "Sunnah-style hijama (wet cupping) performed by certified practitioner.",
    description:
      "Traditional wet cupping (hijama) performed with strict sterile technique — beneficial for chronic pain, migraines, high uric acid and general detoxification. Performed by a certified hijama practitioner using single-use blades and cups.",
    image: IMG.hijama,
    icon: "heart",
    price: 1000,
    duration: "45 min",
    benefits: [
      "Certified hijama practitioner",
      "Fully sterile, single-use equipment",
      "Helps migraines, chronic pain, high uric acid",
      "Male & female slots available",
    ],
    process: [
      { step: "Consult", detail: "Detailed history & suitability check." },
      { step: "Dry cupping", detail: "Initial suction to prepare the area." },
      { step: "Wet cupping", detail: "Small superficial incisions with sterile blade + suction." },
      { step: "Aftercare", detail: "Site is cleaned, dressed and aftercare advice given." },
    ],
    faqs: [
      { q: "Is hijama safe?", a: "Yes — when performed with sterile, single-use equipment by a trained practitioner." },
      { q: "How often?", a: "Once every 2–3 months for maintenance; more frequent for chronic conditions." },
    ],
  },
  {
    slug: "digital-cervical-therapy",
    title: "Cervical Therapy",
    short: "Computerised cervical traction therapy for neck pain.",
    description:
      "Cervical Therapy uses computerised traction and combined electro-therapy to relieve cervical spondylosis, disc issues, pinched nerves and chronic neck pain — with precise, patient-controlled intensity.",
    image: IMG.cervical,
    icon: "stethoscope",
    price: 400,
    duration: "25 min",
    benefits: [
      "Relief from cervical spondylosis & neck stiffness",
      "Reduces nerve compression",
      "Precise, computerised intensity",
      "Drug-free treatment",
    ],
    process: [
      { step: "X-ray review", detail: "Any prior imaging is reviewed by the doctor." },
      { step: "Setup", detail: "Cervical harness & traction unit are calibrated to your comfort." },
      { step: "Therapy", detail: "Gentle intermittent traction for 15–20 minutes." },
      { step: "Post-therapy", detail: "Ergonomic and exercise guidance provided." },
    ],
    faqs: [
      { q: "Is traction painful?", a: "No — traction is gradual and always within your comfort limit." },
      { q: "How many sessions?", a: "Typically 8–12 sessions over 3–4 weeks." },
    ],
  },
  {
    slug: "digital-lumbar-therapy",
    title: "Lumbar Therapy",
    short: "Computerised lumbar traction for back pain, sciatica & disc issues.",
    description:
      "Lumbar Therapy uses precise computer-controlled traction to decompress the lumbar spine — highly effective for lower back pain, sciatica, disc bulge and lumbar spondylosis.",
    image: IMG.lumbar,
    icon: "stethoscope",
    price: 400,
    duration: "25 min",
    benefits: [
      "Effective for sciatica & disc bulge",
      "Decompresses lumbar spine safely",
      "Computerised, patient-controlled intensity",
      "Drug-free, non-surgical",
    ],
    process: [
      { step: "Assessment", detail: "Doctor reviews back-pain history and any MRI/X-ray." },
      { step: "Positioning", detail: "You are secured on the lumbar traction unit." },
      { step: "Therapy", detail: "Controlled intermittent traction for 15–20 minutes." },
      { step: "Post-care", detail: "Core-strengthening exercises are advised." },
    ],
    faqs: [
      { q: "Safe for disc bulge?", a: "Yes — traction is carefully calibrated for disc conditions." },
      { q: "How soon can I feel results?", a: "Most patients notice improvement within 4–6 sessions." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
