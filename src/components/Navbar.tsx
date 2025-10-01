type Props = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function Navbar({ theme, onToggle }: Props) {
  return (
    <header className="nav">
      <div className="container nav-row">
        <a href="#" className="brand" aria-label="Freshjelly Home">
          <img src="/logo.svg" width={140} height={32} alt="Freshjelly" />
        </a>
        <nav className="menu" aria-label="主要ナビゲーション">
          <a href="#features">特徴</a>
          <a href="#pricing">料金</a>
          <a href="#contact">お問い合わせ</a>
        </nav>
        <div className="nav-actions">
          <button className="btn ghost" onClick={onToggle} aria-label="テーマ切り替え">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <a className="btn primary" href="#contact">無料で始める</a>
        </div>
      </div>
    </header>
  )
}

