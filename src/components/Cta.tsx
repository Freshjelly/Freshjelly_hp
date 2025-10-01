export function Cta() {
  return (
    <section id="contact" className="section cta">
      <div className="container cta-row">
        <div>
          <h2>まずはお気軽にご相談ください</h2>
          <p className="section-desc">
            Figmaでのワイヤーフレーム/デザイン作成から、React/TypeScript実装まで。
            目標やブランドに合わせて、最適な提案をお届けします。
          </p>
        </div>
        <form className="card form" onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>お名前</span>
            <input type="text" name="name" placeholder="山田 太郎" required />
          </label>
          <label>
            <span>メールアドレス</span>
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>ご要望</span>
            <textarea name="message" rows={4} placeholder="サイトの目的、ターゲット、納期感など"></textarea>
          </label>
          <button className="btn primary w-full" type="submit">送信（ダミー）</button>
          <small className="muted">実運用ではフォーム送信先（API/外部サービス）を設定します。</small>
        </form>
      </div>
    </section>
  )
}

