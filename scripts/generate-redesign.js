#!/usr/bin/env node

/**
 * Generate Redesign — Step 1 of local pipeline
 *
 * Reads signals + site context, writes the full prompt to .claude-prompt.txt
 * so Claude Code (interactive session) can read it and generate .claude-response.json.
 *
 * Usage: node scripts/generate-redesign.js
 *   Then: Claude Code reads .claude-prompt.txt, generates the redesign, writes .claude-response.json
 *   Then: MOCK_MODE=true node scripts/daily-redesign.js (builds + validates)
 */

import { readContext } from './utils/site-context.js'
import { buildMessages } from './utils/prompt-builder.js'
import { writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

async function main() {
  console.log('\n=== Generate Redesign — Preparing prompt ===\n')

  const context = await readContext()
  console.log(`Signals date: ${context.signals.date}`)
  console.log(`Mutable files: ${context.currentFiles.length}`)

  const { system, messages } = buildMessages(context)
  const userPrompt = messages[0].content

  const fullPrompt = `${system}\n\n---\n\n${userPrompt}`

  const promptPath = path.join(ROOT, '.claude-prompt.txt')
  await writeFile(promptPath, fullPrompt, 'utf8')

  console.log(`\nPrompt written to .claude-prompt.txt (${(fullPrompt.length / 1024).toFixed(0)}KB)`)
  console.log('\nNext: Claude Code reads this and generates .claude-response.json')
  console.log('Then: MOCK_MODE=true node scripts/daily-redesign.js')
}

main().catch(err => { console.error(err); process.exit(1) })
