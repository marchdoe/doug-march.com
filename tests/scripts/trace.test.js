import { describe, it, expect } from 'vitest'
import { createTrace } from '../../scripts/utils/trace.js'

describe('trace collector', () => {
  it('creates a trace with metadata', () => {
    const trace = createTrace('2026-03-27')
    expect(trace.date).toBe('2026-03-27')
    expect(trace.steps).toEqual([])
    expect(trace.startedAt).toBeDefined()
  })

  it('records a step with input and output', () => {
    const trace = createTrace('2026-03-27')
    trace.addStep({
      name: 'collect-signals',
      phase: 0,
      input: { providers: 19 },
      output: { weather: { temp_f: 65 }, sports: [{ team: 'Tigers', result: 'W 8-2' }] },
      durationMs: 3200,
    })
    expect(trace.steps).toHaveLength(1)
    expect(trace.steps[0].name).toBe('collect-signals')
    expect(trace.steps[0].output.weather.temp_f).toBe(65)
  })

  it('records multiple steps in order', () => {
    const trace = createTrace('2026-03-27')
    trace.addStep({ name: 'signals', phase: 0, input: {}, output: { date: '2026-03-27' }, durationMs: 100 })
    trace.addStep({ name: 'interpret', phase: 1, input: {}, output: { brief: '...' }, durationMs: 200 })
    trace.addStep({ name: 'director', phase: 2, input: {}, output: { spec: '...' }, durationMs: 5000 })
    expect(trace.steps).toHaveLength(3)
    expect(trace.steps.map(s => s.name)).toEqual(['signals', 'interpret', 'director'])
  })

  it('calls onStep listener when step is added', () => {
    const received = []
    const trace = createTrace('2026-03-27', { onStep: (step) => received.push(step) })
    trace.addStep({ name: 'test', phase: 0, input: {}, output: {}, durationMs: 0 })
    expect(received).toHaveLength(1)
    expect(received[0].name).toBe('test')
  })

  it('serializes to JSON', () => {
    const trace = createTrace('2026-03-27')
    trace.addStep({ name: 'test', phase: 0, input: { x: 1 }, output: { y: 2 }, durationMs: 50 })
    const json = trace.toJSON()
    const parsed = JSON.parse(json)
    expect(parsed.date).toBe('2026-03-27')
    expect(parsed.steps).toHaveLength(1)
  })
})
