import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav } from '../components/Nav'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <div className={css({ padding: '9', color: 'text' })}>Project not found.</div>
  }

  const strong = css({ color: 'fieldInk' })

  return (
    <div
      className={css({
        background: 'field',
        color: 'fieldInk',
        minHeight: '100%',
        paddingX: 'clamp(24px, 6vw, 96px)',
        paddingY: 'clamp(28px, 6vh, 72px)',
        minWidth: 0,
        overflowX: 'hidden',
      })}
    >
      <Nav tone="dark" />

      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2',
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'fieldInkMuted',
          marginTop: 'clamp(28px, 6vh, 64px)',
        })}
      >
        <span>{project.type}</span>
        <span>·</span>
        <span>{project.year}</span>
        {project.liveUrl && (
          <>
            <span>·</span>
            <a
              href={project.liveUrl}
              className={css({ color: 'fieldInk', textDecoration: 'underline' })}
            >
              Visit ↗
            </a>
          </>
        )}
      </div>

      <h1
        className={css({
          textStyle: 'hero',
          fontFamily: 'display',
          fontWeight: '800',
          color: 'fieldInk',
          marginTop: '4',
          maxWidth: '20ch',
          overflowWrap: 'break-word',
        })}
      >
        {project.title}
      </h1>

      {project.problem && (
        <p
          className={css({
            textStyle: 'xl',
            color: 'fieldInkMuted',
            marginTop: '6',
            maxWidth: '50ch',
          })}
        >
          {project.problem}
        </p>
      )}

      {project.approach && (
        <section className={css({ marginTop: '9', maxWidth: '60ch' })}>
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '2',
            })}
          >
            Approach
          </div>
          <p className={css({ fontSize: 'base', color: 'fieldInk', lineHeight: 'loose' })}>
            {project.approach}
          </p>
        </section>
      )}

      {project.outcome && (
        <section className={css({ marginTop: '6', maxWidth: '60ch' })}>
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '2',
            })}
          >
            Outcome
          </div>
          <p className={css({ fontSize: 'base', color: 'fieldInk', lineHeight: 'loose' })}>
            {project.outcome}
          </p>
        </section>
      )}

      {project.role && (
        <div className={css({ marginTop: '6', fontSize: 'sm', color: 'fieldInkMuted' })}>
          Role: <b className={strong}>{project.role}</b>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className={css({ marginTop: '6', display: 'flex', flexWrap: 'wrap', gap: '2' })}>
          {project.stack.map((s) => (
            <span
              key={s}
              className={css({
                fontSize: '2xs',
                textTransform: 'uppercase',
                letterSpacing: 'wide',
                border: '1px solid',
                borderColor: 'fieldBorder',
                color: 'fieldInkMuted',
                padding: '1 2',
              })}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {project.context && (
        <section
          className={css({
            marginTop: '9',
            maxWidth: '60ch',
            borderTop: '1px solid',
            borderColor: 'fieldBorder',
            paddingTop: '6',
          })}
        >
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '2',
            })}
          >
            Context
          </div>
          <p className={css({ fontSize: 'base', color: 'fieldInk', lineHeight: 'loose' })}>
            {project.context}
          </p>
        </section>
      )}

      {project.constraints && project.constraints.length > 0 && (
        <section className={css({ marginTop: '6', maxWidth: '60ch' })}>
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '2',
            })}
          >
            Constraints
          </div>
          <ul
            className={css({
              margin: 0,
              paddingLeft: '5',
              display: 'flex',
              flexDirection: 'column',
              gap: '1',
            })}
          >
            {project.constraints.map((c, i) => (
              <li key={i} className={css({ fontSize: 'base', color: 'fieldInk' })}>
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.process && project.process.length > 0 && (
        <section className={css({ marginTop: '9', maxWidth: '60ch' })}>
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '3',
            })}
          >
            Process
          </div>
          <ol
            className={css({
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '4',
            })}
          >
            {project.process.map((step, i) => (
              <li key={i} className={css({ display: 'flex', gap: '3' })}>
                <div className={css({ fontSize: 'xs', color: 'fieldInkMuted', flex: '0 0 24px' })}>
                  {i + 1}
                </div>
                <div className={css({ minWidth: 0 })}>
                  <div className={css({ fontSize: 'base', fontWeight: '700', color: 'fieldInk' })}>
                    {step.phase}
                  </div>
                  <div className={css({ fontSize: 'sm', color: 'fieldInkMuted', marginTop: '1' })}>
                    {step.does}
                  </div>
                  <div
                    className={css({
                      fontSize: 'sm',
                      color: 'fieldInkMuted',
                      marginTop: '1',
                      fontStyle: 'italic',
                    })}
                  >
                    → {step.produces}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.decisions && project.decisions.length > 0 && (
        <section className={css({ marginTop: '9', maxWidth: '60ch' })}>
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '3',
            })}
          >
            Decisions
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
            {project.decisions.map((d, i) => (
              <div key={i}>
                <div className={css({ fontSize: 'base', fontWeight: '700', color: 'fieldInk' })}>
                  {d.decision}
                </div>
                <div className={css({ fontSize: 'sm', color: 'fieldInkMuted', marginTop: '1' })}>
                  {d.why}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.references && project.references.length > 0 && (
        <section className={css({ marginTop: '9', maxWidth: '60ch', paddingBottom: '9' })}>
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              marginBottom: '3',
            })}
          >
            References
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '3' })}>
            {project.references.map((r, i) => (
              <div key={i}>
                <a
                  href={r.url}
                  className={css({
                    fontSize: 'base',
                    color: 'fieldInk',
                    textDecoration: 'underline',
                  })}
                >
                  {r.title}
                </a>
                {r.note && (
                  <div className={css({ fontSize: 'sm', color: 'fieldInkMuted', marginTop: '1' })}>
                    {r.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
