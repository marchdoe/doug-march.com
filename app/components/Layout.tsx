import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'
import { Colophon } from './Colophon'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        background: 'bg',
        color: 'text',
        fontFamily: 'body',
      })}
    >
      <Sidebar />
      <main className={css({ minWidth: 0, overflowX: 'hidden' })}>{children}</main>
      <Colophon />
    </div>
  )
}
