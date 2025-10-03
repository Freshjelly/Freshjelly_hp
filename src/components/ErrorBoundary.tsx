import { Component, ReactNode, ErrorInfo } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log errors in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    // In production, send to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo })
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
