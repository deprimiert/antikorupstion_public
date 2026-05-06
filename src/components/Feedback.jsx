import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useT } from '../i18n'
import { SCENARIOS, CHOICE_TYPE_TONE, pickNextScenarioId, actOf } from '../data/scenarios'

export default function Feedback() {
  const lastEntry = useGameStore((s) => s.lastEntry)
  const currentScenarioId = useGameStore((s) => s.currentScenarioId)
  const history = useGameStore((s) => s.history)
  const stats = useGameStore((s) => s.stats)
  const next = useGameStore((s) => s.next)
  const t = useT()
  const scenario = SCENARIOS[currentScenarioId]

  if (!lastEntry || !scenario) return null
  const isLast = pickNextScenarioId(currentScenarioId, history, stats) === null

  const title = t(`scenarios.${scenario.id}.title`)
  const choiceLabel = lastEntry.timedOut
    ? t('ui.feedback.youStayedSilent')
    : t(`scenarios.${scenario.id}.choices.${lastEntry.choiceId}.label`)
  const outcome = lastEntry.timedOut
    ? t('timeoutChoice.outcome')
    : t(`scenarios.${scenario.id}.choices.${lastEntry.choiceId}.outcome`)

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-2 md:pt-6">
      <div className="col-span-12 lg:col-span-8">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
          <span className="inline-block h-px w-6 bg-accent" />
          {t('ui.feedback.kicker', { n: actOf(currentScenarioId) })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-5"
        >
          <div className="text-sm text-ink-500">{title}</div>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold leading-[0.98] tracking-tightest">
            {choiceLabel}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="mt-7 max-w-[60ch] text-lg md:text-xl text-ink-300 leading-relaxed"
        >
          {outcome}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.22em] ${CHOICE_TYPE_TONE[lastEntry.type] || 'text-ink-300'
              }`}
          >
            {t(`ui.choiceType.${lastEntry.type}`)}
          </span>
          {lastEntry.timedOut && (
            <span className="rounded-full border border-ink-700 bg-ink-800/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-300">
              {t('ui.feedback.timeoutBadge')}
            </span>
          )}
        </motion.div>
      </div>

      <div className="col-span-12 lg:col-span-4 lg:pl-4">
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-[2.5rem] border border-ink-800 bg-ink-900/70 p-6 md:p-8 shadow-card shadow-inset"
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
            {t('ui.feedback.changesKicker')}
          </div>
          <ul className="mt-5 space-y-4">
            <DeltaRow
              label={t('ui.stats.integrity')}
              delta={lastEntry.deltas.integrity}
              tintPositive="text-halol"
              tintNegative="text-accent"
            />
            <DeltaRow
              label={t('ui.stats.money')}
              delta={lastEntry.deltas.money}
              tintPositive="text-shadow"
              tintNegative="text-ink-500"
            />
            <DeltaRow
              label={t('ui.stats.risk')}
              delta={lastEntry.deltas.risk}
              tintPositive="text-accent"
              tintNegative="text-halol"
              invert
            />
          </ul>

          <button
            onClick={next}
            className="btn-tactile group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-invert-bg px-6 py-4 text-base font-semibold text-invert-fg hover:opacity-90"
          >
            {isLast ? t('ui.feedback.reveal') : t('ui.feedback.next')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function DeltaRow({ label, delta, tintPositive, tintNegative, invert = false }) {
  if (!delta || delta === 0) {
    return (
      <li className="flex items-center justify-between">
        <span className="text-sm text-ink-300">{label}</span>
        <span className="font-mono text-sm text-ink-500">±0</span>
      </li>
    )
  }
  const positive = invert ? delta < 0 : delta > 0
  const tone = positive ? tintPositive : tintNegative
  const sign = delta > 0 ? '+' : ''
  return (
    <li className="flex items-center justify-between">
      <span className="text-sm text-ink-300">{label}</span>
      <span className={`font-mono text-sm font-semibold tabular-nums ${tone}`}>
        {sign}
        {delta}
      </span>
    </li>
  )
}
