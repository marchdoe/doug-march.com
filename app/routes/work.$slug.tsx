import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageStyle = css({
  padding: '64px 6vw 48px',
  maxWidth: 'none',
  '@media (max-width: 767px)': {
    padding: '40px 5vw 40px',
  },
})

const titleStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(40px, 5vw, 72px)',
  lineHeight: 'snug',
  color: 'text',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginBottom: '8px',
})

const metaRowStyle = css({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  marginBottom: '40px',
  flexWrap: 'wrap',
})

const metaItemStyle = css({
  fontFamily: 'mono',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const typeTagStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  color: 'accent',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '9px',
  fontWeight: 'medium',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
  marginTop: '40px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '16px',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '12px',
  fontWeight: 'normal',
  color: 'textSecondary',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: 'none',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontWeight: 'medium',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '32px',
  padding: '12px 0',
  _hover: {
    textDecoration: 'underline',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const backLinkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '32px',
  padding: '8px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const notFoundStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 4vw, 56px)',
  color: 'textMuted',
  textTransform: 'uppercase',
  padding: '96px 6vw',
})

const footerStyle = css({
  padding: '24px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  marginTop: 'auto',
})

const archiveLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
  },
  _focus: {
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
      <>
        <div className={notFoundStyle}>Project not found</div>
        <footer className={footerStyle}>
          <span>© 2026 Doug March</span>
          <a href="/archive" className={archiveLinkStyle}>Archive</a>
        </footer>
      </>
    )
  }

  return (
    <>
      <div className={pageStyle}>
        <a href="/" className={backLinkStyle}>← Back</a>

        <h1 className={titleStyle}>{project.title}</h1>

        <div className={metaRowStyle}>
          <span className={typeTagStyle}>{project.type}</span>
          <span className={metaItemStyle}>{project.year}</span>
          {project.role && <span className={metaItemStyle}>{project.role}</span>}
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
              {project.stack.map((tech, i) => (
                <span className={stackTag} key={i}>{tech}</span>
              ))}
            </div>
          </>
        )}

        {(project.externalUrl || project.liveUrl || project.githubUrl) && (
          <div>
            {project.externalUrl && (
              <a href={project.externalUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
                Visit Project ↗
              </a>
            )}
            {project.liveUrl && !project.externalUrl && (
              <a href={project.liveUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
                Live Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={css({ marginLeft: '24px' }) + ' ' + linkStyle} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>
    </>
  )
}