/**
 * Pipeline trace collector.
 * Accumulates step data during a pipeline run for inspection and archiving.
 *
 * @param {string} date - pipeline date (YYYY-MM-DD)
 * @param {{ onStep?: (step: object) => void }} [options]
 * @returns {object} trace instance
 */
export function createTrace(date, options = {}) {
  const steps = []
  const startedAt = new Date().toISOString()

  return {
    get date() { return date },
    get steps() { return steps },
    get startedAt() { return startedAt },

    addStep(step) {
      const entry = {
        ...step,
        timestamp: new Date().toISOString(),
      }
      steps.push(entry)
      options.onStep?.(entry)
    },

    toJSON() {
      return JSON.stringify({
        date,
        startedAt,
        completedAt: new Date().toISOString(),
        steps,
      }, null, 2)
    },
  }
}
