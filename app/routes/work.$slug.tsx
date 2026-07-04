import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageWrap = css({
  maxWidth: 'none',
  padding: '2vw',
  '@media (max-width: 768px)': {
    padding: '16px',
  },
})

const navArea = css({
  marginBottom: '2vw',
  '@media (max-width: 768px)': {
    marginBottom: '16px',
  },
})

const projectLayout = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2vw',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
})

const heroCol = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 'clamp(20px, 3vw, 48px)',
})

const detailCol = css({
  background: 'bgCard',
  borderRadius: 'md',
  padding: 'clamp(20px, 3vw, 48px)',
  boxShadow: '0 2px 16px rgba(2, 8, 16, 0.55)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

const projectTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
  lineHeight: '0.90',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '16px',
})

const projectType = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.8125rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'accent',
  marginBottom: '8px',
})

const projectYear = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'textMuted',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '6px',
})

const sectionText = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textSecondary',
  background: 'bgSubtle',
  padding: '4px 10px',
  borderRadius: 'sm',
})

const extLink = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.875rem',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 20px',
  borderRadius: 'sm',
  border: '1px solid',
  borderColor: 'accent',
  transition: 'all 200ms ease',
  _hover: {
    background: 'accent',
    color: '{colors.neutral.900}',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '24px',
  padding: '8px 0',
  _hover: {
    color: 'accentLight',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const notFound = css({
  fontFamily: 'body',
  fontSize: '1.25rem',
  color: 'textSecondary',
  textAlign: 'center',
  padding: '96px 24px',
})

const footerArea = css({
  padding: '2vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2vw',
  '@media (max-width: 768px)': {
    padding: '16px',
    flexDirection: 'column',
    gap: '8px',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const descText = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <div className={navArea}><Sidebar /></div>
        <p className={notFound}>Project not found.</p>
      </div>
    )
  }

  return (
    <div className={pageWrap}>
      <div className={navArea}><Sidebar /></div>

      <a href="/" className={backLink}>← Back</a>

      <div className={projectLayout}>
        <div className={heroCol}>
          <p className={projectType}>{project.type}</p>
          <h1 className={projectTitle}>{project.title}</h1>
          <p className={projectYear}>{project.year}</p>
        </div>

        <div className={detailCol}>
          {project.role && (
            <div>
              <p className={sectionLabel}>Role</p>
              <p className={sectionText}>{project.role}</p>
            </div>
          )}
          {project.problem && (
            <div>
              <p className={sectionLabel}>Problem</p>
              <p className={sectionText}>{project.problem}</p>
            </div>
          )}
          {project.approach && (
            <div>
              <p className={sectionLabel}>Approach</p>
              <p className={sectionText}>{project.approach}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <p className={sectionLabel}>Outcome</p>
              <p className={sectionText}>{project.outcome}</p>
            </div>
          )}
          {project.description && (
            <div>
              <p className={sectionLabel}>Description</p>
              <p className={descText}>{project.description}</p>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div>
              <p className={sectionLabel}>Stack</p>
              <div className={stackList}>
                {project.stack.map((s) => (
                  <span key={s} className={stackTag}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {(project.externalUrl || project.liveUrl) && (
            <a
              href={project.externalUrl || project.liveUrl}
              className={extLink}
            >
              Visit Project →
            </a>
          )}
        </div>
      </div>

      <footer className={footerArea}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}