import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
}

export default function SEO({
  title,
  description = 'Smartcompany - Consultoria e Gestão de Excelência para Donos de Empresas e Gestores. Auto Gestão, Valuation, Treinamentos e Crescimento Lucrativo.',
  keywords = 'consultoria, gestão empresarial, valuation, m&a, negócios, liderança, vendas, antonio geraldes',
  canonicalUrl,
  ogImage = '/assets/logo_fundo_escuro.png'
}: SEOProps) {
  useEffect(() => {
    // 1. Page Title
    document.title = `${title} | Smartcompany`

    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // 3. Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', keywords)

    // 4. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    const href = canonicalUrl || window.location.href
    canonicalLink.setAttribute('href', href)

    // 5. OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', `${title} | Smartcompany`)

    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.setAttribute('content', description)

    let ogType = document.querySelector('meta[property="og:type"]')
    if (!ogType) {
      ogType = document.createElement('meta')
      ogType.setAttribute('property', 'og:type')
      document.head.appendChild(ogType)
    }
    ogType.setAttribute('content', 'website')

    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.setAttribute('content', href)

    if (ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]')
      if (!ogImg) {
        ogImg = document.createElement('meta')
        ogImg.setAttribute('property', 'og:image')
        document.head.appendChild(ogImg)
      }
      // If it's a relative path, resolve it to absolute for OpenGraph requirements
      const absoluteImgUrl = ogImage.startsWith('http') 
        ? ogImage 
        : `${window.location.origin}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
      ogImg.setAttribute('content', absoluteImgUrl)
    }
  }, [title, description, keywords, canonicalUrl, ogImage])

  return null
}
