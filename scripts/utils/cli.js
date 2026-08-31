import { fileURLToPath } from 'node:url'

/**
 * Is this module the one Node was asked to run?
 *
 * Six scripts each answered this their own way (#221): three compared
 * `argv[1]` to `fileURLToPath(import.meta.url)`, two checked
 * `argv[1]?.endsWith('<name>.js')` — which also matches any other file with
 * that basename — and one compared against `new URL(import.meta.url).pathname`,
 * which is percent-encoded and so never matches a checkout under a directory
 * with a space in its name. This is the one that is right.
 *
 * @param {string} importMetaUrl the caller's `import.meta.url`
 * @returns {boolean}
 */
export function isMain(importMetaUrl) {
  const entry = process.argv[1]
  if (!entry) return false
  return entry === fileURLToPath(importMetaUrl)
}
