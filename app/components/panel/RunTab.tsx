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
  // A union with `| string` collapses to string, so the three literals
  // checked nothing and the error text shared a channel with the state.
  // RateTab in this same folder already had the right shape.
  const [state, setState] = useState<
    | { kind: 'idle' }
    | { kind: 'busy' }
    | { kind: 'dispatched' }
    | { kind: 'error'; message: string }
  >({ kind: 'idle' })

  const trigger = async () => {
    setState({ kind: 'busy' })
    try {
      await triggerRun(dryRun)
      setState({ kind: 'dispatched' })
      onTriggered()
    } catch (err) {
      setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed' })
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
        disabled={state.kind === 'busy'}
        onClick={trigger}
        className={button({ kind: 'primary' })}
      >
        {state.kind === 'busy' ? 'Dispatching…' : 'Trigger build'}
      </button>
      {state.kind === 'dispatched' && (
        <p className={cx(successText, css({ marginTop: '10px' }))}>
          Dispatched — refresh status in a minute.
        </p>
      )}
      {state.kind === 'error' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>
          {state.message}
        </p>
      )}
    </section>
  )
}
