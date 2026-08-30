import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const kickerCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  flexWrap: 'wrap',
  color: 'accent',
  fontFamily: 'body',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'lowercase',
  fontWeight: 'semibold',
  marginBottom: { base: '4', md: '5' },
})

const ruleCss = css({ flex: 1, height: '1px', background: 'border', minWidth: '10' })

const sectHeadCss = css({
  fontFamily: 'body',
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'lowercase',
  fontWeight: 'semibold',
  color: 'accentGlow',
  paddingBottom: '2',
  marginBottom: '4',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
})

const almanacItemCss = css({
  paddingY: '3',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const kCss = css({
  display: 'block',
  marginBottom: '1',
  fontFamily: 'body',
  fontSize: '2xs',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textSubtle',
})

const vCss = css({ fontFamily: 'display', fontSize: 'sm', lineHeight: 'loose', color: 'plum.200' })

const bodyPCss = css({
  fontFamily: 'display',
  fontSize: 'md',
  lineHeight: 'loose',
  color: 'plum.200',
  marginBottom: '4',
  maxWidth: '66ch',
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '8', paddingX: { base: '4', md: '8' }, color: 'text' })}>
        Project not found.
      </div>
    )
  }

  return (
    <>
      <section
        className={css({
          minHeight: { base: 'auto', md: '30vh' },
          padding: { base: '5', md: '7' },
          paddingX: { base: '4', md: '8' },
          borderBottom: '3px double',
          borderBottomColor: 'border',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <div className={kickerCss}>
          <span>{project.type}</span>
          <span className={ruleCss} />
          <span>{project.year}</span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '20ch',
            marginBottom: '4',
          })}
        >
          {project.title}
        </h1>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener"
            className={css({
              fontFamily: 'body',
              fontSize: 'xs',
              fontWeight: 'semibold',
              letterSpacing: 'wide',
              color: 'accentGlow',
              textDecoration: 'underline',
              _hover: { color: 'accent' },
            })}
          >
            Visit ↗
          </a>
        )}
      </section>

      <main
        className={css({
          padding: { base: '5', md: '6' },
          paddingX: { base: '4', md: '8' },
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
          gap: '8',
        })}
      >
        <section className={css({ gridColumn: { base: '1/-1', md: '1 / span 8' } })}>
          {project.context && (
            <p className={bodyPCss}>
              <strong className={css({ color: 'accentGlow' })}>Context.</strong> {project.context}
            </p>
          )}
          {project.problem && (
            <p className={bodyPCss}>
              <strong className={css({ color: 'accentGlow' })}>Problem.</strong> {project.problem}
            </p>
          )}
          {project.approach && (
            <p className={bodyPCss}>
              <strong className={css({ color: 'accentGlow' })}>Approach.</strong> {project.approach}
            </p>
          )}
          {project.outcome && (
            <p className={bodyPCss}>
              <strong className={css({ color: 'accentGlow' })}>Outcome.</strong> {project.outcome}
            </p>
          )}
          {project.description && <p className={bodyPCss}>{project.description}</p>}

          {project.constraints && project.constraints.length > 0 && (
            <>
              <h2 className={sectHeadCss}>Constraints</h2>
              <ul className={css({ listStyle: 'none', marginBottom: '6' })}>
                {project.constraints.map((c) => (
                  <li
                    key={c}
                    className={css({
                      display: 'flex',
                      gap: '3',
                      marginBottom: '2',
                      alignItems: 'baseline',
                    })}
                  >
                    <span className={css({ color: 'accentGlow', flexShrink: 0 })}>&mdash;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.process && project.process.length > 0 && (
            <>
              <h2 className={sectHeadCss}>How a night runs</h2>
              <ol className={css({ listStyle: 'none', marginBottom: '6' })}>
                {project.process.map((step, i) => (
                  <li
                    key={step.phase}
                    className={css({
                      display: 'grid',
                      gridTemplateColumns: '2.5rem 1fr',
                      gap: '4',
                      paddingY: '3',
                      borderTop: '1px solid',
                      borderColor: 'border',
                    })}
                  >
                    <span
                      className={css({
                        fontFamily: 'mono',
                        fontSize: 'xs',
                        color: 'accentGlow',
                        fontVariantNumeric: 'tabular-nums',
                      })}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <strong className={css({ display: 'block', marginBottom: '1' })}>
                        {step.phase}
                      </strong>
                      <span className={css({ display: 'block', marginBottom: '1' })}>
                        {step.does}
                      </span>
                      <span
                        className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'textMuted' })}
                      >
                        &rarr; {step.produces}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}

          {project.decisions && project.decisions.length > 0 && (
            <>
              <h2 className={sectHeadCss}>Decisions</h2>
              <dl className={css({ marginBottom: '6' })}>
                {project.decisions.map((d) => (
                  <div
                    key={d.decision}
                    className={css({
                      paddingY: '3',
                      borderTop: '1px solid',
                      borderColor: 'border',
                    })}
                  >
                    <dt className={css({ fontWeight: 'bold', marginBottom: '1' })}>{d.decision}</dt>
                    <dd className={css({ margin: 0, color: 'textMuted' })}>{d.why}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {project.references && project.references.length > 0 && (
            <>
              <h2 className={sectHeadCss}>Further reading</h2>
              <ul className={css({ listStyle: 'none' })}>
                {project.references.map((r) => (
                  <li key={r.url} className={css({ marginBottom: '3' })}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener"
                      className={css({ color: 'accentGlow', textDecoration: 'underline' })}
                    >
                      {r.title}
                    </a>
                    {r.note && (
                      <span
                        className={css({ display: 'block', fontSize: 'sm', color: 'textMuted' })}
                      >
                        {r.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <aside className={css({ gridColumn: { base: '1/-1', md: '9 / span 4' } })}>
          <h2 className={sectHeadCss}>Metadata</h2>
          {project.role && (
            <div className={almanacItemCss}>
              <span className={kCss}>Role</span>
              <span className={vCss}>{project.role}</span>
            </div>
          )}
          <div className={almanacItemCss}>
            <span className={kCss}>Year</span>
            <span className={vCss}>{project.year}</span>
          </div>
          {project.stack && project.stack.length > 0 && (
            <div className={almanacItemCss}>
              <span className={kCss}>Stack</span>
              <span className={vCss}>{project.stack.join(' · ')}</span>
            </div>
          )}
          {project.liveUrl && (
            <div className={almanacItemCss}>
              <span className={kCss}>Live</span>
              <span className={vCss}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className={css({
                    color: 'accentGlow',
                    textDecoration: 'underline',
                    _hover: { color: 'accent' },
                  })}
                >
                  {project.liveUrl}
                </a>
              </span>
            </div>
          )}
          {project.githubUrl && (
            <div className={almanacItemCss}>
              <span className={kCss}>Code</span>
              <span className={vCss}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener"
                  className={css({
                    color: 'accentGlow',
                    textDecoration: 'underline',
                    _hover: { color: 'accent' },
                  })}
                >
                  {project.githubUrl}
                </a>
              </span>
            </div>
          )}
        </aside>
      </main>
    </>
  )
}
