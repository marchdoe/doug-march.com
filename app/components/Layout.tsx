import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const wrapper = css({
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: 'bg',
  color: 'text',
})

const main = css({
  flex: 1,
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={wrapper}>
      <Sidebar />
      <main className={main}>{children}</main>
    </div>
  )
}