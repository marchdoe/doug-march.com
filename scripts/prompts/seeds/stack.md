# Seed: stack

Two lanes anchor this archetype: Notion / Mintlify (soft warm-minimalism bands) and a bold saturated stack in the spirit of Cash App. The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:notion-mintlify -->
**Lane: Notion / Mintlify**

> Source: Notion / Mintlify via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Soft, banded sections stacked vertically — each band has its own density and treatment (one is dense bullets, another is a single illustration, another is a quote). Warm minimalism: off-white surfaces, rounded corners, generous band padding. Friendly, documentation-adjacent tone.

## Color roles
- bg: #FFFEFC — warm off-white
- bg.band: #F7F6F3 — alternate band fill
- bg.card: #FFFFFF — elevated surfaces
- text: #191918 — primary
- text.mid: #6F6E69 — secondary
- accent: #E1661A (warm terracotta) or #2EAADC (soft cyan) — one only
- border: rgba(55,53,47,0.09) — soft hairline
- radius: 8–12px consistently

## Typography
- Display: "Inter" or "Söhne" 600, scale ratio 1.333
- Body: "Inter" 400, 16px, line-height 1.6
- Mono: "JetBrains Mono" / "Berkeley Mono" 400, 14px — for inline code

## Component cues
- Buttons: 8px radius, soft fill (filled or subtle tint), medium weight, 14px
- Cards: 12px radius, soft 1px border, 24–32px padding, rare soft shadow (elevation only when needed)
- Nav: left sidebar with collapsible sections, or top bar with soft underline on active

## Spatial rhythm
Vertical bands separated by 80–120px of padding. Each band has its own internal rhythm — dense bullet list, then sparse quote, then illustration band. Content-max-width ~720–880px, centered. Rounded corners everywhere.

## Anti-patterns specific to this style
- DO NOT use harsh black (#000) or pure white (#FFF) — warm off-whites and ink browns
- DO NOT render a uniform grid across the page — bands must vary internal density
- DO NOT use sharp square corners — rounded is the voice
- DO NOT use saturated gradients or neon accents
- DO NOT skip band padding — bands need breathing room to feel distinct

## Mobile strategy
Already naturally mobile-friendly. Use `min-height` tokens that scale down — no `height: 100vh` without a mobile fallback like `min-height: 500px`. Bands should stack with clear visual breaks at all widths.
<!-- /LANE -->

<!-- LANE:cash-app -->
**Lane: Bold Saturated Stack**

> Source: consumer fintech marketing pages (Cash App and similar) — general genre characteristics of chunky, high-saturation color-block sections, not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
Loud, confident, chunky — vertical bands stacked like the Notion lane, but saturated and playful instead of soft and warm. Each band commits fully to one bold color rather than sharing a neutral off-white base — the opposite temperament from the Notion lane's quiet warmth.

## Color roles
- bg per band: alternates between full-saturation fields — e.g. #00D632, #B9FF66, #000000 — no shared neutral base across bands
- text: #FFFFFF on dark/saturated bands, #000000 on the lightest band
- accent: whichever color is NOT the current band's background, used for the CTA in that band only
- border: none — color blocking replaces hairlines entirely

## Typography
- Display: whatever the chassis provides at 700–900, scale ratio 1.5, chunky rounded numerals where the chassis supports them
- Body: 500, 16px, line-height 1.5, often centered within a band (unlike the Notion lane's left-aligned reading rhythm)
- Mono: not used in this lane

## Component cues
- Buttons: large, fully rounded, high-contrast fill (always the opposite color from the band's background), 16–18px, bold weight
- Cards: rare — bands themselves ARE the cards, full-bleed; a card that does appear inside a band is borderless with a solid contrasting fill, not a subtle elevation
- Nav: bold single-color bar, chunky rounded logo mark

## Spatial rhythm
Bands are full-bleed and taller than the Notion lane's (100–140px padding), each one a near-full-viewport moment. No shared max-width — each band can set its own content width.

## Anti-patterns specific to this style
- DO NOT use a shared off-white base across bands — each band commits to ONE saturated color, full-bleed
- DO NOT use soft pastel tones — saturation stays high throughout
- DO NOT use subtle drop-shadow elevation — flat color blocking only
- DO NOT use rounded-corner containers WITHIN a band — the band's own edge is the only "container"

## Mobile strategy
Bands keep their full-bleed saturated color and stack normally. Reduce vertical padding modestly (not down to the Notion lane's mobile minimum) so the bold-block feeling survives — this lane should still feel chunky on a phone, not compressed into a muted list.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
