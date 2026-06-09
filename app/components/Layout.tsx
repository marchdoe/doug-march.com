import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  background: 'bg',
  color: 'text',
})

const mainWrap = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <Sidebar />
      <main className={mainWrap}>
        {children}
      </main>
    </div>
  )
}