import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const sectionLabel = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.2',
  marginBottom: '16px',
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(28px, 4vw, 48px)',
  fontWeight: 'bold',
  lineHeight: 'snug',
  color: 'text',
  marginBottom: '8px',
})

const projectMeta = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  marginBottom: '24px',
})

const sectionWrap = css({
  paddingBottom: '24px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '24px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: 'base',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '55ch',
})

const detailLabel = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  letterSpacing: '0.03em',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '4px 0',
  transition: 'color 150ms ease',
  _hover: { color: 'accentHover' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const backLink = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.05em',
  display: 'inline-block',
  marginBottom: '32px',
  padding: '4px 0',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const footerArea = css({
  marginTop: 'auto',
  paddingTop: '32px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const footerLink = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.05em',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function WorkDetail() {
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
      <a href="/" className={backLink}>← Back to work</a>

      <div className={sectionWrap}>
        <span className={sectionLabel}>{project.type} · {project.year}</span>
        <h2 className={projectTitle}>{project.title}</h2>
        <span className={projectMeta}>
          {project.role && `${project.role}`}
        </span>
      </div>

      {project.problem && (
        <div className={sectionWrap}>
          <span className={detailLabel}>Problem</span>
          <p className={bodyText}>{project.problem}</p>
        </div>
      )}

      {project.approach && (
        <div className={sectionWrap}>
          <span className={detailLabel}>Approach</span>
          <p className={bodyText}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div className={sectionWrap}>
          <span className={detailLabel}>Outcome</span>
          <p className={bodyText}>{project.outcome}</p>
        </div>
      )}

      {project.description && (
        <div className={sectionWrap}>
          <span className={detailLabel}>Description</span>
          <p className={bodyText}>{project.description}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className={sectionWrap}>
          <span className={detailLabel}>Stack</span>
          <div className={stackList}>
            {project.stack.map((s) => (
              <span className={stackTag} key={s}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <div className={sectionWrap}>
          <span className={detailLabel}>Links</span>
          <div className={css({ display: 'flex', gap: '24px', flexWrap: 'wrap' })}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={extLink}>Visit site →</a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className={extLink}>Live →</a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={extLink}>GitHub →</a>
            )}
          </div>
        </div>
      )}

      <div className={footerArea}>
        <span className={footerText}>Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </div>
    </>
  )
}