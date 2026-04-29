import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { useUI } from './store/uiStore'
import { useAuth } from './store/authStore'
import { useT } from './i18n'
import { SCENARIOS, TOTAL_ACTS, actOf } from './data/scenarios'
import Intro from './components/Intro'
import Scene from './components/Scene'
import Feedback from './components/Feedback'
import Ending from './components/Ending'
import PreEnding from './components/PreEnding'
import StatsBar from './components/StatsBar'
import ProgressRail from './components/ProgressRail'
import Toolbar from './components/Toolbar'

export default function App() {
  const phase = useGameStore((s) => s.phase)
  const sceneIndex = useGameStore((s) => s.sceneIndex)
  const currentScenarioId = useGameStore((s) => s.currentScenarioId)
  const hydrate = useUI((s) => s.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <div className="relative min-h-[100dvh] bg-ink-950 text-ink-100 grain-overlay vignette">
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <Header phase={phase} currentScenarioId={currentScenarioId} />

        <main className="flex-1 w-full">
          <div className="mx-auto w-full max-w-6xl px-5 md:px-10 lg:px-14 py-6 md:py-10">
            <AnimatePresence mode="wait">
              {phase === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Intro />
                </motion.div>
              )}
              {phase === 'scene' && currentScenarioId && SCENARIOS[currentScenarioId] && (
                <motion.div
                  key={`scene-${sceneIndex}-${currentScenarioId}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Scene scenario={SCENARIOS[currentScenarioId]} />
                </motion.div>
              )}
              {phase === 'feedback' && (
                <motion.div
                  key={`feedback-${sceneIndex}-${currentScenarioId}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Feedback />
                </motion.div>
              )}
              {phase === 'pre-ending' && (
                <motion.div
                  key="pre-ending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PreEnding />
                </motion.div>
              )}
              {phase === 'ending' && (
                <motion.div
                  key="ending"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Ending />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

function Header({ phase, currentScenarioId }) {
  const t = useT()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const show = phase === 'scene' || phase === 'feedback'
  const actNumber = currentScenarioId ? actOf(currentScenarioId) : 1
  return (
    <header className="relative z-10 border-b border-ink-800/70 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-10 lg:px-14 py-3.5 md:py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-accent animate-breath" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tightest shrink-0">
            {t('ui.appName')}
          </span>
          <span className="hidden md:inline text-ink-500 text-xs uppercase tracking-[0.22em] divider-dot truncate">
            {t('ui.appTagline')}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {show && <StatsBar />}
          <ProgressRail total={TOTAL_ACTS} current={actNumber - 1} visible={show} />
          <Toolbar />
          {user && (
            <button
              onClick={() => { logout(); navigate('/auth') }}
              className="hidden md:flex items-center gap-1.5 rounded-lg border border-ink-700 px-2.5 py-1.5 text-xs text-ink-500 hover:text-ink-200 hover:border-ink-500 transition-colors"
            >
              {user.first_name} · Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const t = useT()
  return (
    <footer className="relative z-10 border-t border-ink-800/70 bg-ink-950/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-5 md:px-10 lg:px-14 py-4 md:flex-row md:items-center">
        <p className="text-xs text-ink-500">{t('ui.hackathonTag')}</p>
        <p className="text-xs text-ink-500">
          {t('ui.hotline')}: <span className="text-ink-100">{t('ui.hotlineNumber')}</span>
        </p>
      </div>
    </footer>
  )
}
