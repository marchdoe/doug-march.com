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

import { config } from 'dotenv'
import { localDateString, tzOf } from './utils/local-time.js'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as yaml from 'js-yaml'
import { sanitizeSignals } from './utils/sanitize-signal.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
config({ path: path.join(ROOT, '.env') })
const SIGNALS_DIR = path.join(__dirname, 'signals')
const PROFILE_PATH = path.join(ROOT, 'signals/profile.yml')

async function loadProfile() {
  const raw = await readFile(PROFILE_PATH, 'utf8')
  return yaml.load(raw)
}

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
        requiresApiKey: mod.requiresApiKey,
      })
    }
  }
  return providers
}

async function runProvider(provider, profile, now = new Date()) {
  // If the provider declares a required API key and it's missing, skip
  // cleanly with a 'skipped' status instead of letting it throw. This
  // distinguishes "no key configured" from actual runtime errors in logs.
  if (provider.requiresApiKey && !process.env[provider.requiresApiKey]) {
    return {
      status: 'skipped',
      reason: `${provider.requiresApiKey} not set`,
      meta: { latency_ms: 0 },
    }
  }
  const start = Date.now()
  const ac = new AbortController()
  // Start the provider call and attach a no-op catch handler immediately.
  // This prevents unhandled rejections when the race times out and the
  // provider's fetch later rejects with an AbortError or network error —
  // by the time that rejection settles, Promise.race has already moved on.
  // `now` is passed so every derived collector in a run agrees on the
  // instant, instead of each calling new Date() a few milliseconds apart —
  // which straddles midnight roughly once a year.
  const providerPromise = provider.collect(profile, { signal: ac.signal, now })
  providerPromise.catch(() => {})

  let timeoutId
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`timeout after ${provider.timeout}ms`)),
      provider.timeout
    )
  })

  try {
    const result = await Promise.race([providerPromise, timeoutPromise])
    clearTimeout(timeoutId)
    const latency = Date.now() - start
    return {
      status: 'ok',
      data: result.data,
      meta: { ...result.meta, latency_ms: latency },
    }
  } catch (err) {
    clearTimeout(timeoutId)
    const latency = Date.now() - start
    // Classify based on error message content, not latency — CI event loop
    // jitter can cause a latency-based classification to flip 'error' to
    // 'skipped' incorrectly (code review finding #18).
    const status = err.message?.startsWith('timeout after') ? 'skipped' : 'error'
    return {
      status,
      reason: err.message,
      meta: { latency_ms: latency },
    }
  } finally {
    // Cancel any still-running provider work. If the provider already
    // finished, this is a no-op. If it's hung on fetch, abort signals
    // fetch to stop and release resources.
    ac.abort()
  }
}

// Safety net: if a provider's fetch rejects after the Promise.race already
// settled (e.g., slow network response arriving post-timeout), Node 20+
// would crash on unhandled rejection. We've already attached .catch() to
// every provider promise, but this handler is belt-and-suspenders.
process.on('unhandledRejection', (reason) => {
  const msg = reason?.message || String(reason)
  // Only suppress signal-provider related rejections; surface everything else
  if (msg.includes('AbortError') || msg.includes('aborted')) return
  console.warn('[unhandledRejection]', msg)
})

export async function runCollector(providerOverrides, profileOverride, { now = new Date() } = {}) {
  const profile = profileOverride ?? (await loadProfile())
  const providers = providerOverrides ?? (await discoverProviders())

  console.log(`Collecting from ${providers.length} providers...`)
  const startTime = Date.now()

  const results = await Promise.allSettled(
    providers.map(async (p) => {
      console.log(`  [${p.name}] fetching...`)
      const result = await runProvider(p, profile, now)
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
      // Sanitize all third-party string data to defend against prompt
      // injection. Signal data flows into Claude prompts unmodified;
      // a crafted HN title or news headline could steer the AI output.
      signals[r.name] = sanitizeSignals(r.data)
    }
    sources[r.name] =
      r.status === 'ok'
        ? {
            status: 'ok',
            source: r.meta.source ?? r.name,
            latency_ms: r.meta.latency_ms,
            items: r.meta.items ?? 0,
          }
        : { status: r.status, reason: r.reason, latency_ms: r.meta.latency_ms }
  }

  // The site's own day, not UTC's. These two disagree every evening: at
  // 23:30 Eastern the UTC stamp reads tomorrow while every derived collector
  // reads today.
  signals.date = localDateString(now, tzOf(profile))

  const meta = {
    collected_at: new Date().toISOString(),
    duration_ms: totalMs,
    providers_total: providers.length,
    providers_ok: Object.values(sources).filter((s) => s.status === 'ok').length,
    providers_failed: Object.values(sources).filter((s) => s.status !== 'ok').length,
    sources,
  }

  return { signals, meta }
}

async function writeOutputs(signals, meta) {
  const signalsPath = path.join(ROOT, 'signals/today.yml')
  const metaPath = path.join(ROOT, 'signals/today.meta.yml')

  await writeFile(signalsPath, yaml.dump(signals, { lineWidth: -1 }), 'utf8')
  await writeFile(metaPath, yaml.dump(meta, { lineWidth: -1 }), 'utf8')

  console.log(`\nWritten: signals/today.yml (${Object.keys(signals).length - 1} signal groups)`)
  console.log(`Written: signals/today.meta.yml (${meta.providers_ok}/${meta.providers_total} ok)`)
}

if (process.argv[1]?.endsWith('collect-signals.js')) {
  const { signals, meta } = await runCollector()
  await writeOutputs(signals, meta)
  console.log(`\nDone in ${meta.duration_ms}ms.`)
}
