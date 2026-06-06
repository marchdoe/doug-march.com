import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        minHeight: '100vh',
        background: '#080D02',
        color: '#E6F9D2',
      })}
    >
      {children}
    </div>
  )
}