import { create } from 'zustand'

const TOKEN_KEY = 'halol_avlod:token'

function savedToken() {
  try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
}

export const useAuth = create((set, get) => ({
  token: savedToken(),
  user: null,
  loading: true,

  async hydrate() {
    const token = get().token
    if (!token) { set({ loading: false }); return }
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('invalid')
      const { user } = await res.json()
      set({ user, loading: false })
    } catch {
      try { localStorage.removeItem(TOKEN_KEY) } catch {}
      set({ token: null, user: null, loading: false })
    }
  },

  async login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Ошибка входа')
    try { localStorage.setItem(TOKEN_KEY, data.token) } catch {}
    set({ token: data.token, user: data.user })
    return data.user
  },

  async register(payload) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Ошибка регистрации')
    try { localStorage.setItem(TOKEN_KEY, data.token) } catch {}
    set({ token: data.token, user: data.user })
    return data.user
  },

  logout() {
    try { localStorage.removeItem(TOKEN_KEY) } catch {}
    set({ token: null, user: null })
  },

  getToken: () => get().token,
}))

// Хелпер для API-запросов с токеном
export function authFetch(url, options = {}) {
  const token = useAuth.getState().token
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
}
