import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth, requireTeacher } from '../middleware/auth.js'

const router = Router()

// GET /api/scenarios — список сценариев текущего учителя
router.get('/', requireTeacher, async (req, res) => {
  try {
    const result = await query(
      `SELECT s.*, u.first_name || ' ' || u.last_name AS teacher_name,
              (SELECT COUNT(*) FROM acts WHERE scenario_id = s.id) AS act_count
       FROM scenarios s
       JOIN users u ON u.id = s.teacher_id
       WHERE s.teacher_id = $1
       ORDER BY s.created_at DESC`,
      [req.user.id]
    )
    res.json({ scenarios: result.rows })
  } catch (err) {
    console.error('[scenarios GET /]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/scenarios/published — опубликованные сценарии (для студентов)
router.get('/published', requireAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT s.id, s.title, s.description, s.lang,
              u.first_name || ' ' || u.last_name AS teacher_name,
              (SELECT COUNT(*) FROM acts WHERE scenario_id = s.id) AS act_count
       FROM scenarios s
       JOIN users u ON u.id = s.teacher_id
       WHERE s.is_published = true
       ORDER BY s.created_at DESC`
    )
    res.json({ scenarios: result.rows })
  } catch (err) {
    console.error('[scenarios GET /published]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/scenarios/:id — полный сценарий с актами, выборами, ветвлением, финалами
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params

    const scenRes = await query('SELECT * FROM scenarios WHERE id=$1', [id])
    if (!scenRes.rows[0]) return res.status(404).json({ error: 'Сценарий не найден' })
    const scenario = scenRes.rows[0]

    // Проверка доступа: только учитель-владелец или опубликованный
    if (!scenario.is_published && scenario.teacher_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Нет доступа' })
    }

    const actsRes = await query(
      'SELECT * FROM acts WHERE scenario_id=$1 ORDER BY act_number',
      [id]
    )
    const acts = actsRes.rows

    if (acts.length === 0) return res.json({ scenario, acts: [], endings: [] })

    const actIds = acts.map((a) => a.id)

    const choicesRes = await query(
      'SELECT * FROM choices WHERE act_id = ANY($1) ORDER BY choice_key',
      [actIds]
    )
    const branchesRes = await query(
      'SELECT * FROM act_branches WHERE from_act_id = ANY($1) ORDER BY priority',
      [actIds]
    )
    const endingsRes = await query(
      'SELECT * FROM scenario_endings WHERE scenario_id=$1 ORDER BY condition_order',
      [id]
    )

    const choicesByAct = {}
    for (const c of choicesRes.rows) {
      if (!choicesByAct[c.act_id]) choicesByAct[c.act_id] = []
      choicesByAct[c.act_id].push(c)
    }
    const branchesByAct = {}
    for (const b of branchesRes.rows) {
      if (!branchesByAct[b.from_act_id]) branchesByAct[b.from_act_id] = []
      branchesByAct[b.from_act_id].push(b)
    }

    const actsWithData = acts.map((a) => ({
      ...a,
      choices: choicesByAct[a.id] || [],
      branches: branchesByAct[a.id] || [],
    }))

    res.json({ scenario, acts: actsWithData, endings: endingsRes.rows })
  } catch (err) {
    console.error('[scenarios GET /:id]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// POST /api/scenarios — создать сценарий
router.post('/', requireTeacher, async (req, res) => {
  const { title, description, lang } = req.body
  if (!title) return res.status(400).json({ error: 'Название обязательно' })
  try {
    const result = await query(
      `INSERT INTO scenarios (teacher_id, title, description, lang)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, title.trim(), description?.trim() || null, lang || 'ru']
    )
    res.status(201).json({ scenario: result.rows[0] })
  } catch (err) {
    console.error('[scenarios POST /]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// PUT /api/scenarios/:id — обновить мета-данные сценария
router.put('/:id', requireTeacher, async (req, res) => {
  const { title, description, lang, is_published } = req.body
  try {
    const check = await query('SELECT teacher_id FROM scenarios WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    const result = await query(
      `UPDATE scenarios SET title=$1, description=$2, lang=$3, is_published=$4, updated_at=NOW()
       WHERE id=$5 RETURNING *`,
      [title, description, lang, is_published ?? false, req.params.id]
    )
    res.json({ scenario: result.rows[0] })
  } catch (err) {
    console.error('[scenarios PUT /:id]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// DELETE /api/scenarios/:id
router.delete('/:id', requireTeacher, async (req, res) => {
  try {
    const check = await query('SELECT teacher_id FROM scenarios WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })
    await query('DELETE FROM scenarios WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (err) {
    console.error('[scenarios DELETE /:id]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// ─── Акты ────────────────────────────────────────────────────────────────────

// POST /api/scenarios/:id/acts — добавить акт
router.post('/:id/acts', requireTeacher, async (req, res) => {
  const { act_number, stage, setting, title, narrator, quote, timer, real_story, real_story_note, is_optional } = req.body
  if (!stage || !title || !narrator || !quote) {
    return res.status(400).json({ error: 'stage, title, narrator, quote обязательны' })
  }
  try {
    const check = await query('SELECT teacher_id FROM scenarios WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Сценарий не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    // Определяем номер акта если не передан
    let num = act_number
    if (!num) {
      const maxRes = await query(
        'SELECT COALESCE(MAX(act_number),0)+1 AS next FROM acts WHERE scenario_id=$1',
        [req.params.id]
      )
      num = maxRes.rows[0].next
    }

    const result = await query(
      `INSERT INTO acts (scenario_id, act_number, stage, setting, title, narrator, quote, timer, real_story, real_story_note, is_optional)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [req.params.id, num, stage, setting, title, narrator, quote, timer || 40, real_story || false, real_story_note, is_optional || false]
    )
    res.status(201).json({ act: result.rows[0] })
  } catch (err) {
    console.error('[scenarios/:id/acts POST]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// PUT /api/scenarios/:id/acts/:actId
router.put('/:id/acts/:actId', requireTeacher, async (req, res) => {
  const { stage, setting, title, narrator, quote, timer, real_story, real_story_note, is_optional, act_number } = req.body
  try {
    const check = await query(
      'SELECT s.teacher_id FROM scenarios s JOIN acts a ON a.scenario_id=s.id WHERE a.id=$1 AND s.id=$2',
      [req.params.actId, req.params.id]
    )
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    const result = await query(
      `UPDATE acts SET act_number=$1, stage=$2, setting=$3, title=$4, narrator=$5, quote=$6,
              timer=$7, real_story=$8, real_story_note=$9, is_optional=$10
       WHERE id=$11 RETURNING *`,
      [act_number, stage, setting, title, narrator, quote, timer, real_story, real_story_note, is_optional, req.params.actId]
    )
    res.json({ act: result.rows[0] })
  } catch (err) {
    console.error('[scenarios/:id/acts/:actId PUT]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// DELETE /api/scenarios/:id/acts/:actId
router.delete('/:id/acts/:actId', requireTeacher, async (req, res) => {
  try {
    const check = await query(
      'SELECT s.teacher_id FROM scenarios s JOIN acts a ON a.scenario_id=s.id WHERE a.id=$1 AND s.id=$2',
      [req.params.actId, req.params.id]
    )
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })
    await query('DELETE FROM acts WHERE id=$1', [req.params.actId])
    res.json({ ok: true })
  } catch (err) {
    console.error('[scenarios/:id/acts/:actId DELETE]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// ─── Выборы (choices) ────────────────────────────────────────────────────────

// PUT /api/scenarios/:id/acts/:actId/choices — сохранить все 3 выбора разом
router.put('/:id/acts/:actId/choices', requireTeacher, async (req, res) => {
  const { choices } = req.body // [{choice_key,type,label,subtitle,outcome,delta_*}]
  if (!Array.isArray(choices) || choices.length === 0) {
    return res.status(400).json({ error: 'choices обязателен' })
  }
  try {
    const check = await query(
      'SELECT s.teacher_id FROM scenarios s JOIN acts a ON a.scenario_id=s.id WHERE a.id=$1 AND s.id=$2',
      [req.params.actId, req.params.id]
    )
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    await query('DELETE FROM choices WHERE act_id=$1', [req.params.actId])
    const inserted = []
    for (const c of choices) {
      const r = await query(
        `INSERT INTO choices (act_id, choice_key, type, label, subtitle, outcome,
                delta_integrity, delta_money, delta_risk, delta_reputation)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [req.params.actId, c.choice_key, c.type, c.label, c.subtitle || null, c.outcome,
         c.delta_integrity || 0, c.delta_money || 0, c.delta_risk || 0, c.delta_reputation || 0]
      )
      inserted.push(r.rows[0])
    }
    res.json({ choices: inserted })
  } catch (err) {
    console.error('[choices PUT]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// ─── Ветвление ───────────────────────────────────────────────────────────────

// PUT /api/scenarios/:id/acts/:actId/branches
router.put('/:id/acts/:actId/branches', requireTeacher, async (req, res) => {
  const { branches } = req.body // [{condition_type,condition_value,to_act_id,priority}]
  try {
    const check = await query(
      'SELECT s.teacher_id FROM scenarios s JOIN acts a ON a.scenario_id=s.id WHERE a.id=$1 AND s.id=$2',
      [req.params.actId, req.params.id]
    )
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    await query('DELETE FROM act_branches WHERE from_act_id=$1', [req.params.actId])
    const inserted = []
    for (const b of (branches || [])) {
      const r = await query(
        `INSERT INTO act_branches (from_act_id, condition_type, condition_value, to_act_id, priority)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [req.params.actId, b.condition_type || null, b.condition_value || null, b.to_act_id || null, b.priority || 0]
      )
      inserted.push(r.rows[0])
    }
    res.json({ branches: inserted })
  } catch (err) {
    console.error('[branches PUT]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// ─── Финалы ──────────────────────────────────────────────────────────────────

// PUT /api/scenarios/:id/endings — сохранить все финалы сценария
router.put('/:id/endings', requireTeacher, async (req, res) => {
  const { endings } = req.body
  if (!Array.isArray(endings)) return res.status(400).json({ error: 'endings обязателен' })
  try {
    const check = await query('SELECT teacher_id FROM scenarios WHERE id=$1', [req.params.id])
    if (!check.rows[0]) return res.status(404).json({ error: 'Не найден' })
    if (check.rows[0].teacher_id !== req.user.id) return res.status(403).json({ error: 'Нет прав' })

    await query('DELETE FROM scenario_endings WHERE scenario_id=$1', [req.params.id])
    const inserted = []
    for (const e of endings) {
      const r = await query(
        `INSERT INTO scenario_endings
           (scenario_id, ending_key, title, subtitle, body, stat_quote, share_text, badge_color, conditions, condition_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [req.params.id, e.ending_key, e.title, e.subtitle || null,
         e.body || [], e.stat_quote || null, e.share_text || null,
         e.badge_color || 'bg-ink-700 text-ink-100 border-ink-500',
         JSON.stringify(e.conditions || []), e.condition_order || 0]
      )
      inserted.push(r.rows[0])
    }
    res.json({ endings: inserted })
  } catch (err) {
    console.error('[endings PUT]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default router
