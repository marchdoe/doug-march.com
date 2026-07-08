import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div style={{ padding: '0 5vw' }}>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gap: '0',
          paddingTop: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid #2c362a',
        }}
        className="about-header"
      >
        <h1
          style={{
            fontFamily: "'Spectral', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: '#f2f4f0',
            margin: '0 0 16px',
          }}
        >
          {identity.name}
        </h1>
        <p
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontSize: '0.875rem',
            fontVariantCaps: 'all-small-caps',
            letterSpacing: '0.12em',
            color: '#76e035',
            margin: '0 0 24px',
          }}
        >
          {identity.role}
        </p>
        <p
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontSize: '1rem',
            lineHeight: 1.55,
            color: '#a8b4a2',
            margin: 0,
            maxWidth: '65ch',
          }}
        >
          {identity.statement}
        </p>
      </div>

      {/* Two-column body */}
      <div className="about-body">
        {/* Timeline */}
        <div className="about-col-main" style={{ paddingTop: '32px' }}>
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a8b4a2',
              margin: '0 0 16px',
            }}
          >
            EXPERIENCE
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#2c362a',
              marginBottom: '0',
            }}
          />

          {timeline.map((entry, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '24px',
                padding: '16px 0',
                borderBottom: '1px solid #1c241a',
                alignItems: 'baseline',
              }}
              className="timeline-row"
            >
              <div
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: '#7d8c77',
                  whiteSpace: 'nowrap',
                  minWidth: '120px',
                  letterSpacing: '0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {entry.year}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.95rem',
                    color: '#f2f4f0',
                    margin: '0 0 2px',
                    fontWeight: 500,
                  }}
                >
                  {entry.role}
                  {entry.current && (
                    <span
                      style={{
                        color: '#76e035',
                        fontSize: '0.75rem',
                        marginLeft: '8px',
                        fontWeight: 400,
                      }}
                    >
                      current
                    </span>
                  )}
                </p>
                <p
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: '#76e035',
                    margin: '0 0 4px',
                  }}
                >
                  {entry.company}
                </p>
                <p
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    color: '#a8b4a2',
                    margin: 0,
                    maxWidth: '55ch',
                  }}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar — Capabilities + Education + Personal */}
        <div className="about-col-side" style={{ paddingTop: '32px' }}>
          {/* Capabilities */}
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a8b4a2',
              margin: '0 0 12px',
            }}
          >
            CAPABILITIES
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#2c362a',
              marginBottom: '12px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0',
            }}
          >
            {capabilities.map((cap, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: '#f2f4f0',
                  lineHeight: 1.8,
                }}
              >
                {cap}
                {i < capabilities.length - 1 && (
                  <span style={{ color: '#566452', margin: '0 8px' }}>·</span>
                )}
              </span>
            ))}
          </div>

          {/* Education */}
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a8b4a2',
              margin: '32px 0 12px',
            }}
          >
            EDUCATION
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#2c362a',
              marginBottom: '12px',
            }}
          />
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: '0.9rem',
              color: '#f2f4f0',
              margin: '0 0 4px',
              fontWeight: 500,
            }}
          >
            {education.school}
          </p>
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: '0.85rem',
              color: '#a8b4a2',
              margin: '0 0 2px',
            }}
          >
            {education.degree}, {education.concentration}
          </p>
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: '0.8rem',
              color: '#7d8c77',
              margin: 0,
            }}
          >
            {education.years}
          </p>

          {/* Personal */}
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a8b4a2',
              margin: '32px 0 12px',
            }}
          >
            PERSONAL
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#2c362a',
              marginBottom: '12px',
            }}
          />
          <div style={{ fontSize: '0.85rem', lineHeight: 1.7, fontFamily: "'Albert Sans', sans-serif" }}>
            <p style={{ margin: '0 0 8px', color: '#a8b4a2' }}>
              <span style={{ color: '#7d8c77' }}>Holes in one:</span>{' '}
              <span style={{ color: '#f2f4f0' }}>{personal.holesInOne}</span>
            </p>
            <p style={{ margin: '0 0 8px', color: '#a8b4a2' }}>
              <span style={{ color: '#7d8c77' }}>Sport:</span>{' '}
              <span style={{ color: '#f2f4f0' }}>{personal.sport}</span>
            </p>
            <p style={{ margin: '0 0 8px', color: '#a8b4a2' }}>
              <span style={{ color: '#7d8c77' }}>Teams:</span>{' '}
              <span style={{ color: '#f2f4f0' }}>{personal.teams.join(', ')}</span>
            </p>
            <p style={{ margin: '0', color: '#a8b4a2' }}>
              <span style={{ color: '#7d8c77' }}>Focus:</span>{' '}
              <span style={{ color: '#f2f4f0' }}>{personal.currentFocus}</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-body {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 0;
        }
        .about-col-main {
          padding-right: 4vw;
          border-right: 1px solid #2c362a;
        }
        .about-col-side {
          padding-left: 4vw;
        }
        .timeline-row {
          transition: background 180ms ease;
        }

        @media (max-width: 768px) {
          .about-body {
            grid-template-columns: 1fr;
          }
          .about-col-main {
            padding-right: 0;
            border-right: none;
            border-bottom: 1px solid #2c362a;
            padding-bottom: 32px;
          }
          .about-col-side {
            padding-left: 0;
          }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .timeline-row { transition: none !important; }
        }
      `}</style>
    </div>
  )
}