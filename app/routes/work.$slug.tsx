import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const page = css({
  minHeight: '100vh',
  paddingLeft: '4vw',
  paddingRight: '4vw',
  paddingTop: '96px',
  paddingBottom: '128px',
})

const title = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 10vw, 148px)',
  lineHeight: '0.85',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'text',
  marginBottom: '48px',
})

const metaRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  paddingTop: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const metaLabel = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  paddingTop: '3px',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const linkStyle = css({
  fontFamily: 'mono',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: '0.06em',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  _hover: {
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackItem = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.06em',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
})

const backLink = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  marginBottom: '48px',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className={page}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={title}>404</h1>
        <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'textMuted', lineHeight: '1.6' })}>Project not found.</p>
      </main>
    )
  }

  return (
    <main className={page}>
      <a href="/" className={backLink}>← Back</a>
      <h1 className={title}>{project.title}</h1>

      <div className={metaRow}>
        <span className={metaLabel}>Type</span>
        <span className={metaValue}>{project.type}</span>
      </div>

      <div className={metaRow}>
        <span className={metaLabel}>Year</span>
        <span className={metaValue}>{project.year}</span>
      </div>

      {project.role && (
        <div className={metaRow}>
          <span className={metaLabel}>Role</span>
          <span className={metaValue}>{project.role}</span>
        </div>
      )}

      {project.problem && (
        <div className={metaRow}>
          <span className={metaLabel}>Problem</span>
          <span className={metaValue}>{project.problem}</span>
        </div>
      )}

      {project.approach && (
        <div className={metaRow}>
          <span className={metaLabel}>Approach</span>
          <span className={metaValue}>{project.approach}</span>
        </div>
      )}

      {project.outcome && (
        <div className={metaRow}>
          <span className={metaLabel}>Outcome</span>
          <span className={metaValue}>{project.outcome}</span>
        </div>
      )}

      {project.description && (
        <div className={metaRow}>
          <span className={metaLabel}>Description</span>
          <span className={metaValue}>{project.description}</span>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className={metaRow}>
          <span className={metaLabel}>Stack</span>
          <div className={stackGrid}>
            {project.stack.map((s, i) => (
              <span className={stackItem} key={i}>{s}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '48px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {project.externalUrl && (
          <a href={project.externalUrl} className={linkStyle}>Visit Site ↗</a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} className={linkStyle}>Live ↗</a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} className={linkStyle}>GitHub ↗</a>
        )}
      </div>
    </main>
  )
}