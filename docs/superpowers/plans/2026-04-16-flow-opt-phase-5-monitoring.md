# Flow Optimization — Phase 5: Monitoring Queries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build aggregate monitoring on top of the `color-scheme.json` archives from Phase 1 — answer "are designs actually getting more varied?" via weekly hue-diversity, ratings trend, and references-library growth. Ship as a CLI-runnable report; dev-panel UI tile is optional.

**Architecture:** Pure Node module (`scripts/utils/monitoring.js`) with no LLM calls. Each query reads the archive tree (`archive/<date>/build-<id>/`) and computes a structured result. A CLI runner (`scripts/monitor.js`) invokes the queries and prints a markdown report. Optional dev-panel tile renders the same report for in-browser viewing.

**Tech Stack:** Node.js ESM, Vitest with archive fixtures.

**Related:** Prerequisite: Phase 1 (needs `color-scheme.json` files in archive). Optional: Phase 2's colorMandate is read to check compliance. Independent of Phases 3 and 4.

---

## File Structure

**New files:**
- `scripts/utils/monitoring.js` — exports `computeHueDiversity({ archiveDir, lookbackDays })`, `computeRatingsTrend({ archiveDir, lookbackDays })`, `countReferencesLibrary({ referencesDir, cacheDir })`, `buildWeeklyReport(opts)`
- `tests/utils/monitoring.test.js` — unit tests using archive fixtures
- `scripts/monitor.js` — CLI entry point
- `tests/fixtures/archive-monitoring/` — fixture archive tree (extends the one from Phase 2 with ratings)

**Modified files:**
- `package.json` — add `"monitor": "node scripts/monitor.js"` script

**Optional (deferred):**
- `app/dev-panel.tsx` — new "Palette Variety" tile

---

## Task 1: Create monitoring fixtures

**Files:**
- Create: fixture archive under `tests/fixtures/archive-monitoring/`

- [ ] **Step 1: Create fixture directory structure**

```bash
mkdir -p tests/fixtures/archive-monitoring/2099-01-01/build-1
mkdir -p tests/fixtures/archive-monitoring/2099-01-02/build-1
mkdir -p tests/fixtures/archive-monitoring/2099-01-03/build-1
mkdir -p tests/fixtures/archive-monitoring/2099-01-04/build-1
mkdir -p tests/fixtures/archive-monitoring/2099-01-05/build-1
```

- [ ] **Step 2: Write color-scheme.json files with varied + repeated hues**

Create `tests/fixtures/archive-monitoring/2099-01-01/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 30, "s": 70, "l": 50, "name": "amber" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "warm", "name": "stone" },
  "mood_word": "cozy",
  "color_story": "Amber."
}
```

Create `tests/fixtures/archive-monitoring/2099-01-02/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 30, "s": 65, "l": 48, "name": "terracotta" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "warm", "name": "stone" },
  "mood_word": "earthy",
  "color_story": "Terracotta — similar hue to yesterday."
}
```

Create `tests/fixtures/archive-monitoring/2099-01-03/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 215, "s": 70, "l": 50, "name": "ocean" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "blue", "name": "slate" },
  "mood_word": "crisp",
  "color_story": "Ocean clarity."
}
```

Create `tests/fixtures/archive-monitoring/2099-01-04/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 340, "s": 80, "l": 55, "name": "magenta" },
  "secondary_accent": { "h": 60, "s": 90, "l": 55, "name": "citrus" },
  "neutral_family": { "tinted_toward": "magenta", "name": "rosewood" },
  "mood_word": "kinetic",
  "color_story": "Electric."
}
```

Create `tests/fixtures/archive-monitoring/2099-01-05/build-1/color-scheme.json`:

```json
{
  "primary_hue": { "h": 150, "s": 65, "l": 45, "name": "forest" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "green", "name": "moss" },
  "mood_word": "grounded",
  "color_story": "Forest."
}
```

- [ ] **Step 3: Add rating files to two of the builds**

Ratings are persisted by the dev-panel API (see `vite.config.ts:~400`) as `rating-<timestamp>.json` files inside each `build-<id>/` directory — multiple ratings per build are possible. Monitoring reads all of them and uses the latest.

Create `tests/fixtures/archive-monitoring/2099-01-03/build-1/rating-1735920000000.json`:

```json
{
  "date": "2099-01-03",
  "buildId": "1",
  "ratings": { "overall": 4, "palette": 5, "composition": 3 },
  "notes": "Ocean palette felt fresh.",
  "timestamp": 1735920000000,
  "saveAsReference": true
}
```

Create `tests/fixtures/archive-monitoring/2099-01-04/build-1/rating-1736006400000.json`:

```json
{
  "date": "2099-01-04",
  "buildId": "1",
  "ratings": { "overall": 5, "palette": 5, "composition": 5 },
  "notes": "Magenta + citrus was a swing.",
  "timestamp": 1736006400000,
  "saveAsReference": true
}
```

- [ ] **Step 4: Commit fixtures**

```bash
git add tests/fixtures/archive-monitoring/
git commit -m "test(fixtures): archive fixture tree for monitoring tests"
```

---

## Task 2: Implement computeHueDiversity

**Files:**
- Create: `scripts/utils/monitoring.js` (with this function)
- Create: `tests/utils/monitoring.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/utils/monitoring.test.js`:

```javascript
import { describe, it, expect } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  computeHueDiversity,
} from '../../scripts/utils/monitoring.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURE = path.resolve(__dirname, '../fixtures/archive-monitoring')

describe('computeHueDiversity', () => {
  it('counts distinct hues in last N days using a 30° bucket size', () => {
    // Fixtures: hues 30, 30, 215, 340, 150 over 5 days
    // With 30° buckets centered at hue / 30: buckets = 1, 1, 7, 11, 5
    // Distinct buckets = {1, 7, 11, 5} = 4
    const result = computeHueDiversity({ archiveDir: FIXTURE, lookbackDays: 5, bucketSize: 30 })
    expect(result.totalBuilds).toBe(5)
    expect(result.distinctHueBuckets).toBe(4)
    expect(result.hues).toEqual(expect.arrayContaining([30, 215, 340, 150]))
    expect(result.meetsTarget).toBe(false) // default target is ≥5
    expect(result.targetDistinct).toBe(5)
  })

  it('respects lookback window', () => {
    const result = computeHueDiversity({ archiveDir: FIXTURE, lookbackDays: 2, bucketSize: 30 })
    expect(result.totalBuilds).toBeLessThanOrEqual(2)
  })

  it('uses configurable distinct target', () => {
    const result = computeHueDiversity({ archiveDir: FIXTURE, lookbackDays: 5, bucketSize: 30, targetDistinct: 3 })
    expect(result.targetDistinct).toBe(3)
    expect(result.meetsTarget).toBe(true) // 4 distinct ≥ 3
  })

  it('handles empty archive gracefully', () => {
    const result = computeHueDiversity({ archiveDir: '/nonexistent', lookbackDays: 7 })
    expect(result.totalBuilds).toBe(0)
    expect(result.distinctHueBuckets).toBe(0)
    expect(result.meetsTarget).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/monitoring.test.js -t "computeHueDiversity"`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement the function**

Create `scripts/utils/monitoring.js`:

```javascript
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'

/**
 * Count distinct hue buckets across the last N archived builds.
 * Returns { totalBuilds, hues, distinctHueBuckets, targetDistinct, meetsTarget }.
 */
export function computeHueDiversity({ archiveDir, lookbackDays = 7, bucketSize = 30, targetDistinct = 5 }) {
  const result = { totalBuilds: 0, hues: [], distinctHueBuckets: 0, targetDistinct, meetsTarget: false }
  if (!existsSync(archiveDir)) return result

  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort().reverse().slice(0, lookbackDays)
  } catch { return result }

  const hues = []
  for (const dateDir of dateDirs) {
    const datePath = path.join(archiveDir, dateDir)
    let buildDirs
    try {
      buildDirs = readdirSync(datePath).filter((b) => b.startsWith('build-')).sort().reverse()
    } catch { continue }
    if (buildDirs.length === 0) continue
    const latest = path.join(datePath, buildDirs[0])
    const schemePath = path.join(latest, 'color-scheme.json')
    if (!existsSync(schemePath)) continue
    try {
      const scheme = JSON.parse(readFileSync(schemePath, 'utf8'))
      if (scheme?.primary_hue?.h != null) hues.push(scheme.primary_hue.h)
    } catch { /* skip */ }
  }

  const buckets = new Set(hues.map((h) => Math.floor(h / bucketSize)))
  result.totalBuilds = hues.length
  result.hues = hues
  result.distinctHueBuckets = buckets.size
  result.meetsTarget = buckets.size >= targetDistinct
  return result
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `pnpm vitest run tests/utils/monitoring.test.js -t "computeHueDiversity"`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/monitoring.js tests/utils/monitoring.test.js
git commit -m "feat(monitoring): computeHueDiversity reads archive color-scheme.json"
```

---

## Task 3: Implement computeRatingsTrend + countReferencesLibrary

**Files:**
- Modify: `scripts/utils/monitoring.js`
- Modify: `tests/utils/monitoring.test.js`

- [ ] **Step 1: Extend the tests**

Append to `tests/utils/monitoring.test.js`:

```javascript
import { computeRatingsTrend, countReferencesLibrary } from '../../scripts/utils/monitoring.js'
import { mkdir, writeFile, rm } from 'fs/promises'
import { existsSync } from 'fs'

describe('computeRatingsTrend', () => {
  it('returns { builds, ratedBuilds, averageOverall } from rated fixtures', () => {
    const result = computeRatingsTrend({ archiveDir: FIXTURE, lookbackDays: 7 })
    expect(result.totalBuilds).toBe(5)
    expect(result.ratedBuilds).toBe(2)
    // overall ratings 4 and 5 → average 4.5
    expect(result.averageOverall).toBeCloseTo(4.5, 2)
  })

  it('returns zero stats on empty archive', () => {
    const result = computeRatingsTrend({ archiveDir: '/nonexistent', lookbackDays: 7 })
    expect(result.totalBuilds).toBe(0)
    expect(result.ratedBuilds).toBe(0)
    expect(result.averageOverall).toBeNull()
  })

  it('counts saveAsReference marks', () => {
    const result = computeRatingsTrend({ archiveDir: FIXTURE, lookbackDays: 7 })
    expect(result.savedAsReference).toBe(2)
  })
})

describe('countReferencesLibrary', () => {
  const TMP = path.resolve(__dirname, '../../.tmp-monitoring-refs')

  it('counts entries in references/index.yml', async () => {
    const refsDir = path.join(TMP, 'references')
    const cacheDir = path.join(refsDir, 'cache')
    await mkdir(cacheDir, { recursive: true })
    await writeFile(path.join(refsDir, 'index.yml'), `
references:
  - file: a.png
    url: https://x/a
    description: one
    tags: { composition: poster, mood: warm, density: sparse }
  - file: b.png
    url: https://x/b
    description: two
    tags: { composition: gallery, mood: cold, density: dense }
`, 'utf8')
    await writeFile(path.join(cacheDir, 'abc123.png'), Buffer.from([0x89, 0x50]))
    await writeFile(path.join(cacheDir, 'def456.jpg'), Buffer.from([0xff, 0xd8]))

    const result = countReferencesLibrary({ referencesDir: refsDir, cacheDir })
    expect(result.curatedEntries).toBe(2)
    expect(result.cachedImages).toBe(2)

    await rm(TMP, { recursive: true, force: true })
  })

  it('returns zeros when nothing exists', () => {
    const result = countReferencesLibrary({ referencesDir: '/nonexistent', cacheDir: '/nonexistent' })
    expect(result.curatedEntries).toBe(0)
    expect(result.cachedImages).toBe(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/monitoring.test.js -t "computeRatingsTrend|countReferencesLibrary"`
Expected: FAIL — functions don't exist.

- [ ] **Step 3: Append implementations to monitoring.js**

Append to `scripts/utils/monitoring.js`:

```javascript
import yaml from 'js-yaml'

/**
 * Aggregate ratings across recent archived builds. Returns
 * { totalBuilds, ratedBuilds, averageOverall (0-5|null), savedAsReference }.
 */
export function computeRatingsTrend({ archiveDir, lookbackDays = 7 }) {
  const result = { totalBuilds: 0, ratedBuilds: 0, averageOverall: null, savedAsReference: 0 }
  if (!existsSync(archiveDir)) return result

  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort().reverse().slice(0, lookbackDays)
  } catch { return result }

  let overallSum = 0
  for (const dateDir of dateDirs) {
    const datePath = path.join(archiveDir, dateDir)
    let buildDirs
    try {
      buildDirs = readdirSync(datePath).filter((b) => b.startsWith('build-')).sort().reverse()
    } catch { continue }
    if (buildDirs.length === 0) continue
    result.totalBuilds++

    const latest = path.join(datePath, buildDirs[0])

    // Find all rating-<timestamp>.json files in the build dir; use the latest.
    let ratingFiles
    try {
      ratingFiles = readdirSync(latest)
        .filter((f) => /^rating-\d+\.json$/.test(f))
        .sort()
        .reverse()
    } catch { continue }

    if (ratingFiles.length === 0) continue

    try {
      const r = JSON.parse(readFileSync(path.join(latest, ratingFiles[0]), 'utf8'))
      if (typeof r?.ratings?.overall === 'number') {
        overallSum += r.ratings.overall
        result.ratedBuilds++
      }
      if (r?.saveAsReference) result.savedAsReference++
    } catch { /* skip */ }
  }
  if (result.ratedBuilds > 0) result.averageOverall = overallSum / result.ratedBuilds
  return result
}

/**
 * Count curated references (entries in index.yml) and cached images.
 * Returns { curatedEntries, cachedImages }.
 */
export function countReferencesLibrary({ referencesDir, cacheDir }) {
  const result = { curatedEntries: 0, cachedImages: 0 }

  const indexPath = path.join(referencesDir, 'index.yml')
  if (existsSync(indexPath)) {
    try {
      const parsed = yaml.load(readFileSync(indexPath, 'utf8'))
      result.curatedEntries = Array.isArray(parsed?.references) ? parsed.references.length : 0
    } catch { /* skip */ }
  }

  if (existsSync(cacheDir)) {
    try {
      const entries = readdirSync(cacheDir).filter((f) => /\.(png|jpg|jpeg|webp|gif)$/i.test(f))
      result.cachedImages = entries.length
    } catch { /* skip */ }
  }

  return result
}
```

Also add `import yaml from 'js-yaml'` to the top of the file (or merge with existing imports).

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/utils/monitoring.test.js`
Expected: PASS (9 tests total in the file)

- [ ] **Step 5: Run full suite**

Run: `pnpm vitest run`
Expected: PASS 280/280 (271 from previous phases + 9 monitoring tests)

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/monitoring.js tests/utils/monitoring.test.js
git commit -m "feat(monitoring): ratings trend + references library size queries"
```

---

## Task 4: Implement buildWeeklyReport

**Files:**
- Modify: `scripts/utils/monitoring.js`
- Modify: `tests/utils/monitoring.test.js`

- [ ] **Step 1: Write failing test**

Append to `tests/utils/monitoring.test.js`:

```javascript
import { buildWeeklyReport } from '../../scripts/utils/monitoring.js'

describe('buildWeeklyReport', () => {
  it('renders a markdown report with all sections', () => {
    const md = buildWeeklyReport({
      archiveDir: FIXTURE,
      referencesDir: FIXTURE, // reusing — no index.yml there, so 0 curated is fine
      cacheDir: FIXTURE,
      lookbackDays: 7,
    })
    expect(md).toMatch(/# Weekly Pipeline Report/)
    expect(md).toMatch(/## Palette Variety/)
    expect(md).toMatch(/## Ratings/)
    expect(md).toMatch(/## References Library/)
    expect(md).toMatch(/distinct hue buckets/i)
    expect(md).toMatch(/builds in window/i)
  })
})
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm vitest run tests/utils/monitoring.test.js -t "buildWeeklyReport"`
Expected: FAIL — function not defined.

- [ ] **Step 3: Implement**

Append to `scripts/utils/monitoring.js`:

```javascript
/**
 * Render a markdown weekly report composed from the three queries above.
 */
export function buildWeeklyReport({ archiveDir, referencesDir, cacheDir, lookbackDays = 7 }) {
  const hue = computeHueDiversity({ archiveDir, lookbackDays })
  const ratings = computeRatingsTrend({ archiveDir, lookbackDays })
  const refs = countReferencesLibrary({ referencesDir, cacheDir })

  const lines = []
  lines.push(`# Weekly Pipeline Report`)
  lines.push(``)
  lines.push(`Window: last ${lookbackDays} days`)
  lines.push(``)

  lines.push(`## Palette Variety`)
  lines.push(``)
  lines.push(`- Builds in window: ${hue.totalBuilds}`)
  lines.push(`- Distinct hue buckets (30° bins): **${hue.distinctHueBuckets}** (target ≥${hue.targetDistinct})`)
  lines.push(`- Hues observed: ${hue.hues.join('°, ')}${hue.hues.length ? '°' : '(none)'}`)
  lines.push(`- Status: ${hue.meetsTarget ? 'ON TARGET' : 'BELOW TARGET'}`)
  lines.push(``)

  lines.push(`## Ratings`)
  lines.push(``)
  lines.push(`- Rated builds: ${ratings.ratedBuilds}/${ratings.totalBuilds}`)
  if (ratings.averageOverall != null) {
    lines.push(`- Average overall: **${ratings.averageOverall.toFixed(2)}** / 5`)
  } else {
    lines.push(`- Average overall: (no ratings in window)`)
  }
  lines.push(`- Saved as reference: ${ratings.savedAsReference}`)
  lines.push(``)

  lines.push(`## References Library`)
  lines.push(``)
  lines.push(`- Curated entries (index.yml): ${refs.curatedEntries}`)
  lines.push(`- Cached images on disk: ${refs.cachedImages}`)
  lines.push(``)

  return lines.join('\n')
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/utils/monitoring.test.js`
Expected: PASS 10/10 tests in file; PASS 281/281 overall.

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/monitoring.js tests/utils/monitoring.test.js
git commit -m "feat(monitoring): buildWeeklyReport renders markdown summary"
```

---

## Task 5: CLI runner script + package.json entry

**Files:**
- Create: `scripts/monitor.js`
- Modify: `package.json`

- [ ] **Step 1: Create the CLI runner**

Create `scripts/monitor.js`:

```javascript
#!/usr/bin/env node
/**
 * Print the weekly pipeline report to stdout.
 *
 * Usage:
 *   pnpm monitor
 *   pnpm monitor -- --days 14
 */

import path from 'path'
import { fileURLToPath } from 'url'
import { buildWeeklyReport } from './utils/monitoring.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Parse --days
const args = process.argv.slice(2)
let days = 7
const daysIdx = args.indexOf('--days')
if (daysIdx >= 0 && args[daysIdx + 1]) {
  const parsed = parseInt(args[daysIdx + 1], 10)
  if (Number.isFinite(parsed) && parsed > 0) days = parsed
}

const report = buildWeeklyReport({
  archiveDir: path.join(ROOT, 'archive'),
  referencesDir: path.join(ROOT, 'references'),
  cacheDir: path.join(ROOT, 'references/cache'),
  lookbackDays: days,
})

process.stdout.write(report + '\n')
```

- [ ] **Step 2: Add a package.json script**

In `package.json`, under `"scripts"`, add:

```json
    "monitor": "node scripts/monitor.js",
```

(Place it after the `pipeline:interpret` entry.)

- [ ] **Step 3: Smoke-test the CLI**

Run: `pnpm monitor`
Expected: prints a markdown report to stdout (numbers may be near-zero depending on current archive state, but structure is present).

- [ ] **Step 4: Commit**

```bash
git add scripts/monitor.js package.json
git commit -m "feat(monitoring): pnpm monitor CLI prints weekly report"
```

---

## Task 6: Run full regression and clean up

**Files:**
- (verification only)

- [ ] **Step 1: Full test suite**

Run: `pnpm vitest run`
Expected: PASS 281/281

- [ ] **Step 2: Build**

Run: `pnpm build`
Expected: clean build, no new warnings.

- [ ] **Step 3: E2E**

Run: `PREVIEW_URL=http://localhost:4173 pnpm preview &` then in a separate terminal: `PREVIEW_URL=http://localhost:4173 pnpm test:e2e:site`
Expected: 17/17 pass. (site-health doesn't depend on monitoring; should be unaffected.)

- [ ] **Step 4: Run the monitor on the real archive**

Run: `pnpm monitor --days 14`
Expected: prints a report. Capture the output for sanity-check — expect mostly-zero ratings (nobody's rated builds yet), hue diversity depending on recent archive state.

- [ ] **Step 5: Final cleanup — kill any leftover preview server**

Run: `pkill -f "vite preview"`

---

## Phase 5 completion criteria

- [ ] `scripts/utils/monitoring.js` exports `computeHueDiversity`, `computeRatingsTrend`, `countReferencesLibrary`, `buildWeeklyReport`
- [ ] `scripts/monitor.js` CLI runs and prints a markdown report
- [ ] `package.json` has a `monitor` script entry
- [ ] 10 new tests (281 total); `pnpm build` clean; e2e green
- [ ] Five commits, each conventionally messaged

## Explicit non-goals (out of scope for this plan)

- **Dev-panel UI tile.** Adding a "Palette Variety" tile to `app/dev-panel.tsx` is a nice-to-have that depends on the data already existing (which this plan establishes). Defer to a separate small PR once the CLI report is proven useful.
- **Cost-per-run tracking.** SDK usage counts are logged but not aggregated. Add in a follow-up once we have enough SDK-path runs to make the numbers meaningful.
- **Automated alerts** (e.g., Slack webhook when hue diversity drops below target). Report is stdout-only; alerting is future work.
