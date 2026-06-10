import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const page = css({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 5vw',
  minHeight: '100vh',
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '3',
})

const title = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 120px)',
  fontWeight: '800',
  lineHeight: '0.92',
  letterSpacing: '-0.04em',
  color: 'text',
  marginBottom: '6',
})

const metaGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '6',
  padding: '6 0',
  borderTop: '1px solid',
  borderTopColor: 'border',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  marginBottom: '8',
})

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '1',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.55',
  maxWidth: '65ch',
})

const bodySection = css({
  display: 'grid',
  gridTemplateColumns: '58fr 42fr',
  columnGap: '4vw',
  paddingBottom: '12',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '3',
  marginTop: '8',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
  letterSpacing: '0.01em',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  background: '{colors.abyss.700}',
  padding: '2 3',
  borderRadius: 'sm',
  display: 'inline-block',
  marginRight: '2',
  marginBottom: '2',
})

const footer = css({
  padding: '6 0',
  borderTop: '1px solid',
  borderTopColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={page}>
        <Sidebar />
        <div className={css({ paddingTop: '16', textAlign: 'center' })}>
          <div className={title}>404</div>
          <p className={bodyText}>Project not found.</p>
          <a href="/" className={css({ color: 'accent', fontSize: '16px', marginTop: '4', display: 'inline-block' })}>
            ← Back to transmissions
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={page}>
      <Sidebar />
      <div className={css({ paddingTop: 'clamp(32px, 6vw, 96px)' })}>
        <div className={eyebrow}>{project.type} · {project.year}</div>
        <h1 className={title}>{project.title}</h1>

        {(project.role || project.problem) && (
          <div className={metaGrid}>
            {project.role && (
              <div>
                <div className={metaLabel}>Role</div>
                <div className={metaValue}>{project.role}</div>
              </div>
            )}
            {project.problem && (
              <div>
                <div className={metaLabel}>Problem</div>
                <div className={metaValue}>{project.problem}</div>
              </div>
            )}
            {project.externalUrl && (
              <div>
                <div className={metaLabel}>Link</div>
                <a
                  href={project.externalUrl}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    color: 'accent',
                    _hover: { color: 'accentLight' },
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                  })}
                >
                  Visit ↗
                </a>
              </div>
            )}
          </div>
        )}

        <div className={bodySection}>
          <div>
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
          </div>
          <div>
            {project.stack && project.stack.length > 0 && (
              <>
                <div className={sectionLabel}>Stack</div>
                <div>
                  {project.stack.map((s) => (
                    <span key={s} className={stackTag}>{s}</span>
                  ))}
                </div>
              </>
            )}
            {(project.liveUrl || project.githubUrl) && (
              <>
                <div className={sectionLabel}>Links</div>
                <div className={css({ display: 'flex', gap: '4', flexDirection: 'column' })}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className={css({
                        fontFamily: 'body',
                        fontSize: '16px',
                        color: 'accent',
                        _hover: { color: 'accentLight' },
                        _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                      })}
                    >
                      Live Site ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className={css({
                        fontFamily: 'body',
                        fontSize: '16px',
                        color: 'accent',
                        _hover: { color: 'accentLight' },
                        _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                      })}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={footer}>
        <a href="/" className={footerText}>← All transmissions</a>
        <a href="/archive" className={footerText}>Archive</a>
      </div>
    </div>
  )
}