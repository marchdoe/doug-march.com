# Signals

Fill this in each day before 5am EST. The daily redesign pipeline reads `today.yml` and uses these signals as the creative brief for Claude.

## Fields

- **date** — today's date in YYYY-MM-DD format
- **weather** — current Chicago conditions. `feel` is your editorial interpretation (e.g., "brutal, isolating", "crisp and electric")
- **sports** — any teams you follow. Can add/remove entries. Set `result: "Off season"` when appropriate.
- **golf** — array of notable golf news strings. Can be empty (`golf: []`).
- **github_trending** — 1–3 repos from GitHub trending. Focus on ones that have interesting design/UX/technical angles.
- **news** — 2–4 major headlines. These give Claude a sense of the world's emotional register.
- **mood_override** — optional. When set to `"dark"`, `"celebratory"`, `"tense"`, or `"playful"`, this overrides Claude's interpretation of the signals' emotional register. Leave as `null` to let Claude decide.

## Tips

- Be specific on weather — "22°F with 8 inches of snow" is better than "cold"
- The `feel` field on weather is your editorial voice. Use it.
- You don't need all sections to have content. An empty `golf: []` is fine.
- Claude reads your `why_interesting` notes on GitHub repos — give it a real observation.
