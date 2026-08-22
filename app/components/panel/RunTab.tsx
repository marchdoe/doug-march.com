import { useState } from 'react'
import { css, cx } from '../../../styled-system/css'
import {
  sectionTitle,
  runBox,
  statusDot,
  mutedText,
  runStatusLine,
  subtleLink,
  checkboxRow,
  checkboxBox,
  button,
  errorText,
  successText,
} from './styles'
import { triggerRun, type RunInfo } from './api'

function runTone(run: RunInfo): 'success' | 'failure' | 'pending' {
  if (!run.conclusion) return 'pending'
  return run.conclusion === 'success' ? 'success' : 'failure'
}

export function RunTab({
  latestRun,
  onTriggered,
}: {
  latestRun: RunInfo | null
  onTriggered: () => void
}) {
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
      <h2 className={sectionTitle}>Latest run</h2>
      {latestRun ? (
        <div className={runBox}>
          <div className={runStatusLine}>
            <span className={statusDot({ tone: runTone(latestRun) })} />
            {latestRun.status}
            {latestRun.conclusion ? ` — ${latestRun.conclusion}` : ''}
          </div>
          <p className={cx(mutedText, css({ marginTop: '3px' }))}>
            {new Date(latestRun.createdAt).toLocaleString()} ·{' '}
            <a className={subtleLink} href={latestRun.url}>
              view on GitHub ↗
            </a>
          </p>
        </div>
      ) : (
        <p className={cx(mutedText, css({ marginBottom: '14px' }))}>No runs found.</p>
      )}
      <label className={checkboxRow}>
        <input
          type="checkbox"
          className={checkboxBox}
          checked={dryRun}
          onChange={(e) => setDryRun(e.target.checked)}
        />
        Dry run (build + verify, no commit)
      </label>
      <button
        type="button"
        disabled={state === 'busy'}
        onClick={trigger}
        className={button({ kind: 'primary' })}
      >
        {state === 'busy' ? 'Dispatching…' : 'Trigger build'}
      </button>
      {state === 'dispatched' && (
        <p className={cx(successText, css({ marginTop: '10px' }))}>
          Dispatched — refresh status in a minute.
        </p>
      )}
      {state !== 'idle' && state !== 'busy' && state !== 'dispatched' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>
          {state}
        </p>
      )}
    </section>
  )
}
