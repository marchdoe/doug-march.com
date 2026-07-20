import { requireAuth } from '../_lib/auth'
import { json } from '../_lib/http'
import { dispatchRun, GitHubError } from '../_lib/github'

export async function POST(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = {}
  }
  const dryRun = (body as Record<string, unknown> | null)?.dry_run === true

  try {
    await dispatchRun(dryRun)
    return json({ ok: true })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
