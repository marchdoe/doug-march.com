# Signals System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the modular signal collection system that auto-populates daily signals from external sources, interprets them via Claude, and feeds the interpreted brief to the daily redesign pipeline.

**Architecture:** Each signal source is a provider module in `scripts/signals/` exporting `{ name, timeout, collect(profile) }`. An orchestrator runs them in parallel via `Promise.allSettled`, writes `signals/today.yml` + `signals/today.meta.yml`. A separate interpret script calls Claude to write `signals/today.brief.md`. The existing `daily-redesign.js` is updated to consume the brief.

**Tech Stack:** Node.js ESM, js-yaml, node-fetch (built-in), Claude CLI (local) / Anthropic API (production)

**Spec:** `docs/superpowers/specs/2026-03-14-signals-system-design.md`

---

## Pre-flight: Codebase Context

**Repo root:** `/Users/dougmarch/Projects/dougmarch`
**Branch:** `phase-1`
**Package manager:** pnpm
**Module system:** `"type": "module"` — all `.js` files are ESM
**Existing scripts:** `scripts/daily-redesign.js`, `scripts/utils/` (file-manager, build-validator, etc.)
**Existing signals:** `signals/today.yml` (manually edited), `signals/README.md`
**Build:** `pnpm build` runs `panda codegen && vite build`
**Tests:** `vitest` for unit tests, Playwright for E2E

---

## Chunk 1: Infrastructure — Profile, Orchestrator, Provider Interface

### Task 1: Create `signals/profile.yml`

**Files:**
- Create: `signals/profile.yml`

- [ ] **Step 1: Create the profile config file**

```yaml
# signals/profile.yml
# Fixed context — who you are, what you care about
# Providers receive this as their `profile` argument

location:
  zip: "20105"
  name: "Ashburn, VA"
  lat: 39.0438
  lng: -77.4874

sports:
  teams:
    - { name: "Detroit Lions", league: "NFL" }
    - { name: "Detroit Red Wings", league: "NHL" }
    - { name: "Detroit Pistons", league: "NBA" }
    - { name: "Detroit Tigers", league: "MLB" }

golf:
  focus: "PGA Tour"

music:
  bands:
    - "Guided by Voices"
    - "My Morning Jacket"
    - "The War on Drugs"
    - "Wet Leg"
    - "Tobin Sprout"
    - "Radiohead"

news:
  disallow:
    - "Trump"
    - "politics"
    - "election"
    - "Republican"
    - "Democrat"
    - "Congress"
    - "partisan"
    - "GOP"

books:
  currently_reading: []
```

Note: `lat` and `lng` are added for the sun/lunar providers which need coordinates, not zip codes.

- [ ] **Step 2: Commit**

```bash
git add signals/profile.yml
git commit -m "feat: add signals profile config (location, teams, bands, disallow list)"
```

### Task 2: Update `.gitignore` for generated signal files

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add entries to `.gitignore`**

```
signals/today.yml
signals/today.meta.yml
signals/today.brief.md
```

These are generated artifacts — only `profile.yml` and `README.md` should be committed.

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p scripts/signals tests/signals
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore generated signal files, create provider directories"
```

### Task 3: Create the orchestrator — `scripts/collect-signals.js`

**Files:**
- Create: `scripts/collect-signals.js`
- Test: `tests/collect-signals.test.js`

- [ ] **Step 1: Write the test**

Create `tests/collect-signals.test.js`. The orchestrator should:
1. Read `signals/profile.yml`
2. Discover all provider modules in `scripts/signals/`
3. Run each provider's `collect(profile)` with a per-provider timeout
4. Write `signals/today.yml` with collected data
5. Write `signals/today.meta.yml` with status/latency per source

Test with a mock provider that returns static data and one that throws:

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { runCollector } from '../scripts/collect-signals.js'
import { readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const ROOT = path.resolve(import.meta.dirname, '..')

describe('collect-signals orchestrator', () => {
  afterEach(async () => {
    // Clean up written files
    for (const f of ['signals/today.yml', 'signals/today.meta.yml']) {
      const p = path.join(ROOT, f)
      if (existsSync(p)) await unlink(p)
    }
  })

  it('collects from providers and writes YAML + meta', async () => {
    const mockProviders = [
      {
        name: 'test-ok',
        timeout: 1000,
        collect: async () => ({ data: { value: 'hello' }, meta: { source: 'test', items: 1 } }),
      },
      {
        name: 'test-fail',
        timeout: 1000,
        collect: async () => { throw new Error('API down') },
      },
    ]

    // Pass mock profile to avoid reading profile.yml from disk
    const mockProfile = { location: { zip: '20105' } }
    const result = await runCollector(mockProviders, mockProfile)

    expect(result.signals['test-ok']).toEqual({ value: 'hello' })
    expect(result.signals['test-fail']).toBeUndefined()
    expect(result.meta.sources['test-ok'].status).toBe('ok')
    expect(result.meta.sources['test-fail'].status).toBe('error')
    expect(result.meta.sources['test-fail'].reason).toContain('API down')
  })

  it('enforces per-provider timeout', async () => {
    const mockProviders = [
      {
        name: 'test-slow',
        timeout: 100, // 100ms timeout
        collect: async () => {
          await new Promise(r => setTimeout(r, 5000)) // takes 5s
          return { data: {}, meta: {} }
        },
      },
    ]

    const mockProfile = { location: { zip: '20105' } }
    const result = await runCollector(mockProviders, mockProfile)

    expect(result.meta.sources['test-slow'].status).toBe('skipped')
    expect(result.meta.sources['test-slow'].reason).toContain('timeout')
  }, 10000)
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/collect-signals.test.js
```

Expected: FAIL — `runCollector` not found.

- [ ] **Step 3: Write the orchestrator**

Create `scripts/collect-signals.js`:

```javascript
#!/usr/bin/env node

/**
 * Signal Collector — runs all providers in parallel, writes today.yml + today.meta.yml
 *
 * Usage:
 *   node scripts/collect-signals.js                    # collect all
 *   node scripts/collect-signals.js --only weather,season  # collect specific providers
 *
 * Exports runCollector() for testing.
 */

import { readFile, writeFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SIGNALS_DIR = path.join(__dirname, 'signals')
const PROFILE_PATH = path.join(ROOT, 'signals/profile.yml')

/**
 * Load the profile config.
 * @returns {object}
 */
async function loadProfile() {
  const raw = await readFile(PROFILE_PATH, 'utf8')
  return yaml.load(raw)
}

/**
 * Discover all provider modules in scripts/signals/.
 * Each must export { name, timeout, collect }.
 * @returns {Promise<Array<{ name: string, timeout: number, collect: Function }>>}
 */
async function discoverProviders() {
  const files = await readdir(SIGNALS_DIR)
  const providers = []
  for (const file of files) {
    if (!file.endsWith('.js')) continue
    const mod = await import(path.join(SIGNALS_DIR, file))
    if (mod.name && typeof mod.collect === 'function') {
      providers.push({
        name: mod.name,
        timeout: mod.timeout ?? 5000,
        collect: mod.collect,
      })
    }
  }
  return providers
}

/**
 * Run a single provider with timeout.
 * @returns {{ status: string, data?: object, meta?: object, reason?: string, latency_ms: number }}
 */
async function runProvider(provider, profile) {
  const start = Date.now()
  try {
    const result = await Promise.race([
      provider.collect(profile),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`timeout after ${provider.timeout}ms`)), provider.timeout)
      ),
    ])
    const latency = Date.now() - start
    return {
      status: 'ok',
      data: result.data,
      meta: { ...result.meta, latency_ms: latency },
    }
  } catch (err) {
    const latency = Date.now() - start
    return {
      status: latency >= provider.timeout ? 'skipped' : 'error',
      reason: err.message,
      meta: { latency_ms: latency },
    }
  }
}

/**
 * Run all providers in parallel. Returns { signals, meta }.
 * @param {Array} [providerOverrides] - optional, for testing
 * @returns {Promise<{ signals: object, meta: object }>}
 */
export async function runCollector(providerOverrides, profileOverride) {
  const profile = profileOverride ?? await loadProfile()
  const providers = providerOverrides ?? await discoverProviders()

  console.log(`Collecting from ${providers.length} providers...`)
  const startTime = Date.now()

  const results = await Promise.allSettled(
    providers.map(async (p) => {
      console.log(`  [${p.name}] fetching...`)
      const result = await runProvider(p, profile)
      console.log(`  [${p.name}] ${result.status} (${result.meta.latency_ms}ms)`)
      return { name: p.name, ...result }
    })
  )

  const totalMs = Date.now() - startTime
  const signals = {}
  const sources = {}

  for (const settled of results) {
    if (settled.status !== 'fulfilled') continue
    const r = settled.value
    if (r.status === 'ok' && r.data) {
      signals[r.name] = r.data
    }
    sources[r.name] = r.status === 'ok'
      ? { status: 'ok', source: r.meta.source ?? r.name, latency_ms: r.meta.latency_ms, items: r.meta.items ?? 0 }
      : { status: r.status, reason: r.reason, latency_ms: r.meta.latency_ms }
  }

  // Add date
  signals.date = new Date().toISOString().slice(0, 10)

  const meta = {
    collected_at: new Date().toISOString(),
    duration_ms: totalMs,
    providers_total: providers.length,
    providers_ok: Object.values(sources).filter(s => s.status === 'ok').length,
    providers_failed: Object.values(sources).filter(s => s.status !== 'ok').length,
    sources,
  }

  return { signals, meta }
}

/**
 * Write signals and meta to disk.
 */
async function writeOutputs(signals, meta) {
  const signalsPath = path.join(ROOT, 'signals/today.yml')
  const metaPath = path.join(ROOT, 'signals/today.meta.yml')

  await writeFile(signalsPath, yaml.dump(signals, { lineWidth: -1 }), 'utf8')
  await writeFile(metaPath, yaml.dump(meta, { lineWidth: -1 }), 'utf8')

  console.log(`\nWritten: signals/today.yml (${Object.keys(signals).length - 1} signal groups)`)
  console.log(`Written: signals/today.meta.yml (${meta.providers_ok}/${meta.providers_total} ok)`)
}

// CLI entry point
if (process.argv[1] && process.argv[1].endsWith('collect-signals.js')) {
  const { signals, meta } = await runCollector()
  await writeOutputs(signals, meta)
  console.log(`\nDone in ${meta.duration_ms}ms.`)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm vitest run tests/collect-signals.test.js
```

Expected: PASS (both tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/collect-signals.js tests/collect-signals.test.js
git commit -m "feat: add signal collector orchestrator with parallel execution + meta logging"
```

### Task 4: Create first provider — season (establishes the pattern)

**Files:**
- Create: `scripts/signals/season.js`
- Test: `tests/signals/season.test.js`

This establishes the provider pattern with the simplest possible provider — no API, no network, just date math.

- [ ] **Step 1: Write the test**

Create `tests/signals/season.test.js`:

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/season.js'

describe('season provider', () => {
  it('exports correct name', () => {
    expect(name).toBe('season')
  })

  it('returns season data based on current date', async () => {
    const result = await collect({})
    expect(result.data).toHaveProperty('season')
    expect(result.data).toHaveProperty('month')
    expect(result.data).toHaveProperty('day_of_year')
    expect(['spring', 'summer', 'fall', 'winter']).toContain(result.data.season)
    expect(result.meta.source).toBe('derived')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/signals/season.test.js
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the provider**

Create `scripts/signals/season.js`:

```javascript
export const name = 'season'
export const timeout = 1000

export async function collect(_profile) {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const day = now.getDate()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)

  let season
  if (month >= 3 && month <= 5) season = 'spring'
  else if (month >= 6 && month <= 8) season = 'summer'
  else if (month >= 9 && month <= 11) season = 'fall'
  else season = 'winter'

  return {
    data: {
      season,
      month,
      day,
      day_of_year: dayOfYear,
      month_name: now.toLocaleString('en-US', { month: 'long' }),
    },
    meta: { source: 'derived', items: 1 },
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm vitest run tests/signals/season.test.js
```

Expected: PASS

- [ ] **Step 5: Run the full collector to verify integration**

```bash
node scripts/collect-signals.js
cat signals/today.yml
cat signals/today.meta.yml
```

Expected: `today.yml` contains `season:` data, `today.meta.yml` shows `season: { status: ok }`.

- [ ] **Step 6: Commit**

```bash
git add scripts/signals/season.js tests/signals/season.test.js
git commit -m "feat: add season provider (derived from date)"
```

---

## Chunk 2: Tier 1 Providers — Derived and Free Sources

All of these need no API keys. Each task follows the same pattern: test → implement → verify → commit.

### Task 5: Day of week provider

**Files:**
- Create: `scripts/signals/day-of-week.js`
- Test: `tests/signals/day-of-week.test.js`

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/day-of-week.js'

describe('day-of-week provider', () => {
  it('returns day name and metadata', async () => {
    const result = await collect({})
    expect(name).toBe('day_of_week')
    expect(result.data).toHaveProperty('day')
    expect(result.data).toHaveProperty('is_weekend')
    expect(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']).toContain(result.data.day)
    expect(typeof result.data.is_weekend).toBe('boolean')
  })
})
```

- [ ] **Step 2: Write the provider**

```javascript
export const name = 'day_of_week'
export const timeout = 1000

export async function collect(_profile) {
  const now = new Date()
  const dayIndex = now.getDay() // 0=Sun, 6=Sat
  const day = now.toLocaleString('en-US', { weekday: 'long' })
  const isWeekend = dayIndex === 0 || dayIndex === 6

  return {
    data: { day, is_weekend: isWeekend, day_index: dayIndex },
    meta: { source: 'derived', items: 1 },
  }
}
```

- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/day-of-week.js tests/signals/day-of-week.test.js
git commit -m "feat: add day-of-week provider"
```

### Task 6: Sunrise/sunset provider

**Files:**
- Create: `scripts/signals/sun.js`
- Test: `tests/signals/sun.test.js`

Uses the solar position algorithm — no API needed, just math from lat/lng in profile.

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/sun.js'

describe('sun provider', () => {
  it('returns sunrise and sunset times', async () => {
    const profile = { location: { lat: 39.0438, lng: -77.4874 } }
    const result = await collect(profile)
    expect(name).toBe('sun')
    expect(result.data).toHaveProperty('sunrise')
    expect(result.data).toHaveProperty('sunset')
    expect(result.data).toHaveProperty('daylight_hours')
    expect(result.data.daylight_hours).toBeGreaterThan(0)
    expect(result.data.daylight_hours).toBeLessThan(24)
  })
})
```

- [ ] **Step 2: Write the provider**

Implement sunrise/sunset calculation using the standard solar position equations. The key formula uses the day of year + latitude to compute solar noon, hour angle, and derive rise/set times. Keep it self-contained — no npm packages.

- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/sun.js tests/signals/sun.test.js
git commit -m "feat: add sunrise/sunset provider (solar calculation)"
```

### Task 7: Lunar phase provider

**Files:**
- Create: `scripts/signals/lunar.js`
- Test: `tests/signals/lunar.test.js`

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/lunar.js'

describe('lunar provider', () => {
  it('returns moon phase', async () => {
    const result = await collect({})
    expect(name).toBe('lunar')
    expect(result.data).toHaveProperty('phase')
    expect(result.data).toHaveProperty('illumination')
    expect(['new moon','waxing crescent','first quarter','waxing gibbous','full moon','waning gibbous','last quarter','waning crescent']).toContain(result.data.phase)
    expect(result.data.illumination).toBeGreaterThanOrEqual(0)
    expect(result.data.illumination).toBeLessThanOrEqual(1)
  })
})
```

- [ ] **Step 2: Write the provider** — use the synodic month calculation (29.53 day cycle from a known new moon reference date)
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/lunar.js tests/signals/lunar.test.js
git commit -m "feat: add lunar phase provider (synodic calculation)"
```

### Task 8: Holidays provider

**Files:**
- Create: `scripts/signals/holidays.js`
- Test: `tests/signals/holidays.test.js`

Static list of US federal holidays + notable observances (Opening Day, Masters week, etc.). Returns today's holiday if applicable, plus upcoming holidays within 7 days.

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/holidays.js'

describe('holidays provider', () => {
  it('returns today and upcoming holidays', async () => {
    const result = await collect({})
    expect(name).toBe('holidays')
    expect(result.data).toHaveProperty('today')    // null or holiday name
    expect(result.data).toHaveProperty('upcoming')  // array of { name, date, days_away }
    expect(Array.isArray(result.data.upcoming)).toBe(true)
  })
})
```

- [ ] **Step 2: Write the provider** — hardcode major US holidays with date calculation for floating holidays (Thanksgiving = 4th Thursday in November, etc.)
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/holidays.js tests/signals/holidays.test.js
git commit -m "feat: add holidays provider (US federal + notable dates)"
```

### Task 9: Music provider (static, from profile)

**Files:**
- Create: `scripts/signals/music.js`
- Test: `tests/signals/music.test.js`

Picks 2-3 random bands from the profile's band list. Gives Claude variety day to day.

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/music.js'

describe('music provider', () => {
  it('returns a random subset of bands from profile', async () => {
    const profile = { music: { bands: ['Radiohead', 'Wet Leg', 'My Morning Jacket', 'The War on Drugs'] } }
    const result = await collect(profile)
    expect(name).toBe('music')
    expect(result.data.bands.length).toBeGreaterThanOrEqual(2)
    expect(result.data.bands.length).toBeLessThanOrEqual(3)
    result.data.bands.forEach(b => expect(profile.music.bands).toContain(b))
  })

  it('returns empty if no bands in profile', async () => {
    const result = await collect({ music: { bands: [] } })
    expect(result.data.bands).toEqual([])
  })
})
```

- [ ] **Step 2: Write the provider**
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/music.js tests/signals/music.test.js
git commit -m "feat: add music provider (random subset from profile)"
```

### Task 10: Books provider (static, from profile)

**Files:**
- Create: `scripts/signals/books.js`
- Test: `tests/signals/books.test.js`

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/books.js'

describe('books provider', () => {
  it('returns currently reading from profile', async () => {
    const profile = { books: { currently_reading: ['Dune', 'Neuromancer'] } }
    const result = await collect(profile)
    expect(name).toBe('books')
    expect(result.data.currently_reading).toEqual(['Dune', 'Neuromancer'])
  })

  it('returns empty array if nothing in profile', async () => {
    const result = await collect({ books: { currently_reading: [] } })
    expect(result.data.currently_reading).toEqual([])
  })

  it('handles missing books section', async () => {
    const result = await collect({})
    expect(result.data.currently_reading).toEqual([])
  })
})
```

- [ ] **Step 2: Write the provider**

```javascript
export const name = 'books'
export const timeout = 1000

export async function collect(profile) {
  const books = profile?.books?.currently_reading ?? []
  return {
    data: { currently_reading: books },
    meta: { source: 'profile', items: books.length },
  }
}
```

- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/books.js tests/signals/books.test.js
git commit -m "feat: add books provider (from profile)"
```

### Task 11: Quote provider

**Files:**
- Create: `scripts/signals/quote.js`
- Test: `tests/signals/quote.test.js`

Fetches a random quote from a free API (e.g., `https://api.quotable.io/random` or `https://zenquotes.io/api/random`). No API key needed.

- [ ] **Step 1: Write the test** — mock the fetch call with a known response
- [ ] **Step 2: Write the provider** — single `fetch()` call, extract quote + author
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/quote.js tests/signals/quote.test.js
git commit -m "feat: add quote provider (daily random quote)"
```

### Task 12: GitHub trending provider

**Files:**
- Create: `scripts/signals/github.js`
- Test: `tests/signals/github.test.js`

Scrapes `github.com/trending` HTML to extract top 5 repos with names, descriptions, stars, and language. No API key needed.

- [ ] **Step 1: Write test with mocked HTML response**
- [ ] **Step 2: Write the provider** — fetch the trending page, parse with regex (no cheerio dependency — keep it simple)
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/github.js tests/signals/github.test.js
git commit -m "feat: add GitHub trending provider (HTML scrape)"
```

### Task 13: Hacker News provider

**Files:**
- Create: `scripts/signals/hacker-news.js`
- Test: `tests/signals/hacker-news.test.js`

Uses the official HN API (`https://hacker-news.firebaseio.com/v0/topstories.json`) to fetch top 5 story titles + URLs.

- [ ] **Step 1: Write test with mocked API response**
- [ ] **Step 2: Write the provider** — fetch top story IDs, then fetch details for top 5
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/hacker-news.js tests/signals/hacker-news.test.js
git commit -m "feat: add Hacker News provider (official API)"
```

### Task 14: Integration test — run all Tier 1 providers

- [ ] **Step 1: Run full collector and verify output**

```bash
node scripts/collect-signals.js
cat signals/today.yml
cat signals/today.meta.yml
```

Expected: All Tier 1 providers show `status: ok` in meta. `today.yml` has data for season, day_of_week, sun, lunar, holidays, music, books, quote, github, hacker_news.

- [ ] **Step 2: Commit any fixes**

---

## Chunk 3: Tier 2 Providers — API-Backed Sources

These require API keys stored in `.env`. Each provider reads its key from `process.env`. If the key is missing, the provider throws (and the orchestrator logs it as skipped).

### Task 15: Weather + Air Quality provider

**Files:**
- Create: `scripts/signals/weather.js`
- Create: `scripts/signals/air-quality.js`
- Test: `tests/signals/weather.test.js`

Both use weatherapi.com with the same API key (`WEATHER_API_KEY`). Weather returns conditions, temperature, humidity, wind. Air quality returns AQI, UV index, pollen.

- [ ] **Step 1: Write tests with mocked API responses**

Create `tests/signals/weather.test.js` (tests weather provider) and `tests/signals/air-quality.test.js` (tests air quality provider). Mock the `fetch` call to return known weatherapi.com JSON responses.

- [ ] **Step 2: Write weather provider** — `https://api.weatherapi.com/v1/current.json?key=${key}&q=${zip}&aqi=yes`. Throws if `WEATHER_API_KEY` is not set.
- [ ] **Step 3: Write air-quality provider** — parses the AQI data from the same API (or a separate call to the forecast endpoint for UV/pollen). Throws if `WEATHER_API_KEY` is not set.
- [ ] **Step 4: Run tests, verify pass**
- [ ] **Step 5: Commit**

```bash
git add scripts/signals/weather.js scripts/signals/air-quality.js tests/signals/weather.test.js tests/signals/air-quality.test.js
git commit -m "feat: add weather + air quality providers (weatherapi.com)"
```

### Task 16: News provider with disallow filtering

**Files:**
- Create: `scripts/signals/news.js`
- Test: `tests/signals/news.test.js`

Uses newsapi.org (`NEWS_API_KEY`). Fetches top headlines for US, filters out any containing disallow keywords from profile. Returns top 5 filtered headlines.

- [ ] **Step 1: Write the test** — verify filtering works against the disallow list

```javascript
import { describe, it, expect } from 'vitest'
import { filterHeadlines } from '../../scripts/signals/news.js'

describe('news provider', () => {
  it('filters headlines containing disallow keywords', () => {
    const headlines = [
      { title: 'SpaceX launches new rocket' },
      { title: 'Trump announces new policy' },
      { title: 'Election results finalized' },
      { title: 'NASA discovers new exoplanet' },
    ]
    const disallow = ['Trump', 'election']
    const filtered = filterHeadlines(headlines, disallow)
    expect(filtered).toHaveLength(2)
    expect(filtered[0].title).toBe('SpaceX launches new rocket')
    expect(filtered[1].title).toBe('NASA discovers new exoplanet')
  })
})
```

- [ ] **Step 2: Write the provider** — export `filterHeadlines` for testing, main `collect()` calls the API
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/news.js tests/signals/news.test.js
git commit -m "feat: add news provider with disallow keyword filtering"
```

### Task 17: Sports provider

**Files:**
- Create: `scripts/signals/sports.js`
- Test: `tests/signals/sports.test.js`

Uses ESPN's unofficial API (no key needed) to fetch recent scores for teams in the profile. Falls back gracefully if a team is in offseason.

- [ ] **Step 1: Write test with mocked ESPN response**
- [ ] **Step 2: Write the provider** — iterate over `profile.sports.teams`, fetch latest game result for each
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/sports.js tests/signals/sports.test.js
git commit -m "feat: add sports provider (ESPN unofficial API)"
```

### Task 18: Golf provider

**Files:**
- Create: `scripts/signals/golf.js`
- Test: `tests/signals/golf.test.js`

Uses PGA Tour RSS feed or ESPN golf endpoint. Returns current tournament name, leaders, and notable results.

- [ ] **Step 1: Write test with mocked response**
- [ ] **Step 2: Write the provider**
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/golf.js tests/signals/golf.test.js
git commit -m "feat: add golf provider (PGA Tour)"
```

### Task 19: Market provider

**Files:**
- Create: `scripts/signals/market.js`
- Test: `tests/signals/market.test.js`

Uses Alpha Vantage (`ALPHA_VANTAGE_API_KEY`) to get S&P 500 previous close direction. Returns direction (up/down/flat), percentage change, and a mood descriptor.

- [ ] **Step 1: Write test with mocked response**
- [ ] **Step 2: Write the provider**
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/market.js tests/signals/market.test.js
git commit -m "feat: add market provider (S&P 500 direction)"
```

### Task 20: Product Hunt provider

**Files:**
- Create: `scripts/signals/product-hunt.js`
- Test: `tests/signals/product-hunt.test.js`

Uses Product Hunt API v2 (requires `PRODUCT_HUNT_TOKEN`). Returns top 3 products of the day.

- [ ] **Step 1: Write test with mocked response**
- [ ] **Step 2: Write the provider**
- [ ] **Step 3: Run test, verify pass**
- [ ] **Step 4: Commit**

```bash
git add scripts/signals/product-hunt.js tests/signals/product-hunt.test.js
git commit -m "feat: add Product Hunt provider"
```

### Task 21: Add API key env vars to `.env.example`

**Files:**
- Create: `signals/.env.example`

- [ ] **Step 1: Create the example env file**

```
# signals/.env.example — copy to .env and fill in values
WEATHER_API_KEY=        # weatherapi.com (free tier: 1M calls/month)
NEWS_API_KEY=           # newsapi.org (free tier: 100 req/day)
ALPHA_VANTAGE_API_KEY=  # alphavantage.co (free tier: 25 req/day)
PRODUCT_HUNT_TOKEN=     # producthunt.com API v2 (OAuth)
```

- [ ] **Step 2: Add env vars to `.env` gitignore check** — verify `.env` is already in `.gitignore`
- [ ] **Step 3: Commit**

```bash
git add signals/.env.example
git commit -m "docs: add .env.example with required API keys for signal providers"
```

---

## Chunk 4: Interpret Step + Pipeline Integration

### Task 22: Create `scripts/interpret-signals.js` (Stage 1 Claude call)

**Files:**
- Create: `scripts/interpret-signals.js`
- Test: `tests/interpret-signals.test.js`

Reads `signals/today.yml`, calls Claude to write `signals/today.brief.md` with per-signal feel tags + synthesis paragraph.

- [ ] **Step 1: Write the test**

```javascript
import { describe, it, expect } from 'vitest'
import { buildInterpretPrompt } from '../scripts/interpret-signals.js'

describe('interpret-signals', () => {
  it('builds a prompt from signal data', () => {
    const signals = {
      date: '2026-03-14',
      weather: { location: 'Ashburn, VA', conditions: 'Heavy rain, 45°F' },
      season: { season: 'spring' },
      day_of_week: { day: 'Saturday', is_weekend: true },
    }
    const prompt = buildInterpretPrompt(signals)
    expect(prompt).toContain('Heavy rain')
    expect(prompt).toContain('spring')
    expect(prompt).toContain('Saturday')
    expect(prompt).toContain('per-signal feel')
    expect(prompt).toContain('synthesis paragraph')
  })
})
```

- [ ] **Step 2: Run test, verify fail**
- [ ] **Step 3: Write the interpret script**

The script should:
1. Read `signals/today.yml`
2. Build a prompt asking Claude to interpret the raw data
3. Call Claude (CLI in mock mode, API in production) — same pattern as `daily-redesign.js`
4. Write the response to `signals/today.brief.md`
5. Log timing to stdout

The prompt should instruct Claude to output:
- A `## Feel Tags` section with one line per signal (e.g., `- weather: brutal, isolating`)
- A `## Synthesis` section with 2-3 sentences tying signals together

- [ ] **Step 4: Run test, verify pass**
- [ ] **Step 5: Commit**

```bash
git add scripts/interpret-signals.js tests/interpret-signals.test.js
git commit -m "feat: add interpret-signals script (Stage 1 Claude call)"
```

### Task 23: Update `daily-redesign.js` to consume brief

**Files:**
- Modify: `scripts/daily-redesign.js`
- Modify: `scripts/utils/prompt-builder.js`

Update the prompt builder to include the interpreted brief (`today.brief.md`) in the Claude prompt for Stage 2. The brief replaces the raw signal formatting — Claude gets the editorial interpretation instead of raw data.

- [ ] **Step 1: Modify `prompt-builder.js`** — add a `briefPath` parameter. If `today.brief.md` exists, include it in the user prompt under a `## Creative Brief` section. If it doesn't exist (fallback), use the raw signals as before.
- [ ] **Step 2: Modify `daily-redesign.js`** — check for `signals/today.brief.md` and pass it to the prompt builder.
- [ ] **Step 3: Run existing tests to verify nothing broke**

```bash
pnpm vitest run
```

- [ ] **Step 4: Commit**

```bash
git add scripts/daily-redesign.js scripts/utils/prompt-builder.js
git commit -m "feat: update pipeline to consume interpreted brief (Stage 1 output)"
```

### Task 24: Create full pipeline orchestration script

**Files:**
- Create: `scripts/run-pipeline.js`

A single entry point that runs all 5 stages in sequence: collect → interpret → design → build → archive. This replaces the need to run scripts individually.

- [ ] **Step 1: Write the orchestration script**

```javascript
#!/usr/bin/env node

/**
 * Full Daily Redesign Pipeline
 *
 * Runs all stages in sequence:
 *   1. Collect signals (scripts/collect-signals.js)
 *   2. Interpret signals (scripts/interpret-signals.js)
 *   3. Design + Build + Archive (scripts/daily-redesign.js)
 */

import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DRY_RUN = process.env.DRY_RUN === 'true'
const MOCK_MODE = process.env.MOCK_MODE === 'true'

function run(label, command) {
  console.log(`\n=== ${label} ===\n`)
  execSync(command, { cwd: ROOT, stdio: 'inherit', env: process.env })
}

try {
  run('Stage 1: Collect Signals', 'node scripts/collect-signals.js')
  run('Stage 2: Interpret Signals', 'node scripts/interpret-signals.js')
  run('Stage 3: Design + Build + Archive', 'node scripts/daily-redesign.js')
  console.log('\n=== Pipeline complete ===')
} catch (err) {
  console.error('\nPipeline failed:', err.message)
  process.exit(1)
}
```

- [ ] **Step 2: Update `package.json` scripts**

```json
"pipeline": "MOCK_MODE=true node scripts/run-pipeline.js",
"pipeline:dry": "MOCK_MODE=true DRY_RUN=true node scripts/run-pipeline.js",
"pipeline:collect": "node scripts/collect-signals.js",
"pipeline:interpret": "MOCK_MODE=true node scripts/interpret-signals.js"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/run-pipeline.js package.json
git commit -m "feat: add full pipeline orchestration script (collect + interpret + design)"
```

### Task 25: Update GitHub Actions workflow

**Files:**
- Modify: `.github/workflows/daily-redesign.yml`

Update the workflow to run the full pipeline (collect → interpret → design) instead of just `daily-redesign.js`. Add the signal API keys as required secrets.

- [ ] **Step 1: Update the workflow**

Replace the `Run daily redesign` step with:

```yaml
      - name: Collect signals
        env:
          WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
          NEWS_API_KEY: ${{ secrets.NEWS_API_KEY }}
          ALPHA_VANTAGE_API_KEY: ${{ secrets.ALPHA_VANTAGE_API_KEY }}
          PRODUCT_HUNT_TOKEN: ${{ secrets.PRODUCT_HUNT_TOKEN }}
        run: node scripts/collect-signals.js

      - name: Interpret signals
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: node scripts/interpret-signals.js

      - name: Run daily redesign
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          DRY_RUN: ${{ inputs.dry_run || 'false' }}
        run: node scripts/daily-redesign.js
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/daily-redesign.yml
git commit -m "feat: update GitHub Actions to run full signal pipeline (collect + interpret + design)"
```

### Task 26: Update Vite middleware for `/dev` panel

**Files:**
- Modify: `vite.config.ts`

Update the `/api/pipeline` handler to run `run-pipeline.js` instead of `daily-redesign.js` directly. This ensures the `/dev` panel runs the full flow (collect + interpret + design).

- [ ] **Step 1: Update the middleware** — change `scriptPath` to point to `scripts/run-pipeline.js`
- [ ] **Step 2: Update `/api/dev-data`** — also return meta data from `today.meta.yml` if it exists, so the `/dev` panel can show collection status
- [ ] **Step 3: Restart dev server, test from `/dev` panel**
- [ ] **Step 4: Commit**

```bash
git add vite.config.ts
git commit -m "feat: update /dev panel to run full signal pipeline"
```

### Task 27: End-to-end test

- [ ] **Step 1: Run the full pipeline from CLI**

```bash
pnpm pipeline:dry
```

Expected output:
1. Collect: all Tier 1 providers succeed, Tier 2 skip (no API keys locally — that's fine)
2. Interpret: Claude writes `signals/today.brief.md` with feel tags + synthesis
3. Design: Claude generates redesign from the brief
4. Build: passes
5. Archive: written
6. Files restored (dry run)

- [ ] **Step 2: Verify from `/dev` panel**

Start dev server, navigate to `http://localhost:5173/dev`, click Run Pipeline. Verify the progress tracker shows all stages and completes successfully.

- [ ] **Step 3: Check archive output**

```bash
cat archive/$(date +%Y-%m-%d)/brief.md
```

Verify it contains the design brief, signals data, and rationale.

- [ ] **Step 4: Commit any fixes** (use specific file paths, not `git add -A`)

```bash
git add scripts/ tests/ vite.config.ts package.json
git commit -m "fix: end-to-end pipeline adjustments"
```
