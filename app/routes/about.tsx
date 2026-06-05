import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const scrollColumn = css({
  width: '85vw',
  margin: '0 auto',
})

const heroBlock = css({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingTop: 'calc(56px + 12vh)',
  paddingBottom: '80px',
})

const nameDisplay = css({
  fontFamily: 'display',
  fontWeight: 900,
  fontSize: 'clamp(40px, 5.5vw, 80px)',
  lineHeight: '0.92',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '12px',
})

const roleDisplay = css({
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
  marginBottom: '40px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.8vw, 20px)',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const sectionWrap = css({
  padding: '80px 0',
  borderTop: '1px solid',
  borderColor: 'border',
})

const sectionHeading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(24px, 3vw, 44px)',
  lineHeight: '1.0',
  letterSpacing: '-0.02em',
  color: 'text',
  marginBottom: '48px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  padding: '20px 0',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',
  '&:first-of-type': {
    borderTop: 'none',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
  flexShrink: 0,
})

const roleCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const roleName = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '18px',
  letterSpacing: '-0.01em',
  color: 'text',
  lineHeight: '1.2',
})

const companyName = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  lineHeight: '1.3',
})

const roleDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'textSecondary',
  marginTop: '4px',
  maxWidth: '60ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textSecondary',
  padding: '8px 16px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
  lineHeight: '1.3',
})

const eduBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const eduTitle = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '18px',
  color: 'text',
  lineHeight: '1.2',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.4',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '32px',
})

const personalItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.4',
})

const footerBar = css({
  padding: '32px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.06em',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.06em',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function AboutPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className={heroBlock}>
        <div className={scrollColumn}>
          <h1 className={nameDisplay}>{identity.name}</h1>
          <p className={roleDisplay}>{identity.role}</p>
          <p className={statement}>{identity.statement}</p>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className={sectionWrap}>
        <div className={scrollColumn}>
          <h2 className={sectionHeading}>Experience</h2>
          <div>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRow}>
                <span className={yearCol}>{entry.year}</span>
                <div className={roleCol}>
                  <span className={roleName}>{entry.role}</span>
                  <span className={companyName}>{entry.company}</span>
                  <p className={roleDesc}>{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className={sectionWrap}>
        <div className={scrollColumn}>
          <h2 className={sectionHeading}>Capabilities</h2>
          <div className={capGrid}>
            {capabilities.map((cap) => (
              <span key={cap} className={capTag}>{cap}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section className={sectionWrap}>
        <div className={scrollColumn}>
          <h2 className={sectionHeading}>Education</h2>
          <div className={eduBlock}>
            <span className={eduTitle}>{education.school}</span>
            <span className={eduDetail}>{education.degree} — {education.concentration}</span>
            <span className={eduDetail}>{education.years}</span>
          </div>
        </div>
      </section>

      {/* ═══ PERSONAL ═══ */}
      <section className={sectionWrap}>
        <div className={scrollColumn}>
          <h2 className={sectionHeading}>Personal</h2>
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
              <span className={personalValue}>{personal.teams.join(', ')}</span>
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Current Focus</span>
              <span className={personalValue}>{personal.currentFocus}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className={scrollColumn}>
          <div className={footerBar}>
            <span className={footerText}>{identity.name} · {identity.role}</span>
            <a href="/archive" className={archiveLink}>Archive</a>
          </div>
        </div>
      </footer>
    </div>
  )
}