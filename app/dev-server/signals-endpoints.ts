import { spawnSync } from 'node:child_process'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import { _saveOverridesHandler } from '../server/signals-impl'
import { guardRequest, readBodyLimited, sendJson } from './guards'

// POST /api/dev-overrides — write the owner's mood override and notes into
// today's signals YAML, which steers the next pipeline run.
export async function devOverridesHandler(req: IncomingMessage, res: ServerResponse) {
  if (!guardRequest(req, res)) return
  if (req.method !== 'POST') {
    res.writeHead(405)
    res.end()
    return
  }
  try {
    const body = await readBodyLimited(req)
    const { moodOverride, notes } = JSON.parse(body)
    _saveOverridesHandler({
      moodOverride: moodOverride ? String(moodOverride) : null,
      notes: notes ? String(notes) : null,
    })
    sendJson(res, 200, { ok: true })
  } catch (err) {
    sendJson(res, 500, { error: String(err) })
  }
}

// GET /api/collect-signals — re-run the collector.
export function collectSignalsHandler(req: IncomingMessage, res: ServerResponse): void {
  if (!guardRequest(req, res)) return
  try {
    console.log('[collect-signals] refreshing...')
    spawnSync('node', [resolve('scripts/collect-signals.js')], {
      cwd: resolve('.'),
      timeout: 15000,
      stdio: 'inherit',
    })
    sendJson(res, 200, { ok: true })
  } catch (err) {
    sendJson(res, 500, { error: String(err) })
  }
}
