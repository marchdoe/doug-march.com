import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  paddingTop: '40',
  maxWidth: '720px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16',
  marginTop: '48',
})

const nameHeading = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  lineHeight: 'snug',
  color: 'text',
  marginBottom: '8',
})

const roleText = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '1.125rem',
  color: 'accent',
  marginBottom: '24',
})

const statement = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '1rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '60ch',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16',
  padding: '12 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: { borderBottom: 'none' },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.875rem',
  color: 'textMuted',
  minWidth: '120px',
  flexShrink: '0',
})

const entryWrap = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

const entryRole = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '1rem',
  color: 'text',
})

const entryCompany = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '0.875rem',
  color: 'accent',
})

const entryDesc = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '0.875rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '55ch',
})

const capsList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8',
})

const capTag = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.75rem',
  color: 'accent',
  background: '{colors.teal.50}',
  padding: '4 12',
  borderRadius: 'full',
  letterSpacing: '0.02em',
})

const personalItem = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  marginBottom: '8',
})

const personalLabel = css({
  fontWeight: 'semibold',
  color: 'text',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.06em',
  marginTop: '64',
  paddingTop: '24',
  borderTop: '1px solid',
  borderColor: 'border',
})

const archiveLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

function AboutPage() {
  return (
    <div className={pageWrap}>
      {/* Identity */}
      <section>
        <h1 className={nameHeading}>{identity.name}</h1>
        <p className={roleText}>{identity.role}</p>
        <p className={statement}>{identity.statement}</p>
      </section>

      {/* Timeline */}
      <section>
        <p className={sectionLabel}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCol}>{entry.year}</span>
            <div className={entryWrap}>
              <span className={entryRole}>{entry.role}</span>
              <span className={entryCompany}>{entry.company}</span>
              <p className={entryDesc}>{entry.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <p className={sectionLabel}>Education</p>
        <div className={timelineRow}>
          <span className={yearCol}>{education.years}</span>
          <div className={entryWrap}>
            <span className={entryRole}>{education.degree}</span>
            <span className={entryCompany}>{education.school}</span>
            <p className={entryDesc}>{education.concentration}</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section>
        <p className={sectionLabel}>Capabilities</p>
        <div className={capsList}>
          {capabilities.map((cap) => (
            <span key={cap} className={capTag}>{cap}</span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section>
        <p className={sectionLabel}>Personal</p>
        <p className={personalItem}>
          <span className={personalLabel}>Holes in One: </span>{personal.holesInOne}
        </p>
        <p className={personalItem}>
          <span className={personalLabel}>Sport: </span>{personal.sport}
        </p>
        <p className={personalItem}>
          <span className={personalLabel}>Teams: </span>{personal.teams.join(', ')}
        </p>
        <p className={personalItem}>
          <span className={personalLabel}>Current Focus: </span>{personal.currentFocus}
        </p>
      </section>

      <footer>
        <p className={footerText}>
          © 2026 Doug March · <a href="/archive" className={archiveLink}>Archive</a>
        </p>
      </footer>
    </div>
  )
}