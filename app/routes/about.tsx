import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const heroBand = css({
  width: '100%',
  background: 'bg',
  padding: '128px 6vw 72px',
  minHeight: '50vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const heroName = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 12vw, 160px)',
  lineHeight: '0.85',
  color: 'accent',
  marginBottom: '16px',
})

const heroRole = css({
  fontFamily: 'body',
  fontSize: '14px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  marginBottom: '24px',
})

const heroStatement = css({
  fontFamily: 'body',
  fontSize: 'clamp(18px, 2.5vw, 24px)',
  lineHeight: '1.5',
  color: 'text',
  maxWidth: '60ch',
})

const band = css({
  width: '100%',
  padding: '72px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
})

const bandDark = css({
  width: '100%',
  padding: '72px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  background: 'bgCard',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '32px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '140px 200px 1fr',
  },
})

const timelineYear = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textMuted',
  minWidth: '120px',
  letterSpacing: '0.05em',
})

const timelineRole = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'block',
  },
})

const timelineDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.5',
  maxWidth: '60ch',
})

const timelineMobileCompany = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  marginTop: '2px',
  '@media (min-width: 768px)': {
    display: 'none',
  },
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.05em',
  color: 'textSecondary',
  padding: '8px 16px',
  border: '1px solid',
  borderColor: 'border',
  lineHeight: '1.4',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const personalItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.5',
})

const eduRow = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const eduTitle = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
})

const footerBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: {
    color: 'accent',
  },
})

function AboutPage() {
  return (
    <>
      {/* Hero band */}
      <section className={heroBand}>
        <h1 className={heroName}>{identity.name}</h1>
        <p className={heroRole}>{identity.role}</p>
        <p className={heroStatement}>{identity.statement}</p>
      </section>

      {/* Timeline band */}
      <section className={bandDark}>
        <p className={sectionLabel}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={timelineYear}>{entry.year}</span>
            <span className={timelineCompany}>{entry.company}</span>
            <div>
              <p className={timelineRole}>{entry.role}</p>
              <p className={timelineMobileCompany}>{entry.company}</p>
              <p className={timelineDesc}>{entry.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Education band */}
      <section className={band}>
        <p className={sectionLabel}>Education</p>
        <div className={eduRow}>
          <p className={eduTitle}>{education.school}</p>
          <p className={eduDetail}>{education.degree} — {education.concentration}</p>
          <p className={eduDetail}>{education.years}</p>
        </div>
      </section>

      {/* Capabilities band */}
      <section className={bandDark}>
        <p className={sectionLabel}>Capabilities</p>
        <div className={capGrid}>
          {capabilities.map((cap) => (
            <span key={cap} className={capTag}>{cap}</span>
          ))}
        </div>
      </section>

      {/* Personal band */}
      <section className={band}>
        <p className={sectionLabel}>Personal</p>
        <div className={personalGrid}>
          <div className={personalItem}>
            <span className={personalLabel}>Holes in One</span>
            <span className={personalValue}>{personal.holesInOne}</span>
          </div>
          <div className={personalItem}>
            <span className={personalLabel}>Sport</span>
            <span className={personalValue}>{personal.sport}</span>
          </div>
          <div className={personalItem}>
            <span className={personalLabel}>Teams</span>
            <span className={personalValue}>{personal.teams.join(', ')}</span>
          </div>
          <div className={personalItem}>
            <span className={personalLabel}>Current Focus</span>
            <span className={personalValue}>{personal.currentFocus}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={footerBand}>
        <a href="/" className={footerLink}>← Work</a>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}