# Signals Brief — 2026-05-13

## Hero Copy
We are willing to believe anything other than the truth.

## Hero Rationale
Carlos Ruiz Zafón's line arrived in today's signal feed and earned immediate marquee status: nine words, zero hedging, a complete and barbed argument in a single sentence. Against today's evidence — Tigers crushed 2–10, a nearly moonless sky at 7% illumination, the waning crescent dragging spring into shadow — the quote becomes darkly structural. A personal portfolio site that rebuilds its own design daily by reading environmental signals is, in itself, a statement about what we choose to see. The Zafón line holds that irony without explanation.

## Archetype
Split

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue** — H:345° (crimson/deep rose). Outside the forbidden 5°–325° zone. Chosen because truth and blood share a color; the Zafón quote is a wound, not a decoration.

**Neutral palette** — cordovan stone, tinted H:340° throughout:
- 50: `#FAF0F3`
- 100: `#EDD8DF`
- 200: `#D4B8C1`
- 300: `#B594A0`
- 400: `#91707E`
- 500: `#6D4E5C`
- 600: `#503543`
- 700: `#371F2D`
- 800: `#22101A`
- 900: `#130910`

**Accent color** — crimson:
- light: `#FF7AAD` (crimson.300)
- default: `#F04882` (crimson.400)
- dark: `#CC2060` (crimson.500)
- glow: `rgba(240, 72, 130, 0.18)`

**Secondary accent** — none. Single chromatic event only.

**Background** —
- Page bg (left panel): `#130910` (stone.900)
- Card/right panel bg: `#22101A` (stone.800)
- Sidebar bg: `#22101A` (stone.800)

**Text colors** —
- Primary text: `#FAF0F3` (stone.50) — 17:1 on stone.900
- Secondary text: `#B594A0` (stone.300)
- Muted text: `#6D4E5C` (stone.500)

---

### 2. Typography (chassis-derived)

**Hero phrase rendering** — `display` token, `clamp(44px, 5.8vw, 84px)`, Bricolage Grotesque at weight 700 (max variable axis). The quote renders across 3–4 lines in the left panel (~835px effective width at 1440), filling approximately 60–70% of the panel's vertical height. No letter-spacing manipulation — Bricolage's natural tracking at this weight is sufficient. The author attribution renders beneath the quote in `sm` scale (`clamp(13px, 1vw, 15px)`) in crimson.400, preceded by an em-dash.

**Line heights** —
- Hero (quote): `0.93` — tight stacking, each line leans into the next
- Attribution: `1.3`
- Body/right panel content: `1.55`
- Signal labels: `1.2`

**Letter spacings** —
- Hero: `-0.02em` (Bricolage at heavy weight benefits from slight compression)
- Body: `0em`
- Nav/labels (smallcaps): `0.08em`
- Signal data headers: `0.12em`

---

### 3. Layout Specification

**Archetype** — Split. The aphorism is a complete, self-contained argument that demands its own half of the canvas; the other half holds the evidence — the signals that prove or disprove the claim. Neither half is decorative; both are active surfaces.

**CSS grid/flex structure** —
```css
display: grid;
grid-template-columns: 58fr 42fr;
min-height: 100vh;
max-width: none;
```

Left panel: `position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; padding: 64px 48px 64px 6vw;`

Right panel: `min-height: 100vh; overflow-y: auto; padding: 32px 6vw 80px 48px; display: flex; flex-direction: column; gap: 48px;`

**Major dimensions** —
- Left panel: `height: 100vh; width: 58vw` — sticky, the quote never scrolls away
- Right panel: `min-height: 100vh; width: 42vw` — scrollable, signals and work below the fold
- Max content width: `none` — full-canvas, viewport-relative padding only (6vw sides)
- Quote block within left panel: centered vertically with ~10vh top offset to feel slightly raised

**Nav placement** — Top of right panel, horizontal inline list: `display: flex; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid border`. Items: Work · About · Contact. Small (`12px`), wide letter-spacing (`0.1em`), muted text color. Site name as logo wordmark sits above nav in the right panel's top-left, `16px` medium weight.

**Hero phrase grid zone** — Left panel, vertically centered, `padding: 0 48px 0 6vw`. The quote occupies rows 2–8 of a 10-row flex column: row 1 is a decorative opening mark (quotation mark, crimson, `80px`, opacity 0.2), rows 2–8 are the phrase text, row 9 is the attribution, row 10 is free space. Total quote block: approximately `70vh` tall.

---

### 4. Component Character

**Border radius** — none (`0`). This design has no rounding. Cards: `border-radius: 0`. Buttons: `border-radius: 0`. Tags: `border-radius: 0`. The geometry is hard and architectural.

**Border treatment** — `1px solid {colors.stone.700}` on right panel separators, project rows, and signal rows. No box borders on the quote side — only the vertical divider between panels: `border-right: 1px solid {colors.stone.700}` on the left panel.

**Shadow** — none. Depth comes from background differentiation (`stone.900` vs `stone.800`), not shadow.

**Density** — Left panel: spacious and monastic. Right panel: compact, deliberately information-dense — `gap: 24px` between signal sections, `gap: 16px` between project rows.

**Interactive states** — Project links: `color` transition from `textSecondary` to `accent` on hover, 150ms ease. Nav links: `opacity: 0.7` → `opacity: 1`. No background highlights, no rounded hovers — the design language is text-based transitions only.

---

### 5. Signal Integration

**Where signal elements live** — All in the right panel, below nav, in a signal section before the work list. Signals are labeled in smallcaps muted text and given sparse treatment.

**Sports scores** — Tigers `2–10` loss: displayed as a score line — `DET` in muted stone.400, the score `2–10` in crimson.500 (the loss color earns the accent), `W·STL` in stone.400. Small label above: `MLB · MAY 12` in stone.500 at `0.12em` tracking. PGA Championship: `PGA CHAMPIONSHIP · STARTS TODAY` in stone.400 with no scores yet — treated as an upcoming event note.

**Quote display** — The Zafón line IS the hero phrase, rendered at full marquee scale in the left panel. Attribution `— Carlos Ruiz Zafón` in crimson.400 beneath it. In the right panel, a short reference note in stone.500 at `12px`: `signals.quote`, as editorial provenance.

**Holiday elements** — None today.

**Signal treatments** —
- Lunar waning crescent (7%): `◐ waning crescent · 7%` in stone.500, `12px`
- Music: `GUIDED BY VOICES · MY MORNING JACKET · THE WAR ON DRUGS` in stone.400 at `11px`, tracking `0.08em`
- HN top: `"Googlebook" · 798 pts` with small HN orange dot (`#FF6600`, 6px circle) — the one moment a non-crimson hue appears, and only at 6px
- Awwwards: `The Power of Storytelling · SOTD` in stone.400, `11px`
- Daylight: `14.1h daylight · 05:04 → 19:08` in stone.500

Every signal line follows the same pattern: label in stone.500 at `0.1em` tracking, value in stone.300. The overall right panel reads as: nav → provenance note → signals block → work list → capabilities footer.

## Self-Check
1. Hero quotability: Yes — "We are willing to believe anything other than the truth." is attributed to a major literary voice, stands entirely alone as an argument, and is the kind of line someone screenshots from a novel.
2. Because-of chain: Yes — the aphorism's self-sufficiency demanded a panel that could hold it undisturbed (Split left), its literary weight called for Bricolage's warm-expressive grotesque over a cold condensed slab, and crimson at H:345° is the only color that rhymes with "the truth" as a wound.
3. Render feasibility: Yes — Bricolage Grotesque Bold at clamp(44px, 5.8vw, 84px) across ~835px effective width at 1440 renders the quote in 3–4 lines filling ~65% of the left panel's height with no overflow.

## Rationale
The Zafón quote arrived in the signal feed with immediate authority — nine words, no hedging, a complete epistemological argument that works equally as literary aphorism, portfolio manifesto, and dark commentary on a Tuesday when the Tigers got blown out 2–10 and the moon has almost entirely disappeared. For a site that literally rebuilds itself daily by reading environmental signals, the irony is structural: the design mechanism IS an act of perception, of choosing what to see. The phrase earns marquee scale because it names the thing the site quietly does.

The Split archetype is the only honest container for a self-sufficient aphorism. A Specimen would inflate the phrase and delete all evidence. A Poster would do the same. The Split keeps the assertion undiluted on the left while insisting the right panel carry the weight of the world it came from: the Tigers loss, the near-new-moon dark, the HN crowd's current obsessions, the music playing. The phrase makes its claim; the right panel presents the record. Left panel is sticky — the quote stays visible as the visitor scrolls through the evidence, which is the design's single compositional argument.

Bricolage Grotesque creates productive tension: it's warm, expressive, brand-driven — a humanist grotesque — rendering what is essentially a wound of a sentence. A condensed display font (Anton, Bebas) would have turned Zafón into a headline. Bricolage turns it into something spoken. Crimson at H:345° is outside the forbidden 5°–325° zone and earns its presence by being the only chromatic event on the page — it appears as the author attribution color, as the Tigers loss score, as the single accent that says "this cost something." Near-black cordovan stone (`#130910`) as the ground participates in the palette even at maximum darkness because it's tinted toward H:340° throughout.
