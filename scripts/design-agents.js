#!/usr/bin/env node

/**
 * Designer Agent Swarm Orchestrator
 *
 * Dispatches 3 specialized Claude CLI agents sequentially:
 *   1. Token Designer  — elements/preset.ts, app/routes/__root.tsx
 *   2. Structure Agent  — Layout, Sidebar, MobileFooter, 3 routes
 *   3. Component Agent  — 9 data-display components
 *
 * Each agent gets the creative brief, relevant reference files, and (after
 * Phase 1) the design tokens from preset.ts. Build validation and retry
 * logic ensure the final output compiles.
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { readFile } from 'fs/promises'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { spawnSync } from 'child_process'
import { callClaudeCLI } from './utils/claude-cli.js'
import {
  MUTABLE_FILES,
  TOKEN_FILES,
  LAYOUT_FILES,
  SIDEBAR_FILES,
  FOOTER_FILES,
  STRUCTURE_FILES,
  COMPONENT_FILES,
  readFileGroup,
  readContext,
} from './utils/site-context.js'
import { backup, writeFiles, restore, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maps every mutable file to exactly one agent name. */
export const FILE_OWNERSHIP = Object.fromEntries([
  ...TOKEN_FILES.map(f => [f, 'token-designer']),
  ...LAYOUT_FILES.map(f => [f, 'layout-architect']),
  ...SIDEBAR_FILES.map(f => [f, 'sidebar-designer']),
  ...FOOTER_FILES.map(f => [f, 'footer-designer']),
  ...COMPONENT_FILES.map(f => [f, 'component-agent']),
])

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

  // Section 2: Design Tokens (only for structure-agent and component-agent)
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
 * @returns {'token-designer'|'structure-agent'|'component-agent'|'both'}
 */
export function identifyFailingAgent(errorOutput) {
  const agents = new Set()

  for (const [filePath, agent] of Object.entries(FILE_OWNERSHIP)) {
    if (errorOutput.includes(filePath)) {
      agents.add(agent)
    }
  }

  if (agents.size === 0) return 'both'
  if (agents.has('token-designer')) return 'token-designer'
  if (agents.size === 1) return [...agents][0]
  return 'both'
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
 * @returns {Promise<{ files: Array<{path: string, content: string}>, rationale?: string, design_brief?: string }>}
 */
async function callAgent(agentName, systemPrompt, userPrompt, buildError) {
  let fullPrompt = userPrompt

  if (buildError) {
    fullPrompt += `\n\n---\n\nThe previous attempt failed with this build error:\n\n${buildError}\n\nPlease fix the issues and try again.`
  }

  fullPrompt += `\n\n---\n\nIMPORTANT: Use the ===FILE:path=== delimiter format described in your instructions. Write complete file contents after each delimiter. No JSON, no markdown code fences, no explanation — just the delimiters and raw file content.`

  const result = await callClaudeCLI(agentName, systemPrompt, fullPrompt, {
    timeoutMs: 600000, // 10 minutes
  })

  // Parse response — supports delimiter format, visual spec format, and JSON
  let parsed

  if (result.includes('===VISUAL_SPEC===')) {
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
 * Run the 5-agent design swarm.
 *
 * Phase 1: Token Designer (preset.ts + __root.tsx)
 * Phase 2: Layout Architect (Layout.tsx + 3 routes) — reads tokens from disk
 * Phase 3: Sidebar Designer + Footer Designer + Component Agent (parallel) — read Layout.tsx + tokens
 *
 * @param {{ signals: object, brief: string, contentSummary: string }} context
 * @returns {Promise<{ rationale: string, design_brief: string, files: Array<{path: string, content: string}> }>}
 */
export async function runAgentSwarm(context) {
  const { signals, brief, contentSummary } = context

  // Read all prompts and libraries
  const promptDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'prompts')
  const [
    directorPromptRaw,
    specCriticPromptRaw,
    tokenPromptRaw, layoutPromptRaw, sidebarPromptRaw, footerPromptRaw, componentPromptRaw,
    designSystemRef, libTypography, libColor, libLayout, libComponents, libComposition,
  ] = await Promise.all([
    readFile(path.join(promptDir, 'design-director.md'), 'utf8'),
    readFile(path.join(promptDir, 'spec-critic.md'), 'utf8'),
    readFile(path.join(promptDir, 'token-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'structure-agent.md'), 'utf8'),
    readFile(path.join(promptDir, 'sidebar-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'footer-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'component-agent.md'), 'utf8'),
    readFile(path.join(promptDir, 'design-system-reference.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-typography.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-color.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-layout.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-components.md'), 'utf8'),
    readFile(path.join(promptDir, 'library-composition.md'), 'utf8'),
  ])

  const specCriticPrompt = specCriticPromptRaw

  // Build system prompts with relevant libraries appended
  const directorSystemPrompt = `${directorPromptRaw}\n\n${libTypography}\n\n${libColor}\n\n${libLayout}\n\n${libComposition}`
  const tokenSystemPrompt = `${tokenPromptRaw}\n\n${libTypography}\n\n${libColor}`
  const layoutSystemPrompt = `${layoutPromptRaw}\n\n${libLayout}\n\n${libComposition}\n\n${designSystemRef}`
  const sidebarSystemPrompt = `${sidebarPromptRaw}\n\n${designSystemRef}`
  const footerSystemPrompt = `${footerPromptRaw}\n\n${designSystemRef}`
  const componentSystemPrompt = `${componentPromptRaw}\n\n${libComponents}\n\n${designSystemRef}`

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
      .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort().reverse().slice(0, 5)
    for (const dir of dirs) {
      const briefPath = path.join(archiveDir, dir, 'brief.md')
      if (existsSync(briefPath)) {
        recentBriefs += `\n### ${dir}\n${readFileSync(briefPath, 'utf8')}\n`
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

  // -----------------------------------------------------------------------
  // Phase 0: Design Director — produces a visual specification
  // -----------------------------------------------------------------------
  console.log('\n[phase-0] Design Director')

  const directorUserPrompt = buildAgentPrompt('design-director', {
    brief,
    referenceFiles: [],
    tokenContext: null,
  }) + (recentBriefs ? '\n\n## Recent Archive Briefs\n' + recentBriefs : '')
    + (references ? '\n\n## Design References\n\n' + references : '')

  let visualSpec = ''
  try {
    const directorResult = await callAgent('design-director', directorSystemPrompt, directorUserPrompt)
    visualSpec = directorResult._rawResponse || directorResult.rationale || ''
    console.log(`  visual spec: ${(visualSpec.length / 1024).toFixed(0)}KB`)
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
      '## Visual Specification\n\n' + visualSpec,
      recentBriefs ? '## Recent Archive Briefs\n' + recentBriefs : '',
    ].filter(Boolean).join('\n\n---\n\n')

    const criticResult = await callAgent('spec-critic', specCriticPrompt, criticUserPrompt)
    const rawResponse = criticResult._rawResponse || criticResult.rationale || ''

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
  try {
    tokenResult = await callAgent('token-designer', tokenSystemPrompt, tokenUserPrompt)
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
      tokenResult = await callAgent('token-designer', tokenSystemPrompt, tokenUserPrompt, codegenResult.error)
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
  // Phase 2: Layout Architect (reads tokens from disk)
  // -----------------------------------------------------------------------
  const presetPath = path.join(ROOT, 'elements/preset.ts')
  const tokenContext = await readFile(presetPath, 'utf8')

  console.log('\n[phase-2] Layout Architect')

  // All downstream agents get the visual spec prepended to their brief
  const enrichedBrief = visualSpec
    ? `## Visual Specification (from Design Director)\n\n${visualSpec}\n\n---\n\n## Original Creative Brief\n\n${brief}`
    : brief

  let layoutResult = null
  const layoutUserPrompt = buildAgentPrompt('layout-architect', {
    brief: enrichedBrief,
    referenceFiles: [],
    tokenContext,
  })

  try {
    layoutResult = await callAgent('layout-architect', layoutSystemPrompt, layoutUserPrompt)
    await writeFiles(layoutResult.files)
  } catch (err) {
    console.error(`  Layout Architect failed: ${err.message}`)
    await restore(originalBackup)
    throw new Error(`Layout Architect failed: ${err.message}`)
  }

  // Verify Layout.tsx was written (downstream agents depend on it)
  const layoutPath = path.join(ROOT, 'app/components/Layout.tsx')
  if (!existsSync(layoutPath)) {
    await restore(originalBackup)
    throw new Error('Layout Architect did not produce Layout.tsx — downstream agents cannot proceed')
  }

  // -----------------------------------------------------------------------
  // Phase 3: Sidebar + Footer + Components (read Layout.tsx + tokens)
  // -----------------------------------------------------------------------
  console.log('\n[phase-3] Sidebar Designer + Footer Designer + Component Agent')

  // Read Layout.tsx so Sidebar/Footer designers can see the structure
  const layoutContent = await readFile(layoutPath, 'utf8')
  const layoutRef = [{ path: 'app/components/Layout.tsx', content: layoutContent }]

  let sidebarResult = null
  let footerResult = null
  let componentResult = null

  // Sidebar Designer
  console.log('\n  --- Sidebar Designer ---')
  const sidebarUserPrompt = buildAgentPrompt('sidebar-designer', {
    brief: enrichedBrief,
    referenceFiles: layoutRef,
    tokenContext,
  })
  try {
    sidebarResult = await callAgent('sidebar-designer', sidebarSystemPrompt, sidebarUserPrompt)
    await writeFiles(sidebarResult.files)
  } catch (err) {
    console.error(`  Sidebar Designer failed: ${err.message}`)
  }

  // Footer Designer
  console.log('\n  --- Footer Designer ---')
  const footerUserPrompt = buildAgentPrompt('footer-designer', {
    brief: enrichedBrief,
    referenceFiles: layoutRef,
    tokenContext,
  })
  try {
    footerResult = await callAgent('footer-designer', footerSystemPrompt, footerUserPrompt)
    await writeFiles(footerResult.files)
  } catch (err) {
    console.error(`  Footer Designer failed: ${err.message}`)
  }

  // Component Agent
  console.log('\n  --- Component Agent ---')
  const componentUserPrompt = buildAgentPrompt('component-agent', {
    brief: enrichedBrief,
    referenceFiles: [],
    tokenContext,
  })
  try {
    componentResult = await callAgent('component-agent', componentSystemPrompt, componentUserPrompt)
    await writeFiles(componentResult.files)
  } catch (err) {
    console.error(`  Component Agent failed: ${err.message}`)
  }

  // -----------------------------------------------------------------------
  // Phase 4: Build validation
  // -----------------------------------------------------------------------
  console.log('\n[phase-4] Build validation')
  const buildResult = validateBuild()

  if (buildResult.success) {
    console.log('\n=== Build passed! ===')

    const allFiles = [
      ...tokenResult.files,
      ...layoutResult.files,
      ...(sidebarResult?.files ?? []),
      ...(footerResult?.files ?? []),
      ...(componentResult?.files ?? []),
    ]
    const changedPaths = allFiles.map(f => f.path)

    const rationale = tokenResult.rationale || 'Agent swarm redesign'
    const designBrief = tokenResult.design_brief || 'Multi-agent redesign'

    await archive(signals.date, signals, rationale, designBrief, changedPaths)

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
    'layout-architect': { prompt: layoutSystemPrompt, user: () => buildAgentPrompt('layout-architect', { brief: enrichedBrief, referenceFiles: [], tokenContext }) },
    'sidebar-designer': { prompt: sidebarSystemPrompt, user: () => buildAgentPrompt('sidebar-designer', { brief: enrichedBrief, referenceFiles: layoutRef, tokenContext }) },
    'footer-designer': { prompt: footerSystemPrompt, user: () => buildAgentPrompt('footer-designer', { brief: enrichedBrief, referenceFiles: layoutRef, tokenContext }) },
    'component-agent': { prompt: componentSystemPrompt, user: () => buildAgentPrompt('component-agent', { brief: enrichedBrief, referenceFiles: [], tokenContext }) },
  }

  const retryAgents = failingAgent === 'both'
    ? ['layout-architect', 'sidebar-designer', 'footer-designer', 'component-agent']
    : [failingAgent]

  for (const agent of retryAgents) {
    const config = agentConfig[agent]
    if (!config) continue

    console.log(`\n  retrying ${agent} with build error context...`)
    try {
      const retryResult = await callAgent(agent, config.prompt, config.user(), buildResult.error)
      await writeFiles(retryResult.files)
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
      ...(layoutResult?.files ?? []),
      ...(sidebarResult?.files ?? []),
      ...(footerResult?.files ?? []),
      ...(componentResult?.files ?? []),
    ]
    const changedPaths = allFiles.map(f => f.path)

    const rationale = tokenResult.rationale || 'Agent swarm redesign (retry)'
    const designBrief = tokenResult.design_brief || 'Multi-agent redesign (retry)'

    await archive(signals.date, signals, rationale, designBrief, changedPaths)

    return { rationale, design_brief: designBrief, files: allFiles }
  }

  // All retries exhausted — restore everything and throw
  await restore(originalBackup)
  throw new Error(`Build failed after retry. Error:\n${retryBuild.error?.slice(0, 1000)}`)
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
