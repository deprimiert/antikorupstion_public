import { motion } from 'framer-motion'

export default function MobileApp2() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F5F5F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: 24,
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: '40px 32px',
          maxWidth: 380,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🚧</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#212121', marginBottom: 8 }}>
          Прототип 2
        </div>
        <div style={{ fontSize: 15, color: '#757575', marginBottom: 8, lineHeight: 1.6 }}>
          в разработке
        </div>
        <div style={{ fontSize: 13, color: '#9E9E9E', marginBottom: 28 }}>
          Этот прототип будет добавлен позже.<br />
          Пока можно посмотреть прототип 1.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="?proto=1"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 20px', borderRadius: 14,
              background: '#2E7D32', color: '#fff',
              fontWeight: 700, fontSize: 15, textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
          >
            📱 Прототип 1 →
          </a>
          <a
            href="/"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 20px', borderRadius: 14,
              background: '#F5F5F5', color: '#424242',
              fontWeight: 700, fontSize: 15, textDecoration: 'none',
              border: '1.5px solid #E0E0E0',
            }}
          >
            ← Основная игра
          </a>
        </div>
      </motion.div>
    </div>
  )
}
