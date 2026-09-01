#!/usr/bin/env node

/**
 * Full Daily Redesign Pipeline
 *
 * Runs all stages in sequence:
 *   1. Collect signals (scripts/collect-signals.js) — always runs; there is
 *      no freshness check anywhere in this pipeline (#305)
 *   2. Collect references (scripts/collect-references.js) — non-blocking
 *   3. Design + Build + Archive (scripts/daily-redesign.js)
 *
 * The historical "Interpret Signals" stage was removed in the Art Director
 * pipeline (2026-04-29) — the Art Director ingests raw signals directly.
 */

import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function run(label, command) {
  console.log(`\n=== ${label} ===\n`)
  execSync(command, { cwd: ROOT, stdio: 'inherit', env: process.env })
}

try {
  run('Stage 1: Collect Signals', 'node scripts/collect-signals.js')
  try {
    run('Stage 2: Collect References', 'node scripts/collect-references.js')
  } catch (err) {
    console.warn('Reference collection failed (non-blocking):', err.message)
  }
  run('Stage 3: Design + Build + Archive', 'node scripts/daily-redesign.js')
  console.log('\n=== Pipeline complete ===')
} catch (err) {
  console.error('\nPipeline failed:', err.message)
  process.exit(1)
}
