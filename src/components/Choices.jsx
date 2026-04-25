import { motion } from 'framer-motion'
import { useT } from '../i18n'
import { CHOICE_TYPE_TONE } from '../data/scenarios'

export default function Choices({ scenarioId, choices, onChoose, locked }) {
  const t = useT()
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
      }}
      className="flex flex-col gap-3"
    >
      {choices.map((c, i) => {
        const label = t(`scenarios.${scenarioId}.choices.${c.id}.label`)
        const subtitle = t(`scenarios.${scenarioId}.choices.${c.id}.subtitle`)
        return (
          <motion.li
            key={c.id}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <button
              disabled={locked}
              onClick={() => onChoose(c)}
              className="btn-tactile group relative w-full overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/70 px-5 py-4 text-left shadow-inset hover:border-ink-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-800 font-mono text-[11px] text-ink-300 group-hover:border-accent group-hover:text-accent">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-ink-100 leading-snug">
                      {label}
                    </span>
                  </div>
                  {subtitle && (
                    <div className="mt-1 text-sm text-ink-500 leading-relaxed">{subtitle}</div>
                  )}

                </div>
              </div>
              <span className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-500 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
