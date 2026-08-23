import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'

// signals/taste.md is owner-curated and hand-edited, not agent-generated —
// unlike the rolling ratings/lessons windows (10-14 build lookback), this is
// permanent, all-time truth that survives forever. Hard-cap it so a future
// edit can't silently blow the prompt budget the way an unbounded reference
// or lessons block can.
const MAX_BYTES = 3 * 1024

/**
 * Read signals/taste.md (owner-curated, permanent taste memory) and return
 * a prompt-ready markdown block. Pure I/O + trim — no LLM calls.
 *
 * @param {string} root - repo root (taste.md lives at <root>/signals/taste.md)
 * @returns {string} markdown block, or '' when the file is absent/empty
 */
export function buildTasteMemoryBlock(root) {
  const tastePath = path.join(root, 'signals', 'taste.md')
  if (!existsSync(tastePath)) return ''

  let raw
  try {
    raw = readFileSync(tastePath, 'utf8').trim()
  } catch {
    return ''
  }
  if (!raw) return ''

  let body = raw
  if (Buffer.byteLength(body, 'utf8') > MAX_BYTES) {
    // Truncate on a character boundary that still fits within MAX_BYTES,
    // then note the truncation so the model knows the file runs longer.
    while (Buffer.byteLength(body, 'utf8') > MAX_BYTES && body.length > 0) {
      body = body.slice(0, -1)
    }
    body = `${body.trimEnd()}\n\n*(truncated — signals/taste.md exceeds the ${MAX_BYTES / 1024}KB prompt cap; trim the file)*`
  }

  return ['## Owner Taste Memory (permanent — these override recent trends)', '', body].join('\n')
}
