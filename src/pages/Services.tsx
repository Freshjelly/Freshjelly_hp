const services = [
  {
    title: 'UI/UX 設計',
    desc: 'ユーザー行動の仮説設計から情報設計、ワイヤー、プロトタイプまで対応。',
    points: ['要件ヒアリング', 'ワイヤーフレーム', 'プロトタイピング']
  },
  {
    title: 'フロント実装',
    desc: 'React/TypeScriptで高品質かつ保守しやすい実装。アクセシビリティにも配慮。',
    points: ['React/TS', 'アニメーション', 'アクセシビリティ']
  },
  {
    title: 'パフォーマンス最適化',
    desc: 'LCP/CLS/JS負荷の改善や画像最適化で、体感速度とSEOを向上。',
    points: ['Core Web Vitals', '画像最適化', 'Bundle削減']
  }
]

export function Services() {
  return (
    <section className="section">
      <div className="container">
        <h1>サービス</h1>
        <p className="section-desc">戦略から設計、実装、グロースまで伴走します。</p>
        <div className="grid-3">
          {services.map((s) => (
            <div className="card" key={s.title}>
              <h3>{s.title}</h3>
              <p className="muted">{s.desc}</p>
              <ul className="list">
                {s.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

