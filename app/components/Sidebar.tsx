import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        top: '6vh',
        right: '5vw',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '6',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'block',
          opacity: 0.5,
          transition: 'opacity 0.2s ease',
          _hover: { opacity: 1 },
        })}
        aria-label="Home"
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '24px', height: '24px' })}
        />
      </a>
    </nav>
  )
}