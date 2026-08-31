import { resolve } from 'node:path'
import type { Plugin } from 'vite'

// @tanstack/start-storage-context uses AsyncLocalStorage (Node-only) and has
// no browser export conditions. Alias it to a no-op stub for the client build
// so the /dev route doesn't crash in the browser. SSR builds use the real
// package (Node provides async_hooks).
export function browserStorageContextStub(): Plugin {
  const stubPath = resolve('./app/stubs/start-storage-context.ts')
  return {
    name: 'browser-storage-context-stub',
    resolveId(id, _importer, opts) {
      if (!opts?.ssr && id === '@tanstack/start-storage-context') return stubPath
      return null
    },
  }
}
