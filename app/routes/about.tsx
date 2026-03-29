import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/about')({ component: AboutPage })

const label = css({
  display: 'block',
  fontFamily: 'body',
  fontWeight: '500',
  fontSize: '2xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

const bodyBase = css({
  fontFamily: 'body',
  fontWeight: '300',
  fontSize: 'base',
  color: 'text-secondary',
  letterSpacing: 'wide',
  lineHeight: 'normal',
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

function AboutPage() {
  return (
    <div style={{ backgroundColor: '#171714' }}>

      {/* ── Hero / Identity ── */}
      <section
        style={{
          minHeight: '60vh',
          backgroundColor: '#0D0D0A',
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
              marginBottom: '16px',
            })}
          >
            {identity.name}
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
              marginBottom: '48px',
            })}
          >
            {identity.role}
          </p>
          <p
            className={css({
              fontFamily: 'heading',
              fontStyle: 'italic',
              fontSize: 'lg',
              color: 'text-primary',
              letterSpacing: 'normal',
              lineHeight: 'snug',
              maxWidth: '620px',
            })}
          >
            {identity.statement}
          </p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        style={{
          padding: '96px 48px',
          backgroundColor: '#171714',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <SectionRule>Experience</SectionRule>
          {timeline.map((entry, i) => (
            <div
              key={`${entry.year}-${entry.company}-${i}`}
              style={{
                display: 'flex',
                gap: '32px',
                paddingTop: '28px',
                paddingBottom: '28px',
                borderBottom: '1px solid #3A3933',
              }}
            >
              <div
                style={{
                  minWidth: '128px',
                  flexShrink: 0,
                }}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: 'xs',
                    color: 'text-muted',
                    letterSpacing: 'wide',
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {entry.year}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '4px',
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
                    {entry.role}
                  </span>
                  {entry.current && (
                    <span
                      className={css({
                        fontFamily: 'body',
                        fontWeight: '500',
                        fontSize: '2xs',
                        color: 'sage',
                        letterSpacing: 'widest',
                        textTransform: 'uppercase',
                        flexShrink: 0,
                      })}
                    >
                      Current
                    </span>
                  )}
                </div>
                <span
                  className={css({
                    display: 'block',
                    fontFamily: 'body',
                    fontWeight: '300',
                    fontSize: 'sm',
                    color: 'text-secondary',
                    letterSpacing: 'wide',
                    marginBottom: '8px',
                  })}
                >
                  {entry.company}
                </span>
                <p className={bodySmMuted}>{entry.description}</p>
              </div>
            </div>
          ))}

          {/* Education row */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              paddingTop: '28px',
              paddingBottom: '28px',
            }}
          >
            <div style={{ minWidth: '128px', flexShrink: 0 }}>
              <span
                className={css({
                  fontFamily: 'body',
                  fontWeight: '300',
                  fontSize: 'xs',
                  color: 'text-muted',
                  letterSpacing: 'wide',
                  fontVariantNumeric: 'tabular-nums',
                })}
              >
                {education.years}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <span
                className={css({
                  display: 'block',
                  fontFamily: 'body',
                  fontWeight: '400',
                  fontSize: 'base',
                  color: 'text-primary',
                  letterSpacing: 'wide',
                  marginBottom: '4px',
                })}
              >
                {education.degree}
              </span>
              <span
                className={css({
                  display: 'block',
                  fontFamily: 'body',
                  fontWeight: '300',
                  fontSize: 'sm',
                  color: 'text-secondary',
                  letterSpacing: 'wide',
                  marginBottom: '4px',
                })}
              >
                {education.school}
              </span>
              {education.concentration && (
                <span className={bodySmMuted}>{education.concentration}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section
        style={{
          padding: '96px 48px',
          backgroundColor: '#171714',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <SectionRule>Capabilities</SectionRule>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {capabilities.map((cap) => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontWeight: '300',
                  fontSize: 'xs',
                  color: 'text-muted',
                  letterSpacing: 'wide',
                  border: '1px solid',
                  borderColor: 'border',
                  padding: '6px 12px',
                  borderRadius: '2px',
                })}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personal ── */}
      <section
        style={{
          padding: '96px 48px',
          backgroundColor: '#0D0D0A',
          borderTop: '1px solid #3A3933',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <SectionRule>Outside the Work</SectionRule>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '48px',
            }}
          >
            <div>
              <span className={label} style={{ marginBottom: '12px', display: 'block' }}>
                Sport
              </span>
              <p className={bodyBase}>{personal.sport}</p>
            </div>
            <div>
              <span className={label} style={{ marginBottom: '12px', display: 'block' }}>
                Holes in One
              </span>
              <p
                className={css({
                  fontFamily: 'heading',
                  fontSize: 'xl',
                  letterSpacing: 'tight',
                  lineHeight: 'tight',
                  color: 'text-primary',
                })}
              >
                {personal.holesInOne}
              </p>
            </div>
            <div>
              <span className={label} style={{ marginBottom: '12px', display: 'block' }}>
                Teams
              </span>
              {personal.teams.map((team) => (
                <p key={team} className={bodyBase} style={{ marginBottom: '4px' }}>
                  {team}
                </p>
              ))}
            </div>
            <div>
              <span className={label} style={{ marginBottom: '12px', display: 'block' }}>
                Current Focus
              </span>
              <p className={bodyBase}>{personal.currentFocus}</p>
            </div>
          </div>
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
          <span className={bodyXsMuted}>Doug March · 2026</span>
          <span className={bodyXsMuted}>
            <a
              href="/archive"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              archive
            </a>
          </span>
        </div>
      </footer>

    </div>
  )
}