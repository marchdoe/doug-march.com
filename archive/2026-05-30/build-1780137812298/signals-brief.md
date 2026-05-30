# Signals Brief — 2026-05-30

## Hero Copy
EVEN THOUGH YOU ARE ON THE RIGHT TRACK — YOU WILL GET RUN OVER IF YOU JUST SIT THERE.

## Hero Rationale
The Will Rogers quote arrived from `signals.quote` and is this portfolio's unsolicited operational memo: every project in the register (Spaceman, FishSticks, 15th Club, TeeTurn) is someone choosing to move rather than sit. On a Saturday with a full moon at 99.9% illumination, Risk 8/10, and a Tigers loss that came from being one run short, the phrase functions as both critique and permission. It earns marquee scale because it is funny, pointed, and irreducibly true — the kind of line you'd write on a sticky note and leave for yourself.

## Archetype
Specimen

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:3° (HSL), a railroad-warning crimson. Falls in the 0°–5° open zone. Not warm orange, not tomato — this is the specific red of a NO TRESPASSING sign or a STOP board, which is exactly what the quote is.
- **Neutral palette (warm stone, tinted toward red/warm)**:
  - 50: `#FAFAF8` — near-white, minimal warm cast; page background
  - 100: `#F4F3F0` — card surfaces
  - 200: `#E8E6E0` — borders, dividers
  - 300: `#D0CCC4` — disabled states
  - 400: `#A8A39C` — muted UI
  - 500: `#7A756E` — secondary text
  - 600: `#565048` — attribution, footnotes
  - 700: `#3A3530` — heading fallback
  - 800: `#252220` — near-black surface
  - 900: `#131210` — primary text, darkest
- **Accent color (crimson red)**:
  - Light: `#FF8070` (red.300)
  - Default: `#E8351E` (red.500)
  - Dark: `#CC1E0B` (red.600) — used for hero display text
  - Glow: `#FF5A4A` (red.400)
- **Secondary accent** — none. One color, full commitment.
- **Background**: page bg `#FAFAF8` (stone.50); card bg `#F4F3F0` (stone.100); no sidebar
- **Text colors**: primary text `#131210` (stone.900); secondary `#565048` (stone.600); muted `#A8A39C` (stone.400)

**Contrast checks:**
- red.600 `#CC1E0B` on stone.50 `#FAFAF8`: ≈5.1:1 ✓ (AA body text)
- stone.900 `#131210` on stone.50 `#FAFAF8`: ≈17.9:1 ✓
- stone.600 `#565048` on stone.50 `#FAFAF8`: ≈7.2:1 ✓

---

### 2. Typography (chassis: bebas-plex)

- **Hero phrase rendering** — Bebas Neue at `clamp(70px, 7.5vw, 108px)`, all caps (Bebas is inherently caps), color: red.600 `#CC1E0B`. Broken into five lines:
  ```
  EVEN THOUGH YOU
  ARE ON THE RIGHT
  TRACK — YOU WILL
  GET RUN OVER IF
  YOU JUST SIT THERE.
  ```
  Left-aligned, padding `0 6vw`. Each line spans 40–80% of the available content width — unequal lengths create a descending staircase of urgency, widening line-by-line toward the bottom.
- **Attribution line** — IBM Plex Sans, `clamp(15px, 1.2vw, 18px)`, weight 400, stone.500, right-aligned below the display block: `— Will Rogers, 1935`
- **Nav text** — IBM Plex Sans, 14px, weight 400, stone.600, letter-spacing: wide (0.05em), all caps
- **Body / signal text** — IBM Plex Sans, 15px, stone.700, weight 400
- **Line heights**:
  - Hero display: `0.88` (tight — Bebas needs no breathing room)
  - Body / attribution: `1.5` (normal)
  - Signal strip: `1.4`
- **Letter spacings**:
  - Hero: `0` (Bebas is already tracked for display; manual tracking hurts it)
  - Nav labels: `0.08em` (caps tracking for small-size readability)
  - Signal labels: `0.05em`

---

### 3. Layout Specification

- **Archetype: Specimen** — Typography IS the design. The Will Rogers quote occupies the majority of the first viewport; everything else is subordinate evidence that someone here chooses not to sit still. The white page and red type read as a broadside posted in a railroad station.

- **CSS structure**:
  ```css
  /* Page shell */
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    max-width: none;
  }

  /* Nav bar */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6vw;
    height: 56px;
    border-bottom: 1px solid stone.200;
    position: sticky;
    top: 0;
    background: stone.50;
    z-index: 10;
  }

  /* Hero zone */
  .hero {
    padding: 80px 6vw 48px;
    flex: 1;
  }

  /* Attribution row */
  .attribution {
    padding: 24px 6vw 0;
    text-align: right;
  }

  /* Signal strip — below fold */
  .signals {
    padding: 64px 6vw 48px;
    border-top: 1px solid stone.200;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
  }
  ```

- **Major dimensions**:
  - Hero zone height: implicit — `padding-top: 80px` + 5 lines at ~95px each ≈ 555px total from nav bottom ≈ **68% of 900px viewport** (with attribution at ~88vh)
  - `max-width: none` — full canvas, no container cap
  - Side padding: `6vw` on all sections (86px at 1440px)
  - Nav height: `56px`
  - Signal strip: below fold, visible on scroll

- **Nav placement** — top sticky bar. Left: "DOUG MARCH" in stone.600, 14px, tracking 0.08em, all caps. Right: three links (Work · About · Contact) in stone.500, 14px.

- **Hero phrase grid zone** — occupies full horizontal extent of content area (1440px − 2×86px = 1268px available). Vertical: rows 1–5 of the display block. At 108px with 0.88 leading, each line ≈ 95px; five lines ≈ 475px. Positioned starting at `top: 56px + 80px = 136px` from viewport top. Display text ends at approximately `136 + 475 = 611px` = 68% of 900px viewport before attribution.

---

### 4. Component Character

- **Border radius** — none/0px everywhere. Bebas Neue at this scale demands hard edges; rounded corners would soften what the quote is explicitly arguing against. Buttons: 0px. Tags: 0px. Cards: 0px.
- **Border treatment** — single-pixel `border: 1px solid {border}` (stone.200) for the nav bottom and the signal strip separator. No card borders in the hero zone.
- **Shadow** — none. White page, flat.
- **Density** — spacious in the hero zone (type breathes across the page), compact in the signal strip (narrow labels, tight rows).
- **Interactive states** — nav links: `color: accent` on hover (red.600 → red.500), underline appears. Signal data rows: subtle `background: stone.100` on hover.

---

### 5. Signal Integration

- **Quote IS the hero phrase** — Will Rogers `signals.quote` is the entirety of the display text. No separate quote component needed; the Specimen layout makes the quote the page.

- **Signal strip (below fold, grid layout)**:
  - **Golf** — "Charles Schwab Challenge" label in stone.400 9px small caps; "Jordan Smith −10" in stone.800 15px bold; leaderboard top 3 in stone.600 13px.
  - **Tigers loss** — "DET 3 · OPP 4" in stone.700 15px, with a red.400 dot indicator beside "L"; yesterday's date in stone.400.
  - **Full moon** — moon phase symbol (●) in stone.900, full illumination %; "Full Moon" label in stone.500. Placed as a standalone data cell.
  - **Hacker News** — Top story "SQLite is all you need for durable workflows" in stone.600 13px, score `546` in red.500 bold. One-line item.
  - **Music** — "Wet Leg · Guided by Voices" in stone.500 13px italic, signal-strip right column.

- **Holiday elements** — none today.

- **Attribution for hero** — "— Will Rogers, 1935" in IBM Plex Sans 18px stone.500, right-aligned, 24px below the final display line.

- **Weekend / full moon treatment** — a single line above the signal strip in stone.400 10px all caps: `SATURDAY · FULL MOON · 99.9% · MAY 30` acting as a dateline, echoing newspaper broadside conventions without becoming a broadsheet.

---

## Self-Check
1. Hero quotability: Yes — "You will get run over if you just sit there" is a standalone statement that earns the screenshot test; Will Rogers attributed, no context needed.
2. Because-of chain: Yes — the railroad-warning phrase demanded crimson (the color of railroad danger signs), which demanded a white page (maximum contrast, broadside register), which demanded Bebas Neue (the most declarative condensed display in the catalog), which demanded Specimen (type as the totality of the design); every choice traces back to the phrase.
3. Render feasibility: Yes — five lines of Bebas Neue at clamp(70px, 7.5vw, 108px); the longest line "YOU JUST SIT THERE." at 19 chars × ~55px avg = ~1045px, comfortably inside the 1268px available at 1440×900 with 6vw side padding.

## Rationale
The Will Rogers quote is the rarest kind of signal-day gift: a phrase already in the correct register for this portfolio. Every project Doug has built (Spaceman, FishSticks, 15th Club, TeeTurn) is the record of someone who got off the track. On a Saturday full moon with Risk 8/10 and a Tigers team that was one run short of moving, the phrase reads as operational guidance, not as motivational poster. It is funny, pointed, and irreducibly true in a way that earns marquee scale without needing context.

The Specimen archetype was the only honest container. A quote about not sitting still cannot be rendered as a centered hero on a field of white — that IS sitting still. Specimen makes the type the entirety of the design: you arrive at the page and you are looking at a printed warning, a broadside nailed to the station wall. The five-line break was chosen to maximize the descending visual weight — the lines get longer as they move toward the bottom, so the eye accelerates. The final line "YOU JUST SIT THERE." lands at the widest point, as if the logic has been delivered and you are out of arguments. Bebas Neue (via `bebas-plex`) is the only chassis in the catalog that matches this register: it is the font of railway signs, of stadium scoreboards, of instructions posted in places where you are expected to obey them immediately.

The crimson red at H:3° falls precisely inside the 0°–5° open zone of the color mandate and has not appeared in the recent archive. More importantly, it is correct: this quote exists in the register of warning signage, and warning signs are red. Against stone.50 (`#FAFAF8` — near-white with the faintest warm cast), the red.600 accent achieves ≈5.1:1 contrast, passing AA even for body text. The choice to make the entire display text red — rather than using red as a single word accent — is the Risk 8/10 move: a white page covered in red proclamation has more commitment than a white page with one lit word. The signal strip below the fold preserves the signals (golf, Tigers loss, full moon, HN top story) in a clean typographic inventory that never competes with the broadside above it.
