import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/format'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; to: string }
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p
            className={cn(
              'mb-3 text-[11px] font-bold uppercase tracking-widest2',
              tone === 'dark' ? 'text-white/60' : 'text-clay',
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            'font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-4xl lg:text-[2.75rem]',
            tone === 'dark' ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              'mt-4 max-w-xl text-sm leading-relaxed sm:text-base',
              tone === 'dark' ? 'text-white/70' : 'text-smoke',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className={cn(
            'group inline-flex w-fit shrink-0 items-center gap-2 border-b pb-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors',
            tone === 'dark'
              ? 'border-white/30 text-white hover:border-white'
              : 'border-ink/30 text-ink hover:border-clay hover:text-clay',
          )}
        >
          {action.label}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  )
}
