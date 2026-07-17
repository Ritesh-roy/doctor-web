export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  quote?: string;
};

export type BlogFAQ = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedOn: string;
  author: string;
  cover: string;
  featuredImageAlt: string;
  video?: { src: string; poster?: string; caption?: string };
  intro: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFAQ[];
};


// Website / clinic photos only — no doctor portraits used as blog covers.
// Each blog post gets a unique cover — no repeats.
const IMG = {
  physioHome: "/photos/ai-tens-therapy.jpg",
  fullBodyPhysio: "/photos/massage-back-real.jpg",
  eyeCampaign: "/photos/ai-lens-replace.jpg",
  bloodTest: "/photos/ai-mri.jpg",
  bloodReport: "/photos/ai-xray.jpg",
  eyeCheck: "/photos/ai-ct-scan.jpg",
  diabetes: "/photos/ai-body-massage.jpg",
  bp: "/photos/ai-cervical-therapy.jpg",
  annualCheck: "/photos/ai-radiology.jpg",
  backPain: "/photos/knee-pain-real.jpg",
};


export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "inside-sanjeevani-clinic-video-tour",
    title: "Inside Sanjeevani Clinic — A Short Video Tour of Our Care",
    excerpt:
      "Take a two-minute walk through Sanjeevani Clinic Pvt. Ltd. — our consultation rooms, physiotherapy bay, diagnostic corner and the everyday warmth of our team.",
    category: "Clinic",
    readMinutes: 3,
    publishedOn: "2026-07-17",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: "/photos/clinic-front.jpg",
    featuredImageAlt: "Inside Sanjeevani Clinic Pvt. Ltd. — patient care in progress",
    video: {
      src: "/photos/blog-video.mp4",
      poster: "/photos/clinic-front.jpg",
      caption: "A short walkthrough of Sanjeevani Clinic Pvt. Ltd., Kirari.",
    },
    intro:
      "We often get asked what a visit to Sanjeevani Clinic Pvt. Ltd. actually feels like. Instead of describing it in words, we thought a short video would say it best. Press play below for a quick walk through our clinic — the reception, the consultation rooms, the physiotherapy bay and the small everyday moments of care that define who we are.",
    keyTakeaways: [
      "A quick visual introduction to Sanjeevani Clinic Pvt. Ltd. in Kirari, Delhi.",
      "See our consultation, physiotherapy and diagnostic areas.",
      "Meet the team you will be cared for by.",
    ],
    sections: [
      {
        heading: "Watch: a walk through our clinic",
        paragraphs: [
          "The video above captures a normal day at Sanjeevani Clinic Pvt. Ltd. — no staging, no stock footage. What you see is what you get when you walk in through our doors.",
        ],
      },
      {
        heading: "What we care about",
        paragraphs: [
          "Every corner of the clinic is designed around one idea: unhurried, honest care. From the way we greet families at the front desk to how our physiotherapists structure a session, we optimise for trust — not throughput.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the clinic located?", a: "Karan Vihar, Kirari, Delhi. Full address and directions are on the Contact page." },
      { q: "Do I need an appointment?", a: "Walk-ins are welcome, but booking online guarantees a shorter wait." },
    ],
  },

  {
    slug: "physiotherapy-at-home-rohini-benefits-cost",
    title: "Physiotherapy at Home in Rohini — Top 10 Benefits, Cost & How to Book",
    excerpt:
      "A complete guide to at-home physiotherapy in Rohini and Kirari — benefits, indicative cost, session structure and how to arrange care through Sanjeevani Clinic Pvt. Ltd..",
    category: "Physiotherapy",
    readMinutes: 9,
    publishedOn: "2025-11-10",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.physioHome,
    featuredImageAlt: "Physiotherapist treating a patient at home in Rohini",
    intro:
      "Home physiotherapy has quietly become one of the most requested services at Sanjeevani Clinic Pvt. Ltd.. For elderly patients, post-surgical recovery, stroke rehabilitation and even chronic back or knee pain, a licensed physiotherapist arriving at your doorstep in Rohini or Kirari removes almost every barrier to consistent recovery. This guide walks you through what home physiotherapy actually looks like, when it is the right choice, what it costs in Delhi, and how our team makes each session count.",
    keyTakeaways: [
      "Home physiotherapy is ideal for elderly, post-op and mobility-limited patients.",
      "A typical session in Rohini costs ₹500–₹1,200 depending on complexity and duration.",
      "Consistency matters more than intensity — 3 sessions a week for 4–6 weeks is a common plan.",
      "Every plan at Sanjeevani Clinic Pvt. Ltd. is reviewed by a doctor, not just a therapist.",
    ],
    sections: [
      {
        heading: "Why home physiotherapy makes sense",
        paragraphs: [
          "Getting to a clinic three times a week sounds simple until you actually try it — especially in Delhi traffic, and especially after surgery. For a patient with a healing hip, a fresh stroke or advanced arthritis, every stair and every auto ride is a setback. Home physiotherapy removes those obstacles. The therapist brings the therapy bed, the ultrasound unit, the resistance bands and, most importantly, the plan.",
          "The second advantage is realism. When a therapist watches you move around your actual home — your bed, your bathroom threshold, your kitchen counter height — the exercises they design are the ones you will genuinely do. That is where recovery actually happens.",
        ],
      },
      {
        heading: "10 clear benefits of home physiotherapy",
        list: [
          "No commuting stress — recovery starts the moment you wake up.",
          "One-on-one, undivided attention from the therapist.",
          "Exercises are tailored to your real home environment.",
          "Family members can watch and support the routine.",
          "Lower risk of infection for post-op and immunocompromised patients.",
          "Better adherence — patients skip sessions less often.",
          "Ideal for elderly parents whose mobility is limited.",
          "Faster progress after knee, hip or spine surgery.",
          "Continuous doctor oversight when arranged through Sanjeevani Clinic Pvt. Ltd..",
          "Progress is measurable — the same therapist tracks you week to week.",
        ],
      },
      {
        heading: "Conditions we most commonly treat at home",
        paragraphs: [
          "Our home physiotherapy team routinely handles post-knee-replacement rehab, post-hip-replacement care, stroke recovery, Parkinson's mobility work, frozen shoulder, cervical and lumbar spondylosis, sciatica, sports injuries and paediatric developmental delay. Each case begins with an in-home assessment by the physiotherapist and a call with the supervising doctor before any exercise plan is committed to.",
        ],
      },
      {
        heading: "What a typical home session looks like",
        paragraphs: [
          "Sessions run 45–60 minutes. The therapist begins with vitals and a quick pain check, followed by hands-on manual therapy — soft-tissue release, joint mobilisation, gentle stretching. Modalities like IFT, TENS or ultrasound are used when needed. The final third of the session is active exercise: strength, balance and functional movement. You will always finish with two or three exercises to practise between visits.",
        ],
      },
      {
        heading: "Cost of home physiotherapy in Rohini and Kirari",
        paragraphs: [
          "In our neighbourhood, home physiotherapy in 2026 typically ranges from ₹500 to ₹1,200 per session. The price depends on session length, condition complexity, whether specialised equipment like a portable ultrasound is required, and the distance from the clinic. Post-operative and neuro-rehab cases sit at the higher end because they need a senior therapist and longer sessions.",
          "For most patients we recommend a 4–6 week programme with 3 sessions per week, which places the total spend in the ₹6,000–₹22,000 range depending on the plan. Package pricing brings the per-session cost down.",
        ],
      },
      {
        heading: "How to book with Sanjeevani Clinic Pvt. Ltd.",
        paragraphs: [
          "Booking is a two-step conversation. Call us on +91 11 4701 3018 or WhatsApp us on +91 11 4701 3018 with a short description of the case — age of the patient, condition, any recent surgery, current medications. We schedule a short doctor consultation (in-clinic or over the phone), assign the right therapist and confirm your first home visit within 24–48 hours across Rohini, Kirari, Karan Vihar, Sultanpuri and nearby areas.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is home physiotherapy as effective as clinic physiotherapy?",
        a: "For most orthopaedic and neurological cases, yes — provided the therapist is qualified and the plan is doctor-supervised. Clinic visits are still preferable when advanced modalities like traction or gym-based reconditioning are needed.",
      },
      {
        q: "Do you offer home physiotherapy on weekends?",
        a: "Yes. Our home therapy team operates all seven days, including Sundays and public holidays.",
      },
      {
        q: "Can I get a GST invoice for insurance?",
        a: "Yes. Every session is billed formally and the invoice is emailed to you on the same day.",
      },
    ],
  },
  {
    slug: "full-body-physiotherapy-stress-relief-office-pain",
    title: "Full Body Physiotherapy for Stress Relief and Office Pain",
    excerpt:
      "How targeted full-body physiotherapy relieves everyday desk stress, neck stiffness and lower back pain — and what a typical treatment plan looks like.",
    category: "Physiotherapy",
    readMinutes: 8,
    publishedOn: "2025-10-22",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.fullBodyPhysio,
    featuredImageAlt: "Full body physiotherapy session for stress relief",
    intro:
      "If your neck aches by lunch, your shoulders sit somewhere near your ears by evening and your lower back seizes up when you finally stand — you are not imagining it. Modern desk work quietly compresses the entire spine, tightens the hip flexors and starves the mid-back of movement. Full body physiotherapy is designed to undo all of that in one coordinated programme, not treat one joint at a time.",
    keyTakeaways: [
      "Office pain rarely lives in one spot — it moves along a chain.",
      "A full body plan mixes manual therapy, corrective exercise and posture retraining.",
      "Most patients feel meaningful relief in 4–8 sessions.",
      "Simple daily habits keep the results long after the plan ends.",
    ],
    sections: [
      {
        heading: "Why 'just neck' or 'just back' therapy often fails",
        paragraphs: [
          "The body works as a chain. Tight hip flexors from eight hours of sitting tilt the pelvis, which flattens the lower back, which forces the mid-back to round, which pushes the head forward — and suddenly your 'neck pain' is really a pelvis problem. Treating only the neck brings temporary relief; the pain returns within days because the source was never addressed.",
        ],
      },
      {
        heading: "What full body physiotherapy actually covers",
        list: [
          "Cervical (neck) mobilisation and deep neck flexor activation.",
          "Thoracic spine extension work to reverse the desk hunch.",
          "Scapular stability drills for rounded shoulders.",
          "Lumbar decompression and glute activation.",
          "Hip flexor and hamstring release.",
          "Diaphragmatic breathing to switch off chronic stress tension.",
          "Postural retraining with your actual workstation setup.",
        ],
      },
      {
        heading: "A typical 6-week plan",
        paragraphs: [
          "Week 1–2 focuses almost entirely on pain relief and mobility restoration — hands-on release, IFT for muscle spasm, gentle range-of-motion drills. Weeks 3–4 shift to strength: glutes, deep abdominals, mid-back. Weeks 5–6 are functional integration — the movements you actually do at work, done well. By the end you should be able to sit through a two-hour meeting without shifting once.",
        ],
      },
      {
        heading: "Everyday habits that make therapy stick",
        list: [
          "Stand up every 30 minutes — a phone timer is enough.",
          "Set the top of your monitor at eye level.",
          "Never work with your laptop directly on your lap.",
          "Do the therapist's two 'anchor' exercises every single morning.",
          "Sleep on your side or back, never on your stomach.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I attend sessions?",
        a: "Two to three sessions a week for the first fortnight, then twice a week. Once you are comfortable, a monthly maintenance visit is usually enough.",
      },
      {
        q: "Will I need painkillers?",
        a: "Most patients reduce or stop their painkillers by week two. The plan is designed to fix the cause, not mask it.",
      },
    ],
  },
  {
    slug: "free-eye-checkup-campaign-kirari-delhi",
    title: "Free Eye Check-up Campaign — Sanjeevani Clinic Pvt. Ltd. Kirari",
    excerpt:
      "Details of our community free eye check-up drive: eligibility, what is covered, screening for cataract and diabetic retinopathy, and how to register.",
    category: "Campaigns",
    readMinutes: 5,
    publishedOn: "2025-09-05",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.eyeCampaign,
    featuredImageAlt: "Free eye check-up campaign at Sanjeevani Clinic Pvt. Ltd.",
    intro:
      "Every year, Sanjeevani Clinic Pvt. Ltd. runs a completely free eye check-up drive for families in Kirari, Karan Vihar and the surrounding colonies. It is our way of catching the eye problems that patients would otherwise ignore until vision has already been lost. This year the drive is bigger, and registration is open to anyone above the age of five.",
    keyTakeaways: [
      "Full eye examination at zero cost during the campaign window.",
      "Includes vision test, refraction, IOP check and retina screening.",
      "Diabetic patients are especially encouraged to attend.",
      "Registration takes under two minutes on WhatsApp.",
    ],
    sections: [
      {
        heading: "Who should attend",
        paragraphs: [
          "The campaign is open to all age groups but especially designed for patients above 40, everyone with diabetes or high blood pressure, school-age children who complain of headaches or blurry vision, and anyone who has not had an eye examination in the last two years.",
        ],
      },
      {
        heading: "What the free examination includes",
        list: [
          "Visual acuity (distance and near) using standardised charts.",
          "Auto-refractor and manual refraction for spectacle power.",
          "Intra-ocular pressure check to screen for glaucoma.",
          "Anterior segment examination for cataract, allergy and dry eye.",
          "Fundus screening for diabetic retinopathy and hypertensive changes.",
          "Doctor consultation to explain findings and next steps.",
        ],
      },
      {
        heading: "How to register",
        paragraphs: [
          "WhatsApp your name, age and preferred date to +91 11 4701 3018. We will confirm a slot the same day. Walk-ins are welcome but slots are limited during peak hours.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there any hidden cost?",
        a: "No. The examination and doctor consultation are entirely free. If you need spectacles, you may buy them from any optician of your choice — we do not sell them.",
      },
      {
        q: "Do I need to bring anything?",
        a: "Please carry your current glasses if you use any, and your last prescription if available.",
      },
    ],
  },
  {
    slug: "when-to-book-a-blood-test",
    title: "When Should You Book a Blood Test? A Practical Guide",
    excerpt:
      "Warning signs, routine screening ages and the essential tests every adult should consider — explained without the medical jargon.",
    category: "Diagnostics",
    readMinutes: 7,
    publishedOn: "2025-08-18",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.bloodTest,
    featuredImageAlt: "Phlebotomist collecting a blood sample",
    intro:
      "A blood test is one of the cheapest, fastest and most powerful tools in medicine — yet most people only get one when something is already wrong. This short guide covers the warning signs that should trigger a test today, the routine screening schedule every adult should follow, and the small handful of tests that give the biggest picture of your health.",
    keyTakeaways: [
      "Persistent fatigue, unexplained weight change or frequent infections deserve a blood test.",
      "Every adult should screen at least once every 1–2 years, even when feeling fine.",
      "CBC, HbA1c, lipid profile, TSH and vitamin D cover most everyday concerns.",
      "Fasting rules only apply to certain tests — your clinic will always tell you.",
    ],
    sections: [
      {
        heading: "Symptoms that mean 'test now'",
        list: [
          "Persistent tiredness that sleep does not fix.",
          "Unexplained weight loss or gain over three months.",
          "Frequent infections, slow-healing wounds or gum bleeding.",
          "New-onset headaches, dizziness or palpitations.",
          "Recurring urinary infections or excessive thirst.",
          "Menstrual changes lasting more than two cycles.",
        ],
      },
      {
        heading: "Routine screening by age",
        paragraphs: [
          "In your 20s and 30s, a basic annual profile — CBC, blood sugar, lipids, TSH and vitamin D — is enough for most healthy adults. From your 40s onwards, add HbA1c, liver and kidney function, and a urine routine. Above 50, include a PSA for men and thyroid antibodies for women with symptoms. Diabetics and hypertensives should test every 3–6 months regardless of age.",
        ],
      },
      {
        heading: "The five tests worth doing even when you feel fine",
        list: [
          "Complete Blood Count (CBC) — anaemia, infection, platelet trends.",
          "HbA1c — a three-month view of blood sugar.",
          "Lipid profile — cholesterol and cardiac risk.",
          "TSH — thyroid function, especially for women.",
          "Vitamin D — widely deficient in Indian adults.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to fast?",
        a: "Fasting is required for blood sugar, lipid profile and some liver tests — usually 8 to 12 hours. Water is allowed. Continue routine medications unless your doctor says otherwise.",
      },
      {
        q: "How soon will I get the report?",
        a: "Most basic reports at Sanjeevani Clinic Pvt. Ltd. are ready the same day. Specialised tests take 24–72 hours.",
      },
    ],
  },
  {
    slug: "understanding-your-blood-test-report",
    title: "Understanding Your Blood Test Report — CBC, Lipids and Sugar",
    excerpt:
      "How to read the most common values on your pathology report and know which numbers actually deserve a doctor's follow-up.",
    category: "Diagnostics",
    readMinutes: 10,
    publishedOn: "2025-07-30",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.bloodReport,
    featuredImageAlt: "Blood test report with highlighted values",
    intro:
      "The moment a blood test report lands in your WhatsApp, you scan it for anything in red. That is a fine instinct — but not every red flag is a real one, and not every 'normal' number is truly normal for you. Here is a plain-English walk-through of the three panels every family sees most often: CBC, lipids and blood sugar.",
    keyTakeaways: [
      "Reference ranges are population averages — your history matters more.",
      "Trends across two or three reports say more than a single value.",
      "Slightly low haemoglobin in women is common but still worth investigating.",
      "LDL and HbA1c are the two numbers to obsess about after 35.",
    ],
    sections: [
      {
        heading: "Complete Blood Count (CBC)",
        paragraphs: [
          "The CBC is a snapshot of your red cells, white cells and platelets. Haemoglobin below 12 in women or 13 in men suggests anaemia — very common in Indian adults and almost always fixable. A high white cell count usually means recent or ongoing infection. Platelets outside 150,000–450,000 warrant a repeat test before any conclusion.",
        ],
      },
      {
        heading: "Lipid profile — cholesterol",
        paragraphs: [
          "LDL is the number that matters most. Under 100 is ideal; under 70 if you are diabetic or have known heart disease. HDL above 40 in men and 50 in women is protective. Triglycerides above 150 indicate lifestyle-related risk. Total cholesterol on its own is a weak indicator — always look at the components.",
        ],
      },
      {
        heading: "Blood sugar — fasting, PP and HbA1c",
        paragraphs: [
          "Fasting sugar under 100 mg/dL is normal, 100–125 is pre-diabetes, 126 or above (on two occasions) is diabetes. Post-prandial sugar should stay under 140. HbA1c gives you a three-month average and is the single most useful number — under 5.7% is normal, 5.7–6.4% is pre-diabetes, 6.5% or above is diabetes.",
        ],
      },
      {
        heading: "When to actually worry",
        list: [
          "Haemoglobin below 10.",
          "LDL above 160 or triglycerides above 200.",
          "HbA1c above 6.5% on a repeat test.",
          "Any two consecutive reports moving in the wrong direction.",
        ],
      },
    ],
    faqs: [
      {
        q: "My report says everything is normal but I feel unwell. Now what?",
        a: "Normal blood work does not rule out disease. Book a consultation so the doctor can examine you and decide if a different set of investigations is needed.",
      },
      {
        q: "Should I get every value re-tested every year?",
        a: "No. Once a baseline is established, the doctor will pick a short focused panel for annual follow-up.",
      },
    ],
  },
  {
    slug: "5-signs-you-need-an-eye-checkup",
    title: "5 Signs You Should Book an Eye Check-up This Month",
    excerpt:
      "From frequent headaches to blurry night vision — five everyday signs your eyes are asking for a proper examination.",
    category: "Eye Care",
    readMinutes: 6,
    publishedOn: "2025-07-12",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.eyeCheck,
    featuredImageAlt: "Comprehensive eye examination at the clinic",
    intro:
      "Vision degrades slowly, and the brain is very good at hiding it. Most people only book an eye examination when a headache becomes daily or a road sign at night stops making sense. Here are five practical signs that a proper eye check-up is overdue.",
    keyTakeaways: [
      "Frequent headaches often trace back to uncorrected power.",
      "Night driving trouble can be an early sign of cataract.",
      "Any diabetic adult should have annual retina screening.",
      "Children who sit too close to the TV usually need glasses.",
    ],
    sections: [
      {
        heading: "1. Headaches by the end of the day",
        paragraphs: [
          "If your temples or the bridge of your nose ache by evening, especially after screen work, an uncorrected refractive error is the likeliest culprit. A basic refraction test takes ten minutes and can end months of unnecessary painkillers.",
        ],
      },
      {
        heading: "2. Trouble seeing at night",
        paragraphs: [
          "Halos around headlights, glare from oncoming traffic and difficulty judging distances at dusk can indicate early cataract, dry eye or a rising refractive error — all easily diagnosed.",
        ],
      },
      {
        heading: "3. Squinting or leaning forward at screens",
        paragraphs: [
          "If you have started tilting your head or moving closer to your phone to read messages, your eyes are compensating for something. Do not upgrade to a bigger phone — book a check-up.",
        ],
      },
      {
        heading: "4. Diabetes without an annual eye examination",
        paragraphs: [
          "Diabetic retinopathy is silent until it is severe. Every diabetic adult should have a dilated retina examination once a year, even with perfect sugar control.",
        ],
      },
      {
        heading: "5. A child who avoids reading or sits close to the TV",
        paragraphs: [
          "Children rarely complain of blurry vision because they assume everyone sees the way they do. Sitting close to the TV, holding books unusually near, frequent eye-rubbing or one eye drifting deserves an examination.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a full eye examination take?",
        a: "About 30 minutes for adults, 45 minutes for children if dilation is needed.",
      },
      {
        q: "Is dilation safe?",
        a: "Yes. Vision blurs for about four hours after; avoid driving during that window.",
      },
    ],
  },
  {
    slug: "managing-diabetes-in-your-30s-and-40s",
    title: "Managing Diabetes in Your 30s and 40s — A Family Doctor's Guide",
    excerpt:
      "How to keep type 2 diabetes under control with sensible diet, movement and the right monitoring cadence.",
    category: "General Medicine",
    readMinutes: 9,
    publishedOn: "2025-06-24",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.diabetes,
    featuredImageAlt: "Doctor consulting a patient about diabetes management",
    intro:
      "Getting a type 2 diabetes diagnosis in your 30s or 40s is unsettling, but it is not a life sentence. With the right early habits and the right monitoring rhythm, most patients live a completely normal life — often with better energy than they had before diagnosis. This is the plan we walk our patients through.",
    keyTakeaways: [
      "Early diabetes is the easiest to reverse or control.",
      "Walking after every meal changes HbA1c more than any diet fad.",
      "HbA1c every three months is the right monitoring cadence in the first year.",
      "Do not stop metformin on your own — talk to your doctor first.",
    ],
    sections: [
      {
        heading: "The first three months matter most",
        paragraphs: [
          "The first ninety days after diagnosis set the tone. Patients who get their sugars into range quickly need less medication for years afterwards. This is when we push hardest on diet, walking and monitoring — and pull back on medicine as soon as the numbers allow.",
        ],
      },
      {
        heading: "Diet that actually works in Indian homes",
        list: [
          "Halve the rice, double the vegetables.",
          "Add a bowl of dal or curd to every meal for protein and satiety.",
          "Fruit is fine — one whole fruit at a time, never juice.",
          "Cut down on chai with sugar, biscuits and evening namkeen.",
          "Wheat roti is fine; multigrain is better; skipping bread entirely is not needed.",
        ],
      },
      {
        heading: "Movement that changes numbers",
        paragraphs: [
          "A brisk 15-minute walk after each of your three main meals is more powerful than one 45-minute walk in the morning. Muscles are the biggest sink for sugar, and post-meal walking is where that sink is opened.",
        ],
      },
      {
        heading: "When to test what",
        list: [
          "Fasting and post-lunch sugar: once a week at home for the first two months.",
          "HbA1c: every three months in year one, then every six months.",
          "Lipid profile, kidney function, urine microalbumin: once a year.",
          "Retina examination: once a year, no exceptions.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can type 2 diabetes be reversed?",
        a: "In early cases and with committed lifestyle change, HbA1c often returns to the normal range and medication can sometimes be stopped under supervision. Long-standing diabetes rarely reverses fully but can be controlled superbly.",
      },
      {
        q: "Is jaggery safer than sugar for diabetics?",
        a: "No. Jaggery raises blood sugar much the same way sugar does. Cut both.",
      },
    ],
  },
  {
    slug: "high-blood-pressure-daily-habits",
    title: "High Blood Pressure — 8 Daily Habits That Actually Move the Needle",
    excerpt:
      "Small, realistic lifestyle changes that lower blood pressure over weeks — no crash diets, no fear-mongering.",
    category: "General Medicine",
    readMinutes: 8,
    publishedOn: "2025-06-05",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.bp,
    featuredImageAlt: "Blood pressure being measured at the clinic",
    intro:
      "High blood pressure earns its nickname — the silent killer — because you feel absolutely nothing until something goes wrong. The good news: eight small daily habits, done consistently, drop numbers meaningfully within six to eight weeks, often enough to reduce medication doses under supervision.",
    keyTakeaways: [
      "Salt reduction alone can drop systolic BP by 4–8 mmHg.",
      "A cheap upper-arm BP monitor at home changes outcomes.",
      "Alcohol and poor sleep sabotage everything else.",
      "Never stop BP medicines abruptly.",
    ],
    sections: [
      {
        heading: "The 8 habits, in order of impact",
        list: [
          "Cut salt to under 5 grams a day — most of it is in packaged food, not your kitchen.",
          "Walk 30 minutes a day, five days a week.",
          "Sleep 7 hours — poor sleep raises BP the next morning.",
          "Limit alcohol to under two drinks, and never daily.",
          "Manage weight — even 3–5 kg lost brings numbers down noticeably.",
          "Add potassium-rich foods: bananas, sweet potato, spinach, coconut water.",
          "Practise 10 minutes of slow breathing or meditation daily.",
          "Take your medication at the same time every day, without fail.",
        ],
      },
      {
        heading: "How to measure BP properly at home",
        paragraphs: [
          "Use an upper-arm (not wrist) digital monitor. Sit quietly for five minutes with your back supported and feet flat. Rest your arm on a table at heart level. Take two readings a minute apart, twice a day for a week, and share the log with your doctor. A single reading in the clinic is almost meaningless.",
        ],
      },
    ],
    faqs: [
      {
        q: "If my BP is fine on medication, can I stop?",
        a: "No. It is fine because of the medication. Stopping without guidance is the most common cause of preventable strokes we see.",
      },
      {
        q: "Is a slightly high reading occasionally a problem?",
        a: "Occasional spikes happen with stress or coffee. It is the average pattern that matters — and that is why weekly logging beats one clinic visit.",
      },
    ],
  },
  {
    slug: "annual-health-check-up-guide",
    title: "The Annual Health Check-up — What to Include at Every Age",
    excerpt:
      "A practical, age-wise checklist for annual health check-ups for men and women, plus what to skip until it is genuinely needed.",
    category: "Preventive Care",
    readMinutes: 11,
    publishedOn: "2025-05-16",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.annualCheck,
    featuredImageAlt: "Doctor reviewing an annual health check-up report",
    intro:
      "Most 'executive health check-ups' are enormous packages padded with tests you do not need, priced to look thorough. A good annual check-up is the opposite: tight, purposeful and matched to your age, gender and family history. Here is what we actually order for our patients at Sanjeevani Clinic Pvt. Ltd..",
    keyTakeaways: [
      "In your 20s, less is more — a small annual panel is enough.",
      "40s is where things change: add cardiac and diabetes-related tests.",
      "Above 50, add cancer screenings appropriate to gender.",
      "Whole-body scans and premium imaging are rarely needed as routine.",
    ],
    sections: [
      {
        heading: "20s and 30s — the minimalist panel",
        list: [
          "CBC, fasting sugar, lipid profile, TSH, vitamin D.",
          "Urine routine.",
          "Blood pressure and BMI at the visit.",
          "Dental and eye check every 2 years.",
        ],
      },
      {
        heading: "40s — the inflection point",
        list: [
          "Add HbA1c, liver and kidney function.",
          "ECG at rest.",
          "Ultrasound abdomen if there are gastric symptoms.",
          "Mammogram every 2 years for women with family history.",
        ],
      },
      {
        heading: "50s and beyond",
        list: [
          "Annual dilated eye examination.",
          "PSA for men.",
          "Pap smear every 3 years; mammogram every 1–2 years for women.",
          "Faecal occult blood test for colon screening.",
          "Bone density scan (DEXA) once, then based on findings.",
        ],
      },
      {
        heading: "What to skip",
        paragraphs: [
          "Whole-body CT screening, tumour marker 'panels' in healthy adults and heavily-marketed 'genetic wellness' tests almost never change management. Money is far better spent on a proper consultation and the targeted tests above.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should the whole family come together?",
        a: "Yes — we offer combined pricing for couples and families, and it is far easier for us to give consistent advice when we see everyone together.",
      },
      {
        q: "Do I need to fast for the whole panel?",
        a: "Yes, at least 10 hours. Water is allowed. Continue regular medication unless told otherwise.",
      },
    ],
  },
  {
    slug: "back-pain-when-to-see-a-doctor",
    title: "Back Pain — When It Is Fine, and When You Should See a Doctor",
    excerpt:
      "Learn the difference between everyday muscular back pain and warning signs that call for a physiotherapy or medical consultation.",
    category: "Physiotherapy",
    readMinutes: 7,
    publishedOn: "2025-04-28",
    author: "Sanjeevani Clinic Pvt. Ltd. Team",
    cover: IMG.backPain,
    featuredImageAlt: "Patient receiving a lower back assessment",
    intro:
      "Almost every adult will have back pain at some point. The good news is that the vast majority of episodes settle on their own within two weeks. The bad news is that a small number of cases hide something serious — and the signs are worth knowing.",
    keyTakeaways: [
      "Most acute back pain improves in 10–14 days.",
      "Bed rest beyond 48 hours actually slows recovery.",
      "Numbness in the legs, bladder issues or unexplained weight loss are red flags.",
      "Physiotherapy prevents recurrence far better than painkillers.",
    ],
    sections: [
      {
        heading: "Everyday back pain — what to do first",
        list: [
          "Keep moving gently; avoid extended bed rest.",
          "Ice for the first 48 hours, then heat.",
          "A short course of over-the-counter painkillers is reasonable.",
          "Sleep on a firm surface with a pillow under your knees.",
          "Book physiotherapy if pain is not improving by day 5.",
        ],
      },
      {
        heading: "Red flags — see a doctor the same day",
        list: [
          "Numbness or weakness in one or both legs.",
          "Loss of bladder or bowel control.",
          "Pain following a fall, accident or heavy impact.",
          "Fever alongside the back pain.",
          "Unexplained weight loss or night sweats.",
          "Pain that wakes you up from sleep every night.",
        ],
      },
      {
        heading: "Preventing the next episode",
        paragraphs: [
          "Ninety percent of recurrence prevention is core strength, hip mobility and workstation ergonomics. A short physiotherapy programme after the acute phase drops future episodes dramatically — far more than any painkiller or belt ever will.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need an MRI?",
        a: "Rarely for the first episode. MRI is reserved for red-flag cases or pain that has not settled after 6 weeks of proper treatment.",
      },
      {
        q: "Are back belts helpful?",
        a: "Short-term yes, long-term no — they weaken the very muscles you need to be stronger.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
