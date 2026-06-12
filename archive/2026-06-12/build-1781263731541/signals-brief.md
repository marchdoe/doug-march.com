# Signals Brief — 2026-06-12

## Hero Copy
The soul without imagination is what an observatory would be without a telescope.

## Hero Rationale
From today's `signals.quote`, Henry Ward Beecher. The waning crescent at 4.6% illumination makes this declaration immediately physical — tonight's sky IS dark enough to demand a telescope, and only the soul equipped with imagination knows to reach for one. For a portfolio that synthesizes environmental signals into visual form each morning, imagination-as-necessary-instrument operates on every register simultaneously: the tool is what matters, the observatory (or the site, or the person) is nothing without it. The quote's contemplative weight and Friday's long-summer-daylight energy together push against five consecutive days of near-black darkness in the archive — today wants light.

## Archetype
Poster

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

- **Primary hue**: H:36°, S:85%, L:42% — observatory amber. Falls within the mandate's 28°–45° open window. This is tool-light: the amber glow that helps without blinding, the color of lamp-lit pages and brass telescope fittings.
- **Neutral palette** (warm, amber-tinted stone):
  - 50: `#FDFAF5` (bleached parchment)
  - 100: `#F5EDD9` (parchment — page background)
  - 200: `#E8D9BF` (aged paper — card background)
  - 300: `#D4C19E` (antique border)
  - 400: `#BCA57A` (warm mid)
  - 500: `#9E8458` (stone mid — muted text)
  - 600: `#7D6340` (warm shadow)
  - 700: `#5C4428` (secondary text)
  - 800: `#3A2B16` (deep warm brown)
  - 900: `#1A0F05` (near-black — primary text, 16.1:1 on bg ✓)
- **Accent color**:
  - light: `#F5A820` (amber-400)
  - default (functional/text): `#873F05` (amber-700, 6.5:1 on parchment ✓)
  - dark: `#3E1A02` (amber-900)
  - glow (decorative only): `#D4780A` (amber-500, 2.7:1 — non-text use only)
- **Secondary accent**: none
- **Background**: page bg `#F5EDD9`; card bg `#E8D9BF`; sidebar bg `#FDFAF5`
- **Text colors**: primary `#1A0F05`; secondary `#5C4428`; muted `#9E8458`; accent-on-light `#873F05`

---

### 2. Typography

- **Hero phrase rendering**: `display` token, `clamp(48px, 4.8vw, 72px)`, Bricolage Grotesque weight 800. Three-line left-aligned break:
  ```
  The soul without imagination
  is what an observatory
  would be without a telescope.
  ```
  Followed by right-aligned attribution in Manrope 14px, amber-700: `— Henry Ward Beecher`. Attribution is right-aligned to the trailing edge of the longest line, creating a typographic anchor.
- **Line heights**: hero phrase: `1.05` (monumental, stacked tight); attribution: `1.5`; body/signals: `1.5`; compact labels: `1.2`
- **Letter spacings**: hero phrase: `-0.025em` (Bricolage at 800 weight, condensed slightly for poster register); body: `0`; all-caps labels: `0.08em`

---

### 3. Layout Specification

- **Archetype**: Poster. One dominant typographic object — the Beecher quote — occupies a full `88vh` parchment zone. Name, navigation, and all signal elements are demoted to the corners of that zone. Nothing competes. The zone is the page.
- **CSS structure**:
  ```css
  body {
    display: grid;
    grid-template-rows: 88vh auto;
    min-height: 100vh;
    background: #F5EDD9;
  }
  .hero-zone {
    position: relative;
    padding: 40px 6vw 40px 6vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: none;
  }
  .sub-fold {
    padding: 32px 6vw;
    border-top: 1px solid #D4C19E;
  }
  ```
- **Major dimensions**:
  - Hero zone height: `min-height: 88vh`
  - Max content width: `max-width: none` (full canvas)
  - Side padding: `6vw` (viewport-relative)
  - Signal band: `padding: 24px 6vw`, `height: ~60px`
  - Projects grid: `padding: 64px 6vw`
- **Nav placement**: Fixed to top of hero zone, `position: absolute; top: 40px; left: 6vw; right: 6vw`. Wordmark `DOUG MARCH` left at Manrope 13px medium stone-600. Nav links `work / about` right at Manrope 13px normal stone-500. No background, no border — they float as corner text.
- **Hero phrase grid zone**: Vertically centered in the 88vh zone (flex column `justify-content: center`), left-aligned at `6vw` from left edge. On 1440×900, the quote block renders at approximately `y: 280px` to `y: 575px`, spanning three lines of ~69px type with 1.05 leading ≈ 217px of live text, plus the attribution at ~20px below — total block height ~250px, centered in the 792px zone with natural visual weight sitting slightly above true center.

---

### 4. Component Character

- **Border radius**: `0` for hero, blockquote, and large display elements; `2px` for score pills and tags; `4px` for project tile hover state
- **Border treatment**: Borderless in hero zone. `1px solid #D4C19E` (stone-300) for the sub-fold divider and project card outlines. `1px solid #E8D9BF` (stone-200) for signal band internal separators.
- **Shadow**: None. Depth comes entirely from warm/cool tonal relationships — the parchment and its amber notes carry the register without any drop shadows.
- **Density**: Hero zone is maximally spacious — the quote breathes with intentional field around it, air above and below equal to ≥ 25vh each. Signal band and project grid are compact: 13px type, 30px line height, 8px gutters.
- **Interactive states**: Links gain amber-700 underline on hover, `transition: opacity 0.15s ease`. Project tiles: background transitions from `#F5EDD9` to `#E8D9BF` on hover, `transition: background 0.2s ease`. Score pills: no hover state (display only).

---

### 5. Signal Integration

- **Where signal elements live**: Two corner positions within the hero zone (bottom-left, bottom-right) for the most current/charged signals; signal band directly below the hero fold for everything else.
- **Tigers 11–0** (dominant sports signal): Score pill in bottom-right corner of hero zone, `position: absolute; bottom: 40px; right: 6vw`. Typography: Manrope 11px bold uppercase, letter-spacing `0.08em`, amber-700 text `#873F05` on stone-200 background `#E8D9BF`, `2px radius`, `padding: 4px 10px`. Reads: `TIGERS 11–0`.
- **Lunar 4.6% waning crescent**: Bottom-left corner of hero zone, `position: absolute; bottom: 40px; left: 6vw`. Typography: Manrope 12px, stone-500 `#9E8458`. Reads: `◑ 4.6% — dark sky tonight`. The near-total darkness is the physical context for the quote; naming it here closes the loop.
- **Quote**: IS the hero phrase — the dominant element, the poster's entire reason for existing. Attribution `— Henry Ward Beecher` rendered below in Manrope 14px normal, amber-700, right-aligned to the quote block's trailing edge.
- **Golf / RBC Canadian Open**: Signal band, left column. Tabular numbers, Manrope 13px, stone-600. Reads: `RBC Canadian Open · Cole · Koepka · Burns · Anderson · Theegala · −6 (5-way tie)`. Five men tied — the crowded leaderboard has its own ambient tension.
- **HN top story**: Signal band, center. Manrope 12px italic, stone-500. Reads: `"Demonstrate human effort" — 825 pts`. A one-line nod: the signal directly rhymes with the quote's argument that the soul must bring something to the instrument.
- **Music**: Signal band, right column. Manrope 12px, stone-400. `My Morning Jacket · Guided by Voices · The War on Drugs`.
- **Date / day**: Adjacent to nav in top-right corner of hero zone, Manrope 12px, stone-400. `Friday, June 12`.

## Self-Check
1. Hero quotability: Yes — "The soul without imagination is what an observatory would be without a telescope" is a standalone declaration that functions as a wall inscription, a poster, or a book chapter title; it earns marquee scale without needing context, and its observatory metaphor is made physically literal by tonight's 4.6% lunar illumination.
2. Because-of chain: Yes — the phrase's contemplative/scientific weight demanded warm amber (tool-light, not decoration), Bricolage Grotesque's expressive warmth over cold condensed industrial type, the Poster archetype to let the single declaration fill the space it deserves, and parchment stone background as the deliberate counter-gesture to five consecutive near-black builds, motivated directly by the 19th-century scientific-humanist register of the Beecher source.
3. Render feasibility: Yes — three lines at clamp(48px, 4.8vw, 72px) in Bricolage Grotesque weight 800 compute to ~69px at 1440px, with the longest line ("would be without a telescope.") spanning ~1140px against a 1267px usable content width (87.6vw after 6vw bilateral padding), and the hero zone at 88vh provides ~792px vertical space to comfortably center a ~250px text block.

## Rationale
The Beecher quote arrived fully loaded: it's not merely about imagination — it's about the relationship between a container (the observatory, the portfolio, the soul) and the instrument that makes the container meaningful (the telescope, the design system, imagination itself). A portfolio that tears down and reconstitutes its appearance every morning using environmental signals IS the observatory; the creative framework — the signal-reading, the phrase-selection, the color mandates — is the telescope. The quote operates on the site's own operating logic. The 4.6% waning crescent intensifies this: tonight the sky is dark enough to actually need one.

The Poster archetype was the only honest choice. The Beecher quote is a declaration, not an article — it doesn't want to be broken into a newspaper grid or catalogued into rows. It wants to occupy a field alone, at the scale it deserves, with nothing competing. The 88vh hero zone is that field. Bricolage Grotesque at weight 800 and `clamp(48px, 4.8vw, 72px)` has the expressive warmth this phrase needs — it's not Bebas's industrial authority or Anton's condensed headline confidence; it's something more personal, more variable, more like a person who reads star charts for pleasure and has opinions about the shape of letters.

The parchment stone background (#F5EDD9) is the most experimental decision in this build and the one most directly caused by the phrase. Five consecutive days of near-black darkness in the archive (crimson void, chartreuse near-black, violet void, navy void, indigo void) — going light is the genuinely unexpected move, and the Beecher register earns it. The amber H:36° accent falls in the only open window of the color mandate (28°–45°) and would have been chosen independently: it's the lamp-light that makes the observatory useful, the color of brass fittings and warm reading-room glow, the exact hue of the tool this quote is about. Everything demoted to corners — the Tigers 11–0 pill, the lunar crescent reading, the golf leaderboard — serves as evidence that the instruments are running, the signals are coming in, and the soul with imagination knows what to do with them.
