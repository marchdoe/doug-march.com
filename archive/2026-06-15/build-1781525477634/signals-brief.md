# Signals Brief — 2026-06-15

## Hero Copy
Do what you can, with what you have, where you are.

## Hero Rationale
Today's `signals.quote` arrives from Colin R. Davis with perfect timing: new moon day 1 (zero illumination, clean slate), a Monday, peak-summer daylight at 14.7 hours, all sports teams in offseason — the site has nothing but itself and its signals. That is the exact operating condition this quote describes. A portfolio that rebuilds itself daily from whatever data shows up is executing this instruction every morning. The phrase stands completely alone without the portfolio context, passes the screenshot test, and the "Do / Have / Are" three-clause structure is inherently cinematic.

## Archetype
Scroll

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue** — H:350° (deep crimson). The mandate forbids 6°–325°; the 325°–360° window is pure crimson-red, exactly right for an action mandate. Recent archive has cycled through green, teal, amber, indigo, cyan, violet, chartreuse — red has not appeared. After seven dark builds, this is the first full inversion to a white field.
- **Neutral palette**
  - 50: `#FAFAF8` — near-white with a hair of warmth
  - 100: `#F5F5F2`
  - 200: `#EBEBEA`
  - 300: `#D8D8D5`
  - 400: `#B5B5B0`
  - 500: `#8E8E88`
  - 600: `#6A6A64`
  - 700: `#4A4A44`
  - 800: `#2E2E28`
  - 900: `#1A1A14`
- **Accent color** — light: `#F05063` / default: `#C41230` / dark: `#A00020` / glow: `rgba(196,18,48,0.12)`. Contrast of `#C41230` on `#FAFAF8` ≈ 5.8:1 — WCAG AA ✓
- **Secondary accent** — none
- **Background** — page bg: `#FAFAF8` / card bg: `#F5F5F2` / sidebar bg: N/A (Scroll has no sidebar)
- **Text colors** — primary: `#1A1A14` (~16.5:1 on bg) / secondary: `#4A4A44` / muted: `#8E8E88`

---

### 2. Typography
- **Hero phrase rendering** — `display` token, Bricolage Grotesque weight 700. Three stacked lines, left-aligned, at `clamp(44px, 5.8vw, 88px)` per line. Lines are uniform scale — the three clauses hold equal weight, the rhythm is the meaning. Line height: `0.94` on the hero block so lines press together into a single dense object. Attribution "— Colin R. Davis" below in Manrope 14px, weight 400, muted stone.600, letter-spacing 0.08em, all-caps.
- **Signal fold headings** — `clamp(32px, 3.2vw, 52px)`, Bricolage weight 600
- **Body text** — Manrope 16px / 400 weight, line-height 1.55
- **Signal data labels** — Manrope 12px, weight 500, letter-spacing 0.08em, caps
- **Line heights** — hero: `0.94`, section headings: `1.05`, body: `1.55`
- **Letter spacings** — hero: `-0.025em`, body: `0em`, caps/labels: `0.08em`

---

### 3. Layout Specification
- **Archetype: Scroll** — A single committed cinematic column carries the three-clause imperative as a typographic object in the first fold, then descends through signal data, work, and capabilities. No sidebar competes with the quote; nothing shares the first fold except attribution and a thin crimson rule below.
- **CSS structure**
  ```
  body: display: flex; flex-direction: column; align-items: center;
  .scroll-column: width: 88vw; max-width: 1440px; padding: 0 6vw;
  each fold: min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  ```
- **Major dimensions**
  - Hero fold height: `min-height: 100vh`
  - Column width: `88vw`, `max-width: none` (full-canvas intent, padding only 6vw)
  - Signal fold: `min-height: 70vh`
  - Work fold: `min-height: 100vh`
  - About fold: `min-height: 60vh`
  - Section padding: `96px 0` between major sections
- **Nav placement** — Sticky top bar, `height: 64px`, `position: sticky; top: 0; z-index: 100`. Background: `#FAFAF8` with 1px bottom border `#EBEBEA`. Left: "Doug March" in Manrope weight 600 12px caps letter-spaced. Right: inline nav links (Work, About) in Manrope 13px, weight 500, stone.600, hover → crimson.
- **Hero phrase grid zone** — Left-aligned block beginning at 64px from left edge (aligns to column gutter), vertically centered in the 100vh fold. Quote block occupies approximately rows 35%–75% of fold height (roughly 315px–675px of 900px). Top 35% has breathing room; bottom 25% holds attribution + crimson rule. The phrase at `clamp(44px, 5.8vw, 88px)` across 88vw column = roughly 860px effective line-box, three lines stacking to ~250px total block height.

---

### 4. Component Character
- **Border radius** — cards: `4px`, buttons: `2px`, tags: `2px`. Sharp and deliberate — this is not a friendly rounded system; it is a directed one.
- **Border treatment** — Bordered where needed: 1px `#EBEBEA` on cards. The crimson accent appears as a 3px left-border rule on signal items, not as background fill (preserves the white field's openness). One full-width 2px crimson rule beneath the attribution in the hero fold.
- **Shadow** — None on hero. Cards: `0 1px 4px rgba(26,26,20,0.07)` — barely present, just enough to lift off the page.
- **Density** — Hero fold: maximally spacious. Signal fold: medium-tight, data arranged in a 3-column grid. Work fold: 3-card row with generous gap (48px). No over-crowding anywhere.
- **Interactive states** — Links: color transition from `stone.600` → `crimson.600` on hover (150ms ease). Cards: translate `0 -2px` on hover (100ms). No dramatic state changes — the design is confident enough to not perform.

---

### 5. Signal Integration
- **New moon (Day 1)** — Signal fold, first and largest item. A hollow circle glyph `○` at 64px in crimson, labeled "NEW MOON / CYCLE 1" in 11px Manrope caps below it. The blank slate that frames the entire quote.
- **Daylight hours** — Signal fold, second item. `14.7` in Bricolage 52px, weight 600, crimson; labeled "hours of daylight" in 12px stone.500. Subtext: `4:48 → 19:32` in 11px muted.
- **Golf result** — Signal fold, third item. "BUD CAULEY" in 14px Manrope caps, stone.700; `−17` in Bricolage 48px, crimson; "RBC Canadian Open · Final" in 11px muted stone.500.
- **Juneteenth countdown** — Inline footnote at the very bottom of the signal fold, one line: `○ Juneteenth in 4 days` — 12px Manrope, stone.500. Not headlined, just present.
- **Quote display** — The quote IS the hero phrase. Three lines at marquee scale in the first fold; no blockquote styling, no quotation marks, no decorative swash. The attribution is the only metadata. The crimson 2px horizontal rule below the attribution is the only structural accent on the fold.
- **Music** — Guided by Voices / My Morning Jacket appear as a secondary footnote in the about/capabilities fold: `↪ Currently: Guided by Voices, My Morning Jacket` in 12px Manrope, muted.

## Self-Check
1. Hero quotability: Yes — "Do what you can, with what you have, where you are." stands completely alone; it is a well-known independent declaration, not a description of the portfolio or its contents.
2. Because-of chain: Yes — imperative three-clause quote → Scroll (cinematic descent of three beats) → bricolage-manrope (warm expressive, Scroll-tagged, 1.500 ratio) → crimson on near-white (action-red, mandate's sole open window at 325°–6°, first light-field build after seven dark builds).
3. Render feasibility: Yes — Bricolage Grotesque at `clamp(44px, 5.8vw, 88px)` across 88vw effective column renders all three lines at ~88px on 1440px wide without overflow; line height 0.94 stacks three lines to ~248px, comfortably within a 100vh hero fold at 900px.

## Rationale
The hero phrase arrived from `signals.quote` and locked in immediately: "Do what you can, with what you have, where you are." is not merely motivational wallpaper — it is the operating instruction of a portfolio that reads raw YAML each morning and builds from whatever is present. On new moon day 1 (zero illumination, the cycle's blank slate), a Monday in peak-summer June with 14.7 hours of daylight and all sports teams in their offseason silence, the site has only itself and its signals. That is exactly what the quote addresses. The three-clause structure — Do / Have / Are — is inherently cinematic; each clause narrows the frame from action to resource to place.

The Scroll archetype follows without competition. The three clauses are three vertical beats, and Scroll's cinematic single-column at ≥80% viewport width gives each beat the space it needs. No sidebar interrupts the descent; no competing columns dilute the declaration. The hero fold is entirely the quote, an attribution line, and a crimson rule. Everything else — signals, work, capabilities — descends in subsequent folds, each one a consequence of the command above it. Bricolage Grotesque is right not because it is available in the catalog but because Bricolage's variable optical weight at 700–800 in its upper optical-size range produces a specific kind of authority: warm but committed, not cold-condensed like Anton or Bebas. The quote isn't shouting; it is stating. The 1.500 modular ratio clears the marquee-scale requirement comfortably.

The palette is the most significant decision. The color mandate's forbidden zone runs 6°–325°, leaving only the 325°–360°/0°–6° corridor: crimson, red, rose. Seven consecutive dark builds — acid green, teal, amber, indigo, cyan, violet, chartreuse — had emptied the archive of warmth and inverted the convention. Deep crimson (#C41230) on near-white (#FAFAF8) is the precise reversal: the first fully light-field build in over a week, with the quote blazing in red rather than floating in dark. The contrast is 5.8:1 — cleanly AA-accessible for body text and comfortably above 3:1 for any large display treatment. Red is the color of directives, of action, of Monday mornings that mean it. The palette earns the phrase.
