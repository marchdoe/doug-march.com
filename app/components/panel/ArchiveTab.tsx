import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { css } from '../../../styled-system/css'

interface ArchiveEntry {
  date: string
  brief: string
  archetype: string
  rating: { grade: string; worked: string; didnt: string; try: string } | null
}

export function ArchiveTab() {
  const [entries, setEntries] = useState<ArchiveEntry[] | null>(null)

  useEffect(() => {
    fetch('/archive/_data.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: ArchiveEntry[]) => setEntries(data))
      .catch(() => setEntries([]))
  }, [])

  if (!entries) return <p>Loading…</p>

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
