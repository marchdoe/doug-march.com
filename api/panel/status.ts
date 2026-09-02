import { withPanelGuards } from '../_lib/guards.js'
import { json } from '../_lib/http.js'
import { listOpenRatingIssues, getWeights, latestRun, GitHubError } from '../_lib/github.js'
import type { PanelStatus, StatusSection } from '../../app/types/panel.js'

function describe(reason: unknown): string {
  if (reason instanceof GitHubError) return `GitHub error (${reason.status}) — try again`
  console.error('panel status section failed', reason)
  return 'Internal error'
}

/**
 * Three independent GitHub reads. One flaky variable fetch used to turn the
 * whole response into a 502 (#334); now each section fails on its own and the
 * panel renders what it got. Only when every section fails does the guard's
 * error mapping apply, so a dead GitHub still reads as one 502.
 */
export const GET = withPanelGuards(async () => {
  const settled = await Promise.allSettled([listOpenRatingIssues(), getWeights(), latestRun()])
  if (settled.every((r) => r.status === 'rejected')) {
    throw (settled[0] as PromiseRejectedResult).reason
  }

  const errors: PanelStatus['errors'] = {}
  const take = <T>(key: StatusSection, r: PromiseSettledResult<T>): T | null => {
    if (r.status === 'fulfilled') return r.value
    errors[key] = describe(r.reason)
    return null
  }
  const [unrated, weights, run] = settled
  const status: PanelStatus = {
    unrated: take('unrated', unrated) ?? [],
    weights: take('weights', weights),
    latestRun: take('latestRun', run),
    errors,
  }
  return json(status)
})
