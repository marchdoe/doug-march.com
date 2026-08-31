/**
 * Shared Claude CLI spawning logic.
 *
 * Used by both daily-redesign.js and design-agents.js to avoid duplicating
 * the stream-json parsing, timeout handling, and stdin piping code.
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile, unlink } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { spawn } from 'node:child_process'
import { ROOT } from './file-manager.js'
import { clampToBudget } from './run-budget.js'
import { recordUsage } from './cost-ledger.js'

/**
 * Pull cost and token counts out of a stream-json `result` event.
 *
 * The CLI reports `total_cost_usd` itself, which beats anything we could
 * price locally. Pins older than the fields return an object of nulls — the
 * absence of telemetry is never a reason to fail a call.
 *
 * @param {object} event - a parsed `type: 'result'` event
 * @returns {{costUsd: number|null, usage: object, ms: number|null, numTurns: number|null}}
 */
export function extractResultUsage(event = {}) {
  const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null)
  return {
    costUsd: num(event.total_cost_usd),
    usage: event.usage && typeof event.usage === 'object' ? event.usage : {},
    ms: num(event.duration_ms),
    numTurns: num(event.num_turns),
  }
}

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
    throw new Error(
      `Invalid agentName: ${JSON.stringify(agentName)} (must match /^[a-z0-9][a-z0-9-]{0,50}$/i)`
    )
  }

  const {
    timeoutMs: requestedTimeoutMs = 600000,
    // Default stall window, clamped below. It used to sit at 900000 against a
    // 600000 hard timeout, so the stall check could never fire before the
    // timeout did — dead unless every caller overrode it, and two call sites
    // carry comments explaining that they had to.
    stallTimeoutMs: requestedStallMs = 900000,
    cwd = ROOT,
    model,
    extraCliArgs = [],
    onTimeout,
  } = options

  // An explicit model ID is required. The 'sonnet' alias this defaulted to is
  // exactly what models.js exists to keep out of the pipeline: CI pins the
  // CLI, and a pinned CLI's alias means whatever was current when it shipped.
  if (typeof model !== 'string' || !model.startsWith('claude-')) {
    throw new Error(
      `[${agentName}] callClaudeCLI requires an explicit model ID (got ${JSON.stringify(model)}); use modelFor()`
    )
  }

  // Never start a call with a timeout that outlives the run's own deadline.
  // The agent caps (25-30 min) are sized for a call in isolation; late in a
  // run there is not that much left, and overrunning means the Actions job
  // kills the process mid-call with no trace written. See run-budget.js.
  const timeoutMs = clampToBudget(requestedTimeoutMs)
  if (timeoutMs < requestedTimeoutMs) {
    console.log(
      `  [${agentName}] timeout clamped ${Math.round(requestedTimeoutMs / 60000)}m → ${Math.round(timeoutMs / 60000)}m by the run budget`
    )
  }

  // A stall window at or above the hard timeout is not a stall window.
  // Half the timeout is the most that can fire twice before the call is
  // abandoned anyway. Derived from the budget-clamped timeout above, not the
  // requested one, so a call started late in the run gets a proportionally
  // shorter stall window too.
  const stallTimeoutMs = Math.min(requestedStallMs, Math.floor(timeoutMs / 2))

  // MOCK_MODE was read in exactly one place — a console.log in
  // daily-redesign.js — and honoured nowhere. `pnpm pipeline` and
  // `pipeline:dry` both set it, so anyone running "the mock pipeline" was
  // making real, billed Claude calls. It is off those scripts now; if it is
  // still set, stop rather than spend. The one thing a flag must never do is
  // quietly mean the opposite of what it says.
  if (process.env.MOCK_MODE === 'true') {
    throw new Error(
      `MOCK_MODE=true but there is no mock: this call to ${agentName} would be billed. ` +
        'Unset MOCK_MODE to run for real, or implement fixture responses here.'
    )
  }

  // A Claude CLI settings file (hooks off, plugins off), not pipeline config;
  // it was named pipeline-settings.json, which invited the wrong edits.
  const PIPELINE_SETTINGS = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../claude-cli-settings.json'
  )

  // Write prompt to temp file (too long for command line args)
  const promptPath = path.join(ROOT, `.agent-prompt-${agentName}.tmp`)
  await writeFile(promptPath, promptText, 'utf8')

  console.log(`  [${agentName}] calling claude CLI...`)
  console.log(`  [${agentName}] prompt: ${(promptText.length / 1024).toFixed(0)}KB`)

  const cliArgs = [
    '-p',
    '--verbose',
    '--output-format',
    'stream-json',
    '--max-turns',
    '1',
    '--model',
    model,
    '--tools',
    '',
    '--disable-slash-commands',
    '--settings',
    PIPELINE_SETTINGS,
    '--system-prompt',
    systemPrompt,
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

    let fullText = '' // Accumulated response text from content blocks
    let finalResult = '' // The result field from the final message
    // Cost/usage from the result event. Older CLI pins omit these fields —
    // stays null rather than throwing, and the ledger records what it got.
    let resultUsage = null
    let stderr = ''
    let lineBuffer = '' // Buffer for incomplete JSON lines
    let charCount = 0 // Track characters received for progress
    let lastOutputTime = Date.now() // Track last TEXT output (stall detection)
    let lastEventTime = Date.now() // Track last stream-json event of ANY type
    const eventCounts = Object.create(null) // {system: n, assistant: n, result: n}
    const startTime = Date.now()
    const debug = process.env.PIPELINE_DEBUG === '1'

    // Diagnostic snapshot — answers "why did this call produce no text?".
    // Distinguishes a throttled/queued CLI (system events arrived, no text)
    // from a dead one (no events at all), and surfaces stderr, which the
    // stall/timeout paths previously discarded. Appended to stall/timeout
    // errors and written to signals/cli-diag-<agent>.txt for post-run review.
    const diagnostics = () => {
      const counts =
        Object.entries(eventCounts)
          .map(([k, v]) => `${k}=${v}`)
          .join(' ') || 'NONE'
      const sinceEvent = Math.round((Date.now() - lastEventTime) / 1000)
      const sinceText = Math.round((Date.now() - lastOutputTime) / 1000)
      const err = stderr.trim() ? stderr.trim().slice(-1200) : '(stderr empty)'
      return `events[${counts}] ${sinceEvent}s since last event, ${sinceText}s since last text\n  stderr: ${err}`
    }
    const dumpDiagnostics = async (reason) => {
      try {
        const body = `agent: ${agentName}\nreason: ${reason}\nelapsed: ${Math.round((Date.now() - startTime) / 1000)}s\nmodel: ${model}\npromptKB: ${(promptText.length / 1024).toFixed(0)}\n${diagnostics()}\n`
        await writeFile(path.join(ROOT, 'signals', `cli-diag-${agentName}.txt`), body, 'utf8')
      } catch {}
    }

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

          // Track every event type + time, so a stall can report whether the
          // CLI was emitting non-text events (throttled/thinking) or silent.
          eventCounts[event.type] = (eventCounts[event.type] || 0) + 1
          lastEventTime = Date.now()
          if (debug)
            console.log(
              `  [${agentName}] «event» ${event.type}${event.subtype ? `/${event.subtype}` : ''}`
            )

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
                  console.log(
                    `  [${agentName}] ... generating (${(charCount / 1024).toFixed(0)}KB)`
                  )
                }
              }
            }
          } else if (event.type === 'result') {
            // Final result -- this is the complete response
            finalResult = event.result || ''
            resultUsage = extractResultUsage(event)
            lastOutputTime = Date.now()
          }
        } catch {
          // Not valid JSON -- skip
        }
      }
    })

    child.stderr.on('data', (chunk) => {
      const s = chunk.toString()
      stderr += s
      // Surface stderr live in debug mode — a rate-limit/overloaded notice
      // is the thing we most want to see when a call is about to stall.
      if (debug) process.stderr.write(`  [${agentName}:stderr] ${s}`)
    })

    // The settled flag prevents multiple kill/reject attempts when timeout,
    // stall, and close handlers race with each other. Once any path fires,
    // subsequent paths become no-ops.
    let settled = false

    // Book whatever we know about this call to the cost ledger. Called from
    // all three settling paths (timeout, stall, close) — a killed call still
    // consumed real time and, on a billed run, real tokens, so it must show
    // up in cost.json even though resultUsage is null for it. Never throws:
    // telemetry must not fail a design run.
    const bookCall = () => {
      try {
        recordUsage({
          agent: agentName,
          model,
          source: 'cli',
          usage: resultUsage?.usage,
          costUsd: resultUsage?.costUsd ?? undefined,
          ms: resultUsage?.ms ?? Date.now() - startTime,
          numTurns: resultUsage?.numTurns ?? undefined,
        })
      } catch {}
    }

    const cleanup = () => {
      clearTimeout(timeout)
      clearInterval(stallCheck)
    }

    const killHard = () => {
      // SIGTERM first (default), then SIGKILL after 5s if still alive.
      // The Claude CLI occasionally ignores SIGTERM on stream-json hangs.
      try {
        child.kill('SIGTERM')
      } catch {}
      setTimeout(() => {
        try {
          child.kill('SIGKILL')
        } catch {}
      }, 5000).unref?.()
    }

    const timeout = setTimeout(async () => {
      if (settled) return
      settled = true
      cleanup()
      killHard()
      bookCall()
      let extra = ''
      if (onTimeout) {
        try {
          extra = (await onTimeout({ charCount })) || ''
        } catch {}
      }
      await dumpDiagnostics('timeout')
      reject(
        new Error(
          `[${agentName}] timed out after ${Math.round(timeoutMs / 60000)} minutes (generated ${(charCount / 1024).toFixed(0)}KB before timeout)${extra}\n  ${diagnostics()}`
        )
      )
    }, timeoutMs)

    // Stall detection: kill only on TRUE silence — no stream event of ANY
    // kind for stallTimeoutMs. Extended thinking emits system/thinking_tokens
    // events the whole time it runs; keying off lastEventTime (not last TEXT)
    // means a model that's actively thinking is NOT mistaken for a stall and
    // killed mid-thought. A long-but-live thinking phase is bounded by the
    // hard timeoutMs instead; only a genuinely dead/hung process (zero events)
    // trips the stall.
    const stallCheck = setInterval(() => {
      if (settled) return
      const stallDuration = Date.now() - lastEventTime
      if (stallDuration > stallTimeoutMs) {
        settled = true
        cleanup()
        killHard()
        bookCall()
        const stallMin = Math.round(stallDuration / 60000)
        dumpDiagnostics('stall').finally(() => {
          reject(
            new Error(
              `[${agentName}] stalled — no output for ${stallMin} minutes (generated ${(charCount / 1024).toFixed(0)}KB before stall)\n  ${diagnostics()}`
            )
          )
        })
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
          if (event.type === 'result') {
            finalResult = event.result || ''
            resultUsage = extractResultUsage(event)
          }
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'text') fullText += block.text
            }
          }
        } catch {}
      }
      console.log(`  [${agentName}] finished (${(charCount / 1024).toFixed(0)}KB total)`)
      bookCall()

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
    try {
      await unlink(promptPath)
    } catch {}
  }

  return result
}
