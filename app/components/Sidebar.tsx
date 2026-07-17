import { Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

// Brandbar / lockup — horizontal-sm, single-color (currentColor) mark per shell declaration.
// Named "Sidebar" per contract even though visually it renders as the top brand bar,
// matching the mockup's inline-in-hero nav shell (no vertical sidebar in this design).
export function Sidebar() {
  return (
    <Flex align="center" gap="2" color="text" width="full">
      <img
        src={logoMono}
        alt="Doug March mark"
        className={css({ width: '24px', height: 'auto', flex: '0 0 auto', md: { width: '26px' } })}
      />
      <span
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'md',
          letterSpacing: 'normal',
          color: 'text',
        })}
      >
        Doug March
      </span>
      <span
        className={css({
          marginLeft: 'auto',
          fontSize: '2xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'textMuted',
          fontWeight: 'bold',
        })}
      >
        Summer '26 · Rebuild 07·17
      </span>
    </Flex>
  )
}