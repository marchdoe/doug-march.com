import { requireAuth } from '../_lib/auth'
import { json } from '../_lib/http'
import { listOpenRatingIssues, getWeights, latestRun, GitHubError } from '../_lib/github'

export async function GET(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied
  try {
    const [unrated, weights, run] = await Promise.all([listOpenRatingIssues(), getWeights(), latestRun()])
    return json({ unrated, weights, latestRun: run })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
