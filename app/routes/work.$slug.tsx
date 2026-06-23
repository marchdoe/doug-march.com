import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const heroFold = css({
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '96px 6vw',
  width: '100%',
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'accent',
  marginBottom: '16px',
})

const metaRow = css({
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  marginBottom: '32px',
})

const metaItem = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const divider = css({
  width: '100%',
  height: '1px',
  background: 'border',
  border: 'none',
})

const fold = css({
  padding: '96px 6vw',
  width: '100%',
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  color: 'accentDark',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginBottom: '16px',
})

const bodyText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '17px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '60ch',
  marginBottom: '32px',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackTag = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  color: 'text',
  padding: '6px 12px',
  background: 'cardBg',
  border: '1px solid',
  borderColor: 'border',
})

const extLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '12px 0',
  borderBottom: '1px solid transparent',
  transition: 'border-color 150ms ease, color 150ms ease',
  '&:hover': {
    color: 'accentBright',
    borderBottomColor: 'accentBright',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '12px 0',
  transition: 'color 150ms ease',
  '&:hover': { color: 'text' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
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
  gap: '12px',
})

const footerText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  '&:hover': { color: 'textSecondary' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={heroFold}>
        <h1 className={title}>Not Found</h1>
        <a href="/" className={backLink}>← Back to work</a>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <section className={heroFold}>
        <h1 className={title}>{project.title}</h1>
        <div className={metaRow}>
          <span className={metaItem}>{project.type}</span>
          <span className={metaItem}>{project.year}</span>
          {project.role && <span className={metaItem}>{project.role}</span>}
        </div>
        <a href="/" className={backLink}>← Back to work</a>
      </section>

      <hr className={divider} />

      <section className={fold}>
        {project.problem && (
          <>
            <p className={eyebrow}>Problem</p>
            <p className={bodyText}>{project.problem}</p>
          </>
        )}

        {project.approach && (
          <>
            <p className={eyebrow}>Approach</p>
            <p className={bodyText}>{project.approach}</p>
          </>
        )}

        {project.outcome && (
          <>
            <p className={eyebrow}>Outcome</p>
            <p className={bodyText}>{project.outcome}</p>
          </>
        )}

        {project.description && (
          <p className={bodyText}>{project.description}</p>
        )}

        {project.stack && project.stack.length > 0 && (
          <>
            <p className={eyebrow}>Stack</p>
            <div className={stackList}>
              {project.stack.map((tech) => (
                <span key={tech} className={stackTag}>{tech}</span>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: '48px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={extLink} target="_blank" rel="noopener noreferrer">
              Visit Site ↗
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={extLink} target="_blank" rel="noopener noreferrer">
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={extLink} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      </section>

      <footer className={footerWrap}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}