import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function SectionHeader({ label }: { label: string }) {
  return (
    <div
      className={css({
        fontFamily: 'body',
        fontSize: '11px',
        fontWeight: 'medium',
        letterSpacing: 'widest',
        color: 'accent',
        textTransform: 'uppercase',
        padding: '12px 0',
        borderBottom: '1px solid',
        borderColor: 'border',
      })}
    >
      {label}
    </div>
  )
}

function AboutPage() {
  return (
    <>
      {/* Identity Hero */}
      <section
        className={css({
          paddingTop: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid',
          borderColor: 'borderAccent',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 6vw, 88px)',
            lineHeight: 'tight',
            letterSpacing: '0.02em',
            color: 'text',
            textTransform: 'uppercase',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.14em',
            color: 'accent',
            textTransform: 'uppercase',
            marginTop: '8px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: 'normal',
            color: 'textSecondary',
            marginTop: '24px',
            maxWidth: '65ch',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Two column layout: Timeline + Details */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr',
          md: { gridTemplateColumns: '60fr 40fr' },
          gap: '0',
        })}
      >
        {/* Timeline */}
        <div
          className={css({
            md: {
              borderRight: '1px solid',
              borderColor: 'border',
              paddingRight: '16px',
            },
          })}
        >
          <SectionHeader label="TIMELINE" />
          {timeline.map((entry, i) => (
            <div
              key={`${entry.year}-${i}`}
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                padding: '10px 0',
                borderBottom: '0.5px solid',
                borderColor: 'border',
                gap: '0',
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  color: 'textMuted',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: '120px',
                  flexShrink: 0,
                  flexBasis: '120px',
                })}
              >
                {entry.year}
              </span>
              <div className={css({ flex: '1' })}>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'text',
                  })}
                >
                  {entry.role}
                </span>
                <span className={css({ color: 'textMuted', fontSize: '14px' })}> · </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textSecondary',
                  })}
                >
                  {entry.company}
                </span>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    color: 'textSecondary',
                    lineHeight: 'normal',
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

        {/* Right column: Capabilities, Education, Personal */}
        <div
          className={css({
            md: { paddingLeft: '16px' },
            marginTop: '24px',
            md: { marginTop: '0' },
          })}
        >
          <SectionHeader label="CAPABILITIES" />
          <div className={css({ padding: '12px 0', borderBottom: '0.5px solid', borderColor: 'border' })}>
            {capabilities.map((cap, i) => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  color: 'textSecondary',
                  letterSpacing: 'wide',
                  lineHeight: 'loose',
                })}
              >
                {cap}
                {i < capabilities.length - 1 && (
                  <span className={css({ color: 'textMuted' })}> · </span>
                )}
              </span>
            ))}
          </div>

          <SectionHeader label="EDUCATION" />
          <div
            className={css({
              padding: '10px 0',
              borderBottom: '0.5px solid',
              borderColor: 'border',
            })}
          >
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'text' })}>
              {education.school}
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', marginTop: '4px' })}>
              {education.degree} — {education.concentration}
            </p>
            <p className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', marginTop: '4px' })}>
              {education.years}
            </p>
          </div>

          <SectionHeader label="PERSONAL" />
          <div className={css({ padding: '10px 0' })}>
            <div
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                padding: '6px 0',
                borderBottom: '0.5px solid',
                borderColor: 'border',
              })}
            >
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted', minWidth: '120px' })}>
                HOLES IN ONE
              </span>
              <span className={css({ fontFamily: 'body', fontSize: '14px', color: 'text' })}>
                {personal.holesInOne}
              </span>
            </div>
            <div
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                padding: '6px 0',
                borderBottom: '0.5px solid',
                borderColor: 'border',
              })}
            >
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted', minWidth: '120px' })}>
                SPORT
              </span>
              <span className={css({ fontFamily: 'body', fontSize: '14px', color: 'text' })}>
                {personal.sport}
              </span>
            </div>
            <div
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                padding: '6px 0',
                borderBottom: '0.5px solid',
                borderColor: 'border',
              })}
            >
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted', minWidth: '120px' })}>
                TEAMS
              </span>
              <span className={css({ fontFamily: 'body', fontSize: '14px', color: 'text' })}>
                {personal.teams.join(', ')}
              </span>
            </div>
            <div
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                padding: '6px 0',
                borderBottom: '0.5px solid',
                borderColor: 'border',
              })}
            >
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted', minWidth: '120px' })}>
                CURRENT FOCUS
              </span>
              <span className={css({ fontFamily: 'body', fontSize: '14px', color: 'text' })}>
                {personal.currentFocus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}