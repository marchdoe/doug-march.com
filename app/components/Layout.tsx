import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 'none',
  overflowX: 'hidden',
  minHeight: '100vh',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <Sidebar />
      {children}
    </div>
  )
}