/**
 * Routing for the pipeline's two vision critics (mockup-critic,
 * screenshot-critic).
 *
 * With an API key (CI, or a deliberate billed local run) the call goes through
 * the SDK with real image blocks — the model sees the pixels, and three
 * 1440x900 JPEGs cost roughly 5k input tokens.
 *
 * Without a key (local Max-plan dev) the call falls back to the `claude` CLI
 * with the TEXT blocks only. The images are dropped rather than inlined as
 * base64 data-URIs: the CLI bills that base64 as text (~336k tokens for a
 * 360KB image) and the model still can't see it, so a blind critique costs
 * dollars and returns a hallucination. A critic told plainly that no image is
 * available gives a cheaper and more honest answer.
 *
 * @module
 */

import {
  assertNotAutomated,
  isMockMode,
  isRecording,
  nextFixture,
  recordFixture,
} from './agent-fixtures.js'
import { callClaudeCLI } from './claude-cli.js'
import { callClaudeSDK, hasApiKey } from './claude-sdk.js'
import { modelFor } from './models.js'
import { ModelTransportError } from './model-transport-error.js'

/** Prepended to the CLI fallback prompt so the critic never invents pixels. */
export const NO_IMAGE_NOTICE =
  'NOTE: no screenshot is attached to this request — this run has no API key, ' +
  'so image input is unavailable. Judge only what the text below states. Do NOT ' +
  'describe, guess at, or invent anything about the rendered pixels; base your ' +
  'verdict on the declared brief, measurables, and shell alone.'

/**
 * Flatten content blocks to the plain-text prompt the CLI path takes,
 * dropping every image block.
 *
 * @param {Array<{type: string, text?: string}>} contentBlocks
 * @returns {string}
 */
export function blocksToText(contentBlocks) {
  return contentBlocks
    .filter((block) => block.type === 'text' && block.text)
    .map((block) => block.text)
    .join('\n\n---\n\n')
}

/**
 * Call a vision agent with the best channel available.
 *
 * @param {object} args
 * @param {string} args.agentName
 * @param {string} args.systemPrompt
 * @param {Array<{type: string, text?: string, source?: object}>} args.contentBlocks -
 *   ordered text/image blocks for the SDK path
 * @param {number} [args.maxTokens]
 * @param {number} [args.timeoutMs]
 * @param {number} [args.stallTimeoutMs] - CLI path only
 * @param {(channel: string) => void} [args.onChannel] - told which channel
 *   actually answered: 'sdk-vision', 'cli-text-fallback' (the SDK failed),
 *   'cli-text-no-key', or 'fixture-replay' (MOCK_MODE, nothing was called).
 *   Without this the degradation is invisible: a 400 from a bad thinking param
 *   or a wrong model id silently turns both vision gates into text-only, and a
 *   critic can APPROVE a design it never saw.
 * @returns {Promise<string>} raw assistant text (callers parse their own verdicts)
 */
export async function callVisionAgent(args) {
  const { agentName, systemPrompt, contentBlocks, maxTokens, timeoutMs, stallTimeoutMs } = args
  const onChannel = args.onChannel ?? (() => {})
  const imageCount = contentBlocks.filter((block) => block.type === 'image').length

  // The fixture seam sits in front of BOTH channels. It used to live only in
  // callClaudeCLI, so with a key in the environment MOCK_MODE replayed the
  // text agents and quietly billed the two vision critics through the SDK
  // (#293) — #220 again on the second door. Same for the CI refusal: a mocked
  // run inside Actions failed partially instead of fast.
  assertNotAutomated()
  if (isMockMode()) {
    const response = nextFixture(agentName)
    console.log(`  [${agentName}] replayed fixture (${(response.length / 1024).toFixed(0)}KB)`)
    onChannel('fixture-replay')
    return response
  }

  // Which channel a ModelTransportError from the CLI call below should name.
  // 'cli' unless the SDK path was actually tried and came back dead — then
  // this text call IS the fallback, and the error should say so.
  let cliChannel = 'cli'

  if (hasApiKey() && imageCount > 0) {
    try {
      const text = await callClaudeSDK(agentName, systemPrompt, contentBlocks, {
        maxTokens,
        timeoutMs,
      })
      if (!text || !text.trim()) {
        // The SDK call completed with no error but no text either — treat it
        // the same as a hard failure so it falls through to the CLI fallback
        // below instead of resolving an empty verdict.
        throw new ModelTransportError({
          agent: agentName,
          channel: 'sdk-vision',
          emptyReply: true,
        })
      }
      // The CLI path records inside callClaudeCLI; the SDK path has to do it
      // here or a recorded run would have no fixture for either critic.
      if (isRecording()) recordFixture(agentName, text)
      onChannel('sdk-vision')
      return text
    } catch (err) {
      console.warn(
        `  [${agentName}] SDK vision call failed (${err.message}) — falling back to text-only CLI`
      )
      onChannel('cli-text-fallback')
      cliChannel = 'cli-text-fallback'
    }
  } else if (imageCount > 0) {
    console.warn(
      `  [${agentName}] no ANTHROPIC_API_KEY — ${imageCount} screenshot(s) dropped; text-only critique`
    )
    onChannel('cli-text-no-key')
  } else {
    onChannel('cli-text-no-images')
  }

  const textPrompt = [NO_IMAGE_NOTICE, blocksToText(contentBlocks)].join('\n\n---\n\n')
  return await callClaudeCLI(agentName, systemPrompt, textPrompt, {
    model: modelFor(agentName),
    timeoutMs,
    stallTimeoutMs,
    channel: cliChannel,
  })
}
