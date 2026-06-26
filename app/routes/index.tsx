import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const pageRoot = css({
  display: 'grid',
  gridTemplateRows: 'minmax(34vh, auto) 1fr',
  minHeight: 'calc(100vh - 56px)',
  padding: '0 4vw',
})

const masthead = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: '32px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
})

const heroLine = css({
  fontFamily: 'display',
  fontSize: 'clamp(52px, 11vw, 175px)',
  lineHeight: 'tight',
  letterSpacing: '0.01em',
  color: 'text',
  margin: 0,
  padding: 0,
})

const indexBody = css({
  display: 'grid',
  gridTemplateColumns: '2.5fr 2fr 1.5fr',
  borderTop: 'none',
  '@media (max-width: 1023px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
  },
})

const colStyle = css({
  padding: '24px 24px 48px',
  borderRight: '1px solid',
  borderColor: 'border',
  '&:last-child': { borderRight: 'none' },
  '@media (max-width: 767px)': {
    borderRight: 'none',
    borderBottom: '1px solid',
    borderColor: 'border',
    padding: '20px 0 32px',
    '&:last-child': { borderBottom: 'none' },
  },
})

const colHeader = css({
  fontFamily: 'display',
  fontSize: 'clamp(13px, 1.2vw, 18px)',
  letterSpacing: '0.14em',
  color: 'accent',
  textTransform: 'uppercase',
  lineHeight: '1',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
})

const entryRow = css({
  display: 'grid',
  gridTemplateColumns: '28px 1fr',
  gap: '0 8px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  borderLeft: '2px solid transparent',
  transition: 'border-left 0.15s ease',
  _hover: { borderLeftColor: 'accentDark' },
  '@media (max-width: 767px)': {
    gridTemplateColumns: '24px 1fr',
  },
})

const entryNum = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontSize: '11px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 'normal',
  paddingTop: '2px',
})

const entryTitle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'text',
  lineHeight: 'normal',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const entryMeta = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginTop: '2px',
})

const entrySmall = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textMuted',
  lineHeight: 'normal',
  marginTop: '2px',
})

const signalLabel = css({
  fontFamily: 'display',
  fontSize: '14px',
  letterSpacing: '0.14em',
  color: 'accent',
  lineHeight: '1',
})

const signalRow = css({
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const signalRowFeatured = css({
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  borderLeft: '2px solid',
  borderLeftColor: 'accentDark',
  paddingLeft: '12px',
})

const scoreAccent = css({
  color: 'accent',
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  fontVariantNumeric: 'tabular-nums',
})

const footerStyle = css({
  padding: '24px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.02em',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const leaderRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 0',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  fontVariantNumeric: 'tabular-nums',
})

function HomePage() {
  const allProjects = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments,
  ]

  return (
    <div className={pageRoot}>
      {/* MASTHEAD */}
      <div className={masthead}>
        <h1>
          <span className={heroLine}>SEALED FOR</span>
          <span className={heroLine}>2,000 YEARS.</span>
        </h1>
      </div>

      {/* INDEX BODY */}
      <div>
        <div className={indexBody}>
          {/* COLUMN A: WORK */}
          <div className={colStyle}>
            <div className={colHeader}>WORK</div>
            {allProjects.map((p, i) => {
              const href = p.depth === 'full'
                ? (p.featured && p.externalUrl ? p.externalUrl : `/work/${p.slug}`)
                : (p.externalUrl || `/work/${p.slug}`)
              return (
                <div className={entryRow} key={p.slug}>
                  <span className={entryNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <a href={href} className={entryTitle}>{p.title}</a>
                    <div className={entryMeta}>
                      {p.type} · {p.year}
                      {p.role ? ` · ${p.role}` : ''}
                    </div>
                    {p.problem && <div className={entrySmall}>{p.problem}</div>}
                    {p.description && <div className={entrySmall}>{p.description}</div>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* COLUMN B: SIGNALS */}
          <div className={colStyle}>
            <div className={colHeader}>SIGNALS</div>

            {/* HN #1 */}
            <div className={signalRowFeatured}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '4px' }}>
                <span className={signalLabel}>HN #1</span>
                <span className={scoreAccent}>▲ 1327</span>
              </div>
              <div className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '13px', color: 'text', lineHeight: 'normal' })}>
                An entire Herculaneum scroll has been read for the first time
              </div>
              <div className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', marginTop: '4px' })}>
                Vesuvius Challenge · scrollprize.org
              </div>
            </div>

            {/* GOLF */}
            <div className={signalRow}>
              <div style={{ marginBottom: '6px' }}>
                <span className={signalLabel}>GOLF</span>
                <span className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', marginLeft: '8px' })}>Travelers Championship</span>
              </div>
              <div className={leaderRow}>
                <span>1 &nbsp;E. Cole</span>
                <span className={scoreAccent}>-7</span>
              </div>
              <div className={leaderRow}>
                <span>2 &nbsp;N. Echavarria</span>
                <span>-6</span>
              </div>
              <div className={leaderRow}>
                <span>T2 B. Griffin</span>
                <span>-6</span>
              </div>
              <div className={leaderRow}>
                <span>4 &nbsp;S. Scheffler</span>
                <span>-5</span>
              </div>
              <div className={leaderRow}>
                <span>T4 X. Schauffele</span>
                <span>-5</span>
              </div>
            </div>

            {/* AWWWARDS */}
            <div className={signalRow}>
              <div style={{ marginBottom: '6px' }}>
                <span className={signalLabel}>AWWWARDS</span>
                <span className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', marginLeft: '8px' })}>SOTD</span>
              </div>
              <div className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', lineHeight: 'normal' })}>
                <div style={{ padding: '3px 0' }}>Himachal</div>
                <div style={{ padding: '3px 0' }}>Pil Rebranding</div>
                <div style={{ padding: '3px 0' }}>AMFA</div>
              </div>
            </div>

            {/* QUOTE */}
            <div className={signalRow}>
              <span className={signalLabel}>QUOTE</span>
              <div className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', lineHeight: 'normal', fontStyle: 'italic', marginTop: '6px' })}>
                "Failure is the key to success."
              </div>
              <div className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', marginTop: '2px' })}>
                — Morihei Ueshiba
              </div>
            </div>
          </div>

          {/* COLUMN C: TODAY */}
          <div className={colStyle}>
            <div className={colHeader}>TODAY</div>

            {/* DATE */}
            <div className={signalRow}>
              <div className={css({ fontFamily: 'display', fontSize: '18px', letterSpacing: '0.1em', color: 'text', lineHeight: '1.2' })}>
                FRI 26 JUN 2026
              </div>
              <div className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', marginTop: '6px', lineHeight: 'normal' })}>
                Sunrise 04:50 · Sunset 19:35 · 14.7h daylight
              </div>
            </div>

            {/* TIGERS */}
            <div className={signalRow}>
              <span className={signalLabel}>DET TIGERS</span>
              <div className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', marginTop: '4px', fontVariantNumeric: 'tabular-nums' })}>
                L 1–2
              </div>
            </div>

            {/* MOON */}
            <div className={signalRow}>
              <span className={signalLabel}>MOON</span>
              <div className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' })}>
                <span className={css({ color: 'accent', fontSize: '16px' })}>●</span>
                <span>Waxing Gibbous · 91%</span>
              </div>
            </div>

            {/* LISTENING */}
            <div className={signalRow}>
              <span className={signalLabel}>LISTENING</span>
              <div className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', marginTop: '4px', lineHeight: 'normal' })}>
                <div>Wet Leg</div>
                <div>Tobin Sprout</div>
                <div>My Morning Jacket</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className={footerStyle}>
          <span className={footerText}>Doug March · Product Designer & Developer</span>
          <a href="/archive" className={archiveLink}>Archive</a>
        </div>
      </div>
    </div>
  )
}