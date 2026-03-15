import { test, expect } from '@playwright/test'

// Runs against localhost:3001 (started automatically by playwright webServer config)
// Usage: pnpm test:e2e:dev

test.describe('/dev panel', () => {
  test('loads with signals data visible', async ({ page }) => {
    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    // The panel renders a "Signals" section heading
    await expect(page.locator('[data-testid="signals-heading"]')).toBeVisible()
    // Date field from today.yml should be rendered
    await expect(page.locator('[data-testid="signals-date"]')).toBeVisible()
  })

  test('save overrides button is present and functional', async ({ page }) => {
    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    // Mood override select exists
    await expect(page.locator('[data-testid="mood-override-input"]')).toBeVisible()
    // Save button exists
    await expect(page.locator('[data-testid="save-overrides-btn"]')).toBeVisible()
  })

  test('pipeline run button is present', async ({ page }) => {
    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('[data-testid="run-pipeline-btn"]')).toBeVisible()
  })
})
