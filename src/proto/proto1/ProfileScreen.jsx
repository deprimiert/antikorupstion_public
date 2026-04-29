import { motion } from 'framer-motion'

const BADGES = [
  { emoji: '🏅', label: 'Birinchi qadam', earned: true },
  { emoji: '📖', label: '5 hikoya',        earned: true },
  { emoji: '🔥', label: '7 kun seriya',   earned: false },
  { emoji: '🏆', label: 'Test ustasi',    earned: false },
  { emoji: '⭐', label: 'Level 10',       earned: false },
  { emoji: '🛡️', label: 'Halol Fuqaro',  earned: true },
]

const HISTORY = [
  { icon: '📖', title: 'Imtihon hikoyasi',    points: '+50 🪙', time: 'Bugun' },
  { icon: '📝', title: 'Korrupsiya testi',    points: '+30 🪙', time: 'Kecha' },
  { icon: '📗', title: 'Yo\'qolgan papka',    points: '+50 🪙', time: '3 kun oldin' },
]

export default function ProfileScreen({ onNav }) {
  return (
    <div style={{ padding: '16px' }}>
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="proto-card"
        style={{ textAlign: 'center', padding: '24px 16px', marginBottom: 14 }}
      >
        <div className="proto-avatar" style={{ margin: '0 auto 12px' }}>S</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#212121' }}>Sardor Rahimov</div>
        <div style={{ fontSize: 13, color: '#757575', marginBottom: 10 }}>sardor@email.com</div>
        <span className="proto-badge" style={{ fontSize: 13 }}>⭐ Level 6 · Halol Fuqaro</span>

        <div className="proto-divider" style={{ margin: '14px 0' }} />

        <div className="proto-stat-row">
          <div>
            <div className="proto-stat-value" style={{ color: '#2E7D32' }}>12</div>
            <div className="proto-stat-label">O'yin</div>
          </div>
          <div style={{ width: 1, background: '#EEEEEE' }} />
          <div>
            <div className="proto-stat-value" style={{ color: '#1565C0' }}>78%</div>
            <div className="proto-stat-label">To'g'ri</div>
          </div>
          <div style={{ width: 1, background: '#EEEEEE' }} />
          <div>
            <div className="proto-stat-value" style={{ color: '#E65100' }}>840</div>
            <div className="proto-stat-label">🪙 Tanga</div>
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="proto-card"
        style={{ marginBottom: 14 }}
      >
        <div className="proto-section-title">Yutuqlar 🏅</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {BADGES.map((b, i) => (
            <div key={i} className="proto-achievement">
              <div className={`proto-achievement-icon${b.earned ? ' earned' : ''}`}>
                {b.earned ? b.emoji : <span style={{ fontSize: 20, opacity: 0.35 }}>{b.emoji}</span>}
              </div>
              <div className="proto-achievement-label">{b.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.4 }}
        className="proto-card"
        style={{ marginBottom: 14 }}
      >
        <div className="proto-section-title">Halollik ko'rsatkichi</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#757575' }}>Level 6 → Level 7</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#2E7D32' }}>72%</span>
        </div>
        <div className="proto-progress-track">
          <div className="proto-progress-fill" style={{ width: '72%' }} />
        </div>
        <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 6 }}>Keyingi daraja uchun 160 tanga kerak</div>
      </motion.div>

      {/* Activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4 }}
        className="proto-card"
        style={{ marginBottom: 14 }}
      >
        <div className="proto-section-title">So'nggi faoliyat</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {HISTORY.map((h, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: '#F5F5F5', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 20, flexShrink: 0,
                }}>
                  {h.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#212121' }}>{h.title}</div>
                  <div style={{ fontSize: 11, color: '#9E9E9E' }}>{h.time}</div>
                </div>
                <span className="proto-coin">{h.points}</span>
              </div>
              {i < HISTORY.length - 1 && <div className="proto-divider" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22 }}
      >
        <button
          className="proto-btn proto-btn-gray"
          onClick={() => window.location.href = '/'}
        >
          🚪 Chiqish
        </button>
      </motion.div>
    </div>
  )
}
