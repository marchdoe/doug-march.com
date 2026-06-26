# Signals Brief — 2026-06-26

## Hero Copy
SEALED FOR 2,000 YEARS.

## Hero Rationale
Today's top Hacker News story — "An entire Herculaneum scroll has been read for the first time" at 1327 points — is the signal of the day, by a mile. These papyrus scrolls were carbonized by Vesuvius in 79 AD and couldn't be physically opened without disintegrating; virtual unwrapping finally cracked the last one. The phrase distills that discovery to its essential drama: two millennia of silence, then revelation. For a portfolio that rebuilds itself each morning, the meta-resonance is deliberate — what was sealed becomes readable; what was obscured becomes visible. This earns marquee scale without apology.

## Archetype
Index

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

**Primary hue** — H:200° (cerulean); the mandate's open corridor is 188°–215° and this sits dead center. Cerulean reads as archaeological documentation: conservation-lab blue, darkroom print tones, the color of X-ray light that decoded the scroll.

**Neutral palette (ink family, tinted toward H:200° with chroma 0.01–0.02):**
- 50: #EBF2F6
- 100: #D2E2EC
- 200: #A9C5D8
- 300: #7EA5BC
- 400: #5787A0
- 500: #3B6880
- 600: #294E63
- 700: #1A3648
- 800: #0E2030
- 900: #07111C

**Accent color (cerulean):**
- Light: #87CEEA (cerulean.200)
- Default: #3FB4DB (cerulean.300)
- Dark: #0C9DC7 (cerulean.400)
- Glow: rgba(63, 180, 219, 0.20)

**Secondary accent:** none — single accent commits fully.

**Background:**
- Page bg: #07111C (ink.900 — deep cerulean-tinted near-black, not pure black)
- Card bg: #0E2030 (ink.800)
- Column bg: transparent (columns read as surface zones via borders, not fill)

**Text colors:**
- Primary text: #EBF2F6 (ink.50) — contrast vs #07111C ≈ 16.8:1 ✓
- Secondary text: #A9C5D8 (ink.200) — contrast vs #07111C ≈ 10.5:1 ✓
- Muted text: #5787A0 (ink.400) — contrast vs #07111C ≈ 4.84:1 ✓ AA

---

### 2. Typography (bebas-plex chassis)

**Hero phrase rendering** — Bebas Neue (display token), `font-size: clamp(72px, 11vw, 175px)`. Two stacked lines, left-aligned at `padding-left: 4vw`, bottom-anchored in the masthead zone. Line 1: "SEALED FOR" / Line 2: "2,000 YEARS." — both at identical size. Color: `text` (#EBF2F6). Letter-spacing: `0.01em` (Bebas benefits from a trace of positive tracking at display sizes). The period is load-bearing punctuation — it closes the phrase with finality and adds a visual anchor.

**Column headers** — Bebas Neue, `font-size: clamp(13px, 1.2vw, 18px)`, `letter-spacing: 0.14em`, color: `accent` (#3FB4DB), uppercase. These label the three catalog columns and read as catalog section headers.

**Entry titles** — IBM Plex Sans Medium 500, `font-size: 14px`, color: `text`. This is the workhorse text that fills the catalog rows.

**Entry meta / descriptors** — IBM Plex Sans Regular 400, `font-size: 12px`, color: `textSecondary` (#A9C5D8).

**Entry numbers** — IBM Plex Sans Light 300, `font-size: 11px`, `font-variant-numeric: tabular-nums`, color: `textMuted` (#5787A0).

**Nav links** — IBM Plex Sans Medium 500, `font-size: 12px`, `letter-spacing: 0.08em`, uppercase, color: `textSecondary`.

**Line heights:**
- Hero phrase: `0.92` (tight — Bebas at this scale needs no air between lines)
- Column headers: `1.0`
- Body/entries: `1.5`

**Letter spacings:**
- Hero: `0.01em`
- Column labels: `0.14em`
- Entry body: `0em` (normal)
- Nav: `0.08em`

---

### 3. Layout Specification

**Archetype: Index** — chosen because the Index archetype is the only honest structural response to a hero phrase about a decoded catalog. A scroll being read for the first time is literally an act of indexing. The page becomes the table of contents for the discovered scroll — dense, systematic, every row carrying weight. Bebas-plex is the catalog in the chassis table's "Best for archetypes" column. The archetype has not appeared in the 7-day archive.

**CSS grid/flex structure:**

```css
/* Root layout */
.page-root {
  display: grid;
  grid-template-rows: 56px minmax(34vh, auto) 1fr;
  min-height: 100vh;
  max-width: none;
  padding: 0 4vw;
}

/* Index body — three asymmetric columns */
.index-body {
  display: grid;
  grid-template-columns: 2.5fr 2fr 1.5fr;
  border-top: 1px solid var(--colors-border);
}

/* Individual columns */
.index-col {
  padding: 24px 24px 48px;
  border-right: 1px solid var(--colors-border);
}
.index-col:last-child { border-right: none; }

/* Column entries */
.entry-row {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 0 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--colors-border);
}
```

**Major dimensions:**
- Nav height: `56px`
- Hero masthead height: `min-height: 34vh` — flex column, `justify-content: flex-end`, `padding-bottom: 32px`
- Index body: `1fr` — fills remaining viewport height; on tall viewports scrolls naturally
- Max content width: `none` — full viewport, `padding: 0 4vw` on both sides
- Column A (WORK): `2.5fr` — widest, carries 7 projects
- Column B (SIGNALS): `2fr`
- Column C (TODAY): `1.5fr` — narrowest, compact record

**Nav placement** — top bar, 56px, full width. Left: "DOUG MARCH" wordmark in Bebas Neue 18px, letter-spacing 0.1em. Right: "WORK" / "ABOUT" in IBM Plex Sans Medium 12px, uppercase, letter-spacing 0.08em, color: textMuted. A 1px bottom border in `border` token separates nav from hero zone.

**Hero phrase grid zone** — Row 2 of the page grid, spanning full canvas width minus `8vw` total side padding. The phrase occupies the bottom ~40% of the masthead zone (flex bottom-aligned). A 1px horizontal rule in `ink.700` spans the full width at the masthead's bottom edge, separating it from the index body.

---

### 4. Component Character

**Border radius:** `none` (0) for all catalog elements, column borders, rules. The archival aesthetic is sharp and rectilinear — no rounding anywhere. Only buttons (if present) get `radii.sm` (2px).

**Border treatment:** Borderless cards; all divisions are 1px rules in `border` (#1A3648 — ink.700). Column separators use the same rule. The accent `borderAccent` (#004263 — cerulean.700) is used for the rule beneath the hero phrase and the horizontal rule beneath column headers.

**Shadow:** None. Depth comes from surface tone contrast and the border rule system, not from shadow. Shadows would undermine the flat archival documentation aesthetic.

**Density:** Compact. Entry rows have `padding: 10px 0`, entries are separated by 1px rules, column padding is `24px`. The overall impression should feel like a printed museum catalog, not a modern web app with generous breathing room.

**Interactive states:** On hover, entry titles shift from `text` (#EBF2F6) to `accent` (#3FB4DB). Entry rows get a left border of `2px solid cerulean.600` on hover, sliding in via `transition: border-left 0.15s ease`. Nav links get `color: text` on hover. No background fills — all states are typographic/border changes only.

---

### 5. Signal Integration

**HN top story (Herculaneum scroll)** — This IS the hero phrase source. It receives a featured treatment at the top of Column B (SIGNALS): full-width entry with the headline set at 13px IBM Plex Sans Medium, the score "▲ 1327" in `accent` (#3FB4DB) cerulean, and a line below in textMuted: "Vesuvius Challenge · scrollprize.org". Entry label: "HN #1" in Bebas 14px, cerulean accent. This entry has a 2px left border in cerulean.400 to visually distinguish it as the source of the hero phrase.

**Golf (Travelers Championship)** — Listed in Column B below the HN entry. Entry label: "GOLF" in Bebas. Five leaderboard entries as compact rows: "1 E. Cole -7", "2 N. Echavarria -6", "T2 B. Griffin -6", etc. Score numbers set with `font-variant-numeric: tabular-nums`. Leader's score in `accent`.

**Quote (Ueshiba)** — Bottom of Column B, set smaller (12px, textSecondary), as a simple attribution line: `"Failure is the key to success." — Morihei Ueshiba`. Column B entry label: "QUOTE".

**Tigers loss (1–2)** — Column C (TODAY), entry row: "DET TIGERS" label / "L 1–2" with the score in a muted warm token. No special prominence — just an honest catalog entry.

**Lunar (waxing gibbous, 91.3%)** — Column C, compact entry: "MOON" label / "Waxing Gibbous · 91%" with a symbolic character (●) in cerulean.

**Music** — Column C: "LISTENING" label / "Wet Leg · Tobin Sprout · My Morning Jacket" as stacked lines at 12px.

**Date record** — Top of Column C: "FRI 26 JUN 2026" in Bebas 18px, then "Sunrise 04:50 · Sunset 19:35 · 14.7h daylight" in 11px textMuted. Acts as the catalog's timestamp.

**Awwwards** — Column B, below golf: brief entries for the 3 SOTD — "Himachal", "Pil Rebranding", "AMFA" as label/title pairs.

## Self-Check
1. Hero quotability: Yes — "SEALED FOR 2,000 YEARS." is directly derived from the day's top story (1327 HN points); it stands alone, invites curiosity, and earns a screenshot without surrounding context.
2. Because-of chain: Yes — the discovery/cataloging theme of the phrase dictated Index (the scroll as decoded catalog), which dictated bebas-plex (explicitly tagged "catalog, declarative, Index"), which dictated cerulean H:200° (archival documentation blue, mandate's only open corridor), which dictated the dense catalog layout with Bebas masthead over IBM Plex Sans entry rows.
3. Render feasibility: Yes — "2,000 YEARS." at `clamp(72px, 11vw, 175px)` on a 1440px viewport yields 158px; 12 Bebas characters at ~0.62em average width = 1174px + 58px padding = 1232px < 1440px; hero zone at 34vh = 306px accommodates two lines at 158px × 0.92 leading = 291px with room to spare.

## Rationale
The hero phrase arrived fully formed from today's dominant signal: the Herculaneum scroll story on Hacker News at 1327 points — an entire papyrus document, carbonized by Vesuvius in 79 AD and physically unopenable for two millennia, has now been read cover to cover using virtual unwrapping technology. "SEALED FOR 2,000 YEARS." is the irreducible drama of that fact. It passes the screenshot test on its own — the reader asks both "what was?" and "what happened?" The period is not punctuation; it's the sound of a library door finally opening.

The Index archetype follows because the hero phrase is fundamentally about a catalog being decoded. The Index renders the page as a functional analog to that act: a masthead declaration above a dense, systematic three-column catalog of work, signals, and record. Bebas-plex is the chassis the catalog table itself recommends for Index — "editorial, catalog, declarative" are the exact three mood words that govern both the phrase and the Herculaneum scholarship context. Bebas Neue's condensed authority renders the masthead without noise; IBM Plex Sans's precision makes 7 projects, a golf leaderboard, and a day's worth of signals legible at 12–14px without ever competing with the declaration above.

Cerulean at H:200° is the only open corridor in the color mandate (188°–215°) and it is not just mandate-compliant — it is thematically exact. Cerulean is the color of conservation-lab light, darkroom photographic archives, and X-ray imaging: the precise visual register of something ancient being examined under modern scrutiny. Against the deep cerulean-tinted ink-black (#07111C) page background, the near-white hero phrase achieves a contrast ratio of ~16.8:1, and the #3FB4DB accent holds 7.8:1 — both well above WCAG AA. The tinted neutrals carry the cerulean hue at very low chroma so the entire surface, including the most muted catalog rows, belongs to the same archival family.
