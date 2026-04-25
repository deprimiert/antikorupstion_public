import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function Intro() {
  const start = useGameStore((s) => s.start)

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-y-14 pt-6 md:pt-16">
      <div className="col-span-12 md:col-span-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-500"
        >
          <span className="inline-block h-px w-6 bg-accent" />
          10 сцен · 10 секунд · 4 финала
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tightest"
        >
          Что бы
          <br />
          <span className="text-accent">ты</span> выбрал?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[52ch] text-lg md:text-xl text-ink-300 leading-relaxed"
        >
          Ты пройдёшь путь от студента до министра. На каждом шаге — соблазн. У тебя десять секунд на
          решение. Твой выбор меняет не только цифры — он меняет, каким человеком ты станешь к финалу.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <button
            onClick={start}
            className="group btn-tactile inline-flex items-center gap-3 rounded-2xl bg-accent px-7 py-4 text-base font-semibold text-ink-950 shadow-card hover:bg-accent-glow"
          >
            Начать путь
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-halol animate-breath" />
            </span>
            Без регистрации. Один подход — 5 минут.
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 md:col-span-4 md:pl-6 lg:pl-10"
      >
        <div className="relative rounded-[2.5rem] border border-ink-800 bg-ink-900/70 p-7 md:p-8 shadow-card shadow-inset">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-ink-500">
            Как читать стат
          </div>
          <ul className="mt-5 space-y-4">
            <StatLegend
              color="bg-halol"
              name="Честность"
              hint="Репутация. Даёт стабильность и защиту."
            />
            <StatLegend
              color="bg-shadow"
              name="Ресурс"
              hint="Деньги и связи. Ускоряют путь — но оставляют след."
            />
            <StatLegend
              color="bg-accent"
              name="Риск"
              hint="Вероятность, что за тобой придут."
            />
          </ul>

          <div className="mt-7 border-t border-ink-800 pt-5">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-ink-500">
              Таймер
            </div>
            <p className="mt-3 text-sm text-ink-300 leading-relaxed">
              10 секунд. Если не решишь — выбор сделают за тебя. Это тоже ответ.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StatLegend({ color, name, hint }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1.5 h-2 w-2 rounded-full ${color}`} />
      <div>
        <div className="text-sm font-medium text-ink-100">{name}</div>
        <div className="text-xs text-ink-500 leading-relaxed">{hint}</div>
      </div>
    </li>
  )
}
