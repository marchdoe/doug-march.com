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

Write a creative brief with exactly these five sections. Be opinionated and specific — you are a PM writing requirements, not a mood board.

## Mood
[2-4 sentences of atmospheric writing. Set the emotional register for today's design. Fold in any tensions between signals — when signals conflict, name the conflict and instruct the designer to hold it, not resolve it. This replaces both the old "Tension" and the atmospheric parts of palette direction. Write this like an editorial lede, not a list of adjectives.]

## Composition Direction
[Name a specific composition archetype and explain why it fits today. You MUST choose from: Poster, Broadsheet, Gallery Wall, Scroll, Split, Stack, Specimen, Index. You may suggest a hybrid of two archetypes (e.g., "Specimen with Gallery Wall energy") but the primary archetype must be named first. Explain in 1-2 sentences why this archetype matches today's signals. IMPORTANT: Avoid repeating the same archetype within a 3-day window — check recent briefs if available.]

## Typography Direction
[1-2 sentences on type scale, spacing, and character. Should the type be tight or generous? Loud or quiet? Angular or rounded? Should headings whisper or shout? Let the mood and composition choice inform this — a Specimen day demands extreme type scale; a Broadsheet day demands strict hierarchy through size alone.]

## Signal Integration
[Bulleted list specifying HOW each noteworthy signal should manifest in the design. Do not just list signals — describe their treatment. Every bullet must answer "how does this appear?" not just "this exists."]

Format:
- [signal name] → [specific treatment: what form it takes, where it lives, what tone it carries]

Examples of good signal integration:
- Tigers 13-6 win → inline celebration callout, not a card. Triumphant but brief — a scoreline with editorial swagger, tucked near the masthead.
- Waning crescent moon → reduce overall contrast slightly. The page should feel like it's lit by less.
- Radiohead on rotation → angular, precise type spacing. Let letter-spacing run tight.

Only include signals worth commenting on. "Off season" or "no notable news" are not worth a bullet. A win, a loss, an approaching holiday, a resonant quote, notable music — those ARE.

The signal that should be FELT most strongly when someone lands on the site should be listed FIRST and given the most detailed treatment. This is your call as PM — what's the headline of today's design?

## Palette Direction
[2-3 sentences on color temperature, saturation, and mood — derived from PRIMARY signals (weather, season, daylight). Be more specific than "warm" or "cool" — describe contrast level (high/low), warmth or coolness on a spectrum, and degree of restraint (monochromatic vs. multi-hue). Never prescribe specific hex colors — describe the feeling and boundaries.]`
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

  const fullPrompt = prompt

  // Write prompt to temp file
  const promptPath = path.join(ROOT, '.interpret-prompt.tmp')
  await writeFileAsync(promptPath, fullPrompt, 'utf8')

  console.log('  calling claude CLI (Max plan)...')
  console.log(`  prompt length: ${prompt.length} chars`)

  // Strip ANTHROPIC_API_KEY so claude CLI uses Max plan subscription
  const cliEnv = { ...process.env }
  delete cliEnv.ANTHROPIC_API_KEY

  const result = await new Promise((resolve, reject) => {
    const pipelineSettings = path.join(ROOT, 'scripts', 'pipeline-settings.json')
    const child = spawn('claude', [
      '-p', '--max-turns', '1', '--tools', '', '--disable-slash-commands',
      '--settings', pipelineSettings,
      '--system-prompt', 'You are a creative brief writer. Respond with only the requested text. Do not use tools.',
    ], {
      cwd: ROOT,
      env: cliEnv,
    })

    let stdout = ''
    let stderr = ''

    const promptStream = createReadStream(promptPath)
    child.stdin.on('error', () => {}) // swallow EPIPE
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
