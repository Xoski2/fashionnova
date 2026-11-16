import { useId, useState, type FormEvent } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { cn } from '../lib/format'
import { isValidEmail } from '../lib/validation'

interface NewsletterFormProps {
  tone?: 'light' | 'dark'
  className?: string
}

export function NewsletterForm({ tone = 'light', className }: NewsletterFormProps) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError('Enter a valid email address, for example you@example.com.')
      setSubscribed(false)
      return
    }
    setError('')
    setSubscribed(true)
  }

  const isDark = tone === 'dark'

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          'flex flex-col gap-2 sm:flex-row',
          isDark ? 'text-white' : 'text-ink',
        )}
      >
        <div className="relative flex-1">
          <Mail
            className={cn(
              'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2',
              isDark ? 'text-white/40' : 'text-smoke',
            )}
            aria-hidden="true"
          />
          <input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (error) setError('')
              if (subscribed) setSubscribed(false)
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={`${id}-feedback`}
            className={cn(
              'h-12 w-full border pl-11 pr-4 text-sm outline-none transition-colors focus:border-clay',
              isDark
                ? 'border-white/20 bg-white/5 text-white placeholder:text-white/40'
                : 'border-line bg-white text-ink placeholder:text-smoke/70',
            )}
          />
        </div>
        <button
          type="submit"
          className={cn(
            'group inline-flex h-12 items-center justify-center gap-2 px-7 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors',
            isDark
              ? 'bg-white text-ink hover:bg-sand'
              : 'bg-ink text-white hover:bg-clay',
          )}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
          {subscribed ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      <p
        id={`${id}-feedback`}
        role={error ? 'alert' : 'status'}
        className={cn(
          'mt-3 text-xs leading-relaxed',
          error
            ? isDark
              ? 'text-red-300'
              : 'text-red-700'
            : isDark
              ? 'text-white/50'
              : 'text-smoke',
        )}
      >
        {error ||
          (subscribed
            ? 'Thank you — this is a demo sign-up. No email was saved or sent. Connect a newsletter service to make this live.'
            : 'Demo newsletter. No emails are stored or sent; connect your mailing service to go live.')}
      </p>
    </form>
  )
}
