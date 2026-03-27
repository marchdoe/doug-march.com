import { test, expect } from '@playwright/test'

// Runs against localhost dev server (started by playwright webServer config)
// Usage: pnpm test:e2e:dev

test.describe('/dev panel', () => {
  test('loads without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    expect(errors).toHaveLength(0)
  })

  test('shows signals data', async ({ page }) => {
    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Should show signals section with date
    await expect(page.locator('text=SIGNALS').first()).toBeVisible({ timeout: 10000 })
  })

  test('shows archive section', async ({ page }) => {
    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Archive tab/section should be accessible
    const archiveBtn = page.locator('text=Archive').first()
    await expect(archiveBtn).toBeVisible({ timeout: 10000 })
  })

  test('shows run pipeline option', async ({ page }) => {
    await page.goto('/dev')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page.locator('text=Run Pipeline').first()).toBeVisible({ timeout: 10000 })
  })
})
