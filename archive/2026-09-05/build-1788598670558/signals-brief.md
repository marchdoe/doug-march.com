# Signals Brief — 2026-09-05

## Hero Copy
Mastery is a function of time and intense focus.

## Hero Rationale
Robert Greene's line is the day's `signals.quote`, and for a portfolio that tears itself down and rebuilds every night it reads as the site's own confession of method — not genius, not talent, but accumulated time and concentration. It lands two days before Labor Day, and the mastery-through-labor angle turns a holiday-weekend into a thesis instead of a decoration. It is genuinely the strongest quotable line today, and using it after yesterday's *composed* hero is not a streak — the mandate flagged none.

## Archetype
a focus target — poster logic bent into a radial

## Composition
columns: irregular-twelve
axis: radial
symmetry: symmetric
hero_zone: center
density: crowded
rhythm: accelerating
shell_posture: standard
field_ratio: drenched

## Composition Rationale
The phrase is "intense focus," so the page converges: a radial axis with a symmetric center hero makes focus literal, and crowded orbit rings on an irregular-twelve grid turn "a particular field of knowledge" into the packed field around a calm eye. I moved `shell_posture` off the suggested `none` to `standard` because the owner has graded the site down three times for a missing brand mark — a header must exist — and I moved `symmetry` off the suggested `mirrored` to `symmetric` because concentric focus is inherently balanced about its center, not reflected across an axis.

## Chassis
source-serif-text

## Visual Specification
### 1. Color Specification
- **Primary hue** — 40° burnished amber/marigold. Held within the mandated 40–80° warm corridor; it sits between the recent 46° and 78° neighbors (16° from each, the least-recently-used slot in a 40-wide range). I differentiate from the recent warm floods on FORMULA (radial duotone, not flat drench/void/split) and COMPOSITION (radial concentric), per the audit that says formula sameness beats hue distance.
- **Neutral palette (warm espresso, tinted toward 40°)** — 50 `#FBF3E4`, 100 `#F5E7CC`, 200 `#E9D4A6`, 300 `#D6B776`, 400 `#BC9048`, 500 `#96692C`, 600 `#71491A`, 700 `#513313`, 800 `#35210C`, 900 `#1F1305`
- **Accent color** — light `#F1B948`, default `#A9620A`, dark `#7E470A`, glow `#E7A31F`
- **Secondary accent** — none. One hue at volume, committed.
- **Background** — page (honey field) `#F1B948`, card/surface (warm cream) `#FBF3E4`, field/focal core (bronze) `#7E470A`
- **Text colors** — primary `#1F1305`, secondary `#513313`, muted `#71491A`; reversed marquee ink on the bronze core `#FBF3E4`

### 2. Typography
- **Hero phrase rendering** — Source Serif 4 at the `hero` ramp step (fluid clamp topping ~96–104px at 1440), centered in the focal zone, wrapping to three short returns ("Mastery is a / function of time / and intense focus."), reversed cream out of the bronze radial core so it reads as the lit center of the field.
- **Type treatment** — single-face book voice; `hero` marquee → `sm` small-caps eyebrow ("Not genius or talent.") set with 0.09em tracking above the marquee → `md` attribution ("— Robert Greene, *Mastery*") → `base` body held to 62–66ch at 1.55 leading in the orbit rings → `xs` tabular captions for signals. The mid-scale eyebrow + attribution spend the middle of the ramp so the page is never "big title then default text."

### 3. Layout Specification
- **Composition** — `irregular-twelve · radial · symmetric · center · crowded · accelerating · standard · drenched`. The phrase is *intense focus*; a radial field converging on a centered marquee makes focus literal, and the concentric orbit of signals turns "a particular field of knowledge" into the packed rings around the eye.
- **CSS grid/flex** — `display: grid; grid-template-columns: repeat(12, 1fr); place-items: center;` with a radial background `radial-gradient(circle at 50% 46%, #7E470A 0%, #A9620A 22%, #E7A31F 52%, #F1B948 100%)`. Orbit rows are absolutely/grid-placed at increasing radius; the marquee spans cols 3–10.
- **Major dimensions** — hero/focal area `min-height: 92vh`; no fixed sidebar; **max-width: none**, side padding `clamp(48px, 5vw, 96px)`; body columns capped at 62–66ch inside their orbit blocks; vertical intervals shrink toward the base (accelerating: 96px → 64px → 40px → 24px).
- **Nav placement** — corner cluster, top-left: mark + wordmark, three small-caps links (work · about · contact) tucked under the wordmark. Header height ~64px, no band, no border, not the rejected top-bar-links-right pattern.
- **Hero phrase grid zone** — rows 4–7, columns 3–10, dead-centered in the viewport with clearance on all four sides; rendered at `clamp(60px, 8vw, 104px)`.

### 4. Component Character
- **Border radius** — cards 0, buttons 0, tags 0. Only the circular brand mark is round (radii.full). Owner-flagged: no rounded corners anywhere.
- **Border treatment** — hairlines in `border` (`#BC9048`) between orbit rings; `borderStrong` for the base colophon rule. Inside the bronze core, `fieldBorder`.
- **Shadow** — none. Depth is value (bronze core vs honey rim), never shadow.
- **Density** — crowded: signal rings packed to the edge as texture, calm only at the eye.
- **Interactive states** — links shift to `accent` and underline on `_hover`; no motion beyond a single staggered radial reveal on load.

### 5. Signal Integration
- **Signal placement** — the day's data IS the orbit: signals ring the marquee at increasing radius, densest toward the base.
- **Sports** — Tigers 6–7 loss set in tabular `xs`, muted brown (`textMuted`), a small down-tick — a close loss, stated plainly, not lit.
- **Quote** — the quote IS the hero marquee; the full Greene line lives as the `md` attribution deck beneath it.
- **Holiday** — Labor Day (Sep 7, 2 days) gets a one-line callout tying labor to the mastery creed — the reason this phrase runs today.
- **Music** — Wet Leg · My Morning Jacket · Radiohead folded into the base colophon as standing rotation ("on rotation"), never presented as an event beside the score.
- **Other** — SPY −0.39% (muted down-tick), last-quarter moon at 33% rendered as a small waning-disc glyph echoing the concentric rings, Biltmore Championship "tees off" (scheduled), AQI Good / clear 73° Aldie as a micro weather line, GitHub stars as a quiet "watching" line — all in the outer ring, tabular `xs`.

## Self-Check
1. Hero quotability: Yes — "Mastery is a function of time and intense focus." is a standalone aphorism, screenshot-worthy without any surrounding copy.
2. Because-of chain: Yes — focus → radial convergence → centered marquee → a single bookish serif that reads like a page of a field of knowledge → a burnished-amber field that concentrates where focus does.
3. Render feasibility: Yes — 8 words at ~96px Source Serif wrap to three centered lines inside cols 3–10 at 1440×900 with clearance, no overflow.
4. Canvas floor feasible: Yes — crowded orbit rings + a drenched radial field fill 82%+ of the viewport as designed texture.

## Rationale
The phrase is a quiet, contrarian creed — mastery is not genius or talent, it is time and intense focus — and the honest word inside it is *focus*. That single word decides the whole composition: the page converges. A radial axis with a symmetric center hero makes focus literal, the marquee sits in the calm eye, and the day's signals orbit it in concentric rings that pack denser toward the base (crowded, accelerating), turning "a particular field of knowledge" into the busy field around the point of concentration. I invoke the Max-Risk License to break one named brand-lane anti-pattern — **"Don't default to centering everything"** / a centered hero reads as template — deliberately, because a phrase about *intense focus* demands radial convergence on a single center, and a target-diagram of orbiting signals is the opposite of an icon-title-subtitle stack. Everything else stays fully compliant.

Chassis follows the register, not the loudness ladder. A literary aphorism about study should not be shouted off a condensed billboard, so I reached past the recently-worn display faces for **source-serif-text** — one optically-sized serif running display and body alike. A single book voice is the strongest possible answer to the standing "display and body must share a skeleton" complaint (here they are the same face), and it reads like a page from a book of mastery, which is exactly what "field of knowledge" wants. Its quiet 96px hero is the point: reserved marquee scale for a reflective line.

Palette commits to one hue at volume — burnished amber at 40°, inside the mandated 40–80° corridor — but escapes the recent warm-flood monoculture on FORMULA rather than hue. The ground is **duotone**: a radial gradient concentrating from honey at the rim to bronze at the core, two warm hues carrying the page with no neutral void, fresh against the recent dark-void, drench and split-field. The marquee reverses cream out of the bronze core so the phrase is the lit center of the field — focus, as pigment. On a drenched amber ground the green-and-blue mark would fight the field, so the Brand Contract's honest answer is single-color; radii are zero everywhere but the mark, the header is a clean corner cluster (never the thrice-rejected top-bar), and every signal from the Tigers' close 6–7 loss to the Labor-Day tie-in lives in the orbit rings as tabular texture.
