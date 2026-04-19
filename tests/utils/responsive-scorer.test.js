import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { chromium } from '@playwright/test'
import { fileURLToPath } from 'url'
import path from 'path'
import { scoreResponsive } from '../../scripts/utils/responsive-scorer.js'

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
