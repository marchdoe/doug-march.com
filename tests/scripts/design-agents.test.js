import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import {
  FILE_OWNERSHIP,
  identifyFailingAgent,
  parseDelimiterResponse,
  buildCompositionContractBlock,
  archiveArtifacts,
  describeRiskTier,
  resolveRiskWeight,
} from '../../scripts/design-agents.js'

describe('FILE_OWNERSHIP', () => {
  it('maps every file to a known agent', () => {
    // An object key can only hold one value, so "exactly one agent" is true
    // by construction. What can actually go wrong is a typo in an agent name,
    // which identifyFailingAgent would then route nowhere.
    const known = new Set(['art-director', 'react-engineer'])
    for (const [file, agent] of Object.entries(FILE_OWNERSHIP)) {
      expect(known, `${file} is owned by unknown agent "${agent}"`).toContain(agent)
    }
  })

  it('tripwire: 10 owned files', () => {
    // Fails on purpose when a file is added to or removed from the mutable
    // set, so the change is a decision rather than a side effect. Was 16
    // until #216 dropped the six components no route had imported since March.
    expect(Object.keys(FILE_OWNERSHIP)).toHaveLength(10)
  })

  it('maps preset.ts to art-director', () => {
    expect(FILE_OWNERSHIP['elements/preset.ts']).toBe('art-director')
  })

  it('does not map __root.tsx to any agent (orchestrator owns it via the chassis template)', () => {
    expect(FILE_OWNERSHIP['app/routes/__root.tsx']).toBeUndefined()
  })

  it('maps layout, route, sidebar, and component files to react-engineer', () => {
    expect(FILE_OWNERSHIP['app/components/Layout.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/routes/index.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/components/Sidebar.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/components/SectionHead.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/components/FeaturedProject.tsx']).toBe('react-engineer')
  })

  it('maps og.tsx to react-engineer (share card is engineer-authored)', () => {
    expect(FILE_OWNERSHIP['app/routes/og.tsx']).toBe('react-engineer')
  })

  it('MobileFooter.tsx is not in FILE_OWNERSHIP (removed from mutable files)', () => {
    expect(FILE_OWNERSHIP['app/components/MobileFooter.tsx']).toBeUndefined()
  })
})

describe('identifyFailingAgent', () => {
  it('identifies react-engineer from a build error mentioning Layout.tsx', () => {
    const error = 'app/components/Layout.tsx(15,7): error TS2322'
    expect(identifyFailingAgent(error)).toBe('react-engineer')
  })

  it('identifies react-engineer from a build error mentioning SectionHead.tsx', () => {
    const error = 'app/components/SectionHead.tsx(8,3): error TS2304'
    expect(identifyFailingAgent(error)).toBe('react-engineer')
  })

  it('identifies art-director from error mentioning preset', () => {
    const error = 'Error in elements/preset.ts: invalid token'
    expect(identifyFailingAgent(error)).toBe('art-director')
  })

  it('returns react-engineer when errors span multiple react-engineer files', () => {
    const error =
      'app/components/Layout.tsx(15,7): error\napp/components/SectionHead.tsx(8,3): error'
    expect(identifyFailingAgent(error)).toBe('react-engineer')
  })

  it('returns "both" when no file can be identified', () => {
    const error = 'Unknown build error'
    expect(identifyFailingAgent(error)).toBe('both')
  })
})

describe('the Phase 5 repair loop', () => {
  // runAgentSwarm is one large closure, so these read the source — the same
  // approach this suite already takes for the workflow YAML and the root
  // template. What matters is the invariants, and each one is a bug that has
  // actually cost a night.
  const SOURCE = readFileSync(
    path.join(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'),
      'scripts/design-agents.js'
    ),
    'utf8'
  )
  const phase5 = SOURCE.slice(SOURCE.indexOf('Phase 5: Build failed'))

  it('allows more than one attempt', () => {
    // A single attempt reliably trades the error it was given for a different
    // one: 2026-09-01 saw width:'full' -> surfaceDeep in CI and gap:'10' ->
    // Footer TS2769 locally, both fatal.
    const max = /const MAX_REPAIR_ATTEMPTS = (\d+)/.exec(phase5)
    expect(max).not.toBeNull()
    expect(Number(max[1])).toBeGreaterThan(1)
  })

  it('carries each new error forward instead of re-sending the first', () => {
    // Handing attempt 3 the error from attempt 1 would ask it to fix something
    // already fixed.
    expect(phase5).toMatch(/repairError = attemptBuild\.error/)
  })

  it('stops when the run budget is spent', () => {
    // A repair that starts past the deadline cannot finish and archive.
    expect(phase5).toMatch(/pastDeadline\(\)/)
  })

  it('drops orchestrator-owned files from the repair output', () => {
    // `app/routes/` is an allowed write prefix, so without this a repair can
    // overwrite the generated __root.tsx — and the error text handed to a
    // repair has named __root.tsx, which invites exactly that.
    expect(phase5).toMatch(/writeEngineerFiles\(retryResult, 'React Engineer repair'\)/)
  })

  it('checks each repair for required files and posture before building it', () => {
    // #297: a repair that omitted Sidebar.tsx left yesterday's on disk, the
    // build passed, and the night shipped as "repair N". The Phase 2c pass
    // ran both checks; this path ran neither.
    const check = phase5.indexOf('findEngineerOutputProblem(')
    const build = phase5.indexOf('const attemptBuild = validateBuild(')
    expect(check).toBeGreaterThan(-1)
    expect(check).toBeLessThan(build)
    // A failed check consumes the attempt rather than shipping.
    expect(phase5.slice(check, build)).toMatch(/repairError = /)
    expect(phase5.slice(check, build)).toMatch(/continue/)
  })

  it('reports how many attempts were made when it gives up', () => {
    expect(phase5).toMatch(/Build failed after \$\{attempt\} repair attempt/)
  })
})

describe('archiveArtifacts', () => {
  const base = {
    finalScreenshot: null,
    mockup: null,
    mockupScreenshot: null,
    verdicts: [{ critic: 'surface-gate', verdict: 'SHIP' }],
    shellDecl: { posture: 'standard' },
    headerDecl: { placement: 'top' },
    heroSource: undefined,
    chosenComposition: { hero: 'poster' },
    chosenLane: { id: 'quiet', register: 'plain' },
  }

  it('writes nothing, not an empty file, for captures that did not happen', () => {
    const out = archiveArtifacts(base)
    for (const name of [
      'screenshot.png',
      'screenshot-dark.png',
      'mockup.html',
      'mockup-screenshot.png',
      'fingerprint.json',
    ]) {
      expect(out[name], name).toBeNull()
    }
    expect(out['hero-source.json']).toBe(JSON.stringify({ source: null }, null, 2))
  })

  it('carries every capture through when it happened', () => {
    const png = Buffer.from([1])
    const out = archiveArtifacts({
      ...base,
      finalScreenshot: { png, darkPng: png, fingerprint: { elements: [1] } },
      mockup: { mockupHtml: '<html>' },
      mockupScreenshot: { png },
      heroSource: 'weather',
    })
    expect(out['screenshot.png']).toBe(png)
    expect(out['screenshot-dark.png']).toBe(png)
    expect(out['mockup.html']).toBe('<html>')
    expect(out['mockup-screenshot.png']).toBe(png)
    expect(JSON.parse(out['fingerprint.json'])).toEqual({ elements: [1] })
    expect(JSON.parse(out['hero-source.json'])).toEqual({ source: 'weather' })
    expect(JSON.parse(out['lane.json'])).toEqual({ laneId: 'quiet', register: 'plain' })
    expect(JSON.parse(out['verdicts.json'])).toEqual(base.verdicts)
  })
})

describe('one run date', () => {
  // #302: run-date.js unified six derivations of "today"; five raw reads of
  // signals.date survived, and they disagreed on a missing date (path.join
  // threw, archive() stringified undefined into archive/undefined/).
  it('never reads signals.date directly after runDate() has answered', () => {
    const SOURCE = readFileSync(new URL('../../scripts/design-agents.js', import.meta.url), 'utf8')
    const after = SOURCE.slice(SOURCE.indexOf('const today = runDate(signals)'))
    expect(after).not.toMatch(/signals\.date/)
  })
})

describe('the two required calls check the deadline before starting', () => {
  // #299: the optional steps checked pastDeadline(); the mockup designer and
  // the primary engineer did not, and past the deadline the clamp handed
  // them a 0ms timeout. The run died with "timed out after 0 minutes".
  const SOURCE = readFileSync(new URL('../../scripts/design-agents.js', import.meta.url), 'utf8')

  it('uses the one deadline predicate from run-budget, not a local copy', () => {
    expect(SOURCE).toMatch(
      /import \{ pastDeadline, setRunDeadline \} from '\.\/utils\/run-budget\.js'/
    )
    expect(SOURCE).not.toMatch(/const pastDeadline = /)
  })

  it('refuses to start the mockup designer or the engineer past the deadline', () => {
    const mockup = SOURCE.indexOf('mockup = await runMockupDesigner(')
    const before = SOURCE.slice(mockup - 600, mockup)
    expect(before).toMatch(/if \(round === 0 && pastDeadline\(\)\)/)
    expect(before).toMatch(/run budget exhausted before the Mockup Designer/)

    const engineer = SOURCE.indexOf("engineerResult = await callAgent(\n        'react-engineer'")
    expect(engineer).toBeGreaterThan(-1)
    const before2 = SOURCE.slice(engineer - 400, engineer)
    expect(before2).toMatch(/if \(pastDeadline\(\)\)/)
    expect(before2).toMatch(/run budget exhausted before the React Engineer/)
  })
})

describe('the surface gate decides, not just measures', () => {
  // #306: runSurfaceGate returned an errorCount that was logged, traced and
  // pushed into a verdicts list nothing read. The revision was gated on the
  // screenshot critic alone, and the gate was never re-run after it.
  const SOURCE = readFileSync(new URL('../../scripts/design-agents.js', import.meta.url), 'utf8')
  const gate = SOURCE.slice(
    SOURCE.indexOf('async function runScreenshotCriticGate'),
    SOURCE.indexOf('Phase 5: Build failed')
  )

  it('forces a revision on an engineer-owned gate error even when the critic says SHIP', () => {
    expect(gate).toMatch(/faultsForOwner\(surfaceFindings, 'react-engineer'\)/)
    expect(gate).toMatch(/if \(screenshotVerdict === 'REVISE' \|\| gateDemandsRevision\)/)
  })

  it('hands the measured faults to the engineer as feedback', () => {
    expect(gate).toMatch(/formatFindingsForCritic\(engineerFaults\)/)
  })

  it('measures again after a revision that rebuilt', () => {
    const passed = gate.indexOf("console.log('  post-critic revision build passed')")
    expect(passed).toBeGreaterThan(-1)
    const after = gate.slice(passed)
    expect(after.indexOf('measureSurfaces(2)')).toBeGreaterThan(-1)
    // Before the re-capture, so the archive's screenshot and its measurements
    // describe the same render.
    expect(after.indexOf('measureSurfaces(2)')).toBeLessThan(
      after.indexOf('captureScreenshotAfterRevision')
    )
  })

  it('records which round each surface-gate verdict came from', () => {
    const fn = gate.slice(gate.indexOf('async function measureSurfaces'))
    expect(fn.slice(0, fn.indexOf('return gate'))).toMatch(/critic: 'surface-gate',\s*round,/)
  })
})

describe('engineer output reaches disk through one function', () => {
  // #296: the drop was applied at the primary write, added to the repair
  // write after a repair overwrote __root.tsx, and never reached the
  // post-critic revision. A revision answering "the header is wrong" could
  // overwrite BrandLockup.tsx after the orchestrator wrote it.
  const SOURCE = readFileSync(new URL('../../scripts/design-agents.js', import.meta.url), 'utf8')

  it('never writes an engineer result with writeFiles directly', () => {
    expect(SOURCE).not.toMatch(/writeFiles\(engineerResult\.files/)
    expect(SOURCE).not.toMatch(/writeFiles\(retryResult\.files/)
    expect(SOURCE).not.toMatch(/writeFiles\(retry\.files/)
  })

  it('routes all three engineer write sites through writeEngineerFiles', () => {
    expect(SOURCE).toMatch(/writeEngineerFiles\(engineerResult, 'React Engineer'\)/)
    expect(SOURCE).toMatch(/writeEngineerFiles\(retryResult, 'React Engineer revision'\)/)
    expect(SOURCE).toMatch(/writeEngineerFiles\(retryResult, 'React Engineer repair'\)/)
  })

  it('drops orchestrator files inside writeEngineerFiles before writing', () => {
    const fn = SOURCE.slice(SOURCE.indexOf('async function writeEngineerFiles'))
    const body = fn.slice(0, fn.indexOf('\n}\n'))
    expect(body.indexOf('dropOrchestratorFiles(')).toBeGreaterThan(-1)
    expect(body.indexOf('dropOrchestratorFiles(')).toBeLessThan(body.indexOf('writeFiles('))
  })
})

describe('parseDelimiterResponse', () => {
  it('parses a single file', () => {
    const input = ['===FILE:app/components/Foo.tsx===', 'export const x = 42', ''].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('app/components/Foo.tsx')
    expect(files[0].content).toBe('export const x = 42')
  })

  it('parses multiple files', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'const foo = 1',
      '===FILE:app/components/Bar.tsx===',
      'const bar = 2',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(2)
    expect(files[0].path).toBe('app/components/Foo.tsx')
    expect(files[1].path).toBe('app/components/Bar.tsx')
  })

  it('preserves === in file content (not line-anchored)', () => {
    // This is the regression we are guarding against. The old parser
    // would split Foo.tsx in two when the content contained === anywhere.
    const input = [
      '===FILE:app/components/Foo.tsx===',
      "const x = 'border: 3px solid === separator ==='",
      'const y = 42',
      '===FILE:app/components/Bar.tsx===',
      'const bar = 1',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(2)
    expect(files[0].content).toContain('=== separator ===')
    expect(files[1].path).toBe('app/components/Bar.tsx')
  })

  it('preserves ===FILE: inside file content when not at start of line', () => {
    // Even if a file has "===FILE:path===" in a comment or string,
    // it should not be treated as a delimiter.
    const input = [
      '===FILE:app/components/Foo.tsx===',
      '// Example: ===FILE:path=== was the old format',
      'const x = 42',
      '===FILE:app/components/Bar.tsx===',
      'const bar = 1',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(2)
    expect(files[0].content).toContain('// Example: ===FILE:path===')
    expect(files[1].path).toBe('app/components/Bar.tsx')
  })

  it('extracts rationale after ===RATIONALE===', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'const x = 42',
      '===RATIONALE===',
      'This is the rationale.',
      '',
    ].join('\n')
    const { rationale } = parseDelimiterResponse(input)
    expect(rationale).toBe('This is the rationale.')
  })

  it('extracts design_brief after ===DESIGN_BRIEF===', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'const x = 42',
      '===DESIGN_BRIEF===',
      'Post-blizzard brutalism.',
      '',
    ].join('\n')
    const { design_brief } = parseDelimiterResponse(input)
    expect(design_brief).toBe('Post-blizzard brutalism.')
  })

  it('extracts both rationale and design_brief', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'content',
      '===RATIONALE===',
      'Why I did this.',
      '===DESIGN_BRIEF===',
      'Spring morning.',
      '',
    ].join('\n')
    const result = parseDelimiterResponse(input)
    expect(result.rationale).toBe('Why I did this.')
    expect(result.design_brief).toBe('Spring morning.')
    expect(result.files).toHaveLength(1)
  })

  it('ignores files with empty paths or content', () => {
    const input = ['===FILE: ===', 'content', '===FILE:valid.tsx===', 'const x = 1', ''].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('valid.tsx')
  })

  it('parses Art Director hero copy, archetype, chassis, visual spec, and self-check blocks', () => {
    const input = [
      '===HERO_COPY===',
      'There is no limit to what a man can do',
      '===HERO_RATIONALE===',
      'Reagan quote anchors the day.',
      '===ARCHETYPE===',
      'Specimen',
      '===CHASSIS_ID===',
      'big-shoulders-atkinson',
      '===VISUAL_SPEC===',
      '## Color Specification\n- Primary hue: 18°',
      '===SELF_CHECK===',
      '1. Hero quotability: Yes — universally quotable',
      '===FILE:elements/preset.ts===',
      "export const elementsPreset = 'stub'",
      '===RATIONALE===',
      'Phrase → Specimen → big-shoulders → terracotta.',
      '===DESIGN_BRIEF===',
      'Terracotta marquee.',
      '',
    ].join('\n')
    const r = parseDelimiterResponse(input)
    expect(r.hero_copy).toBe('There is no limit to what a man can do')
    expect(r.hero_rationale).toBe('Reagan quote anchors the day.')
    expect(r.archetype).toBe('Specimen')
    expect(r.chassis_id).toBe('big-shoulders-atkinson')
    expect(r.visual_spec).toContain('Primary hue: 18°')
    expect(r.self_check).toContain('Hero quotability: Yes')
    expect(r.files).toHaveLength(1)
    expect(r.files[0].path).toBe('elements/preset.ts')
    expect(r.rationale).toBe('Phrase → Specimen → big-shoulders → terracotta.')
    expect(r.design_brief).toBe('Terracotta marquee.')
  })

  it('strips outer markdown code fence so last block before closing fence is not contaminated', () => {
    // If the model wraps its entire response in ```markdown...```, the lazy
    // captureBlock regex extends past the closing fence into the sentinel,
    // appending backtick chars to the last block before the fence.
    const input = [
      '```markdown',
      '===HERO_COPY===',
      'STAND UP TO YOUR FRIENDS.',
      '===CHASSIS_ID===',
      'big-shoulders-atkinson',
      '```',
      '',
    ].join('\n')
    const r = parseDelimiterResponse(input)
    expect(r.hero_copy).toBe('STAND UP TO YOUR FRIENDS.')
    expect(r.chassis_id).toBe('big-shoulders-atkinson')
  })

  it('strips outer plain code fence', () => {
    const input = [
      '```',
      '===HERO_COPY===',
      'No enemies, only rivals.',
      '===ARCHETYPE===',
      'Poster',
      '```',
      '',
    ].join('\n')
    const r = parseDelimiterResponse(input)
    expect(r.hero_copy).toBe('No enemies, only rivals.')
    expect(r.archetype).toBe('Poster')
  })
})

describe('buildCompositionContractBlock', () => {
  it('returns the override block when density is sparse', () => {
    const block = buildCompositionContractBlock({ density: 'sparse' })
    expect(block).toContain('COMPOSITION CONTRACT — SPARSE')
    expect(block).toContain('hero phrase + navigation ONLY')
    expect(block).toContain('Do NOT render project cards')
  })

  it('fires regardless of which other axis values accompany sparse density', () => {
    const block = buildCompositionContractBlock({
      density: 'sparse',
      field_ratio: 'type-dominant',
      hero_zone: 'full-bleed',
    })
    expect(block).toContain('COMPOSITION CONTRACT — SPARSE')
  })

  it('returns empty string for every other density value', () => {
    expect(buildCompositionContractBlock({ density: 'measured' })).toBe('')
    expect(buildCompositionContractBlock({ density: 'dense' })).toBe('')
    expect(buildCompositionContractBlock({ density: 'crowded' })).toBe('')
  })

  it('returns empty string for a missing or empty tuple', () => {
    expect(buildCompositionContractBlock(undefined)).toBe('')
    expect(buildCompositionContractBlock(null)).toBe('')
    expect(buildCompositionContractBlock({})).toBe('')
  })
})

describe('describeRiskTier', () => {
  it('produces four distinct sentences across the 3-4 / 5-6 / 7-8 / 9-10 buckets', () => {
    const sentences = new Set([3, 4, 5, 6, 7, 8, 9, 10].map(describeRiskTier))
    // 8 risk values, 4 buckets → exactly 4 distinct sentences.
    expect(sentences.size).toBe(4)
  })

  it('risk 3 and 4 share the SAFE bucket', () => {
    expect(describeRiskTier(3)).toBe(describeRiskTier(4))
    expect(describeRiskTier(3)).toMatch(/SAFE/)
  })

  it('risk 5 and 6 share the Balanced bucket', () => {
    expect(describeRiskTier(5)).toBe(describeRiskTier(6))
    expect(describeRiskTier(5)).toMatch(/Balanced/)
  })

  it('risk 7 and 8 share the BOLD bucket, distinct from 9-10', () => {
    expect(describeRiskTier(7)).toBe(describeRiskTier(8))
    expect(describeRiskTier(7)).toMatch(/^BOLD/)
    expect(describeRiskTier(7)).not.toBe(describeRiskTier(9))
  })

  it('risk 9 and 10 share the MAXIMUM RISK bucket and mention the Max-Risk License', () => {
    expect(describeRiskTier(9)).toBe(describeRiskTier(10))
    expect(describeRiskTier(9)).toMatch(/MAXIMUM RISK/)
    expect(describeRiskTier(9)).toMatch(/Max-Risk License/)
  })

  it('the old risk=8 default no longer produces the >=7 sentence used for 9-10', () => {
    // Regression guard: risk=8 was the constant default before this change,
    // and previously shared the ">=7" sentence with every value through 10.
    expect(describeRiskTier(8)).not.toBe(describeRiskTier(10))
  })
})

describe('resolveRiskWeight', () => {
  it('an explicitly-set env value always wins over the derived value', () => {
    expect(resolveRiskWeight('5', '2026-08-23')).toEqual({ risk: 5, explicitlySet: true })
    expect(resolveRiskWeight('10', '2026-01-01')).toEqual({ risk: 10, explicitlySet: true })
  })

  it('"0" counts as explicitly set (falsy in JS, but not unset)', () => {
    expect(resolveRiskWeight('0', '2026-08-23')).toEqual({ risk: 0, explicitlySet: true })
  })

  it('a non-number derives from the date, like the other three dials (#301)', () => {
    // parseInt('high') is NaN; describeRiskTier(NaN) read as SAFE and
    // build.json stored null.
    const fromBad = resolveRiskWeight('high', '2026-08-23')
    const fromUnset = resolveRiskWeight(undefined, '2026-08-23')
    expect(fromBad).toEqual(fromUnset)
    expect(fromBad.explicitlySet).toBe(false)
    expect(Number.isNaN(fromBad.risk)).toBe(false)
  })

  it('undefined and empty string both derive risk from the date instead', () => {
    const fromUndefined = resolveRiskWeight(undefined, '2026-08-23')
    const fromEmpty = resolveRiskWeight('', '2026-08-23')
    expect(fromUndefined.explicitlySet).toBe(false)
    expect(fromEmpty.explicitlySet).toBe(false)
    expect(fromUndefined.risk).toBe(fromEmpty.risk)
  })

  it('derived risk is always in range 3-10', () => {
    const dates = [
      '2026-01-01',
      '2026-02-14',
      '2026-03-30',
      '2026-04-17',
      '2026-05-05',
      '2026-06-21',
      '2026-07-04',
      '2026-08-23',
      '2026-09-09',
      '2026-10-31',
      '2026-11-11',
      '2026-12-25',
    ]
    for (const date of dates) {
      const { risk } = resolveRiskWeight(undefined, date)
      expect(risk).toBeGreaterThanOrEqual(3)
      expect(risk).toBeLessThanOrEqual(10)
    }
  })

  it('same date always derives the same risk (reproducible re-runs)', () => {
    const a = resolveRiskWeight(undefined, '2026-08-23')
    const b = resolveRiskWeight(undefined, '2026-08-23')
    expect(a).toEqual(b)
  })

  it('different dates derive different risk values across a run (not a constant)', () => {
    const dates = [
      '2026-01-01',
      '2026-02-14',
      '2026-03-30',
      '2026-04-17',
      '2026-05-05',
      '2026-06-21',
      '2026-07-04',
      '2026-08-23',
      '2026-09-09',
      '2026-10-31',
      '2026-11-11',
      '2026-12-25',
    ]
    const risks = new Set(dates.map((d) => resolveRiskWeight(undefined, d).risk))
    expect(risks.size).toBeGreaterThan(1)
  })
})

describe('a mockup revision round is counted as a retry', () => {
  // #303: every other retry path calls noteRetry(), but the MAX_MOCKUP_REVISIONS
  // loop started another Mockup Designer call without telling the ledger, so
  // cost.json's retries undercounted whether the critic loop earned its keep.
  const SOURCE = readFileSync(new URL('../../scripts/design-agents.js', import.meta.url), 'utf8')
  const loopStart = SOURCE.indexOf('const MAX_MOCKUP_REVISIONS = 2')
  const loop = SOURCE.slice(loopStart, SOURCE.indexOf('Phase 2c: React Engineer', loopStart))

  it('calls noteRetry() before feeding critique back into another revision round', () => {
    expect(loop).toMatch(/noteRetry\(\)\s*\n\s*revisionFeedback = critique\.feedback/)
  })
})
