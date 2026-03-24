#!/usr/bin/env node
/**
 * Manual Redesign Test — simulates the daily redesign pipeline without an API key.
 *
 * Usage:
 *   node scripts/test-redesign-manual.js
 *
 * How it works:
 *   1. Builds the same system prompt + user prompt that daily-redesign.js sends to Claude.
 *   2. Writes both to .redesign-prompt.txt so you can read/copy the full prompt.
 *   3. Asks you to paste a JSON response (the submit_redesign tool input).
 *   4. Runs the rest of the pipeline: write files → build → archive — as a dry run.
 *
 * The JSON you paste must match this shape:
 *   {
 *     "rationale": "1-2 paragraphs about the design",
 *     "design_brief": "One evocative sentence",
 *     "files": [
 *       { "path": "elements/preset.ts", "content": "..." },
 *       ...
 *     ]
 *   }
 */

import { fileURLToPath } from 'url'
import path from 'path'
import { writeFile, readFile } from 'fs/promises'
import * as readline from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Import pipeline utilities
import { readContext, MUTABLE_FILES } from './utils/site-context.js'
import { buildMessages } from './utils/prompt-builder.js'
import { backup, writeFiles, restore } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'

const PROMPT_OUTPUT_FILE = path.join(ROOT, '.redesign-prompt.txt')

async function main() {
  console.log('\n=== Manual Redesign Test ===')
  console.log('Simulates the full pipeline. You act as the Claude API.\n')

  // Step 1: Read context
  console.log('[1/5] Reading site context...')
  const context = await readContext()
  console.log(`  signals date: ${context.signals.date}`)
  console.log(`  mutable files found: ${context.currentFiles.length}`)

  // Step 2: Build prompt
  console.log('[2/5] Building prompt...')
  const { system, messages } = buildMessages(context)
  const userPrompt = messages[0].content

  // Write prompt to file for easy reading
  const promptText = [
    '=== SYSTEM PROMPT ===',
    '',
    system,
    '',
    '=== USER PROMPT ===',
    '',
    userPrompt,
    '',
    '=== SUBMIT REDESIGN TOOL ===',
    '',
    'Call submit_redesign with:',
    '  rationale   — 1-2 paragraphs explaining creative choices (goes in archive)',
    '  design_brief — one evocative sentence (e.g. "Post-blizzard brutalism: heavy type, cold grays")',
    '  files        — array of { path, content } for every file you changed (must include elements/preset.ts)',
    '',
  ].join('\n')

  await writeFile(PROMPT_OUTPUT_FILE, promptText, 'utf8')
  console.log(`  prompt written to: .redesign-prompt.txt`)
  console.log(`  system prompt: ${system.length} chars`)
  console.log(`  user prompt:   ${userPrompt.length} chars`)

  // Step 3: Get JSON response from user
  console.log('\n[3/5] Your turn — paste the submit_redesign JSON input.')
  console.log('  Read the prompt in .redesign-prompt.txt, then paste the JSON below.')
  console.log('  When done, press Enter twice (blank line) to finish.\n')

  const rl = readline.createInterface({ input, output, terminal: false })

  let lines = []
  let blankCount = 0
  for await (const line of rl) {
    if (line.trim() === '') {
      blankCount++
      if (blankCount >= 2) break
    } else {
      blankCount = 0
    }
    lines.push(line)
  }
  rl.close()

  const rawInput = lines.join('\n').trim()
  if (!rawInput) {
    console.error('No input received. Exiting.')
    process.exit(1)
  }

  let toolInput
  try {
    toolInput = JSON.parse(rawInput)
  } catch (err) {
    console.error(`Failed to parse JSON: ${err.message}`)
    console.error('Make sure you pasted valid JSON.')
    process.exit(1)
  }

  // Validate required fields
  const { rationale, design_brief, files } = toolInput
  if (!rationale || !design_brief || !Array.isArray(files) || files.length === 0) {
    console.error('JSON is missing required fields: rationale, design_brief, files[]')
    process.exit(1)
  }
  if (!files.find((f) => f.path === 'elements/preset.ts')) {
    console.error('files[] must include elements/preset.ts')
    process.exit(1)
  }

  console.log(`\n  design_brief: ${design_brief}`)
  console.log(`  files to write: ${files.length}`)

  // Step 4: Backup + write files
  console.log('\n[4/5] Backing up originals and writing generated files...')
  const originalBackup = await backup(MUTABLE_FILES)
  console.log(`  backed up ${originalBackup.size} files`)

  try {
    await writeFiles(files)
  } catch (err) {
    console.error(`writeFiles error: ${err.message}`)
    console.log('Restoring originals...')
    await restore(originalBackup)
    process.exit(1)
  }

  // Step 5: Validate build
  console.log('[5/5] Validating build...')
  const buildResult = validateBuild()

  if (buildResult.success) {
    console.log('\n=== Build passed! ===')

    // Archive
    const changedPaths = files.map((f) => f.path)
    await archive(context.signals.date, context.signals, rationale, design_brief, changedPaths)

    console.log('\nDRY RUN — restoring originals (not committing).')
    await restore(originalBackup)
    console.log('\nDone. Pipeline works end-to-end.')
    console.log('When you have API credits: merge PR #3, add ANTHROPIC_API_KEY to GitHub Secrets, trigger the workflow.')
  } else {
    console.error('\n=== Build failed. ===')
    console.error(buildResult.error?.slice(0, 2000))
    console.log('\nRestoring originals...')
    await restore(originalBackup)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
