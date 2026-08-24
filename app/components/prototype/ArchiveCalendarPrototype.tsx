/**
 * PROTOTYPE — issue #157. Throwaway. Do not promote to production as-is.
 *
 * Three variants of the archive calendar, switchable via `?variant=` on /archive.
 * Question: what does the calendar look like, given it is mostly holes?
 *
 * Runs against real coverage from public/_proto-archive.json (123 dates,
 * 110 full / 10 partial / 3 record-only, 94 carrying a primary hue).
 *
 * Fixed neutral identity comes from the `archive.*` tokens in panda.config.ts,
 * NOT from elements/preset.ts, which the Art Director rewrites nightly.
 *
 * Runtime hues use CSS custom properties because Panda extracts styles
 * statically and cannot see a per-day colour computed at render time.
 */
import { useEffect, useState } from 'react'
import { css } from '../../../styled-system/css'

export interface ProtoEntry {
  date: string
  pages: number
  state: 'full' | 'partial' | 'record'
  hue: { h: number; s: number; l: number; name: string | null; mood: string | null } | null
  archetype: string | null
  brief: string | null
}

export const VARIANT_NAMES: Record<string, string> = {
  A: 'Contact sheet — all six months',
  B: 'Wall calendar — one month, hue-dominant',
  C: 'Spectrum — continuous day strips',
}

// ---------------------------------------------------------------- helpers

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function monthsOf(entries: ProtoEntry[]): string[] {
  const seen = new Set(entries.map((e) => e.date.slice(0, 7)))
  return [...seen].sort()
}

function daysInMonth(ym: string): number {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m, 0).getDate()
}

function firstWeekday(ym: string): number {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1).getDay()
}

function swatch(e: ProtoEntry | undefined): string {
  if (!e?.hue) return 'transparent'
  const { h, s, l } = e.hue
  return `hsl(${h} ${s}% ${l}%)`
}

function label(ym: string): string {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/** Densest month wins the default view; today's month is 1-of-31 and a poor opener. */
function densestMonth(entries: ProtoEntry[]): string {
  const counts = new Map<string, number>()
  for (const e of entries) {
    const k = e.date.slice(0, 7)
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  let best = ''
  let bestRatio = -1
  for (const [ym, n] of counts) {
    const ratio = n / daysInMonth(ym)
    if (ratio >= bestRatio) {
      bestRatio = ratio
      best = ym
    }
  }
  return best
}

function byDate(entries: ProtoEntry[]): Map<string, ProtoEntry> {
  return new Map(entries.map((e) => [e.date, e]))
}

function href(e: ProtoEntry): string {
  // #154: full/partial go straight to the design; record-only dates go to the explainer.
  return e.state === 'record' ? `/how/${e.date}` : `/archive/${e.date}/`
}

// ---------------------------------------------------------------- shared chrome

const page = css({
  minHeight: '100vh',
  background: 'archive.bg',
  color: 'archive.text',
  fontFamily: 'mono',
})

const masthead = css({
  borderBottom: '1px solid',
  borderColor: 'archive.line',
  padding: { base: '32px 20px 24px', md: '56px 48px 32px' },
})

const kicker = css({
  fontSize: '2xs',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  marginBottom: '12px',
})

const headline = css({
  fontSize: { base: 'xl', md: '3xl' },
  lineHeight: '1.15',
  fontWeight: 'normal',
  maxWidth: '34ch',
})

const sub = css({
  fontSize: 'xs',
  color: 'archive.dim',
  marginTop: '14px',
  lineHeight: '1.7',
})

function Masthead({ entries }: { entries: ProtoEntry[] }) {
  const hues = entries.filter((e) => e.hue).length
  return (
    <header className={masthead}>
      <p className={kicker}>The archive</p>
      <h1 className={headline}>This site redesigns itself every night. Here is every design it has made.</h1>
      <p className={sub}>
        {entries.length} designs, {entries[0]?.date} to {entries[entries.length - 1]?.date}. {hues} carry a
        recorded colour.
      </p>
    </header>
  )
}

// ---------------------------------------------------------------- Variant A

const aWrap = css({ padding: { base: '24px 20px 80px', md: '40px 48px 96px' } })

const aGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: { base: '28px', md: '40px' },
  maxWidth: '1100px',
})

const aMonthName = css({
  fontSize: '2xs',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
})

const aDays = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '3px',
})

const aWeekday = css({
  fontSize: '2xs',
  color: 'archive.faint',
  textAlign: 'center',
  paddingBottom: '4px',
})

const aCellBase = css({
  aspectRatio: '1',
  borderRadius: '2px',
  display: 'grid',
  placeItems: 'center',
  fontSize: '2xs',
})

const aDead = css({ background: 'archive.lineSoft', opacity: 0.45 })

const aBuilt = css({
  background: 'var(--day)',
  color: 'archive.bg',
  cursor: 'pointer',
  transition: 'transform 0.12s ease, outline-color 0.12s ease',
  outline: '2px solid transparent',
  outlineOffset: '1px',
  _hover: { transform: 'scale(1.35)', outlineColor: 'archive.text' },
})

const aRecord = css({
  border: '1px dashed',
  borderColor: 'archive.faint',
  color: 'archive.dim',
  cursor: 'pointer',
  _hover: { borderColor: 'archive.text', color: 'archive.text' },
})

function VariantA({ entries }: { entries: ProtoEntry[] }) {
  const map = byDate(entries)
  return (
    <div className={aWrap}>
      <div className={aGrid}>
        {monthsOf(entries).map((ym) => {
          const n = daysInMonth(ym)
          const pad = firstWeekday(ym)
          const built = entries.filter((e) => e.date.startsWith(ym)).length
          return (
            <section key={ym}>
              <div className={aMonthName}>
                <span>{label(ym)}</span>
                <span>
                  {built}/{n}
                </span>
              </div>
              <div className={aDays}>
                {WEEKDAYS.map((d, i) => (
                  <div key={`${ym}-wd-${i}`} className={aWeekday}>
                    {d}
                  </div>
                ))}
                {Array.from({ length: pad }, (_, i) => (
                  <div key={`${ym}-pad-${i}`} />
                ))}
                {Array.from({ length: n }, (_, i) => {
                  const date = `${ym}-${String(i + 1).padStart(2, '0')}`
                  const e = map.get(date)
                  if (!e) return <div key={date} className={`${aCellBase} ${aDead}`} />
                  if (e.state === 'record')
                    return (
                      <a key={date} href={href(e)} title={`${date} — record only`} className={`${aCellBase} ${aRecord}`}>
                        {i + 1}
                      </a>
                    )
                  return (
                    <a
                      key={date}
                      href={href(e)}
                      title={`${date}${e.hue?.name ? ` — ${e.hue.name}` : ''}`}
                      className={`${aCellBase} ${aBuilt}`}
                      style={{ ['--day' as string]: e.hue ? swatch(e) : '#5c5c66' }}
                    />
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- Variant B

const bWrap = css({ padding: { base: '24px 20px 80px', md: '40px 48px 96px' }, maxWidth: '1000px' })

const bNav = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '16px',
  marginBottom: '24px',
})

const bBtn = css({
  border: '1px solid',
  borderColor: 'archive.line',
  color: 'archive.dim',
  background: 'transparent',
  padding: '6px 12px',
  fontSize: 'xs',
  cursor: 'pointer',
  _hover: { borderColor: 'archive.text', color: 'archive.text' },
  _disabled: { opacity: 0.3, cursor: 'not-allowed' },
})

const bMonth = css({ fontSize: { base: 'lg', md: '2xl' }, flex: 1 })

const bGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: { base: '4px', md: '8px' },
})

const bCell = css({
  aspectRatio: '1',
  border: '1px solid',
  borderColor: 'archive.lineSoft',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontSize: '2xs',
  color: 'archive.faint',
  // Grid items default to min-width:auto, so a long mood word ("CONFRONTATIONAL")
  // widens its column and overflows the row. Found by looking at it.
  minWidth: 0,
  overflow: 'hidden',
})

const bLive = css({
  background: 'var(--day)',
  borderColor: 'transparent',
  color: 'var(--ink)',
  cursor: 'pointer',
  textDecoration: 'none',
  _hover: { outline: '2px solid', outlineColor: 'archive.text', outlineOffset: '2px' },
})

const bMood = css({
  fontSize: '2xs',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  opacity: 0.85,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

/**
 * Perceived luminance, not lightness. `l > 55` picked white ink for saturated
 * yellow-greens where black was needed — visible on 2026-06-08 and 06-24.
 */
function inkFor(hue: ProtoEntry['hue']): string {
  if (!hue) return '#f2f2f4'
  const { h, s, l } = hue
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const L = 0.2126 * lin(f(0)) + 0.7152 * lin(f(8)) + 0.0722 * lin(f(4))
  return L > 0.35 ? '#0e0e10' : '#f2f2f4'
}

function VariantB({ entries }: { entries: ProtoEntry[] }) {
  const months = monthsOf(entries)
  const [ym, setYm] = useState(() => densestMonth(entries))
  const map = byDate(entries)
  const idx = months.indexOf(ym)
  const n = daysInMonth(ym)
  const pad = firstWeekday(ym)

  return (
    <div className={bWrap}>
      <div className={bNav}>
        <h2 className={bMonth}>{label(ym)}</h2>
        <button
          type="button"
          className={bBtn}
          disabled={idx <= 0}
          onClick={() => setYm(months[idx - 1])}
        >
          ← prev
        </button>
        <button
          type="button"
          className={bBtn}
          disabled={idx >= months.length - 1}
          onClick={() => setYm(months[idx + 1])}
        >
          next →
        </button>
      </div>
      <div className={bGrid}>
        {WEEKDAYS.map((d, i) => (
          <div key={`wd-${i}`} className={aWeekday}>
            {d}
          </div>
        ))}
        {Array.from({ length: pad }, (_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const date = `${ym}-${String(i + 1).padStart(2, '0')}`
          const e = map.get(date)
          if (!e)
            return (
              <div key={date} className={bCell}>
                <span>{i + 1}</span>
              </div>
            )
          return (
            <a
              key={date}
              href={href(e)}
              className={`${bCell} ${bLive}`}
              style={{
                ['--day' as string]: e.hue ? swatch(e) : '#3a3a42',
                ['--ink' as string]: inkFor(e.hue),
              }}
            >
              <span>{i + 1}</span>
              <span className={bMood}>{e.hue?.mood ?? e.archetype ?? 'record'}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- Variant C

const cWrap = css({ padding: { base: '24px 20px 80px', md: '40px 48px 96px' }, maxWidth: '1100px' })

const cRow = css({ marginBottom: '20px' })

const cLabel = css({
  fontSize: '2xs',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
})

const cStrip = css({
  display: 'flex',
  gap: '2px',
  height: { base: '44px', md: '64px' },
})

const cBand = css({
  flex: 1,
  background: 'var(--day)',
  cursor: 'pointer',
  transition: 'flex 0.16s ease',
  _hover: { flex: 4 },
})

const cGap = css({ flex: 1, background: 'archive.lineSoft', opacity: 0.5 })

const cRecordBand = css({
  flex: 1,
  border: '1px dashed',
  borderColor: 'archive.faint',
  cursor: 'pointer',
  _hover: { flex: 4 },
})

function VariantC({ entries }: { entries: ProtoEntry[] }) {
  const map = byDate(entries)
  return (
    <div className={cWrap}>
      {monthsOf(entries).map((ym) => {
        const n = daysInMonth(ym)
        const built = entries.filter((e) => e.date.startsWith(ym)).length
        return (
          <div key={ym} className={cRow}>
            <div className={cLabel}>
              <span>{label(ym)}</span>
              <span>
                {built}/{n}
              </span>
            </div>
            <div className={cStrip}>
              {Array.from({ length: n }, (_, i) => {
                const date = `${ym}-${String(i + 1).padStart(2, '0')}`
                const e = map.get(date)
                if (!e) return <div key={date} className={cGap} />
                if (e.state === 'record')
                  return <a key={date} href={href(e)} title={`${date} — record only`} className={cRecordBand} />
                return (
                  <a
                    key={date}
                    href={href(e)}
                    title={`${date}${e.brief ? ` — ${e.brief.slice(0, 90)}` : ''}`}
                    className={cBand}
                    style={{ ['--day' as string]: e.hue ? swatch(e) : '#5c5c66' }}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------- switcher

const bar = css({
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: '#fff',
  color: '#111',
  borderRadius: '999px',
  padding: '8px 10px',
  boxShadow: '0 6px 28px rgba(0,0,0,0.45)',
  fontSize: 'xs',
  fontFamily: 'mono',
  zIndex: 999,
})

const barBtn = css({
  border: 'none',
  background: '#111',
  color: '#fff',
  borderRadius: '999px',
  width: '26px',
  height: '26px',
  cursor: 'pointer',
  lineHeight: 1,
})

export function PrototypeSwitcher({
  variants,
  current,
  onChange,
  names = VARIANT_NAMES,
}: {
  variants: string[]
  current: string
  onChange: (v: string) => void
  names?: Record<string, string>
}) {
  useEffect(() => {
    function onKey(ev: KeyboardEvent) {
      const t = ev.target as HTMLElement | null
      if (t && /input|textarea/i.test(t.tagName)) return
      if (t?.isContentEditable) return
      const i = variants.indexOf(current)
      if (ev.key === 'ArrowLeft') onChange(variants[(i - 1 + variants.length) % variants.length])
      if (ev.key === 'ArrowRight') onChange(variants[(i + 1) % variants.length])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [variants, current, onChange])

  const i = variants.indexOf(current)
  return (
    <div className={bar}>
      <button
        type="button"
        className={barBtn}
        onClick={() => onChange(variants[(i - 1 + variants.length) % variants.length])}
      >
        ←
      </button>
      <span>
        {current} — {names[current]}
      </span>
      <button
        type="button"
        className={barBtn}
        onClick={() => onChange(variants[(i + 1) % variants.length])}
      >
        →
      </button>
    </div>
  )
}

// ---------------------------------------------------------------- entry

export function ArchiveCalendarPrototype({ variant }: { variant: string }) {
  const [entries, setEntries] = useState<ProtoEntry[]>([])

  useEffect(() => {
    fetch('/_proto-archive.json')
      .then((r) => (r.ok ? r.json() : []))
      .then(setEntries)
      .catch(() => setEntries([]))
  }, [])

  if (entries.length === 0) return <div className={page} />

  return (
    <div className={page}>
      <Masthead entries={entries} />
      {variant === 'A' && <VariantA entries={entries} />}
      {variant === 'B' && <VariantB entries={entries} />}
      {variant === 'C' && <VariantC entries={entries} />}
    </div>
  )
}
