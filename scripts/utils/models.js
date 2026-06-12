/**
 * Per-agent model resolution with a dev/prod tier.
 *
 * Prod uses the best model per job — Opus for the mockup designer, where
 * design taste matters most. Dev caps every agent at DEV_CEILING (Sonnet) so
 * local runs stay off the Max-plan Opus budget: on a subscription, Opus usage
 * is weighted heavily against the rolling rate limit, so a single Opus call
 * burns far more allowance than the same work on Sonnet. Removing it is what
 * lets a local run complete without throttling.
 *
 * Tier selection (default): an API key present means billed/API usage (CI or a
 * deliberate `ANTHROPIC_API_KEY=... node ...` local run) → PROD models, off the
 * subscription pool. No API key means a local Max-plan run → DEV cap. The
 * `PIPELINE_TIER=dev|prod` env var overrides this either way.
 */

export const PROD_MODELS = {
  'art-director': 'sonnet',
  'spec-critic': 'haiku',
  'mockup-designer': 'opus',
  'mockup-critic': 'sonnet',
  'react-engineer': 'sonnet',
}

const TIER_RANK = { haiku: 0, sonnet: 1, opus: 2 }
const DEV_CEILING = 'sonnet'

export function isDevModelTier() {
  const tier = process.env.PIPELINE_TIER
  if (tier === 'prod') return false
  if (tier === 'dev') return true
  // No explicit tier: API key → prod (billed, off the subscription pool);
  // otherwise → dev (local Max-plan run, cap to spare the Opus budget).
  return !process.env.ANTHROPIC_API_KEY
}

/**
 * Resolve the model alias for an agent, capped to the dev ceiling in dev tier.
 * @param {string} agentName
 * @returns {'haiku'|'sonnet'|'opus'}
 */
export function modelFor(agentName) {
  const prod = PROD_MODELS[agentName] || 'sonnet'
  if (!isDevModelTier()) return prod
  return TIER_RANK[prod] > TIER_RANK[DEV_CEILING] ? DEV_CEILING : prod
}
