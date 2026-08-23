// Browser-safe stub for @tanstack/start-storage-context
// The real package uses AsyncLocalStorage (Node.js only) for SSR request context.
// In the browser, server functions are called via HTTP, so context storage is unused.
export function getStartContext(_opts?: { throwIfNotFound?: boolean }): undefined {
  return undefined
}
export async function runWithStartContext(_context: unknown, fn: () => unknown) {
  return fn()
}
