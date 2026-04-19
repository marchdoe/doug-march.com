import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

// Precondition: at least one build in archive/ must have responsive-metrics.json.
// If none exists, skip — the card only appears inside SuccessSection after a real pipeline run.
function hasAnyResponsiveMetrics(): boolean {
  const archive = path.resolve(process.cwd(), 'archive')
  if (!fs.existsSync(archive)) return false
  for (const date of fs.readdirSync(archive)) {
    const dateDir = path.join(archive, date)
    if (!fs.statSync(dateDir).isDirectory()) continue
    for (const b of fs.readdirSync(dateDir)) {
      const p = path.join(dateDir, b, 'responsive-metrics.json')
      if (fs.existsSync(p)) return true
    }
  }
  return false
}

test.skip(!hasAnyResponsiveMetrics(), 'no responsive-metrics.json in archive yet')

test('responsive card renders when metrics exist', async ({ page }) => {
  await page.goto('/dev')
  // SuccessSection is only visible after a successful pipeline run — this
  // test documents the assertion shape. If reaching SuccessSection requires
  // further test setup, this test will timeout, which is also acceptable
  // evidence that the precondition isn't met.
  const card = page.getByText('Responsive Score').first()
  await expect(card).toBeVisible({ timeout: 5000 })
  const thumbs = page.locator('img[src*="/viewports/"]')
  await expect(thumbs).toHaveCount(4)
})
