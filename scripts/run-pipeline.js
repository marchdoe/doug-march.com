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
