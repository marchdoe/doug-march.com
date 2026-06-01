import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { timeline, capabilities } from '../content/timeline'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

const masthead = css({
  background: '{colors.stone.900}',
  padding: '36px 5vw 52px',
  minHeight: '28vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const heroLine1 = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 5.8vw, 92px)',
  letterSpacing: '0.06em',
  lineHeight: '0.95',
  color: '{colors.stone.50}',
  margin: 0,
})

const heroLine2 = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 5.8vw, 92px)',
  letterSpacing: '0.06em',
  lineHeight: '0.95',
  color: '{colors.magenta.400}',
  margin: 0,
})

const tagline = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '{colors.stone.400}',
  marginTop: '12px',
  lineHeight: 'normal',
})

const quoteStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontStyle: 'italic',
  color: '{colors.stone.500}',
  marginTop: '8px',
  lineHeight: 'normal',
})

/* Column headers */
const headerRow = css({
  display: 'grid',
  gridTemplateColumns: '2fr 1.5fr 1fr',
  padding: '0 5vw',
  borderBottom: '2px solid',
  borderColor: '{colors.stone.900}',
  '@media (max-width: 768px)': {
    display: 'none',
  },
})

const headerCell = css({
  fontFamily: 'display',
  fontSize: '13px',
  letterSpacing: '0.15em',
  color: '{colors.stone.500}',
  textTransform: 'uppercase',
  padding: '8px 16px',
  lineHeight: '1.25',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  '&:not(:last-child)': {
    borderRight: '1px solid',
    borderColor: '{colors.stone.200}',
  },
})

/* Index body */
const indexBody = css({
  display: 'grid',
  gridTemplateColumns: '2fr 1.5fr 1fr',
  padding: '0 5vw',
  flex: 1,
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  },
})

const column = css({
  '&:not(:last-child)': {
    borderRight: '1px solid',
    borderColor: '{colors.stone.200}',
  },
  '@media (max-width: 768px)': {
    borderRight: 'none !important',
    borderBottom: '2px solid',
    borderColor: '{colors.stone.900}',
    padding: '0 5vw',
  },
})

const mobileColHeader = css({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'display',
    fontSize: '13px',
    letterSpacing: '0.15em',
    color: '{colors.stone.500}',
    textTransform: 'uppercase',
    padding: '12px 16px',
    borderBottom: '2px solid',
    borderColor: '{colors.stone.900}',
  },
})

const indexRow = css({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  padding: '0 16px',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
  transition: 'background 80ms ease',
  cursor: 'default',
  gap: '8px',
  _hover: {
    background: '{colors.magenta.50}',
  },
  '@media (max-width: 768px)': {
    height: 'auto',
    minHeight: '48px',
    flexWrap: 'wrap',
    padding: '10px 16px',
    gap: '4px',
  },
})

const indexRowLink = css({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  padding: '0 16px',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
  transition: 'background 80ms ease',
  cursor: 'pointer',
  textDecoration: 'none !important',
  gap: '8px',
  color: 'inherit !important',
  _hover: {
    background: '{colors.magenta.50}',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '-2px',
  },
  '@media (max-width: 768px)': {
    height: 'auto',
    minHeight: '48px',
    flexWrap: 'wrap',
    padding: '10px 16px',
    gap: '4px',
  },
})

const rowName = css({
  fontFamily: 'display',
  fontSize: '18px',
  letterSpacing: '0.08em',
  color: '{colors.stone.900}',
  lineHeight: '1.25',
  whiteSpace: 'nowrap',
  transition: 'color 80ms ease',
  flexShrink: 0,
  [`${indexRowLink}:hover &, ${indexRow}:hover &`]: {
    color: '{colors.magenta.500}',
  },
})

const rowMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '{colors.stone.500}',
  lineHeight: '1.25',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

const rowDesc = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0em',
  color: '{colors.stone.700}',
  lineHeight: '1.5',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
  minWidth: 0,
  '@media (max-width: 768px)': {
    whiteSpace: 'normal',
    width: '100%',
  },
})

const rowDescItalic = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0em',
  color: '{colors.stone.700}',
  lineHeight: '1.5',
  fontStyle: 'italic',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
  minWidth: 0,
})

const accentText = css({
  color: '{colors.magenta.600}',
  fontSize: '13px',
  fontFamily: 'body',
})

const moonDot = css({
  color: '{colors.magenta.400}',
  fontSize: '10px',
  marginRight: '4px',
})

const footerWrap = css({
  padding: '16px 5vw',
  borderTop: '1px solid',
  borderColor: '{colors.stone.200}',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.stone.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.stone.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none !important',
  '&:hover': {
    color: '{colors.magenta.500} !important',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '2px',
  },
})

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments,
  ]

  return (
    <>
      {/* Masthead */}
      <header className={masthead}>
        <h1>
          <span className={heroLine1}>CRAFT ITSELF</span>
          <span className={heroLine2}>BECOMES THE STORY</span>
        </h1>
        <p className={tagline}>MON 01 JUNE 2026 · FIRST DAY OF SUMMER · FULL MOON 96.5%</p>
        <p className={quoteStyle}>"If you look inwards, you'll find the answer has been in you all along."</p>
      </header>

      {/* Column headers — desktop */}
      <div className={headerRow}>
        <div className={headerCell}>Work</div>
        <div className={headerCell}>Signals</div>
        <div className={headerCell}>About</div>
      </div>

      {/* Index body */}
      <div className={indexBody}>
        {/* WORK COLUMN */}
        <div className={column}>
          <div className={mobileColHeader}>Work</div>
          {allWork.map((p) => {
            const href = p.depth === 'full' ? `/work/${p.slug}` : (p.externalUrl || `/work/${p.slug}`)
            return (
              <a key={p.slug} href={href} className={indexRowLink}>
                <span className={rowName}>{p.title.toUpperCase()}</span>
                <span className={rowMeta}>{p.type.toUpperCase()} · {p.year}</span>
                <span className={rowDesc}>{p.problem || p.description || ''}</span>
              </a>
            )
          })}
        </div>

        {/* SIGNALS COLUMN */}
        <div className={column}>
          <div className={mobileColHeader}>Signals</div>

          <div className={indexRow}>
            <span className={rowName}>SCHWAB CHALLENGE</span>
            <span className={rowMeta}>RUSSELL HENLEY −13 · FINAL</span>
            <span className={accentText}>→ 15TH CLUB</span>
          </div>

          <div className={indexRow}>
            <span className={rowName}>DETROIT TIGERS</span>
            <span className={rowMeta}>1–2 LOSS · MAY 31</span>
            <span className={rowDescItalic}>Close game, wrong side</span>
          </div>

          <div className={indexRow}>
            <span className={rowName}><span className={moonDot}>●</span>FULL MOON</span>
            <span className={rowMeta}>96.5% · DAY 16 OF CYCLE</span>
          </div>

          <div className={indexRow}>
            <span className={rowName}>HN</span>
            <span className={rowMeta}>CLOUDFLARE TURNSTILE WEBGL — 698 PTS</span>
            <span className={rowDesc}>Fingerprinting concerns, 2026</span>
          </div>

          <div className={indexRow}>
            <span className={rowName}>LISTENING</span>
            <span className={rowMeta}>GUIDED BY VOICES · MY MORNING JACKET</span>
          </div>

          <div className={indexRow}>
            <span className={rowName}>DAYLIGHT</span>
            <span className={rowMeta}>14.6 HRS · SUNRISE 04:51 / SUNSET 19:24</span>
          </div>
        </div>

        {/* ABOUT COLUMN */}
        <div className={column}>
          <div className={mobileColHeader}>About</div>

          <a href="/about" className={indexRowLink}>
            <span className={rowName}>{identity.name.toUpperCase()}</span>
            <span className={rowMeta}>{identity.role.toUpperCase()}</span>
          </a>

          {timeline.slice(0, 4).map((t, i) => (
            <div key={i} className={indexRow}>
              <span className={rowName}>{t.company.toUpperCase()}</span>
              <span className={rowMeta}>{t.year}</span>
              <span className={rowDesc}>{t.role}</span>
            </div>
          ))}

          <div className={indexRow}>
            <span className={rowMeta} style={{ flex: 1 }}>
              {capabilities.slice(0, 5).join(' · ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}