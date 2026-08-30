import { withPanelGuards } from '../_lib/guards.js'
import { json } from '../_lib/http.js'
import { setWeights, type Weights } from '../_lib/github.js'

const KEYS: Array<keyof Weights> = ['signals', 'inspiration', 'ratings', 'risk']

export const PUT = withPanelGuards(async ({ body }) => {
  const weights = {} as Weights
  for (const key of KEYS) {
    const v = body[key]
    // risk alone accepts null, meaning "unset — let the build date decide".
    // setWeights turns that into a DELETE of WEIGHT_RISK.
    if (key === 'risk' && v === null) {
      weights.risk = null
      continue
    }
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 0 || v > 10) {
      return json(
        { error: `${key} must be an integer 0-10${key === 'risk' ? ' or null' : ''}` },
        400
      )
    }
    weights[key] = v
  }

  await setWeights(weights)
  return json({ ok: true })
})
