# Signals Brief — 2026-06-10

## Hero Copy
10-4, loud and clear.

## Hero Rationale
The Tigers went 10-4 last night. "10-4" is also CB/police radio for "message received, affirmative, understood" — the exact language of signal acknowledgment. This portfolio rebuilds itself every morning by reading signals and responding; the phrase is simultaneously a final score and an operating declaration. The double register (scoreboard + radio dispatch) makes it quotable in isolation and self-referential to the site's core mechanism. No quote arrived in the signals today — this signal-derived headline is stronger.

## Archetype
Gallery Wall

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue** — H:198°, the exact cyan of a frequency-spectrum diagram and a clear broadcast sky. Falls squarely inside the mandate's open 185°–222° window; also the only hue in that family not used in seven builds. At high saturation on near-void dark, it reads as "signal" before it reads as "blue."

**Neutral palette** (tinted toward H:198°, chroma ~0.012):
- 50:  #EDF5FA
- 100: #D2E8F2
- 200: #A6CDE2
- 300: #74AECF
- 400: #4A8EAF
- 500: #336F8A
- 600: #22546C
- 700: #163C50
- 800: #0C2534
- 900: #05101C

**Accent color:**
- light: #3CCCEC
- default: #00B8E0
- dark: #007A9A
- glow: rgba(0, 184, 224, 0.28)

**Secondary accent:** none — one hue, full commitment.

**Background:**
- page bg: #01070E (abyss.900)
- card bg: #010C16 (abyss.800)
- sidebar bg: #021420 (abyss.700)

**Text colors:**
- primary text: #EDF5FA (slate.50, ≥12:1 on page bg)
- secondary text: #A6CDE2 (slate.200, ~6:1)
- muted text: #4A8EAF (slate.400, ~3.5:1 — large/decorative use only)

---

### 2. Typography (chassis: big-shoulders-atkinson)

**Hero phrase rendering** — "10-4" renders as `display` token, `clamp(100px, 14vw, 210px)`, Big Shoulders Display weight 800, tracking `-0.04em`, line-height `0.88`. "loud and clear." sits immediately below at `clamp(40px, 5.2vw, 80px)`, weight 700, tracking `0.02em` (slight open tracking for the radio-dispatch register), all-lowercase italic treatment in CSS (`font-style: normal` — Big Shoulders doesn't have italic, so keep upright but differentiate via size contrast and a hairline rule above). The two lines compose as a single hero block: the numbers are the score AND the code; the phrase confirms receipt.

**Line heights:**
- "10-4" hero: `0.88`
- "loud and clear." hero line: `1.0`
- Section labels: `1.0`
- Body/list items: `1.55`

**Letter spacings:**
- "10-4" hero: `-0.04em`
- "LOUD AND CLEAR" subhead: `0.02em`
- All-caps labels/eyebrows: `0.12em`
- Body text: `0.01em`

---

### 3. Layout Specification

**Archetype — Gallery Wall.** The phrase is a dispatch — a signal received and acknowledged. The Gallery Wall makes the page into a dispatch board: the dominant "10-4" block commands the left quadrant at poster scale, while independent signal blocks (Tigers scoreboard, projects catalog, lunar/music data) pin themselves to the right and lower zones with deliberate asymmetry. The whitespace lives BETWEEN blocks, not as a margin around the page. Every block is a received transmission.

**CSS grid structure:**
```css
display: grid;
grid-template-columns: 58fr 42fr;
grid-template-rows: min-content min-content 1fr min-content;
min-height: 100vh;
padding: 0 5vw;
column-gap: 4vw;
row-gap: 0;
```

**Major dimensions:**
- Hero/phrase block: min-height ~78vh, left column, rows 1–3
- Right column scoreboard block: ~28vh
- Right column projects list: remaining right column height
- Signals strip: full-width bottom band, ~12vh
- Max-width: `none` — full-canvas, side padding only via `5vw`
- Section padding: `clamp(32px, 4vw, 64px)` top on hero, `clamp(24px, 3vw, 48px)` on subsidiary blocks

**Nav placement:** Inline within the hero block — four navigation items (work, about, timeline, experiments) appear as a horizontal 4-item strip at the very top of the left column, `14px` Atkinson Hyperlegible, `letter-spacing: 0.12em`, all-caps, color: `textMuted`. No separate nav bar. Height: `~48px`. This keeps the canvas fully available for the signal blocks below.

**Hero phrase grid zone:** Left column, rows 1–3. "10-4" occupies approximately `columns 1–7 of the implicit 12-column inside the left pane`, vertically centered in a `min-height: 70vh` zone. "loud and clear." sits `clamp(16px, 2vw, 32px)` below the baseline of "10-4", flush left with the same left edge.

---

### 4. Component Character

**Border radius:** 
- Cards/blocks: `0px` (none) — gallery pieces have no rounding; they're pinned flat, like prints on a wall
- Tags/labels: `2px` (sm)
- No buttons; navigation is plain text

**Border treatment:** Single-pixel borders in `border` token (#042030) defining block edges — subtle but present, giving each signal block a frame. The hero phrase block has NO border; it's the only element that breathes freely.

**Shadow:** None — depth comes from the surface color differential between block bg (#010C16) and page void (#01070E).

**Density:** Contrasting — the hero block is spacious (type-as-space), the projects and signals blocks are compact.

**Interactive states:** Links and project titles: `color: accent` → `color: accentLight` on hover, with a `0.15s ease` transition. No underlines. No background flash. Pure color acknowledgment.

---

### 5. Signal Integration

**Signal elements:** The right column is entirely signal-driven:
- **Top-right block (Tigers):** Styled as an old-school scoreboard panel — monospaced Atkinson Hyperlegible `18px`, `DET 10 — OAK 4`, date `TUE JUN 9` in `textMuted`, result `WIN` in `accent` color at `font-weight: 700`. Block has a single top border in `accent` (the signal color meaning "live/active data").
- **Projects catalog:** Mid-right, 5 rows of work — project name in `#EDF5FA`, year in `textMuted`, tag/type in `accent`. Row heights: `clamp(36px, 4vh, 52px)`. Eyebrow above: "SELECTED WORK" in all-caps `textMuted` at `12px`, `letter-spacing: 0.18em`.

**Signals strip (bottom full-width band):** Three signal cells across the full width, `12vh` tall, separated by thin vertical rules:
- Left cell: `☽ WANING CRESCENT · 17% ILLUMINATION · DAY 25 OF 28` — Atkinson `13px`, `textMuted`
- Center cell: `GUIDED BY VOICES · MY MORNING JACKET · THE WAR ON DRUGS` — same treatment
- Right cell: `SUNRISE 04:49 · SUNSET 19:30 · 14.7 HRS LIGHT` — same treatment

**Quote treatment:** The hero phrase IS the quote (signal-derived), rendered as described in Typography. No separate blockquote element.

**RBC Canadian Open:** "RBC CANADIAN OPEN · SCHEDULED" appears as a single small-caps tag `12px` `textMuted` below the Tigers scoreboard block.

**HN Claude Fable 5 (2280pts):** Small inline reference at bottom of the right column just above the signals strip — "↑ 2280 Claude Fable 5" in `textMuted` `12px` with `accent` colored arrow. The signal is acknowledged without becoming structural.

## Self-Check
1. Hero quotability: Yes — "10-4, loud and clear." carries a double register (baseball score + radio acknowledgment) that earns a screenshot; it's not a caption, it's a statement.
2. Because-of chain: Yes — the radio-dispatch phrase demanded a dispatch-board layout (Gallery Wall), the signage/athletic signal tone demanded Big Shoulders Display, the broadcast-frequency mood locked in H:198° signal cyan, and the void-navy background makes the single cyan frequency pop with maximum signal clarity.
3. Render feasibility: Yes — Big Shoulders Display at clamp(100px, 14vw, 210px) for "10-4" in a 58% left column on 1440px = ~835px zone; the numbers and dash span ~420px at 210px size, well within bounds with no overflow risk.

## Rationale
The hero phrase arrived from a signal collision rather than a quote: the Detroit Tigers went 10-4 last night, and "10-4" is the CB/police radio acknowledgment code for "message received, understood, affirmative." The phrase is simultaneously a scoreboard and a dispatch — which is exactly what this portfolio is doing every morning: receiving signals, acknowledging them, building a response. "10-4, loud and clear." is the site speaking its own operating logic in baseball box-score language.

The Gallery Wall archetype followed without argument. A dispatch board is a gallery wall — different signals pinned to different zones, irregular whitespace between them, one dominant transmission and several smaller incoming messages. The hero block (left column, ~78vh) holds the massive "10-4" at up to 210px and "loud and clear." at up to 80px; the right column pins the Tigers scoreboard block at top and the selected-work catalog below; the full-width signals strip at bottom captures the lunar, music, and daylight readings as three side-by-side transmission cells. Every block is data received. The layout IS the acknowledgment. Gallery Wall hasn't appeared in the seven-day archive, making it structurally fresh.

`big-shoulders-atkinson` was the chassis with no viable competition here. It's tagged for Poster and Specimen archetypes — both require exactly what this phrase needs: signage scale, condensed weight, athletic authority. The 1.618 modular ratio is the highest in the catalog, giving "10-4" unambiguous marquee presence. Atkinson Hyperlegible in the body and signal blocks isn't compromise — it's the correct pairing for a display font this heavy, providing maximum legibility at small sizes for scoreboard data and lunar readings. Signal cyan at H:198° is the only reasonable color: broadcast towers, frequency diagrams, clear-sky reception, and it falls cleanly inside the mandate's 185°–222° open window. On #01070E near-void, it hits roughly 7:1 contrast — visible from the other side of the room.
