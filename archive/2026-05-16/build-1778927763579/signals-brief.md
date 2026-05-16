# Signals Brief — 2026-05-16

## Hero Copy
"Nurture the good qualities you want to have."

## Hero Rationale
From signals.quote — Paramahansa Yogananda. Three signals converge to make this the inevitable phrase: the new moon (0.002 illumination, day 0.46 of a new lunar cycle) marks a beginning; spring Saturday with 14.2 hours of daylight gives that beginning maximum light; both Detroit teams won (Pistons 115–94 blowout, Tigers 3–2). Cultivation, not consolation — the phrase is a directive to begin, which is exactly what a new-cycle Saturday in May demands. Quotable in isolation as daily discipline, as portfolio manifesto, as the sentence a person decides to live by before the weekend is over.

## Archetype
Scroll

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue — H:205° (cerulean)**
Chosen because H:205° sits cleanly in today's permitted zone (193°–218°), and is conceptually exact: the blue of still water and open sky, the color of clarity, of a spring morning with maximal daylight. It reads as purposeful without drama — the right register for a cultivation directive, not a command.

**Neutral palette — warm sand (tinted toward H:205°)**
A linen-warm off-white ground that participates in the cerulean palette through its slight cool-warm tension. Each step is tinted fractionally toward H:205° so the negative space coheres with the accent.
- 50: #F8F5F2 — page background
- 100: #EDE9E5 — card/section background
- 200: #D8D4CF — hairline borders
- 300: #BEB9B3 — dividers
- 400: #9B9690 — decorative-only muted elements
- 500: #797470 — tertiary labels
- 600: #5C5855 — muted body text (≥4.5:1 on stone.50)
- 700: #433F3D — secondary text (≥7:1 on stone.50)
- 800: #2D2B29 — heavy secondary text
- 900: #1A1815 — primary text / hero phrase

**Accent color — cerulean**
- Light: #C8E3F5 — selection highlight, tag background
- Default: #1272B2 — links, attribution, signal labels, cerulean period
- Dark: #0A4872 — hover states
- Glow: #1272B220 — subtle focus ring

**Secondary accent** — none. Single-accent discipline.

**Backgrounds**
- Page bg: #F8F5F2 (stone.50, warm paper)
- Card bg: #EDE9E5 (stone.100)
- Sidebar bg: n/a (no sidebar in Scroll)
- Signal section bg: #EDF4FB (cerulean.50 — a cool breath of air between folds)

**Text colors**
- Primary text: #1A1815 — hero phrase, headings, body
- Secondary text: #433F3D — project dates, signal labels
- Muted text: #5C5855 — attributions, footnotes, metadata

---

### 2. Typography (chassis-derived)

**Hero phrase rendering**
Bricolage Grotesque Display weight 800. Token: `display`. Scale: `clamp(48px, 6.5vw, 96px)`. Three lines left-aligned within the 88vw column, rendering as:

```
Nurture the good
qualities you want
to have.
```

The terminal period renders in cerulean.500 (#1272B2) — the only chromatic event in the hero phrase itself. All other phrase characters: stone.900 (#1A1815). Attribution line below in cerulean.500, 13px, all-caps, letter-spacing 0.10em.

**Line heights**
- Hero phrase (H1): 0.92 — compressed, monumental, no air between lines
- Section headings (H2): 1.10
- Body text: 1.60 — generous on a light ground (no dark-mode compensation needed)
- Signal labels: 1.3

**Letter spacings**
- Hero phrase: −0.03em (tight, compressed)
- All-caps labels / attribution: +0.10em (5–12% per spec)
- Body text: 0em (natural Manrope spacing)
- Small-caps eyebrows: +0.08em

---

### 3. Layout Specification

**Archetype: Scroll**
A single committed column of 88vw carrying one major idea per viewport fold — required by a phrase that needs space to breathe, not evidence around it. The Scroll creates a meditative rhythm: the phrase arrives alone, then the day's signals unfold below as the visitor moves through time.

**CSS structure**
```css
/* Page wrapper */
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: none;
}

/* Section column */
.section-inner {
  width: 88vw;
  margin: 0 auto;
  padding: 0;
}

/* Body text constraint (Scroll only) */
.body-text {
  max-width: 65ch;
}
```

**Major dimensions**
- Hero fold: `min-height: 100vh`, `display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 10vh`
- Nav: fixed top, height 64px, `width: 100%; background: #F8F5F2; border-bottom: 1px solid #D8D4CF`
- Signal fold: `min-height: 80vh; background: #EDF4FB; padding: 80px 6vw`
- Work fold: `padding: 80px 6vw`
- Capabilities fold: `padding: 64px 6vw; border-top: 1px solid #BEB9B3`
- Section-inner: `width: 88vw; margin: 0 auto` — no max-width cap on display elements
- Side padding: `6vw` each side (= ~86px on 1440px viewport)

**Nav placement**
Fixed top bar. Left: "doug march" logotype in stone.900, weight 700, 15px. Right: inline nav links (work · about · contact) in stone.600, 14px, letter-spacing 0.05em. No hamburger menu visible on desktop.

**Hero phrase grid zone**
Within the 88vw column, the hero H1 occupies the lower 55vh of the 100vh fold (bottom-anchored via flex-end). At 96px line-height×0.92 = 88.3px per line, three lines ≈ 265px total. Attribution occupies an additional 48px below (margin-top: 32px, line-height 24px). Full phrase block ≈ 313px, leaving ≈ 10vh gutter from fold bottom edge.

---

### 4. Component Character

**Border radius**
- Cards: 0px (none — the square geometry respects the contemplative, undecorated register)
- Buttons: 2px (sm)
- Tags/chips: 2px (sm)

**Border treatment**
Hairline only. `border: 1px solid #D8D4CF` (stone.200) for cards and section dividers. Signal fold uses a 2px left rule in cerulean.200 (#90C7ED) for signal items — a quiet structural accent.

**Shadow**
None. The light palette creates depth through color temperature differences between stone.50 and cerulean.50 backgrounds — no drop shadows needed.

**Density**
Spacious. The Scroll archetype dictates one idea per fold. Within sections, generous vertical padding between elements (32–48px between signal items).

**Interactive states**
- Links: color transitions from cerulean.500 → cerulean.700 over 150ms
- Project cards: `border-left: 2px solid transparent` → `border-left: 2px solid #1272B2` on hover, over 120ms
- Nav links: `opacity: 1.0` → underline in cerulean.500 on hover

---

### 5. Signal Integration

**Where signal elements live**
Signal fold (fold 2, below hero), rendered as a typographic inventory within the cerulean.50 (#EDF4FB) background band. Each signal item carries a left rule in cerulean.200.

**Sports scores**
Pistons WIN 115–94: rendered prominently — "PISTONS 115 · 94" in H2 Bricolage weight 700 at 32px, score delta "+21" in cerulean.500. Tigers WIN 3–2: same treatment at slightly smaller scale (26px). Both presented as a pair in the top signal block. PGA Championship: Maverick McNealy "−4" and Alex Smalley "−4" share the lead; rendered as a small leaderboard table in Manrope 14px with tabular-nums, scores in cerulean.500.

**The quote displayed**
The Yogananda quote IS the hero phrase — rendered as a full-bleed typographic declaration on the hero fold, not as a traditional blockquote. Attribution ("— Paramahansa Yogananda") is in cerulean.500, 13px, all-caps, letter-spacing 0.10em, immediately below the phrase.

**New moon**
Rendered in the signal fold as: "NEW MOON · 0%" in small-caps Manrope, 12px, stone.600, letter-spacing 0.08em. Placed as the first signal item, topmost in the fold — the new lunar cycle is the structural metaphor of today's design (begin, cultivate).

**Music signals**
Guided by Voices + My Morning Jacket rendered as: "NOW PLAYING" eyebrow (cerulean.500, 11px, all-caps) with band names below in Bricolage weight 600, 18px, stone.800. Placed in lower portion of signal fold.

**HN highlight**
"Project Gutenberg – keeps getting better" (951 pts) shown as a pull-aside within the signal fold: score "951" in Bricolage weight 800 at 28px cerulean.500, title in Manrope 14px stone.800 below it. Framed by a 1px cerulean.200 left rule.

**Saturday/spring/daylight**
"14.2 HRS DAYLIGHT · MAY 16" as a footer-line within the hero fold, stone.500, 11px, all-caps, letter-spacing 0.12em. Positioned bottom-left beneath the attribution, to the right of the new moon indicator.

## Self-Check
1. Hero quotability: Yes — "Nurture the good qualities you want to have." is a complete, self-contained directive quotable and screenshot-worthy in isolation; it earns its marquee scale as aphorism, manifesto, and seasonal directive simultaneously.
2. Because-of chain: Yes — new-moon/spring/growth energy → cultivation phrase → Scroll (phrase needs uninterrupted air, not evidence) → Bricolage (warm humanist voice, not a command-register condensed font) → cerulean on warm paper (spring sky clarity, not drama) → bottom-anchored hero with one idea per fold.
3. Render feasibility: Yes — Bricolage Grotesque at clamp(48px, 6.5vw, 96px) across 88vw on a 1440×900 viewport yields three clean left-aligned lines totaling ~265px height, comfortably within the 100vh hero fold with no overflow.

## Rationale
The hero phrase arrived from today's signal feed (Paramahansa Yogananda) and earned its place by landing at the exact intersection of three signal streams: the new moon (day 0.46 of a new lunar cycle — structurally, a beginning), spring Saturday with 14.2 hours of daylight (the longest-lit kind of beginning), and both Detroit teams winning (Pistons by 21, Tigers by one — fruit of cultivated effort). The phrase isn't consolation or decoration; it's a directive for a day that already has momentum. It's quotable in isolation as aphorism, as portfolio manifesto, and as the thing you tell yourself before noon on a Saturday in May.

The Scroll archetype was the only honest container. Every archetype that would have worked for a command — Poster, Specimen — would have isolated the phrase from all environmental evidence. But "Nurture the good qualities you want to have" is not a command to a stranger; it's counsel you read and then carry into the rest of the page. The Scroll creates a meditative procession: the phrase arrives in the full darkness of the hero fold (alone, large, bottom-anchored like something written on a wall), and then the day unfolds beneath it — signals, wins, projects, capabilities. The phrase remains the reason for all of it. Bricolage Grotesque is precisely right because it's warm and humanist at display weight, not the condensed-signage register of Anton or Bebas; the phrase sounds like a person speaking, not a billboard barking.

After five consecutive dark-mode designs (night-violet, night-olive, cordovan, terminal-void, deep-slate), the pivot to warm paper (#F8F5F2) and cerulean (#1272B2) is the boldest compositional move available. It doesn't feel like a stylistic choice — it feels like the sky clearing. The color mandate's narrow permitted window (193°–218°) landed directly on the blue of spring water and open sky, which is the conceptual palette for a cultivation directive on a long-daylight Saturday. The terminal period of the hero phrase renders in cerulean.500 — the only chromatic event in the entire H1 — so the full stop arrives as a signal: this sentence means something, the day is beginning, here is where to start.
