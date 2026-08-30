import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import {
  WEEKDAY_KEYS,
  WEEKDAYS,
  cellLabel,
  cellsFor,
  densestMonth,
  hrefFor,
  inkFor,
  monthLabel,
  monthOf,
  monthsSpanned,
  swatchFor,
} from '../lib/archive-calendar'
import { css } from '../../styled-system/css'
import type { ArchiveIndexEntry } from '../types/archive-record'

export const Route = createFileRoute('/archive')({
  component: ArchivePage,
  // No route declared a title, so every page shared the shell's — /archive,
  // /how/<date>, /work and /experiments all announced themselves as the home
  // page in a tab, a bookmark and a search result.
  head: () => ({ meta: [{ title: 'Archive — every design this site has made' }] }),
})

/**
 * The calendar — #157.
 *
 * A wall calendar rather than a list, because the interesting fact about this
 * archive is its shape: which runs are unbroken, where the gaps are, how the
 * color drifts across a month. A list flattens all of that into rows.
 *
 * Every surface here uses the `archive.*` tokens from panda.config.ts and none
 * of the day's own. See the note there for why.
 *
 * Day hues arrive at render time, and Panda extracts styles statically, so a
 * cell's color is passed as a CSS custom property that a static class reads.
 * That is the one thing `style` is used for here.
 */

const page = css({
  minHeight: '100vh',
  background: 'archive.bg',
  color: 'archive.text',
  fontFamily: 'archive.mono',
  fontSize: 'archive.body',
})

const masthead = css({
  borderBottom: '1px solid',
  borderColor: 'archive.line',
  padding: { base: '40px 20px 28px', md: '64px 48px 36px' },
})

const kicker = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  marginBottom: '14px',
})

const headline = css({
  fontFamily: 'archive.sans',
  fontSize: { base: 'archive.title', md: 'archive.display' },
  lineHeight: '1.15',
  fontWeight: 'normal',
  maxWidth: '30ch',
  letterSpacing: '-0.01em',
})

const standfirst = css({
  fontSize: 'archive.small',
  color: 'archive.dim',
  marginTop: '18px',
  lineHeight: '1.7',
  maxWidth: '58ch',
})

const bar = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
  padding: { base: '20px 20px 0', md: '28px 48px 0' },
})

const monthName = css({
  fontFamily: 'archive.sans',
  fontSize: 'archive.lead',
  marginRight: 'auto',
})

const btn = css({
  fontFamily: 'archive.mono',
  fontSize: 'archive.micro',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  border: '1px solid',
  borderColor: 'archive.line',
  color: 'archive.dim',
  background: 'transparent',
  padding: '7px 12px',
  cursor: 'pointer',
  transition: 'border-color 0.15s ease, color 0.15s ease',
  _hover: { borderColor: 'archive.text', color: 'archive.text' },
  _disabled: {
    opacity: 0.28,
    cursor: 'not-allowed',
    _hover: { borderColor: 'archive.line', color: 'archive.dim' },
  },
})

const btnOn = css({
  borderColor: 'archive.text',
  color: 'archive.bg',
  background: 'archive.text',
  _hover: { borderColor: 'archive.text', color: 'archive.bg' },
})

const wrap = css({ padding: { base: '20px 20px 96px', md: '24px 48px 120px' } })

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: { base: '4px', md: '8px' },
  maxWidth: '1040px',
})

const weekday = css({
  fontSize: 'archive.micro',
  color: 'archive.faint',
  textAlign: 'center',
  paddingBottom: '6px',
  letterSpacing: '0.1em',
})

const cell = css({
  aspectRatio: '1',
  border: '1px solid',
  borderColor: 'archive.lineSoft',
  padding: { base: '6px', md: '9px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontSize: 'archive.micro',
  color: 'archive.faint',
  // Grid items default to min-width:auto, so a long mood word
  // ("CONFRONTATIONAL") widens its column and breaks the row.
  minWidth: 0,
  overflow: 'hidden',
})

const built = css({
  background: 'var(--day)',
  borderColor: 'transparent',
  color: 'var(--ink)',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'outline-color 0.12s ease',
  outline: '2px solid transparent',
  outlineOffset: '2px',
  _hover: { outlineColor: 'archive.text' },
  _focusVisible: { outlineColor: 'archive.text' },
})

const recordOnly = css({
  borderStyle: 'dashed',
  borderColor: 'archive.faint',
  color: 'archive.dim',
  textDecoration: 'none',
  cursor: 'pointer',
  _hover: { borderColor: 'archive.text', color: 'archive.text' },
})

const mood = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  opacity: 0.85,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const sheet = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: { base: '28px', md: '40px' },
  maxWidth: '1040px',
})

const sheetHead = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontSize: 'archive.micro',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  marginBottom: '10px',
  cursor: 'pointer',
  background: 'transparent',
  border: 0,
  width: '100%',
  fontFamily: 'archive.mono',
  padding: 0,
  _hover: { color: 'archive.text' },
})

const sheetGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '3px',
})

const sheetCell = css({
  aspectRatio: '1',
  borderRadius: '2px',
  background: 'archive.lineSoft',
  opacity: 0.5,
})

const sheetBuilt = css({
  aspectRatio: '1',
  borderRadius: '2px',
  background: 'var(--day)',
  opacity: 1,
  transition: 'transform 0.12s ease',
  _hover: { transform: 'scale(1.4)' },
})

const sheetRecord = css({
  aspectRatio: '1',
  borderRadius: '2px',
  border: '1px dashed',
  borderColor: 'archive.faint',
  _hover: { borderColor: 'archive.text' },
})

const empty = css({ color: 'archive.dim', fontSize: 'archive.small', padding: '40px 0' })

/**
 * A contact-sheet cell is a color and nothing else, which leaves the anchor
 * with no content for a screen reader to announce. The date goes in, hidden.
 */
const srOnly = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
})

function hueVars(entry: ArchiveIndexEntry) {
  return { '--day': swatchFor(entry), '--ink': inkFor(entry) } as React.CSSProperties
}

function isArchiveIndex(value: unknown): value is ArchiveIndexEntry[] {
  return Array.isArray(value) && value.every((e) => typeof (e as { date?: unknown })?.date === 'string')
}

function ArchivePage() {
  const [entries, setEntries] = useState<ArchiveIndexEntry[]>([])
  // Three states, not two. `loaded` alone could not tell "the archive is
  // empty" from "the request failed", so a 5xx or an offline visitor was
  // shown "Nothing archived yet." — a false statement about a site whose
  // whole subject is that it has 123 days of history.
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [view, setView] = useState<'month' | 'all'>('month')
  const [ym, setYm] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/archive-data/index.json')
      .then((res) => {
        if (!res.ok) throw new Error(`archive index responded with ${res.status}`)
        return res.json()
      })
      .then((data: unknown) => {
        if (cancelled) return
        if (!isArchiveIndex(data)) throw new Error('archive index was not the expected shape')
        setEntries(data)
        setYm(densestMonth(data))
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])
  const loaded = status !== 'loading'

  const months = useMemo(() => monthsSpanned(entries), [entries])
  const sorted = useMemo(() => [...entries].sort((a, b) => a.date.localeCompare(b.date)), [entries])
  const withHue = useMemo(() => entries.filter((e) => e.primaryHue).length, [entries])

  const idx = ym ? months.indexOf(ym) : -1

  return (
    <div className={page}>
      <header className={masthead}>
        <p className={kicker}>The archive</p>
        <h1 className={headline}>
          This site redesigns itself every night. Here is every design it has made.
        </h1>
        {loaded && sorted.length > 0 ? (
          <p className={standfirst}>
            {sorted.length} designs, {sorted[0].date} to {sorted[sorted.length - 1].date}. {withHue}{' '}
            carry a recorded color. Each square is a day; its color is the color that day was built
            around.
          </p>
        ) : null}
      </header>

      {!loaded ? null : status === 'error' ? (
        <div className={wrap}>
          <p className={empty}>
            The archive index could not be loaded. It exists — this is a problem reaching it, not
            an empty archive. Try again in a moment.
          </p>
        </div>
      ) : sorted.length === 0 ? (
        <div className={wrap}>
          <p className={empty}>Nothing archived yet.</p>
        </div>
      ) : (
        <>
          <div className={bar}>
            <h2 className={monthName}>{view === 'month' && ym ? monthLabel(ym) : 'Every month'}</h2>
            {view === 'month' ? (
              <>
                <button
                  type="button"
                  className={btn}
                  disabled={idx <= 0}
                  onClick={() => setYm(months[idx - 1])}
                >
                  ← prev
                </button>
                <button
                  type="button"
                  className={btn}
                  disabled={idx < 0 || idx >= months.length - 1}
                  onClick={() => setYm(months[idx + 1])}
                >
                  next →
                </button>
              </>
            ) : null}
            <button
              type="button"
              className={`${btn} ${view === 'month' ? btnOn : ''}`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={`${btn} ${view === 'all' ? btnOn : ''}`}
              onClick={() => setView('all')}
            >
              All
            </button>
          </div>

          <div className={wrap}>
            {view === 'month' && ym ? (
              <MonthGrid ym={ym} entries={sorted} />
            ) : (
              <ContactSheet
                months={months}
                entries={sorted}
                onPick={(m) => {
                  setYm(m)
                  setView('month')
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

function MonthGrid({ ym, entries }: { ym: string; entries: ArchiveIndexEntry[] }) {
  const cells = cellsFor(
    ym,
    entries.filter((e) => monthOf(e.date) === ym)
  )

  return (
    <div className={grid}>
      {WEEKDAYS.map((d, i) => (
        <div key={`wd-${WEEKDAY_KEYS[i]}`} className={weekday}>
          {d}
        </div>
      ))}
      {cells.map((c, i) =>
        c === null ? (
          // Leading blanks have no date; their slot is what identifies them.
          <div key={`pad-${ym}-slot${i}`} />
        ) : c.state === 'empty' || !c.entry ? (
          <div key={c.date} className={cell}>
            <span>{c.day}</span>
          </div>
        ) : c.state === 'record' ? (
          <a
            key={c.date}
            href={hrefFor(c.entry)}
            className={`${cell} ${recordOnly}`}
            title={`${c.date} — record only, no design preserved`}
          >
            <span>{c.day}</span>
            <span className={mood}>record</span>
          </a>
        ) : (
          <a
            key={c.date}
            href={hrefFor(c.entry)}
            className={`${cell} ${built}`}
            style={hueVars(c.entry)}
            title={`${c.date}${c.entry.primaryHue?.name ? ` — ${c.entry.primaryHue.name}` : ''}`}
          >
            <span>{c.day}</span>
            <span className={mood}>{cellLabel(c.entry)}</span>
          </a>
        )
      )}
    </div>
  )
}

function ContactSheet({
  months,
  entries,
  onPick,
}: {
  months: string[]
  entries: ArchiveIndexEntry[]
  onPick: (ym: string) => void
}) {
  return (
    <div className={sheet}>
      {months.map((ym) => {
        const inMonth = entries.filter((e) => monthOf(e.date) === ym)
        const cells = cellsFor(ym, inMonth)
        return (
          <section key={ym}>
            <button type="button" className={sheetHead} onClick={() => onPick(ym)}>
              <span>{monthLabel(ym)}</span>
              <span>
                {inMonth.length}/{cells.filter(Boolean).length}
              </span>
            </button>
            <div className={sheetGrid}>
              {WEEKDAYS.map((d, i) => (
                <div key={`swd-${ym}-${WEEKDAY_KEYS[i]}`} className={weekday}>
                  {d}
                </div>
              ))}
              {cells.map((c, i) =>
                c === null ? (
                  <div key={`spad-${ym}-slot${i}`} />
                ) : c.state === 'empty' || !c.entry ? (
                  <div key={c.date} className={sheetCell} />
                ) : c.state === 'record' ? (
                  <a
                    key={c.date}
                    href={hrefFor(c.entry)}
                    className={sheetRecord}
                    title={`${c.date} — record only`}
                    aria-label={`${c.date} — record only, no design preserved`}
                  >
                    <span className={srOnly}>{c.date}</span>
                  </a>
                ) : (
                  <a
                    key={c.date}
                    href={hrefFor(c.entry)}
                    className={sheetBuilt}
                    style={hueVars(c.entry)}
                    title={`${c.date}${c.entry.primaryHue?.name ? ` — ${c.entry.primaryHue.name}` : ''}`}
                    aria-label={`${c.date}${c.entry.primaryHue?.name ? ` — ${c.entry.primaryHue.name}` : ''}`}
                  >
                    <span className={srOnly}>{c.date}</span>
                  </a>
                )
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
