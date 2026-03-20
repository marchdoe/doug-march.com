# 2026-03-18

**Design Brief:** A portfolio printed on lavender-tinted stock — violet ink, amber dateline marker, Playfair Display mastheads over Source Sans columns, broadsheet density as the organizing metaphor.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

This design system captures the Broadsheet archetype in full — a light-first portfolio printed on lavender-tinted cream stock with a violet-black masthead. The palette centers on 265° violet-purple, maximally distant from recent amber, slate, and yellow-green runs. Playfair Display brings Old Style newspaper gravitas to headings; Source Sans 3 provides the invisible, humanist body workhorse. The Perfect Fourth scale (1.333 ratio) creates meaningful typographic jumps that read as broadsheet hierarchy at editorial column widths. All semantic tokens map light values as base, with dark overrides for the toggle — ensuring the default experience is newspaper-bright, not screen-dark. Contrast is engineered throughout: primary body text `#1D1530` on `#F2F0F6` yields ~11:1; muted text `#5D5270` on `#F2F0F6` clears 4.5:1.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/work.$slug.tsx
- app/components/Sidebar.tsx
- app/components/FeaturedProject.tsx
- app/components/ProjectRow.tsx
- app/components/SectionHead.tsx
- app/components/SelectedWork.tsx
- app/components/Experiments.tsx
- app/components/Bio.tsx
- app/components/Timeline.tsx
- app/components/Capabilities.tsx
- app/components/Personal.tsx
