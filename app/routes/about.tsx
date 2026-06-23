import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const fold = css({
  padding: '96px 6vw',
  width: '100%',
})

const heroFold = css({
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '96px 6vw',
  width: '100%',
})

const nameDisplay = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'accent',
  marginBottom: '16px',
})

const roleDisplay = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'clamp(16px, 1.8vw, 22px)',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  marginBottom: '32px',
})

const statement = css({
  fontFamily: 'display',
  fontWeight: 'light',
  fontSize: 'clamp(20px, 2.4vw, 34px)',
  lineHeight: '1.35',
  color: 'textSecondary',
  maxWidth: '55ch',
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  color: 'accentDark',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginBottom: '24px',
})

const divider = css({
  width: '100%',
  height: '1px',
  background: 'border',
  border: 'none',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '20px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const timelineYear = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  minWidth: '120px',
})

const timelineContent = css({})

const timelineRole = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(16px, 1.5vw, 22px)',
  lineHeight: 'snug',
  color: 'text',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textSecondary',
  marginTop: '2px',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  marginTop: '8px',
  maxWidth: '60ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px 16px',
})

const capItem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.85',
})

const capSep = css({
  color: 'textMuted',
  margin: '0 4px',
  userSelect: 'none',
})

const eduBlock = css({
  marginBottom: '16px',
})

const eduTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(16px, 1.5vw, 22px)',
  lineHeight: 'snug',
  color: 'text',
})

const eduMeta = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: 'textSecondary',
  marginTop: '4px',
})

const personalRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '12px',
  padding: '12px 0',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '2px',
  },
})

const personalLabel = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const personalValue = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: 'text',
  lineHeight: 'normal',
})

const footerWrap = css({
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '12px',
})

const footerText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  '&:hover': { color: 'textSecondary' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <div style={{ width: '100%' }}>
      {/* Identity */}
      <section className={heroFold} aria-label="Identity">
        <h1 className={nameDisplay}>{identity.name}</h1>
        <p className={roleDisplay}>{identity.role}</p>
        <p className={statement}>{identity.statement}</p>
      </section>

      <hr className={divider} />

      {/* Timeline */}
      <section className={fold} aria-label="Experience">
        <p className={eyebrow}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={timelineYear}>{entry.year}</span>
            <div className={timelineContent}>
              <div className={timelineRole}>{entry.role}</div>
              <div className={timelineCompany}>{entry.company}</div>
              <p className={timelineDesc}>{entry.description}</p>
            </div>
          </div>
        ))}
      </section>

      <hr className={divider} />

      {/* Education */}
      <section className={fold} aria-label="Education">
        <p className={eyebrow}>Education</p>
        <div className={eduBlock}>
          <div className={eduTitle}>{education.school}</div>
          <p className={eduMeta}>{education.degree} — {education.concentration}</p>
          <p className={eduMeta}>{education.years}</p>
        </div>
      </section>

      <hr className={divider} />

      {/* Capabilities */}
      <section className={fold} aria-label="Capabilities">
        <p className={eyebrow}>Capabilities</p>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <span key={i}>
              <span className={capItem}>{cap}</span>
              {i < capabilities.length - 1 && <span className={capSep}>·</span>}
            </span>
          ))}
        </div>
      </section>

      <hr className={divider} />

      {/* Personal */}
      <section className={fold} aria-label="Personal">
        <p className={eyebrow}>Personal</p>
        <div className={personalRow}>
          <span className={personalLabel}>Holes in One</span>
          <span className={personalValue}>{personal.holesInOne}</span>
        </div>
        <div className={personalRow}>
          <span className={personalLabel}>Sport</span>
          <span className={personalValue}>{personal.sport}</span>
        </div>
        <div className={personalRow}>
          <span className={personalLabel}>Teams</span>
          <span className={personalValue}>{personal.teams.join(', ')}</span>
        </div>
        <div className={personalRow}>
          <span className={personalLabel}>Current Focus</span>
          <span className={personalValue}>{personal.currentFocus}</span>
        </div>
      </section>

      <footer className={footerWrap}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}