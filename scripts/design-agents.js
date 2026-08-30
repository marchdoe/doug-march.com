#!/usr/bin/env node

/**
 * Designer Agent Swarm Orchestrator
 *
 * Dispatches specialized Claude CLI agents sequentially:
 *   Phase 0+1: Art Director   — hero copy, archetype, chassis, preset.ts,
 *                                visual spec (orchestrator generates
 *                                __root.tsx + chassis-preset.ts deterministically
 *                                from the Director-chosen typography chassis)
 *   Phase 2a:  Mockup Designer — one self-contained mockup.html (Opus)
 *   Phase 2b:  Mockup Critic   — blocking vision gate over a screenshot of
 *                                the mockup; ≤2 REVISE rounds back to 2a
 *   Phase 2c:  React Engineer  — translates the approved mockup into the
 *                                production TSX files (Sonnet)
 *
 * Each agent gets the creative brief, relevant reference files, and (after
 * Phase 1) the design tokens from preset.ts. Build validation and retry
 * logic ensure the final output compiles.
 */

import { config } from 'dotenv'
import { setRunDeadline } from './utils/run-budget.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { callClaudeCLI } from './utils/claude-cli.js'
import {
  MUTABLE_FILES,
  STRUCTURE_FILES,
  COMPONENT_FILES,
  readContext,
} from './utils/site-context.js'
import { backup, writeFiles, restore, cleanupOrphans, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'
import { resetLedger, noteRetry } from './utils/cost-ledger.js'
import { createTrace } from './utils/trace.js'
import { selectLane } from './utils/select-lane.js'
import { hashToRange } from './utils/deterministic-hash.js'
import { CHASSIS_CATALOG } from '../elements/chassis/index.js'
import {
  buildGoogleFontsUrl,
  renderRootTemplate,
  renderChassisPresetFile,
  formatChassisCatalogForPrompt,
} from './utils/chassis.js'
import { parseDelimiterResponse } from './utils/delimiter-parser.js'
import { parseCriticVerdict } from './utils/critic-verdict.js'
import { modelFor, isDevModelTier } from './utils/models.js'
import { runArtDirector } from './agents/art-director.js'
import { parseCompositionBlock } from './utils/spec-blocks.js'
import { formatTuple } from './utils/composition-grammar.js'
import { findShellPostureViolation } from './utils/shell-posture-check.js'
import { countArchivedDesigns } from './utils/archive-count.js'
export { parseDelimiterResponse }

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maps every mutable file owned by an LLM agent to that agent name.
 *  Token-designer ownership was removed in the Art Director pipeline —
 *  preset.ts is now written by the Art Director. The Art Director's
 *  files are not retried via this map; retries go through the
 *  React Engineer (which is the only agent whose files can fail
 *  build validation in the new pipeline — preset.ts is validated by
 *  codegen at write time, and the Mockup Designer's HTML never enters
 *  the build).
 */
export const FILE_OWNERSHIP = Object.fromEntries([
  ['elements/preset.ts', 'art-director'],
  ...STRUCTURE_FILES.map((f) => [f, 'react-engineer']),
  ...COMPONENT_FILES.map((f) => [f, 'react-engineer']),
])

/**
 * Resolve the WEIGHT_RISK creative weight. An explicitly-set env value
 * (anything other than undefined or the empty string — including '0',
 * which is falsy in JS but not "unset") always wins. Otherwise risk is
 * derived deterministically from the build date via {@link hashToRange},
 * range 3-10 inclusive — same date always derives the same risk (a
 * re-run of today's build doesn't change today's risk), different dates
 * spread across the range instead of a fixed constant.
 *
 * Before this, the fallback was a constant '8', which meant every day the
 * owner panel left WEIGHT_RISK unset produced the exact same risk value
 * and therefore the exact same Creative Weights prompt sentence.
 *
 * @param {string|undefined} envValue - raw process.env.WEIGHT_RISK
 * @param {string} date - build date, 'YYYY-MM-DD'
 * @returns {{ risk: number, explicitlySet: boolean }}
 */
export function resolveRiskWeight(envValue, date) {
  const explicitlySet = envValue !== undefined && envValue !== ''
  const risk = explicitlySet ? parseInt(envValue, 10) : hashToRange(`risk:${date}`, 3, 10)
  return { risk, explicitlySet }
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
    const hit = catalog.find((c) => c.id === id)
    if (hit) return hit
  }

  // Fallback: scan for any catalog id mentioned in backticks anywhere.
  for (const c of catalog) {
    const re = new RegExp(`\`\\s*${c.id.replace(/-/g, '\\-')}\\s*\``, 'i')
    if (re.test(text)) return c
  }

  return null
}

/**
 * Render the Creative Weights risk sentence for the Art Director prompt.
 * Four distinct buckets (3-4 / 5-6 / 7-8 / 9-10) so risk is a real dial —
 * previously only 3 buckets existed and the >=7 sentence ("BOLD,
 * EXPERIMENTAL") fired for every risk value from 7 through 10, including
 * the constant risk=8 default that ran every day before WEIGHT_RISK
 * started varying by date.
 *
 * risk >= 9 references the Max-Risk License in art-director.md — the one
 * day the Art Director may deliberately break a single named anti-pattern
 * from the chosen lane, or land one composition axis on a value the
 * Composition Mandate soft-forbade. (Not a custom chassis: an unrecognized
 * CHASSIS_ID is silently replaced with CHASSIS_CATALOG[0], so that
 * deviation would never survive the run — the license targets levers that
 * actually do. Composition itself is no longer a hard-validated fixed set
 * the way it was when this comment described an 8-name ARCHETYPE
 * whitelist — every axis VALUE is still validated against its own fixed
 * vocabulary, but the tuple of values is open, so "invent a value" was
 * never the risk this license needed to cover in the first place.)
 *
 * @param {number} risk
 * @returns {string}
 */
export function describeRiskTier(risk) {
  if (risk >= 9) {
    return 'MAXIMUM RISK today. You may invoke the Max-Risk License below (break exactly ONE named anti-pattern from the lane, or land one composition axis on a soft-forbidden value) if the hero phrase genuinely demands it. Using it is optional — a strong, fully-compliant execution is still a valid MAXIMUM RISK day. Do not hedge: whatever you choose, commit harder than a normal day would.'
  }
  if (risk >= 7) {
    return 'BOLD today. Push for a committed gesture — fuller color saturation, a more aggressive archetype commitment, less hedging toward the safe middle.'
  }
  if (risk >= 5) {
    return 'Balanced. Mix proven patterns with one deliberate point of risk — not maximum safety, not maximum novelty.'
  }
  return 'SAFE, POLISHED today. Proven patterns, minimal deviation from what has worked before.'
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
export function buildAgentPrompt(_agentName, { brief, referenceFiles, tokenContext }) {
  const sections = []

  // Section 1: Creative Brief
  sections.push(`## Creative Brief\n\n${brief}`)

  // Section 2: Design Tokens (for downstream agents that consume preset.ts)
  if (tokenContext) {
    sections.push(
      `## Design Tokens (from elements/preset.ts)\n\nUse these token names in your components. Do not invent new tokens — only reference what exists here.\n\n\`\`\`typescript\n${tokenContext}\n\`\`\``
    )
  }

  // Section 3: Reference Files — with explicit anti-anchoring instruction
  if (referenceFiles && referenceFiles.length > 0) {
    const fileBlocks = referenceFiles.map(
      (f) => `### ${f.path}\n\n\`\`\`typescript\n${f.content}\n\`\`\``
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
 * @returns {'art-director'|'react-engineer'|'both'}
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
 * Build a composition-driven constraint block for injection into the Mockup
 * Designer prompt: on a genuinely sparse composition, forbid rendering
 * project cards or portfolio sections on the home page — only the hero
 * phrase and navigation should appear.
 *
 * Successor to buildArchetypeContractBlock(archetype), which fired on the
 * literal strings 'Specimen' and 'Poster'. Re-expressed against the
 * composition tuple instead of a name (composition-grammar arc, Task 4):
 * `density: sparse` is composition-grammar.js's own definition of "very
 * few elements, very large intervals; the page is mostly field" — a
 * project-card grid directly contradicts that regardless of which
 * field_ratio or hero_zone accompanies it. (Deviation from the task's
 * draft wording, which suggested `density: sparse` AND `field_ratio:
 * drenched` specifically: narrowing to density alone is more faithful to
 * the original rule's purpose — Poster's sparseness and Specimen's
 * type-as-canvas both violate "no cards" for the same underlying reason,
 * independent of field_ratio.)
 *
 * @param {Record<string, string>|null|undefined} tuple - the day's composition tuple
 * @returns {string}
 */
export function buildCompositionContractBlock(tuple) {
  if (tuple?.density === 'sparse') {
    return `⚠ COMPOSITION CONTRACT — SPARSE:
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
    // Critic response (spec-critic, screenshot-critic) — extract verdict and feedback.
    // _fullResponse keeps the undelimited text: parseCriticVerdict anchors on the
    // ===VERDICT=== block, so it must see the full response, not the stripped body.
    const verdictMatch = result.match(/===VERDICT===([\s\S]*?)===END===/)
    const verdictBody = verdictMatch ? verdictMatch[1].trim() : result.trim()
    parsed = {
      files: [],
      rationale: verdictBody,
      design_brief: '',
      _rawResponse: verdictBody,
      _fullResponse: result,
    }
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
      const cleaned = result
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
            throw new Error(
              `[${agentName}] failed to parse response: ${e3.message}\nFirst 300 chars: ${result.slice(0, 300)}`
            )
          }
        } else {
          throw new Error(
            `[${agentName}] no parseable response found\nFirst 300 chars: ${result.slice(0, 300)}`
          )
        }
      }
    }
  }

  // Validate files array (Design Director may have no files — that's OK)
  if (!parsed.files) parsed.files = []
  if (!Array.isArray(parsed.files)) {
    throw new Error(
      `[${agentName}] response missing files array. Got keys: ${Object.keys(parsed).join(', ')}`
    )
  }

  console.log(
    `  [${agentName}] responded with ${parsed.files.length} files${parsed._rawResponse ? ' + visual spec' : ''}`
  )

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
 * Phase 0+1: Art Director (hero copy, archetype, chassis, preset.ts,
 *            visual spec; orchestrator deterministically generates
 *            __root.tsx + chassis-preset.ts)
 * Phase 2a: Mockup Designer — one self-contained mockup.html
 * Phase 2b: Mockup Critic — blocking vision gate, ≤2 revision rounds
 * Phase 2c: React Engineer — translates the approved mockup to TSX
 * Phase 4: Build validation
 * Phase 5: Retry on failure
 *
 * @param {{ signals: object, brief: string, contentSummary: string }} context
 * @returns {Promise<{ rationale: string, design_brief: string, files: Array<{path: string, content: string}> }>}
 */
export async function runAgentSwarm(context, { onTraceStep } = {}) {
  const { signals, brief, contentSummary } = context

  // Start this run's cost accounting from zero. The ledger is module-level,
  // so a second swarm in the same process (the dev panel's Run button) would
  // otherwise bill the previous run's calls to this one.
  resetLedger()

  // Read creative weights from environment. WEIGHT_RISK is the one dial
  // that varies by date rather than falling back to a constant: a fixed
  // fallback (the old default was '8') meant every day the owner panel
  // left WEIGHT_RISK unset rendered the exact same "BOLD" prompt sentence
  // below. When the env var is absent or empty (the owner panel writes a
  // real value when it wants to override), derive risk 3-10 from the
  // build date instead — reproducible per day, varied across days. An
  // explicitly-set repo var (including '0', which is falsy in JS but not
  // "unset") always wins over the derived value.
  const today = signals.date || new Date().toISOString().slice(0, 10)
  const { risk: riskWeight, explicitlySet: riskExplicitlySet } = resolveRiskWeight(
    process.env.WEIGHT_RISK,
    today
  )
  const weights = {
    signals: parseInt(process.env.WEIGHT_SIGNALS || '5', 10),
    inspiration: parseInt(process.env.WEIGHT_INSPIRATION || '5', 10),
    ratings: parseInt(process.env.WEIGHT_RATINGS || '5', 10),
    risk: riskWeight,
  }
  console.log(
    `  creative weights: signals=${weights.signals} inspiration=${weights.inspiration} ratings=${weights.ratings} risk=${weights.risk}${riskExplicitlySet ? '' : ' (derived from date — WEIGHT_RISK unset)'}`
  )
  console.log(
    `  model tier: ${isDevModelTier() ? 'DEV (sonnet ceiling — local Max-plan, no Opus)' : 'PROD (best per job — opus mockup designer)'} | mockup-designer=${modelFor('mockup-designer')}`
  )

  // Run-level deadline: per-call timeouts protect against hangs, not
  // against an honest slow day blowing the Actions job timeout mid-run
  // (which kills the process with no trace). Past the deadline we stop
  // STARTING expensive optional work and ship what we have.
  const runDeadline = Date.now() + parseInt(process.env.RUN_BUDGET_MINUTES || '60', 10) * 60000
  const pastDeadline = () => Date.now() > runDeadline
  // Publish it so every model call clamps its own timeout to what is left,
  // rather than each agent's cap being checked only between phases.
  setRunDeadline(runDeadline)

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
          .filter(
            (b) =>
              b.isDirectory() &&
              b.name.startsWith('build-') &&
              !b.name.startsWith('build-failed-') &&
              !b.name.startsWith('build-pre-')
          )
          .sort()
          .reverse()
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
      try {
        console.log(`[TRACE-FINAL] ${trace.toJSON()}`)
      } catch {}
    }
  }

  // Snapshot the agent-written files into the failure archive BEFORE
  // restore() reverts them. Without this, a build failure destroys the only
  // copy of the failing sources — error.txt tells you WHAT broke but the
  // code that broke it is gone (every build-failed-* dir before 2026-07-10
  // has exactly this gap).
  async function archiveFailedSources(paths) {
    try {
      const dir = path.join(ROOT, 'archive', signals.date, `build-failed-sources-${Date.now()}`)
      let count = 0
      for (const relPath of paths) {
        const abs = path.join(ROOT, relPath)
        if (!existsSync(abs)) continue
        const dest = path.join(dir, relPath)
        await mkdir(path.dirname(dest), { recursive: true })
        await copyFile(abs, dest)
        count++
      }
      if (count > 0)
        console.log(`  failing sources (${count} files) archived to ${path.basename(dir)}/`)
    } catch (err) {
      console.warn(`  failed-source archive failed (non-blocking): ${err.message}`)
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
      refCritique,
      brandContract,
    ] = await Promise.all([
      readFile(path.join(promptDir, 'spec-critic.md'), 'utf8'),
      readFile(path.join(promptDir, 'screenshot-critic.md'), 'utf8'),
      readFile(path.join(promptDir, 'design-system-reference.md'), 'utf8'),
      readFile(path.join(refDir, 'brand.md'), 'utf8'),
      readFile(path.join(refDir, 'typography.md'), 'utf8'),
      readFile(path.join(refDir, 'color-and-contrast.md'), 'utf8'),
      readFile(path.join(refDir, 'spatial-design.md'), 'utf8'),
      readFile(path.join(refDir, 'critique.md'), 'utf8'),
      readFile(path.join(promptDir, 'brand-contract.md'), 'utf8'),
    ])

    // Brand-register declaration. dougmar.ch is BRAND register — a personal
    // portfolio where design IS the product. Inject this into every design agent
    // so they apply brand-register conventions (expressive composition, committed
    // color strategy, typographic risk) rather than product-register reflexes
    // (dense dashboards, restrained palette, generic card grids).
    const brandRegisterDeclaration = `\n\n## Project Register: BRAND\n\nThis project is BRAND register — a personal portfolio where design IS the product. Apply brand-register conventions throughout. The detailed brand-register reference follows.\n\n${refBrand}`

    const specCriticPrompt = `${specCriticPromptRaw}\n\n## Design Critique Heuristics\n\n${refCritique}`
    const screenshotCriticPrompt = `${screenshotCriticPromptRaw}\n\n## Design Critique Heuristics\n\n${refCritique}`

    // Backup all mutable files
    console.log('\n[backup] Backing up mutable files...')
    const originalBackup = await backup(MUTABLE_FILES)
    console.log(`  backed up ${originalBackup.size} files`)

    // -----------------------------------------------------------------------
    // Read recent archive briefs for Design Director context
    // -----------------------------------------------------------------------
    const archiveDir = path.join(ROOT, 'archive')
    let recentBriefs = ''
    try {
      const dirs = readdirSync(archiveDir)
        .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
        .sort()
        .reverse()
        .slice(0, 7)
      const recentDirs5 = dirs.slice(0, 5)
      for (const dir of recentDirs5) {
        const briefPath = path.join(archiveDir, dir, 'brief.md')
        if (existsSync(briefPath)) {
          recentBriefs += `\n### ${dir}\n${readFileSync(briefPath, 'utf8')}\n`
        }
      }
    } catch {}

    // -----------------------------------------------------------------------
    // Read recent ratings for taste feedback (new-schema GitHub-issue ratings)
    // -----------------------------------------------------------------------
    const { buildRecentRatingsBlock } = await import('./utils/ratings.js')
    const recentRatings = buildRecentRatingsBlock(path.join(ROOT, 'archive'), { lookbackDays: 10 })

    // -----------------------------------------------------------------------
    // Owner-curated permanent taste memory (signals/taste.md) — unlike the
    // 10-build ratings window above, this is hand-maintained and all-time.
    // Fed to both the Art Director and the Mockup Designer.
    // -----------------------------------------------------------------------
    const { buildTasteMemoryBlock } = await import('./utils/taste-memory.js')
    const tasteMemoryBlock = buildTasteMemoryBlock(ROOT)

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
    console.log(
      `  color-mandate: target ${colorMandate.targetHueRange[0]}-${colorMandate.targetHueRange[1]}°, ${colorMandate.forbiddenHues.length} forbidden zone(s)`
    )

    const { computeShellMandate, formatShellMandateForPrompt } = await import(
      './utils/shell-mandate.js'
    )
    let shellMandateSection = ''
    try {
      shellMandateSection = formatShellMandateForPrompt(
        computeShellMandate({ archiveDir: path.join(ROOT, 'archive'), lookbackDays: 7 })
      )
    } catch (err) {
      console.warn(`[shell-mandate] computation failed (non-blocking): ${err.message}`)
    }

    // Anti-sameness mandates (2026-08-23 audit): palette FORMULA (not just
    // hue), hero-source rotation, and layout composition. Same soft-forbid
    // shape as color/shell mandates above — deterministic, zero-LLM,
    // advisory only. Each formatter returns '' when there's no history to
    // react to (old archives predate these fields), so the section is
    // simply omitted from the prompt rather than showing empty guidance.
    const { computePaletteFormulaMandate, formatPaletteFormulaMandateForPrompt } = await import(
      './utils/palette-formula-mandate.js'
    )
    let paletteFormulaMandateSection = ''
    try {
      paletteFormulaMandateSection = formatPaletteFormulaMandateForPrompt(
        computePaletteFormulaMandate({ archiveDir: path.join(ROOT, 'archive'), lookbackDays: 7 })
      )
    } catch (err) {
      console.warn(`[palette-formula-mandate] computation failed (non-blocking): ${err.message}`)
    }

    const { computeHeroSourceMandate, formatHeroSourceMandateForPrompt } = await import(
      './utils/hero-source-mandate.js'
    )
    let heroSourceMandateSection = ''
    try {
      heroSourceMandateSection = formatHeroSourceMandateForPrompt(
        computeHeroSourceMandate({ archiveDir: path.join(ROOT, 'archive'), lookbackDays: 7 })
      )
    } catch (err) {
      console.warn(`[hero-source-mandate] computation failed (non-blocking): ${err.message}`)
    }

    const { computeCompositionMandate, formatCompositionMandateForPrompt } = await import(
      './utils/composition-mandate.js'
    )
    const buildDate = signals.date || new Date().toISOString().slice(0, 10)
    let compositionMandateSection = ''
    try {
      compositionMandateSection = formatCompositionMandateForPrompt(
        computeCompositionMandate({
          archiveDir: path.join(ROOT, 'archive'),
          date: buildDate,
          lookbackDays: 7,
        })
      )
    } catch (err) {
      console.warn(`[composition-mandate] computation failed (non-blocking): ${err.message}`)
    }

    // -----------------------------------------------------------------------
    // Phase 0+1: Art Director — single decision (hero copy, archetype,
    // chassis, full preset.ts, visual spec). Replaces the historical
    // Director + spec-critic gate + Token Designer trio.
    // -----------------------------------------------------------------------
    console.log('\n[phase-0+1] Art Director')

    // Repetition feedback from the previous build (Task 6). Deterministic and
    // free, so it runs every day whether or not an owner rating exists.
    // Computed rather than read back from uniqueness.json, which only exists
    // for builds made after the index shipped.
    let uniquenessBlock = ''
    try {
      const { readUniquenessHistory } = await import('./utils/read-uniqueness-history.js')
      const { computeUniqueness, formatUniquenessForPrompt } = await import(
        './utils/uniqueness-index.js'
      )
      const todayStr = signals.date || new Date().toISOString().slice(0, 10)
      const [previous, ...before] = await readUniquenessHistory({
        root: ROOT,
        limit: 8,
        before: todayStr,
      })
      if (previous) {
        uniquenessBlock = formatUniquenessForPrompt(computeUniqueness(previous, before))
        if (uniquenessBlock) console.log(`  repetition check: scored ${previous.date}`)
      }
    } catch (err) {
      console.warn(`  uniqueness feedback skipped (non-blocking): ${err.message}`)
    }

    const chassisCatalogBlock = formatChassisCatalogForPrompt(CHASSIS_CATALOG)
    const weightsBlock = `Signals: ${weights.signals}/10 | Inspiration: ${weights.inspiration}/10 | Ratings: ${weights.ratings}/10 | Risk: ${weights.risk}/10\n\n${describeRiskTier(weights.risk)}`

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
        recentBriefs,
        recentRatings,
        references,
        colorMandateSection,
        shellMandateSection,
        paletteFormulaMandateSection,
        heroSourceMandateSection,
        compositionMandateSection,
        brandContract,
        weightsBlock,
        tasteMemoryBlock,
        uniquenessBlock,
        failureDumpPath: path.join(ROOT, 'signals', 'art-director-last-failed.txt'),
        systemPrompt: artDirectorSystemPrompt,
      })
    } catch (firstErr) {
      console.warn(`  Art Director failed (${firstErr.message}) — retrying once with error context`)
      noteRetry()
      try {
        artDirectorResult = await runArtDirector({
          signals,
          contentSummary,
          chassisCatalog: CHASSIS_CATALOG,
          chassisCatalogBlock,
          recentBriefs,
          recentRatings,
          references,
          colorMandateSection,
          shellMandateSection,
          paletteFormulaMandateSection,
          heroSourceMandateSection,
          compositionMandateSection,
          brandContract,
          weightsBlock,
          tasteMemoryBlock,
          uniquenessBlock,
          retryContext: `## Previous attempt was rejected\n\nYour previous response failed validation: ${firstErr.message}\nEmit ALL required blocks with exact delimiters and exact field formats this time.`,
          failureDumpPath: path.join(ROOT, 'signals', 'art-director-last-failed.txt'),
          systemPrompt: artDirectorSystemPrompt,
        })
      } catch (err) {
        console.error(`  Art Director failed after retry: ${err.message}`)
        await restore(originalBackup)
        throw new Error(`Art Director failed after retry: ${err.message}`)
      }
    }

    const chosenArchetype = artDirectorResult.archetype
    // Reassigned below, after any codegen retry, so downstream consumers
    // (spec-critic, lane selection, archive persistence) always see the
    // composition tuple from the FINAL settled artDirectorResult — same
    // reasoning as shellDecl/measurablesDecl further down. This early value
    // only backs the log line and trace step right after this call.
    let chosenComposition = parseCompositionBlock(artDirectorResult.composition)
    let chosenChassis = CHASSIS_CATALOG.find((c) => c.id === artDirectorResult.chassisId)
    if (!chosenChassis) {
      console.warn(
        `  ⚠ Art Director picked unknown chassis "${artDirectorResult.chassisId}" — falling back to "${CHASSIS_CATALOG[0].id}"`
      )
      chosenChassis = CHASSIS_CATALOG[0]
    }
    const visualSpec = artDirectorResult.visualSpec
    console.log(
      `  hero: "${artDirectorResult.heroCopy.slice(0, 60)}${artDirectorResult.heroCopy.length > 60 ? '...' : ''}"`
    )
    console.log(
      `  composition: ${formatTuple(chosenComposition).replace(/\n/g, ' | ')} | chassis: ${chosenChassis.id}`
    )
    if (chosenArchetype) console.log(`  archetype (descriptive, unvalidated): ${chosenArchetype}`)
    console.log(`  visual spec: ${(visualSpec.length / 1024).toFixed(0)}KB`)

    trace.addStep({
      name: 'art-director',
      phase: 1,
      input: { compositionMandate: compositionMandateSection.slice(0, 500) },
      output: {
        hero_copy: artDirectorResult.heroCopy.slice(0, 200),
        archetype: chosenArchetype || 'unknown',
        composition: chosenComposition,
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

      const { buildOgMetaEntries } = await import('./utils/og-meta.js')
      const ogMeta = buildOgMetaEntries({
        date: signals.date || new Date().toISOString().slice(0, 10),
        heroCopy: artDirectorResult.heroCopy,
        designBrief: artDirectorResult.designBrief,
      })
      const rootSrc = renderRootTemplate(
        buildGoogleFontsUrl(chosenChassis),
        ogMeta,
        countArchivedDesigns()
      )
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
      await writeFile(
        briefArtifactPath,
        `# Signals Brief — ${signals.date || 'today'}\n\n${artDirectorResult.brief}\n`,
        'utf8'
      )
    } catch (err) {
      console.warn(`  brief artifact write failed (non-blocking): ${err.message}`)
    }

    // Codegen on the Art Director's preset.ts
    const codegenResult = validateCodegen()
    if (!codegenResult.success) {
      console.log('  codegen failed — retrying Art Director with error context...')
      noteRetry()
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
          recentBriefs,
          recentRatings,
          references,
          colorMandateSection,
          shellMandateSection,
          paletteFormulaMandateSection,
          heroSourceMandateSection,
          compositionMandateSection,
          brandContract,
          weightsBlock,
          tasteMemoryBlock,
          uniquenessBlock,
          retryContext: `## Previous attempt failed codegen\n\n${codegenResult.error?.slice(0, 1500) || ''}`,
          failureDumpPath: path.join(ROOT, 'signals', 'art-director-last-failed.txt'),
          systemPrompt: artDirectorSystemPrompt,
        })
        const retryPresetFile = { path: 'elements/preset.ts', content: artDirectorResult.presetTs }
        for (const p of await writeFiles([retryPresetFile])) writtenPaths.add(p)
        // The codegen retry re-ran the Art Director, so heroCopy/designBrief may
        // have changed since __root.tsx was first written. Regenerate it so the
        // og:title/og:description reflect the settled result, not the stale one.
        try {
          const { buildOgMetaEntries } = await import('./utils/og-meta.js')
          const retryOgMeta = buildOgMetaEntries({
            date: signals.date || new Date().toISOString().slice(0, 10),
            heroCopy: artDirectorResult.heroCopy,
            designBrief: artDirectorResult.designBrief,
          })
          const retryRootSrc = renderRootTemplate(
            buildGoogleFontsUrl(chosenChassis),
            retryOgMeta,
            countArchivedDesigns()
          )
          await writeFile(path.join(ROOT, 'app/routes/__root.tsx'), retryRootSrc, 'utf8')
          console.log('  [chassis] regenerated __root.tsx after codegen retry (og meta refreshed)')
        } catch (rootErr) {
          console.warn(
            `  __root.tsx og-meta refresh after retry failed (non-blocking): ${rootErr.message}`
          )
        }
      } catch (err) {
        await cleanupOrphans(writtenPaths, originalBackup)
        await restore(originalBackup)
        throw new Error(`Art Director codegen retry failed: ${err.message}`)
      }
      const retryCodegen = validateCodegen()
      if (!retryCodegen.success) {
        await cleanupOrphans(writtenPaths, originalBackup)
        await restore(originalBackup)
        throw new Error(
          `Codegen failed after Art Director retry: ${retryCodegen.error?.slice(0, 500)}`
        )
      }
    }

    // Parse shell + measurables + composition from the final settled
    // artDirectorResult (computed here, after any codegen retry, so they
    // always reflect the live result). shellDecl (which carries
    // ground_strategy — see SHELL block) and chosenComposition are also
    // used as archive artifacts below (shell.json, composition.json).
    const { parseShellBlock, parseMeasurablesBlock } = await import('./utils/spec-blocks.js')
    const shellDecl = parseShellBlock(artDirectorResult.shell)
    const measurablesDecl = parseMeasurablesBlock(artDirectorResult.measurables)
    chosenComposition = parseCompositionBlock(artDirectorResult.composition)
    console.log(
      `  shell: nav=${shellDecl.nav} | footer=${shellDecl.footer} | lockup=${shellDecl.brand_lockup} (${shellDecl.brand_color_mode}) | ground=${shellDecl.ground_strategy}`
    )
    console.log(
      `  measurables: canvas>=${measurablesDecl.canvas_utilization_min}% color>=${measurablesDecl.color_coverage_min}% hero=${measurablesDecl.hero_scale}`
    )
    console.log(`  composition: ${formatTuple(chosenComposition).replace(/\n/g, ' | ')}`)
    console.log(
      `  composition rationale: ${(artDirectorResult.compositionRationale || '').slice(0, 200)}`
    )
    console.log(`  hero-source: ${artDirectorResult.heroSource || '(none declared)'}`)

    // -----------------------------------------------------------------------
    // Spec Critic Gate — Art Director self-check
    // -----------------------------------------------------------------------
    try {
      console.log('\n[spec-critic] Reviewing Art Director response...')
      // Trimmed to what the five checks actually use (spec ↔ preset.ts
      // consistency, hero quotability, archetype × chassis renderability,
      // self-check honesty, measurable-spec consistency): the declaration
      // blocks, the visual spec, preset.ts, and the deterministic mandates
      // the Art Director was constrained by. The full signals YAML (~4KB)
      // and last-5-days brief history (~13KB) never factored into a REVISE
      // — every historical spec-critic REVISE has been a hex/token mismatch
      // between the spec and preset.ts, not a signals- or history-driven call.
      const mandatesBlock = [
        colorMandateSection,
        shellMandateSection,
        paletteFormulaMandateSection,
        heroSourceMandateSection,
        compositionMandateSection,
      ]
        .filter(Boolean)
        .join('\n\n')

      const criticUserPrompt = [
        `## Hero Copy\n\n${artDirectorResult.heroCopy}`,
        `## Archetype\n\n${chosenArchetype || '(none declared)'}`,
        `## Composition\n\n${formatTuple(chosenComposition)}\n\n${artDirectorResult.compositionRationale || ''}`,
        `## Chassis ID\n\n${chosenChassis.id}`,
        `## Visual Specification\n\n${visualSpec}`,
        `## Self-Check\n\n${artDirectorResult.selfCheck}`,
        `## Measurables (declared floors)\n\n${artDirectorResult.measurables}`,
        `## Shell Declaration\n\n${artDirectorResult.shell}`,
        `## elements/preset.ts\n\n\`\`\`typescript\n${artDirectorResult.presetTs}\n\`\`\``,
        mandatesBlock
          ? `## Mandates (the Art Director was constrained by these)\n\n${mandatesBlock}`
          : '',
      ]
        .filter(Boolean)
        .join('\n\n---\n\n')

      const t0Critic = Date.now()
      const criticResult = await callAgent(
        'spec-critic',
        specCriticPrompt,
        criticUserPrompt,
        null,
        // Explicit stallTimeoutMs below the 10m hard timeout (same 10m/5m
        // proportion as mockup-critic) — the claude-cli.js default (15m)
        // exceeds this call's hard timeout, so a throttled-but-alive run
        // could never trip the stall check and would just ride to the cap.
        { model: modelFor('spec-critic'), stallTimeoutMs: 300000 }
      )
      const rawResponse = criticResult._rawResponse || criticResult.rationale || ''
      // Parse from the full response — _rawResponse has the ===VERDICT=== block
      // stripped, which parseCriticVerdict anchors on (it would fail closed to
      // REVISE on every response otherwise).
      const { verdict: specVerdict } = parseCriticVerdict(
        criticResult._fullResponse || rawResponse,
        'APPROVED'
      )

      trace.addStep({
        name: 'spec-critic',
        phase: 1,
        input: { specLength: visualSpec.length },
        output: {
          verdict: specVerdict,
          feedback: rawResponse.slice(0, 500),
        },
        durationMs: Date.now() - t0Critic,
      })

      verdicts.push({
        critic: 'spec-critic',
        verdict: specVerdict,
        feedback: rawResponse.slice(0, 2000),
        ts: Date.now(),
      })

      if (specVerdict === 'REVISE') {
        console.log(
          `  [spec-critic] REVISE — accepting and continuing (single point of failure: a full Art Director re-run is expensive; let the screenshot critic catch render failures)`
        )
      } else {
        console.log('  [spec-critic] APPROVED')
      }
    } catch (err) {
      console.warn(`  [spec-critic] failed (non-blocking): ${err.message}`)
    }

    // Color-scheme monitoring (warnings only)
    if (artDirectorResult.colorScheme && !artDirectorResult.colorScheme.__parse_error) {
      const { detectCoffeeShopPalette, validateSchemeAgainstPreset, validateSchemeAgainstMandate } =
        await import('./utils/color-validation.js')
      const consistency = validateSchemeAgainstPreset(
        artDirectorResult.colorScheme,
        artDirectorResult.presetTs
      )
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
    // Phase 2: mockup pipeline (reads tokens from disk)
    // -----------------------------------------------------------------------
    const presetPath = path.join(ROOT, 'elements/preset.ts')
    const tokenContext = await readFile(presetPath, 'utf8')

    const enrichedBrief = [
      `## Hero Copy (the page must execute this phrase at marquee scale)`,
      artDirectorResult.heroCopy,
      '',
      `## Hero Rationale`,
      artDirectorResult.heroRationale,
      '',
      // Structured, guaranteed-present composition declaration — every
      // downstream reader of enrichedBrief (mockup designer, react engineer,
      // screenshot critic) needs this without depending on the Art Director
      // having also restated it inside the free-text visual spec.
      `## Composition (structural declaration — execute exactly)`,
      formatTuple(chosenComposition),
      artDirectorResult.compositionRationale || '',
      '',
      `## Visual Specification (from the Art Director)`,
      visualSpec,
      '',
      `## Art Director Rationale`,
      artDirectorResult.rationale,
    ].join('\n')

    // Responsive feedback loop: inject a cautionary lesson from a recent failing build
    // into the React Engineer's prompt. Env-gated; non-blocking on failure.
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
        })
        if (lesson) {
          responsiveLesson = lesson
          if (selectedBuildId) {
            const b = history.find((x) => x.buildId === selectedBuildId)
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
              } catch {
                /* non-blocking */
              }
            }
          }
          console.log(`  responsive lesson injected from build ${selectedBuildId}`)
        }
      } catch (err) {
        console.warn(`  responsive feedback injection failed (non-blocking): ${err.message}`)
      }
    }

    // -----------------------------------------------------------------------
    // Phase 2a: Mockup Designer → 2b: Mockup Critic loop (blocking, ≤2 revisions)
    // -----------------------------------------------------------------------
    console.log('\n[phase-2a] Mockup Designer')
    const { runMockupDesigner } = await import('./agents/mockup-designer.js')
    const { runMockupCritic } = await import('./agents/mockup-critic.js')
    const { captureHtmlFileScreenshot } = await import('./utils/snapshot.js')
    const { buildLessonsBlock } = await import('./utils/lessons.js')

    const mockupDesignerPromptRaw = await readFile(
      path.join(promptDir, 'mockup-designer.md'),
      'utf8'
    )
    const mockupCriticPromptRaw = await readFile(path.join(promptDir, 'mockup-critic.md'), 'utf8')
    const mockupCriticSystemPrompt = `${mockupCriticPromptRaw}\n\n## Design Critique Heuristics\n\n${refCritique}`

    // polish.md is ALWAYS loaded for the designer — but in the USER prompt
    // (12.1KB; keeps the system prompt under the CLI 2.1.92 ~56KB failure
    // zone). bolder.md is conditional on a committed/drenched color stance;
    // overdrive.md is NOT loaded (size cap); refResponsive is NOT appended —
    // its rules are already salvaged into mockup-designer.md's Responsive
    // section.
    const refPolish = await readFile(path.join(refDir, 'polish.md'), 'utf8')
    const colorStory =
      JSON.stringify(artDirectorResult.colorScheme || {}).toLowerCase() + visualSpec.toLowerCase()
    const isCommitted = /drench|committed|saturat|maximal/.test(colorStory)
    const conditionalRefs = []
    if (isCommitted) {
      conditionalRefs.push(await readFile(path.join(refDir, 'bolder.md'), 'utf8'))
    }
    const {
      lane: chosenLane,
      laneCount,
      forbidden: forbiddenLanes,
    } = selectLane({
      archiveDir,
      date: buildDate,
      tuple: chosenComposition,
    })
    console.log(
      `  injecting lane: ${chosenLane.id} (register: ${chosenLane.register}, ${laneCount} lanes` +
        (forbiddenLanes.includes(chosenLane.id) ? ', forbidden but strongest affinity match' : '') +
        `); conditional refs: ${conditionalRefs.length}`
    )
    const mockupDesignerSystemPrompt = [
      mockupDesignerPromptRaw.replace('<!-- SEED_ANCHOR -->', chosenLane.body),
      brandRegisterDeclaration,
      refTypography,
      refColor,
      refSpatial,
      ...conditionalRefs,
      brandContract,
    ].join('\n\n')
    console.log(
      `  mockup-designer system prompt: ${(mockupDesignerSystemPrompt.length / 1024).toFixed(0)}KB`
    )
    if (mockupDesignerSystemPrompt.length > 55 * 1024) {
      // Fail fast rather than let the CLI emit a 0KB mockup near the ~56KB
      // ceiling (the failure that pinned us to 2.1.92). Restore + throw so
      // the day's run rolls back cleanly instead of shipping nothing.
      await restore(originalBackup)
      throw new Error(
        `mockup-designer system prompt is ${(mockupDesignerSystemPrompt.length / 1024).toFixed(0)}KB — over the 55KB ceiling (CLI 2.1.92 fails ~56KB). Trim a reference doc.`
      )
    }

    // Calibration: best recent owner grade as a text note (screenshots would
    // blow the prompt budget; the graded bar carries the value).
    let calibrationNote = ''
    try {
      const { readRecentRatings } = await import('./utils/ratings.js')
      const rated = readRecentRatings(path.join(ROOT, 'archive'), { lookbackDays: 30 })
      const best = rated.find((r) => r.grade === 'A') || rated.find((r) => r.grade === 'B')
      if (best)
        calibrationNote = `## Calibration\n\nThe owner graded ${best.date} an ${best.grade}${best.worked ? ` — what worked: ${best.worked}` : ''}. That is the execution bar.`
    } catch {
      /* non-blocking */
    }

    const lessonsBlock = buildLessonsBlock(path.join(ROOT, 'archive'), { limit: 7 })
    const compositionContractBlock = buildCompositionContractBlock(chosenComposition) || ''
    const brandSvg = await readFile(path.join(ROOT, 'app/assets/logo.svg'), 'utf8')
    const brandMonoSvg = await readFile(path.join(ROOT, 'app/assets/logo-mono.svg'), 'utf8')
    const googleFontsUrl = buildGoogleFontsUrl(chosenChassis)

    const mockupPath = path.join(ROOT, 'signals', 'today.mockup.html')
    const mockupCtxBase = {
      enrichedBrief,
      tokenContext,
      contentSummary,
      measurables: artDirectorResult.measurables,
      shell: artDirectorResult.shell,
      brandSvg,
      brandMonoSvg,
      googleFontsUrl,
      lessonsBlock,
      calibrationNote,
      compositionContractBlock,
      tasteMemoryBlock,
      polishRef: refPolish,
      systemPrompt: mockupDesignerSystemPrompt,
      failureDumpPath: path.join(ROOT, 'signals', 'mockup-designer-last-failed.txt'),
    }

    let mockup
    let mockupScreenshot = null
    let revisionFeedback = ''
    const MAX_MOCKUP_REVISIONS = 2
    for (let round = 0; round <= MAX_MOCKUP_REVISIONS; round++) {
      const t0Mockup = Date.now()
      try {
        mockup = await runMockupDesigner({ ...mockupCtxBase, revisionFeedback })
      } catch (err) {
        if (round > 0 && mockup) {
          // A revision round crashed but a previous round produced a complete
          // mockup — don't throw away a viable design over a failed polish
          // pass. mockup/mockupScreenshot still hold the previous round.
          console.warn(
            `  Mockup Designer revision failed (round ${round}, non-blocking — proceeding with previous mockup): ${err.message}`
          )
          break
        }
        console.error(`  Mockup Designer failed (round ${round}): ${err.message}`)
        await restore(originalBackup)
        throw new Error(`Mockup Designer failed: ${err.message}`)
      }
      await writeFile(mockupPath, mockup.mockupHtml, 'utf8')

      console.log(`\n[phase-2b] Mockup Critic (round ${round})`)
      try {
        mockupScreenshot = await captureHtmlFileScreenshot(mockupPath, { width: 1440, height: 900 })
      } catch (err) {
        console.warn(`  mockup screenshot failed (non-blocking — skipping critic): ${err.message}`)
        // Don't let an earlier round's screenshot masquerade as this mockup —
        // a stale image would become the fidelity target and archive artifact.
        mockupScreenshot = null
        break
      }
      let critique
      try {
        critique = await runMockupCritic({
          systemPrompt: mockupCriticSystemPrompt,
          screenshotBuffer: mockupScreenshot.jpeg,
          enrichedBrief,
          measurables: artDirectorResult.measurables,
          shell: artDirectorResult.shell,
        })
      } catch (err) {
        console.warn(`  mockup critic failed (non-blocking — accepting mockup): ${err.message}`)
        break
      }
      verdicts.push({
        critic: 'mockup-critic',
        round,
        verdict: critique.verdict,
        feedback: critique.feedback.slice(0, 2000),
        ts: Date.now(),
      })
      trace.addStep({
        name: 'mockup-critic',
        phase: 2,
        input: { round },
        output: { verdict: critique.verdict, feedback: critique.feedback.slice(0, 500) },
        durationMs: Date.now() - t0Mockup,
      })
      if (critique.verdict === 'APPROVE') {
        console.log('  [mockup-critic] APPROVE')
        break
      }
      if (
        critique.verdict === 'REVISE' &&
        critique.feedback.startsWith('malformed critic response')
      ) {
        // The critic's fail-closed REVISE on a malformed response carries no
        // usable feedback — don't burn an Opus revision round on garbage.
        // Treated like a critic crash: accept the mockup (the malformed
        // response is still recorded in verdicts.json above).
        console.warn('  [mockup-critic] malformed response (non-blocking — accepting mockup)')
        break
      }
      if (round === MAX_MOCKUP_REVISIONS) {
        console.warn(
          `  [mockup-critic] still REVISE after ${MAX_MOCKUP_REVISIONS} revisions — proceeding with latest mockup; findings persist to lessons via verdicts.json`
        )
        break
      }
      if (pastDeadline()) {
        console.warn('  [deadline] run budget exhausted — proceeding with latest mockup')
        break
      }
      console.log(`  [mockup-critic] REVISE — feeding back to designer`)
      revisionFeedback = critique.feedback
    }

    // -----------------------------------------------------------------------
    // Phase 2c: React Engineer — translate the approved mockup to TSX
    // -----------------------------------------------------------------------
    console.log('\n[phase-2c] React Engineer')
    const reactEngineerPromptRaw = await readFile(path.join(promptDir, 'react-engineer.md'), 'utf8')
    const reactEngineerSystemPrompt = `${reactEngineerPromptRaw}\n\n${designSystemRef}${brandRegisterDeclaration}`

    const buildEngineerUserPrompt = () =>
      [
        '## Approved Mockup (mockup.html — your fidelity target)\n\n```html\n' +
          mockup.mockupHtml +
          '\n```',
        `## Interior Notes (how About/Work adapt the system)\n\n${mockup.interiorNotes}`,
        `## Design Tokens (elements/preset.ts)\n\n\`\`\`typescript\n${tokenContext}\n\`\`\``,
        `## Hero Copy\n\n${artDirectorResult.heroCopy}`,
        `## Composition\n\n${formatTuple(chosenComposition)}`,
        `## Shell Declaration\n\n${artDirectorResult.shell}`,
        '## One-line Design Brief (for og:description context)\n\n' +
          (artDirectorResult.designBrief || ''),
        responsiveLesson
          ? `## Responsive Lesson (recent failure to avoid)\n\n${responsiveLesson}`
          : '',
        // The engineer previously received zero historical feedback despite
        // being the agent screenshot-critic failures usually blame — same
        // capped block the mockup designer sees.
        lessonsBlock,
      ]
        .filter(Boolean)
        .join('\n\n---\n\n')

    // Single source of truth for invoking the React Engineer. The
    // screenshot-critic retry and the Phase 5 retry both reference this, so
    // model/timeout choices can't drift out of sync with each other.
    const reactEngineerAgentConfig = {
      prompt: reactEngineerSystemPrompt,
      user: buildEngineerUserPrompt,
      options: { model: modelFor('react-engineer'), timeoutMs: 1800000, stallTimeoutMs: 480000 },
    }

    const engineerUserPrompt = buildEngineerUserPrompt()

    let engineerResult
    const t0Engineer = Date.now()
    try {
      engineerResult = await callAgent(
        'react-engineer',
        reactEngineerSystemPrompt,
        engineerUserPrompt,
        null,
        reactEngineerAgentConfig.options
      )
    } catch (err) {
      // A 0KB stall is usually transient (a throttled account, a flaky CLI
      // turn) rather than a bad prompt — it shouldn't throw away the whole
      // run (AD + 3 mockup rounds) when one more attempt often succeeds.
      // Retry ONCE on a stall, unless we're already past the run deadline.
      const isStall = /stalled|0KB|no output/i.test(err.message)
      if (isStall && !pastDeadline()) {
        console.warn(`  React Engineer stalled (${err.message}) — retrying once`)
        noteRetry()
        try {
          engineerResult = await callAgent(
            'react-engineer',
            reactEngineerSystemPrompt,
            engineerUserPrompt,
            null,
            reactEngineerAgentConfig.options
          )
        } catch (retryErr) {
          console.error(`  React Engineer failed after stall retry: ${retryErr.message}`)
          await restore(originalBackup)
          throw new Error(`React Engineer failed after stall retry: ${retryErr.message}`)
        }
      } else {
        console.error(`  React Engineer failed: ${err.message}`)
        await restore(originalBackup)
        throw new Error(`React Engineer failed: ${err.message}`)
      }
    }

    // Enforce that ALL required files are present. The most common failure
    // mode is the engineer omitting Layout.tsx or Sidebar.tsx, which silently
    // preserves yesterday's nav and causes the "designs all look the same"
    // complaint. Retry once if any is missing.
    const REQUIRED_FILES = [
      'app/components/Layout.tsx',
      'app/components/Sidebar.tsx',
      'app/routes/index.tsx',
      'app/routes/about.tsx',
      'app/routes/work.$slug.tsx',
      'app/routes/og.tsx',
    ]
    const producedPaths = new Set(engineerResult.files.map((f) => f.path))
    const missing = REQUIRED_FILES.filter((p) => !producedPaths.has(p))
    if (missing.length > 0 && pastDeadline()) {
      console.warn(
        `  ⚠ React Engineer omitted required files: ${missing.join(', ')} — [deadline] run budget exhausted, skipping retry and proceeding with original output`
      )
    } else if (missing.length > 0) {
      console.warn(
        `  ⚠ React Engineer omitted required files: ${missing.join(', ')} — retrying with explicit reminder`
      )
      noteRetry()
      const reminderPrompt = `${engineerUserPrompt}\n\n---\n\n## REQUIRED FILES MISSING — RETRY\n\nYour previous response omitted these required files: ${missing.join(', ')}\n\nThis silently preserves yesterday's chrome and breaks the day's archetype. Re-emit your COMPLETE response. Every required file must appear, including these you missed:\n${missing.map((m) => `- ${m}`).join('\n')}`
      try {
        const retry = await callAgent(
          'react-engineer',
          reactEngineerSystemPrompt,
          reminderPrompt,
          null,
          reactEngineerAgentConfig.options
        )
        const retryProduced = new Set(retry.files.map((f) => f.path))
        const stillMissing = REQUIRED_FILES.filter((p) => !retryProduced.has(p))
        if (stillMissing.length === 0) {
          engineerResult = retry
          console.log(`  ✓ retry produced all required files`)
        } else {
          console.warn(
            `  ⚠ retry still missing ${stillMissing.join(', ')} — proceeding with original output`
          )
        }
      } catch (err) {
        console.warn(`  ⚠ retry failed: ${err.message} — proceeding with original output`)
      }
    }

    // shell_posture: none means "no nav element at all" (see
    // utils/composition-grammar.js) — a structural declaration, not a
    // suggestion. The React Engineer can still emit a <nav> out of habit;
    // catch it deterministically rather than trusting the prompt alone.
    const postureViolation = findShellPostureViolation(
      engineerResult.files,
      chosenComposition.shell_posture
    )
    if (postureViolation && pastDeadline()) {
      console.warn(`  ⚠ ${postureViolation} — [deadline] run budget exhausted, skipping retry`)
    } else if (postureViolation) {
      console.warn(`  ⚠ ${postureViolation} — retrying with explicit reminder`)
      noteRetry()
      const postureReminderPrompt = `${engineerUserPrompt}\n\n---\n\n## SHELL POSTURE VIOLATION — RETRY\n\n${postureViolation}\n\n\`shell_posture: none\` means no <nav> element anywhere in the output — navigation happens through in-content links only. Re-emit your COMPLETE response with every <nav> removed.`
      try {
        const retry = await callAgent(
          'react-engineer',
          reactEngineerSystemPrompt,
          postureReminderPrompt,
          null,
          reactEngineerAgentConfig.options
        )
        const stillViolating = findShellPostureViolation(
          retry.files,
          chosenComposition.shell_posture
        )
        if (!stillViolating) {
          engineerResult = retry
          console.log(`  ✓ retry removed the nav element`)
        } else {
          console.warn(
            `  ⚠ retry still violates shell_posture: none — proceeding with original output`
          )
        }
      } catch (err) {
        console.warn(`  ⚠ retry failed: ${err.message} — proceeding with original output`)
      }
    }

    // Write all files
    for (const p of await writeFiles(engineerResult.files)) writtenPaths.add(p)

    trace.addStep({
      name: 'react-engineer',
      phase: 3,
      input: {
        tokenContext: tokenContext.length,
        briefLength: enrichedBrief.length,
        mockupLength: mockup.mockupHtml.length,
      },
      output: {
        files: engineerResult.files.map((f) => f.path),
        rationale: (engineerResult.rationale || '').slice(0, 500),
      },
      durationMs: Date.now() - t0Engineer,
    })

    // Verify Layout.tsx was written (critical for the site to function)
    const layoutPath = path.join(ROOT, 'app/components/Layout.tsx')
    if (!existsSync(layoutPath)) {
      await cleanupOrphans(writtenPaths, originalBackup)
      await restore(originalBackup)
      throw new Error('React Engineer did not produce Layout.tsx — site cannot function without it')
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

    // Shared success epilogue for the first-pass and Phase-5 retry paths:
    // archive artifacts, persist the archetype, shape the return value.
    // Behavior is identical between callers apart from the rationale suffix.
    async function archiveAndReturn(filesResult, rationaleSuffix = '') {
      // Capture the runtime-generated /og card to public/og/<date>.png so it
      // serves at the og:image URL injected into __root.tsx. Best-effort: a
      // missing og.tsx or a capture failure must never block shipping.
      if (signals.date) {
        try {
          const { captureRouteScreenshot } = await import('./utils/snapshot.js')
          const ogBuffer = await captureRouteScreenshot('/og')
          const ogDir = path.join(ROOT, 'public', 'og')
          await mkdir(ogDir, { recursive: true })
          await writeFile(path.join(ogDir, `${signals.date}.png`), ogBuffer)
          console.log(
            `  [og] captured public/og/${signals.date}.png (${(ogBuffer.length / 1024).toFixed(0)}KB)`
          )
        } catch (err) {
          console.warn(`  [og] capture failed (non-blocking): ${err.message}`)
        }
      }

      const allFiles = [...tokenResult.files, ...filesResult.files]
      const changedPaths = allFiles.map((f) => f.path)

      const rationale = tokenResult.rationale || `Agent swarm redesign${rationaleSuffix}`
      const designBrief = tokenResult.design_brief || `Multi-agent redesign${rationaleSuffix}`

      await archive(
        signals.date,
        signals,
        rationale,
        designBrief,
        changedPaths,
        // The weights this run actually used. Passing {} here meant archiver.js
        // fell back to `?? 5` for all four and wrote those into build.json, so
        // every archived night claimed the defaults — including the risk value
        // derived from the build date, which is the whole point of the dial.
        // Any later "did risk 9 produce better designs" reading was fiction.
        weights,
        tokenResult.color_scheme ?? null,
        chosenArchetype ?? null,
        {
          'screenshot.png': finalScreenshot?.png ?? null,
          'screenshot-dark.png': finalScreenshot?.darkPng ?? null,
          'mockup.html': mockup?.mockupHtml ?? null,
          'mockup-screenshot.png': mockupScreenshot?.png ?? null,
          'verdicts.json': JSON.stringify(verdicts, null, 2),
          'shell.json': JSON.stringify(shellDecl, null, 2),
          'hero-source.json': JSON.stringify(
            { source: artDirectorResult.heroSource || null },
            null,
            2
          ),
          'composition.json': JSON.stringify(chosenComposition, null, 2),
          'lane.json': JSON.stringify(
            { laneId: chosenLane.id, register: chosenLane.register },
            null,
            2
          ),
        }
      )
      archiveRan = true

      // Save the descriptive archetype label, when the Art Director supplied
      // one, purely for archive continuity — it is never validated or
      // enforced. The load-bearing structural record is composition.json.
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
    // Screenshot Critic Gate — shared by the first-pass and Phase-5 retry
    // success paths. Mutates the enclosing `engineerResult` and
    // `finalScreenshot` directly. `passingBackup` is the snapshot of the
    // on-disk passing state to restore if a post-critic revision breaks the
    // build (the caller takes it right after its successful build).
    // -----------------------------------------------------------------------
    async function runScreenshotCriticGate(passingBackup) {
      try {
        console.log('\n[screenshot-critic] Capturing screenshot...')
        const { captureScreenshot } = await import('./utils/snapshot.js')
        const screenshotBuffer = await captureScreenshot()
        finalScreenshot = screenshotBuffer
        console.log(
          `  screenshot captured (png ${(screenshotBuffer.png.length / 1024).toFixed(0)}KB, jpeg ${(screenshotBuffer.jpeg.length / 1024).toFixed(0)}KB)`
        )

        console.log('[screenshot-critic] Evaluating design...')
        // Real image blocks via the SDK when an API key is present. Inlining
        // these JPEGs as base64 data-URIs in a CLI text prompt billed ~300k
        // tokens per image and the model never saw the pixels (a solid-red
        // probe read back as "light gray"). Three image blocks are ~5k tokens.
        const { callVisionAgent } = await import('./utils/vision-router.js')
        const { buildScreenshotCriticBlocks } = await import('./agents/screenshot-critic.js')
        const { findBestRatedReference } = await import('./utils/ratings.js')
        const { parseBarLine } = await import('./utils/critic-verdict.js')

        // Self-eval calibration: attach the owner's highest-rated past own
        // build alongside today's render, when one has been auto-promoted
        // into references/ (collect-ratings.js, grade A/B). Best-effort —
        // a missing/unreadable reference just means no calibration question.
        let bestReference = null
        try {
          const found = findBestRatedReference(path.join(ROOT, 'references'))
          if (found) {
            bestReference = { buffer: await readFile(found.path), description: found.description }
            console.log(
              `  [screenshot-critic] calibrating against ${found.file} (grade ${found.grade})`
            )
          }
        } catch (err) {
          console.warn(
            `  [screenshot-critic] best-rated reference lookup failed (non-blocking): ${err.message}`
          )
        }

        const criticBlocks = buildScreenshotCriticBlocks({
          // enrichedBrief carries hero copy, rationale, and the full visual
          // spec. The nightly context has no `brief` key, so the old
          // `${brief}` here rendered the literal string "undefined".
          enrichedBrief,
          references,
          mockupScreenshot,
          screenshotBuffer,
          bestReference,
        })

        const t0ScreenshotCritic = Date.now()
        // Which channel answered. A SHIP reached without pixels is a
        // different claim from one reached with them, so verdicts.json says
        // which it was.
        let visionChannel = 'unknown'
        const criticResponse = await callVisionAgent({
          agentName: 'screenshot-critic',
          systemPrompt: screenshotCriticPrompt,
          contentBlocks: criticBlocks,
          // See spec-critic above: explicit stallTimeoutMs below the 10m
          // hard timeout so the CLI fallback path can't ride the
          // claude-cli.js default (15m) stall window past its own cap.
          // The SDK path uses timeoutMs only.
          timeoutMs: 600000,
          stallTimeoutMs: 300000,
          onChannel: (c) => {
            visionChannel = c
          },
        })
        if (visionChannel !== 'sdk-vision') {
          console.warn(
            `  [screenshot-critic] verdict reached WITHOUT images (${visionChannel}) — it did not see the design`
          )
        }
        const { verdict: screenshotVerdict } = parseCriticVerdict(criticResponse, 'SHIP')
        // BAR is only expected when a reference image was actually attached;
        // parseBarLine is tolerant regardless — absent is fine either way.
        const bar = bestReference ? parseBarLine(criticResponse) : null
        if (bar) console.log(`  [screenshot-critic] BAR: ${bar.position} — ${bar.reason}`)

        verdicts.push({
          critic: 'screenshot-critic',
          verdict: screenshotVerdict,
          feedback: criticResponse.slice(0, 2000),
          channel: visionChannel,
          ts: Date.now(),
          ...(bar ? { bar } : {}),
        })

        trace.addStep({
          name: 'screenshot-critic',
          phase: 4,
          input: {},
          output: {
            verdict: screenshotVerdict,
            feedback: criticResponse.slice(0, 500),
          },
          durationMs: Date.now() - t0ScreenshotCritic,
        })

        if (screenshotVerdict === 'REVISE') {
          const agentMatch = criticResponse.match(/\*\*Responsible agent:\*\*\s*([\w-]+)/)
          const responsibleAgent = agentMatch?.[1] || 'react-engineer'
          // Take the FEEDBACK block if the critic emitted one, as
          // parseMockupCriticResponse already does. The old form stripped the
          // first literal "REVISE" anywhere in the prose, so a critic writing
          // "REVISE the hero scale" sent the engineer "the hero scale".
          const feedbackBlock = criticResponse.match(
            /===FEEDBACK===\s*\n([\s\S]*?)(?:===END===|$)/
          )?.[1]
          const feedback = (
            feedbackBlock ??
            criticResponse
              .replace(/===VERDICT===/, '')
              .replace(/===END===/, '')
              .replace(/^\s*REVISE\b/m, '')
          ).trim()

          console.log(`  [screenshot-critic] REVISE — responsible: ${responsibleAgent}`)
          console.log(`  feedback: ${feedback.slice(0, 200)}...`)

          // Shared reactEngineerAgentConfig keeps this retry path in sync
          // with the primary react-engineer invocation (Phase 2c).
          const agentConfig = {
            'react-engineer': reactEngineerAgentConfig,
          }

          const config = agentConfig[responsibleAgent]
          if (config && pastDeadline()) {
            console.warn(
              `  [deadline] run budget exhausted — skipping ${responsibleAgent} revision, shipping as-is`
            )
          } else if (config) {
            console.log(`  retrying ${responsibleAgent} with critic feedback...`)
            noteRetry()
            // The retry result replaces engineerResult so the archive records
            // what's actually on disk; keep the passing result to fall back to.
            const passingEngineerResult = engineerResult
            try {
              const retryResult = await callAgent(
                responsibleAgent,
                config.prompt,
                config.user(),
                feedback,
                config.options
              )
              for (const p of await writeFiles(retryResult.files)) writtenPaths.add(p)
              engineerResult = retryResult

              const retryBuild = validateBuild()
              if (!retryBuild.success) {
                console.warn(
                  '  post-critic revision broke the build — restoring known-passing state'
                )
                // Restore the snapshot taken right after the first passing
                // build — NOT originalBackup. cleanupOrphans against the same
                // snapshot deletes any paths the failed revision invented
                // beyond it.
                await cleanupOrphans(writtenPaths, passingBackup)
                await restore(passingBackup)
                engineerResult = passingEngineerResult

                // Prove the restored state actually rebuilds — falling
                // through to archive() on faith is how broken hybrids ship.
                const restoredBuild = validateBuild()
                if (!restoredBuild.success) {
                  await cleanupOrphans(writtenPaths, originalBackup)
                  await restore(originalBackup)
                  const fatal = new Error(
                    `Restore of passing state failed to rebuild after post-critic revision. Error:\n${restoredBuild.error?.slice(0, 1000)}`
                  )
                  fatal.fatal = true
                  throw fatal
                }
                console.log('  known-passing state restored and re-validated')
              } else {
                console.log('  post-critic revision build passed')
                // Re-capture so the persisted screenshot reflects the revised
                // render, not the pre-revision one the critic rejected.
                try {
                  const { captureScreenshot: captureScreenshotAfterRevision } = await import(
                    './utils/snapshot.js'
                  )
                  finalScreenshot = await captureScreenshotAfterRevision()
                } catch (recapErr) {
                  console.warn(`  screenshot re-capture failed (non-blocking): ${recapErr.message}`)
                }
              }
            } catch (err) {
              if (err.fatal) throw err
              console.warn(`  ${responsibleAgent} revision failed (non-blocking): ${err.message}`)
              // A mid-batch writeFiles abort can leave a partial hybrid on
              // disk — put the known-passing state back before shipping.
              await cleanupOrphans(writtenPaths, passingBackup)
              await restore(passingBackup)
              engineerResult = passingEngineerResult
            }
          }
        } else {
          console.log('  [screenshot-critic] SHIP')
        }
      } catch (err) {
        if (err.fatal) throw err
        console.warn(`  [screenshot-critic] Failed (non-blocking): ${err.message}`)
        console.warn('  Shipping without screenshot review')
      }
    }

    if (buildResult.success) {
      console.log('\n=== Build passed! ===')

      // Snapshot the exact on-disk passing state (mutable files plus any extra
      // paths the agents wrote). If a post-critic revision breaks the build we
      // restore THIS — originalBackup holds yesterday's files, incompatible
      // with today's preset.ts.
      const passingBackup = await backup([...new Set([...MUTABLE_FILES, ...writtenPaths])])
      await runScreenshotCriticGate(passingBackup)
      // MUST await: a bare `return promise` inside this try/finally lets the
      // finally (saveTrace) run while archiveAndReturn is still archiving —
      // archiveRan is still false, so a successful run writes a phantom
      // build-failed-* trace dir (observed 2026-07-10).
      return await archiveAndReturn(engineerResult)
    }

    // -----------------------------------------------------------------------
    // Phase 5: Build failed — identify failing agent and retry
    // -----------------------------------------------------------------------
    console.log('\n[phase-5] Build failed — retrying failing agent(s)')

    const failingAgent = identifyFailingAgent(buildResult.error)
    console.log(`  identified failing agent: ${failingAgent}`)

    // Restore only the failing agent's files. Art Director files are
    // intentionally NEVER restored here — by design (see retryAgents comment
    // below), build failures involving preset.ts are handled by the React
    // Engineer adapting to today's tokens, not by reverting the preset and
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
    // callAgent site. react-engineer shares reactEngineerAgentConfig with the
    // primary Phase 2c invocation so the configs can't drift apart.
    const agentConfig = {
      'react-engineer': reactEngineerAgentConfig,
    }

    // Build failures are almost always in the React Engineer's TSX.
    // The Art Director's preset.ts is validated by codegen earlier in
    // the pipeline, so a build failure on preset.ts at this stage means
    // a downstream typing problem — best handled by React Engineer
    // retry rather than full Art Director re-run (which is more expensive).
    const retryAgents = ['react-engineer']

    for (const agent of retryAgents) {
      const config = agentConfig[agent]
      if (!config) continue

      console.log(`\n  retrying ${agent} with build error context...`)
      noteRetry()
      try {
        const retryResult = await callAgent(
          agent,
          config.prompt,
          config.user(),
          buildResult.error,
          config.options
        )
        for (const p of await writeFiles(retryResult.files)) writtenPaths.add(p)
        // Update the result so the archive records the retry output, not stale originals
        if (agent === 'react-engineer') engineerResult = retryResult
      } catch (err) {
        console.error(`  ${agent} retry failed: ${err.message}`)
        // If the retry agent itself crashed, don't silently continue to
        // validateBuild — bail out with the real error so debugging points
        // at the actual cause (code review #14).
        await archiveFailedSources(writtenPaths)
        await cleanupOrphans(writtenPaths, originalBackup)
        await restore(originalBackup)
        throw new Error(`${agent} retry crashed: ${err.message}`)
      }
    }

    // Re-validate
    const retryBuild = validateBuild()
    if (retryBuild.success) {
      console.log('\n=== Retry build passed! ===')
      const passingBackup = await backup([...new Set([...MUTABLE_FILES, ...writtenPaths])])
      await runScreenshotCriticGate(passingBackup)
      return await archiveAndReturn(engineerResult, ' (retry)') // await required — see first-pass call site
    }

    // All retries exhausted — snapshot the failing sources, then restore and throw
    await archiveFailedSources(writtenPaths)
    await cleanupOrphans(writtenPaths, originalBackup)
    await restore(originalBackup)
    throw new Error(`Build failed after retry. Error:\n${retryBuild.error?.slice(0, 2500)}`)
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
