import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        background: 'bg',
        color: 'text',
        fontFamily: 'display',
        overflowX: 'hidden',
      })}
    >
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
