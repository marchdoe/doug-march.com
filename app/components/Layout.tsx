import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const wrapperCss = css({
  minHeight: '100dvh',
  background: 'bg',
  color: 'text',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={wrapperCss}>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}