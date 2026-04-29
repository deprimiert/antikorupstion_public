import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth, authFetch } from '../store/authStore'
import { useT } from '../i18n'
import Toolbar from '../components/Toolbar'

export default function TeacherDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const t = useT()
  const [scenarios, setScenarios] = useState([])
  const [sessions, setSessions] = useState([])
  const [tab, setTab] = useState('scenarios')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [scenRes, sessRes] = await Promise.all([
        authFetch('/api/scenarios').then((r) => r.json()),
        authFetch('/api/sessions').then((r) => r.json()),
      ])
      setScenarios(scenRes.scenarios || [])
      setSessions(sessRes.sessions || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function createScenario(e) {
    e.preventDefault()
    if (!newTitle.trim()) return
    try {
      const res = await authFetch('/api/scenarios', {
        method: 'POST',
        body: JSON.stringify({ title: newTitle.trim(), lang: 'uz' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setNewTitle('')
      setCreating(false)
      navigate(`/teacher/scenario/${data.scenario.id}`)
    } catch (err) {
      alert(err.message)
    }
  }

  async function createSession(scenarioId) {
    try {
      const res = await authFetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({ scenario_id: scenarioId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      navigate(`/teacher/session/${data.session.id}`)
    } catch (err) {
      alert(err.message)
    }
  }

  async function deleteScenario(id) {
    if (!confirm('Ssenariyni o\'chirishni xohlaysizmi?')) return
    await authFetch(`/api/scenarios/${id}`, { method: 'DELETE' })
    setScenarios((prev) => prev.filter((s) => s.id !== id))
  }

  async function togglePublish(scenario) {
    const res = await authFetch(`/api/scenarios/${scenario.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...scenario, is_published: !scenario.is_published }),
    })
    const data = await res.json()
    if (res.ok) setScenarios((prev) => prev.map((s) => s.id === scenario.id ? data.scenario : s))
  }

  return (
    <div className="min-h-[100dvh] bg-ink-950 text-ink-100">
      <header className="border-b border-ink-800/70 bg-ink-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-breath" />
            <span className="font-display text-lg font-bold tracking-tightest">Halol Avlod</span>
            <span className="hidden md:inline text-ink-500 text-xs uppercase tracking-widest ml-2">
              {t('ui.teacher.cabinet')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Toolbar />
            <span className="hidden sm:inline text-sm text-ink-400">
              {user?.first_name} {user?.last_name}
            </span>
            <button
              onClick={() => { logout(); navigate('/auth') }}
              className="rounded-lg border border-ink-700 px-3 py-1.5 text-xs text-ink-400 hover:text-ink-100 hover:border-ink-500 transition-colors"
            >
              {t('ui.teacher.logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: t('ui.teacher.scenarios'), value: scenarios.length },
            { label: t('ui.teacher.published'), value: scenarios.filter((s) => s.is_published).length },
            { label: t('ui.teacher.sessions'), value: sessions.length },
            { label: t('ui.teacher.active'), value: sessions.filter((s) => s.status === 'active').length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5">
              <div className="text-3xl font-bold font-display">{stat.value}</div>
              <div className="text-xs text-ink-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 rounded-xl bg-ink-800/40 p-1 w-fit">
          {[['scenarios', t('ui.teacher.scenarios')], ['sessions', t('ui.teacher.sessions')]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-ink-900 text-ink-100' : 'text-ink-500 hover:text-ink-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-ink-500 py-20">...</div>
        ) : tab === 'scenarios' ? (
          <ScenariosList
            t={t}
            scenarios={scenarios}
            onCreateClick={() => setCreating(true)}
            onDelete={deleteScenario}
            onTogglePublish={togglePublish}
            onCreateSession={createSession}
          />
        ) : (
          <SessionsList t={t} sessions={sessions} onRefresh={load} />
        )}
      </main>

      {/* Модалка создания */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-2xl border border-ink-700 bg-ink-900 p-6"
          >
            <h3 className="font-display text-xl font-bold mb-4">{t('ui.teacher.scenarioTitle')}</h3>
            <form onSubmit={createScenario}>
              <input
                autoFocus
                type="text"
                placeholder={t('ui.teacher.scenarioNamePlaceholder')}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-sm text-ink-100 focus:border-accent focus:outline-none"
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCreating(false)}
                  className="flex-1 rounded-xl border border-ink-700 py-2.5 text-sm text-ink-400 hover:text-ink-100"
                >
                  {t('ui.teacher.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-semibold text-invert-fg hover:bg-accent-glow"
                >
                  {t('ui.teacher.create')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function ScenariosList({ t, scenarios, onCreateClick, onDelete, onTogglePublish, onCreateSession }) {
  if (scenarios.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-500 mb-4">{t('ui.teacher.noScenarios')}</p>
        <button
          onClick={onCreateClick}
          className="btn-tactile rounded-xl bg-accent px-6 py-3 font-semibold text-invert-fg"
        >
          {t('ui.teacher.createFirst')}
        </button>
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold">{t('ui.teacher.scenarios')}</h2>
        <button
          onClick={onCreateClick}
          className="btn-tactile rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-invert-fg"
        >
          {t('ui.teacher.newScenario')}
        </button>
      </div>
      <div className="space-y-3">
        {scenarios.map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-ink-800 bg-ink-900/60 p-5"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-ink-100 truncate">{s.title}</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  s.is_published
                    ? 'border-halol/40 bg-halol/10 text-halol'
                    : 'border-ink-700 bg-ink-800/60 text-ink-500'
                }`}>
                  {s.is_published ? t('ui.teacher.published') : t('ui.teacher.draft')}
                </span>
              </div>
              <div className="text-xs text-ink-500 mt-1">
                {s.act_count} {t('ui.teacher.acts')} · {new Date(s.created_at).toLocaleDateString('uz-UZ')}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Link
                to={`/teacher/scenario/${s.id}`}
                className="rounded-lg border border-ink-700 px-3 py-1.5 text-xs text-ink-300 hover:border-ink-500 hover:text-ink-100 transition-colors"
              >
                {t('ui.teacher.edit')}
              </Link>
              <button
                onClick={() => onTogglePublish(s)}
                className="rounded-lg border border-ink-700 px-3 py-1.5 text-xs text-ink-300 hover:border-ink-500 transition-colors"
              >
                {s.is_published ? t('ui.teacher.unpublish') : t('ui.teacher.publish')}
              </button>
              <button
                onClick={() => onCreateSession(s.id)}
                className="rounded-lg bg-accent/90 px-3 py-1.5 text-xs font-medium text-invert-fg hover:bg-accent transition-colors"
              >
                {t('ui.teacher.createSession')}
              </button>
              <button
                onClick={() => onDelete(s.id)}
                className="rounded-lg border border-ink-800 px-3 py-1.5 text-xs text-ink-600 hover:text-accent hover:border-accent/40 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SessionsList({ t, sessions, onRefresh }) {
  const navigate = useNavigate()

  async function deleteSession(id) {
    if (!confirm('Sessionni o\'chirishni xohlaysizmi?')) return
    await authFetch(`/api/sessions/${id}`, { method: 'DELETE' })
    onRefresh()
  }

  if (sessions.length === 0) {
    return <div className="text-center py-20 text-ink-500">{t('ui.teacher.noSessions')}</div>
  }

  const STATUS_LABEL = {
    waiting: t('ui.teacher.waitingStatus'),
    active: t('ui.teacher.activeStatus'),
    finished: t('ui.teacher.finishedStatus'),
  }
  const STATUS_CLS = {
    waiting: 'border-ink-700 text-ink-500',
    active: 'border-halol/40 text-halol',
    finished: 'border-ink-700 text-ink-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold">{t('ui.teacher.sessions')}</h2>
        <button onClick={onRefresh} className="text-xs text-ink-500 hover:text-ink-300">
          {t('ui.teacher.refresh')}
        </button>
      </div>
      <div className="space-y-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-ink-800 bg-ink-900/60 p-5"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-bold text-accent tracking-widest">{s.code}</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${STATUS_CLS[s.status] || STATUS_CLS.waiting}`}>
                  {STATUS_LABEL[s.status] || s.status}
                </span>
              </div>
              <div className="text-sm text-ink-400 mt-1">{s.scenario_title}</div>
              <div className="text-xs text-ink-600 mt-0.5">
                {s.player_count} {t('ui.teacher.players')} · {new Date(s.created_at).toLocaleDateString('uz-UZ')}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/teacher/session/${s.id}`)}
                className="rounded-lg border border-ink-700 px-3 py-1.5 text-xs text-ink-300 hover:border-ink-500 transition-colors"
              >
                {t('ui.teacher.manage')}
              </button>
              <button
                onClick={() => deleteSession(s.id)}
                className="rounded-lg border border-ink-800 px-3 py-1.5 text-xs text-ink-600 hover:text-accent hover:border-accent/40 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
