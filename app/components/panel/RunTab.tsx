import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { triggerRun, type RunInfo } from './api'

export function RunTab({ latestRun, onTriggered }: { latestRun: RunInfo | null; onTriggered: () => void }) {
  const [dryRun, setDryRun] = useState(false)
  const [state, setState] = useState<'idle' | 'busy' | 'dispatched' | string>('idle')

  const trigger = async () => {
    setState('busy')
    try {
      await triggerRun(dryRun)
      setState('dispatched')
      onTriggered()
    } catch (err) {
      setState(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <section>
      <h2 className={css({ fontSize: 'lg', marginBottom: '3' })}>Latest run</h2>
      {latestRun ? (
        <p className={css({ marginBottom: '5' })}>
          <a href={latestRun.url}>{latestRun.status}{latestRun.conclusion ? ` — ${latestRun.conclusion}` : ''}</a>
          {' '}({new Date(latestRun.createdAt).toLocaleString()})
        </p>
      ) : (
        <p className={css({ marginBottom: '5' })}>No runs found.</p>
      )}
      <label className={css({ display: 'flex', gap: '2', alignItems: 'center', marginBottom: '4' })}>
        <input type="checkbox" checked={dryRun} onChange={(e) => setDryRun(e.target.checked)} />
        Dry run (build + verify, no commit)
      </label>
      <button type="button" disabled={state === 'busy'} onClick={trigger}>
        {state === 'busy' ? 'Dispatching…' : 'Trigger build'}
      </button>
      {state === 'dispatched' && <p>Dispatched — refresh status in a minute.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'dispatched' && <p role="alert">{state}</p>}
    </section>
  )
}
