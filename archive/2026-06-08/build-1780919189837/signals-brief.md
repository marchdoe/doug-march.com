# Signals Brief — 2026-06-08

## Hero Copy
The world makes way for the man who knows where he is going.

## Hero Rationale
Today's `signals.quote` delivers this Emerson line fully formed — and it earns the hero slot because it doubles as a portfolio thesis. A site that dismantles its own visual identity each morning, reads the day, and reconstitutes itself with directed intention is the literal enactment of the sentence. The phrase isn't decorative inspiration pinned above a desk; it is the operating mechanism of this exact page. The Memorial Tournament just closed (J.T. Poston, −12, no wasted shots), the Tigers ground out a 5–4 win, and the HN front page leads with someone building from zero after everything — a Monday full of men who knew where they were going. The phrase lands correctly.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:75° (chartreuse). Mandate allows 68°–82°; midpoint chosen. This hue is not tactical compliance — it is the color of directionality. A green light. June daylight. Course fairways. The inverse of hesitation.
- **Neutral palette** (tinted H:75°, very low chroma, warm-green lean):
  - 50: `#F6F8EB` — warm near-white, masthead paper
  - 100: `#E9EDCC`
  - 200: `#D1D69E`
  - 300: `#ACAF72`
  - 400: `#838750` — muted text floor (5.7:1 on bg)
  - 500: `#5F6235`
  - 600: `#464920`
  - 700: `#2F3110`
  - 800: `#1A1C05` — card surface
  - 900: `#0A0C02` — page bg, near-black with faint green breath
- **Accent:** light `#DAFF33`, default `#BFFF00`, dark `#8ABE00`, glow `rgba(191,255,0,0.20)` — chartreuse at full saturation, 16.7:1 contrast on `#0A0C02`
- **Secondary accent:** none
- **Background:** page bg `#0A0C02`, card bg `#1A1C05`, sidebar bg `#141603`
- **Text:** primary `#F6F8EB` (19:1 on bg), secondary `#D1D69E` (13:1), muted `#838750` (5.7:1)

---

### 2. Typography (chassis: spectral-albert)

- **Hero phrase rendering:** `display` token (Spectral), weight 700, italic, `clamp(48px, 5.5vw, 80px)`. Renders as 3 explicit lines at forced line breaks — "The world makes way / for the man who knows / where he is going." Left-aligned, flush to the 6vw left edge of the masthead content zone. Color: `#F6F8EB`. Attribution line below: "— Ralph Waldo Emerson" in Albert Sans 500 small-caps, 13px, `letter-spacing: 0.18em`, color `#838750`.
- **Line heights:** hero 0.93 (Spectral italic compressed); column heads 1.0; body prose 1.65; signal data rows 1.3
- **Letter spacings:** hero `-0.01em` (Spectral needs almost nothing); column label small-caps `0.14em`; masthead dateline `0.22em`; scores/numerics `0.03em` tabular

---

### 3. Layout Specification

- **Archetype:** Broadsheet. A man who knows where he is going leaves a printed record of it. The portfolio is his newspaper — the quote is the masthead declaration, the columns below are the filed dispatches. Structure IS argument.

- **CSS grid/flex structure:**
  ```
  body → display: flex; flex-direction: column; min-height: 100vh
  
  .masthead   → width: 100%; height: 56px; padding: 0 6vw; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #BFFF00
  
  .hero-zone  → width: 100%; min-height: 32vh; padding: 48px 6vw 40px; display: flex; flex-direction: column; justify-content: flex-end
  
  .divider    → width: 100%; height: 1px; background: #2F3110; margin: 0
  
  .columns    → display: grid; grid-template-columns: 28fr 46fr 26fr; min-height: 52vh; border-top: 1px solid #1A1C05
  
  .col-left   → padding: 32px 6vw 40px 6vw; border-right: 1px solid #1A1C05
  .col-center → padding: 32px 3vw 40px; border-right: 1px solid #1A1C05
  .col-right  → padding: 32px 4vw 40px 3vw
  
  .footer-band → width: 100%; padding: 20px 6vw; border-top: 1px solid #1A1C05; display: flex; gap: 48px; align-items: center
  ```

- **Major dimensions:**
  - Masthead height: `56px`
  - Hero zone: `min-height: 32vh` — phrase renders at ~240px (3 lines × 80px × 0.93 leading), plus 24px attribution, plus vertical padding
  - Columns min-height: `52vh`
  - Footer: `~64px`
  - Total: fills 100vh+ for a slight scroll, as a proper broadsheet should
  - Max content width: `max-width: none; padding: 0 6vw` on masthead/hero; columns handle their own internal padding
  - Section padding: columns use `32px 3–6vw 40px` internally

- **Nav placement:** Integrated into left column — site name at masthead top-left (Albert Sans 700 small-caps `0.22em`), with section navigation links listed as a vertical stack in the left column below a "NAVIGATE" eyebrow, 14px Albert Sans 500, chartreuse bullets.

- **Hero phrase grid zone:** Full viewport width, inside `.hero-zone`, bottom-anchored (flex-direction column, justify-content flex-end). At 1440px: type renders at ~79px, three lines total ~240px of text mass. The phrase OWNS the top third of the viewport before the column break.

---

### 4. Component Character

- **Border radius:** none (0px) across all elements. Broadsheet has no rounded corners. Ink is angular.
- **Border treatment:** `1px solid #1A1C05` for column separators. `2px solid #BFFF00` for masthead bottom accent only. No box shadows.
- **Shadow:** none. Depth comes from surface contrast alone (`#0A0C02` bg vs `#1A1C05` card bg — subtle but perceptible).
- **Density:** HIGH. Newspaper density. Each column packs 4–6 content items. No generous negative space inside columns. Column gutters are implied by the 1px border, not by air.
- **Interactive states:** Links on hover → color transitions from `#BFFF00` to `#F6F8EB`; project rows on hover → 1px chartreuse left-border appears via `border-left: 3px solid #BFFF00; padding-left: calc(prev - 3px)` shift, no background change. No box-shadow on hover.

---

### 5. Signal Integration

- **Signal location:** Right column (`.col-right`) entirely devoted to live signals. Eyebrow: "TODAY'S FIELD" in Albert Sans small-caps `0.14em` tracking, 11px, `#838750`.
- **Tigers score:** "TIGERS WIN · 5–4" — "WIN" in `#BFFF00` weight 700 small-caps, numerics at 28px Albert Sans tabular `font-variant-numeric: tabular-nums`, color `#F6F8EB`.
- **Memorial Tournament:** Compact 2-row leaderboard — "MEMORIAL TOURNAMENT · FINAL" eyebrow, then Poston -12 and Gerard -12 (TIE noted in `#838750` italic), Fleetwood/Clark at -11/-10 in smaller type. Score deltas in chartreuse. "FINAL" badge in `#838750` small-caps.
- **Moon phase:** "LAST QUARTER · 35.7%" in `#838750` small-caps, preceded by a 1ch Unicode moon glyph `🌗` at 14px.
- **HN highlight:** Single story — "Building from zero after addiction, prison, and a felony" rendered as 2-line Albert Sans italic `#D1D69E` 14px, score "669" in `#BFFF00` beside it. A deliberate echo: a man who knows where he is going.
- **Music:** Footnote below scores — "THE WAR ON DRUGS / GUIDED BY VOICES" in `#5F6235` Albert Sans small-caps 11px, `0.14em`. Signal atmosphere, not signal content.
- **Quote treatment:** The Emerson line IS the hero phrase — set at full masthead scale in the `.hero-zone`, not as a blockquote in the signal column. The signals column contains only live data. The philosophical anchor runs above and independent.

## Self-Check
1. Hero quotability: Yes — "The world makes way for the man who knows where he is going" is a standalone declaration; screenshottable, quotable without context, and structurally doubles as this portfolio's operating thesis.
2. Because-of chain: Yes — phrase is directional/declarative → Broadsheet (the record of a directed life) → `spectral-albert` (editorial-masthead voice, first archetype listed for Broadsheet) → chartreuse H:75° (mandate zone, color of go, direction, June light) → packed columns (evidence of a man who knew, dispatches filed).
3. Render feasibility: Yes — Spectral 700 italic at `clamp(48px, 5.5vw, 80px)` renders the 3-line hero at ~240px on 1440×900 inside `.hero-zone` (32vh ≈ 288px), leaving 48px breathing room; no overflow risk.

## Rationale
The Emerson quote arrived from today's `signals.quote` as the most self-referential phrase available: a portfolio that tears down and rebuilds its own appearance every morning based on directed attention is the literal enactment of "the world makes way for the man who knows where he is going." The phrase isn't borrowed authority draped over a page — it is the page's operating logic stated plainly. J.T. Poston at −12 with no wasted shots, a Tigers grind of 5–4, Gavin Ray building from zero after everything — today's field is full of men who knew where they were going. The phrase earns marquee scale because it is simultaneously philosophical, autobiographical to the site, and quotable in isolation.

The Broadsheet archetype follows from the phrase without requiring persuasion. If a man who knows where he is going leaves a record, this page is the record. A Broadsheet is literally the newspaper of deeds: the masthead declaration at the top, the dispatches filed in columns below. Poster would put the phrase on a pedestal; Specimen would make it a typography exercise; Broadsheet makes the reader live inside the argument — you arrive at the declaration, then you step through the evidence in the columns. The structure IS the claim. `spectral-albert` is the only honest chassis for this: Spectral's editorial weight and italic cut render a philosophical masthead line at 80px with the voice of a de la Presse front page, not a stadium Jumbotron. The 1.333 ratio is exactly right — this phrase wants gravitas, not shouting.

Chartreuse H:75° is the only primary hue sitting inside the mandate's open 68°–82° window, but it would have been the correct choice regardless. This is the color of direction — a green light, the particular yellow-green of June fairways, of a navigation indicator, of momentum. On `#0A0C02` near-black (barely a void but undeniably tinted toward life and growth), `#BFFF00` chartreuse at 16.7:1 contrast reads with the force of neon ink — it is simultaneously future and newsprint, underground and authoritative, the dark broadsheet you find in a future where newspapers still know exactly what they're printing.
