import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

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
        margin: '0 0 24px 0',
      }}
    >
      {text}
    </p>
  )
}

function ContentSection({
  label,
  body,
  tint = false,
}: {
  label: string
  body: string
  tint?: boolean
}) {
  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid #C9DDD9',
        backgroundColor: tint ? '#F9FBFA' : 'transparent',
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
        <SectionLabel text={label} />
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '16px',
            lineHeight: '1.62',
            color: '#4A7870',
            maxWidth: '580px',
            margin: '0',
          }}
        >
          {body}
        </p>
      </div>
    </section>
  )
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  // ── Not found ───────────────────────────────────────────────────────────────
  if (!project) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '120px 48px',
            boxSizing: 'border-box',
          }}
        >
          <AmberRule />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '37px',
              fontWeight: '600',
              lineHeight: '1.20',
              letterSpacing: '-0.03em',
              color: '#213A37',
              margin: '0 0 24px 0',
            }}
          >
            Project not found.
          </h1>
          <a
            href="/"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '14px',
              color: '#C9920E',
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            ← Back to work
          </a>
        </div>
      </div>
    )
  }

  const hasLinks = project.liveUrl || project.githubUrl || project.externalUrl

  return (
    <div style={{ width: '100%' }}>

      {/* ── PROJECT HEADER ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
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
          {/* Back link */}
          <a
            href="/"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: '#4A7870',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '56px',
            }}
          >
            ← Work
          </a>

          {/* Type label */}
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '9px',
              fontWeight: '500',
              letterSpacing: '0.14em',
              color: '#4A7870',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
            }}
          >
            {project.type}
          </p>
          <AmberRule />

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '50px',
              fontWeight: '700',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              color: '#213A37',
              margin: '0 0 20px 0',
            }}
          >
            {project.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'baseline',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '12px',
                color: '#6D9C95',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {project.year}
            </span>
            {project.role && (
              <>
                <span style={{ color: '#C9DDD9', fontSize: '12px' }}>·</span>
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '12px',
                    color: '#4A7870',
                  }}
                >
                  {project.role}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      {project.problem && (
        <ContentSection label="The Problem" body={project.problem} tint={false} />
      )}

      {/* ── DESCRIPTION (for lightweight projects without problem/approach) ── */}
      {project.description && !project.problem && (
        <ContentSection label="Overview" body={project.description} tint={false} />
      )}

      {/* ── APPROACH ── */}
      {project.approach && (
        <ContentSection label="The Approach" body={project.approach} tint={true} />
      )}

      {/* ── OUTCOME ── */}
      {project.outcome && (
        <ContentSection label="The Outcome" body={project.outcome} tint={false} />
      )}

      {/* ── STACK ── */}
      {project.stack && project.stack.length > 0 && (
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
            <SectionLabel text="Stack" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
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
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LINKS ── */}
      {hasLinks && (
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
            <SectionLabel text="Links" />
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '14px',
                    color: '#C9920E',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  View live →
                </a>
              )}
              {project.externalUrl && !project.liveUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '14px',
                    color: '#C9920E',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  View project →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '14px',
                    color: '#4A7870',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

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
            ← Back to Work
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