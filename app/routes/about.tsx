import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  maxWidth: 'none',
  padding: '2vw',
  '@media (max-width: 768px)': {
    padding: '16px',
  },
})

const navArea = css({
  marginBottom: '2vw',
  '@media (max-width: 768px)': {
    marginBottom: '16px',
  },
})

const contentGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2vw',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
})

const leftCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2vw',
  '@media (max-width: 768px)': {
    gap: '24px',
  },
})

const rightCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2vw',
  '@media (max-width: 768px)': {
    gap: '24px',
  },
})

const sectionCard = css({
  background: 'bgCard',
  borderRadius: 'md',
  padding: 'clamp(20px, 2.5vw, 40px)',
  boxShadow: '0 2px 16px rgba(2, 8, 16, 0.55)',
})

const sectionTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '20px',
})

const identityName = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
  lineHeight: '0.90',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '12px',
})

const identityRole = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '1rem',
  color: 'accent',
  marginBottom: '20px',
})

const identityStatement = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const timeYear = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
  flexShrink: 0,
  minWidth: '120px',
})

const timeContent = css({})

const timeRole = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.9375rem',
  color: 'text',
  lineHeight: '1.15',
})

const timeCompany = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'accent',
  marginTop: '2px',
})

const timeDesc = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginTop: '6px',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textSecondary',
  background: 'bgSubtle',
  padding: '6px 12px',
  borderRadius: 'sm',
})

const personalRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'text',
  textAlign: 'right',
})

const eduRow = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  color: 'textSecondary',
  lineHeight: '1.55',
})

const eduSchool = css({
  fontWeight: 'semibold',
  color: 'text',
})

const eduDetail = css({
  fontSize: '0.8125rem',
  color: 'textMuted',
  marginTop: '4px',
})

const footerArea = css({
  padding: '2vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2vw',
  '@media (max-width: 768px)': {
    padding: '16px',
    flexDirection: 'column',
    gap: '8px',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <div className={pageWrap}>
      <div className={navArea}>
        <Sidebar />
      </div>

      <div className={contentGrid}>
        <div className={leftCol}>
          {/* Identity */}
          <div className={sectionCard}>
            <h1 className={identityName}>{identity.name}</h1>
            <p className={identityRole}>{identity.role}</p>
            <p className={identityStatement}>{identity.statement}</p>
          </div>

          {/* Timeline */}
          <div className={sectionCard}>
            <h2 className={sectionTitle}>Experience</h2>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRow}>
                <span className={timeYear}>{entry.year}</span>
                <div className={timeContent}>
                  <p className={timeRole}>{entry.role}</p>
                  <p className={timeCompany}>{entry.company}</p>
                  <p className={timeDesc}>{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={rightCol}>
          {/* Capabilities */}
          <div className={sectionCard}>
            <h2 className={sectionTitle}>Capabilities</h2>
            <div className={capGrid}>
              {capabilities.map((cap) => (
                <span key={cap} className={capItem}>{cap}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={sectionCard}>
            <h2 className={sectionTitle}>Education</h2>
            <div className={eduRow}>
              <p className={eduSchool}>{education.school}</p>
              <p>{education.degree}, {education.concentration}</p>
              <p className={eduDetail}>{education.years}</p>
            </div>
          </div>

          {/* Personal */}
          <div className={sectionCard}>
            <h2 className={sectionTitle}>Personal</h2>
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
        </div>
      </div>

      <footer className={footerArea}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}