import { useEffect, useState } from 'react'
import '../styles/loading.css'

/**
 * LoadingScreenコンポーネントのプロパティ型定義
 */
type Props = {
  /** ローディング完了時に呼ばれるコールバック関数 */
  onComplete: () => void
}

/**
 * LoadingScreenコンポーネント
 *
 * アプリケーション起動時に表示されるサイバーパンク調のローディング画面です。
 * プログレスバーが100%に達すると、フェードアウトして onComplete を呼び出します。
 *
 * @example
 * ```tsx
 * <LoadingScreen onComplete={() => setIsLoading(false)} />
 * ```
 */
export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // ローディング時間とアニメーション設定
    const duration = 2000 // 2秒でローディング完了
    const interval = 20 // 20msごとに更新
    const increment = (interval / duration) * 100 // 1回の更新での増加量

    // プログレスバーを徐々に増やすタイマー
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          // フェードアウト後にコールバックを実行
          setTimeout(onComplete, 500)
          return 100
        }
        return next
      })
    }, interval)

    // クリーンアップ処理
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="cyber-border">
            <div className="cyber-corner tl"></div>
            <div className="cyber-corner tr"></div>
            <div className="cyber-corner bl"></div>
            <div className="cyber-corner br"></div>
            <h1 className="loading-title">
              {'<FRESHJELLY/>'}
            </h1>
          </div>
        </div>

        <div className="loading-bar-container">
          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-text">
            <span className="loading-label">LOADING SYSTEM</span>
            <span className="loading-percent">{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="loading-grid-bg"></div>
      </div>
    </div>
  )
}
