#!/usr/bin/env node

/**
 * Interpret Signals
 *
 * Reads signals/today.yml, calls Claude to interpret the raw signal data,
 * and writes a brief interpretation to signals/today.brief.md.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY - required in production mode
 *   MOCK_MODE=true    - use local `claude` CLI (Max plan) instead of API
 *
 * Exit codes:
 *   0 - success
 *   1 - failure
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { readFile, writeFile } from 'fs/promises'
import yaml from 'js-yaml'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MOCK_MODE = process.env.MOCK_MODE === 'true'

/**
 * Build a prompt asking Claude to interpret the raw signal data.
 *
 * @param {object} signals - parsed signals from today.yml
 * @returns {string} the prompt text
 */
export function buildInterpretPrompt(signals) {
  const signalLines = Object.entries(signals)
    .filter(([key]) => key !== 'date')
    .map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`)
    .join('\n')

  return `You are interpreting today's environmental signals for a personal website that redesigns itself daily.

Today's signals:
${signalLines}

Date: ${signals.date || 'unknown'}

Your task is to interpret these signals with a designer's eye. For each signal, identify its emotional or aesthetic quality — what does it suggest about mood, energy, tone, or visual feeling?

Output exactly two sections:

## Feel Tags
One line per signal (skip the date), in this format:
- signal_name: [2-3 evocative adjectives or short phrases]

Example:
- weather: brutal, isolating
- season: tender, new-growth
- day_of_week: slow, unhurried

## Synthesis
2-3 sentences tying the signals together into a unified per-signal feel and synthesis paragraph that describes the overall mood and aesthetic direction for today. Be specific and evocative — a designer should be able to translate this directly into visual choices.`
}

/**
 * Call the Claude Code CLI (Max plan) with a plain text prompt.
 * Pipes the prompt via stdin, reads stdout as the response.
 *
 * @param {string} prompt
 * @returns {Promise<string>} the response text
 */
async function callClaudeCLI(prompt) {
  const { spawn } = await import('child_process')
  const { writeFile: writeFileAsync } = await import('fs/promises')
  const { createReadStream } = await import('fs')

  // Write prompt to temp file
  const promptPath = path.join(ROOT, '.interpret-prompt.tmp')
  await writeFileAsync(promptPath, prompt, 'utf8')

  console.log('  calling claude CLI (Max plan)...')
  console.log(`  prompt length: ${prompt.length} chars`)

  // Strip ANTHROPIC_API_KEY so claude CLI uses Max plan subscription
  const cliEnv = { ...process.env }
  delete cliEnv.ANTHROPIC_API_KEY

  const result = await new Promise((resolve, reject) => {
    const child = spawn('claude', ['-p', '--max-turns', '1'], {
      cwd: ROOT,
      env: cliEnv,
    })

    let stdout = ''
    let stderr = ''

    const promptStream = createReadStream(promptPath)
    promptStream.pipe(child.stdin)

    child.stdout.on('data', (chunk) => { stdout += chunk.toString() })
    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    const timeout = setTimeout(() => {
      child.kill()
      reject(new Error('Claude CLI timed out after 5 minutes'))
    }, 300000)

    child.on('close', (code) => {
      clearTimeout(timeout)
      if (code !== 0 && !stdout.trim()) {
        console.error(`  claude CLI stderr: ${stderr.slice(0, 500)}`)
        reject(new Error(`claude CLI exited with code ${code}: ${stderr.slice(0, 500)}`))
      } else {
        resolve(stdout.trim())
      }
    })

    child.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })

  // Clean up temp file
  try {
    const { unlink } = await import('fs/promises')
    await unlink(promptPath)
  } catch {}

  return result
}

/**
 * Call the Anthropic SDK in production mode.
 *
 * @param {string} prompt
 * @returns {Promise<string>} the response text
 */
async function callAnthropicAPI(prompt) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic()

  console.log('  calling Claude API (claude-opus-4-6)...')

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')

  return text
}

async function main() {
  const start = Date.now()
  console.log('\n=== Interpret Signals ===')
  console.log(`MOCK_MODE: ${MOCK_MODE}`)

  if (!MOCK_MODE && !process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set.')
    console.error('  Use MOCK_MODE=true to use local Claude Code CLI.')
    process.exit(1)
  }

  // Step 1: Read signals
  console.log('\n[1/3] Reading signals/today.yml...')
  const signalsPath = path.join(ROOT, 'signals', 'today.yml')
  let signals
  try {
    const raw = await readFile(signalsPath, 'utf8')
    signals = yaml.load(raw)
    console.log(`  date: ${signals.date}`)
    console.log(`  signal keys: ${Object.keys(signals).join(', ')}`)
  } catch (err) {
    console.error(`  Error reading signals: ${err.message}`)
    process.exit(1)
  }

  // Step 2: Build prompt and call Claude
  console.log('\n[2/3] Calling Claude...')
  const prompt = buildInterpretPrompt(signals)

  let responseText
  try {
    if (MOCK_MODE) {
      responseText = await callClaudeCLI(prompt)
    } else {
      responseText = await callAnthropicAPI(prompt)
    }
  } catch (err) {
    console.error(`  Error calling Claude: ${err.message}`)
    process.exit(1)
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`  Claude responded in ${elapsed}s`)

  // Step 3: Write brief
  console.log('\n[3/3] Writing signals/today.brief.md...')
  const briefPath = path.join(ROOT, 'signals', 'today.brief.md')
  const briefContent = `# Signals Brief — ${signals.date || 'today'}\n\n${responseText}\n`
  await writeFile(briefPath, briefContent, 'utf8')
  console.log(`  written to signals/today.brief.md`)

  const total = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n=== Done in ${total}s ===`)
}

// Run main only when executed directly (not when imported for testing)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}
