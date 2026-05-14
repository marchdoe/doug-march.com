import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '0 24px',
  padding: '0 6vw',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    gap: '0',
    padding: '0 16px',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '16px',
})

const headerZone = css({
  gridColumn: '1 / 9',
  padding: '48px 0 40px 0',
  borderBottom: '2px solid',
  borderColor: 'accent',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    padding: '32px 0',
  },
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 4vw, 64px)',
  lineHeight: '1.0',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '16px',
})

const metaZone = css({
  gridColumn: '9 / 13',
  padding: '48px 0 40px 24px',
  borderLeft: '1px solid',
  borderColor: 'border',
  borderBottom: '2px solid',
  borderBottomColor: 'accent',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    borderLeft: 'none',
    paddingLeft: '0',
    paddingTop: '24px',
    borderBottom: '1px solid',
    borderBottomColor: 'border',
  },
})

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginBottom: '16px',
})

const bodyZone = css({
  gridColumn: '1 / 9',
  padding: '48px 0',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    padding: '32px 0',
  },
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '24px',
})

const stackZone = css({
  gridColumn: '9 / 13',
  padding: '48px 0 48px 24px',
  borderLeft: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    borderLeft: 'none',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '32px',
  },
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  padding: '4px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const footerBar = css({
  gridColumn: '1 / -1',
  borderTop: '1px solid',
  borderColor: 'border',
  padding: '16px 0 32px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  '@media (max-width: 767px)': {
    flexDirection: 'column',
    gap: '8px',
  },
})

const linkStyle = css({
  color: 'accent',
  textDecoration: 'none',
  fontSize: '14px',
  _hover: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '12px 0',
  display: 'inline-block',
  _hover: {
    color: 'accent',
  },
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
      <div className={pageGrid}>
        <div className={css({ gridColumn: '1 / -1', padding: '96px 0', textAlign: 'center' })}>
          <h1 className={title}>Project not found</h1>
          <a href="/" className={linkStyle}>← Return home</a>
        </div>
      </div>
    )
  }

  return (
    <div className={pageGrid}>
      {/* Header */}
      <div className={headerZone}>
        <a href="/" className={backLink}>← Back to work</a>
        <div className={eyebrow}>{project.type} · {project.year}</div>
        <h1 className={title}>{project.title}</h1>
        {project.problem && (
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: '1.55', color: 'textSecondary', maxWidth: '60ch' })}>
            {project.problem}
          </p>
        )}
      </div>

      {/* Meta sidebar */}
      <div className={metaZone}>
        {project.role && (
          <>
            <div className={metaLabel}>Role</div>
            <div className={metaValue}>{project.role}</div>
          </>
        )}
        <div className={metaLabel}>Year</div>
        <div className={metaValue}>{project.year}</div>
        <div className={metaLabel}>Type</div>
        <div className={metaValue}>{project.type}</div>
        {project.externalUrl && (
          <>
            <div className={metaLabel}>Link</div>
            <div className={metaValue}>
              <a href={project.externalUrl} className={linkStyle}>Visit site →</a>
            </div>
          </>
        )}
        {project.liveUrl && (
          <>
            <div className={metaLabel}>Live</div>
            <div className={metaValue}>
              <a href={project.liveUrl} className={linkStyle}>View live →</a>
            </div>
          </>
        )}
        {project.githubUrl && (
          <>
            <div className={metaLabel}>Source</div>
            <div className={metaValue}>
              <a href={project.githubUrl} className={linkStyle}>GitHub →</a>
            </div>
          </>
        )}
      </div>

      {/* Body content */}
      <div className={bodyZone}>
        {project.approach && (
          <>
            <div className={eyebrow}>Approach</div>
            <p className={bodyText}>{project.approach}</p>
          </>
        )}
        {project.outcome && (
          <>
            <div className={eyebrow}>Outcome</div>
            <p className={bodyText}>{project.outcome}</p>
          </>
        )}
        {project.description && (
          <>
            <div className={eyebrow}>Description</div>
            <p className={bodyText}>{project.description}</p>
          </>
        )}
      </div>

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div className={stackZone}>
          <div className={eyebrow}>Stack</div>
          {project.stack.map((tech) => (
            <div key={tech} className={stackTag}>{tech}</div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={footerBar}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={css({ color: 'textMuted', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline', textUnderlineOffset: '3px' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </div>
    </div>
  )
}