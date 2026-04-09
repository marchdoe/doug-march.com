#!/usr/bin/env node

/**
 * Daily Redesign Pipeline
 *
 * Reads signals/today.yml, runs the design agent swarm, which handles
 * backup/restore/retry/archive internally. This script is just the outer
 * orchestration layer — the heavy lifting happens in design-agents.js.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY - required in production
 *   DRY_RUN=true      - optional, generates but does not commit
 *
 * Exit codes:
 *   0 - success (build passed, committed)
 *   1 - failure (all attempts exhausted or fatal error)
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { execSync } from 'child_process'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { readContext } from './utils/site-context.js'
import { runAgentSwarm } from './design-agents.js'

const DRY_RUN = process.env.DRY_RUN === 'true'
const MOCK_MODE = process.env.MOCK_MODE === 'true'

async function main() {
  // Validate claude CLI is available (required in all modes)
  try {
    execSync('claude --version', { encoding: 'utf8', timeout: 5000 })
  } catch {
    console.error('Error: The `claude` CLI (Claude Code) is required.')
    console.error('  Install: https://claude.ai/download')
    process.exit(1)
  }

  console.log(`\n=== Daily Redesign Pipeline ===`)
  console.log(`DRY_RUN: ${DRY_RUN}`)
  console.log(`MOCK_MODE: ${MOCK_MODE}`)
  console.log('')

  // Step 1: Read context
  console.log('[1/3] Reading site context...')
  const context = await readContext()
  console.log(`  signals date: ${context.signals.date}`)
  console.log(`  mutable files found: ${context.currentFiles.length}`)

  // Check for interpreted brief (Stage 1 output)
  const briefPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../signals/today.brief.md')
  if (existsSync(briefPath)) {
    context.brief = await readFile(briefPath, 'utf8')
    console.log(`  using interpreted brief (${context.brief.length} chars)`)
  }

  // Step 2: Run agent swarm (handles its own backup/restore/retry/archive)
  console.log('[2/3] Running agent swarm...')
  let result
  try {
    result = await runAgentSwarm(context)
  } catch (err) {
    console.error(`\nAgent swarm failed: ${err.message}`)
    process.exit(1)
  }

  // Step 3: Done
  console.log(`\n[3/3] design_brief: ${result.design_brief}`)

  if (DRY_RUN) {
    console.log('\nDRY_RUN=true — files written to disk. Build was verified.')
  } else {
    console.log('\nDone. GitHub Actions will commit and push.')
  }

  process.exit(0)
}

// Run main only when executed directly (not when imported for testing)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}
