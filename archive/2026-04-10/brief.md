# 2026-04-10

**Design Brief:** A fixed left panel holds the day's live signals in amber and sage — Masters tie, Detroit win, Tracy's autonomy reminder — while spring-lit cream pages scroll quietly past on the right, everything spaced like 5 PM light through a window you haven't closed yet.

## Signals


## Claude's Rationale

The Split archetype anchors this design—a fixed left panel (38%) holding the day's live signals (Masters leaderboard, Brian Tracy quote, Detroit scores) against a scrollable right panel carrying portfolio depth. I've built the neutral scale from H=160° (cool spring teal, heavily desaturated) so the page reads as afternoon light on cream paper rather than clinical white. Amber (#C4840A) appears only three times—leaderboard scores, quote border rule, active nav—making each appearance feel earned. Fraunces (heading) meets Outfit (body) for exactly the "whispering authority" the brief demands: the variable optical serif's soft irregularity versus Outfit's clean geometry. The Perfect Fourth scale (1.333) gives genuine drama between 9px labels and 50px display moments without chaos. Previous build errors (dangerouslySetInnerHTML, missing Scripts) are corrected by using the head() scripts array and rendering `<Scripts />` in RootDocument.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
