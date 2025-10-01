import { type CSSProperties, useEffect, useRef, useState } from 'react'

type Slide = {
  tag: string
  title: string
  description: string
  detail: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  accent: string
  surface: string
  layers: [string, string, string]
  variant: 'aurora' | 'grid' | 'pulse'
}

const slides: Slide[] = [
  {
    tag: 'IMMERSIVE EXPERIENCE',
    title: '没入感あるデジタル体験を、軽やかに。',
    description: 'ブランドの世界観を壊さずに、React/TypeScriptでなめらかな演出とパフォーマンスを両立します。',
    detail: 'WebGL風エフェクト / スクロールモーション / 体験設計',
    primary: { label: '実績を見る', href: '/works' },
    secondary: { label: 'サービスを見る', href: '/services' },
    accent: '#38bdf8',
    surface: '#030916',
    layers: [
      'radial-gradient(circle at 20% 30%, rgba(56,189,248,.55), transparent 65%)',
      'radial-gradient(circle at 78% 20%, rgba(167,139,250,.45), transparent 60%)',
      'conic-gradient(from 0deg at 50% 50%, rgba(236,72,153,.35), transparent 70%)'
    ],
    variant: 'aurora'
  },
  {
    tag: 'STRATEGY TO DESIGN',
    title: '情報を描き直し、ビジネスを加速。',
    description: 'サービスとユーザーの接点を再設計して、意思ある導線とコンテンツ体験を作ります。',
    detail: 'IA / KPI設計 / プロトタイピング / グロース',
    primary: { label: 'サービスを見る', href: '/services' },
    secondary: { label: 'お問い合わせ', href: '/contact' },
    accent: '#f97316',
    surface: '#08060f',
    layers: [
      'linear-gradient(120deg, rgba(249,115,22,.5), transparent 65%)',
      'radial-gradient(circle at 40% 70%, rgba(59,130,246,.4), transparent 60%)',
      'linear-gradient(90deg, rgba(244,63,94,.35), transparent)'
    ],
    variant: 'grid'
  },
  {
    tag: 'ENGINEERING',
    title: '高速な開発で継続改善を味方に。',
    description: 'TypeScriptで堅牢に、スケールするデザインシステムを構築。継続改善しやすい基盤を提供します。',
    detail: 'Design System / API連携 / パフォーマンス最適化',
    primary: { label: 'お問い合わせ', href: '/contact' },
    secondary: { label: '実績を見る', href: '/works' },
    accent: '#22d3ee',
    surface: '#041014',
    layers: [
      'radial-gradient(circle at 68% 30%, rgba(34,211,238,.5), transparent 60%)',
      'linear-gradient(200deg, rgba(45,212,191,.45), transparent 70%)',
      'conic-gradient(from 120deg at 50% 50%, rgba(129,140,248,.35), transparent 70%)'
    ],
    variant: 'pulse'
  }
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const start = () => {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % slides.length)
      }, 6000)
    }
    start()
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [])

  const handleSelect = (next: number) => {
    setIndex(next)
    if (timer.current) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
  }

  const slide = slides[index]

  const heroStyle = {
    '--hero-surface': slide.surface,
    '--hero-layer-1': slide.layers[0],
    '--hero-layer-2': slide.layers[1],
    '--hero-layer-3': slide.layers[2],
    '--hero-accent': slide.accent,
    '--hero-rotation': `${index * 120}deg`
  } as CSSProperties

  return (
    <section className={`hero-immersive variant-${slide.variant}`} style={heroStyle}>
      <div className="hero-back" aria-hidden>
        <div className="hero-layer layer-1" />
        <div className="hero-layer layer-2" />
        <div className="hero-layer layer-3" />
        <div className="hero-noise" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-tag">{slide.tag}</span>
          <h1 key={slide.title} className="hero-title fade-in">{slide.title}</h1>
          <p key={slide.description} className="lead hero-lead fade-in-delayed">{slide.description}</p>
          <p className="hero-detail">{slide.detail}</p>
          <div className="actions">
            <a className="btn primary" href={slide.primary.href}>{slide.primary.label}</a>
            <a className="btn" href={slide.secondary.href}>{slide.secondary.label}</a>
          </div>
          <div className="hero-nav" aria-label="スライドナビゲーション">
            {slides.map((s, i) => (
              <button
                key={s.title}
                className={i === index ? 'hero-nav-dot active' : 'hero-nav-dot'}
                onClick={() => handleSelect(i)}
                aria-label={`${s.tag}へ`}
              />
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="scene">
            <div className="shape shape-a" />
            <div className="shape shape-b" />
            <div className="shape shape-c" />
            <div className="grid-overlay" />
          </div>
        </div>
      </div>
    </section>
  )
}
