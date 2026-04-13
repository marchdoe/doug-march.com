import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const sectionLabelText = css({
  fontFamily: 'body',
  fontWeight: '400',
  color: 'text.muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
      <span className={sectionLabelText} style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: '1', height: '1px', background: '#C8D1C2' }} />
    </div>
  )
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
        <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <a
            href="/"
            className={css({
              fontFamily: 'mono',
              color: 'text.muted',
              textDecoration: 'none',
              letterSpacing: 'wider',
              transition: 'color 200ms ease',
              _hover: { color: 'accent', textDecoration: 'none' },
            })}
            style={{ fontSize: '11px', display: 'inline-block', marginBottom: '48px' }}
          >
            ← Index
          </a>

          <p
            className={css({ fontFamily: 'heading', fontWeight: '700', color: 'text', fontSize: 'lg' })}
          >
            Project not found.
          </p>
        </section>
      </div>
    )
  }

  const hasFullDepth = project.depth === 'full'

  return (
    <div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* BACK LINK */}
        <div style={{ paddingTop: '48px' }}>
          <a
            href="/"
            className={css({
              fontFamily: 'mono',
              color: 'text.muted',
              textDecoration: 'none',
              letterSpacing: 'wider',
              transition: 'color 200ms ease',
              _hover: { color: 'accent', textDecoration: 'none' },
            })}
            style={{ fontSize: '11px' }}
          >
            ← All Work
          </a>
        </div>

        {/* PROJECT HEADER */}
        <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            <span
              className={css({
                fontFamily: 'mono',
                color: 'text.muted',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
              })}
              style={{ fontSize: '9px' }}
            >
              {project.type}
            </span>
            <span
              className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
              style={{ fontSize: '11px' }}
            >
              {project.year}
            </span>
            {project.featured && (
              <span
                className={css({
                  fontFamily: 'mono',
                  color: 'accent',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                })}
                style={{ fontSize: '8px' }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={css({
              fontFamily: 'heading',
              fontWeight: '800',
              color: 'text',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              margin: '0 0 32px',
            })}
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            {project.title}
          </h1>

          {/* Role */}
          {project.role && (
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: '400',
                color: 'text.secondary',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                margin: '0',
              })}
              style={{ fontSize: '12px' }}
            >
              Role &nbsp;—&nbsp; {project.role}
            </p>
          )}
        </section>

        {/* PROBLEM */}
        {project.problem && (
          <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
            <SectionLabel label="The Problem" />
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: '300',
                color: 'text.secondary',
                lineHeight: 'normal',
                margin: '0',
              })}
              style={{ fontSize: '18px', maxWidth: '680px' }}
            >
              {project.problem}
            </p>
          </section>
        )}

        {/* DESCRIPTION (lightweight projects) */}
        {!hasFullDepth && project.description && (
          <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
            <SectionLabel label="About" />
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: '300',
                color: 'text.secondary',
                lineHeight: 'normal',
                margin: '0',
              })}
              style={{ fontSize: '18px', maxWidth: '680px' }}
            >
              {project.description}
            </p>
          </section>
        )}

        {/* APPROACH */}
        {hasFullDepth && project.approach && (
          <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
            <SectionLabel label="Approach" />
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: '300',
                color: 'text.secondary',
                lineHeight: 'normal',
                margin: '0',
              })}
              style={{ fontSize: '18px', maxWidth: '680px' }}
            >
              {project.approach}
            </p>
          </section>
        )}

        {/* OUTCOME */}
        {hasFullDepth && project.outcome && (
          <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
            <SectionLabel label="Outcome" />
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: '300',
                color: 'text.secondary',
                lineHeight: 'normal',
                margin: '0',
              })}
              style={{ fontSize: '18px', maxWidth: '680px' }}
            >
              {project.outcome}
            </p>
          </section>
        )}

        {/* STACK */}
        {project.stack && project.stack.length > 0 && (
          <section style={{ paddingTop: '48px', paddingBottom: '48px', borderBottom: '1px solid #C8D1C2' }}>
            <SectionLabel label="Stack" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.stack.map((item) => (
                <span
                  key={item}
                  className={css({
                    fontFamily: 'mono',
                    fontWeight: '400',
                    color: 'text.secondary',
                    background: 'bg.nav',
                    letterSpacing: 'wider',
                  })}
                  style={{ fontSize: '11px', padding: '6px 10px', border: '1px solid #C8D1C2' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* LINKS */}
        {(project.liveUrl || project.githubUrl || project.externalUrl) && (
          <section style={{ paddingTop: '48px', paddingBottom: '96px' }}>
            <SectionLabel label="Links" />
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '500',
                    color: 'accent',
                    textDecoration: 'none',
                    letterSpacing: 'wide',
                    textTransform: 'uppercase',
                    transition: 'color 200ms ease',
                    _hover: { color: 'accent', textDecoration: 'underline' },
                  })}
                  style={{ fontSize: '12px' }}
                >
                  View Live →
                </a>
              )}
              {project.externalUrl && !project.liveUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '500',
                    color: 'accent',
                    textDecoration: 'none',
                    letterSpacing: 'wide',
                    textTransform: 'uppercase',
                    transition: 'color 200ms ease',
                    _hover: { color: 'accent', textDecoration: 'underline' },
                  })}
                  style={{ fontSize: '12px' }}
                >
                  View Project →
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
                    color: 'text.secondary',
                    textDecoration: 'none',
                    letterSpacing: 'wide',
                    textTransform: 'uppercase',
                    transition: 'color 200ms ease',
                    _hover: { color: 'accent', textDecoration: 'none' },
                  })}
                  style={{ fontSize: '12px' }}
                >
                  GitHub →
                </a>
              )}
            </div>
          </section>
        )}

        {/* Spacer if no links section */}
        {!(project.liveUrl || project.githubUrl || project.externalUrl) && (
          <div style={{ paddingBottom: '96px' }} />
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #C8D1C2', background: '#E4E9DF', paddingTop: '28px', paddingBottom: '28px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
            style={{ fontSize: '11px' }}
          >
            DET &nbsp; PIS 133–121 W &nbsp;·&nbsp; TIG 8–2 W
          </span>

          <span
            className={css({ fontFamily: 'body', fontWeight: '300', color: 'text.muted' })}
            style={{ fontSize: '11px', letterSpacing: '0.05em' }}
          >
            doug-march.com &nbsp;©&nbsp; 2026
          </span>

          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              color: 'text.muted',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              _hover: { color: 'text.secondary', textDecoration: 'none' },
            })}
            style={{ fontSize: '11px', letterSpacing: '0.05em' }}
          >
            Archive
          </a>
        </div>
      </footer>
    </div>
  )
}