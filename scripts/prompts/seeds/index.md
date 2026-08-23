# Seed: index

Two lanes anchor this archetype: Linear (dark, keyboard-first app density) and a warm-paper collector's catalog in the spirit of Are.na. The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:linear -->
**Lane: Linear**

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
<!-- /LANE -->

<!-- LANE:are-na -->
**Lane: Warm-Paper Collector's Catalog**

> Source: collector's-catalog web archives (Are.na and similar) — general genre characteristics of unhurried, human-curated indexes, not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
A human, unhurried catalog — closer to a zine's contents page or a collector's card catalog than a keyboard-first app. Warm paper tones, visible grid lines like a ledger, a small thumbnail image beside each entry. The opposite register from the Linear lane's dark app-density.

## Color roles
- bg: #F7F3EC — warm paper
- text: #2B2B28
- text.mid: #8A8478
- accent: #0000EE — classic hyperlink blue, deliberately old-web rather than a brand purple, used sparingly on active/linked entries
- border: #D8D2C4 — hairlines, visible as ledger rules

## Typography
- Display: whatever the chassis provides at 500–600, scale ratio 1.25 (still a list, not a poster)
- Body: 400, 14px, line-height 1.5
- Mono: a narrow entry-number column only (e.g. "01", "02", "03")

## Component cues
- Buttons: understated text links, blue underline on hover only
- Cards: no cards — rows again, but each row includes a small square thumbnail (40–56px) at the left
- Nav: simple top wordmark; a "channel" or category selector as tabs, not a sidebar

## Spatial rhythm
Rows slightly taller than a pure app-index (44–56px) to accommodate thumbnails. Ledger-style horizontal rules run every row. A loose left-column entry number in mono.

## Anti-patterns specific to this style
- DO NOT use a dark background — this lane is warm and paper-toned, not app-dark
- DO NOT use a purple/violet accent — that belongs to the Linear lane
- DO NOT omit the thumbnail — the catalog feel depends on it
- DO NOT set body copy in tabular-nums throughout — only the entry-number column is mono

## Mobile strategy
The thumbnail moves to a leading position above the title within each stacked card rather than beside it. Ledger rules remain visible between cards to preserve the catalog feel.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
