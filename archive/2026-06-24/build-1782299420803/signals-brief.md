# Signals Brief — 2026-06-24

## Hero Copy
Who can say for sure that one will live to see tomorrow.

## Hero Rationale
The Tibetan Proverb from today's quote signal earns the front page not because it's dark, but because it's alive — a meditation on impermanence that doubles as a manifesto for a portfolio site that reconstitutes itself every morning. A site that redesigns daily is already practicing the proverb: today's build is the only version that will ever exist in this form. The phrase stands completely alone. It asks a question that isn't really a question. And on a Wednesday in late June — 14.7 hours of daylight, waxing gibbous moon at 76%, summer in full build — it makes the case for presence rather than dread.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

**Primary hue:** H:72° (chartreuse / yellow-green). This is the only open corridor in the mandate (58°–85°) and it earns its spot thematically: chartreuse is the color of maximum biological vitality — leaf at peak summer, the green of things intensely alive — which is the honest color of a proverb about not wasting today.

**Neutral palette — ink (H:75°, very low saturation, tinted toward chartreuse):**
- 50: `#EEEFD9` — off-white with faint yellow-green breath
- 100: `#DADEC6`
- 200: `#B8BD9A`
- 300: `#959A72`
- 400: `#727851`
- 500: `#545935`
- 600: `#3A3F21`
- 700: `#252A13`
- 800: `#161A0B`
- 900: `#0C0E08` — page background: near-void, ink.900

**Accent color (chartreuse.300):**
- Light: `#F0FFB8`
- Default: `#C8F000`
- Dark: `#8AAA00`
- Glow: `rgba(200, 240, 0, 0.15)`

**Secondary accent:** None. One dominant accent, committed at full saturation.

**Backgrounds:**
- Page bg: `#0C0E08` (ink.900 — inverted broadsheet, night edition)
- Card bg: `#161A0B` (ink.800)
- Sidebar bg: `#161A0B` (ink.800)
- Masthead bg: `#080A05` (slightly darker than page, creates the masthead bar)

**Text colors:**
- Primary text: `#EEEFD9` (ink.50 — off-white with yellow-green cast, reads as warm press paper under lamp)
- Secondary text: `#B8BD9A` (ink.200)
- Muted text: `#727851` (ink.400)
- Headline / hero: `#C8F000` (chartreuse.300 — electric, full saturation)

---

### 2. Typography (chassis: spectral-albert)

**Hero phrase rendering:** The 13-word proverb breaks across three lines at `display` token size — `clamp(44px, 5vw, 78px)` — using Spectral Bold. Lowercase/sentence case preserved (not all-caps); the literary register of Spectral calls for natural case, not monument shouting. Line height: `0.95`. The phrase reads as a banner headline in a literary broadsheet, not a propaganda poster. Color: chartreuse.300 (`#C8F000`).

Three-line break:
```
Who can say for sure
that one will live
to see tomorrow.
```

Trailing period preserved — this is not an ellipsis, it is a full stop.

**Column headline type:** Albert Sans Semibold, `clamp(11px, 0.9vw, 14px)`, all-caps, letter-spacing `0.12em` — newspaper column heads.

**Body / column copy:** Albert Sans Regular, `clamp(13px, 0.95vw, 15px)`, line-height `1.55`, letter-spacing `0em`. Dense column text, readable at tight measure.

**Masthead type:** Albert Sans Bold, `clamp(18px, 1.6vw, 26px)`, all-caps, letter-spacing `0.1em` — newspaper nameplate.

**Deck / attribution:** Spectral Regular Italic, `clamp(13px, 1vw, 16px)` — "— Tibetan Proverb" set italic, muted color (ink.300 `#959A72`), follows the hero phrase.

**Line heights:**
- Hero phrase: `0.95`
- Masthead: `1.0`
- Column body: `1.55`
- Column heads: `1.2`

**Letter spacings:**
- Hero phrase: `-0.01em` (Spectral's natural tracking at display size)
- Column heads (allcaps): `0.12em`
- Masthead (allcaps): `0.10em`
- Body: `0em`

---

### 3. Layout Specification

**Archetype: Broadsheet.** The proverb is a headline — a daily report on what is true today. The Broadsheet makes the site into today's edition: the hero phrase as banner headline, columns below as the day's stories (work, biography, signals). Every daily build is one issue; this one will not be repeated. The density of newsprint against the inverted dark background creates the experimental gesture the brief demands.

**CSS grid/flex structure:**

```
MASTHEAD ROW: display: flex; justify-content: space-between; align-items: baseline; padding: 14px 5vw; background: #080A05; border-bottom: 2px solid #C8F000;

HEADLINE AREA: padding: 40px 5vw 28px; max-width: none; border-bottom: 1px solid #252A13;

COLUMN GRID: display: grid; grid-template-columns: 2.2fr 1fr 1fr; gap: 0; padding: 0 5vw; max-width: none;
  Each column: padding: 24px 20px 32px; border-right: 1px solid #252A13; (last column: no right border)

FOOTER STRIP: display: flex; justify-content: space-between; padding: 12px 5vw; border-top: 2px solid #252A13;
```

**Major dimensions:**
- Masthead height: `~52px` (fixed, slim)
- Headline area height: `min-height: 22vh`
- Column grid height: fills remaining viewport to ~100vh total, continues with natural scroll
- Max content width: `none` — full viewport, 5vw side padding only
- Column 1 (work): `2.2fr`
- Column 2 (about + capabilities): `1fr`
- Column 3 (signals): `1fr`

**Nav placement:** Integrated into masthead bar. Left: "DOUG MARCH" nameplate. Center: thin `·` — "WED 24 JUNE 2026". Right: nav links in Albert Sans 12px allcaps — "Work · About · Contact" — spaced 20px apart.

**Hero phrase grid zone:** Headline area, full width (5vw padding each side, no column break). Spans 100% of the content width between padding. Three-line display block, vertically centered in a `min-height: 22vh` zone. Left-aligned (not centered — newspapers are left-aligned). Followed by 16px rule, then italic attribution in ink.300.

---

### 4. Component Character

**Border radius:** `0px` everywhere. Broadsheets have no rounded corners. Cards, tags, and buttons are rectangular — the grid IS the border.

**Border treatment:** Thin `1px` rules in ink.700 (`#252A13`) between columns, ink.600 (`#3A3F21`) for card separators within columns. The masthead/headline boundary: `2px solid #C8F000`. Footer boundary: `2px solid #252A13`. No box shadows — the grid is the structure.

**Shadow:** None. Depth comes from color and rule weight, not shadow.

**Density:** Compact. This is newsprint. Body text at 14–15px, column heads at 12–13px, all-caps. Spacing between column items: 16px. Between sections within a column: 24px.

**Interactive states:** Links in chartreuse.300 (`#C8F000`). Hover: chartreuse.100 (`#F0FFB8`) with `transition: color 0.15s ease`. Project cards: `background` transitions from `#161A0B` to `#1E2410` on hover (slightly lighter ink). No scale transforms — this is a newspaper, not a product page.

---

### 5. Signal Integration

**Masthead:** Date displayed "WED 24 JUNE 2026" in Albert Sans, allcaps, ink.300 — newspaper dateline convention.

**Column 3 — Today's Signals:**
- Section head: "TODAY'S REPORT" (allcaps, Albert Sans Semibold, 12px, chartreuse.500)
- **Tigers 3–4 (L):** "TIGERS · 3–4 · LOSS" set in Albert Sans Regular 14px, ink.200. A tight kicker below: "Jun 23 · Final" in ink.400 10px.
- **Lunar:** "MOON · WAXING GIBBOUS · 76%" — displayed with a filled circle glyph ● at the appropriate fill approximation.
- **Daylight:** "DAYLIGHT · 14.7 HRS" — ink.200, 14px.
- **Music:** "ON ROTATION" kicker (chartreuse.500, allcaps 11px), then "Guided by Voices · Wet Leg · My Morning Jacket" in ink.200 13px.
- **HN Story:** "JERRY'S MAP" in chartreuse.300, bold, 14px. Below it: "One man. One map. Fifty years." in ink.300 italic — the story's essence as a pull quote. Score 481.
- **Golf:** "TRAVELERS CHAMPIONSHIP · SCHEDULED" in ink.400 12px.

**Quote display:** The hero phrase IS the quote — it fills the headline zone. The attribution "— Tibetan Proverb" appears in Spectral Italic, ink.300, 14px, directly beneath the hero phrase, left-aligned. No separate blockquote element.

**Column 1 — Work (3 projects):**
- FishSticks (SaaS, 2025): project name in Albert Sans Bold 16px, ink.50. Tag "SaaS · 2025" in chartreuse.600 11px allcaps. One-line description.
- 15th Club (AI, 2025): same treatment.
- Spaceman (Founder, 2018): same treatment, ink.200 for name (slightly deemphasized as older work).
- Section head: "SELECTED WORK" (allcaps, chartreuse.500 12px).

**Column 2 — Profile:**
- Section head: "CAPABILITIES" (allcaps, chartreuse.500 12px).
- Capabilities list: tight, dense, Albert Sans 13px ink.200, each capability on its own row with a thin `·` prefix in chartreuse.600. No bullets — ink rules.
- Below: a thin rule and 3-line career arc "Founder · Builder · AI products · 2008–present" in ink.300 italic Spectral, 13px.

**Awwwards reference:** The Himachal site's full-bleed mist photography and the Arkansas Museum renovation informs the broadsheet's formal editorial seriousness — dense, respectful of content, not decorative.

## Self-Check
1. Hero quotability: Yes — "Who can say for sure that one will live to see tomorrow." functions as a standalone philosophical declaration; would appear as a quotable screen shot without any surrounding context.
2. Because-of chain: Yes — the proverb's literary gravity → Broadsheet (today's edition capturing today's truth) → spectral-albert (slab serif editorial + humanist body, Broadsheet-native chassis) → chartreuse on near-void dark (inverted night-edition broadsheet, maximum vitality color in the mandated open corridor) → three-column dense newspaper grid (today's build documented like a daily paper).
3. Render feasibility: Yes — Spectral at `clamp(44px, 5vw, 78px)` for a 13-word, three-line headline in a full-width headline band renders cleanly at 1440×900 within a 22vh zone; columns fit comfortably below at standard newspaper density without overflow.

## Rationale
The Tibetan Proverb arrived already fully formed as a headline. No signal today was stronger — not the Tigers' 3–4 loss, not the Travelers Championship (no leaders yet), not the Hacker News top story. But the quote said something that only became louder the longer the signals were read: every other signal was about today. The Tigers played yesterday. The moon is at 76% — building. The sun gave 14.7 hours of light. Jerry's Map, the HN story scoring 481 points, is about a man who has added to a single map since 1963 — a daily practice of presence stretched across decades. And a portfolio site that rebuilds itself each morning is exactly the same kind of practice. "Who can say for sure that one will live to see tomorrow" is the anchor because it is the site's own operating premise: do the thing today because today is the day you have.

Broadsheet follows because the proverb is a headline, not a monument. A Poster would frame it in amber, give it a plinth, make it an artifact. The Broadsheet makes it the front page of today's edition — here is what is true this Wednesday, here are the projects built in the time we have, here are the signals of this specific 24-hour window. The inverted broadsheet — near-void ink background instead of newsprint white — is the experimental gesture the 8/10 risk weight demands. It inverts the expectation while keeping the structural logic of the newspaper completely intact: masthead, banner headline, three columns, rules between sections. The formal rigidity of broadsheet layout against an unexpected dark field is more arresting than a decorated poster.

Spectral is the chassis because it was literally built for exactly this register — "editorial, literary, considered" — and is the catalog's own recommendation for Broadsheet. Its transitional slab serif DNA (heavier bracketed serifs, slight inkiness in the strokes) reads as press type at headline scale without requiring all-caps to achieve authority. Sentence case in Spectral Bold at 5vw is a sophisticated editorial choice: it reads as a thoughtful newspaper headline, not a slogan. Chartreuse at H:72° fills the only open corridor in the color mandate (58°–85°) and earns its spot: it is the color of leaves in maximum summer light, the biological signal of things intensely alive, which is the honest chromatic answer to a proverb about being present while you can.
