import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '120px 6vw', textAlign: 'center' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '32px', fontWeight: 'bold', color: 'text' })}>
          Project not found
        </h1>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            marginTop: '16px',
            display: 'inline-block',
            padding: '12px',
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back home
        </a>
      </div>
    )
  }

  return (
    <div className={css({ padding: { base: '100px 6vw 64px', md: '120px 6vw 96px' } })}>
      {/* Header */}
      <header className={css({ marginBottom: '48px', maxWidth: '720px' })}>
        <div className={css({ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' })}>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: '{colors.stone.500}',
            })}
          >
            {project.type} · {project.year}
          </span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(36px, 4vw, 64px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '24px',
          })}
        >
          {project.title}
        </h1>
        {project.role && (
          <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'accent', marginBottom: '8px' })}>
            {project.role}
          </p>
        )}
      </header>

      {/* Detail grid */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '200px 1fr' },
          gap: { base: '32px', md: '48px' },
          maxWidth: '900px',
        })}
      >
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '32px' })}>
          {project.stack && project.stack.length > 0 && (
            <div>
              <h3
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  marginBottom: '12px',
                })}
              >
                Stack
              </h3>
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
                {project.stack.map((tech, i) => (
                  <span key={i} className={css({ fontFamily: 'body', fontSize: '14px', color: 'text-secondary' })}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.externalUrl || project.liveUrl || project.githubUrl) && (
            <div>
              <h3
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  marginBottom: '12px',
                })}
              >
                Links
              </h3>
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'accent',
                      padding: '4px 0',
                      _hover: { textDecoration: 'underline' },
                      _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                    })}
                  >
                    Visit site ↗
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'accent',
                      padding: '4px 0',
                      _hover: { textDecoration: 'underline' },
                      _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                    })}
                  >
                    Live ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'accent',
                      padding: '4px 0',
                      _hover: { textDecoration: 'underline' },
                      _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                    })}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={css({ display: 'flex', flexDirection: 'column', gap: '32px' })}>
          {project.problem && (
            <div>
              <h3
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  marginBottom: '12px',
                })}
              >
                Problem
              </h3>
              <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text-secondary', maxWidth: '60ch' })}>
                {project.problem}
              </p>
            </div>
          )}

          {project.approach && (
            <div>
              <h3
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  marginBottom: '12px',
                })}
              >
                Approach
              </h3>
              <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text-secondary', maxWidth: '60ch' })}>
                {project.approach}
              </p>
            </div>
          )}

          {project.outcome && (
            <div>
              <h3
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  marginBottom: '12px',
                })}
              >
                Outcome
              </h3>
              <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text-secondary', maxWidth: '60ch' })}>
                {project.outcome}
              </p>
            </div>
          )}

          {project.description && (
            <div>
              <h3
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  marginBottom: '12px',
                })}
              >
                About
              </h3>
              <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text-secondary', maxWidth: '60ch' })}>
                {project.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      <div className={css({ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid', borderColor: 'border' })}>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            padding: '12px 0',
            display: 'inline-block',
            _hover: { textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back
        </a>
      </div>
    </div>
  )
}