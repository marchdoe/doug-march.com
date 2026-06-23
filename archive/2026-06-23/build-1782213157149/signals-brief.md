# Signals Brief — 2026-06-23

## Hero Copy
Watch what you say,
and whatever you say,
practice it.

## Hero Rationale
Soyen Shaku's directive arrives from signals.quote on a quiet Tuesday — no holiday, no blowout score, no weather event. The absence of occasion is exactly why the quote fills the space: three clauses that fold back on themselves in recursive Zen logic (watch → say → practice → say → practice). It earns the stage not through spectacle but through precision. A portfolio is the practice of saying something with design and saying it again, differently, tomorrow — this phrase names that act.

## Archetype
Scroll

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue:** H:340° — rose-magenta, within the mandate window (322°–358°). This hue sits between love and wound, warmth and severity — the precise emotional register of a Zen imperative about disciplined speech. Every recent build has avoided this corridor; it is untouched and earned.
- **Neutral palette (ink family, rose-tinted throughout):**
  - ink.50: #FDF5F7
  - ink.100: #F5E8ED (primary dark-mode body text — 17.5:1 contrast on ink.900 ✓)
  - ink.200: #E8D0D8
  - ink.300: #C8A8B5 (secondary text, ~9:1 on ink.900 ✓)
  - ink.400: #A07A8A (muted/signal text, ~5:1 on ink.900 ✓)
  - ink.500: #7A5563
  - ink.600: #5A3A46
  - ink.700: #3D2130 (border token)
  - ink.800: #240E1B (card bg)
  - ink.900: #0F0308 (page bg — near-void, deep rose tint)
- **Accent:**
  - Light: #FFB3D1 (rose.200)
  - Default: #FF2878 (rose.500 — 5.7:1 contrast on ink.900; large hero text, 3:1 required ✓)
  - Dark: #A30047 (rose.700)
  - Glow: #FF8ABF (rose.300)
- **Secondary accent:** None
- **Background:** Page bg: #0F0308 — card bg: #240E1B — nav bg: #0F0308 at 90% opacity with backdrop-filter blur
- **Text colors:**
  - Primary text: #F5E8ED (ink.100)
  - Secondary text: #C8A8B5 (ink.300)
  - Muted text: #A07A8A (ink.400)
  - Hero phrase color: #FF2878 (rose.500 — large display text, 5.7:1 exceeds 3:1 threshold ✓)

---

### 2. Typography (chassis-derived)
- **Hero phrase rendering:** Display token at `clamp(56px, 9vw, 130px)` — Bricolage Grotesque ExtraBold (weight 800), left-aligned, broken into three natural clause lines. At 1440px wide, each line renders at ~130px. Line-height: 0.92 (tight, so three lines stack at ~360px total — comfortably within a 900px hero fold). Color: rose.500 (#FF2878). Letter-spacing: −0.03em. The blazing rose on near-void black is the design's single gesture — nothing competes.
- **Attribution below hero:** "— SOYEN SHAKU" in Manrope 500, 13px, ink.400, uppercase, letter-spacing 0.14em. Appears 40px below the phrase's last word.
- **Second-fold pull text (full quote reprinted at body scale):** Bricolage Grotesque weight 300 at `clamp(22px, 2.6vw, 38px)`, ink.300, line-height 1.35. Functions as a meditation — the declaration echoed at reading volume. Color deliberately muted vs. hero rose.
- **Section eyebrows:** Manrope 600, 11px, rose.700 (#A30047), all-caps, letter-spacing 0.14em. Used above signal cards and work sections.
- **Body text:** Manrope 400, 17px, ink.100, line-height 1.65. Line-height bumped from standard 1.5 to compensate for light-on-dark weight loss.
- **Subheadings:** Bricolage Grotesque 700, `clamp(18px, 2vw, 28px)`, ink.100, line-height 1.1.
- **Tabular signal data (leaderboard scores):** Manrope 600, 15px, `font-variant-numeric: tabular-nums`, ink.100.
- **Line heights:** Hero: 0.92 | Pull: 1.35 | Body: 1.65 | Subheadings: 1.1
- **Letter spacings:** Hero: −0.03em | Body: 0 | Eyebrows/attribution: 0.14em | Wide labels: 0.08em

---

### 3. Layout Specification
- **Archetype:** Scroll — single committed column, cinematic vertical pacing, one idea per fold. The Zen imperative does not want a grid or split or catalog. It wants to be descended into. Each fold is one breath. The act of scrolling mirrors the act the phrase instructs: sequential, deliberate, nothing skipped.
- **CSS structure:**
  ```
  .scroll-root {
    width: 100%;
    max-width: none;
  }
  .scroll-fold {
    width: 100%;
    padding: 0 6vw;
  }
  .fold-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 48px; /* nav height offset */
  }
  .fold-content {
    min-height: 60vh;
    padding: 96px 6vw;
  }
  ```
  No max-width on any fold. Horizontal padding is viewport-relative (`6vw`) throughout, creating breathing room that scales with the screen.
- **Major dimensions:**
  - Hero fold: `min-height: 100vh` — phrase vertically centered, phrase block begins at approx `padding-top: 15vh` from nav base
  - Nav: `height: 48px`, sticky top, full-width, `padding: 0 6vw`
  - Content folds 2–5: `min-height: 60vh` each, `padding: 96px 6vw`
  - Section spacing between major folds: 96px (hairline border dividers at each transition)
  - Max content width: none — `max-width: none`, viewport-relative side padding `6vw` everywhere
- **Nav placement:** Sticky top bar, `position: sticky; top: 0; z-index: 100`. Logo/site name left in Manrope 600 14px ink.100, page links right in Manrope 500 13px ink.400. Background: `background: rgba(15, 3, 8, 0.9); backdrop-filter: blur(12px)`. Full-width, 48px tall. Bottom border: 1px solid ink.700.
- **Hero phrase grid zone:** Fold 1 (100vh minus 48px nav). Left-aligned at `padding-left: 6vw`. Three stacked lines of Bricolage ExtraBold at `clamp(56px, 9vw, 130px)`. At 1440px: phrase block spans roughly 85% of viewport width, 360px in height. Vertically centered in the fold. Attribution 40px below. Fills approximately 50–65% of fold height — dominant but not cramped.

---

### 4. Component Character
- **Border radius:** 0 everywhere — no rounded corners. The palette and phrase are already emotionally warm; the geometry should be austere, precise, undecorated.
- **Border treatment:** Hairline — 1px `border-top: 1px solid ink.700` for fold transitions and project rows. Featured/hovered items get `border-left: 3px solid rose.500`. No decorative borders elsewhere.
- **Shadow:** None. Depth is expressed through darkness gradient between ink.900 bg and ink.800 card surfaces — the rose tint creates enough distinction. Exception: focus rings use `box-shadow: 0 0 0 2px rose.500`.
- **Density:** Spacious — unhurried fold heights, generous vertical rhythm. The page should feel like time worth spending.
- **Interactive states:** Project rows: `border-left: 3px solid transparent` → `3px solid rose.500` on hover, 200ms ease. Links: color ink.300 → rose.400 on hover, 150ms. Nav links: rose.700 → rose.500 on hover.

---

### 5. Signal Integration
- **Where signal elements live:** Fold 3 (third viewport, after hero and quote-echo folds). Two-column signal grid inside the single scroll column — left column: golf/sports; right column: tech/lunar/music.
- **U.S. Open (FINAL):** Top of left signal column. Eyebrow "U.S. OPEN — FINAL" in rose.700, all-caps, 11px. "Wyndham Clark" in Bricolage 700 at 22px, ink.100. Score "−4" in rose.500, tabular-nums, 28px. Top-5 leaderboard in Manrope 600, 13px, tabular-nums: Clark −4 / Burns −3 / Kim −1 / Poston E / Mitchell E. Footnote: "Clark holds for the second time." in Manrope 300 italic, ink.400.
- **Tigers win (5–3):** Below golf in left column. "TIGERS 5 · 3" — win/loss in Bricolage 600, rose accent left-border (3px rose.500). Date "JUN 22" in ink.400 eyebrow. Season record context as Manrope 400, ink.300.
- **Lunar phase:** Right signal column, top. "FIRST QUARTER · 66%" in Manrope 500, ink.300, with minimal half-circle SVG (1px stroke, rose.700, 18px diameter). Line-height loose.
- **HN headlines:** Right column, below lunar. "Steam Machine launches today" in Manrope 400, 14px, ink.300 — link color rose.500 on hover. Score "1612" in rose.700 inline. Secondary: "Crypto in 2026: Oh, This Is the Bad Place" in ink.400, 13px.
- **Music:** Bottom of right signal column. "Radiohead · Tobin Sprout" in Manrope 300 italic, 13px, ink.400. No styling beyond the italic — the names carry their own weight.
- **Quote display:** The hero phrase IS the Soyen Shaku quote — displayed in Fold 1 at marquee scale in blazing rose. In Fold 2, the full quote is reprinted at large pull-text scale in ink.300 Bricolage 300 as a second reading — quieter, more intimate, the echo of the declaration. Attribution "— Soyen Shaku" appears beneath both instances.

## Self-Check
1. Hero quotability: Yes — Soyen Shaku's recursive three-clause directive earns standalone posting; the rhythm folds back on itself in a way that compels a second read and a screenshot.
2. Because-of chain: Yes — Zen imperative of disciplined practice → Scroll (meditative descent mirrors the act of practice, one fold per breath) → bricolage-manrope (variable-weight warmth holds the declaration human-scaled) → rose-magenta H:340° (exertion color, within mandate window, austere heat contrasting the near-void ground) → spacious single-column cinematic pacing.
3. Render feasibility: Yes — Bricolage ExtraBold at clamp(56px, 9vw, 130px) across three left-aligned lines on 1440×900 yields lines of ~130px stacking to ~360px total height, fitting comfortably within the 100vh hero fold alongside the 48px sticky nav and attribution line.

## Rationale
The Soyen Shaku quote selected itself the moment the signals were scanned. No sports drama, no holiday, no weather event of note — just a quiet Tuesday in late June. The absence of occasion is precisely why the quote fills the space it does: "Watch what you say, and whatever you say, practice it" is a Zen directive that becomes a meta-statement about what this portfolio is. Every daily redesign is an act of practice — saying something with design, then saying it again, differently, tomorrow. The phrase's recursive structure (watch what you say → say it → practice it → and whatever you say → practice it again) mirrors the site's own logic. It earns its stage without needing a news peg.

The Scroll archetype follows because this phrase does not want a frame or a monument — it wants to be descended into. A Poster would treat it as precious. A Specimen would make it static. A Scroll makes the act of reading an enactment of the phrase's instruction: sequential, deliberate, one idea per fold. Bricolage Grotesque at ExtraBold weight carries the declaration at marquee scale (9vw, three stacked lines) with the warmth the source requires — the font's variable optical weight and open apertures keep a Zen directive human-scaled rather than carved-in-stone cold, which is exactly the difference between instruction and monument. Manrope beneath it provides quiet precision for everything the declaration stands above.

The rose-magenta palette at H:340° is the one honest corridor left open by the mandate (322°–358°), and it is both structurally forced and thematically earned. Rose-magenta is the color of exertion: the flush of sustained effort, the color of lips pressed together before speaking carefully. Against near-void ink-black (#0F0308 — not pure black, but deep rose-tinted so even the darkest surfaces belong to the same emotional family), the blazing rose.500 (#FF2878) creates visceral presence for the hero phrase without overwhelming the page's fundamental austerity. The five folds below descend through signal, work, and quiet — each fold one breath, nothing wasted, everything deliberate.
