import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingLeft: '6vw',
          paddingRight: '6vw',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'accent',
          })}
        >
          Not Found
        </h1>
      </div>
    )
  }

  return (
    <div
      className={css({
        paddingLeft: '6vw',
        paddingRight: '6vw',
        paddingTop: '48px',
        paddingBottom: '96px',
        maxWidth: '1200px',
      })}
    >
      {/* Project header */}
      <header className={css({ marginBottom: '64px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            marginBottom: '16px',
          })}
        >
          {project.type} · {project.year}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: 'tight',
            color: 'accent',
            marginBottom: '24px',
          })}
        >
          {project.title}
        </h1>
        {project.role && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'textSubtle',
              marginBottom: '8px',
            })}
          >
            Role: {project.role}
          </p>
        )}
        {(project.externalUrl || project.liveUrl) && (
          <a
            href={project.externalUrl || project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              display: 'inline-block',
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'accent',
              borderBottom: '1px solid',
              borderColor: 'accent',
              paddingBottom: '2px',
              marginTop: '16px',
              _hover: { color: 'accentLight' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            Visit Site ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              display: 'inline-block',
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'accent',
              borderBottom: '1px solid',
              borderColor: 'accent',
              paddingBottom: '2px',
              marginTop: '16px',
              marginLeft: '24px',
              _hover: { color: 'accentLight' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            GitHub ↗
          </a>
        )}
      </header>

      {/* Project details */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        })}
      >
        {project.problem && (
          <section>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'textSubtle',
                marginBottom: '16px',
              })}
            >
              Problem
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textMuted',
                maxWidth: '65ch',
                letterSpacing: 'normal',
              })}
            >
              {project.problem}
            </p>
          </section>
        )}

        {project.approach && (
          <section>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'textSubtle',
                marginBottom: '16px',
              })}
            >
              Approach
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textMuted',
                maxWidth: '65ch',
                letterSpacing: 'normal',
              })}
            >
              {project.approach}
            </p>
          </section>
        )}

        {project.outcome && (
          <section>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'textSubtle',
                marginBottom: '16px',
              })}
            >
              Outcome
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textMuted',
                maxWidth: '65ch',
                letterSpacing: 'normal',
              })}
            >
              {project.outcome}
            </p>
          </section>
        )}

        {project.description && (
          <section>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'textSubtle',
                marginBottom: '16px',
              })}
            >
              Description
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textMuted',
                maxWidth: '65ch',
                letterSpacing: 'normal',
              })}
            >
              {project.description}
            </p>
          </section>
        )}

        {project.stack && project.stack.length > 0 && (
          <section>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'textSubtle',
                marginBottom: '16px',
              })}
            >
              Stack
            </p>
            <div
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px 16px',
              })}
            >
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '14px',
                    color: 'textMuted',
                    letterSpacing: 'normal',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back link */}
      <div className={css({ marginTop: '96px' })}>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            _hover: { color: 'accent' },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          ← Back
        </a>
      </div>
    </div>
  )
}