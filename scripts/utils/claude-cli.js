/**
 * Shared Claude CLI spawning logic.
 *
 * Used by both daily-redesign.js and design-agents.js to avoid duplicating
 * the stream-json parsing, timeout handling, and stdin piping code.
 */

import path from 'path'
import { writeFile, unlink } from 'fs/promises'
import { createReadStream } from 'fs'
import { spawn } from 'child_process'
import { ROOT } from './file-manager.js'

/**
 * Spawn a `claude` CLI process and return the raw text response.
 *
 * Writes the prompt to a temp file, pipes it to stdin, parses stream-json
 * output, and resolves with the accumulated text. Callers handle their own
 * response parsing (JSON, delimiter format, etc.).
 *
 * @param {string} agentName - Label for log messages (e.g. 'token-designer' or 'daily-redesign')
 * @param {string} systemPrompt - The --system-prompt value
 * @param {string} promptText - Full prompt text to send via stdin
 * @param {object} [options]
 * @param {number} [options.timeoutMs=600000] - Timeout in milliseconds (default 10 min)
 * @param {string} [options.cwd] - Working directory (default ROOT)
 * @param {string} [options.model='sonnet'] - Model to use (e.g. 'sonnet', 'haiku', 'opus')
 * @param {string[]} [options.extraCliArgs] - Additional CLI args (e.g. ['--fallback-model', 'haiku'])
 * @param {function} [options.onTimeout] - Async callback invoked just before rejecting on timeout.
 *   Receives { charCount: number } and should return a string to append to the error message (or '').
 * @returns {Promise<string>} The raw text response from Claude
 */
export async function callClaudeCLI(agentName, systemPrompt, promptText, options = {}) {
  const {
    timeoutMs = 600000,
    cwd = ROOT,
    model = 'sonnet',
    extraCliArgs = [],
    onTimeout,
  } = options

  // Determine the pipeline-settings.json path (sibling to the scripts/ dir)
  const PIPELINE_SETTINGS = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    '../pipeline-settings.json'
  )

  // Write prompt to temp file (too long for command line args)
  const promptPath = path.join(ROOT, `.agent-prompt-${agentName}.tmp`)
  await writeFile(promptPath, promptText, 'utf8')

  console.log(`  [${agentName}] calling claude CLI...`)
  console.log(`  [${agentName}] prompt: ${(promptText.length / 1024).toFixed(0)}KB`)

  const cliArgs = [
    '-p',
    '--verbose',
    '--output-format', 'stream-json',
    '--max-turns', '1',
    '--model', model,
    '--tools', '',
    '--disable-slash-commands',
    '--settings', PIPELINE_SETTINGS,
    '--system-prompt', systemPrompt,
    ...extraCliArgs,
  ]

  // In production (ANTHROPIC_API_KEY set), use it directly.
  // Locally without a key, strip it so claude falls back to Max plan auth.
  const cliEnv = { ...process.env }
  if (!process.env.ANTHROPIC_API_KEY) delete cliEnv.ANTHROPIC_API_KEY

  const result = await new Promise((resolve, reject) => {
    const child = spawn('claude', cliArgs, {
      cwd,
      env: cliEnv,
    })

    let fullText = ''     // Accumulated response text from content blocks
    let finalResult = ''  // The result field from the final message
    let stderr = ''
    let lineBuffer = ''   // Buffer for incomplete JSON lines
    let charCount = 0     // Track characters received for progress

    // Pipe the prompt file to stdin, ignoring EPIPE if the child exits early
    const promptStream = createReadStream(promptPath)
    child.stdin.on('error', () => {}) // swallow EPIPE
    promptStream.pipe(child.stdin)

    child.stdout.on('data', (chunk) => {
      lineBuffer += chunk.toString()
      const lines = lineBuffer.split('\n')
      // Keep the last incomplete line in the buffer
      lineBuffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const event = JSON.parse(line)

          if (event.type === 'assistant' && event.message?.content) {
            // Content block with text -- accumulate and show progress
            for (const block of event.message.content) {
              if (block.type === 'text' && block.text) {
                fullText += block.text
                const newChars = block.text.length
                charCount += newChars
                // Log progress every ~2000 chars so the SSE stream shows activity
                if (charCount > 0 && charCount % 2000 < newChars) {
                  console.log(`  [${agentName}] ... generating (${(charCount / 1024).toFixed(0)}KB)`)
                }
              }
            }
          } else if (event.type === 'result') {
            // Final result -- this is the complete response
            finalResult = event.result || ''
          }
        } catch {
          // Not valid JSON -- skip
        }
      }
    })

    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    const timeout = setTimeout(async () => {
      child.kill()
      let extra = ''
      if (onTimeout) {
        try {
          extra = await onTimeout({ charCount }) || ''
        } catch {}
      }
      reject(new Error(`[${agentName}] timed out after ${Math.round(timeoutMs / 60000)} minutes (generated ${(charCount / 1024).toFixed(0)}KB before timeout)${extra}`))
    }, timeoutMs)

    child.on('close', (code) => {
      clearTimeout(timeout)
      // Process any remaining data in the line buffer
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
        // Prefer finalResult (from result event), fall back to accumulated text
        resolve(finalResult || fullText)
      }
    })

    child.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })

  // Clean up temp file
  try { await unlink(promptPath) } catch {}

  return result
}
