/**
 * Mockup Critic — blocking vision gate over the mockup screenshot.
 * Fail-closed: malformed responses count as REVISE.
 */
import { callClaudeCLI } from '../utils/claude-cli.js'

export function parseMockupCriticResponse(raw) {
  const verdictMatch = /===VERDICT===\s*\n\s*(APPROVE|REVISE)/.exec(raw)
  const feedbackMatch = /===FEEDBACK===\s*\n([\s\S]*?)===END===/.exec(raw)
  if (!verdictMatch) {
    return { verdict: 'REVISE', feedback: `malformed critic response: ${String(raw).slice(0, 300)}` }
  }
  return {
    verdict: verdictMatch[1],
    feedback: feedbackMatch ? feedbackMatch[1].trim() : '',
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
    model: 'sonnet',
  })
  return parseMockupCriticResponse(raw)
}
