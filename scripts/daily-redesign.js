#!/usr/bin/env node

/**
 * Daily Redesign Pipeline
 *
 * Reads signals/today.yml, calls Claude (claude-opus-4-6) via tool_use,
 * writes generated files, validates the build, and commits on success.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY - required
 *   DRY_RUN=true      - optional, generates but does not commit
 *
 * Exit codes:
 *   0 - success (build passed, committed)
 *   1 - failure (all attempts exhausted or fatal error)
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { execSync } from 'child_process'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { callClaudeCLI as callClaudeCLIShared } from './utils/claude-cli.js'
import { readContext } from './utils/site-context.js'
import { MUTABLE_FILES } from './utils/site-context.js'
import { buildMessages } from './utils/prompt-builder.js'
import { backup, writeFiles, restore, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'
import { runAgentSwarm } from './design-agents.js'

const MAX_ATTEMPTS = 3
const DRY_RUN = process.env.DRY_RUN === 'true'
const MOCK_MODE = process.env.MOCK_MODE === 'true'

/** CLI args for claude in stream-json mode. Exported for testing. */
/** Path to pipeline-specific settings that disables hooks (prevents superpowers
 *  SessionStart hook from injecting skill-check instructions that cause tool-call loops). */
const PIPELINE_SETTINGS = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'pipeline-settings.json'
)

/** System prompt for the designer CLI call. This replaces Claude Code's default
 *  system prompt so the model acts as a designer, not a coding assistant.
 *  The design dimensions and guidance from prompt-builder.js SYSTEM_PROMPT are
 *  included in the user message — this prompt establishes the role and response format. */
const DESIGNER_SYSTEM_PROMPT = `You are an expert web designer working in an automated pipeline. You receive a creative brief and technical context, and you produce a complete site redesign as a JSON response.

You have exceptional taste and deep knowledge of design fundamentals:
- **Alignment and grid discipline** — Every element should feel intentionally placed. Use a consistent grid. Align elements to shared edges and baselines.
- **Consistent spacing** — Use a spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px). Never use arbitrary pixel values. Rhythm comes from repetition.
- **Visual hierarchy** — Establish clear levels: one dominant element, supporting elements, and background elements. Not everything can be loud.
- **Typographic hierarchy** — Headings, subheads, body, captions, and labels should have clear, distinct sizes and weights. Use 2-3 levels of contrast, not 7.
- **Color restraint** — 2-3 colors maximum plus neutrals. A limited palette used well beats a rainbow. Let one accent color do the work.
- **Whitespace as design** — Empty space is not wasted space. It creates breathing room, groups related elements, and directs attention.
- **Contrast and readability** — Dark text on light backgrounds or light text on dark. Never put low-contrast text on a busy background. Body text must be effortlessly readable.
- **Component consistency** — Cards should look like cards. Lists should look like lists. Borders, shadows, and radii should be consistent within a family.

You respond with ONLY a JSON object. No tools, no file operations, no preamble, no explanation outside the JSON. Your entire response must be valid JSON.`

export const CLAUDE_CLI_ARGS = [
  '-p',
  '--verbose',
  '--output-format', 'stream-json',
  '--max-turns', '1',
  '--model', 'sonnet',
  '--fallback-model', 'haiku',
  '--tools', '',
  '--disable-slash-commands',
  '--settings', PIPELINE_SETTINGS,
  '--system-prompt', DESIGNER_SYSTEM_PROMPT,
]

// Validation and SDK init are deferred to main() so importing for tests doesn't trigger side effects
let client

/**
 * Build a mock response from the canonical theme snapshot.
 * Reads themes/canonical/ files and packages them as if Claude returned them.
 */
/**
 * Call Claude Code CLI (Max plan) to generate a redesign.
 * Uses the same prompt as production but routes through the local `claude` binary
 * instead of the Anthropic API, so no API credits are needed.
 *
 * @param {string} system - system prompt
 * @param {string} userPrompt - user prompt with signals + files
 * @param {string} [buildError] - optional build error from a previous attempt
 * @returns {{ rationale: string, design_brief: string, files: Array<{path: string, content: string}> }}
 */
async function callClaudeCLI(system, userPrompt, buildError) {
  // Build the full prompt for claude CLI
  let fullPrompt = userPrompt

  if (buildError) {
    fullPrompt += `\n\n---\n\nThe previous attempt failed with this build error:\n\n${buildError}\n\nPlease fix the issues and try again.`
  }

  fullPrompt += `\n\n---\n\nIMPORTANT: Respond with ONLY a valid JSON object matching this exact schema (no markdown, no code fences, no explanation before or after):
{
  "rationale": "1-2 paragraphs explaining your creative choices",
  "design_brief": "One evocative sentence for the archive",
  "files": [
    { "path": "elements/preset.ts", "content": "...full file content..." },
    { "path": "app/components/Layout.tsx", "content": "...full file content..." }
  ]
}

You MUST include elements/preset.ts at minimum. Include complete file contents — not diffs.`

  // Combine system + user into a single prompt for stdin.
  // The --system-prompt flag overrides Claude Code's default system prompt,
  // and --settings disables hooks, giving us a clean non-agentic context.
  const combinedPrompt = `${system}\n\n---\n\n${fullPrompt}`

  const result = await callClaudeCLIShared('daily-redesign', DESIGNER_SYSTEM_PROMPT, combinedPrompt, {
    timeoutMs: 1200000, // 20 minute timeout
    extraCliArgs: ['--fallback-model', 'haiku'],
    onTimeout: async ({ charCount }) => {
      // Check for concurrent claude sessions that may be blocking throughput
      try {
        const { execSync: execS } = await import('child_process')
        const procs = execS("ps aux | grep '[c]laude' | grep -v grep | grep -v '.sh'", { encoding: 'utf8' }).trim().split('\n')
        const interactive = procs.filter(p => !p.includes('-p') && !p.includes('ShipIt'))
        if (interactive.length > 0) {
          return `\n\n⚠ ${interactive.length} other Claude Code session(s) detected. The Max plan CLI shares a per-account connection pool — concurrent sessions may block pipeline throughput. Try closing idle sessions or running the pipeline when no interactive sessions are active.`
        }
      } catch {}
      return ''
    },
  })

  // Parse the JSON response — Claude may include preamble text or markdown fences
  let parsed
  try {
    parsed = JSON.parse(result)
  } catch {
    // Try stripping markdown fences
    let cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      // Try extracting the first top-level JSON object from the response
      const jsonStart = cleaned.indexOf('{')
      if (jsonStart > 0) {
        cleaned = cleaned.slice(jsonStart)
        try {
          parsed = JSON.parse(cleaned)
        } catch (e3) {
          throw new Error(`Failed to parse Claude CLI response as JSON: ${e3.message}\nFirst 500 chars: ${result.slice(0, 500)}`)
        }
      } else {
        throw new Error(`Failed to parse Claude CLI response as JSON: no JSON object found\nFirst 500 chars: ${result.slice(0, 500)}`)
      }
    }
  }

  // Validate required fields
  if (!parsed.rationale || !parsed.design_brief || !Array.isArray(parsed.files)) {
    throw new Error(`Claude CLI response missing required fields. Got keys: ${Object.keys(parsed).join(', ')}`)
  }

  if (!parsed.files.find(f => f.path === 'elements/preset.ts')) {
    throw new Error('Claude CLI response missing elements/preset.ts in files array')
  }

  console.log(`  claude CLI responded with ${parsed.files.length} files`)

  return parsed
}

/**
 * The tool definition for submit_redesign.
 * Claude MUST call this tool to return its work (tool_choice forces it).
 */
const SUBMIT_REDESIGN_TOOL = {
  name: 'submit_redesign',
  description: 'Submit the complete site redesign. Call this tool with your complete redesign — all files that need to be written, your design rationale, and a one-sentence design brief for the archive.',
  input_schema: {
    type: 'object',
    required: ['rationale', 'design_brief', 'files'],
    properties: {
      rationale: {
        type: 'string',
        description: '1-2 paragraphs explaining your creative choices and how they connect to today\'s signals. This goes in the archive.',
      },
      design_brief: {
        type: 'string',
        description: 'One-sentence design brief for the archive. Example: "Post-blizzard brutalism: heavy type, cold grays, claustrophobic spacing". Be specific and evocative.',
      },
      files: {
        type: 'array',
        description: 'All files to write. Must include at minimum elements/preset.ts. Include complete file contents — not diffs or patches.',
        items: {
          type: 'object',
          required: ['path', 'content'],
          properties: {
            path: {
              type: 'string',
              description: 'Relative path from repo root, e.g. "elements/preset.ts" or "app/components/Layout.tsx"',
            },
            content: {
              type: 'string',
              description: 'Complete file content.',
            },
          },
        },
      },
    },
  },
}

/**
 * Extract the submit_redesign tool_use block from a Claude response.
 * Returns { toolUseId, input } or throws if not found.
 * @param {import('@anthropic-ai/sdk').Message} response
 * @returns {{ toolUseId: string, input: { rationale: string, design_brief: string, files: Array<{path: string, content: string}> } }}
 */
function extractToolUse(response) {
  const toolUseBlock = response.content.find((block) => block.type === 'tool_use')
  if (!toolUseBlock) {
    const textBlocks = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    throw new Error(
      `Claude did not call submit_redesign tool. Response was:\n${textBlocks.slice(0, 1000)}`
    )
  }
  return {
    toolUseId: toolUseBlock.id,
    input: toolUseBlock.input,
  }
}

async function main() {
  // Validate claude CLI is available (required in all modes)
  try {
    execSync('claude --version', { encoding: 'utf8', timeout: 5000 })
  } catch {
    console.error('Error: The `claude` CLI (Claude Code) is required.')
    console.error('  Install: https://claude.ai/download')
    process.exit(1)
  }

  console.log(`\n=== Daily Redesign Pipeline ===`)
  console.log(`DRY_RUN: ${DRY_RUN}`)
  console.log(`MOCK_MODE: ${MOCK_MODE}`)
  console.log(`Max attempts: ${MAX_ATTEMPTS}`)
  console.log('')

  // Step 1: Read context
  console.log('[1/4] Reading site context...')
  const context = await readContext()
  console.log(`  signals date: ${context.signals.date}`)
  console.log(`  mutable files found: ${context.currentFiles.length}`)

  // Check for interpreted brief (Stage 1 output)
  const briefPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../signals/today.brief.md')
  if (existsSync(briefPath)) {
    context.brief = await readFile(briefPath, 'utf8')
    console.log(`  using interpreted brief (${context.brief.length} chars)`)
  }

  // Step 2: Build initial messages
  console.log('[2/4] Building Claude prompt...')
  const { system, messages } = buildMessages(context)
  // messages is a mutable array — we append to it on retries

  // Step 3: Run agent swarm (handles its own backup/restore/retry/archive)
  console.log('[3/4] Running agent swarm...')
  let result
  try {
    result = await runAgentSwarm(context)
  } catch (err) {
    console.error(`\nAgent swarm failed: ${err.message}`)
    process.exit(1)
  }

  console.log(`\ndesign_brief: ${result.design_brief}`)

  if (DRY_RUN) {
    console.log('\nDRY_RUN=true — files written to disk. Build was verified.')
  } else {
    console.log('\nDone. GitHub Actions will commit and push.')
  }

  process.exit(0)
}

// Run main only when executed directly (not when imported for testing)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}
