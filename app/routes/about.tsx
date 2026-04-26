import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  paddingTop: '6xl',
  maxWidth: '760px',
  margin: '0 auto',
  padding: '6xl 3xl 4xl',
  '@media (max-width: 767px)': {
    padding: '6xl md 4xl',
  },
})

const heroName = css({
  fontFamily: 'heading',
  fontSize: 'clamp(36px, 6vw, 56px)',
  fontWeight: 'normal',
  lineHeight: 'snug',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: 'sm',
})

const heroRole = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'normal',
  letterSpacing: 'wide',
  color: 'textSecondary',
  marginBottom: '2xl',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '18px',
  fontWeight: 'normal',
  lineHeight: 'loose',
  color: 'text',
  maxWidth: '600px',
  marginBottom: '6xl',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '2xl',
})

const sectionSpacer = css({
  height: '6xl',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  padding: '2xl 0',
  borderTop: '1px solid',
  borderColor: 'border',
  gap: 'md',
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
    gap: 'xs',
  },
})

const timeYear = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  letterSpacing: 'wide',
  color: 'textMuted',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const timeContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'xs',
})

const timeRole = css({
  fontFamily: 'heading',
  fontSize: '20px',
  fontWeight: 'normal',
  lineHeight: 'snug',
  color: 'text',
})

const timeCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
})

const timeDesc = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '540px',
})

const capWrap = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'sm',
})

const capPill = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  background: 'accentLight',
  color: 'accentDark',
  borderRadius: 'md',
  padding: '4px 12px',
  lineHeight: 'normal',
})

const detailRow = css({
  display: 'flex',
  gap: 'lg',
  flexWrap: 'wrap',
  padding: 'md 0',
  borderTop: '1px solid',
  borderColor: 'border',
})

const detailLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  minWidth: '140px',
})

const detailValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'text',
})

const lastBorder = css({
  borderTop: '1px solid',
  borderColor: 'border',
})

const footerArea = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2xl 0 4xl',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wide',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wide',
  color: 'textMuted',
  textDecoration: 'none',
  padding: 'xs',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

function AboutPage() {
  return (
    <main className={pageWrap}>
      <h1 className={heroName}>{identity.name}</h1>
      <p className={heroRole}>{identity.role}</p>
      <p className={statement}>{identity.statement}</p>

      <div className={sectionLabel}>Experience</div>
      <div>
        {timeline.map((entry, i) => (
          <div key={`${entry.year}-${entry.company}-${i}`} className={timelineRow}>
            <span className={timeYear}>{entry.year}</span>
            <div className={timeContent}>
              <div className={timeRole}>{entry.role}</div>
              <div className={timeCompany}>{entry.company}</div>
              <p className={timeDesc}>{entry.description}</p>
            </div>
          </div>
        ))}
        <div className={lastBorder} />
      </div>

      <div className={sectionSpacer} />

      <div className={sectionLabel}>Capabilities</div>
      <div className={capWrap}>
        {capabilities.map((cap) => (
          <span key={cap} className={capPill}>{cap}</span>
        ))}
      </div>

      <div className={sectionSpacer} />

      <div className={sectionLabel}>Education</div>
      <div>
        <div className={detailRow}>
          <span className={detailLabel}>School</span>
          <span className={detailValue}>{education.school}</span>
        </div>
        <div className={detailRow}>
          <span className={detailLabel}>Degree</span>
          <span className={detailValue}>{education.degree}</span>
        </div>
        <div className={detailRow}>
          <span className={detailLabel}>Concentration</span>
          <span className={detailValue}>{education.concentration}</span>
        </div>
        <div className={detailRow}>
          <span className={detailLabel}>Years</span>
          <span className={detailValue}>{education.years}</span>
        </div>
        <div className={lastBorder} />
      </div>

      <div className={sectionSpacer} />

      <div className={sectionLabel}>Personal</div>
      <div>
        <div className={detailRow}>
          <span className={detailLabel}>Holes in One</span>
          <span className={detailValue}>{personal.holesInOne}</span>
        </div>
        <div className={detailRow}>
          <span className={detailLabel}>Sport</span>
          <span className={detailValue}>{personal.sport}</span>
        </div>
        <div className={detailRow}>
          <span className={detailLabel}>Teams</span>
          <span className={detailValue}>{personal.teams.join(', ')}</span>
        </div>
        <div className={detailRow}>
          <span className={detailLabel}>Current Focus</span>
          <span className={detailValue}>{personal.currentFocus}</span>
        </div>
        <div className={lastBorder} />
      </div>

      <footer className={footerArea}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </main>
  )
}