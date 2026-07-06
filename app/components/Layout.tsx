import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const root = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100dvh',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={root}>
      <Sidebar />
      {children}
    </div>
  )
}