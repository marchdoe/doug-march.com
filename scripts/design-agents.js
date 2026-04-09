#!/usr/bin/env node

/**
 * Designer Agent Swarm Orchestrator
 *
 * Dispatches specialized Claude CLI agents sequentially:
 *   Phase 0: Design Director — visual specification
 *   Phase 1: Token Designer  — elements/preset.ts, app/routes/__root.tsx
 *   Phase 2: Unified Designer — all 15 remaining component/route files
 *
 * Each agent gets the creative brief, relevant reference files, and (after
 * Phase 1) the design tokens from preset.ts. Build validation and retry
 * logic ensure the final output compiles.
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { spawnSync } from 'child_process'
import { callClaudeCLI } from './utils/claude-cli.js'
import {
  MUTABLE_FILES,
  TOKEN_FILES,
  STRUCTURE_FILES,
  COMPONENT_FILES,
  readContext,
} from './utils/site-context.js'
import { backup, writeFiles, restore, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'
import { createTrace } from './utils/trace.js'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maps every mutable file to exactly one agent name. */
export const FILE_OWNERSHIP = Object.fromEntries([
  ...TOKEN_FILES.map(f => [f, 'token-designer']),
  ...STRUCTURE_FILES.map(f => [f, 'unified-designer']),
  ...COMPONENT_FILES.map(f => [f, 'unified-designer']),
])

// ---------------------------------------------------------------------------
// Archetype tracking helpers
// ---------------------------------------------------------------------------

/** Canonical archetype names — Gallery Wall before Broadsheet to avoid partial match on "Wall" */
const ARCHETYPE_NAMES = ['Gallery Wall', 'Broadsheet', 'Specimen', 'Poster', 'Scroll', 'Split', 'Stack', 'Index']

/**
 * Extract the chosen archetype from a visual spec or block of text.
 *
 * First tries to match the structured declaration line (e.g., "**Archetype:** The Broadsheet").
 * Falls back to finding the last archetype mention in the text, which avoids
 * false matches from the forbidden-archetype constraint block that appears early.
 *
 * @param {string} text
 * @returns {string|null}
 */
export function extractArchetypeFromText(text) {
  // Strategy 1: Match the structured "**Archetype:**" declaration line
  for (const name of ARCHETYPE_NAMES) {
    const pattern = new RegExp(`\\*\\*Archetype:\\*\\*\\s*(?:The\\s+)?${name.replace(' ', '\\s+')}`, 'i')
    if (pattern.test(text)) return name
  }

  // Strategy 2: Find the last mention of any archetype name in the text.
  // The chosen archetype appears in the spec body; forbidden names appear
  // earlier in the echoed constraint block.
  let latest = null
  for (const name of ARCHETYPE_NAMES) {
    const pattern = new RegExp(`\\b${name.replace(' ', '\\s+')}\\b`, 'gi')
    let m
    while ((m = pattern.exec(text)) !== null) {
      if (!latest || m.index > latest.index) {
        latest = { name, index: m.index }
      }
    }
  }
  return latest?.name ?? null
}

/**
 * Read archetype history from the last N archive date directories.
 * Prefers archetype.txt (written by this pipeline); falls back to parsing brief.md.
 * @param {string} archiveDir
 * @param {string[]} recentDirs - sorted newest-first
 * @returns {Array<{date: string, archetype: string}>}
 */
function buildArchetypeHistory(archiveDir, recentDirs) {
  const history = []
  for (const dir of recentDirs) {
    const archetypeFile = path.join(archiveDir, dir, 'archetype.txt')
    if (existsSync(archetypeFile)) {
      const name = readFileSync(archetypeFile, 'utf8').trim()
      if (name) { history.push({ date: dir, archetype: name }); continue }
    }
    const briefPath = path.join(archiveDir, dir, 'brief.md')
    if (existsSync(briefPath)) {
      const text = readFileSync(briefPath, 'utf8')
      const name = extractArchetypeFromText(text)
      if (name) history.push({ date: dir, archetype: name })
    }
  }
  return history
}

/**
 * Build the hard archetype constraint block to inject into the Design Director prompt.
 * @param {Array<{date: string, archetype: string}>} history
 * @returns {string}
 */
function buildArchetypeConstraintPrompt(history) {
  if (history.length === 0) return ''

  const lines = history.map(h => `  - ${h.date}: ${h.archetype}`).join('\n')
  const last3 = [...new Set(history.slice(0, 3).map(h => h.archetype))]

  let block = `\n\n## Archetype History — MANDATORY CONSTRAINT\n\nRecent archetype usage (newest first):\n${lines}\n\n`

  if (last3.length > 0) {
    block += `**FORBIDDEN TODAY** (used in the last 3 days): **${last3.join(', ')}**\n\n`
    const allowed = ARCHETYPE_NAMES.filter(n => !last3.includes(n))
    block += `You MUST choose from the remaining archetypes: ${allowed.join(', ')}. Choosing a forbidden archetype is an error — the spec will be rejected.`
  }

  return block
}

// ---------------------------------------------------------------------------
// Exported helpers (also used by tests)
// ---------------------------------------------------------------------------

/**
 * Build the user prompt for a given agent.
 *
 * @param {string} agentName
 * @param {{ brief: string, referenceFiles: Array<{path: string, content: string}>, tokenContext: string|null }} ctx
 * @returns {string}
 */
export function buildAgentPrompt(agentName, { brief, referenceFiles, tokenContext }) {
  const sections = []

  // Section 1: Creative Brief
  sections.push(`## Creative Brief\n\n${brief}`)

  // Section 2: Design Tokens (for unified-designer and downstream agents)
  if (tokenContext) {
    sections.push(
      `## Design Tokens (from elements/preset.ts)\n\nUse these token names in your components. Do not invent new tokens — only reference what exists here.\n\n\`\`\`typescript\n${tokenContext}\n\`\`\``
    )
  }

  // Section 3: Reference Files — with explicit anti-anchoring instruction
  if (referenceFiles && referenceFiles.length > 0) {
    const fileBlocks = referenceFiles.map(
      f => `### ${f.path}\n\n\`\`\`typescript\n${f.content}\n\`\`\``
    )
    sections.push(`## Reference Files — Technical Reference ONLY

These are the CURRENT files on disk. They show you the component API, TypeScript interfaces, import paths, and export names you must preserve. Do NOT use these as a design starting point. Your layout, structure, styling, and spatial organization should be entirely new — as if you have never seen these files before. The only thing to preserve is the technical contract (imports, exports, prop interfaces).

${fileBlocks.join('\n\n')}`)
  }

  return sections.join('\n\n')
}

/**
 * Identify which agent's files appear in a build error.
 *
 * @param {string} errorOutput
 * @returns {'token-designer'|'unified-designer'|'both'}
 */
export function identifyFailingAgent(errorOutput) {
  const agents = new Set()

  for (const [filePath, agent] of Object.entries(FILE_OWNERSHIP)) {
    if (errorOutput.includes(filePath)) {
      agents.add(agent)
    }
  }

  if (agents.size === 0) return 'both'
  if (agents.size === 2) return 'both'
  return [...agents][0]
}

// ---------------------------------------------------------------------------
// Internal: callAgent
// ---------------------------------------------------------------------------

/**
 * Spawn a `claude` CLI process for one agent.
 *
 * @param {string} agentName
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {string} [buildError]
 * @param {{ timeoutMs?: number }} [options]
 * @returns {Promise<{ files: Array<{path: string, content: string}>, rationale?: string, design_brief?: string }>}
 */
async function callAgent(agentName, systemPrompt, userPrompt, buildError, options = {}) {
  let fullPrompt = userPrompt

  if (buildError) {
    fullPrompt += `\n\n---\n\nThe previous attempt failed with this build error:\n\n${buildError}\n\nPlease fix the issues and try again.`
  }

  fullPrompt += `\n\n---\n\nIMPORTANT: Use the ===FILE:path=== delimiter format described in your instructions. Write complete file contents after each delimiter. No JSON, no markdown code fences, no explanation — just the delimiters and raw file content.`

  const result = await callClaudeCLI(agentName, systemPrompt, fullPrompt, {
    timeoutMs: options.timeoutMs || 600000, // default 10 minutes
    model: options.model || 'sonnet',
  })

  // Parse response — supports verdict, delimiter, visual spec, and JSON formats
  let parsed

  if (result.includes('===VERDICT===')) {
    // Critic response (spec-critic, screenshot-critic) — extract verdict and feedback
    const verdictMatch = result.match(/===VERDICT===([\s\S]*?)===END===/)
    const verdictBody = verdictMatch ? verdictMatch[1].trim() : result.trim()
    parsed = { files: [], rationale: verdictBody, design_brief: '', _rawResponse: verdictBody }
  } else if (result.includes('===VISUAL_SPEC===')) {
    // Design Director response — the entire content after the delimiter is the spec
    const specMatch = result.match(/===VISUAL_SPEC===([\s\S]*)/)
    const spec = specMatch ? specMatch[1].trim() : result.trim()
    parsed = { files: [], rationale: spec, design_brief: '', _rawResponse: spec }
  } else if (result.includes('===FILE:')) {
    // Delimiter-based format (preferred — avoids JSON escaping issues)
    const files = []
    const filePattern = /===FILE:([^=]+)===([\s\S]*?)(?====FILE:|===RATIONALE===|===DESIGN_BRIEF===|$)/g
    let match
    while ((match = filePattern.exec(result)) !== null) {
      const filePath = match[1].trim()
      const content = match[2].trim()
      if (filePath && content) {
        files.push({ path: filePath, content })
      }
    }

    let rationale = undefined
    const rationaleMatch = result.match(/===RATIONALE===([\s\S]*?)(?====|$)/)
    if (rationaleMatch) rationale = rationaleMatch[1].trim()

    let design_brief = undefined
    const briefMatch = result.match(/===DESIGN_BRIEF===([\s\S]*?)(?====|$)/)
    if (briefMatch) design_brief = briefMatch[1].trim()

    parsed = { files, rationale, design_brief }
  } else {
    // JSON fallback
    try {
      parsed = JSON.parse(result)
    } catch {
      let cleaned = result
        .replace(/```(?:json|JSON)?\s*\n?/g, '')
        .replace(/\n?\s*```\s*$/g, '')
        .trim()
      try {
        parsed = JSON.parse(cleaned)
      } catch {
        const jsonStart = cleaned.indexOf('{')
        const jsonEnd = cleaned.lastIndexOf('}')
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          try {
            parsed = JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1))
          } catch (e3) {
            throw new Error(`[${agentName}] failed to parse response: ${e3.message}\nFirst 300 chars: ${result.slice(0, 300)}`)
          }
        } else {
          throw new Error(`[${agentName}] no parseable response found\nFirst 300 chars: ${result.slice(0, 300)}`)
        }
      }
    }
  }

  // Validate files array (Design Director may have no files — that's OK)
  if (!parsed.files) parsed.files = []
  if (!Array.isArray(parsed.files)) {
    throw new Error(`[${agentName}] response missing files array. Got keys: ${Object.keys(parsed).join(', ')}`)
  }

  console.log(`  [${agentName}] responded with ${parsed.files.length} files${parsed._rawResponse ? ' + visual spec' : ''}`)

  return parsed
}

// ---------------------------------------------------------------------------
// Internal: validateCodegen
// ---------------------------------------------------------------------------

/**
 * Run `pnpm panda codegen` to regenerate styled-system from the new preset.
 * @returns {{ success: boolean, error?: string }}
 */
function validateCodegen() {
  console.log('  running pnpm panda codegen...')
  const result = spawnSync('pnpm', ['panda', 'codegen'], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 60000, // 1 minute
  })

  if (result.status === 0) {
    console.log('  codegen succeeded')
    return { success: true }
  }

  const combined = (result.stderr ?? '') + (result.stdout ?? '')
  const error = combined.slice(-3000)
  console.log('  codegen failed')
  console.log('  --- last 500 chars ---')
  console.log(combined.slice(-500))
  console.log('  ---')
  return { success: false, error }
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------

/**
 * Run the design agent swarm.
 *
 * Phase 0: Design Director — visual specification
 * Phase 1: Token Designer (preset.ts + __root.tsx)
 * Phase 2: Unified Designer — all 15 remaining component/route files
 * Phase 4: Build validation
 * Phase 5: Retry on failure
 *
 * @param {{ signals: object, brief: string, contentSummary: string }} context
 * @returns {Promise<{ rationale: string, design_brief: string, files: Array<{path: string, content: string}> }>}
 */
export async function runAgentSwarm(context, { onTraceStep } = {}) {
  const { signals, brief, contentSummary } = context

  // Read creative weights from environment
  const weights = {
    signals: parseInt(process.env.WEIGHT_SIGNALS || '5'),
    inspiration: parseInt(process.env.WEIGHT_INSPIRATION || '5'),
    ratings: parseInt(process.env.WEIGHT_RATINGS || '5'),
    risk: parseInt(process.env.WEIGHT_RISK || '5'),
  }
  console.log(`  creative weights: signals=${weights.signals} inspiration=${weights.inspiration} ratings=${weights.ratings} risk=${weights.risk}`)

  const trace = createTrace(signals.date || new Date().toISOString().slice(0, 10), {
    onStep: (step) => {
      console.log(`[TRACE] ${JSON.stringify(step)}`)
      onTraceStep?.(step)
    },
  })

  // Track whether archive() succeeded in this run so saveTrace() knows
  // whether to write into the current build dir or create a failed-build dir.
  let archiveRan = false

  async function saveTrace(error) {
    try {
      const archiveDateDir = path.join(ROOT, 'archive', signals.date)

      if (archiveRan) {
        // Success path: find the build dir that archive() just created
        const builds = readdirSync(archiveDateDir, { withFileTypes: true })
          .filter(b => b.isDirectory() && b.name.startsWith('build-') && !b.name.startsWith('build-failed-') && !b.name.startsWith('build-pre-'))
          .sort().reverse()
        if (builds[0]) {
          await writeFile(
            path.join(archiveDateDir, builds[0].name, 'trace.json'),
            trace.toJSON(),
            'utf8'
          )
          console.log(`  trace saved to ${builds[0].name}/trace.json`)
          return
        }
      }

      // Failure path: create a dedicated build-failed-* dir so failure
      // diagnostics are preserved without corrupting prior successful builds
      const failedDir = path.join(archiveDateDir, `build-failed-${Date.now()}`)
      await mkdir(failedDir, { recursive: true })
      await writeFile(path.join(failedDir, 'trace.json'), trace.toJSON(), 'utf8')
      if (error) {
        await writeFile(
          path.join(failedDir, 'error.txt'),
          `${error.message || String(error)}\n\n${error.stack || ''}`,
          'utf8'
        )
      }
      console.log(`  failure trace saved to ${path.basename(failedDir)}/trace.json`)
      // Also emit trace to stdout so it's captured in Actions logs even if
      // the filesystem write fails for some reason.
      console.log(`[TRACE-FINAL] ${trace.toJSON()}`)
    } catch (err) {
      console.warn(`  trace save failed (non-blocking): ${err.message}`)
      // Last-ditch: emit to stdout so logs always have it
      try { console.log(`[TRACE-FINAL] ${trace.toJSON()}`) } catch {}
    }
  }

  let swarmError = null
  try {

  const weightsPrompt = `\n\n## Creative Weights (0-10, set by the site owner)\n\nSignals: ${weights.signals}/10 | Inspiration: ${weights.inspiration}/10 | Ratings: ${weights.ratings}/10 | Risk: ${weights.risk}/10\n\n${weights.risk >= 7 ? 'The owner wants BOLD, EXPERIMENTAL design today. Push boundaries.' : weights.risk <= 3 ? 'The owner wants SAFE, POLISHED design today. Proven patterns.' : ''}${weights.inspiration >= 7 ? '\nDesign references should HEAVILY influence your compositional choices.' : ''}${weights.signals <= 3 ? '\nSignals are background texture only — do NOT let weather or sports drive the design.' : ''}`

  // Read all prompts and libraries
  const promptDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'prompts')
  const [
    directorPromptRaw,
    specCriticPromptRaw,
    screenshotCriticPromptRaw,
    tokenPromptRaw,
    unifiedDesignerPromptRaw,
    designSystemRef, libTypography, libColor, libLayout, libComponents,
  ] = await Promise.all([
    readFile(path.join(promptDir, 'design-director.md'), 'utf8'),
    readFile(path.join(promptDir, 'spec-critic.md'), 'utf8'),
    readFile(path.join(promptDir, 'screenshot-critic.md'), 'utf8'),
    readFile(path.join(promptDir, 'token-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'unified-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'design-system-reference.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-typography.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-color.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-layout.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-components.md'), 'utf8'),
  ])

  const specCriticPrompt = specCriticPromptRaw
  const screenshotCriticPrompt = screenshotCriticPromptRaw

  // Build system prompts with relevant libraries appended
  const directorSystemPrompt = `${directorPromptRaw}\n\n${libTypography}\n\n${libColor}\n\n${libLayout}`
  const tokenSystemPrompt = `${tokenPromptRaw}\n\n${libTypography}\n\n${libColor}`
  const unifiedDesignerSystemPrompt = `${unifiedDesignerPromptRaw}\n\n${designSystemRef}\n\n${libTypography}\n\n${libColor}\n\n${libLayout}\n\n${libComponents}`

  // Backup all mutable files
  console.log('\n[backup] Backing up mutable files...')
  const originalBackup = await backup(MUTABLE_FILES)
  console.log(`  backed up ${originalBackup.size} files`)

  // -----------------------------------------------------------------------
  // Pre-archive: snapshot the CURRENT site before overwriting it
  // Zero LLM cost — just vite preview + HTML capture + file copy
  // -----------------------------------------------------------------------
  const today = signals.date || new Date().toISOString().slice(0, 10)
  const publicArchiveDir = path.join(ROOT, 'public', 'archive', today)
  if (!existsSync(publicArchiveDir)) {
    console.log('\n[pre-archive] Preserving current site before redesign...')
    try {
      const { captureSnapshot } = await import('./utils/snapshot.js')
      // Snapshot into a temp build ID — we just need the site/ output
      const tempBuildId = `pre-${Date.now()}`
      await captureSnapshot(today, tempBuildId)

      // Copy the snapshot to public/archive/ for static serving
      const snapshotSiteDir = path.join(ROOT, 'archive', today, `build-${tempBuildId}`, 'site')
      if (existsSync(snapshotSiteDir)) {
        const { cpSync } = await import('fs')
        await mkdir(publicArchiveDir, { recursive: true })
        cpSync(snapshotSiteDir, publicArchiveDir, { recursive: true })
        console.log(`  preserved to public/archive/${today}/`)
      }

      // Clean up the temp build dir (we only needed the public copy)
      const { rmSync } = await import('fs')
      const tempBuildDir = path.join(ROOT, 'archive', today, `build-${tempBuildId}`)
      rmSync(tempBuildDir, { recursive: true, force: true })
    } catch (err) {
      console.warn(`  pre-archive failed (non-blocking): ${err.message}`)
    }
  } else {
    console.log(`\n[pre-archive] public/archive/${today}/ already exists, skipping`)
  }

  // -----------------------------------------------------------------------
  // Read recent archive briefs for Design Director context
  // -----------------------------------------------------------------------
  const archiveDir = path.join(ROOT, 'archive')
  let recentBriefs = ''
  let archetypeConstraintPrompt = ''
  try {
    const dirs = readdirSync(archiveDir)
      .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort().reverse().slice(0, 7)
    const recentDirs5 = dirs.slice(0, 5)
    for (const dir of recentDirs5) {
      const briefPath = path.join(archiveDir, dir, 'brief.md')
      if (existsSync(briefPath)) {
        recentBriefs += `\n### ${dir}\n${readFileSync(briefPath, 'utf8')}\n`
      }
    }
    const archetypeHistory = buildArchetypeHistory(archiveDir, dirs)
    archetypeConstraintPrompt = buildArchetypeConstraintPrompt(archetypeHistory)
    if (archetypeHistory.length > 0) {
      console.log(`  archetype history: ${archetypeHistory.map(h => `${h.date}=${h.archetype}`).join(', ')}`)
    }
  } catch {}

  // -----------------------------------------------------------------------
  // Read recent ratings for taste feedback
  // -----------------------------------------------------------------------
  let recentRatings = ''
  try {
    const ratingDirs = readdirSync(archiveDir)
      .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, 10)
    for (const dir of ratingDirs) {
      const dirPath = path.join(archiveDir, dir)
      const briefPath = path.join(dirPath, 'brief.md')
      const briefLine = existsSync(briefPath)
        ? readFileSync(briefPath, 'utf8').match(/\*\*Design Brief:\*\*\s*(.+)/)?.[1] || ''
        : ''

      // Collect all ratings for this date (legacy + per-build)
      const allRatings = []

      // Legacy single rating.json
      const legacyPath = path.join(dirPath, 'rating.json')
      if (existsSync(legacyPath)) {
        try {
          const legacy = JSON.parse(readFileSync(legacyPath, 'utf8'))
          allRatings.push({ ...legacy, timestamp: legacy.timestamp || 0 })
        } catch {}
      }

      // Per-build rating-{timestamp}.json files
      const ratingFiles = readdirSync(dirPath)
        .filter(f => f.startsWith('rating-') && f.endsWith('.json'))
        .sort()
      for (const file of ratingFiles) {
        try {
          allRatings.push(JSON.parse(readFileSync(path.join(dirPath, file), 'utf8')))
        } catch {}
      }

      for (const rating of allRatings) {
        const ts = rating.timestamp ? new Date(rating.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''
        const buildLabel = ts ? ` (build ${ts})` : ''
        recentRatings += `\n### ${dir}${buildLabel} — "${briefLine}"\n`
        recentRatings += `Scores: hierarchy=${rating.ratings?.hierarchy || '?'}/5, typography=${rating.ratings?.typography || '?'}/5, composition=${rating.ratings?.composition || '?'}/5, signals=${rating.ratings?.signalIntegration || '?'}/5, polish=${rating.ratings?.polish || '?'}/5\n`
        if (rating.notes) recentRatings += `Notes: "${rating.notes}"\n`
      }
    }
  } catch {}

  // -----------------------------------------------------------------------
  // Read design references (collected by collect-references.js)
  // -----------------------------------------------------------------------
  const referencesPath = path.resolve(ROOT, 'signals/today.references.md')
  let references = ''
  if (existsSync(referencesPath)) {
    references = await readFile(referencesPath, 'utf8')
    console.log(`  using references (${references.length} chars)`)
  }

  // Trace: record signals and brief loaded
  trace.addStep({
    name: 'signals-loaded',
    phase: 0,
    input: { providersAvailable: Object.keys(signals).length },
    output: signals,
    durationMs: 0,
  })
  if (brief) {
    trace.addStep({
      name: 'brief-loaded',
      phase: 0,
      input: {},
      output: { brief: brief.slice(0, 500), charCount: brief.length },
      durationMs: 0,
    })
  }

  // -----------------------------------------------------------------------
  // Phase 0: Design Director — produces a visual specification
  // -----------------------------------------------------------------------
  console.log('\n[phase-0] Design Director')

  const directorUserPrompt = buildAgentPrompt('design-director', {
    brief,
    referenceFiles: [],
    tokenContext: null,
  }) + archetypeConstraintPrompt
    + (recentBriefs ? '\n\n## Recent Archive Briefs\n' + recentBriefs : '')
    + (references ? '\n\n## Design References\n\n' + references : '')
    + (recentRatings ? '\n\n## User Design Ratings (learn from these)\n\nThe site owner rates each design after it ships. Higher scores = what they want to see more of. Notes explain what specifically worked or didn\'t.\n' + recentRatings : '')
    + weightsPrompt

  let visualSpec = ''
  let chosenArchetype = null
  try {
    const t0Director = Date.now()
    const directorResult = await callAgent('design-director', directorSystemPrompt, directorUserPrompt)
    visualSpec = directorResult._rawResponse || directorResult.rationale || ''
    chosenArchetype = extractArchetypeFromText(visualSpec)
    console.log(`  visual spec: ${(visualSpec.length / 1024).toFixed(0)}KB${chosenArchetype ? ` | archetype: ${chosenArchetype}` : ''}`)
    trace.addStep({
      name: 'design-director',
      phase: 1,
      input: { archetypeConstraints: archetypeConstraintPrompt.slice(0, 500) },
      output: {
        archetype: chosenArchetype || 'unknown',
        specLength: visualSpec.length,
        specPreview: visualSpec.slice(0, 500),
      },
      durationMs: Date.now() - t0Director,
    })
  } catch (err) {
    console.warn(`  Design Director failed (non-blocking): ${err.message}`)
    console.warn('  Proceeding without visual spec — agents will use brief directly')
  }

  // -----------------------------------------------------------------------
  // Spec Critic Gate — reviews visual spec for ambition and range
  // -----------------------------------------------------------------------
  try {
    console.log('\n[spec-critic] Reviewing visual spec...')
    const criticUserPrompt = [
      '## Structured Brief\n\n' + brief,
      archetypeConstraintPrompt ? '## Archetype Constraints\n' + archetypeConstraintPrompt : '',
      '## Visual Specification\n\n' + visualSpec,
      recentBriefs ? '## Recent Archive Briefs\n' + recentBriefs : '',
    ].filter(Boolean).join('\n\n---\n\n')

    const t0Critic = Date.now()
    const criticResult = await callAgent('spec-critic', specCriticPrompt, criticUserPrompt, null, { model: 'haiku' })
    const rawResponse = criticResult._rawResponse || criticResult.rationale || ''

    trace.addStep({
      name: 'spec-critic',
      phase: 1,
      input: { specLength: visualSpec.length },
      output: {
        verdict: rawResponse.includes('REVISE') ? 'REVISE' : 'APPROVED',
        feedback: rawResponse.slice(0, 500),
      },
      durationMs: Date.now() - t0Critic,
    })

    if (rawResponse.includes('REVISE')) {
      const feedback = rawResponse.replace(/===VERDICT===/, '').replace(/===END===/, '').replace('REVISE', '').trim()
      console.log(`  [spec-critic] REVISE: ${feedback.slice(0, 200)}...`)
      console.log('\n[spec-critic] Design Director revising...')

      // Re-run Design Director with critic feedback
      const revisionPrompt = directorUserPrompt + '\n\n---\n\n## Critic Feedback (revise your spec)\n\n' + feedback
      try {
        const revisedResult = await callAgent('design-director', directorSystemPrompt, revisionPrompt)
        visualSpec = revisedResult._rawResponse || revisedResult.rationale || visualSpec
        console.log(`  [spec-critic] Revision complete. visual spec: ${(visualSpec.length / 1024).toFixed(0)}KB`)
      } catch (err) {
        console.warn(`  [spec-critic] Director revision failed (non-blocking): ${err.message}`)
      }
    } else {
      console.log('  [spec-critic] APPROVED')
    }
  } catch (err) {
    console.warn(`  [spec-critic] Critic failed (non-blocking): ${err.message}`)
    console.warn('  Proceeding without spec review')
  }

  // -----------------------------------------------------------------------
  // Phase 1: Token Designer — uses visual spec if available
  // -----------------------------------------------------------------------
  console.log('\n[phase-1] Token Designer')

  const tokenBrief = visualSpec
    ? `## Visual Specification (from Design Director)\n\n${visualSpec}\n\n---\n\n## Original Creative Brief\n\n${brief}`
    : brief

  const tokenUserPrompt = buildAgentPrompt('token-designer', {
    brief: tokenBrief,
    referenceFiles: [],
    tokenContext: null,
  })

  let tokenResult
  const t0Token = Date.now()
  try {
    tokenResult = await callAgent('token-designer', tokenSystemPrompt, tokenUserPrompt, null, { model: 'haiku' })
  } catch (err) {
    console.error(`  Token Designer failed: ${err.message}`)
    await restore(originalBackup)
    throw new Error(`Token Designer failed: ${err.message}`)
  }

  // Verify expected files
  const hasPreset = tokenResult.files.some(f => f.path === 'elements/preset.ts')
  const hasRoot = tokenResult.files.some(f => f.path === 'app/routes/__root.tsx')
  if (!hasPreset || !hasRoot) {
    await restore(originalBackup)
    throw new Error(`Token Designer missing required files. Got: ${tokenResult.files.map(f => f.path).join(', ')}`)
  }

  // Write token files
  await writeFiles(tokenResult.files)

  // Post-write fixup: ensure __root.tsx has critical imports for SPA hydration.
  // The token designer frequently drops ScrollRestoration and Scripts imports,
  // or defines fake local versions (return null). Both break client-side hydration.
  try {
    const rootPath = path.join(ROOT, 'app/routes/__root.tsx')
    let rootContent = await readFile(rootPath, 'utf8')
    let fixed = false

    // Step 1: Check if ScrollRestoration/Scripts are in the @tanstack/react-router import line
    const routerImportMatch = rootContent.match(/import\s*\{([^}]+)\}\s*from\s*['"]@tanstack\/react-router['"]/)
    const routerImports = routerImportMatch ? routerImportMatch[1] : ''
    const requiredImports = ['ScrollRestoration', 'Scripts']
    const missingFromImport = requiredImports.filter(name => !routerImports.includes(name))

    if (missingFromImport.length > 0) {
      // Add missing to the import line
      rootContent = rootContent.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]@tanstack\/react-router['"]/,
        (match, imports) => {
          const existing = imports.split(',').map(s => s.trim())
          const merged = [...new Set([...existing, ...missingFromImport])]
          return `import { ${merged.join(', ')} } from '@tanstack/react-router'`
        }
      )
      fixed = true
    }

    // Step 2: Remove fake local definitions (function ScrollRestoration/Scripts that return null)
    rootContent = rootContent.replace(/\nfunction ScrollRestoration\(\)\s*\{[\s\S]*?return\s+null[\s\S]*?\}\n?/g, '\n')
    rootContent = rootContent.replace(/\nfunction Scripts\(\)\s*\{[\s\S]*?return\s+null[\s\S]*?\}\n?/g, '\n')

    // Step 3: Ensure ScrollRestoration and Scripts are in the JSX body
    if (!rootContent.includes('<ScrollRestoration')) {
      const inserted = rootContent
        .replace(/(\{children\})([\s\S]*?)(<\/body>)/, '$1\n        <ScrollRestoration />\n        <Scripts />$2$3')
      if (inserted !== rootContent) {
        rootContent = inserted
      } else {
        rootContent = rootContent
          .replace(/(\{children\}<\/Layout>)([\s\S]*?)(\s*<\/>)/, '$1\n    <ScrollRestoration />\n    <Scripts />$2$3')
          .replace(/(<\/Layout>)([\s\S]*?)(\s*<\/>)/, '$1\n    <ScrollRestoration />\n    <Scripts />$2$3')
      }
      fixed = true
    }

    if (fixed) {
      await writeFile(rootPath, rootContent, 'utf8')
      console.log(`  [fixup] fixed __root.tsx: ensured ScrollRestoration/Scripts are imported from @tanstack/react-router`)
    }
  } catch (err) {
    console.warn(`  [fixup] __root.tsx fixup failed (non-blocking): ${err.message}`)
  }

  trace.addStep({
    name: 'token-designer',
    phase: 2,
    input: { briefLength: tokenBrief.length },
    output: {
      files: tokenResult.files.map(f => f.path),
      rationale: (tokenResult.rationale || '').slice(0, 500),
    },
    durationMs: Date.now() - t0Token,
  })

  // Run codegen to regenerate styled-system
  const codegenResult = validateCodegen()
  if (!codegenResult.success) {
    console.log('  codegen failed — retrying Token Designer with error context...')
    // Restore token files before retry
    const tokenBackup = new Map()
    for (const [k, v] of originalBackup.entries()) {
      if (TOKEN_FILES.includes(k)) tokenBackup.set(k, v)
    }
    await restore(tokenBackup)

    try {
      tokenResult = await callAgent('token-designer', tokenSystemPrompt, tokenUserPrompt, codegenResult.error, { model: 'haiku' })
    } catch (err) {
      await restore(originalBackup)
      throw new Error(`Token Designer retry failed: ${err.message}`)
    }

    await writeFiles(tokenResult.files)

    const retryCodegen = validateCodegen()
    if (!retryCodegen.success) {
      await restore(originalBackup)
      throw new Error(`Token Designer codegen failed after retry: ${retryCodegen.error?.slice(0, 500)}`)
    }
  }

  // -----------------------------------------------------------------------
  // Phase 2: Unified Designer (reads tokens from disk, writes all 15 files)
  // -----------------------------------------------------------------------
  const presetPath = path.join(ROOT, 'elements/preset.ts')
  const tokenContext = await readFile(presetPath, 'utf8')

  console.log('\n[phase-2] Unified Designer')

  const enrichedBrief = visualSpec
    ? `## Visual Specification (from Design Director)\n\n${visualSpec}\n\n---\n\n## Original Creative Brief\n\n${brief}`
    : brief

  const designerUserPrompt = buildAgentPrompt('unified-designer', {
    brief: enrichedBrief,
    referenceFiles: [],
    tokenContext,
  }) + (recentRatings ? '\n\n## User Design Ratings (learn from these)\n\nThe site owner rates each design after it ships. Higher scores = what they want to see more of. Notes explain what specifically worked or didn\'t.\n' + recentRatings : '')
    + weightsPrompt

  let designerResult
  const t0Designer = Date.now()
  try {
    designerResult = await callAgent('unified-designer', unifiedDesignerSystemPrompt, designerUserPrompt, null, { timeoutMs: 1800000 }) // 30 minutes — writes 15 files
  } catch (err) {
    console.error(`  Unified Designer failed: ${err.message}`)
    await restore(originalBackup)
    throw new Error(`Unified Designer failed: ${err.message}`)
  }

  // Write all files
  await writeFiles(designerResult.files)

  trace.addStep({
    name: 'unified-designer',
    phase: 3,
    input: { tokenContext: tokenContext.length, briefLength: enrichedBrief.length },
    output: {
      files: designerResult.files.map(f => f.path),
      rationale: (designerResult.rationale || '').slice(0, 500),
    },
    durationMs: Date.now() - t0Designer,
  })

  // Verify Layout.tsx was written (critical for the site to function)
  const layoutPath = path.join(ROOT, 'app/components/Layout.tsx')
  if (!existsSync(layoutPath)) {
    await restore(originalBackup)
    throw new Error('Unified Designer did not produce Layout.tsx — site cannot function without it')
  }

  // -----------------------------------------------------------------------
  // Phase 4: Build validation
  // -----------------------------------------------------------------------
  console.log('\n[phase-4] Build validation')
  const buildResult = validateBuild()

  trace.addStep({
    name: 'build-validation',
    phase: 4,
    input: {},
    output: {
      success: buildResult.success,
      error: buildResult.success ? undefined : (buildResult.error || '').slice(0, 500),
    },
    durationMs: 0,
  })

  if (buildResult.success) {
    console.log('\n=== Build passed! ===')

    // -----------------------------------------------------------------
    // Screenshot Critic Gate
    // -----------------------------------------------------------------
    try {
      console.log('\n[screenshot-critic] Capturing screenshot...')
      const { captureScreenshot } = await import('./utils/snapshot.js')
      const screenshotBuffer = await captureScreenshot()
      console.log(`  screenshot captured (${(screenshotBuffer.length / 1024).toFixed(0)}KB)`)

      console.log('[screenshot-critic] Evaluating design...')
      const criticUserPrompt = [
        '## Structured Brief\n\n' + brief,
        '## Visual Specification\n\n' + visualSpec,
        references ? '## Design References\n\n' + references : '',
        '\n\nA screenshot of the rendered homepage is attached as a base64 PNG image below.\n\n' +
        '![Homepage Screenshot](data:image/png;base64,' + screenshotBuffer.toString('base64') + ')',
      ].filter(Boolean).join('\n\n---\n\n')

      const t0ScreenshotCritic = Date.now()
      const screenshotCriticResult = await callAgent('screenshot-critic', screenshotCriticPrompt, criticUserPrompt)
      const criticResponse = screenshotCriticResult._rawResponse || screenshotCriticResult.rationale || ''

      trace.addStep({
        name: 'screenshot-critic',
        phase: 4,
        input: {},
        output: {
          verdict: criticResponse.includes('REVISE') ? 'REVISE' : 'SHIP',
          feedback: criticResponse.slice(0, 500),
        },
        durationMs: Date.now() - t0ScreenshotCritic,
      })

      if (criticResponse.includes('REVISE')) {
        const agentMatch = criticResponse.match(/\*\*Responsible agent:\*\*\s*([\w-]+)/)
        const responsibleAgent = agentMatch?.[1] || 'unified-designer'
        const feedback = criticResponse.replace(/===VERDICT===/, '').replace(/===END===/, '').replace('REVISE', '').trim()

        console.log(`  [screenshot-critic] REVISE — responsible: ${responsibleAgent}`)
        console.log(`  feedback: ${feedback.slice(0, 200)}...`)

        const agentConfig = {
          'token-designer': { prompt: tokenSystemPrompt, user: () => buildAgentPrompt('token-designer', { brief: tokenBrief, referenceFiles: [], tokenContext: null }) },
          'unified-designer': { prompt: unifiedDesignerSystemPrompt, user: () => buildAgentPrompt('unified-designer', { brief: enrichedBrief, referenceFiles: [], tokenContext }) },
        }

        const config = agentConfig[responsibleAgent]
        if (config) {
          console.log(`  retrying ${responsibleAgent} with critic feedback...`)
          try {
            const retryResult = await callAgent(responsibleAgent, config.prompt, config.user(), feedback)
            await writeFiles(retryResult.files)

            const retryBuild = validateBuild()
            if (!retryBuild.success) {
              console.warn('  post-critic revision broke the build — restoring pre-revision files')
              const filesToRestore = new Map()
              for (const [filePath, content] of originalBackup.entries()) {
                const owner = FILE_OWNERSHIP[filePath]
                if (owner === responsibleAgent) {
                  filesToRestore.set(filePath, content)
                }
              }
              await restore(filesToRestore)
              if (responsibleAgent === 'token-designer') validateCodegen()
            } else {
              console.log('  post-critic revision build passed')
            }
          } catch (err) {
            console.warn(`  ${responsibleAgent} revision failed (non-blocking): ${err.message}`)
          }
        }
      } else {
        console.log('  [screenshot-critic] SHIP')
      }
    } catch (err) {
      console.warn(`  [screenshot-critic] Failed (non-blocking): ${err.message}`)
      console.warn('  Shipping without screenshot review')
    }

    const allFiles = [
      ...tokenResult.files,
      ...designerResult.files,
    ]
    const changedPaths = allFiles.map(f => f.path)

    const rationale = tokenResult.rationale || 'Agent swarm redesign'
    const designBrief = tokenResult.design_brief || 'Multi-agent redesign'

    await archive(signals.date, signals, rationale, designBrief, changedPaths)
    archiveRan = true

    // Save archetype for future anti-repetition enforcement
    if (chosenArchetype && signals.date) {
      try {
        const datePath = path.join(ROOT, 'archive', signals.date)
        await mkdir(datePath, { recursive: true })
        await writeFile(path.join(datePath, 'archetype.txt'), chosenArchetype, 'utf8')
        console.log(`  [archetype] saved: ${chosenArchetype}`)
      } catch {}
    }

    return { rationale, design_brief: designBrief, files: allFiles }
  }

  // -----------------------------------------------------------------------
  // Phase 5: Build failed — identify failing agent and retry
  // -----------------------------------------------------------------------
  console.log('\n[phase-5] Build failed — retrying failing agent(s)')

  const failingAgent = identifyFailingAgent(buildResult.error)
  console.log(`  identified failing agent: ${failingAgent}`)

  // Restore only the failing agent's files
  const filesToRestore = new Map()
  for (const [filePath, content] of originalBackup.entries()) {
    const owner = FILE_OWNERSHIP[filePath]
    if (failingAgent === 'both' || owner === failingAgent) {
      filesToRestore.set(filePath, content)
    }
  }
  await restore(filesToRestore)

  // Build agent lookup for retry
  const agentConfig = {
    'token-designer': { prompt: tokenSystemPrompt, user: () => buildAgentPrompt('token-designer', { brief: tokenBrief, referenceFiles: [], tokenContext: null }) },
    'unified-designer': { prompt: unifiedDesignerSystemPrompt, user: () => buildAgentPrompt('unified-designer', { brief: enrichedBrief, referenceFiles: [], tokenContext }) },
  }

  const retryAgents = failingAgent === 'both'
    ? ['unified-designer']
    : [failingAgent]

  for (const agent of retryAgents) {
    const config = agentConfig[agent]
    if (!config) continue

    console.log(`\n  retrying ${agent} with build error context...`)
    try {
      const retryResult = await callAgent(agent, config.prompt, config.user(), buildResult.error)
      await writeFiles(retryResult.files)
      // Update the result so the archive records the retry output, not stale originals
      if (agent === 'token-designer') tokenResult = retryResult
      if (agent === 'unified-designer') designerResult = retryResult
    } catch (err) {
      console.error(`  ${agent} retry failed: ${err.message}`)
    }
  }

  // Re-validate
  const retryBuild = validateBuild()
  if (retryBuild.success) {
    console.log('\n=== Retry build passed! ===')

    const allFiles = [
      ...tokenResult.files,
      ...designerResult.files,
    ]
    const changedPaths = allFiles.map(f => f.path)

    const rationale = tokenResult.rationale || 'Agent swarm redesign (retry)'
    const designBrief = tokenResult.design_brief || 'Multi-agent redesign (retry)'

    await archive(signals.date, signals, rationale, designBrief, changedPaths)
    archiveRan = true

    // Save archetype for future anti-repetition enforcement
    if (chosenArchetype && signals.date) {
      try {
        const datePath = path.join(ROOT, 'archive', signals.date)
        await mkdir(datePath, { recursive: true })
        await writeFile(path.join(datePath, 'archetype.txt'), chosenArchetype, 'utf8')
        console.log(`  [archetype] saved: ${chosenArchetype}`)
      } catch {}
    }

    return { rationale, design_brief: designBrief, files: allFiles }
  }

  // All retries exhausted — restore everything and throw
  await restore(originalBackup)
  throw new Error(`Build failed after retry. Error:\n${retryBuild.error?.slice(0, 1000)}`)

  } catch (err) {
    swarmError = err
    throw err
  } finally {
    await saveTrace(swarmError)
  }
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  ;(async () => {
    console.log('\n=== Designer Agent Swarm ===\n')

    const context = await readContext()

    // Read interpreted brief
    const briefPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../signals/today.brief.md'
    )
    if (existsSync(briefPath)) {
      context.brief = await readFile(briefPath, 'utf8')
      console.log(`  using brief (${context.brief.length} chars)`)
    } else {
      console.error('Error: signals/today.brief.md not found. Run the PM agent first.')
      process.exit(1)
    }

    try {
      const result = await runAgentSwarm(context)
      console.log(`\nDone. ${result.files.length} files written.`)
      console.log(`Brief: ${result.design_brief}`)
    } catch (err) {
      console.error(`\nFatal: ${err.message}`)
      process.exit(1)
    }
  })()
}
