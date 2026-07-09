# Sanjeevani Clinic — Full Rebuild Plan

## Delivery
- **Phase 1 (this turn): structure + SEO shells** for every page in the sitemap.
- **Phase 2:** premium long-form English content (800–1500 words) per page, blog articles, service deep dives.
- **Phase 3:** enable Lovable Cloud, add real auth (Email + Google), booking DB, cart, checkout, my-bookings, admin.

## Sitemap (all routes exist now)
Public: `/`, `/about`, `/doctor`, `/facilities`, `/gallery`, `/testimonials`, `/faqs`, `/contact`, `/blog`, `/blog/$slug`, `/free-eye-checkup`, `/pharmacy`
Services: `/services`, `/services/physiotherapy`, `/services/blood-test`, `/services/diagnostics`, `/services/radiology`, `/services/eye-checkup`, `/services/general-medicine`, `/services/health-checkup`
Transactional (Phase 3 wiring): `/book-appointment`, `/my-bookings`, `/cart`, `/checkout`, `/login`, `/thank-you`, `/appointment-cancelled`, `/appointment-cancellation-confirmation`, `/cancel-payment`
Legal: `/privacy-policy`, `/terms`

## Navigation (grouped)
Nav: Home · About · Services▾ (7 services + Pharmacy) · Doctors · Blog · Contact · **Book Appointment** (CTA)
Footer: Quick Links / Medical Services / Support / Legal + social

## Blog (10 posts stubbed, full content in Phase 2)
Physio-at-home Rohini · Full-body physio for stress · Free eye checkup campaign · When to book a blood test · Reading your blood report · 5 signs for eye checkup · Diabetes 30s/40s · BP daily habits · Annual checkup guide · Back pain when to see a doctor.

## SEO
Every route has unique title, description, keywords, og:*, canonical. Blog posts include Article JSON-LD. Home/Contact keep MedicalClinic schema.

## Out of scope for Phase 1
Long-form body copy (Phase 2), real payments/auth/DB (Phase 3).
