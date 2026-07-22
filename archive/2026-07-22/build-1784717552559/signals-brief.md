# Signals Brief — 2026-07-22

## Hero Copy
NO CHOICE BUT TO LIVE IT

## Hero Rationale
Lifted from today's `signals.quote` — Kamal Ravikant: "When something comes from within, when it is a part of you, you have no choice but to live it, to express it." Distilled to its imperative core, "NO CHOICE BUT TO LIVE IT" is quotable in isolation and reads as a manifesto, not a caption. It's the truest possible thesis for a portfolio that tears itself down and rebuilds every dawn — a site that cannot help but keep expressing itself — so it earns the whole canvas.

## Archetype
Specimen

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue** — 190° teal. Deep water is the visual metaphor for "comes from within"; the mandate's only clean corridor (181°–202°) lands exactly here, so honoring the constraint and the concept coincide.
- **Neutral palette (teal-tinted)** — 50 `#F2FBFB`, 100 `#E1F0F0`, 200 `#C4DCDD`, 300 `#9FBEC0`, 400 `#6F9497`, 500 `#4E7275`, 600 `#385659`, 700 `#274143`, 800 `#182E30`, 900 `#0D1E20`
- **Accent color (electric aqua ~175°)** — light `#5CEBDD`, default `#1FDDCB`, dark `#0FA697`, glow `rgba(31,221,203,0.45)`
- **Secondary accent** — none beyond the single aqua pop; the design is one committed hue.
- **Background** — page bg `#0C464B` (deep teal drench), card/panel bg `#0F565C`, sidebar/spine bg `#082F33`
- **Text colors** — primary text `#F2FBFB`, secondary/body `#E1F0F0`, muted `#9FBEC0`

### 2. Typography (chassis: Bricolage Grotesque + Manrope)
- **Hero phrase rendering** — `display` token (Bricolage Grotesque) at `clamp(72px, 12vw, 200px)`, set uppercase across three stacked lines: "NO CHOICE" / "BUT TO" / "LIVE IT". "LIVE IT" rendered in accent aqua `#1FDDCB` with a soft glow; the first two lines in cream. Fills ≥72% of both width and height — type IS the composition.
- **Line heights** — hero `0.90`; attribution/labels `1.1`; body/signal text `1.5`
- **Letter spacings** — hero `-0.02em` (tight, expressive); smallcaps labels `0.14em`; body `0.005em`

### 3. Layout Specification
- **Archetype** — Specimen. A single interior imperative deserves to BE the page; nothing competes with the phrase, everything else is demoted to the margins as caption.
- **CSS grid structure** — `display: grid; grid-template-columns: 72px 1fr 260px; grid-template-rows: 1fr auto;` — left spine, dominant type field, right signal margin.
- **Major dimensions**:
  - Hero/type field: `min-height: 100vh`, occupies center column, vertically centered
  - Left spine: `width: 72px`, full height
  - Right signal margin: `width: 260px`, full height
  - Max content width: `max-width: none`; side padding `clamp(32px, 5vw, 80px)` inside the type field
  - Attribution: pinned bottom-left of the type field, `margin-top: clamp(32px, 5vh, 64px)`
- **Nav placement** — LEFT SPINE (fresh vs. recent shells): vertical 72px column against `#082F33`; brand mark at top, three all-caps links (`WORK · ABOUT · INDEX`) set rotated `-90deg` reading bottom-to-top down the spine, `0.14em` tracking, `#9FBEC0` resting → `#1FDDCB` on hover.
- **Hero phrase grid zone** — column 2 (the 1fr center), rows 1, vertically centered; intended render ~72% viewport width × ~60% viewport height as a three-line block.

### 4. Component Character
- **Border radius** — none (`0`) everywhere; hard specimen edges. Tags/labels square.
- **Border treatment** — single hairline rules only: `1px solid #385659` separating the right signal margin and under each signal row. Type field itself borderless.
- **Shadow** — none on surfaces. One text-glow on the accent word: `text-shadow: 0 0 40px rgba(31,221,203,0.45)`.
- **Density** — spacious in the type field, compact/tabular in the right margin.
- **Interactive states** — spine links shift `#9FBEC0 → #1FDDCB` with `0.14em → 0.18em` tracking on hover; no motion elsewhere except a single staggered fade-up on load for the three hero lines.

### 5. Signal Integration
- **Where signal elements live** — RIGHT SIGNAL MARGIN (260px column), a vertical tabular stack of small labeled rows; the quote is the hero, so it lives center-stage, not here.
- **Sports scores** — Tigers 2–11 loss styled as a demoted, muted row: label "TIGERS · MLB" in `#6F9497` smallcaps, score `2–11` in Manrope tabular-nums `#9FBEC0` (never lit — a loss doesn't get the accent). Golf "3M OPEN · SCHEDULED" as a quiet upcoming row.
- **Quote display** — the quote IS the hero phrase. Attribution "— KAMAL RAVIKANT" set small-caps `0.14em` in `#9FBEC0` beneath the type block, bottom-left.
- **Music** — "ON ROTATION" row: Wet Leg / Guided by Voices, `#E1F0F0`.
- **Moon** — "FIRST QUARTER · 61%" row with a small aqua crescent tick.
- **Sun / season** — "JUL 22 · 14.3H LIGHT" almanac row at the base of the margin.
- **Holiday** — none today; omitted.

## Self-Check
1. Hero quotability: Yes — "NO CHOICE BUT TO LIVE IT" stands entirely alone as a manifesto line, not descriptive filler.
2. Because-of chain: Yes — intimate interior imperative → Specimen (type is the page) → Bricolage (warm expressive display, not athletic shouting) → deep-water teal drench with one lit word → centered type field flanked by spine + margin.
3. Render feasibility: Yes — three short caps lines (max "NO CHOICE" = 9 chars) at clamp up to 200px hold within a 1440px center column at 0.90 line-height without overflow.
4. Canvas floor feasible: Yes — a 200px three-line block plus spine and signal margin genuinely occupy ≥72% of 1440×900.

## Rationale
The day gave me a line worth the whole page. Kamal Ravikant's quote is really about compulsion — the thing inside you that leaves you "no choice but to live it." Stripped to that imperative, "NO CHOICE BUT TO LIVE IT" is the quiet mission statement of a site that cannot stop re-expressing itself every morning. Because the phrase is an interior imperative rather than a headline about anything external, it can't be one object among many — it has to BE the object. That forces the Specimen: type at poster scale filling both axes, everything else demoted to the margins as caption.

Chassis follows from tone. This is not athletic shouting like the Anton/Bebas/Big-Shoulders posters of the past week — it's something warmer, something that comes "from within." Bricolage Grotesque (bricolage-manrope, 1.500 ratio) is the expressive, humanist display face that can carry "LIVE IT" at 200px with warmth instead of billboard aggression, while Manrope keeps the right-margin signals tabular and quiet. Palette follows the metaphor and the mandate simultaneously: the only clean corridor left on the wheel is 181°–202°, and 190° deep-water teal is the perfect reading of "from within" — depth, pressure, something welling up. I drench the canvas in it (coverage ≥62%) so a single electric-aqua "LIVE IT" can surface like a thing you can't hold under. One hue, one lit word, no hedging neutrals.

Layout answers the owner's two standing notes directly. The header has been the recurring complaint, so I abandon top bars entirely: navigation moves to a genuine left spine — a fresh treatment against the last seven shells — with links reading vertically up the edge, and the signals move to a right margin column, leaving the center free for nothing but the phrase. And rather than feeling like a menu-picked "layout," the Specimen here is dictated by the content: an interior imperative literally becomes the interior of the page, flanked by two thin margins of context. The Tigers' 2–11 loss is deliberately never lit — a blowout defeat gets muted tabular treatment in the margin, not the accent — keeping the aqua glow reserved for the one word that matters.
