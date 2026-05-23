# Signals Brief — 2026-05-23

## Hero Copy
THE PURPOSE OF LIFE IS THE LIFE OF PURPOSE.

## Hero Rationale
Robin Sharma's quote from today's signal feed earns today's marquee not through sentiment but through structure — it's a perfect chiasmus, a sentence that carries its own reversal built into its syntax. On a portfolio site that rebuilds itself daily in response to environmental signals, the phrase reads as operating philosophy: the work IS the purpose, and the purpose IS the work. It's quotable without attribution, architectural without explanation. With Memorial Day two days out, a golf leader at −18 (dominant, purposeful, relentless), and 14.4 hours of spring daylight still expanding, the phrase fits a Saturday that feels less like a rest day and more like a momentum day.

## Archetype
Specimen

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:290° (violet) — mandated zone is 275°–320°, and violet at 290° is exactly the hue of an amethyst held to late-afternoon light; it has sovereignty without aggression, drama without loudness. Not a hue used in any of the last 7 builds (recent list: 75°, 350°, 118°, 162°, 35°, 245°, 205°).
- **Neutral palette:**
  - stone.50: `#F6F4FA` (near-white, violet-tinted)
  - stone.100: `#ECE8F5`
  - stone.200: `#D9D3EC`
  - stone.300: `#C0B8DC`
  - stone.400: `#9890B8`
  - stone.500: `#706A90`
  - stone.600: `#504A6E`
  - stone.700: `#342E50`
  - stone.800: `#1E1A34`
  - stone.900: `#100D1E` ← page background
- **Accent color:**
  - light: `#C5A6FF` (violet.300)
  - default: `#A87BF8` (violet.400)
  - dark: `#8B50E8` (violet.500)
  - glow: `rgba(168, 123, 248, 0.25)`
- **Secondary accent:** none
- **Background:**
  - page bg: `#100D1E` (stone.900)
  - card bg: `#1E1A34` (stone.800)
  - sidebar bg: n/a (Specimen has no sidebar)
- **Text colors:**
  - primary text: `#F6F4FA` (stone.50) — contrast vs bg: ~16:1 ✓
  - secondary text: `#C0B8DC` (stone.300) — contrast vs bg: ~8.5:1 ✓
  - muted text: `#706A90` (stone.500) — used for footnotes at 14px+, contrast ~3.2:1 (large-text rule) ✓
  - accent on bg: `#A87BF8` (violet.400) — contrast vs stone.900: ~7.2:1 ✓

---

### 2. Typography (chassis-derived)

- **Hero phrase rendering:** bebas-plex chassis; `display` token. 4 lines, left-aligned, `font-size: clamp(64px, 14vw, 210px)`. Bebas Neue is all-caps by nature — the chiasmus breaks at syntactic midpoints:
  ```
  THE [PURPOSE]     ← "PURPOSE" in violet.400
  OF LIFE IS
  THE LIFE OF
  [PURPOSE.]        ← "PURPOSE." in violet.400
  ```
  The word PURPOSE appears at lines 1 and 4, both instances in vivid violet (`#A87BF8`). All other words in stone.50 (`#F6F4FA`). The color pair reveals the sentence's skeleton before reading is complete.
- **Line heights:** `0.88` for specimen lines (tight; Bebas Neue at this scale needs no air — the ascenders carry the rhythm). `1.5` for body/signal text.
- **Letter spacings:** `0.04em` on specimen lines (Bebas Neue benefits from a touch of opening at display scale); `0.12em` on small-caps labels and signal readouts; `0em` on body text.

---

### 3. Layout Specification

- **Archetype:** Specimen — typography IS the design. The chiasmus is a typographic puzzle: two halves of a sentence that reverse themselves. Specimen is the only archetype that allows this puzzle to consume the full canvas, making the reader work spatially rather than linearly. A Poster would have framed it; Specimen IS it.
- **CSS structure:**
  ```css
  body {
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
    max-width: none;
    padding: 6vh 5vw;
  }
  .specimen-zone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
  .signal-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 3vh;
    border-top: 1px solid {colors.stone.700};
  }
  ```
- **Major dimensions:**
  - Specimen zone: `min-height: 78vh`
  - Signal footer: `height: auto`, approx `60–80px`
  - Max content width: `none` — full viewport with `padding: 6vh 5vw`
  - Type renders at `clamp(64px, 14vw, 210px)` — at 1440px: 201px; at 900px: 126px; at 375px: 64px (floor)
  - 4 lines × 201px × 0.88 leading = ~707px at 1440px wide + 6vh top padding → total ~813px of the 900px viewport. Dense, deliberate fill.
- **Nav placement:** No traditional nav. Navigation links (Home / Work / About) live as a single horizontal strip of 11px uppercase IBM Plex Sans in stone.500, flush right in the signal footer zone. No sidebar, no top bar, no chrome.
- **Hero phrase grid zone:** Specimen zone rows 1–4, columns spanning full width (5vw–95vw). Each line of the chiasmus occupies one row, left-aligned to the 5vw left edge. "PURPOSE" appears as `<span style="color: accent">` inline within its line.

---

### 4. Component Character

- **Border radius:** `0px` everywhere — this is a specimen, not a product UI. No softening.
- **Border treatment:** Single `1px solid {colors.stone.700}` hairline separating the signal footer from the specimen zone. Nothing else bordered.
- **Shadow:** None. The palette handles depth entirely through lightness contrast.
- **Density:** Ultra-sparse in specimen zone (the lines ARE the content); tight in signal footer (small type, close rows).
- **Interactive states:** Navigation links in footer: hover raises from stone.500 to stone.300 (opacity approach). No other interactive elements in the specimen zone.

---

### 5. Signal Integration

- **Signal elements live in:** the signal footer — a single horizontal strip below the specimen text, separated by a hairline rule.
- **Sports scores:** `SI WOO KIM −18` rendered in IBM Plex Sans 12px, all-caps, stone.300 with the `−18` in violet.400. Followed by `·` separator, then `TIGERS 4–7` in stone.500. Tabular nums enabled via `font-variant-numeric: tabular-nums`.
- **Quote treatment:** The quote IS the hero phrase. Robin Sharma's attribution renders at the bottom-right of the footer as `— Robin Sharma` in 11px italic IBM Plex Sans, stone.500, light enough not to compete.
- **Holiday elements:** `MEMORIAL DAY MON` in 11px stone.500 letterspace `wider` sits at footer left beside the sports scores.
- **Lunar:** `◑ FIRST QUARTER` in 11px stone.500 as a secondary footer element — the half-moon at 50.9% mirrors the phrase's structural midpoint.
- **Music:** A subtle `Guided by Voices · My Morning Jacket` line in 10px stone.600 at far right of footer, barely legible — an easter egg for close readers.
- **Season/daylight:** `14.4H DAYLIGHT · 23 MAY 2026` in stone.500 at footer, matching the instrumentation register of the specimen.
- **Every signal treated:** Golf leader prominent in violet; Tigers loss demoted to stone.500; Memorial Day as a label; lunar phase as a Unicode glyph + label; music as whisper-level footnote.

## Self-Check
1. Hero quotability: Yes — "The purpose of life is the life of purpose." is a perfect chiasmus, would be screenshotted for the reversal alone; it stands completely in isolation.
2. Because-of chain: Yes — chiasmic structure → Specimen (type as sculpture, the reversal visible spatially) → bebas-plex (condensed declaration, tagged Specimen in catalog) → violet H:290° (mandated zone, unconventional, sovereign, carries the purple gravity of aphorism) → 4-line fill with "PURPOSE" appearing in both line 1 and line 4 in accent color.
3. Render feasibility: Yes — at `clamp(64px, 14vw, 210px)` across 4 lines × 0.88 leading, total type height ≈707px at 1440×900, fits within 78vh specimen zone with footer below.

## Rationale
The Robin Sharma chiasmus arrived from today's signal feed and immediately cleared the "would someone screenshot this?" bar — not because it's motivational, but because it's structurally strange. A chiasmus in all-caps Bebas Neue, where the second half of the sentence reverses the first, is a puzzle before it's a quote. The word PURPOSE appears twice; the typography can make that architecture visible. That structural visibility demanded the Specimen archetype: not type on a page, but type AS the page, consuming 70%+ of the canvas so the reader feels the sentence's weight before parsing its meaning.

Bebas Neue (via bebas-plex) was the only honest chassis for this. It's condensed, declarative, and catalog-register — not the shout of Big Shoulders, not the literary gravity of Spectral. At 4 lines across 14vw, it fills the 1440×900 viewport without tipping into poster-parody or motivational-poster cheese. The critical typographic move is inline: the word PURPOSE in both line 1 ("THE PURPOSE") and line 4 ("PURPOSE.") renders in violet.400 (#A87BF8) against the stone.50 (#F6F4FA) of the surrounding text. The chiasmus is color-coded. You see the reversal before you read it.

The violet palette at H:290° was mandated (275°–320° permitted zone) and conceptually exact. Violet is the color of sovereignty, of things that have already decided they're correct, of late-spring twilight at 14.4 hours of daylight. Against stone.900 (#100D1E) — a near-black with the faintest violet undertone — the near-white text achieves ~16:1 contrast while the violet.400 accent achieves ~7.2:1. The signal footer below carries the day's instruments in miniature: Si Woo Kim's −18 (the most purposeful score on any leaderboard this week) in violet.400, the Tigers' 4–7 loss in stone.500, a first-quarter moon glyph, Memorial Day in two days, and the music signals as a barely-legible easter egg. Every signal present; none competing with the specimen.
