/**
 * Screenshot Critic — block assembly for the final pre-archive vision gate.
 * Pulled out of design-agents.js so the image-count guard and best-rated
 * reference wiring are unit-testable without the full orchestrator.
 */
import { imageBlock, textBlock } from '../utils/claude-sdk.js'

/** Hard ceiling on image blocks per call — mockup + light + dark + one
 * calibration reference. Keeps the SDK request bounded even if a future
 * caller adds more image sources upstream. */
export const MAX_SCREENSHOT_CRITIC_IMAGES = 4

/**
 * Assemble the screenshot-critic's user turn.
 *
 * @param {object} ctx
 * @param {string} ctx.enrichedBrief - hero copy, rationale, visual spec
 * @param {string} [ctx.references] - design reference block, if any
 * @param {{ jpeg: Buffer } | null} [ctx.mockupScreenshot] - approved mockup, if any
 * @param {{ jpeg: Buffer, darkJpeg: Buffer }} ctx.screenshotBuffer - rendered homepage, both schemes
 * @param {{ buffer: Buffer, description: string } | null} [ctx.bestReference] -
 *   the owner's highest-rated past build, for BAR calibration
 * @returns {Array<{type: string, text?: string, source?: object}>}
 */
export function buildScreenshotCriticBlocks(ctx) {
  const blocks = [
    // enrichedBrief carries hero copy, rationale, and the full visual spec.
    textBlock(`## Structured Brief\n\n${ctx.enrichedBrief}`),
    ctx.references ? textBlock(`## Design References\n\n${ctx.references}`) : null,
    ctx.mockupScreenshot ? textBlock('The APPROVED MOCKUP screenshot (fidelity target):') : null,
    ctx.mockupScreenshot ? imageBlock(ctx.mockupScreenshot.jpeg) : null,
    textBlock(
      "The rendered homepage in BOTH color schemes follows. ONE of them (the design's canonical mode) must match the mockup; the other is an adaptation and must stay a coherent, committed version of the same design — never a washed-out inversion.\n\nLIGHT scheme:"
    ),
    imageBlock(ctx.screenshotBuffer.jpeg),
    textBlock('DARK scheme:'),
    imageBlock(ctx.screenshotBuffer.darkJpeg),
  ].filter(Boolean)

  const imageCount = blocks.filter((b) => b.type === 'image').length
  if (ctx.bestReference && imageCount < MAX_SCREENSHOT_CRITIC_IMAGES) {
    // The promoted reference is the archived screenshot.png (findBestScreenshot
    // in collect-ratings.js only ever copies the PNG) — PNG media type, not
    // the default JPEG imageBlock assumes.
    blocks.push(
      textBlock("The owner's highest-rated past build, for calibration:"),
      imageBlock(ctx.bestReference.buffer, 'image/png')
    )
  }

  return blocks
}
