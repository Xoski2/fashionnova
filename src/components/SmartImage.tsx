import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../lib/format'

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string
}

export function SmartImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/placeholder.svg',
  loading = 'lazy',
  ...rest
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn('bg-sand/60', className)}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc)
      }}
    />
  )
}
