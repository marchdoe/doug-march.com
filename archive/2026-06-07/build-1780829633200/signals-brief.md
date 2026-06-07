# Signals Brief — 2026-06-07

## Hero Copy
What do dreams know of boundaries?

## Hero Rationale
The Earhart quote arrives today via `signals.quote` and its closing rhetorical fragment is the most confrontational thing in today's brief. "What do dreams know of boundaries?" is not a description or a welcome — it is a challenge, a dismissal of limits as a category. It earns the hero slot because it is self-referential for this portfolio (a site that tears down its own design every morning to build something new is itself the answer to the question) and because the Awwwards site-of-the-day "21 Hrs On The Moon" — the Artemis moon mission commemoration — puts the theme of humans exceeding perceived limits directly in the atmosphere. The fragment is quotable in isolation; someone would screenshot it.

## Archetype
Stack

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue:** H:358°, S:82%, L:42% — aviation crimson. The color of red biplanes, bold ambition, the particular daring required to cross an ocean alone. Completely outside the forbidden 8°–335° band. Every palette since May 31 has lived in the cool-to-warm spectrum; this is the first time the archive touches deep red. The hue earns its place on content as well as mandate.

**Neutral palette** (garnet void — crimson-tinted toward near-black):
- 50: `#FAF0F1`
- 100: `#F2E3E5`
- 200: `#E0C8CB`
- 300: `#C4A5A9`
- 400: `#9E7B80`
- 500: `#7A5659`
- 600: `#5C3538`
- 700: `#3E1C1F`
- 800: `#241012`
- 900: `#0D0507`

**Accent color:**
- Light: `#F74D6E`
- Default: `#E8193C`
- Dark: `#9E0824`
- Glow: `rgba(232, 25, 60, 0.35)`

**Secondary accent:** none. One hue. No hedging.

**Background:**
- Page bg: `#0D0507` (garnet.900 — void black with the faintest crimson pulse)
- Card bg: `#241012` (garnet.800 — surfaces elevated into visible range)
- Signals band bg: `#E8193C` (accent — full-crimson inversion band)

**Text colors:**
- Primary: `#FAF0F1` (garnet.50 — near-white, warm)
- Secondary: `#E0C8CB` (garnet.200)
- Muted: `#9E7B80` (garnet.400)
- Inverse (on crimson band): `#FAF0F1`

---

### 2. Typography (chassis-derived)

**Hero phrase rendering:** Bricolage Grotesque (chassis display token), weight 800, `clamp(56px, 6.5vw, 96px)`. Two-line break:
- Line 1: "What do dreams know"
- Line 2: "of boundaries?"

Left-aligned at `padding-left: 6vw`. The question mark is the punctuation event of the page — it should never feel rhetorical; it should feel like a provocation.

Below the phrase, attribution line: `font-size: clamp(13px, 1vw, 16px)`, weight 400, Manrope, tracking `0.12em`, all-caps, color `#E8193C` (accent): `— AMELIA EARHART, 1928`

**Line heights:**
- Hero: `0.9` (tight, no air between lines, lines press against each other like the question pressing against the answer)
- Band headings: `1.1`
- Body/project descriptions: `1.5`
- Signal strip items: `1.2`

**Letter spacings:**
- Hero phrase: `-0.03em`
- Body text: `0em`
- Small-caps labels: `0.12em`
- Signal strip eyebrows: `0.1em`

---

### 3. Layout Specification

**Archetype:** Stack — full-width horizontal bands, each a distinct moment with its own treatment. The Stack structure maps directly to the Earhart question: Band 1 is the question (limitless dark sky); Band 2 is the proof (the work done); Band 3 is the world's instruments (live signals); Band 4 is the person (capabilities, timeline). The page is the flight log.

**CSS grid/flex structure:**
```
display: flex;
flex-direction: column;
width: 100%;
max-width: none;
```
Each band: `width: 100%; box-sizing: border-box; padding: 0 6vw;`

**Major dimensions:**

- **Band 1 — Hero:** `min-height: 90vh`; bg `#0D0507`; padding `96px 6vw 80px`
  - Nav strip: `height: 64px; display: flex; justify-content: space-between; align-items: center;` fixed within band, top of Band 1
  - Hero text zone: `padding-top: 10vh` from nav, occupies rows 2–8 (conceptually)
  - Hero phrase grid zone: left-aligned, spans full available width (1440 − 2×86px = ~1268px usable). At 96px, "What do dreams know" ≈ 950px; "of boundaries?" ≈ 700px — both within bounds.
  - Attribution: `position: absolute; bottom: 80px; left: 6vw` — or in document flow below phrase with `margin-top: 48px`

- **Band 2 — Selected Work:** `min-height: 60vh`; bg `#241012`; padding `80px 6vw`
  - `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;`
  - Projects: FishSticks, 15th Club, Spaceman — three featured
  - Each cell: padding `40px 32px`, no card rounding, 1px `#3E1C1F` border between cells

- **Band 3 — Signals Strip:** `height: 220px`; bg `#E8193C` (full crimson inversion); padding `0 6vw`
  - `display: flex; align-items: center; gap: 6vw; flex-wrap: nowrap; overflow: hidden;`
  - Horizontal layout of: Golf leaders, Tigers result, moon phase, secondary quote context

- **Band 4 — Capabilities:** `min-height: 50vh`; bg `#0D0507`; padding `80px 6vw 120px`
  - `display: grid; grid-template-columns: 2fr 1fr; gap: 6vw;`
  - Left: capabilities list; Right: timeline highlights

**Nav placement:** Top bar within Band 1 (not fixed/sticky). Logo left `font-size: 14px` Manrope medium tracking-wide all-caps. Nav links right `font-size: 13px` tracking `0.1em` all-caps muted, hover in crimson.

**Hero phrase grid zone:** Band 1, below nav (row 2 of visual stack), left-aligned, full available width. Two-line block at `clamp(56px, 6.5vw, 96px)`, line-height `0.9`. Effective height at 96px: approximately 96 × 2 × 0.9 = ~173px of type block, in a 90vh (~810px) zone. Phrase occupies ~21% of the band's height — text is vast but not wall-to-wall, leaving the deep void above and below it room to breathe. That void is the sky.

---

### 4. Component Character

**Border radius:** `0` everywhere. No softness. Aviation engineering doesn't have rounded corners.

**Border treatment:** Hairline `1px solid #3E1C1F` (garnet.700) for structural dividers. No borders on nav links. Accent border `#9E0824` on hovered project cells.

**Shadow:** None. Dark surfaces need no shadow depth — the garnet void creates its own gravity.

**Density:** Band 1 spacious by design (void is the point); Band 2 medium (3-column work grid, generous padding per cell); Band 3 compact-horizontal (signal strip); Band 4 spacious.

**Interactive states:**
- Nav links: `color: #9E7B80 → #E8193C` on hover; `transition: color 0.15s ease`
- Project cells: `background: #241012 → #3E1C1F` on hover; left border `3px solid #E8193C` on hover
- Signal strip items: no hover (static display)
- Accent text links: underline on hover, color brightens to `#F74D6E`

---

### 5. Signal Integration

**Quote (IS the hero phrase):** "What do dreams know of boundaries?" renders as the full hero. Below it: `— AMELIA EARHART, 1928` in small-caps crimson `#E8193C`. The full quote context ("Is it reckless? Maybe.") appears in the signals strip Band 3 in smaller white Manrope italic.

**Signals strip placement:** Band 3, full-width crimson background. Horizontal flex row with 6vw gaps.

**Golf — Memorial Tournament (in progress):**
- Eyebrow: `MEMORIAL` in small-caps white, tracking widest
- Leaders: `GERARD −9 · POSTON −9 · BURNS −8` in Bricolage Grotesque bold, `font-size: 28px`, white, `font-variant-numeric: tabular-nums`
- Styled as a ticker/leaderboard fragment, not a list

**Tigers result (0–4 loss):**
- `DET 0 · OPP 4` in Bricolage, `font-size: 24px`, white at 60% opacity (loss dimming — the silence of 0 runs)
- Eyebrow: `TIGERS ↓` in small-caps, tracking wider

**Moon — last quarter, 46.5% illuminated:**
- Unicode: `◑` at `font-size: 32px` white
- `LAST QUARTER · 46%` below in small Manrope all-caps white muted

**Awwwards — "21 Hrs On The Moon":**
- Appears as a single-line pull in Band 3: `SOTD: 21 HRS ON THE MOON` — small-caps, white italic Manrope, tertiary position. Resonates with Earhart's boundary-crossing register.

**HN (IOCCC 2025 winners):**
- Brief single-line footnote in Band 3: `HN: OBFUSCATED C, 2025 WINNERS` — signals the builder/maker community watching

## Self-Check
1. Hero quotability: Yes — "What do dreams know of boundaries?" is a complete, confrontational rhetorical fragment that stands alone without context; it would be screenshotted.
2. Because-of chain: Yes — Earhart's limit-challenging fragment → Stack (bands as flight log, the question at the top and the evidence descending) → Bricolage-Manrope (warm variable display for a warm human declaration, not cold industrial type) → crimson H:358° (aviation daring, the only unclaimed hue, the color of the question itself).
3. Render feasibility: Yes — Bricolage at clamp(56px, 6.5vw, 96px) on a 1440×900 viewport renders both lines ("What do dreams know" / "of boundaries?") well within the 1268px available width in Band 1's 90vh zone.

## Rationale
The Earhart quote dropped today's hero phrase pre-assembled: "What do dreams know of boundaries?" is the most confrontational fragment in a brief running high on exploration energy (Artemis moon mission on Awwwards, a last-quarter moon at 46.5%, 14.7 hours of June daylight pushing hard). The question doesn't describe Doug's work — it describes the posture required to do work that redesigns its own appearance every morning on the basis of what the world is doing right now. Earhart flew oceans. The portfolio tears down its own skin daily. Same answer to the question.

The Stack archetype arrived from that phrase without negotiation. A Stack is literally a flight log: Band 1 is the sky (the question, the void, the dare); Band 2 is the record of what was built while the question was being lived (selected work); Band 3 is the instruments (live signals — golf, baseball, moon); Band 4 is the aviator (capabilities, timeline). Each band is edge-to-edge, full-width, no center void. The page is the evidence that dreams know nothing about boundaries because someone ignored them. Stack appears nowhere in the recent archive (last seven days: Split, Scroll, Poster, Specimen, Gallery Wall, Index, Broadsheet), making it the freshest structural choice available.

Bricolage Grotesque was chosen over Anton or Big Shoulders because Earhart's voice was warm, individual, and physically brave — not industrial or institutional. She wrote diaries, not factory warnings. The variable display font at weight 800 carries the phrase with muscle and humanity simultaneously. Crimson at H:358° is the first time the archive touches deep red and is the only primary hue completely outside the forbidden 8°–335° zone; it is also, without that mandate pressure, the correct color for this phrase — aviation red, the color of biplanes, of courage that is visible from a distance. The full-crimson inversion of Band 3 (the signals strip) makes the instruments feel like a cockpit warning panel: this information is important, it is bright, it demands attention briefly before you move on.
