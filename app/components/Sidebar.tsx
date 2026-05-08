import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const mastheadCss = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  columnGap: '24px',
  padding: '0 4vw',
  height: '64px',
  alignItems: 'center',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
  width: '100%',
})

const leftZoneCss = css({
  gridColumn: { base: '1 / -1', md: '1 / 4' },
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoCss = css({
  width: '28px',
  height: '28px',
  flexShrink: 0,
})

const nameCss = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accent', textDecoration: 'none' },
})

const centerZoneCss = css({
  gridColumn: { base: '1 / -1', md: '5 / 9' },
  textAlign: 'center',
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: 'textMuted',
  display: { base: 'none', md: 'block' },
})

const rightZoneCss = css({
  gridColumn: { base: '1 / -1', md: '10 / 13' },
  display: 'flex',
  alignItems: 'center',
  justifyContent: { base: 'flex-start', md: 'flex-end' },
  gap: '24px',
})

const navLinkCss = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '11px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '12px 0',
  _hover: { color: 'accent', textDecoration: 'none' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const mobileBarCss = css({
  display: { base: 'flex', md: 'none' },
  padding: '12px 4vw',
  gap: '16px',
  alignItems: 'center',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
})

export function Sidebar() {
  return (
    <header>
      <div className={mastheadCss}>
        <div className={leftZoneCss}>
          <img src={logoSvg} alt="Doug March logo" className={logoCss} />
          <a href="/" className={nameCss}>Doug March</a>
        </div>
        <div className={centerZoneCss}>
          May 8, 2026 — Broadsheet Edition
        </div>
        <nav className={rightZoneCss}>
          <a href="/" className={navLinkCss}>Work</a>
          <a href="/about" className={navLinkCss}>About</a>
        </nav>
      </div>
      <div className={mobileBarCss}>
        <span className={css({ fontFamily: 'mono', fontSize: '11px', color: 'textMuted', letterSpacing: '0.08em' })}>
          May 8, 2026
        </span>
      </div>
    </header>
  )
}