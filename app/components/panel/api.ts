export interface RatingIssue {
  number: number
  date: string
  title: string
  url: string
}

export interface Weights {
  signals: number
  inspiration: number
  ratings: number
  risk: number
}

export interface RunInfo {
  status: string
  conclusion: string | null
  url: string
  createdAt: string
}

export interface PanelStatus {
  unrated: RatingIssue[]
  weights: Weights
  latestRun: RunInfo | null
}

export interface RatingSubmission {
  date: string
  grade: 'A' | 'B' | 'C' | 'D'
  worked: string
  didnt: string
  try: string
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { ...(init?.body ? { 'content-type': 'application/json' } : {}), ...init?.headers },
  })
  const data: unknown = await res.json().catch(() => null)
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error ?? `Request failed (${res.status})`
    throw new Error(message)
  }
  return data as T
}

export const fetchStatus = () => request<PanelStatus>('/api/panel/status')
export const submitRating = (r: RatingSubmission) =>
  request<{ ok: true; issueUrl: string }>('/api/panel/rate', { method: 'POST', body: JSON.stringify(r) })
export const saveWeights = (w: Weights) =>
  request<{ ok: true }>('/api/panel/weights', { method: 'PUT', body: JSON.stringify(w) })
export const triggerRun = (dryRun: boolean) =>
  request<{ ok: true }>('/api/panel/run', { method: 'POST', body: JSON.stringify({ dry_run: dryRun }) })
