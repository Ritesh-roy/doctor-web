
## Goal
Rebuild the current single-page site into a premium, fully responsive, multi-page healthcare website using only the real clinic info (Dr. B.P. Singh, Karan Vihar/Kirari address, +91 88535 15351, Mon–Sun 9–1 & 5–9, services, etc.).

## Pages (each = separate TanStack route with own hero, breadcrumb, SEO, CTA)
- `/` Home
- `/about` About + Mission/Vision/Achievements
- `/services` Services overview
- `/services/$slug` Detail (physiotherapy, diagnostics, radiology, general-medicine, eye-checkup, health-checkup) with benefits, process, FAQs, related services
- `/doctor` Dr. B.P. Singh profile
- `/facilities` Clinic facilities
- `/gallery` Masonry gallery
- `/testimonials` Google-review-style cards
- `/faqs`
- `/contact` Map + form + hours
- `/book-appointment` Form
- `/privacy-policy`, `/terms`

## Shared layout
- New `SiteLayout` with sticky glass navbar (real links, mobile Sheet drawer), top utility bar, footer.
- New premium SVG logo (blue medical cross + monogram), light + dark variants, favicon.
- Floating call/WhatsApp buttons, sized correctly on all breakpoints.
- Framer Motion page transitions.

## Critical fixes
- Responsive audit: nav collapses to hamburger < lg, hero grid stacks < md, buttons `w-full sm:w-auto`, no fixed widths, `min-w-0` + `truncate` in header row, container `px-4 sm:px-6 lg:px-8`.
- Book Appointment + Call buttons: consistent height, same alignment, wrap correctly.
- Remove fake AI service images (physio, radiology); replace via lovable-assets with realistic stock medical photography URLs (Unsplash medical).

## Design system
- Keep existing tokens (medical blue, sky, emerald). Refine spacing scale, add subtle noise/gradient hero, glass cards, generous whitespace.
- Typography: Fraunces display + Plus Jakarta Sans (already loaded).

## SEO
- Per-route `head()` with unique title/description/og, canonical, breadcrumb JSON-LD, MedicalClinic schema on Home/Contact, Service schema per service detail.

## Technical notes
- Add routes as flat files under `src/routes/` (`about.tsx`, `services.tsx`, `services.$slug.tsx`, etc.).
- Extract Navbar/Footer/FloatingActions into `src/components/site/`.
- Move service data to `src/data/services.ts`.
- Use `<Link>` for all nav.
- Replace bad AI images with new lovable-assets pointers sourced from realistic imagery.

## Out of scope
- No backend / booking persistence (form is client-side, opens WhatsApp/mailto).
- No CMS.
