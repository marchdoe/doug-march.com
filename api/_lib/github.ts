import type { RatingIssue, RunInfo, Weights } from '../../app/types/panel.js'

export type { RatingIssue, RunInfo, Weights }

const API = 'https://api.github.com'
/**
 * The repository the panel drives. Exported so tests assert against this rather
 * than spelling it out: the repo was renamed from `doug-march.com` to
 * `dougmar.ch` on 2026-08-29, and four assertions had to be hand-edited because
 * they carried the literal. GitHub redirects old paths, so a stale value fails
 * quietly rather than loudly — which is the reason to have one source of truth.
 */
export const REPO = 'marchdoe/dougmar.ch'
const WORKFLOW = 'daily-redesign.yml'

export class GitHubError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
    this.name = 'GitHubError'
  }
}

/**
 * A hung GitHub call otherwise runs until the function's own max duration and
 * returns a non-JSON 504. /api/panel/status alone fans out to six calls per
 * load, so the exposure is per-request rather than rare.
 */
const GH_TIMEOUT_MS = 8_000

async function gh(path: string, init: RequestInit = {}): Promise<unknown> {
  const token = process.env.GH_PANEL_TOKEN
  if (!token) throw new GitHubError('GH_PANEL_TOKEN not configured', 503)

  let res: Response
  try {
    res = await fetch(`${API}${path}`, {
      ...init,
      signal: AbortSignal.timeout(GH_TIMEOUT_MS),
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${token}`,
        'x-github-api-version': '2022-11-28',
        ...(init.body ? { 'content-type': 'application/json' } : {}),
      },
    })
  } catch (err) {
    // Timeout or network failure. Surfaced as a GitHubError so the handlers'
    // 502 mapping catches it instead of it escaping as an unhandled throw.
    const reason = err instanceof Error ? err.name : 'network error'
    throw new GitHubError(`GitHub ${init.method ?? 'GET'} ${path} → ${reason}`, 504)
  }

  if (res.status === 204) return null
  if (!res.ok)
    throw new GitHubError(`GitHub ${init.method ?? 'GET'} ${path} → ${res.status}`, res.status)

  // A 2xx with a non-JSON body threw a SyntaxError, which is not a GitHubError
  // and so escaped every handler's catch.
  try {
    return await res.json()
  } catch {
    throw new GitHubError(`GitHub ${init.method ?? 'GET'} ${path} → non-JSON 2xx body`, 502)
  }
}

const DATE_RE = /Rate:\s*(\d{4}-\d{2}-\d{2})/

export async function listOpenRatingIssues(): Promise<RatingIssue[]> {
  const raw = (await gh(
    `/repos/${REPO}/issues?labels=daily-rating&state=open&per_page=30`
  )) as Array<Record<string, unknown>>
  const issues: RatingIssue[] = []
  for (const issue of raw) {
    const title = typeof issue.title === 'string' ? issue.title : ''
    const date = DATE_RE.exec(title)?.[1]
    if (!date || typeof issue.number !== 'number' || typeof issue.html_url !== 'string') continue
    issues.push({ number: issue.number, date, title, url: issue.html_url })
  }
  return issues
}

export async function findOpenRatingIssue(date: string): Promise<RatingIssue | null> {
  const issues = await listOpenRatingIssues()
  return issues.find((i) => i.date === date) ?? null
}

export async function commentOnIssue(issueNumber: number, body: string): Promise<void> {
  await gh(`/repos/${REPO}/issues/${issueNumber}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  })
}

export async function createRatingIssue(date: string, body: string): Promise<RatingIssue> {
  const raw = (await gh(`/repos/${REPO}/issues`, {
    method: 'POST',
    body: JSON.stringify({ title: `Rate: ${date}`, body, labels: ['daily-rating'] }),
  })) as Record<string, unknown>
  // listOpenRatingIssues narrows these same three fields properly; this one
  // asserted them, so a shape change surfaced as undefined in the panel.
  if (
    typeof raw?.number !== 'number' ||
    typeof raw.title !== 'string' ||
    typeof raw.html_url !== 'string'
  ) {
    throw new GitHubError('GitHub POST /issues → unexpected response shape', 502)
  }
  return { number: raw.number, date, title: raw.title, url: raw.html_url }
}

/**
 * `risk` is nullable and the others are not, which is deliberate.
 *
 * `resolveRiskWeight` in scripts/design-agents.js derives risk 3-10 from the
 * build date whenever WEIGHT_RISK is unset, so that every day does not get the
 * same "BOLD" sentence in the Art Director prompt. An explicitly-set value wins
 * — including 0, which is falsy but not unset.
 *
 * Before this, the panel could not express "unset": `getWeights` fell back to 8
 * on a 404 and `setWeights` wrote all four variables unconditionally. So the
 * panel displayed 8 for a variable that did not exist, and saving materialised
 * it. That is exactly what had happened by 2026-08-29 — WEIGHT_RISK was pinned
 * at 8, the derived dial never ran, and the Max-Risk License (risk >= 9) had
 * never once fired.
 *
 * `null` means unset: read as absent, written as a DELETE.
 */
const WEIGHT_VARS: Array<{ key: keyof Weights; name: string; fallback: number | null }> = [
  { key: 'signals', name: 'WEIGHT_SIGNALS', fallback: 5 },
  { key: 'inspiration', name: 'WEIGHT_INSPIRATION', fallback: 5 },
  { key: 'ratings', name: 'WEIGHT_RATINGS', fallback: 5 },
  // No numeric fallback: absent means "let the date decide".
  { key: 'risk', name: 'WEIGHT_RISK', fallback: null },
]

export async function getWeights(): Promise<Weights> {
  const weights: Weights = { signals: 5, inspiration: 5, ratings: 5, risk: null }

  // Only `risk` is nullable, so a null can only ever land there. Writing this
  // out rather than casting keeps the compiler enforcing that.
  const assign = (key: keyof Weights, value: number | null) => {
    if (key === 'risk') weights.risk = value
    else if (value !== null) weights[key] = value
  }

  await Promise.all(
    WEIGHT_VARS.map(async ({ key, name, fallback }) => {
      try {
        const raw = (await gh(`/repos/${REPO}/actions/variables/${name}`)) as Record<
          string,
          unknown
        >
        // parseInt('7abc') is 7 and parseInt('99') is 99; both would reach
        // the panel slider as values the PUT validator would then reject.
        const parsed = Number(String(raw.value).trim())
        const usable = Number.isInteger(parsed) && parsed >= 0 && parsed <= 10
        assign(key, usable ? parsed : fallback)
      } catch (err) {
        if (err instanceof GitHubError && err.status === 404) {
          assign(key, fallback)
          return
        }
        throw err
      }
    })
  )
  return weights
}

/**
 * Written one at a time, on purpose.
 *
 * Promise.all fired all four and, when one failed, the others had already been
 * written — the panel showed an error and the owner could not tell which
 * weights had landed. Sequential means the error names the first variable that
 * failed and everything after it is untouched.
 */
export async function setWeights(w: Weights): Promise<void> {
  for (const { key, name } of WEIGHT_VARS) {
    await writeWeight(w, key, name)
  }
}

async function writeWeight(w: Weights, key: keyof Weights, name: string): Promise<void> {
  try {
    await (async () => {
      const value = w[key]

      // null means "unset" — delete the variable so design-agents.js derives it
      // from the build date. A 404 here is success: it was already absent.
      if (value === null) {
        try {
          await gh(`/repos/${REPO}/actions/variables/${name}`, { method: 'DELETE' })
        } catch (err) {
          if (err instanceof GitHubError && err.status === 404) return
          throw err
        }
        return
      }

      const payload = JSON.stringify({ name, value: String(value) })
      try {
        await gh(`/repos/${REPO}/actions/variables/${name}`, { method: 'PATCH', body: payload })
      } catch (err) {
        if (err instanceof GitHubError && err.status === 404) {
          await gh(`/repos/${REPO}/actions/variables`, { method: 'POST', body: payload })
          return
        }
        throw err
      }
    })()
  } catch (err) {
    if (err instanceof GitHubError) {
      throw new GitHubError(`${name}: ${err.message}`, err.status)
    }
    throw err
  }
}

export async function dispatchRun(dryRun: boolean): Promise<void> {
  await gh(`/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
    method: 'POST',
    body: JSON.stringify({ ref: 'main', inputs: { dry_run: String(dryRun) } }),
  })
}

export async function latestRun(): Promise<RunInfo | null> {
  const raw = (await gh(`/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`)) as Record<
    string,
    unknown
  >
  // `raw.workflow_runs as Array<…>` then `runs[0]` threw a TypeError when the
  // field was absent — not a GitHubError, so it escaped the handler's catch.
  const runs = Array.isArray(raw?.workflow_runs) ? raw.workflow_runs : []
  const run = runs[0] as Record<string, unknown> | undefined
  if (!run) return null
  return {
    status: String(run.status),
    conclusion: run.conclusion === null ? null : String(run.conclusion),
    url: String(run.html_url),
    createdAt: String(run.created_at),
  }
}
