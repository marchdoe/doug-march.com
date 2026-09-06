import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'grid',
        minH: '100vh',
        bg: 'bg',
        maxW: '100vw',
        overflowX: 'hidden',
        gridTemplateColumns: { base: '1fr', lg: '1.4fr 1fr' },
        gridTemplateAreas: {
          base: '"field" "header" "body" "footer"',
          lg: '"field header" "field body" "field footer"',
        },
        gridTemplateRows: { base: 'auto auto auto auto', lg: 'auto 1fr auto' },
        // Grid items default to min-width:auto (= max-content), which lets a
        // long unwrapped line (nav row, footer stat line) force the track —
        // and the whole page — wider than the viewport. Forcing every direct
        // grid child back to minWidth:0 lets flex-wrap / word-wrap inside
        // them actually take effect instead of being overridden by the grid.
        '& > *': {
          minWidth: 0,
        },
      })}
    >
      <Sidebar />
      {children}
    </div>
  )
}
