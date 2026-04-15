import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/')({ component: HomePage })

const repos = [
  {
    name: 'voicebox',
    lang: 'TypeScript',
    desc: 'Real-time voice interaction layer for AI-powered interfaces.',
  },
  {
    name: 'markitdown',
    lang: 'Python',
    desc: 'Markdown document converter with front-matter parsing and export.',
  },
  {
    name: 'elements',
    lang: 'TypeScript',
    desc: 'Design token system and component preset for personal projects.',
  },
]

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: 'Source Sans 3, sans-serif',
        fontSize: '9px',
        fontWeight: 600,
        color: '#695F50',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: '40px',
      }}
    >
      {children}
    </div>
  )
}

function HomePage() {
  return (
    <div>
      {/* Band 1: Identity — seamlessly continues from Sidebar's dark background */}
      <div style={{ background: '#1A1610' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '64px 48px 96px',
          }}
        >
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(56px, 8vw, 104px)',
              fontWeight: 900,
              lineHeight: '1.05',
              letterSpacing: '-0.025em',
              color: '#EEE8D8',
              margin: '0 0 24px 0',
            }}
          >
            Product
            <br />
            Designer &<br />
            Developer
          </h1>
          <p
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              color: '#B5AC97',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '0',
              lineHeight: '1.62',
            }}
          >
            Building thoughtful software
          </p>
        </div>
      </div>

      {/* Band 2: Featured Work */}
      <div style={{ background: '#F9F6EE', minHeight: '52vh' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <SectionLabel>Featured Project</SectionLabel>

          {featuredProject && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#5E8C55',
                    letterSpacing: '0.08em',
                  }}
                >
                  {featuredProject.type} · {featuredProject.year}
                </span>
              </div>

              <a
                href={
                  featuredProject.externalUrl ||
                  featuredProject.liveUrl ||
                  `/work/${featuredProject.slug}`
                }
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                style={{ textDecoration: 'none' }}
              >
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(37px, 5.5vw, 72px)',
                    fontWeight: 700,
                    lineHeight: '1.05',
                    letterSpacing: '-0.015em',
                    color: '#2D2820',
                    margin: '0 0 32px 0',
                  }}
                >
                  {featuredProject.title}
                </h2>
              </a>

              {featuredProject.problem && (
                <p
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '18px',
                    fontWeight: 300,
                    color: '#695F50',
                    lineHeight: '1.62',
                    maxWidth: '620px',
                    margin: '0 0 48px 0',
                  }}
                >
                  {featuredProject.problem}
                </p>
              )}

              <a
                href={
                  featuredProject.externalUrl ||
                  featuredProject.liveUrl ||
                  `/work/${featuredProject.slug}`
                }
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#EEE8D8',
                  background: '#5E8C55',
                  padding: '12px 28px',
                  borderRadius: '3px',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                View Project →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Band 3: Quote — Specimen pause in sage green */}
      <div
        style={{
          background: '#3A5E34',
          minHeight: '44vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '96px 48px',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(37px, 4.5vw, 50px)',
                lineHeight: '1.05',
                letterSpacing: '-0.015em',
                color: '#EEE8D8',
                margin: '0 0 28px 0',
              }}
            >
              If I persist long enough I will win
            </p>
            <footer
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '12px',
                fontWeight: 300,
                color: '#AABFA4',
                letterSpacing: '0.08em',
              }}
            >
              — Og Mandino
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Band 4: Recent Repositories */}
      <div style={{ background: '#EEE8D8' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 48px',
          }}
        >
          <SectionLabel>Recent Repositories</SectionLabel>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              borderTop: '1px solid #D9D1BC',
              paddingTop: '40px',
            }}
          >
            {repos.map(repo => (
              <div key={repo.name}>
                <div
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2D2820',
                    marginBottom: '6px',
                  }}
                >
                  {repo.name}
                </div>
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    color: '#5E8C55',
                    letterSpacing: '0.08em',
                    marginBottom: '10px',
                  }}
                >
                  {repo.lang}
                </div>
                <div
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#695F50',
                    lineHeight: '1.62',
                  }}
                >
                  {repo.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Band 5: Work Index */}
      <div style={{ background: '#F2EDE2' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 48px',
          }}
        >
          {/* Selected Work */}
          <SectionLabel>Selected Work</SectionLabel>

          <div style={{ borderTop: '1px solid #D9D1BC', marginBottom: '72px' }}>
            {selectedWork.map(project => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '22px 0',
                    borderBottom: '1px solid #D9D1BC',
                    transition: 'background 150ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '21px',
                        fontWeight: 700,
                        lineHeight: '1.2',
                        color: '#2D2820',
                      }}
                    >
                      {project.title}
                    </span>
                    {project.role && (
                      <span
                        style={{
                          fontFamily: 'Source Sans 3, sans-serif',
                          fontSize: '14px',
                          fontWeight: 300,
                          color: '#8C8373',
                        }}
                      >
                        {project.role}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: 'Source Sans 3, sans-serif',
                        fontSize: '12px',
                        color: '#8C8373',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {project.type}
                    </span>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '12px',
                        color: '#8C8373',
                      }}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Experiments */}
          <SectionLabel>Experiments</SectionLabel>

          <div style={{ borderTop: '1px solid #D9D1BC' }}>
            {experiments.map(project => (
              <div
                key={project.slug}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '18px 0',
                  borderBottom: '1px solid #D9D1BC',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#4A4238',
                    }}
                  >
                    {project.title}
                  </span>
                  {project.description && (
                    <span
                      style={{
                        fontFamily: 'Source Sans 3, sans-serif',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#8C8373',
                      }}
                    >
                      {project.description}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '12px',
                      color: '#8C8373',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {project.type}
                  </span>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      color: '#8C8373',
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Band 6: Footer */}
      <Footer />
    </div>
  )
}