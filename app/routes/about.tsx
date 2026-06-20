import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '2px',
        width: '100vw',
        minHeight: '100vh',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '0',
        },
      })}
    >
      {/* Identity block */}
      <div
        className={css({
          gridColumn: '1 / 8',
          padding: '6vw',
          background: 'bg',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '50vh',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '48px 24px 32px',
            minHeight: 'auto',
          },
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 8vw, 120px)',
            lineHeight: 'tight',
            letterSpacing: '-0.03em',
            color: 'accent',
            marginBottom: '32px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '18px',
            lineHeight: 'normal',
            color: 'textSecondary',
            maxWidth: '55ch',
          })}
        >
          {identity.statement}
        </p>
      </div>

      {/* Personal block */}
      <div
        className={css({
          gridColumn: '8 / 13',
          padding: '48px 28px',
          background: 'bgCard',
          borderTop: '2px solid',
          borderColor: 'borderAccent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '32px 24px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
          })}
        >
          PERSONAL
        </p>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wide', textTransform: 'uppercase', marginBottom: '4px' })}>
              HOLES IN ONE
            </p>
            <p className={css({ fontFamily: 'display', fontSize: '48px', lineHeight: 'tight', color: 'accent' })}>
              {personal.holesInOne}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wide', textTransform: 'uppercase', marginBottom: '4px' })}>
              SPORT
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.sport}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wide', textTransform: 'uppercase', marginBottom: '4px' })}>
              TEAMS
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.teams.join(' · ')}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wide', textTransform: 'uppercase', marginBottom: '4px' })}>
              CURRENT FOCUS
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'textSecondary', lineHeight: 'normal' })}>
              {personal.currentFocus}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline block */}
      <div
        className={css({
          gridColumn: '1 / 9',
          padding: '48px 6vw 64px',
          background: 'bg',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '32px 24px 48px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderTop: '2px solid',
            borderColor: 'borderAccent',
            paddingTop: '16px',
          })}
        >
          TIMELINE
        </p>
        {timeline.map((entry, i) => (
          <div
            key={i}
            className={css({
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              gap: '24px',
              padding: '14px 0',
              borderBottom: '1px solid',
              borderColor: 'border',
              alignItems: 'baseline',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '4px',
              },
            })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textMuted',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '120px',
              })}
            >
              {entry.year}
            </span>
            <div>
              <p className={css({ fontFamily: 'body', fontSize: '16px', fontWeight: 'medium', color: 'text' })}>
                {entry.role}
                <span className={css({ color: 'textMuted', fontWeight: 'normal' })}> — {entry.company}</span>
              </p>
              <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary', lineHeight: 'normal', marginTop: '4px', maxWidth: '60ch' })}>
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities + Education block */}
      <div
        className={css({
          gridColumn: '9 / 13',
          padding: '48px 28px 64px',
          background: 'bgCard',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '32px 24px 48px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
            borderTop: '2px solid',
            borderColor: 'borderAccent',
            paddingTop: '16px',
          })}
        >
          CAPABILITIES
        </p>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' })}>
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
              })}
            >
              {cap}
            </span>
          ))}
        </div>

        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
          })}
        >
          EDUCATION
        </p>
        <p className={css({ fontFamily: 'body', fontSize: '16px', fontWeight: 'medium', color: 'text' })}>
          {education.school}
        </p>
        <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary', marginTop: '4px' })}>
          {education.degree}, {education.concentration}
        </p>
        <p className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted', marginTop: '4px' })}>
          {education.years}
        </p>
      </div>

      {/* Footer */}
      <div
        className={css({
          gridColumn: '1 / -1',
          padding: '24px 6vw',
          background: 'bgCard',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            padding: '24px',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-start',
          },
        })}
      >
        <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted' })}>
          © 2026 Doug March
        </p>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </div>
    </div>
  )
}