import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 400,
      fontSize: '9px',
      color: '#625A53',
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      marginBottom: '32px',
      marginLeft: '4px',
    }}>
      {children}
    </div>
  )
}

function AboutPage() {
  return (
    <div style={{ background: '#0D0A08', color: '#F0EAE3', fontFamily: '"Work Sans", sans-serif' }}>

      {/* Identity header */}
      <section style={{ borderBottom: '1px solid #2A2420' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '96px 48px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '37px', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F0EAE3', marginBottom: '12px' }}>
            {identity.name}
          </h1>
          <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300, fontSize: '16px', color: '#AFA59C', letterSpacing: '0.04em', marginBottom: '40px' }}>
            {identity.role}
          </div>
          <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '21px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#F0EAE3', maxWidth: '580px', margin: 0 }}>
            {identity.statement}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ borderBottom: '1px solid #2A2420' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
          <SectionLabel>Experience</SectionLabel>
          <div>
            {timeline.map((entry, i) => (
              <div
                key={`${entry.year}-${entry.company}-${i}`}
                style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #2A2420' }}
              >
                {/* Year column — fixed width so ranges and single years align */}
                <div style={{ minWidth: '130px', flexShrink: 0, fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '12px', color: '#625A53', letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums', paddingTop: '2px' }}>
                  {entry.year}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '0.04em', color: '#F0EAE3' }}>
                      {entry.role}
                    </span>
                    {entry.current && (
                      <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#C95220', letterSpacing: '0.09em', textTransform: 'uppercase', border: '1px solid #C95220', padding: '2px 6px' }}>
                        Now
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '14px', color: '#AFA59C', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    {entry.company}
                  </div>
                  <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#625A53' }}>
                    {entry.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ borderBottom: '1px solid #2A2420' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
          <SectionLabel>Capabilities</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {capabilities.map(cap => (
              <span
                key={cap}
                className="tag"
                style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#AFA59C', letterSpacing: '0.09em', textTransform: 'uppercase', border: '1px solid #2A2420', padding: '6px 12px' }}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section style={{ borderBottom: '1px solid #2A2420' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
          <SectionLabel>Education</SectionLabel>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ minWidth: '130px', flexShrink: 0, fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '12px', color: '#625A53', letterSpacing: '0.04em' }}>
              {education.years}
            </div>
            <div>
              <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 500, fontSize: '16px', color: '#F0EAE3', letterSpacing: '0.04em', marginBottom: '4px' }}>
                {education.school}
              </div>
              <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '12px', color: '#AFA59C', letterSpacing: '0.04em' }}>
                {education.degree}{education.concentration ? ` — ${education.concentration}` : ''}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section style={{ borderBottom: '1px solid #2A2420' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
          <SectionLabel>Personal</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Sport', value: personal.sport },
              { label: 'Teams', value: personal.teams.join(', ') },
              { label: 'Holes in One', value: String(personal.holesInOne) },
              { label: 'Current Focus', value: personal.currentFocus },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: '32px', alignItems: 'baseline' }}>
                <span style={{ minWidth: '130px', flexShrink: 0, fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                  {row.label}
                </span>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '14px', color: '#AFA59C', letterSpacing: '0.04em' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '48px 48px' }}>
          <div style={{ height: '2px', background: '#C9A87C', marginBottom: '16px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em' }}>
              © 2026 Doug March
            </span>
            <a href="/archive" className="footer-link" style={{ fontSize: '9px', letterSpacing: '0.09em' }}>
              Archive
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}