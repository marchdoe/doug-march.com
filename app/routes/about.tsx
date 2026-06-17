import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  padding: '0 6vw 96px',
  background: 'bg',
})

const pageHeader = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 4vw, 64px)',
  lineHeight: '0.92',
  letterSpacing: '-0.01em',
  color: 'accent',
  textTransform: 'uppercase',
  padding: '48px 0 16px',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: 'textSecondary',
  maxWidth: '65ch',
  padding: '24px 0 48px',
})

const sectionGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
  },
})

const sectionCol = css({
  paddingRight: '28px',
  borderRight: '1px solid',
  borderColor: 'border',
  '&:last-child': {
    borderRight: 'none',
    paddingRight: '0',
    paddingLeft: '28px',
  },
  '@media (max-width: 767px)': {
    paddingRight: '0',
    paddingLeft: '0 !important',
    borderRight: 'none',
    borderBottom: '1px solid',
    borderColor: 'border',
    paddingBottom: '32px',
    marginBottom: '32px',
    '&:last-child': {
      paddingLeft: '0',
      borderBottom: 'none',
    },
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
  padding: '0 0 8px',
  marginBottom: '0',
  lineHeight: '1',
})

const tlRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '12px',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '2px',
  },
})

const tlYear = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
})

const tlContent = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'text',
})

const tlCompany = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
})

const tlDesc = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  lineHeight: '1.5',
  marginTop: '2px',
  maxWidth: '65ch',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const subHead = css({
  fontFamily: 'display',
  fontSize: '16px',
  letterSpacing: '0.12em',
  color: 'accent',
  textTransform: 'uppercase',
  marginTop: '32px',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  lineHeight: '1',
})

const personalRow = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  lineHeight: '1.5',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
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

function AboutPage() {
  return (
    <>
      <div className={pageWrap}>
        <h1 className={pageHeader}>{identity.name}</h1>
        <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textMuted', padding: '8px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' })}>
          {identity.role}
        </p>
        <p className={statement}>{identity.statement}</p>

        <div className={sectionGrid}>
          {/* Timeline Column */}
          <div className={sectionCol}>
            <h2 className={colHeader}>Timeline</h2>
            {timeline.map((entry, i) => (
              <div key={i} className={tlRow}>
                <span className={tlYear}>{entry.year}</span>
                <div>
                  <div className={tlContent}>{entry.role}</div>
                  <div className={tlCompany}>{entry.company}</div>
                  <div className={tlDesc}>{entry.description}</div>
                </div>
              </div>
            ))}

            <h3 className={subHead}>Education</h3>
            <div className={tlRow}>
              <span className={tlYear}>{education.years}</span>
              <div>
                <div className={tlContent}>{education.degree}</div>
                <div className={tlCompany}>{education.school}</div>
                <div className={tlDesc}>{education.concentration}</div>
              </div>
            </div>
          </div>

          {/* Capabilities + Personal Column */}
          <div className={sectionCol}>
            <h2 className={colHeader}>Capabilities</h2>
            {capabilities.map((cap, i) => (
              <div key={i} className={capItem}>{cap}</div>
            ))}

            <h3 className={subHead}>Personal</h3>
            <div className={personalRow}>
              <div className={personalLabel}>Holes in One</div>
              <div>{personal.holesInOne}</div>
            </div>
            <div className={personalRow}>
              <div className={personalLabel}>Sport</div>
              <div>{personal.sport}</div>
            </div>
            <div className={personalRow}>
              <div className={personalLabel}>Teams</div>
              <div>{personal.teams.join(', ')}</div>
            </div>
            <div className={personalRow}>
              <div className={personalLabel}>Current Focus</div>
              <div>{personal.currentFocus}</div>
            </div>
          </div>
        </div>
      </div>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}