import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageStyle = css({
  padding: '96px 6vw 64px',
  minHeight: '100vh',
  maxWidth: '960px',
})

const pageTitleStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
  fontWeight: '800',
  letterSpacing: '-0.01em',
  lineHeight: '0.88',
  color: '{colors.indigo.900}',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const statementStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
  lineHeight: '1.6',
  color: '{colors.indigo.700}',
  maxWidth: '65ch',
  marginBottom: '64px',
})

const sectionTitleStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
  fontWeight: '600',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '{colors.gold.400}',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid {colors.parchment.300}',
})

const timelineRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  marginBottom: '24px',
  alignItems: 'baseline',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
    marginBottom: '20px',
  },
})

const yearStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
  fontWeight: '600',
  letterSpacing: '0.08em',
  color: '{colors.parchment.600}',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const roleCompanyStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.875rem, 1vw, 1rem)',
  lineHeight: '1.6',
  color: '{colors.indigo.900}',
})

const roleNameStyle = css({
  fontWeight: '700',
})

const companyNameStyle = css({
  color: '{colors.indigo.700}',
})

const descriptionStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
  lineHeight: '1.6',
  color: '{colors.parchment.600}',
  marginTop: '4px',
  maxWidth: '55ch',
})

const capListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px 16px',
  listStyle: 'none',
  padding: '0',
  margin: '0 0 64px 0',
})

const capItemStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.8rem, 1vw, 0.875rem)',
  lineHeight: '1.5',
  color: '{colors.indigo.700}',
  padding: '4px 0',
  '&::after': {
    content: '"·"',
    marginLeft: '16px',
    color: '{colors.parchment.400}',
  },
  '&:last-child::after': {
    content: '""',
  },
})

const sectionStyle = css({
  marginBottom: '64px',
})

const eduRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  alignItems: 'baseline',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const personalGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
})

const personalLabelStyle = css({
  fontFamily: 'heading',
  fontSize: '0.75rem',
  fontWeight: '600',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '{colors.parchment.500}',
  marginBottom: '4px',
})

const personalValueStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.875rem, 1vw, 1rem)',
  lineHeight: '1.5',
  color: '{colors.indigo.900}',
})

const footerStyle = css({
  marginTop: '96px',
  paddingTop: '24px',
  borderTop: '1px solid {colors.parchment.300}',
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: '{colors.parchment.500}',
})

const archiveLinkStyle = css({
  color: '{colors.parchment.500}',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'underline',
    color: '{colors.parchment.700}',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.gold.400}',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <main className={pageStyle}>
      <h1 className={pageTitleStyle}>About</h1>

      <p className={statementStyle}>{identity.statement}</p>

      <section className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRowStyle}>
            <span className={yearStyle}>{entry.year}</span>
            <div>
              <div className={roleCompanyStyle}>
                <span className={roleNameStyle}>{entry.role}</span>
                {' — '}
                <span className={companyNameStyle}>{entry.company}</span>
              </div>
              <p className={descriptionStyle}>{entry.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Education</h2>
        <div className={eduRowStyle}>
          <span className={yearStyle}>{education.years}</span>
          <div>
            <div className={roleCompanyStyle}>
              <span className={roleNameStyle}>{education.degree}</span>
              {' — '}
              <span className={companyNameStyle}>{education.school}</span>
            </div>
            <p className={descriptionStyle}>{education.concentration}</p>
          </div>
        </div>
      </section>

      <section className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Capabilities</h2>
        <ul className={capListStyle}>
          {capabilities.map((cap, i) => (
            <li key={i} className={capItemStyle}>{cap}</li>
          ))}
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Personal</h2>
        <div className={personalGridStyle}>
          <div>
            <div className={personalLabelStyle}>Holes in One</div>
            <div className={personalValueStyle}>{personal.holesInOne}</div>
          </div>
          <div>
            <div className={personalLabelStyle}>Sport</div>
            <div className={personalValueStyle}>{personal.sport}</div>
          </div>
          <div>
            <div className={personalLabelStyle}>Teams</div>
            <div className={personalValueStyle}>{personal.teams.join(', ')}</div>
          </div>
          <div>
            <div className={personalLabelStyle}>Current Focus</div>
            <div className={personalValueStyle}>{personal.currentFocus}</div>
          </div>
        </div>
      </section>

      <footer className={footerStyle}>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>
    </main>
  )
}