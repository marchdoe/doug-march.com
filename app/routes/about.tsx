import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageStyles = css({
  padding: '48px 6vw 80px',
  gridRow: '2 / 4',
  maxWidth: '900px',
})

const sectionTitleStyles = css({
  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  fontWeight: '800',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  color: 'text',
  fontFamily: 'display',
  marginBottom: '32px',
  textTransform: 'uppercase',
})

const statementStyles = css({
  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
  fontWeight: '400',
  lineHeight: '1.55',
  color: 'text',
  fontFamily: 'body',
  maxWidth: '65ch',
  marginBottom: '64px',
})

const roleStyles = css({
  fontSize: '0.875rem',
  fontWeight: '500',
  letterSpacing: '0.08em',
  color: 'textMuted',
  fontFamily: 'body',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const sectionSpacerStyles = css({
  marginBottom: '64px',
})

const timelineRowStyles = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
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

const timelineYearStyles = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'textSecondary',
  fontFamily: 'body',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
  lineHeight: '1.55',
})

const timelineContentStyles = css({
  lineHeight: '1.55',
  fontFamily: 'body',
})

const timelineRoleStyles = css({
  fontSize: '1rem',
  fontWeight: '600',
  color: 'text',
  marginBottom: '2px',
})

const timelineCompanyStyles = css({
  fontSize: '0.875rem',
  fontWeight: '400',
  color: 'textSecondary',
  marginBottom: '4px',
})

const timelineDescStyles = css({
  fontSize: '0.875rem',
  fontWeight: '400',
  color: 'textMuted',
  maxWidth: '55ch',
})

const capListStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  listStyle: 'none',
  padding: '0',
  margin: '0',
})

const capItemStyles = css({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: 'textSecondary',
  fontFamily: 'body',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  padding: '8px 16px',
  border: '1px solid',
  borderColor: 'border',
  lineHeight: '1.4',
})

const personalGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
})

const personalItemStyles = css({
  fontFamily: 'body',
})

const personalLabelStyles = css({
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
  lineHeight: '1.4',
})

const personalValueStyles = css({
  fontSize: '1rem',
  fontWeight: '400',
  color: 'text',
  lineHeight: '1.55',
})

const eduStyles = css({
  fontFamily: 'body',
  marginBottom: '64px',
})

const eduSchoolStyles = css({
  fontSize: '1rem',
  fontWeight: '600',
  color: 'text',
  lineHeight: '1.55',
})

const eduDetailStyles = css({
  fontSize: '0.875rem',
  fontWeight: '400',
  color: 'textSecondary',
  lineHeight: '1.55',
})

function AboutPage() {
  return (
    <main className={pageStyles}>
      <p className={roleStyles}>{identity.role}</p>
      <h1 className={sectionTitleStyles}>{identity.name}</h1>
      <p className={statementStyles}>{identity.statement}</p>

      <section className={sectionSpacerStyles}>
        <h2 className={sectionTitleStyles}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRowStyles}>
            <span className={timelineYearStyles}>{entry.year}</span>
            <div className={timelineContentStyles}>
              <div className={timelineRoleStyles}>{entry.role}</div>
              <div className={timelineCompanyStyles}>{entry.company}</div>
              <div className={timelineDescStyles}>{entry.description}</div>
            </div>
          </div>
        ))}
      </section>

      <section className={sectionSpacerStyles}>
        <h2 className={sectionTitleStyles}>Education</h2>
        <div className={eduStyles}>
          <div className={eduSchoolStyles}>{education.school}</div>
          <div className={eduDetailStyles}>{education.degree} — {education.concentration}</div>
          <div className={eduDetailStyles}>{education.years}</div>
        </div>
      </section>

      <section className={sectionSpacerStyles}>
        <h2 className={sectionTitleStyles}>Capabilities</h2>
        <ul className={capListStyles}>
          {capabilities.map((cap, i) => (
            <li key={i} className={capItemStyles}>{cap}</li>
          ))}
        </ul>
      </section>

      <section className={sectionSpacerStyles}>
        <h2 className={sectionTitleStyles}>Personal</h2>
        <div className={personalGridStyles}>
          <div className={personalItemStyles}>
            <div className={personalLabelStyles}>Holes in One</div>
            <div className={personalValueStyles}>{personal.holesInOne}</div>
          </div>
          <div className={personalItemStyles}>
            <div className={personalLabelStyles}>Sport</div>
            <div className={personalValueStyles}>{personal.sport}</div>
          </div>
          <div className={personalItemStyles}>
            <div className={personalLabelStyles}>Teams</div>
            <div className={personalValueStyles}>{personal.teams.join(', ')}</div>
          </div>
          <div className={personalItemStyles}>
            <div className={personalLabelStyles}>Current Focus</div>
            <div className={personalValueStyles}>{personal.currentFocus}</div>
          </div>
        </div>
      </section>
    </main>
  )
}