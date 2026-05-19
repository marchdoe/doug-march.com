import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Hero band */}
      <section
        className={css({
          position: 'relative',
          width: '100%',
          padding: '160px 6vw 80px',
          background: '{colors.stone.50}',
        })}
      >
        <Sidebar />
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 8vw, 120px)',
            lineHeight: '0.92',
            fontWeight: 'bold',
            color: '{colors.stone.900}',
            textTransform: 'uppercase',
            marginBottom: '32px',
          })}
        >
          About
        </h1>
        <div
          className={css({
            width: '40px',
            height: '2px',
            background: '{colors.teal.400}',
            marginBottom: '24px',
          })}
        />
        <p
          className={css({
            fontFamily: 'body',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            lineHeight: '1.6',
            color: '{colors.stone.700}',
            maxWidth: '65ch',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Signal strip */}
      <div
        className={css({
          width: '100%',
          padding: '20px 6vw',
          background: '{colors.teal.800}',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        })}
      >
        <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.100}' })}>
          {identity.name}
        </span>
        <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.300}' })}>
          {identity.role}
        </span>
      </div>

      {/* Timeline band */}
      <section
        className={css({
          width: '100%',
          padding: '96px 6vw',
          background: '{colors.stone.50}',
        })}
      >
        <div
          className={css({
            borderTop: '2px solid',
            borderColor: '{colors.teal.400}',
            paddingTop: '24px',
            marginBottom: '48px',
          })}
        >
          <span
            className={css({
              fontSize: '13px',
              letterSpacing: '0.1em',
              fontWeight: 'semibold',
              color: '{colors.stone.500}',
              textTransform: 'uppercase',
              fontFamily: 'body',
            })}
          >
            Experience
          </span>
        </div>

        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '8px',
                padding: '24px 0',
                borderBottom: '1px solid',
                borderColor: '{colors.stone.200}',
                md: {
                  gridTemplateColumns: '140px 200px 1fr',
                  gap: '32px',
                  alignItems: 'baseline',
                },
              })}
            >
              <span
                className={css({
                  fontSize: '14px',
                  fontVariantNumeric: 'tabular-nums',
                  color: '{colors.stone.500}',
                  fontFamily: 'mono',
                  whiteSpace: 'nowrap',
                  minWidth: '140px',
                })}
              >
                {entry.year}
              </span>
              <div>
                <span
                  className={css({
                    fontSize: '16px',
                    fontWeight: 'semibold',
                    color: '{colors.stone.900}',
                    fontFamily: 'body',
                    display: 'block',
                  })}
                >
                  {entry.role}
                </span>
                <span
                  className={css({
                    fontSize: '14px',
                    color: '{colors.teal.600}',
                    fontFamily: 'body',
                    fontWeight: 'medium',
                  })}
                >
                  {entry.company}
                </span>
              </div>
              <p
                className={css({
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '{colors.stone.600}',
                  fontFamily: 'body',
                  maxWidth: '55ch',
                })}
              >
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities band */}
      <section
        className={css({
          width: '100%',
          padding: '80px 6vw',
          background: '{colors.stone.100}',
        })}
      >
        <span
          className={css({
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 'semibold',
            color: '{colors.stone.500}',
            textTransform: 'uppercase',
            fontFamily: 'body',
            display: 'block',
            marginBottom: '32px',
          })}
        >
          Capabilities
        </span>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0',
          })}
        >
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className={css({
                padding: '14px 0',
                borderBottom: '1px solid',
                borderColor: '{colors.stone.200}',
                fontSize: '16px',
                fontFamily: 'body',
                color: '{colors.stone.900}',
              })}
            >
              {cap}
            </div>
          ))}
        </div>
      </section>

      {/* Education band */}
      <section
        className={css({
          width: '100%',
          padding: '80px 6vw',
          background: '{colors.stone.50}',
        })}
      >
        <span
          className={css({
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 'semibold',
            color: '{colors.stone.500}',
            textTransform: 'uppercase',
            fontFamily: 'body',
            display: 'block',
            marginBottom: '32px',
          })}
        >
          Education
        </span>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '8px',
            md: { gridTemplateColumns: '140px 1fr', gap: '32px' },
          })}
        >
          <span
            className={css({
              fontSize: '14px',
              fontVariantNumeric: 'tabular-nums',
              color: '{colors.stone.500}',
              fontFamily: 'mono',
              minWidth: '140px',
            })}
          >
            {education.years}
          </span>
          <div>
            <span
              className={css({
                fontSize: '16px',
                fontWeight: 'semibold',
                color: '{colors.stone.900}',
                fontFamily: 'body',
                display: 'block',
              })}
            >
              {education.school}
            </span>
            <span
              className={css({
                fontSize: '16px',
                color: '{colors.stone.600}',
                fontFamily: 'body',
              })}
            >
              {education.degree} — {education.concentration}
            </span>
          </div>
        </div>
      </section>

      {/* Personal band */}
      <section
        className={css({
          width: '100%',
          padding: '64px 6vw 48px',
          background: '{colors.teal.800}',
          color: '{colors.teal.100}',
        })}
      >
        <span
          className={css({
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 'semibold',
            color: '{colors.teal.400}',
            textTransform: 'uppercase',
            fontFamily: 'body',
            display: 'block',
            marginBottom: '32px',
          })}
        >
          Personal
        </span>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          })}
        >
          <div>
            <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.400}', textTransform: 'uppercase', fontFamily: 'body', display: 'block', marginBottom: '8px' })}>
              Holes in One
            </span>
            <span className={css({ fontSize: '48px', fontFamily: 'display', fontWeight: 'bold', color: '{colors.teal.300}', lineHeight: '1' })}>
              {personal.holesInOne}
            </span>
          </div>
          <div>
            <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.400}', textTransform: 'uppercase', fontFamily: 'body', display: 'block', marginBottom: '8px' })}>
              Sport
            </span>
            <span className={css({ fontSize: '18px', fontFamily: 'body', color: '{colors.teal.100}' })}>
              {personal.sport}
            </span>
          </div>
          <div>
            <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.400}', textTransform: 'uppercase', fontFamily: 'body', display: 'block', marginBottom: '8px' })}>
              Teams
            </span>
            <span className={css({ fontSize: '18px', fontFamily: 'body', color: '{colors.teal.100}' })}>
              {personal.teams.join(', ')}
            </span>
          </div>
          <div>
            <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.400}', textTransform: 'uppercase', fontFamily: 'body', display: 'block', marginBottom: '8px' })}>
              Current Focus
            </span>
            <span className={css({ fontSize: '18px', fontFamily: 'body', color: '{colors.teal.100}' })}>
              {personal.currentFocus}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className={css({
            marginTop: '64px',
            paddingTop: '24px',
            borderTop: '1px solid',
            borderColor: 'rgba(56, 190, 165, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          })}
        >
          <span className={css({ fontSize: '13px', letterSpacing: '0.06em', color: '{colors.teal.400}', fontFamily: 'body' })}>
            © 2026 Doug March
          </span>
          <a
            href="/archive"
            className={css({
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '{colors.teal.400}',
              fontFamily: 'body',
              textDecoration: 'none',
              _hover: { color: '{colors.teal.200}', textDecoration: 'underline' },
              '&:focus-visible': { outline: '2px solid', outlineColor: '{colors.teal.400}', outlineOffset: '4px' },
            })}
          >
            Archive
          </a>
        </div>
      </section>
    </>
  )
}