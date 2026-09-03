/**
 * The nightly runs `fallow audit --base HEAD` as a static check (#413). Fallow
 * scores a function with zero test coverage on CRAP alone — cyclomatic² +
 * cyclomatic — and the React Engineer's route pages and components have no
 * unit tests by design: the build, the surface gate, and the screenshot
 * critic exercise them instead. On 2026-09-02 that failed three repairs on
 * functions no more complex than the rest of the repo (#432).
 *
 * `.fallowrc.json` carries a `thresholdOverrides` entry for `app/routes/**`
 * and `app/components/**` that raises the CRAP ceiling high enough for those
 * paths to be judged on cyclomatic and cognitive complexity — same as
 * everywhere else — while leaving those two ceilings at the repo default.
 * This locks the override in place: if someone narrows the globs, drops the
 * entry, or lowers `maxCrap` back toward the default, this fails before the
 * next nightly does.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { stripComments } from '../../scripts/utils/token-gate.js'
import { ROOT } from '../../scripts/utils/file-manager.js'

function readFallowConfig() {
  const raw = readFileSync(path.join(ROOT, '.fallowrc.json'), 'utf-8')
  return JSON.parse(stripComments(raw))
}

// The repo's global health thresholds (`.fallowrc.json`'s top-level
// `health` block sets no cyclomatic/cognitive ceilings of its own, so these
// are fallow's own defaults — confirmed via `fallow config`). A zero-coverage
// function right at the cyclomatic ceiling scores cyclomatic² + cyclomatic
// for CRAP, so the override's `maxCrap` has to clear that to stop CRAP from
// failing a function cyclomatic/cognitive alone would pass.
const REPO_MAX_CYCLOMATIC = 20
const REPO_MAX_COGNITIVE = 15
const WORST_CASE_CRAP = REPO_MAX_CYCLOMATIC ** 2 + REPO_MAX_CYCLOMATIC

describe('generated-UI CRAP override', () => {
  const config = readFallowConfig()
  const overrides = config.health.thresholdOverrides

  function findOverride(glob) {
    return overrides.find((entry) => entry.files.includes(glob))
  }

  it('covers both app/routes/** and app/components/**', () => {
    const routesOverride = findOverride('app/routes/**')
    const componentsOverride = findOverride('app/components/**')
    expect(routesOverride).toBeDefined()
    expect(componentsOverride).toBeDefined()
    // One entry covering both globs, not two entries that could drift apart.
    expect(routesOverride).toBe(componentsOverride)
  })

  it('raises maxCrap past the worst-case zero-coverage score at the cyclomatic ceiling', () => {
    const override = findOverride('app/components/**')
    expect(override.maxCrap).toBeGreaterThanOrEqual(WORST_CASE_CRAP)
  })

  it('keeps cyclomatic and cognitive at the repo default rather than loosening them', () => {
    const override = findOverride('app/components/**')
    expect(override.maxCyclomatic).toBe(REPO_MAX_CYCLOMATIC)
    expect(override.maxCognitive).toBe(REPO_MAX_COGNITIVE)
  })
})

describe('react-engineer.md advice', () => {
  it('still carries the "Size and shape" section', () => {
    const promptPath = path.join(ROOT, 'scripts', 'prompts', 'react-engineer.md')
    const prompt = readFileSync(promptPath, 'utf-8')
    expect(prompt).toContain('## Size and shape')
  })
})
