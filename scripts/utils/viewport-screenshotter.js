import { chromium } from '@playwright/test'
import path from 'path'

/**
 * Screenshot a URL at multiple viewports.
 * Single browser, one page, resize between viewports.
 *
 * @param {string} url
 * @param {Array<{name: string, width: number, height: number}>} viewports
 * @param {string} outDir - absolute path; must exist
 * @param {object} [opts]
 * @param {import('@playwright/test').Browser} [opts.browser]
 * @returns {Promise<Array<{name, width, height, path}>>}
 */
export async function screenshotViewports(url, viewports, outDir, opts = {}) {
  const ownBrowser = !opts.browser
  const browser = opts.browser || (await chromium.launch({ headless: true }))

  try {
    const page = await browser.newPage()
    const results = []
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(url, { waitUntil: 'load', timeout: 30000 })
      await page.waitForTimeout(500)
      const outPath = path.join(outDir, `${vp.name}.png`)
      await page.screenshot({ path: outPath, type: 'png', fullPage: false })
      results.push({ name: vp.name, width: vp.width, height: vp.height, path: outPath })
    }
    await page.close()
    return results
  } finally {
    if (ownBrowser) await browser.close()
  }
}
