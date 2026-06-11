#!/usr/bin/env node

/**
 * Designer Agent Swarm Orchestrator
 *
 * Dispatches specialized Claude CLI agents sequentially:
 *   Phase 0: Design Director — visual specification
 *   Phase 1: Token Designer  — elements/preset.ts (orchestrator generates
 *                                __root.tsx + chassis-preset.ts deterministically
 *                                from the Director-chosen typography chassis)
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
import { backup, writeFiles, restore, cleanupOrphans, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'
import { createTrace } from './utils/trace.js'
import { buildMessages } from './utils/prompt-builder.js'
import { selectSeed } from './utils/select-seed.js'
import { CHASSIS_CATALOG } from '../elements/chassis/index.js'
import {
  buildGoogleFontsUrl,
  renderRootTemplate,
  renderChassisPresetFile,
  getChassisById,
  formatChassisCatalogForPrompt,
} from './utils/chassis.js'
import { parseDelimiterResponse } from './utils/delimiter-parser.js'
import { runArtDirector } from './agents/art-director.js'
export { parseDelimiterResponse }

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maps every mutable file owned by an LLM agent to that agent name.
 *  Token-designer ownership was removed in the Art Director pipeline —
 *  preset.ts is now written by the Art Director. The Art Director's
 *  files are not retried via this map; retries go through the
 *  Unified Designer (which is the only agent whose files can fail
 *  build validation in the new pipeline — preset.ts is validated by
 *  codegen at write time).
 */
export const FILE_OWNERSHIP = Object.fromEntries([
  ['elements/preset.ts', 'art-director'],
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
 * Extract the Director-chosen typography chassis from its response.
 *
 * Looks for a `===CHASSIS_ID===` delimiter block and matches the next
 * meaningful token against the catalog. Tolerates: surrounding whitespace,
 * backtick-quoted ids, and trailing punctuation. If the explicit block is
 * missing (Director ignored format), falls back to scanning the whole
 * spec for any catalog id appearing as a backtick-quoted code span.
 *
 * Returns the matching ChassisEntry or null. Caller falls back to
 * CHASSIS_CATALOG[0] on null.
 */
export function resolveChassisFromDirectorOutput(text, catalog) {
  if (!text) return null

  const blockMatch = text.match(/===CHASSIS_ID===\s*\n?\s*`?([a-z0-9-]+)`?/i)
  if (blockMatch) {
    const id = blockMatch[1].trim().toLowerCase()
    const hit = catalog.find(c => c.id === id)
    if (hit) return hit
  }

  // Fallback: scan for any catalog id mentioned in backticks anywhere.
  for (const c of catalog) {
    const re = new RegExp('`\\s*' + c.id.replace(/-/g, '\\-') + '\\s*`', 'i')
    if (re.test(text)) return c
  }

  return null
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
 * Build the archetype-history advisory block to inject into the Design Director prompt.
 *
 * Variance is informational, not a hard constraint. iter-1 (2026-04-28) showed
 * the failure mode of hard rules: the brief called for Poster but the 3-day
 * lockout forbade it, so the Director picked Scroll — variance over fit. The
 * brief's hero "full-bleed moon" intent suffered. Soft guidance lets fit win
 * when the signals genuinely demand a recently-used archetype, while still
 * nudging toward diversity when two archetypes fit equally well.
 *
 * @param {Array<{date: string, archetype: string}>} history
 * @returns {{ block: string, forbidden: string[], allowed: string[] }}
 */
function buildArchetypeConstraintPrompt(history) {
  if (history.length === 0) return { block: '', forbidden: [], allowed: [...ARCHETYPE_NAMES] }

  const lines = history.map(h => `  - ${h.date}: ${h.archetype}`).join('\n')
  const last3 = [...new Set(history.slice(0, 3).map(h => h.archetype))]

  let block = `\n\n## Archetype History — informational\n\nRecent archetype usage (newest first):\n${lines}\n\n`

  if (last3.length > 0) {
    block += `**Recently used** (last 3 days): ${last3.join(', ')}\n\n`
    block += `Variance is informational, not a constraint. Choose what FITS today's brief and signals best.\n\n`
    block += `- If two archetypes fit equally well, prefer the one NOT in the recent list.\n`
    block += `- If the brief or signals genuinely call for a recently-used archetype, use it. Don't pick a worse-fitting archetype just to avoid repetition.\n`
    block += `- If you do pick a recently-used archetype, the visual spec should make the execution materially different from the prior run (different palette commitment, different chassis register, different content emphasis).`
  }

  // `forbidden` retained for trace logging only — no longer enforced.
  return { block, forbidden: last3, allowed: [...ARCHETYPE_NAMES] }
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

/**
 * Build an archetype-specific constraint block for injection into the Unified Designer prompt.
 *
 * For Specimen and Poster archetypes, returns a block that explicitly forbids
 * rendering project cards or portfolio sections on the home page — only the
 * hero phrase and navigation should appear.
 *
 * For all other archetypes, returns an empty string (no constraint).
 *
 * @param {string|null|undefined} archetype
 * @returns {string}
 */
export function buildArchetypeContractBlock(archetype) {
  if (archetype === 'Specimen' || archetype === 'Poster') {
    return `⚠ ARCHETYPE CONTRACT — ${archetype.toUpperCase()}:
Home page = hero phrase + navigation ONLY.
Do NOT render project cards, featured project, experiments, or any portfolio section.
index.tsx is a single-composition canvas today, not a portfolio hub.`
  }
  return ''
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
    stallTimeoutMs: options.stallTimeoutMs, // undefined → claude-cli.js default (15 min)
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
  } else if (result.match(/^===FILE:/m)) {
    parsed = parseDelimiterResponse(result)
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
 * Phase 0: Design Director — visual specification + typography chassis pick
 * Phase 1: Token Designer (preset.ts colors/spacing/semantics; orchestrator
 *          deterministically generates __root.tsx + chassis-preset.ts)
 * Phase 2: Unified Designer — all 15 remaining component/route files
 * Phase 4: Build validation
 * Phase 5: Retry on failure
 *
 * @param {{ signals: object, brief: string, contentSummary: string }} context
 * @returns {Promise<{ rationale: string, design_brief: string, files: Array<{path: string, content: string}> }>}
 */
export async function runAgentSwarm(context, { onTraceStep } = {}) {
  const { signals, brief, contentSummary, currentFiles = [] } = context

  // Read creative weights from environment
  const weights = {
    signals: parseInt(process.env.WEIGHT_SIGNALS || '5'),
    inspiration: parseInt(process.env.WEIGHT_INSPIRATION || '5'),
    ratings: parseInt(process.env.WEIGHT_RATINGS || '5'),
    risk: parseInt(process.env.WEIGHT_RISK || '8'),
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
  // Track every path written during the swarm so we can clean up orphan
  // files (paths the AI invented beyond MUTABLE_FILES) on any failure.
  // restore(originalBackup) only reverts paths in the backup; files created
  // by the AI outside that set would leak without this tracking.
  const writtenPaths = new Set()
  // Critic verdicts collected across the run; persisted as verdicts.json
  const verdicts = []
  // Final-render screenshot captured by the screenshot critic; persisted
  // as screenshot.png (also becomes public/archive/{date}.png and the
  // calibration source for future runs).
  let finalScreenshot = null
  try {

  const weightsPrompt = `\n\n## Creative Weights (0-10, set by the site owner)\n\nSignals: ${weights.signals}/10 | Inspiration: ${weights.inspiration}/10 | Ratings: ${weights.ratings}/10 | Risk: ${weights.risk}/10\n\n${weights.risk >= 7 ? 'The owner wants BOLD, EXPERIMENTAL design today. Push boundaries.' : weights.risk <= 3 ? 'The owner wants SAFE, POLISHED design today. Proven patterns.' : ''}${weights.inspiration >= 7 ? '\nDesign references should HEAVILY influence your compositional choices.' : ''}${weights.signals <= 3 ? '\nSignals are background texture only — do NOT let weather or sports drive the design.' : ''}`

  // Read all prompts and design references.
  // Design references are vendored from pbakaus/impeccable (Apache 2.0) — see
  // scripts/prompts/impeccable/README.md. They replace the previous library-*.md
  // files which authored generic guidance; impeccable provides anti-pattern-aware,
  // OKLCH-native, register-aware design knowledge tuned to fight AI design slop.
  const promptDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'prompts')
  const refDir = path.join(promptDir, 'impeccable', 'reference')
  const [
    specCriticPromptRaw,
    screenshotCriticPromptRaw,
    designSystemRef,
    refBrand,
    refTypography,
    refColor,
    refSpatial,
    refResponsive,
    refInteraction,
    refCritique,
  ] = await Promise.all([
    readFile(path.join(promptDir, 'spec-critic.md'), 'utf8'),
    readFile(path.join(promptDir, 'screenshot-critic.md'), 'utf8'),
    readFile(path.join(promptDir, 'design-system-reference.md'), 'utf8'),
    readFile(path.join(refDir, 'brand.md'), 'utf8'),
    readFile(path.join(refDir, 'typography.md'), 'utf8'),
    readFile(path.join(refDir, 'color-and-contrast.md'), 'utf8'),
    readFile(path.join(refDir, 'spatial-design.md'), 'utf8'),
    readFile(path.join(refDir, 'responsive-design.md'), 'utf8'),
    readFile(path.join(refDir, 'interaction-design.md'), 'utf8'),
    readFile(path.join(refDir, 'critique.md'), 'utf8'),
  ])

  // Brand-register declaration. doug-march.com is BRAND register — a personal
  // portfolio where design IS the product. Inject this into every design agent
  // so they apply brand-register conventions (expressive composition, committed
  // color strategy, typographic risk) rather than product-register reflexes
  // (dense dashboards, restrained palette, generic card grids).
  const brandRegisterDeclaration = `\n\n## Project Register: BRAND\n\nThis project is BRAND register — a personal portfolio where design IS the product. Apply brand-register conventions throughout. The detailed brand-register reference follows.\n\n${refBrand}`

  const specCriticPrompt = `${specCriticPromptRaw}\n\n## Design Critique Heuristics\n\n${refCritique}`
  const screenshotCriticPrompt = `${screenshotCriticPromptRaw}\n\n## Design Critique Heuristics\n\n${refCritique}`

  // Build system prompts with relevant references appended.
  // unified-designer base prompt is loaded through buildMessages (single source
  // of truth shared with local-dev path in scripts/generate-redesign.js).
  const { system: unifiedDesignerBasePrompt } = buildMessages({
    signals,
    brief: '',
    contentSummary: '',
    currentFiles: [],
  })
  // unified-designer writes the actual React/Panda implementation. Gets the
  // typography/color/spatial/responsive design knowledge stack plus brand.
  // interaction-design.md was previously loaded here but dropped after
  // iter-2 (2026-04-28) produced a meta-response failure with ~60KB
  // assembled system prompt — the portfolio is type-and-image driven,
  // not form-driven, so interaction patterns earn their absence. Re-add
  // when forms/focus-state UX surfaces become a genuine concern.
  const unifiedDesignerSystemPrompt = `${unifiedDesignerBasePrompt}\n\n${designSystemRef}${brandRegisterDeclaration}\n\n${refTypography}\n\n${refColor}\n\n${refSpatial}\n\n${refResponsive}`

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
    // tempBuildDir must always be cleaned up — even if captureSnapshot,
    // cpSync, or any step throws. Otherwise `git add archive/` in the
    // workflow commits the temp dir to main.
    const tempBuildId = `pre-${Date.now()}`
    const tempBuildDir = path.join(ROOT, 'archive', today, `build-${tempBuildId}`)
    try {
      const { captureSnapshot } = await import('./utils/snapshot.js')
      await captureSnapshot(today, tempBuildId)

      // Copy the snapshot to public/archive/ for static serving
      const snapshotSiteDir = path.join(tempBuildDir, 'site')
      if (existsSync(snapshotSiteDir)) {
        const { cpSync } = await import('fs')
        await mkdir(publicArchiveDir, { recursive: true })
        cpSync(snapshotSiteDir, publicArchiveDir, { recursive: true })
        console.log(`  preserved to public/archive/${today}/`)
      }
    } catch (err) {
      console.warn(`  pre-archive failed (non-blocking): ${err.message}`)
    } finally {
      // Always clean up the temp build dir — we only needed the public copy
      try {
        const { rmSync } = await import('fs')
        if (existsSync(tempBuildDir)) {
          rmSync(tempBuildDir, { recursive: true, force: true })
        }
      } catch (cleanupErr) {
        console.warn(`  pre-archive temp cleanup failed: ${cleanupErr.message}`)
      }
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
  let forbiddenArchetypes = []
  let allowedArchetypes = [...ARCHETYPE_NAMES]
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
    const constraint = buildArchetypeConstraintPrompt(archetypeHistory)
    archetypeConstraintPrompt = constraint.block
    forbiddenArchetypes = constraint.forbidden
    allowedArchetypes = constraint.allowed
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

  // Compute the deterministic color mandate once per run; inject into
  // Director and Token Designer user prompts. Pure data — no LLM.
  const { computeColorMandate, formatMandateForPrompt } = await import('./utils/color-mandate.js')
  let colorMandate
  try {
    colorMandate = computeColorMandate({
      archiveDir: path.join(ROOT, 'archive'),
      signals,
      lookbackDays: 7,
      zoneRadius: 30,
    })
  } catch (err) {
    console.warn(`[color-mandate] computation failed, using permissive default: ${err.message}`)
    colorMandate = {
      targetHueRange: [0, 360],
      forbiddenHues: [],
      recentPrimaryHues: [],
      rationale: 'Mandate computation unavailable; palette is open.',
    }
  }
  const colorMandateSection = formatMandateForPrompt(colorMandate)
  console.log(`  color-mandate: target ${colorMandate.targetHueRange[0]}-${colorMandate.targetHueRange[1]}°, ${colorMandate.forbiddenHues.length} forbidden zone(s)`)

  // -----------------------------------------------------------------------
  // Phase 0+1: Art Director — single decision (hero copy, archetype,
  // chassis, full preset.ts, visual spec). Replaces the historical
  // Director + spec-critic gate + Token Designer trio.
  // -----------------------------------------------------------------------
  console.log('\n[phase-0+1] Art Director')

  const chassisCatalogBlock = formatChassisCatalogForPrompt(CHASSIS_CATALOG)
  const archetypeHistoryBlock = archetypeConstraintPrompt
  const weightsBlock = `Signals: ${weights.signals}/10 | Inspiration: ${weights.inspiration}/10 | Ratings: ${weights.ratings}/10 | Risk: ${weights.risk}/10\n\n${weights.risk >= 7 ? 'BOLD, EXPERIMENTAL today. Push for a committed gesture.' : weights.risk <= 3 ? 'SAFE, POLISHED today. Proven patterns.' : 'Balanced.'}`

  // Art Director system prompt: art-director.md + brand register +
  // typography + color. Trim to brand+color+typography per spec to keep
  // assembled prompt <= ~50KB (iter-2 failed at 60KB).
  const artDirectorPromptRaw = await readFile(path.join(promptDir, 'art-director.md'), 'utf8')
  const artDirectorSystemPrompt = `${artDirectorPromptRaw}${brandRegisterDeclaration}\n\n${refTypography}\n\n${refColor}`

  let artDirectorResult
  const t0Director = Date.now()
  try {
    artDirectorResult = await runArtDirector({
      signals,
      contentSummary,
      chassisCatalog: CHASSIS_CATALOG,
      chassisCatalogBlock,
      archetypeHistoryBlock,
      recentBriefs,
      recentRatings,
      references,
      colorMandateSection,
      weightsBlock,
      failureDumpPath: path.join(ROOT, 'signals', 'art-director-last-failed.txt'),
      systemPrompt: artDirectorSystemPrompt,
    })
  } catch (err) {
    console.error(`  Art Director failed: ${err.message}`)
    await restore(originalBackup)
    throw new Error(`Art Director failed: ${err.message}`)
  }

  const chosenArchetype = artDirectorResult.archetype
  let chosenChassis = CHASSIS_CATALOG.find(c => c.id === artDirectorResult.chassisId)
  if (!chosenChassis) {
    console.warn(`  ⚠ Art Director picked unknown chassis "${artDirectorResult.chassisId}" — falling back to "${CHASSIS_CATALOG[0].id}"`)
    chosenChassis = CHASSIS_CATALOG[0]
  }
  const visualSpec = artDirectorResult.visualSpec
  if (chosenArchetype && forbiddenArchetypes.includes(chosenArchetype)) {
    console.log(`  ℹ Art Director reused recently-used archetype "${chosenArchetype}" — accepting (variance is advisory)`)
  }
  console.log(`  hero: "${artDirectorResult.heroCopy.slice(0, 60)}${artDirectorResult.heroCopy.length > 60 ? '...' : ''}"`)
  console.log(`  archetype: ${chosenArchetype} | chassis: ${chosenChassis.id}`)
  console.log(`  visual spec: ${(visualSpec.length / 1024).toFixed(0)}KB`)

  trace.addStep({
    name: 'art-director',
    phase: 1,
    input: { archetypeConstraints: archetypeConstraintPrompt.slice(0, 500) },
    output: {
      hero_copy: artDirectorResult.heroCopy.slice(0, 200),
      archetype: chosenArchetype || 'unknown',
      chassisId: chosenChassis?.id || 'unknown',
      specLength: visualSpec.length,
      specPreview: visualSpec.slice(0, 500),
      selfCheck: artDirectorResult.selfCheck.slice(0, 300),
    },
    durationMs: Date.now() - t0Director,
  })

  // Write the Art Director's preset.ts to disk
  const presetFile = { path: 'elements/preset.ts', content: artDirectorResult.presetTs }
  for (const p of await writeFiles([presetFile])) writtenPaths.add(p)

  // Orchestrator generates the chassis preset (fonts + fontSizes) and
  // __root.tsx (Google Fonts URL substituted into the frozen template).
  // These two files are NEVER written by an agent.
  try {
    const chassisPresetSrc = renderChassisPresetFile(chosenChassis)
    const chassisPresetPath = path.join(ROOT, 'elements/chassis-preset.ts')
    await writeFile(chassisPresetPath, chassisPresetSrc, 'utf8')
    writtenPaths.add('elements/chassis-preset.ts')
    console.log(`  [chassis] wrote chassis-preset.ts (${chosenChassis.id})`)

    const rootSrc = renderRootTemplate(buildGoogleFontsUrl(chosenChassis))
    const rootPath = path.join(ROOT, 'app/routes/__root.tsx')
    await writeFile(rootPath, rootSrc, 'utf8')
    writtenPaths.add('app/routes/__root.tsx')
    console.log(`  [chassis] wrote __root.tsx from template`)
  } catch (err) {
    await cleanupOrphans(writtenPaths, originalBackup)
    await restore(originalBackup)
    throw new Error(`Chassis file generation failed: ${err.message}`)
  }

  // Write today's brief.md so the archive has a human-readable artifact
  // (replaces the old signals/today.brief.md from interpret-signals.js).
  try {
    const briefArtifactPath = path.join(ROOT, 'signals', 'today.brief.md')
    await writeFile(briefArtifactPath, `# Signals Brief — ${signals.date || 'today'}\n\n${artDirectorResult.brief}\n`, 'utf8')
  } catch (err) {
    console.warn(`  brief artifact write failed (non-blocking): ${err.message}`)
  }

  // Codegen on the Art Director's preset.ts
  const codegenResult = validateCodegen()
  if (!codegenResult.success) {
    console.log('  codegen failed — retrying Art Director with error context...')
    // Restore preset.ts before retry
    const presetBackup = new Map()
    for (const [k, v] of originalBackup.entries()) {
      if (k === 'elements/preset.ts') presetBackup.set(k, v)
    }
    await restore(presetBackup)
    try {
      // Re-invoke Art Director with codegen error appended to context.
      // The full Director re-run is expensive but rare — codegen failures
      // are uncommon now that the Art Director sees PandaCSS rules.
      artDirectorResult = await runArtDirector({
        signals,
        contentSummary,
        chassisCatalog: CHASSIS_CATALOG,
        chassisCatalogBlock,
        archetypeHistoryBlock: archetypeHistoryBlock + `\n\n## Previous attempt failed codegen\n\n${codegenResult.error?.slice(0, 1500) || ''}`,
        recentBriefs,
        recentRatings,
        references,
        colorMandateSection,
        weightsBlock,
        failureDumpPath: path.join(ROOT, 'signals', 'art-director-last-failed.txt'),
        systemPrompt: artDirectorSystemPrompt,
      })
      const retryPresetFile = { path: 'elements/preset.ts', content: artDirectorResult.presetTs }
      for (const p of await writeFiles([retryPresetFile])) writtenPaths.add(p)
    } catch (err) {
      await cleanupOrphans(writtenPaths, originalBackup)
      await restore(originalBackup)
      throw new Error(`Art Director codegen retry failed: ${err.message}`)
    }
    const retryCodegen = validateCodegen()
    if (!retryCodegen.success) {
      await cleanupOrphans(writtenPaths, originalBackup)
      await restore(originalBackup)
      throw new Error(`Codegen failed after Art Director retry: ${retryCodegen.error?.slice(0, 500)}`)
    }
  }

  // -----------------------------------------------------------------------
  // Spec Critic Gate — Art Director self-check
  // -----------------------------------------------------------------------
  try {
    console.log('\n[spec-critic] Reviewing Art Director response...')
    const criticUserPrompt = [
      '## Today\'s Signals\n\n```yaml\n' + JSON.stringify(signals, null, 2) + '\n```',
      '## Hero Copy\n\n' + artDirectorResult.heroCopy,
      '## Archetype\n\n' + chosenArchetype,
      '## Chassis ID\n\n' + chosenChassis.id,
      '## Visual Specification\n\n' + visualSpec,
      '## Self-Check\n\n' + artDirectorResult.selfCheck,
      '## elements/preset.ts\n\n```typescript\n' + artDirectorResult.presetTs + '\n```',
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

    verdicts.push({
      critic: 'spec-critic',
      verdict: rawResponse.includes('REVISE') ? 'REVISE' : 'APPROVED',
      feedback: rawResponse.slice(0, 2000),
      ts: Date.now(),
    })

    if (rawResponse.includes('REVISE')) {
      console.log(`  [spec-critic] REVISE — accepting and continuing (single point of failure: a full Art Director re-run is expensive; let the screenshot critic catch render failures)`)
    } else {
      console.log('  [spec-critic] APPROVED')
    }
  } catch (err) {
    console.warn(`  [spec-critic] failed (non-blocking): ${err.message}`)
  }

  // Color-scheme monitoring (warnings only)
  if (artDirectorResult.colorScheme && !artDirectorResult.colorScheme.__parse_error) {
    const { detectCoffeeShopPalette, validateSchemeAgainstPreset, validateSchemeAgainstMandate } = await import('./utils/color-validation.js')
    const consistency = validateSchemeAgainstPreset(artDirectorResult.colorScheme, artDirectorResult.presetTs)
    for (const w of consistency.warnings) console.warn(`[color-scheme] ${w}`)
    const rut = detectCoffeeShopPalette(artDirectorResult.colorScheme, artDirectorResult.presetTs)
    for (const w of rut.warnings) console.warn(`[color-scheme] ${w}`)
    const mandateCheck = validateSchemeAgainstMandate(artDirectorResult.colorScheme, colorMandate)
    for (const w of mandateCheck.warnings) console.warn(`[color-scheme] ${w}`)
  }

  // Synthetic tokenResult for the rest of the orchestrator (Phase 2 archive)
  const tokenResult = {
    files: [presetFile],
    rationale: artDirectorResult.rationale,
    design_brief: artDirectorResult.designBrief,
    color_scheme: artDirectorResult.colorScheme,
  }

  // -----------------------------------------------------------------------
  // Phase 2: Unified Designer (reads tokens from disk, writes all 15 files)
  // -----------------------------------------------------------------------
  const presetPath = path.join(ROOT, 'elements/preset.ts')
  const tokenContext = await readFile(presetPath, 'utf8')

  console.log('\n[phase-2] Unified Designer')

  const enrichedBrief = [
    `## Hero Copy (the page must execute this phrase at marquee scale)`,
    artDirectorResult.heroCopy,
    '',
    `## Hero Rationale`,
    artDirectorResult.heroRationale,
    '',
    `## Visual Specification (from the Art Director)`,
    visualSpec,
    '',
    `## Art Director Rationale`,
    artDirectorResult.rationale,
  ].join('\n')

  // Responsive feedback loop: inject a cautionary lesson from a recent failing build
  // into the unified designer's prompt. Env-gated; non-blocking on failure.
  let responsiveLesson = null
  if (process.env.RESPONSIVE_FEEDBACK_LOOP === '1' && chosenArchetype) {
    try {
      const { readResponsiveHistory } = await import('./utils/read-responsive-history.js')
      const { selectRecentFailure } = await import('./utils/prompt-feedback-selector.js')
      const history = await readResponsiveHistory({ limit: 7 })
      const today = new Date().toISOString().slice(0, 10)
      const { lesson, selectedBuildId } = selectRecentFailure({
        history,
        todayArchetype: chosenArchetype,
        today,
      })
      if (lesson) {
        responsiveLesson = lesson
        if (selectedBuildId) {
          const b = history.find(x => x.buildId === selectedBuildId)
          if (b) {
            const metricsPath = path.join(
              ROOT,
              'archive',
              b.date,
              `build-${b.buildId}`,
              'responsive-metrics.json'
            )
            try {
              const raw = JSON.parse(await readFile(metricsPath, 'utf8'))
              raw.usedInPromptFor = [...(raw.usedInPromptFor || []), today]
              await writeFile(metricsPath, JSON.stringify(raw, null, 2), 'utf8')
            } catch { /* non-blocking */ }
          }
        }
        console.log(`  responsive lesson injected from build ${selectedBuildId}`)
      }
    } catch (err) {
      console.warn(`  responsive feedback injection failed (non-blocking): ${err.message}`)
    }
  }

  // Build the unified-designer user prompt via the shared prompt-builder so
  // production matches local-dev byte-for-byte up to the production-only
  // additions (ratings + creative weights) appended below.
  const buildUnifiedDesignerPrompt = () => {
    // Production's system prompt already includes the content contract and
    // technical requirements via the library-* references appended above.
    // Pass contentSummary: '' and currentFiles: [] so buildMessages skips
    // the duplicate Site Content Reference / Technical Requirements /
    // Current Component Files blocks — otherwise the user prompt balloons
    // past ~60KB and the subprocess stalls.
    const { messages } = buildMessages({
      signals,
      brief: enrichedBrief,
      contentSummary: '',
      currentFiles: [],
      tokenContext,
      responsiveLesson,
    })
    const archetypeBlock = buildArchetypeContractBlock(chosenArchetype)
    return (archetypeBlock ? archetypeBlock + '\n\n' : '')
      + messages[0].content
      + (recentRatings ? '\n\n## User Design Ratings (learn from these)\n\nThe site owner rates each design after it ships. Higher scores = what they want to see more of. Notes explain what specifically worked or didn\'t.\n' + recentRatings : '')
      + weightsPrompt
  }
  const designerUserPrompt = buildUnifiedDesignerPrompt()

  // Inject today's archetype-matched seed into the unified-designer system
  // prompt. The seed is an anchor reference — see scripts/prompts/seeds/.
  const seedPath = selectSeed(chosenArchetype || 'stack')
  const seedContent = readFileSync(seedPath, 'utf8')
  const unifiedDesignerSystemPromptWithSeed = unifiedDesignerSystemPrompt.replace('<!-- SEED_ANCHOR -->', seedContent)
  console.log(`  injecting seed: ${path.basename(seedPath)} (${(seedContent.length / 1024).toFixed(1)}KB)`)

  let designerResult
  const t0Designer = Date.now()
  try {
    designerResult = await callAgent('unified-designer', unifiedDesignerSystemPromptWithSeed, designerUserPrompt, null, { model: 'opus', timeoutMs: 1800000, stallTimeoutMs: 1500000 }) // 30 min total, 25 min silent-thinking headroom — the CLI comment documents 9-12 min of silent thinking as normal; default 15 min was too tight
  } catch (err) {
    console.error(`  Unified Designer failed: ${err.message}`)
    await restore(originalBackup)
    throw new Error(`Unified Designer failed: ${err.message}`)
  }

  // Enforce that ALL five required files are present. The most common
  // failure mode is the designer omitting Layout.tsx or Sidebar.tsx, which
  // silently preserves yesterday's nav and causes the "designs all look
  // the same" complaint. Retry once if either is missing.
  const REQUIRED_FILES = [
    'app/components/Layout.tsx',
    'app/components/Sidebar.tsx',
    'app/routes/index.tsx',
    'app/routes/about.tsx',
    'app/routes/work.$slug.tsx',
  ]
  const producedPaths = new Set(designerResult.files.map(f => f.path))
  const missing = REQUIRED_FILES.filter(p => !producedPaths.has(p))
  if (missing.length > 0) {
    console.warn(`  ⚠ Unified Designer omitted required files: ${missing.join(', ')} — retrying with explicit reminder`)
    const reminderPrompt = `${designerUserPrompt}\n\n---\n\n## REQUIRED FILES MISSING — RETRY\n\nYour previous response omitted these required files: ${missing.join(', ')}\n\nThis silently preserves yesterday's chrome and breaks the day's archetype. Re-emit your COMPLETE response. Every required file must appear, including these you missed:\n${missing.map(m => `- ${m}`).join('\n')}`
    try {
      const retry = await callAgent('unified-designer', unifiedDesignerSystemPromptWithSeed, reminderPrompt, null, { model: 'opus', timeoutMs: 1800000, stallTimeoutMs: 1500000 })
      const retryProduced = new Set(retry.files.map(f => f.path))
      const stillMissing = REQUIRED_FILES.filter(p => !retryProduced.has(p))
      if (stillMissing.length === 0) {
        designerResult = retry
        console.log(`  ✓ retry produced all required files`)
      } else {
        console.warn(`  ⚠ retry still missing ${stillMissing.join(', ')} — proceeding with original output`)
      }
    } catch (err) {
      console.warn(`  ⚠ retry failed: ${err.message} — proceeding with original output`)
    }
  }

  // Write all files
  for (const p of await writeFiles(designerResult.files)) writtenPaths.add(p)

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
    await cleanupOrphans(writtenPaths, originalBackup)
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
      finalScreenshot = screenshotBuffer
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

      verdicts.push({
        critic: 'screenshot-critic',
        verdict: criticResponse.includes('REVISE') ? 'REVISE' : 'SHIP',
        feedback: criticResponse.slice(0, 2000),
        ts: Date.now(),
      })

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

        // Per-agent options keep model/timeout choices next to the prompt so
        // this retry path can't fall through to Sonnet defaults on the
        // unified-designer (Sonnet stalls at 0KB on unified-designer-class
        // prompts — see scripts/design-agents.js:1011 commentary).
        const agentConfig = {
          'unified-designer': {
            prompt: unifiedDesignerSystemPrompt,
            user: buildUnifiedDesignerPrompt,
            options: { model: 'opus', timeoutMs: 1800000, stallTimeoutMs: 1500000 },
          },
        }

        const config = agentConfig[responsibleAgent]
        if (config) {
          console.log(`  retrying ${responsibleAgent} with critic feedback...`)
          try {
            const retryResult = await callAgent(responsibleAgent, config.prompt, config.user(), feedback, config.options)
            for (const p of await writeFiles(retryResult.files)) writtenPaths.add(p)

            // Re-run codegen before validateBuild if token files changed,
            // otherwise validateBuild sees stale styled-system output.
            if (responsibleAgent === 'token-designer') {
              const codegenAfterRetry = validateCodegen()
              if (!codegenAfterRetry.success) {
                console.warn(`  codegen failed after critic retry: ${codegenAfterRetry.error?.slice(0, 200)}`)
              }
            }

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
              await cleanupOrphans(writtenPaths, originalBackup)
              await restore(filesToRestore)
              if (responsibleAgent === 'token-designer') validateCodegen()
            } else {
              console.log('  post-critic revision build passed')
              // Re-capture so the persisted screenshot reflects the revised
              // render, not the pre-revision one the critic rejected.
              try {
                const { captureScreenshot: captureScreenshotAfterRevision } = await import('./utils/snapshot.js')
                finalScreenshot = await captureScreenshotAfterRevision()
              } catch (recapErr) {
                console.warn(`  screenshot re-capture failed (non-blocking): ${recapErr.message}`)
              }
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

    await archive(signals.date, signals, rationale, designBrief, changedPaths, {}, tokenResult.color_scheme ?? null, chosenArchetype ?? null, {
      'screenshot.png': finalScreenshot,
      'verdicts.json': JSON.stringify(verdicts, null, 2),
    })
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

  // Restore only the failing agent's files. Art Director files are
  // intentionally NEVER restored here — by design (see retryAgents comment
  // below), build failures involving preset.ts are handled by the Unified
  // Designer adapting to today's tokens, not by reverting the preset and
  // re-running the Art Director. Reverting would leave preset.ts and
  // styled-system/ incoherent (codegen is not re-run in Phase 5) and
  // produce archive/disk-state divergence.
  const filesToRestore = new Map()
  for (const [filePath, content] of originalBackup.entries()) {
    const owner = FILE_OWNERSHIP[filePath]
    if (owner === 'art-director') continue
    if (failingAgent === 'both' || owner === failingAgent) {
      filesToRestore.set(filePath, content)
    }
  }
  await restore(filesToRestore)

  // Build agent lookup for retry. Per-agent `options` carry the model +
  // timeout overrides so new agents added later don't need re-wiring at the
  // callAgent site. Keep these options in sync with the primary invocation
  // of each agent (see scripts/design-agents.js:860 for token-designer and
  // :1011, :1035 for unified-designer).
  const agentConfig = {
    'unified-designer': {
      prompt: unifiedDesignerSystemPrompt,
      user: buildUnifiedDesignerPrompt,
      options: { model: 'opus', timeoutMs: 1800000, stallTimeoutMs: 1500000 },
    },
  }

  // Build failures are almost always in the Unified Designer's TSX.
  // The Art Director's preset.ts is validated by codegen earlier in
  // the pipeline, so a build failure on preset.ts at this stage means
  // a downstream typing problem — best handled by Unified Designer
  // retry rather than full Art Director re-run (which is more expensive).
  const retryAgents = ['unified-designer']

  for (const agent of retryAgents) {
    const config = agentConfig[agent]
    if (!config) continue

    console.log(`\n  retrying ${agent} with build error context...`)
    try {
      const retryResult = await callAgent(agent, config.prompt, config.user(), buildResult.error, config.options)
      for (const p of await writeFiles(retryResult.files)) writtenPaths.add(p)
      // Update the result so the archive records the retry output, not stale originals
      if (agent === 'unified-designer') designerResult = retryResult
    } catch (err) {
      console.error(`  ${agent} retry failed: ${err.message}`)
      // If the retry agent itself crashed, don't silently continue to
      // validateBuild — bail out with the real error so debugging points
      // at the actual cause (code review #14).
      await cleanupOrphans(writtenPaths, originalBackup)
      await restore(originalBackup)
      throw new Error(`${agent} retry crashed: ${err.message}`)
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

    await archive(signals.date, signals, rationale, designBrief, changedPaths, {}, tokenResult.color_scheme ?? null, chosenArchetype ?? null, {
      'screenshot.png': finalScreenshot,
      'verdicts.json': JSON.stringify(verdicts, null, 2),
    })
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
  await cleanupOrphans(writtenPaths, originalBackup)
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
