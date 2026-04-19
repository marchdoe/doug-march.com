import { test, expect } from '@playwright/test'

// Section labels rendered by ResponsiveTrend unconditionally (outside LineChart,
// which returns early with "no data" when history is empty — so "Overall score"
// is NOT reliably visible with an empty archive).
test('/dev/responsive renders all sections', async ({ page }) => {
  await page.goto('/dev/responsive')
  await page.waitForLoadState('networkidle')
  // Page heading — always rendered
  await expect(page.getByText('Responsive — last 30 builds').first()).toBeVisible({ timeout: 10000 })
  // Section labels outside LineChart — always rendered regardless of archive state
  await expect(page.getByText('Failure types').first()).toBeVisible({ timeout: 10000 })
  await expect(page.getByText('Worst by archetype').first()).toBeVisible({ timeout: 10000 })
  await expect(page.getByText('Worst recent builds').first()).toBeVisible({ timeout: 10000 })
})
