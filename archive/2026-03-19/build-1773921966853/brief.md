# 2026-03-19

**Design Brief:** Electric chartreuse on violet-black newsprint: a broadsheet that reads like a city desk at 2am, Barlow Condensed headlines compressed to tabloid urgency, IBM Plex Sans body text holding the column like a veteran compositor set the measure.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The Broadsheet demands a design system that reads like printed matter — high-contrast type hierarchy, zero decoration, and a chartreuse accent that hits like a neon headline marker against deep violet-black newsprint. The violet-indigo neutral palette (270°) provides the chromatic ground: not blue, not grey, but a field with latent color tension that makes the chartreuse pop with genuine electric force. Barlow Condensed carries the compressed authority of a tabloid masthead — at 800 weight it commands; at 400 it disappears into label text. IBM Plex Sans is the editorial workhorse that stays out of its way.

The semantic token layer maps cleanly to the Broadsheet's information architecture: `bg` is the deep page field, `bgCard` is the lifted column surface, `bgMasthead` is the darker header register. Win/loss signals get their own dedicated tokens so score cells never need to reach into raw color values. Everything defaults to dark mode (the primary experience), with light overrides available.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/work.$slug.tsx
