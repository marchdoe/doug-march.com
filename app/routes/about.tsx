import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

      {/* ── Identity header band (dark, echoing home Band 1) ── */}
      <div style={{ background: '#183848', width: '100%' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '56px 48px 64px' }}>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '39px',
              fontWeight: 600,
              color: '#E5EDF1',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '20px',
            }}
          >
            {identity.name}
          </div>
          <div
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              color: '#9DB6C0',
              lineHeight: 1.55,
              maxWidth: '560px',
            }}
          >
            {identity.statement}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ background: '#F2F7F9', width: '100%', flex: 1 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '80px 48px' }}>

          {/* Experience / Timeline */}
          <section style={{ marginBottom: '72px' }}>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#4A9A6C',
                letterSpacing: '0.04em',
                marginBottom: '32px',
              }}
            >
              experience
            </div>

            <div>
              {timeline.map((entry) => (
                <div
                  key={`${entry.year}-${entry.company}`}
                  style={{
                    display: 'flex',
                    gap: '40px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #C8D8DF',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Year — fixed width for alignment */}
                  <div
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '13px',
                      color: '#6B8E9E',
                      minWidth: '120px',
                      flexShrink: 0,
                      paddingTop: '2px',
                    }}
                  >
                    {entry.year}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#183848',
                        marginBottom: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      {entry.role}
                      {entry.current && (
                        <span
                          style={{
                            fontFamily: '"IBM Plex Sans", sans-serif',
                            fontSize: '11px',
                            color: '#4A9A6C',
                            letterSpacing: '0.08em',
                            fontWeight: 400,
                          }}
                        >
                          current
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: '"IBM Plex Sans", sans-serif',
                        fontSize: '13px',
                        color: '#446878',
                        marginBottom: '6px',
                      }}
                    >
                      {entry.company}
                    </div>
                    {entry.description && (
                      <div
                        style={{
                          fontFamily: '"IBM Plex Sans", sans-serif',
                          fontSize: '13px',
                          color: '#6B8E9E',
                          lineHeight: 1.55,
                        }}
                      >
                        {entry.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section style={{ marginBottom: '72px' }}>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#4A9A6C',
                letterSpacing: '0.04em',
                marginBottom: '32px',
              }}
            >
              education
            </div>

            <div
              style={{
                display: 'flex',
                gap: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid #C8D8DF',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '13px',
                  color: '#6B8E9E',
                  minWidth: '120px',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}
              >
                {education.years}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#183848',
                    marginBottom: '2px',
                  }}
                >
                  {education.school}
                </div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '13px',
                    color: '#446878',
                  }}
                >
                  {education.degree} · {education.concentration}
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities */}
          <section style={{ marginBottom: '72px' }}>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#4A9A6C',
                letterSpacing: '0.04em',
                marginBottom: '32px',
              }}
            >
              capabilities
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '13px',
                    color: '#446878',
                    background: '#EAF0F3',
                    border: '1px solid #C8D8DF',
                    borderRadius: '2px',
                    padding: '5px 12px',
                  }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </section>

          {/* Personal */}
          <section>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#4A9A6C',
                letterSpacing: '0.04em',
                marginBottom: '32px',
              }}
            >
              off-court
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {personal.holesInOne > 0 && (
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '16px',
                    color: '#2C4F5D',
                    lineHeight: 1.55,
                  }}
                >
                  {personal.holesInOne} hole{personal.holesInOne !== 1 ? 's' : ''} in one
                </div>
              )}
              <div
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '16px',
                  color: '#2C4F5D',
                  lineHeight: 1.55,
                }}
              >
                {personal.sport}
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '16px',
                  color: '#2C4F5D',
                  lineHeight: 1.55,
                }}
              >
                {personal.teams.join(' · ')}
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '13px',
                  color: '#6B8E9E',
                  lineHeight: 1.55,
                  marginTop: '4px',
                }}
              >
                {personal.currentFocus}
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          background: '#0C2230',
          width: '100%',
          padding: '48px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { href: '/', label: 'work' },
                { href: '/about', label: 'about' },
                { href: '/archive', label: 'archive' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '13px',
                    color: '#9DB6C0',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
            <div
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '11px',
                fontWeight: 300,
                color: '#446878',
              }}
            >
              © 2026 Doug March
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}