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

async function gh(path: string, init: RequestInit = {}): Promise<unknown> {
  const token = process.env.GH_PANEL_TOKEN
  if (!token) throw new GitHubError('GH_PANEL_TOKEN not configured', 503)
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'x-github-api-version': '2022-11-28',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
    },
  })
  if (res.status === 204) return null
  if (!res.ok)
    throw new GitHubError(`GitHub ${init.method ?? 'GET'} ${path} → ${res.status}`, res.status)
  return res.json()
}

export interface RatingIssue {
  number: number
  date: string
  title: string
  url: string
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
  return {
    number: raw.number as number,
    date,
    title: raw.title as string,
    url: raw.html_url as string,
  }
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
export interface Weights {
  signals: number
  inspiration: number
  ratings: number
  risk: number | null
}

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
        const parsed = parseInt(String(raw.value), 10)
        assign(key, Number.isNaN(parsed) ? fallback : parsed)
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

export async function setWeights(w: Weights): Promise<void> {
  await Promise.all(
    WEIGHT_VARS.map(async ({ key, name }) => {
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
    })
  )
}

export async function dispatchRun(dryRun: boolean): Promise<void> {
  await gh(`/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
    method: 'POST',
    body: JSON.stringify({ ref: 'main', inputs: { dry_run: String(dryRun) } }),
  })
}

export interface RunInfo {
  status: string
  conclusion: string | null
  url: string
  createdAt: string
}

export async function latestRun(): Promise<RunInfo | null> {
  const raw = (await gh(`/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`)) as Record<
    string,
    unknown
  >
  const runs = raw.workflow_runs as Array<Record<string, unknown>>
  const run = runs[0]
  if (!run) return null
  return {
    status: String(run.status),
    conclusion: run.conclusion === null ? null : String(run.conclusion),
    url: String(run.html_url),
    createdAt: String(run.created_at),
  }
}
