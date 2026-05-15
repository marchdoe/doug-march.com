import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const page = css({
  padding: '4vw',
  paddingTop: 'calc(4vw + 52px)',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '3vw',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '16px',
    paddingTop: 'calc(16px + 52px)',
  },
})

const heroBlock = css({
  gridColumn: '1 / 9',
  gridRow: '1 / 6',
  minHeight: '68vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5vw 0',
  '@media (max-width: 768px)': {
    minHeight: '50vh',
    padding: '8vw 0',
  },
})

const heroLine = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 9.5vw, 152px)',
  fontWeight: '700',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  color: '{colors.neutral.50}',
  textTransform: 'uppercase',
  textWrap: 'balance',
  '@media (max-width: 768px)': {
    fontSize: 'clamp(36px, 12vw, 72px)',
  },
})

const heroAccent = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 9.5vw, 152px)',
  fontWeight: '700',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  color: '{colors.primary.400}',
  textTransform: 'uppercase',
  '@media (max-width: 768px)': {
    fontSize: 'clamp(36px, 12vw, 72px)',
  },
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '400',
  letterSpacing: '0.08em',
  color: '{colors.neutral.500}',
  marginTop: '32px',
  textTransform: 'uppercase',
})

const rightCol = css({
  gridColumn: '9 / 13',
  gridRow: '1 / 6',
  display: 'flex',
  flexDirection: 'column',
  gap: '3vw',
  '@media (max-width: 768px)': {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
  },
})

const signalBlock = css({
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '3vw',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  _hover: {
    borderColor: '{colors.primary.400}',
    background: '{colors.neutral.700}',
  },
  '@media (max-width: 768px)': {
    padding: '16px',
    flex: '1 1 calc(50% - 8px)',
    minWidth: '140px',
  },
})

const pgaBlock = css({
  minHeight: '38vh',
  '@media (max-width: 768px)': {
    minHeight: 'auto',
  },
})

const moonBlock = css({
  minHeight: '18vh',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  '@media (max-width: 768px)': {
    minHeight: 'auto',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.primary.400}',
  marginBottom: '12px',
})

const leaderRow = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.6',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '2px 0',
})

const leaderName = css({
  color: '{colors.neutral.50}',
  fontWeight: '700',
})

const leaderNameDim = css({
  color: '{colors.neutral.300}',
  fontWeight: '400',
})

const leaderScore = css({
  fontFamily: 'mono',
  fontSize: '13px',
  letterSpacing: '0.02em',
  color: '{colors.neutral.300}',
  fontVariantNumeric: 'tabular-nums',
})

const tieNote = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontStyle: 'italic',
  color: '{colors.neutral.500}',
  marginTop: '8px',
})

const moonCircle = css({
  width: '72px',
  height: '72px',
  borderRadius: '9999px',
  background: '{colors.neutral.900}',
  border: '2px solid {colors.neutral.700}',
  flexShrink: 0,
})

const moonText = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const moonLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.300}',
  fontVariant: 'small-caps',
})

const moonDetail = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  letterSpacing: '0.02em',
})

const hnBand = css({
  gridColumn: '1 / 13',
  gridRow: '6',
  background: '{colors.neutral.800}',
  borderTop: '1px solid {colors.primary.400}',
  borderBottom: '1px solid {colors.primary.400}',
  borderRadius: '2px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 3vw',
  gap: '16px',
  '@media (max-width: 768px)': {
    height: 'auto',
    padding: '16px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
})

const hnScore = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '700',
  color: '{colors.primary.400}',
  whiteSpace: 'nowrap',
})

const hnTitle = css({
  fontFamily: 'body',
  fontSize: 'clamp(14px, 1.4vw, 18px)',
  fontWeight: '500',
  color: '{colors.neutral.50}',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
})

const bottomRow = css({
  gridColumn: '1 / 13',
  gridRow: '7',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '3vw',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
})

const tigersBlock = css({
  gridColumn: '1 / 6',
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '3vw',
  transition: 'border-color 0.2s ease',
  _hover: {
    borderColor: '{colors.primary.400}',
  },
  '@media (max-width: 768px)': {
    padding: '16px',
  },
})

const tigersEyebrow = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '8px',
})

const tigersScore = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 4vw, 52px)',
  fontWeight: '700',
  color: '{colors.neutral.300}',
  lineHeight: '1',
})

const tigersMeta = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '8px',
})

const lossBadge = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '700',
  border: '1px solid {colors.neutral.500}',
  borderRadius: '2px',
  padding: '2px 6px',
  color: '{colors.neutral.400}',
})

const dateMuted = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
})

const musicBlock = css({
  gridColumn: '6 / 10',
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '3vw',
  transition: 'border-color 0.2s ease',
  _hover: {
    borderColor: '{colors.primary.400}',
  },
  '@media (max-width: 768px)': {
    padding: '16px',
  },
})

const projectBlock = css({
  gridColumn: '10 / 13',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const projectPill = css({
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '12px 16px',
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '500',
  color: '{colors.neutral.300}',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'border-color 0.2s ease, color 0.2s ease',
  _hover: {
    borderColor: '{colors.primary.400}',
    color: '{colors.neutral.50}',
    textDecoration: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.primary.400}',
    outlineOffset: '2px',
  },
})

const projectYear = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: '{colors.neutral.500}',
  fontVariantNumeric: 'tabular-nums',
})

const workSection = css({
  gridColumn: '1 / 13',
  gridRow: '8',
  marginTop: '2vw',
  '@media (max-width: 768px)': {
    marginTop: '16px',
  },
})

const sectionEyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid {colors.neutral.700}',
})

const featuredBlock = css({
  gridColumn: '1 / 13',
  gridRow: '9',
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '3vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3vw',
  transition: 'border-color 0.2s ease',
  _hover: {
    borderColor: '{colors.primary.400}',
  },
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '16px',
  },
})

const featuredTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(28px, 3.5vw, 56px)',
  fontWeight: '700',
  lineHeight: '0.95',
  color: '{colors.neutral.50}',
  textTransform: 'uppercase',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: '{colors.neutral.300}',
  maxWidth: '55ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '600',
  letterSpacing: '0.05em',
  color: '{colors.primary.400}',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '16px',
  padding: '8px 0',
  _hover: {
    color: '{colors.primary.200}',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.primary.400}',
    outlineOffset: '4px',
  },
})

const experimentsRow = css({
  gridColumn: '1 / 13',
  gridRow: '10',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '3vw',
  marginTop: '2vw',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px',
  },
})

const expCard = css({
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '20px',
  transition: 'border-color 0.2s ease',
  _hover: {
    borderColor: '{colors.primary.400}',
  },
})

const expTitle = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '600',
  color: '{colors.neutral.50}',
  marginBottom: '4px',
})

const expMeta = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  fontVariantNumeric: 'tabular-nums',
})

const expDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '{colors.neutral.400}',
  marginTop: '8px',
  maxWidth: '55ch',
})

const footerArea = css({
  gridColumn: '1 / 13',
  gridRow: '11',
  marginTop: '4vw',
  paddingTop: '16px',
  borderTop: '1px solid {colors.neutral.700}',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '4vw',
  '@media (max-width: 768px)': {
    marginTop: '32px',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  letterSpacing: '0.05em',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  _hover: {
    color: '{colors.neutral.300}',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.primary.400}',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <div className={page}>
      {/* HERO — cols 1-8, rows 1-5 */}
      <div className={heroBlock}>
        <h1>
          <span className={heroLine}>Stop Watching</span>
          <span className={heroAccent}>Yourself</span>
          <span className={heroLine}>Live.</span>
        </h1>
        <p className={attribution}>— Nicolas Chamfort</p>
      </div>

      {/* RIGHT SIGNAL COLUMN — cols 9-12 */}
      <div className={rightCol}>
        {/* PGA Championship */}
        <div className={`${signalBlock} ${pgaBlock}`}>
          <p className={eyebrow}>PGA Championship</p>
          <div>
            <div className={leaderRow}>
              <span className={leaderName}>Martin Kaymer</span>
              <span className={leaderScore}>−3</span>
            </div>
            <div className={leaderRow}>
              <span className={leaderNameDim}>Collin Morikawa</span>
              <span className={leaderScore}>−3</span>
            </div>
            <div className={leaderRow}>
              <span className={leaderNameDim}>Xander Schauffele</span>
              <span className={leaderScore}>−3</span>
            </div>
            <div className={leaderRow}>
              <span className={leaderNameDim}>Sahith Theegala</span>
              <span className={leaderScore}>−3</span>
            </div>
            <div className={leaderRow}>
              <span className={leaderNameDim}>Shane Lowry</span>
              <span className={leaderScore}>−3</span>
            </div>
          </div>
          <p className={tieNote}>5-way tie</p>
        </div>

        {/* New Moon */}
        <div className={`${signalBlock} ${moonBlock}`}>
          <div className={moonCircle} aria-hidden="true" />
          <div className={moonText}>
            <span className={moonLabel}>New Moon</span>
            <span className={moonDetail}>0.3% illuminated</span>
            <span className={moonDetail}>Night 29 of cycle</span>
          </div>
        </div>
      </div>

      {/* HN SURVEILLANCE BAND — full width row 6 */}
      <div className={hnBand}>
        <span className={hnScore}>886 →</span>
        <span className={hnTitle}>Removing the modem and GPS from my 2024 RAV4</span>
      </div>

      {/* BOTTOM ROW — row 7 */}
      <div className={bottomRow}>
        {/* Tigers */}
        <div className={tigersBlock}>
          <p className={tigersEyebrow}>Tigers</p>
          <p className={tigersScore}>4–9</p>
          <div className={tigersMeta}>
            <span className={lossBadge}>L</span>
            <span className={dateMuted}>May 14</span>
          </div>
        </div>

        {/* Music */}
        <div className={musicBlock}>
          <p className={eyebrow}>Now Playing</p>
          <p className={css({
            fontFamily: 'body',
            fontSize: '16px',
            fontWeight: '600',
            color: '{colors.neutral.50}',
            marginBottom: '4px',
          })}>Kid A</p>
          <p className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: '{colors.neutral.400}',
          })}>Radiohead</p>
        </div>

        {/* Quick project links */}
        <div className={projectBlock}>
          {selectedWork.slice(0, 3).map((p) => (
            <a key={p.slug} href={`/work/${p.slug}`} className={projectPill}>
              <span>{p.title}</span>
              <span className={projectYear}>{p.year}</span>
            </a>
          ))}
        </div>
      </div>

      {/* WORK SECTION */}
      <div className={workSection}>
        <p className={sectionEyebrow}>Filed Work</p>
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <div className={featuredBlock}>
          <div>
            <h2 className={featuredTitle}>{featuredProject.title}</h2>
          </div>
          <div>
            <p className={featuredProblem}>{featuredProject.problem}</p>
            {featuredProject.externalUrl && (
              <a href={featuredProject.externalUrl} className={featuredLink}>
                Visit {featuredProject.title} ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* Selected Work grid */}
      <div className={css({
        gridColumn: '1 / 13',
        gridRow: '10',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3vw',
        marginTop: '2vw',
        '@media (max-width: 768px)': {
          gap: '12px',
          marginTop: '16px',
        },
      })}>
        {selectedWork.map((p) => (
          <a key={p.slug} href={`/work/${p.slug}`} className={css({
            background: '{colors.neutral.800}',
            border: '1px solid {colors.neutral.700}',
            borderRadius: '2px',
            padding: '24px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s ease',
            _hover: {
              borderColor: '{colors.primary.400}',
              textDecoration: 'none',
            },
            '&:focus-visible': {
              outline: '2px solid {colors.primary.400}',
              outlineOffset: '2px',
            },
          })}>
            <h3 className={css({
              fontFamily: 'body',
              fontSize: '18px',
              fontWeight: '600',
              color: '{colors.neutral.50}',
              marginBottom: '4px',
            })}>{p.title}</h3>
            <p className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              color: '{colors.neutral.500}',
              fontVariantNumeric: 'tabular-nums',
            })}>{p.type} · {p.year}</p>
            {p.problem && (
              <p className={css({
                fontFamily: 'body',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '{colors.neutral.400}',
                marginTop: '12px',
                maxWidth: '55ch',
              })}>{p.problem}</p>
            )}
          </a>
        ))}
      </div>

      {/* Experiments */}
      <div className={css({
        gridColumn: '1 / 13',
        gridRow: '11',
        marginTop: '3vw',
        '@media (max-width: 768px)': {
          marginTop: '24px',
        },
      })}>
        <p className={sectionEyebrow}>Experiments</p>
      </div>

      <div className={css({
        gridColumn: '1 / 13',
        gridRow: '12',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3vw',
        '@media (max-width: 768px)': {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        },
      })}>
        {experiments.map((e) => (
          <a key={e.slug} href={e.externalUrl || `/work/${e.slug}`} className={css({
            background: '{colors.neutral.800}',
            border: '1px solid {colors.neutral.700}',
            borderRadius: '2px',
            padding: '20px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s ease',
            _hover: {
              borderColor: '{colors.primary.400}',
              textDecoration: 'none',
            },
            '&:focus-visible': {
              outline: '2px solid {colors.primary.400}',
              outlineOffset: '2px',
            },
          })}>
            <p className={expTitle}>{e.title}</p>
            <p className={expMeta}>{e.type} · {e.year}</p>
            {e.description && <p className={expDesc}>{e.description}</p>}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className={css({
        gridColumn: '1 / 13',
        gridRow: '13',
        marginTop: '4vw',
        paddingTop: '16px',
        borderTop: '1px solid {colors.neutral.700}',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '4vw',
        '@media (max-width: 768px)': {
          marginTop: '32px',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'flex-start',
        },
      })}>
        <span className={footerText}>© 2026 Doug March — Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </div>
    </div>
  )
}