import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '38% 1fr',
        height: '100vh',
        overflow: 'hidden',
        minWidth: '580px',
      }}
    >
      <Sidebar />
      <main
        style={{
          height: '100vh',
          overflowY: 'auto',
          background: '#F4F7F4',
        }}
      >
        {children}
      </main>
    </div>
  )
}