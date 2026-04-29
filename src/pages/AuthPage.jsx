import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../store/authStore'
import { useT } from '../i18n'
import Toolbar from '../components/Toolbar'

function calcAge(dateStr) {
  if (!dateStr) return null
  const birth = new Date(dateStr)
  if (isNaN(birth.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
  return age
}

function useBirthDateError(dateStr, t) {
  if (!dateStr) return null
  const birth = new Date(dateStr)
  if (isNaN(birth.getTime())) return t('ui.auth.birthDateInvalid')
  if (birth >= new Date()) return t('ui.auth.birthDateFuture')
  if (calcAge(dateStr) > 120) return t('ui.auth.birthDateOld')
  return null
}

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const { user } = useAuth()
  const navigate = useNavigate()
  const t = useT()

  useEffect(() => {
    if (user) navigate(user.role === 'teacher' ? '/teacher' : '/play', { replace: true })
  }, [user, navigate])

  function afterAuth(user) {
    navigate(user.role === 'teacher' ? '/teacher' : '/play', { replace: true })
  }

  return (
    <div className="min-h-[100dvh] bg-ink-950 grain-overlay vignette flex flex-col">
      {/* Шапка с переключателем языка/темы */}
      <div className="flex justify-between items-center px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-breath" />
          <span className="font-display text-base font-bold tracking-tightest text-ink-100">
            Halol Avlod
          </span>
        </div>
        <Toolbar />
      </div>

      {/* Центрированная форма */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-center"
          >
            <p className="text-sm text-ink-500 uppercase tracking-[0.25em] font-mono">
              {t('ui.auth.tagline')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-ink-800 bg-ink-900/80 p-7 shadow-card"
          >
            {/* Табы */}
            <div className="mb-6 flex rounded-xl bg-ink-800/60 p-1">
              {['login', 'register'].map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setTab(tabKey)}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
                    tab === tabKey
                      ? 'bg-ink-900 text-ink-100 shadow'
                      : 'text-ink-500 hover:text-ink-300'
                  }`}
                >
                  {tabKey === 'login' ? t('ui.auth.tabLogin') : t('ui.auth.tabRegister')}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoginForm t={t} onSuccess={afterAuth} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <RegisterForm t={t} onSuccess={afterAuth} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function LoginForm({ t, onSuccess }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      onSuccess(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label={t('ui.auth.email')} type="email" value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
      <Field label={t('ui.auth.password')} type="password" value={form.password}
        onChange={(v) => setForm((f) => ({ ...f, password: v }))} required />
      {error && <p className="text-sm text-accent">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-tactile w-full rounded-xl bg-accent py-3 font-semibold text-invert-fg hover:bg-accent-glow disabled:opacity-50 transition-all"
      >
        {loading ? t('ui.auth.loginLoading') : t('ui.auth.loginBtn')}
      </button>
    </form>
  )
}

function RegisterForm({ t, onSuccess }) {
  const { register } = useAuth()
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    password: '', birth_date: '', role: 'student',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const age = calcAge(form.birth_date)
  const bdErr = useBirthDateError(form.birth_date, t)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (bdErr) { setError(bdErr); return }
    setLoading(true)
    try {
      const user = await register(form)
      onSuccess(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label={t('ui.auth.firstName')} value={form.first_name}
          onChange={(v) => setForm((f) => ({ ...f, first_name: v }))} required />
        <Field label={t('ui.auth.lastName')} value={form.last_name}
          onChange={(v) => setForm((f) => ({ ...f, last_name: v }))} required />
      </div>

      <Field label={t('ui.auth.email')} type="email" value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
      <Field label={t('ui.auth.password')} type="password" value={form.password}
        onChange={(v) => setForm((f) => ({ ...f, password: v }))} required />

      {/* Дата рождения с живым подсчётом возраста */}
      <div>
        <label className={labelCls}>{t('ui.auth.birthDate')}</label>
        <div className="relative">
          <input
            type="date"
            value={form.birth_date}
            onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))}
            max={new Date().toISOString().split('T')[0]}
            required
            className={`${fieldCls} pr-24`}
          />
          {form.birth_date && !bdErr && age !== null && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-halol font-mono whitespace-nowrap">
              {age} {t('ui.auth.yearsOld')}
            </span>
          )}
        </div>
        {bdErr && <p className="mt-1 text-xs text-accent">{bdErr}</p>}
      </div>

      {/* Роль */}
      <div>
        <label className={labelCls}>{t('ui.auth.roleLabel')}</label>
        <div className="flex gap-2">
          {[['student', t('ui.auth.roleStudent')], ['teacher', t('ui.auth.roleTeacher')]].map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setForm((f) => ({ ...f, role: val }))}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all ${
                form.role === val
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-ink-700 text-ink-500 hover:border-ink-500 hover:text-ink-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}
      <button
        type="submit"
        disabled={loading || !!bdErr}
        className="btn-tactile w-full rounded-xl bg-accent py-3 font-semibold text-invert-fg hover:bg-accent-glow disabled:opacity-50 transition-all"
      >
        {loading ? t('ui.auth.registerLoading') : t('ui.auth.registerBtn')}
      </button>
    </form>
  )
}

const labelCls = 'block text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500 mb-1.5'
const fieldCls = 'w-full rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors'

function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={fieldCls}
      />
    </div>
  )
}
