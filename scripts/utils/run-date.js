/**
 * The date a pipeline run is FOR.
 *
 * The collector stamps `signals.date` with the site's own local day, which is
 * what every archive directory, record and mandate is keyed on. Wall-clock
 * UTC disagrees with it every evening Eastern time, so a run that starts at
 * 23:30 would file its artifacts under tomorrow. design-agents.js derived
 * this six separate times as `signals.date || new Date()…` and once, deeper
 * in, as a bare `new Date()` that shadowed the outer value (#221).
 *
 * @param {{ date?: string } | null | undefined} signals
 * @returns {string} YYYY-MM-DD
 */
export function runDate(signals) {
  return signals?.date || new Date().toISOString().slice(0, 10)
}
