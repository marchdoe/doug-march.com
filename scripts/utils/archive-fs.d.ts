// Hand-written declaration for archive-fs.js so TS files (vite.config.ts,
// tests) can import archivedDates without allowJs. Keep in sync with the JS
// export — see site-origin.d.ts for the same pattern.

/** Every dated directory under `archiveDir`, sorted (ascending unless newestFirst). */
export function archivedDates(archiveDir: string, opts?: { newestFirst?: boolean }): string[]
