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
import { existsSync, readdirSync } from 'fs'
import yaml from 'js-yaml'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MOCK_MODE = process.env.MOCK_MODE === 'true'

/**
 * Build the signal dump section, structurally filtered based on signal weight.
 * Low weights strip the dump to only primary signals. High weights keep everything.
 *
 * @param {object} signals - parsed signals from today.yml
 * @param {number} signalWeight - 0-10 weight for signals
 * @returns {string} the signal dump markdown
 */
function buildSignalDump(signals, signalWeight) {
  const allEntries = Object.entries(signals).filter(([key]) => key !== 'date')

  if (signalWeight <= 3) {
    // Low signal weight: strip down to just primary signals
    const primaryKeys = ['weather', 'season', 'sun', 'day_of_week', 'daylight']
    const filtered = allEntries.filter(([key]) =>
      primaryKeys.some(pk => key.toLowerCase().includes(pk))
    )
    // If nothing matched the primary keys, fall back to first 3 entries
    const entries = filtered.length > 0 ? filtered : allEntries.slice(0, 3)
    return entries
      .map(([key, value]) => `### ${key}\n${JSON.stringify(value, null, 2)}`)
      .join('\n\n')
  }

  // Medium or high: full dump
  return allEntries
    .map(([key, value]) => `### ${key}\n${JSON.stringify(value, null, 2)}`)
    .join('\n\n')
}

/**
 * Build a prompt asking Claude to interpret the raw signal data.
 * Weights STRUCTURALLY change what the model sees, not just add advisory text.
 *
 * @param {object} signals - parsed signals from today.yml
 * @param {object} weights - creative weights (signals, inspiration, ratings, risk)
 * @param {object} options - additional options
 * @param {string} [options.previousBrief] - previous brief to avoid repetition
 * @param {number} [options.runNumber] - which run this is today
 * @param {Array} [options.designReferenceImages] - Awwwards screenshots
 * @returns {string} the prompt text
 */
export function buildInterpretPrompt(signals, weights = {}, options = {}) {
  const { previousBrief, runNumber = 1, designReferenceImages = [] } = options
  const signalWeight = weights.signals ?? 5
  const inspirationWeight = weights.inspiration ?? 5
  const riskWeight = weights.risk ?? 5

  const signalDump = buildSignalDump(signals, signalWeight)

  // --- Assemble prompt sections in order based on weights ---
  const sections = []

  // Role preamble (always first)
  sections.push(`You are the Product Manager for doug-march.com — a personal portfolio site that redesigns itself daily based on environmental signals.

Your job is to read today's raw signals and write a structured creative brief. You are NOT the designer. You write requirements — opinionated, editorial, specific. The designer (a separate stage) will receive your brief and decide HOW to execute it visually.`)

  // HIGH INSPIRATION: Design references come BEFORE signals — the first thing the model sees
  if (inspirationWeight >= 7 && designReferenceImages.length > 0) {
    let refSection = `## Design References — Awwwards Sites of the Day (PRIMARY DRIVER)

Your primary job today is to create a brief inspired by this award-winning design. Adapt its compositional approach for a portfolio site. Study the screenshot carefully — its layout structure, typography choices, color approach, and spatial relationships should heavily influence your archetype choice and layout direction.

`
    for (const img of designReferenceImages) {
      refSection += `### ${img.title}\n${img.description || ''}\n\n![${img.title}](data:${img.contentType};base64,${img.base64})\n\n`
    }
    sections.push(refSection)
  }

  // Signal dump section — framed differently based on weight
  if (signalWeight <= 3) {
    sections.push(`## Today's Raw Signals — Minimal (${signals.date || 'unknown'})

Signals are set to low influence today. Only primary environmental data is shown. Use these as light background texture — do not let them drive major design decisions.

${signalDump}`)
  } else if (signalWeight <= 6) {
    sections.push(`## Today's Raw Signals (${signals.date || 'unknown'})

Signals are at moderate influence today. They should inform palette and mood but not dominate the creative direction.

${signalDump}`)
  } else {
    sections.push(`## Today's Raw Signals (${signals.date || 'unknown'})

${signalDump}`)
  }

  // MODERATE/LOW INSPIRATION: Design references come after signals
  if (inspirationWeight < 7 && designReferenceImages.length > 0) {
    let refSection = `---

## Design References — Awwwards Sites of the Day

`
    if (inspirationWeight <= 3) {
      refSection += `These are ambient context only. Do not try to emulate them — just note any broad trends.\n\n`
    } else {
      refSection += `Analyze their design approaches and note any trends — compositional patterns, typography choices, color approaches, layout strategies. These observations should inform your Composition Direction and Typography Direction sections.\n\n`
    }
    for (const img of designReferenceImages) {
      refSection += `### ${img.title}\n${img.description || ''}\n\n![${img.title}](data:${img.contentType};base64,${img.base64})\n\n`
    }
    sections.push(refSection)
  }

  // Signal hierarchy (always included)
  sections.push(`---

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
| Air quality | Environmental overlay | Poor AQI → hazy/muted treatment |`)

  // Conflict resolution
  sections.push(`---

## Conflict Resolution: Tension is the Feature

When signals conflict, do NOT resolve the conflict by picking a winner. Instead, tension between signals becomes a design requirement.

Examples:
- Warm spring Saturday + Tigers loss → warm palette BUT dismissive editorial element about the loss
- Sunny day + market crash → bright layout BUT compressed, anxious typography for market elements
- Holiday approaching + bad weather → festive accents layered over a cold palette

Call out tensions explicitly. Instruct the designer to hold them, not resolve them.`)

  // --- STRUCTURAL CONSTRAINTS based on weights (injected BEFORE output format) ---

  // Risk weight constraints
  if (riskWeight >= 7) {
    sections.push(`---

## Creative Risk Directive (HIGH)

You MUST choose an archetype you have NOT used in the last 5 days. If the last 5 briefs all used conventional layouts, choose The Specimen or The Index. Surprise the owner. Push boundaries — choose unusual archetypes, extreme typography, unexpected compositions. The site owner wants to be surprised.`)
  } else if (riskWeight <= 3) {
    sections.push(`---

## Creative Risk Directive (LOW)

Choose a proven, professional layout. The Scroll or The Stack are safe choices. Play it safe — use proven layouts, conventional hierarchy, readable and professional.`)
  }

  // Run number constraint for forced diversity
  if (runNumber > 1) {
    sections.push(`---

## Run Diversity Requirement

This is run #${runNumber} today. The previous ${runNumber - 1} run(s) have already been built. You MUST choose a DIFFERENT archetype and typography direction than what was used before.`)
  }

  // Previous brief constraint (do not repeat)
  if (previousBrief) {
    sections.push(`---

## Previous Run's Brief (DO NOT REPEAT)

The previous pipeline run produced this brief. Your brief MUST be substantially different — choose a different archetype, different palette direction, and different typography approach. Do not produce a variation of the same design.

${previousBrief}`)
  }

  // Output format section
  sections.push(`---

## Your Output

Write a creative brief with exactly these five sections. Be opinionated and specific — you are a PM writing requirements, not a mood board.

## Mood
[2-4 sentences of atmospheric writing. Set the emotional register for today's design. Fold in any tensions between signals — when signals conflict, name the conflict and instruct the designer to hold it, not resolve it. This replaces both the old "Tension" and the atmospheric parts of palette direction. Write this like an editorial lede, not a list of adjectives.]

## Composition Direction
[Name a specific composition archetype and explain why it fits today. You MUST choose from: Poster, Broadsheet, Gallery Wall, Scroll, Split, Stack, Specimen, Index. You may suggest a hybrid of two archetypes (e.g., "Specimen with Gallery Wall energy") but the primary archetype must be named first. Explain in 1-2 sentences why this archetype matches today's signals. IMPORTANT: Avoid repeating the same archetype within a 3-day window — check recent briefs if available.]

## Typography Direction
[1-2 sentences on type scale, spacing, and character. Should the type be tight or generous? Loud or quiet? Angular or rounded? Should headings whisper or shout? Let the mood and composition choice inform this — a Specimen day demands extreme type scale; a Broadsheet day demands strict hierarchy through size alone.]

## Signal Integration
[Bulleted list specifying HOW each noteworthy signal should manifest in the design. Do not just list signals — describe their treatment. Every bullet must answer "how does this appear?" not just "this exists."

Format:
- [signal name] → [specific treatment: what form it takes, where it lives, what tone it carries]

Examples of good signal integration:
- Tigers 13-6 win → inline celebration callout, not a card. Triumphant but brief — a scoreline with editorial swagger, tucked near the masthead.
- Waning crescent moon → reduce overall contrast slightly. The page should feel like it's lit by less.
- Radiohead on rotation → angular, precise type spacing. Let letter-spacing run tight.

Only include signals worth commenting on. "Off season" or "no notable news" are not worth a bullet. A win, a loss, an approaching holiday, a resonant quote, notable music — those ARE.

The signal that should be FELT most strongly when someone lands on the site should be listed FIRST and given the most detailed treatment. This is your call as PM — what's the headline of today's design?]

## Palette Direction
[2-3 sentences on color temperature, saturation, and mood — derived from PRIMARY signals (weather, season, daylight). Be more specific than "warm" or "cool" — describe contrast level (high/low), warmth or coolness on a spectrum, and degree of restraint (monochromatic vs. multi-hue). Never prescribe specific hex colors — describe the feeling and boundaries.]

## Creative Weights (set by the site owner)

These weights (0-10 scale) tell you how much influence each input should have on your brief:

- **Signals influence: ${weights.signals ?? 5}/10** — ${(weights.signals ?? 5) >= 7 ? 'Signals should be the PRIMARY creative driver. Let weather, sports, and holidays shape the mood, palette, and composition heavily.' : (weights.signals ?? 5) <= 3 ? 'Signals should be minimal background texture. Don\'t let weather or sports drive major design decisions.' : 'Signals play a moderate role — they influence palette and mood but don\'t dominate.'}
- **Design inspiration: ${weights.inspiration ?? 5}/10** — ${(weights.inspiration ?? 5) >= 7 ? 'The Awwwards design references should be the PRIMARY creative driver. Study the screenshot carefully and let its compositional approach heavily influence your archetype choice and layout direction.' : (weights.inspiration ?? 5) <= 3 ? 'Design references are just ambient context. Don\'t try to emulate them.' : 'Design references provide moderate compositional guidance.'}
- **Past ratings: ${weights.ratings ?? 5}/10** — ${(weights.ratings ?? 5) >= 7 ? 'The user\'s past ratings are critical. Study what scored high and low. Repeat what worked, avoid what didn\'t.' : (weights.ratings ?? 5) <= 3 ? 'Past ratings are just background. Focus on today\'s creative direction.' : 'Consider past ratings but don\'t be constrained by them.'}
- **Creative risk: ${weights.risk ?? 5}/10** — ${(weights.risk ?? 5) >= 7 ? 'Push boundaries. Choose unusual archetypes, extreme typography, unexpected compositions. The site owner wants to be surprised.' : (weights.risk ?? 5) <= 3 ? 'Play it safe. Use proven layouts, conventional hierarchy, readable and professional.' : 'Balanced risk — be intentional but not predictable.'}`)

  return sections.join('\n\n')
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

  const weights = {
    signals: parseInt(process.env.WEIGHT_SIGNALS || '5'),
    inspiration: parseInt(process.env.WEIGHT_INSPIRATION || '5'),
    ratings: parseInt(process.env.WEIGHT_RATINGS || '5'),
    risk: parseInt(process.env.WEIGHT_RISK || '5'),
  }
  console.log(`  creative weights: signals=${weights.signals} inspiration=${weights.inspiration} ratings=${weights.ratings} risk=${weights.risk}`)

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

  // Step 1.5: Read previous brief if it exists (for "do not repeat" constraint)
  let previousBrief = null
  const briefPath = path.join(ROOT, 'signals', 'today.brief.md')
  try {
    if (existsSync(briefPath)) {
      previousBrief = await readFile(briefPath, 'utf8')
      console.log(`  previous brief found (${previousBrief.length} chars) — will inject "do not repeat" constraint`)
    }
  } catch {}

  // Step 1.6: Count existing builds today for run diversity
  const archiveDir = path.join(ROOT, 'archive', signals.date || new Date().toISOString().slice(0, 10))
  let runNumber = 1
  try {
    runNumber = readdirSync(archiveDir).filter(d => d.startsWith('build-')).length + 1
  } catch {}
  if (runNumber > 1) {
    console.log(`  run #${runNumber} today — will enforce archetype diversity`)
  }

  // Step 1.7: Fetch Awwwards screenshots if available
  let designReferenceImages = []
  const awwwardsSites = signals?.awwwards?.sites_of_the_day
  if (Array.isArray(awwwardsSites)) {
    const sitesWithScreenshots = awwwardsSites.filter(s => typeof s === 'object' && s.screenshot_url)
    if (sitesWithScreenshots.length > 0) {
      // Limit to 1 screenshot — each is ~300KB (440KB as base64), more would exceed prompt limits
      console.log(`  fetching top Awwwards screenshot...`)
      for (const site of sitesWithScreenshots.slice(0, 1)) {
        try {
          const imgRes = await fetch(site.screenshot_url, {
            signal: AbortSignal.timeout(10000),
          })
          if (imgRes.ok) {
            const buf = Buffer.from(await imgRes.arrayBuffer())
            designReferenceImages.push({
              title: site.title,
              description: site.description,
              base64: buf.toString('base64'),
              contentType: imgRes.headers.get('content-type') || 'image/jpeg',
            })
            console.log(`    ✓ ${site.title} (${(buf.length / 1024).toFixed(0)}KB)`)
          }
        } catch (err) {
          console.warn(`    ✗ ${site.title}: ${err.message}`)
        }
      }
    }
  }

  // Step 2: Build prompt and call Claude
  console.log('\n[2/3] Calling Claude...')
  const prompt = buildInterpretPrompt(signals, weights, {
    previousBrief,
    runNumber,
    designReferenceImages,
  })

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
