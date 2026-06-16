import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const headerStyle = css({
  padding: '32px 0 20px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const titleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 3.5vw, 48px)',
  lineHeight: '1.08',
  letterSpacing: '-0.02em',
  color: 'text',
})

const metaRowStyle = css({
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  marginTop: '12px',
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const columnsStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1.4fr 0.6fr',
  },
})

const mainColStyle = css({
  padding: '20px 0',
  '@media (min-width: 768px)': {
    padding: '20px 24px 20px 0',
    borderRight: '1px solid',
    borderRightColor: 'border',
  },
})

const sideColStyle = css({
  padding: '20px 0',
  '@media (min-width: 768px)': {
    padding: '20px 24px',
  },
})

const sectionHeaderStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'accentText',
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const bodyStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'text',
  maxWidth: '65ch',
  marginBottom: '20px',
})

const sideDetailStyle = css({
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const sideLabelStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const sideValueStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
})

const stackPillStyle = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '11px',
  padding: '3px 8px',
  background: 'bgAccent',
  color: 'accentDeep',
  border: '1px solid',
  borderColor: 'accentLight',
  marginRight: '4px',
  marginBottom: '4px',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accentText',
  textDecoration: 'none',
  _hover: {
    color: 'accentDeep',
    textDecoration: 'underline',
  },
})

const backLinkStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  marginBottom: '16px',
  display: 'inline-block',
  minHeight: '44px',
  lineHeight: '44px',
  _hover: {
    color: 'accentDeep',
    textDecoration: 'underline',
  },
})

const footerStyle = css({
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  marginTop: 'auto',
})

const footerLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accentDeep',
    textDecoration: 'underline',
  },
})

const notFoundStyle = css({
  padding: '64px 0',
  fontFamily: 'display',
  fontSize: '24px',
  color: 'textSecondary',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <a href="/" className={backLinkStyle}>← Back</a>
        <div className={notFoundStyle}>Project not found.</div>
      </>
    )
  }

  return (
    <>
      <a href="/" className={backLinkStyle}>← Back to work</a>

      <section className={headerStyle}>
        <h1 className={titleStyle}>{project.title}</h1>
        <div className={metaRowStyle}>
          <span>{project.type}</span>
          <span>{project.year}</span>
          {project.role && <span>{project.role}</span>}
        </div>
      </section>

      <div className={columnsStyle}>
        <div className={mainColStyle}>
          {project.problem && (
            <>
              <h2 className={sectionHeaderStyle}>Problem</h2>
              <p className={bodyStyle}>{project.problem}</p>
            </>
          )}
          {project.approach && (
            <>
              <h2 className={sectionHeaderStyle}>Approach</h2>
              <p className={bodyStyle}>{project.approach}</p>
            </>
          )}
          {project.outcome && (
            <>
              <h2 className={sectionHeaderStyle}>Outcome</h2>
              <p className={bodyStyle}>{project.outcome}</p>
            </>
          )}
          {project.description && (
            <>
              <h2 className={sectionHeaderStyle}>Description</h2>
              <p className={bodyStyle}>{project.description}</p>
            </>
          )}
        </div>

        <div className={sideColStyle}>
          {project.stack && project.stack.length > 0 && (
            <>
              <h2 className={sectionHeaderStyle}>Stack</h2>
              <div className={css({ marginBottom: '20px' })}>
                {project.stack.map((tech) => (
                  <span key={tech} className={stackPillStyle}>{tech}</span>
                ))}
              </div>
            </>
          )}

          {project.role && (
            <div className={sideDetailStyle}>
              <div className={sideLabelStyle}>Role</div>
              <div className={sideValueStyle}>{project.role}</div>
            </div>
          )}

          <div className={sideDetailStyle}>
            <div className={sideLabelStyle}>Year</div>
            <div className={sideValueStyle}>{project.year}</div>
          </div>

          <div className={sideDetailStyle}>
            <div className={sideLabelStyle}>Type</div>
            <div className={sideValueStyle}>{project.type}</div>
          </div>

          {project.externalUrl && (
            <div className={css({ marginTop: '16px' })}>
              <a href={project.externalUrl} className={linkStyle}>
                Visit project →
              </a>
            </div>
          )}

          {project.liveUrl && (
            <div className={css({ marginTop: '8px' })}>
              <a href={project.liveUrl} className={linkStyle}>
                Live site →
              </a>
            </div>
          )}

          {project.githubUrl && (
            <div className={css({ marginTop: '8px' })}>
              <a href={project.githubUrl} className={linkStyle}>
                GitHub →
              </a>
            </div>
          )}
        </div>
      </div>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </>
  )
}