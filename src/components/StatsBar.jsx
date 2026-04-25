import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function StatsBar() {
  const stats = useGameStore((s) => s.stats)
  return (
    <div className="hidden sm:flex items-center gap-3 md:gap-4">
      <StatPill label="Честность" value={stats.integrity} color="bg-halol" tone="text-halol" />
      <StatPill label="Ресурс" value={stats.money} color="bg-shadow" tone="text-shadow" />
      <StatPill label="Риск" value={stats.risk} color="bg-accent" tone="text-accent" />
    </div>
  )
}

function StatPill({ label, value, color, tone }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-ink-800 bg-ink-900/70 px-3 py-1.5">
      <div className="h-8 w-8">
        <Ring value={value} color={color} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-ink-500">{label}</span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`font-mono text-sm font-semibold tabular-nums ${tone}`}
        >
          {value}
        </motion.span>
      </div>
    </div>
  )
}

function Ring({ value, color }) {
  const radius = 14
  const circ = 2 * Math.PI * radius
  const offset = circ - (value / 100) * circ
  const stroke =
    color === 'bg-halol' ? '#5cc08a' : color === 'bg-shadow' ? '#d4a24a' : '#e03a3a'
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full -rotate-90">
      <circle cx="16" cy="16" r={radius} stroke="#1f2024" strokeWidth="3" fill="none" />
      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        stroke={stroke}
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
