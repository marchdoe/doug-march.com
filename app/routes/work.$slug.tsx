import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const page = css({
  maxWidth: '860px',
  margin: '0 auto',
  padding: '96px 8vw 64px',
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
  lineHeight: '0.95',
  letterSpacing: '-0.01em',
  color: 'text',
  textTransform: 'uppercase',
  marginBottom: '24px',
})

const meta = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'text.muted',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  marginBottom: '48px',
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'text.muted',
  marginBottom: '12px',
  marginTop: '40px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '17px',
  lineHeight: '1.6',
  color: 'text.secondary',
  maxWidth: '60ch',
  marginBottom: '16px',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'text.secondary',
  letterSpacing: '0.02em',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
})

const linkStyle = css({
  fontFamily: 'mono',
  fontSize: '14px',
  color: 'accent',
  letterSpacing: '0.03em',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'underline',
    opacity: '1',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={page}>
        <h1 className={title}>Not Found</h1>
        <p className={bodyText}>Project not found.</p>
        <a href="/" className={linkStyle}>← Back</a>
      </div>
    )
  }

  return (
    <div className={page}>
      <h1 className={title}>{project.title}</h1>

      <div className={meta}>
        <span>{project.type}</span>
        <span>·</span>
        <span>{project.year}</span>
        {project.role && (
          <>
            <span>·</span>
            <span>{project.role}</span>
          </>
        )}
      </div>

      {project.problem && (
        <>
          <p className={sectionLabel}>Problem</p>
          <p className={bodyText}>{project.problem}</p>
        </>
      )}

      {project.approach && (
        <>
          <p className={sectionLabel}>Approach</p>
          <p className={bodyText}>{project.approach}</p>
        </>
      )}

      {project.outcome && (
        <>
          <p className={sectionLabel}>Outcome</p>
          <p className={bodyText}>{project.outcome}</p>
        </>
      )}

      {project.description && (
        <>
          <p className={sectionLabel}>Description</p>
          <p className={bodyText}>{project.description}</p>
        </>
      )}

      {project.stack && project.stack.length > 0 && (
        <>
          <p className={sectionLabel}>Stack</p>
          <div className={stackGrid}>
            {project.stack.map((s, i) => (
              <span key={i} className={stackTag}>{s}</span>
            ))}
          </div>
        </>
      )}

      <div className={css({ marginTop: '48px', display: 'flex', gap: '24px', flexWrap: 'wrap' })}>
        {project.externalUrl && (
          <a href={project.externalUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
            Visit Site ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
            Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        )}
        <a href="/" className={linkStyle}>← Back</a>
      </div>

      <footer className={css({ borderTop: '1px solid', borderColor: 'border', paddingTop: '16px', marginTop: '64px' })}>
        <a href="/archive" className={css({ fontFamily: 'mono', fontSize: '13px', color: 'text.muted', letterSpacing: '0.05em', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline', opacity: '1' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </div>
  )
}