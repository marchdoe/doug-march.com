import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={css({ minHeight: '100vh', width: '100%', overflow: 'hidden' })}>
      {children}
    </div>
  )
}