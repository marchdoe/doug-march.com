import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: 'bg',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <Sidebar />
      {children}
    </div>
  )
}