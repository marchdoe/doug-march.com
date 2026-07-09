import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  padding: '80px 5vw 48px',
  maxWidth: '960px',
  margin: '0 auto',
  width: '100%',
})

const pageTitle = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
  lineHeight: 'tight',
  textTransform: 'uppercase',
  color: 'text',
  marginBottom: '48px',
  letterSpacing: '0.01em',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
  lineHeight: 'normal',
  color: 'textSecondary',
  marginBottom: '64px',
  maxWidth: '65ch',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '24px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  paddingBottom: '24px',
  marginBottom: '24px',
  borderBottom: '1px solid',
  borderColor: 'border',

  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  color: 'textMuted',
  letterSpacing: '0.06em',
  whiteSpace: 'nowrap',
  minWidth: '120px',
})

const roleCompany = css({
  fontFamily: 'body',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: 'snug',
})

const roleDesc = css({
  fontFamily: 'body',
  fontSize: '1rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginTop: '4px',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '64px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'text',
  border: '1px solid',
  borderColor: 'border',
  padding: '8px 16px',
})

const personalSection = css({
  marginTop: '64px',
  marginBottom: '48px',
})

const personalItem = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: 'loose',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const personalHighlight = css({
  color: 'accent',
  fontWeight: 'bold',
})

const eduBlock = css({
  marginTop: '64px',
  marginBottom: '48px',
})

function AboutPage() {
  return (
    <main className={page}>
      <h1 className={pageTitle}>{identity.name}</h1>
      <p className={statement}>{identity.statement}</p>

      <div className={css({ marginBottom: '64px' })}>
        <p className={sectionLabel}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCol}>{entry.year}</span>
            <div>
              <p className={roleCompany}>{entry.role} — {entry.company}</p>
              <p className={roleDesc}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className={sectionLabel}>Capabilities</p>
      <div className={capGrid}>
        {capabilities.map((cap, i) => (
          <span key={i} className={capTag}>{cap}</span>
        ))}
      </div>

      <div className={eduBlock}>
        <p className={sectionLabel}>Education</p>
        <div className={timelineRow}>
          <span className={yearCol}>{education.years}</span>
          <div>
            <p className={roleCompany}>{education.degree} — {education.school}</p>
            <p className={roleDesc}>{education.concentration}</p>
          </div>
        </div>
      </div>

      <div className={personalSection}>
        <p className={sectionLabel}>Personal</p>
        <p className={personalItem}>
          Holes in one: <span className={personalHighlight}>{personal.holesInOne}</span>
        </p>
        <p className={personalItem}>
          Sport: {personal.sport}
        </p>
        <p className={personalItem}>
          Teams: {personal.teams.join(', ')}
        </p>
        <p className={personalItem}>
          Current focus: {personal.currentFocus}
        </p>
      </div>

      <footer className={css({ borderTop: '1px solid', borderColor: 'border', paddingTop: '24px', paddingBottom: '24px' })}>
        <a href="/archive" className={css({ fontSize: '0.75rem', color: 'textMuted', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', _hover: { color: 'accentLight' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </main>
  )
}