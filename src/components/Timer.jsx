import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useT } from '../i18n'

export default function Timer({ seconds, onTimeout, keyId, locked }) {
  const t = useT()
  const [remaining, setRemaining] = useState(seconds)
  const progress = useMotionValue(1)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    setRemaining(seconds)
    progress.set(1)

    if (animationRef.current) animationRef.current.stop()
    animationRef.current = animate(progress, 0, {
      duration: seconds,
      ease: 'linear',
    })

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0))
    }, 1000)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (!locked) onTimeout?.()
    }, seconds * 1000 + 120)

    return () => {
      if (animationRef.current) animationRef.current.stop()
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyId])

  useEffect(() => {
    if (locked) {
      if (animationRef.current) animationRef.current.stop()
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [locked])

  const widthPct = useTransform(progress, (v) => `${v * 100}%`)
  const danger = remaining <= 3

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-ink-900/80 px-5 py-4 shadow-card shadow-inset transition-colors duration-300 ${
        danger ? 'border-accent/60' : 'border-ink-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              danger ? 'bg-accent animate-breath' : 'bg-halol'
            }`}
          />
          {t('ui.timer.label')}
        </div>
        <div
          className={`font-mono text-2xl font-semibold tabular-nums ${
            danger ? 'text-accent' : 'text-ink-100'
          }`}
        >
          {String(remaining).padStart(2, '0')}
          <span className="text-ink-500 text-sm">s</span>
        </div>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink-800">
        <motion.div
          style={{ width: widthPct }}
          className={`h-full rounded-full ${danger ? 'bg-accent' : 'bg-halol'}`}
        />
      </div>
    </div>
  )
}
