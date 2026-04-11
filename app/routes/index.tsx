import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const S = {
  label: {
    fontSize: '9px',
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: '400',
    color: '#6B8599',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
  sectionWrap: {
    width: '100%',
    maxWidth: '720px',
    padding: '0 48px',
  } as React.CSSProperties,
  divider: {
    borderTop: '1px solid rgba(150, 170, 187, 0.08)',
  } as React.CSSProperties,
}

import type { ReactNode } from 'react'

function SectionRule({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
      <span style={S.label}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(150, 170, 187, 0.08)' }} />
    </div>
  )
}

function HomePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      background: '#0D1822',
    }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────── */}
      <div style={{
        width: '100%',
        maxWidth: '100%',
        padding: '0 64px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '680px' }}>

          <div style={{ ...S.label, marginBottom: '28px' }}>
            Portfolio · 2026
          </div>

          <h1
            className="name-mark"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '50px',
              fontWeight: '700',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#DFE7F1',
              margin: '0 0 12px 0',
              display: 'inline-block',
            }}
          >
            Doug March
          </h1>

          <div style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '21px',
            fontWeight: '400',
            color: '#96AABB',
            letterSpacing: '-0.01em',
            lineHeight: 1.20,
            marginBottom: '40px',
          }}>
            Product Designer & Developer
          </div>

          <p style={{
            fontFamily: '"Work Sans", sans-serif',
            fontSize: '16px',
            fontWeight: '300',
            color: '#96AABB',
            lineHeight: 1.75,
            maxWidth: '460px',
            margin: 0,
          }}>
            Designing products and building the systems that run them.
            Somewhere between the wireframe and the deployment script.
          </p>
        </div>
      </div>

      {/* ── SECTION 2: FEATURED PROJECT ─────────────────────── */}
      {featuredProject && (
        <div style={{
          ...S.sectionWrap,
          ...S.divider,
          paddingTop: '96px',
          paddingBottom: '96px',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ ...S.label, color: '#C34B22', marginBottom: '32px' }}>
            Featured Project
          </div>

          <a
            href={featuredProject.liveUrl || featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            target={featuredProject.externalUrl ? '_blank' : undefined}
            rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
            className="u-line"
            style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '28px' }}
          >
            <h2 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '50px',
              fontWeight: '700',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#DFE7F1',
              margin: 0,
            }}>
              {featuredProject.title}
            </h2>
          </a>

          {featuredProject.problem && (
            <p style={{
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '16px',
              fontWeight: '300',
              color: '#96AABB',
              lineHeight: 1.75,
              maxWidth: '480px',
              margin: '0 0 32px 0',
            }}>
              {featuredProject.problem}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '12px',
              color: '#485F70',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {featuredProject.type}
            </span>
            <span style={{ color: '#2E3E4D' }}>·</span>
            <span style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '12px',
              color: '#485F70',
              letterSpacing: '0.04em',
            }}>
              {featuredProject.year}
            </span>
            {featuredProject.role && (
              <>
                <span style={{ color: '#2E3E4D' }}>·</span>
                <span style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '12px',
                  color: '#485F70',
                  letterSpacing: '0.04em',
                }}>
                  {featuredProject.role}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SECTION 3: SELECTED WORK ─────────────────────────── */}
      <div style={{
        ...S.sectionWrap,
        ...S.divider,
        paddingTop: '64px',
        paddingBottom: '64px',
      }}>
        <SectionRule>Selected Work</SectionRule>

        <div>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className="work-item"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '24px 0',
                borderBottom: '1px solid rgba(150, 170, 187, 0.08)',
                gap: '24px',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '28px',
                    fontWeight: '600',
                    lineHeight: 1.20,
                    letterSpacing: '-0.01em',
                    color: '#DFE7F1',
                    marginBottom: '6px',
                  }}>
                    {project.title}
                  </div>
                  {project.problem && (
                    <div style={{
                      fontFamily: '"Work Sans", sans-serif',
                      fontSize: '14px',
                      fontWeight: '300',
                      color: '#6B8599',
                      lineHeight: 1.55,
                      maxWidth: '420px',
                    }}>
                      {project.problem}
                    </div>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  flexShrink: 0,
                  paddingTop: '4px',
                }}>
                  <span style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '11px',
                    color: '#485F70',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {project.type}
                  </span>
                  <span style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '11px',
                    color: '#485F70',
                    letterSpacing: '0.04em',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: MASTERS LEADERBOARD ───────────────────── */}
      <div style={{
        ...S.sectionWrap,
        ...S.divider,
        paddingTop: '96px',
        paddingBottom: '96px',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ maxWidth: '320px', width: '100%' }}>

          <div style={{
            ...S.label,
            borderTop: '1px solid rgba(150, 170, 187, 0.10)',
            paddingTop: '16px',
            marginBottom: '36px',
          }}>
            Masters · Apr 11
          </div>

          {/* Rank 1 — gold */}
          <div className="tabnum" style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '21px',
            fontWeight: '600',
            color: '#D8A931',
            letterSpacing: '-0.01em',
            marginBottom: '20px',
          }}>
            <span>1&nbsp;&nbsp;MCILROY</span>
            <span>−12</span>
          </div>

          {/* Rank 2 */}
          <div className="tabnum" style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            color: '#96AABB',
            borderTop: '1px solid rgba(150, 170, 187, 0.08)',
            paddingTop: '14px',
            marginBottom: '14px',
          }}>
            <span>2&nbsp;&nbsp;SCHAUFFELE</span>
            <span>−8</span>
          </div>

          {/* Rank 3 */}
          <div className="tabnum" style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            color: '#6B8599',
            borderTop: '1px solid rgba(150, 170, 187, 0.08)',
            paddingTop: '14px',
          }}>
            <span>3&nbsp;&nbsp;HOVLAND</span>
            <span>−7</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: EXPERIMENTS (HN band) ─────────────────── */}
      <div style={{
        ...S.sectionWrap,
        ...S.divider,
        paddingTop: '96px',
        paddingBottom: '96px',
        minHeight: '50vh',
      }}>
        {/* Oversized label — size is authority, weight is not */}
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '50px',
          fontWeight: '400',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#DFE7F1',
          marginBottom: '56px',
        }}>
          Experiments
        </div>

        <div style={{ maxWidth: '480px' }}>
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              target={exp.externalUrl ? '_blank' : undefined}
              rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
              className="u-line"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '16px 0',
                borderBottom: '1px solid rgba(150, 170, 187, 0.08)',
                gap: '20px',
              }}>
                <div>
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#DFE7F1',
                    marginBottom: '3px',
                  }}>
                    {exp.title}
                  </div>
                  {exp.description && (
                    <div style={{
                      fontFamily: '"Work Sans", sans-serif',
                      fontSize: '13px',
                      fontWeight: '300',
                      color: '#6B8599',
                      lineHeight: 1.55,
                    }}>
                      {exp.description}
                    </div>
                  )}
                </div>
                <span className="tabnum" style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '12px',
                  color: '#485F70',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}>
                  {exp.year}
                </span>
              </div>
            </a>
          ))}

          {/* Sports callouts — inline, factual */}
          <div style={{
            marginTop: '28px',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '12px',
            color: '#96AABB',
            letterSpacing: '0.04em',
          }}>
            Pistons 118 – 100&nbsp;&nbsp;·&nbsp;&nbsp;Tigers 2 – 0
          </div>
        </div>
      </div>

      {/* ── SECTION 6: YOGANANDA QUOTE ───────────────────────── */}
      <div style={{
        ...S.sectionWrap,
        ...S.divider,
        paddingTop: '96px',
        paddingBottom: '64px',
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: '480px',
          borderLeft: '2px solid #D8A931',
          paddingLeft: '28px',
        }}>
          <p style={{
            fontFamily: '"Work Sans", sans-serif',
            fontSize: '21px',
            fontWeight: '300',
            lineHeight: 1.75,
            color: '#DFE7F1',
            margin: '0 0 16px 0',
          }}>
            "The season of failure is the best time for sowing the seeds of success."
          </p>
          <div style={{
            fontFamily: '"Work Sans", sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            color: '#6B8599',
            letterSpacing: '0.04em',
          }}>
            Paramahansa Yogananda
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <div style={{
        ...S.sectionWrap,
        ...S.divider,
        paddingTop: '48px',
        paddingBottom: '64px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
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