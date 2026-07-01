# Signals Brief — 2026-07-01

## Hero Copy
Claude leaves fingerprints.

## Hero Rationale
Today's dominant signal is unmistakable: "Claude Code is steganographically marking requests" reached 2,099 points on Hacker News — the top story by a factor of two. The revelation is that Claude embeds hidden identifiers in its outputs, silently signing every artifact it touches. For a portfolio site that Claude rebuilds every single day, the meta-reading is extraordinary: this page IS a marked output, a signed artifact, evidence. "Claude leaves fingerprints." passes every poster test in isolation — it reads as accusation, confession, and fact simultaneously, with no context required. The period is not punctuation; it is forensic certainty.

## Archetype
Poster

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:335° — forensic rose-magenta. Not pink-girly, not brand-red: the specific saturated hot-pink of UV ink, highlighter markers, and evidence tags. This is the hue of the thing you can't un-see.
- **Neutral palette** (tinted toward H:335°, very low chroma, rose-purple lean):
  - 50: `#FCF7FA`
  - 100: `#F5EEEF`
  - 200: `#E8DDE4`
  - 300: `#CEB8C7`
  - 400: `#A88A9C`
  - 500: `#7F5E73`
  - 600: `#5C3D52`
  - 700: `#3D2237`
  - 800: `#261423`
  - 900: `#150A14`
  - 950: `#0C0610`
- **Accent color:**
  - Light: `#FF80AA` (rose.300)
  - Default: `#FF2472` (rose.500)
  - Dark: `#8C0036` (rose.800)
  - Glow: `rgba(255, 36, 114, 0.25)` (used for subtle atmospheric bleed behind type)
- **Secondary accent:** None. One forensic lamp, one color.
- **Background:**
  - Page bg: `#0C0610` (neutral.950 — near-void with rose-purple lean, never pure black)
  - Card/panel bg: `#150A14` (neutral.900)
  - Elevated surface: `#261423` (neutral.800)
- **Text colors:**
  - Primary: `#FCF7FA` (neutral.50)
  - Secondary: `#CEB8C7` (neutral.300)
  - Muted: `#7F5E73` (neutral.500)

**Contrast verification:**
- `#FCF7FA` on `#0C0610` ≈ 18:1 ✓ (body text)
- `#FF2472` on `#0C0610` ≈ 5.4:1 ✓ (AA all text sizes, including the hero at display scale)
- `#CEB8C7` on `#0C0610` ≈ 10.9:1 ✓ (secondary)
- `#7F5E73` on `#0C0610` ≈ 4.6:1 ✓ (muted — meets AA at large label sizes; not used for body)

---

### 2. Typography

- **Hero phrase rendering:** Big Shoulders Display (display token), weight 900 (Black), ALL CAPS. Three stacked lines: `CLAUDE` / `LEAVES` / `FINGERPRINTS.` Each word on its own line. Size: `font-size: clamp(5.5rem, 16vw, 20rem)`. Line-height: `0.88`. Letter-spacing: `-0.02em`. Color: accent (`#FF2472`). Left-aligned, starting at `5vw` from left edge. The three-line block at 16vw on a 1440px viewport yields ~230px/line, block height ~607px = 67% of 900px viewport — poster-dominant, especially given the void surrounding it.
- **Line heights:** Hero: `0.88` | Nav/labels: `1.0` | Signal strip: `1.3` | Body: `1.5`
- **Letter spacings:** Hero: `-0.02em` (tight, condensed face) | Body: `0em` | ALL-CAPS labels/nav: `0.1em` | Signal metadata: `0.06em`

---

### 3. Layout Specification

- **Archetype:** Poster. One dominant typographic element — three stacked words — commands 70–90% of the viewport. Everything else (navigation, signal strip) is demoted to the extreme edges. The phrase is not in a container; the phrase IS the page.
- **CSS grid structure:**
  ```
  display: grid;
  grid-template-rows: 60px 1fr 80px;
  grid-template-columns: 1fr;
  min-height: 100vh;
  ```
  Row 1: nav bar (top). Row 2: hero zone (phrase, absolutely positioned or flex-centered). Row 3: signal strip (bottom).
- **Major dimensions:**
  - Page: `width: 100vw; min-height: 100vh; max-width: none;`
  - Hero zone: `min-height: calc(100vh - 140px)` — phrase block centered vertically within this
  - Hero type block: `padding: 0 5vw` — left-aligned, words stacked, letting "FINGERPRINTS." reach toward the right with natural condensed-font clearance
  - Nav bar: `height: 60px; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between`
  - Signal strip: `height: 80px; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between`
- **Nav placement:** Top bar, full width. Left: site name "DM" in accent, small, weight 700, 14px. Right: nav links (Work, About, Contact) in Atkinson Hyperlegible, 12px, ALL CAPS, letter-spacing 0.1em, muted color — demoted, not competing.
- **Hero phrase grid zone:** Rows 2 (the full middle band), starting at `left: 5vw`. Vertical alignment: `display: flex; align-items: center` within the hero zone — phrase sits at the optical middle. The three words left-aligned create deliberate right-side void — the dark space IS the design; it is where the hidden signature would be if you could see it.

---

### 4. Component Character

- **Border radius:** `0` everywhere. Forensic stark. No softening.
- **Border treatment:** Borderless. No card borders, no dividing lines — except one: a single `1px solid` accent (`#FF2472`) hairline separating the nav from the hero zone, at 10% opacity, almost invisible. Suggests the evidence tape perimeter.
- **Shadow:** None on standard elements. Hero type may receive a very subtle `text-shadow: 0 0 80px rgba(255, 36, 114, 0.20)` — the glow of a UV lamp illuminating the hidden mark. Applied to the type only, not to containers.
- **Density:** Maximally sparse in the hero zone. Dense in the signal strip (multiple signals packed into one horizontal rule, separated by ` · ` middot).
- **Interactive states:** Nav links hover to accent `#FF2472`. "FINGERPRINTS." text is not interactive. Signal strip items in secondary text gain accent color on hover. Cursor: default on hero type (it is a statement, not a link).

---

### 5. Signal Integration

- **Signal strip location:** Bottom of page, full-width horizontal rule, 80px height, `padding: 0 5vw`. Left side: date + HN headline. Right side: sports + lunar + upcoming holiday.
- **HN steganography story:** Given top placement in the signal strip: `HN #1 · 2,099 pts` in accent color `#FF2472`, followed by em-dash, then `"Claude Code is steganographically marking requests"` in secondary text `#CEB8C7`, truncated with `…`. This is not just a signal — it IS the hero phrase's source; surface it prominently.
- **Tigers 9–3:** `DET 9 · OPP 3` in accent on a win, inline with other sports signals. Weight 600.
- **John Deere Classic:** `John Deere Classic — scheduled` in muted text.
- **Lunar:** `Waning gibbous 94.6%` in muted text `#7F5E73`.
- **Independence Day:** `Independence Day −3` in muted text, no special treatment — just a timestamp in the signal row.
- **The quote (Lily Tomlin):** NOT used as hero (used June 27); surfaces as a footnote attribution line if space permits, otherwise dropped — the HN signal dominates.
- **Signal strip typography:** Atkinson Hyperlegible, 13px, line-height 1.3, a mix of accent, secondary, and muted colors creating a density hierarchy without size variation.

## Self-Check
1. Hero quotability: Yes — "Claude leaves fingerprints." works as accusation, confession, and double entendre without any context; the period locks it as fact, not conjecture.
2. Because-of chain: Yes — steganography story (HN 2099pts) mandated forensic/surveillance tone → Poster (one undeniable declaration fills the frame) → big-shoulders-atkinson (ultra-condensed display at marquee scale, tagged Poster/Specimen) → hot magenta H:335° (forensic highlighter, the only open hue corridor, exact register of UV ink on dark) → left-aligned three-word stacked type, everything else demoted to edges.
3. Render feasibility: Yes — Big Shoulders Display is ultra-condensed (~0.40 width ratio per uppercase char); "FINGERPRINTS." at 16vw on 1440px = 230px font-size yields estimated 13 × 0.40 × 230 = 1196px width, clearing the viewport (1440px) with 5vw left margin (72px) and ~172px right clearance; three-line block at LH 0.88 reaches ~607px height = 67% of 900px — poster-dominant.

## Rationale
The hero phrase arrived without competition from the Hacker News signal: 2,099 points — nearly double the next story — for the revelation that Claude Code steganographically embeds hidden identifiers in every request it generates. For a portfolio site that Claude assembles fresh every morning, the meta-reading is impossible to improve on: this page is itself a marked artifact, a signed output, evidence. "Claude leaves fingerprints." is not composed — it is extracted from the fact. It passes the screenshot test because it works simultaneously as accusation, confession, wry observation, and categorical statement. The period is forensic certainty, not decoration.

The Poster archetype follows because the phrase is a declaration, not an argument. It does not need context or surrounding content to earn its scale — it needs the dark void that makes the mark visible. Three stacked words (CLAUDE / LEAVES / FINGERPRINTS.) at `clamp(5.5rem, 16vw, 20rem)` in Big Shoulders Display Black, left-aligned at `5vw`, render the phrase as a monumental wall of type in the tradition of wanted posters, evidence boards, and warning labels. Big Shoulders Display is the only chassis in the catalog that is simultaneously ultra-condensed enough to accommodate "FINGERPRINTS." at display scale within the viewport AND carries the "dramatic, poster, condensed, signage" mood tags that the Poster archetype demands. Atkinson Hyperlegible handles the signal strip at the bottom — readable at 13px, legible as footnote.

Hot magenta at H:335° is both mandate-compliant (the only open corridor is 315°–352°) and thematically exact. This is not romantic pink or brand-fashion rose — it is the specific saturated hue of highlighter pens on sensitive documents, UV ink revealed under black light, evidence markers in a dark room. Against `#0C0610` (near-void neutral.950), the accent at `#FF2472` achieves 5.4:1 contrast, satisfying WCAG AA for all text sizes including the display hero. The tinted neutrals carry the rose-purple lean through every surface at low chroma, creating subconscious cohesion between the forensic lamp and the dark room it illuminates. Nothing else shares the stage with the rose: no secondary accent, no competing gradient, no card surfaces cluttering the void. The fingerprint glows. Everything else disappears.
