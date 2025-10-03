import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * SEOコンポーネントのプロパティ型定義
 */
type SEOProps = {
  /** ページタイトル（サイト名が自動的に付与されます） */
  title?: string
  /** ページの説明文 */
  description?: string
  /** OGP画像のURL */
  ogImage?: string
  /** カノニカルURL（指定しない場合は現在のページURLが使用されます） */
  canonical?: string
}

/**
 * デフォルトのメタデータ設定
 */
const defaultMeta = {
  title: 'Freshjelly — 没入感あるデジタル体験を、軽やかに。',
  description: 'React/TypeScriptでなめらかな演出とパフォーマンスを両立。UI/UX設計から実装、パフォーマンス最適化まで。',
  ogImage: '/og-image.png',
  siteUrl: 'https://freshjelly.com'
}

/**
 * SEOコンポーネント
 *
 * ページごとのメタタグ（title, description, OGP等）を動的に設定します。
 *
 * @example
 * ```tsx
 * <SEO
 *   title="お問い合わせ"
 *   description="2営業日以内にご連絡します"
 * />
 * ```
 */
export function SEO({ title, description, ogImage, canonical }: SEOProps) {
  const location = useLocation()

  // ページ固有の値とデフォルト値をマージ
  const pageTitle = title ? `${title} | Freshjelly` : defaultMeta.title
  const pageDescription = description || defaultMeta.description
  const pageImage = ogImage || defaultMeta.ogImage
  const pageUrl = canonical || `${defaultMeta.siteUrl}${location.pathname}`

  useEffect(() => {
    // ページタイトルを更新
    document.title = pageTitle

    /**
     * メタタグを更新または作成するヘルパー関数
     * @param name - メタタグの name または property 属性の値
     * @param content - メタタグの content 属性の値
     * @param property - property属性を使用する場合は true（OGP用）
     */
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`)

      // 存在しない場合は新規作成
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    // 基本的なメタタグを更新
    updateMeta('description', pageDescription)

    // Open Graph (OGP) タグを更新
    updateMeta('og:title', pageTitle, true)
    updateMeta('og:description', pageDescription, true)
    updateMeta('og:url', pageUrl, true)
    updateMeta('og:image', pageImage, true)

    // Twitter Card タグを更新
    updateMeta('twitter:title', pageTitle)
    updateMeta('twitter:description', pageDescription)
    updateMeta('twitter:image', pageImage)

    // カノニカルリンクを更新
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', pageUrl)
  }, [pageTitle, pageDescription, pageImage, pageUrl])

  // このコンポーネントはレンダリングしない（副作用のみ）
  return null
}
