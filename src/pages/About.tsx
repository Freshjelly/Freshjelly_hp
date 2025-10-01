export function About() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div>
          <h1>私たちについて</h1>
          <p className="lead">シンプルに、速く、美しく。成果に直結する体験を作ります。</p>
          <p className="muted">
            小さなチームで素早く仮説検証し、最小の実装で最大の価値を届けます。丁寧な要件整理とデザイン言語の統一で、継続改善しやすい土台を提供します。
          </p>
        </div>
        <div className="card">
          <h3>スキルセット</h3>
          <ul className="list">
            <li>React / TypeScript / Node</li>
            <li>UI/UX 設計 / Figma / IA</li>
            <li>パフォーマンス / SEO / 解析</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

