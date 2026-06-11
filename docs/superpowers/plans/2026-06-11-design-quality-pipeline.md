# Design-Quality Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Unified Designer with a Mockup Designer → blocking Mockup Critic → React Engineer pipeline, add measurable specs + shell variance + brand contract + persistent critic memory + GitHub-issue ratings + daily OG images, per `docs/superpowers/specs/2026-06-11-design-quality-pipeline-design.md`.

**Architecture:** The Art Director (Sonnet) gains required MEASURABLES and SHELL output blocks. A new Opus Mockup Designer produces one self-contained `mockup.html`; a blocking vision critic (Sonnet) screenshots it with Playwright and measures it against the declared floors (≤2 revision loops). A Sonnet React Engineer translates the approved mockup into TSX (including a new `/og` route). All critic verdicts and screenshots persist to the archive; a lessons utility and a GitHub-issue rating loop feed them back into future prompts.

**Tech Stack:** Node ESM scripts, Claude CLI 2.1.92 (pinned), Playwright, vitest, GitHub Actions, `gh` CLI, PandaCSS/TanStack site.

**Branch:** all work on `feat/design-quality-pipeline` (already exists, spec committed).

---

## File structure

**New files:**

| Path | Responsibility |
|---|---|
| `scripts/utils/spec-blocks.js` | Parse MEASURABLES and SHELL block text into objects |
| `scripts/utils/shell-mandate.js` | Shell variance: history extraction + soft-forbidden + prompt block (clone of color-mandate) |
| `scripts/utils/lessons.js` | Derive rolling "recent lessons" prompt block from persisted verdicts + ratings |
| `scripts/utils/ratings.js` | New-schema rating reader → prompt block |
| `scripts/utils/og-meta.js` | Build OG/twitter meta entries code for the __root template |
| `scripts/agents/mockup-designer.js` | Mockup Designer agent module (prompt builder, runner, validation) |
| `scripts/agents/mockup-critic.js` | Mockup Critic agent module (verdict parse, measurement prompt) |
| `scripts/collect-ratings.js` | Harvest `daily-rating` GitHub issues → rating JSON files |
| `scripts/prompts/mockup-designer.md` | Mockup Designer system prompt |
| `scripts/prompts/mockup-critic.md` | Mockup Critic system prompt |
| `scripts/prompts/react-engineer.md` | React Engineer system prompt |
| `scripts/prompts/brand-contract.md` | Brand lockup/color contract (injected into AD, designer, engineer) |
| `app/assets/logo-mono.svg` | Single-color (currentColor) variant of the mark |
| `tests/utils/spec-blocks.test.js`, `tests/utils/shell-mandate.test.js`, `tests/utils/lessons.test.js`, `tests/utils/ratings.test.js`, `tests/utils/og-meta.test.js`, `tests/scripts/agents/mockup-designer.test.js`, `tests/scripts/agents/mockup-critic.test.js`, `tests/scripts/prompt-guards.test.js`, `tests/scripts/collect-ratings.test.js` | Unit tests |

**Modified:** `scripts/utils/delimiter-parser.js`, `scripts/utils/archiver.js`, `scripts/utils/snapshot.js`, `scripts/utils/chassis.js`, `scripts/templates/__root.tsx.template`, `scripts/agents/art-director.js`, `scripts/prompts/art-director.md`, `scripts/prompts/spec-critic.md`, `scripts/prompts/screenshot-critic.md`, `scripts/prompts/seeds/*.md` (8), `scripts/design-agents.js`, `.github/workflows/daily-redesign.yml`, `TODO.md`, `docs/specs/02-designer-engineer-split.md`, `docs/specs/06-pipeline-variance.md`.

**Deleted:** `scripts/prompts/sidebar-designer.md`, `scripts/prompts/footer-designer.md`, `scripts/prompts/structure-agent.md`, `scripts/prompts/component-agent.md`, `scripts/prompts/unified-designer.md` (Task 13, after salvage).

**Conventions:** run tests with `pnpm vitest run <file>`. Commit after every green step. All code is ESM. Never put `ANTHROPIC_API_KEY` in `.env` (local runs use Max-plan CLI auth).

---

### Task 1: Persist run artifacts (screenshot + verdicts) through `archive()`

The screenshot critic already holds a PNG buffer in CI (`scripts/design-agents.js:1109`) but it is discarded, and `archiver.js`'s own thumbnail capture only works when a dev server is on :5173 (never true in CI) — so `public/archive/{date}.png` has never existed in production. Fix: pass artifacts into `archive()`.

**Files:**
- Modify: `scripts/utils/archiver.js:137` (signature), `:225-255` (remove dev-server capture)
- Modify: `scripts/design-agents.js` (collect verdicts array; pass artifacts at both `archive()` call sites, lines ~1209 and ~1305)
- Test: `tests/scripts/archiver-artifacts.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/scripts/archiver-artifacts.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'

// archive() writes under ROOT (repo root). We can't relocate ROOT, so test
// the new helper writeArtifacts() directly — it owns the new behavior.
import { writeArtifacts } from '../../scripts/utils/archiver.js'

describe('writeArtifacts', () => {
  let dir
  beforeEach(() => { dir = mkdtempSync(path.join(tmpdir(), 'artifacts-')) })
  afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

  it('writes Buffer and string artifacts into the build dir', async () => {
    await writeArtifacts(dir, {
      'screenshot.png': Buffer.from([0x89, 0x50, 0x4e, 0x47]),
      'verdicts.json': JSON.stringify([{ critic: 'spec-critic', verdict: 'APPROVED' }]),
    })
    expect(existsSync(path.join(dir, 'screenshot.png'))).toBe(true)
    const verdicts = JSON.parse(readFileSync(path.join(dir, 'verdicts.json'), 'utf8'))
    expect(verdicts[0].critic).toBe('spec-critic')
  })

  it('skips null/undefined values and never throws on a bad entry', async () => {
    await writeArtifacts(dir, { 'a.txt': null, 'b.txt': 'ok' })
    expect(existsSync(path.join(dir, 'a.txt'))).toBe(false)
    expect(existsSync(path.join(dir, 'b.txt'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/scripts/archiver-artifacts.test.js`
Expected: FAIL — `writeArtifacts` is not exported.

- [ ] **Step 3: Implement `writeArtifacts` and thread it through `archive()`**

In `scripts/utils/archiver.js`, add the exported helper above `archive()`:

```js
/**
 * Write named artifacts (Buffer or string) into a build directory.
 * Null/undefined values are skipped; individual write failures warn
 * and continue — artifacts are never worth failing a run over.
 * @param {string} buildDir
 * @param {Record<string, Buffer|string|null|undefined>} artifacts
 */
export async function writeArtifacts(buildDir, artifacts = {}) {
  for (const [name, value] of Object.entries(artifacts)) {
    if (value === null || value === undefined) continue
    try {
      await writeFile(path.join(buildDir, name), value)
    } catch (err) {
      console.warn(`  artifact write failed (non-blocking): ${name}: ${err.message}`)
    }
  }
}
```

Change the `archive()` signature at line 137 to accept a ninth parameter:

```js
export async function archive(date, signals, rationale, designBrief, changedFiles, weights = {}, colorScheme = null, archetype = null, artifacts = {}) {
```

Inside `archive()`, immediately after the `color-scheme.json` write block (and before `copyToPublic` / the snapshot capture), add:

```js
  // Persist run artifacts (final screenshot, critic verdicts, mockup, shell)
  await writeArtifacts(buildDir, artifacts)
```

Then **delete** the entire "Capture a thumbnail screenshot into the build directory (best-effort)" block (the `spawnSync`/port-5173 section at ~lines 225–255) — the screenshot now arrives via `artifacts`. `copyToPublic` (line 12) already copies `buildDir/screenshot.png` → `public/archive/{date}.png`; verify `copyToPublic` runs AFTER the `writeArtifacts` call (move the call if needed so the screenshot exists when copyToPublic looks for it).

- [ ] **Step 4: Collect verdicts + screenshot in the orchestrator**

In `scripts/design-agents.js`, inside `runAgentSwarm` near the top of the `try` block (after `const writtenPaths = new Set()`), add:

```js
  // Critic verdicts collected across the run; persisted as verdicts.json
  const verdicts = []
  // Final-render screenshot captured by the screenshot critic; persisted
  // as screenshot.png (also becomes public/archive/{date}.png and the
  // calibration source for future runs).
  let finalScreenshot = null
```

In the spec-critic section (~line 897), after computing the verdict, add:

```js
    verdicts.push({
      critic: 'spec-critic',
      verdict: rawResponse.includes('REVISE') ? 'REVISE' : 'APPROVED',
      feedback: rawResponse.slice(0, 2000),
      ts: Date.now(),
    })
```

In the screenshot-critic section, after `const screenshotBuffer = await captureScreenshot()` (~line 1109), add `finalScreenshot = screenshotBuffer`, and after computing `criticResponse` add:

```js
      verdicts.push({
        critic: 'screenshot-critic',
        verdict: criticResponse.includes('REVISE') ? 'REVISE' : 'SHIP',
        feedback: criticResponse.slice(0, 2000),
        ts: Date.now(),
      })
```

Update BOTH `archive(...)` call sites (success path ~line 1209 and retry-success path ~line 1305) to pass artifacts:

```js
    await archive(signals.date, signals, rationale, designBrief, changedPaths, {}, tokenResult.color_scheme ?? null, chosenArchetype ?? null, {
      'screenshot.png': finalScreenshot,
      'verdicts.json': JSON.stringify(verdicts, null, 2),
    })
```

(The Phase-5 retry path has no screenshot-critic run, so `finalScreenshot` may be null there — `writeArtifacts` skips nulls by design.)

- [ ] **Step 5: Run the new test + full unit suite**

Run: `pnpm vitest run tests/scripts/archiver-artifacts.test.js && pnpm vitest run`
Expected: new test PASSES; no regressions (267+ existing tests green).

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/archiver.js scripts/design-agents.js tests/scripts/archiver-artifacts.test.js
git commit -m "feat(archive): persist screenshot + critic verdicts as build artifacts"
```

---

### Task 2: Delete orphan prompts

**Files:**
- Delete: `scripts/prompts/sidebar-designer.md`, `scripts/prompts/footer-designer.md`, `scripts/prompts/structure-agent.md`, `scripts/prompts/component-agent.md`

- [ ] **Step 1: Verify nothing references them**

Run: `grep -rn "sidebar-designer\|footer-designer\|structure-agent\|component-agent" scripts/ tests/ app/ --include="*.js" --include="*.ts" --include="*.tsx" | grep -v node_modules`
Expected: only stale string literals in test fixtures, if anything (those fixtures pass arbitrary agent-name strings to name-agnostic functions and may stay). If a LIVE code path imports/reads any of the four files, STOP and re-evaluate before deleting.

- [ ] **Step 2: Delete and verify suite**

```bash
git rm scripts/prompts/sidebar-designer.md scripts/prompts/footer-designer.md scripts/prompts/structure-agent.md scripts/prompts/component-agent.md
pnpm vitest run
```
Expected: all green.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore(prompts): delete orphaned pre-split agent prompts"
```

---

### Task 3: `spec-blocks.js` — MEASURABLES + SHELL parsing

**Files:**
- Create: `scripts/utils/spec-blocks.js`
- Test: `tests/utils/spec-blocks.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// tests/utils/spec-blocks.test.js
import { describe, it, expect } from 'vitest'
import { parseMeasurablesBlock, parseShellBlock } from '../../scripts/utils/spec-blocks.js'

describe('parseMeasurablesBlock', () => {
  it('parses the three measurable fields', () => {
    const m = parseMeasurablesBlock([
      'canvas_utilization_min: 70',
      'hero_scale: clamp(96px, 13vw, 200px)',
      'color_coverage_min: 60',
    ].join('\n'))
    expect(m.canvas_utilization_min).toBe(70)
    expect(m.hero_scale).toBe('clamp(96px, 13vw, 200px)')
    expect(m.color_coverage_min).toBe(60)
  })

  it('tolerates comments and missing fields', () => {
    const m = parseMeasurablesBlock('canvas_utilization_min: 80   # Broadsheet floor')
    expect(m.canvas_utilization_min).toBe(80)
    expect(m.hero_scale).toBeNull()
    expect(m.color_coverage_min).toBeNull()
  })

  it('returns all-null for garbage input', () => {
    const m = parseMeasurablesBlock('not even close')
    expect(m.canvas_utilization_min).toBeNull()
  })
})

describe('parseShellBlock', () => {
  it('parses the four shell fields', () => {
    const s = parseShellBlock([
      'nav: bottom rail',
      'footer: data strip',
      'brand_lockup: horizontal-md',
      'brand_color_mode: single-color',
    ].join('\n'))
    expect(s.nav).toBe('bottom rail')
    expect(s.footer).toBe('data strip')
    expect(s.brand_lockup).toBe('horizontal-md')
    expect(s.brand_color_mode).toBe('single-color')
  })

  it('returns nulls for missing fields', () => {
    const s = parseShellBlock('nav: left spine')
    expect(s.nav).toBe('left spine')
    expect(s.footer).toBeNull()
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/utils/spec-blocks.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```js
// scripts/utils/spec-blocks.js
/**
 * Parsers for the Art Director's MEASURABLES and SHELL delimiter blocks.
 * Both blocks are simple `key: value` lines; `#` starts a comment.
 * Missing/unparseable fields come back null — validation policy lives in
 * the caller (validateArtDirectorResult), not here.
 */

function parseKeyValues(text) {
  const out = {}
  for (const rawLine of String(text || '').split('\n')) {
    const line = rawLine.split('#')[0]
    const m = /^\s*([a-z_]+)\s*:\s*(.+?)\s*$/.exec(line)
    if (m) out[m[1]] = m[2]
  }
  return out
}

function toInt(v) {
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : null
}

/**
 * @returns {{ canvas_utilization_min: number|null, hero_scale: string|null, color_coverage_min: number|null }}
 */
export function parseMeasurablesBlock(text) {
  const kv = parseKeyValues(text)
  return {
    canvas_utilization_min: toInt(kv.canvas_utilization_min),
    hero_scale: kv.hero_scale ?? null,
    color_coverage_min: toInt(kv.color_coverage_min),
  }
}

/**
 * @returns {{ nav: string|null, footer: string|null, brand_lockup: string|null, brand_color_mode: string|null }}
 */
export function parseShellBlock(text) {
  const kv = parseKeyValues(text)
  return {
    nav: kv.nav ?? null,
    footer: kv.footer ?? null,
    brand_lockup: kv.brand_lockup ?? null,
    brand_color_mode: kv.brand_color_mode ?? null,
  }
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/utils/spec-blocks.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/spec-blocks.js tests/utils/spec-blocks.test.js
git commit -m "feat(spec-blocks): parse MEASURABLES and SHELL key-value blocks"
```

---

### Task 4: Delimiter parser — new blocks

**Files:**
- Modify: `scripts/utils/delimiter-parser.js`
- Test: extend existing parser tests (find with `grep -rl "parseDelimiterResponse" tests/`) or create `tests/utils/delimiter-parser-new-blocks.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/utils/delimiter-parser-new-blocks.test.js
import { describe, it, expect } from 'vitest'
import { parseDelimiterResponse } from '../../scripts/utils/delimiter-parser.js'

describe('parseDelimiterResponse — new blocks', () => {
  it('captures MEASURABLES, SHELL, and INTERIOR_NOTES', () => {
    const raw = [
      '===HERO_COPY===', 'FOURTEEN HOURS OF LIGHT',
      '===MEASURABLES===', 'canvas_utilization_min: 70', 'color_coverage_min: 60',
      '===SHELL===', 'nav: bottom rail', 'brand_lockup: mark-only-sm',
      '===INTERIOR_NOTES===', 'About page carries the same rail.',
      '===RATIONALE===', 'because',
    ].join('\n')
    const p = parseDelimiterResponse(raw)
    expect(p.hero_copy).toBe('FOURTEEN HOURS OF LIGHT')
    expect(p.measurables).toContain('canvas_utilization_min: 70')
    expect(p.shell).toContain('nav: bottom rail')
    expect(p.interior_notes).toBe('About page carries the same rail.')
    expect(p.rationale).toBe('because')
  })

  it('still terminates a FILE block at the new delimiters', () => {
    const raw = [
      '===FILE:mockup.html===', '<html></html>',
      '===INTERIOR_NOTES===', 'notes',
    ].join('\n')
    const p = parseDelimiterResponse(raw)
    expect(p.files[0].content).toBe('<html></html>')
    expect(p.interior_notes).toBe('notes')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/utils/delimiter-parser-new-blocks.test.js`
Expected: FAIL — `measurables` undefined; FILE block content includes the INTERIOR_NOTES text.

- [ ] **Step 3: Implement**

In `scripts/utils/delimiter-parser.js`:

1. Extend the `filePattern` lookahead (line 35) with the three new names — replace the lookahead group with:

```js
  const filePattern = /^===FILE:([^=\n]+)===\s*\n([\s\S]*?)(?=^===FILE:|^===RATIONALE===|^===DESIGN_BRIEF===|^===COLOR_SCHEME===|^===HERO_COPY===|^===HERO_RATIONALE===|^===ARCHETYPE===|^===CHASSIS_ID===|^===VISUAL_SPEC===|^===SELF_CHECK===|^===MEASURABLES===|^===SHELL===|^===INTERIOR_NOTES===|^===END_SENTINEL===)/gm
```

2. After the existing `captureBlock` calls (line 58), add:

```js
  const measurables = captureBlock('MEASURABLES')
  const shell = captureBlock('SHELL')
  const interior_notes = captureBlock('INTERIOR_NOTES')
```

3. Add `measurables, shell, interior_notes,` to the returned object and to the JSDoc `@returns` shape.

- [ ] **Step 4: Run tests (new + existing parser tests)**

Run: `pnpm vitest run tests/utils/delimiter-parser-new-blocks.test.js && pnpm vitest run`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/delimiter-parser.js tests/utils/delimiter-parser-new-blocks.test.js
git commit -m "feat(parser): capture MEASURABLES, SHELL, INTERIOR_NOTES blocks"
```

---

### Task 5: `shell-mandate.js`

**Files:**
- Create: `scripts/utils/shell-mandate.js`
- Test: `tests/utils/shell-mandate.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// tests/utils/shell-mandate.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { extractRecentShells, computeShellMandate, formatShellMandateForPrompt } from '../../scripts/utils/shell-mandate.js'

function seedBuild(archiveDir, date, shell) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  writeFileSync(path.join(buildDir, 'shell.json'), JSON.stringify(shell))
}

describe('shell-mandate', () => {
  let archiveDir
  beforeEach(() => { archiveDir = mkdtempSync(path.join(tmpdir(), 'shellm-')) })
  afterEach(() => { rmSync(archiveDir, { recursive: true, force: true }) })

  it('extracts recent shells newest-first', () => {
    seedBuild(archiveDir, '2026-06-09', { nav: 'top bar', footer: 'data strip', brand_lockup: 'mark-only-sm' })
    seedBuild(archiveDir, '2026-06-10', { nav: 'left spine', footer: 'colophon', brand_lockup: 'horizontal-md' })
    const shells = extractRecentShells(archiveDir, 7)
    expect(shells.length).toBe(2)
    expect(shells[0].nav).toBe('left spine')
  })

  it('computes soft-forbidden lists from the last 3 distinct values', () => {
    seedBuild(archiveDir, '2026-06-08', { nav: 'top bar', footer: 'data strip', brand_lockup: 'mark-only-sm' })
    seedBuild(archiveDir, '2026-06-09', { nav: 'top bar', footer: 'colophon', brand_lockup: 'horizontal-md' })
    seedBuild(archiveDir, '2026-06-10', { nav: 'left spine', footer: 'none', brand_lockup: 'stacked-lg' })
    const m = computeShellMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden.nav).toEqual(['left spine', 'top bar'])
    expect(m.softForbidden.brand_lockup).toContain('stacked-lg')
  })

  it('degrades to empty mandate with no history', () => {
    const m = computeShellMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden.nav).toEqual([])
    expect(formatShellMandateForPrompt(m)).toContain('No recent shell history')
  })

  it('formats a prompt block with guidance language', () => {
    seedBuild(archiveDir, '2026-06-10', { nav: 'top bar', footer: 'data strip', brand_lockup: 'mark-only-sm' })
    const block = formatShellMandateForPrompt(computeShellMandate({ archiveDir, lookbackDays: 7 }))
    expect(block).toContain('## Shell Mandate')
    expect(block).toContain('top bar')
    expect(block).toContain('justify')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/utils/shell-mandate.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```js
// scripts/utils/shell-mandate.js
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'

/**
 * Shell variance mandate — structural clone of color-mandate.js applied to
 * the page shell (nav treatment, footer treatment, brand lockup). Reads the
 * SHELL declarations persisted as shell.json in recent build dirs and marks
 * recently-used treatments as soft-forbidden. Guidance, never law:
 * "Fit > novelty" — deviation is allowed when justified.
 */

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, nav: string|null, footer: string|null, brand_lockup: string|null }>} newest first
 */
export function extractRecentShells(archiveDir, lookbackDays) {
  if (!existsSync(archiveDir)) return []
  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch { return [] }

  const shells = []
  for (const dateDir of dateDirs) {
    const datePath = path.join(archiveDir, dateDir)
    let buildDirs
    try {
      buildDirs = readdirSync(datePath)
        .filter((b) => /^build-\d+$/.test(b))
        .sort()
        .reverse()
    } catch { continue }
    if (buildDirs.length === 0) continue
    const shellPath = path.join(datePath, buildDirs[0], 'shell.json')
    if (!existsSync(shellPath)) continue
    try {
      const s = JSON.parse(readFileSync(shellPath, 'utf8'))
      shells.push({ date: dateDir, nav: s.nav ?? null, footer: s.footer ?? null, brand_lockup: s.brand_lockup ?? null })
    } catch { /* ignore malformed */ }
  }
  return shells
}

function lastDistinct(values, n) {
  const out = []
  for (const v of values) {
    if (v && !out.includes(v)) out.push(v)
    if (out.length === n) break
  }
  return out
}

/**
 * @param {{ archiveDir: string, lookbackDays?: number }} opts
 * @returns {{ recentShells: object[], softForbidden: { nav: string[], footer: string[], brand_lockup: string[] }, rationale: string }}
 */
export function computeShellMandate({ archiveDir, lookbackDays = 7 }) {
  const recentShells = extractRecentShells(archiveDir, lookbackDays)
  const softForbidden = {
    nav: lastDistinct(recentShells.map((s) => s.nav), 3),
    footer: lastDistinct(recentShells.map((s) => s.footer), 3),
    brand_lockup: lastDistinct(recentShells.map((s) => s.brand_lockup), 3),
  }
  const rationale = recentShells.length
    ? `Last ${recentShells.length} shells: ${recentShells.map((s) => `${s.date}: nav=${s.nav}, footer=${s.footer}, lockup=${s.brand_lockup}`).join(' | ')}`
    : 'No recent shell history available; the shell is open.'
  return { recentShells, softForbidden, rationale }
}

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection
 */
export function formatShellMandateForPrompt(mandate) {
  const lines = [
    `## Shell Mandate`,
    ``,
    `Computed from recent builds. The page shell (nav placement, footer treatment, brand lockup) must be a DECLARED choice, not a default. Treat this as strong guidance, not law.`,
    ``,
  ]
  const label = { nav: 'Nav treatments', footer: 'Footer treatments', brand_lockup: 'Brand lockups' }
  for (const key of ['nav', 'footer', 'brand_lockup']) {
    const used = mandate.softForbidden[key]
    lines.push(used.length
      ? `- **${label[key]} used recently (avoid):** ${used.join(', ')}`
      : `- **${label[key]}:** no recent history.`)
  }
  lines.push(``)
  lines.push(`- **Rationale:** ${mandate.rationale}`)
  lines.push(``)
  lines.push(`If today's brief genuinely calls for a recently-used treatment, you may reuse it — justify why in your rationale. Fit > novelty.`)
  return lines.join('\n')
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/utils/shell-mandate.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/shell-mandate.js tests/utils/shell-mandate.test.js
git commit -m "feat(shell-mandate): shell variance mandate cloned from color-mandate"
```

---

### Task 6: Brand contract + mono logo variant

**Files:**
- Create: `scripts/prompts/brand-contract.md`, `app/assets/logo-mono.svg`
- Test: `tests/scripts/prompt-guards.test.js` (created here, extended in later tasks)

- [ ] **Step 1: Create the mono SVG variant**

Read `app/assets/logo.svg`. Create `app/assets/logo-mono.svg` as a copy where every `fill="..."` / `stroke="..."` color value is replaced with `currentColor` (preserve `fill="none"`). Verify it renders: open both files in a browser (`open app/assets/logo-mono.svg`) — the mono variant must show the full mark silhouette in black (the default currentColor).

- [ ] **Step 2: Write the failing prompt-guard test**

```js
// tests/scripts/prompt-guards.test.js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const promptDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'prompts')
const read = (f) => readFileSync(path.join(promptDir, f), 'utf8')

describe('brand-contract.md load-bearing directives', () => {
  const contract = () => read('brand-contract.md')
  it('declares the geometry untouchable', () => {
    expect(contract()).toMatch(/geometry .*(untouchable|never|must not)/i)
  })
  it('enumerates the lockup variants', () => {
    const c = contract()
    expect(c).toContain('mark-only')
    expect(c).toContain('horizontal')
    expect(c).toContain('stacked')
  })
  it('restricts color to exactly two modes', () => {
    const c = contract()
    expect(c).toContain('original')
    expect(c).toContain('single-color')
    expect(c).toMatch(/two modes|exactly two/i)
  })
})
```

- [ ] **Step 3: Run to verify failure**

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js`
Expected: FAIL — file not found.

- [ ] **Step 4: Write `scripts/prompts/brand-contract.md`**

```markdown
## Brand Contract

The brand is a fixed mark with constrained variation. It must be recognizable
every single day. It participates in the design without being reinvented by it.

### The mark

- Source: `app/assets/logo.svg` (original colors), `app/assets/logo-mono.svg`
  (single-color variant; inherits `currentColor`).
- The mark's geometry is untouchable. Never redraw, distort, crop, rotate the
  glyph shapes, or substitute another mark.

### Lockup variants (choose exactly one per day)

| id | composition |
|---|---|
| `mark-only-sm` | mark alone, 24–32px |
| `mark-only-md` | mark alone, 40–56px |
| `horizontal-sm` | mark + "Doug March" on one line, mark 20–28px |
| `horizontal-md` | mark + "Doug March" on one line, mark 32–48px |
| `stacked-md` | mark above "Doug March", centered, mark 40–56px |
| `stacked-lg` | mark above "Doug March", centered, mark 64–96px |

The name is always set in the day's display or body face — the wordmark is
typographic, not a fixed image. Orientation (horizontal vs stacked) may follow
the day's nav treatment.

### Color — exactly two modes

1. `original` — the mark's own colors, as authored in `logo.svg`.
2. `single-color` — `logo-mono.svg`, inheriting exactly ONE existing text or
   accent token from today's preset via `currentColor`.

No other treatment is permitted: no gradients over the mark, no per-shape
recolors, no opacity tricks, no outlines. Pick the mode that sits better on
today's palette.

### Declaration and enforcement

- The Art Director declares `brand_lockup` and `brand_color_mode` in the
  `===SHELL===` block.
- The Mockup Designer must execute the declared lockup exactly.
- The Mockup Critic verifies the declared lockup and mode are visible in the
  rendered mockup.
```

- [ ] **Step 5: Run tests, then commit**

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js`
Expected: PASS.

```bash
git add scripts/prompts/brand-contract.md app/assets/logo-mono.svg tests/scripts/prompt-guards.test.js
git commit -m "feat(brand): brand contract + currentColor mono logo variant"
```

---

### Task 7: Art Director upgrades (prompt, validation, orchestrator wiring)

**Files:**
- Modify: `scripts/prompts/art-director.md`, `scripts/agents/art-director.js`, `scripts/prompts/spec-critic.md`, `scripts/design-agents.js`
- Test: extend `tests/scripts/agents/` AD tests + `tests/scripts/prompt-guards.test.js`

- [ ] **Step 1: Write the failing validation tests**

Locate the existing AD test file: `ls tests/scripts/agents/`. Add to it (or create `tests/scripts/agents/art-director-blocks.test.js`):

```js
// tests/scripts/agents/art-director-blocks.test.js
import { describe, it, expect } from 'vitest'
import { validateArtDirectorResult } from '../../../scripts/agents/art-director.js'

const valid = () => ({
  hero_copy: 'FOURTEEN HOURS OF LIGHT',
  archetype: 'Stack',
  chassis_id: 'big-shoulders-atkinson',
  visual_spec: 'spec',
  self_check: 'yes',
  measurables: 'canvas_utilization_min: 70\nhero_scale: clamp(96px, 13vw, 200px)\ncolor_coverage_min: 60',
  shell: 'nav: bottom rail\nfooter: data strip\nbrand_lockup: horizontal-md\nbrand_color_mode: original',
  files: [{ path: 'elements/preset.ts', content: 'export const elementsPreset = {}' }],
})

describe('validateArtDirectorResult — MEASURABLES + SHELL', () => {
  it('accepts a complete response', () => {
    expect(() => validateArtDirectorResult(valid())).not.toThrow()
  })
  it('rejects a missing MEASURABLES block', () => {
    const r = valid(); delete r.measurables
    expect(() => validateArtDirectorResult(r)).toThrow(/MEASURABLES/)
  })
  it('rejects MEASURABLES without a numeric canvas floor', () => {
    const r = valid(); r.measurables = 'hero_scale: 96px'
    expect(() => validateArtDirectorResult(r)).toThrow(/canvas_utilization_min/)
  })
  it('rejects a missing SHELL block', () => {
    const r = valid(); delete r.shell
    expect(() => validateArtDirectorResult(r)).toThrow(/SHELL/)
  })
  it('rejects an unknown brand_color_mode', () => {
    const r = valid(); r.shell = r.shell.replace('original', 'rainbow')
    expect(() => validateArtDirectorResult(r)).toThrow(/brand_color_mode/)
  })
})
```

Also add prompt guards to `tests/scripts/prompt-guards.test.js`:

```js
describe('art-director.md output contract', () => {
  const ad = () => read('art-director.md')
  it('requires the MEASURABLES block', () => {
    expect(ad()).toContain('===MEASURABLES===')
    expect(ad()).toContain('canvas_utilization_min')
  })
  it('requires the SHELL block', () => {
    expect(ad()).toContain('===SHELL===')
    expect(ad()).toContain('brand_color_mode')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/scripts/agents/art-director-blocks.test.js tests/scripts/prompt-guards.test.js`
Expected: FAIL on the new cases.

- [ ] **Step 3: Extend `validateArtDirectorResult`**

In `scripts/agents/art-director.js`, add the import at the top:

```js
import { parseMeasurablesBlock, parseShellBlock } from '../utils/spec-blocks.js'
```

Append to `validateArtDirectorResult` (after the preset-file check at line ~82):

```js
  if (!parsed.measurables) {
    throw new Error('Art Director response missing ===MEASURABLES===')
  }
  const measurables = parseMeasurablesBlock(parsed.measurables)
  if (measurables.canvas_utilization_min === null) {
    throw new Error('MEASURABLES block missing numeric canvas_utilization_min')
  }
  if (!parsed.shell) {
    throw new Error('Art Director response missing ===SHELL===')
  }
  const shell = parseShellBlock(parsed.shell)
  for (const key of ['nav', 'footer', 'brand_lockup', 'brand_color_mode']) {
    if (!shell[key]) throw new Error(`SHELL block missing ${key}`)
  }
  if (!['original', 'single-color'].includes(shell.brand_color_mode)) {
    throw new Error(`SHELL brand_color_mode must be "original" or "single-color", got "${shell.brand_color_mode}"`)
  }
```

In `runArtDirector`'s return object, add:

```js
    measurables: parsed.measurables,
    shell: parsed.shell,
```

and extend the failure-logging `present`/`absent` arrays (lines 129–130) to include `'measurables', 'shell'`.

- [ ] **Step 4: Extend `scripts/prompts/art-director.md`**

Add two new output blocks to the response-format section (immediately after the `===SELF_CHECK===` definition), and a matching instruction section:

````markdown
===MEASURABLES===
canvas_utilization_min: <integer %>   # archetype floors: Specimen/Poster ≥70, Broadsheet/Index ≥80, others ≥65
hero_scale: <CSS size, e.g. clamp(96px, 13vw, 200px)>
color_coverage_min: <integer %>       # ≥60 when color strategy is Committed/Drenched, else ≥35

===SHELL===
nav: <treatment, e.g. bottom rail / corner mark / floating pills / left spine / top bar>
footer: <treatment, e.g. data strip / colophon block / folded-into-nav / none>
brand_lockup: <one id from the Brand Contract table>
brand_color_mode: original | single-color

## Measurable Spec (required)

Your visual spec is poetry; the MEASURABLES block is the contract. The Mockup
Critic will measure the rendered mockup against these numbers. Declare floors
you genuinely intend — "drenched" with color_coverage_min: 35 is a
contradiction the spec critic will flag.

## Shell Declaration (required)

The page shell (nav, footer, brand lockup) is a design decision, not a
default. Consult the Shell Mandate in your inputs: recently-used treatments
are listed — choose differently unless today's brief demands repetition (then
justify it in your rationale). Pick the brand lockup and color mode from the
Brand Contract.
````

Also add one line to the existing SELF_CHECK definition list: `4. Canvas floor feasible: Yes/No — can this archetype × chassis genuinely fill <canvas_utilization_min>% of a 1440×900 viewport?`

- [ ] **Step 5: Wire the orchestrator**

In `scripts/design-agents.js`:

1. After the color-mandate computation (~line 718), add:

```js
  const { computeShellMandate, formatShellMandateForPrompt } = await import('./utils/shell-mandate.js')
  let shellMandateSection = ''
  try {
    shellMandateSection = formatShellMandateForPrompt(computeShellMandate({ archiveDir: path.join(ROOT, 'archive'), lookbackDays: 7 }))
  } catch (err) {
    console.warn(`[shell-mandate] computation failed (non-blocking): ${err.message}`)
  }
```

2. In `scripts/agents/art-director.js`'s `buildArtDirectorUserPrompt`, add a `shellMandateSection` and `brandContract` param and push them as sections (after `colorMandateSection`):

```js
  if (shellMandateSection) sections.push(shellMandateSection)
  if (brandContract) sections.push(brandContract)
```

3. In the orchestrator, read the brand contract once with the other prompts (add to the `Promise.all` at line 503): `readFile(path.join(promptDir, 'brand-contract.md'), 'utf8')` bound to `brandContract`, and pass `shellMandateSection` + `brandContract` into BOTH `runArtDirector` call sites (primary ~line 740 and codegen-retry ~line 837).

4. After the AD succeeds, parse and persist the shell + measurables. After line ~772 (`console.log` of visual spec size), add:

```js
  const { parseShellBlock, parseMeasurablesBlock } = await import('./utils/spec-blocks.js')
  const shellDecl = parseShellBlock(artDirectorResult.shell)
  const measurablesDecl = parseMeasurablesBlock(artDirectorResult.measurables)
  console.log(`  shell: nav=${shellDecl.nav} | footer=${shellDecl.footer} | lockup=${shellDecl.brand_lockup} (${shellDecl.brand_color_mode})`)
  console.log(`  measurables: canvas≥${measurablesDecl.canvas_utilization_min}% color≥${measurablesDecl.color_coverage_min}% hero=${measurablesDecl.hero_scale}`)
```

and extend BOTH `archive()` artifacts objects (from Task 1) with:

```js
      'shell.json': JSON.stringify(shellDecl, null, 2),
```

5. Extend the spec-critic user prompt (~line 871) with two sections:

```js
      '## Measurables (declared floors)\n\n' + artDirectorResult.measurables,
      '## Shell Declaration\n\n' + artDirectorResult.shell,
```

- [ ] **Step 6: Extend `scripts/prompts/spec-critic.md`**

Add a fifth check after the existing four:

```markdown
### 5. Measurable-spec consistency

The MEASURABLES block declares numeric floors. Check:
- canvas_utilization_min meets the archetype floor (Specimen/Poster ≥70,
  Broadsheet/Index ≥80, others ≥65). A lower number is a REVISE.
- The floors don't contradict the visual spec's language: a "drenched" or
  "committed" color story with color_coverage_min below 60 is a REVISE.
- hero_scale is achievable with the chosen chassis ratio at 1440px.
```

- [ ] **Step 7: Run the suite**

Run: `pnpm vitest run`
Expected: all green (the AD fixture tests updated in Step 1 pass; any existing AD fixtures missing the new blocks must be updated to include them — search `grep -rln "HERO_COPY" tests/` and add MEASURABLES + SHELL blocks to fixtures that feed `validateArtDirectorResult`).

- [ ] **Step 8: Commit**

```bash
git add scripts/prompts/art-director.md scripts/prompts/spec-critic.md scripts/agents/art-director.js scripts/design-agents.js tests/
git commit -m "feat(art-director): require MEASURABLES + SHELL blocks; wire shell mandate + brand contract"
```

---

### Task 8: Mockup Designer prompt

**Files:**
- Create: `scripts/prompts/mockup-designer.md`
- Test: extend `tests/scripts/prompt-guards.test.js`

- [ ] **Step 1: Write the failing prompt-guard test**

```js
describe('mockup-designer.md load-bearing directives', () => {
  const md = () => read('mockup-designer.md')
  it('outputs a single self-contained mockup.html', () => {
    expect(md()).toContain('===FILE:mockup.html===')
    expect(md()).toContain('===INTERIOR_NOTES===')
  })
  it('contains the execution rubric with the dead-background metric', () => {
    expect(md()).toMatch(/30%.*(dead|unused|untreated)/i)
  })
  it('has the seed anchor placeholder', () => {
    expect(md()).toContain('<!-- SEED_ANCHOR -->')
  })
  it('forbids the generic shell', () => {
    expect(md()).toMatch(/logo top-left.*nav top-right/i)
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js`
Expected: new cases FAIL.

- [ ] **Step 3: Write `scripts/prompts/mockup-designer.md`**

Open `scripts/prompts/unified-designer.md` first and salvage these sections verbatim into the new file where marked: **Brief Fidelity** (its lines ~3–13), **composition axes** (~57–62), **data-render requirements** (~148–169), **responsive rules** (~201–215). The complete new file:

````markdown
# Mockup Designer

You are the Mockup Designer for doug-march.com's daily redesign. You receive
an Art Director's spec — hero copy, visual specification, measurable floors,
shell declaration, design tokens — and you produce ONE self-contained HTML
file that IS the day's design at full fidelity. You do not write React. You
do not write the production site. You design, in the browser's native
language, with nothing between you and the composition.

A React Engineer will later translate your mockup 1:1 into the production
codebase. A vision critic will measure a screenshot of your mockup against
the declared floors BEFORE the engineer starts. Under-execution gets caught
and returned to you — commit fully the first time.

## Output format

Respond with exactly these blocks, in this order:

===FILE:mockup.html===
<the complete self-contained HTML document>

===INTERIOR_NOTES===
<5-15 lines: how the About page and Work detail pages adapt this system —
which surfaces, which scale registers, what the nav/footer do there>

===RATIONALE===
<2-3 sentences on the composition>

## mockup.html requirements

- Fully self-contained: one `<style>` block, no external CSS, no JavaScript.
- Fonts: load the day's chassis faces via Google Fonts `<link>` tags (the
  exact families arrive in your inputs). Use ONLY those families.
- Colors: use ONLY hex values present in today's `elements/preset.ts` (in
  your inputs). You are executing the Art Director's palette, not authoring
  your own.
- Content: real content from the Site Content summary — real project names,
  real timeline entries. Placeholder text ("Lorem", "Project One") is a
  failure.
- Viewport target: design for 1440×900 first; include responsive behavior
  with the same rules as production (see Responsive section).
- The document must render correctly from a `file://` URL (no absolute
  local paths, no same-origin fetches).

## Brief fidelity

[SALVAGED VERBATIM from unified-designer.md "Brief Fidelity" section]

The MEASURABLES block in your inputs is the contract form of the brief:
- `canvas_utilization_min` — at 1440×900, at least this % of the viewport
  must carry designed content (type, color fields, imagery, data). Untreated
  background beyond the remainder is a critic REVISE.
- `hero_scale` — the hero phrase renders at this size. Not "around" it.
- `color_coverage_min` — at least this % of the viewport carries the
  palette (not near-white/near-black neutral).

## Execution rubric — what under-execution looks like

These are the historical failure modes of this pipeline. The critic knows
them too:

- **The 45% page**: a narrow centered column of body text with a vast empty
  rail beside it. If more than 30% of the viewport is unused, untreated
  background, revise before responding.
- **The timid drench**: spec says "drenched in emerald", page shows emerald
  in a button and a heading. Color strategy is coverage, not garnish.
- **Marquee that isn't**: "phrase IS the page" rendered at 48px. Check your
  hero against `hero_scale` — at 1440px wide, `13vw` is ~187px. Commit.
- **The default shell**: logo top-left, nav top-right, hero center, footer
  bottom. This page shape ships only if the SHELL block declared it — and
  the Shell Mandate makes that rare. Execute the DECLARED nav, footer, and
  brand lockup.

## Shell and brand

Execute the `===SHELL===` declaration exactly: the declared nav treatment,
footer treatment, and brand lockup (per the Brand Contract in your inputs,
including its two color modes). The brand mark is an inline SVG in the
mockup — copy the provided SVG source; never redraw it.

## Composition

[SALVAGED VERBATIM from unified-designer.md composition-axes section]

## Data-render requirements

[SALVAGED VERBATIM from unified-designer.md data-render requirements,
adapted: where it says route files, read "the corresponding mockup
sections"; the archetype content contract block arrives in your user
prompt unchanged]

## Responsive

[SALVAGED VERBATIM from unified-designer.md responsive section]

## Self-check before responding

1. Screenshot test: if the critic renders this at 1440×900 right now, does
   it meet every number in MEASURABLES? Estimate honestly.
2. Is every visible string real content?
3. Does the shell match the SHELL declaration?
If any answer is No, revise before responding.

<!-- SEED_ANCHOR -->
````

- [ ] **Step 4: Run guard tests**

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/prompts/mockup-designer.md tests/scripts/prompt-guards.test.js
git commit -m "feat(prompts): mockup-designer system prompt with execution rubric"
```

---

### Task 9: Mockup Designer agent module

**Files:**
- Create: `scripts/agents/mockup-designer.js`
- Test: `tests/scripts/agents/mockup-designer.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// tests/scripts/agents/mockup-designer.test.js
import { describe, it, expect } from 'vitest'
import { buildMockupDesignerUserPrompt, validateMockupResult } from '../../../scripts/agents/mockup-designer.js'

describe('buildMockupDesignerUserPrompt', () => {
  it('includes brief, tokens, measurables, shell, and brand svg sections', () => {
    const p = buildMockupDesignerUserPrompt({
      enrichedBrief: 'THE BRIEF',
      tokenContext: 'export const elementsPreset = {}',
      contentSummary: 'PROJECTS...',
      measurables: 'canvas_utilization_min: 70',
      shell: 'nav: bottom rail',
      brandSvg: '<svg id="mark"/>',
      brandMonoSvg: '<svg id="mono"/>',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Anton',
      lessonsBlock: '## Recent Lessons\n- stop doing X',
      calibrationNote: '',
      archetypeContractBlock: '',
    })
    for (const s of ['THE BRIEF', 'elementsPreset', 'canvas_utilization_min: 70', 'nav: bottom rail', '<svg id="mark"/>', 'fonts.googleapis.com', 'Recent Lessons']) {
      expect(p).toContain(s)
    }
  })
})

describe('validateMockupResult', () => {
  it('accepts a complete response', () => {
    expect(() => validateMockupResult({
      files: [{ path: 'mockup.html', content: '<!DOCTYPE html><html><head></head><body>x</body></html>' }],
      interior_notes: 'about page notes',
    })).not.toThrow()
  })
  it('rejects a missing mockup.html', () => {
    expect(() => validateMockupResult({ files: [], interior_notes: 'n' })).toThrow(/mockup\.html/)
  })
  it('rejects script tags (mockup must be JS-free)', () => {
    expect(() => validateMockupResult({
      files: [{ path: 'mockup.html', content: '<html><script>alert(1)</script></html>' }],
      interior_notes: 'n',
    })).toThrow(/script/i)
  })
  it('rejects missing interior notes', () => {
    expect(() => validateMockupResult({
      files: [{ path: 'mockup.html', content: '<html></html>' }],
    })).toThrow(/INTERIOR_NOTES/)
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/scripts/agents/mockup-designer.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```js
// scripts/agents/mockup-designer.js
/**
 * Mockup Designer — Opus agent that turns the Art Director's spec into one
 * self-contained mockup.html. The orchestrator screenshots it, the Mockup
 * Critic gates it, and only then does the React Engineer translate it.
 */
import { callClaudeCLI } from '../utils/claude-cli.js'
import { parseDelimiterResponse } from '../utils/delimiter-parser.js'

export function buildMockupDesignerUserPrompt({
  enrichedBrief,
  tokenContext,
  contentSummary,
  measurables,
  shell,
  brandSvg,
  brandMonoSvg,
  googleFontsUrl,
  lessonsBlock,
  calibrationNote,
  archetypeContractBlock,
  polishRef,
  revisionFeedback,
}) {
  const sections = []
  if (archetypeContractBlock) sections.push(archetypeContractBlock)
  sections.push(enrichedBrief)
  sections.push(`## Measurables (the critic will measure these)\n\n${measurables}`)
  sections.push(`## Shell Declaration (execute exactly)\n\n${shell}`)
  sections.push(`## Design Tokens (elements/preset.ts — use ONLY these colors)\n\n\`\`\`typescript\n${tokenContext}\n\`\`\``)
  sections.push(`## Google Fonts URL (load these exact families)\n\n${googleFontsUrl}`)
  sections.push(`## Brand Mark SVG (original colors)\n\n\`\`\`html\n${brandSvg}\n\`\`\`\n\n## Brand Mark SVG (single-color / currentColor)\n\n\`\`\`html\n${brandMonoSvg}\n\`\`\``)
  sections.push(`## Site Content (real content — render this, never placeholders)\n\n${contentSummary}`)
  if (lessonsBlock) sections.push(lessonsBlock)
  if (calibrationNote) sections.push(calibrationNote)
  // polish.md rides in the user prompt — the system prompt is at its
  // size budget (CLI 2.1.92 fails on ~56KB+ system prompts).
  if (polishRef) sections.push(`## Execution Polish Reference (apply throughout)\n\n${polishRef}`)
  if (revisionFeedback) sections.push(`## CRITIC REVISION FEEDBACK — fix these before anything else\n\n${revisionFeedback}`)
  return sections.join('\n\n---\n\n')
}

export function validateMockupResult(parsed) {
  const mockup = (parsed.files || []).find((f) => f.path === 'mockup.html')
  if (!mockup || !mockup.content) {
    throw new Error('Mockup Designer response missing ===FILE:mockup.html===')
  }
  if (/<script\b/i.test(mockup.content)) {
    throw new Error('mockup.html contains a <script> tag — the mockup must be JS-free')
  }
  if (!parsed.interior_notes) {
    throw new Error('Mockup Designer response missing ===INTERIOR_NOTES===')
  }
}

/**
 * @returns {Promise<{ mockupHtml: string, interiorNotes: string, rationale: string }>}
 */
export async function runMockupDesigner(ctx) {
  const userPrompt = buildMockupDesignerUserPrompt(ctx)
  const result = await callClaudeCLI('mockup-designer', ctx.systemPrompt, userPrompt, {
    timeoutMs: 1500000,      // 25 min — single HTML file is cheaper than 15 TSX files
    stallTimeoutMs: 1200000, // 20 min silent-thinking headroom
    model: 'opus',
  })
  const parsed = parseDelimiterResponse(result)
  try {
    validateMockupResult(parsed)
  } catch (err) {
    if (ctx.failureDumpPath) {
      try { const { writeFile } = await import('fs/promises'); await writeFile(ctx.failureDumpPath, result, 'utf8') } catch {}
    }
    throw err
  }
  return {
    mockupHtml: parsed.files.find((f) => f.path === 'mockup.html').content,
    interiorNotes: parsed.interior_notes,
    rationale: parsed.rationale || '',
  }
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/scripts/agents/mockup-designer.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/agents/mockup-designer.js tests/scripts/agents/mockup-designer.test.js
git commit -m "feat(mockup-designer): agent module with prompt builder + validation"
```

---

### Task 10: Mockup screenshot util + Mockup Critic

**Files:**
- Modify: `scripts/utils/snapshot.js` (add `captureHtmlFileScreenshot`)
- Create: `scripts/prompts/mockup-critic.md`, `scripts/agents/mockup-critic.js`
- Test: `tests/scripts/agents/mockup-critic.test.js` + prompt guards

- [ ] **Step 1: Add `captureHtmlFileScreenshot` to `scripts/utils/snapshot.js`**

Append after `captureScreenshot` (line 223):

```js
/**
 * Screenshot a local self-contained HTML file (the Mockup Designer's
 * mockup.html) without any server. External font links still load over
 * the network.
 *
 * @param {string} filePath - absolute path to the HTML file
 * @param {{ width?: number, height?: number }} [opts]
 * @returns {Promise<Buffer>} PNG image buffer
 */
export async function captureHtmlFileScreenshot(filePath, { width = 1440, height = 900 } = {}) {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width, height } })
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000) // fonts
    return await page.screenshot({ type: 'png', fullPage: false })
  } finally {
    await browser.close()
  }
}
```

Smoke-check it manually:

```bash
node -e "
import('./scripts/utils/snapshot.js').then(async ({ captureHtmlFileScreenshot }) => {
  const { writeFileSync } = await import('fs')
  writeFileSync('/tmp/m.html', '<html><body style=\"background:#123\"><h1 style=\"color:#fff;font-size:120px\">TEST</h1></body></html>')
  const buf = await captureHtmlFileScreenshot('/tmp/m.html')
  console.log('PNG bytes:', buf.length)
})"
```
Expected: `PNG bytes: <nonzero>`.

- [ ] **Step 2: Write `scripts/prompts/mockup-critic.md`**

````markdown
# Mockup Critic

You review a SCREENSHOT of the Mockup Designer's mockup.html (rendered at
1440×900) against the Art Director's brief, visual spec, MEASURABLES floors,
and SHELL declaration. You are the blocking gate between design and
engineering: what you approve gets built; what you miss ships.

You are skeptical by default. The historical failure mode of this pipeline
is a beautiful brief executed at 60% commitment. Your job is to measure.

## Checks (run all five, in order)

1. **Sanity** — page rendered, fonts loaded (no fallback serif/sans look),
   no overflow disasters, no blank regions caused by errors.
2. **Measurables** — estimate from the screenshot:
   - canvas utilization %: portion of the viewport carrying designed content
     (type, color fields, imagery, data). Compare against
     canvas_utilization_min. Below the floor → REVISE.
   - hero scale: is the hero phrase rendered at the declared hero_scale
     magnitude? A phrase declared at ~180px that reads as ~60px → REVISE.
   - color coverage %: portion of the viewport carrying the palette (not
     near-white/near-black neutral). Below color_coverage_min → REVISE.
   State your estimates as numbers in your feedback.
3. **Brief fidelity** — does the composition deliver the brief's ambition?
   "Drenched" must look drenched. "Phrase IS the page" must leave no doubt
   what the page is about.
4. **Shell** — the declared nav treatment, footer treatment, and brand
   lockup (with the declared color mode) are visibly executed.
5. **Polish** — spacing rhythm is consistent; elements optically aligned;
   no orphaned UI; hierarchy unambiguous (one dominant element).

## Verdict format

Respond with exactly:

===VERDICT===
APPROVE | REVISE
===FEEDBACK===
<If REVISE: numbered, specific, actionable items. Include your utilization
and coverage estimates as numbers. If APPROVE: one sentence on what carries
the design.>
===END===
````

- [ ] **Step 3: Write the failing module tests**

```js
// tests/scripts/agents/mockup-critic.test.js
import { describe, it, expect } from 'vitest'
import { parseMockupCriticResponse } from '../../../scripts/agents/mockup-critic.js'

describe('parseMockupCriticResponse', () => {
  it('parses APPROVE', () => {
    const r = parseMockupCriticResponse('===VERDICT===\nAPPROVE\n===FEEDBACK===\nStrong drench.\n===END===')
    expect(r.verdict).toBe('APPROVE')
    expect(r.feedback).toBe('Strong drench.')
  })
  it('parses REVISE with feedback', () => {
    const r = parseMockupCriticResponse('===VERDICT===\nREVISE\n===FEEDBACK===\n1. utilization ~45% vs floor 70\n===END===')
    expect(r.verdict).toBe('REVISE')
    expect(r.feedback).toContain('45%')
  })
  it('defaults to REVISE on malformed responses (fail-closed)', () => {
    const r = parseMockupCriticResponse('I think it looks nice')
    expect(r.verdict).toBe('REVISE')
    expect(r.feedback).toContain('malformed')
  })
})
```

Also add to `tests/scripts/prompt-guards.test.js`:

```js
describe('mockup-critic.md load-bearing directives', () => {
  it('instructs numeric measurement of utilization and coverage', () => {
    const c = read('mockup-critic.md')
    expect(c).toContain('canvas_utilization_min')
    expect(c).toContain('color_coverage_min')
    expect(c).toMatch(/estimates as numbers/i)
  })
})
```

- [ ] **Step 4: Run to verify failure, then implement the module**

Run: `pnpm vitest run tests/scripts/agents/mockup-critic.test.js` — FAIL, then:

```js
// scripts/agents/mockup-critic.js
/**
 * Mockup Critic — blocking vision gate over the mockup screenshot.
 * Fail-closed: malformed responses count as REVISE.
 */
import { callClaudeCLI } from '../utils/claude-cli.js'

export function parseMockupCriticResponse(raw) {
  const verdictMatch = /===VERDICT===\s*\n\s*(APPROVE|REVISE)/.exec(raw)
  const feedbackMatch = /===FEEDBACK===\s*\n([\s\S]*?)===END===/.exec(raw)
  if (!verdictMatch) {
    return { verdict: 'REVISE', feedback: `malformed critic response: ${String(raw).slice(0, 300)}` }
  }
  return {
    verdict: verdictMatch[1],
    feedback: feedbackMatch ? feedbackMatch[1].trim() : '',
  }
}

/**
 * @param {{ systemPrompt: string, screenshotBuffer: Buffer, enrichedBrief: string, measurables: string, shell: string }} ctx
 * @returns {Promise<{ verdict: 'APPROVE'|'REVISE', feedback: string }>}
 */
export async function runMockupCritic(ctx) {
  const userPrompt = [
    '## Brief + Visual Specification\n\n' + ctx.enrichedBrief,
    '## Measurables (declared floors)\n\n' + ctx.measurables,
    '## Shell Declaration\n\n' + ctx.shell,
    'A screenshot of the rendered mockup (1440×900) is attached as a base64 PNG image below.\n\n' +
      '![Mockup Screenshot](data:image/png;base64,' + ctx.screenshotBuffer.toString('base64') + ')',
  ].join('\n\n---\n\n')

  const raw = await callClaudeCLI('mockup-critic', ctx.systemPrompt, userPrompt, {
    timeoutMs: 600000,
    stallTimeoutMs: 300000,
    model: 'sonnet',
  })
  return parseMockupCriticResponse(raw)
}
```

- [ ] **Step 5: Run tests + commit**

Run: `pnpm vitest run tests/scripts/agents/mockup-critic.test.js tests/scripts/prompt-guards.test.js`
Expected: PASS.

```bash
git add scripts/utils/snapshot.js scripts/prompts/mockup-critic.md scripts/agents/mockup-critic.js tests/scripts/agents/mockup-critic.test.js tests/scripts/prompt-guards.test.js
git commit -m "feat(mockup-critic): blocking vision critic + file:// mockup screenshots"
```

---

### Task 11: Lessons + ratings utilities

**Files:**
- Create: `scripts/utils/lessons.js`, `scripts/utils/ratings.js`
- Test: `tests/utils/lessons.test.js`, `tests/utils/ratings.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// tests/utils/lessons.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { buildLessonsBlock } from '../../scripts/utils/lessons.js'

function seed(archiveDir, date, { verdicts, rating } = {}) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  if (verdicts) writeFileSync(path.join(buildDir, 'verdicts.json'), JSON.stringify(verdicts))
  if (rating) writeFileSync(path.join(archiveDir, date, `rating-${Date.parse(date)}.json`), JSON.stringify(rating))
}

describe('buildLessonsBlock', () => {
  let archiveDir
  beforeEach(() => { archiveDir = mkdtempSync(path.join(tmpdir(), 'lessons-')) })
  afterEach(() => { rmSync(archiveDir, { recursive: true, force: true }) })

  it('collects REVISE feedback and rating critiques, newest first, capped', () => {
    seed(archiveDir, '2026-06-09', {
      verdicts: [{ critic: 'mockup-critic', verdict: 'REVISE', feedback: 'utilization ~45% vs floor 70' }],
    })
    seed(archiveDir, '2026-06-10', {
      rating: { grade: 'C', didnt: 'footer felt bolted on', try: 'fold footer into the rail' },
    })
    const block = buildLessonsBlock(archiveDir, { limit: 7 })
    expect(block).toContain('## Recent Lessons')
    expect(block).toContain('utilization ~45%')
    expect(block).toContain('footer felt bolted on')
    expect(block.indexOf('footer felt')).toBeLessThan(block.indexOf('utilization')) // newest first
  })

  it('ignores SHIP/APPROVE verdicts and returns empty string with no material', () => {
    seed(archiveDir, '2026-06-10', { verdicts: [{ critic: 'screenshot-critic', verdict: 'SHIP', feedback: 'fine' }] })
    expect(buildLessonsBlock(archiveDir, { limit: 7 })).toBe('')
  })
})
```

```js
// tests/utils/ratings.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { buildRecentRatingsBlock } from '../../scripts/utils/ratings.js'

describe('buildRecentRatingsBlock', () => {
  let archiveDir
  beforeEach(() => { archiveDir = mkdtempSync(path.join(tmpdir(), 'ratings-')) })
  afterEach(() => { rmSync(archiveDir, { recursive: true, force: true }) })

  it('formats new-schema ratings newest first', () => {
    mkdirSync(path.join(archiveDir, '2026-06-10'), { recursive: true })
    writeFileSync(path.join(archiveDir, '2026-06-10', 'rating-1.json'), JSON.stringify({
      grade: 'A', worked: 'the drench', didnt: '', try: '', date: '2026-06-10',
    }))
    const block = buildRecentRatingsBlock(archiveDir, { lookbackDays: 10 })
    expect(block).toContain('2026-06-10')
    expect(block).toContain('Grade: A')
    expect(block).toContain('the drench')
  })

  it('skips legacy 5-axis files without crashing', () => {
    mkdirSync(path.join(archiveDir, '2026-06-10'), { recursive: true })
    writeFileSync(path.join(archiveDir, '2026-06-10', 'rating-1.json'), JSON.stringify({
      ratings: { hierarchy: 4 }, notes: 'old format',
    }))
    expect(buildRecentRatingsBlock(archiveDir, { lookbackDays: 10 })).toBe('')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm vitest run tests/utils/lessons.test.js tests/utils/ratings.test.js`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement both utilities**

```js
// scripts/utils/ratings.js
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'

/**
 * Read new-schema ratings ({ grade, worked, didnt, try }) from the archive.
 * Legacy 5-axis files (with a `ratings` object) are skipped — they predate
 * 2026-04 and fall outside any useful lookback window.
 *
 * @returns {Array<{ date: string, grade: string, worked: string, didnt: string, try: string }>} newest first
 */
export function readRecentRatings(archiveDir, { lookbackDays = 10 } = {}) {
  if (!existsSync(archiveDir)) return []
  const out = []
  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch { return [] }
  for (const dateDir of dateDirs) {
    const dirPath = path.join(archiveDir, dateDir)
    let files
    try {
      files = readdirSync(dirPath).filter((f) => /^rating-\d+\.json$/.test(f)).sort().reverse()
    } catch { continue }
    for (const f of files) {
      try {
        const r = JSON.parse(readFileSync(path.join(dirPath, f), 'utf8'))
        if (!r.grade || !/^[A-D]$/.test(r.grade)) continue // legacy or malformed
        out.push({ date: dateDir, grade: r.grade, worked: r.worked || '', didnt: r.didnt || '', try: r.try || '' })
      } catch { /* ignore */ }
    }
  }
  return out
}

/** @returns {string} markdown block, or '' when there are no ratings */
export function buildRecentRatingsBlock(archiveDir, opts = {}) {
  const ratings = readRecentRatings(archiveDir, opts)
  if (ratings.length === 0) return ''
  const lines = ['## Owner Ratings (the single most important taste signal)', '']
  for (const r of ratings) {
    lines.push(`### ${r.date} — Grade: ${r.grade}`)
    if (r.worked) lines.push(`- Worked: ${r.worked}`)
    if (r.didnt) lines.push(`- Didn't: ${r.didnt}`)
    if (r.try) lines.push(`- Try next: ${r.try}`)
    lines.push('')
  }
  lines.push('A-grades show what to do more of. C/D-grades with notes are direct instructions.')
  return lines.join('\n')
}
```

```js
// scripts/utils/lessons.js
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'
import { readRecentRatings } from './ratings.js'

/**
 * Derive a rolling "Recent Lessons" prompt block from persisted critic
 * verdicts (REVISE feedback) and owner rating critiques (didnt/try fields).
 * Pure derivation at prompt-build time — no mutable state file.
 *
 * @returns {string} markdown block, or '' when there is nothing to learn from
 */
export function buildLessonsBlock(archiveDir, { limit = 7, lookbackDays = 14 } = {}) {
  const entries = [] // { date, source, text }

  for (const r of readRecentRatings(archiveDir, { lookbackDays })) {
    const text = [r.didnt, r.try].filter(Boolean).join(' — try: ')
    if (text) entries.push({ date: r.date, source: `owner (grade ${r.grade})`, text })
  }

  if (existsSync(archiveDir)) {
    let dateDirs = []
    try {
      dateDirs = readdirSync(archiveDir)
        .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
        .sort()
        .reverse()
        .slice(0, lookbackDays)
    } catch { /* ignore */ }
    for (const dateDir of dateDirs) {
      const datePath = path.join(archiveDir, dateDir)
      let buildDirs = []
      try {
        buildDirs = readdirSync(datePath).filter((b) => /^build-\d+$/.test(b)).sort().reverse()
      } catch { continue }
      if (buildDirs.length === 0) continue
      const verdictsPath = path.join(datePath, buildDirs[0], 'verdicts.json')
      if (!existsSync(verdictsPath)) continue
      try {
        for (const v of JSON.parse(readFileSync(verdictsPath, 'utf8'))) {
          if (v.verdict === 'REVISE' && v.feedback) {
            entries.push({ date: dateDir, source: v.critic, text: String(v.feedback).slice(0, 400) })
          }
        }
      } catch { /* ignore */ }
    }
  }

  if (entries.length === 0) return ''
  entries.sort((a, b) => b.date.localeCompare(a.date))
  const lines = ['## Recent Lessons — recurring flaws; do NOT repeat these', '']
  for (const e of entries.slice(0, limit)) {
    lines.push(`- [${e.date}, ${e.source}] ${e.text}`)
  }
  return lines.join('\n')
}
```

- [ ] **Step 4: Run tests + commit**

Run: `pnpm vitest run tests/utils/lessons.test.js tests/utils/ratings.test.js`
Expected: PASS.

```bash
git add scripts/utils/lessons.js scripts/utils/ratings.js tests/utils/lessons.test.js tests/utils/ratings.test.js
git commit -m "feat(feedback): lessons + new-schema ratings prompt blocks"
```

---

### Task 12: React Engineer prompt

**Files:**
- Create: `scripts/prompts/react-engineer.md`
- Test: extend `tests/scripts/prompt-guards.test.js`

- [ ] **Step 1: Write the failing prompt-guard test**

```js
describe('react-engineer.md load-bearing directives', () => {
  const re = () => read('react-engineer.md')
  it('defines fidelity as the contract', () => {
    expect(re()).toMatch(/fidelity/i)
    expect(re()).toContain('mockup.html')
  })
  it('requires all six files including og.tsx', () => {
    const c = re()
    for (const f of ['app/components/Layout.tsx', 'app/components/Sidebar.tsx', 'app/routes/index.tsx', 'app/routes/about.tsx', 'app/routes/work.$slug.tsx', 'app/routes/og.tsx']) {
      expect(c).toContain(f)
    }
  })
  it('specifies the OG card dimensions', () => {
    expect(re()).toContain('1200')
    expect(re()).toContain('630')
  })
})
```

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js` — new cases FAIL.

- [ ] **Step 2: Write `scripts/prompts/react-engineer.md`**

Salvage from `scripts/prompts/unified-designer.md` before deleting it (Task 13): the **PandaCSS/`css()` technical requirements**, **forbidden imports**, and **route/file conventions** sections, verbatim, where marked. Full file:

````markdown
# React Engineer

You translate an APPROVED design mockup (mockup.html) into this codebase's
production files. The design decisions are made — composition, scale, color
application, shell, typography are all settled in the mockup. Your contract
is FIDELITY: the built site must look like the mockup. A screenshot critic
will compare the rendered page against the mockup screenshot; divergence is
a defect.

You are not the designer. Do not "improve", soften, or rebalance the
composition. If the mockup commits to a 180px hero on a drenched field,
the production page commits to it too.

## Required output files

Respond with ===FILE:...=== blocks for ALL of these, every time:

- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/routes/og.tsx

plus any additional components the translation genuinely needs.

## Translation rules

- Use the design tokens (elements/preset.ts) for every color — the mockup's
  hex values map 1:1 to token names; reference tokens, never raw hex.
- Typography comes from the chassis tokens (fontSizes/fonts are generated —
  use the semantic scale steps that match the mockup's rendered sizes).
- The mockup's home page maps to index.tsx + Layout.tsx + Sidebar.tsx.
  The ===INTERIOR_NOTES=== block specifies how about.tsx and work.$slug.tsx
  adapt the system — follow it.
- Real content binds from the content files (app/content/*) exactly as the
  data-render requirements specify.
- Brand mark: import the SVG asset (`app/assets/logo.svg` for original
  colors, `app/assets/logo-mono.svg` for single-color mode with a CSS
  `color` set from a token). Never inline a redrawn mark.

## app/routes/og.tsx — the share card

A route rendering a fixed 1200×630 card (no scrolling, no responsiveness):
- A single outer div locked to exactly 1200×630 px.
- Composition: today's hero phrase in the display face at poster scale,
  today's palette as the field, the brand lockup (same variant + color mode
  as the site shell) in a corner or anchored position.
- It is screenshotted headlessly at 1200×630 — design for exactly that
  box. Keep it simpler than the home page: phrase + field + mark.

## Technical requirements

[SALVAGED VERBATIM from unified-designer.md: PandaCSS css() usage rules,
styled-system import paths, forbidden imports, route conventions]

## Self-check before responding

1. Every required file present, including og.tsx?
2. Zero raw hex values in TSX (tokens only)?
3. Side-by-side with the mockup: same composition, same scale register,
   same shell? If anything diverges, fix it before responding.
````

- [ ] **Step 3: Run guard tests + commit**

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js`
Expected: PASS.

```bash
git add scripts/prompts/react-engineer.md tests/scripts/prompt-guards.test.js
git commit -m "feat(prompts): react-engineer fidelity-contract prompt with og.tsx"
```

---

### Task 13: Orchestrator rewrite — mockup phase + engineer replaces Unified Designer

This is the core surgery on `scripts/design-agents.js` (Phase 2, lines ~925–1082, plus retry config at ~1148 and ~1255). Work in one sitting with the file open.

**Files:**
- Modify: `scripts/design-agents.js`, `scripts/prompts/screenshot-critic.md`
- Delete: `scripts/prompts/unified-designer.md` (AFTER Task 12 salvage is committed)
- Test: update `tests/scripts/design-agents.test.js` fixtures

- [ ] **Step 1: Replace the Phase 2 block**

Delete the current Phase 2 section (the `enrichedBrief` construction stays; everything from the `buildUnifiedDesignerPrompt` definition through the unified-designer retry block goes) and replace with:

```js
  // -----------------------------------------------------------------------
  // Phase 2a: Mockup Designer → Mockup Critic loop (blocking, ≤2 revisions)
  // -----------------------------------------------------------------------
  console.log('\n[phase-2a] Mockup Designer')
  const { runMockupDesigner } = await import('./agents/mockup-designer.js')
  const { runMockupCritic } = await import('./agents/mockup-critic.js')
  const { captureHtmlFileScreenshot } = await import('./utils/snapshot.js')
  const { buildLessonsBlock } = await import('./utils/lessons.js')

  const mockupDesignerPromptRaw = await readFile(path.join(promptDir, 'mockup-designer.md'), 'utf8')
  const mockupCriticPromptRaw = await readFile(path.join(promptDir, 'mockup-critic.md'), 'utf8')
  const mockupCriticSystemPrompt = `${mockupCriticPromptRaw}\n\n## Design Critique Heuristics\n\n${refCritique}`

  // polish.md is ALWAYS loaded for the designer — but in the USER prompt
  // (12.1KB; keeping the system prompt under the CLI 2.1.92 ~56KB failure
  // zone — Task 8 review measured the system-prompt budget). bolder.md is
  // conditional on a committed/drenched color stance; overdrive.md is NOT
  // loaded (size cap); refResponsive is NOT appended — its rules are
  // already salvaged into mockup-designer.md's Responsive section.
  const refPolish = await readFile(path.join(refDir, 'polish.md'), 'utf8')
  const colorStory = JSON.stringify(artDirectorResult.colorScheme || {}).toLowerCase() + visualSpec.toLowerCase()
  const isCommitted = /drench|committed|saturat|maximal/.test(colorStory)
  const conditionalRefs = []
  if (isCommitted) {
    conditionalRefs.push(await readFile(path.join(refDir, 'bolder.md'), 'utf8'))
  }
  const seedPath = selectSeed(chosenArchetype || 'stack')
  const seedContent = readFileSync(seedPath, 'utf8')
  console.log(`  injecting seed: ${path.basename(seedPath)}; conditional refs: ${conditionalRefs.length}`)
  const mockupDesignerSystemPrompt = [
    mockupDesignerPromptRaw.replace('<!-- SEED_ANCHOR -->', seedContent),
    brandRegisterDeclaration,
    refTypography,
    refColor,
    refSpatial,
    ...conditionalRefs,
    brandContract,
  ].join('\n\n')
  console.log(`  mockup-designer system prompt: ${(mockupDesignerSystemPrompt.length / 1024).toFixed(0)}KB`)
  // Budget check: ~12KB prompt + 2.2 seed + 9.3 brand + 8.3 typography +
  // 5.8 color + 3.5 spatial + 1.8 contract ≈ 43KB; +6.5 bolder on
  // committed days ≈ 49KB. Hard-warn if it ever crosses 54KB.
  if (mockupDesignerSystemPrompt.length > 54 * 1024) {
    console.warn(`  ⚠ mockup-designer system prompt ${(mockupDesignerSystemPrompt.length / 1024).toFixed(0)}KB exceeds the 54KB guard (CLI 2.1.92 fails ~56KB)`)
  }

  // Calibration: best past render of today's archetype (warms up as
  // screenshots accumulate from Task 1). Text note only — the screenshot
  // itself would blow the prompt budget; the measured stats carry the value.
  let calibrationNote = ''
  try {
    const { readRecentRatings } = await import('./utils/ratings.js')
    const rated = readRecentRatings(path.join(ROOT, 'archive'), { lookbackDays: 30 })
    const best = rated.find(r => r.grade === 'A') || rated.find(r => r.grade === 'B')
    if (best) calibrationNote = `## Calibration\n\nThe owner graded ${best.date} an ${best.grade}${best.worked ? ` — what worked: ${best.worked}` : ''}. That is the execution bar.`
  } catch { /* non-blocking */ }

  const lessonsBlock = buildLessonsBlock(path.join(ROOT, 'archive'), { limit: 7 })
  const archetypeContractBlock = buildArchetypeContractBlock(chosenArchetype) || ''
  const { readFile: readAsset } = await import('fs/promises')
  const brandSvg = await readAsset(path.join(ROOT, 'app/assets/logo.svg'), 'utf8')
  const brandMonoSvg = await readAsset(path.join(ROOT, 'app/assets/logo-mono.svg'), 'utf8')
  const googleFontsUrl = buildGoogleFontsUrl(chosenChassis)

  const mockupPath = path.join(ROOT, 'signals', 'today.mockup.html')
  const mockupCtxBase = {
    enrichedBrief,
    tokenContext,
    contentSummary,
    measurables: artDirectorResult.measurables,
    shell: artDirectorResult.shell,
    brandSvg,
    brandMonoSvg,
    googleFontsUrl,
    lessonsBlock,
    calibrationNote,
    archetypeContractBlock,
    polishRef: refPolish,
    systemPrompt: mockupDesignerSystemPrompt,
    failureDumpPath: path.join(ROOT, 'signals', 'mockup-designer-last-failed.txt'),
  }

  let mockup
  let mockupScreenshot = null
  let revisionFeedback = ''
  const MAX_MOCKUP_REVISIONS = 2
  for (let round = 0; round <= MAX_MOCKUP_REVISIONS; round++) {
    const t0Mockup = Date.now()
    try {
      mockup = await runMockupDesigner({ ...mockupCtxBase, revisionFeedback })
    } catch (err) {
      console.error(`  Mockup Designer failed (round ${round}): ${err.message}`)
      await restore(originalBackup)
      throw new Error(`Mockup Designer failed: ${err.message}`)
    }
    await writeFile(mockupPath, mockup.mockupHtml, 'utf8')

    console.log(`\n[phase-2b] Mockup Critic (round ${round})`)
    try {
      mockupScreenshot = await captureHtmlFileScreenshot(mockupPath, { width: 1440, height: 900 })
    } catch (err) {
      console.warn(`  mockup screenshot failed (non-blocking — skipping critic): ${err.message}`)
      break
    }
    let critique
    try {
      critique = await runMockupCritic({
        systemPrompt: mockupCriticSystemPrompt,
        screenshotBuffer: mockupScreenshot,
        enrichedBrief,
        measurables: artDirectorResult.measurables,
        shell: artDirectorResult.shell,
      })
    } catch (err) {
      console.warn(`  mockup critic failed (non-blocking — accepting mockup): ${err.message}`)
      break
    }
    verdicts.push({ critic: 'mockup-critic', round, verdict: critique.verdict, feedback: critique.feedback.slice(0, 2000), ts: Date.now() })
    trace.addStep({
      name: 'mockup-critic',
      phase: 2,
      input: { round },
      output: { verdict: critique.verdict, feedback: critique.feedback.slice(0, 500) },
      durationMs: Date.now() - t0Mockup,
    })
    if (critique.verdict === 'APPROVE') {
      console.log('  [mockup-critic] APPROVE')
      break
    }
    if (round === MAX_MOCKUP_REVISIONS) {
      console.warn(`  [mockup-critic] still REVISE after ${MAX_MOCKUP_REVISIONS} revisions — proceeding with latest mockup; findings go to lessons`)
      break
    }
    console.log(`  [mockup-critic] REVISE — feeding back to designer`)
    revisionFeedback = critique.feedback
  }

  // -----------------------------------------------------------------------
  // Phase 2c: React Engineer — translate the approved mockup to TSX
  // -----------------------------------------------------------------------
  console.log('\n[phase-2c] React Engineer')
  const reactEngineerPromptRaw = await readFile(path.join(promptDir, 'react-engineer.md'), 'utf8')
  const reactEngineerSystemPrompt = `${reactEngineerPromptRaw}\n\n${designSystemRef}${brandRegisterDeclaration}`

  const buildEngineerUserPrompt = () => [
    '## Approved Mockup (mockup.html — your fidelity target)\n\n```html\n' + mockup.mockupHtml + '\n```',
    '## Interior Notes (how About/Work adapt the system)\n\n' + mockup.interiorNotes,
    '## Design Tokens (elements/preset.ts)\n\n```typescript\n' + tokenContext + '\n```',
    '## Hero Copy\n\n' + artDirectorResult.heroCopy,
    '## Shell Declaration\n\n' + artDirectorResult.shell,
    '## One-line Design Brief (for og:description context)\n\n' + (artDirectorResult.designBrief || ''),
  ].join('\n\n---\n\n')

  const REQUIRED_FILES = [
    'app/components/Layout.tsx',
    'app/components/Sidebar.tsx',
    'app/routes/index.tsx',
    'app/routes/about.tsx',
    'app/routes/work.$slug.tsx',
    'app/routes/og.tsx',
  ]

  let engineerResult
  const t0Engineer = Date.now()
  try {
    engineerResult = await callAgent('react-engineer', reactEngineerSystemPrompt, buildEngineerUserPrompt(), null, { model: 'sonnet', timeoutMs: 1500000, stallTimeoutMs: 1200000 })
  } catch (err) {
    console.error(`  React Engineer failed: ${err.message}`)
    await restore(originalBackup)
    throw new Error(`React Engineer failed: ${err.message}`)
  }
```

Keep the existing required-files retry block intact below this, with three renames: `designerResult` → `engineerResult`, `'unified-designer'` → `'react-engineer'`, `unifiedDesignerSystemPromptWithSeed`/`designerUserPrompt` → `reactEngineerSystemPrompt`/`buildEngineerUserPrompt()` — and the REQUIRED_FILES list above (now including `og.tsx`). Keep the `writeFiles`, trace step (rename to `react-engineer`), and Layout.tsx existence check.

- [ ] **Step 2: Update the two retry `agentConfig` maps and `FILE_OWNERSHIP`**

Both `agentConfig` maps (screenshot-critic retry ~line 1148 and Phase 5 ~line 1255) become:

```js
        const agentConfig = {
          'react-engineer': {
            prompt: reactEngineerSystemPrompt,
            user: buildEngineerUserPrompt,
            options: { model: 'sonnet', timeoutMs: 1500000, stallTimeoutMs: 1200000 },
          },
        }
```

Change `retryAgents = ['unified-designer']` → `['react-engineer']`, the responsible-agent fallback `|| 'unified-designer'` → `|| 'react-engineer'`, and `if (agent === 'unified-designer') designerResult = retryResult` → `if (agent === 'react-engineer') engineerResult = retryResult`. Search the top of the file for `FILE_OWNERSHIP` and `identifyFailingAgent` and replace every `'unified-designer'` value with `'react-engineer'`; add `'app/routes/og.tsx': 'react-engineer'` to `FILE_OWNERSHIP`. Also delete the now-dead `if (responsibleAgent === 'token-designer')` branches (lines ~1165–1170, ~1184) and remove the `buildMessages`-based `unifiedDesignerBasePrompt`/`unifiedDesignerSystemPrompt` construction (lines ~529–542) — `grep -n "unifiedDesigner\|unified-designer" scripts/design-agents.js` must return zero live references when done. Add the mockup artifacts to BOTH `archive()` artifacts objects:

```js
      'mockup.html': mockup?.mockupHtml ?? null,
      'mockup-screenshot.png': mockupScreenshot,
```

- [ ] **Step 3: Rescope `scripts/prompts/screenshot-critic.md`**

Replace its Section 8 ("Hero Phrase Execution" stays) and add a new final section + update the verdict count line accordingly:

```markdown
### Mockup fidelity (replaces taste judgment)

The user prompt includes the approved mockup screenshot alongside the
rendered-page screenshot. The design was already approved at the mockup
gate — your question is mechanical: does the built page match the mockup?
Compare composition, hero scale, color application, shell. Divergence →
REVISE with **Responsible agent:** react-engineer and a specific list of
what diverged.
```

Replace every occurrence of `unified-designer` in this prompt with `react-engineer`. In the orchestrator's screenshot-critic user prompt (~line 1113), add the mockup screenshot when available:

```js
        mockupScreenshot
          ? 'The APPROVED MOCKUP screenshot (fidelity target):\n\n![Mockup](data:image/png;base64,' + mockupScreenshot.toString('base64') + ')'
          : '',
```

(insert as an additional array element before the rendered-page screenshot element).

- [ ] **Step 4: Delete the retired prompt + fix tests**

```bash
git rm scripts/prompts/unified-designer.md
```

Run: `pnpm vitest run` — fix fixtures referencing `unified-designer` (`grep -rln "unified-designer" tests/`): rename to `react-engineer` where they exercise live paths; `tests/select-seed.test.js` and prompt-builder tests may need the SEED_ANCHOR host moved to `mockup-designer.md` (the `buildMessages` prompt-builder is still used by `scripts/generate-redesign.js` for local dev — if `generate-redesign.js` references unified-designer.md, point it at the new mockup flow or mark it deprecated with a console warning; do NOT leave a broken import).

Expected: full suite green.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(orchestrator): mockup designer + blocking critic + react engineer replace unified designer"
```

---

### Task 14: Ratings loop — GitHub issue harvest + workflow

**Files:**
- Create: `scripts/collect-ratings.js`
- Test: `tests/scripts/collect-ratings.test.js`
- Modify: `scripts/design-agents.js` (swap `recentRatings` source), `.github/workflows/daily-redesign.yml`
- Delete: dev-rate endpoint usage (see Step 6)

- [ ] **Step 1: Write the failing parser test**

```js
// tests/scripts/collect-ratings.test.js
import { describe, it, expect } from 'vitest'
import { parseRatingFromIssue } from '../../scripts/collect-ratings.js'

const issue = (body, comments = []) => ({ number: 12, title: 'Rate: 2026-06-12 — "X"', body, comments })

describe('parseRatingFromIssue', () => {
  it('parses a fenced yaml rating from the latest comment', () => {
    const r = parseRatingFromIssue(issue('template', [
      { body: 'first' },
      { body: '```yaml\ngrade: B\nworked: the drench\ndidnt: footer\ntry: fold it in\n```' },
    ]))
    expect(r).toEqual({ date: '2026-06-12', grade: 'B', worked: 'the drench', didnt: 'footer', try: 'fold it in' })
  })
  it('falls back to the issue body when no comment has yaml', () => {
    const r = parseRatingFromIssue(issue('```yaml\ngrade: A\nworked: ""\ndidnt: ""\ntry: ""\n```'))
    expect(r.grade).toBe('A')
  })
  it('returns null for an unfilled template (no valid grade)', () => {
    expect(parseRatingFromIssue(issue('```yaml\ngrade: \nworked: ""\n```'))).toBeNull()
  })
  it('returns null when the title has no date', () => {
    const r = parseRatingFromIssue({ number: 1, title: 'nonsense', body: '```yaml\ngrade: A\n```', comments: [] })
    expect(r).toBeNull()
  })
})
```

Run: `pnpm vitest run tests/scripts/collect-ratings.test.js` — FAIL.

- [ ] **Step 2: Implement `scripts/collect-ratings.js`**

```js
#!/usr/bin/env node
/**
 * Harvest daily-rating GitHub issues into archive/{date}/rating-{ts}.json
 * (new schema: { date, grade, worked, didnt, try, timestamp }), then close
 * each harvested issue. Runs as the first pipeline step in CI; requires
 * GH_TOKEN (the workflow's GITHUB_TOKEN). Degrades to a no-op locally or
 * when gh is unavailable. Never fails the run.
 */
import { execFileSync } from 'child_process'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'

const ROOT = resolve(import.meta.dirname, '..')

export function parseRatingFromIssue(issue) {
  const dateMatch = /Rate:\s*(\d{4}-\d{2}-\d{2})/.exec(issue.title || '')
  if (!dateMatch) return null
  const date = dateMatch[1]
  const sources = [...(issue.comments || []).map((c) => c.body).reverse(), issue.body || '']
  for (const text of sources) {
    const fence = /```ya?ml\s*\n([\s\S]*?)```/.exec(text || '')
    if (!fence) continue
    const kv = {}
    for (const line of fence[1].split('\n')) {
      const m = /^\s*(grade|worked|didnt|try)\s*:\s*(.*?)\s*$/.exec(line)
      if (m) kv[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
    if (kv.grade && /^[A-Da-d]$/.test(kv.grade)) {
      return { date, grade: kv.grade.toUpperCase(), worked: kv.worked || '', didnt: kv.didnt || '', try: kv.try || '' }
    }
  }
  return null
}

function harvest() {
  let issues
  try {
    const raw = execFileSync('gh', ['issue', 'list', '--label', 'daily-rating', '--state', 'open', '--json', 'number,title,body,comments', '--limit', '30'], { encoding: 'utf8' })
    issues = JSON.parse(raw)
  } catch (err) {
    console.log(`[collect-ratings] gh unavailable or no issues (non-blocking): ${err.message.split('\n')[0]}`)
    return
  }
  let harvested = 0
  for (const issue of issues) {
    const rating = parseRatingFromIssue(issue)
    if (!rating) {
      console.log(`[collect-ratings] #${issue.number} not yet filled — leaving open`)
      continue
    }
    const dateDir = join(ROOT, 'archive', rating.date)
    try {
      mkdirSync(dateDir, { recursive: true })
      const ts = Date.now()
      writeFileSync(join(dateDir, `rating-${ts}.json`), JSON.stringify({ ...rating, timestamp: ts }, null, 2))
      execFileSync('gh', ['issue', 'close', String(issue.number), '--comment', `Harvested: grade ${rating.grade}. This feeds tomorrow's run.`])
      harvested++
      console.log(`[collect-ratings] #${issue.number} → archive/${rating.date}/rating-${ts}.json (grade ${rating.grade})`)
    } catch (err) {
      console.warn(`[collect-ratings] #${issue.number} harvest failed (non-blocking): ${err.message}`)
    }
  }
  console.log(`[collect-ratings] harvested ${harvested} rating(s)`)
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  harvest()
}
```

Run: `pnpm vitest run tests/scripts/collect-ratings.test.js` — PASS.

- [ ] **Step 3: Swap the orchestrator's ratings source**

In `scripts/design-agents.js`, delete the entire legacy ratings block (lines ~620–667, the `let recentRatings = ''` try/catch with the 5-axis `Scores:` formatting) and replace with:

```js
  const { buildRecentRatingsBlock } = await import('./utils/ratings.js')
  const recentRatings = buildRecentRatingsBlock(path.join(ROOT, 'archive'), { lookbackDays: 10 })
```

`recentRatings` is already threaded into the AD prompt; also pass `lessonsBlock`-style ratings into the mockup designer via the existing `lessonsBlock` (already done in Task 13 — ratings critiques flow through lessons).

- [ ] **Step 4: Workflow — harvest step + rating-issue step**

In `.github/workflows/daily-redesign.yml`, add after "Install Claude CLI" (before "Collect signals"):

```yaml
      - name: Harvest ratings from GitHub issues
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node scripts/collect-ratings.js
```

In the "Push changes" step, add harvested ratings to staging (after the build-dir loop):

```bash
          git add archive/*/rating-*.json 2>/dev/null || true
```

Add a new step after "Push changes":

```yaml
      - name: Open today's rating issue
        if: ${{ !inputs.dry_run && success() }}
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs')
            const today = new Date().toISOString().slice(0, 10)
            let brief = ''
            try {
              const briefMd = fs.readFileSync(`archive/${today}/brief.md`, 'utf8')
              brief = briefMd.match(/\*\*Design Brief:\*\*\s*(.+)/)?.[1] || ''
            } catch {}
            const hero = brief.slice(0, 60) || today
            const img = `https://raw.githubusercontent.com/${context.repo.owner}/${context.repo.repo}/main/public/archive/${today}.png`
            const body = [
              `![today's design](${img})`,
              ``,
              brief ? `> ${brief}` : '',
              ``,
              `Live: https://doug-march.com · [Archive entry](https://doug-march.com/archive/${today})`,
              ``,
              `Rate it (edit the YAML in a reply, ~2 min):`,
              '```yaml',
              'grade: B        # A-D',
              'worked: ""',
              `didnt: ""`,
              'try: ""',
              '```',
            ].join('\n')
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Rate: ${today} — "${hero}"`,
              body,
              labels: ['daily-rating'],
            })
```

Create the label once (manual, one-time): `gh label create daily-rating --description "Daily design rating" --color FBCA04`

- [ ] **Step 5: Run suite**

Run: `pnpm vitest run`
Expected: green (legacy-ratings tests, if any exist for the deleted block, are removed/updated).

- [ ] **Step 6: Retire the dev-rate endpoint**

In `vite.config.ts`, delete the `/api/dev-rate` middleware block (lines ~376–470) and in the dev panel (`app/dev-panel.tsx` or `app/routes/dev.tsx` — find with `grep -rln "dev-rate" app/`) remove the rating form UI (keep the panel's other functions). Run `pnpm build` to confirm nothing references the removed endpoint.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(ratings): GitHub-issue rating loop replaces dev-panel ratings"
```

---

### Task 15: OG images + share-sheet meta

**Files:**
- Create: `scripts/utils/og-meta.js`
- Modify: `scripts/utils/snapshot.js` (route screenshot), `scripts/utils/chassis.js` (`renderRootTemplate`), `scripts/templates/__root.tsx.template`, `scripts/design-agents.js`, `.github/workflows/daily-redesign.yml`
- Test: `tests/utils/og-meta.test.js`, e2e check

- [ ] **Step 1: Write the failing tests**

```js
// tests/utils/og-meta.test.js
import { describe, it, expect } from 'vitest'
import { buildOgMetaEntries } from '../../scripts/utils/og-meta.js'

describe('buildOgMetaEntries', () => {
  it('emits og + twitter entries with escaped content', () => {
    const code = buildOgMetaEntries({
      date: '2026-06-12',
      heroCopy: 'SAY "LESS"',
      designBrief: 'A drenched teal stack.',
      siteUrl: 'https://doug-march.com',
    })
    expect(code).toContain(`property: 'og:image'`)
    expect(code).toContain('https://doug-march.com/og/2026-06-12.png')
    expect(code).toContain(JSON.stringify('SAY "LESS"')) // escaped via JSON.stringify
    expect(code).toContain(`'summary_large_image'`)
    expect(code).toContain(`property: 'og:description'`)
  })
})
```

Run: `pnpm vitest run tests/utils/og-meta.test.js` — FAIL.

- [ ] **Step 2: Implement `scripts/utils/og-meta.js`**

```js
// scripts/utils/og-meta.js
/**
 * Build the OG/twitter meta entries injected into the {{OG_META}}
 * placeholder of scripts/templates/__root.tsx.template. Returns TSX
 * source — object literals joined by newlines, each ending in a comma —
 * shaped for TanStack's head() meta array.
 */
export function buildOgMetaEntries({ date, heroCopy, designBrief, siteUrl = 'https://doug-march.com' }) {
  const title = JSON.stringify(heroCopy || 'Doug March')
  const description = JSON.stringify(designBrief || 'A multi-agent pipeline redesigns this site every morning.')
  const image = JSON.stringify(`${siteUrl}/og/${date}.png`)
  const url = JSON.stringify(siteUrl)
  return [
    `{ property: 'og:title', content: ${title} },`,
    `{ property: 'og:description', content: ${description} },`,
    `{ property: 'og:image', content: ${image} },`,
    `{ property: 'og:image:width', content: '1200' },`,
    `{ property: 'og:image:height', content: '630' },`,
    `{ property: 'og:url', content: ${url} },`,
    `{ property: 'og:type', content: 'website' },`,
    `{ name: 'twitter:card', content: 'summary_large_image' },`,
    `{ name: 'twitter:title', content: ${title} },`,
    `{ name: 'twitter:image', content: ${image} },`,
  ].join('\n        ')
}
```

Run the test — PASS.

- [ ] **Step 3: Template + `renderRootTemplate`**

In `scripts/templates/__root.tsx.template`, inside the `meta: [` array (after the viewport entry), add a line containing only:

```
        {{OG_META}}
```

In `scripts/utils/chassis.js:117`, change:

```js
export function renderRootTemplate(googleFontsUrl, ogMeta = '') {
  const template = readFileSync(TEMPLATE_PATH, 'utf8')
  if (!template.includes('{{GOOGLE_FONTS_URL}}')) {
    throw new Error('__root.tsx.template missing {{GOOGLE_FONTS_URL}} placeholder')
  }
  if (!template.includes('{{OG_META}}')) {
    throw new Error('__root.tsx.template missing {{OG_META}} placeholder')
  }
  return template
    .replace('{{GOOGLE_FONTS_URL}}', googleFontsUrl)
    .replace('{{OG_META}}', ogMeta)
}
```

Update existing chassis tests that call `renderRootTemplate` (find via `grep -rln "renderRootTemplate" tests/`) — they should still pass with the default `ogMeta=''` once their fixture template has the placeholder; if a test uses a fixture template, add the placeholder line there too.

- [ ] **Step 4: Orchestrator wiring**

In `scripts/design-agents.js` where `__root.tsx` is generated (~line 803), change to:

```js
    const { buildOgMetaEntries } = await import('./utils/og-meta.js')
    const ogMeta = buildOgMetaEntries({
      date: signals.date || new Date().toISOString().slice(0, 10),
      heroCopy: artDirectorResult.heroCopy,
      designBrief: artDirectorResult.designBrief,
    })
    const rootSrc = renderRootTemplate(buildGoogleFontsUrl(chosenChassis), ogMeta)
```

Add `captureRouteScreenshot` to `scripts/utils/snapshot.js` (after `captureHtmlFileScreenshot`) — same preview-server pattern as `captureScreenshot` but parameterized:

```js
/**
 * Screenshot a specific route of the built site at an exact viewport.
 * Used for the daily OG card (route '/og' at 1200×630).
 */
export async function captureRouteScreenshot({ route = '/', width = 1200, height = 630, port } = {}) {
  const { chromium } = await import('playwright')
  let server = null
  let serverPort = port
  if (!serverPort) {
    serverPort = 14000 + Math.floor(Math.random() * 1000)
    server = spawn('npx', ['vite', 'preview', '--port', String(serverPort)], { cwd: ROOT, stdio: 'pipe' })
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Preview server timeout')), 15000)
      server.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('Local:')) { clearTimeout(timeout); resolve() }
      })
      server.on('error', (err) => { clearTimeout(timeout); reject(err) })
    })
  }
  try {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width, height } })
    await page.goto(`http://localhost:${serverPort}${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    const shot = await page.screenshot({ type: 'png', fullPage: false })
    await browser.close()
    return shot
  } finally {
    if (server) server.kill()
  }
}
```

In the orchestrator's success path (inside the `if (buildResult.success)` block, after the screenshot-critic section, BEFORE `archive()`), add:

```js
    // OG card capture — best-effort; the share sheet falls back to
    // yesterday's image if this fails (the meta URL is date-stamped, so a
    // missing file means no preview image — acceptable, never blocking).
    try {
      const { captureRouteScreenshot } = await import('./utils/snapshot.js')
      const ogBuffer = await captureRouteScreenshot({ route: '/og', width: 1200, height: 630 })
      const ogDir = path.join(ROOT, 'public', 'og')
      await mkdir(ogDir, { recursive: true })
      await writeFile(path.join(ogDir, `${signals.date}.png`), ogBuffer)
      console.log(`  [og] wrote public/og/${signals.date}.png (${(ogBuffer.length / 1024).toFixed(0)}KB)`)
    } catch (err) {
      console.warn(`  [og] capture failed (non-blocking): ${err.message}`)
    }
```

Mirror the same block in the Phase-5 retry success path before its `archive()` call.

- [ ] **Step 5: Workflow staging + e2e check**

In `.github/workflows/daily-redesign.yml` push step, extend the `git add` line:

```bash
          git add elements/ app/components/ app/routes/ public/archive/ public/og/ signals/today.references.md
```

Add an e2e assertion to the site-health suite (find the suite: `ls tests/e2e/`), in a new or existing spec file:

```js
test('shell HTML carries og meta', async ({ page }) => {
  await page.goto('/')
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
  expect(ogImage).toMatch(/\/og\/\d{4}-\d{2}-\d{2}\.png$/)
  const card = await page.locator('meta[name="twitter:card"]').getAttribute('content')
  expect(card).toBe('summary_large_image')
})
```

Note: this e2e test will fail until the first pipeline run generates a real `__root.tsx` with meta — to make it pass now, run the orchestrator's root-generation manually once: `node -e "import('./scripts/utils/chassis.js').then(async m => { const { CHASSIS_CATALOG } = await import('./scripts/design-agents.js'); /* skip */ })"` is overkill; instead regenerate `__root.tsx` with placeholder meta by calling `renderRootTemplate(buildGoogleFontsUrl(<current chassis>), buildOgMetaEntries({ date: <today>, heroCopy: 'Doug March', designBrief: '' }))` in a small one-off script, or accept the test as pending until the Task 17 verification run produces the file. Mark it `test.fixme` if shipping the e2e suite before the first run.

- [ ] **Step 6: Run suites + commit**

Run: `pnpm vitest run && pnpm build`
Expected: unit green; build green.

```bash
git add -A
git commit -m "feat(og): daily OG card route capture + share-sheet meta injection"
```

---

### Task 16: Seed permission-overrides + docs cleanup

**Files:**
- Modify: all 8 `scripts/prompts/seeds/*.md`, `TODO.md`, `docs/specs/02-designer-engineer-split.md`, `docs/specs/06-pipeline-variance.md`
- Test: extend `tests/scripts/prompt-guards.test.js`

- [ ] **Step 1: Write the failing guard test**

```js
import { readdirSync } from 'fs'

describe('seed permission overrides', () => {
  const seedDir = path.join(promptDir, 'seeds')
  const seeds = readdirSync(seedDir).filter((f) => f.endsWith('.md') && f !== 'README.md')
  it('every seed declares itself one lane, not the law', () => {
    expect(seeds.length).toBeGreaterThanOrEqual(8)
    for (const f of seeds) {
      const content = readFileSync(path.join(seedDir, f), 'utf8')
      expect(content, `${f} missing permission override`).toContain('## This is one lane')
    }
  })
})
```

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js` — FAIL.

- [ ] **Step 2: Append to each of the 8 seed files**

Append this section verbatim to every seed in `scripts/prompts/seeds/` (skip README.md):

```markdown
## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
```

- [ ] **Step 3: Docs updates**

- `docs/specs/02-designer-engineer-split.md`: add at the top: `> **SUPERSEDED** by docs/superpowers/specs/2026-06-11-design-quality-pipeline-design.md (implemented).`
- `docs/specs/06-pipeline-variance.md`: add at the top: `> **PARTIALLY ABSORBED** — shell/archetype variance shipped as scripts/utils/shell-mandate.js (2026-06). The /dev/variance dashboard remains unimplemented and parked.`
- `TODO.md`: mark item 2 done (designer/engineer split — shipped via the design-quality pipeline), item 6 partially done (shell mandate shipped; dashboard parked), and add under "Done (recent)": `- [x] Design-quality pipeline — mockup designer/critic/engineer split, shell mandate, GitHub-issue ratings, OG images (feat/design-quality-pipeline)`.

- [ ] **Step 4: Run guards + commit**

Run: `pnpm vitest run tests/scripts/prompt-guards.test.js`
Expected: PASS.

```bash
git add scripts/prompts/seeds/ TODO.md docs/specs/02-designer-engineer-split.md docs/specs/06-pipeline-variance.md tests/scripts/prompt-guards.test.js
git commit -m "chore(seeds+docs): seed permission overrides; mark specs 02/06 superseded"
```

---

### Task 17: Verification protocol (local, $0, Max-plan auth)

No code. Evidence before claims — the pipeline is only "working" when witnessed.

- [ ] **Step 1: Preconditions**

`git pull` is NOT needed (branch is current); confirm `.env` has no `ANTHROPIC_API_KEY` (`grep ANTHROPIC .env` → nothing). `pnpm vitest run && pnpm build` green. `pnpm exec playwright install chromium` if Playwright complains.

- [ ] **Step 2: Run 1 — defaults (risk=8)**

```bash
node scripts/run-pipeline.js
```

Watch for, and record in a verification note (`docs/superpowers/measurements/2026-06-XX-design-quality-verification.md`):
- `[phase-0+1]` logs `shell:` and `measurables:` lines
- `[phase-2a/2b]` mockup rounds; critic verdict with numeric estimates
- `[phase-2c]` engineer produced all six files including og.tsx
- Build passes; screenshot critic compares against mockup
- `[og]` wrote `public/og/{date}.png` — open it, confirm 1200×630 and that it shows the day's design
- Build dir contains: `mockup.html`, `mockup-screenshot.png`, `screenshot.png`, `shell.json`, `verdicts.json`
- `public/archive/{date}.png` exists
- Open `signals/today.mockup.html` AND the built site (`pnpm dev`) side-by-side — judge fidelity with your own eyes; screenshot both for the note

- [ ] **Step 3: Runs 2 and 3 — different weights**

```bash
WEIGHT_SIGNALS=2 WEIGHT_INSPIRATION=9 WEIGHT_RISK=8 node scripts/run-pipeline.js
WEIGHT_RISK=4 node scripts/run-pipeline.js
```

Confirm: the three runs produce visibly different shells (check the three `shell.json` files differ in nav/footer/lockup), the mockup-critic loop engages at least once across runs (a REVISE→revision cycle witnessed), and no run dead-ends.

- [ ] **Step 4: Test the rating loop end-to-end (manual)**

Create a test issue: `gh issue create --label daily-rating --title 'Rate: <run-1 date> — "test"' --body '<the yaml template with grade: B filled>'`, then `GH_TOKEN=$(gh auth token) node scripts/collect-ratings.js`. Confirm `archive/<date>/rating-*.json` written with the new schema and the issue closed. Then run a quick `node -e "import('./scripts/utils/lessons.js').then(m => console.log(m.buildLessonsBlock('archive', { limit: 7 })))"` and confirm the rating's critique appears.

- [ ] **Step 5: Commit verification note + report**

```bash
git add docs/superpowers/measurements/
git commit -m "docs(verification): 3-run local verification evidence for design-quality pipeline"
```

Report results to Doug with screenshots (per his verification-before-done rule). THEN: one CI dry-run (`gh workflow run daily-redesign.yml -f dry_run=true`, ~$3.50) before merging to main.

---

## Self-review checklist (done at plan-writing time)

- **Spec coverage:** AD upgrades→T7; shell mandate→T5+T7; seeds→T16; mockup designer→T8+T9; mockup critic→T10+T13; persistence/lessons→T1+T11; ratings→T11+T14; brand→T6; OG→T12+T15; engineer + UD retirement→T12+T13; cleanup→T2+T13+T14+T16; references seeding session→deliberately NOT a plan task (it's a working session with Doug, scheduled after ship).
- **Type consistency:** `parseShellBlock`/`parseMeasurablesBlock` (T3) used in T7; `artDirectorResult.measurables/.shell` raw strings flow to prompts, parsed objects to `shell.json`; `verdicts` array (T1) appended by T13's mockup loop; `buildLessonsBlock` (T11) consumed in T13; `engineerResult` naming consistent in T13.
- **Known risk to watch during T13:** assembled mockup-designer system prompt size — log it (the `console.log` is in the code) and keep under ~56KB (CLI 2.1.92 ceiling). If over: drop `refResponsive` from the designer (the engineer re-applies responsive rules) before anything else.
