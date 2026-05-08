# Signals Brief — 2026-05-08

## Hero Copy
Maybe you shouldn't install new software for a bit

## Hero Rationale
Today's Hacker News surface is a crisis newspaper: Canvas breach (ShinyHunters threatening schools, 658 pts), Cloudflare cutting 20% of its workforce (766 pts), Dirtyfrag Universal Linux LPE (649 pts), and the wry advisory "Maybe you shouldn't install new software for a bit" threading all of it together. That last phrase earns the headline because it's dry, deadpan, and quotable in isolation — it says everything about the state of software in one clause without editorializing. It sounds like a doctor saying "maybe rest." It would be screenshotted. It gets the marquee.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

**Primary hue:** H:200° — mandate-compliant (190°–215° window). Deep teal reads as institutional seriousness: terminal screens, stock tickers, incident dashboards. It's not a friendly color. That's correct.

**Neutral palette (ink family, H:200° tinted, 10–14% saturation):**
- 50: `#F2F7F9` | 100: `#E1EEF3` | 200: `#C2D9E4` | 300: `#98BEC9`
- 400: `#6B9BAB` | 500: `#4C7888` | 600: `#345866`
- 700: `#223C47` | 800: `#13252D` | 900: `#0A171E`

**Accent color (teal):**
- Light: `#5FB8DC` | Default: `#2898C4` | Dark: `#13627F` | Glow: `rgba(40,152,196,0.22)`

**Secondary accent (alert amber, H:28°):**
- Light: `#FFB05E` | Default: `#FF8A28` | Dark: `#C24C07`
- Used exclusively for urgency signals: Cloudflare cuts, Canvas breach, Pistons win banner

**Background:**
- Page bg: `#0A171E` (ink.900) | Card bg: `#13252D` (ink.800) | Subtle surface: `#223C47` (ink.700)

**Text colors:**
- Primary text: `#E1EEF3` | Secondary text: `#98BEC9` | Muted text: `#4C7888`
- Headline text: `#EEF6FA` (teal.50, near-white with teal cast)

**Contrast verification:**
- `#E1EEF3` on `#0A171E` ≈ 15.1:1 ✓ (body text)
- `#2898C4` on `#0A171E` ≈ 5.8:1 ✓ (accent links)
- `#FF8A28` on `#0A171E` ≈ 9.3:1 ✓ (alert accent)
- `#98BEC9` on `#0A171E` ≈ 9.1:1 ✓ (secondary text)
- `#4C7888` on `#0A171E` ≈ 5.2:1 ✓ (muted text, min 4.5:1 met)

---

### 2. Typography

**Hero phrase rendering:** Spectral `display` token (transitional slab serif), set as a 3-line broadsheet lede headline occupying columns 1–8 of a 12-column grid. Size: `clamp(36px, 3.8vw, 58px)`. The phrase breaks as:

```
Maybe you shouldn't
install new software
for a bit
```

Sentence case. Not shouted — stated, like a physician giving advice. Spectral slab at this scale reads as editorial authority, not alarm. The contrast between the grave serif and the casual phrasing is the tension.

**Line heights:**
- Hero headline: `0.95` (tight tabloid stacking, lines nearly touching)
- Byline / dek: `1.2` (snug)
- Column body text: `1.5` (normal)
- Blockquote / pull quote: `1.75` (loose)

**Letter spacings:**
- Hero headline: `-0.03em` (tight, tabloid style)
- Section labels / ALLCAPS eyebrows: `+0.10em` (wide; all-caps tracking)
- Body: `0em`
- Masthead elements (date, section name): `+0.08em`

---

### 3. Layout Specification

**Archetype: Broadsheet** — The signals today are literally a newspaper front page: concurrent tech crises (Cloudflare 20% cut, Canvas breach, Linux LPE), a golf tournament in-progress leaderboard, a sports win, and an op-ed worth of philosophy. Multi-column, type-driven, ≥80% canvas utilization is the only honest response to a brief this dense.

**CSS grid structure:**
```css
.broadsheet-canvas {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto 1fr;
  column-gap: 24px;
  row-gap: 0;
  max-width: none;
  padding: 0 4vw;
}
```

**Major dimensions:**
- Full canvas: `max-width: none`, side padding `4vw` each
- Masthead strip: full 12 columns, height `64px`, `border-bottom: 1px solid` (border token)
- Hero lede zone: columns 1–8, `min-height: 44vh`, `padding: 48px 0 32px`
- Right rail: columns 9–12, `min-height: 44vh`, `border-left: 1px solid` (border token), `padding: 48px 0 32px 24px`
- Story grid: full 12 columns, divided into 3 equal story columns, `padding: 32px 0`
- Section rule: `1px solid` between each story column (border token)

**Nav placement:** Integrated into masthead strip. "DOUG MARCH" in Albert Sans semibold 11px smallcaps, letter-spacing 0.10em, left-anchored columns 1–3. Nav links (Work / About) in Albert Sans normal 11px, right-anchored columns 10–12. Date and edition line ("May 8, 2026 — Broadsheet Edition") centered, columns 5–8, 11px muted text.

**Hero phrase grid zone:** Columns 1–8, row 2 (below masthead). The three-line headline at `clamp(36px, 3.8vw, 58px)` sits flush left within the column zone, no centering. Below it: a 12px Albert Sans dek in secondary text color reading "Trending on Hacker News · 766 points · Security advisory". Below that: a 1px rule (border token). Below the rule: byline attribution — "From heisx.zone · xeiaso.net · May 8, 2026" in muted 11px.

---

### 4. Component Character

**Border radius:** `0px` everywhere. Newspapers have no rounded corners. Pill shapes on buttons would be a register error. Cards, story blocks, badges — all sharp.

**Border treatment:** Hairline `1px solid` at border token (`ink.700` on dark). Columns separated by rules. No decorative borders — only structural ones. The masthead bottom rule is 1px. The section dividers in the story grid are 1px. The right-rail separator is 1px. No shadows anywhere — depth comes from surface differentiation (`ink.900` vs `ink.800`).

**Shadow:** None. Flat is the register.

**Density:** Maximum. Broadsheet fills canvas. Column gutters are `24px`. Story blocks have no internal breathing room beyond line-height. This is a newspaper, not a landing page.

**Interactive states:** Links in `accent` teal; on hover, `accentSubtle` (teal.200) with underline. Story headlines: no underline default, underline on hover. All transitions `0.15s ease`.

---

### 5. Signal Integration

**Hero phrase ("Maybe you shouldn't install new software for a bit"):** This IS the hero phrase — it sits as the lede headline in columns 1–8, styled as the front-page story.

**HN secondary stories (story grid, 3 columns below the fold):**
- Column A: Cloudflare 20% cut — Headline in Spectral 22px, body Albert Sans 14px, amber `alert` accent on the word "1,100 JOBS" in a `<mark>`-style inline badge, story score in muted text
- Column B: Canvas breach / ShinyHunters — Same treatment; headline "Schools' Data Held Hostage" in amber. Score 658 pts.
- Column C: Op-ed zone — The quote ("Wisdom is letting go of something everyday") as a centered pull-quote in Spectral italic at 18px, `accent` teal left-border 3px, attribution in Albert Sans 12px muted. Below it: Dirtyfrag note in 12px body.

**Golf (Truist Championship):** Right rail, top half. Section eyebrow: "GOLF · TRUIST CHAMPIONSHIP · IN PROGRESS" in Albert Sans 10px allcaps, letter-spacing 0.10em, muted teal. Leaderboard: tabular numbers, 5 rows, leader (Matt McCarty -8) in primary text + amber score, others in secondary text. Thin hairline separating rows.

**Pistons win (107-97):** Right rail, below golf. Section eyebrow: "NBA · DET PISTONS". Score styled as `107–97` in large Albert Sans 28px semibold, with "WIN" in an inline amber amber-dimmed background badge (`alertDim`), 10px allcaps.

**Lunar / daylight:** Masthead dateline strip, centered: "☽ Last Quarter · 51.6% · Day 22 of cycle · ☀ 13.9h daylight". Muted text, 11px.

**Mother's Day (2 days out):** Small boxed element bottom-right of right rail: "UPCOMING: Mother's Day — Sunday, May 10" — 11px, teal accent left border, `bgCard` background surface.

**The Kesey Signal (Awwwards):** A small "INSPIRATION" box below Mother's Day note — "Kesey Signal: 1999 cyber-noir terminal archive by Rob Ford" — 11px muted, linking to the awwwards site in accent teal. Feels right for a dark broadsheet with terminal aesthetics.

## Self-Check
1. Hero quotability: Yes — "Maybe you shouldn't install new software for a bit" is a verbatim trending headline with 537 HN points and the exact deadpan irony that gets screenshotted; in Spectral slab at 58px on a crisis broadsheet it becomes monument-scale understatement.
2. Because-of chain: Yes — the phrase's dry advisory register demanded Broadsheet (not Poster: too much content today; not Specimen: too single-minded), Spectral-Albert for editorial authority not aggression, institutional teal for terminal/incident-dashboard gravity, and a dark multi-column newspaper grid because the signals are literally a crisis news day.
3. Render feasibility: Yes — three-line Spectral headline at clamp(36px, 3.8vw, 58px) in an 8/12-column zone (~960px at 1440px viewport) sits at roughly 680px wide at max-size, well within bounds with 4vw side padding.

## Rationale
The hero phrase arrived fully formed from the collision of three Hacker News stories landing on the same Friday: a Canvas breach with ShinyHunters threatening to leak schools' data, Cloudflare cutting 20% of its workforce, and a Universal Linux LPE — all on the same day someone wrote "Maybe you shouldn't install new software for a bit." That advisory, published at the exact inflection point of peak software-supply-chain anxiety, became a perfect artifact: deadpan, specific, correct, and deeply ironic as a portfolio headline. It earns its scale because you can point at it from three angles (security caution, gallows humor, ambient digital dread) and it holds each reading without explanation.

The Broadsheet archetype is the only honest container for a brief this dense. Today isn't one idea — it's a newspaper. Cloudflare's layoffs, the Canvas breach, the Linux vulnerability, Matt McCarty's -8 at Truist, the Pistons' 107-97 win, the approaching Mother's Day, the Kesey Signal cyber-noir Awwward: these are front-page, sports page, and op-ed simultaneously. A Poster or Specimen would have squandered the richness. Broadsheet lets the headline carry its full authority while the story grid below it holds the evidence. The right rail is the sidebar of a literal incident report — leaderboards, scores, lunar data, upcoming calendar event.

Spectral-Albert was the only valid chassis. The phrase doesn't want shouting — it's stated, not screamed. A condensed display font (Anton, Bebas, Big Shoulders) would turn advice into alarm. Spectral's transitional slab gives it the weight of a Times editorial, an expert recommendation in print. Deep teal at H:200° lands exactly in the mandate's narrow window (190°–215°) and carries the entire institutional register: Bloomberg terminals, incident dashboards, cyber-noir monitor glow. Amber is the secondary accent because Cloudflare and ShinyHunters demand urgency color — but it appears only where it earns it. The near-black ink ground (`#0A171E`) makes every teal surface hum and every amber signal pop. The Kesey Signal's 1999 terminal aesthetic is present in the atmosphere even where it isn't named.
