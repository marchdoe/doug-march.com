# Signal-to-Design Mapping Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic "feel tags + synthesis" interpret prompt and the passthrough brief in prompt-builder with the structured PM brief system (PRIMARY/SECONDARY/ACCENT hierarchy → Palette Direction, Layout Energy, Tension, Required Elements, Accent Notes, Anchor Signal).

**Architecture:** Two files change. `buildInterpretPrompt()` in `interpret-signals.js` gets a new prompt that teaches Claude the signal hierarchy and outputs the 6-section structured brief. `buildUserPrompt()` in `prompt-builder.js` frames each brief section as a specific design requirement with instructions on what it drives.

**Tech Stack:** Node.js ESM, Vitest for tests

**Spec:** `docs/superpowers/specs/2026-03-14-signal-to-design-mapping.md`

---

## Chunk 1: Update interpret-signals.js

### Task 1: Update interpret-signals test for new prompt structure

**Files:**
- Modify: `tests/interpret-signals.test.js`

- [ ] **Step 1: Replace the existing test with tests for the new prompt**

The old test checks for "per-signal feel" and "synthesis paragraph" — those sections no longer exist. Replace with tests that verify the new prompt includes the signal hierarchy, the structured brief output format, and the PM role framing.

```javascript
import { describe, it, expect } from 'vitest'
import { buildInterpretPrompt } from '../scripts/interpret-signals.js'

const sampleSignals = {
  date: '2026-03-15',
  weather: { location: 'Ashburn, VA', conditions: 'Partly cloudy, 58°F', feel: 'mild' },
  season: { season: 'spring', month: 3, day: 15 },
  day_of_week: { day: 'Saturday', is_weekend: true, day_index: 6 },
  sun: { sunrise: '06:30', sunset: '18:09', daylight_hours: 11.7 },
  sports: {
    teams: [
      { name: 'Detroit Tigers', league: 'MLB', result: 'win', score: '6-1' },
      { name: 'Detroit Lions', league: 'NFL', result: 'off season' },
    ],
  },
  golf: { tournament: 'THE PLAYERS Championship', status: 'In Progress', leaders: [{ name: 'Ludvig Åberg', position: '1', score: '-13' }] },
  holidays: { today: null, upcoming: [{ name: "St. Patrick's Day", date: '2026-03-17', days_away: 3 }] },
  music: { bands: ['The War on Drugs', 'Guided by Voices'] },
  lunar: { phase: 'waning crescent', illumination: 0.092 },
  quote: { text: 'If you set your goals ridiculously high...', author: 'James Cameron' },
  github: { repos: [{ name: 'anthropics/claude-plugins-official', language: 'Python' }] },
  hacker_news: { stories: [{ title: 'Show HN: Han', score: 83 }] },
  books: { currently_reading: [] },
}

describe('buildInterpretPrompt', () => {
  it('includes signal hierarchy definitions', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('PRIMARY')
    expect(prompt).toContain('SECONDARY')
    expect(prompt).toContain('ACCENT')
  })

  it('includes all six output sections in the format spec', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('## Palette Direction')
    expect(prompt).toContain('## Layout Energy')
    expect(prompt).toContain('## Tension')
    expect(prompt).toContain('## Required Elements')
    expect(prompt).toContain('## Accent Notes')
    expect(prompt).toContain('## Anchor Signal')
  })

  it('frames the role as Product Manager, not designer', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('Product Manager')
    // Should NOT contain designer framing — that's Stage 2
    expect(prompt).not.toContain("designer's eye")
  })

  it('includes the raw signal data so Claude can read it', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('Ashburn, VA')
    expect(prompt).toContain('spring')
    expect(prompt).toContain('Saturday')
    expect(prompt).toContain('Detroit Tigers')
  })

  it('includes tension guidance', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('tension')
    expect(prompt).toContain('not resolve')
  })

  it('includes the date', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('2026-03-15')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/interpret-signals.test.js`
Expected: Multiple failures — the old prompt doesn't contain "PRIMARY", "## Palette Direction", "Product Manager", etc.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/interpret-signals.test.js
git commit -m "test: update interpret-signals tests for PM brief format"
```

### Task 2: Replace buildInterpretPrompt with PM brief prompt

**Files:**
- Modify: `scripts/interpret-signals.js:35-63` (the `buildInterpretPrompt` function)

- [ ] **Step 1: Replace the buildInterpretPrompt function**

Replace the entire function body (lines 35-63) with the new PM brief prompt. Keep the same function signature. The new prompt:
1. Establishes the PM role
2. Presents all raw signals as structured data
3. Defines the PRIMARY/SECONDARY/ACCENT hierarchy with examples
4. Specifies the exact 6-section output format
5. Includes conflict resolution guidance (tension is the feature)

```javascript
export function buildInterpretPrompt(signals) {
  const signalDump = Object.entries(signals)
    .filter(([key]) => key !== 'date')
    .map(([key, value]) => `### ${key}\n${JSON.stringify(value, null, 2)}`)
    .join('\n\n')

  return `You are the Product Manager for doug-march.com — a personal portfolio site that redesigns itself daily based on environmental signals.

Your job is to read today's raw signals and write a structured creative brief. You are NOT the designer. You write requirements — opinionated, editorial, specific. The designer (a separate stage) will receive your brief and decide HOW to execute it visually.

## Today's Raw Signals (${signals.date || 'unknown'})

${signalDump}

---

## Signal Hierarchy

Use this hierarchy to structure your brief. PRIMARY signals set the foundation. SECONDARY signals add editorial elements. ACCENT signals add texture.

### PRIMARY — Set the Foundation (Color Palette + Layout Energy)
These are always present (derived, never fail). They establish the visual foundation.

| Signal | Design Dimension | Example |
|--------|-----------------|---------|
| Weather | Color palette temperature | Blizzard → icy/stark; sunny 75°F → warm/golden |
| Season | Color palette richness/saturation | Spring → fresh greens; winter → desaturated/stark |
| Day of week | Layout energy and density | Weekend → spacious/relaxed; weekday → structured/dense |
| Daylight hours (sun) | Light/dark balance | Short days → heavier darks; long days → airy/light |

### SECONDARY — Add Editorial Elements + Flavor
These add editorial commentary layered on the PRIMARY foundation. They have a point of view.

| Signal | Design Dimension | Example |
|--------|-----------------|---------|
| Sports results | Editorial elements with POV | Win → celebratory badge; loss → dismissive callout |
| Golf leaderboard | Editorial element if notable | Masters Sunday → leaderboard feature element |
| Holidays | Thematic accents + elements | St. Patrick's Day → green accents, shamrock element |
| Market direction | Subtle mood modifier | Down day → heavier/compressed feel |
| News headlines | Possible editorial element | Major event → acknowledgment element |

### ACCENT — Texture and Personality (Never Dominate)
These add texture and personality. They should be felt, not seen.

| Signal | Design Dimension | Example |
|--------|-----------------|---------|
| Music bands | Typography/personality hints | Radiohead → angular/precise; GBV → lo-fi/rough |
| Lunar phase | Atmospheric subtlety | Full moon → contrast/drama; new moon → minimal |
| Quote | Potential anchor if resonant | Chaos quote on chaotic day → feature prominently |
| GitHub trending | Tech texture hints | AI repos → code-aesthetic elements |
| Hacker News | Cultural temperature | Interesting HN day → tech-forward personality |
| Books | Personality hint | Reading sci-fi → futuristic touches |
| Air quality | Environmental overlay | Poor AQI → hazy/muted treatment |

---

## Conflict Resolution: Tension is the Feature

When signals conflict, do NOT resolve the conflict by picking a winner. Instead, tension between signals becomes a design requirement.

Examples:
- Warm spring Saturday + Tigers loss → warm palette BUT dismissive editorial element about the loss
- Sunny day + market crash → bright layout BUT compressed, anxious typography for market elements
- Holiday approaching + bad weather → festive accents layered over a cold palette

Call out tensions explicitly. Instruct the designer to hold them, not resolve them.

---

## Your Output

Write a creative brief with exactly these six sections. Be opinionated and specific — you are a PM writing requirements, not a mood board.

## Palette Direction
[1-2 sentences on color temperature, saturation, mood — derived from PRIMARY signals (weather, season, daylight). Never prescribe specific hex colors — describe the feeling.]

## Layout Energy
[1-2 sentences on density, spacing, rhythm, visual weight — derived from day of week, season, daylight hours. Weekend = relaxed/spacious, weekday = structured/tight.]

## Tension
[1-2 sentences identifying contradictions between signals. What conflicts exist? Instruct the designer to hold the tension, not resolve it. If no tension, say so — some days are harmonious.]

## Required Elements
[Bulleted list of editorial design elements the designer MUST include. Each has a signal source, editorial direction, and tone. These are requirements, not suggestions.]

Format:
- [element description]: [editorial direction + tone] (source: [signal name])

Only include elements for signals worth commenting on. "Off season" is not worth an element. A win or loss IS. An approaching holiday IS. A notable golf leaderboard IS.

## Accent Notes
[Bulleted list of subtle influences from ACCENT signals. These are suggestions, not requirements.]

Format:
- [signal name] ([key detail]): [how it might subtly influence texture, typography, or personality]

## Anchor Signal
[One sentence naming the single signal that should be FELT most strongly when someone lands on the site. This is your call as PM — what's the headline of today's design?]`
}
```

- [ ] **Step 2: Run the tests**

Run: `pnpm vitest run tests/interpret-signals.test.js`
Expected: All 6 tests pass.

- [ ] **Step 3: Bump max_tokens for the longer brief format**

The structured brief is longer than the old feel-tags format. In `callAnthropicAPI` (line 148), change `max_tokens: 1024` to `max_tokens: 2048`.

- [ ] **Step 4: Run all tests to check nothing else broke**

Run: `pnpm vitest run`
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/interpret-signals.js tests/interpret-signals.test.js
git commit -m "feat: replace interpret prompt with PM brief format (PRIMARY/SECONDARY/ACCENT hierarchy)"
```

---

## Chunk 2: Update prompt-builder.js

### Task 3: Update prompt-builder test for structured brief framing

**Files:**
- Modify: `tests/scripts/prompt-builder.test.js`

- [ ] **Step 1: Add tests for the new brief framing**

Add a new `describe` block that tests the brief-as-requirements framing. The existing notes tests should still pass since `formatSignals` (the fallback path) is unchanged.

```javascript
describe('buildMessages — brief framing', () => {
  it('frames the brief with per-section design instructions when brief is provided', () => {
    const context = {
      ...baseContext,
      brief: `## Palette Direction\nWarm and golden.\n\n## Layout Energy\nSpacious and relaxed.\n\n## Tension\nNo tension today.\n\n## Required Elements\n- Tigers win badge: celebratory (source: sports)\n\n## Accent Notes\n- music (GBV): lo-fi texture\n\n## Anchor Signal\nSpring Saturday dominates.`,
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Should frame the brief as design requirements
    expect(prompt).toContain('Palette Direction')
    expect(prompt).toContain('elements/preset.ts')
    expect(prompt).toContain('Required Elements')
    expect(prompt).toContain('MUST include')
  })

  it('includes design-dimension mapping when brief is provided', () => {
    const context = {
      ...baseContext,
      brief: `## Palette Direction\nCold and stark.`,
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Should explain what each brief section drives
    expect(prompt).toContain('color tokens')
    expect(prompt).toContain('Layout')
  })

  it('falls back to raw signals when no brief is provided', () => {
    const { messages } = buildMessages(baseContext)
    const prompt = messages[0].content

    // Should use the old formatSignals path
    expect(prompt).toContain("Today's Signals")
    expect(prompt).toContain('Chicago')
  })
})
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `pnpm vitest run tests/scripts/prompt-builder.test.js`
Expected: New brief framing tests fail (the current code just dumps the brief as-is without framing). Existing notes tests still pass.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/scripts/prompt-builder.test.js
git commit -m "test: add prompt-builder tests for structured brief framing"
```

### Task 4: Update buildUserPrompt to frame brief as design requirements

**Files:**
- Modify: `scripts/utils/prompt-builder.js:113-121` (the brief section of `buildUserPrompt`)

- [ ] **Step 1: Replace the brief section in buildUserPrompt**

Replace lines 117-121 (the `if (context.brief)` block) with a new block that frames each brief section as a design requirement with context about what it drives:

```javascript
  // If an interpreted brief exists (from Stage 1), present it as structured design requirements
  if (context.brief) {
    sections.push(`## Creative Brief — Design Requirements (${context.signals.date})

The following brief was written by the Product Manager. It contains your design requirements. You have full creative freedom over HOW to execute — the brief tells you WHAT.

### How to read this brief:

- **Palette Direction** → drives your color tokens in \`elements/preset.ts\` (semantic colors, backgrounds, accents)
- **Layout Energy** → drives component spacing, grid structure, density in Layout.tsx and route files
- **Tension** → make the tension visible in the design, do not paper over it
- **Required Elements** → you MUST include these somewhere on the site. You decide placement, style, and visual treatment, but each required element must appear
- **Accent Notes** → optional texture influences you can draw from or ignore
- **Anchor Signal** → the overall vibe check. When someone lands on this site, THIS is what they should feel

---

${context.brief}`)
  } else {
    sections.push(formatSignals(context.signals))
  }
```

- [ ] **Step 2: Run prompt-builder tests**

Run: `pnpm vitest run tests/scripts/prompt-builder.test.js`
Expected: All tests pass (both old notes tests and new brief framing tests).

- [ ] **Step 3: Run all tests**

Run: `pnpm vitest run`
Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add scripts/utils/prompt-builder.js tests/scripts/prompt-builder.test.js
git commit -m "feat: frame PM brief as structured design requirements in prompt-builder"
```

---

## Chunk 3: Verify end-to-end

### Task 5: Manual smoke test

- [ ] **Step 1: Run the interpret step against real signals**

Run: `MOCK_MODE=true node scripts/interpret-signals.js`
Expected: Writes `signals/today.brief.md` with the new 6-section format (Palette Direction, Layout Energy, Tension, Required Elements, Accent Notes, Anchor Signal).

- [ ] **Step 2: Verify the brief has the correct structure**

Read `signals/today.brief.md` and confirm it contains all 6 section headers.

- [ ] **Step 3: Run the full pipeline to verify design stage receives the brief correctly**

Run: `MOCK_MODE=true node scripts/run-pipeline.js`
Expected: Pipeline completes. The design stage should reference brief sections in its output.

- [ ] **Step 4: Final commit if any adjustments were needed**

Only if smoke testing revealed issues that required code fixes.
