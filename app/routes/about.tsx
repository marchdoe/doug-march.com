import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  padding: '48px 5vw 64px 6vw',
  maxWidth: '1200px',
})

const heroName = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 96px)',
  lineHeight: '0.92',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'text',
  marginBottom: '8px',
})

const heroRole = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'light',
  letterSpacing: '0.14em',
  color: 'textMuted',
  textTransform: 'uppercase',
  marginBottom: '32px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(18px, 2.5vw, 24px)',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '64px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const section = css({
  marginBottom: '64px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '140px 200px 1fr',
  },
})

const timeYear = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
})

const timeRole = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontWeight: 'semibold',
  color: 'text',
})

const timeCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'block',
  },
})

const timeDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginTop: '4px',
})

const mobileCompany = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'accent',
  marginBottom: '2px',
  '@media (min-width: 768px)': {
    display: 'none',
  },
})

const capsGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textSecondary',
  padding: '6px 14px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
  letterSpacing: '0.02em',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const personalCard = css({
  padding: '20px',
  borderLeft: '4px solid',
  borderLeftColor: 'accent',
  background: 'bgCard',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'semibold',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '15px',
  lineHeight: '1.55',
  color: 'text',
})

const eduRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  padding: '16px 0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '140px 1fr',
  },
})

const footerBar = css({
  marginTop: '80px',
  paddingTop: '24px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '24px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

function AboutPage() {
  return (
    <div className={page}>
      <div className={heroName}>{identity.name}</div>
      <div className={heroRole}>{identity.role}</div>
      <p className={statement}>{identity.statement}</p>

      {/* Timeline */}
      <div className={section}>
        <div className={sectionLabel}>Experience</div>
        {timeline.map((t, i) => (
          <div className={timelineRow} key={i}>
            <span className={timeYear}>{t.year}</span>
            <span className={timeCompany}>{t.company}</span>
            <div>
              <div className={mobileCompany}>{t.company}</div>
              <div className={timeRole}>{t.role}</div>
              <p className={timeDesc}>{t.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={section}>
        <div className={sectionLabel}>Education</div>
        <div className={eduRow}>
          <span className={timeYear}>{education.years}</span>
          <div>
            <div className={timeRole}>{education.degree}</div>
            <div className={mobileCompany} style={{ display: 'block' }}>{education.school}</div>
            <p className={timeDesc}>{education.concentration}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className={section}>
        <div className={sectionLabel}>Capabilities</div>
        <div className={capsGrid}>
          {capabilities.map((c) => (
            <span key={c} className={capTag}>{c}</span>
          ))}
        </div>
      </div>

      {/* Personal */}
      <div className={section}>
        <div className={sectionLabel}>Personal</div>
        <div className={personalGrid}>
          <div className={personalCard}>
            <div className={personalLabel}>Holes in One</div>
            <div className={personalValue}>{personal.holesInOne}</div>
          </div>
          <div className={personalCard}>
            <div className={personalLabel}>Sport</div>
            <div className={personalValue}>{personal.sport}</div>
          </div>
          <div className={personalCard}>
            <div className={personalLabel}>Teams</div>
            <div className={personalValue}>{personal.teams.join(', ')}</div>
          </div>
          <div className={personalCard}>
            <div className={personalLabel}>Current Focus</div>
            <div className={personalValue}>{personal.currentFocus}</div>
          </div>
        </div>
      </div>

      <div className={footerBar}>
        <span className={footerText}>© Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerText} style={{ textDecoration: 'none' }}>Archive</a>
      </div>
    </div>
  )
}