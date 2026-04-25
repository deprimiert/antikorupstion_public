import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { SCENARIOS, CHOICE_TYPE_LABELS, CHOICE_TYPE_COLORS } from '../data/scenarios'

export default function Ending() {
  const ending = useGameStore((s) => s.ending)
  const stats = useGameStore((s) => s.stats)
  const history = useGameStore((s) => s.history)
  const restart = useGameStore((s) => s.restart)
  const [copied, setCopied] = useState(false)

  if (!ending) return null

  async function share() {
    const text = `${ending.share} halol-yol.app`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Halol Yo‘l', text })
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
          Финал {ending.code}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tightest"
        >
          {ending.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mt-5 max-w-[56ch] text-xl md:text-2xl text-ink-300 leading-snug"
        >
          {ending.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-8 max-w-[60ch] space-y-4 text-base md:text-lg text-ink-300 leading-relaxed"
        >
          {ending.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 border-l-2 border-accent pl-5 text-ink-100 italic text-lg"
        >
          {ending.stat}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={share}
            className="btn-tactile inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 font-semibold text-ink-950 hover:bg-accent-glow"
          >
            {copied ? 'Скопировано' : 'Поделиться'} →
          </button>
          <button
            onClick={restart}
            className="btn-tactile inline-flex items-center gap-2 rounded-2xl border border-ink-700 bg-ink-900/70 px-6 py-3.5 font-semibold text-ink-100 hover:border-ink-500"
          >
            Пройти заново
          </button>
          <a
            href="https://t.me/antikor_rasmiy"
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-sm text-ink-500 hover:text-ink-300 transition-colors"
          >
            Горячая линия 1144 →
          </a>
        </motion.div>
      </div>

      {/* Right column — summary */}
      <div className="col-span-12 lg:col-span-5 lg:pl-4 space-y-6">
        <div className="rounded-[2.5rem] border border-ink-800 bg-ink-900/70 p-6 md:p-8 shadow-card shadow-inset">
          <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
            Итоговые показатели
          </div>
          <ul className="mt-5 space-y-5">
            <StatRow label="Честность" value={stats.integrity} color="bg-halol" tone="text-halol" />
            <StatRow label="Ресурс" value={stats.money} color="bg-shadow" tone="text-shadow" />
            <StatRow label="Риск" value={stats.risk} color="bg-accent" tone="text-accent" />
          </ul>
        </div>

        <div className="rounded-[2.5rem] border border-ink-800 bg-ink-900/70 p-6 md:p-8 shadow-card shadow-inset">
          <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
            Твои решения
          </div>
          <ul className="mt-5 divide-y divide-ink-800/80">
            {history.map((h, i) => (
              <li key={i} className="flex items-start gap-4 py-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-ink-700 bg-ink-800 font-mono text-[10px] text-ink-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-ink-100 truncate">{h.title}</div>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-[0.22em] shrink-0 ${CHOICE_TYPE_COLORS[h.choiceType]}`}
                    >
                      {CHOICE_TYPE_LABELS[h.choiceType] || 'Решение'}
                    </span>
                  </div>
                  <div className="text-xs text-ink-500 truncate">
                    {h.timedOut ? 'Тайм-аут' : h.choiceLabel}
                  </div>
                </div>
              </li>
            ))}
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
