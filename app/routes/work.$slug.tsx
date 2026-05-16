import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageWrap = css({
  padding: '80px 6vw',
  minHeight: 'calc(100vh - 64px)',
})

const inner = css({
  width: '88vw',
  maxWidth: '88vw',
  margin: '0 auto',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  marginBottom: '48px',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
})

const meta = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  letterSpacing: 'wide',
  marginTop: '8px',
})

const sectionWrap = css({
  marginTop: '48px',
  paddingTop: '32px',
  borderTop: '1px solid',
  borderColor: 'border',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'semibold',
  color: 'accent',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  marginBottom: '12px',
})

const sectionBody = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.2vw, 18px)',
  lineHeight: 'normal',
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
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textSecondary',
  padding: '6px 12px',
  background: 'bgCard',
  borderRadius: 'sm',
})

const extLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'semibold',
  color: 'accent',
  marginTop: '32px',
  padding: '10px 0',
  minHeight: '44px',
  textDecoration: 'none',
  _hover: {
    color: 'accentDark',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

const footerWrap = css({
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

const notFound = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '24px',
  color: 'text',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <div className={inner}>
          <a href="/" className={backLink}>← Back</a>
          <p className={notFound}>Project not found.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={pageWrap}>
        <div className={inner}>
          <a href="/" className={backLink}>← Back to work</a>

          <h1 className={title}>{project.title}</h1>
          <p className={meta}>{project.type} · {project.year}{project.role ? ` · ${project.role}` : ''}</p>

          {project.problem && (
            <div className={sectionWrap}>
              <p className={sectionLabel}>Problem</p>
              <p className={sectionBody}>{project.problem}</p>
            </div>
          )}

          {project.approach && (
            <div className={sectionWrap}>
              <p className={sectionLabel}>Approach</p>
              <p className={sectionBody}>{project.approach}</p>
            </div>
          )}

          {project.outcome && (
            <div className={sectionWrap}>
              <p className={sectionLabel}>Outcome</p>
              <p className={sectionBody}>{project.outcome}</p>
            </div>
          )}

          {project.description && (
            <div className={sectionWrap}>
              <p className={sectionLabel}>Description</p>
              <p className={sectionBody}>{project.description}</p>
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div className={sectionWrap}>
              <p className={sectionLabel}>Stack</p>
              <div className={stackList}>
                {project.stack.map((tech) => (
                  <span key={tech} className={stackTag}>{tech}</span>
                ))}
              </div>
            </div>
          )}

          {(project.externalUrl || project.liveUrl || project.githubUrl) && (
            <div style={{ marginTop: '32px' }}>
              {project.externalUrl && (
                <a href={project.externalUrl} className={extLink}>
                  Visit Project →
                </a>
              )}
              {project.liveUrl && !project.externalUrl && (
                <a href={project.liveUrl} className={extLink}>
                  View Live →
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} className={extLink} style={{ marginLeft: '24px' }}>
                  GitHub →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className={footerWrap}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}