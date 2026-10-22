import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function CookMode({ recipe, servings, onClose, onCooked }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const total = recipe.instructions.length
  const last = step === total - 1

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setStep((current) => Math.min(total - 1, current + 1))
      if (event.key === 'ArrowLeft') setStep((current) => Math.max(0, current - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, total])

  const finish = () => {
    onCooked()
    setDone(true)
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex h-dvh flex-col bg-canvas" role="dialog" aria-modal="true" aria-labelledby="cook-title">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-mkt-teal">Cook mode</p>
          <h2 id="cook-title" className="text-lg font-extrabold text-ink">{recipe.title}</h2>
        </div>
        <button type="button" className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-divider">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-mkt-mint transition-[width] duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-10">
        <p className="text-sm font-bold text-ink-muted">Step {step + 1} of {total} · {servings} {servings === 1 ? 'serving' : 'servings'}</p>
        <p className="mt-4 text-balance text-3xl font-extrabold leading-snug text-ink sm:text-4xl">{recipe.instructions[step]}</p>
        {done && <p className="mt-6 text-sm font-semibold text-mkt-emerald-deep">Saved to your cooked history.</p>}
      </div>
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pb-8">
        <button
          type="button"
          className="h-12 rounded-full border border-ink/10 bg-white px-6 text-sm font-bold text-ink disabled:opacity-40"
          disabled={step === 0}
          onClick={() => setStep((current) => current - 1)}
        >
          Back
        </button>
        {last ? (
          <button type="button" className="h-12 rounded-full bg-gradient-to-br from-primary to-mkt-teal px-6 text-sm font-bold text-white shadow-brand" onClick={finish}>
            I cooked this
          </button>
        ) : (
          <button type="button" className="h-12 rounded-full bg-gradient-to-br from-primary to-mkt-teal px-6 text-sm font-bold text-white shadow-brand" onClick={() => setStep((current) => current + 1)}>
            Next step
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default CookMode
