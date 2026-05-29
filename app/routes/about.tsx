import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
        '@media (min-width: 768px)': {
          gridTemplateColumns: '45fr 55fr',
        },
      })}
    >
      {/* LEFT — Identity */}
      <div
        className={css({
          background: '{colors.stone.900}',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 24px 32px',
          '@media (min-width: 768px)': {
            padding: '48px 48px 48px 6vw',
            position: 'sticky',
            top: '0',
            height: '100vh',
            overflowY: 'auto',
          },
        })}
      >
        <Sidebar />

        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '32px',
            paddingTop: '32px',
          })}
        >
          <div>
            <h1
              className={css({
                fontFamily: 'display',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                lineHeight: '0.88',
                letterSpacing: '-0.02em',
                color: '{colors.stone.50}',
                fontSize: 'clamp(40px, 5vw, 72px)',
              })}
            >
              {identity.name}
            </h1>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '1rem',
                color: '{colors.lime.400}',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '12px',
              })}
            >
              {identity.role}
            </p>
          </div>

          <p
            className={css({
              fontFamily: 'body',
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '{colors.stone.300}',
              maxWidth: '50ch',
            })}
          >
            {identity.statement}
          </p>

          {/* Capabilities */}
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '{colors.stone.400}',
                display: 'block',
                marginBottom: '12px',
              })}
            >
              Capabilities
            </span>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '6px' })}>
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '0.75rem',
                    color: '{colors.stone.200}',
                    border: '1px solid',
                    borderColor: '{colors.stone.700}',
                    padding: '4px 10px',
                    letterSpacing: '0.05em',
                  })}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Personal */}
          <div
            className={css({
              borderTop: '1px solid',
              borderColor: '{colors.stone.700}',
              paddingTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            })}
          >
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '{colors.stone.400}',
              })}
            >
              Personal
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.stone.300}', lineHeight: '1.6' })}>
              Holes in one: {personal.holesInOne}. Sport: {personal.sport}. Teams: {personal.teams.join(', ')}.
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.stone.300}', lineHeight: '1.6' })}>
              Current focus: {personal.currentFocus}
            </p>
          </div>

          {/* Education */}
          <div
            className={css({
              borderTop: '1px solid',
              borderColor: '{colors.stone.700}',
              paddingTop: '16px',
            })}
          >
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '{colors.stone.400}',
                display: 'block',
                marginBottom: '8px',
              })}
            >
              Education
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.stone.200}', lineHeight: '1.6' })}>
              {education.school}
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.stone.300}', lineHeight: '1.6' })}>
              {education.degree}, {education.concentration}
            </p>
            <p className={css({ fontFamily: 'mono', fontSize: '0.75rem', color: '{colors.stone.400}', letterSpacing: '0.05em' })}>
              {education.years}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — Timeline on lime */}
      <div
        className={css({
          background: '{colors.lime.400}',
          minHeight: '100vh',
          padding: '24px 24px 48px',
          '@media (min-width: 768px)': {
            padding: '48px 6vw 48px 48px',
          },
        })}
      >
        <div className={css({ paddingTop: '64px' })}>
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '{colors.stone.600}',
              display: 'block',
              marginBottom: '24px',
            })}
          >
            Experience
          </span>

          <div className={css({ display: 'flex', flexDirection: 'column', gap: '0' })}>
            {timeline.map((entry, i) => (
              <div
                key={i}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '16px',
                  borderTop: '1px solid rgba(13,18,9,0.2)',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  '@media (max-width: 480px)': {
                    gridTemplateColumns: '1fr',
                    gap: '4px',
                  },
                })}
              >
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '0.75rem',
                    color: '{colors.stone.700}',
                    letterSpacing: '0.05em',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '120px',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {entry.year}
                </span>
                <div>
                  <p
                    className={css({
                      fontFamily: 'body',
                      fontSize: '1rem',
                      fontWeight: 'semibold',
                      color: '{colors.stone.900}',
                      lineHeight: '1.15',
                    })}
                  >
                    {entry.role}
                  </p>
                  <p
                    className={css({
                      fontFamily: 'body',
                      fontSize: '0.875rem',
                      color: '{colors.stone.800}',
                      lineHeight: '1.15',
                      marginTop: '2px',
                    })}
                  >
                    {entry.company}
                  </p>
                  <p
                    className={css({
                      fontFamily: 'body',
                      fontSize: '0.875rem',
                      color: '{colors.stone.700}',
                      lineHeight: '1.6',
                      marginTop: '6px',
                      maxWidth: '55ch',
                    })}
                  >
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={css({
            marginTop: '48px',
            borderTop: '1px solid rgba(13,18,9,0.2)',
            paddingTop: '16px',
          })}
        >
          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              color: '{colors.stone.600}',
              textDecoration: 'none',
              _hover: { color: '{colors.stone.900}', textDecoration: 'underline' },
              _focusVisible: { outline: '2px solid', outlineColor: '{colors.stone.900}', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </div>
      </div>
    </div>
  )
}