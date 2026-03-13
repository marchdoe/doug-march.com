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

import Anthropic from '@anthropic-ai/sdk'
import { execSync } from 'child_process'
import { readContext } from './utils/site-context.js'
import { MUTABLE_FILES } from './utils/site-context.js'
import { buildMessages } from './utils/prompt-builder.js'
import { backup, writeFiles, restore, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'

const MAX_ATTEMPTS = 3
const DRY_RUN = process.env.DRY_RUN === 'true'

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.')
  process.exit(1)
}

const client = new Anthropic()

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
  console.log(`Max attempts: ${MAX_ATTEMPTS}`)
  console.log('')

  // Step 1: Read context
  console.log('[1/4] Reading site context...')
  const context = await readContext()
  console.log(`  signals date: ${context.signals.date}`)
  console.log(`  mutable files found: ${context.currentFiles.length}`)

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

    // Call Claude
    console.log('  calling Claude API (claude-opus-4-6)...')
    let response
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
    let toolUseId, input
    try {
      ;({ toolUseId, input } = extractToolUse(response))
    } catch (err) {
      console.error(`  ${err.message}`)
      lastError = err.message
      // Not a build error — don't retry with conversation history, just break
      break
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
