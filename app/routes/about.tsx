import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageBand = css({
  width: '100%',
  padding: '80px 6vw',
  '@media (max-width: 768px)': {
    padding: '48px 6vw',
  },
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
  textTransform: 'uppercase',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '32px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '1.125rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  maxWidth: '65ch',
  marginBottom: '64px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.65rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '24px',
  marginBottom: '24px',
  paddingBottom: '24px',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const timelineYear = css({
  fontFamily: 'mono',
  fontSize: '0.8rem',
  color: 'textDim',
  letterSpacing: 'wide',
  minWidth: '140px',
  flexShrink: 0,
})

const timelineRole = css({
  fontFamily: 'body',
  fontSize: '1rem',
  color: 'text',
  fontWeight: 'medium',
  lineHeight: 'snug',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'accentLight',
  marginBottom: '4px',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  maxWidth: '65ch',
  marginTop: '4px',
})

const capGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '12px',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const capPill = css({
  fontFamily: 'body',
  fontSize: '0.8rem',
  color: 'textSecondary',
  padding: '8px 16px',
  borderLeft: '1px solid',
  borderColor: 'borderAccent',
})

const personalBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bgCard',
  '@media (max-width: 768px)': {
    padding: '40px 6vw',
  },
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '32px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '0.65rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '8px',
})

const personalValue = css({
  fontFamily: 'display',
  fontSize: '1.25rem',
  color: 'text',
  textTransform: 'uppercase',
  lineHeight: 'snug',
})

const personalValueSm = css({
  fontFamily: 'body',
  fontSize: '0.9rem',
  color: 'textSecondary',
  lineHeight: 'normal',
})

const eduBand = css({
  width: '100%',
  padding: '64px 6vw',
  '@media (max-width: 768px)': {
    padding: '40px 6vw',
  },
})

const footerBand = css({
  width: '100%',
  padding: '32px 6vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'borderAccent',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '10px 0',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accentLight', outlineOffset: '4px' },
})

function AboutPage() {
  return (
    <>
      <section className={pageBand}>
        <h1 className={pageTitle}>{identity.name}</h1>
        <p className={css({ fontFamily: 'body', fontSize: '0.8rem', color: 'accentLight', textTransform: 'uppercase', letterSpacing: 'wider', marginBottom: '16px' })}>
          {identity.role}
        </p>
        <p className={statement}>{identity.statement}</p>

        <div className={sectionLabel}>Experience</div>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <div className={timelineYear}>{entry.year}</div>
            <div>
              <div className={timelineRole}>{entry.role}</div>
              <div className={timelineCompany}>{entry.company}</div>
              <div className={timelineDesc}>{entry.description}</div>
            </div>
          </div>
        ))}
      </section>

      <section className={pageBand} style={{ paddingTop: 0 }}>
        <div className={sectionLabel}>Capabilities</div>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <div key={i} className={capPill}>{cap}</div>
          ))}
        </div>
      </section>

      <section className={eduBand} style={{ background: 'var(--colors-void-800)' }}>
        <div className={sectionLabel}>Education</div>
        <div className={timelineRow} style={{ borderBottom: 'none', marginBottom: 0 }}>
          <div className={timelineYear}>{education.years}</div>
          <div>
            <div className={timelineRole}>{education.degree}</div>
            <div className={timelineCompany}>{education.school}</div>
            <div className={timelineDesc}>{education.concentration}</div>
          </div>
        </div>
      </section>

      <section className={personalBand}>
        <div className={sectionLabel}>Personal</div>
        <div className={personalGrid}>
          <div>
            <div className={personalLabel}>Holes in One</div>
            <div className={personalValue}>{personal.holesInOne}</div>
          </div>
          <div>
            <div className={personalLabel}>Sport</div>
            <div className={personalValue}>{personal.sport}</div>
          </div>
          <div>
            <div className={personalLabel}>Teams</div>
            <div className={personalValueSm}>
              {personal.teams.join(', ')}
            </div>
          </div>
          <div>
            <div className={personalLabel}>Current Focus</div>
            <div className={personalValueSm}>{personal.currentFocus}</div>
          </div>
        </div>
      </section>

      <footer className={footerBand}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}