import { css } from '../../styled-system/css'
import { BrandLockup } from './BrandLockup'

export function Sidebar() {
  return (
    <Box_header>
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({
          display: 'inline-flex',
          alignItems: 'center',
          color: 'accent',
        })}
      >
        <BrandLockup variant="horizontal-sm" mode="single-color" roleLine={false} />
      </a>
    </Box_header>
  )
}

function Box_header({ children }: { children: React.ReactNode }) {
  return (
    <header
      className={css({
        minHeight: '88px',
        display: 'flex',
        alignItems: 'center',
        paddingX: 'clamp(24px, 6vw, 96px)',
        paddingTop: 'clamp(20px, 4vh, 32px)',
        minWidth: 0,
        overflowX: 'hidden',
      })}
    >
      {children}
    </header>
  )
}
