import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { Cta } from './components/Cta'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) return saved
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <Navbar theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

