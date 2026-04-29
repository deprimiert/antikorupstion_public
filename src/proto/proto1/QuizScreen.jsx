import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  {
    q: 'Quyidagilardan qaysi biri korrupsiyaga misol emas?',
    options: ['Poraxo\'rlik', 'Nepotizm', 'Shaffoflik', 'Firibgarlik'],
    correct: 2,
    explanation: 'Shaffoflik korrupsiyaga qarshi kurash vositasidir, uning belgisi emas.',
  },
  {
    q: '«Nepotizm» deganda nima tushuniladi?',
    options: ['Pora berish', 'Yaqinlarni lavozimga ko\'tarish', 'Hujjat soxtalashtirish', 'Soliq yashirish'],
    correct: 1,
    explanation: 'Nepotizm — qarindosh yoki yaqinlarni tayinlash, loyiqli nomzodlarni chetlab o\'tish.',
  },
  {
    q: 'O\'zbekistonda korrupsiyaga qarshi kurashish agentligi qachon tashkil etilgan?',
    options: ['2017', '2019', '2020', '2022'],
    correct: 1,
    explanation: '2019-yil O\'zbekiston Prezidentining farmoni bilan tashkil etilgan.',
  },
  {
    q: 'Ishonch telefon raqami qanday?',
    options: ['1100', '1033', '1144', '8080'],
    correct: 2,
    explanation: '1144 — Korrupsiyaga qarshi kurashish agentligining ishonch telefoni.',
  },
]

export default function QuizScreen() {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = QUESTIONS[qIdx]
  const total = QUESTIONS.length

  function handleSelect(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correct) setScore((s) => s + 1)
  }

  function handleNext() {
    if (qIdx + 1 >= total) {
      setFinished(true)
    } else {
      setQIdx((i) => i + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    setQIdx(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <div style={{ padding: '24px 16px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="proto-card" style={{ textAlign: 'center', padding: 28 }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>{pct >= 75 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#212121', marginBottom: 6 }}>
              Test yakunlandi!
            </div>
            <div style={{ fontSize: 15, color: '#757575', marginBottom: 18 }}>
              {score} / {total} to\'g\'ri javob · {pct}%
            </div>

            {/* Score ring */}
            <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 20px' }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E8F5E9" strokeWidth="10"/>
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#2E7D32" strokeWidth="10"
                  strokeDasharray={`${pct * 2.638} 263.8`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dasharray 0.8s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#2E7D32' }}>
                {pct}%
              </div>
            </div>

            <span className="proto-coin" style={{ marginBottom: 20, display: 'inline-flex' }}>
              🪙 +{score * 10} Halollik tangasi qo'shildi
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              <button className="proto-btn proto-btn-green" onClick={handleRestart}>
                🔄 Qayta boshlash
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: '#757575', fontWeight: 600 }}>Savol {qIdx + 1}/{total}</span>
        <span className="proto-coin">🪙 {score * 10}</span>
      </div>
      <div className="proto-progress-track" style={{ marginBottom: 18 }}>
        <div className="proto-progress-fill" style={{ width: `${((qIdx) / total) * 100}%` }} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="proto-card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#2E7D32', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Viktoriya</div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#212121', lineHeight: 1.5, margin: 0 }}>{q.q}</p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {q.options.map((opt, i) => {
              let cls = 'proto-quiz-option'
              if (selected !== null) {
                if (i === q.correct) cls += ' correct'
                else if (i === selected && i !== q.correct) cls += ' wrong'
              }
              return (
                <motion.button
                  key={i}
                  className={cls}
                  onClick={() => handleSelect(i)}
                  whileTap={{ scale: 0.98 }}
                  disabled={selected !== null}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: '#F5F5F5', border: '1.5px solid #E0E0E0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                    color: '#757575',
                  }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              )
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className={`proto-feedback ${selected === q.correct ? 'correct' : 'wrong'}`} style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{selected === q.correct ? '✅' : '❌'}</span>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 3 }}>
                      {selected === q.correct ? `To'g'ri! +10 🪙` : 'Noto\'g\'ri!'}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.9 }}>{q.explanation}</div>
                  </div>
                </div>

                <button className="proto-btn proto-btn-blue" onClick={handleNext}>
                  {qIdx + 1 >= total ? 'Natijalarni ko\'rish 🏆' : 'Keyingi savol →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
