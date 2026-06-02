import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageStyle = css({
  width: '100vw',
  maxWidth: 'none',
  background: 'bg',
  minHeight: '100vh',
})

const navBarStyle = css({
  padding: '52px 6vw 0',
  '@media (max-width: 768px)': {
    padding: '24px 24px 0',
  },
})

const contentStyle = css({
  padding: '96px 6vw 64px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '96px',
  '@media (max-width: 768px)': {
    padding: '48px 24px 40px',
    gridTemplateColumns: '1fr',
    gap: '48px',
  },
})

const titleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(36px, 4vw, 64px)',
  lineHeight: 'snug',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '16px',
})

const typeYearStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '32px',
})

const bodyStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '55ch',
  marginBottom: '24px',
})

const labelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
  marginTop: '32px',
})

const stackListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackTagStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textSecondary',
  padding: '6px 16px',
  background: 'bgCard',
})

const linkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 0',
  minHeight: '44px',
  _hover: {
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    textDecorationThickness: '2px',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const detailPanelStyle = css({
  background: 'bgCard',
  padding: '48px 40px',
  alignSelf: 'start',
  '@media (max-width: 768px)': {
    padding: '32px 24px',
  },
})

const detailRowStyle = css({
  marginBottom: '24px',
})

const detailLabelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '6px',
})

const detailValueStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '15px',
  lineHeight: 'normal',
  color: 'text',
})

const backLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '48px',
  minHeight: '44px',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const footerStyle = css({
  padding: '24px 6vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 768px)': {
    padding: '24px',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
  },
})

const footerTextStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textMuted',
})

const footerLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageStyle}>
        <div className={navBarStyle}><Sidebar /></div>
        <div style={{ padding: '96px 6vw' }}>
          <h1 className={titleStyle}>Project not found</h1>
          <a href="/" className={linkStyle}>← Back home</a>
        </div>
      </div>
    )
  }

  return (
    <div className={pageStyle}>
      <div className={navBarStyle}>
        <Sidebar />
      </div>

      <div style={{ padding: '48px 6vw 0' }}>
        <a href="/" className={backLinkStyle}>← Back</a>
      </div>

      <div className={contentStyle}>
        <div>
          <h1 className={titleStyle}>{project.title}</h1>
          <div className={typeYearStyle}>{project.type} · {project.year}</div>

          {project.problem && (
            <>
              <div className={labelStyle}>Problem</div>
              <p className={bodyStyle}>{project.problem}</p>
            </>
          )}

          {project.approach && (
            <>
              <div className={labelStyle}>Approach</div>
              <p className={bodyStyle}>{project.approach}</p>
            </>
          )}

          {project.outcome && (
            <>
              <div className={labelStyle}>Outcome</div>
              <p className={bodyStyle}>{project.outcome}</p>
            </>
          )}

          {project.description && (
            <p className={bodyStyle}>{project.description}</p>
          )}

          {project.stack && project.stack.length > 0 && (
            <>
              <div className={labelStyle}>Stack</div>
              <div className={stackListStyle}>
                {project.stack.map((tech, i) => (
                  <span key={i} className={stackTagStyle}>{tech}</span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={detailPanelStyle}>
          {project.role && (
            <div className={detailRowStyle}>
              <div className={detailLabelStyle}>Role</div>
              <div className={detailValueStyle}>{project.role}</div>
            </div>
          )}
          <div className={detailRowStyle}>
            <div className={detailLabelStyle}>Type</div>
            <div className={detailValueStyle}>{project.type}</div>
          </div>
          <div className={detailRowStyle}>
            <div className={detailLabelStyle}>Year</div>
            <div className={detailValueStyle}>{project.year}</div>
          </div>
          {project.externalUrl && (
            <div className={detailRowStyle}>
              <div className={detailLabelStyle}>Link</div>
              <a href={project.externalUrl} className={linkStyle}>
                Visit site →
              </a>
            </div>
          )}
          {project.liveUrl && (
            <div className={detailRowStyle}>
              <div className={detailLabelStyle}>Live</div>
              <a href={project.liveUrl} className={linkStyle}>
                View live →
              </a>
            </div>
          )}
          {project.githubUrl && (
            <div className={detailRowStyle}>
              <div className={detailLabelStyle}>Source</div>
              <a href={project.githubUrl} className={linkStyle}>
                GitHub →
              </a>
            </div>
          )}
        </div>
      </div>

      <footer className={footerStyle}>
        <span className={footerTextStyle}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </div>
  )
}