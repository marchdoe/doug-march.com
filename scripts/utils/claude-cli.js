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
 * @param {number} [options.stallTimeoutMs=900000] - Kill if no output for this many ms (default 15 min)
 * @param {string} [options.cwd] - Working directory (default ROOT)
 * @param {string} [options.model='sonnet'] - Model to use (e.g. 'sonnet', 'haiku', 'opus')
 * @param {string[]} [options.extraCliArgs] - Additional CLI args (e.g. ['--fallback-model', 'haiku'])
 * @param {function} [options.onTimeout] - Async callback invoked just before rejecting on timeout.
 *   Receives { charCount: number } and should return a string to append to the error message (or '').
 * @returns {Promise<string>} The raw text response from Claude
 */
export async function callClaudeCLI(agentName, systemPrompt, promptText, options = {}) {
  // Validate agentName — it's interpolated into a file path for the temp
  // prompt file. Reject anything that could escape the repo root or
  // contain shell-special characters. All current callers pass plain
  // ASCII names like 'token-designer', so this is strictly tightening.
  if (typeof agentName !== 'string' || !/^[a-z0-9][a-z0-9-]{0,50}$/i.test(agentName)) {
    throw new Error(`Invalid agentName: ${JSON.stringify(agentName)} (must match /^[a-z0-9][a-z0-9-]{0,50}$/i)`)
  }

  const {
    timeoutMs = 600000,
    stallTimeoutMs = 900000,
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

  // Allowlist env vars passed to the child process. Previously we passed
  // the full parent env, leaking every GitHub Actions secret (WEATHER_API_KEY,
  // NEWS_API_KEY, ALPHA_VANTAGE_API_KEY, PRODUCT_HUNT_TOKEN, GITHUB_TOKEN,
  // etc.) to the Claude CLI. The CLI needs almost nothing from the env —
  // only ANTHROPIC_API_KEY, basic shell vars, and Node.js options.
  const cliEnv = {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    USER: process.env.USER,
    SHELL: process.env.SHELL,
    TMPDIR: process.env.TMPDIR,
    LANG: process.env.LANG,
    NODE_OPTIONS: process.env.NODE_OPTIONS,
    // Pass ANTHROPIC_API_KEY only if set. Locally without a key, claude
    // falls back to Max plan auth via its own config file.
    ...(process.env.ANTHROPIC_API_KEY ? { ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY } : {}),
  }
  // Remove any undefined values (e.g., TMPDIR may not be set)
  for (const k of Object.keys(cliEnv)) {
    if (cliEnv[k] === undefined) delete cliEnv[k]
  }

  const resultPromise = new Promise((resolve, reject) => {
    const child = spawn('claude', cliArgs, {
      cwd,
      env: cliEnv,
    })

    let fullText = ''     // Accumulated response text from content blocks
    let finalResult = ''  // The result field from the final message
    let stderr = ''
    let lineBuffer = ''   // Buffer for incomplete JSON lines
    let charCount = 0     // Track characters received for progress
    let lastOutputTime = Date.now()  // Track last output for stall detection

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
            // Content block with text -- accumulate and show progress.
            // Only update lastOutputTime when actual text content arrives
            // (not on init/heartbeat events) so stall detection is accurate.
            for (const block of event.message.content) {
              if (block.type === 'text' && block.text) {
                fullText += block.text
                const newChars = block.text.length
                charCount += newChars
                lastOutputTime = Date.now()
                // Log progress every ~2000 chars so the SSE stream shows activity
                if (charCount > 0 && charCount % 2000 < newChars) {
                  console.log(`  [${agentName}] ... generating (${(charCount / 1024).toFixed(0)}KB)`)
                }
              }
            }
          } else if (event.type === 'result') {
            // Final result -- this is the complete response
            finalResult = event.result || ''
            lastOutputTime = Date.now()
          }
        } catch {
          // Not valid JSON -- skip
        }
      }
    })

    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    // The settled flag prevents multiple kill/reject attempts when timeout,
    // stall, and close handlers race with each other. Once any path fires,
    // subsequent paths become no-ops.
    let settled = false

    const cleanup = () => {
      clearTimeout(timeout)
      clearInterval(stallCheck)
    }

    const killHard = () => {
      // SIGTERM first (default), then SIGKILL after 5s if still alive.
      // The Claude CLI occasionally ignores SIGTERM on stream-json hangs.
      try { child.kill('SIGTERM') } catch {}
      setTimeout(() => {
        try { child.kill('SIGKILL') } catch {}
      }, 5000).unref?.()
    }

    const timeout = setTimeout(async () => {
      if (settled) return
      settled = true
      cleanup()
      killHard()
      let extra = ''
      if (onTimeout) {
        try {
          extra = await onTimeout({ charCount }) || ''
        } catch {}
      }
      reject(new Error(`[${agentName}] timed out after ${Math.round(timeoutMs / 60000)} minutes (generated ${(charCount / 1024).toFixed(0)}KB before timeout)${extra}`))
    }, timeoutMs)

    // Stall detection: kill if no output for stallTimeoutMs (default 15 min).
    // The unified-designer routinely takes 9-12 min of silent "thinking"
    // before streaming its first output, so this must be generous.
    const stallCheck = setInterval(() => {
      if (settled) return
      const stallDuration = Date.now() - lastOutputTime
      if (stallDuration > stallTimeoutMs) {
        settled = true
        cleanup()
        killHard()
        const stallMin = Math.round(stallDuration / 60000)
        reject(new Error(`[${agentName}] stalled — no output for ${stallMin} minutes (generated ${(charCount / 1024).toFixed(0)}KB before stall)`))
      }
    }, 30000)

    child.on('close', (code) => {
      if (settled) return
      settled = true
      cleanup()
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
      if (settled) return
      settled = true
      cleanup()
      reject(err)
    })
  })

  let result
  try {
    result = await resultPromise
  } finally {
    // Always clean up the temp file, even if the Promise rejected.
    // Previously unlink() was after `await` with no try/finally — a
    // rejection would leave .agent-prompt-*.tmp files in the repo root.
    try { await unlink(promptPath) } catch {}
  }

  return result
}
