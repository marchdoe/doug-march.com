import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const splitLayout = css({
  display: 'grid',
  gridTemplateColumns: '58fr 42fr',
  minHeight: '100vh',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const leftPanel = css({
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 6vw',
  background: 'bg',
  '@media (max-width: 767px)': {
    position: 'relative',
    height: 'auto',
    minHeight: '40vh',
    padding: '60px 24px 40px',
  },
})

const rightPanel = css({
  background: '{colors.void.100}',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 767px)': {
    minHeight: 'auto',
  },
})

const rightContent = css({
  flex: 1,
  padding: '48px 40px',
  '@media (max-width: 767px)': {
    padding: '32px 20px',
  },
})

const projectName = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 120px)',
  fontWeight: 'bold',
  letterSpacing: '-0.04em',
  lineHeight: '0.88',
  color: 'accent',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '14px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'semibold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
  marginTop: '32px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'text',
  maxWidth: '60ch',
  marginBottom: '16px',
})

const metaRow = css({
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gap: '12px',
  padding: '8px 0',
  fontFamily: 'body',
  fontSize: '14px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const metaLabel = css({
  color: 'textMuted',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

const metaValue = css({
  color: 'textSecondary',
})

const stackPill = css({
  display: 'inline-flex',
  background: '{colors.void.200}',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '9999px',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '4px 12px',
  marginRight: '6px',
  marginBottom: '6px',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  textUnderlineOffset: '3px',
  display: 'inline-block',
  padding: '12px 0',
  _hover: {
    color: 'accentHover',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  marginBottom: '32px',
  display: 'inline-block',
  padding: '8px 0',
  _hover: {
    color: 'accent',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const footerArea = css({
  padding: '24px 40px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  '@media (max-width: 767px)': {
    padding: '20px',
    flexDirection: 'column',
    gap: '8px',
  },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={splitLayout}>
        <div className={leftPanel}>
          <div className={projectName}>404</div>
        </div>
        <div className={rightPanel}>
          <Sidebar />
          <div className={rightContent}>
            <a href="/" className={backLink}>← Back</a>
            <p className={bodyText}>Project not found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={splitLayout}>
      <div className={leftPanel}>
        <div>
          <div className={projectName}>{project.title}</div>
          <div className={projectType}>{project.type} · {project.year}</div>
        </div>
      </div>

      <div className={rightPanel}>
        <Sidebar />
        <div className={rightContent}>
          <a href="/" className={backLink}>← Back to Work</a>

          {project.problem && (
            <>
              <div className={sectionLabel}>Problem</div>
              <p className={bodyText}>{project.problem}</p>
            </>
          )}

          {project.role && (
            <div className={metaRow}>
              <span className={metaLabel}>Role</span>
              <span className={metaValue}>{project.role}</span>
            </div>
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
              <div className={css({ marginBottom: '24px' })}>
                {project.stack.map((tech) => (
                  <span key={tech} className={stackPill}>{tech}</span>
                ))}
              </div>
            </>
          )}

          <div className={css({ marginTop: '32px', display: 'flex', gap: '24px', flexWrap: 'wrap' })}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={extLink}>
                Visit Site →
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className={extLink}>
                Live →
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={extLink}>
                Github →
              </a>
            )}
          </div>
        </div>

        <footer className={footerArea}>
          <span>© Doug March</span>
          <a href="/archive" className={css({ color: 'textMuted', textDecoration: 'none', _hover: { color: 'textSecondary' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
        </footer>
      </div>
    </div>
  )
}