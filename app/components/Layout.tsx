import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        background: 'bg',
        color: 'text',
        minHeight: '100vh',
        paddingBottom: '60px',
        overflowX: 'hidden',
      })}
    >
      <main
        className={css({
          paddingX: { base: '6', md: '6vw' },
          paddingTop: { base: '6', md: '8' },
        })}
      >
        {children}
      </main>
      <Sidebar />
    </div>
  )
}