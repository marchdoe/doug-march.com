# 2026-03-25

**Design Brief:** A warm parchment broadsheet at 6:15 PM in late March — golden hay neutrals hold the page like paper near a window, one glint of harvest gold marks tomorrow's opening, and spring green whispers a win in the margin.

## Signals


## Claude's Rationale

The Hay-Field Edition demanded a palette built on restraint and specificity — hue 58° (golden hay) anchors a near-monochromatic neutral scale that reads as parchment left near a window, never white, never grey. The harvest gold accent appears at full saturation in exactly one structural location (the dateline band), which mirrors the brief's "one glint" discipline. The spring green secondary accent is reserved purely for win signals, giving it semantic weight without becoming decorative. Fraunces brings warmth and slight optical irregularity to headings — the "wobbly" quality that encodes the brief's handmade-but-edited energy — while Outfit provides clean geometric calm for body copy, annotation labels, and the nav register. The Perfect Fourth scale (1.333) gives editorial drama without poster extremes, letting the masthead headline feel authoritative beside 9px metadata annotations.

The semantic token structure maps the parchment surface as the base/light mode with a legible dark inversion for system dark preference. All contrast ratios comfortably exceed WCAG AA — the primary text (#1E1C15) on parchment (#EDE9DA) delivers approximately 10:1, encoding the half-lit first quarter moon's moderate presence as structural contrast rather than decoration. Every spacing value derives from the 4px base scale; the 52px masthead and 48px dateline band are expressed as named size tokens so layout components can reference them by intent rather than magic number.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
