# 2026-07-03

**Design Brief:** Void-violet midnight before the fireworks — LESS / IS / MORE. in Big Shoulders condensed at specimen scale, three stacked words claiming 76% of the viewport, the right-side void as the argument.

## Signals


## Claude's Rationale

The hero phrase arrived without competition. Today's signals are quiet in the way a day before a national holiday is always quiet — the Tigers dropped 4–10, the John Deere Classic is grinding through its mid-round with Glover and Blair sharing the lead at −8 without drama, and the Hacker News front page offers civic weight (Virginia bans geolocation data, 815 points) but no single cultural rupture. Into that stillness, Robert Browning's "Less is more." lands as the exact line this portfolio surface wants on a contemplative summer Friday: it is simultaneously a design instruction, a critical position, and an honest self-description of a page that rebuilds itself from scratch every morning. It passes every poster test — someone would screenshot these three words in isolation. The period is intentional and load-bearing.

Specimen was the only honest archetype. The Specimen archetype commits fully: typography IS the design, and anything surrounding the type is infrastructure, not content. Three single words stacked at wall scale — LESS / IS / MORE., rendered uppercase — in Big Shoulders Display at clamp(8rem, 18vw, 26rem) produce a roughly 684px type block on a 900px-tall viewport, claiming 76% of the canvas for the phrase alone. The right 30–50% of the canvas is void. That void IS the argument: the phrase has room because the constraint is the idea, not because the designer ran out of content. Big Shoulders Display, tagged for Specimen in the chassis catalog with "dramatic, poster, condensed, signage" mood tags, is the only chassis capable of stacking three words across 76% of viewport height without either shrinking below impact or overflowing at 1440px wide. Atkinson Hyperlegible handles the signal strip at 14px, legible as the finest of footnotes.

The color mandate left precisely one door open: 273°–305°, the violet-purple corridor, after six consecutive builds occupied every other quadrant of the wheel. H:285° is not a compliance concession — it is thematically correct. Violet is the color of the 81.4% waning gibbous moon on the eve of Independence Day, the color of the quiet hour before something larger begins. Against near-void violet-black (#0D0812), the near-white lavender (#F4F0FA) phrase achieves 18.3:1 contrast and appears to emit from within the dark field rather than sit on top of it. The bright lavender accent (#C084FF) at 7.83:1 handles all supporting navigation and signal-strip text without competing with the hero. Everything else — the Tigers loss, the tournament leaderboard, the approaching holiday, the week's biggest civil-liberties story — is demoted to a single 48px all-caps Atkinson strip at the bottom edge. Browning's phrase does not share the stage.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
