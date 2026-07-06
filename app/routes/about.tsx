import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const scrollRoot = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: '52px',
})

const heroSection = css({
  padding: '96px 6vw',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const heroName = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
  lineHeight: '0.9',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '24px',
})

const heroRole = css({
  fontFamily: 'body',
  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
  color: 'textSecondary',
  letterSpacing: '0.04em',
  marginBottom: '32px',
})

const heroStatement = css({
  fontFamily: 'body',
  fontSize: 'clamp(1.0625rem, 1.5vw, 1.1875rem)',
  lineHeight: '1.55',
  color: 'text',
  maxWidth: '72ch',
})

const sectionWrap = css({
  width: '100%',
  padding: '96px 6vw',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '48px',
})

const timelineList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
})

const timelineRow = css({
  display: 'flex',
  gap: '24px',
  padding: '20px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: '4px',
  },
})

const timelineYear = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontVariantNumeric: 'tabular-nums',
  color: 'textMuted',
  letterSpacing: '0.04em',
  minWidth: '120px',
  flexShrink: 0,
})

const timelineRole = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '1rem',
  color: 'text',
  minWidth: '200px',
  flexShrink: 0,
  '@media (max-width: 768px)': {
    minWidth: 'unset',
  },
})

const timelineCompany = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  color: 'textSecondary',
  minWidth: '140px',
  flexShrink: 0,
  '@media (max-width: 768px)': {
    minWidth: 'unset',
  },
})

const timelineDesc = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.55',
  color: 'textMuted',
  flex: '1',
  maxWidth: '50ch',
  '@media (max-width: 768px)': {
    maxWidth: '72ch',
  },
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  letterSpacing: '0.04em',
  color: 'textSecondary',
  background: 'bgCard',
  padding: '8px 16px',
  borderRadius: 'full',
  whiteSpace: 'nowrap',
})

const eduBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const eduTitle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '1.125rem',
  color: 'text',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  color: 'textSecondary',
  lineHeight: '1.55',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '32px',
})

const personalItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const personalValue = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '1.0625rem',
  color: 'text',
  lineHeight: '1.4',
})

const footerWrap = css({
  width: '100%',
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.04em',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.04em',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  padding: '8px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

function AboutPage() {
  return (
    <div className={scrollRoot}>
      {/* Hero — Identity */}
      <section className={heroSection}>
        <h1 className={heroName}>{identity.name}</h1>
        <p className={heroRole}>{identity.role}</p>
        <p className={heroStatement}>{identity.statement}</p>
      </section>

      {/* Timeline */}
      <section className={sectionWrap}>
        <p className={sectionLabel}>Experience</p>
        <div className={timelineList}>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRow}>
              <span className={timelineYear}>{entry.year}</span>
              <span className={timelineRole}>{entry.role}</span>
              <span className={timelineCompany}>{entry.company}</span>
              <span className={timelineDesc}>{entry.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={sectionWrap}>
        <p className={sectionLabel}>Education</p>
        <div className={eduBlock}>
          <p className={eduTitle}>{education.school}</p>
          <p className={eduDetail}>
            {education.degree}, {education.concentration}
          </p>
          <p className={eduDetail}>{education.years}</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className={sectionWrap}>
        <p className={sectionLabel}>Capabilities</p>
        <div className={capGrid}>
          {capabilities.map((cap) => (
            <span key={cap} className={capTag}>{cap}</span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className={sectionWrap}>
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
      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}