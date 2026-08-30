// app/types/panel.ts
//
// The owner panel's wire contract, declared once.
//
// These three interfaces were written out twice — in api/_lib/github.ts and
// again in app/components/panel/api.ts — with no link between them. Renaming a
// field on one side compiled cleanly on both and crashed at runtime in
// panel.tsx (`status.unrated` undefined → `unrated.length`). Type-only
// imports, so nothing crosses the api/ ↔ app/ boundary at runtime.

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
  /** null = unset; design-agents.js derives risk 3-10 from the build date. */
  risk: number | null
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
