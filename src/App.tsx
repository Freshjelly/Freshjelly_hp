import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CustomCursor } from './components/CustomCursor'
import { LoadingScreen } from './components/LoadingScreen'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

// 遅延読み込み：初回アクセス時は必要なページのみロード
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })))
const Works = lazy(() => import('./pages/Works').then(m => ({ default: m.Works })))
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const Game = lazy(() => import('./pages/Game').then(m => ({ default: m.Game })))

function LoadingFallback() {
  return (
    <div className="section">
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <p className="muted">読み込み中...</p>
      </div>
    </div>
  )
}

// ページ遷移時のスクロール復元
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
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

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CustomCursor />
        <ScrollToTop />
        <Layout theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/works" element={<Works />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/game" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
