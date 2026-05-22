import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  padding: '0 5vw',
  minHeight: 'calc(100vh - 58px)',
})

const pageHeader = css({
  padding: '32px 0 16px 0',
})

const pageTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 4vw, 56px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
})

const roleLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '8px',
})

const mainRule = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'border',
  margin: '0',
})

const columnsGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  padding: '24px 0 64px 0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1.4fr 1fr',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: '1.25fr 1fr 0.85fr',
  },
})

const sectionHeader = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: 'snug',
  paddingBottom: '8px',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  marginBottom: '16px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '24px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '90px 1fr',
  gap: '12px',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontSize: '12px',
  lineHeight: 'normal',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '120px 1fr',
  },
})

const timelineYear = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wide',
  whiteSpace: 'nowrap',
  minWidth: '90px',
  '@media (min-width: 768px)': {
    minWidth: '120px',
  },
})

const timelineInfo = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  lineHeight: 'normal',
})

const timelineRole = css({
  color: 'text',
  fontWeight: 'medium',
})

const timelineDesc = css({
  color: 'textMuted',
  fontSize: '12px',
  marginTop: '2px',
  lineHeight: 'normal',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'medium',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'textSecondary',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  lineHeight: 'snug',
})

const personalItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  lineHeight: 'loose',
  padding: '4px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const personalLabel = css({
  fontWeight: 'medium',
  color: 'text',
  marginRight: '8px',
  fontSize: '11px',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
})

const footerWrap = css({
  padding: '24px 5vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: {
    color: 'textSecondary',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <>
      <div className={pageWrap}>
        <div className={pageHeader}>
          <h1 className={pageTitle}>{identity.name}</h1>
          <p className={roleLabel}>{identity.role}</p>
        </div>

        <hr className={mainRule} />

        <div className={columnsGrid}>
          {/* Column 1: Statement + Timeline */}
          <div>
            <div className={sectionHeader}>Statement</div>
            <p className={bodyText}>{identity.statement}</p>

            <div className={sectionHeader}>Experience</div>
            {timeline.map((entry, i) => (
              <div className={timelineRow} key={i}>
                <span className={timelineYear}>{entry.year}</span>
                <div className={timelineInfo}>
                  <span className={timelineRole}>{entry.role}</span>
                  {' — '}
                  {entry.company}
                  <div className={timelineDesc}>{entry.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Capabilities + Education */}
          <div>
            <div className={sectionHeader}>Capabilities</div>
            <div className={capGrid}>
              {capabilities.map((cap, i) => (
                <span className={capTag} key={i}>{cap}</span>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <div className={sectionHeader}>Education</div>
              <div className={timelineRow}>
                <span className={timelineYear}>{education.years}</span>
                <div className={timelineInfo}>
                  <span className={timelineRole}>{education.degree}</span>
                  {' — '}
                  {education.school}
                  <div className={timelineDesc}>{education.concentration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Personal */}
          <div>
            <div className={sectionHeader}>Personal</div>
            <div className={personalItem}>
              <span className={personalLabel}>Holes in One</span>
              {personal.holesInOne}
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Sport</span>
              {personal.sport}
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Teams</span>
              {personal.teams.join(', ')}
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Current Focus</span>
              {personal.currentFocus}
            </div>
          </div>
        </div>
      </div>

      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}