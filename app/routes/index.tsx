import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

// ─── Hover class for work rows ────────────────────────────────────────────────
const rowLink = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  borderBottom: '1px solid #C9DDD9',
  textDecoration: 'none',
  transition: 'background-color 150ms ease',
  cursor: 'pointer',
  _hover: {
    backgroundColor: '#E4EFEC',
    textDecoration: 'none',
  },
})

const hnCardHover = css({
  backgroundColor: '#FFFFFF',
  borderLeft: '3px solid #C9920E',
  borderRadius: '4px',
  boxShadow: '0 4px 32px rgba(33, 58, 55, 0.10)',
  padding: '32px',
  transition: 'box-shadow 180ms ease, border-left-color 180ms ease',
  _hover: {
    boxShadow: '0 6px 40px rgba(33, 58, 55, 0.14)',
    borderLeftColor: '#8A6408',
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
        margin: '0 0 48px 0',
      }}
    >
      {text}
    </p>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#C9DDD9',
      }}
    />
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div style={{ width: '100%' }}>

      {/* ── SECTION 1: HERO ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            padding: '96px 48px 64px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Identity block */}
          <div>
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
                maxWidth: '480px',
                margin: '0',
              }}
            >
              {identity.statement}
            </p>
          </div>

          {/* Hero nav — bottom of hero */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
            }}
          >
            {[
              { label: 'work', href: '/' },
              { label: 'about', href: '/about' },
              { label: 'github', href: 'https://github.com', external: true },
              { label: 'email', href: 'mailto:hello@doug-march.com', external: true },
            ].map(({ label, href, external }, i) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span
                    style={{
                      color: '#9BBFB8',
                      fontSize: '12px',
                      margin: '0 10px',
                      userSelect: 'none',
                    }}
                  >
                    ·
                  </span>
                )}
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '12px',
                    letterSpacing: '0.05em',
                    color: '#4A7870',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </section>

      {/* ── SECTION 2: FEATURED PROJECT ── */}
      {featuredProject && (
        <section
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '80vh',
            borderTop: '1px solid #C9DDD9',
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              width: '100%',
              padding: '96px 48px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
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
              Spring Renewal
            </p>
            <AmberRule />
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '9px',
                fontWeight: '500',
                letterSpacing: '0.14em',
                color: '#C9920E',
                textTransform: 'uppercase',
                margin: '0 0 24px 0',
              }}
            >
              Featured Project
            </p>
            <h2
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
              {featuredProject.title}
            </h2>
            {featuredProject.problem && (
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '16px',
                  lineHeight: '1.62',
                  color: '#4A7870',
                  maxWidth: '580px',
                  margin: '0 0 48px 0',
                }}
              >
                {featuredProject.problem}
              </p>
            )}
            {(featuredProject.liveUrl || featuredProject.externalUrl) && (
              <a
                href={featuredProject.liveUrl || featuredProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '14px',
                  color: '#C9920E',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}
              >
                View project →
              </a>
            )}
          </div>
        </section>
      )}

      {/* ── SECTION 3: HN CALLOUT (800px wide — the only grid break) ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          borderTop: '1px solid #C9DDD9',
          backgroundColor: '#F9FBFA',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            width: '100%',
            padding: '96px 48px',
            boxSizing: 'border-box',
          }}
        >
          <div className={hnCardHover}>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '9px',
                fontWeight: '500',
                letterSpacing: '0.14em',
                color: '#C9920E',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
              }}
            >
              Discovery · HN · 756 pts
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: '600',
                lineHeight: '1.20',
                letterSpacing: '-0.03em',
                color: '#213A37',
                margin: '0 0 16px 0',
              }}
            >
              Build a GPU Without Leaving Your Browser.
            </h2>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '16px',
                lineHeight: '1.62',
                color: '#4A7870',
                maxWidth: '580px',
                margin: '0 0 24px 0',
              }}
            >
              An interactive simulation that walks you through GPU architecture—shaders, pipelines,
              parallelism—piece by piece. No prior graphics knowledge required. Rare web-native
              education done genuinely well.
            </p>
            <a
              href="https://news.ycombinator.com"
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
              worth your time →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: QUOTE — the still center ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          borderTop: '1px solid #C9DDD9',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: '96px 48px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '37px',
              fontWeight: '400',
              fontStyle: 'italic',
              lineHeight: '1.78',
              letterSpacing: '-0.03em',
              color: '#213A37',
              margin: '0 0 32px 0',
            }}
          >
            Each day your life grows a day shorter. Make every move count.
          </p>
          <div
            style={{
              width: '48px',
              height: '1px',
              backgroundColor: '#C9DDD9',
              margin: '0 auto 32px',
            }}
          />
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '12px',
              fontWeight: '400',
              letterSpacing: '0.05em',
              color: '#4A7870',
              margin: '0',
            }}
          >
            Ming-Dao Deng
          </p>
        </div>
      </section>

      {/* ── SECTION 5: WORK INDEX ── */}
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
          <SectionLabel text="Selected Work" />

          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={rowLink}
            >
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
                  {project.title}
                </div>
                {project.role && (
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: '12px',
                      color: '#4A7870',
                    }}
                  >
                    {project.role}
                  </div>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  paddingLeft: '32px',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '9px',
                    fontWeight: '500',
                    letterSpacing: '0.09em',
                    color: '#4A7870',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.type}
                </div>
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '12px',
                    color: '#6D9C95',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {project.year}
                </div>
              </div>
            </a>
          ))}

          {/* Experiments subsection */}
          <div style={{ marginTop: '64px' }}>
            <AmberRule />
            <SectionLabel text="Experiments" />

            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={`/work/${exp.slug}`}
                className={rowLink}
              >
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
                    {exp.title}
                  </div>
                  {exp.description && (
                    <div
                      style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '14px',
                        color: '#4A7870',
                        lineHeight: '1.62',
                      }}
                    >
                      {exp.description}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    paddingLeft: '32px',
                    flexShrink: 0,
                    alignSelf: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: '12px',
                      color: '#6D9C95',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {exp.year}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: SIGNALS ── */}
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
          <SectionLabel text="Yesterday" />

          {/* Pistons win */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '12px',
                color: '#213A37',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.02em',
              }}
            >
              DET 116 · MIL 93
            </span>
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '9px',
                fontWeight: '500',
                color: '#8A6408',
                letterSpacing: '0.09em',
              }}
            >
              W
            </span>
          </div>

          {/* Red Wings loss */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '12px',
                color: '#6D9C95',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.02em',
              }}
            >
              DET 1 · STL 4
            </span>
          </div>

          {/* Masters note */}
          <div>
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '12px',
                letterSpacing: '0.05em',
                color: '#6D9C95',
              }}
            >
              Augusta National opens Thursday.
            </span>
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
          <span
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '12px',
              color: '#6D9C95',
              letterSpacing: '0.05em',
            }}
          >
            Doug March · 2026
          </span>
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