# Signals Brief — 2026-07-21

## Hero Copy
EIGHTY PERCENT ON TOMORROW

## Hero Rationale
Brian Tracy's line — "Spend eighty percent of your time focusing on the opportunities of tomorrow rather than the problems of yesterday" — is the exact operating manifesto of a portfolio that demolishes and rebuilds itself every dawn. Distilled to its marquee "EIGHTY PERCENT ON TOMORROW," it is quotable stripped of context and it carries its own layout instruction: an 80/20 ratio. The counterweight — "twenty on yesterday" — becomes the demoted sliver, so the phrase's arithmetic literally becomes the composition.

## Archetype
Split

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification
- **Primary hue** — 276° electric violet. It is the sole clean corridor left by the mandate (264°–301°) AND the right emotional read: forward-leaning twilight/dawn optimism to match "opportunities of tomorrow." Unused in the recent rotation.
- **Neutral palette** (violet-tinted) — 50 `#f7f5fb`, 100 `#efecf5`, 200 `#ddd8e8`, 300 `#c3bcd3`, 400 `#9b93ac`, 500 `#736a86`, 600 `#554d67`, 700 `#3f384f`, 800 `#292236`, 900 `#16111f`
- **Accent color** (lilac pulse) — light `#c9a8ff`, default `#a970ff`, dark `#8a45f0`, glow `#d9c0ff`
- **Secondary accent** — the lilac pulse `#a970ff` is used ONLY to light the winning golf number (Fox −10) and the highlighted word "TOMORROW"; nowhere else.
- **Background** — page bg `#16111f` (violet-black); the 80% "tomorrow" panel is a saturated violet field `#6a2fd4`; the 20% "yesterday" sliver bg `#120d1e`; card bg `#1e1830`
- **Text colors** — primary text on violet panel `#f8f5ff`; primary text on dark `#f5f2fe`; secondary `#c3bcd3`; muted `#9b93ac`

### 2. Typography
- **Hero phrase rendering** — Bebas Neue display token at `clamp(80px, 10vw, 160px)`, set in the violet panel as knockout near-white caps, stacked "EIGHTY PERCENT / ON TOMORROW" (2 lines), with "TOMORROW" carrying the lilac glow. IBM Plex Sans handles attribution, nav, and all sliver signal copy.
- **Line heights** — hero `0.85`; snug subheads `1.05`; body `1.5`; loose `1.7`
- **Letter spacings** — hero `0.01em` (Bebas wants a hair of air), body `0`, smallcaps/labels `0.12em`

### 3. Layout Specification
- **Archetype** — Split. The phrase is literally about an 80/20 division of attention, so the canvas divides 80/20: the dominant violet panel is TOMORROW, the narrow sliver is YESTERDAY. Both halves are active surfaces; no center void.
- **CSS grid/flex structure** — `display: grid; grid-template-columns: 4fr 1fr; min-height: 100vh;` (= 80% / 20%). On <768px it collapses to `grid-template-rows: auto auto` (violet stacked above sliver).
- **Major dimensions**:
  - Hero/featured area (violet panel): `min-height: 100vh`
  - Sliver panel: `width: 20%` (grid 1fr of 5)
  - Max content width: `max-width: none`; violet panel padded `96px 5vw`; sliver padded `48px 24px`
  - Section spacing: 48px between hero block, attribution, and golf callout inside the violet panel
- **Nav placement** — clean inline top row INSIDE the violet panel only: brand lockup flush left, three all-caps Plex links (`WORK · ABOUT · LOG`) flush right, transparent over the violet field, no band, height ~64px. Deliberately not a nameplate masthead — no dateline, no ink bar.
- **Hero phrase grid zone** — violet panel, vertically centered block occupying roughly rows 2–4 of that column (below nav, above the golf callout); intended footprint ~1000×420px on a 1440×900 viewport.

### 4. Component Character
- **Border radius** — cards 4px, buttons 4px, tags 2px (near-hard, editorial)
- **Border treatment** — mostly borderless; a single 1px seam (`border` token `#3f384f`) marks the 80/20 division; sliver signal rows separated by hairline rules
- **Shadow** — none (flat, drenched fields carry depth by color, not shadow)
- **Density** — violet panel spacious; sliver compact and tabular
- **Interactive states** — nav links underline-from-left on hover in lilac `#c9a8ff`; golf/Tigers rows brighten muted→primary text on hover

### 5. Signal Integration
- **Where signal elements live** — TOMORROW panel (violet): today's realized win — The Open Final. YESTERDAY sliver (dark): the backward-looking data — Tigers score, music, moon, colophon.
- **Sports scores** — Golf: "THE OPEN · FINAL / RYAN FOX −10" set in Bebas medium caps, the −10 lit in lilac pulse `#a970ff`, pinned bottom-left of the violet panel as the day's opportunity-seized. Tigers "W 8–6" set in Plex tabular-nums in the sliver, muted grey (a completed yesterday).
- **Quote** — the quote IS the hero phrase; attribution "— BRIAN TRACY" sits in Plex smallcaps beneath the marquee at `0.12em` tracking.
- **Moon** — first-quarter / 50% illumination noted as a single tabular line in the sliver colophon.
- **Holiday** — none today; omitted.
- **Music** — Radiohead · Guided by Voices · Tobin Sprout listed in the sliver as a small stacked credit under the moon line.

## Self-Check
1. Hero quotability: Yes — "EIGHTY PERCENT ON TOMORROW" is a standalone aphorism, screenshot-worthy, not descriptive boilerplate.
2. Because-of chain: Yes — the phrase's 80/20 arithmetic dictated the Split ratio; its optimism dictated the violet drench; its declarative caps dictated Bebas.
3. Render feasibility: Yes — Bebas is heavily condensed; "EIGHTY PERCENT" / "ON TOMORROW" holds two lines within an ~1150px panel at 160px without overflow.
4. Canvas floor feasible: Yes — a full-height 80/20 Split with a saturated violet field easily exceeds 65% utilization and ~65% color coverage.

## Rationale
The day handed me a working thesis, not a decoration: Brian Tracy's instruction to spend eighty percent of your attention on the opportunities of tomorrow rather than the problems of yesterday. On a portfolio that tears itself down and rebuilds every morning — a machine designed to look forward — that is the mission statement, so I distilled it to the marquee "EIGHTY PERCENT ON TOMORROW." The phrase is quotable in isolation and, crucially, it carries its own geometry: an 80/20 ratio.

That ratio is why the composition is a Split and nothing else. The canvas divides `4fr 1fr` — the dominant violet field is TOMORROW and carries the marquee, the day's realized win (Ryan Fox taking The Open at −10, that number lit in lilac), and a clean inline nav; the narrow sliver is YESTERDAY, demoted, holding the completed Tigers box score, the music, the moon, and a small colophon. The phrase's arithmetic literally becomes the layout, which keeps the archetype content-driven rather than template-applied — directly answering yesterday's note about layouts feeling like a menu pick. Bebas Neue (bebas-plex, 1.500, Split-tagged and fresh against a rotation dominated by Anton and Big Shoulders) renders the two-line knockout at up to 160px inside the wide panel without overflow, while IBM Plex Sans keeps the attribution, scores, and sliver data crisp and tabular.

Color obeyed the mandate and the metaphor at once: recent palettes scorched the wheel and left only the 264°–301° corridor clean, and 276° electric violet is exactly the forward-tilting twilight tone this optimism wants — echoed, conveniently, by tonight's first-quarter moon. I drenched the 80% panel in saturated violet with luminous near-white type (coverage north of 62%), tinted every neutral toward the same hue so the violet-black sliver reads as the same world in shadow, and reserved a single lilac pulse for only two things: the word "TOMORROW" and Fox's winning −10. The shell stays deliberately clean — a bandless inline top row (brand horizontal-sm in single-color white via currentColor, three caps links) fixes the messy-header complaint — and the footer folds into the base of the yesterday sliver as a quiet colophon, fresh against the recent BOM/folio/ledger treatments.
