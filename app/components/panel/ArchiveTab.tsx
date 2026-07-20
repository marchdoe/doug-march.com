import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { css } from '../../../styled-system/css'

interface ArchiveEntry {
  date: string
  brief: string
  archetype: string
  rating: { grade: string; worked: string; didnt: string; try: string } | null
}

type State =
  | { kind: 'loading' }
  | { kind: 'loaded'; entries: ArchiveEntry[] }
  | { kind: 'error'; message: string }

export function ArchiveTab() {
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    fetch('/archive/_data.json')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load archive (${res.status})`)
        const data = (await res.json()) as ArchiveEntry[]
        setState({ kind: 'loaded', entries: data })
      })
      .catch((err: unknown) => {
        setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed to load archive' })
      })
  }, [])

  if (state.kind === 'loading') return <p>Loading…</p>
  if (state.kind === 'error') return <p role="alert">{state.message}</p>

  const entries = state.entries
  if (entries.length === 0) return <p>No archive entries yet.</p>

  return (
    <ul className={css({ listStyle: 'none', padding: 0 })}>
      {entries.map((e) => (
        <li key={e.date} className={css({ marginBottom: '4', paddingBottom: '4', borderBottom: '1px solid', borderColor: 'currentColor' })}>
          <div className={css({ display: 'flex', gap: '3', alignItems: 'baseline' })}>
            <Link to="/archive/$date" params={{ date: e.date }}>{e.date}</Link>
            <span className={css({ fontWeight: 'bold' })}>{e.rating?.grade ?? '—'}</span>
            <span className={css({ fontSize: 'sm', opacity: 0.7 })}>{e.archetype}</span>
          </div>
          <p className={css({ fontSize: 'sm' })}>{e.brief}</p>
          {e.rating && (e.rating.worked || e.rating.didnt || e.rating.try) && (
            <p className={css({ fontSize: 'sm', opacity: 0.8 })}>
              {e.rating.worked && <>✓ {e.rating.worked} </>}
              {e.rating.didnt && <>✗ {e.rating.didnt} </>}
              {e.rating.try && <>→ {e.rating.try}</>}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
