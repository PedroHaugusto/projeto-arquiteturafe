import type { PropsWithChildren } from 'react'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="container" style={{ paddingTop: '86px', paddingBottom: '72px' }}>
      {children}
    </main>
  )
}