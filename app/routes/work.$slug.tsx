import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function SectionHeader({ label }: { label: string }) {
  return (
    <div
      className={css({
        fontFamily: 'body',
        fontSize: '11px',
        fontWeight: 'medium',
        letterSpacing: 'widest',
        color: 'accent',
        textTransform: 'uppercase',
        padding: '12px 0',
        borderBottom: '1px solid',
        borderColor: 'border',
      })}
    >
      {label}
    </div>
  )
}

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className={css({ padding: '48px 0' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 'tight',
            color: 'text',
            textTransform: 'uppercase',
          })}
        >
          NOT FOUND
        </h1>
        <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'textSecondary', marginTop: '16px' })}>
          This project doesn't exist.
        </p>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            marginTop: '24px',
            display: 'inline-block',
            padding: '12px 0',
            _hover: { textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back to index
        </a>
      </section>
    )
  }

  return (
    <>
      {/* Project Header */}
      <section
        className={css({
          paddingTop: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid',
          borderColor: 'borderAccent',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginBottom: '16px',
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              color: 'textMuted',
              letterSpacing: 'wide',
              fontVariantNumeric: 'tabular-nums',
            })}
          >
            {project.type} / {project.year}
          </span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(40px, 7vw, 100px)',
            lineHeight: 'tight',
            letterSpacing: '0.02em',
            color: 'text',
            textTransform: 'uppercase',
          })}
        >
          {project.title}
          <span className={css({ color: 'accent' })}>.</span>
        </h1>
        {project.role && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: '0.14em',
              color: 'accent',
              textTransform: 'uppercase',
              marginTop: '12px',
            })}
          >
            {project.role}
          </p>
        )}
      </section>

      {/* Project Detail Grid */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr',
          md: { gridTemplateColumns: '55fr 45fr' },
          gap: '0',
        })}
      >
        <div
          className={css({
            md: {
              borderRight: '1px solid',
              borderColor: 'border',
              paddingRight: '16px',
            },
          })}
        >
          {project.problem && (
            <>
              <SectionHeader label="PROBLEM" />
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  padding: '16px 0',
                  maxWidth: '60ch',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                {project.problem}
              </p>
            </>
          )}
          {project.approach && (
            <>
              <SectionHeader label="APPROACH" />
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  padding: '16px 0',
                  maxWidth: '60ch',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                {project.approach}
              </p>
            </>
          )}
          {project.outcome && (
            <>
              <SectionHeader label="OUTCOME" />
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  padding: '16px 0',
                  maxWidth: '60ch',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                {project.outcome}
              </p>
            </>
          )}
          {project.description && (
            <>
              <SectionHeader label="DESCRIPTION" />
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  padding: '16px 0',
                  maxWidth: '60ch',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                {project.description}
              </p>
            </>
          )}
        </div>

        <div
          className={css({
            md: { paddingLeft: '16px' },
            marginTop: '24px',
            md: { marginTop: '0' },
          })}
        >
          {project.stack && project.stack.length > 0 && (
            <>
              <SectionHeader label="STACK" />
              <div className={css({ padding: '12px 0', borderBottom: '0.5px solid', borderColor: 'border' })}>
                {project.stack.map((tech, i) => (
                  <span
                    key={tech}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '13px',
                      color: 'textSecondary',
                      letterSpacing: 'wide',
                    })}
                  >
                    {tech}
                    {i < (project.stack?.length ?? 0) - 1 && (
                      <span className={css({ color: 'textMuted' })}> · </span>
                    )}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Links */}
          <SectionHeader label="LINKS" />
          <div className={css({ padding: '10px 0' })}>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                className={css({
                  display: 'block',
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'accent',
                  padding: '8px 0',
                  textDecoration: 'none',
                  _hover: { textDecoration: 'underline' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
              >
                Visit site →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className={css({
                  display: 'block',
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'accent',
                  padding: '8px 0',
                  textDecoration: 'none',
                  _hover: { textDecoration: 'underline' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
              >
                Live URL →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className={css({
                  display: 'block',
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'accent',
                  padding: '8px 0',
                  textDecoration: 'none',
                  _hover: { textDecoration: 'underline' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
              >
                GitHub →
              </a>
            )}
            <a
              href="/"
              className={css({
                display: 'block',
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                padding: '8px 0',
                textDecoration: 'none',
                marginTop: '8px',
                _hover: { color: 'accent' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              ← Back to index
            </a>
          </div>
        </div>
      </div>
    </>
  )
}