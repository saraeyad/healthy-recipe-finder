import assert from 'node:assert/strict'
import test from 'node:test'
import { authenticate, createAccount, greeting, safeNext, validateSignup } from './authLogic.js'

test('signup asks for a name, email, and 8 characters', () => {
  assert.equal(validateSignup({ name: '', email: 'a@b.co', password: 'longpassword' }), 'Enter your name.')
  assert.equal(validateSignup({ name: 'Nora', email: 'nora', password: 'longpassword' }), 'Enter a valid email.')
  assert.equal(validateSignup({ name: 'Nora', email: 'nora@kitchen.test', password: 'short' }), 'Use at least 8 characters.')
  assert.equal(validateSignup({ name: 'Nora', email: 'nora@kitchen.test', password: 'longpassword' }), '')
})

test('a new account can sign in, and a wrong password cannot', async () => {
  const created = await createAccount([], {
    name: 'Nora',
    email: 'Nora@Kitchen.test',
    password: 'longpassword',
  })
  assert.equal(created.ok, true)
  assert.equal(created.account.email, 'nora@kitchen.test')
  assert.equal('hash' in created.account, true)
  assert.equal(JSON.stringify(created.account).includes('longpassword'), false)

  const again = await createAccount(created.accounts, {
    name: 'Other',
    email: 'nora@kitchen.test',
    password: 'longpassword',
  })
  assert.equal(again.ok, false)

  const signedIn = await authenticate(created.accounts, {
    email: 'nora@kitchen.test',
    password: 'longpassword',
  })
  assert.equal(signedIn.ok, true)
  assert.equal(signedIn.account.id, created.account.id)

  const rejected = await authenticate(created.accounts, {
    email: 'nora@kitchen.test',
    password: 'wrongpassword',
  })
  assert.equal(rejected.ok, false)
})

test('login returns only stay inside the app', () => {
  assert.equal(safeNext('/plan'), '/plan')
  assert.equal(safeNext('https://example.com'), '/dashboard')
  assert.equal(safeNext('//example.com'), '/dashboard')
  assert.equal(safeNext('/login'), '/dashboard')
})

test('greeting follows the afternoon in Hebron', () => {
  assert.equal(greeting(new Date('2026-10-22T11:16:00Z')), 'Good afternoon')
  assert.equal(greeting(new Date('2026-10-22T05:00:00Z')), 'Good morning')
})
