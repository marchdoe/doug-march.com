/**
 * Per-agent model resolution with a dev/prod tier.
 *
 * Prod uses the best model per job — Opus for the art director and mockup
 * designer, where design taste matters most. Dev caps every agent at
 * DEV_CEILING (Sonnet) so local runs stay off the Max-plan Opus budget: on a
 * subscription, Opus usage is weighted heavily against the rolling rate
 * limit, so a single Opus call burns far more allowance than the same work
 * on Sonnet. Removing it is what lets a local run complete without
 * throttling.
 *
 * Tiers resolve to explicit model IDs (MODEL_IDS) rather than CLI aliases.
 * CI pins the claude CLI at 2.1.92, whose 'opus'/'sonnet' alias mapping is
 * frozen at whatever was current when that version shipped; explicit IDs
 * pass through to the API and stay current regardless of the CLI pin.
 *
 * Tier selection (default): an API key present means billed/API usage (CI or a
 * deliberate `ANTHROPIC_API_KEY=... node ...` local run) → PROD models, off the
 * subscription pool. No API key means a local Max-plan run → DEV cap. The
 * `PIPELINE_TIER=dev|prod` env var overrides this either way.
 */

export const PROD_MODELS = {
  'art-director': 'opus',
  'spec-critic': 'haiku',
  'mockup-designer': 'opus',
  'mockup-critic': 'sonnet',
  'react-engineer': 'sonnet',
  'screenshot-critic': 'sonnet',
}

export const MODEL_IDS = {
  haiku: 'claude-haiku-4-5',
  sonnet: 'claude-sonnet-5',
  opus: 'claude-opus-4-8',
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
 * Resolve the model ID for an agent, capped to the dev ceiling in dev tier.
 * @param {string} agentName
 * @returns {string} Explicit model ID (e.g. 'claude-opus-4-8')
 */
export function modelFor(agentName) {
  const tier = PROD_MODELS[agentName] || 'sonnet'
  if (!isDevModelTier()) return MODEL_IDS[tier]
  return MODEL_IDS[TIER_RANK[tier] > TIER_RANK[DEV_CEILING] ? DEV_CEILING : tier]
}
