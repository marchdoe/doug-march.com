import { createFileRoute } from '@tanstack/react-router'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/about')({ component: AboutPage })

// ─── Hover for timeline rows ──────────────────────────────────────────────────
const timelineRow = css({
  display: 'flex',
  gap: '32px',
  padding: '24px 0',
  borderBottom: '1px solid #C9DDD9',
  transition: 'background-color 150ms ease',
  _hover: {
    backgroundColor: '#E4EFEC',
  },
})

// ─── Primitives ───────────────────────────────────────────────────────────────
function AmberRule() {
  return (
    <div
      style={{
        width: '40px',
        height: '1px',
        backgroundColor: '#C9920E',
        marginBottom: '12px',
      }}
    />
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: "'Lora', serif",
        fontSize: '9px',
        fontWeight: '500',
        letterSpacing: '0.14em',
        color: '#4A7870',
        textTransform: 'uppercase',
        margin: '0 0 40px 0',
      }}
    >
      {text}
    </p>
  )
}

function AboutPage() {
  return (
    <div style={{ width: '100%' }}>

      {/* ── HEADER ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '60vh',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '120px 48px 80px',
            boxSizing: 'border-box',
          }}
        >
          <AmberRule />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '50px',
              fontWeight: '700',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              color: '#213A37',
              margin: '0 0 16px 0',
            }}
          >
            {identity.name}
          </h1>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '12px',
              fontWeight: '400',
              letterSpacing: '0.09em',
              color: '#4A7870',
              textTransform: 'uppercase',
              margin: '0 0 44px 0',
            }}
          >
            {identity.role}
          </p>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '16px',
              lineHeight: '1.62',
              color: '#4A7870',
              maxWidth: '540px',
              margin: '0',
            }}
          >
            {identity.statement}
          </p>
        </div>
      </section>

      {/* ── EXPERIENCE / TIMELINE ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #C9DDD9',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '64px 48px',
            boxSizing: 'border-box',
          }}
        >
          <AmberRule />
          <SectionLabel text="Experience" />

          {timeline.map((entry) => (
            <div
              key={`${entry.year}-${entry.company}`}
              className={timelineRow}
            >
              {/* Year column — fixed width so ranges and single years align */}
              <div
                style={{
                  minWidth: '140px',
                  flexShrink: 0,
                  paddingTop: '3px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '12px',
                    color: '#6D9C95',
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {entry.year}
                </span>
              </div>

              {/* Role + company + description */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '21px',
                    fontWeight: '600',
                    lineHeight: '1.20',
                    color: '#213A37',
                    marginBottom: '4px',
                  }}
                >
                  {entry.role}
                </div>
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '14px',
                    color: '#4A7870',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  {entry.company}
                  {entry.current && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: '500',
                        letterSpacing: '0.09em',
                        color: '#C9920E',
                        textTransform: 'uppercase',
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '14px',
                    lineHeight: '1.62',
                    color: '#6D9C95',
                  }}
                >
                  {entry.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #C9DDD9',
          backgroundColor: '#F9FBFA',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '64px 48px',
            boxSizing: 'border-box',
          }}
        >
          <AmberRule />
          <SectionLabel text="Capabilities" />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {capabilities.map((cap) => (
              <span
                key={cap}
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '12px',
                  color: '#4A7870',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #C9DDD9',
                  borderRadius: '2px',
                  padding: '6px 14px',
                  boxShadow: '0 2px 20px rgba(33, 58, 55, 0.06)',
                  whiteSpace: 'nowrap',
                }}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      {education && (
        <section
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid #C9DDD9',
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              width: '100%',
              padding: '64px 48px',
              boxSizing: 'border-box',
            }}
          >
            <AmberRule />
            <SectionLabel text="Education" />
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ minWidth: '140px', flexShrink: 0, paddingTop: '3px' }}>
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '12px',
                    color: '#6D9C95',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {education.years}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '21px',
                    fontWeight: '600',
                    color: '#213A37',
                    lineHeight: '1.20',
                    marginBottom: '6px',
                  }}
                >
                  {education.school}
                </div>
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '14px',
                    color: '#4A7870',
                  }}
                >
                  {education.degree}
                  {education.concentration && ` — ${education.concentration}`}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PERSONAL ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #C9DDD9',
          backgroundColor: '#F9FBFA',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '64px 48px',
            boxSizing: 'border-box',
          }}
        >
          <AmberRule />
          <SectionLabel text="Off the Clock" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Sport', value: personal.sport },
              { label: 'Holes in One', value: String(personal.holesInOne) },
              { label: 'Teams', value: personal.teams.join(', ') },
              { label: 'Currently', value: personal.currentFocus },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '32px', alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '12px',
                    color: '#6D9C95',
                    minWidth: '140px',
                    flexShrink: 0,
                    letterSpacing: '0.02em',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '16px',
                    lineHeight: '1.62',
                    color: '#213A37',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #C9DDD9',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '40px 48px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '12px',
              color: '#6D9C95',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            ← Work
          </a>
          <a
            href="/archive"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '12px',
              color: '#6D9C95',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            archive
          </a>
        </div>
      </footer>
    </div>
  )
}