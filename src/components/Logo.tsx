import { Link } from 'react-router-dom'
import { cn } from '../lib/format'

interface LogoProps {
  className?: string
  tone?: 'light' | 'dark'
}

export function Logo({ className, tone = 'light' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Fashionnova home"
      className={cn(
        'inline-flex items-baseline gap-2 font-display text-[0.95rem] font-black uppercase leading-none tracking-[0.08em] transition-opacity hover:opacity-70 min-[380px]:text-[1.15rem] min-[380px]:tracking-[0.1em] sm:text-[1.5rem] sm:tracking-[0.16em] lg:text-[1.65rem] lg:tracking-[0.2em]',
        tone === 'dark' ? 'text-white' : 'text-ink',
        className,
      )}
    >
      <span
        className={cn(
          'logo-sheen',
          tone === 'dark' ? 'logo-sheen--dark' : 'logo-sheen--light',
        )}
      >
        Fashionnova
      </span>
      <span className="relative mb-0.5 flex h-1.5 w-1.5" aria-hidden="true">
        <span
          className={cn(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60',
            tone === 'dark' ? 'bg-white' : 'bg-clay',
          )}
        />
        <span
          className={cn(
            'relative inline-flex h-1.5 w-1.5 animate-pulse-dot rounded-full',
            tone === 'dark' ? 'bg-white' : 'bg-clay',
          )}
        />
      </span>
    </Link>
  )
}
