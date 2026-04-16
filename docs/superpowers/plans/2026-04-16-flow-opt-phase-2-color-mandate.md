# Flow Optimization — Phase 2: Color Mandate Computation & Injection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compute a deterministic `colorMandate` (target hue range + forbidden recent hues + rationale) from archived presets and the day's signals; inject the formatted mandate into both Director and Token Designer user prompts as context.

**Architecture:** Pure Node module (`scripts/utils/color-mandate.js`) with no LLM calls. Reads the last 5-7 builds from `archive/<date>/build-<id>/` preferring `color-scheme.json` (from Phase 1) and falling back to regex-extraction from `preset.ts`. Maps signals to a target hue range via a small lookup table. Returns a structured object; a formatter renders it as a Markdown section for prompt inclusion.

**Tech Stack:** Node.js ESM, Vitest. Reuses `hexToHsl` and `hueDistance` from `scripts/utils/color-validation.js` (Phase 1).

**Related:** `docs/superpowers/specs/2026-04-16-flow-optimization-design.md`, `docs/superpowers/plans/2026-04-16-flow-opt-phase-1-color-scheme-emission.md` (prerequisite — this plan uses `color-scheme.json` when present)

---

## File Structure

**New files:**
- `scripts/utils/color-mandate.js` — exports `computeColorMandate(opts)`, `extractRecentPrimaryHues(archiveDir, lookbackDays)`, `mapSignalsToTargetHue(signals)`, `computeForbiddenZones(hues, zoneRadius)`, `formatMandateForPrompt(mandate)`
- `tests/utils/color-mandate.test.js` — unit tests for the helpers above, using archive fixtures

**Test fixture data:**
- `tests/fixtures/archive-mandate/2099-01-01/build-1/color-scheme.json`
- `tests/fixtures/archive-mandate/2099-01-02/build-1/color-scheme.json`
- `tests/fixtures/archive-mandate/2099-01-03/build-1/preset.ts` (fallback path — no color-scheme.json)

**Modified files:**
- `scripts/design-agents.js` — call `computeColorMandate()` once per run, format it, and inject into Director's user prompt AND Token Designer's user prompt (see Task 4)

---

## Task 1: Write helper tests + create the module skeleton

**Files:**
- Create: `scripts/utils/color-mandate.js` (skeleton)
- Create: `tests/utils/color-mandate.test.js`
- Create: fixtures under `tests/fixtures/archive-mandate/`

- [ ] **Step 1: Create fixture archive directory**

```bash
mkdir -p tests/fixtures/archive-mandate/2099-01-01/build-1
mkdir -p tests/fixtures/archive-mandate/2099-01-02/build-1
mkdir -p tests/fixtures/archive-mandate/2099-01-03/build-1
```

- [ ] **Step 2: Write fixture color-scheme.json files**

Create `tests/fixtures/archive-mandate/2099-01-01/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 30, "s": 70, "l": 50, "name": "amber" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "warm", "name": "stone" },
  "mood_word": "cozy",
  "color_story": "Amber warmth."
}
```

Create `tests/fixtures/archive-mandate/2099-01-02/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 80, "s": 60, "l": 45, "name": "olive" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "warm", "name": "stone" },
  "mood_word": "earthy",
  "color_story": "Olive on stone."
}
```

Create `tests/fixtures/archive-mandate/2099-01-03/build-1/preset.ts` (fallback — no color-scheme.json in this build dir):

```typescript
import { definePreset } from '@pandacss/dev'
export const elementsPreset = definePreset({
  name: 'elements',
  theme: { tokens: { colors: {
    neutral: { 500: { value: '#8A7F70' } },
    accent: { DEFAULT: { value: '#8C6B44' } }
  }}}
})
```

(Hex `#8C6B44` ≈ HSL(30°, 35%, 41%) → primary hue ~30°.)

- [ ] **Step 3: Write failing tests**

Create `tests/utils/color-mandate.test.js`:

```javascript
import { describe, it, expect } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  computeColorMandate,
  extractRecentPrimaryHues,
  mapSignalsToTargetHue,
  computeForbiddenZones,
  formatMandateForPrompt,
} from '../../scripts/utils/color-mandate.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURE_DIR = path.resolve(__dirname, '../fixtures/archive-mandate')

describe('extractRecentPrimaryHues', () => {
  it('reads color-scheme.json when present', () => {
    const hues = extractRecentPrimaryHues(FIXTURE_DIR, 7)
    // Should include 30 (amber) and 80 (olive) from JSON,
    // and 30 (extracted from 2099-01-03 preset.ts fallback)
    expect(hues).toEqual(expect.arrayContaining([30, 80]))
    expect(hues.length).toBeGreaterThanOrEqual(2)
  })

  it('respects lookbackDays limit', () => {
    const hues = extractRecentPrimaryHues(FIXTURE_DIR, 1)
    // Only the most recent date (2099-01-03 by sort) should be included
    expect(hues.length).toBeLessThanOrEqual(1)
  })

  it('returns empty array on missing archive dir', () => {
    const hues = extractRecentPrimaryHues('/nonexistent/path', 7)
    expect(hues).toEqual([])
  })
})

describe('mapSignalsToTargetHue', () => {
  it('maps cold-winter mood to cool blue range', () => {
    const { targetHueRange, mood } = mapSignalsToTargetHue({ weather: { mood: 'cold winter' } })
    expect(targetHueRange[0]).toBeGreaterThanOrEqual(180)
    expect(targetHueRange[1]).toBeLessThanOrEqual(260)
    expect(mood).toMatch(/cool/i)
  })

  it('maps energetic mood to vivid range', () => {
    const { targetHueRange } = mapSignalsToTargetHue({ weather: { mood: 'energetic' } })
    // vivid range is broad — just verify we got a range
    expect(targetHueRange.length).toBe(2)
  })

  it('returns permissive default when no mood', () => {
    const { targetHueRange } = mapSignalsToTargetHue({})
    expect(targetHueRange).toEqual([0, 360])
  })
})

describe('computeForbiddenZones', () => {
  it('creates ±30° zones around each recent hue', () => {
    const zones = computeForbiddenZones([30, 80], 30)
    // Zone around 30 is 0-60, zone around 80 is 50-110; merged: 0-110
    expect(zones).toEqual([[0, 110]])
  })

  it('keeps non-overlapping zones separate', () => {
    const zones = computeForbiddenZones([30, 200], 20)
    expect(zones).toEqual([[10, 50], [180, 220]])
  })

  it('handles wraparound at 0/360', () => {
    const zones = computeForbiddenZones([10], 20)
    // Zone is -10 to 30, wrapping: [350, 360] and [0, 30]
    expect(zones.some((z) => z[0] >= 340)).toBe(true)
    expect(zones.some((z) => z[0] === 0 && z[1] >= 20)).toBe(true)
  })

  it('returns empty on empty input', () => {
    expect(computeForbiddenZones([], 30)).toEqual([])
  })
})

describe('computeColorMandate', () => {
  it('produces a full mandate from fixtures', () => {
    const mandate = computeColorMandate({
      archiveDir: FIXTURE_DIR,
      signals: { weather: { mood: 'cold winter' } },
      lookbackDays: 7,
    })
    expect(mandate.targetHueRange).toBeDefined()
    expect(mandate.forbiddenHues.length).toBeGreaterThan(0)
    expect(mandate.recentPrimaryHues).toEqual(expect.arrayContaining([30, 80]))
    expect(mandate.rationale).toEqual(expect.any(String))
    expect(mandate.rationale.length).toBeGreaterThan(20)
  })

  it('falls back gracefully when archive is empty', () => {
    const mandate = computeColorMandate({
      archiveDir: '/nonexistent',
      signals: {},
      lookbackDays: 7,
    })
    expect(mandate.forbiddenHues).toEqual([])
    expect(mandate.rationale).toMatch(/no recent/i)
  })
})

describe('formatMandateForPrompt', () => {
  it('renders a markdown section with clear structure', () => {
    const mandate = {
      targetHueRange: [195, 240],
      forbiddenHues: [[0, 60]],
      recentPrimaryHues: [30, 40],
      rationale: 'Cool blue for winter clarity; avoid warm amber seen recently.',
    }
    const formatted = formatMandateForPrompt(mandate)
    expect(formatted).toMatch(/## Color Mandate/)
    expect(formatted).toMatch(/195.*240/)
    expect(formatted).toMatch(/0.*60/)
    expect(formatted).toMatch(/winter clarity/)
  })
})
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/color-mandate.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 5: Commit fixtures and failing tests**

```bash
git add tests/fixtures/archive-mandate/ tests/utils/color-mandate.test.js
git commit -m "test(pipeline): failing tests + fixtures for colorMandate computation"
```

---

## Task 2: Implement color-mandate.js

**Files:**
- Create: `scripts/utils/color-mandate.js`

- [ ] **Step 1: Write the full module**

Create `scripts/utils/color-mandate.js`:

```javascript
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'
import { hexToHsl } from './color-validation.js'

/**
 * Read the last N days of archived builds and extract each build's primary
 * hue. Prefers color-scheme.json (Phase 1); falls back to regex extraction
 * from preset.ts.
 *
 * @param {string} archiveDir - path to `archive/` directory
 * @param {number} lookbackDays
 * @returns {number[]} primary hues (0-360)
 */
export function extractRecentPrimaryHues(archiveDir, lookbackDays) {
  if (!existsSync(archiveDir)) return []

  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch { return [] }

  const hues = []
  for (const dateDir of dateDirs) {
    const datePath = path.join(archiveDir, dateDir)
    let buildDirs
    try {
      buildDirs = readdirSync(datePath)
        .filter((b) => b.startsWith('build-'))
        .sort()
        .reverse()
    } catch { continue }

    // Use the most recent build per date
    if (buildDirs.length === 0) continue
    const latestBuild = path.join(datePath, buildDirs[0])

    // Prefer color-scheme.json
    const schemePath = path.join(latestBuild, 'color-scheme.json')
    if (existsSync(schemePath)) {
      try {
        const scheme = JSON.parse(readFileSync(schemePath, 'utf8'))
        if (scheme?.primary_hue?.h != null) {
          hues.push(scheme.primary_hue.h)
          continue
        }
      } catch { /* fall through to preset.ts */ }
    }

    // Fallback: regex-extract accent DEFAULT from preset.ts
    const presetPath = path.join(latestBuild, 'preset.ts')
    if (existsSync(presetPath)) {
      try {
        const src = readFileSync(presetPath, 'utf8')
        const match = src.match(/accent\s*:\s*\{[^}]*?DEFAULT\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i)
        if (match) {
          const hsl = hexToHsl(match[1])
          if (hsl) hues.push(hsl.h)
        }
      } catch { /* ignore */ }
    }
  }
  return hues
}

/**
 * Minimal mood → hue range lookup. Extend as needed.
 * @param {object} signals
 * @returns {{ targetHueRange: [number, number], mood: string }}
 */
export function mapSignalsToTargetHue(signals) {
  const mood = String(signals?.weather?.mood || signals?.news?.tone || '').toLowerCase()

  const rules = [
    { match: /cold|winter|snow|ice|frost/, range: [195, 240], label: 'cool blue' },
    { match: /warm spring|coral|blossom/,   range: [5, 35],    label: 'warm coral' },
    { match: /summer|bright|sunny/,          range: [40, 80],   label: 'warm sunny' },
    { match: /autumn|fall|burn|rust/,        range: [15, 40],   label: 'rust/terracotta' },
    { match: /energetic|electric|vivid/,     range: [280, 340], label: 'electric magenta' },
    { match: /calm|misty|overcast/,          range: [140, 180], label: 'muted cyan-green' },
    { match: /moody|dark|sombre/,            range: [230, 280], label: 'deep indigo/violet' },
    { match: /celebratory|party|upbeat/,     range: [320, 360], label: 'hot pink' },
  ]

  for (const rule of rules) {
    if (rule.match.test(mood)) {
      return { targetHueRange: rule.range, mood: rule.label }
    }
  }
  return { targetHueRange: [0, 360], mood: 'open (no strong signal)' }
}

/**
 * Compute forbidden zones as ±zoneRadius° around each recent hue.
 * Merges overlapping zones and handles 360° wraparound.
 *
 * @param {number[]} hues
 * @param {number} zoneRadius
 * @returns {Array<[number, number]>} sorted, non-overlapping zones
 */
export function computeForbiddenZones(hues, zoneRadius) {
  if (!hues || hues.length === 0) return []

  const expanded = []
  for (const h of hues) {
    const low = h - zoneRadius
    const high = h + zoneRadius
    if (low < 0) {
      expanded.push([0, high])
      expanded.push([360 + low, 360])
    } else if (high > 360) {
      expanded.push([low, 360])
      expanded.push([0, high - 360])
    } else {
      expanded.push([low, high])
    }
  }

  // Sort and merge overlaps
  expanded.sort((a, b) => a[0] - b[0])
  const merged = []
  for (const zone of expanded) {
    if (merged.length && zone[0] <= merged[merged.length - 1][1]) {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], zone[1])
    } else {
      merged.push([...zone])
    }
  }
  return merged
}

/**
 * Top-level: compute a full mandate object.
 * @param {{ archiveDir: string, signals: object, lookbackDays?: number, zoneRadius?: number }} opts
 * @returns {{ targetHueRange: [number,number], forbiddenHues: Array<[number,number]>, recentPrimaryHues: number[], rationale: string }}
 */
export function computeColorMandate({ archiveDir, signals, lookbackDays = 7, zoneRadius = 30 }) {
  const recentPrimaryHues = extractRecentPrimaryHues(archiveDir, lookbackDays)
  const { targetHueRange, mood } = mapSignalsToTargetHue(signals)
  const forbiddenHues = computeForbiddenZones(recentPrimaryHues, zoneRadius)

  const parts = []
  if (targetHueRange[0] === 0 && targetHueRange[1] === 360) {
    parts.push(`No strong signal-driven target; palette is open.`)
  } else {
    parts.push(`Target hue range ${targetHueRange[0]}-${targetHueRange[1]}° (${mood}).`)
  }
  if (recentPrimaryHues.length > 0) {
    parts.push(`Recent primary hues: ${recentPrimaryHues.join('°, ')}°.`)
  } else {
    parts.push(`No recent build history available.`)
  }

  const rationale = parts.join(' ')

  return { targetHueRange, forbiddenHues, recentPrimaryHues, rationale }
}

/**
 * Render a mandate as a markdown section suitable for inclusion in an
 * agent's user prompt.
 * @param {object} mandate
 * @returns {string}
 */
export function formatMandateForPrompt(mandate) {
  const lines = [
    `## Color Mandate`,
    ``,
    `This mandate is computed from recent builds and today's signals. Treat it as strong guidance, not law.`,
    ``,
    `- **Target hue range:** ${mandate.targetHueRange[0]}°–${mandate.targetHueRange[1]}°`,
  ]
  if (mandate.forbiddenHues.length > 0) {
    const zones = mandate.forbiddenHues.map(([a, b]) => `${a}°–${b}°`).join(', ')
    lines.push(`- **Avoid these hue zones (recent palettes):** ${zones}`)
  } else {
    lines.push(`- **Avoid:** no recent palettes to avoid.`)
  }
  lines.push(`- **Rationale:** ${mandate.rationale}`)
  lines.push(``)
  lines.push(`If your chosen primary hue falls outside the target range or inside a forbidden zone, justify why in your color story.`)
  return lines.join('\n')
}
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `pnpm vitest run tests/utils/color-mandate.test.js`
Expected: PASS (14 tests)

- [ ] **Step 3: Run full suite**

Run: `pnpm vitest run`
Expected: all tests pass (Phase 1's 234 + Phase 2's 14 = 248)

- [ ] **Step 4: Commit**

```bash
git add scripts/utils/color-mandate.js
git commit -m "feat(pipeline): compute deterministic colorMandate from archive + signals"
```

---

## Task 3: Wire mandate computation + injection into Director user prompt

**Files:**
- Modify: `scripts/design-agents.js`

- [ ] **Step 1: Find the Director call site**

Run: `grep -n "directorSystemPrompt\|director.*user\|Director.*prompt" /Users/dougmarch/Projects/dougmarch/scripts/design-agents.js | head -10`

Note the file offset where Director's user prompt is assembled (usually right before `callAgent('design-director', ...)`).

- [ ] **Step 2: Compute the mandate once per run**

In `scripts/design-agents.js`, near the top of the main pipeline function (after `const originalBackup = await backup(...)` but before any LLM call), add:

```javascript
  // Compute the deterministic color mandate once per run; inject into
  // Director and Token Designer user prompts. Pure data — no LLM.
  const { computeColorMandate, formatMandateForPrompt } = await import('./utils/color-mandate.js')
  let colorMandate
  try {
    colorMandate = computeColorMandate({
      archiveDir: path.join(ROOT, 'archive'),
      signals,
      lookbackDays: 7,
      zoneRadius: 30,
    })
  } catch (err) {
    console.warn(`[color-mandate] computation failed, using permissive default: ${err.message}`)
    colorMandate = {
      targetHueRange: [0, 360],
      forbiddenHues: [],
      recentPrimaryHues: [],
      rationale: 'Mandate computation unavailable; palette is open.',
    }
  }
  const colorMandateSection = formatMandateForPrompt(colorMandate)
  console.log(`  color-mandate: target ${colorMandate.targetHueRange[0]}-${colorMandate.targetHueRange[1]}°, ${colorMandate.forbiddenHues.length} forbidden zone(s)`)
```

(Ensure `path` and `ROOT` are already imported at the top of the file; they typically are in this module.)

- [ ] **Step 3: Append the mandate section to the Director user prompt**

Find the line that builds the Director user prompt (likely concatenating sections like brief + context). Append `\n\n${colorMandateSection}` to that prompt. Example pattern:

```javascript
  const directorUserPrompt =
    `## Creative Brief\n\n${brief}\n\n` +
    `## Recent Archive Briefs\n${recentBriefs}\n\n` +
    `## References\n${references}\n\n` +
    colorMandateSection  // ← NEW
```

(Adjust to match the existing variable names and structure in the file; the key is: the `colorMandateSection` string is appended to Director's user-prompt content.)

- [ ] **Step 4: Verify the build still passes**

Run: `pnpm vitest run && pnpm build`
Expected: PASS 248/248, build clean

- [ ] **Step 5: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat(pipeline): inject colorMandate into Director user prompt"
```

---

## Task 4: Wire mandate injection into Token Designer user prompt

**Files:**
- Modify: `scripts/design-agents.js`

- [ ] **Step 1: Find the Token Designer user prompt assembly**

Run: `grep -n "tokenUserPrompt\|Token Designer.*user\|token.*prompt" /Users/dougmarch/Projects/dougmarch/scripts/design-agents.js | head -10`

Note the line where Token Designer's user prompt is built (or where `callAgent('token-designer', ...)` is invoked).

- [ ] **Step 2: Append the mandate section to Token Designer's user prompt**

At the Token Designer user prompt assembly, append `\n\n${colorMandateSection}` (the same variable computed in Task 3). Example:

```javascript
  const tokenUserPrompt =
    `## Visual Specification\n\n${visualSpec}\n\n` +
    `## Creative Brief\n\n${brief}\n\n` +
    colorMandateSection  // ← NEW (same variable, second injection)
```

- [ ] **Step 3: Update the Token Designer prompt to reference the mandate**

In `scripts/prompts/token-designer.md`, add a new section near the "Color Philosophy" section (~line 5):

```markdown
## Color Mandate

You will receive a `## Color Mandate` section in your user prompt with a target hue range and forbidden zones (derived from recent palettes). Honor it by default — your primary hue should fall inside the target range and outside the forbidden zones.

If your creative judgment strongly disagrees with the mandate, you may deviate — but you must justify the deviation in your `color_story` within the `===COLOR_SCHEME===` block. Do NOT silently ignore the mandate.
```

- [ ] **Step 4: Run full regression**

Run: `pnpm vitest run && pnpm build`
Expected: PASS, clean

- [ ] **Step 5: Commit**

```bash
git add scripts/design-agents.js scripts/prompts/token-designer.md
git commit -m "feat(pipeline): inject colorMandate into Token Designer user prompt + prompt section"
```

---

---

## Task 5: Validate emitted color scheme against the mandate

**Files:**
- Modify: `scripts/utils/color-validation.js` (adds `validateSchemeAgainstMandate`)
- Modify: `tests/utils/color-validation.test.js` (adds tests)
- Modify: `scripts/design-agents.js` (wire into the post-Token-Designer validation block from Phase 1 Task 5)

- [ ] **Step 1: Write failing tests**

Append to `tests/utils/color-validation.test.js`:

```javascript
import { validateSchemeAgainstMandate } from '../../scripts/utils/color-validation.js'

describe('validateSchemeAgainstMandate', () => {
  it('passes when primary hue is inside target range and outside forbidden zones', () => {
    const scheme = { primary_hue: { h: 215, s: 70, l: 50, name: 'ocean' } }
    const mandate = { targetHueRange: [195, 240], forbiddenHues: [[0, 60]], recentPrimaryHues: [30], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(true)
    expect(result.warnings).toEqual([])
  })

  it('warns when primary hue falls inside a forbidden zone', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const mandate = { targetHueRange: [0, 360], forbiddenHues: [[0, 60]], recentPrimaryHues: [30], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/forbidden zone/i)
  })

  it('warns when primary hue falls outside target range', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const mandate = { targetHueRange: [195, 240], forbiddenHues: [], recentPrimaryHues: [], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/outside target range/i)
  })

  it('accepts the permissive-default mandate (0-360 range, no forbidden)', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const mandate = { targetHueRange: [0, 360], forbiddenHues: [], recentPrimaryHues: [], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm vitest run tests/utils/color-validation.test.js -t "validateSchemeAgainstMandate"`
Expected: FAIL — function not exported.

- [ ] **Step 3: Implement the validator**

Append to `scripts/utils/color-validation.js`:

```javascript
/**
 * Warn when the scheme's primary hue falls outside the mandate's target
 * range or inside a forbidden zone.
 *
 * @param {object} scheme - with primary_hue.h
 * @param {{ targetHueRange: [number, number], forbiddenHues: Array<[number, number]> }} mandate
 * @returns {{ ok: boolean, warnings: string[] }}
 */
export function validateSchemeAgainstMandate(scheme, mandate) {
  const warnings = []
  if (!scheme?.primary_hue || !mandate) return { ok: true, warnings }
  const h = scheme.primary_hue.h

  // Outside target range?
  const [lo, hi] = mandate.targetHueRange
  if (!(lo === 0 && hi === 360)) {
    if (h < lo || h > hi) {
      warnings.push(
        `primary hue ${h}° (${scheme.primary_hue.name || 'unnamed'}) is outside target range ${lo}°–${hi}°.`
      )
    }
  }

  // Inside any forbidden zone?
  for (const [a, b] of mandate.forbiddenHues) {
    if (h >= a && h <= b) {
      warnings.push(
        `primary hue ${h}° is inside forbidden zone ${a}°–${b}° (recent palette repeated).`
      )
      break
    }
  }

  return { ok: warnings.length === 0, warnings }
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `pnpm vitest run tests/utils/color-validation.test.js`
Expected: PASS — existing Phase 1 tests still pass + 4 new.

- [ ] **Step 5: Wire the mandate validation into the pipeline**

In `scripts/design-agents.js`, find the post-Token-Designer validation block added in Phase 1 Task 5. After the existing `validateSchemeAgainstPreset` and `detectCoffeeShopPalette` calls, add:

```javascript
    const { validateSchemeAgainstMandate } = await import('./utils/color-validation.js')
    const mandateCheck = validateSchemeAgainstMandate(tokenResult.color_scheme, colorMandate)
    if (!mandateCheck.ok) {
      for (const w of mandateCheck.warnings) console.warn(`[color-scheme] ${w}`)
    }
```

(`colorMandate` is the variable from Task 3, in scope at this point in the pipeline.)

- [ ] **Step 6: Run full regression**

Run: `pnpm vitest run && pnpm build`
Expected: PASS 252/252 (248 + 4 from this task), clean build

- [ ] **Step 7: Commit**

```bash
git add scripts/utils/color-validation.js tests/utils/color-validation.test.js scripts/design-agents.js
git commit -m "feat(pipeline): warn when color scheme violates mandate (target range or forbidden zone)"
```

---

## Phase 2 completion criteria

- [ ] `scripts/utils/color-mandate.js` exports `computeColorMandate`, `extractRecentPrimaryHues`, `mapSignalsToTargetHue`, `computeForbiddenZones`, `formatMandateForPrompt`
- [ ] `scripts/utils/color-validation.js` gains `validateSchemeAgainstMandate`
- [ ] Mandate reads `color-scheme.json` when present (Phase 1), falls back to regex on `preset.ts`
- [ ] Mandate is computed once per run and injected into BOTH Director and Token Designer user prompts
- [ ] Token Designer prompt has a "Color Mandate" explainer section
- [ ] Graceful fallback to permissive-default mandate when computation throws
- [ ] Post-Token-Designer validation warns on mandate violations (warn-only, no hard-fail)
- [ ] Tests: 18 new (252 total); `pnpm build` clean
- [ ] Five commits, each conventionally messaged
