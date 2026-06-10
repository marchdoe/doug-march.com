import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 5vw',
  minHeight: '100vh',
})

const topGrid = css({
  display: 'grid',
  gridTemplateColumns: '58fr 42fr',
  columnGap: '4vw',
  paddingBottom: '16',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '6',
})

const statementText = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 5vw, 64px)',
  fontWeight: '700',
  lineHeight: '1.0',
  letterSpacing: '-0.02em',
  color: 'text',
  maxWidth: '65ch',
})

const sectionBlock = css({
  background: 'bgCard',
  padding: 'clamp(24px, 3vw, 48px)',
  borderTop: '1px solid',
  borderTopColor: 'border',
  marginBottom: '1px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '4',
  padding: '4 0',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  '&:last-child': {
    borderBottom: 'none',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '1',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
  letterSpacing: '0.02em',
})

const roleText = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '500',
  color: 'text',
  lineHeight: '1.55',
})

const companyText = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  marginTop: '1',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginTop: '2',
  maxWidth: '65ch',
  letterSpacing: '0.01em',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  background: '{colors.abyss.700}',
  padding: '2 3',
  borderRadius: 'sm',
  letterSpacing: '0.02em',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '6',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '1',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.55',
})

const footer = css({
  padding: '6 0',
  borderTop: '1px solid',
  borderTopColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

function AboutPage() {
  return (
    <div className={page}>
      <Sidebar />
      <div className={topGrid}>
        <div className={css({ paddingTop: 'clamp(32px, 6vw, 96px)', paddingBottom: '12' })}>
          <div className={eyebrow}>{identity.name} · {identity.role}</div>
          <div className={statementText}>{identity.statement}</div>
        </div>
        <div className={css({
          paddingTop: 'clamp(32px, 6vw, 96px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '12',
          '@media (max-width: 768px)': {
            paddingTop: '0',
            paddingBottom: '8',
          },
        })}>
          <div className={eyebrow}>Capabilities</div>
          <div className={capGrid}>
            {capabilities.map((c) => (
              <span key={c} className={capTag}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div id="timeline" className={sectionBlock}>
        <div className={eyebrow}>Timeline</div>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <div className={yearCol}>{entry.year}</div>
            <div>
              <div className={roleText}>{entry.role}</div>
              <div className={companyText}>{entry.company}</div>
              <div className={descText}>{entry.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={sectionBlock}>
        <div className={eyebrow}>Education</div>
        <div className={timelineRow}>
          <div className={yearCol}>{education.years}</div>
          <div>
            <div className={roleText}>{education.degree}</div>
            <div className={companyText}>{education.school}</div>
            <div className={descText}>{education.concentration}</div>
          </div>
        </div>
      </div>

      {/* Personal */}
      <div className={sectionBlock}>
        <div className={eyebrow}>Personal</div>
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
            <div className={personalValue}>{personal.teams.join(', ')}</div>
          </div>
          <div>
            <div className={personalLabel}>Current Focus</div>
            <div className={personalValue}>{personal.currentFocus}</div>
          </div>
        </div>
      </div>

      <div className={footer}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerText}>Archive</a>
      </div>
    </div>
  )
}