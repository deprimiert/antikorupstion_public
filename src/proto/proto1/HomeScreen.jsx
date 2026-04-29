import { motion } from 'framer-motion'

const LEVEL = 6
const PROGRESS = 72 // %

const MENU_ITEMS = [
  { id: 'learn', emoji: '📗', label: 'Darslar',    sub: '12 ta dars', bg: '#E8F5E9', color: '#2E7D32' },
  { id: 'quiz',  emoji: '📝', label: 'Testlar',    sub: '8 ta test',  bg: '#E3F2FD', color: '#1565C0' },
  { id: 'story', emoji: '📖', label: 'Hikoyalar',  sub: '5 ta hikoya',bg: '#FFF3E0', color: '#E65100' },
  { id: 'stats', emoji: '📊', label: 'Natijalar',  sub: 'Ko\'rsatkich', bg: '#F3E5F5', color: '#6A1B9A' },
]

const STREAKS = [
  { day: 'Du', done: true },
  { day: 'Se', done: true },
  { day: 'Ch', done: true },
  { day: 'Pa', done: false },
  { day: 'Ju', done: false },
  { day: 'Sh', done: false },
  { day: 'Ya', done: false },
]

export default function HomeScreen({ onNav }) {
  return (
    <div style={{ padding: '16px' }}>
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 16 }}
      >
        <div style={{ fontSize: 13, color: '#757575', marginBottom: 2 }}>Xush kelibsiz 👋</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#212121' }}>Sardor Rahimov!</div>
      </motion.div>

      {/* Level + progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07, duration: 0.4 }}
        className="proto-card"
        style={{ marginBottom: 14 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 12, color: '#757575' }}>Sizning darajangiz</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#2E7D32' }}>Level {LEVEL} · Halol Fuqaro</div>
          </div>
          <span className="proto-coin">🪙 840</span>
        </div>
        <div className="proto-progress-track">
          <div className="proto-progress-fill" style={{ width: `${PROGRESS}%` }} />
        </div>
        <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 6, textAlign: 'right' }}>{PROGRESS}% · Keyingi daraja: 100%</div>
      </motion.div>

      {/* Daily task */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        style={{ marginBottom: 14 }}
      >
        <div className="proto-daily-card">
          <div style={{ flex: 1 }}>
            <div className="proto-daily-title">Kunlik vazifa</div>
            <div className="proto-daily-name">Imtihon darsini oling</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>+50 🪙 · 5 daqiqa</div>
          </div>
          <button className="proto-play-btn" onClick={() => onNav('story')}>▶</button>
        </div>
      </motion.div>

      {/* Week streak */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.4 }}
        className="proto-card"
        style={{ marginBottom: 14 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div className="proto-section-title" style={{ margin: 0 }}>Haftalik seriya 🔥</div>
          <span style={{ fontSize: 11, color: '#2E7D32', fontWeight: 700 }}>3 kun ketma-ket!</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {STREAKS.map((s) => (
            <div key={s.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: s.done ? '#2E7D32' : '#F5F5F5',
                border: `1.5px solid ${s.done ? '#2E7D32' : '#E0E0E0'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>
                {s.done ? '✓' : ''}
              </div>
              <span style={{ fontSize: 10, color: '#9E9E9E' }}>{s.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Grid menu */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="proto-section-title">Bo'limlar</div>
        <div className="proto-grid-2x2">
          {MENU_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              className="proto-menu-card"
              onClick={() => onNav(item.id === 'stats' ? 'profile' : item.id)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22 + i * 0.05 }}
            >
              <div className="proto-menu-icon" style={{ background: item.bg, color: item.color }}>
                {item.emoji}
              </div>
              <div>
                <div className="proto-menu-label">{item.label}</div>
                <div className="proto-menu-sub">{item.sub}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
