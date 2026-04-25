import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useT } from '../i18n'

export default function StatsBar() {
  const stats = useGameStore((s) => s.stats)
  const t = useT()
  return (
    <div className="hidden sm:flex items-center gap-2 md:gap-3">
      <StatPill label={t('ui.stats.integrity')} value={stats.integrity} kind="halol" />
      <StatPill label={t('ui.stats.money')} value={stats.money} kind="shadow" />
      <StatPill label={t('ui.stats.risk')} value={stats.risk} kind="accent" />
    </div>
  )
}

const KIND_TO_TONE = {
  halol: 'text-halol',
  shadow: 'text-shadow',
  accent: 'text-accent',
}

function StatPill({ label, value, kind }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-ink-800 bg-ink-900/70 px-3 py-1.5">
      <div className="h-7 w-7">
        <Ring value={value} kind={kind} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-ink-500">{label}</span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`font-mono text-sm font-semibold tabular-nums ${KIND_TO_TONE[kind]}`}
        >
          {value}
        </motion.span>
      </div>
    </div>
  )
}

const KIND_TO_VAR = {
  halol: 'rgb(var(--halol))',
  shadow: 'rgb(var(--shadow))',
  accent: 'rgb(var(--accent))',
}

function Ring({ value, kind }) {
  const radius = 14
  const circ = 2 * Math.PI * radius
  const offset = circ - (value / 100) * circ
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full -rotate-90">
      <circle cx="16" cy="16" r={radius} stroke="rgb(var(--ink-700))" strokeWidth="3" fill="none" />
      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        stroke={KIND_TO_VAR[kind]}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
