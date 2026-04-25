import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import Timer from './Timer'
import Choices from './Choices'

const TIMER_SECONDS = 10

export default function Scene({ scenario }) {
  const choose = useGameStore((s) => s.choose)
  const timeoutChoice = useGameStore((s) => s.timeoutChoice)
  const [locked, setLocked] = useState(false)
  const lockedRef = useRef(false)

  useEffect(() => {
    lockedRef.current = false
    setLocked(false)
  }, [scenario.id])

  function handleTimeout() {
    if (lockedRef.current) return
    lockedRef.current = true
    setLocked(true)
    timeoutChoice()
  }

  function handleChoose(choice) {
    if (lockedRef.current) return
    lockedRef.current = true
    setLocked(true)
    choose(choice)
  }

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8">
      {/* Левый блок — контекст сцены */}
      <div className="col-span-12 lg:col-span-7">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
          <span className="inline-block h-px w-6 bg-accent" />
          <span>Сцена {scenario.id} из 10</span>
          <span className="text-ink-700">/</span>
          <span className="text-ink-300">{scenario.stage}</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tightest"
        >
          {scenario.title}
        </motion.h2>

        <div className="mt-3 text-sm text-ink-500">{scenario.setting}</div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-7 max-w-[58ch] text-lg md:text-xl text-ink-300 leading-relaxed"
        >
          {scenario.narrator}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mt-6 max-w-[58ch] border-l-2 border-accent pl-5 text-base md:text-lg text-ink-100 italic leading-relaxed"
        >
          {scenario.quote}
        </motion.blockquote>

        {scenario.realStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-shadow/40 bg-shadow/10 px-3 py-1.5 text-xs text-shadow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-shadow animate-breath" />
            Основано на реальных делах
            {scenario.realStoryNote && (
              <span className="hidden sm:inline text-shadow/80">— {scenario.realStoryNote}</span>
            )}
          </motion.div>
        )}
      </div>

      {/* Правый блок — таймер + выбор */}
      <div className="col-span-12 lg:col-span-5 lg:pl-4">
        <div className="sticky top-24 flex flex-col gap-5">
          <Timer
            seconds={TIMER_SECONDS}
            onTimeout={handleTimeout}
            keyId={scenario.id}
            locked={locked}
          />
          <Choices choices={scenario.choices} onChoose={handleChoose} locked={locked} />
        </div>
      </div>
    </div>
  )
}
