import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authenticate, createAccount, publicUser } from './authLogic'

const ACCOUNTS_KEY = 'hrf.accounts.v1'
const SESSION_KEY = 'hrf.session.v1'
const AuthContext = createContext(null)

function readAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const accounts = readAccounts()
    const session = localStorage.getItem(SESSION_KEY)
    const account = accounts.find((item) => item.id === session)
    setUser(account ? publicUser(account) : null)
    setReady(true)
  }, [])

  const signup = useCallback(async (input) => {
    const result = await createAccount(readAccounts(), input)
    if (!result.ok) return result
    writeAccounts(result.accounts)
    localStorage.setItem(SESSION_KEY, result.account.id)
    setUser(publicUser(result.account))
    return { ok: true }
  }, [])

  const login = useCallback(async (input) => {
    const result = await authenticate(readAccounts(), input)
    if (!result.ok) return result
    localStorage.setItem(SESSION_KEY, result.account.id)
    setUser(publicUser(result.account))
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, ready, signup, login, logout }), [user, ready, signup, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
