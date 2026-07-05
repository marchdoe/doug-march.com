import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const dateStamp = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '12',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '4',
})

const sectionDivider = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '12',
  marginBottom: '12',
})

const statementText = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '55ch',
  marginBottom: '12',
})

const identityName = css({
  fontFamily: 'body',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: 'text',
  marginBottom: '1',
})

const identityRole = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'textMuted',
  marginBottom: '4',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '4',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: {
    borderBottom: 'none',
  },
})

const timelineYear = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontVariantNumeric: 'tabular-nums',
  color: 'textMuted',
  minWidth: '120px',
})

const timelineContent = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  lineHeight: '1.5',
})

const timelineRoleText = css({
  fontWeight: 'medium',
  color: 'text',
})

const timelineCompany = css({
  color: 'textSecondary',
})

const timelineDesc = css({
  color: 'textMuted',
  fontSize: '0.8125rem',
  marginTop: '1',
  lineHeight: '1.5',
  maxWidth: '55ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'textSecondary',
  padding: '4px 8px',
  border: '1px solid',
  borderColor: 'border',
})

const personalRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '6px 0',
  fontFamily: 'body',
  fontSize: '0.875rem',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: {
    borderBottom: 'none',
  },
})

const personalLabel = css({
  color: 'textMuted',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
})

const personalValue = css({
  color: 'textSecondary',
  textAlign: 'right',
})

const footerStyle = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '6',
  marginTop: '12',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

function AboutPage() {
  return (
    <>
      <div className={dateStamp}>Sunday, July 5, 2026</div>

      {/* Identity */}
      <div style={{ marginBottom: '48px' }}>
        <h2 className={identityName}>{identity.name}</h2>
        <div className={identityRole}>{identity.role}</div>
        <p className={statementText}>{identity.statement}</p>
      </div>

      {/* Timeline */}
      <div className={sectionDivider}>
        <div className={sectionLabel}>Experience</div>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={timelineYear}>{entry.year}</span>
            <div className={timelineContent}>
              <div>
                <span className={timelineRoleText}>{entry.role}</span>
                {' · '}
                <span className={timelineCompany}>{entry.company}</span>
              </div>
              <div className={timelineDesc}>{entry.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={sectionDivider}>
        <div className={sectionLabel}>Education</div>
        <div className={timelineRow}>
          <span className={timelineYear}>{education.years}</span>
          <div className={timelineContent}>
            <div>
              <span className={timelineRoleText}>{education.degree}</span>
              {' · '}
              <span className={timelineCompany}>{education.school}</span>
            </div>
            <div className={timelineDesc}>{education.concentration}</div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className={sectionDivider}>
        <div className={sectionLabel}>Capabilities</div>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capTag}>{cap}</span>
          ))}
        </div>
      </div>

      {/* Personal */}
      <div className={sectionDivider}>
        <div className={sectionLabel}>Personal</div>
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
      <footer className={footerStyle}>
        <div className={footerText}>
          Doug March · Product Designer & Developer · <a href="/archive" style={{ color: 'inherit', textDecoration: 'none' }}>Archive</a>
        </div>
      </footer>
    </>
  )
}