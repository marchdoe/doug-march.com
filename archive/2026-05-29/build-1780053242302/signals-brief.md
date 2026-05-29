# Signals Brief — 2026-05-29

## Hero Copy
Only those who will risk going too far can possibly find out how far one can go.

## Hero Rationale
T.S. Eliot's line arrives today at the precise convergence of three signals: a risk weight of 8/10 (the loudest creative mandate all month), a full moon at 98.2% illumination (the night at its most charged), and a Friday at the edge of late spring — 14.5 hours of daylight, the season pressing against its own limit. The quote is not being borrowed for warmth or decoration; it describes the literal posture of this portfolio (every project a voluntary leap into uncertain territory) and the literal posture of today's mandate (bold, experimental, go too far). It would be screenshotted standalone. It earns the scale.

## Archetype
Split

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue** — 115° (electric lime). Late May spring at full momentum: not the safety yellow of a warning, not the money green of commerce, but the specific charged lime of new growth pressing at maximum velocity against the end of spring. Falls squarely in the mandated 105°–128° window.

**Neutral palette** — forest stone family, tinted toward H:115°:
- stone.50: `#F5F8F0`
- stone.100: `#E6EDE0`
- stone.200: `#C8D4BC`
- stone.300: `#A3B594`
- stone.400: `#7C906A`
- stone.500: `#5C6E4E`
- stone.600: `#404E36`
- stone.700: `#2B3523`
- stone.800: `#1A2215`
- stone.900: `#0D1209`

**Accent color:**
- light: `#94DE52` (lime.300)
- default: `#68CB1E` (lime.400)
- dark: `#3D7E12` (lime.600)
- glow: `rgba(104, 203, 30, 0.35)`

**Secondary accent** — none.

**Background:**
- Dark side (left): `#0D1209` (stone.900) — near-black with faint green cast, depth not void
- Lime side (right): `#68CB1E` (lime.400) — full-saturation drench
- Card bg: `#1A2215` (stone.800)
- Sidebar / signal strips: `#0D1209`

**Text colors:**
- Primary text on dark: `#F5F8F0` (stone.50) — 18.6:1 vs stone.900 ✓
- Primary text on lime: `#0D1209` (stone.900) — 9.9:1 vs lime.400 ✓
- Secondary text: `#A3B594` (stone.300) on dark — 6.8:1 ✓
- Muted text: `#7C906A` (stone.400) on dark — 4.6:1 ✓

---

### 2. Typography (chassis-derived)

**Hero phrase rendering** — Big Shoulders Display (the `display` chassis token), all-caps, weight 800. The phrase is physically split: first clause on the dark left column, second clause on the lime right column. Each side uses `clamp(52px, 5.8vw, 84px)` — at 1440px viewport this is ~83px per line. Big Shoulders Display is extremely condensed; at 83px a 14-character line occupies ~520px, which fits comfortably in a 45%-wide (648px) column with 48px horizontal padding.

Left breakpoint (dark side):
```
ONLY THOSE
WHO WILL RISK
GOING TOO
FAR
```
Right breakpoint (lime side):
```
CAN POSSIBLY
FIND OUT
HOW FAR
ONE CAN GO.
```

Attribution "— T.S. Eliot" renders in Atkinson Hyperlegible, 0.875rem, wide tracking (0.12em), small-caps treatment, placed below the right clause.

**Line heights:**
- Hero display: 0.88 (tight; condensed letterforms need minimal leading)
- Subheadings: 1.1
- Body: 1.6 (Atkinson Hyperlegible is designed for readability — give it room)
- Signal labels: 1.2

**Letter spacings:**
- Hero all-caps: -0.02em (Big Shoulders Display needs slight tightening at large size)
- Body prose: 0.01em
- Small-caps labels: 0.08em
- Signal eyebrows: 0.12em

---

### 3. Layout Specification

**Archetype — Split.** The T.S. Eliot quote is a conditional statement in two halves: the condition (risk going too far) and its reward (discovering how far you can go). Placing each half on a different surface — one dark, one lime — makes the sentence's logic spatial and visual. You literally cross from darkness into light to finish reading the sentence. No other archetype can enact that argument.

**CSS grid/flex structure:**
```css
.canvas {
  display: grid;
  grid-template-columns: 45fr 55fr;
  min-height: 100vh;
  max-width: none;
}
.left-column {
  background: #0D1209;
  min-height: 100vh;
  padding: 48px 48px 48px 6vw;
  display: flex;
  flex-direction: column;
}
.right-column {
  background: #68CB1E;
  min-height: 100vh;
  padding: 48px 6vw 48px 48px;
  display: flex;
  flex-direction: column;
}
```

**Major dimensions:**
- Left column: 45% viewport width, 100vh minimum height
- Right column: 55% viewport width, 100vh minimum height
- Hero phrase area on each side: occupies rows 1–3, roughly `min-height: 70vh`
- Max content width: `none` — full bleed, viewport-relative padding only (`6vw` outer edge)
- Section padding: 48px top/bottom within each column's content zones

**Nav placement:** Top of the left column. Horizontal mini-nav: logo "DM" in lime.400 at 0.75rem/wide tracking, nav links (Work, About, Contact) in stone.300 at 0.75rem. Height: 64px. Sits above the hero phrase, flush left.

**Hero phrase grid zone:**
- Left column: rows 1–3, column 1. The phrase occupies `min-height: 65vh`, centered vertically within that zone. Text is left-aligned. The word "FAR" on the final line stands alone, enormous, flush left — the single word sitting at the precipice.
- Right column: rows 1–3, column 2. Phrase occupies the same `min-height: 65vh` zone. Text is left-aligned on the lime field. "ONE CAN GO." closes it — the period feels like a landing.

Below the hero phrase zone on each side:
- **Left** (rows 4–5): Signal strip — golf leaderboard (5-way tie at -6), Tigers result (1-7), full moon icon at 98.2%. Type in stone.400/stone.300. Dense, small, tabular.
- **Right** (rows 4–5): Projects strip — featured project cards in a 2-column grid using dark stone.900 cards on the lime field, then a signal zone (HN Claude Opus 4.8 headline, music: War on Drugs / Tobin Sprout / Wet Leg).

---

### 4. Component Character

**Border radius:** `0` everywhere in hero zones. Cards get `2px` — nearly square, graphic, not rounded. Tags and labels: `0` with `1px solid border`.

**Border treatment:** Borderless on the two main columns. Cards on the right column: `1px solid rgba(13,18,9,0.25)` (slightly transparent stone.900 on the lime field). Signal rows in the left column: `1px solid stone.700` top-border separators.

**Shadow:** None on hero type. Cards: no drop shadow — the lime/dark contrast is doing all the depth work. Focus states: `0 0 0 3px lime.400` outline on dark background; `0 0 0 3px stone.900` on lime background.

**Density:** Hero zones — very spacious (the phrase needs air to breathe). Signal/project zones — compact (tabular spacing, 8–16px gaps).

**Interactive states:** Links on dark side: stone.300 → lime.400 on hover. Links on lime side: stone.800 → stone.900 on hover. Project cards: `scale(1.02)` + border intensification on hover. No animations in the hero type zones.

---

### 5. Signal Integration

**Signal element placement:**
- Left column bottom (below hero phrase): the day's sports and astronomical signals in a tight strip
- Right column bottom (below projects): HN top story, music signals

**Golf scores:** The 5-way deadlock at -6 (Gerard, Putnam, Kim, Spaun, McCarty) displayed as a compact leaderboard table. Header "CHARLES SCHWAB" in stone.400, widest tracking. Five names in stone.200, scores in lime.400 — all five showing "-6" in the same color, the deadlock made visual.

**Full moon:** A circular indicator `36px` diameter, `background: lime.400`, `border-radius: 50%`. Label "FULL MOON / 98.2%" in stone.400, 0.75rem. Placed directly above the golf strip on the dark left side — the brightest signal at the top.

**Tigers loss:** "TIGERS 1–7" in stone.500 (muted — a loss doesn't earn lime). One line, monospaced numerals, below the golf strip.

**Quote display:** The T.S. Eliot line IS the hero phrase, rendered at full marquee scale across both columns of the Split. The attribution "— T.S. Eliot" appears on the right column below "ONE CAN GO." in Atkinson Hyperlegible 0.875rem, stone.700, wide tracking — quiet, crediting without competing.

**HN signal:** "Claude Opus 4.8 ↑1558" in stone.800 on lime field, 0.875rem, below the projects grid on the right. Self-referential easter egg — this site is built by Claude; Claude 4.8 launches today.

**Music:** "The War on Drugs · Tobin Sprout · Wet Leg" in stone.700, 0.75rem, bottom of right column — a barely-legible ambient signal, the day's soundtrack.

## Self-Check
1. Hero quotability: Yes — T.S. Eliot's risk-and-discovery line is a standalone cultural artifact; someone would screenshot exactly this line without context.
2. Because-of chain: Yes — the two-clause sentence structure demanded Split; the "going too far" + risk-8/10 + full-moon demanded electric lime at maximum saturation; Big Shoulders Display was chosen because its condensed weight fills both 45% and 55% halves at marquee scale without overflow or decorative excess.
3. Render feasibility: Yes — Big Shoulders Display at clamp(52px, 5.8vw, 84px) in the condensed register renders a 14-character line in approximately 520px, comfortably fitting the 45%-wide (648px) left column at 1440×900 with 6vw padding.

## Rationale
The T.S. Eliot quote is this portfolio's unsolicited mission statement: every project in the register (Spaceman, FishSticks, 15th Club, 15th Club, TeeTurn) is someone choosing to enter territory they couldn't see the end of. Today the signals converge to amplify that charge — a risk mandate at 8/10, a full moon pressing toward completeness, a Friday afternoon in late May with 14.5 hours of light. The quote doesn't need context to land; it needs space and structural honesty. The Split gives it that honesty: the sentence is a conditional argument in two clauses, and placing each clause on a physically distinct surface makes the logic spatial. You cross from darkness into electric lime to finish the sentence. The crossing is the meaning.

Big Shoulders Display was the only chassis that could honor both halves at equivalent scale. It's radically condensed — not the institutional weight of Anton, not the editorial warmth of Bricolage — it's pure signage register, the font of transit systems and stadium banners, built for maximum information density at maximum scale. At `clamp(52px, 5.8vw, 84px)` in the condensed register, a 14-character line like "WHO WILL RISK" sits in approximately 520px — comfortable within the 648px dark column at 1440 wide. Atkinson Hyperlegible as the body font is a deliberate counter-choice: designed for reading, not for display, it signals that the projects and signals sections are genuinely meant to be read, not just seen.

The lime palette at H:115° falls precisely inside the mandated 105°–128° window, and it earns its presence beyond mandate compliance: this is the color of late spring at its most pressurized, the specific green of something forcing itself past its own limit — which is exactly what the Eliot line describes. At full saturation on the 55% right column, it doesn't function as an accent; it functions as an event. The forest-stone neutral family with its faint H:115° green cast keeps the dark left side alive — not dead black, but a depth that has the same hue family as the lime it borders, making the two halves feel like the same world in two different states of illumination.
