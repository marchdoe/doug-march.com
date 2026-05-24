# Signals Brief — 2026-05-24

## Hero Copy
DO NOT WAIT FOR LEADERS; DO IT ALONE, PERSON TO PERSON.

## Hero Rationale
The Mother Teresa quote arrives on a Sunday — the day before Memorial Day, a holiday built on individual sacrifice. For a portfolio composed entirely of solo-founder work (Spaceman 2018, FishSticks 2025, 15th Club 2025), this is not inspiration: it is operating principle. The phrase works because the two clauses do different things — the first clause is a rejection, the second clause is the method — and at marquee scale the semicolon becomes architectural. It passes the screenshot test because it reads as confrontational, not motivational, and it requires zero context to land.

## Archetype
Gallery Wall

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue:** H:205° (cyan-blue). Chosen because the command phrase needs a color that is already decided — not warm and persuasive, not aggressive and hot, but clear and settled. Aqua at H:205° is the color of a still surface that reflects sky. It fills the hero block as a drenched surface, not as an accent.

**Neutral palette (stone, tinted H:205° chroma ≈0.01):**
- 50:  #F5F8FA
- 100: #E7EFF3
- 200: #CCD9DF
- 300: #9AB2BC
- 400: #668A97
- 500: #426878
- 600: #2D4F5E
- 700: #1D3844
- 800: #11222A
- 900: #091519

**Accent color (aqua):**
- light:   #6CC7E8 (aqua.300)
- default: #2AADD9 (aqua.400)
- dark:    #0A72A0 (aqua.600) — also the hero block background
- glow:    #A8DDF1 (aqua.200) — used for leaderboard digits on aqua.600

**Secondary accent:** none. One committed hue, no dilution.

**Background:**
- Page bg:     #091519 (stone.900)
- Card bg:     #11222A (stone.800)
- Hero block:  #0A72A0 (aqua.600)
- Signal block: #11222A (stone.800)

**Text colors:**
- Primary text:    #F5F8FA (stone.50) — on dark stone surfaces
- Secondary text:  #CCD9DF (stone.200)
- Muted text:      #668A97 (stone.400)
- On-hero text:    #FFFFFF — white on aqua.600 block, contrast ≈ 5.4:1 ✓
- Attribution:     #FFFFFF at weight 300 on aqua.600 — 5.4:1 ✓

Accessibility checks:
- #F5F8FA on #091519 → contrast ≈ 17.8:1 ✓ (body text)
- #FFFFFF on #0A72A0 → contrast ≈ 5.4:1 ✓ (≥ 3:1 for large text, ≥ 4.5:1 for normal)
- #2AADD9 on #091519 → contrast ≈ 6.8:1 ✓ (accent on dark bg)

---

### 2. Typography

**Hero phrase rendering:** `display` token (Big Shoulders Display), rendered via `clamp(64px, 7.5vw, 108px)`. All-caps, letter-spacing 0.02em (critical for condensed all-caps legibility). Line-height 0.88. The phrase breaks across 5 lines:

```
DO NOT WAIT
FOR LEADERS;
DO IT ALONE,
PERSON TO
PERSON.
```

The phrase occupies the entire left panel (col 1) of the Gallery Wall. Attribution "— Mother Teresa" uses the `body` token (Atkinson Hyperlegible), 14px, white at weight 300, sits 32px below the closing period. The semicolon and comma are typographic breathing marks — not punctuation mistakes. At 7.5vw Big Shoulders Display they read as pauses.

**Line heights:**
- Hero: 0.88 (tight — condensed display, the lines stack with authority)
- Subheadings: 1.1 (snug)
- Body: 1.5 (normal)
- Long-form: 1.75 (loose)

**Letter spacings:**
- Hero/display: 0.02em (wide — all-caps condensed needs this)
- Eyebrows/labels: 0.15em (widest — for SIGNAL, WORK, TODAY category markers)
- Body: 0em (normal)

---

### 3. Layout Specification

**Archetype:** Gallery Wall. The quote is a command issued across multiple "frames" — its split structure (rejection / method) maps perfectly onto asymmetric blocks of distinct visual weight. Each block on the right column is a separate framed piece: signal data, project work, capabilities. Irregular gaps between blocks create wall spacing.

**CSS grid/flex structure:**
```css
.canvas {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
  gap: 16px;
  padding: 16px;
  min-height: 100vh;
  max-width: none;
}

.hero-block {
  grid-column: 1;
  grid-row: 1 / span 3;
  min-height: calc(100vh - 32px);
  background: aqua.600; /* #0A72A0 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 6vw;
}

.signal-block {
  grid-column: 2;
  grid-row: 1;
  min-height: 30vh;
  background: stone.800; /* #11222A */
  padding: 32px 28px;
}

.projects-block {
  grid-column: 2;
  grid-row: 2;
  min-height: 40vh;
  background: stone.800; /* #11222A */
  padding: 32px 28px;
}

.about-block {
  grid-column: 2;
  grid-row: 3;
  flex: 1;
  background: stone.900; /* #091519 */
  padding: 32px 28px;
  border: 1px solid stone.700; /* #1D3844 */
}
```

**Major dimensions:**
- Hero block height: `calc(100vh - 32px)` — near-full viewport
- Right column total height: `calc(100vh - 32px)` split across 3 stacked blocks (30/40/~30vh)
- Max content width: `none` — full canvas, no center-pinning
- Side padding: `padding: 16px` on outer canvas, `padding: 64px 6vw` inside hero block
- Gap between blocks: `16px` — this IS the whitespace of the gallery wall

**Nav placement:** A slim horizontal strip inside the signal-block, top-right. Navigation items: Work · About · Contact rendered as Atkinson 12px, letter-spacing 0.15em, stone.400 (#668A97) color. Sits above the golf/signal data.

**Hero phrase grid zone:** Column 1, rows 1–3 (spanning full left column). The phrase occupies the vertical center of this zone: top padding 64px, quote text block, 32px gap, attribution line, remaining space below. The phrase itself occupies approximately rows 2–6 of 8 internal flex rows.

---

### 4. Component Character

**Border radius:** 0 everywhere — none. Hard rectangular edges only. The command form of the phrase requires no rounding. Blocks are slabs, not cards.

**Border treatment:** Borderless between most blocks — the gap IS the separation. Single 1px stone.700 border on the about-block only, to distinguish it from the stone.900 page background.

**Shadow:** None. No depth illusion — everything is flat and declared.

**Density:** Mixed. Hero block is spacious (the phrase needs air). Right blocks are compact: tight line-height, small eyebrow labels, dense lists.

**Interactive states:** Project titles in the projects block: hover reveals aqua.400 color shift + underline. Nav links: hover sets color to #FFFFFF from stone.400. No transforms, no scale changes — responses are chromatic only.

---

### 5. Signal Integration

**Golf leaderboard** — Signal block, top section. Eyebrow label: "CJ CUP BYRON NELSON" at 10px Atkinson, letter-spacing 0.15em, stone.400. Then two rows:
- "SI WOO KIM" in stone.200, "−21" in aqua.300 (#6CC7E8) at 20px Big Shoulders
- "SCHEFFLER" in stone.400, "−19" in stone.200 at 16px

**Memorial Day** — Signal block, below golf. Pill-label: "MEMORIAL DAY TOMORROW" — white text on aqua.600 background, 11px, letter-spacing 0.1em. The most time-sensitive signal, given prominence.

**Moon phase** — Signal block, bottom. First quarter, 61.4% illuminated. Small unicode glyph ◑ in aqua.400, "FIRST QUARTER · 61%" in stone.400 at 11px.

**Daylight** — Signal block. "14.4 HRS DAYLIGHT" inline with moon data, stone.400.

**Quote display** — The quote IS the hero phrase. Attribution "— Mother Teresa" sits below the phrase in the hero block, white at 14px Atkinson weight 300. The source is acknowledged but subordinated — the phrase earns its own authority.

**Projects** — Projects block (middle-right). List format: project name in stone.50 at 15px Atkinson medium, year in stone.400, category in aqua.400 at 11px uppercase. 6 entries with 20px spacing. Hover: name shifts to #FFFFFF.

**About / capabilities** — About-block (bottom-right). 2-line bio in stone.200, 13px Atkinson normal. Below: capabilities as single-line overflow list in stone.400, 11px, letter-spacing 0.05em. Near-invisible — present, not prominent.

**Music signal** — Footer of about-block: "MY MORNING JACKET · GUIDED BY VOICES · THE WAR ON DRUGS" at 10px stone.500, letter-spacing 0.12em. Easter-egg tier.

## Self-Check
1. Hero quotability: Yes — "Do not wait for leaders; do it alone, person to person." stands completely alone as a quotable command; it requires no context, no attribution, and earns marquee scale because it is a founding principle with a semicolon-enforced structure that becomes architectural at display size.
2. Because-of chain: Yes — the command's two-clause structure demanded Gallery Wall (two active zones), the marquee scale of a command required big-shoulders-atkinson (1.618 ratio condensed display), the clearwater decisiveness of the phrase demanded H:205° aqua as the drenched hero surface rather than any warm or aggressive hue.
3. Render feasibility: Yes — Big Shoulders Display at clamp(64px, 7.5vw, 108px) renders 5 condensed lines at 0.88 line-height ≈ 475px total in a 3fr column (~835px wide) with 6vw padding, leaving ~230px for attribution and breathing room in a near-100vh block.

## Rationale
The Mother Teresa quote arrived as the only signal candidate that clears the screenshot test cleanly. On a Sunday before Memorial Day — a holiday constructed from individual sacrifice — "DO NOT WAIT FOR LEADERS; DO IT ALONE, PERSON TO PERSON." functions as both personal manifesto and implicit portfolio explanation: every project in the register (Spaceman, FishSticks, 15th Club, TeeTurn) is solo-founded work. The phrase doesn't need its author to land. It needs space.

Gallery Wall was the only archetype that could honor the phrase's two-clause structure without flattening it into a single poster void. The semicolon is a hinge — a rejection followed by a method — and Gallery Wall gives each half architectural weight: the quote occupies the full left column as a drenched aqua slab, while the right column's stacked blocks (signal data, project catalog, about) function as the evidence that the principle was acted on. The irregularity of Gallery Wall's block spacing — gaps rather than margins — makes the composition feel like a working wall, not a presentation deck.

Big Shoulders Display carries the phrase at the weight it demands. At `clamp(64px, 7.5vw, 108px)` condensed, the five-line break (DO NOT WAIT / FOR LEADERS; / DO IT ALONE, / PERSON TO / PERSON.) reads like a posted notice rather than a quotation — authoritative, not inspirational. The aqua palette at H:205° falls precisely within the mandated 192°–215° window and is conceptually exact: not the aggressive teal of a warning, not the corporate blue of a system UI, but the specific cyan of still, clear water — the color of something that has already settled. The hero block background at aqua.600 (#0A72A0) with white type achieves 5.4:1 contrast against all text, meeting AA on every size. The stone neutral family carries just enough H:205° tint to keep the dark surfaces alive against the drenched hero.
