import { defineConfig, devices } from '@playwright/test'

const DEV_PORT = 3001
const DEV_URL = `http://localhost:${DEV_PORT}`
// In CI: set PREVIEW_URL to Vercel preview deploy URL
// Locally: defaults to production preview server (run `pnpm build && pnpm preview` first)
const PREVIEW_URL = process.env.PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
  },
  // Dev server for dev-panel tests (site-health uses PREVIEW_URL instead)
  webServer: process.env.CI ? undefined : {
    command: `pnpm exec vite --port ${DEV_PORT}`,
    port: DEV_PORT,
    reuseExistingServer: true,
    timeout: 60000,
  },
  projects: [
    {
      name: 'site-health',
      testMatch: '**/site-health.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: PREVIEW_URL,
      },
    },
    // Dev-panel tests are local-only — the /dev route is infrastructure, not deployed
    ...(process.env.CI ? [] : [{
      name: 'dev-panel',
      testMatch: '**/dev-panel.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: DEV_URL,
      },
    }]),
  ],
})
