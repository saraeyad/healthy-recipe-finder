const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function publicUser(account) {
  return { id: account.id, name: account.name, email: account.email }
}

export function safeNext(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/login')) {
    return '/dashboard'
  }
  return value
}

export function greeting(now = new Date(), timeZone = 'Asia/Hebron') {
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hourCycle: 'h23',
    timeZone,
  }).format(now))
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

async function digest(password, salt) {
  const encoded = new TextEncoder().encode(`${salt}:${password}`)
  const bytes = await crypto.subtle.digest('SHA-256', encoded)
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function validateSignup({ name, email, password }) {
  if (!String(name || '').trim()) return 'Enter your name.'
  if (!EMAIL.test(normalizeEmail(email))) return 'Enter a valid email.'
  if (String(password || '').length < 8) return 'Use at least 8 characters.'
  return ''
}

export async function createAccount(accounts, input) {
  const error = validateSignup(input)
  if (error) return { ok: false, error, accounts }
  const email = normalizeEmail(input.email)
  if (accounts.some((account) => account.email === email)) {
    return { ok: false, error: 'That email already has an account.', accounts }
  }
  const salt = crypto.randomUUID()
  const account = {
    id: crypto.randomUUID(),
    name: String(input.name).trim(),
    email,
    salt,
    hash: await digest(input.password, salt),
  }
  return { ok: true, account, accounts: [...accounts, account] }
}

export async function authenticate(accounts, { email, password }) {
  const normalized = normalizeEmail(email)
  const account = accounts.find((item) => item.email === normalized)
  if (!account || !password) return { ok: false, error: 'Those details do not match an account.' }
  const hash = await digest(password, account.salt)
  if (hash !== account.hash) return { ok: false, error: 'Those details do not match an account.' }
  return { ok: true, account }
}
