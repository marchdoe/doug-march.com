# Signals Brief — 2026-05-10

## Hero Copy
Art is the signature of civilizations.

## Hero Rationale
Beverly Sills' aphorism arrives from `signals.quote` on Mother's Day — and it lands with triple force: Sills was a towering maternal figure in American cultural life; a portfolio site is literally Doug's daily signature; and "civilization" as a unit of measure is exactly the scale at which a portfolio aspires to be read. The line is complete, declarative, and context-free — it travels alone. Today's ambient signals (spring Sunday, waning crescent, golf in progress, two Detroit losses) are atmospheric, not competing; none of them have a sharper phrase. The quote earns the canvas.

## Archetype
Specimen

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

- **Primary hue**: H:35°, S:90%, L:40% — deep amber gold. Chosen because "civilizations" invokes gold leaf, fire, antiquity, and archival warmth. Sits exactly within the mandated 20°–50° open window; no recent palette has touched this zone.
- **Neutral palette** (warmstone family, tinted H:30° for cohesion):
  - 50: `#F8F4EF` | 100: `#EDE6DC` | 200: `#D8CCBC` | 300: `#BBAA96` | 400: `#988572` | 500: `#736050` | 600: `#534540` | 700: `#382E28` | 800: `#1C1410` | 900: `#0F0B07`
- **Accent color**: light `#F5C060` | default `#F2A82A` | dark `#D48520` | glow `#F2A82A` at 0.35 opacity
- **Secondary accent**: none — single amber commitment, no dilution
- **Background**: page bg `#0F0B07` | card bg `#1C1410` | signal strip `#140E09`
- **Text colors**: primary text `#FFD998` (amber.200, ~17:1 contrast on bg) | secondary `#F2A82A` (amber.400, ~8.8:1) | muted `#988572` (stone.400, ~5.8:1)

Contrast verification:
- `#FFD998` on `#0F0B07`: ~17:1 ✓ WCAG AAA
- `#F2A82A` on `#0F0B07`: ~8.8:1 ✓ WCAG AAA
- `#988572` on `#0F0B07`: ~5.8:1 ✓ WCAG AA (≥4.5:1)

---

### 2. Typography

- **Hero phrase rendering**: Anton (display token) at `clamp(64px, 7.2vw, 108px)`. Two centered lines:
  - Line 1: `ART IS THE SIGNATURE` — at 108px, ~20 chars × 0.55em-width Anton ≈ 1188px (82% of 1440px)
  - Line 2: `OF CIVILIZATIONS.` — at 108px, ~17 chars × 0.55em ≈ 1010px (70% of 1440px)
  - Natural taper from line 1 to line 2 creates an inscription/monument shape
  - Color: `#F2A82A` (amber.400); Anton renders well at this weight without needing bold variant
- **Attribution line**: Inter Tight, 13px, all-caps, letter-spacing 0.18em, color stone.400; text: `— BEVERLY SILLS`; centered, 28px below the quote block
- **Signal strip text**: Inter Tight, 12px, tabular-nums for scores, color stone.300 for general items, amber.400 for Mother's Day highlight
- **Nav text**: Inter Tight, 12px, letter-spacing 0.12em, all-caps, opacity 0.35
- **Line heights**: hero 0.92 (tight token) | body 1.5 (normal) | attribution 1.3
- **Letter spacings**: hero −0.02em (snug — Anton at display size needs slight tightening) | attribution +0.18em (widest) | nav labels +0.12em (wider) | signal strip labels +0.08em (wide)

---

### 3. Layout Specification

- **Archetype**: Specimen. Beverly Sills' aphorism IS the surface — typography as monument. The quote occupies the full canvas as an inscription; everything else (nav, attribution, signal strip) is marginalia. The Specimen earns its solitude because the phrase requires no support: it is the declaration, the context, and the design simultaneously.
- **CSS grid structure**:
  ```css
  body {
    display: grid;
    grid-template-rows: 1fr 48px;
    min-height: 100vh;
    max-width: none;
  }
  .hero-zone {
    display: grid;
    place-items: center;
    padding: 80px 6vw 0;
  }
  .signal-strip {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0 6vw;
    height: 48px;
    border-top: 1px solid #382E28;
  }
  ```
- **Major dimensions**:
  - Hero/quote zone: fills all viewport height minus 48px signal strip; `min-height: calc(100vh - 48px)`
  - Signal strip: `height: 48px`, fixed bottom, full width, `background: #140E09`
  - Max content width: `none` — viewport-relative, side padding `6vw`
  - Quote block vertical centering: `place-items: center` within hero grid row
- **Nav placement**: absolute, within hero zone — name `"DOUG MARCH"` top-left at `padding: 28px 6vw`, Inter Tight 12px, letter-spacing 0.12em, opacity 0.35; nav links `WORK · ABOUT` top-right at same vertical position, same treatment. Nav disappears into the background — it is present but does not compete.
- **Hero phrase grid zone**: Sole occupant of the 1fr row in the grid. Quote block centered both axes. Text block is approximately `1188px wide × 220px tall` at 1440px viewport, with ~280px breathing space above and below (after nav clearance and signal strip).

---

### 4. Component Character

- **Border radius**: `none` (0px) everywhere — the inscription aesthetic allows no softening; a monument has no rounded corners
- **Border treatment**: minimal hairlines only — `1px solid #382E28` (stone.700) separating signal strip from hero zone; no card borders
- **Shadow**: none — depth is created by the palette alone (dark ground, luminous amber)
- **Density**: ultra-sparse — nothing competes with the quote; the canvas is the void and the void is load-bearing
- **Interactive states**: nav link hover → color to `#F5C060` (amber.300), opacity 1.0, no transition needed; signal strip items are non-interactive; quote text is purely presentational

---

### 5. Signal Integration

- **Signal strip** (bottom 48px, full width): horizontal flex row, `gap: 32px`, `padding: 0 6vw`, `background: #140E09`, `border-top: 1px solid #382E28` — all environmental data compressed into one dense band so nothing competes with the quote above
- **Mother's Day** (holiday): FIRST item in signal strip — `✿ MOTHER'S DAY` in amber.400 (`#F2A82A`), Inter Tight 12px, letter-spacing 0.10em; it is the warmest item in the coldest zone of the page, a deliberate tonal echo of the Sills quote
- **Golf scores**: `TRUIST · FITZPATRICK −14` in stone.300 (`#BBAA96`), tabular-nums, 12px; score in amber.400
- **Sports scores**: `DET 109–116` (Pistons), `DET 1–5` (Tigers) in stone.400 — both losses rendered quietly in muted warmstone; today is a civilizational day, not a scoreboard day
- **Music**: `WET LEG · GBV` in stone.500, 11px — ambient presence
- **Lunar**: `🌘 31%` in stone.400, 12px — waning crescent noted without drama
- **Awwwards nod**: `WCCWTS ↗` in stone.500, 11px, right-end of strip — a whispered reference to "What Color Was The Sky," which shares the quote's atmospheric register
- **Quote treatment**: IS the hero phrase. Full canvas. No blockquote, no pull-quote frame. The typography is the frame.

## Self-Check
1. Hero quotability: Yes — "Art is the signature of civilizations." is a complete, portable aphorism by a renowned cultural figure; it carries full meaning in isolation, lands on Mother's Day with biographical resonance, and applies directly to a portfolio site making its daily signature.
2. Because-of chain: Yes — phrase (civilizational monument) → Specimen (typography IS the monument, nothing else needed); → anton-inter-tight (Anton's condensed authority renders a declarative sentence at full-canvas scale without lyrical flourish); → amber H:35° (gold-on-black is the chromatic register of inscriptions and illuminated manuscripts, and lands exactly in the mandated 20°–50° window); → centered two-line inscription with void breathing space (a monument needs space to be read from across the room).
3. Render feasibility: Yes — at 1440×900, Anton `clamp(64px, 7.2vw, 108px)` produces a two-line block of ~220px; after subtracting 80px nav clearance, 28px attribution, and 48px signal strip, ~620px of vertical breathing space remains, centering the quote block with ~310px above and below — full Specimen scale without overflow.

## Rationale
The hero phrase found itself the moment Beverly Sills' quote surfaced from the signal feed on Mother's Day. The sentence is a monument in miniature: six words, zero hedging, scalable to any size without losing meaning. A portfolio site that rebuilds itself daily is already an argument that design is a kind of authorship — a signature left across time — so the phrase isn't borrowed decoration; it's a description of what the site does. That triple resonance (Sills as cultural figure, Mother's Day, portfolio-as-signature) made the choice automatic.

The Specimen archetype is the only honest container for a phrase this self-sufficient. The quote does not need context, support, or competing elements — it needs a ground large enough to let it land. Anton at `clamp(64px, 7.2vw, 108px)` renders two lines that together span 70–80% of the canvas both horizontally and vertically, turning the viewport into a single slab of inscription. The condensed letterforms of Anton are specifically right here: they give the phrase declaration without performance, authority without drama. Inter Tight in the signal strip provides legible contrast — the workhorse beneath the monument — without intruding on the quote's isolation.

Amber at H:35° on near-black `#0F0B07` is the design's single chromatic event. This is the color of gold leaf, candlelight on old paper, wax seals, the illuminated edges of parchment — the whole visual vocabulary of "civilization" as a material fact rather than an abstraction. The palette lands squarely in the mandated 20°–50° window with no overlap against any of the last seven days' primaries. The warmstone neutral family tints every surface toward the same amber frequency, so even the near-black background participates in the palette rather than sitting as anonymous void. The signal strip at the bottom carries Mother's Day in amber.400, golf and scores in stone.300, and two Detroit losses in quiet muted warmstone — today is a civilizational day, not a scoreboard day, and the palette knows it.
