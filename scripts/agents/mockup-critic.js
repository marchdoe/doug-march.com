/**
 * Mockup Critic — blocking vision gate over the mockup screenshot.
 * Fail-closed: malformed responses count as REVISE.
 */
import { imageBlock, textBlock } from '../utils/claude-sdk.js'
import { parseCriticVerdict } from '../utils/critic-verdict.js'
import { callVisionAgent } from '../utils/vision-router.js'

export function parseMockupCriticResponse(raw) {
  const { verdict, malformed } = parseCriticVerdict(raw, 'APPROVE')
  // Feedback tolerates a missing ===END=== (truncated responses) so a
  // REVISE round never goes back to the designer with empty feedback.
  // Last occurrence wins, mirroring the verdict rule.
  const feedbackMatches = [
    ...String(raw ?? '').matchAll(/===FEEDBACK===\s*\n([\s\S]*?)(?:===END===|$)/g),
  ]
  if (malformed) {
    return {
      verdict: 'REVISE',
      feedback: `malformed critic response: ${String(raw).slice(0, 300)}`,
    }
  }
  return {
    verdict,
    feedback: feedbackMatches.length ? feedbackMatches[feedbackMatches.length - 1][1].trim() : '',
  }
}

/**
 * @param {{ systemPrompt: string, screenshotBuffer: Buffer, enrichedBrief: string, measurables: string, shell: string }} ctx
 * @returns {Promise<{ verdict: 'APPROVE'|'REVISE', feedback: string }>}
 */
export async function runMockupCritic(ctx) {
  // Record which channel answered. A verdict reached without pixels is a
  // different thing from one reached with them, and verdicts.json is where
  // that has to be visible after the fact.
  let channel = 'unknown'
  const raw = await callVisionAgent({
    agentName: 'mockup-critic',
    systemPrompt: ctx.systemPrompt,
    contentBlocks: buildMockupCriticBlocks(ctx),
    timeoutMs: 600000,
    stallTimeoutMs: 300000,
    onChannel: (c) => {
      channel = c
    },
  })
  return { ...parseMockupCriticResponse(raw), channel }
}

/**
 * Assemble the critic's user turn: the declared intent as text, then the
 * rendered mockup as a real image block. Exported for tests.
 *
 * @param {{ screenshotBuffer: Buffer, enrichedBrief: string, measurables: string, shell: string }} ctx
 * @returns {Array<{type: string, text?: string, source?: object}>}
 */
export function buildMockupCriticBlocks(ctx) {
  return [
    textBlock(`## Brief + Visual Specification\n\n${ctx.enrichedBrief}`),
    textBlock(`## Measurables (declared floors)\n\n${ctx.measurables}`),
    textBlock(`## Shell Declaration\n\n${ctx.shell}`),
    textBlock('The screenshot of the rendered mockup (1440×900) follows:'),
    imageBlock(ctx.screenshotBuffer),
  ]
}
