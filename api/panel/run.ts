import { withPanelGuards } from '../_lib/guards.js'
import { json } from '../_lib/http.js'
import { dispatchRun } from '../_lib/github.js'

export const POST = withPanelGuards(async ({ body }) => {
  // A malformed body is now a 400 from the wrapper. It used to be swallowed
  // (`catch { body = {} }`) and the run dispatched anyway — a workflow that
  // costs money and writes to main, triggered by a body nobody could parse.
  await dispatchRun(body.dry_run === true)
  return json({ ok: true })
})
