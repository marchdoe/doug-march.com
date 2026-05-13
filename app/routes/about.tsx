import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionLabel = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.2',
  marginBottom: '16px',
})

const statement = css({
  fontFamily: 'display',
  fontSize: 'clamp(20px, 2.5vw, 28px)',
  fontWeight: 'bold',
  lineHeight: 'snug',
  color: 'text',
  maxWidth: '50ch',
  marginBottom: '12px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: 'base',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '55ch',
})

const sectionWrap = css({
  paddingBottom: '32px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '32px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  _last: {
    borderBottom: 'none',
  },

  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const roleCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
})

const roleTitle = css({
  fontFamily: 'body',
  fontSize: 'base',
  color: 'text',
  fontWeight: 'medium',
})

const roleCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
})

const roleDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  lineHeight: 'normal',
  marginTop: '4px',
  maxWidth: '50ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.05em',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  lineHeight: '1.3',
})

const personalRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '8px 0',
  alignItems: 'baseline',

  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '2px',
  },
})

const personalLabel = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  minWidth: '120px',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.5',
})

const footerArea = css({
  marginTop: 'auto',
  paddingTop: '32px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const footerLink = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.05em',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function AboutPage() {
  return (
    <>
      {/* Identity */}
      <div className={sectionWrap}>
        <span className={sectionLabel}>About</span>
        <h2 className={statement}>{identity.name} — {identity.role}</h2>
        <p className={bodyText}>{identity.statement}</p>
      </div>

      {/* Timeline */}
      <div className={sectionWrap}>
        <span className={sectionLabel}>Experience</span>
        {timeline.map((entry, i) => (
          <div className={timelineRow} key={i}>
            <span className={yearCol}>{entry.year}</span>
            <div className={roleCol}>
              <span className={roleTitle}>{entry.role}</span>
              <span className={roleCompany}>{entry.company}</span>
              <span className={roleDesc}>{entry.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={sectionWrap}>
        <span className={sectionLabel}>Education</span>
        <div className={timelineRow}>
          <span className={yearCol}>{education.years}</span>
          <div className={roleCol}>
            <span className={roleTitle}>{education.degree}</span>
            <span className={roleCompany}>{education.school}</span>
            <span className={roleDesc}>{education.concentration}</span>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className={sectionWrap}>
        <span className={sectionLabel}>Capabilities</span>
        <div className={capGrid}>
          {capabilities.map((cap) => (
            <span className={capTag} key={cap}>{cap}</span>
          ))}
        </div>
      </div>

      {/* Personal */}
      <div className={sectionWrap}>
        <span className={sectionLabel}>Personal</span>
        <div className={personalRow}>
          <span className={personalLabel}>Holes in One</span>
          <span className={personalValue}>{personal.holesInOne}</span>
        </div>
        <div className={personalRow}>
          <span className={personalLabel}>Sport</span>
          <span className={personalValue}>{personal.sport}</span>
        </div>
        <div className={personalRow}>
          <span className={personalLabel}>Teams</span>
          <span className={personalValue}>{personal.teams.join(', ')}</span>
        </div>
        <div className={personalRow}>
          <span className={personalLabel}>Focus</span>
          <span className={personalValue}>{personal.currentFocus}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={footerArea}>
        <span className={footerText}>Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </div>
    </>
  )
}