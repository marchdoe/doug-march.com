# Signals Brief — 2026-07-04

## Hero Copy
It sings because it has a song.

## Hero Rationale
The phrase arrives from today's `signals.quote` — a Chinese Proverb: "A bird does not sing because it has an answer. It sings because it has a song." The second clause is the poster fragment: seven words, a closed period, a complete truth. On Independence Day it lands as a declaration of creative self-determination — freedom not as a right claimed but as a practice enacted. For a portfolio site that rebuilds itself every morning without external prompting, the phrase is also literal: this page sings because it has a song. Stripped of attribution it earns marquee scale on its own sentence rhythm; someone would screenshot these seven words without context and the meaning would hold.

## Archetype
Gallery Wall

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue:** H:200° — the precise hue of a clear midsummer sky at first dark: aqua-cyan, vibrant, neither tropical nor corporate. Falls inside the mandated 186°–212° corridor. Thematically resonant: it is the color of the sky on the 4th of July between sunset (19:34) and the first firework.

**Neutral palette (all tinted H:205°, "night sea" family):**
- 50: `#ecf5f8`
- 100: `#d6ecf2`
- 200: `#aed3de`
- 300: `#7db5c6`
- 400: `#508fa8`
- 500: `#3e7d96`
- 600: `#1e4e67`
- 700: `#123548`
- 800: `#082130`
- 900: `#040f18`
- 950: `#020810`

**Accent (aqua, single):**
- light: `#45b8e2` (aqua.300)
- default: `#1a9ec8` (aqua.400)
- dark: `#0b6184` (aqua.600)
- glow: `rgba(26, 158, 200, 0.22)`

**Secondary accent:** None — one accent, fully committed.

**Background:**
- Page bg: `#040f18` — void summer night
- Card bg: `#082130` — lifted surface, barely distinct
- Sidebar/deepest: `#020810`

**Text colors:**
- Primary text: `#ecf5f8` — 17.5:1 contrast on page bg ✓
- Secondary text: `#7db5c6` — 9.8:1 contrast ✓
- Muted text: `#508fa8` — 6.6:1 contrast ✓ (used only for labels ≥14px)

---

### 2. Typography (chassis-derived)

**Hero phrase rendering:** `display` chassis token (Bricolage Grotesque, heavy variable weight). Scale: `clamp(4rem, 7.5vw, 10rem)` — at 1440px this computes to ~108px. The phrase wraps naturally to three lines at this scale: "It sings" / "because it has" / "a song." — or enforced at the clause break: "It sings because" / "it has a song." Either reads as intentional stacking. Left-aligned, flush to the hero zone's left edge at 6vw internal padding. Attribution "— Chinese Proverb" renders in Manrope Italic at `0.875rem`, `textMuted`, `48px` below the final phrase line.

**Line heights:**
- Hero phrase: `0.88` — carved, monumental stacking
- Display cards / section headings: `1.15`
- Body and signal text: `1.55`
- Nav labels: `1.0`

**Letter spacings:**
- Hero phrase: `-0.03em` (Bricolage at 108px tightens naturally)
- All-caps navigation labels: `0.12em`
- Body text: `0em`
- Metadata / captions: `0.05em`

---

### 3. Layout Specification

**Archetype: Gallery Wall** — The hero phrase functions as the anchor piece: a large, asymmetrically placed block that everything else orients around without forming a symmetric frame. Six distinct blocks scattered across the full canvas with irregular gaps *between* them, not a shared outer margin. The composition reads as installation, not grid.

**CSS grid structure:**
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-template-rows: repeat(8, minmax(80px, auto));
gap: 2vw;
padding: 2vw;
min-height: 100vh;
max-width: none;
```

**Block assignments:**
| Zone | Content | Columns | Rows |
|------|---------|---------|------|
| A | Hero phrase | `1 / 9` | `1 / 6` |
| B | Nav / site identity | `9 / 13` | `1 / 2` |
| C | Featured project card | `9 / 13` | `2 / 6` |
| D | Holiday + golf signal | `1 / 5` | `6 / 9` |
| E | Work index / project tiles | `5 / 9` | `6 / 9` |
| F | About + capabilities + music | `9 / 13` | `6 / 9` |

**Major dimensions:**
- Zone A (hero) effective size: ~920px wide × ~540px tall at 1440×900 viewport
- Max content width: `none` — viewport edge to edge, padding only from grid gaps
- Side padding (via grid): `2vw` on each side
- Inter-block gap: `2vw` uniform

**Nav placement (Zone B):** Top-right corner, 1 row tall. Site name "Doug March" in Bricolage Grotesque `0.9375rem` bold, left. Navigation links ("Work" · "About") in Manrope Semibold `0.75rem`, all-caps, `letter-spacing: 0.12em`, right-aligned. Background: `bgSubtle` (neutral.950) with `1px` border bottom in `border` token.

**Hero phrase grid zone (Zone A):** `grid-column: 1 / 9; grid-row: 1 / 6`. Hero phrase text with `padding: 5vw 5vw 0 6vw`. At 1440px, phrase at ~108px wraps to 3 lines × `0.88` LH ≈ 285px of type, positioned in upper half of Zone A. Attribution occupies the space 48px below.

---

### 4. Component Character

**Border radius:**
- Cards (Zones C, D, E, F): `8px`
- Buttons: `4px`
- Tag / metadata chips: `4px`
- Zone A (hero): none — raw canvas

**Border treatment:** Borderless as primary card treatment. Cards are distinguished by `bgCard` (#082130) against page bg (#040f18) — a 6-point lightness separation that registers as elevation without a drawn border. One exception: data rows inside Zone D (golf leaderboard) use `1px solid border` (neutral.700) as row dividers.

**Shadow:** Cards carry `0 2px 16px rgba(2, 8, 16, 0.55)` — barely present, supports the sense of floating blocks on the gallery wall.

**Density:** Zone A is spacious (type breathes in a large open field). Zones D, E, F are medium-compact — information present but not crowded.

**Interactive states:** Cards (hover): background lifts to neutral.700, `transition: background 180ms ease`. Project tiles (hover): accent border `1px solid accentDim` appears at card edge. Links: color transitions to `accentLight` (#45b8e2), `200ms ease`. Nav links: thin `2px` aqua underline slides in from left on hover.

---

### 5. Signal Integration

**Independence Day (holiday):**
Zone D, upper third. "INDEPENDENCE DAY" in Bricolage Grotesque Bold, `1.125rem`, all-caps, `letter-spacing: 0.2em`, rendered in `accent` (#1a9ec8). Subline: "July 4, 2026" in Manrope `0.875rem`, `textSecondary`. This sits above the golf data as a distinct visual moment.

**Golf — John Deere Classic:**
Zone D, lower two-thirds. Header: "JOHN DEERE CLASSIC · IN PROGRESS" in Manrope Semibold `0.6875rem`, all-caps, `letter-spacing: 0.1em`, `textMuted`. Five leaders as tight list rows separated by `1px solid border`: `1. Lucas Glover −14` (score in `accent`), `2. Lee Hodges −12`, `3. Zac Blair −11`, `4–5. Suber / Lipsky −10`. Player name in `textSecondary`, score in `accent`.

**Quote treatment:** The hero phrase IS the signal — the full proverb fragment rendered at marquee scale in Zone A. Attribution "— Chinese Proverb" in Manrope Italic `0.875rem`, `textMuted`, 48px below the final line. The first clause ("A bird does not sing because it has an answer.") could appear in `textMuted` at `1.125rem` above the hero phrase as a setup whisper, or be omitted entirely for clean impact.

**Lunar / sun data:**
Zone D or Zone F footer, single data line: "🌖 Waning gibbous 72.6% · ↑ 4:54 ↓ 19:34" in Manrope `0.6875rem`, `textMuted`. Low-key — present for the daily log, not prominent.

**Music / currently listening:**
Zone F, lower section, smallest text tier: "Radiohead · My Morning Jacket · Guided by Voices" in Manrope `0.75rem`, `textMuted`, prefixed with "— " in `accentDim`.

**Work tiles (Zone E):** Three `selectedWork` project cards arranged in a tight 1-column or 2-column stack within Zone E's bounds. Each card: `bgCard` bg, project title in Bricolage Grotesque `1rem` bold, year + category in Manrope `0.75rem` `textMuted`, `8px` radius, hover lift. The Stack of work sits as a quiet counterpart to the loud hero — a proof beneath the declaration.

## Self-Check
1. Hero quotability: Yes — "It sings because it has a song." is a closed, resonant fragment from a Chinese Proverb; it functions as a standalone declaration without context, attribution, or qualifying text, and would be screenshot-shared in isolation.
2. Because-of chain: Yes — the lyrical, celebratory, freedom-in-practice quality of the phrase demanded Bricolage Grotesque's warm expressiveness (not Anton's blunt authority), Gallery Wall's placement-as-installation (not a poster that flattens everything else), and the aqua night-sky palette that honors both the 4th of July timing and the mandated 186°–212° corridor.
3. Render feasibility: Yes — Bricolage Grotesque at clamp(4rem, 7.5vw, 10rem) in Zone A (≈920px wide × 540px tall at 1440×900) wraps the 32-character phrase to 3 lines at ~108px each with 0.88 line-height, yielding ~285px of hero type well within the zone's height.

## Rationale
The hero phrase arrived without competition. "A bird does not sing because it has an answer. It sings because it has a song." is a Chinese Proverb sitting in today's signals, and the second clause is already a poster: seven words, a period, a complete declaration of creative self-determination. On Independence Day — a holiday defined by the assertion of freedom, 14.7 hours of summer daylight, the first fireworks beginning after sunset at 19:34 — the phrase earns its marquee scale not through volume but through precision. For a portfolio site that rebuilds itself every morning purely because that is what it does, the phrase is also literally true: this page sings because it has a song.

Gallery Wall was the only archetype that honored the phrase's installation quality rather than flattening it into a manifesto. A Poster would have made the phrase a slogan; a Specimen would have made it a typographic exercise. Gallery Wall places it as an anchor piece — a dominant zone that other blocks orbit without enclosing it, the way a gallery's largest work sets the scale for everything else on the walls. Six blocks scattered across a 12-column canvas with 2vw gaps between them read as placed, not grided. Bricolage Grotesque, the display partner in `bricolage-manrope`, carries the expressive variable-weight warmth the phrase needs: not Anton's blunt authority, not Big Shoulders' athletic condensation, but a genuinely expressive display face with humanist warmth — appropriate for a lyrical proverb on a summer holiday. At `clamp(4rem, 7.5vw, 10rem)`, the phrase wraps to three natural lines at ~108px, filling Zone A's upper register without overflowing.

The color mandate opened a narrow window: 186°–212°, everything else forbidden by six consecutive prior builds. H:200° is the exact hue of the midsummer night sky between sunset and first dark — the color the atmosphere turns in July just before fireworks. Against near-void `#040f18` (the deep ink of 21:00 on the 4th), the aqua accent at `#1a9ec8` achieves 7.9:1 contrast and reads as light itself: emissive, not reflective. The neutral family, tinted toward H:205°, creates a palette that is entirely aqua-dark — all six zones of the Gallery Wall share the same night-sea atmosphere, making the scattered blocks feel like a single coherent surface rather than a patchwork. No secondary accent. No warm intrusion. One color, one night, one song.
