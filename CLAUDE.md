# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gadgets By Kihoro is a Next.js website for a premium electronics retailer in Kenya. The site showcases smartphones, tablets, accessories, and services with a modern, responsive design built using Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

**Key Business Context:**
- 25th Anniversary celebration (1999-2024)
- PhoneLink & Airtel Partner Shops
- Offers KCB financing options
- Focus on Kenyan market with local pricing (KSh)
- Multiple branches across Kenya

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### App Structure (Next.js App Router)
- **Layout Pattern**: Single root layout (`src/app/layout.tsx`) with Header and Footer applied globally
- **Page Routes**: File-based routing in `src/app/`
  - `/` - Home page with hero, featured products, brands, pricing ranges
  - `/products` - Product catalog with filtering capabilities
  - `/services` - Warranty and repair services
  - `/about` - Company mission and trust highlights
  - `/contact` - Contact form, branch locations, map

### Component Organization
- **Global Components** (`src/components/`):
  - `Header.tsx` - Desktop navigation with fixed positioning
  - `Header-Mobile.tsx` - Mobile navigation (hamburger menu)
  - `Footer.tsx` - Site-wide footer
  - `HeroCarousel.tsx` - Hero carousel with autoplay and navigation

### Brand Colors (from globals.css)
```css
--brand-red-primary: #E31E24   /* Primary brand color */
--brand-red-dark: #B71C1C      /* Darker red for gradients */
--brand-grey-dark: #424242     /* Dark grey for text/backgrounds */
```

### Styling Conventions
- **Tailwind CSS 4** with custom theme integration
- Import path alias: `@/*` maps to `./src/*`
- Font system: Geist Sans & Geist Mono (via next/font/google)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Common patterns:
  - Gradient backgrounds: `bg-gradient-to-br from-[#E31E24] to-[#B71C1C]`
  - Hover effects: `hover:shadow-xl hover:-translate-y-2 transition-all`
  - Glass morphism: `bg-white/10 backdrop-blur-md`

### Key Design Patterns
1. **Client Components**: Use `'use client'` directive for:
   - Interactive UI (mobile menu, carousel)
   - State management (useState, useEffect)
   - Event handlers

2. **SEO**: Metadata export in layout.tsx includes OpenGraph tags

3. **Contact Integration**:
   - WhatsApp: `https://wa.me/254788740000`
   - Phone: `tel:+254788740000`
   - Email: `info@gadgetsbykihoro.com`

4. **Product URL Structure**:
   - Price filtering: `/products?price=under-10k`
   - Brand filtering: `/products?brand=samsung`

## Development Notes

### PRD Requirements (prd.md)
- **Performance target**: Lighthouse score > 90, load time < 2.5s
- **Accessibility**: WCAG compliant
- **Security**: XSS-safe implementations required
- **Future-ready**: Modular components for CMS integration

### TypeScript Configuration
- Path aliases: `@/*` resolves to `src/*`
- Strict mode enabled
- React JSX transform

### Image Assets
- Company logo located at: `/public/company-logo/logo.png`
- Logo dimensions: 225x45px (displayed at h-11)

### Mobile Responsiveness
- Mobile-first approach
- Separate mobile navigation component
- Custom cursor automatically disabled on touch devices
- Responsive grid layouts throughout

## Common Patterns When Coding

### Adding New Pages
1. Create `page.tsx` in `src/app/[route-name]/`
2. Add route to Header navigation links array
3. Ensure responsive design with mobile considerations
4. Include proper metadata exports for SEO

### Working with Brand Colors
Use Tailwind classes with exact hex values:
- `text-[#E31E24]` or `bg-[#E31E24]`
- Gradients: `from-[#E31E24] to-[#B71C1C]`

### Adding Interactive Elements
- Remember to use `'use client'` directive
- Ensure custom cursor hover states work (links and buttons auto-enlarge cursor)
- Test on both desktop and mobile

### Product Data Structure
See `src/app/page.tsx` for example product object format:
```typescript
{
  name: string;
  brand: string;
  price: string;      // Format: "KSh 10,699"
  originalPrice: string;
  specs: string;      // e.g., "4GB RAM • 64GB Storage • 50MP Camera"
  badge: string;      // e.g., "25th Anniversary Sale"
}
```
- Make sure the code is always kept clean, follow atomic design patterns and nextjs best practices
- For TypeScript make sure to never use type "any", always keep strict types