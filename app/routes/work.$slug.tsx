import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const label = css({
  display: 'block',
  fontFamily: 'body',
  fontWeight: '500',
  fontSize: '2xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

const sectionHeading = css({
  fontFamily: 'body',
  fontWeight: '500',
  fontSize: '2xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  marginBottom: '16px',
  display: 'block',
})

const bodyParagraph = css({
  fontFamily: 'body',
  fontWeight: '300',
  fontSize: 'base',
  color: 'text-secondary',
  letterSpacing: 'wide',
  lineHeight: 'normal',
  maxWidth: '580px',
})

const bodySmMuted = css({
  fontFamily: 'body',
  fontWeight: '300',
  fontSize: 'sm',
  color: 'text-muted',
  letterSpacing: 'wide',
  lineHeight: 'normal',
})

const bodyXsMuted = css({
  fontFamily: 'body',
  fontWeight: '300',
  fontSize: 'xs',
  color: 'text-muted',
  letterSpacing: 'wide',
})

const backLink = css({
  fontFamily: 'body',
  fontWeight: '400',
  fontSize: 'xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 200ms ease',
  _hover: {
    color: 'text-primary',
    textDecoration: 'none',
  },
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0D0D0A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '96px 48px',
        }}
      >
        <p
          className={css({
            fontFamily: 'heading',
            fontStyle: 'italic',
            fontSize: 'lg',
            color: 'text-muted',
            letterSpacing: 'normal',
            lineHeight: 'snug',
            marginBottom: '24px',
          })}
        >
          Project not found.
        </p>
        <a href="/" className={backLink}>
          ← Back to work
        </a>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#171714' }}>

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: '70vh',
          backgroundColor: '#0D0D0A',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '96px 48px',
        }}
      >
        <div style={{ maxWidth: '740px' }}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            <span className={label}>{project.type}</span>
            <span
              className={css({
                fontFamily: 'body',
                fontWeight: '300',
                fontSize: '2xs',
                color: 'text-muted',
                letterSpacing: 'widest',
              })}
            >
              ·
            </span>
            <span className={label}>{project.year}</span>
            {project.role && (
              <>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: '2xs',
                    color: 'text-muted',
                    letterSpacing: 'widest',
                  })}
                >
                  ·
                </span>
                <span className={label}>{project.role}</span>
              </>
            )}
          </div>

          <h1
            className={css({
              fontFamily: 'heading',
              fontSize: '2xl',
              letterSpacing: 'tight',
              lineHeight: 'tight',
              color: 'text-primary',
              marginBottom: '32px',
            })}
          >
            {project.title}
          </h1>

          {project.problem && (
            <p
              className={css({
                fontFamily: 'heading',
                fontStyle: 'italic',
                fontSize: 'lg',
                color: 'text-primary',
                letterSpacing: 'normal',
                lineHeight: 'snug',
                maxWidth: '580px',
              })}
            >
              {project.problem}
            </p>
          )}
        </div>
      </section>

      {/* ── Project Body ── */}
      <section
        style={{
          padding: '96px 48px',
          backgroundColor: '#171714',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>

          {/* Approach */}
          {project.approach && (
            <div
              style={{
                paddingBottom: '64px',
                borderBottom: '1px solid #3A3933',
                marginBottom: '64px',
              }}
            >
              <span className={sectionHeading}>Approach</span>
              <p className={bodyParagraph}>{project.approach}</p>
            </div>
          )}

          {/* Outcome */}
          {project.outcome && (
            <div
              style={{
                paddingBottom: '64px',
                borderBottom: '1px solid #3A3933',
                marginBottom: '64px',
              }}
            >
              <span className={sectionHeading}>Outcome</span>
              <p className={bodyParagraph}>{project.outcome}</p>
            </div>
          )}

          {/* Stack */}
          {project.stack && project.stack.length > 0 && (
            <div
              style={{
                paddingBottom: '64px',
                borderBottom: '1px solid #3A3933',
                marginBottom: '64px',
              }}
            >
              <span className={sectionHeading}>Stack</span>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={css({
                      fontFamily: 'body',
                      fontWeight: '300',
                      fontSize: 'xs',
                      color: 'text-muted',
                      letterSpacing: 'wide',
                      border: '1px solid',
                      borderColor: 'border',
                      padding: '4px 10px',
                      borderRadius: '2px',
                    })}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.liveUrl || project.githubUrl || project.externalUrl) && (
            <div style={{ marginBottom: '64px' }}>
              <span className={sectionHeading}>Links</span>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {(project.liveUrl || project.externalUrl) && (
                  <a
                    href={project.liveUrl || project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      fontFamily: 'body',
                      fontWeight: '400',
                      fontSize: 'sm',
                      color: 'accent',
                      letterSpacing: 'widest',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderBottom: '1px solid',
                      borderBottomColor: 'accent',
                      paddingBottom: '2px',
                      transition: 'opacity 200ms ease',
                      _hover: { opacity: 0.7, textDecoration: 'none' },
                    })}
                  >
                    View Live ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      fontFamily: 'body',
                      fontWeight: '400',
                      fontSize: 'sm',
                      color: 'text-muted',
                      letterSpacing: 'widest',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderBottom: '1px solid',
                      borderBottomColor: 'border',
                      paddingBottom: '2px',
                      transition: 'color 200ms ease',
                      _hover: { color: 'text-primary', textDecoration: 'none' },
                    })}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Description fallback for lightweight projects */}
          {project.depth === 'lightweight' && project.description && !project.approach && (
            <div style={{ marginBottom: '64px' }}>
              <p className={bodyParagraph}>{project.description}</p>
            </div>
          )}

        </div>
      </section>

      {/* ── Footer / Nav ── */}
      <footer
        style={{
          padding: '48px',
          backgroundColor: '#0D0D0A',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div
          style={{
            maxWidth: '740px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a href="/" className={backLink}>
            ← All work
          </a>
          <span className={bodyXsMuted}>
            <a
              href="/archive"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              archive
            </a>
          </span>
        </div>
      </footer>

    </div>
  )
}