import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const mainWrap = css({
  paddingTop: '64px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className={mainWrap}>
        {children}
      </main>
    </>
  )
}