export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-brand">
          <img src="/logo.svg" width={140} height={30} alt="Freshjelly" />
          <p>シンプルに、速く、美しく。成果につながるWeb体験を設計・実装します。</p>
        </div>
        <div className="footer-col">
          <h4>サイト</h4>
          <a href="/services">サービス</a>
          <a href="/works">実績</a>
          <a href="/about">私たち</a>
          <a href="/contact">お問い合わせ</a>
        </div>
        <div className="footer-col">
          <h4>連絡先</h4>
          <a href="mailto:hello@freshjelly.dev">hello@freshjelly.dev</a>
          <a href="https://github.com/Freshjelly" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://x.com/" target="_blank" rel="noreferrer">X</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Freshjelly</div>
      </div>
    </footer>
  )
}
