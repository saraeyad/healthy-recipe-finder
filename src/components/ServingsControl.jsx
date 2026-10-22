function ServingsControl({ value, onChange, min = 1, max = 12 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink/10 bg-white">
      <button
        type="button"
        className="h-10 w-10 rounded-full text-lg font-bold text-mkt-teal disabled:opacity-30"
        aria-label="Fewer servings"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="min-w-16 text-center text-sm font-bold text-ink" aria-live="polite">
        {value} {value === 1 ? 'serving' : 'servings'}
      </span>
      <button
        type="button"
        className="h-10 w-10 rounded-full text-lg font-bold text-mkt-teal disabled:opacity-30"
        aria-label="More servings"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  )
}

export default ServingsControl
