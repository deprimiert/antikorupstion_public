import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/game/result — сохранить результат игры
router.post('/result', requireAuth, async (req, res) => {
  const { session_id, scenario_id, ending_key, final_stats, history, behavior_tags } = req.body

  if (!ending_key || !final_stats || !history) {
    return res.status(400).json({ error: 'ending_key, final_stats, history обязательны' })
  }

  try {
    // Если есть session_id — убедимся, что игрок в ней
    if (session_id) {
      const inSess = await query(
        'SELECT id FROM session_players WHERE session_id=$1 AND user_id=$2',
        [session_id, req.user.id]
      )
      if (!inSess.rows[0]) {
        return res.status(403).json({ error: 'Вы не являетесь участником этой сессии' })
      }
    }

    const result = await query(
      `INSERT INTO game_results
         (session_id, user_id, scenario_id, ending_key, final_stats, history, behavior_tags)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT DO NOTHING
       RETURNING *`,
      [
        session_id || null,
        req.user.id,
        scenario_id || null,
        ending_key,
        JSON.stringify(final_stats),
        JSON.stringify(history),
        JSON.stringify(behavior_tags || {}),
      ]
    )

    res.status(201).json({ result: result.rows[0] || null })
  } catch (err) {
    console.error('[game POST /result]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/game/my-results — история игр текущего пользователя
router.get('/my-results', requireAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT gr.*, sc.title AS scenario_title,
              ss.code AS session_code
       FROM game_results gr
       LEFT JOIN scenarios sc ON sc.id = gr.scenario_id
       LEFT JOIN sessions ss ON ss.id = gr.session_id
       WHERE gr.user_id = $1
       ORDER BY gr.completed_at DESC
       LIMIT 50`,
      [req.user.id]
    )
    res.json({ results: result.rows })
  } catch (err) {
    console.error('[game GET /my-results]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/game/session-results/:sessionId — результаты всех игроков сессии (для учителя)
router.get('/session-results/:sessionId', requireAuth, async (req, res) => {
  try {
    const sessCheck = await query('SELECT teacher_id FROM sessions WHERE id=$1', [req.params.sessionId])
    if (!sessCheck.rows[0]) return res.status(404).json({ error: 'Сессия не найдена' })
    if (sessCheck.rows[0].teacher_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Нет доступа' })
    }

    const result = await query(
      `SELECT gr.*, u.first_name, u.last_name, u.email
       FROM game_results gr
       JOIN users u ON u.id = gr.user_id
       WHERE gr.session_id = $1
       ORDER BY gr.completed_at`,
      [req.params.sessionId]
    )
    res.json({ results: result.rows })
  } catch (err) {
    console.error('[game GET /session-results/:sessionId]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default router
