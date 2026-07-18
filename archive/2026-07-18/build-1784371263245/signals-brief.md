# Signals Brief — 2026-07-18

## Hero Copy
Better to light a candle than to curse the darkness.

## Hero Rationale
Pulled straight from `signals.quote` (Chinese Proverb), and it's genuinely poster-worthy — a complete, quotable aphorism about action over complaint. It rhymes hard with two of today's other signals: a waxing crescent moon at 20% illumination (day 4.4 — literally a small light returning to the sky) and a portfolio that rebuilds itself every dawn instead of resenting yesterday's version. The line carries an inherent light-vs-dark structure, which hands me the composition for free.

## Archetype
Stack

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue** — 98° (candle lime / acid chartreuse). The warm-flame corridor (30–55°) is inside the forbidden 0–93° zone; the only clean window the mandate leaves is 94–119°, and 98° reads as a candle's light *spilling* — a phosphor-lime glow rather than a literal orange flame. With risk at 8/10 this Liquid-Death-acid lane is the bolder, more distinctive call than a safe amber.
- **Neutral palette (smoked olive black)** — 50 `#f6f8f0`, 100 `#ecefe0`, 200 `#d5dbc3`, 300 `#b3bd97`, 400 `#899168`, 500 `#646c47`, 600 `#4a5133`, 700 `#333823`, 800 `#1f2314`, 900 `#12150b`
- **Accent color (candle lime)** — light `#cae95f`, default `#b5e61d`, dark `#8ab00f`, glow `rgba(181,230,29,0.35)`
- **Secondary accent** — none. One flame only.
- **Background** — page bg `#12150b`; darkness band `#12150b`; candle band `#b5e61d`; ledger band `#1f2314`
- **Text colors** — primary text on dark `#ecefe0`; on lime band `#12150b`; secondary `#b3bd97`; muted `#899168`

### 2. Typography
- **Hero phrase rendering** — Bricolage Grotesque `display` token. The full proverb splits across two central bands: "Better to light a candle" set in the lime band at `clamp(56px, 8vw, 128px)`, dark ink on lime; "than to curse the darkness." set on the dark band below at the same scale, lime on near-black, with "the darkness" dropping to muted `#899168` so the dark literally fades. Attribution "— Chinese Proverb" in Manrope smallcaps beneath.
- **Line heights** — hero 0.95; band sublines 1.1; body 1.5; light-on-dark body bumped to 1.6
- **Letter spacings** — hero -0.02em; body 0; smallcaps/labels 0.12em (uppercase)

### 3. Layout Specification
- **Archetype** — The Stack. Full-width horizontal bands descend from dark → lit → dark → ledger, embodying the proverb's own arc: the candle band burns brightest in the middle, the darkness band is demoted below it, and the eye leaves on data, not despair.
- **CSS grid/flex structure** — `display: grid; grid-template-rows: auto minmax(38vh,1fr) minmax(30vh,1fr) auto; grid-template-columns: 1fr; min-height: 100vh`
- **Major dimensions**:
  - Kicker band: `min-height: 12vh`, padding `24px 6vw`
  - Candle (lime) band: `min-height: 38vh`, padding `64px 6vw`
  - Darkness band: `min-height: 30vh`, padding `48px 6vw`
  - Ledger band: `min-height: 16vh`, padding `32px 6vw`
  - `max-width: none` on all bands; side padding via `6vw`
- **Nav placement** — corner mark top-left of the kicker band (mark-only, 44px); caps links inline right in the bottom ledger band, so navigation and signal data share the closing moment.
- **Hero phrase grid zone** — rows 2–3 (candle band + darkness band), full width, occupying ~68% of viewport height combined; intended cap height ~120px at desktop.

### 4. Component Character
- **Border radius** — cards/chips 8px; buttons 4px; tags `full` (pill). none = 0.
- **Border treatment** — mostly borderless (bands carry contrast); hairline `1px solid` `border` token only between ledger columns.
- **Shadow** — none on bands; the candle band emits a `box-shadow: 0 0 120px rgba(181,230,29,0.35)` upward glow into the darkness band seam.
- **Density** — spacious in hero bands, compact in the ledger.
- **Interactive states** — nav links underline-grow in lime on `_hover`; ledger rows lighten background one step.

### 5. Signal Integration
- **Signal elements** — waxing-crescent chip pinned top-right of the kicker band ("waxing crescent · 20% · a light returning"), thematically the candle in the sky. Golf, Tigers, and music all live in the ledger band.
- **Sports scores** — Tigers "W 2–1" in Manrope tabular-nums, lime for the "W"; understated, one line.
- **The Open leaderboard** — three tabular rows, Lucas Herbert −8 lit in candle lime as the leader; Young/Gerard −6 in secondary.
- **The quote IS the hero phrase** — rendered as the two central marquee bands; attribution "— Chinese Proverb" in smallcaps under the darkness band.
- **Music** — Tobin Sprout · Wet Leg · The War on Drugs as a lime-dotted inline list in the ledger. **Holiday** — none today.

## Self-Check
1. Hero quotability: Yes — a complete standalone proverb anyone would screenshot.
2. Because-of chain: Yes — the light/dark structure dictated Stack, warmth dictated Bricolage, the flame dictated lime-on-black, the arc dictated the band order.
3. Render feasibility: Yes — the phrase splits naturally at "candle / than" across two bands, so no single line overflows at 1440px.
4. Canvas floor feasible: Yes — full-bleed horizontal bands trivially exceed 65% utilization.

## Rationale
The day handed me a finished poster in `signals.quote`: "Better to light a candle than to curse the darkness." It is a complete, standalone aphorism — the exact test for a hero phrase — and it doubles as a mission statement for a site that demolishes and rebuilds itself every morning rather than resenting the version it just was. Two other signals fuse to it: a waxing crescent at 20% illumination is a literal small light returning to the sky, and the Tigers' quiet 2–1 win is a candle rather than a blowout. The phrase's own structure — a lit thing set against a dark thing — is the composition.

Because the line contains its own light-vs-dark opposition, The Stack is the only honest archetype: full-width bands descending dark → lit → dark → ledger, so "Better to light a candle" literally burns as a lime band while "than to curse the darkness" is demoted to a fading near-black band below it. The proverb is warm wisdom, not athletic shouting, so I rejected Anton/Bebas in favor of Bricolage Grotesque (bricolage-manrope, 1.500 ratio, Stack-tagged, expressive and humane) — it renders the marquee lines big and warm without tipping into billboard parody, and Manrope keeps the ledger's leaderboard and music list crisp. Stack is fresh against a week of Specimen/Poster/Split.

The palette is where the mandate and the metaphor collide productively: the warm-flame corridor (30–55°) sits inside the forbidden 0–93° zone, and the only clean window is 94–119°. Rather than fight it, I read the candle as *light spilling* — an acid-lime phosphor glow at 98° — which, with risk dialed to 8/10, is the bolder Liquid-Death-acid gesture over a safe amber. One flame, one accent: candle lime burns across a full band and lights only the Open leader Herbert (−8) and the Tigers' "W," while everything else lives in smoked olive-black tinted toward that same 98°. Shell moves are all fresh against the recent avoid list: a corner-mark nav (mark-only-md, single-color lime via currentColor), inline caps links folded into a full-width signal-ledger band that carries the golf, Tigers, music, and moon.
