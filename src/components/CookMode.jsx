import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

function CookMode({ recipe, servings, onClose, onCooked }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const recorded = useRef(false)
  const stepRef = useRef(step)
  const total = recipe.instructions.length
  const last = total === 0 || step >= total - 1
  stepRef.current = step

  const finish = () => {
    if (recorded.current) return
    recorded.current = true
    onCooked()
    setDone(true)
  }

  const finishRef = useRef(finish)
  finishRef.current = finish

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') {
        if (total === 0 || stepRef.current >= total - 1) finishRef.current()
        else setStep((current) => current + 1)
      }
      if (event.key === 'ArrowLeft' && !recorded.current) setStep((current) => Math.max(0, current - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, total])

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
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-mkt-mint transition-[width] duration-500" style={{ width: `${done || total === 0 ? 100 : ((step + 1) / total) * 100}%` }} />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-10">
        {done ? (
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-mkt-teal">Cooked</p>
            <p className="mt-4 text-balance text-3xl font-extrabold leading-snug text-ink sm:text-4xl">Saved to your cooked history.</p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {servings} {servings === 1 ? 'serving' : 'servings'} of {recipe.title}.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm font-bold text-ink-muted">Step {Math.min(step + 1, Math.max(total, 1))} of {Math.max(total, 1)} · {servings} {servings === 1 ? 'serving' : 'servings'}</p>
            <p className="mt-4 text-balance text-3xl font-extrabold leading-snug text-ink sm:text-4xl">{recipe.instructions[step] || 'This recipe has no written steps.'}</p>
          </>
        )}
      </div>
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pb-8">
        {done ? (
          <Link to="/saved" className="inline-flex h-12 items-center rounded-full border border-ink/10 bg-white px-6 text-sm font-bold text-ink" onClick={onClose}>
            See cooked meals
          </Link>
        ) : (
          <button
            type="button"
            className="h-12 rounded-full border border-ink/10 bg-white px-6 text-sm font-bold text-ink disabled:opacity-40"
            disabled={step === 0}
            onClick={() => setStep((current) => current - 1)}
          >
            Back
          </button>
        )}
        {done ? (
          <button type="button" className="h-12 rounded-full bg-gradient-to-br from-primary to-mkt-teal px-6 text-sm font-bold text-white shadow-brand" onClick={onClose}>
            Back to the recipe
          </button>
        ) : last ? (
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
