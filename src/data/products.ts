export type ProductCategorySlug = "physiotherapy";

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
  hindiDescription: string;
  highlights: string[];
  benefits: string[];
  duration?: string;
  homeVisit?: boolean;
};

export const PRODUCT_IMAGE_FALLBACK = "/photos/placeholder.svg";

export const CATEGORIES: { slug: ProductCategorySlug; label: string; description: string; image: string }[] = [
  {
    slug: "physiotherapy",
    label: "Sanjeevani Physiotherapy Services",
    description:
      "Evidence-based physiotherapy services, traditional cupping and computerised traction therapies performed in-clinic and at home.",
    image: "/photos/cupping-back-real.jpg",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "ecg-test",
    title: "ECG (Electrocardiogram)",
    category: "physiotherapy",
    categoryLabel: "Diagnostic Services",
    price: 250,
    image: "/photos/ai-ecg-test.jpg",
    shortDescription: "Quick heart rhythm test — reports the same day.",
    description:
      "A 12-lead Electrocardiogram (ECG) records the electrical activity of your heart to detect arrhythmias, blocks, ischemia and other cardiac conditions. Painless, non-invasive and completed in a few minutes at Sanjeevani Clinic.",
    hindiDescription:
      "ईसीजी टेस्ट से हृदय की धड़कन और विद्युत गतिविधि की जाँच होती है। सीने में दर्द, घबराहट, हाई बीपी या दिल की बीमारी की स्क्रीनिंग के लिए ज़रूरी। दर्द रहित और कुछ ही मिनटों में पूरा।",
    highlights: ["12-lead digital ECG", "Same-day report", "Painless & non-invasive", "Doctor review included"],
    benefits: [
      "Detects arrhythmias and heart blocks",
      "Screens for heart attack risk",
      "Useful before surgery and health check-ups",
      "Quick 5-minute procedure",
    ],
    duration: "5 min",
    homeVisit: true,
  },
  {
    slug: "ift-therapy",
    title: "I.F.T. Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 300,
    image: "/photos/ai-ift-therapy.jpg",
    shortDescription: "Interferential Therapy for deep pain relief in muscles and joints.",
    description:
      "Interferential Therapy (IFT) uses medium-frequency electrical currents to reach deep tissues, blocking pain signals and relaxing muscle spasms. Excellent for chronic back, shoulder and joint pain.",
    hindiDescription:
      "आई.एफ.टी. थेरेपी में मध्यम-आवृत्ति की विद्युत तरंगें गहरे ऊतकों तक पहुँचकर दर्द और मांसपेशियों की जकड़न को कम करती हैं। पीठ, कंधे और जोड़ों के पुराने दर्द में बहुत लाभकारी।",
    highlights: ["Deep tissue pain relief", "Reduces muscle spasm", "Non-invasive & safe", "Trained physiotherapist"],
    benefits: [
      "Relieves chronic back & joint pain",
      "Improves blood circulation",
      "Reduces inflammation and swelling",
      "Speeds up muscle recovery",
    ],
    duration: "20 min",
    homeVisit: true,
  },
  {
    slug: "tens-therapy",
    title: "TENS Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 250,
    image: "/photos/ai-tens-therapy.jpg",
    shortDescription: "Transcutaneous Electrical Nerve Stimulation for nerve and muscle pain.",
    description:
      "TENS delivers gentle low-voltage electrical impulses through skin electrodes to relieve acute and chronic pain. Ideal for cervical pain, sciatica, arthritis and post-injury recovery.",
    hindiDescription:
      "टेन्स थेरेपी में त्वचा पर लगे इलेक्ट्रोड के माध्यम से हल्की विद्युत तरंगें नसों को शांत करती हैं। गर्दन दर्द, साइटिका और अर्थराइटिस में तुरंत आराम देती है।",
    highlights: ["Instant pain relief", "Safe & drug-free", "Adjustable intensity", "Sterile pads used"],
    benefits: [
      "Quick relief from nerve pain",
      "Reduces dependency on pain-killers",
      "Improves nerve function",
      "Helps in post-surgery recovery",
    ],
    duration: "20 min",
    homeVisit: true,
  },
  {
    slug: "cupping-therapy",
    title: "Cupping Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 400,
    image: "/photos/cupping-back-real.jpg",
    shortDescription: "Traditional dry cupping to release muscle tension and improve circulation.",
    description:
      "Dry cupping uses gentle suction over knots and tight muscles to lift fascia, boost local circulation and speed recovery. Excellent for shoulder, back and neck stiffness.",
    hindiDescription:
      "कपिंग थेरेपी में विशेष कप द्वारा त्वचा पर हल्का वैक्यूम बनाकर मांसपेशियों की जकड़न खोली जाती है। कंधे, पीठ और गर्दन के दर्द में तुरंत राहत।",
    highlights: ["Sterile single-use cups", "Trained therapist", "30-minute session", "Immediate relief"],
    benefits: [
      "Releases muscle knots",
      "Improves blood & lymph flow",
      "Detoxifies tissues",
      "Reduces stiffness and stress",
    ],
    duration: "30 min",
    homeVisit: true,
  },
  {
    slug: "fire-cupping-therapy",
    title: "Fire Cupping Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 450,
    image: "/photos/ai-fire-cupping.jpg",
    shortDescription: "Classical fire-cupping for deeper muscular release and detox.",
    description:
      "Fire cupping applies traditional heat-based suction that goes deeper than dry cupping — recommended for chronic back pain, sciatica and post-exercise recovery.",
    hindiDescription:
      "फायर कपिंग में आग की गर्मी से बना वैक्यूम गहरी मांसपेशियों तक असर करता है। पुराने पीठ दर्द, साइटिका और थकान में विशेष रूप से लाभकारी।",
    highlights: ["Deeper suction", "Chronic pain relief", "Improved circulation", "Trained cupping expert"],
    benefits: [
      "Deep muscle relaxation",
      "Effective in chronic pain",
      "Boosts immunity",
      "Enhances energy levels",
    ],
    duration: "35 min",
    homeVisit: true,
  },
  {
    slug: "paraffin-wax-therapy",
    title: "Paraffin Wax Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 350,
    image: "/photos/paraffin-wax-hand.jpg",
    shortDescription: "Warm paraffin wax dip for joint pain, arthritis and stiff hands.",
    description:
      "Paraffin wax therapy warms and softens joints of the hands, wrists and feet — highly effective for arthritis, rheumatoid pain and post-fracture stiffness.",
    hindiDescription:
      "पैराफिन वैक्स थेरेपी में गर्म वैक्स से हाथ-पैरों के जोड़ों को सेंका जाता है। गठिया, अर्थराइटिस और फ्रैक्चर के बाद की जकड़न में बहुत आराम मिलता है।",
    highlights: ["Deep heat therapy", "Arthritis relief", "Soft skin & joints", "Trained therapist"],
    benefits: [
      "Eases arthritis pain",
      "Loosens stiff joints",
      "Improves skin texture",
      "Increases joint flexibility",
    ],
    duration: "25 min",
    homeVisit: true,
  },
  {
    slug: "body-massage-therapy",
    title: "Body Massage Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 999,
    oldPrice: 1499,
    onSale: true,
    image: "/photos/massage-back-real.jpg",
    shortDescription: "Full-body therapeutic massage with warm herbal oils.",
    description:
      "A relaxing yet therapeutic full-body oil massage designed to relieve stress, ease muscle stiffness and improve sleep. One of our best-selling therapies.",
    hindiDescription:
      "पूरे शरीर की मालिश गर्म हर्बल तेलों से की जाती है, जो तनाव, थकान और मांसपेशियों की जकड़न को दूर करती है और नींद बेहतर बनाती है।",
    highlights: ["60-minute full-body", "Warm herbal oils", "Relieves stress & pain", "Best value combo"],
    benefits: [
      "Complete body relaxation",
      "Relieves muscle fatigue",
      "Improves sleep quality",
      "Boosts overall wellness",
    ],
    duration: "60 min",
    homeVisit: true,
  },
  {
    slug: "body-relaxation-foot-massage",
    title: "Body Relaxation & Foot Massage",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 500,
    image: "/photos/ai-foot-massage.jpg",
    shortDescription: "Reflexology-based foot & body relaxation for stress relief.",
    description:
      "Combines gentle body relaxation with focused foot reflexology to calm the nervous system, ease headaches and improve sleep quality.",
    hindiDescription:
      "पैरों की रिफ्लेक्सोलॉजी और शरीर की हल्की मालिश से नसें शांत होती हैं, सिरदर्द कम होता है और नींद अच्छी आती है।",
    highlights: ["Reflexology techniques", "Stress relief", "Improved sleep", "Gentle & safe"],
    benefits: [
      "Relieves fatigue and stress",
      "Improves blood circulation",
      "Reduces headaches",
      "Calms the mind",
    ],
    duration: "40 min",
    homeVisit: true,
  },
  {
    slug: "cupping-hijama-therapy",
    title: "Cupping Hijama Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 600,
    image: "/photos/ai-hijama.jpg",
    shortDescription: "Sunnah-style hijama (wet cupping) by certified practitioner.",
    description:
      "Traditional wet cupping (hijama) performed with strict sterile technique — helpful for chronic pain, migraines and detoxification. Performed by a certified hijama practitioner.",
    hindiDescription:
      "हिजामा (वेट कपिंग) प्रमाणित विशेषज्ञ द्वारा पूर्ण सफाई के साथ की जाती है। पुराने दर्द, माइग्रेन और शरीर की सफाई में लाभकारी।",
    highlights: ["Certified hijama expert", "Fully sterile setup", "Migraine & pain relief", "Male & female slots"],
    benefits: [
      "Detoxifies the body",
      "Relieves chronic pain",
      "Helps in migraine and BP",
      "Boosts immunity",
    ],
    duration: "45 min",
    homeVisit: true,
  },
  {
    slug: "digital-cervical-therapy",
    title: "Cervical Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 500,
    image: "/photos/ai-cervical-machine.jpg",
    shortDescription: "Computerised cervical traction for neck pain and spondylosis.",
    description:
      "Computerised cervical traction gently stretches the neck to decompress discs and nerves — highly effective for cervical spondylosis, disc bulge and chronic neck pain.",
    hindiDescription:
      "सर्वाइकल थेरेपी में मशीन द्वारा गर्दन का नियंत्रित खिंचाव किया जाता है, जिससे सर्वाइकल स्पॉन्डिलाइटिस, डिस्क समस्या और गर्दन दर्द में आराम मिलता है।",
    highlights: ["Computerised traction", "Cervical spondylosis relief", "Disc decompression", "Trained physio"],
    benefits: [
      "Reduces neck and shoulder pain",
      "Relieves numbness in arms",
      "Improves posture",
      "Decompresses cervical discs",
    ],
    duration: "20 min",
    homeVisit: false,
  },
  {
    slug: "digital-lumbar-therapy",
    title: "Lumbar Therapy",
    category: "physiotherapy",
    categoryLabel: "Therapy Services",
    price: 500,
    image: "/photos/ai-lumbar-machine.jpg",
    shortDescription: "Computerised lumbar traction for back pain and sciatica.",
    description:
      "Computerised lumbar traction relieves pressure on lower spine discs and nerves — proven for lumbar spondylosis, slipped disc, and sciatica pain.",
    hindiDescription:
      "लम्बर थेरेपी में मशीन द्वारा कमर का खिंचाव किया जाता है, जिससे स्लिप डिस्क, साइटिका और कमर दर्द में उत्तम लाभ मिलता है।",
    highlights: ["Computerised traction", "Sciatica relief", "Disc decompression", "Trained physio"],
    benefits: [
      "Relieves lower back pain",
      "Eases sciatica & leg pain",
      "Improves spine flexibility",
      "Non-surgical relief",
    ],
    duration: "20 min",
    homeVisit: false,
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
