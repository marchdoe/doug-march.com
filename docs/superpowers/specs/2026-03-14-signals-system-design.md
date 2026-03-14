# Signals System — Design Spec

**Date:** 2026-03-14
**Status:** Approved

---

## Overview

The signals system auto-collects daily data from external sources (weather, sports, news, etc.) and feeds it to the daily redesign pipeline. In production, it runs fully autonomously at 5am EST. In dev mode, signals can be fine-tuned on demand via the `/dev` panel.

Signals are the creative fuel — Claude interprets them to drive the site's design. Claude has full creative freedom over presentation; the only constraint is the content contract (all required content sections must be present).

---

## Architecture: Modular Providers + Orchestrator

Each signal source is its own module in `scripts/signals/`. An orchestrator runs all providers in parallel via `Promise.allSettled`, collects results, and writes output files. Failed providers are skipped — Claude designs with whatever signals are available.

### Provider Interface

Every provider exports the same shape:

```javascript
// scripts/signals/<name>.js
export const name = 'weather'
export const timeout = 5000  // ms

export async function collect(profile) {
  // profile contains fixed data from signals/profile.yml
  // Returns { data, meta } or throws
  return {
    data: { /* goes into today.yml */ },
    meta: { source: 'weatherapi.com', items: 1 }
  }
}
```

The orchestrator wraps each call in its own timeout. A provider that throws or times out is logged as `skipped` in meta — it cannot affect other providers.

---

## File Structure

```
signals/
  profile.yml              # Fixed data — zip, teams, bands, disallow list
  today.yml                # Raw signal data (written by collector)
  today.meta.yml           # Collection log — status, latency, errors per source
  today.brief.md           # Claude's editorial interpretation (Stage 1 output)

scripts/
  collect-signals.js       # Orchestrator — runs providers, writes YAML + meta
  interpret-signals.js     # Stage 1 — Claude reads raw, writes brief
  daily-redesign.js        # Stage 2 — Claude designs from brief + context (existing)
  signals/                 # Provider modules
    weather.js
    sports.js
    golf.js
    github.js
    news.js
    music.js               # Reads from profile, picks random subset
    season.js              # Derived from date
    day-of-week.js         # Derived from date
    sun.js                 # Sunrise/sunset from lat/long
    lunar.js               # Moon phase, derived
    holidays.js            # US holidays + observances
    market.js              # S&P 500 direction
    air-quality.js         # AQI + pollen + UV
    hacker-news.js
    product-hunt.js
    books.js               # Reads from profile
    quote.js               # Random daily quote API
```

---

## Profile Config: `signals/profile.yml`

Fixed context that doesn't change day to day. Providers receive this as their `profile` argument.

```yaml
location:
  zip: "20105"
  name: "Ashburn, VA"

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

books:
  currently_reading: []
```

---

## Meta Log: `signals/today.meta.yml`

Records exactly what happened during collection — what succeeded, what failed, what was skipped. Useful for debugging why a design turned out a certain way.

```yaml
collected_at: 2026-03-14T09:55:00Z
duration_ms: 3200
sources:
  weather: { status: ok, source: weatherapi.com, latency_ms: 340, items: 1 }
  sports: { status: ok, source: espn, latency_ms: 890, items: 3 }
  golf: { status: skipped, reason: "API timeout after 5000ms" }
  news: { status: ok, source: newsapi, latency_ms: 420, items: 5, filtered: 2 }
  github: { status: error, reason: "403 rate limit" }
  season: { status: ok, source: derived, latency_ms: 0 }
  lunar: { status: ok, source: derived, latency_ms: 1 }
  market: { status: ok, source: alphavantage, latency_ms: 560 }
  # ... etc
```

---

## Two-Stage Creative Process

### Stage 1: Interpret (`scripts/interpret-signals.js`)

Claude reads the raw signals from `today.yml` and writes an editorial interpretation to `today.brief.md`. This has two parts:

1. **Per-signal feel tags** — a short mood descriptor for each signal category (e.g., weather: "brutal, isolating"; sports: "deflating")
2. **Synthesis paragraph** — 2-3 sentences tying all signals together into a unified creative direction (e.g., "The Midwest is frozen, Detroit is losing, and even the markets feel stuck. Today is about weight and stillness.")

This brief becomes part of the Stage 2 prompt, giving Claude both granular and holistic creative direction.

### Stage 2: Design (`scripts/daily-redesign.js`)

Claude reads the interpreted brief + all mutable site files and generates a complete redesign. This is the existing pipeline, updated to consume `today.brief.md` instead of raw signals directly.

---

## Full Pipeline Flow (Production)

1. **Collect** (~3s) — `collect-signals.js` runs 17 providers in parallel. Writes `today.yml` + `today.meta.yml`.
2. **Interpret** (~30s) — `interpret-signals.js` calls Claude to read raw signals and write `today.brief.md`.
3. **Design** (~2-5min) — `daily-redesign.js` calls Claude with the brief + site context. Generates files.
4. **Build + Validate** (~10-30s) — Write files, run `pnpm build`. Retry up to 3x on failure with error context.
5. **Archive + Ship** (~5s) — Save brief, signals, meta to `archive/`. Git commit. Push to main.

### Production Mode (Autonomous)

- GitHub Actions cron triggers at 5am EST (10am UTC)
- All steps run sequentially in CI
- Uses Anthropic API (requires `ANTHROPIC_API_KEY` with credits)
- Git commit + push to main on success
- Vercel auto-deploys from main
- No human in the loop

### Dev Mode (Fine-tunable)

- Triggered from `/dev` panel or `pnpm pipeline` CLI
- Can auto-collect signals OR manually edit `today.yml` before running
- Uses Claude CLI (Max plan, no API credits needed)
- Files written to disk, no git commit
- Hot-reload in browser via Vite HMR
- Full meta + timing visible in `/dev` panel
- Can re-run collect step independently
- Can override any signal before designing

---

## Signal Sources

### Tier 1 — No API key needed (derived or free)

| Provider | Source | Method |
|----------|--------|--------|
| Season | Date math | Derived from month |
| Day of week | Date math | Derived |
| Sunrise/sunset | sun.js | Calculated from lat/long + date |
| Lunar phase | lunar.js | Calculated from date |
| Holidays | holidays.js | Static list of US holidays + observances |
| Music | profile.yml | Random subset of bands from profile |
| Books | profile.yml | Currently reading list from profile |
| GitHub trending | github.com/trending | HTML scrape (no auth needed) |
| Hacker News | HN API | Official, no key, unlimited |
| Quote | quotable.io or similar | Free API, no key |

### Tier 2 — API key required (free tier sufficient)

| Provider | API | Free Tier |
|----------|-----|-----------|
| Weather | weatherapi.com | 1M calls/month |
| Air quality / UV / Pollen | weatherapi.com (bundled) | Same key |
| News | newsapi.org | 100 req/day |
| Market (S&P 500) | alphavantage.co | 25 req/day |
| Sports | ESPN unofficial API or sportsdata.io | ESPN no key; sportsdata trial |
| Golf | PGA Tour RSS or sportsdata.io | RSS free |
| Product Hunt | PH API v2 | OAuth required |

Required API keys (~4): weatherapi.com, newsapi.org, alphavantage, Product Hunt.

---

## Failure Handling

- If a provider fails or times out, it's **skipped**. Its data section is omitted from `today.yml` and logged as `skipped` or `error` in `today.meta.yml`.
- Claude designs with whatever signals came through. Even if only weather and season succeed, the pipeline continues.
- The interpret step (Stage 1) notes which signals are missing in its brief — "No sports data today" — so the design step knows not to reference them.
- If ALL providers fail, the pipeline still runs with derived signals (season, day of week, lunar phase) which never fail.

---

## Content Contract (Unchanged)

Claude has full creative freedom over presentation. The only constraint:

**Must always be present and accurate:**
- Every project (title, type, year, link)
- Bio / identity statement
- Timeline entries (year, role, company, description)
- Capabilities list
- Personal facts (holes in one, teams, focus)
- Navigation links (all routes accessible)
- Contact links (GitHub, Twitter, LinkedIn, Email)

**Totally fair game:**
- Where content appears, how it's styled, layout, components, colors, fonts, spacing, animation, density
- Adding decorative or signal-driven elements (scoreboards, weather widgets, tickers, mood indicators)
- Component structure (combine, split, nest differently)

---

## Non-Goals (This Phase)

- Live music integration (Spotify/Apple Music/Last.fm) — future enhancement
- Signal editing UI in `/dev` panel — future enhancement, use YAML for now
- Screenshot generation for archive — future phase
- Multiple redesigns per day — one daily run for now
- CMS for profile data — YAML is sufficient
