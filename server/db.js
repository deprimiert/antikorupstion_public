import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Pool } = pg
const __dir = dirname(fileURLToPath(import.meta.url))

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
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
