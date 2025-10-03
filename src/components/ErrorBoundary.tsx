import { Component, ReactNode, ErrorInfo } from 'react'

/**
 * ErrorBoundaryコンポーネントのプロパティ型定義
 */
type Props = {
  /** エラーバウンダリで保護する子要素 */
  children: ReactNode
}

/**
 * ErrorBoundaryコンポーネントの状態型定義
 */
type State = {
  /** エラーが発生したかどうか */
  hasError: boolean
  /** 発生したエラーオブジェクト */
  error: Error | null
}

/**
 * ErrorBoundaryコンポーネント
 *
 * React コンポーネントツリー内のエラーをキャッチし、
 * フォールバックUIを表示するエラーハンドリングコンポーネントです。
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  /**
   * エラーが発生した時に呼ばれ、状態を更新する
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  /**
   * エラーをログに記録する
   * 開発環境ではコンソールに出力、本番環境ではエラートラッキングサービスに送信
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 開発環境でのみコンソールにログ出力
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    // 本番環境ではエラートラッキングサービスに送信
    // 例: Sentry.captureException(error, { extra: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="section">
          <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h1>エラーが発生しました</h1>
            <p className="lead muted">申し訳ございません。予期しないエラーが発生しました。</p>
            <div className="actions" style={{ justifyContent: 'center', marginTop: '24px' }}>
              <button
                className="btn primary"
                onClick={() => window.location.href = '/'}
              >
                ホームに戻る
              </button>
              <button
                className="btn"
                onClick={() => window.location.reload()}
              >
                ページを再読み込み
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
