import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { submitRating, type RatingIssue } from './api'

const field = css({ display: 'flex', flexDirection: 'column', gap: '1', marginBottom: '3' })

export function RateTab({ unrated, onRated }: { unrated: RatingIssue[]; onRated: () => void }) {
  const [activeDate, setActiveDate] = useState(unrated[0]?.date ?? '')
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [worked, setWorked] = useState('')
  const [didnt, setDidnt] = useState('')
  const [tryNext, setTryNext] = useState('')
  const [state, setState] = useState<{ kind: 'idle' } | { kind: 'busy' } | { kind: 'done'; url: string } | { kind: 'error'; message: string }>({ kind: 'idle' })

  if (unrated.length === 0 && state.kind !== 'done') {
    return <p>Nothing waiting for a rating. 🎉</p>
  }

  const submit = async () => {
    if (!grade || !activeDate) return
    setState({ kind: 'busy' })
    try {
      const res = await submitRating({ date: activeDate, grade, worked, didnt, try: tryNext })
      setState({ kind: 'done', url: res.issueUrl })
      onRated()
    } catch (err) {
      setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed' })
    }
  }

  return (
    <section>
      <h2 className={css({ fontSize: 'lg', marginBottom: '3' })}>Rate {activeDate}</h2>
      <div role="group" aria-label="grade" className={css({ display: 'flex', gap: '2', marginBottom: '4' })}>
        {(['A', 'B', 'C', 'D'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGrade(g)}
            aria-pressed={grade === g}
            className={css({
              width: '12', height: '12', fontSize: 'xl', cursor: 'pointer',
              border: '2px solid', borderColor: grade === g ? 'currentColor' : 'transparent',
            })}
          >
            {g}
          </button>
        ))}
      </div>
      <label className={field}>
        What worked
        <textarea value={worked} onChange={(e) => setWorked(e.target.value)} rows={2} />
      </label>
      <label className={field}>
        What didn't
        <textarea value={didnt} onChange={(e) => setDidnt(e.target.value)} rows={2} />
      </label>
      <label className={field}>
        Try next
        <textarea value={tryNext} onChange={(e) => setTryNext(e.target.value)} rows={2} />
      </label>
      <button type="button" disabled={!grade || state.kind === 'busy'} onClick={submit}>
        {state.kind === 'busy' ? 'Submitting…' : 'Submit rating'}
      </button>
      {state.kind === 'done' && <p>Saved — <a href={state.url}>view issue</a>. Harvested on the next run.</p>}
      {state.kind === 'error' && <p role="alert">{state.message}</p>}
      {unrated.length > 1 && (
        <aside className={css({ marginTop: '6' })}>
          <h3>Also unrated</h3>
          <ul>
            {unrated.filter((i) => i.date !== activeDate).map((i) => (
              <li key={i.number}>
                <button type="button" onClick={() => setActiveDate(i.date)}>{i.date}</button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  )
}
