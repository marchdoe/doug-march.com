import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

const navLinkClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  color: 'textOnSpine',
  opacity: 0.8,
  padding: { base: '2', md: '2' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  writingMode: { base: 'horizontal-tb', md: 'vertical-rl' },
  transform: { base: 'none', md: 'rotate(180deg)' },
  transition: 'opacity .2s ease',
  _hover: { opacity: 1 },
})

export function Sidebar() {
  return (
    <div
      className={css({
        bg: 'spineBg',
        color: 'textOnSpine',
        display: 'flex',
        flexDirection: { base: 'row', md: 'column' },
        alignItems: 'center',
        justifyContent: { base: 'space-between', md: 'flex-start' },
        padding: { base: '3', md: '5' },
        gap: { base: '4', md: '0' },
        position: 'sticky',
        top: 0,
        zIndex: 20,
        width: { base: 'auto', md: '72px' },
        height: { base: 'auto', md: '100vh' },
      })}
    >
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({ display: 'inline-flex', color: 'textOnSpine', lineHeight: 0 })}
      >
        <img
          src={logoMono}
          alt="Doug March"
          className={css({
            width: { base: '44px', md: '40px' },
            height: 'auto',
            display: 'block',
            color: 'textOnSpine',
          })}
        />
      </a>
      <nav
        aria-label="Primary"
        className={css({
          display: 'flex',
          flexDirection: { base: 'row', md: 'column' },
          gap: { base: '1', md: '2' },
          marginTop: { base: '0', md: 'auto' },
          marginBottom: { base: '0', md: '2' },
          alignItems: 'center',
        })}
      >
        <a href="/#work" className={navLinkClass}>work</a>
        <a href="/about" className={navLinkClass}>about</a>
        <a href="/" className={navLinkClass}>index</a>
      </nav>
    </div>
  )
}