# Signals Brief — 2026-07-10

## Hero Copy
The moment you stop to think about whether you love someone, you've already stopped loving that person forever.

## Hero Rationale
Carlos Ruiz Zafón's sentence from *The Shadow of the Wind* arrived as today's primary signal — and it requires nothing from the surrounding design except space to land in. On a Friday in mid-July with a waning crescent moon at 13.8% illumination (the closing hours of a lunar cycle), this aphorism about irreversible endings is precisely calibrated to the day's emotional register. For a portfolio site that commits to a new decisive gesture every morning rather than defaulting to any template, the quote is also self-portrait: hesitation is the thing that kills. It is one of the most screenshot-shared literary quotes of the past two decades and earns its scale on that fact alone.

## Archetype
Gallery Wall

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:63°, S:88%, L:46% — golden chartreuse, mathematically inside the mandate's only open corridor (58°–75°), and tonally precise for a July literary brief: the hue of sunlit limestone and printed pages held toward a window. Named "Barcelona gold."
- **Neutral palette** (warm-tinted toward amber, like aged paper and bookshelf stone):
  - stone.50:  #FAFAF5
  - stone.100: #F5F3E8
  - stone.200: #E8E5D4
  - stone.300: #CBC6B2
  - stone.400: #9E9888
  - stone.500: #6E6858
  - stone.600: #4E4A3C
  - stone.700: #342F24
  - stone.800: #1E1912
  - stone.900: #120E06
- **Accent color:**
  - light:   #E8F200
  - default: #D8E500
  - dark:    #B2BE00
  - glow:    #EEFF9E
- **Secondary accent:** None — single-accent strategy. The literary quote tolerates no chromatic competition.
- **Background:**
  - Page bg:    #120E06 (stone.900, near-void warm black)
  - Card bg:    #1E1912 (stone.800)
  - Sidebar bg: #1E1912 (stone.800)
- **Text colors:**
  - Primary text:   #F8F0DC — warm cream, ~18:1 on page bg ✓
  - Secondary text: #9E9888 — stone.400, ~5:1 on page bg ✓ (passes AA large text)
  - Muted text:     #6E6858 — stone.500, ~3.3:1 on page bg (decorative / large labels only)

### 2. Typography (spectral-albert chassis)

- **Hero phrase rendering:** Spectral `display` token, italic variant (`font-style: italic`), `clamp(2.25rem, 4.2vw, 5rem)`, left-aligned, natural line-breaks across 4–5 lines. The Zafón quote does not want condensed weight or all-caps — it wants the gravity of Spectral's transitional slab italic, like a fragment pulled directly from the novel's pages. At max scale on a 1440px viewport, the quote occupies approximately 380–440px of vertical space within its 7/12-column zone.
- **Line heights:**
  - Hero quote: 1.12 (tight enough for mass; generous enough for Spectral's italic descenders)
  - Attribution line: 1.4
  - Body / card prose: 1.6 (dark bg compensation, +0.05 above normal)
  - Signal labels: 1.2
- **Letter spacings:**
  - Hero quote: 0em — Spectral's italic inherently carries rhythm
  - All-caps labels (TIGERS, SCOTTISH OPEN, MOON): 0.12em
  - Nav items: 0.10em
  - Body / captions: 0em

### 3. Layout Specification

- **Archetype:** Gallery Wall — the Zafón quote lives as a dominant text block in the upper-left of the canvas, with signal, navigation, and project blocks asymmetrically placed across the remaining void. The irregular whitespace between blocks is compositional, not padding. The literary fragment sits like a pinned note in a vast dark reading room.
- **CSS grid structure:**
  ```css
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  column-gap: 0;
  row-gap: 0;
  padding: 72px 5vw 96px;
  max-width: none;
  ```
- **Major dimensions:**
  - Canvas: 100vw, no max-width constraint; side padding 5vw
  - **Hero quote zone:** `grid-column: 1 / 8; grid-row: 1 / 2` — ~58% canvas width, begins 72px from top edge
  - **Attribution zone:** `grid-column: 1 / 6; grid-row: 2 / 3` — 24px below quote base, inset from left
  - **Signals zone:** `grid-column: 9 / 13; grid-row: 1 / 3` — upper right, top-padded 120px (creates asymmetric vertical offset vs. quote top — this IS the Gallery Wall)
  - **Projects zone:** `grid-column: 1 / 13; grid-row: 3 / 4` — full width, ~80px below attribution
  - **Identity/nav zone:** `grid-column: 1 / 5; grid-row: 4 / 5` — lower left
  - **Capabilities zone:** `grid-column: 6 / 13; grid-row: 4 / 5` — lower right
- **Nav placement:** Top-right, compact horizontal bar at page top — `grid-column: 9 / 13`, positioned above the signals zone (treated as a header sub-zone). Albert Sans, 11px, uppercase, letter-spacing 0.12em. Four links: WORK · ABOUT · CONTACT · FRI 10 JUL 2026.
- **Hero phrase grid zone:** Columns 1–7, row 1. The quote begins at the established top inset. At `clamp(2.25rem, 4.2vw, 5rem)` Spectral Italic, line-height 1.12, the 21-word quote breaks into 4 natural lines of roughly even visual mass.

### 4. Component Character

- **Border radius:** `none` (0px) on all elements. The quote's philosophical severity permits no softened corners.
- **Border treatment:** Sparing. A 1px left border in `accent` (#D8E500) marks the attribution line — the only purely decorative border. A 1px `border` token (stone.700) defines the signals block on its left edge. No other borders.
- **Shadow:** None. The near-void background establishes all depth through pure darkness.
- **Density:** Spacious in the quote zone (white-void breathing room earns the quote its weight); compact in the signals zone (dense labeled data, ticker-register).
- **Interactive states:** Project cards — 1px left border in accent appears on hover. Nav links — accent underline on hover. No transition animations; immediate state changes match the quote's declarative finality.

### 5. Signal Integration

- **Zafón quote (hero):** IS the page — Spectral Italic at display scale, cream #F8F0DC, upper-left zone, left-aligned, no pull-quote decoration. Quotation marks are set as typographic openings.
- **Attribution:** Two lines below quote in Albert Sans small caps, stone.400: "— CARLOS RUIZ ZAFÓN · THE SHADOW OF THE WIND". A 1px accent left border runs the full height of the attribution block.
- **Tigers 4–1:** In signals zone. Label: "TIGERS" — Albert Sans caps, widest letter-spacing, stone.500. Score: "4 · 1  W" — cream weight for the numerals, accent for the "W". Sub-line: "vs. Kansas City · Jul 9" in stone.400 at 11px.
- **Golf leaderboard:** "SCOTTISH OPEN" label. Three entries: Jordan Smith −8 / Willett −6 / Fitzpatrick −6. Albert Sans, 12px, stone.400; leader score in accent.
- **Moon:** "🌒  WANING CRESCENT  14%" in stone.500 at 11px, bottom of signals zone. The lunar close connects to the quote's theme of endings.
- **Music:** "GBV · TOBIN SPROUT" in stone.500 italics, 11px, base of signals block — a whispered continuity with yesterday.
- **Chat Control:** Below sports scores: "EU: Chat Control 1.0 — Parliament" in stone.500 at 11px, no accent color. A note, not an alarm.
- **Friday/date:** "FRI 10 JUL 2026" in nav bar, Albert Sans caps, 11px, stone.400.
- **Awwwards echo:** "21 HRS ON THE MOON" in stone.600 at 10px, lower-right corner of projects zone — the Artemis SOTD as a barely-legible environmental footnote for those who look.

## Self-Check
1. Hero quotability: Yes — Zafón's line from *The Shadow of the Wind* has circulated as a standalone screenshot-worthy quote for over a decade; it is complete, devastating, and fully legible without context.
2. Because-of chain: Yes — the literary register of the quote demands Spectral Italic (not a condensed signage face), the Gallery Wall archetype (dominant text block among asymmetric signal elements, not a full-viewport poster), and golden chartreuse on near-void black (the color of candlelight, of Barcelona, of the narrow hue corridor the mandate opens today).
3. Render feasibility: Yes — Gallery Wall requires no 70%+ height fill (that is Specimen's constraint); Spectral at clamp(2.25rem, 4.2vw, 5rem) in a 7/12-column zone renders the full 21-word quote at comfortable literary marquee scale on 1440×900 without overflow.

## Rationale
The Zafón quote arrived as today's primary signal — and it arrived fully formed. "The moment you stop to think about whether you love someone, you've already stopped loving that person forever" is a philosophical aphorism that has circulated as a standalone screenshot-shared quote for well over a decade, lifted cleanly from *The Shadow of the Wind* and passed around exactly because it reads as a finished thought. On a Friday in mid-July, with the moon at 13.8% illumination in its final waning days, the quote's subject — the irreversibility of a moment, the thing that ends before you know it has ended — is calibrated precisely to the day's emotional register. For a portfolio site that rebuilds itself every morning from fresh environmental data rather than from a fixed template, the quote is also autobiographical: the site never hesitates, never repeats itself by default, never stops to second-guess the gesture.

Gallery Wall was the only honest archetype for this phrase. The quote does not want to fill a full viewport poster-style (that would reduce it to a motivational poster; the phrase has too much nuance for that treatment). It wants to occupy a dominant zone in a composed canvas — like a pinned note in a vast reading room — surrounded by the day's other signals at respectful but unequal distances. The asymmetric offset of the signals block (120px lower than the quote top) is the Gallery Wall's signature move: blocks that are not aligned with each other, whitespace that is placed rather than inherited. Spectral Italic is the only honest chassis choice for Zafón: Spectral's transitional slab letterforms in italic have the literary gravity of a well-set book page, the exact register of a sentence worth pulling from a novel. Anton or Big Shoulders would shout; Bebas would posture; Spectral earns the quote's authority through its serifs rather than its weight.

The color mandate's narrow 58°–75° corridor — the only open zone after six recent designs consumed most of the hue wheel — forces golden chartreuse (#D8E500) as the accent. This turns out to be exactly right: H:63° is the hue of Mediterranean sunlight on limestone, of afternoon light through old book pages, of the particular gold that makes darkness feel inhabited rather than empty. Against the near-void warm black background (#120E06, with its amber tint pulling toward the same hue family), the chartreuse-gold reads as something emitted rather than reflected — a candle in a bookshop at closing time, warm and irreplaceable.
