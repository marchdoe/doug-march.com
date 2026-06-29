import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '4',
})

const sectionWrap = css({
  marginBottom: '6',
})

const statementText = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: 'normal',
  color: 'text',
  maxWidth: '65ch',
  marginBottom: '6',
})

const roleTitle = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  fontWeight: 'medium',
  color: 'text',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '4',
  paddingTop: '3',
  paddingBottom: '3',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '1',
  },
})

const yearText = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginTop: '1',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.05em',
  color: 'text',
  background: 'bgCard',
  padding: '4px 10px',
  borderRadius: 'sm',
})

const personalRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingTop: '2',
  paddingBottom: '2',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  color: 'text',
  textAlign: 'right',
})

const footerWrap = css({
  marginTop: '8',
  paddingTop: '4',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

function AboutPage() {
  return (
    <>
      {/* Identity */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>{identity.role}</p>
        <p className={statementText}>{identity.statement}</p>
      </div>

      {/* Timeline */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearText}>{entry.year}</span>
            <div>
              <p className={roleTitle}>{entry.role} · {entry.company}</p>
              <p className={descText}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Education</p>
        <div className={timelineRow}>
          <span className={yearText}>{education.years}</span>
          <div>
            <p className={roleTitle}>{education.school}</p>
            <p className={descText}>{education.degree} · {education.concentration}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Capabilities</p>
        <div className={capGrid}>
          {capabilities.map((cap) => (
            <span key={cap} className={capTag}>{cap}</span>
          ))}
        </div>
      </div>

      {/* Personal */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Personal</p>
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
          <span className={personalLabel}>Current Focus</span>
          <span className={personalValue}>{personal.currentFocus}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={footerWrap}>
        <span className={footerText}>© 2026</span>
        <a href="/archive" className={archiveLink}>Archive</a>
      </div>
    </>
  )
}