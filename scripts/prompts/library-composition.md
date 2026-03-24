# Composition Reference Library

## Choosing an Archetype

Each day, pick ONE archetype and commit to it. The archetype drives every layout decision — proportion, hierarchy, spacing, and interaction rhythm all flow from this choice.

**Avoid repeating the same archetype within a 3-day window.** If today is The Poster, it cannot be used again for at least 3 days. Check the recent design log before selecting.

Each archetype has a dominant logic. When in doubt: would this page immediately read as that archetype at a glance? If not, push further.

---

## The Archetypes

### 1. The Poster

One dominant element fills the viewport. Everything else is secondary, subordinate, or hidden until scrolled. The single element — name, image, statement, project — must command total attention. Negative space is a tool, not an accident.

```
┌────────────────────────────────────────────┐
│                                            │
│                                            │
│          DOMINANT ELEMENT                  │
│          (fills 70-90% of viewport)        │
│                                            │
│                                            │
│  small: name · role · nav                 │
└────────────────────────────────────────────┘
  ↓ scroll reveals remaining content below
```

CSS hints:
- Hero: `min-height: 90vh`, content centered or pinned to a single axis
- Secondary elements: small, low-contrast, anchored to corners or bottom edge
- Body content below fold: full-width, generous padding, one column

Use when: launching a new concept, featuring one project above all others, days when the mood is bold and declarative.

---

### 2. The Broadsheet

Dense, multi-column, type-driven. Feels like a newspaper front page — everything present, nothing hidden, hierarchy created by size and column weight alone. The grid is strict. White space is minimal but intentional.

```
┌──────────────────────────────────────────────────┐
│  MASTHEAD (full width, compact)                  │
├────────────────┬──────────────┬───────────────────┤
│                │              │                   │
│  PRIMARY       │  SECONDARY   │  TERTIARY         │
│  STORY         │  STORY       │  · item           │
│  (large type)  │  (mid type)  │  · item           │
│                │              │  · item           │
│                │              │  · item           │
├────────────────┴──────┬───────┴───────────────────┤
│  WORK GRID             │  SIGNALS / SHORT ITEMS   │
│  (compact rows)        │  (4-6 dense entries)     │
└────────────────────────┴─────────────────────────┘
```

CSS hints:
- Layout: CSS Grid, `grid-template-columns: 2fr 1fr 1fr` or `3fr 2fr 1fr`
- No gutters wider than 24px between columns
- Heading sizes carry all hierarchy; body at 14-15px is acceptable
- Hairline rules (`border-top: 1px solid`) to separate zones, not padding

Use when: there is a lot to say, the day is information-rich, the mood is journalistic or archival.

---

### 3. The Gallery Wall

Asymmetric blocks. Nothing sits on a rigid grid. Items feel curated and placed by hand — overlapping, varied in size, with deliberate whitespace between clusters. The irregularity is the design.

```
┌────────────────────────────────────────────────┐
│  name · role (top-left, small)                 │
│                                                │
│   ┌───────────────┐    ┌────────┐              │
│   │               │    │        │              │
│   │  large item   │    │  item  │  ┌────────┐  │
│   │               │    │        │  │        │  │
│   └───────────────┘    └────────┘  │  item  │  │
│                                    │        │  │
│        ┌──────────┐                └────────┘  │
│        │  item    │    ┌──────────────────┐    │
│        └──────────┘    │  wide item       │    │
│                        └──────────────────┘    │
└────────────────────────────────────────────────┘
```

CSS hints:
- Layout: CSS Grid with `grid-template-areas` and manual placement, or absolute positioning within a defined canvas
- Items: varied `grid-column` and `grid-row` spans — no two items the same size
- Whitespace: uneven, grouped. Clusters of 2-3 items with breathing room between clusters
- No visible borders or card edges — items float on the background

Use when: showcasing visual work, when variety and texture matter more than structure, creative/experimental days.

---

### 4. The Scroll

Single column. Vertical rhythm. Each section is a full beat — complete before the next begins. Pacing is cinematic: slow reveals, one idea at a time. Nothing competes horizontally.

```
┌───────────────────────────────────────────┐
│  Section 1: Identity (full viewport)      │
│  name, role, one defining line            │
├───────────────────────────────────────────┤
│  Section 2: Featured work (full viewport) │
│  project, image or statement, context     │
├───────────────────────────────────────────┤
│  Section 3: Work index (auto height)      │
│  list or grid, uncrowded                  │
├───────────────────────────────────────────┤
│  Section 4: Signal / writing (auto)       │
├───────────────────────────────────────────┤
│  Section 5: Footer                        │
└───────────────────────────────────────────┘
```

CSS hints:
- Sections: `min-height: 100vh` for hero beats, `padding: 96px 0` for content beats
- Max content width: 680-800px, centered
- No sidebars. No grid columns. One axis only.
- Transitions between sections: `scroll-margin-top` for anchor snapping; or smooth scroll with visible section breaks

Use when: the mood is immersive and considered, there is one project or idea to feature deeply, long-form energy.

---

### 5. The Split

Two asymmetric halves create tension. One side anchors (navigation, identity, fixed context). The other scrolls (content, work, ideas). The proportions are never 50/50 — the asymmetry carries meaning.

```
┌────────────────┬────────────────────────────────┐
│                │                                │
│  LEFT (fixed)  │  RIGHT (scrollable)            │
│  35-40%        │  60-65%                        │
│                │                                │
│  name          │  ┌────────────────────────┐    │
│  role          │  │  featured project      │    │
│  nav           │  └────────────────────────┘    │
│                │                                │
│  —             │  work list                     │
│                │  experiments                   │
│  current date  │  writing                       │
│                │                                │
└────────────────┴────────────────────────────────┘
```

CSS hints:
- Layout: `display: grid; grid-template-columns: 38% 1fr`
- Left panel: `position: sticky; top: 0; height: 100vh; overflow: hidden`
- Right panel: `overflow-y: auto` or natural scroll
- The dividing line: either a visible border or whitespace gap of exactly 1px — not both
- Left side typography is smaller, quieter; right side carries all visual weight

Use when: there is both a persistent identity to assert and deep content to explore, the work speaks for itself.

---

### 6. The Stack

Full-width horizontal bands. Each band is a distinct, complete moment — a different color, type treatment, or density. No sidebar. No persistent navigation. Pure vertical sequence of self-contained zones.

```
┌──────────────────────────────────────────────┐
│  BAND 1: Name / Hero (dark bg, large type)   │
├──────────────────────────────────────────────┤
│  BAND 2: Featured project (accent bg)        │
├──────────────────────────────────────────────┤
│  BAND 3: Work list (light bg, dense)         │
├──────────────────────────────────────────────┤
│  BAND 4: Writing / signal (mid bg, spare)    │
├──────────────────────────────────────────────┤
│  BAND 5: Footer / contact (dark bg)          │
└──────────────────────────────────────────────┘
```

CSS hints:
- Each band: `width: 100%; padding: 64-96px 48px`
- Alternate band backgrounds to create rhythm — not random, but patterned (dark / light / accent / light / dark)
- Content inside each band: max-width 1100px, centered
- No card borders within bands — items sit directly on band background
- Navigation: inline within hero band, not fixed

Use when: the content has natural sections with distinct energy, a strong color palette to draw from, maximum contrast between moments.

---

### 7. The Specimen

Typography is the design. Type is used at extreme scale — as texture, as image, as the primary visual element. Layout decisions serve the type, not the other way around. One font family, pushed to its limits.

```
┌────────────────────────────────────────────────┐
│                                                │
│  DOUG                                          │
│  MARCH                                         │
│  ──────────────────────────────────            │
│                                                │
│  Designer × Developer × 2026                  │
│                                                │
│  ──────────────────────────────────            │
│  SELECTED WORK                                 │
│  ──────────────────────────────────            │
│  Spaceman          AI Experiment               │
│  Project Alpha     Untitled                    │
│  ──────────────────────────────────            │
│  about  ·  github  ·  email                   │
│                                                │
└────────────────────────────────────────────────┘
```

CSS hints:
- Hero type: `font-size: clamp(80px, 15vw, 200px)`, `line-height: 0.9`, `letter-spacing: -0.03em`
- Body/list type: small (13-14px), high contrast — the size gap is the entire visual hierarchy
- Rules and dividers: `border-top: 1px solid` — type and lines only, no shapes
- Color: monochromatic. One hue, extreme values. Type is not decorative.
- Avoid images. If used, they are tiny and incidental.

Use when: one font choice feels exceptional, the work list is tight, the mood is quiet and precise or brutally declarative.

---

### 8. The Index

Everything is a list. Dense, systematic, programmatic. The aesthetic is the data. No hero images, no featured treatments — every item is equal weight, differentiated only by metadata. Feels like a database made beautiful.

```
┌────────────────────────────────────────────────────────┐
│  Doug March — Designer & Developer              [date] │
├───────────────────────────────────────────────────────┤
│  WORK                                                  │
│  001  Spaceman            2024  Design, Dev   →        │
│  002  Project Alpha       2024  Strategy      →        │
│  003  AI Experiment       2024  AI, Design    →        │
│  004  Untitled            2025  Research      →        │
├───────────────────────────────────────────────────────┤
│  EXPERIMENTS                                           │
│  E01  Three.js canvas     ongoing              →       │
│  E02  Type specimen       complete             →       │
├───────────────────────────────────────────────────────┤
│  WRITING                                               │
│  W01  On daily redesign   2026-03-10           →       │
└───────────────────────────────────────────────────────┘
```

CSS hints:
- Layout: single column table or `display: grid; grid-template-columns: auto 1fr auto auto auto` per row
- Row height: 40-48px. Every row identical. No exceptions.
- Separators: `border-bottom: 1px solid` at reduced opacity — rows feel continuous, not chopped
- Typography: monospaced or tabular-nums for index numbers and dates; sans-serif for titles
- Hover state: highlight entire row with accent background at 8-10% opacity
- No images anywhere

Use when: there is a lot of work to show, the mood is systematic and archival, engineering-forward energy.
