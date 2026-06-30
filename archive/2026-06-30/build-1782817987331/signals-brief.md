# Signals Brief — 2026-06-30

## Hero Copy
Build. Work. Dream. Create.

## Hero Rationale
Earl Nightingale's imperative fragment from today's `signals.quote` is already a poster — four monosyllabic commands separated by full stops, each a complete sentence, building a rhythm that accelerates. For a portfolio site where the work IS the argument, this line is the exact manifesto. It doesn't describe the site; it commands the visitor. The period after "Create." is the door closing on any counter-argument. Last day of June, midsummer, risk weight 8/10: this is the phrase that wants to be loud today.

## Archetype
Stack

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:117°, S:89%, L:45% — the lone corridor in the mandate (102°–125°) after six builds. Thematically exact: this is chlorophyll, growth, midsummer verdure. Not web-green (#00FF00), not sage — charged, alive, slightly acid.
- **Neutral palette (forest-stone family, tinted H:120°, chroma ~0.01):**
  - 50: `#F3FFF6` · 100: `#E2F5E8` · 200: `#C4E8CF` · 300: `#95CCB0` · 400: `#66AB90` · 500: `#44896E` · 600: `#2E6A52` · 700: `#1C4D3A` · 800: `#0F3325` · 900: `#081B13`
- **Accent (hero band bg + dark-context highlight):**
  - Hero/bgHero: `#19D413` (H:117°, vivid)
  - Accent on dark: `#3AEC2E` (lighter, H:117°)
  - Accent light: `#6BF761`
  - Accent dark: `#10A50B`
- **Background:**
  - Page/dark bands bg: `#011509` (deep forest, near-black with green tint)
  - Card bg: `#02300A`
  - Hero band bg: `#19D413` (the drench)
- **Text colors:**
  - Primary text (on dark): `#F3FFF6` — near-white, green-tinted (~20:1 on `#011509`)
  - Secondary text: `#95CCB0`
  - Muted: `#44896E`
  - Text on hero band: `#011509` — deep forest on vivid green, ~10.4:1 ✓

### 2. Typography

- **Hero phrase rendering:** Anton (from `anton-inter-tight` chassis `display` token), four words stacked in a single left-aligned column. Each word on its own line. Size: `clamp(6.5rem, 13.5vw, 15rem)`. On 1440px viewport: 13.5vw = 194px × 4 lines × 0.88 line-height = ~683px total, fitting comfortably in the hero band's content area after nav.
- **Composition:** "BUILD." / "WORK." / "DREAM." / "CREATE." — all-caps (Anton is inherently display-caps). Color: `textInverse` (`#011509`) on `bgHero` (`#19D413`). Periods rendered in the same ink — the rhythm is in the stops, not the color.
- **Attribution line:** "— Earl Nightingale" immediately below "CREATE." — Inter Tight, 0.875rem, uppercase, letter-spacing: 0.14em, `textInverse` at 55% opacity, left-aligned, `padding-top: 2rem`.
- **Line heights:** Hero: `0.88`. Body: `1.5`. Section headers: `1.0`.
- **Letter spacings:** Hero: `-0.03em`. Label/small-caps: `0.10em`. Body: `0`. Muted metadata: `0.04em`.

### 3. Layout Specification

- **Archetype:** Stack — four imperatives as stacked words map perfectly to four horizontal full-width bands, each a distinct moment. The architecture of the layout echoes the grammar of the phrase: one idea per unit, no overlap, each complete.
- **CSS grid/flex:** `display: grid; grid-template-rows: 100vh auto auto;` — three bands stacked vertically.
- **Major dimensions:**
  - Band 1 (HERO): `min-height: 100vh`, `background: bgHero (#19D413)`. Full viewport width, `padding: 0 6vw`.
  - Band 2 (WORK): `min-height: auto`, `background: bg (#011509)`. `padding: 96px 6vw`.
  - Band 3 (SIGNALS): `min-height: auto`, `background: #02300A` (one step lighter than page bg). `padding: 72px 6vw`.
  - Max content width: `max-width: none` — full canvas at all viewports.
  - Side padding: `6vw` on all bands (never a fixed sidebar).
- **Nav placement:** Inline at top of Hero band — `display: flex; justify-content: space-between; align-items: center; padding: 24px 6vw; position: absolute; top: 0; left: 0; right: 0;`. Logo/name left in Inter Tight semibold, nav links right in Inter Tight sm uppercase letter-spaced. Both in `textInverse` (`#011509`) on the vivid green bg.
- **Hero phrase grid zone:** Hero band interior, vertically centered (`display: flex; flex-direction: column; justify-content: center; padding: 80px 6vw 48px`). The four stacked words occupy roughly 680px × 700px (at 1440 × 900 viewport), left-aligned. Attribution 2rem below final word.
- **Signal ticker:** Bottom 48px of Hero band — a dark overlay strip (`background: rgba(1,21,9,0.25)`) with ticker-style metadata in Inter Tight 11px, `textInverse`.

### 4. Component Character

- **Border radius:** Cards: `4px` (md). Buttons: `2px` (sm). Tags: `2px`. No rounding on hero elements.
- **Border treatment:** Borderless hero. Content bands use `1px solid border` (`#054F2A`) on work rows and dividers — the line as a structural element, not decoration.
- **Shadow:** None. The contrast between vivid green hero and deep forest content bands creates all the depth needed; shadows would be noise.
- **Density:** Spacious hero (single idea per fold), compact work band (projects as list rows with project name left, year/type right, `padding: 20px 0`, bordered rows).
- **Interactive states:** Links in dark bands → accent (`#3AEC2E`) on hover with underline. Project rows → subtle background lift to `bgCard`. Nav links → 80% opacity default, 100% on hover.

### 5. Signal Integration

- **Signal ticker at base of Hero band:** thin strip with: "Tigers 7–3 · Hovland −22 · Full Moon · July 4 in 4 days" — Inter Tight 11px, textInverse at 70%, tracking `0.08em`.
- **Golf results (Band 3 SIGNALS):** Travelers Championship final leaderboard: Hovland "−22" in `clamp(2.5rem, 4vw, 3.5rem)` Anton, accent green; Scheffler "−21" and Morikawa "−20" in smaller Inter Tight secondary text. Section header "TRAVELERS CHAMPIONSHIP · FINAL" in small caps, muted.
- **Tigers score:** "7–3 Win" in Inter Tight medium `1rem`, accent color, with opponent in secondary text beside it. Positioned inline in signals band.
- **Quote attribution:** The hero phrase IS the quote. Attribution "— Earl Nightingale" rendered as a caption directly beneath "CREATE." in the hero band.
- **Full moon:** "Full Moon · 98.4%" in signals band, stone.300 color, small Inter Tight, beside moon phase icon (unicode).
- **Independence Day:** "Independence Day — 4 days" in muted text, Inter Tight sm, at foot of signals band.
- **Awwwards "The Future In Black":** referenced in a "Seen Today" micro-strip at the bottom of the signals band — one-line callout in muted Inter Tight italic.

## Self-Check
1. Hero quotability: Yes — "Build. Work. Dream. Create." is four monosyllabic imperatives separated by full stops; it stands alone as a manifesto, demands no context, and earns a screenshot in isolation.
2. Because-of chain: Yes — the four-word stacked structure demands Stack (four bands, one idea per unit); Stack demands a condensed display face at marquee scale, pointing to `anton-inter-tight`; the summer verdure palette at H:117° amplifies the "alive/growth" register of the imperatives and satisfies the mandate's only open corridor.
3. Render feasibility: Yes — Anton at `clamp(6.5rem, 13.5vw, 15rem)` yields ~194px per word at 1440px; four lines at 0.88 line-height = ~683px total, well within a 100vh (900px) band after nav clearance.

## Rationale
The hero phrase arrived without competition from Earl Nightingale's quote in today's signals. "Build. Work. Dream. Create." is four monosyllabic imperatives separated by full stops — the grammar of a manifesto, not a sentence. Each word is a complete command. The rhythm accelerates (one syllable, one syllable, one syllable, two syllables, full stop). On the last day of June, with risk weight at 8/10, this phrase earns marquee scale not through drama but through conviction — it is the exact philosophy of a maker's portfolio rendered as pure language.

Stack was the only archetype that could honor the phrase's grammar without flattening it. The four imperatives ARE four bands: each word gets its own moment, its own vertical territory, its own line. The layout enacts what the words say. Anton at `clamp(6.5rem, 13.5vw, 15rem)` — from the `anton-inter-tight` chassis, which explicitly names Stack in its archetype affinities — renders each word at ~194px on 1440px wide. Four lines at 0.88 line-height stack to ~683px, fitting cleanly in the hero band's content area. Below the hero band, two dark forest bands carry the work catalog and signal data, creating maximum visual contrast between the vivid green first fold and the deep content that follows.

The color mandate forced the choice and the choice is exactly right: H:117° is the only open corridor (102°–125°) after six builds, and it is also the precise color of midsummer growth — chlorophyll, field, alive. The vivid green drench at `#19D413` against the deep forest near-black `#011509` of the content bands creates the Stack's "each band is a distinct moment" requirement structurally, not decoratively. Contrast ratios: imperatives on hero band 10.4:1, body text on dark 20.6:1, accent on dark 13.9:1 — all significantly above WCAG AA. The golf result (Hovland wins at −22) and Tigers victory (7−3) surface in the signals band beneath, earning their own Inter Tight treatment without competing with the phrase above.
