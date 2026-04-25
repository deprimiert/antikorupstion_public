import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useT } from '../i18n'
import { SCENARIOS, CHOICE_TYPE_TONE } from '../data/scenarios'

export default function Ending() {
  const ending = useGameStore((s) => s.ending)
  const stats = useGameStore((s) => s.stats)
  const history = useGameStore((s) => s.history)
  const restart = useGameStore((s) => s.restart)
  const t = useT()
  const [copied, setCopied] = useState(false)

  if (!ending) return null

  const title = t(`endings.${ending.id}.title`)
  const subtitle = t(`endings.${ending.id}.subtitle`)
  const body = t(`endings.${ending.id}.body`)
  const stat = t(`endings.${ending.id}.stat`)
  const shareText = t(`endings.${ending.id}.share`)

  async function share() {
    const text = `${shareText}`
    try {
      if (navigator.share) {
        await navigator.share({ title: t('ui.appName'), text })
        return
      }
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10 pt-2 md:pt-6">
      <div className="col-span-12 lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] ${ending.badgeColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-breath" />
          {t('ui.ending.finalCode', { code: ending.code })}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tightest"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mt-5 max-w-[56ch] text-xl md:text-2xl text-ink-300 leading-snug"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-8 max-w-[60ch] space-y-4 text-base md:text-lg text-ink-300 leading-relaxed"
        >
          {Array.isArray(body) ? body.map((p, i) => <p key={i}>{p}</p>) : <p>{body}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 border-l-2 border-accent pl-5 text-ink-100 italic text-lg"
        >
          {stat}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={share}
            className="btn-tactile inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 font-semibold text-invert-fg hover:bg-accent-glow"
          >
            {copied ? t('ui.ending.shared') : t('ui.ending.share')} →
          </button>
          <button
            onClick={restart}
            className="btn-tactile inline-flex items-center gap-2 rounded-2xl border border-ink-700 bg-ink-900/70 px-6 py-3.5 font-semibold text-ink-100 hover:border-ink-500"
          >
            {t('ui.ending.restart')}
          </button>
          <span className="ml-auto text-sm text-ink-500">{t('ui.ending.hotlineLink')}</span>
        </motion.div>
      </div>

      <div className="col-span-12 lg:col-span-5 lg:pl-4 space-y-6">
        <div className="rounded-[2.5rem] border border-ink-800 bg-ink-900/70 p-6 md:p-8 shadow-card shadow-inset">
          <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
            {t('ui.ending.finalSummaryKicker')}
          </div>
          <ul className="mt-5 space-y-5">
            <StatRow
              label={t('ui.stats.integrity')}
              value={stats.integrity}
              color="bg-halol"
              tone="text-halol"
            />
            <StatRow
              label={t('ui.stats.money')}
              value={stats.money}
              color="bg-shadow"
              tone="text-shadow"
            />
            <StatRow
              label={t('ui.stats.risk')}
              value={stats.risk}
              color="bg-accent"
              tone="text-accent"
            />
          </ul>
        </div>

        <div className="rounded-[2.5rem] border border-ink-800 bg-ink-900/70 p-6 md:p-8 shadow-card shadow-inset">
          <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
            {t('ui.ending.decisionsKicker')}
          </div>
          <ul className="mt-5 divide-y divide-ink-800/80">
            {history.map((h, i) => {
              const sceneTitle = t(`scenarios.${h.scenarioId}.title`)
              const choiceLabel = h.timedOut
                ? t('ui.ending.decisionTimeout')
                : t(`scenarios.${h.scenarioId}.choices.${h.choiceId}.label`)
              return (
                <li key={i} className="flex items-start gap-4 py-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-ink-700 bg-ink-800 font-mono text-[10px] text-ink-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium text-ink-100 truncate">{sceneTitle}</div>
                      <span
                        className={`text-[9px] font-mono uppercase tracking-[0.22em] shrink-0 ${
                          CHOICE_TYPE_TONE[h.type] || 'text-ink-300'
                        }`}
                      >
                        {t(`ui.choiceType.${h.type}`)}
                      </span>
                    </div>
                    <div className="text-xs text-ink-500 truncate">{choiceLabel}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function StatRow({ label, value, color, tone }) {
  return (
    <li>
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-300">{label}</span>
        <span className={`font-mono text-base font-semibold tabular-nums ${tone}`}>
          {value}
          <span className="text-ink-500 text-xs">/100</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </li>
  )
}
