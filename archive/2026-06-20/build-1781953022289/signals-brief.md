# Signals Brief — 2026-06-20

## Hero Copy
THE LONGEST DAY.

## Hero Rationale
June 20 — the day before the summer solstice — with 14.7 hours of daylight, sunrise at 04:49, sunset at 19:34. That solar fact is the phrase: not a metaphor, not a motivational gloss, but a declaration of exact time. "THE LONGEST DAY." also carries cinematic weight as a WWII film title, adding cultural resonance that makes it quotable in total isolation. Father's Day is tomorrow, the U.S. Open is deep into round three, and the world is at peak light — this phrase earns the stage.

## Archetype
Gallery Wall

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

**Primary hue:** H:28° (amber-orange). The mandate's only open corridor is 20°–42°; amber sits dead-center of it and is the literal color of the signal — peak summer sunlight at golden hour.

**Neutral palette (warm charcoal, amber-tinted):**
- 50: `#FAF5E8` — warm cream
- 100: `#F0E6CC`
- 200: `#D8C89A`
- 300: `#BC9E68`
- 400: `#9A7540`
- 500: `#7A5020`
- 600: `#5C3200`
- 700: `#3D1C00`
- 800: `#2A1000`
- 900: `#140C00` — near-black with amber warmth

**Accent color (amber gold):**
- light: `#FFD060`
- default: `#F5A020`
- dark: `#C07800`
- glow: `rgba(245, 160, 32, 0.18)`

**Secondary accent:** None.

**Background:**
- page bg: `#140C00`
- card bg: `#2A1000`
- sidebar bg: `#2A1000`

**Text colors:**
- primary: `#FAF5E8` — warm cream, 15.6:1 vs page bg ✓
- secondary: `#D8C89A` — mid cream
- muted: `#9A7540` — 4.8:1 vs page bg ✓

---

### 2. Typography

**Hero phrase rendering:** Anton (the `display` token from anton-inter-tight chassis). Three stacked lines — "THE" / "LONGEST" / "DAY." — set at `clamp(96px, 13.5vw, 195px)`. On a 1440px viewport: 13.5 × 14.4 = ~194px. Each line fills nearly the full width of its grid zone (columns 1–9, ~75vw). Color: amber `#F5A020`. Letter-spacing: `−0.03em`. Contrast: 9.6:1 vs page bg ✓

**Line heights:**
- Hero (Anton): `0.88` — condensed letterforms allow stacking with near-zero gap
- Subheadings: `1.1`
- Body / signal text: `1.55` — light text on dark needs extra air
- Labels / caps strips: `1.2`

**Letter spacings:**
- Hero: `−0.03em` — pull condensed into tight monument formation
- Eyebrows / all-caps labels: `0.12em`
- Body / data: `0em`
- Widest (nav, dateline): `0.18em`

---

### 3. Layout Specification

**Archetype:** Gallery Wall — asymmetric blocks spread across the full viewport canvas. The hero phrase occupies ~70% of the canvas as a dominant block; satellite blocks for the U.S. Open leaderboard, signal data, and project index scatter in the remaining space with irregular whitespace between them, not around the composition.

**CSS grid structure:**
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-auto-rows: auto;
gap: 2px; /* hairline seam between blocks */
width: 100vw;
min-height: 100vh;
```

**Block placements:**
- **Hero phrase block**: `grid-column: 1 / 10; grid-row: 1 / 5; min-height: 72vh; padding: 5vw 5vw 3vw 6vw;` — "THE LONGEST DAY." in three stacked Anton lines, amber on near-black
- **U.S. Open leaderboard block**: `grid-column: 10 / 13; grid-row: 1 / 3; padding: 32px 28px;` — compact standings list
- **Signal strip block**: `grid-column: 10 / 13; grid-row: 3 / 5; padding: 24px 28px;` — Tigers, lunar, Father's Day, music
- **Work index row**: `grid-column: 1 / 7; grid-row: 5; padding: 36px 6vw 48px;` — project index, Inter Tight
- **About + nav block**: `grid-column: 7 / 13; grid-row: 5; padding: 36px 28px 48px;` — capabilities snippet, Ryan Holiday quote, nav links

**Max content width:** `none` — full viewport edge to edge. Side padding via block-level `padding` only (6vw on hero block).

**Nav placement:** Inside the About+Nav block (bottom-right), Inter Tight 11px / widest letter-spacing / all caps. Three links: WORK · ABOUT · CONTACT. No top bar.

**Hero phrase grid zone:** Rows 1–4, columns 1–9. At 1440px viewport: ~1080px wide, min-height 72vh (~648px). Three Anton lines at ~194px cap height each = stacked monument fill.

---

### 4. Component Character

**Border radius:** `0px` throughout — hard edges, no softening. The phrase demands architectural clarity.

**Border treatment:** 2px hairline seam between grid blocks using `#3D1C00`. Accent blocks (leaderboard header, signal labels) use a 2px top border in `#F5A020` amber.

**Shadow:** None. The dark field creates depth without shadows.

**Density:** Hero block — airy (type breathes in the dark). Leaderboard + signal blocks — compact (14px / 1.3 line-height), maximum information per pixel.

**Interactive states:** Project links in work index — amber underline reveal on hover. Nav links — 1px amber border-bottom on hover. Leaderboard rows — subtle bg lighten `#2A1000` → `#3D1C00` on hover.

---

### 5. Signal Integration

**Hero (primary signal):** "THE LONGEST DAY." is the solar signal — June 20, 14.7 hours of daylight, solstice eve. The phrase IS the signal integration. Beneath the three stacked lines: a date strip at 13px Inter Tight — `JUNE 20, 2026 · SUMMER SOLSTICE EVE · 04:49 → 19:34` in amber at 0.12em tracking.

**U.S. Open leaderboard** (top-right block): Block header `U.S. OPEN — IN PROGRESS` in widest tracking, muted cream, 11px. Leader line: "WYNDHAM CLARK" Inter Tight bold 15px + `−7` in amber `#F5A020` at 18px tabular-nums, weight 700. T2 block: Schauffele / Kim / Stevens / Fitzpatrick at `−3` in `#D8C89A`. Hairline amber rule below the header.

**Signal strip** (right-middle block):
- `◑ FIRST QUARTER · 35%` — lunar, muted `#9A7540`, 12px
- `DET 4–3 WIN` — Tigers result, amber, 13px bold
- `FATHER'S DAY TOMORROW` — accent `#FFD060`, 12px caps, 0.10em tracking
- `MY MORNING JACKET · WET LEG · RADIOHEAD` — music, muted, 11px

**Father's Day:** Surfaced in signal strip in light gold — the solstice and Father's Day converging on consecutive days amplifies "THE LONGEST DAY." The day is not just the longest on the calendar; it is the longest in the relational sense.

**Ryan Holiday quote:** Rendered in the About+Nav block as a small pull quote — Inter Tight 13px italic, `#9A7540` muted, `"Within every obstacle is an opportunity to improve our condition."` — positioned below the capabilities snippet, not competing with the hero.

**Awwwards reference:** The Arkansas Museum of Fine Art (Studio Gang renovation) and House of Honey's "editorial elegance" inform the block-level approach — structured sections that each have distinct character within a coherent canvas.

## Self-Check
1. Hero quotability: Yes — "THE LONGEST DAY." is a three-word declaration referencing the June 20 solstice eve (14.7 hours of daylight), carries standalone cinematic weight as a cultural phrase, and would be screenshotted without context.
2. Because-of chain: Yes — the phrase required Gallery Wall (asymmetric dominance without framing), demanded Anton at 13.5vw condensed marquee scale (anton-inter-tight), and earned amber-on-near-black as the literal color of peak summer light filling the mandate's only open zone (20°–42°).
3. Render feasibility: Yes — Anton at `clamp(96px, 13.5vw, 195px)` stacked over three lines within `grid-column: 1/10` (~75vw) leaves full horizontal clearance; condensed letterforms prevent overflow at all viewport sizes above 480px.

## Rationale
The hero phrase arrived from the solar data without hesitation. June 20 — 14.7 hours of daylight, sunrise at 04:49, sunset at 19:34, one day before the official summer solstice — is the calendar's maximum: the longest day of the year. "THE LONGEST DAY." is three words that do not need context to land. They carry their own cultural weight (the WWII film, the idiom of exhaustion and scale), and they are exactly what the signals are announcing. Ryan Holiday's obstacle quote was considered and set aside — "Within every obstacle is an opportunity" is motivational wallpaper at this scale, and today's data offers something far more specific and poster-ready. The phrase is the signal.

Gallery Wall follows because "THE LONGEST DAY." is not an object to be framed — it is a presence to be arranged around. A Poster would give it a pedestal. A Specimen would make it the only thing. Gallery Wall lets the phrase dominate 70% of the canvas as the unmistakable anchor while the remaining space carries annotating blocks — the U.S. Open leaderboard (Wyndham Clark at −7, four clear), the Tigers' 4–3 win, the first-quarter moon at 35%, Father's Day tomorrow — scattered asymmetrically like margin notes on the longest day. The canvas is full, nothing is centered, the irregular whitespace between blocks is the design. Anton + Inter Tight is the only chassis that can carry the phrase at the scale it demands: Anton's condensed signage DNA makes three stacked lines at 13.5vw feel carved rather than blown up, and Inter Tight's precision keeps the leaderboard and signal data legible at 12–14px without competing with the monument above it.

The palette is both mandate-compliant and thematically earned. The forbidden zones (0°–20° and 42°–360°) leave exactly one corridor open: 20°–42°, warm amber-orange. This is not a constraint — it is a gift. H:28° amber is the precise color of peak-summer afternoon light, the warmth that arrives at 14.7 hours of solar exposure and does not leave until nearly 19:34. Against near-black warm charcoal (`#140C00` — not pure black, tinted amber so the dark carries the same family warmth), the blazing `#F5A020` achieves 9.6:1 contrast while reading as the sun itself pressed into type. Seven straight builds emptied the archive of warmth; this is the first amber-gold build and it earns its temperature.
