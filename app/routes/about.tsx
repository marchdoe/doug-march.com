import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import logoSvg from '../assets/logo.svg'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
        width: '100%',
        '@media (min-width: 768px)': {
          gridTemplateColumns: '45fr 55fr',
        },
      })}
    >
      {/* LEFT PANEL */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 24px',
          background: '#060B02',
          minHeight: '50vh',
          position: 'relative',
          '@media (min-width: 768px)': {
            padding: '80px 52px',
            minHeight: '100vh',
            position: 'sticky',
            top: '0',
          },
        })}
      >
        {/* Logo */}
        <a
          href="/"
          className={css({
            position: 'absolute',
            top: '28px',
            left: '24px',
            '@media (min-width: 768px)': {
              top: '48px',
              left: '52px',
            },
          })}
          aria-label="Home"
        >
          <img src={logoSvg} alt="Doug March logo" width={28} height={28} />
        </a>

        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          })}
        >
          <h1
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: '0.88',
              letterSpacing: '0.01em',
              color: '#7AFF18',
              textTransform: 'uppercase',
            })}
          >
            {identity.name}
          </h1>
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#65A038',
              textTransform: 'uppercase',
              lineHeight: '1.1',
            })}
          >
            {identity.role}
          </span>
          <p
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#B8E090',
              maxWidth: '45ch',
              marginTop: '16px',
            })}
          >
            {identity.statement}
          </p>
        </div>

        {/* Nav */}
        <div className={css({ display: 'flex', gap: '24px', marginTop: '32px' })}>
          <a
            href="/"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8EC864',
              textDecoration: 'none',
              padding: '10px 0',
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7AFF18',
              textDecoration: 'none',
              padding: '10px 0',
            })}
          >
            About
          </a>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 24px',
          background: '#0D1404',
          borderLeft: 'none',
          '@media (min-width: 768px)': {
            padding: '64px 52px',
            borderLeft: '1px solid #182505',
          },
        })}
      >
        {/* TIMELINE */}
        <div className={css({ marginBottom: '48px' })}>
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#7AFF18',
              textTransform: 'uppercase',
              lineHeight: '1.1',
              display: 'block',
              marginBottom: '24px',
            })}
          >
            Timeline
          </span>

          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '16px',
                padding: '14px 0',
                borderBottom: '1px solid #182505',
                alignItems: 'baseline',
                '@media (max-width: 480px)': {
                  gridTemplateColumns: '1fr',
                  gap: '4px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '13px',
                  color: '#65A038',
                  whiteSpace: 'nowrap',
                  minWidth: '120px',
                })}
              >
                {entry.year}
              </span>
              <div>
                <span
                  className={css({
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '16px',
                    color: '#E6F9D2',
                    lineHeight: '1.5',
                  })}
                >
                  {entry.role}
                </span>
                <span
                  className={css({
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '13px',
                    color: '#65A038',
                    marginLeft: '8px',
                  })}
                >
                  {entry.company}
                </span>
                <p
                  className={css({
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '14px',
                    color: '#B8E090',
                    lineHeight: '1.5',
                    marginTop: '4px',
                    maxWidth: '55ch',
                  })}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hairline */}
        <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />

        {/* CAPABILITIES */}
        <div className={css({ marginBottom: '48px' })}>
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#7AFF18',
              textTransform: 'uppercase',
              lineHeight: '1.1',
              display: 'block',
              marginBottom: '20px',
            })}
          >
            Capabilities
          </span>
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 16px',
            })}
          >
            {capabilities.map((cap, i) => (
              <span
                key={i}
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '14px',
                  color: '#B8E090',
                  lineHeight: '1.5',
                  padding: '4px 0',
                  borderBottom: '1px solid #182505',
                })}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Hairline */}
        <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />

        {/* EDUCATION */}
        <div className={css({ marginBottom: '48px' })}>
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#7AFF18',
              textTransform: 'uppercase',
              lineHeight: '1.1',
              display: 'block',
              marginBottom: '20px',
            })}
          >
            Education
          </span>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
            <span
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '16px',
                color: '#E6F9D2',
                lineHeight: '1.5',
              })}
            >
              {education.school}
            </span>
            <span
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '14px',
                color: '#B8E090',
                lineHeight: '1.5',
              })}
            >
              {education.degree} · {education.concentration}
            </span>
            <span
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '13px',
                color: '#65A038',
              })}
            >
              {education.years}
            </span>
          </div>
        </div>

        {/* Hairline */}
        <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />

        {/* PERSONAL */}
        <div className={css({ marginBottom: '48px' })}>
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#7AFF18',
              textTransform: 'uppercase',
              lineHeight: '1.1',
              display: 'block',
              marginBottom: '20px',
            })}
          >
            Personal
          </span>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
            <div className={css({ display: 'flex', gap: '12px', alignItems: 'baseline' })}>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#65A038',
                  textTransform: 'uppercase',
                })}
              >
                Holes in One
              </span>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '22px',
                  letterSpacing: '0.04em',
                  color: '#7AFF18',
                })}
              >
                {personal.holesInOne}
              </span>
            </div>
            <div className={css({ display: 'flex', gap: '12px', alignItems: 'baseline' })}>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#65A038',
                  textTransform: 'uppercase',
                })}
              >
                Sport
              </span>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '16px',
                  color: '#E6F9D2',
                })}
              >
                {personal.sport}
              </span>
            </div>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#65A038',
                  textTransform: 'uppercase',
                })}
              >
                Teams
              </span>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '16px',
                  color: '#E6F9D2',
                  lineHeight: '1.5',
                })}
              >
                {personal.teams.join(' · ')}
              </span>
            </div>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#65A038',
                  textTransform: 'uppercase',
                })}
              >
                Current Focus
              </span>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '16px',
                  color: '#E6F9D2',
                  lineHeight: '1.5',
                  maxWidth: '55ch',
                })}
              >
                {personal.currentFocus}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css({ marginTop: 'auto', paddingTop: '32px' })}>
          <a
            href="/archive"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#547828',
              textDecoration: 'none',
              textTransform: 'uppercase',
            })}
          >
            Archive
          </a>
        </div>
      </div>
    </div>
  )
}