import type { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

export function EvidenceBody({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        gridArea: 'body',
        display: 'flex',
        flexDirection: 'column',
        px: { base: '6', lg: '9' },
        pt: { base: '6', lg: '2' },
      })}
    >
      {children}
    </div>
  )
}
