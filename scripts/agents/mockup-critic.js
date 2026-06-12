/**
 * Mockup Critic — blocking vision gate over the mockup screenshot.
 * Fail-closed: malformed responses count as REVISE.
 */
import { callClaudeCLI } from '../utils/claude-cli.js'
import { modelFor } from '../utils/models.js'

export function parseMockupCriticResponse(raw) {
  // Verdict must sit alone on its line (rejects a literal echo of the
  // template's "APPROVE | REVISE"), and the LAST occurrence wins so a
  // quoted example earlier in the response can't shadow the real verdict.
  const verdictMatches = [...String(raw ?? '').matchAll(/===VERDICT===\s*\r?\n\s*(APPROVE|REVISE)\s*$/gm)]
  // Feedback tolerates a missing ===END=== (truncated responses) so a
  // REVISE round never goes back to the designer with empty feedback.
  // Last occurrence wins, mirroring the verdict rule.
  const feedbackMatches = [...String(raw ?? '').matchAll(/===FEEDBACK===\s*\n([\s\S]*?)(?:===END===|$)/g)]
  if (verdictMatches.length === 0) {
    return { verdict: 'REVISE', feedback: `malformed critic response: ${String(raw).slice(0, 300)}` }
  }
  return {
    verdict: verdictMatches[verdictMatches.length - 1][1],
    feedback: feedbackMatches.length ? feedbackMatches[feedbackMatches.length - 1][1].trim() : '',
  }
}

/**
 * @param {{ systemPrompt: string, screenshotBuffer: Buffer, enrichedBrief: string, measurables: string, shell: string }} ctx
 * @returns {Promise<{ verdict: 'APPROVE'|'REVISE', feedback: string }>}
 */
export async function runMockupCritic(ctx) {
  const userPrompt = [
    '## Brief + Visual Specification\n\n' + ctx.enrichedBrief,
    '## Measurables (declared floors)\n\n' + ctx.measurables,
    '## Shell Declaration\n\n' + ctx.shell,
    'A screenshot of the rendered mockup (1440×900) is attached as a base64 PNG image below.\n\n' +
      '![Mockup Screenshot](data:image/png;base64,' + ctx.screenshotBuffer.toString('base64') + ')',
  ].join('\n\n---\n\n')

  const raw = await callClaudeCLI('mockup-critic', ctx.systemPrompt, userPrompt, {
    timeoutMs: 600000,
    stallTimeoutMs: 300000,
    model: modelFor('mockup-critic'),
  })
  return parseMockupCriticResponse(raw)
}
