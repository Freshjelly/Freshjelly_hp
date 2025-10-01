import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

type Props = {
  theme: 'light' | 'dark'
  onToggle: () => void
  children: ReactNode
}

export function Layout({ theme, onToggle, children }: Props) {
  return (
    <>
      <Navbar theme={theme} onToggle={onToggle} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

