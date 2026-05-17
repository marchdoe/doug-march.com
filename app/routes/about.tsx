import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageClass = css({
  padding: '48px 6vw 96px',
  maxWidth: '1200px',
  gridRow: '2 / 4',
})

const sectionClass = css({
  marginBottom: '64px',
})

const headingClass = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 5vw, 56px)',
  fontWeight: '700',
  lineHeight: '0.88',
  letterSpacing: '-0.04em',
  color: 'text',
  marginBottom: '32px',
})

const subheadingClass = css({
  fontFamily: 'mono',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.1em',
  color: 'textDim',
  textTransform: 'uppercase',
  marginBottom: '24px',
})

const statementClass = css({
  fontFamily: 'body',
  fontSize: '18px',
  lineHeight: '1.5',
  color: 'textMuted',
  maxWidth: '65ch',
  marginBottom: '16px',
})

const roleClass = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textDim',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})

const timelineRowClass = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '8px',
  },
})

const yearClass = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textDim',
  letterSpacing: '0.05em',
  minWidth: '120px',
  flexShrink: 0,
})

const companyClass = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '600',
  color: 'text',
  marginBottom: '4px',
})

const timelineRoleClass = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  marginBottom: '8px',
})

const descClass = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: 'textMuted',
  maxWidth: '65ch',
})

const capsGridClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTagClass = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.05em',
  color: 'textMuted',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  textTransform: 'uppercase',
})

const personalGridClass = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
})

const personalItemClass = css({
  padding: '16px 0',
})

const personalLabelClass = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: 'textDim',
  textTransform: 'uppercase',
  marginBottom: '8px',
})

const personalValueClass = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.5',
})

const archiveLinkClass = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textDim',
  letterSpacing: '0.1em',
  textDecoration: 'none',
  _hover: { color: 'text' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

function AboutPage() {
  return (
    <main className={pageClass}>
      <section className={sectionClass}>
        <p className={subheadingClass}>About</p>
        <h1 className={headingClass}>{identity.name}</h1>
        <p className={roleClass}>{identity.role}</p>
        <p className={statementClass} style={{ marginTop: '24px' }}>{identity.statement}</p>
      </section>

      <section className={sectionClass}>
        <p className={subheadingClass}>Timeline</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRowClass}>
            <span className={yearClass}>{entry.year}</span>
            <div>
              <p className={companyClass}>{entry.company}</p>
              <p className={timelineRoleClass}>{entry.role}</p>
              <p className={descClass}>{entry.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={sectionClass}>
        <p className={subheadingClass}>Education</p>
        <div className={timelineRowClass}>
          <span className={yearClass}>{education.years}</span>
          <div>
            <p className={companyClass}>{education.school}</p>
            <p className={timelineRoleClass}>{education.degree}</p>
            <p className={descClass}>{education.concentration}</p>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <p className={subheadingClass}>Capabilities</p>
        <div className={capsGridClass}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capTagClass}>{cap}</span>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <p className={subheadingClass}>Personal</p>
        <div className={personalGridClass}>
          <div className={personalItemClass}>
            <p className={personalLabelClass}>Holes in One</p>
            <p className={personalValueClass}>{personal.holesInOne}</p>
          </div>
          <div className={personalItemClass}>
            <p className={personalLabelClass}>Sport</p>
            <p className={personalValueClass}>{personal.sport}</p>
          </div>
          <div className={personalItemClass}>
            <p className={personalLabelClass}>Teams</p>
            <p className={personalValueClass}>{personal.teams.join(', ')}</p>
          </div>
          <div className={personalItemClass}>
            <p className={personalLabelClass}>Current Focus</p>
            <p className={personalValueClass}>{personal.currentFocus}</p>
          </div>
        </div>
      </section>

      <footer style={{ paddingTop: '32px', borderTop: '1px solid', borderColor: 'var(--colors-void-700)' }}>
        <a href="/archive" className={archiveLinkClass}>Archive</a>
      </footer>
    </main>
  )
}