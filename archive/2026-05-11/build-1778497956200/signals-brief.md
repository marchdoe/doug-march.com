# Signals Brief — 2026-05-11

## Hero Copy
I'm going back to writing code by hand.

## Hero Rationale
Hacker News surfaces "I'm going back to writing code by hand" at 414 points today — a developer's personal manifesto pushing back against AI-assisted everything. On a portfolio site that rebuilds itself daily via AI, the irony is load-bearing: the declaration is both genuine critique and self-aware comedy. The phrase earns its scale because you can hold it from three angles simultaneously (craft ethic, anti-AI provocation, ironic self-description) and it stays coherent at each reading. For a portfolio where design is the product, this is a statement about intentionality — and "by hand." as the landing fragment is an editorial punch.

## Archetype
Stack

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:163° (aqua teal). Sits precisely in the 158°–170° mandate window, the only open zone after 7 days of palette avoidance. At full saturation on near-black, it reads as electric-craft: technical but warm, spring but purposeful.
- **Neutral palette** — blue-slate family tinted toward H:200°:
  - 50: `#EEF3F5`
  - 100: `#D8E4E9`
  - 200: `#B3C9D1`
  - 300: `#8AADB9`
  - 400: `#628F9F`
  - 500: `#437282`
  - 600: `#2E5666`
  - 700: `#1E3D4E`
  - 800: `#122837`
  - 900: `#0B1C24`
- **Accent color** — primary.300: `#3EC9B8` (light), `#15B39F` (default), `#0A9687` (dark); glow: `rgba(62,201,184,0.25)`. Contrast vs. bg: ~8.7:1 ✓
- **Secondary accent** — none. One accent carries the page.
- **Background** — page bg: `#0B1C24`; card bg: `#122837`; mid-band bg: `#1E3D4E`
- **Text colors** — primary: `#EEF3F5` (~17.5:1 on bg ✓); secondary: `#B3C9D1`; muted: `#628F9F`

### 2. Typography

- **Hero phrase rendering** — `display` chassis token, `clamp(52px, 7.8vw, 118px)`. Three stacked lines, left-aligned at 6vw from left edge, filling ~85% canvas width:
  ```
  I'm going back
  to writing code
  by hand.
  ```
  Lines 1–2 in `#D8E4E9` (neutral.100, warm near-white). "by hand." in vivid teal `#3EC9B8` — the phrase earns its color at the landing. Bricolage Grotesque's variable weight pulls toward 700 at this size.
- **Eyebrow above phrase** — `body` chassis token at 11px, `letter-spacing: 0.10em`, ALL CAPS, in neutral.400: `↑ HACKER NEWS · 414 PTS · MAY 11`
- **Signal strip type** — `sm` chassis token at 13px, tabular-nums for scores, neutral.200
- **Work band headings** — `lg` chassis token at `clamp(18px, 2vw, 28px)`, neutral.50
- **Body / captions** — `base` chassis token at 16px, neutral.200, line-height 1.5
- **Line heights** — hero: 0.92 (tight stacked mass); subheads: 1.15; body: 1.5
- **Letter spacings** — hero: `-0.025em`; body: `0em`; caps/labels: `0.10em`

### 3. Layout Specification

- **Archetype** — Stack. The manifesto phrase is a single declarative moment; the Stack's full-width bands give it an undivided first band at near-full viewport height, then let subsequent bands each carry a distinct mood without competing — the evidence beneath the declaration.
- **CSS grid/flex structure** — `display: flex; flex-direction: column; width: 100vw; overflow-x: hidden`. Each band: `width: 100%; padding: 0 6vw`.
- **Major dimensions**:
  - Nav strip (Band 0): `height: 52px`; `display: flex; align-items: center; justify-content: space-between; padding: 0 6vw`; bg: transparent overlaid on hero band
  - Hero band (Band 1): `min-height: 88vh`; bg: `#0B1C24`; phrase aligned to `padding-bottom: 10vh` (bottom-weighted)
  - Signal strip (Band 2): `height: 112px`; bg: `#122837`; `display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center`
  - Work band (Band 3): `min-height: 60vh`; bg: `#1E3D4E`; `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px`
  - Capabilities band (Band 4): `min-height: 40vh`; bg: `#0B1C24`; two-column list
  - `max-width: none` throughout; `padding: 0 6vw` for breathing room
- **Nav placement** — overlaid top of hero band: "doug march" wordmark left in Manrope medium 14px neutral.300; nav links right: work · about · contact in neutral.400, hover → accent teal, `letter-spacing: 0.06em`
- **Hero phrase grid zone** — Band 1, full width, phrase block anchored to `bottom: 10vh; left: 6vw`. The three lines cascade left at display scale. Eyebrow sits 20px above the first hero line.

### 4. Component Character

- **Border radius** — cards: `none` (0px — the craft ethos is sharp-edged); buttons: `none`; tags: `2px`
- **Border treatment** — project cards in work band separated by 1px gaps in the grid (background showing through the gap acts as the border — no box borders). Signal strip divided by 1px vertical `#1E3D4E` lines.
- **Shadow** — none. Depth comes entirely from band background layering and color temperature shifts.
- **Density** — spacious in hero band; compact and tabular in signal strip; medium in work band
- **Interactive states** — cards: `background` transitions to `#1E3D4E` on hover (200ms ease); project titles shift to `#3EC9B8`; nav links: opacity 1 → 0.7 on hover with accent color crossfade; cursor: pointer

### 5. Signal Integration

- **Tigers WIN 6–3** — Signal strip, left cell. "DET 6 · 3 OPP" in `#3EC9B8` (accent teal), weight bold, font-variant-numeric tabular-nums. Label above: "TIGERS" in neutral.400 caps 11px letter-spaced.
- **Golf — Truist FINAL** — Signal strip, center cell. "REITAN −15" in neutral.100, "Fowler / Højgaard −13" in neutral.400 at 12px. Label: "TRUIST FINAL" in neutral.500 caps.
- **HN source attribution** — Eyebrow directly above the hero phrase: `↑ HACKER NEWS · 414 PTS · MAY 11` in neutral.400 at 11px all-caps. The quote IS the attribution — the hero phrase is contextualized but not diminished.
- **Lunar / date** — Signal strip, right cell. "☽ waning crescent 21%" in neutral.400 at 12px. Below: "MONDAY · DAY 131 · 14H LIGHT" in neutral.500 at 11px.
- **Music** — Thin footer row below capabilities band: "♫ Wet Leg · The War on Drugs · Tobin Sprout" in neutral.500 at 12px, centered.
- **Awwwards / Kesey Signal** — Mentioned as a sub-item in capabilities or context band: "SITE OF THE DAY: The Kesey Signal — 1999 cyber-noir terminal archive" in neutral.500 italic, 12px. The terminal-noir aesthetic is atmospheric background for the "writing code by hand" ethos.

## Self-Check
1. Hero quotability: Yes — "I'm going back to writing code by hand" is a 414-point Hacker News headline that's a standalone manifesto; screenshot-worthy, provocative for a dev portfolio, and richly ironic on a site that redesigns itself daily via AI.
2. Because-of chain: Yes — the craft/handmade ethos of the phrase dictated Stack (bands of evidence beneath the declaration), bricolage-manrope (warm humanist grotesque that performs craft rather than shouts it), aqua teal H:163° (precise, fresh, spring-technical), and bottom-weighted hero layout (the phrase has weight, let it settle).
3. Render feasibility: Yes — Bricolage Grotesque at clamp(52px, 7.8vw, 118px) renders three lines of the phrase within the 88vh hero band on a 1440×900 viewport at ~85% canvas width without overflow; Manrope body text handles all supporting type cleanly.

## Rationale
The hero phrase arrived from Hacker News today: "I'm going back to writing code by hand" (414 points), a developer's counter-cultural declaration in the age of AI-generated everything. For a personal portfolio site that literally rebuilds its own design daily through AI orchestration, the irony is structural — the phrase is both a sincere statement of craft values and a wink at the mechanism displaying it. That tension makes it poster-worthy: you can read it as aspiration, as critique, or as comedy, and all three readings survive scrutiny. The period after "by hand." is not decoration; it's a full stop against noise.

The Stack archetype was the only honest container. A Specimen (used twice in the last week) would have isolated the phrase from all evidence — but this phrase needs bands below it: the Tigers win that happened while someone was presumably coding, the golf leaderboard filing with quiet scores, the HN context so the viewer knows where the phrase came from. Stack lets the hero declaration stand undivided at full viewport height, then unfolds the supporting world in distinct bands below — signal strip, work grid, capabilities — each with its own background treatment, none competing with the phrase above. Bricolage Grotesque's variable humanist grotesque is exactly right because it has genuine warmth and craft character at display scale; it's not the scream of Anton or Bebas, it's a voice that sounds like a person.

Aqua teal at H:163° was both mandated and correct. The narrow 158°–170° window that remained after eliminating all recent hues happens to be the most precisely "craft-technical" color available: it reads as spring freshness, as the glow of a terminal running a build, as the color of something carefully made. The near-black `#0B1C24` ground is not anonymous void — it's tinted blue-green toward H:200° so even the negative space participates in the palette's coherence. The design's single chromatic event is "by hand." landing in vivid teal at the end of the three-line hero block — everything builds to that 10 characters.
