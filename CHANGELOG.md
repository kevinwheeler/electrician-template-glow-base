# Electrician Template - Changelog

## 2026-03-12
- Replaced "Emergency Repairs" service with "Ceiling Fan Installation" across index.html and services.html
  - Most small/new electricians don't offer 24/7 emergency service; ceiling fans are bread-and-butter work
  - New fan icon SVG, updated descriptions and sub-service bullet list
- Replaced experience-based stats (10+ Years, 2,500+ Jobs, 4.9 Stars) with stats any new business can claim:
  - 100% Licensed & Insured, 100% Satisfaction Guaranteed, 100% Free Estimates
  - Updated on both index.html (about preview) and about.html (By the Numbers section)
  - about.html went from 4 stats to 3 (removed experience-based stats, kept the 3 new defaults)
- Updated meta descriptions and footer text to remove "emergency repairs/services" references
- Updated "For over a decade" copy on index.html to be suitable for new businesses

## 2026-03-06 (session 2)
- Replaced fixed demo banner with centered modal overlay (DEMO ONLY popup)
  - 3-second countdown timer before Close button enables
  - Blurred backdrop, electric-themed modal card with cyan border/glow
  - Applied to all 6 HTML pages
- Cleaned up dead --demo-banner-height CSS variable and simplified body/header/scroll-margin values
- Tablet visual review (768px) - all 6 pages verified, no issues found
- Accessibility audit - zero issues (all landmarks, heading hierarchy, alt text, form labels correct)

## 2026-03-06
- Project setup: directory structure, git init, documentation files, config files
- Built complete CSS with electric theme: glow pulses, rotating conic-gradient borders, shimmer buttons, arc dividers, animated hero background
- Built JS: demo system (base64url d parameter), link rewriting, mobile nav, IntersectionObserver fade-ins, disabled form handler
- Built all 6 pages: index, services, about, contact, privacy, 404
- Self-hosted Space Grotesk 700 font (12.8KB woff2)
- Generated placeholder images and favicons (ico, svg, apple-touch-icon)
- Fixed IntersectionObserver threshold (0.15 -> 0.05) for reliable fade-in triggers
- Verified demo system swaps all values correctly across pages
- Verified contact form shows success UX without submitting
- Visual testing at 1440px desktop and 375px mobile
