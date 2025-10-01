type Work = {
  title: string
  summary: string
  tags: string[]
}

const works: Work[] = [
  { title: 'FinTechダッシュボード', summary: '高密度なデータを見やすく再構成、KPIの把握を最短化。', tags: ['React', 'TS', 'Chart'] },
  { title: 'D2C ランディング', summary: 'ブランドカラーに合わせたアニメーションでCVRを向上。', tags: ['UX', 'Performance'] },
  { title: 'SaaS マーケサイト', summary: '情報設計と導線の見直しで直帰率を30%改善。', tags: ['IA', 'SEO'] }
]

export function Works() {
  return (
    <section className="section">
      <div className="container">
        <h1>制作実績</h1>
        <p className="section-desc">公開可能な事例の一部をご紹介します。</p>
        <div className="grid-3">
          {works.map((w) => (
            <article className="card tilt" key={w.title}>
              <div className="thumb" aria-hidden>
                <div className="skeleton" />
              </div>
              <h3>{w.title}</h3>
              <p className="muted">{w.summary}</p>
              <div className="tags">
                {w.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
