/**
 * One-off: promote oldest user to admin when none exist.
 * Usage: DATABASE_URI="postgresql://..." npx tsx scripts/promote-admin.ts
 */
import { config as loadDotenv } from 'dotenv'
import pg from 'pg'
import { normalizeDatabaseUri } from '../src/lib/cms/databaseUri'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

const uri = normalizeDatabaseUri(process.env.DATABASE_URI || '')
if (!uri) {
  console.error('Set DATABASE_URI to your Neon pooler URL first.')
  process.exit(1)
}

const client = new pg.Client({
  connectionString: uri,
  ssl: uri.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
})

await client.connect()
const admins = await client.query(`select count(*)::int as count from users where role = 'admin'`)
if (admins.rows[0].count > 0) {
  console.log('Admin already exists — nothing to do.')
} else {
  const promoted = await client.query(
    `update users set role = 'admin' where id = (select id from users order by id asc limit 1) returning id, email, role`,
  )
  console.log('Promoted:', promoted.rows[0] || 'no users found')
}
await client.end()
