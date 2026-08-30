/**
 * Screenshot Critic — block assembly for the final pre-archive vision gate.
 * Pulled out of design-agents.js so the image-count guard and best-rated
 * reference wiring are unit-testable without the full orchestrator.
 */
import { imageBlock, textBlock } from '../utils/claude-sdk.js'

/**
 * Hard ceiling on image blocks per call.
 *
 * Was four — mockup, light, dark, one calibration reference — which is exactly
 * what the homepage-only critic spent. #215 found that the surfaces nobody
 * looks at are where defects ship: `/work/<slug>` had its prev/next navigation
 * rendered twice at every viewport in both schemes, and no critic had ever
 * opened that route. Six admits one project page and the share card in the
 * design's canonical scheme.
 *
 * It stops at six on purpose. The geometry of every route at both rungs is
 * already covered by `surface-gate.js`, which measures rather than looks and
 * so costs nothing; images are reserved for the judgements measurement cannot
 * make. Raising this further buys re-litigation of facts the gate already
 * established, at roughly 1.7k tokens an image.
 */
export const MAX_SCREENSHOT_CRITIC_IMAGES = 6

/**
 * Assemble the screenshot-critic's user turn.
 *
 * Ordering is deliberate: brief, then measured faults, then references, then
 * pixels. The model should know what is already established before it starts
 * forming opinions from a downscaled JPEG.
 *
 * @param {object} ctx
 * @param {string} ctx.enrichedBrief - hero copy, rationale, visual spec
 * @param {string} [ctx.measuredFaults] - rendered output of
 *   `surface-gate.formatFindingsForCritic`; empty string when nothing is wrong
 * @param {string} [ctx.references] - design reference block, if any
 * @param {{ jpeg: Buffer } | null} [ctx.mockupScreenshot] - approved mockup, if any
 * @param {{ jpeg: Buffer, darkJpeg: Buffer }} ctx.screenshotBuffer - rendered homepage, both schemes
 * @param {Array<{ label: string, png: Buffer }>} [ctx.routeShots] - additional
 *   routes in the canonical scheme, appended while the ceiling allows
 * @param {{ buffer: Buffer, description: string } | null} [ctx.bestReference] -
 *   the owner's highest-rated past build, for BAR calibration
 * @returns {Array<{type: string, text?: string, source?: object}>}
 */
export function buildScreenshotCriticBlocks(ctx) {
  const blocks = [
    // enrichedBrief carries hero copy, rationale, and the full visual spec.
    textBlock(`## Structured Brief\n\n${ctx.enrichedBrief}`),
    ctx.measuredFaults ? textBlock(ctx.measuredFaults) : null,
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

  const countImages = () => blocks.filter((b) => b.type === 'image').length

  // Other surfaces the pipeline rewrites nightly. These are PNG, straight from
  // captureRouteScreenshot — not the JPEG pair captureScreenshot returns.
  if (ctx.routeShots?.length) {
    let announced = false
    for (const shot of ctx.routeShots) {
      if (countImages() >= MAX_SCREENSHOT_CRITIC_IMAGES - 1) break
      if (!announced) {
        blocks.push(
          textBlock(
            'Other surfaces this build rewrote. They wear the same design and are judged by the same brief, but they are not the homepage and should not be expected to repeat its composition.'
          )
        )
        announced = true
      }
      blocks.push(textBlock(shot.label), imageBlock(shot.png, 'image/png'))
    }
  }

  if (ctx.bestReference && countImages() < MAX_SCREENSHOT_CRITIC_IMAGES) {
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
