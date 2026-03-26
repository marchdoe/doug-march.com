# Layout & Composition Reference

## Archetypes

Pick ONE per day and commit. The archetype drives every layout decision. **Avoid repeating the same archetype within a 3-day window.**

---

### 1. The Poster

One dominant element fills 70–90% of the viewport. Everything else subordinate or hidden until scroll. Negative space is intentional.

```
┌────────────────────────────────────────────┐
│                                            │
│          DOMINANT ELEMENT                  │
│          (fills 70-90% of viewport)        │
│                                            │
│  small: name · role · nav                 │
└────────────────────────────────────────────┘
  ↓ scroll reveals remaining content below
```

CSS: hero `min-height: 90vh`, secondary elements small + low-contrast anchored to corners, body below fold one column.
Use when: bold and declarative, one project above all others.

---

### 2. The Broadsheet

Dense, multi-column, type-driven. Newspaper front page energy. Everything present, hierarchy by size and column weight alone. Grid is strict, white space minimal.

```
┌──────────────────────────────────────────────────┐
│  MASTHEAD (full width, compact)                  │
├────────────────┬──────────────┬───────────────────┤
│  PRIMARY       │  SECONDARY   │  TERTIARY         │
│  STORY         │  STORY       │  · item           │
│  (large type)  │  (mid type)  │  · item           │
├────────────────┴──────┬───────┴───────────────────┤
│  WORK GRID             │  SIGNALS / SHORT ITEMS   │
└────────────────────────┴─────────────────────────┘
```

CSS: `grid-template-columns: 2fr 1fr 1fr`, hairline rules separate zones, no gutters wider than 24px.
Use when: information-rich, journalistic or archival mood, lots to say.

---

### 3. The Gallery Wall

Asymmetric blocks. Nothing on a rigid grid. Items curated and placed by hand — varied sizes, deliberate whitespace between clusters. Irregularity is the design.

```
┌────────────────────────────────────────────────┐
│  name · role (top-left, small)                 │
│                                                │
│   ┌───────────────┐    ┌────────┐              │
│   │  large item   │    │  item  │  ┌────────┐  │
│   └───────────────┘    └────────┘  │  item  │  │
│                                    └────────┘  │
│        ┌──────────┐    ┌──────────────────┐    │
│        │  item    │    │  wide item       │    │
│        └──────────┘    └──────────────────┘    │
└────────────────────────────────────────────────┘
```

CSS: CSS Grid with manual placement, varied `grid-column`/`grid-row` spans, no visible card edges.
Use when: showcasing visual work, creative/experimental days.

---

### 4. The Scroll

Single column. Vertical rhythm. Each section a full beat — complete before the next begins. Cinematic pacing.

```
┌───────────────────────────────────────────┐
│  Section 1: Identity (full viewport)      │
├───────────────────────────────────────────┤
│  Section 2: Featured work (full viewport) │
├───────────────────────────────────────────┤
│  Section 3: Work index (auto height)      │
├───────────────────────────────────────────┤
│  Section 4: Signal / writing (auto)       │
├───────────────────────────────────────────┤
│  Section 5: Footer                        │
└───────────────────────────────────────────┘
```

CSS: hero beats `min-height: 100vh`, max content width 680–800px centered, no sidebars, no grid columns.
Use when: immersive, one idea to feature deeply, long-form energy.

---

### 5. The Split

Two asymmetric halves. One side anchors (identity, nav, fixed). Other scrolls (content, work). Never 50/50.

```
┌────────────────┬────────────────────────────────┐
│  LEFT (fixed)  │  RIGHT (scrollable)            │
│  35-40%        │  60-65%                        │
│  name          │  featured project              │
│  role          │  work list                     │
│  nav           │  experiments                   │
└────────────────┴────────────────────────────────┘
```

CSS: `grid-template-columns: 38% 1fr`, left `position: sticky; height: 100vh`, dividing line is 1px border OR whitespace gap — not both.
Use when: persistent identity alongside deep content, work speaks for itself.

---

### 6. The Stack

Full-width horizontal bands. Each band a distinct moment — different color, type treatment, density. Pure vertical sequence.

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

CSS: bands `width: 100%; padding: 64–96px 48px`, alternate backgrounds patterned (not random), content max-width 1100px centered.
Use when: strong color palette, natural sections with distinct energy.

---

### 7. The Specimen

Typography is the design. Type at extreme scale — as texture, as image, as the primary visual. One font family, pushed to limits.

```
┌────────────────────────────────────────────────┐
│  DOUG                                          │
│  MARCH                                         │
│  ──────────────────────────────────            │
│  Designer × Developer × 2026                  │
│  ──────────────────────────────────            │
│  SELECTED WORK                                 │
│  Spaceman          AI Experiment               │
│  ──────────────────────────────────            │
│  about  ·  github  ·  email                   │
└────────────────────────────────────────────────┘
```

CSS: hero type `font-size: clamp(80px, 15vw, 200px); line-height: 0.9`, body at 13–14px (size gap is the hierarchy), monochromatic color, no images.
Use when: exceptional font choice, tight work list, quiet precision or brutal declaration.

---

### 8. The Index

Everything is a list. Dense, systematic, programmatic. The data is the aesthetic. Every item equal weight.

```
┌────────────────────────────────────────────────────────┐
│  Doug March — Designer & Developer              [date] │
├───────────────────────────────────────────────────────┤
│  WORK                                                  │
│  001  Spaceman            2024  Design, Dev   →        │
│  002  Project Alpha       2024  Strategy      →        │
├───────────────────────────────────────────────────────┤
│  EXPERIMENTS                                           │
│  E01  Three.js canvas     ongoing              →       │
└───────────────────────────────────────────────────────┘
```

CSS: rows `height: 40–48px`, `border-bottom: 1px solid` at reduced opacity, tabular-nums for dates/numbers, full-row hover highlight.
Use when: lots of work to show, systematic/archival mood.

---

## Spacing System

8px base grid — every measurement a multiple of 8:

| Token | Value | Use for |
|-------|-------|---------|
| 1 | 4px | Tight gaps (icon to label) |
| 2 | 8px | Related items within a group |
| 3 | 12px | Internal card padding |
| 4 | 16px | Standard element spacing |
| 5 | 24px | Section sub-gaps |
| 6 | 32px | Between content groups |
| 8 | 48px | Major section breaks |
| 10 | 64px | Page-level breathing room |
| 12 | 96px | Hero/section top padding |

**Rule: spacing between unrelated things should be 2–3× the spacing between related things.**

## Proportion Rules

- **Max content width: 1080–1200px.** Wider feels sprawling.
- **Sidebar width: 180–280px.** Narrower is cramped; wider competes with content.
- **Card grid: 2–4 columns.** More than 4 makes cards too small.
- **Hero section: 50–80vh.** Less than 50 feels like a header; more than 80 is a barrier.
- **Body text measure: 55–75 characters per line.** Set max-width on text containers.
