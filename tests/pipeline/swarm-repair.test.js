/**
 * The swarm's repair and revision paths, run for real against a temp root
 * (#221): a build that fails and is repaired, repairs that run out, a repair
 * reply that omits a required file, and the post-critic revision in all three
 * of its outcomes plus the surface gate forcing one on a SHIP.
 *
 * `restore` from file-manager.js stays real; the harness records each call
 * as `run.fakes.restore` so a scenario can say which backup map was put
 * back, not only what the disk looks like afterwards.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import {
  CLEAN_GATE,
  DEFAULT_BUILD_ERROR,
  REQUIRED_ENGINEER_FILES,
  fixtureFor,
  mockFactories as m,
  runSwarm,
} from './swarm-harness.js'

vi.mock('../../scripts/utils/claude-cli.js', (o) => m['scripts/utils/claude-cli.js'](o))
vi.mock('../../scripts/utils/vision-router.js', (o) => m['scripts/utils/vision-router.js'](o))
vi.mock('../../scripts/utils/build-validator.js', (o) => m['scripts/utils/build-validator.js'](o))
vi.mock('../../scripts/utils/snapshot.js', (o) => m['scripts/utils/snapshot.js'](o))
vi.mock('../../scripts/utils/surface-gate.js', (o) => m['scripts/utils/surface-gate.js'](o))
vi.mock('../../scripts/utils/archiver.js', (o) => m['scripts/utils/archiver.js'](o))
vi.mock('../../scripts/seal-archive.js', (o) => m['scripts/seal-archive.js'](o))
vi.mock('../../scripts/utils/file-manager.js', (o) => m['scripts/utils/file-manager.js'](o))
vi.mock('node:child_process', (o) => m['node:child_process'](o))

// site-context.js imports file-manager.js, so it loads after the mock block.
const { MUTABLE_FILES, ORCHESTRATOR_FILES } = await import('../../scripts/utils/site-context.js')

const { FILE_OWNERSHIP } = await import('../../scripts/design-agents.js')
const { formatFindingsForCritic } = await import('../../scripts/utils/surface-gate.js')

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const ENGINEER_OWNED = Object.keys(FILE_OWNERSHIP).filter(
  (p) => FILE_OWNERSHIP[p] === 'react-engineer'
)

/** The recorded engineer reply with one `===FILE:<relPath>===` block removed. */
function withoutFile(text, relPath) {
  const esc = relPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`^===FILE:${esc}===[^\\n]*\\n[\\s\\S]*?(?=^===(?:FILE:|RATIONALE===))`, 'm')
  const out = text.replace(re, '')
  if (out === text) throw new Error(`fixture has no block for ${relPath}`)
  return out
}

/** The recorded engineer reply with a comment line at the top of one file. */
function withMarker(text, relPath, marker) {
  const head = `===FILE:${relPath}===\n`
  if (!text.includes(head)) throw new Error(`fixture has no block for ${relPath}`)
  return text.replace(head, `${head}// ${marker}\n`)
}

const REVISE_FEEDBACK =
  'The wordmark and the nav share a baseline at 1440px and read as one word; give the header its own row.'

const REVISE_REPLY = [
  '===VERDICT===',
  'REVISE',
  '===END===',
  '',
  '**Responsible agent:** react-engineer',
  '',
  '===FEEDBACK===',
  REVISE_FEEDBACK,
  '===END===',
  '',
].join('\n')

const OVERFLOW_AT_390 = {
  surface: '/',
  viewport: 'phone',
  width: 390,
  scheme: 'light',
  kind: 'overflow',
  severity: 'error',
  detail: 'document is 640px wide in a 390px viewport',
}

const buildErrorLine = `The previous attempt failed with this build error:\n\n${DEFAULT_BUILD_ERROR}`

function dirsUnder(root, date, prefix) {
  const dateDir = path.join(root, 'archive', date)
  if (!existsSync(dateDir)) return []
  return readdirSync(dateDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith(prefix))
    .map((d) => d.name)
}

describe('Phase 5: the build fails', () => {
  it('repairs a failed build with one engineer call that carries the error', async () => {
    const run = await runSwarm({ build: [false, true] })

    expect(run.error).toBeNull()
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'react-engineer',
      'screenshot-critic',
    ])
    const [first, repair] = run.callsFor('react-engineer')
    expect(first.userPrompt).not.toContain(buildErrorLine)
    expect(repair.userPrompt).toContain(buildErrorLine)
    expect(run.retries).toBe(1)
    expect(run.fakes.validateBuild).toHaveLength(2)

    // The restore before the repair puts back only the engineer's files: the
    // Art Director's preset stays, and so do the orchestrator's.
    expect(run.fakes.restore).toHaveLength(1)
    expect(run.fakes.restore[0].root).toBe(run.root)
    const restored = [...run.fakes.restore[0].map.keys()].sort()
    expect(restored).toEqual([...ENGINEER_OWNED].sort())
    expect(restored).not.toContain('elements/preset.ts')
    for (const p of ORCHESTRATOR_FILES) expect(restored).not.toContain(p)

    expect(run.fakes.archive).toHaveLength(1)
    expect(run.fakes.archive[0]).toMatchObject({
      rationale: 'Agent swarm redesign (repair 1)',
      designBrief: 'Multi-agent redesign (repair 1)',
      options: { root: run.root },
    })
    expect(run.result).toMatchObject({ rationale: 'Agent swarm redesign (repair 1)' })
    expect(run.trace.dir).toMatch(/^build-\d+$/)
    for (const rel of REQUIRED_ENGINEER_FILES) {
      expect(existsSync(path.join(run.root, rel)), `${rel} under the root`).toBe(true)
    }
    expect(dirsUnder(run.root, run.date, 'build-failed')).toEqual([])

    const repairSteps = run.trace.steps.filter((s) => s.name === 'repair')
    expect(repairSteps).toHaveLength(1)
    expect(repairSteps[0]).toMatchObject({
      phase: 5,
      input: { attempt: 1 },
      output: { success: true },
    })
    expect(repairSteps[0].output.files).toBeGreaterThan(0)
  })

  it('gives up after three repairs, keeps the failing sources, and puts the original back', async () => {
    const run = await runSwarm({ build: [false, false, false, false] })

    expect(run.result).toBeNull()
    expect(run.error.message.startsWith('Build failed after 3 repair attempt(s)')).toBe(true)
    expect(run.error.message).toContain(DEFAULT_BUILD_ERROR)
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'react-engineer',
      'react-engineer',
      'react-engineer',
    ])
    const repairs = run.callsFor('react-engineer').slice(1)
    expect(repairs).toHaveLength(3)
    for (const c of repairs) expect(c.userPrompt).toContain(buildErrorLine)
    expect(run.retries).toBe(3)
    expect(run.fakes.validateBuild).toHaveLength(4)
    expect(run.fakes.archive).toHaveLength(0)
    expect(run.verdicts).toBeNull()

    // The engineer's files were copied aside before the rollback erased them.
    const sourceDirs = dirsUnder(run.root, run.date, 'build-failed-sources-')
    expect(sourceDirs).toHaveLength(1)
    for (const rel of ['app/components/Ledger.tsx', ...REQUIRED_ENGINEER_FILES]) {
      expect(
        existsSync(path.join(run.root, 'archive', run.date, sourceDirs[0], rel)),
        `${rel} in ${sourceDirs[0]}`
      ).toBe(true)
    }

    // restore(filesToRestore) before the first repair, restore(originalBackup) at the end.
    expect(run.fakes.restore).toHaveLength(2)
    expect([...run.fakes.restore[1].map.keys()].sort()).toEqual([...MUTABLE_FILES].sort())
    for (const rel of ['app/components/Ledger.tsx', ...REQUIRED_ENGINEER_FILES]) {
      expect(existsSync(path.join(run.root, rel)), `${rel} gone from the root`).toBe(false)
    }
    expect(readFileSync(path.join(run.root, 'elements', 'preset.ts'), 'utf8')).toBe(
      readFileSync(path.join(REPO, 'elements', 'preset.ts'), 'utf8')
    )

    expect(run.trace.dir).toMatch(/^build-failed-\d+$/)
    const errorTxt = readFileSync(
      path.join(run.root, 'archive', run.date, run.trace.dir, 'error.txt'),
      'utf8'
    )
    expect(errorTxt.startsWith('Build failed after 3 repair attempt(s)')).toBe(true)
    expect(run.trace.steps.find((s) => s.name === 'build-validation').output.success).toBe(false)

    const repairSteps = run.trace.steps.filter((s) => s.name === 'repair')
    expect(repairSteps).toHaveLength(3)
    expect(repairSteps.map((s) => s.input.attempt)).toEqual([1, 2, 3])
    for (const step of repairSteps) {
      expect(step.phase).toBe(5)
      expect(step.output.success).toBe(false)
    }

    const costJson = JSON.parse(
      readFileSync(path.join(run.root, 'archive', run.date, run.trace.dir, 'cost.json'), 'utf8')
    )
    expect(costJson.retries).toBe(run.retries)
  })

  it('spends a repair attempt on an incomplete reply and reminds the next one', async () => {
    const engineer = fixtureFor('react-engineer')
    const run = await runSwarm({
      build: [false, true],
      agents: {
        'react-engineer': [engineer, withoutFile(engineer, 'app/routes/about.tsx'), engineer],
      },
    })

    expect(run.error).toBeNull()
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'react-engineer',
      'react-engineer',
      'screenshot-critic',
    ])
    // Two builds: the first pass and the second repair. The incomplete repair
    // was never built.
    expect(run.fakes.validateBuild).toHaveLength(2)
    expect(run.retries).toBe(2)

    const [, repair1, repair2] = run.callsFor('react-engineer')
    expect(repair1.userPrompt).toContain(buildErrorLine)
    expect(repair1.userPrompt).not.toContain('## REQUIRED FILES MISSING')
    expect(repair2.userPrompt).toContain('## REQUIRED FILES MISSING — RETRY')
    expect(repair2.userPrompt).toContain(
      'Your previous response omitted these required files: app/routes/about.tsx'
    )

    const repairSteps = run.trace.steps.filter((s) => s.name === 'repair')
    expect(repairSteps).toHaveLength(2)
    const [rejected, succeeded] = repairSteps
    expect(rejected.input.attempt).toBe(1)
    expect(rejected.output.success).toBe(false)
    expect(rejected.output.error).toContain('## REQUIRED FILES MISSING — RETRY')
    expect(rejected.output.error).toContain(
      'Your previous response omitted these required files: app/routes/about.tsx'
    )
    expect(succeeded.input.attempt).toBe(2)
    expect(succeeded.output.success).toBe(true)
    expect(repair2.userPrompt).toContain(
      'React Engineer omitted required files: app/routes/about.tsx'
    )

    expect(run.fakes.archive).toHaveLength(1)
    expect(run.fakes.archive[0]).toMatchObject({ rationale: 'Agent swarm redesign (repair 2)' })
    expect(run.trace.dir).toMatch(/^build-\d+$/)
    for (const rel of REQUIRED_ENGINEER_FILES) {
      expect(existsSync(path.join(run.root, rel)), `${rel} under the root`).toBe(true)
    }
  })
})

describe('after the build passes: the screenshot critic and the surface gate', () => {
  it('revises on REVISE, carrying the feedback, and ships the rebuilt revision', async () => {
    const run = await runSwarm({
      agents: { 'screenshot-critic': [REVISE_REPLY, fixtureFor('screenshot-critic')] },
    })

    expect(run.error).toBeNull()
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'screenshot-critic',
      'react-engineer',
    ])
    const [first, revision] = run.callsFor('react-engineer')
    expect(first.userPrompt).not.toContain(REVISE_FEEDBACK)
    expect(revision.userPrompt).toContain(REVISE_FEEDBACK)
    expect(revision.userPrompt).not.toContain('Measured layout faults')
    expect(run.retries).toBe(1)

    expect(run.fakes.validateBuild).toHaveLength(2)
    expect(run.fakes.runSurfaceGate).toHaveLength(2)
    expect(run.fakes.captureScreenshot).toHaveLength(2)
    expect(run.fakes.archive).toHaveLength(1)
    expect(run.fakes.archive[0]).toMatchObject({ rationale: 'Agent swarm redesign' })
    expect(run.fakes.restore).toHaveLength(0)

    expect(run.verdicts.map(({ critic, round, verdict }) => ({ critic, round, verdict }))).toEqual([
      { critic: 'spec-critic', round: undefined, verdict: 'APPROVED' },
      { critic: 'mockup-critic', round: 0, verdict: 'APPROVE' },
      { critic: 'surface-gate', round: 1, verdict: 'SHIP' },
      { critic: 'screenshot-critic', round: undefined, verdict: 'REVISE' },
      { critic: 'surface-gate', round: 2, verdict: 'SHIP' },
    ])
    expect(run.trace.dir).toMatch(/^build-\d+$/)
    for (const rel of REQUIRED_ENGINEER_FILES) {
      expect(existsSync(path.join(run.root, rel)), `${rel} under the root`).toBe(true)
    }
  })

  it('rolls a revision that fails to build back to the passing state and ships that', async () => {
    const engineer = fixtureFor('react-engineer')
    const marker = 'post-critic revision'
    const run = await runSwarm({
      build: [true, false, true],
      agents: {
        'react-engineer': [engineer, withMarker(engineer, 'app/components/Layout.tsx', marker)],
        'screenshot-critic': [REVISE_REPLY],
      },
    })

    expect(run.error).toBeNull()
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'screenshot-critic',
      'react-engineer',
    ])
    expect(run.callsFor('react-engineer')[1].userPrompt).toContain(REVISE_FEEDBACK)
    expect(run.retries).toBe(1)
    // Initial build, the revision's failed build, the re-validation after rollback.
    expect(run.fakes.validateBuild).toHaveLength(3)
    expect(run.fakes.runSurfaceGate).toHaveLength(1)

    // The map put back is the passing snapshot: every mutable file plus the
    // Ledger.tsx the engineer invented, all holding the first engineer result.
    expect(run.fakes.restore).toHaveLength(1)
    const passing = run.fakes.restore[0].map
    expect(run.fakes.restore[0].root).toBe(run.root)
    expect([...passing.keys()].sort()).toEqual(
      [...MUTABLE_FILES, 'app/components/Ledger.tsx'].sort()
    )
    expect(typeof passing.get('app/components/Layout.tsx')).toBe('string')
    expect(passing.get('app/components/Layout.tsx')).not.toContain(marker)
    expect(typeof passing.get('app/components/Ledger.tsx')).toBe('string')

    const layoutOnDisk = readFileSync(path.join(run.root, 'app/components/Layout.tsx'), 'utf8')
    expect(layoutOnDisk).not.toContain(marker)
    expect(layoutOnDisk).toBe(passing.get('app/components/Layout.tsx'))
    for (const rel of ['app/components/Ledger.tsx', ...REQUIRED_ENGINEER_FILES]) {
      expect(existsSync(path.join(run.root, rel)), `${rel} under the root`).toBe(true)
    }

    expect(run.fakes.archive).toHaveLength(1)
    expect(run.fakes.archive[0]).toMatchObject({ rationale: 'Agent swarm redesign' })
    expect(run.result.files.map((f) => f.path)).toEqual([
      'elements/preset.ts',
      'app/components/Ledger.tsx',
      'app/components/Sidebar.tsx',
      'app/components/Layout.tsx',
      'app/routes/index.tsx',
      'app/routes/about.tsx',
      'app/routes/work.$slug.tsx',
      'app/routes/og.tsx',
    ])
    expect(
      run.result.files.find((f) => f.path === 'app/components/Layout.tsx').content
    ).not.toContain(marker)
    expect(run.trace.dir).toMatch(/^build-\d+$/)
  })

  it('fails fatally when the rolled-back passing state does not rebuild either', async () => {
    const run = await runSwarm({
      build: [true, false, false],
      agents: { 'screenshot-critic': [REVISE_REPLY] },
    })

    expect(run.result).toBeNull()
    expect(run.error.fatal).toBe(true)
    expect(
      run.error.message.startsWith(
        'Restore of passing state failed to rebuild after post-critic revision'
      )
    ).toBe(true)
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'screenshot-critic',
      'react-engineer',
    ])
    expect(run.retries).toBe(1)
    expect(run.fakes.validateBuild).toHaveLength(3)
    expect(run.fakes.archive).toHaveLength(0)
    expect(run.verdicts).toBeNull()

    // restore(passingBackup) first, then restore(originalBackup) when that did not build.
    expect(run.fakes.restore).toHaveLength(2)
    expect([...run.fakes.restore[0].map.keys()]).toContain('app/components/Ledger.tsx')
    expect([...run.fakes.restore[1].map.keys()].sort()).toEqual([...MUTABLE_FILES].sort())
    for (const rel of ['app/components/Ledger.tsx', ...REQUIRED_ENGINEER_FILES]) {
      expect(existsSync(path.join(run.root, rel)), `${rel} gone from the root`).toBe(false)
    }
    expect(readFileSync(path.join(run.root, 'elements', 'preset.ts'), 'utf8')).toBe(
      readFileSync(path.join(REPO, 'elements', 'preset.ts'), 'utf8')
    )

    expect(run.trace.dir).toMatch(/^build-failed-\d+$/)
    const errorTxt = readFileSync(
      path.join(run.root, 'archive', run.date, run.trace.dir, 'error.txt'),
      'utf8'
    )
    expect(errorTxt.startsWith('Restore of passing state failed to rebuild')).toBe(true)
  })

  it('revises on a SHIP when the gate measured an engineer-owned fault', async () => {
    const run = await runSwarm({
      gate: [{ findings: [OVERFLOW_AT_390], measured: 8, errorCount: 1 }, CLEAN_GATE],
    })

    expect(run.error).toBeNull()
    expect(run.calls.map((c) => c.agent)).toEqual([
      'art-director',
      'spec-critic',
      'mockup-designer',
      'mockup-critic',
      'react-engineer',
      'screenshot-critic',
      'react-engineer',
    ])
    const faults = formatFindingsForCritic([OVERFLOW_AT_390])
    expect(faults).toContain(
      '- [error] / at 390px (light): document is 640px wide in a 390px viewport'
    )
    // The critic read the measurements, said SHIP, and the engineer was
    // revised anyway with the same measurements as its feedback.
    expect(run.callsFor('screenshot-critic')[0].userPrompt).toContain(faults)
    const [first, revision] = run.callsFor('react-engineer')
    expect(first.userPrompt).not.toContain('## Measured layout faults')
    expect(revision.userPrompt).toContain(faults)
    expect(run.retries).toBe(1)

    expect(run.fakes.runSurfaceGate).toHaveLength(2)
    expect(run.fakes.validateBuild).toHaveLength(2)
    expect(run.fakes.archive).toHaveLength(1)
    expect(run.fakes.restore).toHaveLength(0)
    expect(
      run.verdicts.map(({ critic, round, verdict, feedback }) => ({
        critic,
        round,
        verdict,
        feedback: critic === 'surface-gate' ? feedback : undefined,
      }))
    ).toEqual([
      { critic: 'spec-critic', round: undefined, verdict: 'APPROVED', feedback: undefined },
      { critic: 'mockup-critic', round: 0, verdict: 'APPROVE', feedback: undefined },
      {
        critic: 'surface-gate',
        round: 1,
        verdict: 'REVISE',
        feedback: '/ @390: document is 640px wide in a 390px viewport',
      },
      { critic: 'screenshot-critic', round: undefined, verdict: 'SHIP', feedback: undefined },
      {
        critic: 'surface-gate',
        round: 2,
        verdict: 'SHIP',
        feedback: 'all surfaces fit their viewport',
      },
    ])
    expect(run.trace.dir).toMatch(/^build-\d+$/)
  })
})
