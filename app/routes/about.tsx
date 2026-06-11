import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  minHeight: '100vh',
  paddingLeft: '4vw',
  paddingRight: '4vw',
  paddingTop: '96px',
  paddingBottom: '128px',
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 120px)',
  lineHeight: '0.85',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'text',
  marginBottom: '64px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  color: 'textMuted',
  marginBottom: '24px',
  display: 'block',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 2vw, 20px)',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '96px',
})

const section = css({
  marginBottom: '96px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  paddingTop: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.06em',
  minWidth: '120px',
  paddingTop: '3px',
})

const roleText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'text',
})

const companyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'textSecondary',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.6',
  color: 'textMuted',
  marginTop: '4px',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px 16px',
})

const capItem = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: '0.06em',
  padding: '8px 16px',
  border: '1px solid',
  borderColor: 'border',
  whiteSpace: 'nowrap',
})

const personalBlock = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const personalLabel = css({
  color: 'textMuted',
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '4px',
  marginTop: '24px',
})

function AboutPage() {
  return (
    <main className={page}>
      <h1 className={pageTitle}>{identity.name}</h1>

      <span className={sectionLabel}>{identity.role}</span>
      <p className={statement}>{identity.statement}</p>

      <div className={section}>
        <span className={sectionLabel}>Timeline</span>
        {timeline.map((entry, i) => (
          <div className={timelineRow} key={i}>
            <span className={yearCol}>{entry.year}</span>
            <div>
              <span className={roleText}>{entry.role}</span>
              <span className={companyText}> — {entry.company}</span>
              <p className={descText}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={section}>
        <span className={sectionLabel}>Education</span>
        <div className={timelineRow}>
          <span className={yearCol}>{education.years}</span>
          <div>
            <span className={roleText}>{education.degree}</span>
            <span className={companyText}> — {education.school}</span>
            <p className={descText}>{education.concentration}</p>
          </div>
        </div>
      </div>

      <div className={section}>
        <span className={sectionLabel}>Capabilities</span>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <span className={capItem} key={i}>{cap}</span>
          ))}
        </div>
      </div>

      <div className={section}>
        <span className={sectionLabel}>Personal</span>
        <div className={personalBlock}>
          <span className={personalLabel}>Holes in One</span>
          {personal.holesInOne}

          <span className={personalLabel}>Sport</span>
          {personal.sport}

          <span className={personalLabel}>Teams</span>
          {personal.teams.join(', ')}

          <span className={personalLabel}>Current Focus</span>
          {personal.currentFocus}
        </div>
      </div>

      <div style={{ marginTop: '96px', borderTop: '1px solid', borderColor: 'var(--colors-border)', paddingTop: '16px' }}>
        <a href="/archive" className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', letterSpacing: '0.06em', textDecoration: 'none', _hover: { color: 'accent' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' } })}>Archive</a>
      </div>
    </main>
  )
}