import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

const layoutClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '4fr 1fr' },
  minHeight: '100vh',
  bg: 'bg',
})

const mainColClass = css({
  minWidth: 0,
  borderRight: { base: 'none', md: '1px solid' },
  borderColor: 'border',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutClass}>
      <div className={mainColClass}>
        {children}
      </div>
      <Sidebar />
    </div>
  )
}