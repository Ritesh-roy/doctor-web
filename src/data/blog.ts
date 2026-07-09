export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedOn: string;
  author: string;
  cover?: string;
  featuredImageAlt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "physiotherapy-at-home-rohini-benefits-cost",
    title: "Physiotherapy at Home in Rohini — Top 10 Benefits, Cost & How to Book",
    excerpt:
      "A complete guide to at-home physiotherapy in Rohini and Kirari — benefits, indicative cost, session structure and how to arrange care through Sanjeevani Clinic.",
    category: "Physiotherapy",
    readMinutes: 9,
    publishedOn: "2025-11-10",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Physiotherapist treating a patient at home in Rohini",
  },
  {
    slug: "full-body-physiotherapy-stress-relief-office-pain",
    title: "Full Body Physiotherapy for Stress Relief and Office Pain",
    excerpt:
      "How targeted full-body physiotherapy relieves everyday desk stress, neck stiffness and lower back pain — and what a typical treatment plan looks like.",
    category: "Physiotherapy",
    readMinutes: 8,
    publishedOn: "2025-10-22",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Full body physiotherapy session for stress relief",
  },
  {
    slug: "free-eye-checkup-campaign-kirari-delhi",
    title: "Free Eye Check-up Campaign — Sanjeevani Clinic Kirari",
    excerpt:
      "Details of our community free eye check-up drive: eligibility, what is covered, screening for cataract and diabetic retinopathy, and how to register.",
    category: "Campaigns",
    readMinutes: 5,
    publishedOn: "2025-09-05",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Free eye check-up campaign at Sanjeevani Clinic",
  },
  {
    slug: "when-to-book-a-blood-test",
    title: "When Should You Book a Blood Test? A Practical Guide",
    excerpt:
      "Warning signs, routine screening ages and the essential tests every adult should consider — explained without the medical jargon.",
    category: "Diagnostics",
    readMinutes: 7,
    publishedOn: "2025-08-18",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Phlebotomist collecting a blood sample",
  },
  {
    slug: "understanding-your-blood-test-report",
    title: "Understanding Your Blood Test Report — CBC, Lipids and Sugar",
    excerpt:
      "How to read the most common values on your pathology report and know which numbers actually deserve a doctor's follow-up.",
    category: "Diagnostics",
    readMinutes: 10,
    publishedOn: "2025-07-30",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Blood test report with highlighted values",
  },
  {
    slug: "5-signs-you-need-an-eye-checkup",
    title: "5 Signs You Should Book an Eye Check-up This Month",
    excerpt:
      "From frequent headaches to blurry night vision — five everyday signs your eyes are asking for a proper examination.",
    category: "Eye Care",
    readMinutes: 6,
    publishedOn: "2025-07-12",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Comprehensive eye examination at the clinic",
  },
  {
    slug: "managing-diabetes-in-your-30s-and-40s",
    title: "Managing Diabetes in Your 30s and 40s — A Family Doctor's Guide",
    excerpt:
      "How to keep type 2 diabetes under control with sensible diet, movement and the right monitoring cadence.",
    category: "General Medicine",
    readMinutes: 9,
    publishedOn: "2025-06-24",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Doctor consulting a patient about diabetes management",
  },
  {
    slug: "high-blood-pressure-daily-habits",
    title: "High Blood Pressure — 8 Daily Habits That Actually Move the Needle",
    excerpt:
      "Small, realistic lifestyle changes that lower blood pressure over weeks — no crash diets, no fear-mongering.",
    category: "General Medicine",
    readMinutes: 8,
    publishedOn: "2025-06-05",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Blood pressure being measured at the clinic",
  },
  {
    slug: "annual-health-check-up-guide",
    title: "The Annual Health Check-up — What to Include at Every Age",
    excerpt:
      "A practical, age-wise checklist for annual health check-ups for men and women, plus what to skip until it is genuinely needed.",
    category: "Preventive Care",
    readMinutes: 11,
    publishedOn: "2025-05-16",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Doctor reviewing an annual health check-up report",
  },
  {
    slug: "back-pain-when-to-see-a-doctor",
    title: "Back Pain — When It Is Fine, and When You Should See a Doctor",
    excerpt:
      "Learn the difference between everyday muscular back pain and warning signs that call for a physiotherapy or medical consultation.",
    category: "Physiotherapy",
    readMinutes: 7,
    publishedOn: "2025-04-28",
    author: "Sanjeevani Clinic Team",
    featuredImageAlt: "Patient receiving a lower back assessment",
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
