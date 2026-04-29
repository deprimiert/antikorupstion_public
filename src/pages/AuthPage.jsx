import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../store/authStore'

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

function birthDateError(dateStr) {
  if (!dateStr) return null
  const birth = new Date(dateStr)
  if (isNaN(birth.getTime())) return 'Неверная дата'
  if (birth >= new Date()) return 'Дата рождения должна быть в прошлом'
  const age = calcAge(dateStr)
  if (age > 120) return 'Слишком старая дата'
  return null
}

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const { login, register, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate(user.role === 'teacher' ? '/teacher' : '/play', { replace: true })
  }, [user, navigate])

  return (
    <div className="min-h-[100dvh] bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-breath" />
            <span className="font-display text-xl font-bold tracking-tightest text-ink-100">
              Halol Avlod
            </span>
          </div>
          <p className="text-sm text-ink-500">Поколение честности</p>
        </div>

        <div className="rounded-[2rem] border border-ink-800 bg-ink-900/80 p-7 shadow-card">
          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-ink-800/60 p-1">
            {['login', 'register'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                  tab === t
                    ? 'bg-ink-900 text-ink-100 shadow'
                    : 'text-ink-500 hover:text-ink-300'
                }`}
              >
                {t === 'login' ? 'Войти' : 'Регистрация'}
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
                <LoginForm onSuccess={(user) => navigate(user.role === 'teacher' ? '/teacher' : '/play')} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <RegisterForm onSuccess={(user) => navigate(user.role === 'teacher' ? '/teacher' : '/play')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function LoginForm({ onSuccess }) {
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
      <Field label="Email" type="email" value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
      <Field label="Пароль" type="password" value={form.password}
        onChange={(v) => setForm((f) => ({ ...f, password: v }))} required />
      {error && <p className="text-sm text-accent">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-tactile w-full rounded-xl bg-accent py-3 font-semibold text-invert-fg hover:bg-accent-glow disabled:opacity-50"
      >
        {loading ? 'Входим...' : 'Войти'}
      </button>
    </form>
  )
}

function RegisterForm({ onSuccess }) {
  const { register } = useAuth()
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    password: '', birth_date: '', role: 'student',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const age = calcAge(form.birth_date)
  const bdErr = birthDateError(form.birth_date)

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
        <Field label="Имя" value={form.first_name}
          onChange={(v) => setForm((f) => ({ ...f, first_name: v }))} required />
        <Field label="Фамилия" value={form.last_name}
          onChange={(v) => setForm((f) => ({ ...f, last_name: v }))} required />
      </div>
      <Field label="Email" type="email" value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
      <Field label="Пароль (мин. 6 символов)" type="password" value={form.password}
        onChange={(v) => setForm((f) => ({ ...f, password: v }))} required />

      {/* Дата рождения с живым подсчётом возраста */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500 mb-1.5">
          Дата рождения
        </label>
        <div className="relative">
          <input
            type="date"
            value={form.birth_date}
            onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))}
            max={new Date().toISOString().split('T')[0]}
            required
            className="w-full rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-sm text-ink-100 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors"
          />
          {form.birth_date && !bdErr && age !== null && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-halol font-mono">
              {age} лет
            </span>
          )}
        </div>
        {bdErr && <p className="mt-1 text-xs text-accent">{bdErr}</p>}
      </div>

      {/* Роль */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500 mb-1.5">
          Роль
        </label>
        <div className="flex gap-2">
          {[['student', 'Студент'], ['teacher', 'Учитель']].map(([val, label]) => (
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
        className="btn-tactile w-full rounded-xl bg-accent py-3 font-semibold text-invert-fg hover:bg-accent-glow disabled:opacity-50"
      >
        {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}

function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors"
      />
    </div>
  )
}
