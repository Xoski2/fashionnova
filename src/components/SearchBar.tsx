import { Search } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { cn } from '../lib/format'

interface SearchBarProps {
  initialValue?: string
  onSubmit: (query: string) => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
  inputId?: string
}

export function SearchBar({
  initialValue = '',
  onSubmit,
  placeholder = 'Search products…',
  autoFocus = false,
  className,
  inputId = 'product-search',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(value.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn(
        'flex h-11 items-center border border-line bg-white focus-within:border-ink',
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        Search products by name
      </label>
      <Search className="ml-4 h-4 w-4 shrink-0 text-smoke" aria-hidden="true" />
      <input
        id={inputId}
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-smoke/70"
      />
      <button
        type="submit"
        className="h-full bg-ink px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
      >
        Search
      </button>
    </form>
  )
}
