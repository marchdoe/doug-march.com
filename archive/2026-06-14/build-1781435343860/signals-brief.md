# Signals Brief — 2026-06-14

## Hero Copy
BAN THE NOISE.

## Hero Rationale
The Hacker News #1 story today (829 upvotes) is about the Census Bureau banning noise infusion from statistical products — injected randomness forbidden in the name of precision. For a portfolio that reads raw environmental signals every morning and synthesizes them into a design, "BAN THE NOISE." is both a news headline and a statement of method. It passes the screenshot test: three words, a command, a design manifesto, a system alert. The new moon at day 29.49 (maximum darkness, zero interference from reflected light) charges the phrase further — tonight is literally the least noisy night in the lunar cycle.

## Archetype
Stack

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

**Primary hue:** H:115° (yellow-green / acid chartreuse). This is the only substantial open zone in the mandate (105°–132°). Independently correct: it is the color of terminal output, signal-strength indicators, heat maps, oscilloscope traces — precision instruments reading clean data. The command "BAN THE NOISE." demands a color that looks like a broadcast interruption, an alert state.

**Neutral palette (void family — tinted toward H:115°):**
- void.50:  `#E8F0E6`
- void.100: `#C2D3BE`
- void.200: `#96B290`
- void.300: `#6D8D67`
- void.400: `#4B6B45`
- void.500: `#334D2E`
- void.600: `#21341E`
- void.700: `#142015`
- void.800: `#0D1509`
- void.900: `#060C04`

**Accent color (acid):**
- Light:   `#A5DA87`
- Default: `#7FE521`
- Dark:    `#429710`
- Glow:    `#6DD619`

**No secondary accent.** One hue family, absolute commitment.

**Background:**
- Page bg:    `#060C04` (void.900)
- Hero band:  `#7FE521` (acid.500) — the first band inverts; everything else is the void
- Card bg:    `#0D1509` (void.800)
- Signal strip: `#0D1509` (void.800)

**Text colors:**
- Primary text (on dark): `#E8F0E6` (void.50) — contrast vs. void.900 ≈ 17:1 ✓
- Secondary text: `#96B290` (void.200) — contrast vs. void.900 ≈ 7.3:1 ✓
- Muted text: `#6D8D67` (void.300) — contrast vs. void.900 ≈ 5.5:1 ✓
- Hero band text (on acid green): `#060C04` (void.900) — contrast vs. acid.500 ≈ 12.8:1 ✓

---

### 2. Typography

**Hero phrase rendering:** Anton via `display` token. Scale: `clamp(72px, 12vw, 172px)`. At 1440px viewport = 172px. "BAN THE NOISE." is 14 characters; in Anton (condensed) at 172px, approximate rendered width ≈ 1100px — fits within the 1440 − 2×86px (6vw) = 1268px content band. Color: `#060C04` (void.900) on acid green. Single line, no break. The command does not wrap. Below the phrase: Inter Tight 11px, `letter-spacing: 0.18em`, all-caps, same void.900 color, `margin-top: 40px` — the source attribution: "HACKER NEWS · JUNE 14 · 829 PTS".

**Line heights:**
- Hero (Anton display): `0.9` — condensed display at this weight wants negative leading
- Section headings: `1.0`
- Body / signal cells: `1.5`
- About copy: `1.65` (light text on dark, compensated)

**Letter spacings:**
- Hero phrase: `-0.03em` — Anton optically tight at large scale
- All-caps labels / eyebrows: `0.18em` — standard ALL-CAPS separation
- Body text: `0.01em` — slight open for light-on-dark legibility
- Signal values: `0em`

---

### 3. Layout Specification

**Archetype:** Stack — five full-width horizontal bands spanning edge to edge, each a distinct visual world. The first band is the incendiary command (full acid green, 100vh). Each successive band is evidence that the command has been executed: signals catalogued, work filed, capabilities stated, context marked. The layout is structured like a broadcast: the alert, then the data.

**CSS grid/flex structure:**
```
/* Page container */
display: flex; flex-direction: column; min-height: 100vh;

/* Band 1 — Hero */
display: grid; place-items: center;
min-height: 100vh; background: #7FE521; padding: 96px 6vw;

/* Band 2 — Signal Strip */
display: grid; grid-template-columns: repeat(6, 1fr);
align-items: center; height: 108px; padding: 0 6vw;
background: #0D1509;
border-top: 1px solid #21341E; border-bottom: 1px solid #21341E;

/* Band 3 — Selected Work */
display: block; background: #060C04; padding: 96px 6vw;
/* Inner grid */
display: grid; grid-template-columns: 1fr 1fr; gap: 2px;

/* Band 4 — About / Capabilities */
display: grid; grid-template-columns: 55fr 45fr;
min-height: 50vh; background: #0D1509;

/* Band 5 — Footer */
height: 80px; display: flex; align-items: center;
justify-content: space-between; padding: 0 6vw;
background: #060C04; border-top: 1px solid #21341E;
```

**Major dimensions:**
- Hero band: `min-height: 100vh`
- Signal strip: `height: 108px` fixed
- Max content width: `none` — full canvas; side padding `6vw` throughout
- Work band padding: `96px 6vw`
- About band padding: `80px 6vw` (each column)
- Card gap in work grid: `2px` (ultra-tight seams, hard grid character)

**Nav placement:** Fixed top bar, `height: 56px`, `background: rgba(13, 21, 9, 0.92)`, `backdrop-filter: blur(8px)`, `border-bottom: 1px solid #21341E`. Sits above Band 1 (acid green). Left: "DM" monogram in `#7FE521` Inter Tight semibold 14px. Right: nav links ("work", "about", "contact") in `#96B290` Inter Tight 11px `letter-spacing: 0.14em`. When scrolled over the acid hero band, the nav's dark glass creates a natural threshold between zones.

**Hero phrase grid zone:** Band 1 center — both axes. Phrase occupies approximately `1100px × 155px` (at 1440px viewport). Centered in the full 100vh acid green field. Beneath it, `margin-top: 40px`, a single attribution eyebrow. The phrase has no surrounding decoration — the green field is the frame.

---

### 4. Component Character

**Border radius:** `none` (0px) for cards, signal cells, work items. The command "BAN THE NOISE." is a hard-edge statement — zero softening in the components that surround it. Tags/badges: `sm` (2px) only.

**Border treatment:** Borderless on most surfaces; thin 1px `#21341E` (void.600) seam between signal cells and as horizontal band dividers. Work cards: `border-top: 1px solid #21341E` at rest; on hover, `border-top: 1px solid #7FE521` (acid pulse).

**Shadow:** None. Flat, signal-clean. Shadows imply depth and warmth; this palette is about elimination.

**Density:** Signal strip is compact (108px, 6 cells). Work grid is medium-density (project cards with title, year, tag). About band is open and breathable.

**Interactive states:**
- Work card hover: `border-top: 1px solid #7FE521`, `background: #142015` (void.700), title color lifts to `#7FE521`
- Nav links hover: color lifts to `#E8F0E6` (void.50)
- All transitions: `transition: all 120ms ease-out` — fast, no drama

---

### 5. Signal Integration

**Hero phrase source:** "BAN THE NOISE." is directly derived from HN #1 (829 upvotes, June 14): Census Bureau banning noise infusion from statistical products. Attribution rendered as a small all-caps eyebrow 40px below the phrase on the acid green band.

**Signal strip (Band 2):** Six cells spanning the full width at 108px. Each cell: a 10px Inter Tight label in `#6D8D67` (muted) / a 17px Inter Tight value in `#E8F0E6`. Left to right:
1. `NEW MOON` / `CYCLE 29 ●` — lunar phase, day 29.49 end-of-cycle marker
2. `DAYLIGHT` / `14.7 HRS` — summer solstice approaching
3. `RBC OPEN` / `SUBER −13` — golf leader, tournament in progress
4. `TIGERS` / `L 1–3` — yesterday's loss, minimal treatment
5. `MUSIC` / `RADIOHEAD · GBV` — split into two tiny lines, Inter Tight 11px
6. `JUNETEENTH` / `5 DAYS` — upcoming holiday in acid.300 (`#A5DA87`)

**Quote display:** Alfred Adler's quote ("Do not be afraid of making mistakes, for there is no other way of learning how to live!") appears in Band 4 (About zone, right column) as a pull quote: Inter Tight italic 18px, color `#A5DA87` (acid.200), `line-height: 1.6`, preceded by a 1px `#7FE521` left-rule at 2px wide. No quotation marks — just the rule and the text. Attribution: "— Alfred Adler" in void.300.

**New moon:** Receives dedicated treatment in signal strip Cell 1. "CYCLE 29 ●" with a `●` rendered in void.400 (near-invisible in dark) rather than acid — emphasizing the darkness. The moon is not lit tonight.

**Father's Day / Juneteenth:** Both in the footer Band 5 — right-aligned small text: "JUNETEENTH IN 5 · FATHER'S DAY IN 7" in void.300, 10px Inter Tight, letter-spacing: 0.15em.

## Self-Check
1. Hero quotability: Yes — "BAN THE NOISE." is a three-word command that functions as protest slogan, design manifesto, and system directive; it works completely isolated from the portfolio context.
2. Because-of chain: Yes — the command phrase demands Stack (bands of structured evidence beneath the alert), Anton (the condensed-heavy display that can fill a full-width band with authority), acid green (terminal/signal color at H:115°, the only open mandate zone), and a flat hard-edged layout (no softening on a page about elimination).
3. Render feasibility: Yes — Anton at clamp(72px, 12vw, 172px) renders "BAN THE NOISE." (14 chars × ≈0.50em × 172px ≈ 1204px) within the 6vw-padded 1268px content zone on a 1440×900 viewport without overflow.

## Rationale
The hero phrase arrived from a collision between the day's top Hacker News story and the portfolio's own operating logic. The Census Bureau banning noise injection from statistical products is, on one level, a data-integrity story. On another, it's a three-word command — BAN THE NOISE — that perfectly describes what this portfolio does every morning: reads environmental signals, filters interference, synthesizes the clean data into a design. A site that processes raw YAML into compositional decisions is executing the same mandate. The new moon at day 29.49 of its cycle (zero illumination, maximum darkness, minimum interference from reflected light) charges the phrase with temporal weight: tonight is literally the least noisy night of the entire lunar month.

The Stack archetype is the logical home for this command. A Poster puts a phrase on a pedestal and leaves it alone. A Stack lets the command BE the first band, then builds the argument beneath it — band by band, the evidence accumulates. Signal strip (what data remains after noise is banned), work catalog (what gets built in the silence), capabilities (what the practitioner knows), footer (when and where). The layout enacts the phrase's logic: first the alert, then the signal. Anton via `anton-inter-tight` is the only chassis appropriate for a command at this register — its condensed heavy weight fills the full-width first band at 172px without shouting, simply stating. It is typeface-as-declaration, not typeface-as-style.

The palette inverts the last seven days of archival darkness. Recent builds ran on near-black backgrounds with colored accent type. Today, the hero band is the full acid green (#7FE521) — the color of terminal output, clear radio signal, heat-map precision, a warning label from a machine that has identified noise and removed it. Placing the near-black command text on this field rather than the reverse produces a design that looks like a system alert has replaced the portfolio, which is exactly the energy "BAN THE NOISE." deserves on a maximum-risk day. Everything after Band 1 drops to the void: dark, controlled, catalogued. The contrast tells the story: the noise is here (green field, undeniable), and here is what's left (void, signal, work).
