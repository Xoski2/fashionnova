import { useEffect } from 'react'

interface PageMeta {
  title: string
  description?: string
  image?: string
}

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export function usePageMeta({ title, description, image }: PageMeta) {
  useEffect(() => {
    document.title = title
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }
    setMeta('property', 'og:title', title)
    if (image) setMeta('property', 'og:image', image)
    setMeta('property', 'og:url', window.location.href)
  }, [title, description, image])
}
