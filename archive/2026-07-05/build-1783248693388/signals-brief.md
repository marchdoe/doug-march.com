# Signals Brief — 2026-07-05

## Hero Copy
If you're a button, you have one job.

## Hero Rationale
The phrase arrives from Hacker News at 236 points — a UX article about purpose and constraint — and earns its scale not as a design tip but as a philosophy. For a portfolio site, "you have one job" is simultaneously directive, self-descriptive, and categorical. On a Sunday-after-the-4th, when the noise settles and clarity reasserts itself, the line works as a declaration of function over flourish. Bebas Neue will uppercase it into a wall, and the layout will enact it: the left panel IS the button — one job, one phrase, nothing else.

## Archetype
Split

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:238° (electric indigo) — the only open corridor in the color mandate (230°–255°), and exactly the color of a CRT phosphor at full brightness. Commits to the "electric" quality the phrase demands.
- **Neutral palette (hex):**
  - 50: `#F3F4FA`
  - 100: `#E6E8F5`
  - 200: `#CDD1EA`
  - 300: `#ACB0D0`
  - 400: `#7D82B0`
  - 500: `#555A88`
  - 600: `#393D66`
  - 700: `#252844`
  - 800: `#181A30`
  - 900: `#0C0D1A`
- **Accent:** light `#9BA5FF` / default `#4F5FFF` / dark `#3344EE` / glow `0 0 24px rgba(79,95,255,0.4)`
- **Secondary accent:** none — one job, one accent
- **Background:** page bg `#0C0D1A` (right panel / beneath), hero panel bg `#4F5FFF` (left panel), card bg `#181A30`
- **Text colors:** primary `#FFFFFF`, secondary `#ACB0D0`, muted `#7D82B0`; hero phrase on indigo panel: `#FFFFFF` (contrast 4.78:1 vs #4F5FFF — qualifies as large text ✓)

### 2. Typography (chassis-derived)

- **Hero phrase rendering:** `display` token (Bebas Neue), `clamp(2.5rem, 5vw, 6.5rem)` — renders at ~72px on 1440px. Uppercase by nature of Bebas Neue: "IF YOU'RE A BUTTON, YOU HAVE ONE JOB." Wraps naturally across 4 lines in the left panel's ~720px usable width. Left-aligned, upper-third anchor. White (#FFFFFF) on electric indigo.
- **Hero line height:** `0.9` — stacked tight, the four lines read as a block
- **Hero letter spacing:** `0` (Bebas handles its own condensed spacing internally; tracking would open the lines and reduce the condensed signage quality)
- **Body (right panel):** IBM Plex Sans, `0.9375rem` (15px), `line-height: 1.6`, `letter-spacing: 0`
- **Labels/eyebrows:** IBM Plex Sans, `0.6875rem` (11px), uppercase, `letter-spacing: 0.12em`
- **Signal scores/numbers:** IBM Plex Sans tabular `font-variant-numeric: tabular-nums`, `font-weight: 700`, accent color

### 3. Layout Specification

- **Archetype — Split:** The left panel IS the button: one surface, one phrase, zero other content except a hairline source attribution at bottom-left. The right panel is everything else: dense, scrollable, signal-rich. The asymmetry (62/38) gives the phrase three-fifths of the canvas and makes the constraint literal.
- **CSS grid structure:** `display: grid; grid-template-columns: 62fr 38fr; min-height: 100vh; max-width: none;`
- **Left panel:** `width: 62vw; min-height: 100vh; background: #4F5FFF; padding: 96px 6vw 64px; display: flex; flex-direction: column; justify-content: center;`
- **Right panel:** `width: 38vw; min-height: 100vh; background: #0C0D1A; overflow-y: auto; padding: 48px 5vw;`
- **Max content width:** `none` — both panels bleed edge-to-edge, divider is the grid column seam only
- **Hero phrase grid zone:** Left panel, vertically centered between 25%–75% of panel height. The phrase block (~4 lines × ~58px × 0.9 lh = ~210px) sits visually in the upper-center of the panel, slightly above true center for optical weight.
- **Nav placement:** Top of the right panel — inline horizontal links (Work · About) in IBM Plex Sans 0.75rem uppercase with 0.1em tracking, neutral.400 color. No separate nav bar on left panel.
- **Right panel sections (top to bottom):** Nav → Date stamp → Projects list (tight, labeled "SELECTED WORK") → Signal blocks (Golf leaderboard, Tigers result, Music) → Capabilities excerpt → Footer
- **Section padding:** `margin-bottom: 48px` between signal sections on the right panel
- **Attribution (left panel, bottom-left):** IBM Plex Sans 0.6875rem, `#FFFFFF` at 60% opacity — "Hacker News, July 5 · 236 points" — contrast still above 3:1 for decorative/non-essential text; treat as ornamental

### 4. Component Character

- **Border radius:** `none` (0) for all structural elements — the phrase demands flatness; rounded corners would soften the declarative register
- **Border treatment:** Right panel uses `1px solid #252844` (neutral.700) as horizontal rule between signal sections. Left panel has zero borders.
- **Shadow:** `none` on cards. Accent glow `0 0 24px rgba(79,95,255,0.35)` on hover for project links in the right panel only.
- **Density:** Left = maximum sparsity (phrase + attribution). Right = maximum density (tight line-height 1.4, compact section headings at 11px).
- **Interactive states:** Project links hover → text becomes `#9BA5FF` (primary.300) with glow. Nav links hover → `#FFFFFF`. Right panel bg items have no card bg by default; hover surfaces `#181A30` subtly.

### 5. Signal Integration

- **Golf — John Deere Classic:** Right panel signal block. Label: "JOHN DEERE CLASSIC" in 11px uppercase neutral.400. Then a tight two-column table: rank, name, score — tabular nums, 13px, neutral.200. Leaders: Lee Hodges −16 and Lucas Glover −16 (tied) highlighted in primary.300. Three additional leaders at neutral.400.
- **Tigers 3-0 W (July 4th):** Right panel, compact badge treatment. "⚾ DET 3 — 0 W" in IBM Plex Sans 700, primary.300. Caption: "Yesterday · Independence Day" in 11px neutral.400.
- **Music (Wet Leg / Tobin Sprout / Radiohead):** Right panel, "LISTENING" label, three artist names in italic IBM Plex Sans 400 neutral.200, comma-separated on one line.
- **Quote (hero phrase IS the signal):** The HN article "If you're a button, you have one job." is THE hero phrase — left panel marquee treatment at full Bebas Neue display scale. Attribution below it is the signal integration.
- **Date/context:** Right panel top — "Sunday, July 5, 2026" in 11px uppercase neutral.400 with `letter-spacing: 0.12em`, directly above nav links.

## Self-Check
1. Hero quotability: Yes — "If you're a button, you have one job." is a complete, portable declaration — quotable independent of any context, reads as design philosophy, product belief, and existential directive simultaneously.
2. Because-of chain: Yes — the phrase's declarative constraint logic demanded Split (left panel = the button, one job; right panel = everything else), which demanded bebas-plex (tagged for Split, declarative/condensed moods), which demanded electric indigo (one committed color, no hedging, enacts "one job" in palette).
3. Render feasibility: Yes — Bebas Neue at clamp(2.5rem, 5vw, 6.5rem) on a 62vw panel (~892px on 1440) with 6vw side padding (~720px usable) renders 4 natural lines without overflow; confirmed via character-count estimation, Split chassis tagged for bebas-plex.

## Rationale
The phrase arrives from HN's second-highest story of the day — a UX article with 236 points titled "If you're a button, you have one job." — and it is already a design manifesto in nine words. No compression needed. The period is forensic. Bebas Neue will uppercase every letter, giving it the quality of a warning label or a specification, which is exactly the register. For a portfolio site that rebuilds itself every morning to communicate a single day's proposition, the phrase is also a self-portrait: this page has one job.

The Split archetype follows because the phrase IS an architecture, not just a statement. The left panel (62% of canvas) becomes the button: solid electric indigo (#4F5FFF), the phrase in white Bebas Neue at clamp(2.5rem, 5vw, 6.5rem), nothing else but a hairline attribution at the base. The right panel (38%) is everything the button is not: date, navigation, projects, golf leaders at −16, the Tigers' Independence Day shutout, Radiohead and Wet Leg and Tobin Sprout. The asymmetry enacts the argument. bebas-plex is the only chassis in the catalog explicitly tagged for Split with a declarative/editorial mood; its Bebas Neue display face is maximal condensed authority without the athletic bluster of Big Shoulders or the blunt weight of Anton.

Electric indigo at H:238° is the sole open corridor in the color mandate (230°–255°), and it is also exactly the right answer: it is the hue of a phosphor screen running at full brightness, of a circuit board under UV, of a CRT in a dark room. "One job" executed in this color feels urgent without alarm. White text on #4F5FFF achieves 4.78:1 contrast, meeting WCAG AA for all text sizes the hero phrase can render at. The right panel's near-void #0C0D1A creates maximum contrast between the two halves, making the seam between button and context feel like a power switch.
