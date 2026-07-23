# Signals Brief — 2026-07-23

## Hero Copy
PASSION IS ENERGY

## Hero Rationale
Lifted from today's Oprah Winfrey quote — "Passion is energy. Feel the power that comes from focusing on what excites you." — compressed to its detonating first sentence. Three words, declarative, quotable in isolation, and the truest mission statement a portfolio that rebuilds itself out of enthusiasm every dawn could carry. It reads as a manifesto, not a caption, and it wants voltage: energy as pure electric pigment.

## Archetype
Gallery Wall

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification
- **Primary hue** — 232° electric ultramarine (International Klein Blue lineage). The Color Mandate leaves only the 221°–245° corridor clean; rather than fight it I read "energy" as high-voltage pigment intensity, the IKB monochrome gesture — bold and artistic, dead-center in the allowed corridor.
- **Neutral palette (cobalt ink, blue-tinted):** 50 `#f6f7fc` · 100 `#eceef6` · 200 `#d6dae8` · 300 `#b3b9d1` · 400 `#868ead` · 500 `#5c6486` · 600 `#414863` · 700 `#2d3349` · 800 `#1b2036` · 900 `#0d1024`
- **Accent (luminous voltage-blue):** light `#9db4ff` · default `#6d8bff` · dark `#3f5ce6` · glow `#d3ddff`
- **Secondary accent** — none. IKB is a monochrome gesture; the single hue carries the page. "Energy" is lit by lightness step within the family, never a second hue.
- **Background** — page bg (drench field) `#1e2fa0`; card/tile bg `#1a2780`; sidebar/quiet tile bg `#131a4d`.
- **Text colors** — primary `#f6f7fc`; secondary `#d6dae8`; muted `#b3b9d1`. The lit hero word uses accent.glow `#d3ddff`.

### 2. Typography
- **Hero phrase rendering** — Anton display token, set on two lines: `PASSION IS` / `ENERGY`, left-aligned. "ENERGY" is the lit line in accent.glow; "PASSION IS" in `#f6f7fc`. Scale via `clamp(84px, 12vw, 190px)`. Anton's condensed heavy caps hold both lines inside the hero block at 1440px without overflow. Inter Tight carries project rows, capabilities, quote body and signals as clean tabular workhorse text.
- **Line heights** — hero `0.85`; block headings `1.0`; body `1.5`; light-on-dark body bumped to `1.55`.
- **Letter spacings** — hero `-0.02em`; smallcaps labels `0.12em`; body `0.01em` (light-on-dark compensation); nav pills `0.08em`.

### 3. Layout Specification
- **Archetype** — Gallery Wall. The phrase anchors the largest tile while Doug's actual work (project directory, capabilities), the day's signals, and the full quote are placed as irregular blocks across the full canvas — the wall IS his body of work energized by the line, directly answering the owner's "missing personal brand / gray box" note with real content, not a bare specimen.
- **CSS grid structure** — `display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: minmax(72px, auto); gap: clamp(16px, 2.4vw, 40px);` on the full canvas.
- **Major dimensions**:
  - Hero tile: `grid-column: 1 / 9; grid-row: 2 / 5; min-height: 56vh`
  - Quote tile: `grid-column: 9 / 13; grid-row: 2 / 4`
  - Signals ("the charge") tile: `grid-column: 9 / 13; grid-row: 4 / 7`
  - Selected work directory: `grid-column: 1 / 6; grid-row: 5 / 7`
  - Capabilities: `grid-column: 6 / 9; grid-row: 5 / 6`
  - Colophon block: `grid-column: 1 / 5; grid-row: 7 / 8`
  - `max-width: none`; page padding `clamp(32px, 5vw, 80px)`.
- **Nav placement** — floating pills, top-right (`grid-column: 10 / 13; grid-row: 1`): three all-caps Inter Tight links in `radius: full` outlined pills, ~40px tall.
- **Hero phrase grid zone** — rows 2–4, columns 1–8; intended render ~56vh tall × ~62vw wide, phrase set flush-left at 12vw.

### 4. Component Character
- **Border radius** — tiles/cards `10px`; buttons/tags `9999px` (full, pill); hero tile `20px`.
- **Border treatment** — hairline `1px solid` in brand.500 `#3550dd` on darker tiles for gallery separation; nav pills outlined in accent.default.
- **Shadow** — none on the drench field (flat pigment); one soft focus glow on hover: `0 0 0 2px #6d8bff` ring.
- **Density** — spacious in the hero tile, compact/tabular in the directory and signals tiles.
- **Interactive states** — links and pills brighten toward accent.glow and gain the voltage ring on `_hover`; project rows shift bg from brand.800 to brand.600.

### 5. Signal Integration
- **Where signal elements live** — the top-right "THE DAY'S CHARGE" tile (rows 4–7) collects sports, music, and moon as a tabular stack.
- **Sports scores** — Tigers 5–1 WIN rendered in Anton at ~40px, the "5" in accent.glow, "1" in muted; labeled `DET 5 · OPP 1 · W` in Inter Tight smallcaps. It's a small win, so it's celebrated but not marquee-scale.
- **Quote display** — the full sentence "Feel the power that comes from focusing on what excites you." sits in the quote tile (cols 9–12, rows 2–3) as an Inter Tight pull-quote with "— OPRAH WINFREY" attribution in smallcaps; the hero marquee IS the quote's opening, so the tile completes it.
- **Music** — Tobin Sprout · The War on Drugs listed as "ON HEAVY ROTATION" in the charge tile.
- **Moon** — waxing gibbous 71% as a small glyph + `71%` numeral in the charge tile.
- **Holidays** — none today; omitted.
- **GitHub / HN / golf** — low-salience today; a single colophon line notes the build stamp only.

## Self-Check
1. Hero quotability: Yes — "PASSION IS ENERGY" is a standalone manifesto, screenshot-worthy, not descriptive body copy.
2. Because-of chain: Yes — a voltage manifesto → Gallery Wall of energized work → Anton's electric condensed caps → IKB ultramarine drench → phrase anchors the dominant tile.
3. Render feasibility: Yes — Anton condensed sets "PASSION IS / ENERGY" on two lines at clamp max 190px inside a 62vw × 56vh tile without overflow at 1440×900.
4. Canvas floor feasible: Yes — asymmetric tiles tile the full 12-col grid with irregular gaps, comfortably clearing 78% utilization.

## Rationale
The day handed me a manifesto, not a decoration. Oprah's "Passion is energy" is the exact thesis of a portfolio that tears itself down and rebuilds every morning out of nothing but enthusiasm — so I compressed the quote to its detonating first sentence, "PASSION IS ENERGY," and let it become the current running through the whole page. The word "energy" is the operative instruction: this phrase wants voltage, and every other decision is downstream of that.

Because the owner's last two grades were C's — "gray box," "missing my personal brand," "the template feels like it's cycling through five layouts" — I refused a bare Specimen and chose the Gallery Wall (unused in the recent rotation). The wall lets the marquee phrase anchor the dominant tile while Doug's actual work — the project directory (Spaceman → Twittertale), the capabilities, the completing half of the quote, and the day's signals — surround it as real, placed content. It reads as HIS body of work energized by the line, not a menu-picked layout with a slogan pasted on. Anton (anton-inter-tight, 1.500) gives the phrase electric condensed caps that hold "PASSION IS / ENERGY" as a two-line knockout at up to 190px, while Inter Tight keeps the directory, capabilities and the Tigers 5–1 box tabular and clean.

Color is the boldest legal gesture available. The mandate scorched the wheel down to the 221°–245° corridor, and instead of hedging into a timid blue I read "energy" as pure charged pigment — Yves Klein's International Klein Blue, a monochrome that IS intensity. I drench the full canvas in 232° ultramarine (coverage ≥65%), tint every neutral toward it so the tiles read as the same world at different depths, and light only the word "ENERGY" and the Tigers' "5" in a luminous voltage-white step of the same hue — one pigment, no second color. The shell is fresh against seven days of spines, rails and mastheads: floating outlined nav pills top-right, a big stacked-lg brand lockup in its original colors top-left to put Doug's mark unmistakably present, and a small colophon block folded into the bottom of the wall.
