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
import { readContext } from './utils/site-context.js'
import { MUTABLE_FILES } from './utils/site-context.js'
import { buildMessages } from './utils/prompt-builder.js'
import { backup, writeFiles, restore, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'

const MAX_ATTEMPTS = 3
const DRY_RUN = process.env.DRY_RUN === 'true'
const MOCK_MODE = process.env.MOCK_MODE === 'true'

if (!MOCK_MODE && !process.env.ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.')
  console.error('  Set ANTHROPIC_API_KEY in .env, or use MOCK_MODE=true to use local Claude Code CLI.')
  process.exit(1)
}

if (MOCK_MODE) {
  // Verify claude CLI is available
  try {
    execSync('claude --version', { encoding: 'utf8', timeout: 5000 })
  } catch {
    console.error('Error: MOCK_MODE requires the `claude` CLI (Claude Code) to be installed.')
    console.error('  Install: https://claude.ai/download')
    process.exit(1)
  }
}

// Only import Anthropic SDK when not in mock mode
let client
if (!MOCK_MODE) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  client = new Anthropic()
}

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
  const { writeFile: writeFileAsync } = await import('fs/promises')
  const { execSync: exec } = await import('child_process')

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

  // Combine system + user into a single prompt (avoids shell escaping issues)
  const combinedPrompt = `${system}\n\n---\n\n${fullPrompt}`

  // Write prompt to temp file (it's too long for command line args)
  const promptPath = path.join(ROOT, '.claude-prompt.tmp')
  await writeFileAsync(promptPath, combinedPrompt, 'utf8')

  console.log('  calling claude CLI (Max plan)...')
  console.log(`  prompt written to .claude-prompt.tmp (${(combinedPrompt.length / 1024).toFixed(0)}KB)`)

  // Call claude CLI in print mode, piping the prompt from the temp file.
  // IMPORTANT: Strip ANTHROPIC_API_KEY from env so claude CLI uses the
  // Max plan subscription auth instead of (possibly empty) API credits.
  const cliEnv = { ...process.env }
  delete cliEnv.ANTHROPIC_API_KEY

  const { spawn: spawnProc } = await import('child_process')
  const { createReadStream } = await import('fs')

  const result = await new Promise((resolve, reject) => {
    const child = spawnProc('claude', [
      '-p',
      '--output-format', 'json',
      '--max-turns', '1',
      '--tools', '',
    ], {
      cwd: ROOT,
      env: cliEnv,
    })

    let stdout = ''
    let stderr = ''

    // Pipe the prompt file to stdin
    const promptStream = createReadStream(promptPath)
    promptStream.pipe(child.stdin)

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString()
      // Print progress dots so the SSE stream shows activity
      process.stdout.write('.')
    })
    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    const timeout = setTimeout(() => {
      child.kill()
      reject(new Error('Claude CLI timed out after 10 minutes'))
    }, 600000) // 10 minute timeout

    child.on('close', (code) => {
      clearTimeout(timeout)
      console.log('') // newline after progress dots
      if (code !== 0 && !stdout.trim()) {
        console.error(`  claude CLI stderr: ${stderr.slice(0, 500)}`)
        reject(new Error(`claude CLI exited with code ${code}: ${stderr.slice(0, 500)}`))
      } else {
        resolve(stdout)
      }
    })

    child.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })

  // Parse the JSON output wrapper
  let parsed
  try {
    const wrapper = JSON.parse(result)
    // claude CLI wraps response in { result: "..." } when using --output-format json
    const responseText = wrapper.result || result
    parsed = JSON.parse(responseText)
  } catch {
    // If the wrapper parse fails, try parsing the raw output directly
    // Strip any markdown fences if Claude included them
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try {
      const wrapper = JSON.parse(cleaned)
      parsed = wrapper.result ? JSON.parse(wrapper.result) : wrapper
    } catch (e2) {
      throw new Error(`Failed to parse Claude CLI response as JSON: ${e2.message}\nFirst 500 chars: ${result.slice(0, 500)}`)
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

  // Clean up temp file
  try { const { unlink } = await import('fs/promises'); await unlink(promptPath) } catch {}

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

/**
 * Commit the generated files to git.
 * Configures git identity (required in GitHub Actions), stages all, commits.
 * @param {string} date
 * @param {string} designBrief
 */
function gitCommit(date, designBrief) {
  execSync('git config user.name "Daily Redesign"', { cwd: ROOT })
  execSync('git config user.email "redesign@doug-march.com"', { cwd: ROOT })
  execSync('git add -A', { cwd: ROOT })
  // Escape double quotes in the brief for safe shell usage
  const safeMsg = `design(${date}): ${designBrief}`.replace(/"/g, '\\"')
  execSync(`git commit -m "${safeMsg}"`, { cwd: ROOT })
  console.log(`  committed: design(${date}): ${designBrief}`)
}

async function main() {
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

  // Step 3: Backup current files
  console.log('[3/4] Backing up current mutable files...')
  const originalBackup = await backup(MUTABLE_FILES)
  console.log(`  backed up ${originalBackup.size} files`)

  // Step 4: Retry loop
  console.log('[4/4] Starting generation loop...')
  let lastError = null

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`\n--- Attempt ${attempt}/${MAX_ATTEMPTS} ---`)

    let input, toolUseId, response

    if (MOCK_MODE) {
      console.log('  using Claude Code CLI (Max plan)...')
      const userPrompt = messages[messages.length - 1]
      const promptText = typeof userPrompt.content === 'string' ? userPrompt.content : userPrompt.content.map(b => b.text || b.content || '').join('\n')
      const buildError = attempt > 1 ? messages[messages.length - 1]?.content?.find?.(b => b.type === 'tool_result')?.content : undefined
      try {
        input = await callClaudeCLI(system, promptText, typeof buildError === 'string' ? buildError : undefined)
      } catch (err) {
        console.error(`  Claude CLI error: ${err.message}`)
        lastError = `Claude CLI error: ${err.message}`
        break
      }
      toolUseId = 'cli-tool-use-id'
      console.log(`  stop_reason: cli`)
    } else {
      // Call Claude
      console.log('  calling Claude API (claude-opus-4-6)...')
      try {
        response = await client.messages.create({
          model: 'claude-opus-4-6',
          max_tokens: 16384,
          system,
          messages,
          tools: [SUBMIT_REDESIGN_TOOL],
          tool_choice: { type: 'tool', name: 'submit_redesign' },
        })
      } catch (err) {
        console.error(`  Claude API error: ${err.message}`)
        lastError = `Claude API error: ${err.message}`
        break
      }

      console.log(`  stop_reason: ${response.stop_reason}`)

      // Extract tool use
      try {
        ;({ toolUseId, input } = extractToolUse(response))
      } catch (err) {
        console.error(`  ${err.message}`)
        lastError = err.message
        break
      }
    }

    console.log(`  design_brief: ${input.design_brief}`)
    console.log(`  files to write: ${input.files.length}`)

    // Write files
    console.log('  writing files...')
    try {
      await writeFiles(input.files)
    } catch (err) {
      console.error(`  writeFiles error: ${err.message}`)
      console.log('  restoring originals...')
      await restore(originalBackup)
      lastError = err.message
      break
    }

    // Validate build
    const buildResult = validateBuild()

    if (buildResult.success) {
      console.log('\n=== Build passed! ===')

      // Archive
      const changedPaths = input.files.map((f) => f.path)
      await archive(
        context.signals.date,
        context.signals,
        input.rationale,
        input.design_brief,
        changedPaths
      )

      if (DRY_RUN) {
        console.log('\nDRY_RUN=true — skipping git commit.')
        console.log('Generated files are on disk. Build was verified.')
        // Restore originals so dry run is truly non-destructive
        console.log('Restoring originals (dry run)...')
        await restore(originalBackup)
      } else if (MOCK_MODE) {
        console.log('\nMOCK_MODE=true — files written to disk, skipping git commit.')
        console.log('Reload the site to see the new design.')
      } else {
        gitCommit(context.signals.date, input.design_brief)
        console.log('\nDone. Committed successfully.')
        console.log('GitHub Actions will push to main.')
      }

      process.exit(0)
    }

    // Build failed — restore and prepare retry
    console.log('\n  Build failed. Restoring originals for retry...')
    await restore(originalBackup)

    lastError = buildResult.error

    if (attempt < MAX_ATTEMPTS) {
      // Append conversation history for the retry
      // First: append Claude's response (with the tool use)
      messages.push({
        role: 'assistant',
        content: response.content,
      })

      // Second: append the build failure as a tool result + follow-up instruction
      messages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolUseId,
            content: `Build failed with the following errors (last 3000 chars of output):\n\n${buildResult.error}`,
          },
          {
            type: 'text',
            text: 'The build failed due to the errors above. Please fix the TypeScript and/or PandaCSS issues and call submit_redesign again with corrected files. Common causes:\n- Semantic token names referenced in components that do not exist in elements/preset.ts\n- TypeScript type errors in component props\n- Missing or incorrect import paths\n- Attempting to import from styled-system/ paths that changed due to token renames\n\nSubmit all files again, including corrected ones.',
          },
        ],
      })

      console.log(`  Prepared retry message. Retrying...`)
    }
  }

  // All attempts exhausted (or fatal error)
  console.error(`\n=== All ${MAX_ATTEMPTS} attempts failed. ===`)
  if (lastError) {
    console.error(`Last error: ${lastError.slice(0, 500)}`)
  }
  console.log('Originals have been restored.')
  process.exit(1)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
