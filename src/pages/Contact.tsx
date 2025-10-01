export function Contact() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div>
          <h1>お問い合わせ</h1>
          <p className="section-desc">2営業日以内にご連絡します。お気軽にどうぞ。</p>
          <div className="card">
            <p className="muted">現在はデモのため送信は行われません。実運用では外部フォームやAPIに接続します。</p>
          </div>
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
            <span>ご要件</span>
            <select name="type" defaultValue="consult">
              <option value="consult">ご相談</option>
              <option value="estimate">お見積もり</option>
              <option value="support">サポート</option>
            </select>
          </label>
          <label>
            <span>内容</span>
            <textarea name="message" rows={6} placeholder="現状とゴール、希望時期など"></textarea>
          </label>
          <button className="btn primary" type="submit">送信（ダミー）</button>
        </form>
      </div>
    </section>
  )
}

