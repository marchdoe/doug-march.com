import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const column = css({
  width: '88vw',
  maxWidth: '1440px',
  margin: '0 auto',
})

function HomePage() {
  return (
    <div className={column}>
      <HeroFold />
      <SignalFold />
      <WorkFold />
      <ExperimentsFold />
      <FooterFold />
    </div>
  )
}

/* ─── HERO ─── */
function HeroFold() {
  return (
    <section className={css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '64px',
      paddingBottom: '48px',
    })}>
      <div className={css({ maxWidth: '1200px' })}>
        <h1 className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(44px, 5.8vw, 88px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          textWrap: 'balance',
        })}>
          Do what you can,
          <br />
          with what you have,
          <br />
          where you are.
        </h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '14px',
          fontWeight: 'normal',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textSecondary',
          marginTop: '32px',
        })}>
          — Colin R. Davis
        </p>
        <div className={css({
          width: '100%',
          height: '2px',
          background: 'accent',
          marginTop: '24px',
        })} />
      </div>
    </section>
  )
}

/* ─── SIGNALS ─── */
function SignalFold() {
  return (
    <section className={css({
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '96px',
      paddingBottom: '96px',
      borderTop: '1px solid',
      borderColor: 'border',
    })}>
      <div className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '48px',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '48px',
        },
      })}>
        {/* New Moon */}
        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
          <span className={css({ fontSize: '64px', color: 'accent', lineHeight: '1', fontFamily: 'display' })}>○</span>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginTop: '16px',
          })}>
            New Moon · Cycle 1
          </span>
        </div>

        {/* Daylight */}
        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
          <span className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 3.2vw, 52px)',
            fontWeight: 'semibold',
            color: 'accent',
            lineHeight: 'snug',
          })}>14.7</span>
          <span className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: 'medium',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginTop: '8px',
          })}>
            Hours of Daylight
          </span>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            marginTop: '4px',
          })}>
            4:48 → 19:32
          </span>
        </div>

        {/* Golf */}
        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
          <span className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: 'medium',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'text',
          })}>Bud Cauley</span>
          <span className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 3.2vw, 48px)',
            fontWeight: 'semibold',
            color: 'accent',
            lineHeight: 'snug',
            marginTop: '4px',
          })}>−17</span>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            marginTop: '4px',
          })}>
            RBC Canadian Open · Final
          </span>
        </div>
      </div>

      <p className={css({
        fontFamily: 'body',
        fontSize: '12px',
        color: 'textSecondary',
        marginTop: '64px',
      })}>
        ○ Juneteenth in 4 days
      </p>
    </section>
  )
}

/* ─── WORK ─── */
function WorkFold() {
  return (
    <section id="work" className={css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '96px',
      paddingBottom: '96px',
      borderTop: '1px solid',
      borderColor: 'border',
    })}>
      {/* Featured */}
      {featuredProject && (
        <div className={css({ marginBottom: '64px' })}>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            display: 'block',
            marginBottom: '16px',
          })}>Featured</span>
          <a
            href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            className={css({
              textDecoration: 'none',
              display: 'block',
              _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            <div className={css({
              background: 'bgCard',
              borderRadius: 'md',
              border: '1px solid',
              borderColor: 'border',
              padding: 'clamp(32px, 4vw, 64px)',
              transition: 'transform 0.1s ease, box-shadow 0.15s ease',
              boxShadow: '0 1px 4px rgba(26,26,20,0.07)',
              _hover: { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(26,26,20,0.1)' },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                _hover: { transform: 'none' },
              },
            })}>
              <h2 className={css({
                fontFamily: 'display',
                fontSize: 'clamp(28px, 3vw, 48px)',
                fontWeight: 'bold',
                lineHeight: 'snug',
                color: 'text',
              })}>{featuredProject.title}</h2>
              <p className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textSecondary',
                marginTop: '16px',
                maxWidth: '65ch',
              })}>{featuredProject.problem}</p>
              <div className={css({
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginTop: '24px',
              })}>
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                })}>{featuredProject.type} · {featuredProject.year}</span>
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  fontWeight: 'medium',
                  color: 'accent',
                })}>View project →</span>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Selected Work */}
      <div className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '48px',
        '@media (max-width: 640px)': {
          gridTemplateColumns: '1fr',
          gap: '32px',
        },
      })}>
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={css({
              textDecoration: 'none',
              display: 'block',
              _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            <div className={css({
              background: 'bgCard',
              borderRadius: 'md',
              border: '1px solid',
              borderColor: 'border',
              padding: '32px',
              boxShadow: '0 1px 4px rgba(26,26,20,0.07)',
              transition: 'transform 0.1s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              _hover: { transform: 'translateY(-2px)' },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                _hover: { transform: 'none' },
              },
            })}>
              <div className={css({
                width: '3px',
                height: '24px',
                background: 'accent',
                borderRadius: 'sm',
                marginBottom: '16px',
              })} />
              <h3 className={css({
                fontFamily: 'display',
                fontSize: '20px',
                fontWeight: 'semibold',
                lineHeight: 'snug',
                color: 'text',
              })}>{project.title}</h3>
              <p className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                marginTop: '8px',
                lineHeight: 'normal',
                flex: 1,
              })}>{project.problem || project.description}</p>
              <span className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginTop: '16px',
              })}>{project.type} · {project.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── EXPERIMENTS ─── */
function ExperimentsFold() {
  return (
    <section className={css({
      paddingTop: '64px',
      paddingBottom: '96px',
      borderTop: '1px solid',
      borderColor: 'border',
    })}>
      <span className={css({
        fontFamily: 'body',
        fontSize: '11px',
        fontWeight: 'medium',
        letterSpacing: 'wider',
        textTransform: 'uppercase',
        color: 'textMuted',
        display: 'block',
        marginBottom: '32px',
      })}>Experiments</span>

      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      })}>
        {experiments.map((exp) => (
          <a
            key={exp.slug}
            href={exp.externalUrl || `/work/${exp.slug}`}
            className={css({
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '20px 0',
              borderBottom: '1px solid',
              borderColor: 'border',
              transition: 'color 0.15s ease',
              _hover: { color: 'accent' },
              _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              flexWrap: 'wrap',
            })}
          >
            <span className={css({
              fontFamily: 'display',
              fontSize: '18px',
              fontWeight: 'semibold',
              color: 'text',
            })}>{exp.title}</span>
            <span className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              whiteSpace: 'nowrap',
            })}>{exp.type} · {exp.year}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function FooterFold() {
  return (
    <footer className={css({
      paddingTop: '48px',
      paddingBottom: '48px',
      borderTop: '1px solid',
      borderColor: 'border',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap',
      gap: '16px',
    })}>
      <p className={css({
        fontFamily: 'body',
        fontSize: '12px',
        color: 'textMuted',
      })}>
        ↪ Currently: Guided by Voices, My Morning Jacket
      </p>
      <div className={css({
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
      })}>
        <a href="/archive" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          textDecoration: 'none',
          _hover: { color: 'accent' },
          _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>Archive</a>
        <span className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
        })}>Product Designer & Developer</span>
      </div>
    </footer>
  )
}