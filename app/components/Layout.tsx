import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutStyles = css({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: '60px 1fr 80px',
  maxWidth: 'none',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutStyles}>
      <Sidebar />
      {children}
    </div>
  )
}