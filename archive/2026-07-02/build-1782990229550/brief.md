# 2026-07-02

**Design Brief:** Acid chartreuse on void-dark newsprint — "Google ships the malware." in Spectral slab at headline scale, the broadsheet packed with column rules and incident briefs, one double-weight chartreuse rule the only decoration between the accusation and the work beneath.

## Signals


## Claude's Rationale

The hero phrase arrived as found text, not composed: F-Droid's advisory about Android malware sourced from Google landed at 638 HN points — nearly double the next story — and the only edit required was compression. "Google ships the malware." is five words, a period, and a complete thought that works simultaneously as accusation, wry observation, and invitation. For a portfolio built by someone who ships software, it reads with an extra layer of quiet self-implication.

The Broadsheet archetype followed directly from the phrase's register. This is a newspaper headline: a finding with public consequence, delivered flat, expecting the reader to complete the implications. Broadsheet's multi-column density, masthead structure, and column-divider rule system create a genuine incident-report aesthetic rather than a brand gesture. Spectral, the only chassis in the catalog explicitly tagged for Broadsheet, is a transitional slab-serif typeface with journalistic authority — it gives the headline weight without the athletic bluster of Anton or Big Shoulders. At `clamp(3.5rem, 6vw, 7.5rem)`, the five-word phrase renders as a single commanding line across the full-width hero zone.

The color mandate resolved to 52°–87° — the sole open corridor after six consecutive builds. H:72° (acid chartreuse) is not a neutral compliance choice: chartreuse is the exact hue of hazard tape, biohazard markers, and terminal-printout warnings. On a near-void dark background (`#0A0B06`), the headline in `#C2D400` achieves approximately 11.9:1 contrast — the green appears to emit, not reflect, which is precisely the alarm-state the story demands. The void-moss neutrals carry a whisper of chartreuse chroma through every surface, binding the incident-paper aesthetic without competing with the single dominant accent.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
