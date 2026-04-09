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
import { readFile, writeFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'
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
      })
    }
  }
  return providers
}

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
      // Sanitize all third-party string data to defend against prompt
      // injection. Signal data flows into Claude prompts unmodified;
      // a crafted HN title or news headline could steer the AI output.
      signals[r.name] = sanitizeSignals(r.data)
    }
    sources[r.name] = r.status === 'ok'
      ? { status: 'ok', source: r.meta.source ?? r.name, latency_ms: r.meta.latency_ms, items: r.meta.items ?? 0 }
      : { status: r.status, reason: r.reason, latency_ms: r.meta.latency_ms }
  }

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

async function writeOutputs(signals, meta) {
  const signalsPath = path.join(ROOT, 'signals/today.yml')
  const metaPath = path.join(ROOT, 'signals/today.meta.yml')

  await writeFile(signalsPath, yaml.dump(signals, { lineWidth: -1 }), 'utf8')
  await writeFile(metaPath, yaml.dump(meta, { lineWidth: -1 }), 'utf8')

  console.log(`\nWritten: signals/today.yml (${Object.keys(signals).length - 1} signal groups)`)
  console.log(`Written: signals/today.meta.yml (${meta.providers_ok}/${meta.providers_total} ok)`)
}

if (process.argv[1] && process.argv[1].endsWith('collect-signals.js')) {
  const { signals, meta } = await runCollector()
  await writeOutputs(signals, meta)
  console.log(`\nDone in ${meta.duration_ms}ms.`)
}
