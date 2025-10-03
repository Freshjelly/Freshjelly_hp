const items = [
  {
    title: '高速パフォーマンス',
    desc: 'Vite + Reactにより、開発も本番もスピーディ。',
    icon: '⚡'
  },
  {
    title: '型安全な開発',
    desc: 'TypeScriptによる信頼性の高い実装と保守性。',
    icon: '🧩'
  },
  {
    title: 'レスポンシブ対応',
    desc: 'モバイルからデスクトップまで美しく最適化。',
    icon: '📱'
  },
  {
    title: 'Space Invaders',
    desc: 'Canvas APIで作ったレトロゲーム。遊んでみよう！',
    icon: '🎮',
    link: '/game'
  }
]

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <h2>選ばれる理由</h2>
        <p className="section-desc">モダンなスタックで、成果に直結する体験を。</p>
        <div className="grid-4">
          {items.map((f) => {
            const Component = f.link ? 'a' : 'div'
            return (
              <Component
                className="card feature tilt"
                key={f.title}
                {...(f.link ? { href: f.link } : {})}
                style={f.link ? { textDecoration: 'none', color: 'inherit' } : {}}
              >
                <div className="icon" aria-hidden>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Component>
            )
          })}
        </div>
      </div>
    </section>
  )
}
