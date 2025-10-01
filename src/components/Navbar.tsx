import { NavLink, Link, useNavigate } from 'react-router-dom'

type Props = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function Navbar({ theme, onToggle }: Props) {
  return (
    <header className="nav">
      <div className="container nav-row">
        <Link to="/" className="brand" aria-label="Freshjelly Home">
          <img src="/logo.svg" width={160} height={32} alt="Freshjelly" />
        </Link>
        <nav className="menu" aria-label="主要ナビゲーション">
          <NavLink to="/services" className={({isActive}) => isActive ? 'active' : ''}>サービス</NavLink>
          <NavLink to="/works" className={({isActive}) => isActive ? 'active' : ''}>実績</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>私たち</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>お問い合わせ</NavLink>
        </nav>
        <div className="nav-actions">
          <button className="btn ghost" onClick={onToggle} aria-label="テーマ切り替え">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link className="btn primary" to="/contact">無料で始める</Link>
        </div>
      </div>
    </header>
  )
}
