import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageWrap = css({
  paddingTop: '40',
  maxWidth: '720px',
})

const backLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.875rem',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  marginBottom: '32',
  _hover: { textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const titleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  lineHeight: 'snug',
  color: 'text',
  marginBottom: '8',
})

const metaRow = css({
  display: 'flex',
  gap: '16',
  flexWrap: 'wrap',
  marginBottom: '32',
})

const metaTag = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.75rem',
  color: 'textMuted',
  background: '{colors.stone.50}',
  padding: '4 12',
  borderRadius: 'full',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8',
  marginTop: '32',
})

const bodyText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '1rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '60ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8',
  marginTop: '8',
})

const stackTag = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.75rem',
  color: 'accent',
  background: '{colors.teal.50}',
  padding: '4 12',
  borderRadius: 'full',
})

const extLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.875rem',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  marginTop: '32',
  _hover: { textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.06em',
  marginTop: '64',
  paddingTop: '24',
  borderTop: '1px solid',
  borderColor: 'border',
})

const archiveLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={titleStyle}>Project not found</h1>
        <p className={bodyText}>The project you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className={pageWrap}>
      <a href="/" className={backLink}>← Back</a>

      <h1 className={titleStyle}>{project.title}</h1>

      <div className={metaRow}>
        <span className={metaTag}>{project.type}</span>
        <span className={metaTag}>{project.year}</span>
        {project.role && <span className={metaTag}>{project.role}</span>}
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
          <div className={stackList}>
            {project.stack.map((tech) => (
              <span key={tech} className={stackTag}>{tech}</span>
            ))}
          </div>
        </>
      )}

      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <div className={css({ display: 'flex', gap: '24', flexWrap: 'wrap' })}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={extLink}>Visit Project →</a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={extLink}>Live Site →</a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={extLink}>GitHub →</a>
          )}
        </div>
      )}

      <footer>
        <p className={footerText}>
          © 2026 Doug March · <a href="/archive" className={archiveLink}>Archive</a>
        </p>
      </footer>
    </div>
  )
}