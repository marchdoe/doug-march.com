import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const splitLayout = css({
  display: 'grid',
  gridTemplateColumns: '58fr 42fr',
  minHeight: '100vh',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const leftPanel = css({
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 6vw',
  background: 'bg',
  '@media (max-width: 767px)': {
    position: 'relative',
    height: 'auto',
    minHeight: '70vh',
    padding: '60px 24px 40px',
  },
})

const rightPanel = css({
  background: '{colors.void.100}',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 767px)': {
    minHeight: 'auto',
  },
})

const rightContent = css({
  flex: 1,
  padding: '48px 40px',
  '@media (max-width: 767px)': {
    padding: '32px 20px',
  },
})

const heroLine1 = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 3.6vw, 52px)',
  fontWeight: 'bold',
  letterSpacing: '-0.04em',
  lineHeight: '0.88',
  color: 'accent',
  textTransform: 'uppercase',
  marginBottom: '8px',
})

const heroLine2 = css({
  fontFamily: 'display',
  fontSize: 'clamp(72px, 9.5vw, 136px)',
  fontWeight: 'bold',
  letterSpacing: '-0.04em',
  lineHeight: '0.88',
  color: 'accent',
  textTransform: 'uppercase',
  marginBottom: '12px',
})

const heroLine3 = css({
  fontFamily: 'display',
  fontSize: 'clamp(20px, 2.1vw, 30px)',
  fontWeight: 'normal',
  letterSpacing: '0em',
  lineHeight: '0.88',
  color: 'accent',
  fontStyle: 'italic',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  marginTop: '40px',
  lineHeight: '1.5',
})

const moonNote = css({
  position: 'absolute',
  bottom: '40px',
  left: '6vw',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  lineHeight: '1.5',
  '@media (max-width: 767px)': {
    position: 'relative',
    bottom: 'auto',
    left: 'auto',
    marginTop: '48px',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'semibold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '20px',
})

const featuredCard = css({
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
  padding: '24px',
  marginBottom: '40px',
  transition: 'background 0.18s ease',
  _hover: {
    background: '{colors.void.300}',
  },
})

const featuredTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(28px, 3vw, 40px)',
  fontWeight: 'bold',
  letterSpacing: '-0.03em',
  lineHeight: '1.1',
  color: 'text',
  marginBottom: '12px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '15px',
  lineHeight: '1.5',
  color: 'textSecondary',
  marginBottom: '16px',
  maxWidth: '55ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  textUnderlineOffset: '3px',
  display: 'inline-block',
  padding: '8px 0',
  _hover: {
    color: 'accentHover',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectRow = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  gap: '16px',
  alignItems: 'baseline',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  transition: 'background 0.18s ease',
  _hover: {
    background: '{colors.void.300}',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontWeight: 'medium',
  color: 'text',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  whiteSpace: 'nowrap',
})

const signalPill = css({
  display: 'inline-flex',
  alignItems: 'center',
  background: '{colors.void.200}',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '9999px',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '4px 12px',
  marginRight: '8px',
  marginBottom: '8px',
})

const signalSection = css({
  marginTop: '40px',
  marginBottom: '24px',
})

const footerArea = css({
  padding: '24px 40px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  '@media (max-width: 767px)': {
    padding: '20px',
    flexDirection: 'column',
    gap: '8px',
  },
})

const archiveLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'textSecondary',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const accentColor = css({
  color: 'accent',
})

const hnNote = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  marginTop: '12px',
})

const juneteenthBadge = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  marginTop: '32px',
})

function HomePage() {
  return (
    <div className={splitLayout}>
      {/* Left Panel — Declaration */}
      <div className={leftPanel}>
        <div>
          <div className={heroLine1}>The biggest</div>
          <div className={heroLine2}>Adventure</div>
          <div className={heroLine3}>is what lies ahead.</div>
          <div className={attribution}>— J.R.R. Tolkien</div>
        </div>
        <div className={moonNote}>
          ● new moon · june 13
        </div>
      </div>

      {/* Right Panel — Portfolio */}
      <div className={rightPanel}>
        <Sidebar />
        <div className={rightContent}>
          {/* Featured Project */}
          <div className={sectionLabel}>Featured</div>
          {featuredProject && (
            <div className={featuredCard}>
              <div className={featuredTitle}>{featuredProject.title}</div>
              {featuredProject.problem && (
                <p className={featuredProblem}>{featuredProject.problem}</p>
              )}
              {featuredProject.externalUrl && (
                <a href={featuredProject.externalUrl} className={featuredLink}>
                  View Project →
                </a>
              )}
            </div>
          )}

          {/* Signals */}
          <div className={signalSection}>
            <span className={signalPill}>DET 2 · HOU 3 ✗</span>
            <span className={signalPill}>
              ⛳ Ben James <span className={css({ color: 'accent', margin: '0 4px', fontWeight: 'medium' })}> −10</span> RBC Canadian Open
            </span>
          </div>

          {/* Selected Work */}
          <div className={sectionLabel}>Selected Work</div>
          <div className={css({ marginBottom: '40px' })}>
            {selectedWork.map((project) => (
              <div key={project.slug} className={projectRow}>
                <a href={`/work/${project.slug}`} className={projectTitle}>
                  {project.title}
                </a>
                <span className={projectMeta}>{project.type}</span>
                <span className={projectMeta}>{project.year}</span>
              </div>
            ))}
          </div>

          {/* Experiments */}
          <div className={sectionLabel}>Experiments</div>
          <div className={css({ marginBottom: '32px' })}>
            {experiments.map((exp) => (
              <div key={exp.slug} className={projectRow}>
                <a
                  href={exp.externalUrl || `/work/${exp.slug}`}
                  className={projectTitle}
                >
                  {exp.title}
                </a>
                <span className={projectMeta}>{exp.type}</span>
                <span className={projectMeta}>{exp.year}</span>
              </div>
            ))}
          </div>

          <div className={hnNote}>↑ 2376 · anthropic.com</div>

          <div className={juneteenthBadge}>Juneteenth · 6 days</div>
        </div>

        <footer className={footerArea}>
          <span>© Doug March · Product Designer & Developer</span>
          <a href="/archive" className={archiveLink}>Archive</a>
        </footer>
      </div>
    </div>
  )
}