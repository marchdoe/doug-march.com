import { requireAuth } from '../_lib/auth.js'
import { requireSameOrigin } from '../_lib/csrf.js'
import { json } from '../_lib/http.js'
import { listOpenRatingIssues, getWeights, latestRun, GitHubError } from '../_lib/github.js'

export async function GET(request: Request): Promise<Response> {
  // Provenance before identity: a 401 would make the browser prompt for
  // credentials on a page the owner did not choose to visit.
  const foreign = requireSameOrigin(request)
  if (foreign) return foreign

  const denied = requireAuth(request)
  if (denied) return denied
  try {
    const [unrated, weights, run] = await Promise.all([
      listOpenRatingIssues(),
      getWeights(),
      latestRun(),
    ])
    return json({ unrated, weights, latestRun: run })
  } catch (err) {
    if (err instanceof GitHubError)
      return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
