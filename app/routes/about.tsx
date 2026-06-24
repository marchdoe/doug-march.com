import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageHeader = css({
  padding: '40px 5vw 28px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const pageTitle = css({
  fontFamily: 'heading',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 4vw, 56px)',
  lineHeight: '0.95',
  letterSpacing: '-0.01em',
  color: 'accent',
})

const pageSubtitle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(14px, 1.2vw, 18px)',
  color: 'textSecondary',
  marginTop: '12px',
  lineHeight: '1.55',
  maxWidth: '65ch',
})

const contentGrid = css({
  display: { base: 'flex', md: 'grid' },
  flexDirection: { base: 'column', md: 'unset' },
  gridTemplateColumns: { md: '2fr 1fr' },
  gap: '0',
  padding: '0 5vw',
})

const mainCol = css({
  padding: { base: '24px 0 32px', md: '24px 20px 32px 0' },
  borderRight: { base: 'none', md: '1px solid' },
  borderBottom: { base: '1px solid', md: 'none' },
  borderColor: 'border',
})

const sideCol = css({
  padding: { base: '24px 0 32px', md: '24px 0 32px 20px' },
})

const sectionHead = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: 'clamp(11px, 0.9vw, 13px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accentDim',
  marginBottom: '16px',
  lineHeight: '1.2',
})

const timelineRow = css({
  display: { base: 'block', sm: 'flex' },
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderStrong',
  _last: { borderBottom: 'none' },
})

const timelineYear = css({
  fontFamily: 'mono',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  minWidth: '120px',
  flexShrink: 0,
  lineHeight: '1.55',
  letterSpacing: '0.02em',
})

const timelineContent = css({
  flex: '1',
})

const timelineRole = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'clamp(13px, 0.95vw, 15px)',
  color: 'text',
  lineHeight: '1.3',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(13px, 0.95vw, 15px)',
  color: 'textSecondary',
  lineHeight: '1.3',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(12px, 0.85vw, 14px)',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginTop: '4px',
  maxWidth: '60ch',
})

const capItem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(12px, 0.85vw, 14px)',
  lineHeight: '1.55',
  color: 'textSecondary',
  padding: '3px 0',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
})

const capDot = css({
  color: '{colors.chartreuse.600}',
  fontSize: '10px',
  flexShrink: 0,
})

const personalBlock = css({
  marginTop: '24px',
  paddingTop: '16px',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const personalItem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(12px, 0.85vw, 14px)',
  color: 'textSecondary',
  lineHeight: '1.7',
})

const personalLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

function AboutPage() {
  return (
    <>
      <section className={pageHeader}>
        <h1 className={pageTitle}>{identity.name}</h1>
        <p className={css({
          fontFamily: 'body',
          fontWeight: 'semibold',
          fontSize: 'clamp(12px, 1vw, 14px)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginTop: '8px',
        })}>
          {identity.role}
        </p>
        <p className={pageSubtitle}>{identity.statement}</p>
      </section>

      <div className={contentGrid}>
        <div className={mainCol}>
          <h2 className={sectionHead}>Experience</h2>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRow}>
              <div className={timelineYear}>{entry.year}</div>
              <div className={timelineContent}>
                <span className={timelineRole}>{entry.role}</span>
                <span className={timelineCompany}> · {entry.company}</span>
                <p className={timelineDesc}>{entry.description}</p>
              </div>
            </div>
          ))}

          <h2 className={css({ marginTop: '32px' }) + ' ' + sectionHead}>
            Education
          </h2>
          <div className={timelineRow}>
            <div className={timelineYear}>{education.years}</div>
            <div className={timelineContent}>
              <span className={timelineRole}>{education.degree}</span>
              <span className={timelineCompany}> · {education.school}</span>
              <p className={timelineDesc}>{education.concentration}</p>
            </div>
          </div>
        </div>

        <div className={sideCol}>
          <h2 className={sectionHead}>Capabilities</h2>
          {capabilities.map((cap) => (
            <div key={cap} className={capItem}>
              <span className={capDot}>·</span>
              <span>{cap}</span>
            </div>
          ))}

          <div className={personalBlock}>
            <h2 className={sectionHead}>Personal</h2>
            <div className={personalItem}>
              <span className={personalLabel}>Holes in One: </span>
              {personal.holesInOne}
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Sport: </span>
              {personal.sport}
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Teams: </span>
              {personal.teams.join(', ')}
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Current Focus: </span>
              {personal.currentFocus}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}