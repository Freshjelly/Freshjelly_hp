import { useEffect, useState } from 'react'
import '../styles/loading.css'

type Props = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 2000 // 2秒
    const interval = 20
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          setTimeout(onComplete, 500)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="cyber-border">
            <div className="cyber-corner tl"></div>
            <div className="cyber-corner tr"></div>
            <div className="cyber-corner bl"></div>
            <div className="cyber-corner br"></div>
            <h1 className="loading-title">
              {'<FRESHJELLY/>'}
            </h1>
          </div>
        </div>

        <div className="loading-bar-container">
          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-text">
            <span className="loading-label">LOADING SYSTEM</span>
            <span className="loading-percent">{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="loading-grid-bg"></div>
      </div>
    </div>
  )
}
