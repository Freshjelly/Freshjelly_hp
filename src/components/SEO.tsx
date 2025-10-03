import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type SEOProps = {
  title?: string
  description?: string
  ogImage?: string
  canonical?: string
}

const defaultMeta = {
  title: 'Freshjelly — 没入感あるデジタル体験を、軽やかに。',
  description: 'React/TypeScriptでなめらかな演出とパフォーマンスを両立。UI/UX設計から実装、パフォーマンス最適化まで。',
  ogImage: '/og-image.png',
  siteUrl: 'https://freshjelly.com'
}

export function SEO({ title, description, ogImage, canonical }: SEOProps) {
  const location = useLocation()

  const pageTitle = title ? `${title} | Freshjelly` : defaultMeta.title
  const pageDescription = description || defaultMeta.description
  const pageImage = ogImage || defaultMeta.ogImage
  const pageUrl = canonical || `${defaultMeta.siteUrl}${location.pathname}`

  useEffect(() => {
    // Update title
    document.title = pageTitle

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    updateMeta('description', pageDescription)
    updateMeta('og:title', pageTitle, true)
    updateMeta('og:description', pageDescription, true)
    updateMeta('og:url', pageUrl, true)
    updateMeta('og:image', pageImage, true)
    updateMeta('twitter:title', pageTitle)
    updateMeta('twitter:description', pageDescription)
    updateMeta('twitter:image', pageImage)

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', pageUrl)
  }, [pageTitle, pageDescription, pageImage, pageUrl])

  return null
}
