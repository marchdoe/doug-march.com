import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

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

function HomePage() {
  return (
    <div style={{ background: '#0D0A08', color: '#F0EAE3', fontFamily: '"Work Sans", sans-serif' }}>

      {/* ── BEAT 1: HERO ─────────────────────────────────────────── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '75vh', left: 0, right: 0, height: '80px', background: '#181310', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', width: '100%', padding: '0 48px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '49px', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F0EAE3', marginBottom: '16px' }}>
            Doug March
          </h1>
          <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300, fontSize: '21px', lineHeight: 1.15, letterSpacing: '0.04em', color: '#AFA59C', marginBottom: '48px' }}>
            Product Designer &amp; Developer
          </p>
          <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#625A53', maxWidth: '460px' }}>
            Building products at the intersection of design and engineering.
          </p>
        </div>
      </section>

      <hr />

      {/* ── BEAT 2: SPECIMEN — EINSTEIN ──────────────────────────── */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: '#0D0A08' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '96px 48px' }}>
          <blockquote style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(72px, 11vw, 120px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F0EAE3', margin: 0, padding: 0 }}>
            Insanity is doing the same thing over and over and expecting different results.
          </blockquote>
          <cite style={{ display: 'block', fontFamily: '"Work Sans", sans-serif', fontWeight: 300, fontSize: '12px', color: '#625A53', letterSpacing: '0.09em', marginTop: '32px', fontStyle: 'normal' }}>
            — Albert Einstein
          </cite>
        </div>
      </section>

      <hr />

      {/* ── BEAT 3: FEATURED WORK ────────────────────────────────── */}
      {featuredProject && (
        <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#0D0A08' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '96px 48px' }}>
            <SectionLabel>Featured</SectionLabel>
            <a
              href={featuredProject.liveUrl || featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              style={{ display: 'block', marginBottom: '32px' }}
            >
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '37px', lineHeight: 1.0, letterSpacing: '-0.03em', color: 'inherit', margin: 0 }}>
                {featuredProject.title}
              </h2>
            </a>
            {featuredProject.problem && (
              <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '21px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#AFA59C', maxWidth: '540px', margin: 0 }}>
                {featuredProject.problem}
              </p>
            )}
            <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em', textTransform: 'uppercase', marginTop: '48px' }}>
              {featuredProject.type} — {featuredProject.year}
            </div>
          </div>
        </section>
      )}

      <hr />

      {/* ── BEAT 4: WORK INDEX ───────────────────────────────────── */}
      <section style={{ position: 'relative', background: '#0D0A08' }}>
        {/* Code-editor gutter accent strip */}
        <div style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '2px', background: '#C95220', opacity: 0.6 }} />
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
          <SectionLabel>Selected Work</SectionLabel>
          <div style={{ borderTop: '1px solid #2A2420' }}>
            {selectedWork.map(project => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className="work-row"
              >
                <span style={{ flex: 1, fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '16px', letterSpacing: '0.04em', color: '#F0EAE3', lineHeight: 1.0 }}>
                  {project.title}
                </span>
                <span style={{ width: '96px', textAlign: 'center', fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em', textTransform: 'uppercase', lineHeight: 1.0 }}>
                  {project.type}
                </span>
                <span style={{ width: '48px', textAlign: 'right', fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.0 }}>
                  {project.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* ── BEAT 5: EXPERIMENTS ──────────────────────────────────── */}
      <section style={{ background: '#0D0A08' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '96px 48px' }}>
          <SectionLabel>Experiments</SectionLabel>
          {experiments.map(exp => (
            <div key={exp.slug} style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #2A2420' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '0.04em', color: '#F0EAE3', marginBottom: '6px' }}>
                  {exp.title}
                </div>
                {exp.description && (
                  <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#625A53' }}>
                    {exp.description}
                  </div>
                )}
                <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em', textTransform: 'uppercase', marginTop: '8px' }}>
                  {exp.type}
                </div>
              </div>
              <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.09em', fontVariantNumeric: 'tabular-nums', flexShrink: 0, paddingTop: '3px' }}>
                {exp.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr />

      {/* ── BEAT 6: FOOTER ───────────────────────────────────────── */}
      <footer style={{ background: '#0D0A08' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '48px 48px' }}>

          {/* Main footer row: scores left, contact right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>

            {/* Sports scores */}
            <div style={{ fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '7px' }}>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#AFA59C' }}>
                  DET&nbsp;&nbsp;127 · MEM&nbsp;&nbsp;116
                </span>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C95220' }}>W</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '7px' }}>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#AFA59C' }}>
                  DET&nbsp;&nbsp;&nbsp;&nbsp;1 · TBL&nbsp;&nbsp;&nbsp;&nbsp;5
                </span>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#625A53' }}>L</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#AFA59C' }}>
                  DET&nbsp;&nbsp;&nbsp;&nbsp;5 · CLE&nbsp;&nbsp;&nbsp;&nbsp;7
                </span>
                <span style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#625A53' }}>L</span>
              </div>
            </div>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
              <a href="mailto:doug@doug-march.com" className="footer-link" style={{ fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>Email</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>GitHub</a>
              <a href="/about" className="footer-link" style={{ fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>About</a>
            </div>
          </div>

          {/* Easter sand hairline — one warm breath before copyright */}
          <div style={{ height: '2px', background: '#C9A87C', marginBottom: '16px' }} />

          {/* Copyright + Archive */}
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