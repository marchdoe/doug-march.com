import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { collectGateRules, formatGateRulesForPrompt } from '../../scripts/utils/gate-rules.js'
import { ALLOWED_URL_HOSTS, DANGEROUS_PATTERNS } from '../../scripts/utils/build-validator.js'
import { REQUIRED_FILES } from '../../scripts/utils/engineer-output-check.js'
import { ALLOWED_WRITE_PREFIXES } from '../../scripts/utils/file-manager.js'
import { SEMANTIC_COLOR_NAMES } from '../../scripts/utils/semantic-contract.js'

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const buildValidatorSource = readFileSync(
  path.join(repoRoot, 'scripts', 'utils', 'build-validator.js'),
  'utf8'
)

const rules = collectGateRules({ root: repoRoot })
const rendered = formatGateRulesForPrompt(rules)

describe('collectGateRules', () => {
  it('names every host in ALLOWED_URL_HOSTS', () => {
    for (const host of ALLOWED_URL_HOSTS) {
      expect(rendered, `missing host ${host}`).toContain(host)
    }
  })

  it('names every required file', () => {
    for (const file of REQUIRED_FILES) {
      expect(rendered, `missing required file ${file}`).toContain(file)
    }
  })

  it('names every allowed write prefix', () => {
    for (const prefix of ALLOWED_WRITE_PREFIXES) {
      expect(rendered, `missing write prefix ${prefix}`).toContain(prefix)
    }
  })

  it('names the frozen semantic set', () => {
    for (const name of SEMANTIC_COLOR_NAMES) {
      expect(rendered, `missing semantic name ${name}`).toContain(name)
    }
  })

  it('states the innerHTML rule', () => {
    expect(rendered).toContain('dangerouslySetInnerHTML')
    expect(rendered).toContain('innerHTML assignment')
  })

  it('names every forbidden pattern by the name the scan reports it under', () => {
    for (const { name } of DANGEROUS_PATTERNS) {
      expect(rendered, `missing pattern ${name}`).toContain(name)
    }
  })

  it('produces one rule per gate, each with a gate id, rule text and source', () => {
    expect(rules.length).toBeGreaterThan(0)
    for (const rule of rules) {
      expect(rule.gate).toEqual(expect.any(String))
      expect(rule.rule.length).toBeGreaterThan(0)
      expect(rule.source.length).toBeGreaterThan(0)
    }
  })

  // The drift test: every constant build-validator.js exports as a gate — its
  // doc comment says so by naming gate-rules.js, the same way DANGEROUS_PATTERNS
  // and ALLOWED_URL_HOSTS do above their own declarations — must have a rule in
  // collectGateRules(). Add a constant, tag its doc comment, forget the rule:
  // this fails. Add a constant and never tag it as a gate: nothing here can
  // catch that, the same way an unlabeled export never claimed to be a gate.
  it('has a rule for every constant build-validator.js documents as a gate source', () => {
    const taggedNames = [
      ...buildValidatorSource.matchAll(
        /\/\*\*[\s\S]*?gate-rules\.js[\s\S]*?\*\/\s*export const (\w+)/g
      ),
    ].map((m) => m[1])

    // The fixture itself must not go stale — if nobody tags a constant this
    // way any more, the test below would vacuously pass.
    expect(taggedNames).toEqual(expect.arrayContaining(['DANGEROUS_PATTERNS', 'ALLOWED_URL_HOSTS']))

    const sources = rules.map((r) => r.source).join('\n')
    for (const name of taggedNames) {
      expect(
        sources,
        `build-validator.js's ${name} is tagged as a gate source but no rule in collectGateRules cites it`
      ).toContain(name)
    }
  })
})
