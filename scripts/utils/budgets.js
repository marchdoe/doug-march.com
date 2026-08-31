/**
 * Every timeout the pipeline reasons with, keyed by what it bounds.
 *
 * These were literals spread across seven files (#221): the same 480000ms
 * stall window typed in three of them, 600000/300000 for the critics in
 * two, and three separate readiness waits for the preview server. Named and
 * gathered so a change is one edit, and so the relationships — the stall
 * window must sit inside the hard timeout, or it can never fire — are
 * visible in one place. Every value is unchanged from where it was.
 *
 * Milliseconds throughout.
 */

/**
 * Per-agent hard timeout and stall window for a model call. `timeoutMs` is
 * the cap on the whole call; `stallTimeoutMs` is how long the CLI may emit
 * nothing at all before it is presumed dead. A stall window longer than the
 * timeout is dead code, which is how claude-cli.js's old 900000 default sat
 * against a 600000 timeout.
 */
export const AGENT_BUDGETS = {
  // 25 min hard cap — the AD has run 8-17 min of extended thinking.
  'art-director': { timeoutMs: 1_500_000, stallTimeoutMs: 480_000 },
  // 30 min hard cap — bounds long extended-thinking phases.
  'mockup-designer': { timeoutMs: 1_800_000, stallTimeoutMs: 480_000 },
  'react-engineer': { timeoutMs: 1_800_000, stallTimeoutMs: 480_000 },
  'spec-critic': { timeoutMs: 600_000, stallTimeoutMs: 300_000 },
  'mockup-critic': { timeoutMs: 600_000, stallTimeoutMs: 300_000 },
  'screenshot-critic': { timeoutMs: 600_000, stallTimeoutMs: 300_000 },
}

/** The call defaults when an agent is not in the table above. */
export const DEFAULT_AGENT_BUDGET = { timeoutMs: 600_000, stallTimeoutMs: 300_000 }

/**
 * @param {string} agentName
 * @returns {{ timeoutMs: number, stallTimeoutMs: number }}
 */
export function budgetFor(agentName) {
  return AGENT_BUDGETS[agentName] ?? DEFAULT_AGENT_BUDGET
}

/** Non-model steps. */
export const STEP_BUDGETS = {
  /** `pnpm build` inside validateBuild. */
  buildMs: 120_000,
  /** `pnpm panda codegen`. */
  codegenMs: 60_000,
  /** biome and tsc, each. */
  staticCheckMs: 60_000,
  /** How long to wait for `vite preview` to answer. */
  previewReadyMs: 30_000,
  /** One page load during a capture or measurement. */
  pageLoadMs: 30_000,
}
