import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { timeline, capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

const mastheadStyle = css({
  background: 'bgMasthead',
  padding: '24px 6vw 20px',
})

const heroQuote = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 6.5vw, 88px)',
  lineHeight: '0.92',
  letterSpacing: '-0.01em',
  color: 'accent',
  textTransform: 'uppercase',
  maxWidth: '100%',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontStyle: 'italic',
  color: 'textSecondary',
  textAlign: 'right',
  marginTop: '8px',
})

const violetRule = css({
  height: '2px',
  background: 'borderAccent',
  width: '100%',
})

/* ---- Catalog Grid ---- */

const catalogGrid = css({
  display: 'grid',
  gridTemplateColumns: '1.2fr 1fr 1fr 0.9fr',
  gap: '0',
  padding: '0 6vw 96px',
  background: 'bg',

  '@media (max-width: 1023px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
  },
})

const columnStyle = css({
  padding: '0 28px 32px 0',
  borderRight: '1px solid',
  borderColor: 'border',
  '&:last-child': {
    borderRight: 'none',
    paddingRight: '0',
  },
  '@media (max-width: 1023px)': {
    borderRight: 'none',
    paddingRight: '0',
    paddingBottom: '32px',
    borderBottom: '1px solid',
    borderColor: 'border',
    '&:last-child': { borderBottom: 'none' },
  },
})

const colHeader = css({
  fontFamily: 'display',
  fontSize: '18px',
  letterSpacing: '0.12em',
  color: 'accent',
  textTransform: 'uppercase',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  padding: '24px 0 8px',
  marginBottom: '0',
  lineHeight: '1',
})

const rowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 120ms ease',
  _hover: { background: 'bgRowHover' },
})

const rowLink = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  width: '100%',
  padding: '8px 4px',
  borderBottom: '1px solid',
  borderColor: 'border',
  textDecoration: 'none',
  color: 'text',
  transition: 'background 120ms ease, color 120ms ease',
  _hover: {
    background: 'bgRowHover',
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '-2px',
  },
})

const rowTitle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
})

const rowMeta = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  flexShrink: 0,
  marginLeft: '8px',
})

const rowType = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
})

const featuredLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'accentDim',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '2px',
})

const problemText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  lineHeight: '1.5',
  padding: '4px 4px 8px',
  borderBottom: '1px solid',
  borderColor: 'border',
  maxWidth: '65ch',
})

/* ---- Signal rows ---- */

const signalRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '6px 4px',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontFamily: 'body',
  fontSize: '12px',
  lineHeight: '1.5',
  color: 'textSecondary',
  gap: '8px',
})

const signalHighlight = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '6px 4px 6px 10px',
  borderBottom: '1px solid',
  borderColor: 'border',
  borderLeft: '2px solid',
  borderLeftColor: 'borderAccent',
  fontFamily: 'body',
  fontSize: '13px',
  lineHeight: '1.5',
  color: 'text',
  gap: '8px',
})

const signalAccent = css({
  color: 'accent',
  fontVariantNumeric: 'tabular-nums',
  flexShrink: 0,
})

const signalMuted = css({
  color: 'textMuted',
  flexShrink: 0,
})

/* ---- Career / Capabilities ---- */

const careerRow = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px',
  borderBottom: '1px solid',
  borderColor: 'border',
  gap: '2px',
})

const careerTitle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'text',
})

const careerCompany = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
})

const careerYear = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
})

const capTag = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '4px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  width: '100%',
})

const footerStyle = css({
  padding: '32px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  background: 'bg',
})

const footerLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function HomePage() {
  return (
    <>
      {/* Masthead */}
      <div className={mastheadStyle}>
        <h1 className={heroQuote}>
          Wisdom is doing now what you are going to be happy with later on.
        </h1>
        <p className={attribution}>— Joyce Meyer</p>
      </div>

      {/* Violet rule */}
      <div className={violetRule} aria-hidden="true" />

      {/* Catalog grid */}
      <div className={catalogGrid}>
        {/* Column 1: Projects */}
        <div className={columnStyle}>
          <h2 className={colHeader}>Projects</h2>

          {featuredProject && (
            <>
              <div style={{ padding: '8px 4px 2px' }}>
                <span className={featuredLabel}>Featured</span>
              </div>
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                className={rowLink}
              >
                <span className={rowTitle}>{featuredProject.title}</span>
                <span className={rowMeta}>{featuredProject.year}</span>
              </a>
              {featuredProject.problem && (
                <p className={problemText}>{featuredProject.problem}</p>
              )}
            </>
          )}

          {selectedWork.map((p) => (
            <a key={p.slug} href={`/work/${p.slug}`} className={rowLink}>
              <span>
                <span className={rowTitle}>{p.title}</span>
                <span className={rowType} style={{ marginLeft: '8px' }}>{p.type}</span>
              </span>
              <span className={rowMeta}>{p.year}</span>
            </a>
          ))}

          {experiments.map((p) => (
            <a
              key={p.slug}
              href={p.externalUrl || `/work/${p.slug}`}
              className={rowLink}
            >
              <span>
                <span className={rowTitle}>{p.title}</span>
                <span className={rowType} style={{ marginLeft: '8px' }}>{p.type}</span>
              </span>
              <span className={rowMeta}>{p.year}</span>
            </a>
          ))}
        </div>

        {/* Column 2: Career */}
        <div className={columnStyle}>
          <h2 className={colHeader}>Career</h2>
          {timeline.slice(0, 8).map((entry, i) => (
            <div key={i} className={careerRow}>
              <span className={careerTitle}>{entry.role}</span>
              <span className={careerCompany}>{entry.company}</span>
              <span className={careerYear}>{entry.year}</span>
            </div>
          ))}
          <a href="/about" className={rowLink} style={{ marginTop: '4px' }}>
            <span className={rowTitle} style={{ color: '#CC55F5' }}>View full timeline →</span>
          </a>
        </div>

        {/* Column 3: Capabilities */}
        <div className={columnStyle}>
          <h2 className={colHeader}>Capabilities</h2>
          {capabilities.map((cap, i) => (
            <div key={i} className={capTag}>{cap}</div>
          ))}
        </div>

        {/* Column 4: Today */}
        <div className={columnStyle}>
          <h2 className={colHeader}>Today</h2>

          {/* Juneteenth - highlighted */}
          <div className={signalHighlight}>
            <span>JUNETEENTH — 2 DAYS</span>
          </div>

          {/* Sports */}
          <div className={signalRow}>
            <span>⚾ DET Tigers</span>
            <span>
              <span className={css({ color: 'textSecondary' })}>2–4</span>
              {' '}
              <span className={signalMuted}>L</span>
            </span>
          </div>

          <div className={signalRow}>
            <span>⛳ U.S. Open</span>
            <span className={signalMuted}>SCHEDULED</span>
          </div>

          {/* HN */}
          <div className={signalRow}>
            <span>Running Local Models Is Good Now</span>
            <span className={signalAccent}>↑1372</span>
          </div>

          <div className={signalRow}>
            <span>GrapheneOS → Android 17</span>
            <span className={signalAccent}>↑813</span>
          </div>

          {/* Moon */}
          <div className={signalRow}>
            <span>🌙 Waxing Crescent</span>
            <span className={signalMuted}>9.7%</span>
          </div>

          {/* Music */}
          <div className={signalRow}>
            <span>♫ Tobin Sprout / My Morning Jacket</span>
          </div>

          {/* Daylight */}
          <div className={signalRow}>
            <span>☀ 14.7h</span>
            <span className={signalMuted}>04:48 → 19:33</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerStyle}>
        <span>© 2026 Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}