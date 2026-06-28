# Signals Brief — 2026-06-28

## Hero Copy
We can spend our whole lives escaping from the monsters of our minds.

## Hero Rationale
Pema Chodron's line arrives from `signals.quote` on the one day the rest of the signals conspire to be quiet: no blowout, no dramatic weather, no breaking news story at 1000 points. The golf tournament is compelling (Hovland at -20, Scheffler one back, Sunday final round) but it yields to this. The full moon at 99.2% illumination amplifies the phrase — monsters of the mind are most vivid at 3am under a full moon. It is also quietly meta: a portfolio site that reconstitutes itself daily to avoid sameness is, in its own way, a practice of confronting rather than escaping. The phrase is quotable in complete isolation; a reader would screenshot it and post it before asking who made the page.

## Archetype
Gallery Wall

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification
- **Primary hue:** H:22°, terracotta/burnt orange. The only open corridor in the color mandate is 10°–42°; H:22° sits at its warm center. Terracotta is the color of confrontation and heat without destruction — precisely the emotional register of naming monsters rather than fleeing them.
- **Neutral palette (warm taupe, tinted toward H:22°):**
  - 50: #FAF3F0
  - 100: #EEE3DC
  - 200: #DACAC0
  - 300: #D0BEB4
  - 400: #B09080
  - 500: #9C8578
  - 600: #6A4E44
  - 700: #4A332E
  - 800: #2D1C17
  - 900: #180B08
- **Accent color:**
  - light: #FFA07A (orange.300)
  - default: #F05428 (orange.500)
  - dark: #C43D14 (orange.600)
  - glow: rgba(240, 84, 40, 0.22)
- **Secondary accent:** none — single committed orange carries the page
- **Background:**
  - page bg: #140806 (night.400 — near-void dark with faint orange tint)
  - card bg: #1C0D09 (night.300)
  - sidebar/panel bg: #1C0D09
- **Text colors:**
  - primary: #FAF3F0 (taupe.50 — warm near-white, contrast ~18:1 on page bg)
  - secondary: #D0BEB4 (taupe.300 — contrast ~10:1 on page bg)
  - muted: #9C8578 (taupe.500 — contrast ~5.6:1, used at ≥14px only)

### 2. Typography (chassis-derived)
- **Hero phrase rendering:** Big Shoulders Display `display` token, `clamp(2.5rem, 5.5vw, 6.5rem)` — weight 800, all-uppercase via `text-transform: uppercase`, line-height 0.88, letter-spacing -0.02em. At 1440px (5.5vw = ~79px), the 13-word quote breaks across four tight lines inside the dominant 75%-width left block:
  ```
  WE CAN SPEND
  OUR WHOLE LIVES
  ESCAPING FROM THE
  MONSTERS OF OUR MINDS.
  ```
  Each line ≈ 3–4 words in Big Shoulders condensed at this scale fits within ~1050px block width without overflow. Block height of four lines at 0.88 leading ≈ 4 × 79px × 0.88 ≈ 278px — anchored to bottom-left of the block with generous padding-top.
- **Subheadings/labels:** Atkinson Hyperlegible, 0.625–0.75rem, weight 600, all-caps, letter-spacing widest (0.2em)
- **Body/secondary text:** Atkinson Hyperlegible, 1rem, weight 400, line-height 1.5
- **Line heights:**
  - Hero: 0.88 (extremely tight condensed stacking)
  - Subheadings: 1.15
  - Body: 1.5
- **Letter spacings:**
  - Hero: -0.02em
  - ALL-CAPS labels: 0.2em (widest)
  - Body: 0em (normal)

### 3. Layout Specification
- **Archetype:** Gallery Wall — the Chodron quote occupies one dominant asymmetric block (75% width, full main-area height) alongside a narrower panel for the golf leaderboard and a bottom band for signals and projects. The irregular proportions mirror how one dominant thought coexists with other signals in a day.
- **CSS grid structure:**
  ```css
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 48px 1fr 180px;
  gap: 12px;
  padding: 32px 5vw;
  min-height: 100vh;
  max-width: none;
  box-sizing: border-box;
  ```
  - Row 1 (48px): Nav strip spanning all columns
  - Row 2 (flex-fill, ~540–580px on 900vh): Quote block (col 1, 3fr) | Golf/signals panel (col 2, 1fr)
  - Row 3 (180px): Bottom band spanning all columns — projects list (left 60%) + signals/meta (right 40%)
- **Major dimensions:**
  - Hero block: ~75% canvas width × ~580px height (fills available row 2)
  - Right panel: ~25% canvas width × ~580px height
  - Bottom band: full canvas width × 180px
  - Max content width: none
  - Side padding: 5vw (72px at 1440px)
  - Gap between blocks: 12px (thin gutter, blocks read as distinct objects on a dark wall)
- **Nav placement:** 48px horizontal strip, row 1, spanning both columns. "DOUG MARCH" in 0.75rem Atkinson Hyperlegible weight 600 tracked wide, left-aligned; nav links (WORK · ABOUT · CONTACT) right-aligned, same treatment, taupe.400.
- **Hero phrase grid zone:** Row 2, column 1 (75% width). Quote text anchored bottom-left within the block at padding 40px. No background on the block itself — the text floats on the page bg, using its scale as its boundary.

### 4. Component Character
- **Border radius:** cards: 0px (none — sharp geometry matches condensed type); buttons: 2px (sm); tags: 2px (sm)
- **Border treatment:** Single 1px hairline in border-subtle (#2E1510) used only to separate the bottom band from the main row; no borders around the gallery blocks themselves — blocks are defined by content density and scale, not containers
- **Shadow:** None — depth from background lightness contrast between page bg and right panel bg
- **Density:** Spacious within the quote block (the text is the density); compact in the right golf panel (tight rows, small type, high information density); moderately compact in the bottom band
- **Interactive states:** Project links: hover → accent orange (#F05428) + opacity 0.85; nav links: hover → text primary (#FAF3F0); 0.2s ease transitions throughout

### 5. Signal Integration
- **Full moon (99.2%):** Small "● FULL MOON 99.2%" label in the bottom-right corner of the quote block, absolutely positioned, 0.625rem Atkinson weight 600, taupe.500, letter-spacing widest. The ● glyph reads as illumination icon.
- **Golf leaderboard** (right panel — primary content of the right block):
  - Header row: "TRAVELERS CHAMPIONSHIP" in 0.5625rem, letter-spacing widest, taupe.500; "SUNDAY · FINAL ROUND" immediately below in 0.625rem, accent orange #F05428
  - Hovland: "HOVLAND" in 0.625rem taupe.300 tracked wide; "-20" in `clamp(2rem, 3.5vw, 3.5rem)` Big Shoulders weight 800, accent orange #F05428 — dominates the panel
  - Scheffler: "-19" at 1.25rem weight 700, taupe.300; "SCHEFFLER" at 0.625rem taupe.400
  - Cantlay & Bhatia at -15: compact row, 0.625rem taupe.400
  - Lowry at -13: 0.625rem taupe.500
  - 1px border-subtle hairline between each row
- **Tigers score:** Bottom band, signals side: "DET TIGERS" label + "6–8 L" in 0.75rem Atkinson, taupe.400; preceding day noted as "SAT 6.27"
- **Quote display:** The hero phrase IS the quote. Rendered as giant wall type in Big Shoulders Display weight 800. Attribution "— Pema Chodron" in 0.75rem Atkinson Hyperlegible, taupe.400, 24px below the closing period, no italic.
- **Independence Day countdown:** Bottom band: "INDEPENDENCE DAY IN 6 DAYS" in 0.5625rem, letter-spacing widest, taupe.500
- **Music (Wet Leg · My Morning Jacket):** Bottom band signals: "WET LEG · MY MORNING JACKET" in 0.5625rem, taupe.500
- **GitHub/HN:** Not surfaced in primary layout — signal data noted in bottom band footnote at taupe.500 if space permits

## Self-Check
1. Hero quotability: Yes — "We can spend our whole lives escaping from the monsters of our minds." is a Pema Chodron line that exists independently of any portfolio context; it would be screenshotted and shared on its own merits.
2. Because-of chain: Yes — the literary profundity of the Chodron quote demanded a scale that feels like confrontation (Gallery Wall, dominant block), a condensed weight-800 chassis that can stack 13 words into four tight wall-filling lines without dissolving into body-copy scale (big-shoulders-atkinson), and a terracotta palette chosen because H:22° is the one open corridor AND because burnt orange is the color of heat-without-destruction — the precise emotional register of naming rather than fleeing.
3. Render feasibility: Yes — Big Shoulders Display condensed at 5.5vw (≈79px at 1440px) stacks "WE CAN SPEND / OUR WHOLE LIVES / ESCAPING FROM THE / MONSTERS OF OUR MINDS." across four lines within a ~1050px block width with zero overflow; the Gallery Wall's 3fr+1fr column split keeps the right golf panel visible without crowding.

## Rationale
The hero phrase arrived without competition. Today's signals are quieter than most — the Tigers lost yesterday, the Travelers Championship is mid-round with a clean leaderboard but no single dramatic upset, and Hacker News offers no cultural moment strong enough to carry a hero. Into this relative quiet, Pema Chodron's line about spending whole lives escaping from monsters of our minds lands with the full weight of a full moon Sunday. It passes every poster test in isolation: it doesn't need context, it doesn't need explanation, and it invites the reader to complete the implication themselves. On a portfolio site that reconstitutes itself daily precisely to avoid the trap of sameness, the phrase is also quietly meta — every rebuild is a small act of not escaping, of showing up and making the thing again.

Gallery Wall was the archetype choice because the Chodron line doesn't want to be the only thing on the page (that's Specimen) and it doesn't want to share equal billing with other content (that's a Scroll or Stack). It wants to be the dominant block in a room where other blocks also exist — the golf tournament (Hovland at -20, Scheffler one back on Sunday, a genuine leaderboard drama) earns its own panel as a secondary block, and the signals-plus-projects bottom band grounds the page in practical information. The Gallery Wall's asymmetric blocks-on-a-dark-wall structure gives the quote its weight while refusing to leave the rest of the day unacknowledged.

Big Shoulders Display condensed at weight 800 was the only chassis that could solve the typographic challenge: a 13-word literary quote needs a condensed display face to stack into four tight marquee-scale lines without either shrinking below impact or overflowing a block. The terracotta palette at H:22° is the single open corridor in the color mandate, but it is also the honest choice — burnt orange is the color of heat that illuminates without destroying, the exact emotional register of Chodron's instruction to name the monsters rather than run.
