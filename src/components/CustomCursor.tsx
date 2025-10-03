import { useEffect, useState } from 'react'

/**
 * CustomCursorコンポーネント
 *
 * サイバーパンク調のカスタムカーソルを表示するコンポーネントです。
 * マウスの位置を追跡し、リンクやボタン上ではカーソルが拡大します。
 *
 * @example
 * ```tsx
 * <CustomCursor />
 * ```
 */
export function CustomCursor() {
  // カーソルの現在位置
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // カーソルがクリック可能な要素の上にあるかどうか
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    /**
     * マウス移動イベントハンドラ
     * カーソルの位置を更新し、ホバー中の要素に応じてスタイルを変更
     */
    const handleMouseMove = (e: MouseEvent) => {
      // カーソル位置を更新
      setPosition({ x: e.clientX, y: e.clientY })

      // ホバー中の要素がクリック可能かチェック
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      )
    }

    // イベントリスナーを登録
    window.addEventListener('mousemove', handleMouseMove)

    // クリーンアップ処理
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isPointer ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%)'
        }}
      />
      <div
        className="custom-cursor-trail"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}
