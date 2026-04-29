import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORIES = [
  {
    id: 'exam',
    tag: 'Akt 1',
    title: 'Imtihon',
    emoji: '🎓',
    bg: 'linear-gradient(135deg, #C8E6C9 0%, #B2DFDB 100%)',
    situation: 'Jinoyat huquqi imtihoniga 10 daqiqa qoldi. Guruh sardori konvert bilan yaqinlashdi va «o\'qituvchi bilan kelishilgan, 200 000 so\'m to\'lang» dedi.',
    question: 'Siz nima qilasiz?',
    choices: [
      {
        id: 'halol',
        text: '✅ Rad eting va o\'qituvchiga xabar bering',
        sub: 'Halol yo\'l · +12 Halollik',
        correct: true,
        feedback: 'To\'g\'ri qaror! Siz halollik ko\'rsattingiz. O\'qituvchi mamnun, hurmat oshdi. Sistema seni eslaydi: «Tamoyilli»',
      },
      {
        id: 'shortcut',
        text: '❌ Pul to\'lang va baho \"to\'g\'rilaning\"',
        sub: 'Qisqa yo\'l · −15 Halollik',
        correct: false,
        feedback: 'Noto\'g\'ri qaror. Birinchi murosa qilindi. Keyingi sessiyada ham to\'lashga to\'g\'ri keldi. Halollik −15.',
      },
    ],
  },
  {
    id: 'archive',
    tag: 'Akt 2',
    title: 'Yo\'qolgan papka',
    emoji: '📁',
    bg: 'linear-gradient(135deg, #BBDEFB 0%, #C5CAE9 100%)',
    situation: 'Hokimiyatda amaliyotdasiz. Kuratorning stolida mahalladan kelgan ayollarning unutilgan arizalari topib oldingiz.',
    question: 'Siz nima qilasiz?',
    choices: [
      {
        id: 'halol',
        text: '✅ Kuratorga to\'g\'ridan-to\'g\'ri ayting',
        sub: 'Halol yo\'l · +10 Halollik',
        correct: true,
        feedback: 'Ajoyib! Kurator g\'azablandi, lekin bir hafta o\'tib arizalar «topildi». Tavsifnomada: «O\'jar, lekin halol».',
      },
      {
        id: 'gray',
        text: '🔇 Jim turing va amaliyotni tugatіng',
        sub: 'Kulrang zona · −8 Halollik',
        correct: false,
        feedback: 'Amaliyot xotirjam o\'tdi. Lekin har kuni yo\'lakdagi ayollarning yuziga qaray olmadingiz. Halollik −8.',
      },
    ],
  },
]

export default function StoryScreen() {
  const [storyIdx, setStoryIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const story = STORIES[storyIdx]

  function handleChoose(choice) {
    if (chosen) return
    setChosen(choice)
    setShowFeedback(true)
  }

  function handleNext() {
    setChosen(null)
    setShowFeedback(false)
    setStoryIdx((i) => (i + 1) % STORIES.length)
  }

  return (
    <div style={{ padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span className="proto-badge">{story.tag}</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: '#212121' }}>{story.title}</span>
      </div>

      {/* Illustration */}
      <AnimatePresence mode="wait">
        <motion.div
          key={story.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35 }}
          style={{
            width: '100%', height: 180, borderRadius: 18,
            background: story.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 80, marginBottom: 16,
            boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
          }}
        >
          {story.emoji}
        </motion.div>
      </AnimatePresence>

      {/* Situation */}
      <div className="proto-card" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#757575', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Vaziyat</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#212121', margin: 0 }}>{story.situation}</p>
        <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: '#1565C0' }}>{story.question}</div>
      </div>

      {/* Choices */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        {story.choices.map((c) => {
          const isChosen = chosen?.id === c.id
          const isCorrect = c.correct
          const wasChosen = chosen !== null
          return (
            <motion.button
              key={c.id}
              onClick={() => handleChoose(c)}
              whileTap={{ scale: 0.98 }}
              disabled={!!chosen}
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                border: `2px solid ${wasChosen ? (isChosen ? (isCorrect ? '#2E7D32' : '#C62828') : '#E0E0E0') : '#E0E0E0'}`,
                background: wasChosen
                  ? isChosen
                    ? isCorrect ? '#E8F5E9' : '#FFEBEE'
                    : '#F9F9F9'
                  : '#fff',
                cursor: chosen ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: '#212121', marginBottom: 4 }}>{c.text}</div>
              <div style={{ fontSize: 12, color: '#9E9E9E' }}>{c.sub}</div>
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && chosen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`proto-feedback ${chosen.correct ? 'correct' : 'wrong'}`}>
              <span style={{ fontSize: 22 }}>{chosen.correct ? '🎉' : '😔'}</span>
              <div>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>
                  {chosen.correct ? 'To\'g\'ri qaror!' : 'Noto\'g\'ri qaror.'}
                </div>
                <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.9, lineHeight: 1.5 }}>{chosen.feedback}</div>
                {chosen.correct && (
                  <span className="proto-coin" style={{ marginTop: 8, display: 'inline-flex' }}>🪙 +50 Halollik tangasi</span>
                )}
              </div>
            </div>

            <button
              className="proto-btn proto-btn-green"
              style={{ marginTop: 12 }}
              onClick={handleNext}
            >
              Keyingi hikoya →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {STORIES.map((_, i) => (
          <div key={i} style={{
            width: i === storyIdx ? 20 : 8,
            height: 8,
            borderRadius: 100,
            background: i === storyIdx ? '#2E7D32' : '#C8E6C9',
            transition: 'width 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}
