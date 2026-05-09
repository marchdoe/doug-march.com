# Signals Brief — 2026-05-09

## Hero Copy
The unreasonable effectiveness of HTML

## Hero Rationale
Trending on Hacker News today at 147 points — "Using Claude Code: The unreasonable effectiveness of HTML" — a riff on Wigner's famous paper. For a portfolio that is itself rendered as HTML, rebuilt daily by code, the phrase is meta, ironic, and true all at once. It has the density of a manifesto fragment: quotable in isolation, pointed at both the medium and the practice, and genuinely funny in the right way. At marquee scale in Bebas Neue, it arrives as three stacked lines of escalating size — the punchline "OF HTML" in electric indigo, landing last and loudest.

## Archetype
Gallery Wall

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:248° electric indigo — sits at the border of blue and violet, simultaneously technical (terminal, code) and expressive (portal, depth). Mandated range 230°–265° puts us directly in this frequency; H:248° is the saturated core.
- **Neutral palette (indigo-tinted dark scale):**
  - 50: `#F5F4FF` | 100: `#ECEAFF` | 200: `#D4D2F0` | 300: `#B8B5D8`
  - 400: `#9290B8` | 500: `#6E6C94` | 600: `#4E4C70` | 700: `#32304C`
  - 800: `#1E1C30` | 900: `#0C0B1E`
  - All neutrals tinted H:248° at 8–14% saturation — cohesive with the primary, never anonymous grey
- **Accent (electric indigo):**
  - Light: `#9B8FFB` | Default: `#7B6EF8` | Dark: `#5C4EE8` | Glow: `rgba(123,110,248,0.35)`
- **Secondary accent:** none — the monochrome indigo palette is the voice; no dilution
- **Background:** Page bg `#0C0B1E` (neutral.900) | Card bg `#1E1C30` (neutral.800) | Signal panel bg `#32304C` (neutral.700)
- **Text colors:** Primary `#F5F4FF` | Secondary `#D4D2F0` | Muted `#9290B8`
- **Accessibility check:** Primary text `#F5F4FF` on `#0C0B1E` → ~19:1 ✓ | Muted `#9290B8` on `#0C0B1E` → ~5.8:1 ✓ | Accent `#7B6EF8` on `#0C0B1E` → ~6.4:1 (large text) ✓

---

### 2. Typography (chassis-derived)

- **Hero phrase rendering:** Bebas Neue (display token) in three stacked lines of escalating scale. Line 1 "THE UNREASONABLE": `clamp(72px, 8.5vw, 122px)`, left-aligned. Line 2 "EFFECTIVENESS": `clamp(84px, 10vw, 144px)`, left-aligned. Line 3 "OF HTML": `clamp(112px, 14vw, 202px)`, left-aligned — "OF HTML" renders in electric indigo (`#7B6EF8`), lines 1–2 in near-white (`#F5F4FF`). The punchline lands in the brand color.
- **Attribution subline:** IBM Plex Sans 300, 13px, letter-spacing 0.14em, muted color — "HN ↑147 · via @trq212" — sits 24px below "OF HTML"
- **Section headers:** IBM Plex Sans 600, 11px, all-caps, letter-spacing 0.18em, `textMuted` color — "SELECTED WORK", "LEADERBOARD", etc.
- **Body/signal copy:** IBM Plex Sans 400, 15px, line-height 1.55, `textSecondary`
- **Scores/numbers:** IBM Plex Sans 500, `font-variant-numeric: tabular-nums`
- **Line heights:** Hero 0.92 (all three lines, tight stack), snug 1.2 (subheadings), normal 1.55 (body)
- **Letter spacings:** Hero –0.02em, section labels +0.18em, body 0em

---

### 3. Layout Specification

- **Archetype:** Gallery Wall — asymmetric blocks across the full canvas, with irregular void space BETWEEN blocks (not uniform margins). The hero phrase block is the dominant element (~65% width × ~74% viewport height), flanked by a narrower right column of two staggered signal blocks. A full-width projects band completes the bottom. Gallery Wall is the only archetype that lets the phrase own most of the canvas while surrounding debris (golf, signals, projects) stakes territory without competing.

- **CSS grid structure:**
  ```
  display: grid;
  grid-template-columns: 1fr 304px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hero  golf"
    "hero  signals"
    "work  work";
  column-gap: 40px;
  row-gap: 0;
  padding: 80px 5vw 64px 6vw;
  max-width: none;
  ```

- **Major dimensions:**
  - Hero/phrase block: `grid-area: hero; min-height: 74vh; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 48px`
  - Golf leaderboard block: `grid-area: golf; padding-top: 80px; height: fit-content` — intentional 80px top offset (doesn't align with hero top edge; this is the Gallery Wall asymmetry)
  - Signals block: `grid-area: signals; margin-top: 24px; padding: 24px; background: bgCard`
  - Projects band: `grid-area: work; margin-top: 80px; padding: 40px 0` — spans full grid width
  - Max content width: `none` — viewport-relative side padding only (`5vw` right, `6vw` left)

- **Nav placement:** Full-width top bar, `height: 44px`, `position: sticky; top: 0; z-index: 100`. Left: site name in IBM Plex Sans 500. Right: navigation links at 13px. Background: `rgba(12, 11, 30, 0.88)`, `backdrop-filter: blur(12px)`. `border-bottom: 1px solid border`.

- **Hero phrase grid zone:** `grid-area: hero`, rows 1–2 of column 1. Phrase text is bottom-aligned within the block (flex-end) — the three giant lines of type sit heavy at the bottom half of the hero block, approximately rows 2–4 of a 5-row implicit grid within the block. Intended rendered height of the three lines: ~380px total at 1440px viewport.

---

### 4. Component Character

- **Border radius:** `0px` everywhere except tags (`2px`) — the design is sharp and angular, zero softness
- **Border treatment:** `1px solid border` (neutral.700 = `#32304C`) for cards and panels. Left-accent strip on signal cards: `4px solid accent` (electric indigo) on the left edge only — a terminal-cursor motif
- **Shadow:** none — depth comes from surface lightness alone (900 → 800 → 700 elevation)
- **Density:** Spacious in the hero block (the void is intentional). Compact in the right signal column (dense list, 8px row gap).
- **Interactive states:** Links → `color: accentLight` on hover. Project cards → `border-left-color: accent` on hover + `background: bgCard` reveal. Nav items → `opacity: 1` from `0.65` on hover.

---

### 5. Signal Integration

- **Golf leaderboard (Truist Championship, in progress):** Right column, top block. Header: "TRUIST CHAMPIONSHIP · IN PROGRESS" in 11px IBM Plex Sans semibold wide-tracked label. Each row: rank + name + score in three columns, `tabular-nums`. Sungjae Im's –9 in `accent` color (electric indigo). Rows 2–5 in `textSecondary`. Block has `4px left border` in accent.

- **Tigers loss (3–4):** In the signals block below the leaderboard. "DET 3 — 4 OPP" — score rendered in `textMuted` (muted, not accent — it's a loss). Prefixed with a small "▼" in neutral.500.

- **Quote ("To achieve, you need thought..."):** NOT the hero phrase. Appears as a footnote callout in the lower-left of the hero block, below the attribution line. IBM Plex Sans italic 13px, `textMuted`, no blockquote styling — just inline in small text.

- **Music (Guided by Voices, Tobin Sprout, Radiohead):** Signals block, one line: "🎵 Guided by Voices · Tobin Sprout · Radiohead" in 13px `textMuted`.

- **Mother's Day (tomorrow):** Signals block, one line with accent coloring: "✦ Mother's Day tomorrow" in `accentLight` (indigo.300) — the one warm-signal highlight in an otherwise cool palette.

- **Lunar (last quarter, 41%):** Signals block: "🌙 Last quarter · 41%" in `textMuted`.

- **Daylight (13.9h):** Signals block: "☀ 13.9h daylight" in `textMuted`.

- **Awwwards (The Kesey Signal):** Not displayed directly — its 1999 cyber-noir terminal aesthetic is atmospheric context for the palette choice (deep indigo-black as a terminal screen).

- **HN attribution:** Beneath the hero phrase (the attribution subline) — this is where the source lives. The design names its own evidence.

## Self-Check
1. Hero quotability: Yes — "The unreasonable effectiveness of HTML" is trending on HN today and is quotable in isolation as a pointed, ironic manifesto fragment; a developer would screenshot this cold.
2. Because-of chain: Yes — the phrase's intellectual irony → Gallery Wall (phrase dominates but doesn't monopolize; evidence surrounds it asymmetrically) → bebas-plex (declarative condensed display, catalog register, poster scale) → H:248° electric indigo (technical frequency, portal depth, mandated range, monochrome commitment amplifies the phrase's self-referential nature).
3. Render feasibility: Yes — Bebas Neue in three lines at clamp(72px,8.5vw,122px) / clamp(84px,10vw,144px) / clamp(112px,14vw,202px) fits within a ~65% column on a 1440×900 viewport with 6vw left padding; at 1440px the three lines render at approximately 122px / 144px / 202px, stacking to ~390px total height well within 74vh.

## Rationale
The hero phrase arrived from Hacker News this morning — "Using Claude Code: The unreasonable effectiveness of HTML," 147 points, a riff on Wigner's 1960 paper about mathematics. For a portfolio site that is itself written in code and delivered as HTML, the phrase is simultaneously a technical observation, an ironic compliment, and a quiet manifesto. You can hold it up to the light from three angles (medium, method, material) and it holds all three readings without explanation. That layered quotability is what earns it marquee scale today.

Gallery Wall was the only honest archetype for this phrase — not because of the phrase's content, but because of its relationship to evidence. A Specimen archetype (used 3 days ago) would inflate the phrase and delete everything else, which reads as pure assertion. The Gallery Wall inflates the phrase AND keeps the evidence around it: the HN attribution lives as a subline beneath the hero, the Truist golf leaderboard occupies the top-right block (asymmetrically offset from the hero block's top edge), and the signals panel below it holds Tigers loss, Guided by Voices, lunar phase, Mother's Day. The phrase dominates the canvas at ~65% width, but the right column's two stacked blocks — intentionally shorter than the hero block, leaving void space at the bottom-right — make the composition read as a curated selection, not a decree. The full-width projects band at the bottom closes the canvas without competing with the hero phrase.

`bebas-plex` is the correct chassis because the phrase is declarative, not lyrical. Bebas Neue renders "OF HTML" at ~202px (14vw at 1440px) with the condensed authority of a manifesto heading, not the expressiveness of a brand display font. The three stacked lines escalate in scale — THE UNREASONABLE at ~122px, EFFECTIVENESS at ~144px, OF HTML at ~202px — so the eye rides a typographic crescendo toward the punch word "HTML" in electric indigo (`#7B6EF8`). IBM Plex Sans in the signal column provides workhorse contrast: the body of evidence against the display of assertion. The H:248° indigo palette sits precisely in the mandated 230°–265° window and has not appeared in the last seven days. The monochrome commitment (no secondary accent, just white + electric indigo + dark neutrals) prevents anything from competing with the chromatic moment of "OF HTML" arriving in the brand color.
