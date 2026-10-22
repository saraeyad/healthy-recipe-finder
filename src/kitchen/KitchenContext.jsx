import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { emptyPlan } from '../utils/recipeLogic'

const GUEST_KEY = 'hrf.kitchen.v1'
const KitchenContext = createContext(null)

function storageKey(userId) {
  return userId ? `${GUEST_KEY}:${userId}` : null
}

function readKey(key) {
  try {
    let raw = localStorage.getItem(key)
    if (!raw) {
      const guest = localStorage.getItem(GUEST_KEY)
      if (guest) {
        localStorage.setItem(key, guest)
        localStorage.removeItem(GUEST_KEY)
        raw = guest
      }
    }
    return sanitize(raw ? JSON.parse(raw) : null)
  } catch {
    return sanitize(null)
  }
}

function sanitizeSlot(slot) {
  if (!slot || typeof slot.slug !== 'string' || !slot.slug) return null
  const servings = Number(slot.servings)
  return {
    slug: slot.slug,
    servings: Number.isFinite(servings) && servings > 0 ? Math.min(12, Math.round(servings)) : 1,
  }
}

function sanitize(data) {
  const plan = emptyPlan()
  if (data?.plan && typeof data.plan === 'object') {
    Object.keys(plan).forEach((day) => {
      Object.keys(plan[day]).forEach((meal) => {
        plan[day][meal] = sanitizeSlot(data.plan?.[day]?.[meal])
      })
    })
  }
  const strings = (value, limit) => (
    Array.isArray(value) ? value.filter((item) => typeof item === 'string').slice(0, limit) : []
  )
  const cooked = Array.isArray(data?.cooked)
    ? data.cooked
      .filter((entry) => entry && typeof entry.slug === 'string' && entry.slug)
      .slice(0, 40)
      .map((entry) => ({
        slug: entry.slug,
        servings: sanitizeSlot(entry)?.servings || 1,
        at: typeof entry.at === 'string' ? entry.at : new Date().toISOString(),
      }))
    : []

  return {
    favorites: strings(data?.favorites, 100),
    recent: strings(data?.recent, 8),
    checks: strings(data?.checks, 400),
    cooked,
    plan,
  }
}

export function KitchenProvider({ children }) {
  const { user, ready } = useAuth()
  const key = storageKey(user?.id)
  const [state, setState] = useState(() => sanitize(null))
  const skipWrite = useRef(true)

  useEffect(() => {
    if (!ready) return
    skipWrite.current = true
    if (!key) {
      setState(sanitize(null))
      return
    }
    setState(readKey(key))
  }, [key, ready])

  useEffect(() => {
    if (!key) return
    if (skipWrite.current) {
      skipWrite.current = false
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Private mode and full storage should not break cooking.
    }
  }, [key, state])

  const toggleFavorite = useCallback((slug) => {
    setState((current) => {
      const saved = current.favorites.includes(slug)
      return {
        ...current,
        favorites: saved
          ? current.favorites.filter((item) => item !== slug)
          : [slug, ...current.favorites],
      }
    })
  }, [])

  const remember = useCallback((slug) => {
    setState((current) => {
      if (current.recent[0] === slug) return current
      return {
        ...current,
        recent: [slug, ...current.recent.filter((item) => item !== slug)].slice(0, 8),
      }
    })
  }, [])

  const markCooked = useCallback((slug, servings) => {
    setState((current) => ({
      ...current,
      cooked: [
        { slug, servings: sanitizeSlot({ slug, servings })?.servings || 1, at: new Date().toISOString() },
        ...current.cooked,
      ].slice(0, 40),
    }))
  }, [])

  const setSlot = useCallback((day, meal, slot) => {
    setState((current) => ({
      ...current,
      plan: {
        ...current.plan,
        [day]: {
          ...current.plan[day],
          [meal]: sanitizeSlot(slot),
        },
      },
    }))
  }, [])

  const clearPlan = useCallback(() => {
    setState((current) => ({ ...current, plan: emptyPlan(), checks: [] }))
  }, [])

  const toggleCheck = useCallback((id) => {
    setState((current) => ({
      ...current,
      checks: current.checks.includes(id)
        ? current.checks.filter((item) => item !== id)
        : [...current.checks, id],
    }))
  }, [])

  const clearChecks = useCallback(() => {
    setState((current) => ({ ...current, checks: [] }))
  }, [])

  const api = useMemo(() => ({
    ...state,
    toggleFavorite,
    remember,
    markCooked,
    setSlot,
    clearPlan,
    toggleCheck,
    clearChecks,
    isFavorite: (slug) => state.favorites.includes(slug),
  }), [state, toggleFavorite, remember, markCooked, setSlot, clearPlan, toggleCheck, clearChecks])

  return <KitchenContext.Provider value={api}>{children}</KitchenContext.Provider>
}

export function useKitchen() {
  const value = useContext(KitchenContext)
  if (!value) throw new Error('useKitchen must be used inside KitchenProvider')
  return value
}
