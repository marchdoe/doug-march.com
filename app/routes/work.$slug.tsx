import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '4',
})

const sectionWrap = css({
  marginBottom: '6',
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: 'snug',
  marginBottom: '2',
})

const metaRow = css({
  display: 'flex',
  gap: '4',
  flexWrap: 'wrap',
  marginBottom: '5',
})

const metaTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
  background: 'bgCard',
  padding: '4px 10px',
  borderRadius: 'sm',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '4',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'accent',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  background: 'bgCard',
  padding: '4px 8px',
  borderRadius: 'sm',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '4',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  marginBottom: '5',
})

const footerWrap = css({
  marginTop: '8',
  paddingTop: '4',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={projectTitle}>Project not found</h1>
      </>
    )
  }

  return (
    <>
      <a href="/" className={backLink}>← Back to work</a>

      <h1 className={projectTitle}>{project.title}</h1>

      <div className={metaRow}>
        <span className={metaTag}>{project.type}</span>
        <span className={metaTag}>{project.year}</span>
        {project.role && <span className={metaTag}>{project.role}</span>}
      </div>

      {project.problem && (
        <div className={sectionWrap}>
          <p className={sectionLabel}>Problem</p>
          <p className={bodyText}>{project.problem}</p>
        </div>
      )}

      {project.approach && (
        <div className={sectionWrap}>
          <p className={sectionLabel}>Approach</p>
          <p className={bodyText}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div className={sectionWrap}>
          <p className={sectionLabel}>Outcome</p>
          <p className={bodyText}>{project.outcome}</p>
        </div>
      )}

      {project.description && (
        <div className={sectionWrap}>
          <p className={sectionLabel}>Description</p>
          <p className={bodyText}>{project.description}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className={sectionWrap}>
          <p className={sectionLabel}>Stack</p>
          <div className={stackGrid}>
            {project.stack.map((s) => (
              <span key={s} className={stackTag}>{s}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
        {project.externalUrl && (
          <a href={project.externalUrl} className={extLink}>Visit Site ↗</a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} className={extLink}>Live ↗</a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} className={extLink}>GitHub ↗</a>
        )}
      </div>

      <div className={footerWrap}>
        <span className={footerText}>© 2026</span>
        <a href="/archive" className={archiveLink}>Archive</a>
      </div>
    </>
  )
}