import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authFetch } from '../store/authStore'
import { useT } from '../i18n'
import Toolbar from '../components/Toolbar'

const ENDING_KEYS = {
  halol_leader: '🟢',
  wealthy_under_investigation: '🔴',
  imprisoned: '⚫',
  survived_but_broken: '🟡',
}

export default function SessionRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const t = useT()
  const [session, setSession] = useState(null)
  const [players, setPlayers] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const [sessRes, resRes] = await Promise.all([
        authFetch(`/api/sessions/${id}`).then((r) => r.json()),
        authFetch(`/api/game/session-results/${id}`).then((r) => r.json()),
      ])
      setSession(sessRes.session)
      setPlayers(sessRes.players || [])
      setResults(resRes.results || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
    const interval = setInterval(load, 10000)
    return () => clearInterval(interval)
  }, [load])

  async function changeStatus(action) {
    const res = await authFetch(`/api/sessions/${id}/${action}`, { method: 'PATCH' })
    const data = await res.json()
    if (res.ok) setSession(data.session)
  }

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-ink-950 flex items-center justify-center text-ink-500">...</div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-[100dvh] bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-500 mb-4">{t('ui.teacher.sessionNotFound')}</p>
          <Link to="/teacher" className="text-accent hover:underline">{t('ui.teacher.back')}</Link>
        </div>
      </div>
    )
  }

  const STATUS_LABEL = {
    waiting: t('ui.teacher.waitingStatus'),
    active: t('ui.teacher.activeStatus'),
    finished: t('ui.teacher.finishedStatus'),
  }

  const finishedCount = players.filter((p) => p.ending_key).length

  return (
    <div className="min-h-[100dvh] bg-ink-950 text-ink-100">
      <header className="border-b border-ink-800/70 bg-ink-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/teacher" className="text-ink-500 hover:text-ink-300 text-sm">
            {t('ui.teacher.back')}
          </Link>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold tracking-widest text-accent">{session.code}</div>
            <div className="text-xs text-ink-500 mt-0.5">{t('ui.teacher.sessionCode')}</div>
          </div>
          <div className="flex items-center gap-2">
            <Toolbar />
            {session.status === 'waiting' && (
              <button
                onClick={() => changeStatus('start')}
                className="btn-tactile rounded-xl bg-halol/90 px-4 py-2 text-sm font-semibold text-ink-950"
              >
                {t('ui.teacher.start')}
              </button>
            )}
            {session.status === 'active' && (
              <button
                onClick={() => changeStatus('finish')}
                className="btn-tactile rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-invert-fg"
              >
                {t('ui.teacher.finish')}
              </button>
            )}
            <button onClick={load} className="rounded-lg border border-ink-700 px-3 py-2 text-xs text-ink-400 hover:text-ink-100">
              ↻
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t('ui.teacher.status'), value: STATUS_LABEL[session.status] || session.status },
            { label: t('ui.teacher.playerCount'), value: players.length },
            { label: t('ui.teacher.finished'), value: finishedCount },
            { label: t('ui.teacher.scenarioName'), value: session.scenario_title },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5">
              <div className="text-lg font-bold truncate">{s.value}</div>
              <div className="text-xs text-ink-500 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Players */}
        <div>
          <h2 className="font-display text-xl font-bold mb-4">
            {t('ui.teacher.players')} ({players.length})
          </h2>
          {players.length === 0 ? (
            <div className="text-center py-12 text-ink-500">
              <p>{t('ui.teacher.waitingPlayers')}</p>
              <p className="text-sm mt-2">
                {t('ui.teacher.joinCode')}{' '}
                <span className="text-accent font-mono font-bold">{session.code}</span>
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {players.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-ink-800 bg-ink-900/60 p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-medium text-ink-100">{p.first_name} {p.last_name}</div>
                    <div className="text-xs text-ink-500">{p.email}</div>
                  </div>
                  <div className="text-right shrink-0">
                    {p.ending_key ? (
                      <div>
                        <div className="text-sm font-medium text-halol">
                          {ENDING_KEYS[p.ending_key] || ''} {t(`endings.${p.ending_key}.title`)}
                        </div>
                        {p.final_stats && (
                          <div className="text-[10px] text-ink-500 mt-0.5 font-mono">
                            ✓{p.final_stats.integrity} 💰{p.final_stats.money} ⚡{p.final_stats.risk}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-ink-600">{t('ui.teacher.inGame')}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Results summary */}
        {results.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold mb-4">{t('ui.teacher.results')}</h2>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-6">
              {Object.entries(
                results.reduce((acc, r) => {
                  acc[r.ending_key] = (acc[r.ending_key] || 0) + 1
                  return acc
                }, {})
              ).map(([key, count]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-ink-800/60 last:border-0">
                  <span className="text-sm">
                    {ENDING_KEYS[key] || ''} {t(`endings.${key}.title`)}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 rounded-full bg-ink-800 w-24 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${(count / results.length) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-sm text-ink-300 w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
