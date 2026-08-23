/**
 * Per-run accounting of what the pipeline spent.
 *
 * Both model call paths — the `claude` CLI (utils/claude-cli.js) and the
 * Anthropic SDK (utils/claude-sdk.js) — report usage they currently throw
 * away. Without it there is no way to answer "did that change make the run
 * cheaper or just slower", so no change to the pipeline's shape is
 * falsifiable.
 *
 * Records are appended to a module-level ledger rather than threaded back
 * through return values. `callClaudeCLI` resolves a plain string that ~20
 * call sites destructure; widening it would touch all of them, and the
 * agent swarm runs calls concurrently, so append-on-completion is both the
 * smaller diff and the safer one under concurrency.
 *
 * Cost comes from the CLI's own `total_cost_usd` where the CLI reports it.
 * The SDK returns token counts and no price, so those records are priced
 * here from PRICING and flagged `estimated: true` — a reported cost and a
 * guessed one are never summed as if they were the same thing.
 *
 * @module
 */

/**
 * USD per million tokens, by model ID. Anthropic first-party API rates.
 *
 * Cache reads bill at ~0.1x input and cache writes at ~1.25x input; those
 * multipliers are applied below rather than stored per model.
 *
 * Only used to price the SDK path. A model missing from this table prices
 * to null (unknown), never to zero — a silent $0 would read as "free".
 */
export const PRICING = {
  'claude-opus-4-8': { input: 5, output: 25 },
  'claude-opus-5': { input: 5, output: 25 },
  'claude-sonnet-5': { input: 3, output: 15 },
  'claude-sonnet-4-6': { input: 3, output: 15 },
  'claude-haiku-4-5': { input: 1, output: 5 },
}

const CACHE_READ_MULTIPLIER = 0.1
const CACHE_WRITE_MULTIPLIER = 1.25

/** @type {{ records: Array<object>, retries: number }} */
let ledger = { records: [], retries: 0 }

/**
 * Drop everything recorded so far. Called once at the top of a run, and by
 * tests between cases.
 */
export function resetLedger() {
  ledger = { records: [], retries: 0 }
}

/**
 * Price a usage object from PRICING. Returns null when the model is unknown,
 * so the caller can distinguish "free" from "we don't know".
 *
 * @param {string} model
 * @param {{input_tokens?: number, output_tokens?: number, cache_read_input_tokens?: number, cache_creation_input_tokens?: number}} usage
 * @returns {number|null} USD
 */
export function estimateCostUsd(model, usage = {}) {
  const rate = PRICING[model]
  if (!rate) return null
  const input = usage.input_tokens ?? 0
  const output = usage.output_tokens ?? 0
  const cacheRead = usage.cache_read_input_tokens ?? 0
  const cacheWrite = usage.cache_creation_input_tokens ?? 0
  const perToken = (n, dollarsPerMillion) => (n / 1_000_000) * dollarsPerMillion
  return (
    perToken(input, rate.input) +
    perToken(output, rate.output) +
    perToken(cacheRead, rate.input * CACHE_READ_MULTIPLIER) +
    perToken(cacheWrite, rate.input * CACHE_WRITE_MULTIPLIER)
  )
}

/**
 * Append one model call to the ledger.
 *
 * Never throws: a broken telemetry record must not fail a design run. Bad
 * input is coerced or dropped to null rather than rejected.
 *
 * @param {object} entry
 * @param {string} entry.agent - pipeline agent name ('art-director', 'mockup-critic', …)
 * @param {string} [entry.model] - resolved model ID
 * @param {'cli'|'sdk'} [entry.source='cli'] - which call path produced it
 * @param {object} [entry.usage] - raw usage object from the CLI result event or SDK response
 * @param {number} [entry.costUsd] - authoritative cost, when the caller has one
 * @param {number} [entry.ms] - wall-clock duration
 * @param {number} [entry.numTurns] - CLI turn count
 * @returns {object} the stored record
 */
export function recordUsage(entry = {}) {
  const usage = entry.usage && typeof entry.usage === 'object' ? entry.usage : {}
  const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

  const reported = num(entry.costUsd)
  const estimated = reported === null ? estimateCostUsd(entry.model, usage) : null

  const record = {
    agent: String(entry.agent ?? 'unknown'),
    model: entry.model ?? null,
    source: entry.source === 'sdk' ? 'sdk' : 'cli',
    input: num(usage.input_tokens),
    output: num(usage.output_tokens),
    cache_read: num(usage.cache_read_input_tokens),
    cache_write: num(usage.cache_creation_input_tokens),
    cost_usd: reported ?? estimated,
    estimated: reported === null && estimated !== null,
    ms: num(entry.ms),
    num_turns: num(entry.numTurns),
  }
  ledger.records.push(record)
  return record
}

/**
 * Count a retry. Retries are the cost the per-call records can't show —
 * a run that succeeded on the third attempt paid for three.
 */
export function noteRetry() {
  ledger.retries += 1
}

/**
 * @returns {Array<object>} copies of the records recorded so far — the
 * records themselves are copied too, so a caller poking at the result can't
 * rewrite what lands in cost.json
 */
export function getUsageRecords() {
  return ledger.records.map((r) => ({ ...r }))
}

/**
 * Roll the ledger up into the shape persisted as `cost.json`.
 *
 * `total_usd` is null when nothing was priceable at all — an unpriced run
 * and a zero-cost run are different facts. `partial` marks a total that
 * omits calls whose model wasn't in PRICING.
 *
 * @returns {{total_usd: number|null, estimated: boolean, partial: boolean, retries: number, calls: number, byAgent: Array<object>}}
 */
export function summarizeLedger() {
  const priced = ledger.records.filter((r) => r.cost_usd !== null)
  const total = priced.reduce((sum, r) => sum + r.cost_usd, 0)

  return {
    total_usd: priced.length ? Number(total.toFixed(6)) : null,
    estimated: priced.some((r) => r.estimated),
    partial: priced.length !== ledger.records.length,
    retries: ledger.retries,
    calls: ledger.records.length,
    byAgent: ledger.records.map((r) => ({ ...r })),
  }
}
