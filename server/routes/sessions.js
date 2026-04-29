import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth, requireTeacher } from '../middleware/auth.js'

const router = Router()

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

// GET /api/sessions — сессии текущего учителя
router.get('/', requireTeacher, async (req, res) => {
  try {
    const result = await query(
      `SELECT ss.*, sc.title AS scenario_title,
              (SELECT COUNT(*) FROM session_players WHERE session_id=ss.id) AS player_count
       FROM sessions ss
       JOIN scenarios sc ON sc.id = ss.scenario_id
       WHERE ss.teacher_id = $1
       ORDER BY ss.created_at DESC`,
      [req.user.id]
    )
    res.json({ sessions: result.rows })
  } catch (err) {
    console.error('[sessions GET /]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// POST /api/sessions — создать сессию
router.post('/', requireTeacher, async (req, res) => {
  const { scenario_id } = req.body
  if (!scenario_id) return res.status(400).json({ error: 'scenario_id обязателен' })
  try {
    const check = await query(
      'SELECT id, is_published FROM scenarios WHERE id=$1 AND teacher_id=$2',
      [scenario_id, req.user.id]
    )
    if (!check.rows[0]) return res.status(404).json({ error: 'Сценарий не найден' })

    let code, attempts = 0
    do {
      code = generateCode()
      attempts++
      if (attempts > 20) throw new Error('Не удалось сгенерировать код')
    } while ((await query('SELECT id FROM sessions WHERE code=$1', [code])).rows.length > 0)

    const result = await query(
      `INSERT INTO sessions (teacher_id, scenario_id, code)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.user.id, scenario_id, code]
    )
    res.status(201).json({ session: result.rows[0] })
  } catch (err) {
    console.error('[sessions POST /]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/sessions/join/:code — найти сессию по коду (студент)
router.get('/join/:code', requireAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT ss.id, ss.code, ss.status, sc.title AS scenario_title,
              u.first_name || ' ' || u.last_name AS teacher_name
       FROM sessions ss
       JOIN scenarios sc ON sc.id = ss.scenario_id
       JOIN users u ON u.id = ss.teacher_id
       WHERE ss.code = $1`,
      [req.params.code.toUpperCase()]
    )
    if (!result.rows[0]) return res.status(404).json({ error: 'Сессия не найдена' })
    res.json({ session: result.rows[0] })
  } catch (err) {
    console.error('[sessions GET /join/:code]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// POST /api/sessions/join/:code — вступить в сессию
router.post('/join/:code', requireAuth, async (req, res) => {
  try {
    const sessRes = await query(
      'SELECT id, status FROM sessions WHERE code=$1',
      [req.params.code.toUpperCase()]
    )
    if (!sessRes.rows[0]) return res.status(404).json({ error: 'Сессия не найдена' })
    const sess = sessRes.rows[0]
    if (sess.status === 'finished') return res.status(400).json({ error: 'Сессия завершена' })

    await query(
      `INSERT INTO session_players (session_id, user_id, player_name)
       VALUES ($1, $2, $3) ON CONFLICT (session_id, user_id) DO NOTHING`,
      [sess.id, req.user.id, req.body.player_name || null]
    )
    res.json({ session_id: sess.id, status: sess.status })
  } catch (err) {
    console.error('[sessions POST /join/:code]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/sessions/:id — детали сессии с игроками
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const sessRes = await query(
      `SELECT ss.*, sc.title AS scenario_title, sc.id AS scenario_id
       FROM sessions ss JOIN scenarios sc ON sc.id=ss.scenario_id
       WHERE ss.id=$1`,
      [req.params.id]
    )
    if (!sessRes.rows[0]) return res.status(404).json({ error: 'Не найдена' })

    const sess = sessRes.rows[0]
    if (sess.teacher_id !== req.user.id && req.user.role !== 'admin') {
      // студент может видеть только если он в сессии
      const inSess = await query(
        'SELECT id FROM session_players WHERE session_id=$1 AND user_id=$2',
        [req.params.id, req.user.id]
      )
      if (!inSess.rows[0]) return res.status(403).json({ error: 'Нет доступа' })
    }

    const playersRes = await query(
      `SELECT sp.id, sp.player_name, sp.joined_at,
              u.first_name, u.last_name, u.email,
              gr.ending_key, gr.final_stats, gr.completed_at
       FROM session_players sp
       JOIN users u ON u.id=sp.user_id
       LEFT JOIN game_results gr ON gr.session_id=sp.session_id AND gr.user_id=sp.user_id
       WHERE sp.session_id=$1
       ORDER BY sp.joined_at`,
      [req.params.id]
    )

    res.json({ session: sess, players: playersRes.rows })
  } catch (err) {
    console.error('[sessions GET /:id]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// PATCH /api/sessions/:id/start
router.patch('/:id/start', requireTeacher, async (req, res) => {
  try {
    const check = await query('SELECT teacher_id FROM sessions WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найдена' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    const result = await query(
      `UPDATE sessions SET status='active', started_at=NOW() WHERE id=$1 RETURNING *`,
      [req.params.id]
    )
    res.json({ session: result.rows[0] })
  } catch (err) {
    console.error('[sessions PATCH /:id/start]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// PATCH /api/sessions/:id/finish
router.patch('/:id/finish', requireTeacher, async (req, res) => {
  try {
    const check = await query('SELECT teacher_id FROM sessions WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найдена' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    const result = await query(
      `UPDATE sessions SET status='finished', finished_at=NOW() WHERE id=$1 RETURNING *`,
      [req.params.id]
    )
    res.json({ session: result.rows[0] })
  } catch (err) {
    console.error('[sessions PATCH /:id/finish]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// DELETE /api/sessions/:id
router.delete('/:id', requireTeacher, async (req, res) => {
  try {
    const check = await query('SELECT teacher_id FROM sessions WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найдена' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })
    await query('DELETE FROM sessions WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (err) {
    console.error('[sessions DELETE /:id]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default router
