import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function FieldLabel({ label }: { label: string }) {
  return (
    <div className={css({
      fontFamily: 'oswald',
      fontSize: 'xs',
      fontWeight: '400',
      color: 'textRightMuted',
      letterSpacing: 'widest',
      textTransform: 'uppercase',
    })} style={{ marginBottom: '10px' }}>
      {label}
    </div>
  )
}

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div style={{ padding: '52px', paddingBottom: '96px' }}>
        <a href="/" className={css({
          fontFamily: 'oswald',
          fontSize: 'xs',
          color: 'textRightMuted',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          transition: 'color 0.15s ease',
          _hover: { color: 'textRight' },
        })}>
          ← Work
        </a>
        <p className={css({
          fontFamily: 'spectral',
          fontSize: 'md',
          fontWeight: '300',
          fontStyle: 'italic',
          color: 'textRightSecondary',
          lineHeight: 'normal',
        })} style={{ marginTop: '48px' }}>
          Project not found.
        </p>
      </div>
    )
  }

  const liveLink = project.liveUrl ?? project.externalUrl

  return (
    <div style={{ padding: '52px', paddingBottom: '96px' }}>

      {/* Back */}
      <div style={{ marginBottom: '48px' }}>
        <a href="/" className={css({
          fontFamily: 'oswald',
          fontSize: 'xs',
          fontWeight: '400',
          color: 'textRightMuted',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          transition: 'color 0.15s ease',
          _hover: { color: 'textRight' },
        })}>
          ← Work
        </a>
      </div>

      {/* Type · Year */}
      <div style={{ marginBottom: '10px' }}>
        <span className={css({
          fontFamily: 'oswald',
          fontSize: 'xs',
          fontWeight: '400',
          color: 'textRightMuted',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
        })}>
          {project.type} &nbsp;·&nbsp; {project.year}
        </span>
      </div>

      {/* Title */}
      <h1 className={css({
        fontFamily: 'spectral',
        fontSize: 'lg',
        fontWeight: '600',
        color: 'textRight',
        lineHeight: 'snug',
        letterSpacing: 'normal',
      })} style={{ marginBottom: '40px', maxWidth: '480px' }}>
        {project.title}
      </h1>

      {/* Role */}
      {project.role && (
        <div style={{ borderBottom: '1px solid #EAE6D2', paddingBottom: '28px', marginBottom: '28px' }}>
          <FieldLabel label="Role" />
          <p className={css({
            fontFamily: 'spectral',
            fontSize: 'base',
            fontWeight: '400',
            color: 'textRightSecondary',
            lineHeight: 'normal',
          })}>
            {project.role}
          </p>
        </div>
      )}

      {/* Problem */}
      {project.problem && (
        <div style={{ borderBottom: '1px solid #EAE6D2', paddingBottom: '28px', marginBottom: '28px' }}>
          <FieldLabel label="Problem" />
          <p className={css({
            fontFamily: 'spectral',
            fontSize: 'base',
            fontWeight: '300',
            color: 'textRight',
            lineHeight: 'loose',
          })} style={{ maxWidth: '480px' }}>
            {project.problem}
          </p>
        </div>
      )}

      {/* Description fallback for lightweight projects */}
      {!project.problem && project.description && (
        <div style={{ borderBottom: '1px solid #EAE6D2', paddingBottom: '28px', marginBottom: '28px' }}>
          <FieldLabel label="Overview" />
          <p className={css({
            fontFamily: 'spectral',
            fontSize: 'base',
            fontWeight: '300',
            color: 'textRight',
            lineHeight: 'loose',
          })} style={{ maxWidth: '480px' }}>
            {project.description}
          </p>
        </div>
      )}

      {/* Approach */}
      {project.approach && (
        <div style={{ borderBottom: '1px solid #EAE6D2', paddingBottom: '28px', marginBottom: '28px' }}>
          <FieldLabel label="Approach" />
          <p className={css({
            fontFamily: 'spectral',
            fontSize: 'base',
            fontWeight: '300',
            color: 'textRight',
            lineHeight: 'loose',
          })} style={{ maxWidth: '480px' }}>
            {project.approach}
          </p>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div style={{ borderBottom: '1px solid #EAE6D2', paddingBottom: '28px', marginBottom: '28px' }}>
          <FieldLabel label="Outcome" />
          <p className={css({
            fontFamily: 'spectral',
            fontSize: 'base',
            fontWeight: '300',
            color: 'textRight',
            lineHeight: 'loose',
          })} style={{ maxWidth: '480px' }}>
            {project.outcome}
          </p>
        </div>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <FieldLabel label="Stack" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map(tech => (
              <span
                key={tech}
                className={css({
                  fontFamily: 'oswald',
                  fontSize: 'xs',
                  fontWeight: '400',
                  color: 'textRightSecondary',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                })}
                style={{
                  padding: '4px 10px',
                  border: '1px solid #EAE6D2',
                  borderRadius: '2px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {(liveLink || project.githubUrl) && (
        <div style={{ display: 'flex', gap: '32px', marginTop: '48px', alignItems: 'center' }}>
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                fontFamily: 'oswald',
                fontSize: 'sm',
                fontWeight: '500',
                color: 'textRight',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                transition: 'color 0.15s ease',
                _hover: { color: 'textRightSecondary' },
              })}
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
                fontFamily: 'oswald',
                fontSize: 'xs',
                fontWeight: '400',
                color: 'textRightMuted',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                transition: 'color 0.15s ease',
                _hover: { color: 'textRightSecondary' },
              })}
            >
              GitHub →
            </a>
          )}
        </div>
      )}
    </div>
  )
}