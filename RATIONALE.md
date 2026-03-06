# Electrician Template — Rationale

## Dark Theme Choice
Dark backgrounds are essential for glow effects to read properly. Electric cyan and amber glow effects look washed out on light backgrounds. The entire visual identity depends on this.

## Space Grotesk for Headings
A geometric sans-serif with a techy feel that complements the electric theme. Only loading the 700 weight to keep the font payload small (~25KB woff2).

## Staggered Card Animations
Cards pulse in sequence (via animation-delay) to suggest electricity traveling through a circuit. This is the kind of purposeful animation detail that elevates the site above generic templates.

## Conic-gradient Rotating Border
Creates a "current flowing around the edge" effect. Uses @property for the angle animation which is well-supported in modern browsers. Falls back to a static glow border in older browsers.

## Demo System
Uses base64url encoding per Section 15 guidelines. All placeholder values (Hawking Electrical) are realistic and pass SEO/accessibility checks without the d parameter.
