# Seed: index — inspired by Linear

> Source: Linear via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Ultra-minimal list/table density. Reads like a well-kept index — tabular numerals, aligned columns, one-line rows, small metadata. Feels like a keyboard-first app. Muted palette; the purple accent is rare and precise.

## Color roles
- bg: #08090A — near-black, slightly blue
- bg.row: transparent with rgba(255,255,255,0.02) on hover
- text: #E6E6E6 — primary
- text.mid: #8A8F98 — secondary metadata
- text.dim: #62666D — tertiary, timestamps
- accent: #5E6AD2 — Linear purple, used on active row indicators and links only
- border: rgba(255,255,255,0.06) — hairline row dividers

## Typography
- Display: "Inter" 600, scale ratio 1.25 (small contrast — this is a list, not a poster)
- Body: "Inter" 400, 14px, line-height 1.45, tabular-nums feature enabled
- Mono: "IBM Plex Mono" 400, 12px — IDs, timestamps

## Component cues
- Buttons: small, 6px radius, 13px, icon + label, subtle hover fill
- Cards: no cards — rows in a list, separated by 1px hairlines
- Nav: left sidebar with item list, keyboard hints inline (e.g., "G then I")

## Spatial rhythm
Tight vertical rhythm — rows are 32–40px tall. Horizontal columns aligned to a fixed grid (e.g., Title 40%, Type 15%, Year 10%, Meta 35%). Spacing scale is small-step (4, 8, 12, 16). No hero section — the index IS the page.

## Anti-patterns specific to this style
- DO NOT render a large hero — the list is the first thing
- DO NOT use drop shadows or rounded cards
- DO NOT vary row heights — uniform rhythm is the voice
- DO NOT use serif type
- DO NOT apply the purple accent as a background fill — it marks, never coats

## Mobile strategy

Table rows collapse to stacked cards at ≤ 768px. Year / role / description become inline labels within each card, not adjacent columns. The overall "index" character is preserved by keeping consistent row rhythm and visible row numbers or bullets.
