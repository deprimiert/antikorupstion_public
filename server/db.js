import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Pool } = pg
const __dir = dirname(fileURLToPath(import.meta.url))

// Railway internal URL (*.railway.internal) не требует SSL.
// Внешние URL (*.rlwy.net, RDS и т.д.) — требуют ssl с rejectUnauthorized: false.
const isExternalDb = process.env.DATABASE_URL?.includes('.rlwy.net') ||
                     process.env.DATABASE_URL?.includes('amazonaws') ||
                     process.env.DATABASE_URL?.includes('supabase')

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isExternalDb ? { rejectUnauthorized: false } : false,
})

export async function initSchema() {
  const sql = readFileSync(join(__dir, 'schema.sql'), 'utf8')
  await pool.query(sql)
  console.log('[db] schema applied')
}

export async function query(text, params) {
  const res = await pool.query(text, params)
  return res
}
