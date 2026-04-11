import { createFileRoute } from '@tanstack/react-router'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const label: React.CSSProperties = {
  fontSize: '9px',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: '400',
  color: '#6B8599',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}
const divider: React.CSSProperties = { borderTop: '1px solid rgba(150, 170, 187, 0.08)' }
const sectionWrap: React.CSSProperties = {
  width: '100%',
  maxWidth: '720px',
  padding: '64px 48px',
}

function AboutPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      background: '#0D1822',
      minHeight: '100vh',
      paddingTop: '96px',
    }}>

      {/* ── IDENTITY ────────────────────────────────────────── */}
      <div style={{ ...sectionWrap }}>
        <div style={{ ...label, marginBottom: '28px' }}>About</div>

        <h1 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '50px',
          fontWeight: '700',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#DFE7F1',
          margin: '0 0 16px 0',
        }}>
          {identity.name}
        </h1>

        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '21px',
          fontWeight: '400',
          color: '#96AABB',
          letterSpacing: '-0.01em',
          lineHeight: 1.20,
          marginBottom: '36px',
        }}>
          {identity.role}
        </div>

        <p style={{
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '16px',
          fontWeight: '300',
          color: '#96AABB',
          lineHeight: 1.75,
          maxWidth: '540px',
          margin: 0,
        }}>
          {identity.statement}
        </p>
      </div>

      {/* ── EXPERIENCE / TIMELINE ───────────────────────────── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <div style={{ ...label, marginBottom: '40px' }}>Experience</div>

        <div>
          {timeline.map((entry) => (
            <div
              key={`${entry.year}-${entry.company}`}
              style={{
                display: 'flex',
                gap: '32px',
                padding: '20px 0',
                borderBottom: '1px solid rgba(150, 170, 187, 0.08)',
              }}
            >
              {/* Year — fixed width so single years align with ranges */}
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '12px',
                color: '#6B8599',
                letterSpacing: '0.04em',
                minWidth: '140px',
                flexShrink: 0,
                paddingTop: '3px',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1.55,
              }}>
                {entry.year}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#DFE7F1',
                  marginBottom: '2px',
                }}>
                  {entry.role}
                </div>

                <div style={{
                  fontFamily: '"Work Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#96AABB',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  {entry.company}
                  {entry.current && (
                    <span style={{
                      fontSize: '9px',
                      fontFamily: '"Space Grotesk", sans-serif',
                      color: '#C34B22',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}>
                      Now
                    </span>
                  )}
                </div>

                <div style={{
                  fontFamily: '"Work Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: '300',
                  color: '#6B8599',
                  lineHeight: 1.55,
                }}>
                  {entry.description}
                </div>
              </div>
            </div>
          ))}

          {/* Education — same alignment as timeline rows */}
          <div style={{
            display: 'flex',
            gap: '32px',
            padding: '20px 0',
          }}>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '12px',
              color: '#6B8599',
              letterSpacing: '0.04em',
              minWidth: '140px',
              flexShrink: 0,
              paddingTop: '3px',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {education.years}
            </div>
            <div>
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                color: '#DFE7F1',
                marginBottom: '2px',
              }}>
                {education.degree}
              </div>
              <div style={{
                fontFamily: '"Work Sans", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: '#96AABB',
                marginBottom: '4px',
              }}>
                {education.school}
              </div>
              <div style={{
                fontFamily: '"Work Sans", sans-serif',
                fontSize: '14px',
                fontWeight: '300',
                color: '#6B8599',
              }}>
                {education.concentration}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CAPABILITIES ────────────────────────────────────── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <div style={{ ...label, marginBottom: '32px' }}>Capabilities</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {capabilities.map((cap) => (
            <div key={cap} style={{
              padding: '6px 12px',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '12px',
              color: '#96AABB',
              letterSpacing: '0.04em',
              background: 'rgba(27, 42, 55, 0.9)',
              border: '1px solid rgba(150, 170, 187, 0.10)',
              borderRadius: '0',
            }}>
              {cap}
            </div>
          ))}
        </div>
      </div>

      {/* ── PERSONAL ────────────────────────────────────────── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <div style={{ ...label, marginBottom: '32px' }}>Outside the Work</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
          {[
            { key: 'Sport', value: personal.sport },
            { key: 'Holes in One', value: String(personal.holesInOne) },
            { key: 'Teams', value: personal.teams.join(', ') },
            { key: 'Current Focus', value: personal.currentFocus },
          ].map(({ key, value }) => (
            <div key={key} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '11px',
                color: '#485F70',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                minWidth: '120px',
                flexShrink: 0,
                paddingTop: '2px',
              }}>
                {key}
              </div>
              <div style={{
                fontFamily: '"Work Sans", sans-serif',
                fontSize: '14px',
                fontWeight: '300',
                color: '#96AABB',
                lineHeight: 1.55,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '12px',
            color: '#485F70',
            letterSpacing: '0.04em',
          }}>
            Doug March · {new Date().getFullYear()}
          </span>
          <a href="/archive" style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '12px',
            color: '#485F70',
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}>
            Archive
          </a>
        </div>
      </div>

    </div>
  )
}