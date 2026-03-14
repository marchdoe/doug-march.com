# 2026-03-12

**Design Brief:** Blizzard shuts Chicago down: whiteout white, charcoal dark, ice-blue authority, everything stripped to structure.

## Signals

### Weather
**Location:** Chicago
**Conditions:** Heavy snowstorm, 8 inches overnight, 22°F
**Feel:** brutal, isolating

### Sports
- **Chicago Bulls:** Lost 89-102 to Celtics — Third loss in a row
- **Chicago Bears:** Off season — New QB signing rumored

### Golf
- Scottie Scheffler leads Masters by 4 strokes after round 2
- Rory McIlroy struggles with putting

### GitHub Trending
- **vercel/ai** — AI SDK for building AI-powered applications with streaming
  *New streaming UI primitives*
- **microsoft/vscode-copilot-chat** — GitHub Copilot Chat extension for VS Code
  *Chat interface design patterns*

### News
- Federal Reserve holds interest rates steady amid inflation concerns
- SpaceX Starship completes successful orbital test
- Major blizzard hits Midwest, travel disruptions

## Claude's Rationale

The signals today were impossible to ignore: eight inches of snow overnight in Chicago, 22°F, brutal and isolating. The Bulls just dropped their third in a row. The Midwest is shut down. There's something clarifying about a blizzard — it strips everything back to essentials. Visibility: zero. What's left: structure, function, the hard edges of what matters.

This redesign is Whiteout Protocol. Out goes the terminal-dark aesthetic with its cyan glow and void-blue backgrounds. In comes stark white (light mode) and charcoal (dark mode), separated by cold ice-blue instead of the current neon cyan. IBM Plex Mono replaces Space Mono — still monospaced, but with more engineered authority, less hacker terminal. Borders are harder (2px on structural elements), decorative overlays are gone, the sidebar loses its rounded logo container and goes direct. The FeaturedProject card loses its floating glow box in favor of a brutal left border bar — three pixels of accent color saying: this is what matters. SectionHead loses the `//` prefix and goes full caps, plain ruled line. Everything reads like an airport departures board during a weather hold: high contrast, maximum information density, nothing wasted.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/components/FeaturedProject.tsx
- app/components/ProjectRow.tsx
- app/components/SectionHead.tsx
- app/routes/index.tsx
- app/components/MobileFooter.tsx
