#!/usr/bin/env node

/**
 * Full Daily Redesign Pipeline
 *
 * Runs all stages in sequence:
 *   1. Collect signals (scripts/collect-signals.js) — skipped if already collected today
 *   2. Interpret signals (scripts/interpret-signals.js)
 *   3. Design + Build + Archive (scripts/daily-redesign.js)
 */

import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DRY_RUN = process.env.DRY_RUN === 'true'
const MOCK_MODE = process.env.MOCK_MODE === 'true'

function run(label, command) {
  console.log(`\n=== ${label} ===\n`)
  execSync(command, { cwd: ROOT, stdio: 'inherit', env: process.env })
}

try {
  // Check if signals were already collected today
  const signalsPath = path.resolve(ROOT, 'signals/today.yml')
  let skipCollection = false
  if (existsSync(signalsPath)) {
    try {
      const existing = yaml.load(readFileSync(signalsPath, 'utf8'))
      const today = new Date().toISOString().slice(0, 10)
      if (existing.date === today) {
        console.log(`\n=== Stage 1: Signals already collected for ${today} — skipping ===\n`)
        skipCollection = true
      }
    } catch {}
  }

  if (!skipCollection) {
    run('Stage 1: Collect Signals', 'node scripts/collect-signals.js')
  }

  run('Stage 2: Interpret Signals', 'node scripts/interpret-signals.js')
  try {
    run('Stage 2.5: Collect References', 'node scripts/collect-references.js')
  } catch (err) {
    console.warn('Reference collection failed (non-blocking):', err.message)
  }
  run('Stage 3: Design + Build + Archive', 'node scripts/daily-redesign.js')
  console.log('\n=== Pipeline complete ===')
} catch (err) {
  console.error('\nPipeline failed:', err.message)
  process.exit(1)
}
