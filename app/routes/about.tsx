import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import logoSvg from '../assets/logo.svg'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Nav band */}
      <nav
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 6vw',
          background: 'bg',
          borderBottom: '1px solid {colors.forest.700}',
        })}
      >
        <a
          href="/"
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'text',
            _focus: {
              outline: '2px solid {colors.green.400}',
              outlineOffset: '4px',
              borderRadius: 'sm',
            },
          })}
        >
          <img src={logoSvg} alt="Doug March logo" className={css({ width: '28px', height: '28px' })} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: '0.875rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            })}
          >
            Doug March
          </span>
        </a>
        <div className={css({ display: 'flex', gap: '32px' })}>
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '0.8125rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'textSecondary',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _hover: { color: 'text' },
              _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontSize: '0.8125rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
            })}
          >
            About
          </a>
        </div>
      </nav>

      {/* Identity band */}
      <section
        className={css({
          background: 'bgHero',
          padding: '80px 6vw',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 'bold',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'textInverse',
            textTransform: 'uppercase',
            marginBottom: '24px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '1.125rem',
            fontWeight: 'medium',
            color: 'textInverse',
            opacity: '0.7',
            marginBottom: '16px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '1.0625rem',
            lineHeight: 'normal',
            color: 'textInverse',
            maxWidth: '60ch',
            opacity: '0.85',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Timeline band */}
      <section
        className={css({
          background: 'bg',
          padding: '80px 6vw',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '0.75rem',
            fontWeight: 'medium',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textMuted',
            display: 'block',
            marginBottom: '32px',
          })}
        >
          Experience
        </span>
        <div
          className={css({
            borderTop: '1px solid {colors.forest.700}',
          })}
        >
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '24px',
                padding: '20px 0',
                borderBottom: '1px solid {colors.forest.700}',
                '@media (max-width: 640px)': {
                  gridTemplateColumns: '1fr',
                  gap: '4px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.8125rem',
                  color: 'textMuted',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  minWidth: '120px',
                })}
              >
                {entry.year}
              </span>
              <div>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '1rem',
                    fontWeight: 'medium',
                    color: 'text',
                  })}
                >
                  {entry.role}
                </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '1rem',
                    color: 'textSecondary',
                    marginLeft: '8px',
                  })}
                >
                  — {entry.company}
                </span>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '0.9375rem',
                    lineHeight: 'normal',
                    color: 'textSecondary',
                    marginTop: '4px',
                    maxWidth: '60ch',
                  })}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities + Education band */}
      <section
        className={css({
          background: 'bgAlt',
          padding: '72px 6vw',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '48px',
            },
          })}
        >
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                fontWeight: 'medium',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                marginBottom: '24px',
              })}
            >
              Capabilities
            </span>
            <div
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              })}
            >
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '0.875rem',
                    color: 'textSecondary',
                    padding: '6px 12px',
                    border: '1px solid {colors.forest.700}',
                    borderRadius: 'sm',
                    lineHeight: 'snug',
                  })}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                fontWeight: 'medium',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                marginBottom: '24px',
              })}
            >
              Education
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '1rem',
                fontWeight: 'medium',
                color: 'text',
                marginBottom: '4px',
              })}
            >
              {education.school}
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '0.9375rem',
                color: 'textSecondary',
              })}
            >
              {education.degree}, {education.concentration}
            </p>
            <p
              className={css({
                fontFamily: 'mono',
                fontSize: '0.8125rem',
                color: 'textMuted',
                marginTop: '4px',
              })}
            >
              {education.years}
            </p>
          </div>
        </div>
      </section>

      {/* Personal band */}
      <section
        className={css({
          background: 'bg',
          padding: '72px 6vw',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '0.75rem',
            fontWeight: 'medium',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textMuted',
            display: 'block',
            marginBottom: '24px',
          })}
        >
          Personal
        </span>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          })}
        >
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' })}>
              Holes in One
            </span>
            <span className={css({ fontFamily: 'display', fontSize: '2.5rem', fontWeight: 'bold', color: 'accent', lineHeight: 'tight' })}>
              {personal.holesInOne}
            </span>
          </div>
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' })}>
              Sport
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '1rem', fontWeight: 'medium', color: 'text' })}>
              {personal.sport}
            </span>
          </div>
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' })}>
              Teams
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '1rem', fontWeight: 'medium', color: 'text' })}>
              {personal.teams.join(', ')}
            </span>
          </div>
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' })}>
              Current Focus
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '1rem', fontWeight: 'medium', color: 'text' })}>
              {personal.currentFocus}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={css({
          background: 'bg',
          padding: '32px 6vw',
          borderTop: '1px solid {colors.forest.700}',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        })}
      >
        <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted' })}>
          © 2026 Doug March
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '8px 0',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}