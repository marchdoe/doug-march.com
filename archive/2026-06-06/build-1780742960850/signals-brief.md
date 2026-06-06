# Signals Brief — 2026-06-06

## Hero Copy
It's your road, and yours alone.

## Hero Rationale
Rumi's opening clause from today's `signals.quote` earns the hero slot not because it's famous but because it is the exact thesis of this site: a portfolio that tears itself down and rebuilds every morning is the most literal enactment of a road only one person can walk. The truncation to "It's your road, and yours alone." is deliberate — the second clause ("others may walk it with you, but no one can walk it for you") is implicit, leaving the declaration without apology or softening. On a Saturday in June, with 14.6 hours of daylight and a Tigers win banked, the phrase carries lightness and ownership simultaneously.

## Archetype
Split

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** 112° (lime/chartreuse) — mandated 108°–125° zone honored; genuinely the correct hue for a Saturday in June, Memorial Tournament in progress, Tigers on the grass, maximum summer saturation
- **Neutral palette (forest family, tinted toward H:112°):**
  - 50: #D0E8B0
  - 100: #A8C880
  - 200: #7CAA4C
  - 300: #547828
  - 400: #385212
  - 500: #243608
  - 600: #182505
  - 700: #111A03
  - 800: #0D1404
  - 900: #080D02
- **Accent:** light = #C3EE92 / default = #7AFF18 / dark = #409200 / glow = rgba(122,255,24,0.15)
- **Secondary accent:** none — single hue family, full commitment
- **Background:** page bg = #080D02 (forest.900), left panel bg = #060B02 (deeper), right panel bg = #0D1404 (forest.800, subtle separation)
- **Text:** primary = #E6F9D2 (mist.200), secondary = #B8E090 (mist.400), muted = #65A038 (mist.600), hero phrase = #7AFF18 (lime.400 — the phrase IS the accent)

Contrast verification:
- Hero phrase (#7AFF18) on left panel (#060B02): ~15:1 ✓✓
- Primary text (#E6F9D2) on right panel (#0D1404): ~14:1 ✓✓
- Secondary text (#B8E090) on bg: ~10:1 ✓✓
- Muted text (#65A038) on bg: ~5.5:1 ✓ (passes AA for normal text)

### 2. Typography (chassis-derived)

- **Hero phrase rendering:** Bebas Neue at `clamp(64px, 7vw, 100px)`, color lime.400 (#7AFF18), line-height 0.88, letter-spacing 0.01em. Rendered as a 4-line stepped cascade in the left panel:
  ```
  IT'S YOUR
  ROAD,
  AND YOURS
  ALONE.
  ```
  Intentional stepped/short-line rhythm — "ROAD," and "ALONE." land short, the unresolved space after each is the road metaphor made visible.
- **Rumi attribution:** IBM Plex Sans, 12px, mist.600 (#65A038), letter-spacing 0.10em, uppercase: `— RUMI`
- **Right panel labels:** Bebas Neue, 11px, lime.400, letter-spacing 0.14em — "SELECTED WORK", "TODAY", "D.M."
- **Project titles:** IBM Plex Sans, 16px, mist.200, weight 400, letter-spacing 0
- **Project metadata:** IBM Plex Sans, 13px, mist.600, weight 400
- **Signal values:** Bebas Neue, 18–22px, lime.400, letter-spacing 0.04em
- **Line heights:** 0.88 for hero, 1.1 for section labels, 1.5 for body/catalog rows
- **Letter spacings:** 0.01em for hero, 0.14em for small-caps labels, 0 for project titles

### 3. Layout Specification

- **Archetype:** Split. Left half = the declaration, right half = the proof. The road is named on the left; the work done on it is cataloged on the right. Two active surfaces, no center void. Not recently used (last 7 days are Scroll, Poster, Specimen, Gallery Wall, Index, Broadsheet, Specimen).

- **CSS grid structure:**
  ```css
  display: grid;
  grid-template-columns: 45fr 55fr;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  ```

- **Left panel (45% = ~648px at 1440):**
  ```css
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 52px;
  background: #060B02;
  min-height: 100vh;
  position: relative;
  ```

- **Right panel (55% = ~792px at 1440):**
  ```css
  display: flex;
  flex-direction: column;
  padding: 64px 52px;
  background: #0D1404;
  min-height: 100vh;
  border-left: 1px solid #182505;
  ```

- **Major dimensions:**
  - Both panels: `min-height: 100vh`
  - Hero phrase block: approximately 100px × 4 lines × 0.88 = ~352px centered in a 900px panel — 274px above/below breathing room
  - Left panel content width: ~544px (648px − 104px padding)
  - Right panel content width: ~688px (792px − 104px padding)
  - Max content width: none

- **Nav placement:** Bottom of right panel — three text links (Work, About, Contact) in IBM Plex Sans 12px mist.500, letter-spacing 0.08em, arranged as `position: absolute; bottom: 48px; left: 52px` within the right panel.

- **Date mark:** Top-left of left panel at `position: absolute; top: 48px; left: 52px` — "06.06.2026" in IBM Plex Sans 11px, mist.700/forest.300 (#547828), letter-spacing 0.10em. Very quiet presence.

- **Hero phrase grid zone:** Left panel, vertically centered. `flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 24px` — the 4-line Bebas block + 16px gap + attribution line.

### 4. Component Character

- **Border radius:** none (0px) everywhere — the road has no rounded corners. Cards = 0, buttons = 0, tags = 0.
- **Border treatment:** `1px solid {colors.forest.600}` (#182505) for horizontal rules between sections in the right panel. Single precise hairlines.
- **Shadow:** none. Depth via color value contrast between forest.900 and forest.800.
- **Density:** Left panel = spacious (one idea, vast breathing room). Right panel = compact (every row carries weight, tight leading, 1px rules between sections).
- **Interactive states:** Project title hover → `color: lime.400 (#7AFF18)`, transition `0.08s ease`. Nav links → `color: mist.200`, transition `0.08s`. No underlines, no backgrounds.
- **Scrollbehavior:** Right panel may scroll independently on mobile; desktop is fixed 100vh.

### 5. Signal Integration

- **Signal placement:** A "TODAY" section in the lower third of the right panel, after the work catalog and a hairline rule.

- **Tigers 7–3:** Rendered as two-column item — `TIGERS` in Bebas 11px lime.400 letter-spacing widest / `7–3` in Bebas 22px lime.400 / `W` in Bebas 11px mist.600 superscript. One line.

- **Golf — Poston −9 at the Memorial:** `POSTON` label / `−9` in same treatment as Tigers score. Single line. `MEMORIAL TOURNAMENT` in 10px mist.700 beneath as context.

- **Moon — last quarter 57.2%:** `☽` glyph in mist.400, 14px + `LAST QUARTER` in IBM Plex Sans 11px mist.600, letter-spacing 0.08em.

- **The quote IS the hero phrase:** Attribution `— RUMI` in IBM Plex Sans 12px mist.600, letter-spacing 0.10em, uppercase, sits 24px below the final line of the hero phrase in the left panel.

- **Awwwards signal:** "21 HRS ON THE MOON" from today's Awwwards earns a quiet footnote in the right panel — `21 HRS ON THE MOON` in Bebas 13px mist.700, one line, after the sports signals. The Artemis/moon connection echoes the lunar phase and today's date (June 6 — history remembered).

- **Day context:** The date `06.06.2026` at top-left of left panel is the only reference to the date; no explicit D-Day note (would feel imposed on a portfolio surface).

## Self-Check
1. Hero quotability: Yes — "It's your road, and yours alone." is Rumi at his most declarative, quotable entirely without context, and self-referential on a portfolio that rebuilds itself daily.
2. Because-of chain: Yes — "your road alone" → Split (left=declaration/right=proof of the road taken) → bebas-plex (Bebas for road-sign authority, Plex for catalog clarity) → electric lime H:112° (mandated zone, summer Saturday, golf fairway, Tigers win) → 4-line stepped cascade left panel at 100px max.
3. Render feasibility: Yes — at `clamp(64px, 7vw, 100px)` Bebas Neue in 4 lines, the longest lines ("IT'S YOUR" / "AND YOURS") are ~9 chars × ~0.5em average × 100px = ~450px against a ~544px content width; no overflow risk on 1440×900.

## Rationale
The hero phrase arrived from Rumi via today's `signals.quote` with its argument already complete: this portfolio is itself the demonstration. A site that redesigns its own visual identity every single morning — reading signals, making decisions, tearing down yesterday — is a structure that can only exist because someone is walking their own road daily. "It's your road, and yours alone." is not a quote *about* the portfolio; it *is* the portfolio's operating logic stated plainly. The truncation to the opening clause is deliberate: the second half ("no one can walk it for you") is implied, and implication at marquee scale is more powerful than completion.

The Split archetype followed without argument. If the declaration is that there is YOUR road and there is evidence of it, the layout must make those two things physically adjacent but distinct. Left half = the claim; right half = the proof. The catalog of work on the right — FishSticks, 15th Club, Spaceman, the whole arc — is the road walked. Every project row is a step. The archetype is not illustrating the phrase; it is structuring the argument spatially. Bebas Neue was the only honest chassis choice: the condensed, institutional, road-sign weight of Bebas renders the phrase at the scale it deserves without the warmth-for-its-own-sake of Bricolage or the stadium-shout of Big Shoulders. This phrase is not warm and not a stadium — it is a clean directive. IBM Plex Sans in the right panel is the workhorse catalog body, contrasting the display register cleanly.

Electric lime at H:112° lands squarely in the mandated 108°–125° zone, but the mandate is the least interesting reason to use it. June 6 on a Saturday: the Memorial Tournament is live at Muirfield Village, J.T. Poston at −9 on a green that is specifically *that* color; the Tigers won 7–3 yesterday on outfield grass; 14.6 hours of daylight pressing full summer light into every outdoor surface. This is the hue of the day empirically. On #080D02 (void-green near-black), #7AFF18 electric lime at 100px Bebas Neue does not merely display — it *radiates*. The hero phrase is the accent color; the accent color is the hero phrase; they are the same commitment at different scales.
