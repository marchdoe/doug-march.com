import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { chromium } from '@playwright/test'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { RESPONSIVE_THRESHOLDS, scoreResponsive } from '../../scripts/utils/responsive-scorer.js'
import { OVERFLOW_TOLERANCE_PX } from '../../scripts/utils/surface-gate.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURES = path.join(__dirname, '../fixtures/responsive')
const fixtureUrl = (name) => `file://${path.join(FIXTURES, name)}`

describe('responsive-scorer', () => {
  let browser
  beforeAll(async () => {
    browser = await chromium.launch({ headless: true })
  }, 30_000)
  afterAll(async () => {
    await browser.close()
  })

  describe('horizontalScroll check', () => {
    it('flags horizontal overflow at 360px', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('overflow-horizontal.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.horizontalScroll).toBe(true)
    }, 30_000)

    it('does not flag clean pages', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.horizontalScroll).toBe(false)
    }, 30_000)

    it('shares the surface gate overflow tolerance (#319)', () => {
      expect(RESPONSIVE_THRESHOLDS.overflowTolerancePx).toBe(OVERFLOW_TOLERANCE_PX)
    })

    it('does not flag an overflow within tolerance (#319)', async () => {
      // scrollWidth exceeds clientWidth by exactly OVERFLOW_TOLERANCE_PX
      // (1px) — the same document the surface gate would not flag either.
      const metrics = await scoreResponsive(
        fixtureUrl('overflow-1px.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.horizontalScroll).toBe(false)
    }, 30_000)

    it('flags an overflow past tolerance (#319)', async () => {
      // scrollWidth exceeds clientWidth by 2px, one more than the tolerance.
      const metrics = await scoreResponsive(
        fixtureUrl('overflow-2px.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.horizontalScroll).toBe(true)
    }, 30_000)
  })

  describe('clippedElements check', () => {
    it('flags elements extending past the viewport', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clipped-hero.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.clippedElements.length).toBeGreaterThan(0)
      expect(metrics.viewports.mobile.checks.clippedElements[0].tag).toBe('DIV')
    }, 30_000)

    it('does not flag clean pages', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.clippedElements).toEqual([])
    }, 30_000)

    it('flags a word wider than its box through the shared detector (#465)', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('text-wider-than-box.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      const [first] = metrics.viewports.mobile.checks.clippedElements
      expect(first).toMatchObject({ tag: 'P', text: 'Shutout.', cause: 'text', boxWidth: 300 })
      expect(metrics.viewports.mobile.checks.horizontalScroll).toBe(false)
      expect(metrics.worstFailure.check).toBe('clippedElements')
    }, 30_000)
  })

  describe('headerOverlap check', () => {
    it('flags overlapping header children', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('header-overlap.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.headerOverlap.length).toBeGreaterThan(0)
    }, 30_000)

    it('does not flag non-overlapping header', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.headerOverlap).toEqual([])
    }, 30_000)
  })

  describe('bodyTextSize check', () => {
    it('flags body text below 16px', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('tiny-body.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.bodyTextSize.min).toBeLessThan(16)
      expect(metrics.viewports.mobile.checks.bodyTextSize.passing).toBe(false)
    }, 30_000)

    it('passes on 16px body', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.bodyTextSize.passing).toBe(true)
    }, 30_000)

    it('measures running copy only: a caption at 11.2px beside a 16px paragraph passes (#469)', async () => {
      // 11.2px is the chassis `small` step. Captions and labels sit there by
      // design, and the old text-node walk failed the check on them nightly.
      const metrics = await scoreResponsive(
        fixtureUrl('caption-beside-body.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.bodyTextSize).toEqual({ min: 16, passing: true })
    }, 30_000)

    it('still fails a 14px paragraph beside a 16px one (#469)', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('small-paragraph.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.bodyTextSize).toEqual({ min: 14, passing: false })
    }, 30_000)
  })

  describe('tapTargetFailures check', () => {
    it('flags links/buttons under 44x44 at mobile', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('small-tap-targets.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.tapTargetFailures.length).toBeGreaterThanOrEqual(2)
    }, 30_000)

    it('does not flag at desktop width', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('small-tap-targets.html'),
        [{ name: 'desktop', width: 1440, height: 900 }],
        { browser }
      )
      expect(metrics.viewports.desktop.checks.tapTargetFailures).toEqual([])
    }, 30_000)

    it('passes on clean page', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.viewports.mobile.checks.tapTargetFailures).toEqual([])
    }, 30_000)
  })

  describe('lineLengthFailures check', () => {
    it('flags paragraphs with average line length > 75 chars', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('long-lines.html'),
        [{ name: 'desktop', width: 1440, height: 900 }],
        { browser }
      )
      expect(metrics.viewports.desktop.checks.lineLengthFailures.length).toBeGreaterThan(0)
    }, 30_000)

    it('passes when max-width constrains lines', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [{ name: 'desktop', width: 1440, height: 900 }],
        { browser }
      )
      expect(metrics.viewports.desktop.checks.lineLengthFailures).toEqual([])
    }, 30_000)
  })

  describe('scoring math', () => {
    it('clean page scores 5 at every viewport', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('clean.html'),
        [
          { name: 'mobile', width: 360, height: 640 },
          { name: 'desktop', width: 1440, height: 900 },
        ],
        { browser }
      )
      expect(metrics.viewports.mobile.score).toBe(5)
      expect(metrics.viewports.desktop.score).toBe(5)
      expect(metrics.overallScore).toBe(5)
    }, 30_000)

    it('overflow page scores <5 at mobile and overall = min(viewports)', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('overflow-horizontal.html'),
        [
          { name: 'mobile', width: 360, height: 640 },
          { name: 'desktop', width: 1440, height: 900 },
        ],
        { browser }
      )
      expect(metrics.viewports.mobile.score).toBeLessThan(5)
      expect(metrics.overallScore).toBe(metrics.viewports.mobile.score)
    }, 30_000)

    it('emits worstFailure for bad build', async () => {
      const metrics = await scoreResponsive(
        fixtureUrl('overflow-horizontal.html'),
        [{ name: 'mobile', width: 360, height: 640 }],
        { browser }
      )
      expect(metrics.worstFailure).toBeTruthy()
      expect(metrics.worstFailure.viewport).toBe('mobile')
      expect(metrics.worstFailure.check).toBeTruthy()
    }, 30_000)
  })
})
