import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'
import { initSchema } from './db.js'
import authRouter from './routes/auth.js'
import scenariosRouter from './routes/scenarios.js'
import sessionsRouter from './routes/sessions.js'
import gameRouter from './routes/game.js'

const __dir = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dir, '..', 'dist')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))
app.use(express.json())

app.use('/api/auth',      authRouter)
app.use('/api/scenarios', scenariosRouter)
app.use('/api/sessions',  sessionsRouter)
app.use('/api/game',      gameRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }))

// Раздаём собранный фронтенд
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  // Все остальные маршруты — отдаём index.html (React Router)
  app.use((_req, res) => res.sendFile(join(distPath, 'index.html')))
} else {
  app.get('/', (_req, res) => res.json({ ok: true, api: '/api/*' }))
}

async function start() {
  if (!process.env.DATABASE_URL) {
    console.error('[server] FATAL: DATABASE_URL is not set. Add it in Railway → Variables.')
    process.exit(1)
  }
  if (!process.env.JWT_SECRET) {
    console.error('[server] FATAL: JWT_SECRET is not set. Add it in Railway → Variables.')
    process.exit(1)
  }
  try {
    await initSchema()
    app.listen(PORT, '0.0.0.0', () => console.log(`[server] listening on port ${PORT}`))
  } catch (err) {
    console.error('[server] Failed to start:', err.message)
    process.exit(1)
  }
}

start()
