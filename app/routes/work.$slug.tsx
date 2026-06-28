import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageWrap = css({
  maxWidth: '840px',
  paddingTop: '48px',
  paddingBottom: '64px',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  marginBottom: '32px',
  _hover: { color: 'text', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2rem, 4vw, 4.5rem)',
  fontWeight: 'bold',
  lineHeight: 'snug',
  textTransform: 'uppercase',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '8px',
})

const metaRow = css({
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  marginBottom: '40px',
})

const metaTag = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const accentTag = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.5625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
  marginTop: '32px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '60ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  fontWeight: 'semibold',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textSecondary',
  background: 'bgCard',
  padding: '6px 12px',
  borderRadius: 'sm',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  marginTop: '32px',
  _hover: { opacity: 0.75 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function WorkDetail() {
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
    <div className={pageWrap}>
      <a href="/" className={backLink}>← Back</a>

      <h1 className={projectTitle}>{project.title}</h1>

      <div className={metaRow}>
        <span className={accentTag}>{project.type}</span>
        <span className={metaTag}>{project.year}</span>
        {project.role && <span className={metaTag}>{project.role}</span>}
      </div>

      {project.problem && (
        <>
          <h2 className={sectionLabel}>Problem</h2>
          <p className={bodyText}>{project.problem}</p>
        </>
      )}

      {project.approach && (
        <>
          <h2 className={sectionLabel}>Approach</h2>
          <p className={bodyText}>{project.approach}</p>
        </>
      )}

      {project.outcome && (
        <>
          <h2 className={sectionLabel}>Outcome</h2>
          <p className={bodyText}>{project.outcome}</p>
        </>
      )}

      {project.description && (
        <>
          <h2 className={sectionLabel}>About</h2>
          <p className={bodyText}>{project.description}</p>
        </>
      )}

      {project.stack && project.stack.length > 0 && (
        <>
          <h2 className={sectionLabel}>Stack</h2>
          <div className={stackList}>
            {project.stack.map((s) => (
              <span key={s} className={stackTag}>{s}</span>
            ))}
          </div>
        </>
      )}

      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <div>
          {project.liveUrl && (
            <a href={project.liveUrl} className={extLink}>
              Visit Live ↗
            </a>
          )}
          {project.externalUrl && !project.liveUrl && (
            <a href={project.externalUrl} className={extLink}>
              Visit Project ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={css({
              ...extLink,
              marginLeft: '24px',
            } as any)} style={{ marginLeft: '24px' }}>
              GitHub ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}