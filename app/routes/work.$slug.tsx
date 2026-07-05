import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const dateStamp = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '12',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '4',
})

const sectionDivider = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '12',
  marginBottom: '12',
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: '1.2',
  marginBottom: '2',
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '6',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '55ch',
  marginBottom: '6',
})

const metaRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '6px 0',
  fontFamily: 'body',
  fontSize: '0.875rem',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: {
    borderBottom: 'none',
  },
})

const metaLabel = css({
  color: 'textMuted',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
})

const metaValue = css({
  color: 'textSecondary',
  textAlign: 'right',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
  marginTop: '2',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'textSecondary',
  padding: '4px 8px',
  border: '1px solid',
  borderColor: 'border',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '4px 0',
  marginRight: '6',
  _hover: {
    color: 'accentBright',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '8',
  padding: '4px 0',
  _hover: {
    color: 'text',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const footerStyle = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '6',
  marginTop: '12',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <a href="/" className={backLink}>← Back</a>
        <h2 className={projectTitle}>Project not found</h2>
      </>
    )
  }

  return (
    <>
      <div className={dateStamp}>Sunday, July 5, 2026</div>

      <a href="/" className={backLink}>← Back to Work</a>

      <h2 className={projectTitle}>{project.title}</h2>
      <div className={projectType}>
        {project.type} · {project.year}
      </div>

      {project.problem && (
        <div className={sectionDivider}>
          <div className={sectionLabel}>Problem</div>
          <p className={bodyText}>{project.problem}</p>
        </div>
      )}

      {project.description && !project.problem && (
        <div className={sectionDivider}>
          <div className={sectionLabel}>About</div>
          <p className={bodyText}>{project.description}</p>
        </div>
      )}

      {project.role && (
        <div className={metaRow}>
          <span className={metaLabel}>Role</span>
          <span className={metaValue}>{project.role}</span>
        </div>
      )}

      {project.approach && (
        <div className={sectionDivider}>
          <div className={sectionLabel}>Approach</div>
          <p className={bodyText}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div className={sectionDivider}>
          <div className={sectionLabel}>Outcome</div>
          <p className={bodyText}>{project.outcome}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className={sectionDivider}>
          <div className={sectionLabel}>Stack</div>
          <div className={stackGrid}>
            {project.stack.map((tech, i) => (
              <span key={i} className={stackTag}>{tech}</span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <div className={sectionDivider}>
          <div className={sectionLabel}>Links</div>
          <div style={{ paddingTop: '8px' }}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={linkStyle}>
                Visit Site →
              </a>
            )}
            {project.liveUrl && !project.externalUrl && (
              <a href={project.liveUrl} className={linkStyle}>
                Live →
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={linkStyle}>
                GitHub →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={footerStyle}>
        <div className={footerText}>
          Doug March · Product Designer & Developer · <a href="/archive" style={{ color: 'inherit', textDecoration: 'none' }}>Archive</a>
        </div>
      </footer>
    </>
  )
}