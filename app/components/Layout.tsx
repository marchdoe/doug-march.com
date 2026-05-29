import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        minHeight: '100vh',
        background: '{colors.stone.900}',
        color: '{colors.stone.50}',
      })}
    >
      {children}
    </div>
  )
}