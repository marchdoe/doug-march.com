# Seed: gallery-wall

Two lanes anchor this archetype: Pinterest (light masonry mosaic) and a black-canvas portfolio grid in the spirit of Behance. The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:pinterest -->
**Lane: Pinterest**

> Source: Pinterest via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Masonry mosaic. Image-first, varied tile sizes, tight horizontal gaps and slightly wider vertical ones. Reads like a curated pinboard — visual first, label second. The red accent only appears on actionable marks (bookmark, follow). Confident whitespace between clusters.

## Color roles
- bg: #FFFFFF — clean canvas
- bg.tile: transparent — tiles ARE the images
- text: #111111 — titles below tiles
- text.mid: #767676 — metadata, captions
- accent: #E60023 — Pinterest red, used only on interactive icons or active states
- border: transparent (no borders on tiles) — separation comes from gaps
- tile-radius: 16px

## Typography
- Display: "Inter" or "Sohne" 700, scale ratio 1.3 (tiles, not posters — type supports imagery)
- Body: "Inter" 400, 14px, line-height 1.4
- Mono: rarely; captions only

## Component cues
- Buttons: pill, fully rounded, filled red for primary, filled black for secondary, 14px
- Cards: the tile IS the card — 16px radius, no border, no shadow, slight hover lift
- Nav: top bar with small logo, search centered, account cluster right

## Spatial rhythm
Masonry columns (3–5 depending on viewport). Column gap tight (12–16px). Row gap slightly wider (16–24px). Tile aspect ratios vary — 1:1, 2:3, 3:4, 3:5 — to avoid a perfect grid. Clusters break with section headings that are quiet, not loud.

## Anti-patterns specific to this style
- DO NOT enforce uniform tile heights — masonry depends on varied aspect
- DO NOT use drop shadows or thick borders on tiles
- DO NOT use the red accent as a large fill — it marks interactions only
- DO NOT render fewer than 6 tiles on the first viewport — density is the voice
- DO NOT use serif type

## Mobile strategy
Wall becomes a vertical scroll of framed artifacts on mobile. Each artifact keeps its scale *relative* to viewport width (e.g. 80vw for featured pieces, 60vw for thumbnails) rather than absolute pixels. The curator's logic should still read — don't just list items end to end; keep the varied rhythm.
<!-- /LANE -->

<!-- LANE:behance -->
**Lane: Black-Canvas Portfolio Grid**

> Source: portfolio-platform galleries (Behance and similar) — general genre characteristics of dark-canvas regular-grid case-study presentation, not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
A curator's black gallery wall — project tiles float on near-black with generous negative space between them, each tile a case-study teaser rather than a single image. More portfolio than mood board — the opposite ground and rhythm from the Pinterest lane's light, tight masonry.

## Color roles
- bg: #111111 — near-black
- bg.tile: #1C1C1C — card surface
- text: #F5F5F5
- text.mid: #9E9E9E
- accent: #1769FF — used only on interactive marks (likes, view counts, active state)
- border: 1px #2A2A2A — visible hairline around tiles, unlike the Pinterest lane's borderless tiles

## Typography
- Display: whatever the chassis provides at 600–700, scale ratio 1.333 (tiles support the work, not shout over it)
- Body: 400, 14px, line-height 1.5
- Mono: not used in this lane

## Component cues
- Buttons: pill, outlined (not filled) on dark; blue fill reserved for the single primary CTA
- Cards: tiles carry a visible 1px border and a title + one-line description below the image (unlike Pinterest's caption-optional tiles)
- Nav: dark bar, search field with a subtle border, profile cluster right

## Spatial rhythm
A regular grid (not masonry) — 2–4 columns of consistent-height tiles, generous 24–32px gaps (wider than Pinterest's tight 12–16px), because each tile carries more information (title + description) and needs room to read.

## Anti-patterns specific to this style
- DO NOT use a white background — this lane is dark-canvas by definition
- DO NOT use masonry or varied-height tiles — the regular grid is what distinguishes this lane from the Pinterest lane
- DO NOT omit the title + description under each tile
- DO NOT use the red accent — that belongs to the Pinterest lane; blue only

## Mobile strategy
The grid drops to a single column of full-width tiles. Title + description stay directly under each image, never overlaid on top of it — overlaid text on a portfolio tile reads as a broken image, not a design choice.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
