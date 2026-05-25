import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  width: '100%',
  paddingTop: '120px',
})

const section = css({
  width: '100%',
  padding: '96px 8vw',
})

const sectionAlt = css({
  width: '100%',
  padding: '96px 8vw',
  background: 'bgSection',
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: 'accentLight',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const heroName = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(40px, 7vw, 96px)',
  lineHeight: '0.95',
  letterSpacing: '-0.025em',
  color: 'text',
  marginBottom: '24px',
})

const heroRole = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'clamp(16px, 1.5vw, 22px)',
  color: 'accent',
  marginBottom: '32px',
  letterSpacing: '0.02em',
})

const statement = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(16px, 1.3vw, 20px)',
  lineHeight: '1.65',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const timelineRow = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  gap: '8px',
  md: {
    flexDirection: 'row',
    gap: '32px',
    alignItems: 'baseline',
  },
})

const timeYear = css({
  fontFamily: 'mono',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: '0.02em',
  minWidth: '120px',
  flexShrink: 0,
  fontVariantNumeric: 'tabular-nums',
})

const timeRole = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '18px',
  lineHeight: '1.2',
  color: 'text',
  minWidth: '200px',
})

const timeCompany = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: 'accent',
  minWidth: '160px',
})

const timeDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'textSecondary',
  flex: 1,
  maxWidth: '50ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textSecondary',
  background: 'bgCard',
  borderRadius: 'full',
  padding: '8px 20px',
  letterSpacing: '0.02em',
})

const eduBlock = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'textSecondary',
})

const eduTitle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '20px',
  color: 'text',
  marginBottom: '8px',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  md: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '48px',
  },
})

const personalItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  color: 'textMuted',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

const personalValue = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '20px',
  color: 'text',
  lineHeight: '1.3',
})

const personalValueSm = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textSecondary',
  lineHeight: '1.5',
})

const footer = css({
  width: '100%',
  padding: '48px 8vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  md: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

function AboutPage() {
  return (
    <div className={pageWrap}>
      {/* Identity */}
      <section className={section}>
        <h1 className={heroName}>{identity.name}</h1>
        <p className={heroRole}>{identity.role}</p>
        <p className={statement}>{identity.statement}</p>
      </section>

      {/* Timeline */}
      <section className={sectionAlt}>
        <p className={eyebrow}>Experience</p>
        <div>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRow}>
              <span className={timeYear}>{entry.year}</span>
              <span className={timeRole}>{entry.role}</span>
              <span className={timeCompany}>{entry.company}</span>
              <span className={timeDesc}>{entry.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className={section}>
        <p className={eyebrow}>Capabilities</p>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capTag}>{cap}</span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={sectionAlt}>
        <p className={eyebrow}>Education</p>
        <div className={eduBlock}>
          <p className={eduTitle}>{education.school}</p>
          <p>{education.degree} · {education.concentration}</p>
          <p style={{ color: '#7676A4', fontSize: '14px', marginTop: '4px' }}>{education.years}</p>
        </div>
      </section>

      {/* Personal */}
      <section className={section}>
        <p className={eyebrow}>Personal</p>
        <div className={personalGrid}>
          <div className={personalItem}>
            <span className={personalLabel}>Holes in One</span>
            <span className={personalValue}>{personal.holesInOne}</span>
          </div>
          <div className={personalItem}>
            <span className={personalLabel}>Sport</span>
            <span className={personalValue}>{personal.sport}</span>
          </div>
          <div className={personalItem}>
            <span className={personalLabel}>Teams</span>
            <span className={personalValueSm}>{personal.teams.join(', ')}</span>
          </div>
          <div className={personalItem}>
            <span className={personalLabel}>Current Focus</span>
            <span className={personalValueSm}>{personal.currentFocus}</span>
          </div>
        </div>
      </section>

      <footer className={footer}>
        <span className={footerText}>© 2026 Doug March</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/archive" className={footerLink}>Archive</a>
          <a href="/" className={footerLink}>Work</a>
        </div>
      </footer>
    </div>
  )
}