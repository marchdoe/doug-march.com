# Signals Brief — 2026-05-22

## Hero Copy
You talk when you cease to be at peace with your thoughts.

## Hero Rationale
The Gibran quote from today's signal feed earns today's marquee precisely because it functions as an accusation, a confession, and a portfolio manifesto simultaneously. On a Friday in late May — end of week, first-quarter moon at 40.5%, 14.3 hours of daylight building toward a long weekend — it lands as the exact sensation of a week's accumulated thoughts reaching their limit. For a portfolio site that redesigns itself daily in response to environmental signals, the phrase is also self-description: this site speaks because its maker has stopped being at peace with a blank screen. The Tigers lost again (1–3) and silence was broken. The phrase is quotable in isolation, attributable without the attribution, and does not describe the site — it indicts the visitor at the same moment it indicts the maker.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

**Primary hue:** H:75°, S:88%, L:48% — acid chartreuse. H:75° falls squarely in the mandated 65°–88° window. This is not grass green or olive or citrus; it is the precise frequency of new-growth leaves in the third week of May, aggressive and unambiguous. Every recent design has lived in the 0°–65° or 162°–350° range; H:75° is the sharpest available break, and it reads as spring's most confrontational color against near-black.

**Neutral palette (warm ink family, tinted H:75°):**
- 50: `#FAFAF2`
- 100: `#F4F4E4`
- 200: `#E6E6C8`
- 300: `#CECDA8`
- 400: `#AEAD85`
- 500: `#8A8A62`
- 600: `#666646`
- 700: `#484830`
- 800: `#2E2E1C`
- 900: `#1A1A0A`
- 950: `#0E0E06`

**Accent color (chartreuse scale):**
- Light (50): `#F7FCD8`
- Default (300): `#C8E828` — hero headline ink
- Dark (500): `#8EC206` — rule lines, section borders
- Glow: none — print register, no glow effects

**Secondary accent:** None. One committed color; the broadsheet logic of a single special ink.

**Background:**
- Page bg: `#1A1A0A` (ink.900) — near-black with faint yellow-green undertone
- Card/column bg: `#2E2E1C` (ink.800) — slightly lighter for inset panels
- Sidebar/nav bg: `#0E0E06` (ink.950) — deepest surface, newspaper gutter

**Text colors:**
- Primary text: `#FAFAF2` (ink.50) — warm near-white, 17.1:1 vs ink.900
- Secondary text: `#CECDA8` (ink.300) — warm mid-tone, 11.4:1 vs ink.900
- Muted text: `#8A8A62` (ink.500) — for dates, metadata, light labels
- Hero phrase: `#C8E828` (chartreuse.300) — 13.1:1 vs ink.900 ✓

---

### 2. Typography (chassis-derived)

**Chassis:** `spectral-albert` — Spectral (transitional serif display) + Albert Sans (humanist body/label). Spectral Italic at display scale is the editorial register: a genuine newspaper headline font, not condensed impact type. Albert Sans in uppercase with wide tracking handles the label/dateline/section-header role.

**Hero phrase rendering:**
- Font: Spectral Italic, weight 600 (semibold), in chartreuse.300
- Scale: `clamp(28px, 4.5vw, 64px)` — at 1440px viewport → ~65px per line
- Line break: two lines:
  - Line 1: *You talk when you cease to be at peace*
  - Line 2: *with your thoughts.*
- The second line is shorter, creating a natural hanging emphasis on "thoughts." — no decoration, no color event. The phrase earns its weight through scale and the font itself.
- Letter spacing: `tight` (−0.02em) — Spectral at this scale wants slightly tighter tracking than default
- Line height: `0.95` (tight) — the two lines kiss slightly, pressing the thought together

**Section headers:** Albert Sans, uppercase, 11px, `widest` tracking (0.18em), ink.400 — like broadsheet column headers, small and authoritative

**Dateline:** Albert Sans, uppercase, 11px, wider tracking (0.1em), ink.500 — newspaper dateline register

**Body text:** Albert Sans Regular, 14px (minimum), ink.50, `normal` line-height (1.55)

**Labels/scores/captions:** Albert Sans Medium, 12px, ink.300, wide tracking (0.05em)

**Line heights:**
- Hero: `0.95`
- Section headers: `1.1`
- Body: `1.55`
- Loose (quotes, pull): `1.75`

**Letter spacings:**
- Hero: `−0.02em`
- Section headers (uppercase): `0.18em`
- Body: `0em`
- Labels: `0.05em`

---

### 3. Layout Specification

**Archetype: Broadsheet.** The phrase is the front-page kicker of today's edition — a personal journal printed in acid ink. The broadsheet archetype makes the declaration the masthead and the work/signals the columns below, creating the logic of a newspaper: headline first, evidence after. No other archetype can honor both the phrase's scale and the full density of signal data, projects, and timeline that constitutes the editorial content of a daily-redesigning portfolio.

**CSS grid/flex structure:**

Top-level layout (full viewport):
```
display: grid;
grid-template-rows: 56px 1px auto auto 1fr;
/* nav | rule | masthead | attribution | columns */
min-height: 100vh;
padding: 0 5vw;
max-width: none;
```

Masthead zone (hero):
```
display: block;
padding: 32px 0 16px 0;
```

Content columns:
```
display: grid;
grid-template-columns: 1.25fr 1fr 0.85fr;
column-gap: 32px;
padding: 24px 0 64px 0;
border-top: 1px solid {ink.700};
```

**Major dimensions:**
- Nav bar: `height: 56px`, full width, `max-width: none`
- Hero phrase zone: `min-height: 180px` (two lines at 65px + spacing)
- Full masthead block (date + phrase + attribution): approximately `min-height: 280px`
- Content columns: fill remaining viewport height to `min-height: 100vh`
- Max content width: `none` — Broadsheet fills full canvas
- Side padding: `5vw` both sides (72px at 1440px)
- Column gap: `32px` — newspaper gutter

**Nav placement:**
Full-width horizontal bar, `height: 56px`, `padding: 0 5vw`. Left: "DOUG MARCH" in Albert Sans medium uppercase, letter-spaced 0.1em, ink.400. Right: inline nav links (WORK · ABOUT · CONTACT) in Albert Sans 11px uppercase, ink.400, space between. Bottom: `1px solid` chartreuse.500 rule.

**Hero phrase grid zone:**
Occupies full content width (1fr column spanning all 3 macro columns). Rows 3–4 of the page grid. Spectral Italic at `clamp(28px, 4.5vw, 64px)`, set on 2 lines, in chartreuse.300. Attribution ("— Kahlil Gibran") below in Albert Sans 11px uppercase ink.500, left-aligned, `padding-top: 12px`. Then a full-width `1px solid ink.700` rule separating masthead from columns.

---

### 4. Component Character

**Border radius:** `0px` across all surfaces. This is newsprint. Nothing is rounded.

**Border treatment:** Ruled lines only — `1px solid ink.700` for column separators and section dividers; `2px solid chartreuse.500` for the nav bottom rule and section header underlines (immediately below section header text). No card outlines.

**Shadow:** None. Editorial flatness. Depth comes from surface lightness variation (ink.900 → ink.800 for any inset blocks).

**Density:** HIGH. Broadsheet demands ≥80% canvas utilization. Every column is packed: project rows use `16px` vertical rhythm, signal entries use `20px` rows, no generous white space except between major sections (the masthead-to-columns gap at `32px`).

**Interactive states:**
- Links: chartreuse.300 → chartreuse.200 on hover, `underline` appears with `text-underline-offset: 3px`
- Project rows: background transitions to ink.800 on hover, no border change
- Nav items: ink.50 on hover (from ink.400 resting)

---

### 5. Signal Integration

**Signal elements live in:** Column 3 ("TODAY" column), with the golf leaderboard and Tigers result at the top, environmental data in the middle, music/upcoming holidays at the bottom. The quote IS the hero phrase and is placed in the masthead, not in the signal column.

**Golf (CJ Cup Byron Nelson — In Progress):**
Section header: "CJ CUP BYRON NELSON" in Albert Sans 11px uppercase, ink.500, widest tracking. Leaderboard format, 3 rows visible:
```
T. MOORE      −9   ← chartreuse.300, Albert Sans medium
B. KOEPKA    −8   ← ink.50
J. SVENSSON  −8   ← ink.50
```
Score column right-aligned, tabular nums. Chartreuse.300 reserved for the sole leader — emphasis without excess.

**Tigers (1–3 loss, May 21):**
Compact inline line: "DETROIT TIGERS · L 1–3" in Albert Sans 12px, ink.400. No special treatment — a loss gets muted prose, not scarlet. Below golf, separated by a `1px ink.700` micro-rule.

**Quote display:** Gibran IS the hero phrase. It occupies the masthead at `clamp(28px, 4.5vw, 64px)` in Spectral Italic chartreuse.300. Attribution "— Kahlil Gibran" in Albert Sans 11px uppercase ink.500 below. The signal column does NOT repeat the quote.

**Environmental signals (inset in Today column, below sports):**
```
◑  FIRST QUARTER — 40.5%    ← moon phase, ink.300
☀  14.3 HOURS DAYLIGHT       ← daylight, ink.300
🎵  WET LEG · RADIOHEAD      ← music, ink.500
⚑  MEMORIAL DAY IN 3 DAYS   ← ink.400
```
All in Albert Sans 12px, `wide` tracking. The lunar phase icon carries visual weight as a soft compositional accent against the dense text columns.

**Hacker News (Project Hail Mary — score 952):**
Listed in column 3 below environmental signals as a single-line item: "HN: PROJECT HAIL MARY — STELLAR NAVIGATION CHART" in ink.400, 11px. The stellar navigation reference resonates with the first-quarter moon and the week-end sense of navigation.

## Self-Check
1. Hero quotability: Yes — "You talk when you cease to be at peace with your thoughts." is isolable, attributable without attribution, and functions as both accusation and manifesto; a visitor screenshots the line, not the page.
2. Because-of chain: Yes — the contemplative/literary register of Gibran demanded Spectral over condensed sans; Broadsheet was chosen because the phrase is a headline that needs an editorial grid of evidence beneath it; H:75° chartreuse was mandated by the color window AND earns its place as May's most aggressive growth-color printed as editorial ink on dark paper.
3. Render feasibility: Yes — Spectral Italic at `clamp(28px, 4.5vw, 64px)` on a 1440×900 viewport produces ~65px headline type; at 0.5em average character width, the 38-character first line measures ~1235px, fitting within the 1296px content column (1440 − 2×72px padding); the two-line break prevents overflow.

## Rationale
The Gibran quote arrived from today's signal feed and immediately earned its place through convergence rather than selection. It is a Friday in late May — a week ending, the first-quarter moon half-lit, 14.3 hours of daylight still building, a Tigers loss filed quietly for the third time this week, Memorial Day three days out. The phrase "You talk when you cease to be at peace with your thoughts" is the exact phenomenology of that moment: the accumulated pressure of a week's unfinished thinking breaking into speech. For a portfolio site that speaks by redesigning itself daily in response to environmental signals, the meta-dimension is unavoidable — this site exists precisely at that boundary. The phrase is quotable without attribution, accusatory without a target, and reads as portfolio philosophy: the work is the silence; this page is where the silence ended.

The Broadsheet archetype followed necessarily from the phrase. A Poster would have isolated the quote in a void — treating it as a monument rather than a declaration. A Specimen would have made the typography the entire argument. Broadsheet does something more complex: it makes the quote the headline of today's edition and the work, signals, and timeline the editorial content below. The logic is exact — the quote claims the top of the page as a masthead; the three columns of projects, timeline, and today's signals are the evidence that the claim is earned. Spectral Italic was the only chassis capable of this register: it is the font of transitional serif newspapers, of literary journals, of things printed to be believed. Condensed grotesque or Anton would have made the Gibran line feel like a motivational poster; Spectral makes it feel like a front page.

The palette is the most committed departure in recent memory. The color mandate's open window — 65°–88° — is the precise hue range of acid chartreuse, the color of new-growth leaves held up to late-May sunlight. This is not a safe green, not a sage or an olive; it is aggressive, biological, almost neon, the color that announces spring has stopped being gentle. Printed as the headline ink on near-black paper (ink.900, `#1A1A0A`), chartreuse.300 (`#C8E828`) achieves a contrast ratio of 13.1:1 and reads like a broadsheet printed in an alternate world where presses run on phosphorescent ink. The warm-tinted ink neutral family (barely tinted toward H:75°, chroma 0.01) gives the near-black its life — pure black would read as CMYK registration; this reads as the specific darkness of a May evening.
