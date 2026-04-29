import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initSchema } from './db.js'
import authRouter from './routes/auth.js'
import scenariosRouter from './routes/scenarios.js'
import sessionsRouter from './routes/sessions.js'
import gameRouter from './routes/game.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))
app.use(express.json())

app.use('/api/auth',      authRouter)
app.use('/api/scenarios', scenariosRouter)
app.use('/api/sessions',  sessionsRouter)
app.use('/api/game',      gameRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }))

async function start() {
  try {
    await initSchema()
    app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`))
  } catch (err) {
    console.error('[server] Failed to start:', err)
    process.exit(1)
  }
}

start()
