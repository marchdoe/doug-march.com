import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { capabilities } from '../content/timeline'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

const heroSection = css({
  padding: '40px 5vw 28px',
  borderBottom: '1px solid',
  borderColor: 'border',
  minHeight: { base: 'auto', md: '22vh' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const heroText = css({
  fontFamily: 'heading',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 5vw, 78px)',
  lineHeight: '0.95',
  letterSpacing: '-0.01em',
  color: 'accent',
  maxWidth: '1200px',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'heading',
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: 'clamp(13px, 1vw, 16px)',
  color: '{colors.ink.300}',
  marginTop: '16px',
})

const columnGrid = css({
  display: { base: 'flex', md: 'grid' },
  flexDirection: { base: 'column', md: 'unset' },
  gridTemplateColumns: { md: '2.2fr 1fr 1fr' },
  gap: '0',
  padding: '0 5vw',
})

const column = css({
  padding: { base: '24px 0 32px', md: '24px 20px 32px' },
  borderBottom: { base: '1px solid', md: 'none' },
  borderRight: { base: 'none', md: '1px solid' },
  borderColor: 'border',
  _last: { borderRight: 'none', borderBottom: 'none' },
  _first: { paddingLeft: { md: '0' } },
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

const projectCard = css({
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderStrong',
  transition: 'background 0.15s ease',
  _last: { borderBottom: 'none' },
})

const projectTitle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'clamp(14px, 1vw, 16px)',
  color: 'text',
  textDecoration: 'none',
  lineHeight: '1.3',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  display: 'inline-block',
  padding: '4px 0',
  minHeight: '44px',
})

const projectMeta = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'clamp(10px, 0.7vw, 11px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '{colors.chartreuse.600}',
  marginTop: '2px',
  lineHeight: '1.4',
})

const projectDesc = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(13px, 0.95vw, 15px)',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginTop: '4px',
  maxWidth: '65ch',
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

const careerArc = css({
  fontFamily: 'heading',
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: 'clamp(12px, 0.85vw, 14px)',
  lineHeight: '1.55',
  color: '{colors.ink.300}',
  marginTop: '16px',
  paddingTop: '16px',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const signalItem = css({
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderStrong',
  _last: { borderBottom: 'none' },
})

const signalLabel = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(13px, 0.9vw, 14px)',
  color: 'textSecondary',
  lineHeight: '1.4',
})

const signalSub = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '10px',
  color: 'textMuted',
  marginTop: '2px',
  letterSpacing: '0.04em',
})

const signalKicker = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accentDim',
  marginTop: '16px',
  marginBottom: '4px',
  lineHeight: '1.2',
})

const hnTitle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'clamp(13px, 0.9vw, 14px)',
  color: 'accent',
  lineHeight: '1.3',
})

const hnQuote = css({
  fontFamily: 'heading',
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: 'clamp(12px, 0.85vw, 14px)',
  color: '{colors.ink.300}',
  lineHeight: '1.4',
  marginTop: '2px',
})

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
  ]

  return (
    <>
      <section className={heroSection}>
        <h1 className={heroText}>
          Who can say for sure<br />
          that one will live<br />
          to see tomorrow.
        </h1>
        <p className={attribution}>— Tibetan Proverb</p>
      </section>

      <div className={columnGrid}>
        {/* Column 1: Work */}
        <div className={column}>
          <h2 className={sectionHead}>Selected Work</h2>
          {allWork.map((project) => {
            const href = project.externalUrl || `/work/${project.slug}`
            return (
              <div key={project.slug} className={projectCard}>
                <a href={href} className={projectTitle}>
                  {project.title}
                </a>
                <div className={projectMeta}>
                  {project.type} · {project.year}
                </div>
                {project.problem && (
                  <p className={projectDesc}>{project.problem}</p>
                )}
              </div>
            )
          })}

          <h2 className={css({ ...Object.fromEntries(Object.entries(sectionHead).filter(() => true)), marginTop: '24px' })} style={{ marginTop: '24px' }}>
            <span className={sectionHead}>Experiments</span>
          </h2>
          {experiments.map((exp) => (
            <div key={exp.slug} className={projectCard}>
              <a href={exp.externalUrl || `/work/${exp.slug}`} className={projectTitle}>
                {exp.title}
              </a>
              <div className={projectMeta}>
                {exp.type} · {exp.year}
              </div>
              {exp.description && (
                <p className={projectDesc}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Column 2: Profile */}
        <div className={column}>
          <h2 className={sectionHead}>Capabilities</h2>
          {capabilities.map((cap) => (
            <div key={cap} className={capItem}>
              <span className={capDot}>·</span>
              <span>{cap}</span>
            </div>
          ))}
          <div className={careerArc}>
            Founder · Builder · AI products · 2008–present
          </div>
        </div>

        {/* Column 3: Signals */}
        <div className={column}>
          <h2 className={sectionHead}>Today's Report</h2>

          <div className={signalItem}>
            <div className={signalLabel}>Tigers · 3–4 · Loss</div>
            <div className={signalSub}>Jun 23 · Final</div>
          </div>

          <div className={signalItem}>
            <div className={signalLabel}>● Moon · Waxing Gibbous · 76%</div>
          </div>

          <div className={signalItem}>
            <div className={signalLabel}>Daylight · 14.7 hrs</div>
          </div>

          <div className={signalKicker}>On Rotation</div>
          <div className={signalItem}>
            <div className={signalLabel}>
              Guided by Voices · Wet Leg · My Morning Jacket
            </div>
          </div>

          <div className={signalKicker}>From the Wire</div>
          <div className={signalItem}>
            <div className={hnTitle}>Jerry's Map</div>
            <div className={hnQuote}>One man. One map. Fifty years.</div>
            <div className={signalSub}>Score 481</div>
          </div>

          <div className={signalItem}>
            <div className={signalLabel} style={{ color: undefined }}>
              <span className={css({ color: 'textMuted', fontSize: '12px' })}>
                Travelers Championship · Scheduled
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}