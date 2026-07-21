import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

// shared radial gradient used across every panel surface (home hero, about, work, og)
export const panelGradient =
  'radial-gradient(120% 90% at 12% 0%, var(--colors-violet-500) 0%, var(--colors-violet-600) 46%, var(--colors-violet-700) 100%)'

const navClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '6',
  minHeight: '64px',
  flexWrap: 'wrap',
  paddingInline: '6vw',
  paddingTop: '8',
  color: 'textOnPanel',
})

const brandClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  color: 'textOnPanel',
})

const wordmarkClass = css({
  fontFamily: 'body',
  fontWeight: '600',
  fontSize: 'md',
  letterSpacing: 'wide',
})

const linksClass = css({
  display: 'flex',
  gap: '7',
  alignItems: 'center',
})

const navLinkClass = css({
  fontFamily: 'body',
  fontWeight: '500',
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textOnPanel',
  position: 'relative',
  paddingBlock: '4',
  lineHeight: '1',
  _after: {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '2',
    height: '2px',
    width: '100%',
    bg: 'accentGlow',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform .28s cubic-bezier(.2,.7,.2,1)',
  },
  _hover: {
    _after: { transform: 'scaleX(1)' },
  },
})

const markClass = css({
  display: 'inline-block',
  width: '26px',
  height: '26px',
  bg: 'textOnPanel',
  maskImage: `url(${logoMono})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: `url(${logoMono})`,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
})

export function Nav() {
  return (
    <nav className={navClass} aria-label="Primary">
      <a className={brandClass} href="/" aria-label="Doug March — home">
        <span className={markClass} />
        <span className={wordmarkClass}>Doug March</span>
      </a>
      <div className={linksClass}>
        <a href="/#work" className={navLinkClass}>Work</a>
        <a href="/about" className={navLinkClass}>About</a>
        <a href="/#log" className={navLinkClass}>Log</a>
      </div>
    </nav>
  )
}