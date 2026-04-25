import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useT } from '../i18n'

export default function PreEnding() {
  const stats = useGameStore((s) => s.stats)
  const playerName = useGameStore((s) => s.playerName)
  const behaviorTags = useGameStore((s) => s.behaviorTags)
  const finishToEnding = useGameStore((s) => s.finishToEnding)
  const t = useT()
  const [step, setStep] = useState(-1)

  // Determine emotional tone based on stats
  let toneKey = 'gray' // default: серая зона
  if (stats.risk >= 70) toneKey = 'danger'
  else if (stats.integrity >= 65) toneKey = 'honor'
  else if (stats.money >= 50 && stats.risk >= 40) toneKey = 'corrupt'

  const line1 = t(`ui.preEnding.${toneKey}.line1`, { name: playerName || t('ui.preEnding.defaultName') })
  const line2 = t(`ui.preEnding.${toneKey}.line2`, { name: playerName || t('ui.preEnding.defaultName') })
  const line3 = t(`ui.preEnding.${toneKey}.line3`, { name: playerName || t('ui.preEnding.defaultName') })
  const tagLabel = t(`ui.preEnding.tags.${behaviorTags.dominant}`)

  // Auto-advance lines with dramatic timing
  useEffect(() => {
    const t0 = setTimeout(() => setStep(0), 500)
    const t1 = setTimeout(() => setStep(1), 3000)
    const t2 = setTimeout(() => setStep(2), 5500)
    const t3 = setTimeout(() => setStep(3), 8000)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-2xl text-center">
        <AnimatePresence>
          {step >= 0 && (
            <motion.p
              key="l1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl text-ink-300 leading-relaxed font-display"
            >
              {line1}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 1 && (
            <motion.p
              key="l2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xl md:text-2xl text-ink-400 leading-relaxed"
            >
              {line2}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              key="l3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <p className="text-lg text-ink-500 italic">{line3}</p>
              {tagLabel && tagLabel !== `ui.preEnding.tags.${behaviorTags.dominant}` && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/80 px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] text-ink-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-breath" />
                  {tagLabel}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.button
              key="btn"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={finishToEnding}
              className="mt-12 btn-tactile group inline-flex items-center gap-3 rounded-2xl bg-invert-bg px-8 py-4 text-base font-semibold text-invert-fg hover:opacity-90"
            >
              {t('ui.preEnding.reveal')}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
