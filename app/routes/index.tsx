import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

// ── Design tokens ────────────────────────────────────────────────
const OBSIDIAN     = '#0C1A23'
const CARD_DARK    = '#172B34'
const STONE_LIGHT  = '#E6E2DC'
const AMBER        = '#C48930'
const AMBER_GLOW   = 'rgba(196, 137, 48, 0.08)'
const TEXT_P       = '#EEF3F5'   // primary on dark
const TEXT_S       = '#B3CAD4'   // secondary on dark
const TEXT_M       = '#577E8E'   // muted on dark (stone.400 for legibility at 2xs)
const DARK_P       = '#172B34'   // primary on light
const DARK_S       = '#274048'   // secondary on light
const DARK_M       = '#84A8B8'   // muted on light
const BORDER_RULE  = '#B3CAD4'

// ── Interactive CSS (no hooks required) ─────────────────────────
const PAGE_STYLES = `
  .nav-link div {
    transition: border-left-color 150ms ease, color 150ms ease, padding-left 150ms ease;
  }
  .nav-link:hover div {
    border-left-color: #C48930 !important;
    color: #EEF3F5 !important;
    padding-left: 12px !important;
  }
  .work-link { display: block; }
  .work-link:hover .work-title { color: #C48930 !important; }
  .work-link:hover .work-num   { color: #C48930 !important; }
  .right-row:hover { background: rgba(196,137,48,0.08) !important; cursor: default; }
  .left-scroll  { scrollbar-width: none; }
  .left-scroll::-webkit-scrollbar  { display: none; }
  .right-scroll { scrollbar-width: none; }
  .right-scroll::-webkit-scrollbar { display: none; }
`

// ── Type shorthands ───────────────────────────────────────────────
const BC = '"Barlow Condensed", sans-serif'
const IPS = '"IBM Plex Sans", sans-serif'

// ── Root ─────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '42% 1fr',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: IPS,
      }}>
        <LeftPanel />
        <RightPanel />
        <SeamFootnote />
      </div>
    </>
  )
}

// ── Left Panel ───────────────────────────────────────────────────
function LeftPanel() {
  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      background: OBSIDIAN,
      borderRight: `1px solid ${AMBER}`,
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Identity */}
      <div style={{
        flexShrink: 0,
        paddingBottom: '28px',
        borderBottom: `1px solid ${CARD_DARK}`,
      }}>
        <div style={{
          fontFamily: BC,
          fontSize: '4.1875rem',
          fontWeight: 700,
          lineHeight: '0.92',
          letterSpacing: '-0.02em',
          color: TEXT_P,
          textTransform: 'uppercase',
        }}>
          DOUG<br />MARCH
        </div>
        <div style={{
          marginTop: '14px',
          fontFamily: IPS,
          fontSize: '0.5625rem',
          fontWeight: 300,
          letterSpacing: '0.10em',
          color: TEXT_S,
          textTransform: 'uppercase',
        }}>
          Product Designer &amp; Developer
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        flexShrink: 0,
        padding: '20px 0',
        borderBottom: `1px solid ${CARD_DARK}`,
      }}>
        {[
          { label: 'WORK',  href: '/' },
          { label: 'ABOUT', href: '/about' },
        ].map(({ label, href }) => (
          <a key={label} href={href} className="nav-link" style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: BC,
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: TEXT_S,
              textTransform: 'uppercase',
              paddingLeft: '14px',
              borderLeft: `2px solid transparent`,
            }}>
              {label}
            </div>
          </a>
        ))}
      </nav>

      {/* Work list — scrollable */}
      <div className="left-scroll" style={{
        flex: 1,
        overflowY: 'auto',
        paddingTop: '20px',
      }}>

        {/* Featured */}
        {featuredProject && (
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel label="FEATURED" />
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              target={featuredProject.externalUrl ? '_blank' : undefined}
              rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
              className="work-link"
              style={{ textDecoration: 'none' }}
            >
              <WorkRow
                num="00"
                title={featuredProject.title}
                type={featuredProject.type}
                year={String(featuredProject.year)}
                featured
              />
            </a>
          </div>
        )}

        {/* Selected Work */}
        {selectedWork.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel label="SELECTED WORK" />
            {selectedWork.map((p, i) => (
              <a
                key={p.slug}
                href={`/work/${p.slug}`}
                className="work-link"
                style={{ textDecoration: 'none' }}
              >
                <WorkRow
                  num={String(i + 1).padStart(2, '0')}
                  title={p.title}
                  type={p.type}
                  year={String(p.year)}
                />
              </a>
            ))}
          </div>
        )}

        {/* Experiments */}
        {experiments.length > 0 && (
          <div>
            <SectionLabel label="EXPERIMENTS" />
            {experiments.map((p, i) => (
              <a
                key={p.slug}
                href={p.externalUrl || p.liveUrl || `/work/${p.slug}`}
                target={p.externalUrl ? '_blank' : undefined}
                rel={p.externalUrl ? 'noopener noreferrer' : undefined}
                className="work-link"
                style={{ textDecoration: 'none' }}
              >
                <WorkRow
                  num={`E${i + 1}`}
                  title={p.title}
                  type={p.type}
                  year={String(p.year)}
                />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        flexShrink: 0,
        paddingTop: '20px',
        borderTop: `1px solid ${CARD_DARK}`,
      }}>
        <div style={{
          fontFamily: IPS,
          fontSize: '0.5625rem',
          fontWeight: 300,
          letterSpacing: '0.10em',
          color: TEXT_M,
          textTransform: 'uppercase',
        }}>
          2026 · Doug March · Available
        </div>
      </div>
    </div>
  )
}

// ── Section Label ─────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontFamily: IPS,
      fontSize: '0.5625rem',
      fontWeight: 500,
      letterSpacing: '0.10em',
      color: TEXT_M,
      textTransform: 'uppercase',
      paddingBottom: '6px',
      marginBottom: '2px',
    }}>
      {label}
    </div>
  )
}

// ── Work Row ──────────────────────────────────────────────────────
function WorkRow({
  num, title, type, year, featured = false
}: {
  num: string; title: string; type: string; year: string; featured?: boolean
}) {
  return (
    <div style={{
      height: '44px',
      display: 'grid',
      gridTemplateColumns: '28px 1fr auto auto',
      alignItems: 'center',
      gap: '10px',
      borderBottom: `1px solid ${CARD_DARK}`,
      cursor: 'pointer',
    }}>
      <span className="work-num" style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 400,
        color: TEXT_M,
        fontVariantNumeric: 'tabular-nums',
        transition: 'color 150ms ease',
      }}>
        {num}
      </span>
      <span className="work-title" style={{
        fontFamily: BC,
        fontSize: featured ? '1.3125rem' : '1rem',
        fontWeight: featured ? 600 : 400,
        color: featured ? TEXT_P : TEXT_S,
        letterSpacing: featured ? '-0.02em' : '-0.01em',
        textTransform: 'uppercase',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: 'color 150ms ease',
      }}>
        {title}
      </span>
      <span style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 300,
        color: TEXT_M,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}>
        {type}
      </span>
      <span style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 300,
        color: TEXT_M,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {year}
      </span>
    </div>
  )
}

// ── Right Panel ───────────────────────────────────────────────────
function RightPanel() {
  return (
    <div className="right-scroll" style={{
      height: '100vh',
      overflowY: 'auto',
      background: STONE_LIGHT,
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>

        {/* Panel date header */}
        <div style={{
          fontFamily: IPS,
          fontSize: '0.5625rem',
          fontWeight: 300,
          letterSpacing: '0.16em',
          color: DARK_M,
          textTransform: 'uppercase',
          marginBottom: '32px',
        }}>
          FRI · MAR 20 · 2026
        </div>

        {/* Zone 1: Results */}
        <ResultsBlock />

        {/* Zone separator */}
        <div style={{
          height: '1px',
          background: BORDER_RULE,
          margin: '32px 0',
        }} />

        {/* Zone 2: Valspar */}
        <ValsparBlock />

        {/* Push calendar to bottom */}
        <div style={{ flex: 1, minHeight: '32px' }} />

        {/* Zone 3: Calendar strip */}
        <CalendarStrip />
      </div>
    </div>
  )
}

// ── Results Block ─────────────────────────────────────────────────
function ResultsBlock() {
  return (
    <div>
      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '10px',
      }}>
        <span style={{
          fontFamily: IPS,
          fontSize: '0.5625rem',
          fontWeight: 500,
          letterSpacing: '0.10em',
          color: DARK_M,
          textTransform: 'uppercase',
        }}>
          RESULTS
        </span>
        <span style={{
          fontFamily: IPS,
          fontSize: '0.5625rem',
          fontWeight: 300,
          letterSpacing: '0.06em',
          color: DARK_M,
        }}>
          FRI · MAR 20
        </span>
      </div>

      {/* Top rule */}
      <div style={{ height: '1px', background: DARK_M, marginBottom: '0' }} />

      {/* Score rows */}
      <ScoreRow team="DETROIT RED WINGS"  score="3 – 1"    margin="+2"  />
      <ScoreRow team="DETROIT PISTONS"    score="117 – 95" margin="+22" />

      {/* Bottom rule */}
      <div style={{ height: '1px', background: DARK_M }} />

      {/* Combined margin */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '8px',
      }}>
        <span style={{
          fontFamily: IPS,
          fontSize: '0.5625rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: DARK_M,
          letterSpacing: '0.04em',
        }}>
          combined margin +24
        </span>
      </div>
    </div>
  )
}

function ScoreRow({ team, score, margin }: { team: string; score: string; margin: string }) {
  return (
    <div className="right-row" style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto auto auto',
      alignItems: 'center',
      height: '44px',
      borderBottom: `1px solid rgba(132, 168, 184, 0.3)`,
      gap: '16px',
      paddingRight: '2px',
    }}>
      <span style={{
        fontFamily: IPS,
        fontSize: '0.75rem',
        fontWeight: 400,
        letterSpacing: '0.06em',
        color: DARK_P,
        textTransform: 'uppercase',
      }}>
        {team}
      </span>
      <span style={{
        fontFamily: BC,
        fontSize: '1.3125rem',
        fontWeight: 700,
        color: DARK_P,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.01em',
      }}>
        {score}
      </span>
      <span style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 500,
        color: AMBER,
        letterSpacing: '0.04em',
      }}>
        W
      </span>
      <span style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 300,
        color: DARK_M,
        fontVariantNumeric: 'tabular-nums',
        minWidth: '28px',
        textAlign: 'right',
      }}>
        {margin}
      </span>
    </div>
  )
}

// ── Valspar Block ─────────────────────────────────────────────────
function ValsparBlock() {
  const leaders = [
    { name: 'SUNGJAE IM',       score: '-7', leader: true },
    { name: 'TAYLOR PENDRITH',  score: '-5', leader: false },
    { name: 'RUSSELL HENLEY',   score: '-4', leader: false },
  ]

  // GBV deliberate imperfection: manually typed dots — spacing not perfectly consistent
  const dots = '·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·'

  return (
    <div>
      <div style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 500,
        letterSpacing: '0.10em',
        color: DARK_M,
        textTransform: 'uppercase',
        marginBottom: '10px',
      }}>
        VALSPAR CHAMPIONSHIP · ROUND 3
      </div>

      {/* Dotted rule — the one deliberate imperfection */}
      <div style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        color: DARK_M,
        letterSpacing: '0.05em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginBottom: '4px',
        opacity: 0.7,
      }}>
        {dots}
      </div>

      {leaders.map((l) => (
        <div key={l.name} className="right-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '36px',
          borderBottom: `1px dotted ${DARK_M}`,
        }}>
          <span style={{
            fontFamily: IPS,
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
            color: DARK_S,
            textTransform: 'uppercase',
          }}>
            {l.name}
          </span>
          <span style={{
            fontFamily: BC,
            fontSize: '1rem',
            fontWeight: 600,
            color: l.leader ? DARK_P : DARK_S,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {l.score}
          </span>
        </div>
      ))}

      {/* Closing dotted rule */}
      <div style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        color: DARK_M,
        letterSpacing: '0.05em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginTop: '4px',
        opacity: 0.7,
      }}>
        {dots}
      </div>
    </div>
  )
}

// ── Calendar Strip ────────────────────────────────────────────────
function CalendarStrip() {
  const events = [
    { date: 'MAR 20', label: 'TODAY',            active: true  },
    { date: 'MAR 22', label: 'MADNESS 2ND RND',  active: false },
    { date: 'MAR 26', label: 'OPENING DAY ⚾',    active: false },
  ]

  return (
    <div style={{
      borderTop: `1px solid ${BORDER_RULE}`,
      boxShadow: '0 -1px 0 rgba(23,43,52,0.10)',
      paddingTop: '14px',
      height: '64px',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Timeline connecting line */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '0',
        right: '0',
        height: '1px',
        background: BORDER_RULE,
      }} />

      <div style={{
        display: 'flex',
        gap: '56px',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 1,
      }}>
        {events.map((e) => (
          <div key={e.date} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '5px',
          }}>
            {/* Square node */}
            <div style={{
              width: '4px',
              height: '4px',
              flexShrink: 0,
              background: e.active ? AMBER : BORDER_RULE,
              marginTop: '1px',
            }} />
            <span style={{
              fontFamily: BC,
              fontSize: '0.5625rem',
              fontWeight: 400,
              letterSpacing: '0.10em',
              color: DARK_M,
              textTransform: 'uppercase',
            }}>
              {e.date}
            </span>
            <span style={{
              fontFamily: IPS,
              fontSize: '0.5625rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: DARK_P,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {e.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Seam Footnote ─────────────────────────────────────────────────
function SeamFootnote() {
  return (
    <div style={{
      position: 'absolute',
      left: '42%',
      top: '62vh',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      background: OBSIDIAN,
      border: `1px solid ${AMBER}`,
      padding: '4px 10px',
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: BC,
        fontSize: '0.5625rem',
        fontWeight: 400,
        letterSpacing: '0.16em',
        color: AMBER,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        display: 'block',
      }}>
        ARXIV: INDEPENDENT · MARCH 2026
      </span>
    </div>
  )
}