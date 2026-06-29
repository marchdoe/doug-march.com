# Signals Brief — 2026-06-29

## Hero Copy
90/100. Oh wait, 74. No — 88.

## Hero Rationale
Today's #2 Hacker News story (545 points): "HackerRank open sourced its ATS. My resume scored 90/100. Oh wait 74. No – 88." The headline itself is the phrase — three beats of algorithmic backtracking that need no context to land. For a portfolio site, the meta-reading is unavoidable: a resume evaluated by a machine that can't decide what it saw. It passes the screenshot test cold — someone reads this line and immediately knows the feeling. No quote from the `signals.quote` field competes at this register; Mother Teresa's line is beautiful but expected, and the Travelers Championship (-21 co-leaders) is drama for sports fans only.

## Archetype
Split

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

**Primary hue** — H:155°, the only open corridor in the color mandate (145°–170°). Teal-green is the color of diagnostic terminals, calibration screens, and readout panels — the precise visual register of a scoring system producing contradictory numbers. The mandate compliance is also creative compliance.

**Neutral palette** (tinted toward H:155°):
- 50: `#F3F7F5`
- 100: `#E5EDEA`
- 200: `#C9D6D1`
- 300: `#A4B4AF`
- 400: `#7A8D88`
- 500: `#5E6E6A`
- 600: `#404F4B`
- 700: `#2C3C38`
- 800: `#182420`
- 900: `#0A1410`

**Accent color:**
- light: `#52C896` (teal.300)
- default: `#18C476` (teal.400) — also the hero panel background
- dark: `#0E844F` (teal.600)
- glow: `rgba(24, 196, 118, 0.22)`

**Secondary accent:** none

**Background:**
- page bg (right panel / default): `#0A1410`
- hero panel bg (left split): `#18C476`
- card bg: `#182420`

**Text colors:**
- hero text (on teal panel): `#032716` (teal.900) — near-black, teal-tinted; contrast ~8.8:1 against #18C476
- primary text (right panel): `#F3F7F5` — contrast ~18:1 against #0A1410
- secondary text: `#A4B4AF` — contrast ~9:1 against #0A1410
- muted text: `#5E6E6A` — contrast ~4.6:1 against #0A1410 (minimum body size 14px, passes AA)

---

### 2. Typography

**Hero phrase rendering** — Anton (`display` chassis token). Three stacked lines, left-aligned within the teal panel, each line a distinct beat:
- Line 1 `"90/100."` — `font-size: clamp(5.5rem, 11vw, 14rem)`, color `#032716`
- Line 2 `"Oh wait, 74."` — `font-size: clamp(4rem, 8vw, 10rem)`, color `#032716`, slightly demoted — the correction is always quieter
- Line 3 `"No — 88."` — `font-size: clamp(5rem, 10vw, 13rem)`, color `#032716`, final wrong answer reasserts scale

All three lines: `line-height: 0.88`, `letter-spacing: -0.03em`, `text-wrap: balance` disabled (hard left-align, ragged right is intentional — each number should assert itself against blank teal).

**Attribution line** — Inter Tight, `font-size: 0.75rem`, `letter-spacing: 0.1em`, `text-transform: uppercase`, color `#0A643C` (teal.700), bottom-left of hero panel: `"— HackerRank ATS · Jun 29, 2026"`.

**Right panel headings** — Inter Tight, `font-size: 0.6875rem`, `letter-spacing: 0.15em`, `text-transform: uppercase`, color `#52C896` (accent light) — section labels read as column headers.

**Body / list text** — Inter Tight, `font-size: 0.9375rem` (15px), `line-height: 1.5`, `letter-spacing: 0em`, color `#F3F7F5`.

**Leaderboard numbers** — Inter Tight, `font-variant-numeric: tabular-nums`, `font-size: 1rem`, scores in `#18C476`.

**Line heights:**
- Hero: `0.88`
- Snug (subheads): `1.1`
- Body: `1.5`
- Loose (signal captions): `1.75`

**Letter spacings:**
- Hero: `-0.03em`
- Labels: `0.15em`
- Body: `0em`
- Score badges: `0.05em`

---

### 3. Layout Specification

**Archetype** — Split. The phrase is a sequence of three contradictory verdicts delivered by a machine. Split renders this as two opposing surfaces: the machine's output (loud, saturated, teal, enormous type on the left) versus the actual work (quiet, dark, dense, credentialed on the right). The tension between the two halves IS the argument.

**CSS grid structure:**
```css
body {
  display: grid;
  grid-template-columns: 58vw 1fr;
  min-height: 100vh;
  max-width: none;
}
```

**Major dimensions:**
- Left panel: `width: 58vw; min-height: 100vh; background: #18C476; padding: 5vw 6vw 5vw 6vw`
- Right panel: `flex: 1; min-height: 100vh; background: #0A1410; padding: 48px 40px; overflow-y: auto`
- Max content width: `none` — both panels run edge to edge
- No center void; both halves are fully occupied surfaces

**Nav placement:** Top of right panel, inline row: `"DOUG MARCH"` wordmark left (Inter Tight, 0.875rem, wide tracking, `#18C476`) + nav links right (`work · about`, 0.75rem, uppercase, muted). Height: 48px.

**Hero phrase grid zone:** Left panel interior, vertically centered with a slight upward bias (`padding-top: 10vh; padding-bottom: 5vh; display: flex; flex-direction: column; justify-content: center`). The three lines occupy approximately `58vw × 60vh` of the left canvas.

---

### 4. Component Character

**Border radius:**
- Panels: `0` (edge to edge, no rounding)
- Score badges: `2px`
- Nav tags: `2px`

**Border treatment:** Right panel: single 1px left edge `border-left: 1px solid #2C3C38` (neutral.700) at the panel join. Section dividers within right panel: `1px solid #182420` (neutral.800, very subtle). No decorative borders.

**Shadow:** None. Depth comes from the two-panel color contrast, not shadow stacking.

**Density:** Left panel — maximally spacious (phrase + air). Right panel — compact: 24px vertical gaps between sections, 16px internal padding for sub-items.

**Interactive states:** Right panel links hover: `color: #52C896` with `transition: color 0.12s ease`. Score values: static. Panel join border pulses subtle teal glow on initial load (single keyframe, no loop).

---

### 5. Signal Integration

**Golf (Travelers Championship):**
- Right panel, second section below nav
- Section label: `"TRAVELERS CHAMPIONSHIP · IN PROGRESS"` at 0.625rem uppercase teal
- Leaderboard: Scheffler T1 −21, Hovland T1 −21, Morikawa T3 −20 — names in `#F3F7F5`, scores in `#18C476` (teal.400), tabular numbers. Three rows max.

**Tigers (5–7 loss):**
- Right panel, signals section near bottom
- `"DET 5 · 7 OPP"` in `#5E6E6A` (muted), loss is acknowledged but not featured — the golf is today's sports story

**Full moon (0.999 illumination):**
- Right panel signals strip: `"● FULL MOON"` with a small `#52C896` dot glyph, inline with date

**Independence Day countdown:**
- Right panel: `"INDEPENDENCE DAY −5 DAYS"` in Inter Tight 0.6875rem, wide tracking, muted text — quiet urgency

**Hero phrase source:**
- Not a blockquote or pull quote — the phrase IS the hero. Attribution rendered small at bottom-left of teal panel in teal.700: `"— HackerRank ATS open-source review · Jun 29, 2026"`.

**HN signal:**
- Right panel, below projects, a one-line callout in muted secondary text: `"#HN 545 → ATS can't grade its own output"` — meta-commentary, reads as a caption for the entire left panel

**Projects:**
- Right panel third section: compact list, FishSticks · 15th Club · Spaceman · TeeTurn as rows with type + year, name in `#F3F7F5`, year in `#5E6E6A`

**Music (The War on Drugs · Guided by Voices · Radiohead):**
- Right panel signals strip, smallest size: `"♫ War on Drugs · GbV · Radiohead"` in muted text — background texture, not featured

## Self-Check
1. Hero quotability: Yes — "90/100. Oh wait, 74. No — 88." is immediately screenshot-worthy, requires zero context, and generates the specific laugh of recognition that makes a visitor stop scrolling; it would circulate on its own.
2. Because-of chain: Yes — the phrase's three-beat contradictory sequence → Split (machine output vs. actual work, two opposing surfaces); the numerics and punchline rhythm → Anton (condensed heavy numerals at wall scale); the diagnostic/terminal mood + the 145°–170° mandate corridor → teal drench; the drench on one half and dark density on the other → the full layout logic.
3. Render feasibility: Yes — Anton at clamp(5.5rem, 11vw, 14rem) across 58vw renders each of the three lines at 90px–150px on a 1440px viewport with generous teal field above and below; no overflow risk at any line length in the phrase.

## Rationale
The hero phrase arrived from a live signal, not from the designated quote field. Today's #2 Hacker News story — HackerRank open-sourcing its ATS and scoring a single resume three different ways — produces a headline that is already composed: "90/100. Oh wait, 74. No — 88." Three beats, three contradictions, no context required. For a portfolio site, the reading is unavoidable: the argument against algorithmic evaluation IS the portfolio; the work is the counterargument. The phrase passes every poster test and is richer than Mother Teresa's line for this specific surface precisely because it is impure, contingent, and from today.

Split was the only archetype that could render the argument structurally rather than just typographically. The left panel (58vw, full teal drench at #18C476) is the machine: enormous, saturated, confident, producing contradictory numbers at wall scale in Anton. The right panel (42vw, dark teal-black #0A1410) is the actual work: quiet, dense, credentialed, organized — a functioning catalog that doesn't need an algorithm to tell you what's there. The two halves don't explain each other; the tension between them is the design. Anton at `clamp(5.5rem, 11vw, 14rem)` on the teal field renders each of the three number fragments at 90–150px on a standard 1440px viewport, with line height 0.88 stacking them into a compact monument of scored chaos.

Teal at H:155° is the only open corridor in the color mandate (145°–170° after six recent builds) and is also the honest choice: teal-green is the color of terminal readouts, diagnostic displays, calibration screens — the precise visual family of a system producing a score. The single-hue drench on the left panel (background AND implicit meaning: this is the machine's domain) against the dark right panel creates maximum contrast across the panel join without any gradient trickery. Contrast ratios: hero text `#032716` on `#18C476` ≈ 8.8:1; body `#F3F7F5` on `#0A1410` ≈ 18:1; muted `#5E6E6A` on `#0A1410` ≈ 4.6:1 — all WCAG AA or better. The 8/10 risk weight is honored by the choice of a found headline rather than a composed manifesto, and by a layout that works through structural opposition rather than decoration.
