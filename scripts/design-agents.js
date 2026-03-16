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

import { readFile, writeFile, unlink } from 'fs/promises'
import { existsSync, createReadStream } from 'fs'
import { spawn } from 'child_process'
import { spawnSync } from 'child_process'
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

const PIPELINE_SETTINGS = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'pipeline-settings.json'
)

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

  fullPrompt += `\n\n---\n\nIMPORTANT: Respond with ONLY a valid JSON object matching the response format above (no markdown, no code fences, no explanation before or after). Include complete file contents — not diffs.`

  // Write prompt to temp file
  const promptPath = path.join(ROOT, `.agent-prompt-${agentName}.tmp`)
  await writeFile(promptPath, fullPrompt, 'utf8')

  console.log(`  [${agentName}] calling claude CLI...`)
  console.log(`  [${agentName}] prompt: ${(fullPrompt.length / 1024).toFixed(0)}KB`)

  const cliArgs = [
    '-p',
    '--verbose',
    '--output-format', 'stream-json',
    '--max-turns', '1',
    '--model', 'sonnet',
    '--tools', '',
    '--disable-slash-commands',
    '--settings', PIPELINE_SETTINGS,
    '--system-prompt', systemPrompt,
  ]

  // Strip ANTHROPIC_API_KEY so claude uses Max plan auth
  const cliEnv = { ...process.env }
  delete cliEnv.ANTHROPIC_API_KEY

  const result = await new Promise((resolve, reject) => {
    const child = spawn('claude', cliArgs, {
      cwd: ROOT,
      env: cliEnv,
    })

    let fullText = ''
    let finalResult = ''
    let stderr = ''
    let lineBuffer = ''
    let charCount = 0

    // Pipe prompt via stdin
    const promptStream = createReadStream(promptPath)
    child.stdin.on('error', () => {}) // swallow EPIPE
    promptStream.pipe(child.stdin)

    child.stdout.on('data', (chunk) => {
      lineBuffer += chunk.toString()
      const lines = lineBuffer.split('\n')
      lineBuffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const event = JSON.parse(line)
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'text' && block.text) {
                fullText += block.text
                const newChars = block.text.length
                charCount += newChars
                if (charCount > 0 && charCount % 2000 < newChars) {
                  console.log(`  [${agentName}] ... generating (${(charCount / 1024).toFixed(0)}KB)`)
                }
              }
            }
          } else if (event.type === 'result') {
            finalResult = event.result || ''
          }
        } catch {
          // Not valid JSON line — skip
        }
      }
    })

    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    const timeout = setTimeout(() => {
      child.kill()
      reject(new Error(`[${agentName}] timed out after 5 minutes (generated ${(charCount / 1024).toFixed(0)}KB)`))
    }, 300000) // 5 minutes

    child.on('close', (code) => {
      clearTimeout(timeout)
      // Process remaining buffer
      if (lineBuffer.trim()) {
        try {
          const event = JSON.parse(lineBuffer)
          if (event.type === 'result') finalResult = event.result || ''
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'text') fullText += block.text
            }
          }
        } catch {}
      }
      console.log(`  [${agentName}] finished (${(charCount / 1024).toFixed(0)}KB total)`)
      if (code !== 0 && !finalResult && !fullText) {
        console.error(`  [${agentName}] stderr: ${stderr.slice(0, 500)}`)
        reject(new Error(`[${agentName}] claude exited with code ${code}: ${stderr.slice(0, 500)}`))
      } else {
        resolve(finalResult || fullText)
      }
    })

    child.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })

  // Parse JSON response — handle markdown fences, preamble text, and trailing content
  let parsed
  try {
    parsed = JSON.parse(result)
  } catch {
    // Strip markdown fences (```json, ```, with optional whitespace/newlines)
    let cleaned = result
      .replace(/```(?:json|JSON)?\s*\n?/g, '')
      .replace(/\n?\s*```\s*$/g, '')
      .trim()
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      // Find the first { and last } to extract the JSON object
      const jsonStart = cleaned.indexOf('{')
      const jsonEnd = cleaned.lastIndexOf('}')
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        try {
          parsed = JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1))
        } catch (e3) {
          throw new Error(`[${agentName}] failed to parse JSON: ${e3.message}\nFirst 300 chars: ${result.slice(0, 300)}`)
        }
      } else {
        throw new Error(`[${agentName}] no JSON object found in response\nFirst 300 chars: ${result.slice(0, 300)}`)
      }
    }
  }

  // Validate files array
  if (!Array.isArray(parsed.files)) {
    throw new Error(`[${agentName}] response missing files array. Got keys: ${Object.keys(parsed).join(', ')}`)
  }

  console.log(`  [${agentName}] responded with ${parsed.files.length} files`)

  // Clean up temp file
  try { await unlink(promptPath) } catch {}

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

  // Read system prompts
  const promptDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'prompts')
  const [tokenSystemPrompt, layoutSystemPrompt, sidebarSystemPrompt, footerSystemPrompt, componentSystemPrompt] = await Promise.all([
    readFile(path.join(promptDir, 'token-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'structure-agent.md'), 'utf8'),
    readFile(path.join(promptDir, 'sidebar-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'footer-designer.md'), 'utf8'),
    readFile(path.join(promptDir, 'component-agent.md'), 'utf8'),
  ])

  // Read reference files — only Token Designer gets them (needs current preset structure).
  // Structure and Component agents do NOT receive previous file contents to prevent
  // anchoring on yesterday's design. Their technical contracts (imports, exports, prop
  // interfaces) are defined in the system prompts, not in the reference files.
  const tokenRefFiles = await readFileGroup(TOKEN_FILES)

  // Backup all mutable files
  console.log('\n[backup] Backing up mutable files...')
  const originalBackup = await backup(MUTABLE_FILES)
  console.log(`  backed up ${originalBackup.size} files`)

  // -----------------------------------------------------------------------
  // Phase 1: Token Designer
  // -----------------------------------------------------------------------
  console.log('\n[phase-1] Token Designer')

  const tokenUserPrompt = buildAgentPrompt('token-designer', {
    brief,
    referenceFiles: tokenRefFiles,
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

  let layoutResult = null
  const layoutUserPrompt = buildAgentPrompt('layout-architect', {
    brief,
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
    brief,
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
    brief,
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
    brief,
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
    'token-designer': { prompt: tokenSystemPrompt, user: () => buildAgentPrompt('token-designer', { brief, referenceFiles: tokenRefFiles, tokenContext: null }) },
    'layout-architect': { prompt: layoutSystemPrompt, user: () => buildAgentPrompt('layout-architect', { brief, referenceFiles: [], tokenContext }) },
    'sidebar-designer': { prompt: sidebarSystemPrompt, user: () => buildAgentPrompt('sidebar-designer', { brief, referenceFiles: layoutRef, tokenContext }) },
    'footer-designer': { prompt: footerSystemPrompt, user: () => buildAgentPrompt('footer-designer', { brief, referenceFiles: layoutRef, tokenContext }) },
    'component-agent': { prompt: componentSystemPrompt, user: () => buildAgentPrompt('component-agent', { brief, referenceFiles: [], tokenContext }) },
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
