# Electrician Template — Roadmap

## Project Notes
- This is a demo/template site for cold-call sales demos (Section 15 of guidelines)
- Dark theme with electric glow/pulse animations as the signature visual identity
- Multi-page: index.html, services.html, about.html, contact.html, privacy.html, 404.html
- Placeholder business: Volt Electric, Austin TX
- URL parameter demo system (base64url `d` param) for swapping business details
- Demo banner, noindex on all pages, no sitemap, disabled form submission

## Color Palette
- Primary: #00d4ff (electric cyan)
- Accent: #ffcc00 (electric amber/spark)
- Background: #0a0e1a (very dark navy)
- Bg-alt: #0f1628
- Bg-card: #141c30
- Text: #e0e6f0
- Text-muted: #8a94a8
- Headings: #ffffff

## Typography
- Headings: Self-hosted Space Grotesk 700
- Body: System font stack

## Electric Animation Effects
- Glow pulse on headings (text-shadow cycling)
- Box glow pulse on service cards (staggered)
- Animated electric border (conic-gradient rotating)
- Button hover glow + shimmer sweep
- Subtle neon flicker on logo accent
- Electric arc SVG section dividers
- Animated radial gradient hero background
- Scroll-triggered fade-in entrances (IntersectionObserver)
- All animations gated behind prefers-reduced-motion: no-preference
- Mobile: reduced glow blur, disabled rotating border

## Pages
1. index.html — Hero, services overview (6 cards), about preview, CTA band, footer
2. services.html — Detailed service descriptions
3. about.html — Company story, experience
4. contact.html — Contact form (disabled), contact info
5. privacy.html — Privacy policy (noindex, no OG/canonical/JSON-LD)
6. 404.html — Custom error page (noindex)

## Build Order
1. Project setup (done)
2. CSS foundation
3. JS skeleton
4. Hero section — iterate until excellent
5. Remaining index.html sections
6. Inner pages
7. Visual review at all breakpoints
8. Demo system testing
9. Accessibility pass
10. Generate placeholder images, favicon
