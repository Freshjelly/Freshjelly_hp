const voices = [
  {
    name: 'Sato 様',
    role: 'スタートアップCEO',
    text: 'スピード感が抜群で、想像以上の品質でした。期待以上の成果を実感しています。'
  },
  {
    name: 'Tanaka 様',
    role: 'マーケティング責任者',
    text: 'デザインも実装も安心して任せられました。コンバージョンが明確に改善しました。'
  },
  {
    name: 'Suzuki 様',
    role: 'PM',
    text: '要件整理から丁寧に伴走してくれたのが印象的。継続して依頼したいです。'
  }
]

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <h2>お客様の声</h2>
        <div className="grid-3">
          {voices.map((v) => (
            <blockquote key={v.name} className="card quote">
              <p>“{v.text}”</p>
              <footer>
                <strong>{v.name}</strong>
                <span>{v.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

