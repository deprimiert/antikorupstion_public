import uz from './uz'
import ru from './ru'
import en from './en'
import { useUI } from '../store/uiStore'

const DICTS = { uz, ru, en }
const FALLBACK = 'uz'

function get(obj, path) {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

function format(str, params) {
  if (typeof str !== 'string' || !params) return str
  return str.replace(/\{(\w+)\}/g, (m, k) => (params[k] != null ? params[k] : m))
}

export function tFor(lang, key, params) {
  const primary = get(DICTS[lang], key)
  const value = primary !== undefined ? primary : get(DICTS[FALLBACK], key)
  if (value === undefined) return key
  if (typeof value === 'string') return format(value, params)
  return value
}

export function useT() {
  const lang = useUI((s) => s.lang)
  return (key, params) => tFor(lang, key, params)
}

export function useLang() {
  return useUI((s) => s.lang)
}

export const SCENARIO_KEYS = Object.keys(uz.scenarios)
