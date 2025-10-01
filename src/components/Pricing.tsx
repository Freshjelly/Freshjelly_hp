const plans = [
  {
    name: 'スターター',
    price: '¥0',
    tag: '無料トライアル',
    features: ['初回相談', '要件ヒアリング', '概算見積もり']
  },
  {
    name: 'プロ',
    price: '¥300,000〜',
    tag: 'おすすめ',
    features: ['設計 & デザイン', '実装（React/TS）', '基本SEO & パフォーマンス最適化']
  },
  {
    name: 'エンタープライズ',
    price: '要相談',
    tag: 'カスタム',
    features: ['要件に合わせた拡張', '認証/管理画面/連携', '継続改善サポート']
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2>料金プラン</h2>
        <p className="section-desc">スモールスタートから大規模まで柔軟に対応します。</p>
        <div className="grid-3">
          {plans.map((p) => (
            <div key={p.name} className="card plan">
              <div className="plan-head">
                <span className="plan-tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <div className="price">{p.price}</div>
              </div>
              <ul className="list">
                {p.features.map((f) => (
                  <li key={f}>✅ {f}</li>
                ))}
              </ul>
              <a className="btn primary w-full" href="#contact">相談する</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

