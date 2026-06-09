# Signals Brief — 2026-06-09

## Hero Copy
The future depends on what you do today.

## Hero Rationale
Gandhi's line arrived from `signals.quote` pre-assembled and already self-referential: a portfolio site that tears down and rebuilds its own visual identity every morning based on what the world is doing *today* is the literal enactment of this sentence. The phrase isn't borrowed authority draped over a page — it is the site's operating logic stated plainly. The waning crescent at 26.1% illumination (end of a cycle, the day before darkness) and J.T. Poston finishing the Memorial at −12 (precision action, eighteen holes of decisions compounding) charge the phrase further. It is poster-worthy because it functions as a mandate, not a description.

## Archetype
Index

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:295° (blue-violet, OKLCH ~oklch(65% 0.30 295)). This is the only major hue family completely absent from the past seven primary palettes (75°, 358°, 112°, 155°, 38°, 252°, 200°) and falls squarely in the mandate's open 283°–327° window. Violet is the color of urgency-before-action: not yet red, not yet blue, charged at the crossing.

- **Neutral palette — "ink" (violet-tinted near-blacks)**
  - 50: `#F2EFF8`
  - 100: `#E4DFF0`
  - 200: `#C5BDD8`
  - 300: `#A39BBB`
  - 400: `#7E7598`
  - 500: `#5C5476`
  - 600: `#3F395A`
  - 700: `#27223C`
  - 800: `#14112A`
  - 900: `#07050D`

- **Accent color — electric violet**
  - Light: `#C4A0FF`
  - Default: `#9D50FF`
  - Dark: `#6820C4`
  - Glow: `rgba(157, 80, 255, 0.25)`

- **Secondary accent** — none

- **Background**
  - Page bg: `#07050D` (near-void, violet-tinted)
  - Card bg: `#14112A` (ink.800)
  - Sidebar bg: `#14112A`

- **Text colors**
  - Primary text: `#F2EFF8` (contrast on bg: ~18.5:1 ✓)
  - Secondary text: `#A39BBB` (contrast on bg: ~8.0:1 ✓)
  - Muted text: `#5C5476` (for decorative dividers, row numbers; not used for readable body)
  - Hero phrase in accent `#9D50FF` at 100px+ (large text, 3.5:1 > 3:1 required ✓)

---

### 2. Typography (chassis-derived; use spec)

- **Hero phrase rendering** — `display` token (Bebas Neue), stacked across 3 lines at `clamp(56px, 9vw, 130px)`. Left-aligned. Line-height `0.92` (tight condensed stacking). The three-line break: "THE FUTURE / DEPENDS ON WHAT / YOU DO TODAY." Each line flush-left, violet accent `#9D50FF`, all-caps natural to Bebas, letter-spacing `-0.01em` (condensed face, tight default). The phrase occupies the top 40–45vh of the viewport as the masthead zone.

- **Section headers** — Bebas `lg` (~20–22px), all-caps, ink.400 `#7E7598`, letter-spacing `0.10em` (small-caps treatment for catalog labels). Examples: "WORK", "EXPERIMENTS", "CAPABILITIES", "TODAY".

- **Index row titles** — IBM Plex Sans `base` (15–16px), weight 500 (medium), ink.50 `#F2EFF8`, letter-spacing `0.01em`.

- **Index row metadata** — IBM Plex Sans `sm` (13px — used as UI label only, never body prose), weight 400, ink.300 `#A39BBB`, letter-spacing `0.05em`.

- **Line heights**
  - Hero phrase: `0.92`
  - Section headers: `1.1`
  - Row entries: `1.6` (for vertical rhythm at tight density)
  - Body/about prose: `1.55`

- **Letter spacings**
  - Hero: `-0.01em`
  - Section labels: `0.10em`
  - Row titles: `0.01em`
  - Metadata: `0.05em`

---

### 3. Layout Specification

- **Archetype — Index**: Dense catalog at full canvas; reads as a director's contents page. The hero phrase serves as the masthead declaration and the index rows below are the literal proof: every project, experiment, capability, and signal is an entry demonstrating that something was done today (and yesterday, and the year before). The archetype makes the Gandhi argument structural — the future is already being built; here is the record.

- **CSS grid/flex structure**
  ```css
  /* Outer page */
  display: grid;
  grid-template-rows: 48px auto 1fr auto;
  /* Nav | Hero band | Index body | Footer */
  max-width: none;
  padding: 0;

  /* Hero band (masthead zone) */
  padding: 48px 6vw 40px;
  min-height: 42vh;

  /* Index body — two-column catalog */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0 6vw 80px;
  border-top: 1px solid #27223C; /* ink.700 */
  ```

- **Major dimensions**
  - Hero/masthead area height: `min-height: 42vh`; phrase fills it with 3 lines of Bebas at the above scale
  - Index body: fills remaining viewport; two equal columns with a `1px solid #27223C` center divider
  - Max content width: `none` — full viewport width, 6vw side padding only
  - Section padding: `48px 0` between sections within columns
  - Row height: `56px` per entry (generous for density balance)

- **Nav placement** — sticky top bar, full-width, `height: 48px`, `padding: 0 6vw`. Site name ("DOUG MARCH") in Bebas 18px on left; nav links ("WORK", "ABOUT", "NOW") in Plex Sans 12px semibold letter-spaced 0.10em on right. Background `#07050D`/translucent, `border-bottom: 1px solid #27223C`.

- **Hero phrase grid zone** — Full width, rows 1–1 of the hero band, spanning both would-be catalog columns. The phrase is architecturally larger than everything below it — the masthead precedes the catalog.

---

### 4. Component Character

- **Border radius** — none (`0px`) across all cards, buttons, tags. This is a catalog, not a product UI. Hard edges only.

- **Border treatment** — single `1px solid {colors.ink.700}` (`#27223C`). The section dividers are the only visual structure; nothing else has a border except the top nav bar.

- **Shadow** — none. Depth comes from value contrast, not elevation.

- **Density** — compact. Each index row is 56px tall. Between-row rules: `1px solid #14112A` (ink.800, near-invisible). Section breaks: `1px solid #27223C` (ink.700, visible). This creates breathing room at section transitions while the rows themselves are pressed tight.

- **Interactive states** — row hover: background transitions to `#14112A` (ink.800) + left border `2px solid #9D50FF` (accent). Project titles transition from `#F2EFF8` to `#9D50FF`. Transition: `all 0.12s ease`. No border-radius, no shadow — the catalog row highlights laterally, not spatially.

---

### 5. Signal Integration

- **Memorial Tournament final** — lives in the "TODAY" section of the right index column. Row format: `GOLF · MEMORIAL TOURNAMENT FINAL` as section label, then two tied-leader rows: `J.T. POSTON` / `RYAN GERARD` both at `−12` in accent violet `#9D50FF`. Wyndham Clark `−11` in secondary text. Clean tabular numbers via `font-variant-numeric: tabular-nums`.

- **Music signal** — "NOW PLAYING" section label in right column, below golf. Three bands listed as index rows: THE WAR ON DRUGS / RADIOHEAD / MY MORNING JACKET. No year metadata, just the names.

- **Lunar signal** — single row in right column: `MOON — WANING CRESCENT · 26%` in muted text. A quiet signal, not prominent, but present. The cycle-end resonance with the Gandhi phrase (the moment before renewal) earns its row.

- **Hacker News** — top two stories (OpenCV 5 at 233 pts; Microsoft AI dev hack at 191 pts) appear as "SIGNAL / HN" rows in right column. Title in secondary text; score in accent. Brief (15-word max) not full URL.

- **GitHub activity** — "RECENT STARS" mini-section: 5 repo names as tight rows, language badge (Python/TypeScript) as muted tag.

- **Sports** — all teams in off-season; single row "DETROIT · ALL TEAMS · OFF SEASON" in muted ink.400, no special treatment.

- **Quote attribution** — Gandhi's name in smallest muted text (`#5C5476`) beneath the hero phrase, flush-left: "— Mahatma Gandhi". Not hidden, not prominent.

- **Sun data** — `SUNRISE 04:49 · SUNSET 19:29 · 14.7h` as a single footer row spanning full width, very small (12px Plex Sans), muted. The 14.7 hours of daylight on June 9 — the longest days of the year approach — earns a footnote.

## Self-Check
1. Hero quotability: Yes — "The future depends on what you do today." stands alone as a mandate; it is poster-worthy because it functions as instruction, not description, and its self-referential resonance with a site that rebuilds daily makes it specific rather than generic.
2. Because-of chain: Yes — the Index archetype follows because the phrase demands a catalog of evidence (what was done); bebas-plex follows because it is the only chassis tagged for Index with a 1.500 ratio; violet H:295° follows because the phrase's urgency needs a charged, unused hue from the open mandate zone; the masthead-over-catalog layout follows because the phrase is the premise and the index rows are the proof.
3. Render feasibility: Yes — Bebas Neue at clamp(56px, 9vw, 130px) across 3 stacked lines at 1440px renders at ~130px per line × 3 = ~390px total hero height, well within 42vh (~378px at 900px), with 6vw side padding preserving full legibility at no overflow risk.

## Rationale
The Gandhi quote arrived from today's `signals.quote` with its argument already sealed: a portfolio that reads the world every morning and rebuilds its own appearance from scratch is the most literal possible enactment of "the future depends on what you do today." The phrase isn't metaphor draped over a page — it is the site's operating mechanism stated in eleven words. The waning crescent at 26.1% (end of a lunar cycle, the quiet day before the dark before renewal) and J.T. Poston closing the Memorial at −12 (eighteen consecutive decisions compounding into a result) charge the mandate further. This phrase earns marquee treatment because it functions as an instruction, not a description.

The Index archetype followed directly from the phrase's logical structure: if the argument is that the future is built by today's actions, the most honest layout is a catalog of actions taken. The index rows ARE the proof of the mandate — every project, capability, and signal is a completed entry. A Poster would put the phrase on a pedestal and let it float. A Specimen would make it a typography exercise. Index makes the reader arrive at the declaration, then descend through the evidence: FishSticks, 15th Club, Spaceman, all the experiments, all the capabilities — the full record of what was done. The masthead zone (42vh) sets the premise; the catalog below it files the evidence. The archetype and the phrase are the same argument at different scales. Index is also the only archetype not used in the past seven days, making it the freshest structural choice in the archive.

`bebas-plex` was the only honest chassis for this combination. It is the catalog chassis — tagged directly for Index archetype — and its 1.500 ratio ensures the hero phrase renders at architectural scale. Bebas Neue's condensed industrial weight is correct for a mandate; this phrase is not warm, it is a directive. IBM Plex Sans provides the workhorse body for every index row without competing. Electric violet at H:295° is the only primary hue family completely untouched in seven builds and lands precisely in the open 283°–327° mandate window — but more importantly, it is the color of urgency-before-ignition, the charged frequency between blue and red, the hue of a status indicator that means *now*. On `#07050D` void near-black (the darkest possible canvas before full darkness), `#9D50FF` violet at 130px Bebas doesn't just display — it catalyzes.
