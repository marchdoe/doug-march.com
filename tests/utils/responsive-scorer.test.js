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
})
