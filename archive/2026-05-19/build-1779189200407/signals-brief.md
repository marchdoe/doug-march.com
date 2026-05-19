# Signals Brief — 2026-05-19

## Hero Copy
FOURTEEN HOURS OF LIGHT.

## Hero Rationale
Today's most striking environmental fact: 14.3 hours of daylight on May 19th, deep into spring's longest-lit arc. For a site that redesigns itself daily by reading environmental signals, leading with the exact measurement of today's light is both the premise and the proof — the mechanism announcing itself through its own output. "FOURTEEN HOURS OF LIGHT." is specific enough to be a news report and strange enough to stop a scroll. The period makes it a declaration, not a caption.

## Archetype
Stack

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:162°, the exact chromatic midpoint of the color mandate's permitted window (150°–175°). Marine teal: the color of a glass of water held up to spring light, of tide-pool shallows, of calibration instruments. Not the over-used blue or the obvious green.

- **Neutral palette** — teal-stone family, every step tinted H:162° at chroma ≈ 0.008–0.012 so surfaces participate in the palette without reading as colored:
  - 50: `#F4F9F7`
  - 100: `#E8F3EF`
  - 200: `#D0E8E0`
  - 300: `#A8CEC3`
  - 400: `#7BB3A6`
  - 500: `#589488`
  - 600: `#3E756B`
  - 700: `#2B5850`
  - 800: `#1A3B35`
  - 900: `#0A201C`

- **Accent color**:
  - light: `#6FD7C0` (teal.300)
  - default: `#0F9E85` (teal.500)
  - dark: `#086A5A` (teal.700)
  - glow: `#38BEA5` (teal.400)

- **Secondary accent** — none. One frequency of light, sustained.

- **Background**:
  - Page bg: `#F4F9F7` (stone.50)
  - Card bg: `#E8F3EF` (stone.100)
  - Signal band: `#065248` (teal.800)

- **Text colors**:
  - Primary: `#0A201C` (stone.900) — near-black with teal cast
  - Secondary: `#2B5850` (stone.700)
  - Muted: `#589488` (stone.500)
  - On signal band: `#D6F3EC` (teal.100)

**Contrast checks:**
- stone.900 on stone.50: ≈ 14.7:1 ✓
- teal.500 on stone.50: ≈ 3.0:1 — large display text (64px+) only; passes WCAG AA large ✓
- teal.700 on stone.50: ≈ 5.7:1 — body text and labels ✓
- teal.100 on teal.800: ≈ 14.8:1 ✓

---

### 2. Typography (chassis: big-shoulders-atkinson)

- **Hero phrase rendering** — `display` token, `clamp(64px, 10.5vw, 152px)`, Big Shoulders Display condensed, all-caps (natural to the typeface).
  - Line 1: `FOURTEEN HOURS` — stone.900 (`#0A201C`)
  - Line 2: `OF LIGHT.` — teal.500 (`#0F9E85`)
  - The color break lands at the semantic break: the measurement is stated flat in dark, the thing being measured arrives in the live chromatic event
  - Stacked left-aligned at `padding-left: 6vw`

- **Line heights**:
  - Hero: `0.92` — ultra-tight for condensed caps, the two lines press together like a billboard
  - Section headings: `1.1`
  - Body: `1.6` (Atkinson Hyperlegible at small scale benefits from generous leading)
  - Signal strip labels: `1.2`

- **Letter spacings**:
  - Hero: `-0.02em` — condensed display at scale needs slight tightening
  - All-caps labels (signal strip, eyebrows): `0.08em` — all-caps at small size needs tracking
  - Body: `0em`
  - Metadata/muted: `0.03em`

---

### 3. Layout Specification

- **Archetype** — Stack. Full-width horizontal bands, each a distinct visual moment. "FOURTEEN HOURS OF LIGHT." is a reading from an instrument; Stack renders the page as a set of registers — each band a different measurement from the same day.

- **CSS structure** — top-level: `display: flex; flex-direction: column; width: 100%; max-width: none; overflow-x: hidden;`
  - Each band: `width: 100%; display: block;`

- **Major dimensions**:
  - **Band 1 — Hero**: `min-height: 100vh; padding: 0 6vw; position: relative`
  - **Band 2 — Signal strip**: `min-height: 72px; padding: 20px 6vw;` — teal.800 background, full-bleed
  - **Band 3 — Work**: `padding: 96px 6vw;` — stone.50 bg, teal.400 2px rule as section header
  - **Band 4 — About + Quote pull**: `padding: 80px 6vw;` — stone.100 bg
  - **Band 5 — Capabilities + Footer**: `padding: 64px 6vw 48px;` — teal.800 bg, light text
  - Max content width: `max-width: none` — full canvas
  - Viewport side padding: `6vw` throughout (≈ 86px at 1440px)

- **Nav placement** — `position: absolute; top: 0; left: 0; right: 0; padding: 28px 6vw; display: flex; justify-content: space-between; align-items: center; z-index: 10` — floats over hero band, transparent background. "DOUG MARCH" in stone.900 (`font-size: 13px; letter-spacing: 0.1em; font-weight: 600`), nav links right in stone.600.

- **Hero phrase grid zone** — phrase block sits `padding-top: 0; margin: auto 0;` (vertically centered via flex on Band 1). Hero band uses `display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding-top: 96px;` (top padding clears the nav). The two-line phrase block is `max-width: none`, left-aligned at 6vw. Below the phrase: fine rule `width: 40px; height: 2px; background: teal.400; margin: 40px 0 20px;` then date metadata `font-size: 13px; letter-spacing: 0.08em; color: stone.500;` reading "MAY 19, 2026 · 14.3h DAYLIGHT · ☽ WAXING CRESCENT 13%".

---

### 4. Component Character

- **Border radius** — `none` (0px) throughout. No rounded corners — the phrase is a measurement and everything else inherits that precision.
- **Border treatment** — borderless cards; the signal strip creates separation through background contrast; a 2px solid teal.400 rule (`#38BEA5`) appears as the WORK section header above the project grid; 1px stone.200 dividers between capabilities rows.
- **Shadow** — none. Depth comes from band background contrast alone.
- **Density** — Hero: spacious (one idea, full viewport). Signal strip: compact (5 inline data items across full width). Work: comfortable (2–3 column project cards). Footer: tight.
- **Interactive states**:
  - Project cards: `background: stone.100 → stone.200` on hover; 2px solid teal.500 left border appears on hover
  - Nav links: `color: stone.600 → teal.500` on hover
  - Buttons/tags: `background: transparent; border: 1px solid teal.500` → `background: teal.500; color: stone.50` on hover

---

### 5. Signal Integration

- **Signal strip (Band 2, teal.800 bg)** — single horizontal row, `display: flex; gap: 40px; align-items: center; flex-wrap: wrap;`. Each item: `font-size: 13px; letter-spacing: 0.08em;` in teal.100. Items:
  - `⛳ PGA: AARON RAI −9` — teal.300 (`#6FD7C0`) for the score; winner accented
  - `⚾ TIGERS 2−8` — teal.400, loss noted without drama
  - `🌱 SPRING · DAY 139` — teal.100
  - `☽ CRESCENT 13%` — teal.100
  - `▶ MEMORIAL DAY IN 6 DAYS` — teal.200

- **Sports scores** — inline in signal strip, monospaced numerals via `font-variant-numeric: tabular-nums`. Tigers loss in teal.400 (not suppressed but not celebrated). PGA winner in teal.300 with the score in a slightly larger weight (semibold).

- **Quote treatment** — Churchill's "AN OPTIMIST SEES THE OPPORTUNITY IN EVERY DIFFICULTY." appears in Band 4 (About) as a pull-quote: `font-size: clamp(18px, 2.5vw, 28px); font-style: normal; color: teal.700; letter-spacing: -0.01em; border-left: 3px solid teal.400; padding-left: 24px;` — an editorial aside to the day's hero measurement, not competing with it.

- **Daylight data** — the signal origin of the hero phrase. Rendered as fine metadata below the hero text: `MAY 19, 2026 · 14.3h DAYLIGHT` in stone.500, `font-size: 13px; letter-spacing: 0.08em`.

- **Music signals** — Guided by Voices, My Morning Jacket noted in footer band (Band 5) as `NOW PLAYING:` micro-label alongside capabilities.

## Self-Check
1. Hero quotability: Yes — "FOURTEEN HOURS OF LIGHT." is a complete, standalone declarative statement; the specificity of the measurement and the compression of "OF LIGHT." make it poster-worthy and dissonant enough to earn a screenshot.
2. Because-of chain: Yes — the phrase (a precise environmental measurement) demanded Stack (registers/readings), demanded Big Shoulders condensed (instrument panel numerics at bulletin scale), demanded teal H:162° (the color of the light being measured), demanded the light-on-dark color break at "OF LIGHT." where the measured quantity arrives in accent.
3. Render feasibility: Yes — Big Shoulders Display at clamp(64px, 10.5vw, 152px) renders "FOURTEEN HOURS" (13 chars) at ≈148px on a 1440px viewport; condensed proportions keep it within bounds; Stack bands are full-width so no overflow risk.

## Rationale
The hero phrase arrived from today's environmental data, not from the quote feed. 14.3 hours of daylight on May 19th is a precise, almost scientific reading — the kind of number that belongs on a gauge or a tide table. For a site whose entire premise is reading the environment and translating it into design, making the day's most arresting environmental fact into a 152px declaration is the most honest thing the site can do. The phrase is strange enough to stop a scroll ("FOURTEEN HOURS OF LIGHT.") and specific enough to prove it's real. The period lands as finality.

Stack was the only archetype that could render this correctly. A Poster would have isolated the phrase in a void, treating it as a quotation. Stack treats the phrase as the first reading in a series of registers — each horizontal band is a different instrument measuring the same day. Band 1: the primary signal (light). Band 2: secondary signals (golf, baseball, season). Band 3: the work portfolio. Band 4: context and voice. Band 5: capabilities. The page reads vertically like a printed report, which is exactly right for content that presents itself as environmental measurement. Big Shoulders Display at condensed poster scale is the typeface of gauges and highway signs and calibration panels — it carries a number at scale without making it feel decorative.

The teal palette at H:162° was both mandated (the color window permitted 150°–175°, the most constrained window in recent memory) and conceptually inevitable. H:162° is the color of refracted spring light through glass, of clear water, of the atmosphere on a long May afternoon. Against six consecutive dark designs, a near-white ground with saturated teal type is the boldest available move — not because it's louder, but because it's the first daylit page in a week. The color break in the hero phrase is the payload: "FOURTEEN HOURS" arrives in near-black (a measurement stated), then "OF LIGHT." arrives in teal.500 — the thing being measured takes the live color, and you can almost see it.
