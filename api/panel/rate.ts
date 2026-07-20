import { requireAuth } from '../_lib/auth.js'
import { json } from '../_lib/http.js'
import { formatRatingComment, type Grade } from '../_lib/rating-format.js'
import { findOpenRatingIssue, commentOnIssue, createRatingIssue, GitHubError } from '../_lib/github.js'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const GRADE_RE = /^[A-D]$/

export async function POST(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const b = (body ?? {}) as Record<string, unknown>

  const grade = typeof b.grade === 'string' ? b.grade.trim().toUpperCase() : ''
  if (!GRADE_RE.test(grade)) return json({ error: 'grade must be A, B, C, or D' }, 400)

  const date = typeof b.date === 'string' && b.date ? b.date : new Date().toISOString().slice(0, 10)
  if (!DATE_RE.test(date)) return json({ error: 'date must be YYYY-MM-DD' }, 400)

  const str = (v: unknown) => (typeof v === 'string' ? v : '')
  const comment = formatRatingComment({
    grade: grade as Grade,
    worked: str(b.worked),
    didnt: str(b.didnt),
    try: str(b.try),
  })

  try {
    const existing = await findOpenRatingIssue(date)
    if (existing) {
      await commentOnIssue(existing.number, comment)
      return json({ ok: true, issueUrl: existing.url })
    }
    const created = await createRatingIssue(date, comment)
    return json({ ok: true, issueUrl: created.url })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
