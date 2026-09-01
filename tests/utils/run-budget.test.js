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
  DeadlineExceeded,
  MIN_CALL_MS,
  clampToBudget,
  clearRunDeadline,
  pastDeadline,
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

  it('refuses to start a call an overrun run cannot finish', () => {
    // #299: this used to return 0. setTimeout(cb, 0) fired before the child
    // emitted a byte and the run died with "timed out after 0 minutes".
    vi.useFakeTimers()
    setRunDeadline(Date.now() - 1)
    expect(() => clampToBudget(600_000)).toThrow(DeadlineExceeded)
    expect(() => clampToBudget(600_000)).toThrow(/refusing to start a 10 min call/)
  })

  it('refuses below the floor, not only at zero', () => {
    vi.useFakeTimers()
    setRunDeadline(Date.now() + MIN_CALL_MS - 1)
    expect(() => clampToBudget(600_000)).toThrow(DeadlineExceeded)
    setRunDeadline(Date.now() + MIN_CALL_MS)
    expect(clampToBudget(600_000)).toBe(MIN_CALL_MS)
  })
})

describe('pastDeadline', () => {
  it('is never past with no deadline registered', () => {
    expect(pastDeadline()).toBe(false)
  })

  it("turns true once less than a call's worth remains", () => {
    vi.useFakeTimers()
    setRunDeadline(Date.now() + 60_000)
    expect(pastDeadline()).toBe(false)
    vi.advanceTimersByTime(60_000 - MIN_CALL_MS + 1)
    expect(pastDeadline()).toBe(true)
  })
})
