# Seed: specimen — inspired by Vercel / Geist

> Source: Vercel / Geist via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Type is the page. Black-and-white precision — a type foundry's specimen sheet. Oversized glyphs, metric annotations, tabular figures, hairline guides. Feels engineered. Every size, weight, and spacing value is deliberate and legible as a choice.

## Color roles
- bg: #FFFFFF (light) or #000000 (dark) — one, not a gradient
- text: #000000 / #FFFFFF — pure
- text.mid: #666666 / #888888 — metadata, measurements
- text.dim: #A1A1A1 — annotations (size labels, grid marks)
- accent: #0070F3 — used only on interactive affordances, never as fill
- border: #EAEAEA / #333333 — 1px hairlines

## Typography
- Display: "Geist" or "Inter" 800, scale ratio 2.0, oversized hero glyphs (120–240px)
- Body: "Geist" or "Inter" 400, 15px, line-height 1.5
- Mono: "Geist Mono" or "JetBrains Mono" 500, 13px — used for labels, sizes, timestamps, slugs

## Component cues
- Buttons: 1px border, square-ish (4px radius), text-weight 500, subtle hover invert
- Cards: bordered, no shadow, tight 16–24px padding, meta row at top in mono
- Nav: small-caps text links, mono subtitles, fixed thin bar

## Spatial rhythm
Spacing scale on a 4px grid (4, 8, 16, 24, 48, 96). Hero sections are type-only — headline occupies 80% of viewport width, surrounded by silence. Metadata (labels, sizes, dates) sits in the margin in mono, feeling like a specification.

## Anti-patterns specific to this style
- DO NOT use color fills or gradients
- DO NOT use serif display type — geometric sans is the voice
- DO NOT use drop shadows or heavy borders
- DO NOT center body copy
- DO NOT render photography-first sections — type dominates every viewport
