import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**', '**/.claude/**'],
    // Silences production logging from the modules under test.
    // VITEST_VERBOSE=1 restores it.
    setupFiles: ['./tests/setup.js'],
    // The two .tsx tests keep their `// @vitest-environment jsdom` pragmas.
    // environmentMatchGlobs was removed in Vitest 4 and the replacement is a
    // `projects` array — worth it for a real split, not for two files.
    coverage: {
      provider: 'v8',
      include: ['app/**', 'api/**', 'scripts/**', 'middleware.ts'],
      exclude: ['app/routeTree.gen.ts', 'scripts/prompts/**', 'scripts/templates/**', '**/*.d.ts'],
      reporter: ['text-summary', 'html'],
      // Report-only for now. There was no coverage config at all, so the gaps
      // were invisible; thresholds come after the first honest measurement.
    },
  },
})
