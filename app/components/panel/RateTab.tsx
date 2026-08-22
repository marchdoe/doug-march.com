import { useState } from 'react'
import { css, cx } from '../../../styled-system/css'
import {
  sectionTitle,
  mutedText,
  fieldLabel,
  field,
  textArea,
  button,
  gradeButton,
  errorText,
  successText,
  inlineLink,
  dateMuted,
} from './styles'
import { submitRating, type RatingIssue } from './api'

function prettyDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

export function RateTab({ unrated, onRated }: { unrated: RatingIssue[]; onRated: () => void }) {
  const [activeDate, setActiveDate] = useState(unrated[0]?.date ?? '')
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [worked, setWorked] = useState('')
  const [didnt, setDidnt] = useState('')
  const [tryNext, setTryNext] = useState('')
  const [state, setState] = useState<
    | { kind: 'idle' }
    | { kind: 'busy' }
    | { kind: 'done'; url: string }
    | { kind: 'error'; message: string }
  >({ kind: 'idle' })

  if (unrated.length === 0 && state.kind !== 'done') {
    return <p className={mutedText}>Nothing waiting for a rating. 🎉</p>
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
      <h2 className={sectionTitle}>
        {prettyDate(activeDate)} <span className={dateMuted}>· {activeDate}</span>
      </h2>
      <p className={fieldLabel} id="grade-label">
        Grade
      </p>
      <div
        role="group"
        aria-labelledby="grade-label"
        className={css({ display: 'flex', gap: '8px', marginBottom: '14px' })}
      >
        {(['A', 'B', 'C', 'D'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGrade(g)}
            aria-pressed={grade === g}
            className={gradeButton}
          >
            {g}
          </button>
        ))}
      </div>
      <div className={field}>
        <label>
          <span className={fieldLabel}>What worked</span>
          <textarea
            className={textArea}
            value={worked}
            onChange={(e) => setWorked(e.target.value)}
            rows={2}
          />
        </label>
      </div>
      <div className={field}>
        <label>
          <span className={fieldLabel}>What didn't</span>
          <textarea
            className={textArea}
            value={didnt}
            onChange={(e) => setDidnt(e.target.value)}
            rows={2}
          />
        </label>
      </div>
      <div className={field}>
        <label>
          <span className={fieldLabel}>Try next</span>
          <textarea
            className={textArea}
            value={tryNext}
            onChange={(e) => setTryNext(e.target.value)}
            rows={2}
          />
        </label>
      </div>
      <button
        type="button"
        disabled={!grade || state.kind === 'busy'}
        onClick={submit}
        className={cx(css({ width: '100%' }), button({ kind: 'primary' }))}
      >
        {state.kind === 'busy' ? 'Submitting…' : 'Submit rating'}
      </button>
      {state.kind === 'done' && (
        <p className={cx(successText, css({ marginTop: '10px' }))}>
          Saved —{' '}
          <a className={inlineLink} href={state.url}>
            view issue
          </a>
          . Harvested on the next run.
        </p>
      )}
      {state.kind === 'error' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>
          {state.message}
        </p>
      )}
      {unrated.length > 1 && (
        <aside className={css({ marginTop: '20px' })}>
          <h3 className={fieldLabel}>Also unrated</h3>
          <ul
            className={css({
              listStyle: 'none',
              padding: '0',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            })}
          >
            {unrated
              .filter((i) => i.date !== activeDate)
              .map((i) => (
                <li key={i.number}>
                  <button
                    type="button"
                    className={button({ kind: 'secondary' })}
                    onClick={() => setActiveDate(i.date)}
                  >
                    {i.date}
                  </button>
                </li>
              ))}
          </ul>
        </aside>
      )}
    </section>
  )
}
