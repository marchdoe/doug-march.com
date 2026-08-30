/**
 * Screenshot Critic — block assembly for the final pre-archive vision gate.
 * Pulled out of design-agents.js so the image-count guard and best-rated
 * reference wiring are unit-testable without the full orchestrator.
 */
import { imageBlock, textBlock } from '../utils/claude-sdk.js'

/** Hard ceiling on image blocks per call — mockup + light + dark + the two
 * header crops + one calibration reference. Keeps the SDK request bounded
 * even if a future caller adds more image sources upstream.
 *
 * The header crops cost about 1.2k image tokens each and are the only place
 * the critic can read a mark size off, so when the ceiling binds it is the
 * calibration reference that is dropped, not a crop. */
export const MAX_SCREENSHOT_CRITIC_IMAGES = 6

/**
 * Assemble the screenshot-critic's user turn.
 *
 * @param {object} ctx
 * @param {string} ctx.enrichedBrief - hero copy, rationale, visual spec
 * @param {string} [ctx.references] - design reference block, if any
 * @param {{ jpeg: Buffer, headerJpeg?: Buffer|null } | null} [ctx.mockupScreenshot] - approved mockup, if any
 * @param {{ jpeg: Buffer, darkJpeg: Buffer, headerJpeg?: Buffer|null }} ctx.screenshotBuffer - rendered homepage, both schemes
 * @param {string} [ctx.header] - the day's ===HEADER=== declaration
 * @param {{ buffer: Buffer, description: string } | null} [ctx.bestReference] -
 *   the owner's highest-rated past build, for BAR calibration
 * @returns {Array<{type: string, text?: string, source?: object}>}
 */
export function buildScreenshotCriticBlocks(ctx) {
  const blocks = [
    // enrichedBrief carries hero copy, rationale, and the full visual spec.
    textBlock(`## Structured Brief\n\n${ctx.enrichedBrief}`),
    ctx.header ? textBlock(`## Header Declaration\n\n${ctx.header}`) : null,
    ctx.references ? textBlock(`## Design References\n\n${ctx.references}`) : null,
    ctx.mockupScreenshot ? textBlock('The APPROVED MOCKUP screenshot (fidelity target):') : null,
    ctx.mockupScreenshot ? imageBlock(ctx.mockupScreenshot.jpeg) : null,
    textBlock(
      "The rendered homepage in BOTH color schemes follows. ONE of them (the design's canonical mode) must match the mockup; the other is an adaptation and must stay a coherent, committed version of the same design — never a washed-out inversion.\n\nLIGHT scheme:"
    ),
    imageBlock(ctx.screenshotBuffer.jpeg),
    textBlock('DARK scheme:'),
    imageBlock(ctx.screenshotBuffer.darkJpeg),
    // Two 2x crops of the header region, mockup first, then render. Section 9
    // of the prompt is judged off these — the full-page shots arrive at 1024px
    // wide, where a mark at a quarter of its declared size is indistinguishable
    // from one at full size (#254).
    ctx.mockupScreenshot?.headerJpeg
      ? textBlock("A 2x crop of the APPROVED MOCKUP's header region:")
      : null,
    ctx.mockupScreenshot?.headerJpeg ? imageBlock(ctx.mockupScreenshot.headerJpeg) : null,
    ctx.screenshotBuffer.headerJpeg
      ? textBlock(
          "A 2x crop of the RENDERED page's header region, same viewport and same region. Measure the mark against the declared mark_px here, and against the mockup crop above:"
        )
      : null,
    ctx.screenshotBuffer.headerJpeg ? imageBlock(ctx.screenshotBuffer.headerJpeg) : null,
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
