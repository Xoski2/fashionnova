import { Minus, Plus } from 'lucide-react'
import { cn } from '../lib/format'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
  label?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  label = 'Quantity',
}: QuantitySelectorProps) {
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'
  return (
    <div
      className={cn(
        'inline-flex items-center border border-line bg-white',
        size === 'sm' ? 'h-8' : 'h-11',
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          buttonSize,
          'flex items-center justify-center text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30',
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} aria-hidden="true" />
      </button>
      <span
        className={cn(
          'text-center font-semibold tabular-nums',
          size === 'sm' ? 'w-7 text-xs' : 'w-10 text-sm',
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          buttonSize,
          'flex items-center justify-center text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30',
        )}
        aria-label="Increase quantity"
      >
        <Plus className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} aria-hidden="true" />
      </button>
    </div>
  )
}
