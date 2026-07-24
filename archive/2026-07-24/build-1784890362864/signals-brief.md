# Signals Brief — 2026-07-24

## Hero Copy
Writing by hand is good for your brain

## Hero Rationale
Lifted from the #1 story on Hacker News today (Neal Stephenson, 1,329 points) — and it lands like a manifesto rather than a link. On a portfolio that tears itself down and re-writes itself by hand every morning, while the #2 story is Flux 3 automating everything, a defense of the analog, deliberate, handmade mind is exactly the thesis of the site. It is quotable in isolation, it argues a position, and it wants to be set like a manuscript, not shouted like a billboard.

## Archetype
Scroll

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification
- **Primary hue** — 8° vermillion red. This is the only clean corridor left by the mandate (2°–16°), and it happens to be the perfect reading of the phrase: red is the ink of the editor's hand, the fountain-pen correction, the marginal note. The literal color of writing by hand.
- **Neutral palette** (warm, tinted toward the red) — 50 `#FBF6F0`, 100 `#F5EDE3`, 200 `#E9DDCE`, 300 `#D8C7B2`, 400 `#B5A08A`, 500 `#8A7663`, 600 `#665748`, 700 `#473B30`, 800 `#2E2621`, 900 `#1A1512`
- **Accent color** — light `#DE5138`, default `#CE2E1A`, dark `#A9210F`, glow `#F07A5F`
- **Secondary accent** — none. One committed ink.
- **Background** — page bg `#FBF6F0` (paper), card/inset bg `#F5EDE3`, marginalia rail bg transparent (sits on paper)
- **Text colors** — primary `#1A1512` (ink charcoal), secondary `#665748`, muted `#8A7663`

### 2. Typography
- **Hero phrase rendering** — Spectral display, `clamp(56px, 8.5vw, 128px)`, left-aligned, set in 3 lines. Roman charcoal for "Writing / … is good for / your brain", with **"by hand" in Spectral italic, vermillion accent** — the red gesture lives inside the phrase, not around it. Attribution kicker in Albert Sans small-caps below.
- **Line heights** — hero `1.0`, section headings `1.1`, body `1.6`, marginalia `1.4`
- **Letter spacings** — hero `-0.015em`, body `0`, smallcaps/kicker `0.14em`

### 3. Layout Specification
- **Archetype** — Scroll. A statement about the deliberate, one-word-after-another act of handwriting must be *read down a page*, not scanned as a grid. The page becomes a hand-set manuscript: one committed reading column with handwritten glosses in the margin.
- **CSS grid/flex structure** — page: `display: grid; grid-template-columns: minmax(0, 1fr) 240px; column-gap: 4vw` (main reading column + right marginalia rail). On the hero fold the phrase spans both columns.
- **Major dimensions**:
  - Hero fold: `min-height: 88vh`, phrase block occupies ~70% of that height
  - Marginalia rail: `width: 240px`, right column, hairline-ruled left edge
  - Max content width: `max-width: none`; side padding `64px 6vw`; reading prose within folds pinned to `68ch`
  - Section spacing: `clamp(96px, 12vh, 160px)` between folds
- **Nav placement** — fixed **bottom rail**, full-width, `height: 60px`, flush radius-0, paper bg with a 1px ink top border; brand lockup left, three all-caps Albert Sans links right. (Fresh against the last 7 shells; answers the owner's "clean modern header" note by moving nav out of the top entirely.)
- **Hero phrase grid zone** — rows 1–2, columns 1–2 (full canvas width), top-aligned in the 88vh fold; intended render ~1150px wide × ~420px tall at desktop.

### 4. Component Character
- **Border radius** — `0` everywhere: cards, buttons, tags, rail. (Direct response to owner's rounded-corner complaint.)
- **Border treatment** — hairline `1px solid {colors.neutral.300}` rules only — manuscript ruling between folds and along the marginalia rail. Borderless cards.
- **Shadow** — none. Flat print object.
- **Density** — spacious hero and folds; marginalia compact and tight.
- **Interactive states** — links: charcoal → vermillion on hover with a `text-decoration: underline; text-underline-offset: 4px` red rule. Project rows: left ink rule thickens to 2px vermillion on hover.

### 5. Signal Integration
- **Where signal elements live** — the right **marginalia rail**, styled as handwritten glosses in vermillion small-caps labels with charcoal values, scrolling alongside the reading column like notes penciled in a book's margin.
- **Sports scores** — Tigers rendered `TIGERS 4–3` with the result `W` set in vermillion; golf `3M OPEN · KOHLES −9` with the score `−9` in vermillion. Tabular figures, Albert Sans.
- **Quote display** — the hero phrase IS the quote; attribution "NEAL STEPHENSON · HACKER NEWS · 1,329↑" set as an all-caps kicker beneath the marquee.
- **Other signals** — moon `WAXING GIBBOUS 80%`, sun `05:08 → 19:24`, day `FRIDAY`, music `GUIDED BY VOICES / WET LEG / RADIOHEAD` — all as margin glosses. A single wry margin note pins the day's tension: "on the same page: Flux 3" (the AI story handwriting is quietly arguing against).
- **Holiday** — none today.

## Self-Check
1. Hero quotability: Yes — it's a standalone argument someone would screenshot, not descriptive chrome.
2. Because-of chain: Yes — reflective literary phrase → Scroll (read down a page) → Spectral (the serif of the page) → red ink on warm paper → single reading column with handwritten margin glosses.
3. Render feasibility: Yes — 38 chars at 128px Spectral wraps to 3 lines within an 88vw column with headroom; no overflow at 1440×900.
4. Canvas floor feasible: Yes — hero fills 88vh and the two-column grid + marginalia rail carry content edge-relative, clearing the 65% Scroll floor comfortably at 70%.

## Rationale
The phrase came pre-written at the top of Hacker News: Neal Stephenson's "Writing by hand is good for your brain," 1,329 points, sitting one slot above Flux 3's video-action model. On a portfolio that is quite literally rewritten by an AI hand every night, a headline defending the slow, deliberate, analog mind is the day's whole argument — and it wants to be *read*, not shouted. That is why the archetype is a Scroll and nothing else: a statement about writing one word after another must run down a committed reading column, with the day's signals set as handwritten glosses in the right margin, the way you'd annotate a book you were arguing with.

Chassis follows the tone exactly. This is the one genuinely literary phrase in weeks — no athletic condensed shout would fit it — so spectral-albert (Spectral's transitional serif, the serif of the printed page, over Albert Sans for the glosses and rail) is the only honest pick, its 1.333 ratio permitted precisely because this phrase does not want to shout. The red gesture lives *inside* the marquee: "by hand" set in Spectral italic vermillion while the rest holds charcoal, so the accent argues the point rather than decorating it. Color obeys both mandate and metaphor — the only clean corridor left on the wheel is 2°–16°, and 8° vermillion is the literal ink of the correcting hand, bled into warm paper neutrals tinted toward the same red so the whole page reads as one manuscript.

Execution answers the owner's standing notes directly. Radius is zero on every surface — cards, rail, nav — killing the rounded corners they disliked. Navigation leaves the top entirely for a clean, flush **bottom rail** (fresh against seven days of spines, pills, and mastheads), with the colophon folded into it. And rather than a menu-picked layout, the form is dictated by the content: a phrase about handwriting becomes a hand-set page with margin annotations, the Tigers 4–3 win, Kohles at −9, an 80% waxing moon, and a dry "on the same page: Flux 3" all penciled down the edge like a reader's notes.
