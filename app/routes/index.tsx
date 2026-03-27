import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

const sectionLabel = css({
  fontFamily: 'heading',
  fontSize: 'xs',
  color: 'textMuted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  fontWeight: '600',
  display: 'block',
  marginBottom: '3',
})

const cellLabel = css({
  fontFamily: 'heading',
  fontSize: 'xs',
  color: 'textMuted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  fontWeight: '600',
  display: 'block',
  marginBottom: '4',
})

function HomePage() {
  const fp = featuredProject
  const fp2 = selectedWork[0]
  const fp3 = selectedWork[1]
  const indexWork = selectedWork.slice(2)
  const allIndexWork = [...(fp2 ? [] : []), ...indexWork]
  const workListItems = selectedWork

  return (
    <main>
      {/* Gallery Wall Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: 'minmax(72px, auto)',
          gap: '16px',
          padding: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >

        {/* ── ZONE 1: Identity / Hero ── cols 1/8, rows 1/5 */}
        <div
          style={{
            gridColumn: '1 / 8',
            gridRow: '1 / 5',
            minHeight: '296px',
            background: '#192535',
            padding: '32px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(44px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#EEF2F8',
                marginBottom: '16px',
              }}
            >
              {identity.name}
            </h1>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                color: '#4B6478',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              {identity.role}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#93A8BC',
                lineHeight: 1.55,
                maxWidth: '440px',
              }}
            >
              {identity.statement}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <a
              href="/about"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px',
                color: '#4B6478',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'color 150ms ease',
              }}
              className="nav-link"
            >
              About
            </a>
            <span style={{ color: '#1F3346', fontSize: '9px' }}>·</span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                color: '#4B6478',
                letterSpacing: '0.04em',
              }}
            >
              2026
            </span>
          </div>
        </div>

        {/* ── ZONE 2: Score Callout ── cols 8/11, rows 1/2 */}
        <div
          style={{
            gridColumn: '8 / 11',
            gridRow: '1 / 2',
            height: '72px',
            borderLeft: '1px solid #344D62',
            paddingLeft: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: '#93A8BC',
              letterSpacing: '0.08em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            P 129–108 / T 8–2
          </span>
        </div>

        {/* ── ZONE 3: Experiments Mini ── cols 8/11, rows 2/5 */}
        <div
          style={{
            gridColumn: '8 / 11',
            gridRow: '2 / 5',
            padding: '20px 20px 20px 20px',
            borderLeft: '1px solid #1F3346',
          }}
        >
          <span className={cellLabel}>Experiments</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {experiments.slice(0, 5).map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                target={exp.externalUrl ? '_blank' : undefined}
                rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
                className="experiment-link"
              >
                <span style={{ color: '#93A8BC' }}>{exp.title}</span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '9px',
                    color: '#4B6478',
                    letterSpacing: '0.08em',
                    marginLeft: '8px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {exp.year}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── ZONE 4: Quote Interruption ── cols 11/13, rows 1/7 */}
        <div
          style={{
            gridColumn: '11 / 13',
            gridRow: '1 / 7',
            minHeight: '432px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              color: '#4B6478',
              letterSpacing: '0.04em',
              lineHeight: 1.75,
              whiteSpace: 'normal',
              maxHeight: '400px',
              userSelect: 'none',
            }}
          >
            Even if you persuade me, you won't persuade me
          </span>
        </div>

        {/* ── ZONE 5: Featured Project 1 (Spaceman) ── cols 1/6, rows 5/10 */}
        {fp && (
          <a
            href={fp.liveUrl || fp.externalUrl || `/work/${fp.slug}`}
            target={fp.externalUrl ? '_blank' : undefined}
            rel={fp.externalUrl ? 'noopener noreferrer' : undefined}
            className="gallery-cell-project"
            style={{
              gridColumn: '1 / 6',
              gridRow: '5 / 10',
              minHeight: '360px',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
              textDecoration: 'none',
            }}
          >
            <div>
              <span className={cellLabel}>Featured</span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(32px, 3.5vw, 50px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#EEF2F8',
                  marginBottom: '20px',
                }}
              >
                {fp.title}
              </h2>
              {fp.problem && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#93A8BC',
                    lineHeight: 1.55,
                    maxWidth: '380px',
                  }}
                >
                  {fp.problem}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: '#4B6478',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {fp.type}
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: '#A8C040',
                  letterSpacing: '0.08em',
                }}
              >
                {fp.year} →
              </span>
            </div>
          </a>
        )}

        {/* ── ZONE 6: Featured Project 2 ── cols 6/11, rows 5/8 — SEAFOAM BORDER */}
        {fp2 && (
          <a
            href={`/work/${fp2.slug}`}
            className="gallery-cell-project"
            style={{
              gridColumn: '6 / 11',
              gridRow: '5 / 8',
              minHeight: '216px',
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '2px solid #4AA494',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
              textDecoration: 'none',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: '#4AA494',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {fp2.type}
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#EEF2F8',
                  marginBottom: '12px',
                }}
              >
                {fp2.title}
              </h3>
              {fp2.problem && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#93A8BC',
                    lineHeight: 1.55,
                  }}
                >
                  {fp2.problem.length > 100 ? fp2.problem.slice(0, 100) + '…' : fp2.problem}
                </p>
              )}
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px',
                color: '#4B6478',
                letterSpacing: '0.08em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fp2.year}
            </span>
          </a>
        )}

        {/* ── ZONE 7: Featured Project 3 ── cols 6/13, rows 8/11 */}
        {fp3 && (
          <a
            href={`/work/${fp3.slug}`}
            className="gallery-cell-project"
            style={{
              gridColumn: '6 / 13',
              gridRow: '8 / 11',
              minHeight: '216px',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
              textDecoration: 'none',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: '#4B6478',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {fp3.type}
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(21px, 2.5vw, 37px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#EEF2F8',
                  marginBottom: '12px',
                }}
              >
                {fp3.title}
              </h3>
              {fp3.problem && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#93A8BC',
                    lineHeight: 1.55,
                    maxWidth: '480px',
                  }}
                >
                  {fp3.problem.length > 120 ? fp3.problem.slice(0, 120) + '…' : fp3.problem}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: '#4B6478',
                  letterSpacing: '0.08em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {fp3.year}
              </span>
              {fp3.role && (
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px',
                    color: '#4B6478',
                  }}
                >
                  {fp3.role}
                </span>
              )}
            </div>
          </a>
        )}

        {/* ── ZONE 8: Work Index ── cols 1/6, rows 10/13 */}
        <div
          style={{
            gridColumn: '1 / 6',
            gridRow: '10 / 13',
            padding: '24px 0 24px 0',
          }}
        >
          <span className={sectionLabel}>Selected Work</span>
          <div>
            {workListItems.map((project, i) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className="work-row"
                style={{ textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '11px',
                      color: '#4B6478',
                      letterSpacing: '0.08em',
                      fontVariantNumeric: 'tabular-nums',
                      minWidth: '24px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#EEF2F8',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '11px',
                      color: '#4B6478',
                    }}
                  >
                    {project.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '11px',
                      color: '#4B6478',
                      letterSpacing: '0.08em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── ZONE 9: Contact / Elsewhere ── cols 6/13, rows 11/13 */}
        <div
          style={{
            gridColumn: '6 / 13',
            gridRow: '11 / 13',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #1F3346',
              paddingTop: '20px',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px',
                color: '#4B6478',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Doug March — {new Date().getFullYear()}
            </span>
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'Email', href: 'mailto:doug@example.com' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}