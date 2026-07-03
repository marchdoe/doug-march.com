import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  maxWidth: '860px',
  margin: '0 auto',
  padding: '96px 8vw 64px',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
  lineHeight: '0.95',
  letterSpacing: '-0.01em',
  color: 'text',
  textTransform: 'uppercase',
  marginBottom: '32px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '18px',
  lineHeight: '1.6',
  color: 'text.secondary',
  maxWidth: '60ch',
  marginBottom: '64px',
})

const sectionTitle = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'text.muted',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '16px',
  marginBottom: '24px',
  alignItems: 'baseline',
})

const yearCol = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'text.muted',
  letterSpacing: '0.02em',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const roleText = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.5',
})

const companyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text.secondary',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: 'text.muted',
  lineHeight: '1.5',
  marginTop: '4px',
  maxWidth: '55ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '64px',
})

const capTag = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'text.secondary',
  letterSpacing: '0.02em',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0',
})

const personalItem = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text.secondary',
  lineHeight: '1.6',
  marginBottom: '8px',
})

const personalLabel = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'text.muted',
  marginRight: '12px',
})

function AboutPage() {
  return (
    <div className={page}>
      <h1 className={heading}>{identity.name}</h1>
      <p className={css({ fontFamily: 'body', fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.muted', marginBottom: '16px' })}>
        {identity.role}
      </p>
      <p className={statement}>{identity.statement}</p>

      <div className={css({ marginBottom: '64px' })}>
        <h2 className={sectionTitle}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCol}>{entry.year}</span>
            <div>
              <span className={roleText}>{entry.role}</span>
              <span className={companyText}> — {entry.company}</span>
              <p className={descText}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={css({ marginBottom: '64px' })}>
        <h2 className={sectionTitle}>Education</h2>
        <div className={timelineRow}>
          <span className={yearCol}>{education.years}</span>
          <div>
            <span className={roleText}>{education.degree}</span>
            <span className={companyText}> — {education.school}</span>
            <p className={descText}>{education.concentration}</p>
          </div>
        </div>
      </div>

      <div className={css({ marginBottom: '64px' })}>
        <h2 className={sectionTitle}>Capabilities</h2>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capTag}>{cap}</span>
          ))}
        </div>
      </div>

      <div className={css({ marginBottom: '64px' })}>
        <h2 className={sectionTitle}>Personal</h2>
        <div className={personalItem}>
          <span className={personalLabel}>Holes in one</span>
          {personal.holesInOne}
        </div>
        <div className={personalItem}>
          <span className={personalLabel}>Sport</span>
          {personal.sport}
        </div>
        <div className={personalItem}>
          <span className={personalLabel}>Teams</span>
          {personal.teams.join(', ')}
        </div>
        <div className={personalItem}>
          <span className={personalLabel}>Current focus</span>
          {personal.currentFocus}
        </div>
      </div>

      <footer className={css({ borderTop: '1px solid', borderColor: 'border', paddingTop: '16px', marginTop: '32px' })}>
        <a href="/archive" className={css({ fontFamily: 'mono', fontSize: '13px', color: 'text.muted', letterSpacing: '0.05em', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline', opacity: '1' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </div>
  )
}