/**
 * Every gate the build enforces against the React Engineer's output, stated
 * from the same constants the validator checks against.
 *
 * Run 33756500843 (#432) failed on two gates in one attempt each —
 * `dangerouslySetInnerHTML` and a disallowed URL host — and
 * `react-engineer.md` was silent on both, because the security scan's
 * pattern list and host allowlist lived only inside `validateGenerated` and
 * nobody had transcribed them into the prompt. The transcription itself was
 * already stale where it existed: the hand-written host list was missing
 * `doug-march.com` and `www.w3.org`, both of which `ALLOWED_URL_HOSTS`
 * actually allows.
 *
 * This module reads the validator's own exported constants — not a copy of
 * them — and renders one line per gate into `react-engineer.md` at load
 * time (`scripts/design-agents.js`, the `{{GATES}}` placeholder). A gate the
 * validator can fail the build on and this module does not name is a
 * contradiction in terms, and `tests/utils/gate-rules.test.js` fails the
 * suite the day one appears.
 *
 * @see https://github.com/marchdoe/dougmar.ch/issues/432
 */

import { ALLOWED_URL_HOSTS, DANGEROUS_PATTERNS } from './build-validator.js'
import { REQUIRED_FILES } from './engineer-output-check.js'
import {
  ALLOWED_EXACT,
  ALLOWED_WRITE_PREFIXES,
  FORBIDDEN_EXACT,
  FORBIDDEN_PREFIXES,
} from './file-manager.js'
import { SEMANTIC_COLOR_NAMES } from './semantic-contract.js'

/**
 * @typedef {object} GateRule
 * @property {string} gate short, stable id for the gate (used by tests)
 * @property {string} rule one line, imperative, values listed verbatim —
 *   ready to render as a markdown bullet
 * @property {string} source where the rule's values come from, e.g.
 *   `'build-validator.js ALLOWED_URL_HOSTS'`
 */

/**
 * The forbidden-code-pattern gate: `validateGenerated`'s Check 5 rejects any
 * of `DANGEROUS_PATTERNS` in a scanned file. One line naming every pattern
 * by the same name the scan reports it under, so the string a build failure
 * quotes is the string the engineer already read.
 *
 * @returns {GateRule}
 */
function forbiddenPatternsRule() {
  const names = DANGEROUS_PATTERNS.map((p) => p.name)
  return {
    gate: 'forbidden-code-patterns',
    rule:
      'The security scan rejects any of these in a file you write, however it is spelled — ' +
      `${names.join(', ')}. There is no exception for a comment or a string that merely mentions one.`,
    source: 'build-validator.js DANGEROUS_PATTERNS',
  }
}

/**
 * The URL-host gate: `validateGenerated`'s Check 5 rejects a `https://` URL
 * in a string literal whose host is not in `ALLOWED_URL_HOSTS`.
 *
 * @returns {GateRule}
 */
function allowedUrlHostsRule() {
  const hosts = [...ALLOWED_URL_HOSTS].sort()
  return {
    gate: 'allowed-url-hosts',
    rule:
      'A URL in a string literal may point only at one of these hosts — ' +
      `${hosts.join(', ')} — every other host fails the build, including a host that merely looks like one of these (a subdomain, a lookalike, a longer domain that starts with one).`,
    source: 'build-validator.js ALLOWED_URL_HOSTS',
  }
}

/**
 * The required-files gate: `findMissingRequiredFiles` rejects an engineer
 * response that omits any of `REQUIRED_FILES`.
 *
 * @returns {GateRule}
 */
function requiredFilesRule() {
  return {
    gate: 'required-files',
    rule:
      'Every response must include every one of: ' +
      `${REQUIRED_FILES.join(', ')} — omitting any one of them triggers an automatic retry.`,
    source: 'engineer-output-check.js REQUIRED_FILES',
  }
}

/**
 * The write-location gate: `validateWritePath` rejects any write outside
 * `ALLOWED_WRITE_PREFIXES`/`ALLOWED_EXACT`, and rejects `FORBIDDEN_EXACT`/
 * `FORBIDDEN_PREFIXES` outright even when they would otherwise match an
 * allowed prefix.
 *
 * @returns {GateRule}
 */
function writeLocationsRule() {
  const exact = [...ALLOWED_EXACT].sort()
  const forbiddenExact = [...FORBIDDEN_EXACT].sort()
  return {
    gate: 'write-locations',
    rule:
      `A file may be written only under ${ALLOWED_WRITE_PREFIXES.join(', ')}, or at the exact path ` +
      `${exact.join(' or ')} (both owned by the Art Director and the orchestrator — never write them yourself). ` +
      `${forbiddenExact.join(', ')} and anything under ${FORBIDDEN_PREFIXES.join(', ')} are rejected outright, even though the prefix would otherwise match.`,
    source: 'file-manager.js validateWritePath allowlist',
  }
}

/**
 * The frozen-semantic-colour gate: `checkPresetContract` and
 * `findOffContractColorValues` reject any colour-position value that is not
 * one of `SEMANTIC_COLOR_NAMES`. Stated tersely here as a build-failure
 * fact; the full role of each name is in the `{{SEMANTIC_COLOR_CONTRACT}}`
 * block above.
 *
 * @returns {GateRule}
 */
function frozenSemanticColorsRule() {
  return {
    gate: 'frozen-semantic-colors',
    rule:
      'A value in a colour position must be exactly one of the frozen semantic names — ' +
      `${SEMANTIC_COLOR_NAMES.join(', ')} — nothing else resolves, not even a real palette token such as \`sand.300\`.`,
    source: 'semantic-contract.js SEMANTIC_COLOR_NAMES',
  }
}

/**
 * Every gate the build enforces against the React Engineer's output, in the
 * order `react-engineer.md` should list them.
 *
 * `root` is accepted for parity with the codebase's other prompt-generation
 * collectors (`readPatternProps`, `checkPresetContract`) and for a future
 * gate that reads a generated file; every rule here comes from a static
 * import and does not use it today.
 *
 * @param {{ root?: string }} [_options]
 * @returns {GateRule[]}
 */
export function collectGateRules(_options = {}) {
  return [
    forbiddenPatternsRule(),
    allowedUrlHostsRule(),
    requiredFilesRule(),
    writeLocationsRule(),
    frozenSemanticColorsRule(),
  ]
}

/**
 * Renders `collectGateRules()`'s output as the `## Gates the build enforces`
 * block that replaces `{{GATES}}` in `react-engineer.md`.
 *
 * @param {GateRule[]} rules
 * @returns {string} markdown
 */
export function formatGateRulesForPrompt(rules) {
  const lines = [
    '## Gates the build enforces',
    '',
    'Each of these can fail your response outright — not a style preference, a hard ' +
      'reject. The wording below is generated from the same constants the build checks ' +
      'against, so it cannot drift from what actually runs the way a hand-written list can.',
    '',
  ]
  for (const { rule } of rules) {
    lines.push(`- ${rule}`)
  }
  return lines.join('\n')
}
