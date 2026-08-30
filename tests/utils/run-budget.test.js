/**
 * The run budget has to bound individual calls, not just gate phases.
 *
 * Before this, `pastDeadline()` was consulted only between phases, so a run at
 * minute 55 of a 60-minute budget could still start a 30-minute engineer call
 * and get killed by the 80-minute Actions timeout mid-call — no trace, and a
 * failure issue with nothing to point at.
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  clampToBudget,
  clearRunDeadline,
  remainingBudgetMs,
  setRunDeadline,
} from '../../scripts/utils/run-budget.js'

afterEach(() => {
  clearRunDeadline()
  vi.useRealTimers()
})

describe('remainingBudgetMs', () => {
  it('is unbounded when no run registered a deadline', () => {
    // A one-off script or a direct unit-test call must not be clamped to zero.
    expect(remainingBudgetMs()).toBe(Number.POSITIVE_INFINITY)
  })

  it('counts down as the run proceeds', () => {
    vi.useFakeTimers()
    setRunDeadline(Date.now() + 60_000)
    expect(remainingBudgetMs()).toBe(60_000)
    vi.advanceTimersByTime(25_000)
    expect(remainingBudgetMs()).toBe(35_000)
  })

  it('floors at zero rather than going negative once overrun', () => {
    vi.useFakeTimers()
    setRunDeadline(Date.now() + 1_000)
    vi.advanceTimersByTime(5_000)
    expect(remainingBudgetMs()).toBe(0)
  })
})

describe('clampToBudget', () => {
  it('leaves a cap alone when the run has more time than the call needs', () => {
    vi.useFakeTimers()
    setRunDeadline(Date.now() + 60 * 60_000)
    expect(clampToBudget(30 * 60_000)).toBe(30 * 60_000)
  })

  it("cuts the engineer's 30-minute cap down to the 5 minutes actually left", () => {
    // The exact case that blew the job timeout: minute 55 of a 60-minute run.
    vi.useFakeTimers()
    setRunDeadline(Date.now() + 5 * 60_000)
    expect(clampToBudget(30 * 60_000)).toBe(5 * 60_000)
  })

  it('returns the cap untouched when no deadline is registered', () => {
    expect(clampToBudget(1_800_000)).toBe(1_800_000)
  })

  it('gives an overrun run zero rather than a negative timeout', () => {
    vi.useFakeTimers()
    setRunDeadline(Date.now() - 1)
    expect(clampToBudget(600_000)).toBe(0)
  })
})
