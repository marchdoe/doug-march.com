import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageWrap = css({
  padding: '0 6vw 96px',
  background: 'bg',
  minHeight: '80vh',
})

const backLink = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '24px 0 32px',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: '0.92',
  letterSpacing: '-0.01em',
  color: 'accent',
  textTransform: 'uppercase',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  paddingBottom: '16px',
})

const metaGrid = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '8px 24px',
  padding: '24px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  lineHeight: '1.5',
  maxWidth: '65ch',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textSecondary',
  lineHeight: '1.5',
  maxWidth: '65ch',
  padding: '24px 0',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '8px 0 24px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '4px 8px',
  border: '1px solid',
  borderColor: 'border',
})

const extLink = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  padding: '12px 0',
  _hover: { color: 'accentHover' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const footerStyle = css({
  padding: '32px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  background: 'bg',
})

const footerLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={projectTitle}>Not Found</h1>
        <p className={bodyText}>This project doesn't exist.</p>
      </div>
    )
  }

  return (
    <>
      <div className={pageWrap}>
        <a href="/" className={backLink}>← Back to index</a>
        <h1 className={projectTitle}>{project.title}</h1>

        <div className={metaGrid}>
          <span className={metaLabel}>Type</span>
          <span className={metaValue}>{project.type}</span>

          <span className={metaLabel}>Year</span>
          <span className={metaValue}>{project.year}</span>

          {project.role && (
            <>
              <span className={metaLabel}>Role</span>
              <span className={metaValue}>{project.role}</span>
            </>
          )}
        </div>

        {project.problem && (
          <>
            <div className={metaGrid}>
              <span className={metaLabel}>Problem</span>
              <span className={metaValue}>{project.problem}</span>
            </div>
          </>
        )}

        {project.approach && (
          <div className={metaGrid}>
            <span className={metaLabel}>Approach</span>
            <span className={metaValue}>{project.approach}</span>
          </div>
        )}

        {project.outcome && (
          <div className={metaGrid}>
            <span className={metaLabel}>Outcome</span>
            <span className={metaValue}>{project.outcome}</span>
          </div>
        )}

        {project.description && (
          <p className={bodyText}>{project.description}</p>
        )}

        {project.stack && project.stack.length > 0 && (
          <>
            <span className={metaLabel} style={{ display: 'block', paddingTop: '16px' }}>Stack</span>
            <div className={stackList}>
              {project.stack.map((tech, i) => (
                <span key={i} className={stackTag}>{tech}</span>
              ))}
            </div>
          </>
        )}

        {(project.externalUrl || project.liveUrl) && (
          <a
            href={project.externalUrl || project.liveUrl}
            className={extLink}
          >
            Visit {project.title} →
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={extLink}
            style={{ marginLeft: '24px' }}
          >
            GitHub →
          </a>
        )}
      </div>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}