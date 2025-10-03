import { SEO } from '../components/SEO'
import { NavLink } from 'react-router-dom'

export function NotFound() {
  return (
    <>
      <SEO
        title="ページが見つかりません"
        description="お探しのページは見つかりませんでした。"
      />
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '20px' }}>
            404
          </div>
          <h1>ページが見つかりません</h1>
          <p className="lead muted">お探しのページは移動または削除された可能性があります。</p>
          <div className="actions" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <NavLink className="btn primary" to="/">
              ホームに戻る
            </NavLink>
            <NavLink className="btn" to="/contact">
              お問い合わせ
            </NavLink>
          </div>
        </div>
      </section>
    </>
  )
}
