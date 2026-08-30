/**
 * The run's remaining wall-clock budget, shared by every model call.
 *
 * Per-call timeouts and the run deadline used to be unrelated numbers. The
 * Actions job allows 80 minutes; the run budget defaults to 60; the hard caps
 * are 25 minutes for the Art Director and 30 each for the mockup designer and
 * the React engineer. `pastDeadline()` is only consulted *between* phases, so
 * a run sitting at minute 55 could still start a 30-minute engineer call and
 * be killed by the job timeout at 80 — the process dies mid-call, no trace is
 * written, and the failure issue has nothing to point at. That is precisely
 * the outcome the deadline exists to prevent.
 *
 * Registering the deadline here lets `callClaudeCLI` clamp every call to what
 * is actually left, so a call that cannot finish in the budget is never
 * started with a timeout that outlives the job. One registration point means a
 * new agent inherits the bound without having to remember it.
 *
 * Process-global on purpose: the pipeline is one run in one process, and
 * threading a deadline through every call site is what let the four existing
 * callers drift apart in the first place.
 */

/** @type {number|null} epoch ms, or null when no run has registered one */
let deadlineAt = null

/**
 * Register the moment the run must be finished by.
 * @param {number} epochMs
 */
export function setRunDeadline(epochMs) {
  deadlineAt = epochMs
}

/** Forget the deadline. Tests use this; the pipeline never needs it. */
export function clearRunDeadline() {
  deadlineAt = null
}

/**
 * Milliseconds left in the run, or Infinity when nothing registered a
 * deadline (a one-off script, or a unit test calling an agent directly).
 * Never negative — a run already past its deadline gets 0.
 * @returns {number}
 */
export function remainingBudgetMs() {
  if (deadlineAt === null) return Number.POSITIVE_INFINITY
  return Math.max(0, deadlineAt - Date.now())
}

/**
 * Clamp a call's timeout to what the run has left.
 *
 * @param {number} timeoutMs the agent's own hard cap
 * @returns {number} the smaller of the cap and the remaining budget
 */
export function clampToBudget(timeoutMs) {
  const remaining = remainingBudgetMs()
  return Number.isFinite(remaining) ? Math.min(timeoutMs, remaining) : timeoutMs
}
