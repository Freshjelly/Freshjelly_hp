import { useEffect, useMemo, useRef, useState } from 'react'

const slides = [
  { title: '速く、美しく、成果へ直行。', text: 'React/TSで、洗練とスピードを両立。' },
  { title: '設計から実装まで、伴走。', text: 'Figmaで設計し、そのまま高品質に仕上げる。' },
  { title: '動きのある体験を、軽く。', text: 'パフォーマンス最適化で気持ちの良いUI。' }
]

export function Hero() {
  const [idx, setIdx] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [])

  return (
    <section className="hero-visual">
      <div className="hero-overlay"/>
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="reveal">{slides[idx].title}</h1>
          <p className="lead reveal-delayed">{slides[idx].text}</p>
          <div className="actions">
            <a className="btn primary" href="/contact">無料相談</a>
            <a className="btn" href="/services">サービスを見る</a>
          </div>
          <div className="dots-nav" aria-label="スライドナビゲーション">
            {slides.map((_, i) => (
              <button key={i} className={i === idx ? 'dot active' : 'dot'} onClick={() => setIdx(i)} aria-label={`スライド${i+1}`}></button>
            ))}
          </div>
        </div>
        <div className="hero-stage" aria-hidden>
          <div className="hero-card orbit" style={{ ['--i' as any]: idx }}>
            <div className="orb orb1"/>
            <div className="orb orb2"/>
            <div className="orb orb3"/>
          </div>
        </div>
      </div>
    </section>
  )
}
