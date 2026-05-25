import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const main = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className={main}>
        {children}
      </main>
    </>
  )
}