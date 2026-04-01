import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 400,
      fontSize: '9px',
      color: '#625A53',
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      marginBottom: '24px',
      marginLeft: '4px',
    }}>
      {children}
    </div>
  )
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div style={{ background: '#0D0A08', color: '#F0EAE3', minHeight: '100vh', fontFamily: '"Work Sans", sans-serif' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '96px 48px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '37px', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F0EAE3', marginBottom: '32px' }}>
            Project not found.
          </div>
          <a href="/" className="footer-link" style={{ fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            ← Back to work
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0D0A08', color: '#F0EAE3', fontFamily: '"Work Sans", sans-serif' }}>

      {/* Header */}
      <section style={{ borderBottom: '1px solid #2A2420' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '96px 48px 64px' }}>
          <a href="/" className="footer-link" style={{ display: 'inline-block', fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '48px' }}>
            ← Work
          </a>

          <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#625A53', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {project.type} — {project.year}
          </div>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '49px', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F0EAE3', marginBottom: '24px' }}>
            {project.title}
          </h1>

          {project.role && (
            <div style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300, fontSize: '16px', color: '#AFA59C', letterSpacing: '0.04em' }}>
              {project.role}
            </div>
          )}
        </div>
      </section>

      {/* Problem */}
      {project.problem && (
        <section style={{ borderBottom: '1px solid #2A2420' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
            <SectionLabel>Problem</SectionLabel>
            <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '21px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#F0EAE3', maxWidth: '580px', margin: 0 }}>
              {project.problem}
            </p>
          </div>
        </section>
      )}

      {/* Approach */}
      {project.approach && (
        <section style={{ borderBottom: '1px solid #2A2420' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
            <SectionLabel>Approach</SectionLabel>
            <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#AFA59C', maxWidth: '580px', margin: 0 }}>
              {project.approach}
            </p>
          </div>
        </section>
      )}

      {/* Outcome */}
      {project.outcome && (
        <section style={{ borderBottom: '1px solid #2A2420' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
            <SectionLabel>Outcome</SectionLabel>
            <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#AFA59C', maxWidth: '580px', margin: 0 }}>
              {project.outcome}
            </p>
          </div>
        </section>
      )}

      {/* Description fallback for lightweight projects */}
      {!project.problem && !project.approach && project.description && (
        <section style={{ borderBottom: '1px solid #2A2420' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
            <SectionLabel>About</SectionLabel>
            <p style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#AFA59C', maxWidth: '580px', margin: 0 }}>
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <section style={{ borderBottom: '1px solid #2A2420' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
            <SectionLabel>Stack</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.stack.map(tech => (
                <span key={tech} className="tag" style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400, fontSize: '9px', color: '#AFA59C', letterSpacing: '0.09em', textTransform: 'uppercase', border: '1px solid #2A2420', padding: '6px 12px' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Links */}
      {(project.liveUrl || project.githubUrl || project.externalUrl) && (
        <section style={{ borderBottom: '1px solid #2A2420' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '64px 48px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {(project.liveUrl || project.externalUrl) && (
                <a
                  href={project.liveUrl || project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View Project →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </section>
      )}

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