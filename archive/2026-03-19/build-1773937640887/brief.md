# 2026-03-19

**Design Brief:** A portfolio surface treated as a precision artifact under examination — blued steel darkness, monospaced engineering designations, and one rose-gold hairline marking the only moment of warmth in the mechanism.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

This system is built around the "blued steel" concept: a 260° hue carried at near-zero saturation through the neutral scale so the page reads as forged metal — cold, material, obsessive. The font pairing commits to the Swiss Precision recipe as adapted in the brief: Switzer (loaded from Fontshare) for headings at weights 300 and 700, IBM Plex Mono for all secondary/body text, treating every label and data point as an engineering spec stamp. The Perfect Fifth scale (1.500 ratio) creates the extreme scale contrast demanded — from 7px coordinate markers to 81px section figures, with a hero name handled via clamp() outside the token system. Dark mode is the default; base semantic token values are the dark state, with `_light` overrides for the inverted palette.

The accent color (blued steel violet, `#7055C9`) is intentionally restrained as a structural tinting agent — hairline borders at 0.12 opacity, section dividers at 0.20. The rose-gold secondary (`#A8723E`) appears once, only in the quote hairline token, preserving the "single chromatic event" mandate. No border radii exist; no shadows exist. This is a mechanism, not a product.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
