import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { safeNext } from '../auth/authLogic'
import Eyebrow from '../components/ui/Eyebrow'

function Login() {
  const { user, login, signup } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const next = safeNext(params.get('next'))
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  if (user) return <Navigate to={next} replace />

  const submit = async (event) => {
    event.preventDefault()
    setPending(true)
    setError('')
    const result = mode === 'signup'
      ? await signup({ name, email, password })
      : await login({ email, password })
    setPending(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(next, { replace: true })
  }

  return (
    <div className="bg-canvas px-4 pb-20 pt-32 sm:px-6">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/80 bg-white p-6 shadow-float sm:p-8">
        <Eyebrow>Your kitchen</Eyebrow>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink">
          {mode === 'signup' ? 'Create your kitchen' : 'Welcome back'}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          The plan, saved recipes, and shopping list live on your dashboard. This account stays in this browser.
        </p>
        <div className="mt-6 flex gap-1 rounded-full bg-canvas p-1">
          {[['login', 'Log in'], ['signup', 'Create account']].map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              className={`h-10 flex-1 rounded-full text-sm font-bold ${mode === id ? 'bg-white text-ink shadow-sm' : 'text-ink-muted'}`}
              onClick={() => {
                setMode(id)
                setError('')
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          {mode === 'signup' && (
            <label className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
              Name
              <input
                className="mt-1.5 h-12 w-full rounded-2xl border border-ink/10 bg-canvas px-3 text-sm font-semibold normal-case tracking-normal text-ink"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          )}
          <label className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
            Email
            <input
              type="email"
              className="mt-1.5 h-12 w-full rounded-2xl border border-ink/10 bg-canvas px-3 text-sm font-semibold normal-case tracking-normal text-ink"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
            Password
            <input
              type="password"
              className="mt-1.5 h-12 w-full rounded-2xl border border-ink/10 bg-canvas px-3 text-sm font-semibold normal-case tracking-normal text-ink"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error && <p className="text-sm font-semibold text-status-attention">{error}</p>}
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-gradient-to-br from-primary to-mkt-teal text-sm font-bold text-white shadow-brand disabled:opacity-60"
            disabled={pending}
          >
            {mode === 'signup' ? 'Create account' : 'Log in'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-ink-muted">
          <Link to="/recipes" className="font-bold text-primary">Browse recipes</Link>
          {' '}without an account.
        </p>
      </div>
    </div>
  )
}

export default Login
