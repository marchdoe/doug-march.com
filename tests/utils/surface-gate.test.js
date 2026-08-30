import { describe, it, expect } from 'vitest'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  evaluateMeasurement,
  formatFindingsForCritic,
  listGeneratedRoutes,
  ownerForSurface,
  OVERFLOW_TOLERANCE_PX,
  VIEWPORT_RUNGS,
} from '../../scripts/utils/surface-gate.js'

const ok = {
  id: 'home',
  route: '/',
  viewport: 'desktop',
  scheme: 'light',
  status: 200,
  scrollWidth: 1440,
  clientWidth: 1440,
  allowsXOverflow: false,
  consoleErrors: [],
}

describe('evaluateMeasurement', () => {
  it('passes a page that fits', () => {
    expect(evaluateMeasurement(ok)).toEqual([])
  })

  it('flags a document wider than its viewport', () => {
    const findings = evaluateMeasurement({ ...ok, scrollWidth: 2097 })
    expect(findings).toHaveLength(1)
    expect(findings[0].kind).toBe('overflow')
    expect(findings[0].severity).toBe('error')
    // The number a human acts on is how far past the edge it went.
    expect(findings[0].detail).toContain('657px')
  })

  it('ignores sub-pixel overflow from fractional layout', () => {
    expect(evaluateMeasurement({ ...ok, scrollWidth: 1440 + OVERFLOW_TOLERANCE_PX })).toEqual([])
  })

  it('downgrades overflow the page has declared deliberate', () => {
    const findings = evaluateMeasurement({ ...ok, scrollWidth: 2000, allowsXOverflow: true })
    expect(findings[0].kind).toBe('overflow')
    expect(findings[0].severity).toBe('warning')
  })

  it('flags a non-200 route', () => {
    const findings = evaluateMeasurement({ ...ok, status: 404 })
    expect(findings.map((f) => f.kind)).toContain('status')
    expect(findings.find((f) => f.kind === 'status').severity).toBe('error')
  })

  it('reports an unreachable route once and stops', () => {
    const findings = evaluateMeasurement({ ...ok, error: 'net::ERR_CONNECTION_REFUSED' })
    expect(findings).toHaveLength(1)
    expect(findings[0].kind).toBe('unreachable')
  })

  it('treats console errors as advisory, not disqualifying', () => {
    const findings = evaluateMeasurement({ ...ok, consoleErrors: ['boom'] })
    expect(findings[0].kind).toBe('console')
    expect(findings[0].severity).toBe('warning')
  })

  it('reports overflow and status together when both are wrong', () => {
    const kinds = evaluateMeasurement({ ...ok, status: 500, scrollWidth: 1600 }).map((f) => f.kind)
    expect(kinds).toEqual(['status', 'overflow'])
  })
})

describe('formatFindingsForCritic', () => {
  const overflow = (over) => ({
    surface: '/experiments',
    viewport: 'desktop',
    width: 1440,
    kind: 'overflow',
    severity: 'error',
    detail: `document is ${over}px wider than the 1440px viewport`,
  })

  it('says nothing when nothing is wrong', () => {
    expect(formatFindingsForCritic([])).toBe('')
    expect(formatFindingsForCritic(undefined)).toBe('')
  })

  it('collapses the same fault seen in both schemes into one line', () => {
    const out = formatFindingsForCritic([
      { ...overflow(657), scheme: 'light' },
      { ...overflow(657), scheme: 'dark' },
    ])
    const bullets = out.split('\n').filter((l) => l.startsWith('- '))
    expect(bullets).toHaveLength(1)
    expect(bullets[0]).toContain('both schemes')
  })

  it('keeps distinct viewports separate', () => {
    const out = formatFindingsForCritic([
      { ...overflow(657), scheme: 'light' },
      { ...overflow(84), viewport: 'mobile', width: 360, scheme: 'light' },
    ])
    expect(out.split('\n').filter((l) => l.startsWith('- '))).toHaveLength(2)
  })

  it('puts errors above warnings', () => {
    const out = formatFindingsForCritic([
      { ...overflow(657), severity: 'warning', scheme: 'light', detail: 'advisory' },
      { ...overflow(657), scheme: 'light' },
    ])
    const bullets = out.split('\n').filter((l) => l.startsWith('- '))
    expect(bullets[0]).toContain('[error]')
    expect(bullets[1]).toContain('[warning]')
  })

  it('tells the critic the measurements are not up for debate', () => {
    const out = formatFindingsForCritic([{ ...overflow(657), scheme: 'light' }])
    expect(out).toContain('Do not re-litigate')
  })
})

describe('listGeneratedRoutes', () => {
  it('expands a work route per project slug', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'surface-gate-'))
    await mkdir(path.join(root, 'app/content'), { recursive: true })
    await writeFile(
      path.join(root, 'app/content/projects.ts'),
      `export const projects = [{ slug: 'alpha' }, { slug: 'beta' }]`,
      'utf8'
    )
    const routes = await listGeneratedRoutes(root)
    const paths = routes.map((r) => r.route)
    expect(paths).toContain('/work/alpha')
    expect(paths).toContain('/work/beta')
    // The four fixed surfaces plus one per slug.
    expect(routes).toHaveLength(6)
  })
})

describe('ownerForSurface', () => {
  it('routes the nightly surfaces to the engineer', () => {
    expect(ownerForSurface('/')).toBe('react-engineer')
    expect(ownerForSurface('/about')).toBe('react-engineer')
    expect(ownerForSurface('/work/spaceman')).toBe('react-engineer')
  })

  it('does not hand authored routes to an agent that cannot edit them', () => {
    // /experiments and /work are authored route files outside MUTABLE_FILES.
    // The old fallback sent these to react-engineer regardless.
    expect(ownerForSurface('/experiments')).toBe('human')
    expect(ownerForSurface('/work')).toBe('human')
  })
})

describe('VIEWPORT_RUNGS', () => {
  it('stays on the archiver ladder and off the critic 1280', () => {
    expect(VIEWPORT_RUNGS.map((v) => v.width)).toEqual([360, 1440])
  })
})
