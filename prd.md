Product Requirements Document (PRD) – FoneXpress Website Redesign
1. Background & Purpose
Project: Redesign FoneXpress website in Next.js using modern UI/UX, responsive design, Tailwind CSS, and a custom cursor effect.Goal: Provide a clean, professional, mobile‑friendly site for FoneXpress (Kenya’s phone retailer), improve user engagement, and leverage Cursor AI for developer productivity.
2. Scope
Included: Next.js + Tailwind CSS, major pages (Home, Products, Services, About, Contact), custom cursor, SEO, responsive layout, deployment on Vercel.Excluded: E‑commerce checkout, CMS integration, multi‑language support (future).
3. Success Metrics
- Site loads < 2.5s on mobile- Lighthouse score > 90- Bounce rate < 50%- Increase contact form submissions- Developer productivity improved with Cursor.
4. Functional Requirements
1. Layout: Header, footer, responsive nav.2. Home Page: Hero section, services, featured products.3. Products Page: Grid with filters, responsive design.4. Services Page: Warranty and repair info.5. About Page: Company mission, trust highlights.6. Contact Page: Form, map, contact info.7. Custom Cursor: Smooth animated circle that enlarges on hover.8. SEO: Meta tags, structured data, performance optimised.
5. Non‑Functional Requirements
Performance (Lighthouse >90), Accessibility (WCAG compliant), Maintainability (modular components), Scalability (future CMS ready), Security (XSS-safe).
6. User Stories
- As a visitor, I want to quickly learn what FoneXpress offers.- As a shopper, I want to filter phones by brand.- As a repair customer, I want to understand the service process.- As a site owner, I want easy content updates with Cursor assistance.
7. Development Strategy
Sprint 1: Setup Next.js + Tailwind.Sprint 2: Home Page + Layout.Sprint 3: Products + Filtering.Sprint 4: Services + About + Contact.Sprint 5: Custom Cursor Integration.Sprint 6: SEO + Deployment.Sprint 7: Testing & Review.
8. Cursor Usage Guidelines
- Use Cursor AI for scaffolding, refactoring, and testing.- Maintain clear prompts and project rules.- Review all generated code before commit.- Use Cursor for reusable TSX components styled with Tailwind.
9. Risks & Mitigations
1. Accessibility issues with custom cursor → Test and fallback to default.2. Overreliance on AI → Enforce manual reviews.3. Performance drops from animations → Optimise with Framer Motion + lazy loading.
10. Assumptions & Next Steps
- Product data and assets will be provided.- Brand colours and logo ready.- Figma mockups created before coding.- Cursor fully set up for project context understanding.Next Steps: Approve PRD → Setup repo → Start Sprint 1 → Begin Cursor integration.