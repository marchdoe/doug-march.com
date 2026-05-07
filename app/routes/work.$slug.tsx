import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '../components/Sidebar'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const splitGrid = css({
  display: 'grid',
  gridTemplateColumns: '50fr 50fr',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const leftPanel = css({
  background: '{colors.neutral.900}',
  padding: '0 6vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'sticky',
  top: 0,
  '@media (max-width: 768px)': {
    position: 'relative',
    minHeight: 'auto',
    padding: '32px 6vw',
  },
})

const rightPanel = css({
  background: '{colors.neutral.800}',
  borderLeft: '1px solid',
  borderColor: 'border',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    borderLeft: 'none',
    borderTop: '1px solid',
    minHeight: 'auto',
  },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 120px)',
  fontWeight: '800',
  lineHeight: '0.92',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '20px',
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
})

const projectYear = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  fontVariantNumeric: 'tabular-nums',
})

const contentArea = css({
  padding: '24px 32px',
  flex: 1,
  overflowY: 'auto',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '12px',
  marginTop: '28px',
})

const firstSection = css({
  marginTop: '0',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '15px',
  lineHeight: '1.65',
  color: '{colors.neutral.300}',
  maxWidth: '55ch',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackPill = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: '0.05em',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 0',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'accentGlow',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const footerBar = css({
  padding: '0 32px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '48px',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: '{colors.neutral.600}',
  textDecoration: 'none',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const notFound = css({
  fontFamily: 'body',
  fontSize: '18px',
  color: 'textSecondary',
  padding: '64px 32px',
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={splitGrid}>
        <div className={leftPanel}>
          <div className={projectTitle}>404</div>
        </div>
        <div className={rightPanel}>
          <Sidebar />
          <div className={notFound}>
            Project not found. <a href="/" className={css({ color: 'accent' })}>Return home</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={splitGrid}>
      <div className={leftPanel}>
        <div className={projectType}>{project.type}</div>
        <div className={projectTitle}>{project.title}</div>
        <div className={projectYear}>{project.year}</div>
      </div>

      <div className={rightPanel}>
        <Sidebar />

        <div className={contentArea}>
          {project.problem && (
            <>
              <div className={`${sectionLabel} ${firstSection}`}>Problem</div>
              <p className={bodyText}>{project.problem}</p>
            </>
          )}

          {project.role && (
            <>
              <div className={sectionLabel}>Role</div>
              <p className={bodyText}>{project.role}</p>
            </>
          )}

          {project.approach && (
            <>
              <div className={sectionLabel}>Approach</div>
              <p className={bodyText}>{project.approach}</p>
            </>
          )}

          {project.outcome && (
            <>
              <div className={sectionLabel}>Outcome</div>
              <p className={bodyText}>{project.outcome}</p>
            </>
          )}

          {project.description && (
            <>
              <div className={`${sectionLabel} ${!project.problem ? firstSection : ''}`}>About</div>
              <p className={bodyText}>{project.description}</p>
            </>
          )}

          {project.stack && project.stack.length > 0 && (
            <>
              <div className={sectionLabel}>Stack</div>
              <div className={stackGrid}>
                {project.stack.map((tech, i) => (
                  <span key={i} className={stackPill}>{tech}</span>
                ))}
              </div>
            </>
          )}

          {(project.externalUrl || project.liveUrl || project.githubUrl) && (
            <>
              <div className={sectionLabel}>Links</div>
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
                {project.externalUrl && (
                  <a href={project.externalUrl} className={extLink}>
                    Visit Site →
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== project.externalUrl && (
                  <a href={project.liveUrl} className={extLink}>
                    Live →
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className={extLink}>
                    GitHub →
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        <div className={footerBar}>
          <a href="/archive" className={footerLink}>Archive</a>
          <a href="/" className={footerLink}>← Back</a>
        </div>
      </div>
    </div>
  )
}