import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const splitGrid = css({
  display: 'grid',
  gridTemplateColumns: '45vw 55vw',
  minHeight: '100vh',
  maxWidth: 'none',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const leftPanel = css({
  background: '{colors.neutral.950}',
  padding: 'clamp(24px, 6vw, 96px) clamp(20px, 4vw, 64px) clamp(20px, 5vw, 80px) clamp(20px, 6vw, 96px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    minHeight: '55vh',
    padding: '24px 24px 32px 24px',
  },
})

const rightPanel = css({
  background: '{colors.lime.400}',
  padding: 'clamp(20px, 5vw, 80px) clamp(20px, 6vw, 96px) clamp(20px, 5vw, 80px) clamp(20px, 5vw, 80px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    minHeight: '45vh',
    padding: '32px 24px 24px 24px',
  },
})

const heroLeft = css({
  fontFamily: 'display',
  fontSize: 'clamp(54px, 6.5vw, 100px)',
  lineHeight: '0.92',
  letterSpacing: '0.04em',
  color: '{colors.cream.100}',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  maxWidth: '80%',
  '@media (max-width: 768px)': {
    fontSize: 'clamp(42px, 12vw, 64px)',
    maxWidth: '100%',
  },
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.400}',
  letterSpacing: '0.08em',
  marginTop: '24px',
  lineHeight: 'normal',
})

const heroRight = css({
  fontFamily: 'display',
  fontSize: 'clamp(58px, 7vw, 108px)',
  lineHeight: '0.92',
  letterSpacing: '0.04em',
  color: '{colors.neutral.950}',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  maxWidth: '80%',
  '@media (max-width: 768px)': {
    fontSize: 'clamp(44px, 13vw, 68px)',
    maxWidth: '100%',
  },
})

const projectsSection = css({
  marginTop: 'auto',
  paddingTop: '48px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '16px',
  lineHeight: 'snug',
})

const projectRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '10px 0',
  borderTop: '1px solid {colors.neutral.700}',
  gap: '12px',
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'medium',
  color: '{colors.cream.100}',
  textDecoration: 'none',
  transition: 'color 150ms ease',
  _hover: {
    color: '{colors.lime.400}',
    textDecoration: 'none',
  },
  _focus: {
    outline: '2px solid {colors.lime.400}',
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.400}',
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
})

const featuredBlock = css({
  marginBottom: '32px',
})

const featuredTitle = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '{colors.neutral.950}',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '4px 0',
  transition: 'color 150ms ease',
  _hover: {
    color: '{colors.neutral.700}',
    textDecoration: 'none',
  },
  _focus: {
    outline: '2px solid {colors.neutral.950}',
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'rgba(8, 14, 7, 0.75)',
  lineHeight: 'normal',
  maxWidth: '50ch',
  marginTop: '6px',
})

const featuredLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(8, 14, 7, 0.5)',
  marginBottom: '8px',
  lineHeight: 'snug',
})

const signalCluster = css({
  borderTop: '1px solid rgba(8, 14, 7, 0.2)',
  paddingTop: '20px',
  marginTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

const signalRow = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.950}',
  lineHeight: 'normal',
  letterSpacing: '0.02em',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
})

const signalDim = css({
  color: 'rgba(8, 14, 7, 0.55)',
})

const expSection = css({
  borderTop: '1px solid rgba(8, 14, 7, 0.2)',
  paddingTop: '16px',
  marginTop: '16px',
})

const expRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '6px 0',
  gap: '8px',
})

const expTitle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.neutral.950}',
  textDecoration: 'none',
  fontWeight: 'medium',
  padding: '4px 0',
  transition: 'color 150ms ease',
  _hover: {
    color: '{colors.neutral.700}',
    textDecoration: 'none',
  },
  _focus: {
    outline: '2px solid {colors.neutral.950}',
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const expMeta = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'rgba(8, 14, 7, 0.5)',
  whiteSpace: 'nowrap',
  letterSpacing: '0.04em',
})

const footerArea = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: '{colors.neutral.500}',
  letterSpacing: '0.04em',
  marginTop: '24px',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
})

const footerLink = css({
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  padding: '4px 0',
  _hover: {
    color: '{colors.cream.100}',
  },
  _focus: {
    outline: '2px solid {colors.lime.400}',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <div className={splitGrid}>
      {/* LEFT PANEL — dark */}
      <div className={leftPanel}>
        <Sidebar />

        <div>
          <div className={heroLeft}>
            CONTENT<br />WITH
          </div>
          <div className={attribution}>— Andrew Carnegie, 1896</div>
        </div>

        {/* Selected work listing on dark side */}
        <div className={projectsSection}>
          <div className={sectionLabel}>Selected Work</div>
          {selectedWork.map((p) => (
            <div className={projectRow} key={p.slug}>
              <a href={`/work/${p.slug}`} className={projectTitle}>{p.title}</a>
              <span className={projectMeta}>{p.type} · {p.year}</span>
            </div>
          ))}
          <div className={footerArea}>
            <a href="/archive" className={footerLink}>Archive</a>
            <span>·</span>
            <span>Doug March © 2026</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — spring green */}
      <div className={rightPanel}>
        <div>
          <div className={heroRight}>MEDIOCRITY.</div>
        </div>

        {/* Featured project */}
        <div className={featuredBlock}>
          <div className={featuredLabel}>Featured</div>
          {featuredProject && (
            <>
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                className={featuredTitle}
              >
                {featuredProject.title} →
              </a>
              {featuredProject.problem && (
                <div className={featuredProblem}>{featuredProject.problem}</div>
              )}
            </>
          )}
        </div>

        {/* Experiments */}
        <div className={expSection}>
          <div className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(8, 14, 7, 0.5)',
            marginBottom: '8px',
            lineHeight: 'snug',
          })}>
            Experiments
          </div>
          {experiments.map((e) => (
            <div className={expRow} key={e.slug}>
              <a
                href={e.externalUrl || `/work/${e.slug}`}
                className={expTitle}
              >
                {e.title}
              </a>
              <span className={expMeta}>{e.type} · {e.year}</span>
            </div>
          ))}
        </div>

        {/* Signal cluster */}
        <div className={signalCluster}>
          <div className={signalRow}>
            <span>▼ TIGERS 3–4</span>
            <span className={signalDim} style={{ marginLeft: '12px' }}>Final</span>
          </div>
          <div className={signalRow}>
            <span>◐ Waxing crescent · 21%</span>
          </div>
          <div className={signalRow}>
            <span>Memorial Day — 5 days</span>
          </div>
          <div className={signalRow}>
            <span className={signalDim}>HN ·</span>
            <span style={{ marginLeft: '4px' }}>Gemini 3.5 Flash — 812 pts</span>
          </div>
          <div className={signalRow}>
            <span className={signalDim}>14.3h daylight · Sunrise 4:58</span>
          </div>
        </div>
      </div>
    </div>
  )
}