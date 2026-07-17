// The 10 therapies actively offered at Sanjeevani Clinic Pvt. Ltd..
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
  tens: "/photos/ai-tens-therapy.jpg",
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
  ...([
    ["family-physician","Family Physician","stethoscope","Trusted family doctor for all ages — from children to seniors.","Comprehensive family medicine at Sanjeevani Clinic Pvt. Ltd. — routine consultations, chronic disease care, vaccinations and lifestyle advice for the whole family.","/photos/clinic-front.jpg",500,"20 min"],
    ["general-opd","General OPD Consultation","stethoscope","Walk-in OPD for fever, cough, infections, pain and everyday illnesses.","Doctor-led OPD consultation for common acute and chronic issues, with clear diagnosis, honest treatment plans and prescriptions.","/photos/clinic-front.jpg",300,"15 min"],
    ["diagnostic-lab","Diagnostic Lab","microscope","Full-service in-house diagnostic lab with doctor-guided reporting.","NABL-standard sample handling, quick turnaround and interpretation of every report by our doctors before it reaches you.","/photos/ai-radiology.jpg",undefined,"Same-day"],
    ["blood-sample-collection","Blood Sample Collection","microscope","Trained phlebotomists — quick, painless sample collection at the clinic.","Sterile, single-use collection with proper labelling and lab transport chain — for accurate, reliable results.","/photos/ai-radiology.jpg",undefined,"10 min"],
    ["home-blood-sample-collection","Home Blood Sample Collection","microscope","Home sample pickup across Kirari & nearby areas — book by phone or WhatsApp.","Our phlebotomist visits your home at a scheduled slot, collects samples hygienically and delivers reports digitally.","/photos/ai-radiology.jpg",150,"15 min at home"],
    ["complete-blood-test","Complete Blood Test","microscope","Full blood work-up — CBC, sugar, lipids, LFT, KFT and more.","One combined package covering the most useful screening tests, ideal for annual check-ups and general wellness reviews.","/photos/ai-radiology.jpg",1200,"Report in 24 hrs"],
    ["cbc-test","CBC Test","microscope","Complete Blood Count — screens for anaemia, infection & basic health.","Measures haemoglobin, WBC, platelets and RBC indices — a foundational test for most consultations.","/photos/ai-radiology.jpg",250,"Report same day"],
    ["blood-sugar-test","Blood Sugar Test","microscope","Fasting, PP and random blood sugar tests for diabetes screening.","Quick, reliable glucose testing with doctor interpretation — essential for early detection and diabetes management.","/photos/ai-radiology.jpg",100,"Report in 2 hrs"],
    ["hba1c-test","HbA1c Test","microscope","3-month average blood sugar — the gold-standard for diabetes control.","Measures glycated haemoglobin to assess how well diabetes has been controlled over the past 90 days.","/photos/ai-radiology.jpg",450,"Report in 24 hrs"],
    ["thyroid-profile","Thyroid Profile (TSH, T3, T4)","microscope","Complete thyroid function panel with doctor review.","Screens hypothyroid and hyperthyroid conditions — key for fatigue, weight change, hair fall and menstrual issues.","/photos/ai-radiology.jpg",550,"Report in 24 hrs"],
    ["lipid-profile","Lipid Profile","microscope","Cholesterol, triglycerides, HDL & LDL — heart risk assessment.","Full cholesterol panel to assess cardiac risk and guide lifestyle & medication decisions.","/photos/ai-radiology.jpg",500,"Report in 24 hrs"],
    ["liver-function-test","Liver Function Test (LFT)","microscope","LFT panel — SGOT, SGPT, bilirubin, alkaline phosphatase.","Detailed liver health check for fatty liver, hepatitis, jaundice or medication monitoring.","/photos/ai-radiology.jpg",600,"Report in 24 hrs"],
    ["kidney-function-test","Kidney Function Test (KFT)","microscope","KFT — urea, creatinine, uric acid and electrolytes.","Assesses kidney health, useful in diabetes, hypertension and general screening.","/photos/ai-radiology.jpg",600,"Report in 24 hrs"],
    ["urine-test","Urine Test","microscope","Urine routine & microscopy for infections and kidney health.","Screens UTI, kidney disorders, diabetes and other conditions with quick same-day reporting.","/photos/ai-radiology.jpg",150,"Report same day"],
    ["stool-test","Stool Test","microscope","Stool routine, microscopy and occult blood testing.","Useful for digestive complaints, infections, parasites and screening for bowel-related issues.","/photos/ai-radiology.jpg",200,"Report in 24 hrs"],
    ["vitamin-b12-test","Vitamin B12 Test","microscope","B12 level check for fatigue, tingling and mood issues.","B12 deficiency is common and easily treatable — this test guides supplementation and diet advice.","/photos/ai-radiology.jpg",700,"Report in 24 hrs"],
    ["vitamin-d-test","Vitamin D Test","microscope","Vitamin D level check — bone, immunity and mood support.","Widespread deficiency in Indian adults — this test guides safe supplementation and sunlight advice.","/photos/ai-radiology.jpg",900,"Report in 24 hrs"],
    ["ecg","ECG","heart","On-site ECG for chest pain, palpitations and cardiac screening.","12-lead ECG performed in-clinic with immediate doctor review.","/photos/ai-cervical-machine.jpg",250,"10 min"],
    ["digital-xray","Digital X-Ray","microscope","High-resolution digital X-ray coordinated in-clinic.","Fast, low-radiation digital imaging for bone, chest and joint issues, with quick report turnaround.","/photos/ai-xray.jpg",undefined,"Report same day"],
    ["ultrasound-usg","Ultrasound (USG)","microscope","USG scans coordinated in-clinic — abdominal, pelvic and more.","Safe, non-invasive imaging performed by qualified radiologists, coordinated through our clinic.","/photos/ai-radiology.jpg",undefined,"Report in 24 hrs"],
    ["radiology-services","Radiology Services","microscope","X-Ray, USG, CT and MRI coordination — one point of contact.","End-to-end imaging coordination — we help you book the right scan and read the report with you.","/photos/ai-ct-scan.jpg",undefined,"Varies"],
    ["eye-care-services","Eye Care Services","eye","Full-spectrum eye care — check-up, refraction and specialist referrals.","Sanjeevani Eye Services covers routine eye check-ups, cataract screening, refraction and referrals to trusted specialists.","/photos/ai-lens-replace.jpg",undefined,"Varies"],
    ["eye-checkup","Eye Check-up","eye","Comprehensive eye examination for adults & children.","Vision test, refraction, external eye exam and pressure check where indicated — a complete eye health review.","/photos/ai-lens-replace.jpg",300,"20 min"],
    ["vision-screening","Vision Screening","eye","Quick vision screening for schools, offices & seniors.","Ideal for annual screening and to catch early refractive errors, especially in children and elderly.","/photos/ai-lens-replace.jpg",150,"10 min"],
    ["cataract-screening","Cataract Screening","eye","Early cataract screening and specialist referral if needed.","We identify early cataract changes and coordinate onward care with trusted ophthalmic surgeons.","/photos/ai-lens-replace.jpg",300,"15 min"],
    ["physiotherapy","Physiotherapy","activity","Doctor-led physiotherapy for pain, mobility and rehabilitation.","Full physiotherapy service — assessment, hands-on treatment, electrotherapy and rehab exercises tailored to you.","/photos/massage-back-real.jpg",400,"30 min"],
    ["home-physiotherapy","Home Physiotherapy","activity","Physiotherapy at home — for seniors, post-surgery & bedridden patients.","Our trained physiotherapist visits you at home with portable equipment — ideal when travel to clinic is difficult.","/photos/ai-tens-therapy.jpg",600,"45 min at home",true],
    ["neck-pain-treatment","Neck Pain Treatment","activity","Focused treatment for cervical pain, spondylosis and stiffness.","Combination of cervical traction, IFT/TENS, manual therapy and posture correction advice.","/photos/ai-cervical-therapy.jpg",400,"30 min"],
    ["back-pain-treatment","Back Pain Treatment","activity","Structured programme for chronic and acute back pain.","Assessment, lumbar traction, electrotherapy and a home-exercise plan for long-term relief.","/photos/ai-lumbar-therapy.jpg",400,"30 min"],
    ["knee-pain-treatment","Knee Pain Treatment","activity","Knee rehab for arthritis, injury and post-surgery recovery.","Pain relief modalities plus targeted strengthening for quadriceps and joint stability.","/photos/knee-pain-real.jpg",400,"30 min"],
    ["joint-pain-treatment","Joint Pain Treatment","activity","Care for shoulder, hip, elbow and ankle joint pain.","Combines electrotherapy, mobilisation and exercise — with clear at-home advice.","/photos/ai-body-massage.jpg",400,"30 min"],
    ["sports-injury-rehab","Sports Injury Rehabilitation","activity","Structured rehab for sprains, strains and post-injury recovery.","Progressive rehab programme to restore strength, range of motion and return-to-sport confidence.","/photos/ai-ift-therapy.jpg",500,"40 min"],
    ["pain-management","Pain Management","stethoscope","Multidisciplinary pain care — medical, physio and lifestyle.","We combine medical review, physiotherapy and lifestyle changes for chronic pain — not just symptom relief.","/photos/ai-tens-therapy.jpg",undefined,"Programme"],
    ["senior-citizen-care","Senior Citizen Care","heart","Gentle, patient care for elders — home visits & regular check-ins.","Regular BP/sugar reviews, medication adjustments, physiotherapy and family counselling for seniors.","/photos/services-generated/service-40.jpg",undefined,"Programme",true],
    ["health-checkup-packages","Health Check-up Packages","microscope","Curated annual health packages for men, women and seniors.","Age-appropriate combinations of lab tests, ECG and doctor consultation — priced fairly and explained clearly.","/photos/ai-radiology.jpg",undefined,"2 hrs"],
    ["preventive-health-checkup","Preventive Health Check-up","heart","Yearly preventive review — catch issues before they become problems.","Focused on early detection of diabetes, cholesterol, BP, thyroid and lifestyle risk factors.","/photos/ai-body-massage.jpg",undefined,"Yearly"],
    ["health-camps","Health Camps","heart","Community health camps at schools, offices and RWAs.","We regularly organise BP, sugar, eye and general check-up camps in Kirari and nearby areas.","/photos/clinic-front.jpg",undefined,"By arrangement"],
    ["home-visit-consultation","Home Visit Consultation","stethoscope","Doctor home visit for bedridden, elderly or emergency reviews.","On-request doctor visit at home — assessment, prescription and coordination with clinic for follow-up.","/photos/family-with-doctor.jpg",800,"30 min at home",true],
  ] as const).map(([slug,title,icon,short,description,image,price,duration,homeVisit]) => ({
    slug,
    title,
    short,
    description,
    image,
    icon: icon as Service["icon"],
    price: price as number | undefined,
    duration: duration as string | undefined,
    benefits: [
      `Delivered by the Sanjeevani Clinic Pvt. Ltd. team`,
      `Evidence-based, honest and transparent care`,
      `Clear reporting and follow-up guidance`,
      homeVisit ? "Home visit available on request" : "Comfortable, hygienic in-clinic setting",
    ],
    process: [
      { step: "Book", detail: "Call, WhatsApp or use the booking page to schedule your slot." },
      { step: "Assess", detail: "Doctor or trained clinician reviews your history and concerns." },
      { step: "Deliver", detail: `${title} is performed as per standard clinical protocol.` },
      { step: "Follow-up", detail: "Clear next-step advice, prescription or referral if needed." },
    ],
    faqs: [
      { q: "Do I need an appointment?", a: "Walk-ins are welcome, but booking a slot avoids waiting." },
      { q: "Is home service available?", a: homeVisit ? "Yes — home service is available for this on request." : "This service is delivered at the clinic; home visits are available for select services." },
    ],
  })),
];

// Each uploaded photo is assigned to exactly ONE service. Services without
// a matching upload keep their original /photos/ image from the tuple above.
const SERVICE_IMAGES: Record<string, string> = {
  "tens-therapy": "/services-uploads/tens-therapy.jpg",
  "cupping-therapy": "/services-uploads/cupping-therapy.jpg",
  "fire-cupping-therapy": "/services-uploads/fire-cupping.jpg",
  "paraffin-wax-therapy": "/services-uploads/paraffin-wax.jpg",
  "body-massage-therapy": "/services-uploads/body-massage-therapy.jpg",
  "foot-massage-therapy": "/services-uploads/foot-massage.jpg",
  "hijama-therapy": "/services-uploads/hijama-therapy.jpg",
  "digital-cervical-therapy": "/services-uploads/cervical-therapy.jpg",
  "digital-lumbar-therapy": "/services-uploads/lumbar-therapy.jpg",
  "family-physician": "/services-uploads/family-physician.jpg",
  "blood-sample-collection": "/services-uploads/blood-sample-collection.jpg",
  "complete-blood-test": "/services-uploads/complete-blood-test.jpg",
  "cbc-test": "/services-uploads/cbc-test.jpg",
  "blood-sugar-test": "/services-uploads/blood-sugar-test.jpg",
  "hba1c-test": "/services-uploads/hba1c-test.jpg",
  "thyroid-profile": "/services-uploads/thyroid-test.jpg",
  "lipid-profile": "/services-uploads/lipid-profile.jpg",
  "liver-function-test": "/services-uploads/lft-test.jpg",
  "kidney-function-test": "/services-uploads/kft-test.jpg",
  "urine-test": "/services-uploads/urine-test.jpg",
  "stool-test": "/services-uploads/stool-test.jpg",
  "vitamin-d-test": "/services-uploads/vitamin-d-test.jpg",
  "ecg": "/services-uploads/ecg-test.jpg",
  "digital-xray": "/services-uploads/digital-ecg.jpg",
  "ultrasound-usg": "/services-uploads/ultrasound.jpg",
  "eye-care-services": "/services-uploads/eye-care.jpg",
  "eye-checkup": "/services-uploads/eye-checkup.jpg",
  "vision-screening": "/services-uploads/vision-screening.jpg",
  "physiotherapy": "/services-uploads/physiotherapy.jpg",
  "neck-pain-treatment": "/services-uploads/neck-pain.jpg",
  "knee-pain-treatment": "/services-uploads/knee-pain.jpg",
  "joint-pain-treatment": "/services-uploads/joint-pain.jpg",
  "health-camps": "/services-uploads/health-camps.jpg",
};

SERVICES.forEach((service) => {
  if (SERVICE_IMAGES[service.slug]) {
    service.image = SERVICE_IMAGES[service.slug];
  }
});

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
