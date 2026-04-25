import { create } from 'zustand'

const THEME_KEY = 'halol_avlod:theme'
const LANG_KEY = 'halol_avlod:lang'

export const SUPPORTED_LANGS = ['uz', 'ru', 'en']

function readTheme() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

function readLang() {
  if (typeof window === 'undefined') return 'uz'
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (SUPPORTED_LANGS.includes(stored)) return stored
  } catch {}
  const nav = (navigator.language || 'uz').toLowerCase()
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('en')) return 'en'
  return 'uz'
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'light') root.classList.add('light')
  else root.classList.remove('light')
}

function applyLang(lang) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('lang', lang)
}

export const useUI = create((set, get) => ({
  theme: readTheme(),
  lang: readLang(),

  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return
    set({ theme })
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {}
  },
  toggleTheme() {
    get().setTheme(get().theme === 'light' ? 'dark' : 'light')
  },

  setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return
    set({ lang })
    applyLang(lang)
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {}
  },

  hydrate() {
    applyTheme(get().theme)
    applyLang(get().lang)
  },
}))
