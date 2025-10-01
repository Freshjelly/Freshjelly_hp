export function Hero() {
  return (
    <section className="section hero">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">MODERN • REACT • TYPESCRIPT</p>
          <h1>速く、美しく、成果に繋がるWeb体験</h1>
          <p className="lead">
            HTML/CSS/TypeScript/Reactをベースに、洗練されたUIと高速なパフォーマンス。
            デザインから実装まで一気通貫でサポートします。
          </p>
          <div className="actions">
            <a className="btn primary" href="#contact">無料相談</a>
            <a className="btn" href="#features">機能を見る</a>
          </div>
        </div>
        <div className="hero-media" aria-hidden>
          <div className="glass card">
            <div className="code-window">
              <div className="dots"><span></span><span></span><span></span></div>
              <pre><code>{`function Experience() {
  return (
    <Hero />
    <Features />
    <CTA />
  )
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

