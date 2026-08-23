# Seed: specimen

Two lanes anchor this archetype: Vercel / Geist (black-and-white dev-tool precision) and an independent type-foundry specimen sheet (warm paper, genuine typographic annotation). The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:vercel-geist -->
**Lane: Vercel / Geist**

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

## Mobile strategy
Specimen fills the full viewport width on mobile; the label block (metadata, callouts, signals) stacks **below** the specimen, not beside. Hero type uses `font-size: clamp(3rem, 14vw, 11.25rem)` so the specimen-scale character survives shrinking without overflow. The specimen element itself should be ≥ 60% of viewport height on mobile — don't let it collapse into something indistinguishable from normal body content.
<!-- /LANE -->

<!-- LANE:klim-specimen -->
**Lane: Independent Type-Foundry Specimen**

> Source: independent type-foundry specimen sheets (e.g. Klim Type Foundry's own marketing) — general genre characteristics of how foundries present their own type, not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
A working type foundry's own specimen sheet — warmer and more tactile than a dev-tool aesthetic, but no less precise. Oversized glyphs paired with genuine ink-drawdown color swatches, annotated with real typographic vocabulary (x-height, aperture, optical size) rather than pixel measurements. Feels handmade-precise, not machine-precise — the opposite warmth register from the Vercel/Geist lane.

## Color roles
- bg: #F5F1E8 — warm paper
- text: #1C1917 — deep ink
- text.mid: #78716C — annotation captions
- accent: one saturated "ink" color per build — e.g. #B23A48 (a genuine printer's red) — used for annotation marks and swatches only
- border: #D6CFC4 — hairlines

## Typography
- Display: whatever chassis is assigned, set at genuinely enormous scale (240px+) with visible construction guides (baseline, cap-height as thin rules behind the glyph)
- Body: 400, 15px, line-height 1.5, set in a narrow annotation column beside the glyph, not below it
- Mono: for measurement callouts only (e.g. "x-height 512u")

## Component cues
- Buttons: "swatch" chips styled like ink drawdowns — rounded-rect with a subtle paper-texture gradient, not a flat fill
- Cards: bordered with a slightly asymmetric radius suggesting a deckle/torn edge
- Nav: small-caps serif wordmark, minimal

## Spatial rhythm
Asymmetric — the specimen glyph anchors one side (60–70% width), the annotation column runs down the other side at a much smaller scale, like a spec sheet margin.

## Anti-patterns specific to this style
- DO NOT use pure black or pure white — warm paper and deep ink only
- DO NOT use a cold blue accent — that belongs to the Vercel/Geist lane
- DO NOT omit annotation marks — measurement callouts are the point of this lane
- DO NOT center the glyph — it anchors one side, asymmetrically

## Mobile strategy
The annotation column moves below the glyph instead of beside it. The glyph itself stays the dominant visual element at ≥ 55% of viewport height — the annotation detail can shrink, the glyph cannot.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
