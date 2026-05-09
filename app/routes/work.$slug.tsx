import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const page = css({
  padding: '48px 5vw 64px 6vw',
  maxWidth: '960px',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '40px',
  padding: '8px 0',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const title = css({
  fontFamily: 'display',
  fontSize: 'clamp(40px, 7vw, 80px)',
  lineHeight: '0.92',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'text',
  marginBottom: '12px',
})

const meta = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  letterSpacing: '0.08em',
  marginBottom: '48px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
  marginTop: '40px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  color: 'textMuted',
  padding: '4px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
})

const externalLink = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'medium',
  color: 'accent',
  padding: '12px 24px',
  border: '1px solid',
  borderColor: 'accent',
  borderRadius: '0px',
  textDecoration: 'none',
  marginTop: '40px',
  _hover: { background: 'accent', color: 'bg' },
  _focus: { outline: '2px solid', outlineColor: 'accentLight', outlineOffset: '2px' },
})

const footerBar = css({
  marginTop: '80px',
  paddingTop: '24px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '24px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={page}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={title}>Not Found</h1>
        <p className={bodyText}>This project doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className={page}>
      <a href="/" className={backLink}>← Back</a>
      <h1 className={title}>{project.title}</h1>
      <div className={meta}>
        {project.type} · {project.year}
        {project.role && <> · {project.role}</>}
      </div>

      {project.problem && (
        <>
          <div className={sectionLabel}>Problem</div>
          <p className={bodyText}>{project.problem}</p>
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
          <div className={sectionLabel}>Description</div>
          <p className={bodyText}>{project.description}</p>
        </>
      )}

      {project.stack && project.stack.length > 0 && (
        <>
          <div className={sectionLabel}>Stack</div>
          <div className={stackList}>
            {project.stack.map((s) => (
              <span key={s} className={stackTag}>{s}</span>
            ))}
          </div>
        </>
      )}

      {(project.externalUrl || project.liveUrl) && (
        <a
          href={project.externalUrl || project.liveUrl}
          className={externalLink}
        >
          View Project ↗
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          className={externalLink}
          style={{ marginLeft: '12px' }}
        >
          GitHub ↗
        </a>
      )}

      <div className={footerBar}>
        <span className={footerText}>© Doug March</span>
        <a href="/archive" className={footerText} style={{ textDecoration: 'none' }}>Archive</a>
      </div>
    </div>
  )
}