import { withPanelGuards } from '../_lib/guards.js'
import { json } from '../_lib/http.js'
import { listOpenRatingIssues, getWeights, latestRun } from '../_lib/github.js'

export const GET = withPanelGuards(async () => {
  const [unrated, weights, run] = await Promise.all([
    listOpenRatingIssues(),
    getWeights(),
    latestRun(),
  ])
  return json({ unrated, weights, latestRun: run })
})
