# Signals Brief — 2026-05-14

## Hero Copy
No defeat except from within.

## Hero Rationale
Elbert Hubbard's quote arrived in today's signal feed with a concentrated fragment that stands alone: five words, no hedging, a complete epistemological argument about will. The Pistons lost 113-117 (four-point margin), the Tigers lost 2-3 (one run)—both close losses, both defeats that came from execution, not talent. New moon today: zero illumination, day 28 of cycle, the absolute dark before renewal. Hubbard's fragment is the right phrase for a new-moon Thursday when Detroit came this close twice; the phrase doesn't mourn, it locates. You'd screenshot this line. It stands alone.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

**Primary hue** — H:72° (chartreuse-yellow). This is the only remaining gap in the color mandate after eliminating 0°–65° and 90°–360°; at full saturation on a near-black ground it reads as acid, electric, and deliberately uncomfortable — the right register for a defiant persistence aphorism on a new-moon night.

**Neutral palette** — Tinted toward H:72° (olive), dark-dominant:
- 50: `#F0F0E8`
- 100: `#DEDEDA`
- 200: `#C4C4BA`
- 300: `#A6A69A`
- 400: `#888876`
- 500: `#6A6A58`
- 600: `#4E4E3C`
- 700: `#323220`
- 800: `#1C1C0E`
- 900: `#0C0E08`

**Accent color** — Chartreuse:
- Light: `#D5EC6E`
- Default: `#AACC1A`
- Dark: `#73920D`
- Glow: `#C1E136`

**Secondary accent** — None. One chromatic event only.

**Background** — Page bg: `#0C0E08` (near-black, slight olive tint) · Card bg: `#1C1C0E` · Sidebar bg: `#1C1C0E`

**Text colors** — Primary: `#F0F0E8` · Secondary: `#A6A69A` · Muted: `#6A6A58`

**Contrast verification** — `#F0F0E8` on `#0C0E08` ≈ 18:1 (AA ✓). Accent `#AACC1A` on bg ≈ 11:1 for accent as large display element (AA ✓). Light-mode body: `#0C0E08` on `#F0F0E8` ≈ 18:1 (AA ✓).

---

### 2. Typography

**Hero phrase rendering** — Spectral (slab serif, `display` token), `clamp(56px, 6vw, 92px)`, weight 700, line-height 0.92, letter-spacing −0.03em. Phrase breaks into three editorial lines: `NO DEFEAT` / `EXCEPT` / `FROM WITHIN.` — all caps broadsheet register. Color: `#F0F0E8` (cream). Attribution line below ("— Elbert Hubbard") in Albert Sans 11px, tracked 0.2em, color `#AACC1A` (chartreuse). This is the only chartreuse text in the hero zone.

**Line heights** — Hero: 0.92 · Section heads: 1.0 · Body: 1.55 · Signal data: 1.4

**Letter spacings** — Hero: −0.03em · Eyebrows/labels (tracked caps): 0.20em · Body: 0em · Meta/data: 0.05em

---

### 3. Layout Specification

**Archetype** — Broadsheet. The hero phrase is a declaration requiring the authority of a printed record — a night edition, the dispatch of a truth. Broadsheet gives it a masthead, a lead story zone, and dense columns of evidence (scores, signals, projects) that make the phrase feel published rather than posted.

**CSS grid structure:**
```
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-template-rows: auto 2px auto 1px auto;
gap: 0 24px;
padding: 0 6vw;
max-width: none;
```

**Masthead band** — Full 12 columns, height 56px: "DOUG MARCH" in Spectral tracked caps (left, cols 1–4), date + issue in Albert Sans small caps (center, cols 5–8), nav links in Albert Sans (right, cols 9–12). Bottom edge: 2px chartreuse rule.

**Hero story zone** — `grid-column: 1 / 9; grid-row: 3;` — takes cols 1–8. The hero phrase at `clamp(56px, 6vw, 92px)`, three lines, no background. Padding: 48px 0 40px 0. No hero background — lives directly on page bg.

**Signal column** — `grid-column: 9 / 13; grid-row: 3;` — cols 9–12. Two stacked blocks: SIGNALS BRIEF (Pistons/Tigers scores, new moon, daylight hours, PGA status) and HN TODAY (top three stories). Separated by 1px neutral.700 rule. Label eyebrows in Albert Sans 10px tracked 0.2em chartreuse.

**Below-fold section** — Full-width 1px chartreuse rule, then 3-equal-column grid: SELECTED WORK (cols 1–4), CAPABILITIES (cols 5–8), TIMELINE FRAGMENT (cols 9–12). Section labels: Albert Sans 10px tracked caps in chartreuse. Content: Albert Sans 14px, 1.55 leading.

**Major dimensions:**
- Masthead height: 56px
- Hero story zone min-height: 52vh
- Below-fold section: padding 48px 0
- Max content width: `none` (full canvas)
- Side padding: `6vw`

**Nav placement** — Inline in masthead band, rightmost 4 columns. Horizontal list: WORK · ABOUT · EXPERIMENTS. Albert Sans 12px, tracked wide, color `#A6A69A`, hover → `#AACC1A`.

**Hero phrase grid zone** — Columns 1–8 of a 12-column grid, below masthead. Intended rendered size: ~840px wide at 1440px viewport. At `clamp(56px, 6vw, 92px)` with three lines at 0.92 line-height, the hero block occupies approximately 44vh of vertical real estate.

---

### 4. Component Character

**Border radius** — none (`0px`) throughout. This is a newspaper; no rounded corners.

**Border treatment** — Structural horizontal rules in chartreuse (`#AACC1A`, 2px for primary divisions; 1px `#73920D` for secondary). Vertical column separators: 1px `#323220` (neutral.700).

**Shadow** — None. Depth through surface distinction only (900 bg → 800 card).

**Density** — High. Broadsheet demands it. Compact signal lists (line-height 1.4, 13px), tight section headers, columns packed with readable data.

**Interactive states** — Links: color `#A6A69A` → `#AACC1A` on hover, underline appears. Project entries: no card chrome, just a chartreuse border-left (4px) that appears on hover. Nav: tracked label → chartreuse.

---

### 5. Signal Integration

**Signal column placement** — Rightmost 4 columns (grid cols 9–12), sitting beside the hero zone. Two blocks with hard-ruled divisions.

**Sports scores** — SIGNALS BRIEF section: `PISTONS` (Albert Sans 11px tracked caps, neutral.300) · `113 – 117` (Spectral 20px, neutral.50) · `L` badge in neutral.500 box. `TIGERS` same treatment · `2 – 3`. Both losses flagged quietly — neither in chartreuse (that color is for structure and attribution, not defeats).

**PGA Championship** — Single line: `PGA CHAMPIONSHIP` in tracked caps + `SCHEDULED` in neutral.500. No scores yet; presence is enough.

**The quote** — IS the hero phrase, displayed as the broadsheet lead story at `clamp(56px, 6vw, 92px)`. Attribution "— Elbert Hubbard" is the only chartreuse text in the hero zone, functioning as a source credit below the declaration.

**New moon** — In SIGNALS BRIEF: `NEW MOON` · `0.026 illumination` · `Day 28` — rendered in neutral.400 italic Albert Sans 12px. The darkness is noted, not dramatized.

**Daylight** — `SUNRISE 05:03 · SUNSET 19:09 · 14.1H` in Albert Sans 11px tracked, neutral.500 — one line in the signals block.

**Music** — Listed at the foot of the signal column: `WET LEG · GUIDED BY VOICES · MY MORNING JACKET` — Albert Sans 11px, neutral.400, tracked 0.05em.

**HN TODAY** — Second block in signal column. Three entries: headline text in Albert Sans 13px neutral.200, score in chartreuse.600, stacked. Eyebrow "HN TODAY" in tracked caps chartreuse.

## Self-Check
1. Hero quotability: Yes — "No defeat except from within." stands alone as a poster, a locker-room wall, a manifesto fragment; it needs no context to land.
2. Because-of chain: Yes — the phrase demanded editorial authority (Broadsheet), which demanded a slab serif with newspaper gravity (spectral-albert), which demanded acid chartreuse on near-black (the only open mandated hue, correctly visceral for a defiant aphorism on a zero-illumination new moon night).
3. Render feasibility: Yes — Spectral at clamp(56px, 6vw, 92px) across 8 of 12 columns (~840px at 1440px viewport), breaking into 3 lines at 0.92 leading, occupies approximately 44vh cleanly with no overflow risk.

## Rationale
The hero phrase arrived from Elbert Hubbard's signal-feed quote, compressed to its most poster-worthy fragment: five words, a period, a complete philosophical statement that locates the source of defeat inside the self. Today gives it context in triplicate — the Pistons lost by four, the Tigers by one, and the moon is at its darkest (0.026 illumination, new cycle day 28). The phrase isn't consolation; it's diagnosis. That register demanded authority, not volume — which is why the Broadsheet archetype won over Poster or Specimen. A declaration this compressed doesn't need a void to land in; it needs a printed record around it, the evidence of what it's responding to. The Broadsheet makes the phrase the lead story of a night edition.

Spectral + Albert Sans was the only honest chassis. Spectral's transitional slab serifs carry 19th-century British newspaper authority — the type used to print both legal statutes and moral pronouncements. At `clamp(56px, 6vw, 92px)` across eight of twelve columns, the three-line headline ("NO DEFEAT / EXCEPT / FROM WITHIN.") reads as something permanent, filed, recorded. Albert Sans handles the evidence: scores, signals, projects, capabilities — the body of the day's record beneath the declaration. The 1.333 ratio is deliberate: this phrase doesn't want to scream, it wants to be inscribed.

Acid chartreuse at H:72° is the only available hue in today's color mandate (the gap between 65°–90° after eliminating 0°–65° and 90°–360°). That constraint turned out to be generative: chartreuse on near-black is the color of warning labels, emergency signage, hazard tape — a color that conveys "this matters, pay attention" without warmth. On `#0C0E08` (night-olive near-black) it reads as a single frequency of light in absolute darkness, which is precisely the new moon aesthetic. The color appears only in structural roles: the masthead rule, eyebrow labels, the Hubbard attribution, HN scores — never as large-area fill. The cream type and dark ground carry the mass; chartreuse is the single live wire threading through it.
