import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  maxWidth: '960px',
  paddingTop: '48px',
  paddingBottom: '64px',
})

const heroName = css({
  fontFamily: 'display',
  fontSize: 'clamp(2rem, 4vw, 4rem)',
  fontWeight: 'bold',
  lineHeight: 'snug',
  textTransform: 'uppercase',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '8px',
})

const heroRole = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '24px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '60ch',
  marginBottom: '64px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.5625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
  '@media (min-width: 768px)': {
    gridTemplateColumns: '140px 180px 1fr',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'semibold',
  color: 'textMuted',
  letterSpacing: 'wide',
  minWidth: '120px',
  flexShrink: 0,
})

const roleCol = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'medium',
  color: 'text',
})

const companyCol = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'normal',
  color: 'textSecondary',
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'block',
  },
})

const descCol = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  lineHeight: 'normal',
  marginTop: '4px',
  gridColumn: '1 / -1',
  '@media (min-width: 768px)': {
    gridColumn: '3',
    marginTop: '0',
  },
})

const mobileCompany = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  '@media (min-width: 768px)': {
    display: 'none',
  },
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '64px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  fontWeight: 'semibold',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textSecondary',
  background: 'bgCard',
  padding: '6px 12px',
  borderRadius: 'sm',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '0.5625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'textSecondary',
  lineHeight: 'normal',
})

const sectionWrap = css({
  marginBottom: '64px',
})

const eduRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '140px 1fr',
  },
})

function AboutPage() {
  return (
    <div className={pageWrap}>
      <h1 className={heroName}>{identity.name}</h1>
      <p className={heroRole}>{identity.role}</p>
      <p className={statement}>{identity.statement}</p>

      <div className={sectionWrap}>
        <h2 className={sectionLabel}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCol}>{entry.year}</span>
            <div className={companyCol}>{entry.company}</div>
            <div>
              <p className={roleCol}>
                {entry.role}
                <span className={mobileCompany}> · {entry.company}</span>
              </p>
              <p className={descCol}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={sectionWrap}>
        <h2 className={sectionLabel}>Education</h2>
        <div className={eduRow}>
          <span className={yearCol}>{education.years}</span>
          <div>
            <p className={roleCol}>{education.degree}</p>
            <p className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted', lineHeight: 'normal' })}>
              {education.concentration} · {education.school}
            </p>
          </div>
        </div>
      </div>

      <div className={sectionWrap}>
        <h2 className={sectionLabel}>Capabilities</h2>
        <div className={capGrid}>
          {capabilities.map((cap) => (
            <span key={cap} className={capTag}>{cap}</span>
          ))}
        </div>
      </div>

      <div className={sectionWrap}>
        <h2 className={sectionLabel}>Personal</h2>
        <div className={personalGrid}>
          <div>
            <p className={personalLabel}>Holes in One</p>
            <p className={personalValue}>{personal.holesInOne}</p>
          </div>
          <div>
            <p className={personalLabel}>Sport</p>
            <p className={personalValue}>{personal.sport}</p>
          </div>
          <div>
            <p className={personalLabel}>Teams</p>
            <p className={personalValue}>{personal.teams.join(', ')}</p>
          </div>
          <div>
            <p className={personalLabel}>Current Focus</p>
            <p className={personalValue}>{personal.currentFocus}</p>
          </div>
        </div>
      </div>
    </div>
  )
}