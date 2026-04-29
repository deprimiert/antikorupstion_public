import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db.js'

const router = Router()

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Проверка: дата рождения должна быть в прошлом и не старше 120 лет
function validateBirthDate(dateStr) {
  const birth = new Date(dateStr)
  if (isNaN(birth.getTime())) return 'Неверный формат даты'
  const now = new Date()
  if (birth >= now) return 'Дата рождения должна быть в прошлом'
  const maxAge = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate())
  if (birth < maxAge) return 'Слишком старая дата рождения'
  return null
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, birth_date, role } = req.body

  if (!email || !password || !first_name || !last_name || !birth_date) {
    return res.status(400).json({ error: 'Заполните все обязательные поля' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Неверный формат email' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль минимум 6 символов' })
  }

  const bdError = validateBirthDate(birth_date)
  if (bdError) return res.status(400).json({ error: bdError })

  // Только student и teacher доступны при регистрации
  const assignedRole = role === 'teacher' ? 'teacher' : 'student'

  try {
    const existing = await query('SELECT id FROM users WHERE email=$1', [email.toLowerCase()])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email уже зарегистрирован' })
    }

    const password_hash = await bcrypt.hash(password, 10)
    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, birth_date, role)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, first_name, last_name, birth_date, role, created_at`,
      [email.toLowerCase(), password_hash, first_name.trim(), last_name.trim(), birth_date, assignedRole]
    )
    const user = result.rows[0]
    res.status(201).json({ token: signToken(user), user })
  } catch (err) {
    console.error('[auth/register]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' })
  }
  try {
    const result = await query(
      'SELECT id, email, password_hash, first_name, last_name, birth_date, role FROM users WHERE email=$1',
      [email.toLowerCase()]
    )
    const user = result.rows[0]
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }
    const { password_hash: _, ...safeUser } = user
    res.json({ token: signToken(safeUser), user: safeUser })
  } catch (err) {
    console.error('[auth/login]', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Нет токена' })
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    const result = await query(
      'SELECT id, email, first_name, last_name, birth_date, role, created_at FROM users WHERE id=$1',
      [payload.id]
    )
    if (!result.rows[0]) return res.status(404).json({ error: 'Пользователь не найден' })
    res.json({ user: result.rows[0] })
  } catch {
    res.status(401).json({ error: 'Токен недействителен' })
  }
})

export default router
