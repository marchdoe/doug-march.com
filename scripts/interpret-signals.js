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
  const signalDump = Object.entries(signals)
    .filter(([key]) => key !== 'date')
    .map(([key, value]) => `### ${key}\n${JSON.stringify(value, null, 2)}`)
    .join('\n\n')

  return `You are the Product Manager for doug-march.com — a personal portfolio site that redesigns itself daily based on environmental signals.

Your job is to read today's raw signals and write a structured creative brief. You are NOT the designer. You write requirements — opinionated, editorial, specific. The designer (a separate stage) will receive your brief and decide HOW to execute it visually.

## Today's Raw Signals (${signals.date || 'unknown'})

${signalDump}

---

## Signal Hierarchy

Use this hierarchy to structure your brief. PRIMARY signals set the foundation. SECONDARY signals add editorial elements. ACCENT signals add texture.

### PRIMARY — Set the Foundation (Color Palette + Layout Energy)
These are always present (derived, never fail). They establish the visual foundation.

| Signal | Design Dimension | Example |
|--------|-----------------|---------|
| Weather | Color palette temperature | Blizzard → icy/stark; sunny 75°F → warm/golden |
| Season | Color palette richness/saturation | Spring → fresh greens; winter → desaturated/stark |
| Day of week | Layout energy and density | Weekend → spacious/relaxed; weekday → structured/dense |
| Daylight hours (sun) | Light/dark balance | Short days → heavier darks; long days → airy/light |

### SECONDARY — Add Editorial Elements + Flavor
These add editorial commentary layered on the PRIMARY foundation. They have a point of view.

| Signal | Design Dimension | Example |
|--------|-----------------|---------|
| Sports results | Editorial elements with POV | Win → celebratory badge; loss → dismissive callout |
| Golf leaderboard | Editorial element if notable | Masters Sunday → leaderboard feature element |
| Holidays | Thematic accents + elements | St. Patrick's Day → green accents, shamrock element |
| Market direction | Subtle mood modifier | Down day → heavier/compressed feel |
| News headlines | Possible editorial element | Major event → acknowledgment element |

### ACCENT — Texture and Personality (Never Dominate)
These add texture and personality. They should be felt, not seen.

| Signal | Design Dimension | Example |
|--------|-----------------|---------|
| Music bands | Typography/personality hints | Radiohead → angular/precise; GBV → lo-fi/rough |
| Lunar phase | Atmospheric subtlety | Full moon → contrast/drama; new moon → minimal |
| Quote | Potential anchor if resonant | Chaos quote on chaotic day → feature prominently |
| GitHub trending | Tech texture hints | AI repos → code-aesthetic elements |
| Hacker News | Cultural temperature | Interesting HN day → tech-forward personality |
| Books | Personality hint | Reading sci-fi → futuristic touches |
| Air quality | Environmental overlay | Poor AQI → hazy/muted treatment |

---

## Conflict Resolution: Tension is the Feature

When signals conflict, do NOT resolve the conflict by picking a winner. Instead, tension between signals becomes a design requirement.

Examples:
- Warm spring Saturday + Tigers loss → warm palette BUT dismissive editorial element about the loss
- Sunny day + market crash → bright layout BUT compressed, anxious typography for market elements
- Holiday approaching + bad weather → festive accents layered over a cold palette

Call out tensions explicitly. Instruct the designer to hold them, not resolve them.

---

## Your Output

Write a creative brief with exactly these six sections. Be opinionated and specific — you are a PM writing requirements, not a mood board.

## Palette Direction
[1-2 sentences on color temperature, saturation, mood — derived from PRIMARY signals (weather, season, daylight). Never prescribe specific hex colors — describe the feeling.]

## Layout Energy
[1-2 sentences on density, spacing, rhythm, visual weight — derived from day of week, season, daylight hours. Weekend = relaxed/spacious, weekday = structured/tight.]

## Tension
[1-2 sentences identifying contradictions between signals. What conflicts exist? Instruct the designer to hold the tension, not resolve it. If no tension, say so — some days are harmonious.]

## Required Elements
[Bulleted list of editorial design elements the designer MUST include. Each has a signal source, editorial direction, and tone. These are requirements, not suggestions.]

Format:
- [element description]: [editorial direction + tone] (source: [signal name])

Only include elements for signals worth commenting on. "Off season" is not worth an element. A win or loss IS. An approaching holiday IS. A notable golf leaderboard IS.

## Accent Notes
[Bulleted list of subtle influences from ACCENT signals. These are suggestions, not requirements.]

Format:
- [signal name] ([key detail]): [how it might subtly influence texture, typography, or personality]

## Anchor Signal
[One sentence naming the single signal that should be FELT most strongly when someone lands on the site. This is your call as PM — what's the headline of today's design?]`
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
    max_tokens: 2048,
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
