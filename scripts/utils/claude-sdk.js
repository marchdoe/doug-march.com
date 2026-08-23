/**
 * Anthropic SDK call path — the only way an agent in this pipeline can
 * actually SEE an image.
 *
 * The `claude` CLI path (utils/claude-cli.js) takes one flat string. A
 * screenshot embedded in that string as a `data:image/jpeg;base64,...` URI is
 * billed as raw text (~1.07 chars/token — a 360KB JPEG is ~336k input tokens)
 * and the model never decodes it: a solid-red probe image came back described
 * as "light gray". Real vision needs structured content blocks, which means
 * the SDK and an API key.
 *
 * Text-only agents stay on the CLI (Max-plan auth, no API spend in local dev).
 * Only the vision critics route here, and only when ANTHROPIC_API_KEY is set.
 *
 * @module
 */

import Anthropic from '@anthropic-ai/sdk'
import { modelFor } from './models.js'

/**
 * @typedef {{ type: 'text', text: string }} TextBlock
 * @typedef {{ type: 'image', source: { type: 'base64', media_type: string, data: string } }} ImageBlock
 * @typedef {TextBlock | ImageBlock} ContentBlock
 */

/** Default output ceiling. Critics write a page or two of prose, not files. */
const DEFAULT_MAX_TOKENS = 16000

/** Matches the CLI path's default hard timeout (10 min). */
const DEFAULT_TIMEOUT_MS = 600000

/**
 * Wrap an image buffer as an Anthropic image content block.
 *
 * JPEG only, by convention: snapshot.js captures both PNG and JPEG (q70) and
 * the JPEGs run 5-10x smaller for the same visual judgement.
 *
 * @param {Buffer} buffer
 * @param {string} [mediaType='image/jpeg']
 * @returns {ImageBlock}
 */
export function imageBlock(buffer, mediaType = 'image/jpeg') {
  return {
    type: 'image',
    source: { type: 'base64', media_type: mediaType, data: buffer.toString('base64') },
  }
}

/**
 * Wrap a string as a text content block.
 * @param {string} text
 * @returns {TextBlock}
 */
export function textBlock(text) {
  return { type: 'text', text }
}

/**
 * True when the SDK path is usable at all. No key means local Max-plan dev,
 * where multimodal input is not available to us.
 * @returns {boolean}
 */
export function hasApiKey() {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

/**
 * Adaptive thinking exists on the 4.6-and-later families. Haiku 4.5 rejects
 * it with a 400, so a tier change in models.js can't be allowed to break the
 * call — resolve the flag from the model ID rather than assuming.
 * @param {string} model
 * @returns {boolean}
 */
function supportsAdaptiveThinking(model) {
  return !model.startsWith('claude-haiku-4-5')
}

/**
 * Call Claude with structured content blocks (text + image) via the API.
 *
 * @param {string} agentName - pipeline agent name; also selects the model via modelFor()
 * @param {string} systemPrompt
 * @param {ContentBlock[]} contentBlocks - the single user turn's content
 * @param {object} [opts]
 * @param {string} [opts.apiKey] - defaults to process.env.ANTHROPIC_API_KEY
 * @param {string} [opts.model] - defaults to modelFor(agentName)
 * @param {number} [opts.maxTokens=16000]
 * @param {number} [opts.timeoutMs=600000]
 * @param {object|null} [opts.thinking] - null disables; defaults to adaptive where supported
 * @param {object} [opts.client] - injectable Anthropic client (tests)
 * @returns {Promise<string>} concatenated assistant text blocks
 */
export async function callClaudeSDK(agentName, systemPrompt, contentBlocks, opts = {}) {
  const apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error(`[${agentName}] callClaudeSDK requires ANTHROPIC_API_KEY`)
  if (!Array.isArray(contentBlocks) || contentBlocks.length === 0) {
    throw new Error(`[${agentName}] callClaudeSDK requires at least one content block`)
  }

  const model = opts.model ?? modelFor(agentName)
  const maxTokens = opts.maxTokens ?? DEFAULT_MAX_TOKENS
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const thinking =
    opts.thinking === undefined
      ? supportsAdaptiveThinking(model)
        ? { type: 'adaptive' }
        : null
      : opts.thinking

  const client = opts.client ?? new Anthropic({ apiKey, timeout: timeoutMs })

  const imageCount = contentBlocks.filter((b) => b.type === 'image').length
  const textChars = contentBlocks.reduce((n, b) => n + (b.type === 'text' ? b.text.length : 0), 0)
  console.log(
    `  [${agentName}] calling Anthropic SDK (model=${model}, ${imageCount} image block(s), ${(textChars / 1024).toFixed(0)}KB text)`
  )

  const started = Date.now()
  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: contentBlocks }],
    ...(thinking ? { thinking } : {}),
  })

  const text = (response.content ?? [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')

  const usage = response.usage ?? {}
  console.log(
    `  [${agentName}] SDK finished in ${Math.round((Date.now() - started) / 1000)}s ` +
      `(in=${usage.input_tokens ?? '?'}, out=${usage.output_tokens ?? '?'}, stop=${response.stop_reason ?? '?'}, ${(text.length / 1024).toFixed(0)}KB text)`
  )

  return text
}
