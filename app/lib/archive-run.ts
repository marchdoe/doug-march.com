/**
 * The run, stage by stage — #415.
 *
 * The projection lifts two files the pipeline writes per build: `trace.json`,
 * one step per timed stage, and `cost.json`, one entry per agent call. They do
 * not map one to one. The trace times a mockup round as one `mockup-critic`
 * step that contains the designer's work; the cost file bills the designer and
 * the critic as separate calls. The trace has one `react-engineer` step; the
 * cost file has two calls, because the revision pass never got its own step.
 *
 * So when calls exist they are the spine, since they are the complete list of
 * agent work in order, and the trace contributes the gates in between. When
 * there is no cost file (every day before 2026-08-23), the trace is all there
 * is and every step is a row.
 *
 * This module is pure and tested; the page is a renderer.
 */

export interface RunStep {
  name: string
  phase: number | null
  durationMs: number
  /** When the step ended. The trace stamps a step as it finishes. */
  endedAt: string
}

export interface RunCall {
  agent: string
  model: string | null
  ms: number | null
  costUsd: number | null
  estimated: boolean
}

/** What `generate-archive-json.js` writes as `run`, or null without a trace. */
export interface Run {
  startedAt: string | null
  completedAt: string | null
  steps: RunStep[]
  /** Null when the day has no cost file. */
  calls: RunCall[] | null
  totalUsd: number | null
  estimated: boolean
  retries: number | null
}

export interface StageRow {
  label: string
  kind: 'agent' | 'gate'
  model: string | null
  durationMs: number | null
  costUsd: number | null
  estimated: boolean
  /** 1-based repeat of the same label; null when the label appears once. */
  round: number | null
}

/** The pipeline's names, made readable. Old eras' names stay so they still read. */
const LABELS: Record<string, string> = {
  'art-director': 'Art Director',
  'spec-critic': 'Spec Critic',
  'mockup-designer': 'Mockup Designer',
  'mockup-critic': 'Mockup Critic',
  'react-engineer': 'React Engineer',
  'screenshot-critic': 'Screenshot Critic',
  'design-director': 'Design Director',
  'token-designer': 'Token Designer',
  'unified-designer': 'Unified Designer',
  'surface-gate': 'Surface gate',
  'build-validation': 'Build',
}

/** Steps that are an agent's turn. Anything else the trace times is a gate. */
const AGENTS = new Set([
  'art-director',
  'spec-critic',
  'mockup-designer',
  'mockup-critic',
  'react-engineer',
  'screenshot-critic',
  'design-director',
  'token-designer',
  'unified-designer',
])

const titleCase = (name: string): string =>
  name
    .split('-')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')

export const stageLabel = (name: string): string => LABELS[name] ?? titleCase(name)

const kindOf = (name: string): StageRow['kind'] => (AGENTS.has(name) ? 'agent' : 'gate')

const stepRow = (step: RunStep): StageRow => ({
  label: stageLabel(step.name),
  kind: kindOf(step.name),
  model: null,
  durationMs: step.durationMs,
  costUsd: null,
  estimated: false,
  round: null,
})

const callRow = (call: RunCall): StageRow => ({
  label: stageLabel(call.agent),
  kind: 'agent',
  model: call.model,
  durationMs: call.ms,
  costUsd: call.costUsd,
  estimated: call.estimated,
  round: null,
})

/** Repeats of a label get a round number; a label seen once gets none. */
function numberRounds(rows: StageRow[]): StageRow[] {
  const total = new Map<string, number>()
  for (const r of rows) total.set(r.label, (total.get(r.label) ?? 0) + 1)
  const seen = new Map<string, number>()
  return rows.map((r) => {
    if ((total.get(r.label) ?? 0) < 2) return r
    const n = (seen.get(r.label) ?? 0) + 1
    seen.set(r.label, n)
    return { ...r, round: n }
  })
}

const at = (iso: string | null): number => (iso ? Date.parse(iso) : Number.NaN)

interface Timed {
  row: StageRow
  t: number
}

/**
 * Pair the k-th trace step of a name with the k-th call of that agent. The
 * paired step lends the call its end time, so gates can be placed among the
 * calls; the call's own `ms` is the agent's time.
 */
function pairSteps(steps: RunStep[], calls: RunCall[]): Map<number, RunStep> {
  const byAgent = new Map<string, number[]>()
  calls.forEach((c, i) => {
    byAgent.set(c.agent, [...(byAgent.get(c.agent) ?? []), i])
  })
  const seen = new Map<string, number>()
  const paired = new Map<number, RunStep>()
  for (const step of steps) {
    const k = seen.get(step.name) ?? 0
    seen.set(step.name, k + 1)
    const idx = byAgent.get(step.name)?.[k]
    if (idx !== undefined) paired.set(idx, step)
  }
  return paired
}

/**
 * When each call ended. A paired call ends when its step did. An unpaired
 * call (the designer inside a critic round, the engineer's revision pass)
 * takes the end of the next paired call after it, and when there is none,
 * runs its own `ms` past the row before it.
 */
function timeCalls(run: Run, calls: RunCall[], paired: Map<number, RunStep>): Timed[] {
  const nextPairedEnd = (from: number): number => {
    for (let j = from + 1; j < calls.length; j++) {
      const step = paired.get(j)
      if (step) return at(step.endedAt)
    }
    return Number.NaN
  }
  const timed: Timed[] = []
  calls.forEach((call, i) => {
    const step = paired.get(i)
    let t = step ? at(step.endedAt) : nextPairedEnd(i)
    if (Number.isNaN(t)) {
      const prev = timed.at(-1)?.t ?? at(run.startedAt)
      t = Number.isNaN(prev) ? at(run.completedAt) : prev + (call.ms ?? 0)
    }
    timed.push({ row: callRow(call), t })
  })
  return timed
}

/**
 * One ordered list of rows for the run. See the module note for the merge
 * rule; in short, calls are the spine when they exist, and trace steps with no
 * call to pair with are slotted in after the last row that ended before them.
 */
export function runStages(run: Run): StageRow[] {
  if (!run.calls) return numberRounds(run.steps.map(stepRow))

  const paired = pairSteps(run.steps, run.calls)
  const rows = timeCalls(run, run.calls, paired)
  const pairedSteps = new Set(paired.values())

  for (const step of run.steps) {
    if (pairedSteps.has(step)) continue
    const t = at(step.endedAt)
    let i = rows.length
    while (i > 0 && !(rows[i - 1].t <= t)) i--
    rows.splice(i, 0, { row: stepRow(step), t })
  }

  return numberRounds(rows.map((r) => r.row))
}

/** The run's wall clock, or null when either end is missing. */
export function runWallClockMs(run: Run): number | null {
  const ms = at(run.completedAt) - at(run.startedAt)
  return Number.isNaN(ms) || ms < 0 ? null : ms
}

/** `5m 18s`, `37s`, `<1s`; an hour reads `1h 4m`. Rounded to the second. */
export function formatDuration(ms: number): string {
  if (ms < 1000) return '<1s'
  const total = Math.round(ms / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

/** `$0.76`, `$0.04`; two decimals, never scientific. */
export function formatUsd(usd: number): string {
  return `$${usd.toFixed(2)}`
}

/**
 * `claude-opus-4-8` reads `Opus 4.8`; a dated id like `claude-haiku-4-5-20251001`
 * drops the date. An id in some other shape is shown as it came.
 */
export function formatModel(model: string): string {
  const parts = model
    .replace(/^claude-/, '')
    .split('-')
    .filter((p) => p && !/^\d{8}$/.test(p))
  const name = parts.find((p) => !/^\d+$/.test(p))
  if (!name) return model
  const version = parts.filter((p) => /^\d+$/.test(p)).join('.')
  const label = name[0].toUpperCase() + name.slice(1)
  return version ? `${label} ${version}` : label
}
