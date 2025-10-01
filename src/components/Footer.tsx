export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-brand">
          <img src="/logo.svg" width={120} height={28} alt="Freshjelly" />
          <p>シンプルに、速く、美しく。Freshjellyはあなたのビジネスを加速します。</p>
        </div>
        <div className="footer-links">
          <a href="#features">機能</a>
          <a href="#pricing">料金</a>
          <a href="#contact">サポート</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Freshjelly</div>
      </div>
    </footer>
  )
}

