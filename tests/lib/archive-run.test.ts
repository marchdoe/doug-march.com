import { describe, expect, it } from 'vitest'

import {
  type Run,
  formatDuration,
  formatModel,
  formatUsd,
  runStages,
  runWallClockMs,
  stageLabel,
} from '../../app/lib/archive-run'

// The 2026-09-02 run, as archive/2026-09-02/build-1788340172548/trace.json and
// cost.json recorded it, reduced to the fields the projection lifts. The
// zero-duration markers (signals-loaded, build-validation) are already gone,
// which is what the projection does.
const step = (name: string, durationMs: number, endedAt: string, phase = 1) => ({
  name,
  phase,
  durationMs,
  endedAt,
})

const call = (agent: string, model: string, ms: number, costUsd: number, estimated = false) => ({
  agent,
  model,
  ms,
  costUsd,
  estimated,
})

const traced: Run = {
  startedAt: '2026-09-02T08:47:08.901Z',
  completedAt: '2026-09-02T09:09:39.774Z',
  steps: [
    step('art-director', 319521, '2026-09-02T08:52:28.457Z'),
    step('spec-critic', 37743, '2026-09-02T08:53:07.933Z'),
    step('mockup-critic', 104506, '2026-09-02T08:54:52.513Z', 2),
    step('mockup-critic', 97755, '2026-09-02T08:56:30.268Z', 2),
    step('mockup-critic', 92365, '2026-09-02T08:58:02.633Z', 2),
    step('react-engineer', 287882, '2026-09-02T09:02:50.516Z', 3),
    step('surface-gate', 19803, '2026-09-02T09:03:19.845Z', 4),
    step('screenshot-critic', 45998, '2026-09-02T09:04:20.433Z', 4),
    step('surface-gate', 20072, '2026-09-02T09:09:21.162Z', 4),
  ],
  calls: [
    call('art-director', 'claude-opus-4-8', 318366, 0.755884),
    call('spec-critic', 'claude-haiku-4-5', 36930, 0.0389055),
    call('mockup-designer', 'claude-opus-4-8', 83309, 0.39981725),
    call('mockup-critic', 'claude-haiku-4-5', 16141, 0.013646, true),
    call('mockup-designer', 'claude-opus-4-8', 77404, 0.28391175),
    call('mockup-critic', 'claude-haiku-4-5', 16007, 0.013711, true),
    call('mockup-designer', 'claude-opus-4-8', 77064, 0.280961),
    call('mockup-critic', 'claude-haiku-4-5', 10955, 0.011606, true),
    call('react-engineer', 'claude-sonnet-5', 286639, 0.5999875),
    call('screenshot-critic', 'claude-sonnet-5', 45997, 0.121527, true),
    call('react-engineer', 'claude-sonnet-5', 270850, 0.5579995),
  ],
  totalUsd: 3.077956,
  estimated: true,
  retries: 3,
}

// 2026-06-07, before there was a cost file: the unified-designer era.
const traceOnly: Run = {
  startedAt: '2026-06-07T10:46:01.557Z',
  completedAt: '2026-06-07T10:53:54.899Z',
  steps: [
    step('art-director', 277876, '2026-06-07T10:50:54.915Z'),
    step('spec-critic', 39839, '2026-06-07T10:51:36.288Z'),
    step('unified-designer', 114021, '2026-06-07T10:53:30.311Z', 3),
  ],
  calls: null,
  totalUsd: null,
  estimated: false,
  retries: null,
}

describe('runStages with a trace and a cost file', () => {
  const rows = runStages(traced)

  it('uses the calls as the spine and slots the gates in by time', () => {
    expect(rows.map((r) => r.label)).toEqual([
      'Art Director',
      'Spec Critic',
      'Mockup Designer',
      'Mockup Critic',
      'Mockup Designer',
      'Mockup Critic',
      'Mockup Designer',
      'Mockup Critic',
      'React Engineer',
      'Surface gate',
      'Screenshot Critic',
      'React Engineer',
      'Surface gate',
    ])
  })

  it('has eleven agent rows and two gate rows', () => {
    expect(rows.filter((r) => r.kind === 'agent')).toHaveLength(11)
    expect(rows.filter((r) => r.kind === 'gate')).toHaveLength(2)
  })

  it('numbers the mockup rounds 1 to 3 and the engineer passes 1 and 2', () => {
    const rounds = (label: string) => rows.filter((r) => r.label === label).map((r) => r.round)
    expect(rounds('Mockup Designer')).toEqual([1, 2, 3])
    expect(rounds('Mockup Critic')).toEqual([1, 2, 3])
    expect(rounds('React Engineer')).toEqual([1, 2])
    expect(rounds('Surface gate')).toEqual([1, 2])
    expect(rounds('Art Director')).toEqual([null])
  })

  it("takes an agent's time from its call, not from the trace step that contains it", () => {
    const critic = rows.find((r) => r.label === 'Mockup Critic')
    expect(critic?.durationMs).toBe(16141)
    expect(critic?.model).toBe('claude-haiku-4-5')
    expect(critic?.estimated).toBe(true)
  })

  it('gives a gate its trace duration and no model or cost', () => {
    const gate = rows[9]
    expect(gate).toMatchObject({
      label: 'Surface gate',
      kind: 'gate',
      durationMs: 19803,
      model: null,
      costUsd: null,
      estimated: false,
    })
  })

  it('adds the rows up to the cost file total', () => {
    const sum = rows.reduce((n, r) => n + (r.costUsd ?? 0), 0)
    expect(sum).toBeCloseTo(3.077956, 5)
  })

  it('reads the wall clock off the run', () => {
    expect(runWallClockMs(traced)).toBe(1350873)
    expect(formatDuration(runWallClockMs(traced) ?? 0)).toBe('22m 31s')
  })
})

describe('runStages with a trace only', () => {
  it('makes every step a row, agents and gates alike, with no cost', () => {
    const rows = runStages(traceOnly)
    expect(rows.map((r) => [r.label, r.kind, r.durationMs])).toEqual([
      ['Art Director', 'agent', 277876],
      ['Spec Critic', 'agent', 39839],
      ['Unified Designer', 'agent', 114021],
    ])
    expect(rows.every((r) => r.costUsd === null && r.model === null)).toBe(true)
  })

  it('treats an unknown timed step as a gate and still reads its name', () => {
    const rows = runStages({
      ...traceOnly,
      steps: [step('static-checks', 4000, traceOnly.completedAt ?? '')],
    })
    expect(rows[0]).toMatchObject({ label: 'Static Checks', kind: 'gate' })
  })

  it('is empty for an empty steps array', () => {
    expect(runStages({ ...traceOnly, steps: [] })).toEqual([])
    expect(runStages({ ...traced, steps: [], calls: [] })).toEqual([])
  })

  it('has no wall clock when either end is missing', () => {
    expect(runWallClockMs({ ...traceOnly, completedAt: null })).toBeNull()
  })
})

describe('stageLabel', () => {
  it('knows the pipeline names and title-cases the rest', () => {
    expect(stageLabel('art-director')).toBe('Art Director')
    expect(stageLabel('surface-gate')).toBe('Surface gate')
    expect(stageLabel('design-director')).toBe('Design Director')
    expect(stageLabel('some-new-stage')).toBe('Some New Stage')
  })
})

describe('formatDuration', () => {
  it('reads seconds, minutes and hours', () => {
    expect(formatDuration(0)).toBe('<1s')
    expect(formatDuration(999)).toBe('<1s')
    expect(formatDuration(1000)).toBe('1s')
    expect(formatDuration(37743)).toBe('38s')
    expect(formatDuration(59499)).toBe('59s')
    expect(formatDuration(60000)).toBe('1m 0s')
    expect(formatDuration(318366)).toBe('5m 18s')
    expect(formatDuration(3600000)).toBe('1h 0m')
    expect(formatDuration(3840000)).toBe('1h 4m')
  })
})

describe('formatUsd', () => {
  it('shows two decimals and never scientific notation', () => {
    expect(formatUsd(0.755884)).toBe('$0.76')
    expect(formatUsd(0.0389055)).toBe('$0.04')
    expect(formatUsd(0.000001)).toBe('$0.00')
    expect(formatUsd(3.077956)).toBe('$3.08')
    expect(formatUsd(12)).toBe('$12.00')
  })
})

describe('formatModel', () => {
  it('reads the family and version out of a model id', () => {
    expect(formatModel('claude-opus-4-8')).toBe('Opus 4.8')
    expect(formatModel('claude-sonnet-5')).toBe('Sonnet 5')
    expect(formatModel('claude-haiku-4-5-20251001')).toBe('Haiku 4.5')
    expect(formatModel('gpt-5')).toBe('Gpt 5')
    expect(formatModel('20251001')).toBe('20251001')
  })
})
