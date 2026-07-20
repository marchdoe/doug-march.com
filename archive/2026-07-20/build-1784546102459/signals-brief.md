# Signals Brief — 2026-07-20

## Hero Copy
$120K SYSTEM. $1,600 IN ESP32s.

## Hero Rationale
Today's loudest signal isn't a quote or a score — it's the #1 Hacker News story at 2,379 points: someone ripped out a $120,000 bowling-alley control system and rebuilt it with $1,600 of ESP32 microcontrollers. For a portfolio whose whole thesis is a scrappy builder (Founder, three Twitter-era experiments, a site that rebuilds itself nightly), that ratio IS the mission statement — proof that leverage beats budget. Stripped to "$120K SYSTEM. $1,600 IN ESP32s." it's a self-contained brag you'd screenshot, and the tension between the two numbers is the entire composition.

## Archetype
Poster

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification
- **Primary hue** — 46° (breadboard amber). The color mandate leaves only the 45°–67° window clean after a week that scorched the rest of the wheel; 46° is exactly right for a DIY-electronics story — the yellow of breadboards, jumper wires, and status LEDs. Read at full saturation as poster/caution stock.
- **Neutral palette** — warm-tinted toward 50°:
  - 50 `#FAF8F1` · 100 `#F1EEE2` · 200 `#E0DBC9` · 300 `#C6BFA6` · 400 `#A39B7E` · 500 `#7C745A` · 600 `#5A5340` · 700 `#40392A` · 800 `#29241A` · 900 `#16130A`
- **Accent color** — breadboard amber: light `#FFD84D`, default `#FFC400`, dark `#C08E00`, glow `rgba(255,196,0,0.55)`
- **Secondary accent** — none. The field IS the accent; emphasis between the two numbers is carried typographically (solid ink for $1,600, hairline-outline for $120K), not with a second hue.
- **Background** — page bg `#FFC400` (amber drench); BOM footer panel `#16130A` (dark board); no sidebar.
- **Text colors** — primary `#16130A`, secondary `#40392A`, muted `#5A5340`; on the dark BOM panel, text `#FFC400` / muted `#A39B7E`.

### 2. Typography
- **Hero phrase rendering** — Anton (display token) sets the numerals at poster scale as a stacked two-line lockup: line 1 `$120K SYSTEM.` at ~55% of max, line 2 `$1,600 IN ESP32s.` at full `clamp(88px, 15vw, 240px)`. `$120K` is rendered as an outline (transparent fill, 2px ink stroke via `-webkit-text-stroke`) to read as "the old, expensive way"; `$1,600` is solid ink — the punchline lands heaviest. Inter Tight handles the golf badge, nav caps, and BOM line items.
- **Line heights** — hero 0.82; labels 1.0; body 1.5.
- **Letter spacings** — hero -0.01em; all-caps nav/labels 0.1em; body 0.

### 3. Layout Specification
- **Archetype** — Poster. One dominant element (the two giant numbers) fills 70–90% of the viewport; the winning number is the single loudest object, everything else demoted to the corners and a bottom strip — the exact shape of a punchy price-comparison brag.
- **CSS grid/flex structure** — `display: grid; grid-template-rows: auto minmax(0,1fr) auto; min-height: 100vh; padding: 5vh 6vw 0;`
- **Major dimensions**:
  - Hero/featured area: middle row `min-height: 70vh`, hero numbers left-aligned.
  - No sidebar.
  - Max content width: `none`; viewport side padding `6vw`.
  - Section padding: top corner row `5vh`; BOM footer panel `32px 6vw`.
- **Nav placement** — top-left corner stack: `stacked-md` brand lockup with three all-caps links (WORK · ABOUT · LOG) stacked directly beneath it, ~140px block. Top-right corner holds the golf result badge.
- **Hero phrase grid zone** — middle row, columns 1–11 of a 12-col field; occupies ~70vh × ~88vw. `$1,600 IN ESP32s.` is the marquee anchor at `clamp(88px,15vw,240px)`.

### 4. Component Character
- **Border radius** — none (0) everywhere; industrial/spec-sheet flatness. BOM cells radius 0.
- **Border treatment** — bordered, heavy: 2–3px solid `border` (neutral.900) rules; BOM footer is a hard-ruled parts table.
- **Shadow** — none. Flat poster; a single 4px hard ink offset allowed on the golf badge only.
- **Density** — hero spacious; BOM footer compact and tabular.
- **Interactive states** — nav links invert on hover (ink block bg, amber text); golf badge and BOM rows underline on `_hover`.

### 5. Signal Integration
- **Where signal elements live** — golf badge top-right corner; all other signals in the dark BOM (bill-of-materials) footer panel styled as an invoice/parts list — thematically native to the ESP32 story.
- **Sports scores** — Tigers loss as a BOM line item: `DET TIGERS — 2–3 L` in Inter Tight tabular-nums, muted amber, right-aligned score column. Golf badge up top: `THE OPEN · FINAL · R. FOX −10` in bold caps ink on amber with a 4px offset, Cameron Young −9 as sub-line.
- **Quote display** — no quote today; the hero IS a signal-derived headline.
- **Holiday elements** — none (holidays empty).
- **Every signal**: HN bowling story → hero. Golf Open final → top-right badge. Tigers 2–3 → BOM row. Music (Guided by Voices, Wet Leg, My Morning Jacket) → BOM "on the bench" row. Moon (first quarter, 40%) + sun (05:05 / 19:27) → BOM almanac row. Build/edition stamp closes the BOM.

## Self-Check
1. Hero quotability: Yes — "$120K SYSTEM. $1,600 IN ESP32s." is a self-contained brag, quotable with no context.
2. Because-of chain: Yes — the price-ratio headline demands Poster (one dominant object), Anton (heavy condensed numerals), an amber drench (breadboard color, only clean hue window), corner-demoted signals.
3. Render feasibility: Yes — condensed Anton stacks the two short number lines within 88vw at clamp max on 1440×900 without overflow.
4. Canvas floor feasible: Yes — amber drench + 70vh numeral block + full-width BOM easily clears 70% utilization.

## Rationale
The hero phrase came pre-assembled from the top of Hacker News (2,379 points): a $120,000 industrial system replaced with $1,600 of ESP32s. On a portfolio built by a founder-experimenter whose defining move is small, clever leverage — and whose site tears itself down and rebuilds cheaply every night — that number-to-number ratio is the thesis, not the news. Reduced to "$120K SYSTEM. $1,600 IN ESP32s." it's quotable in isolation, and the gap between the two figures is the whole story to tell.

A price brag whose payload is two numbers wants the Poster: one dominant object filling the field, the winning figure loudest, everything else pushed to the corners. Anton (anton-inter-tight, 1.500 ratio, Poster-tagged and fresh since 07-16) gives heavy condensed numerals that stack "$120K SYSTEM." over "$1,600 IN ESP32s." inside 88vw with room to spare, while Inter Tight's workhorse/spec register carries the golf badge and the bill-of-materials footer — exactly the technical voice a hardware-hack deserves. Emphasis between the two numbers is typographic, not chromatic: $120K is a hollow outline (the expensive old way), $1,600 is solid ink (the punchline).

Color is where the mandate and the metaphor agree: the recent palettes scorched everything except the 45°–67° window, and 46° breadboard-amber is precisely the color of a DIY-electronics triumph — jumper wires, status LEDs, caution stock. I drench the canvas in it and set black ink numerals on top (coverage ~66%), a hard-ruled, radius-zero poster with no shadows and no second hue. The shell is deliberately fresh against the avoid lists: a top-left corner stack pairs the unused `stacked-md` lockup (single-color mono inheriting ink) with three caps links beneath it; the golf final rides a hard-offset badge top-right; and the footer is a dark "bill of materials" panel that lists the Tigers loss, the band bench, and the moon/sun almanac as invoice line items — thematically native to the ESP32 build and unlike any recent folio/ledger/caption footer.
