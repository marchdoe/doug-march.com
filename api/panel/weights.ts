import { requireAuth } from '../_lib/auth.js'
import { requireSameOrigin } from '../_lib/csrf.js'
import { json } from '../_lib/http.js'
import { setWeights, GitHubError, type Weights } from '../_lib/github.js'

const KEYS: Array<keyof Weights> = ['signals', 'inspiration', 'ratings', 'risk']

export async function PUT(request: Request): Promise<Response> {
  // Provenance before identity: a 401 would make the browser prompt for
  // credentials on a page the owner did not choose to visit.
  const foreign = requireSameOrigin(request)
  if (foreign) return foreign

  const denied = requireAuth(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const b = (body ?? {}) as Record<string, unknown>

  const weights = {} as Weights
  for (const key of KEYS) {
    const v = b[key]
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

  try {
    await setWeights(weights)
    return json({ ok: true })
  } catch (err) {
    if (err instanceof GitHubError)
      return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
