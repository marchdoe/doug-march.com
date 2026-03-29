import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const label = css({
  display: 'block',
  fontFamily: 'body',
  fontWeight: '500',
  fontSize: '2xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

const workRowLink = css({
  display: 'block',
  textDecoration: 'none',
  paddingTop: '32px',
  paddingBottom: '32px',
  paddingLeft: '16px',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  borderLeft: '2px solid transparent',
  transition: 'border-left-color 200ms ease, padding-left 200ms ease',
  _hover: {
    borderLeftColor: 'accent',
    paddingLeft: '14px',
  },
})

const workTitle = css({
  fontFamily: 'heading',
  fontSize: 'lg',
  letterSpacing: 'tight',
  lineHeight: 'snug',
  color: 'text-primary',
})

const workMeta = css({
  fontFamily: 'body',
  fontWeight: '300',
  fontSize: '2xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

const workProblem = css({
  fontFamily: 'body',
  fontWeight: '300',
  fontSize: 'sm',
  color: 'text-secondary',
  letterSpacing: 'wide',
  lineHeight: 'normal',
  maxWidth: '540px',
  marginTop: '10px',
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

function SectionRule({ children }: { children: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '48px',
      }}
    >
      <span className={label}>{children}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#3A3933' }} />
    </div>
  )
}

function HomePage() {
  return (
    <div style={{ backgroundColor: '#171714' }}>

      {/* ── 1. Hero ── */}
      <section
        style={{
          minHeight: '100vh',
          backgroundColor: '#0D0D0A',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '96px 48px',
        }}
      >
        <div style={{ maxWidth: '740px' }}>
          <h1
            className={css({
              fontFamily: 'heading',
              fontSize: '2xl',
              letterSpacing: 'tight',
              lineHeight: 'tight',
              color: 'text-primary',
              marginBottom: '20px',
            })}
          >
            Doug March
          </h1>
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              fontSize: 'sm',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              lineHeight: 'tight',
            })}
          >
            Product Designer &amp; Developer
          </p>
        </div>
      </section>

      {/* ── 2. HN Editorial ── */}
      <section style={{ padding: '80px 48px', backgroundColor: '#171714' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <p
            className={css({
              fontFamily: 'heading',
              fontStyle: 'italic',
              fontSize: 'lg',
              color: 'text-primary',
              letterSpacing: 'normal',
              lineHeight: 'snug',
              marginBottom: '16px',
            })}
          >
            On persistence.
          </p>
          <p className={bodySmMuted}>
            A founder's story is making the rounds today. 1,128 people stopped to read it.
          </p>
        </div>
      </section>

      {/* ── 3. Featured Project ── */}
      {featuredProject && (
        <section
          style={{
            padding: '96px 48px',
            backgroundColor: '#171714',
            borderTop: '1px solid #3A3933',
          }}
        >
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
            <span className={label} style={{ marginBottom: '32px' }}>
              Featured
            </span>
            <div style={{ marginTop: '32px' }}>
              <a
                href={
                  featuredProject.externalUrl ||
                  featuredProject.liveUrl ||
                  `/work/${featuredProject.slug}`
                }
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                style={{ textDecoration: 'none' }}
              >
                <h2
                  className={css({
                    fontFamily: 'heading',
                    fontSize: 'xl',
                    letterSpacing: 'tight',
                    lineHeight: 'snug',
                    color: 'text-primary',
                    marginBottom: '24px',
                    transition: 'color 200ms ease',
                    _hover: { color: 'accent' },
                  })}
                >
                  {featuredProject.title}
                </h2>
              </a>
              {featuredProject.problem && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: 'base',
                    color: 'text-secondary',
                    letterSpacing: 'wide',
                    lineHeight: 'normal',
                    maxWidth: '580px',
                  })}
                >
                  {featuredProject.problem}
                </p>
              )}
              {(featuredProject.externalUrl || featuredProject.liveUrl) && (
                <a
                  href={featuredProject.externalUrl || featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    display: 'inline-block',
                    marginTop: '32px',
                    fontFamily: 'body',
                    fontWeight: '400',
                    fontSize: 'xs',
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
                  View Project ↗
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Selected Work ── */}
      <section
        style={{
          padding: '96px 48px',
          backgroundColor: '#171714',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <SectionRule>Selected Work</SectionRule>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={workRowLink}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <span className={workTitle}>{project.title}</span>
                <span className={workMeta} style={{ flexShrink: 0 }}>
                  {project.year}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <span className={workMeta}>{project.type}</span>
                {project.role && (
                  <span className={workMeta}>{project.role}</span>
                )}
              </div>
              {project.problem && (
                <p className={workProblem}>{project.problem}</p>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* ── 5. Zafón Quote ── */}
      <section
        style={{
          padding: '128px 48px',
          backgroundColor: '#171714',
        }}
      >
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <p
            className={css({
              fontFamily: 'heading',
              fontStyle: 'italic',
              fontSize: 'xl',
              color: 'text-primary',
              letterSpacing: 'normal',
              lineHeight: 'snug',
              marginBottom: '24px',
            })}
          >
            We all give up great expectations along the way.
          </p>
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              fontSize: 'xs',
              color: 'text-muted',
              letterSpacing: 'wider',
            })}
          >
            — Carlos Ruiz Zafón
          </span>
        </div>
      </section>

      {/* ── 6. Golf Specimen ── */}
      <section
        style={{
          padding: '80px 48px',
          backgroundColor: '#0D0D0A',
        }}
      >
        <div
          style={{
            width: '300px',
            maxWidth: '100%',
            margin: '0 auto',
            border: '1px solid #3A3933',
            padding: '32px 24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontWeight: '500',
                fontSize: '2xs',
                color: 'text-muted',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
              })}
            >
              Houston Open — Round 3
            </span>
          </div>
          <span
            className={css({
              display: 'block',
              fontFamily: 'body',
              fontWeight: '500',
              fontSize: '2xs',
              color: 'sage',
              letterSpacing: 'wider',
              marginBottom: '24px',
            })}
          >
            ● Live
          </span>
          <div style={{ marginBottom: '20px' }}>
            <span
              className={css({
                display: 'block',
                fontFamily: 'heading',
                fontSize: 'xl',
                letterSpacing: 'tight',
                lineHeight: 'tight',
                color: 'text-primary',
              })}
            >
              Woodland
            </span>
            <span
              className={css({
                display: 'block',
                fontFamily: 'body',
                fontWeight: '300',
                fontSize: 'md',
                color: 'text-secondary',
                marginTop: '6px',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              −18
            </span>
          </div>
          <div style={{ borderTop: '1px solid #3A3933' }}>
            {[
              { name: 'Scheffler', score: '−16' },
              { name: 'Thomas', score: '−15' },
              { name: 'Cantlay', score: '−14' },
            ].map((player) => (
              <div
                key={player.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '40px',
                  borderBottom: '1px solid #3A3933',
                }}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: 'sm',
                    color: 'text-muted',
                    letterSpacing: 'wide',
                  })}
                >
                  {player.name}
                </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: 'sm',
                    color: 'text-secondary',
                    fontVariantNumeric: 'tabular-nums',
                  })}
                >
                  {player.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Detroit Sports ── */}
      <section
        style={{
          padding: '64px 48px',
          backgroundColor: '#171714',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <span className={label} style={{ marginBottom: '24px', display: 'block' }}>
            Detroit · March 29
          </span>
          {[
            { team: 'Pistons', result: '109 – 87', opp: 'Bucks' },
            { team: 'Red Wings', result: 'L', opp: '' },
            { team: 'Tigers', result: 'L', opp: '' },
          ].map((row) => (
            <div
              key={row.team}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '40px',
              }}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontWeight: '300',
                  fontSize: 'sm',
                  color: 'text-secondary',
                  letterSpacing: 'wide',
                })}
              >
                {row.team}
              </span>
              <span className={bodyXsMuted}>
                {row.opp ? `${row.result}  ${row.opp}` : row.result}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Experiments ── */}
      <section
        style={{
          padding: '96px 48px',
          backgroundColor: '#171714',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <SectionRule>Experiments</SectionRule>
          {experiments.map((exp) => (
            <div
              key={exp.slug}
              style={{
                paddingTop: '28px',
                paddingBottom: '28px',
                borderBottom: '1px solid #3A3933',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '16px',
                }}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '400',
                    fontSize: 'base',
                    color: 'text-primary',
                    letterSpacing: 'wide',
                  })}
                >
                  {exp.title}
                </span>
                <span className={workMeta} style={{ flexShrink: 0 }}>
                  {exp.type} · {exp.year}
                </span>
              </div>
              {exp.description && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: 'sm',
                    color: 'text-muted',
                    letterSpacing: 'wide',
                    lineHeight: 'normal',
                    maxWidth: '540px',
                    marginTop: '8px',
                  })}
                >
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
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
          <span className={bodyXsMuted}>
            Doug March · 2026
          </span>
          <span className={bodyXsMuted}>
            <a
              href="/archive"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              archive
            </a>
          </span>
        </div>
      </footer>

    </div>
  )
}