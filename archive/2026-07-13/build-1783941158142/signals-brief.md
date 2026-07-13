# Signals Brief — 2026-07-13

## Hero Copy
we can lose our way

## Hero Rationale
Lifted from today's quote — Kamal Ravikant: "No matter how smart we may think we are, no matter how committed we are to our truth, we can lose our way." The tail fragment is the part that screenshots: humble, exposed, universal. It rhymes with the day's new moon (0.4% illuminated — no light to navigate by) and with the Tigers being shut out 0–5 despite their certainty. On a portfolio that rebuilds itself blind every morning, "we can lose our way" is also a confession worth making out loud.

## Archetype
Scroll

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue** — 194° cyan. Chosen because "losing your way" is a navigation failure, and cyan is the color of fog, glacier melt, and open water — the surfaces on which people actually get lost. It also lands cleanly inside the only open mandate corridor (188°–208°), a deliberate hard pivot away from the last week of near-void-black canvases.
- **Neutral palette (cyan-tinted cool fog)** — 50 `#f2f7f8`, 100 `#e6eef0`, 200 `#cfdcdf`, 300 `#aebfc3`, 400 `#7e9297`, 500 `#5b6f74`, 600 `#45585c`, 700 `#344549`, 800 `#222f32`, 900 `#131c1e`
- **Accent color (glacial cyan)** — light `#38c4cf`, default `#14a8b6`, dark `#0b8794`, glow `#71dbe2`
- **Secondary accent** — none. One committed hue carries the page.
- **Background** — page bg `#d3f5f7` (light drenched fog), card bg `#ecfbfc`, sidebar/spine bg `#106b76` (deep cyan anchor)
- **Text colors** — primary `#131c1e`, secondary `#344549`, muted `#45585c` (all ≥4.5:1 on the fog bg). On the deep-cyan spine: `#ecfbfc`.

### 2. Typography
- **Hero phrase rendering** — Bricolage Grotesque display, lowercase for a reflective/humble register (not a shout), set as `display` token at `clamp(56px, 10vw, 148px)`. Stacked to 2–3 lines: "we can / lose our / way", with the single word **lose** carried in accent.dark `#0b8794` — the one place the fog thickens into color. Weight 800.
- **Line heights** — hero `0.92`, subhead `1.1`, body `1.6`, loose captions `1.8`.
- **Letter spacings** — hero `-0.03em`, body `0`, smallcaps/labels `0.12em`.

### 3. Layout Specification
- **Archetype** — Scroll. The phrase is about a path, so the page IS a path: one committed column descending through folds, the fog literally deepening as you go — fold 1 states the loss, fold 2 gives the whole quote, fold 3 lays out the day's evidence of the certain who still lost their way.
- **CSS grid/flex structure** — `display: grid; grid-template-columns: 72px 1fr;` (left spine + main scroll column). Main column is `display: flex; flex-direction: column;` with fold sections each `min-height` bounded.
- **Major dimensions**:
  - Hero fold height: `min-height: 92vh`
  - Left spine width: `72px`, full height, fill `#106b76`
  - Max content width: `max-width: none`; main column padding `96px 8vw`; body pull-quote pinned to `≤ 32ch` measure inside its fold for the full quote.
  - Section spacing: folds separated by `clamp(64px, 12vh, 128px)`.
- **Nav placement** — left spine (vertical), 72px wide, deep-cyan fill: mark at top, three rotated caps nav labels (`work / about / index`) reading bottom-to-top, small.
- **Hero phrase grid zone** — main column, fold 1, vertically centered, occupying ~82% of column width and rows spanning the first 92vh. Intended render ~144px cap height on 1440px.

### 4. Component Character
- **Border radius** — cards `8px`, buttons `8px`, tags `4px`.
- **Border treatment** — mostly borderless; where needed, 1px `#cfdcdf` (neutral.200) hairlines.
- **Shadow** — soft, cyan-cast fog depth: `0 20px 60px -24px rgba(16,107,118,0.28)`.
- **Density** — spacious in fold 1–2, tighter grid in fold 3 evidence cards (`repeat(auto-fit, minmax(240px,1fr))`).
- **Interactive states** — hover lifts card `-2px` and deepens shadow; links underline in accent.dark on hover.

### 5. Signal Integration
- **Where signals live** — fold 3 "the certain, and the lost" evidence band as a card grid; a thin new-moon chip pinned into fold 1's lower-left corner.
- **Sports scores** — Tigers `0–5` shutout styled as the lead evidence card: score in Bricolage numerals, label "detroit, shut out despite the plan" in muted caps. Tom Kim `-17 · Scottish Open` shown as counterpoint card ("someone who didn't").
- **Quote** — the full Ravikant quote is the fold-2 pull-quote at large scale with attribution "— Kamal Ravikant"; the hero phrase is its extracted tail.
- **New moon** — `new moon · 0.4% lit` chip in fold 1 corner, accent.dark text — "no light to steer by."
- **Music / HN** — Wet Leg · The War on Drugs · Tobin Sprout as a small footer colophon line; HN "GhostLock — 15 years unseen" folded into evidence as a lost-your-way artifact.

## Self-Check
1. Hero quotability: Yes — "we can lose our way" is a standalone confession, screenshot-ready, not descriptive boilerplate.
2. Because-of chain: Yes — path-phrase → Scroll (a path down) → Bricolage (expressive but humble, Scroll-tagged) → glacial-cyan fog (the surface you get lost on) → left-spine descending layout.
3. Render feasibility: Yes — 10vw/148px capped, lowercase, 2–3 line stack fills fold 1 at 1440×900 without overflow.
4. Canvas floor feasible: Yes — colored fog bg + deep-cyan spine + full-bleed folds clear the 65% Scroll floor easily.

## Rationale
The day handed me a quote that ends on an admission — "we can lose our way" — and that fragment is the whole design. It is quotable stripped of its context, and it gains force from two other signals: a new moon at 0.4% illumination (literally no light to steer by tonight) and the Tigers being shut out 0–5 despite whatever plan they walked in with. The phrase is about a path, so the archetype had to be a path: The Scroll, a single committed column that descends fold by fold, the fog thickening as you go — fold 1 states the loss, fold 2 unfurls the full Ravikant quote, fold 3 lays down the evidence of the certain-yet-lost.

Bricolage Grotesque (bricolage-manrope) is the chassis because the phrase is humble, not aggressive — a condensed signage face like Anton or Bebas would shout a line that wants to murmur. Bricolage renders lowercase at marquee scale with warmth and personality (1.500 ratio, marquee-capable), and it's Scroll-tagged. It also hasn't appeared in the recent chassis rotation, which is a bonus, not the reason. The single accent word "lose" in deep cyan is the only place the fog condenses into saturated color.

The palette is the sharpest decision: after a week of near-void black canvases (violet-void, rose-void, phosphor-black), I pivoted hard to a light, drenched glacial-cyan fog — the surface where people actually lose their way (open water, low cloud, glacier melt). Cyan at 194° sits inside the only open mandate corridor (188°–208°), so the pivot is both creative and compliant. The deep-cyan left spine anchors the fog and pushes color coverage past 65% so the light background never reads as timid white. Nav lives on that vertical spine (away from yesterday's top bar), the footer is a quiet colophon (away from yesterday's data strip), and the brand is a mark-only lockup in single-color cyan — recognizable, unreinvented, sitting cleanly at the top of the spine.
