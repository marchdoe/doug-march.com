import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const allProjects = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments,
  ]

  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: '3fr 2fr',
      gap: '16px',
      padding: '0 16px 16px 16px',
      minHeight: 'calc(100vh - 52px)',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '12px',
        padding: '0 12px 12px 12px',
      },
    })}>
      {/* Hero Block — Left Column */}
      <div className={css({
        gridColumn: '1',
        gridRow: '1 / span 3',
        minHeight: 'calc(100vh - 68px)',
        background: 'bgHero',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 6vw',
        '@media (max-width: 768px)': {
          gridColumn: '1',
          gridRow: 'auto',
          minHeight: '70vh',
          padding: '48px 24px',
        },
      })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(48px, 7.5vw, 108px)',
          fontWeight: 'bold',
          lineHeight: '0.88',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'textOnHero',
          textWrap: 'balance',
          '@media (max-width: 768px)': {
            fontSize: 'clamp(36px, 10vw, 64px)',
          },
        })}>
          DO NOT WAIT FOR LEADERS; DO IT ALONE, PERSON TO PERSON.
        </h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '14px',
          fontWeight: 'light',
          color: 'textOnHero',
          marginTop: '32px',
          letterSpacing: '0.02em',
        })}>
          — Mother Teresa
        </p>
      </div>

      {/* Signal Block — Top Right */}
      <div className={css({
        gridColumn: '2',
        gridRow: '1',
        background: 'bgSignal',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        '@media (max-width: 768px)': {
          gridColumn: '1',
          gridRow: 'auto',
          padding: '24px 20px',
        },
      })}>
        <div className={css({
          fontFamily: 'body',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '4px',
        })}>
          SIGNAL · TODAY
        </div>

        {/* Golf Leaderboard */}
        <div>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '12px',
          })}>
            CJ CUP BYRON NELSON
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' })}>
              <span className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                fontWeight: 'medium',
              })}>
                SI WOO KIM
              </span>
              <span className={css({
                fontFamily: 'display',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'accentBright',
              })}>
                −21
              </span>
            </div>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' })}>
              <span className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textMuted',
              })}>
                SCHEFFLER
              </span>
              <span className={css({
                fontFamily: 'display',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'textSecondary',
              })}>
                −19
              </span>
            </div>
          </div>
        </div>

        {/* Memorial Day */}
        <div>
          <span className={css({
            display: 'inline-block',
            background: 'bgHero',
            color: 'textOnHero',
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: '0.1em',
            padding: '6px 12px',
            fontWeight: 'medium',
          })}>
            MEMORIAL DAY TOMORROW
          </span>
        </div>

        {/* Moon & Daylight */}
        <div className={css({
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap',
        })}>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          })}>
            <span className={css({ color: 'accent', fontSize: '16px' })}>◑</span>
            FIRST QUARTER · 61%
          </span>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            letterSpacing: '0.05em',
          })}>
            14.4 HRS DAYLIGHT
          </span>
        </div>
      </div>

      {/* Projects Block — Middle Right */}
      <div className={css({
        gridColumn: '2',
        gridRow: '2',
        background: 'bgCard',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 768px)': {
          gridColumn: '1',
          gridRow: 'auto',
          padding: '24px 20px',
        },
      })}>
        <div className={css({
          fontFamily: 'body',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '20px',
        })}>
          WORK
        </div>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
          {allProjects.map((project) => {
            const href = project.depth === 'full'
              ? `/work/${project.slug}`
              : (project.externalUrl || `/work/${project.slug}`)
            return (
              <a
                key={project.slug}
                href={href}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '10px 0',
                  textDecoration: 'none',
                  borderBottom: '1px solid',
                  borderColor: 'borderSubtle',
                  transition: 'color 0.15s ease',
                  _hover: {
                    textDecoration: 'none',
                    '& .project-title': {
                      color: '{colors.pure.white}',
                    },
                    '& .project-type': {
                      color: 'accentBright',
                    },
                  },
                  _focus: {
                    outline: '2px solid',
                    outlineColor: 'accent',
                    outlineOffset: '2px',
                  },
                })}
              >
                <div className={css({ display: 'flex', alignItems: 'baseline', gap: '12px' })}>
                  <span className={`project-title ${css({
                    fontFamily: 'body',
                    fontSize: '15px',
                    fontWeight: 'medium',
                    color: 'text',
                    transition: 'color 0.15s ease',
                  })}`}>
                    {project.title}
                  </span>
                  <span className={`project-type ${css({
                    fontFamily: 'body',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'accent',
                    transition: 'color 0.15s ease',
                  })}`}>
                    {project.type}
                  </span>
                </div>
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  color: 'textMuted',
                  flexShrink: 0,
                })}>
                  {project.year}
                </span>
              </a>
            )
          })}
        </div>
      </div>

      {/* About Block — Bottom Right */}
      <div className={css({
        gridColumn: '2',
        gridRow: '3',
        background: 'bg',
        border: '1px solid',
        borderColor: 'border',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '20px',
        '@media (max-width: 768px)': {
          gridColumn: '1',
          gridRow: 'auto',
          padding: '24px 20px',
        },
      })}>
        <div>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '12px',
          })}>
            ABOUT
          </div>
          <p className={css({
            fontFamily: 'body',
            fontSize: '13px',
            lineHeight: '1.5',
            color: 'textSecondary',
            maxWidth: '50ch',
          })}>
            Product Designer & Developer building tools at the intersection of design and engineering. Solo-founded projects from concept to launch.
          </p>
        </div>

        <div className={css({
          fontFamily: 'body',
          fontSize: '11px',
          color: 'textMuted',
          letterSpacing: '0.05em',
          lineHeight: '1.6',
        })}>
          Design Systems · Product Strategy · React · TypeScript · Node · UI/UX · Prototyping
        </div>

        <div>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            color: '{colors.stone.500}',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          })}>
            MY MORNING JACKET · GUIDED BY VOICES · THE WAR ON DRUGS
          </div>
        </div>

        <div className={css({
          fontFamily: 'body',
          fontSize: '11px',
          color: 'textMuted',
          marginTop: '4px',
        })}>
          <a href="/archive" className={css({
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { textDecoration: 'underline', color: 'textSecondary' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>
            Archive
          </a>
        </div>
      </div>
    </div>
  )
}