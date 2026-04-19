# Seed: gallery-wall — inspired by Pinterest

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
