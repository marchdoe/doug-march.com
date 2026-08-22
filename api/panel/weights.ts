import { requireAuth } from '../_lib/auth.js'
import { json } from '../_lib/http.js'
import { setWeights, GitHubError, type Weights } from '../_lib/github.js'

const KEYS: Array<keyof Weights> = ['signals', 'inspiration', 'ratings', 'risk']

export async function PUT(request: Request): Promise<Response> {
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
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 0 || v > 10) {
      return json({ error: `${key} must be an integer 0-10` }, 400)
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
