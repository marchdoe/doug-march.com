# Signals Brief — 2026-06-01

## Hero Copy
craft itself becomes the story

## Hero Rationale
Lifted from the Awwwards "Power of Storytelling" site description today — "how craft itself becomes the story, why motion, interaction, and immersive design shape brand narratives." For a portfolio that redesigns itself daily, the phrase is the most precisely self-referential hero possible: this site's craft IS the story being demonstrated in real time. No external context needed — standing alone, it makes a portable claim that someone would screenshot. The full moon at 96.5% and the first day of summer combine to amplify the declarative register: something is being announced today at a threshold moment.

## Archetype
Index

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:305° (magenta-purple). Within the mandated 275°–333° available zone; no recent palette has used this hue family. This is the color of neon signage, late-night creative pressure, and June energy at maximum saturation.
- **Neutral palette (amethyst stone — violet-tinted toward H:290°):**
  - 50: `#FAF8FC`
  - 100: `#F2EFF6`
  - 200: `#E3DFEC`
  - 300: `#CBBFDA`
  - 400: `#B09EC3`
  - 500: `#8B7AAA`
  - 600: `#665888`
  - 700: `#4A3D6A`
  - 800: `#312548`
  - 900: `#1A1520`
- **Accent color:**
  - Light/hover: `#E048D8` (magenta.400)
  - Default accessible (links, small text): `#A01098` (magenta.600, ≈6.3:1 on stone.50 — passes AA body)
  - Display/hero (large text only): `#C820BF` (magenta.500, ≈4.3:1 on stone.50 — passes AA large text)
  - Dark: `#780870` (magenta.700)
  - Glow: `0 0 20px rgba(200, 32, 191, 0.35)`
- **Secondary accent:** None. One committed magenta is the voice; a second color would fracture it.
- **Background:**
  - Page bg / index body: `#FAF8FC` (stone.50)
  - Nav + masthead: `#1A1520` (stone.900)
  - Card / alt row: `#F2EFF6` (stone.100)
- **Text colors:**
  - Primary: `#1A1520` (~17:1 on stone.50 — excellent)
  - Secondary: `#4A3D6A` (stone.700, ~8:1 on stone.50)
  - Muted: `#8B7AAA` (stone.500, ~3.2:1 — use at 18px+ / bold only)
  - Inverse (on dark masthead): `#FAF8FC` (stone.50)

---

### 2. Typography (chassis-derived: Bebas Neue + IBM Plex Sans via `bebas-plex`)

- **Hero phrase rendering:** Bebas Neue (`display` token), two lines left-aligned in the dark masthead:
  - Line 1: `CRAFT ITSELF` — color stone.50 (#FAF8FC)
  - Line 2: `BECOMES THE STORY` — color magenta.400 (#E048D8)
  - Scale: `clamp(52px, 5.8vw, 92px)`. At 92px, "BECOMES THE STORY" (17 chars) ≈ 850px wide within 1296px available — fits cleanly.
  - Letter spacing: 0.06em on the display phrase (Bebas all-caps always needs tracking).
  - Below phrase: IBM Plex Sans 12px, stone.400, uppercase, 0.12em tracking: `MON 01 JUNE 2026 · FIRST DAY OF SUMMER · FULL MOON 96.5%`

- **Index column headers:** Bebas Neue, 13px, 0.15em letter spacing, stone.500. Labels: `WORK`, `SIGNALS`, `ABOUT`.

- **Index row names (project/signal titles):** Bebas Neue, 18px, 0.08em letter spacing, stone.900. On hover: magenta.500.

- **Index row meta (year, type, score):** IBM Plex Sans, 11px, 0.05em letter spacing, stone.500, all-caps.

- **Index row description (one-line brief):** IBM Plex Sans, 13px, 0em letter spacing, stone.700. Max one line, no truncation — trim the copy.

- **Nav links:** IBM Plex Sans, 13px, 0.08em letter spacing, stone.400, all-caps. Hover: magenta.400.

- **Line heights:** Hero Bebas: 0.92 (tight stack); Index rows: 1.25 (snug); Description body: 1.5 (normal).

- **Letter spacings:** Hero display: 0.06em; Column headers: 0.15em; Row names: 0.08em; Meta: 0.05em; Body: 0em.

---

### 3. Layout Specification

- **Archetype:** Index. "Craft itself becomes the story" declares the thesis in the masthead; everything below — seven projects, five signals, career entries, capabilities — is the evidence, presented as a ruled directory where each row carries weight equal to every other. The catalog IS the proof of the hero claim.

- **CSS grid/flex structure:**
  ```css
  /* Full page */
  display: grid;
  grid-template-rows: 48px minmax(28vh, auto) 36px 1fr;
  /* nav | masthead | column-headers | index-body */

  /* Masthead (col-spanning full width across all 3 index cols) */
  padding: 36px 5vw 52px;
  background: #1A1520;

  /* Column headers + index body */
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr;
  column-gap: 0;
  padding-left: 5vw;
  padding-right: 5vw;

  /* Column dividers: border-right on cols 1 and 2 */
  border-right: 1px solid #E3DFEC; /* stone.200 */

  /* Row rules: border-bottom on every index row */
  border-bottom: 1px solid #E3DFEC;
  ```

- **Major dimensions:**
  - Nav bar: `height: 48px; padding: 0 5vw;` (fixed, dark)
  - Masthead: `min-height: 28vh; padding: 36px 5vw 52px;` (dark)
  - Column header row: `height: 36px; border-bottom: 2px solid #1A1520;`
  - Index content: `flex: 1 / min-height: ~60vh`
  - Index row height: 48px
  - Max content width: `none` — full viewport, no centering constraint
  - Side padding: `5vw` everywhere

- **Nav placement:** Top bar, 48px height, stone.900 bg flush with masthead. Left: site name "DOUG MARCH" in Bebas 20px, stone.50. Right: nav links (WORK, ABOUT, CONTACT) in IBM Plex Sans 13px, stone.400, uppercase, 0.08em tracking. Hover: magenta.400, 0.1s ease.

- **Hero phrase grid zone:** Full-width masthead row, spans all 3 column zones. Left-aligned at 5vw. Two-line Bebas at `clamp(52px, 5.8vw, 92px)`. Line 1 stone.50; Line 2 magenta.400. Date/season tagline 8px below the phrase, IBM Plex Sans 12px stone.400.

---

### 4. Component Character

- **Border radius:** `0px` throughout — no softening. The Index catalog is angular; rounded corners would undercut the catalog register.

- **Border treatment:** Ruled — 1px stone.200 horizontal between every index row; 1px stone.200 vertical between columns; 2px stone.900 bold rule separating column headers from index body (visual demarcation). No card borders — the row IS the container.

- **Shadow:** None. Flat system. Depth comes from rule weight, color contrast, and type hierarchy — not elevation.

- **Density:** Compact. Index row height 48px, row padding 10px 16px. Column header padding 8px 16px. Everything touching the grid; no float space. 12 rows per column fits comfortably in a 900px viewport after nav (48px) + masthead (≈252px) + headers (36px).

- **Interactive states:** Row hover → row bg shifts to `#FDF0FC` (magenta.50), row name shifts to `#C820BF` (magenta.500). Transition: 80ms ease, flat — no shadow, no scale, no border-color change. Clean catalog interaction.

---

### 5. Signal Integration

- **Where signal elements live:** Center column of the index, under the `SIGNALS` column header. Every signal is formatted identically to every work entry — Bebas row name, IBM Plex Sans meta, one-line description. The signals are catalog-peers of the work.

- **Sports scores styled:**
  - Golf: Row name `SCHWAB CHALLENGE` in Bebas, meta `RUSSELL HENLEY −13 · FINAL` in IBM Plex Sans 11px stone.500. Description: `→ 15TH CLUB` in magenta.600 13px (cross-reference to Doug's golf AI project — a small proof that the index has depth).
  - Tigers: Row name `DETROIT TIGERS` in Bebas, meta `1–2 LOSS · MAY 31` in stone.500. Description: `Close game, wrong side` in stone.700 italic.

- **Quote displayed as:** NOT the hero phrase. Rendered beneath the two-line hero in the masthead as a sub-footnote — IBM Plex Sans italic 13px, stone.500 (on dark masthead): *"If you look inwards, you'll find the answer has been in you all along."* One line, subdued, registering as context not declaration.

- **Full moon:** Signal row: `FULL MOON` Bebas label, meta `96.5% · DAY 16 OF CYCLE`, with a filled Unicode circle `●` in magenta.400 at 10px before the label.

- **HN top story:** Signal row: `HN` label (Bebas), meta `CLOUDFLARE TURNSTILE WEBGL — 698 PTS`, description `fingerprinting concerns, 2026` in stone.700.

- **Music:** Signal row: `LISTENING` label, meta `GUIDED BY VOICES · MY MORNING JACKET`.

- **First day of summer / date:** Embedded in masthead tagline below hero phrase: `MON 01 JUNE 2026 · FIRST DAY OF SUMMER · FULL MOON` — IBM Plex Sans 12px, stone.400, all-caps, 0.12em tracking. Not a separate component — part of the masthead declaration zone.

- **Every noteworthy signal appears:** Golf ✓, Tigers ✓, Moon ✓, HN top ✓, Music ✓, Season ✓. Daylight hours (14.6 hrs) can appear as a signal row: `DAYLIGHT` label, `14.6 HRS · SUNRISE 04:51 / SUNSET 19:24`.

## Self-Check
1. Hero quotability: Yes — "craft itself becomes the story" is lifted from today's Awwwards signal data and stands fully alone as a declaration; a design practitioner would screenshot this line as a manifesto fragment, and the portfolio's daily-redesign conceit makes it immediately, visibly true on arrival.
2. Because-of chain: Yes — the phrase demands a catalog of craft as visible evidence → Index archetype (every row proves the claim); Index needs declarative condensed type for row names and catalog headers → bebas-plex; creative urgency at June's peak needs the only chromatic zone not yet used → vivid magenta H:305° (mandated zone); catalog density mandates ruled grid, sharp corners, zero shadow, compact rows.
3. Render feasibility: Yes — Bebas Neue at `clamp(52px, 5.8vw, 92px)` in a two-line split, left-aligned in a 28vh dark masthead at 1440×900, with "CRAFT ITSELF" (~12 chars) and "BECOMES THE STORY" (~17 chars) both fitting within 1296px available width at maximum scale.

## Rationale
The phrase "craft itself becomes the story" arrived from the Awwwards "Power of Storytelling" description in today's signals — and it earns its place as the hero because it is not merely about digital design in general, but about this specific page in particular. A portfolio that redesigns itself every morning, that treats its own construction as the demonstrandum, is a page on which craft literally IS the story. The phrase stands alone without context because any visitor who has arrived here and read it is already looking at the proof. No quote from signals.quote (Celestine Chua's inward-looking aphorism) and no signal-derived headline (Henley at -13, a Xeon that's still running) matched this self-referential precision.

The Index archetype followed directly: if the claim is that craft tells the story, the strongest counter-move to making that claim in a centered hero on a white field is to SHOW the catalog of craft — to make the page itself a directory where every row (seven projects, six signals, career timeline, capabilities) is a line item in the ongoing story. The Index is the only archetype that makes proof structural. A Poster would let the phrase rest on its own authority. An Index makes you earn that authority row by row. The bebas-plex chassis is the only viable pairing: Bebas Neue is the typeface of directories, transit schedules, and catalog headers — institutional declaration without ornament — and IBM Plex Sans is the humanist workhorse that makes the body rows readable at 11–13px density. The two together are precisely the catalog register this archetype requires.

Vivid magenta at H:305° is the only hue family the color mandate left untouched after seven consecutive palettes of ambers, greens, reds, and blues. That constraint was a gift: H:305° is the hue of neon signs in studio windows, of late-night creative pressure reaching its peak — appropriate for June 1, a full moon, and a phrase about the craft being so alive it narrates itself. The violet-tinted amethyst stone neutrals (rather than pure grey) give every catalog row a subconscious cohesion with the magenta accent: the surfaces are part of the same chromatic family as the accent, just drained of saturation, so every row of the index lives in the same world as the hero phrase firing above it.
