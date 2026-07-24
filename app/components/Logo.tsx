import logoMono from '../assets/logo-mono.svg'
import { css } from '../../styled-system/css'

// Brand lockup — single-color mode, mono asset tinted via the `text` token.
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <img
      src={logoMono}
      alt="Doug March"
      className={css({
        width: `${size}px`,
        height: 'auto',
        display: 'block',
        flex: 'none',
        color: 'text',
      })}
    />
  )
}