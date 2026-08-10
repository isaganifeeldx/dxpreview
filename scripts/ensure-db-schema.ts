/**
 * Sync Payload Postgres schema to whatever DATABASE_URI points at
 * (local, Neon, future RDS).
 *
 * Local: always push so new collections/fields appear automatically.
 * Vercel builds: skipped by default — build machines (often US) timing out to
 * Neon (e.g. Sydney) is common. Sync locally with `npm run db:push` instead.
 *
 * Flags / env:
 *   --only-if-empty                   Only push when `users` table is missing
 *   PAYLOAD_SKIP_SCHEMA_PUSH=true     Skip entirely
 *   PAYLOAD_REQUIRE_SCHEMA_PUSH=true  Force schema sync during Vercel builds
 *
 * Used by:
 *   npm run build
 *   npm run db:ensure
 *   npm run db:push
 */
import { createRequire } from 'node:module'
import Module from 'node:module'
import { config as loadDotenv } from 'dotenv'
import pg from 'pg'
import { databaseHost, normalizeDatabaseUri } from '../src/lib/cms/databaseUri'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

const onlyIfEmpty = process.argv.includes('--only-if-empty')
const skipPush = process.env.PAYLOAD_SKIP_SCHEMA_PUSH === 'true'
const requireSchemaPush = process.env.PAYLOAD_REQUIRE_SCHEMA_PUSH === 'true'
const isVercel = process.env.VERCEL === '1'
const require = createRequire(import.meta.url)

/**
 * Payload's loadEnv does `import x from '@next/env'` then reads `x.loadEnvConfig`.
 * Under tsx on Vercel that default export is undefined — patch CJS interop first.
 */
function patchNextEnvInterop(): void {
  const moduleApi = Module as typeof Module & {
    _load: (request: string, parent?: unknown, isMain?: boolean) => unknown
    __dxiNextEnvPatched?: boolean
  }

  if (!moduleApi.__dxiNextEnvPatched) {
    const originalLoad = moduleApi._load.bind(moduleApi)
    moduleApi._load = function patchedLoad(
      request: string,
      parent?: unknown,
      isMain?: boolean,
    ) {
      const exported = originalLoad(request, parent, isMain) as {
        default?: unknown
        loadEnvConfig?: unknown
      }

      if (
        typeof request === 'string' &&
        request.includes('@next/env') &&
        exported &&
        typeof exported === 'object' &&
        !exported.default &&
        typeof exported.loadEnvConfig === 'function'
      ) {
        exported.default = exported
      }

      return exported
    }
    moduleApi.__dxiNextEnvPatched = true
  }

  const nextEnv = require('@next/env') as {
    default?: unknown
    loadEnvConfig?: unknown
  }
  if (nextEnv && !nextEnv.default && typeof nextEnv.loadEnvConfig === 'function') {
    nextEnv.default = nextEnv
  }
}

function shouldUseSsl(connectionString: string): boolean {
  if (/sslmode=require/i.test(connectionString)) return true
  if (/localhost|127\.0\.0\.1/i.test(connectionString)) return false
  return true
}

function createPgClient(connectionString: string) {
  return new pg.Client({
    connectionString: normalizeDatabaseUri(connectionString),
    connectionTimeoutMillis: 30_000,
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : undefined,
  })
}

async function assertDatabaseReachable(connectionString: string): Promise<boolean> {
  const maxAttempts = 3
  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const client = createPgClient(connectionString)
    try {
      await client.connect()
      await client.query('select 1')
      console.log(`Database reachable (attempt ${attempt}/${maxAttempts}).`)
      return true
    } catch (error) {
      lastError = error
      const message = error instanceof Error ? error.message : String(error)
      console.warn(`Database connect attempt ${attempt}/${maxAttempts} failed: ${message}`)
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500))
      }
    } finally {
      await client.end().catch(() => undefined)
    }
  }

  console.error(
    [
      'Could not connect to Postgres.',
      `Host: ${databaseHost(connectionString)}`,
      `Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
    ].join('\n'),
  )
  return false
}

async function usersTableExists(connectionString: string): Promise<boolean> {
  const client = createPgClient(connectionString)

  try {
    await client.connect()
    const result = await client.query<{ exists: boolean }>(
      `select to_regclass('public.users') is not null as exists`,
    )
    return Boolean(result.rows[0]?.exists)
  } finally {
    await client.end().catch(() => undefined)
  }
}

/**
 * Accounts created before the `role` field often got defaultValue `editor`.
 * If nobody is admin, promote the oldest user so CMS user-management isn't locked out.
 */
async function ensureAtLeastOneAdmin(connectionString: string): Promise<void> {
  const client = createPgClient(connectionString)

  try {
    await client.connect()

    const usersExist = await client.query<{ exists: boolean }>(
      `select to_regclass('public.users') is not null as exists`,
    )
    if (!usersExist.rows[0]?.exists) return

    const roleColumn = await client.query<{ exists: boolean }>(
      `select exists (
         select 1 from information_schema.columns
         where table_schema = 'public' and table_name = 'users' and column_name = 'role'
       ) as exists`,
    )
    if (!roleColumn.rows[0]?.exists) return

    const admins = await client.query<{ count: string }>(
      `select count(*)::text as count from users where role = 'admin'`,
    )
    if (Number(admins.rows[0]?.count ?? 0) > 0) {
      console.log('Admin user(s) already present — no role backfill needed.')
      return
    }

    const promoted = await client.query<{ id: number | string; email: string }>(
      `update users
       set role = 'admin'
       where id = (select id from users order by id asc limit 1)
       returning id, email`,
    )

    const row = promoted.rows[0]
    if (row) {
      console.log(
        `No admin found — promoted first account to admin (id=${row.id}, email=${row.email}).`,
      )
    } else {
      console.log('No users to promote — create the first admin via /admin.')
    }
  } finally {
    await client.end().catch(() => undefined)
  }
}

type PushableAdapter = {
  schema: unknown
  drizzle: unknown
  schemaName?: string
  tablesFilter?: string[]
  extensions?: { postgis?: boolean }
  requireDrizzleKit: () => {
    pushSchema: (
      schema: unknown,
      drizzle: unknown,
      schemaNames?: string[],
      tablesFilter?: string[],
      extensionsFilter?: string[],
    ) => Promise<{
      apply: () => Promise<void>
      hasDataLoss: boolean
      warnings: string[]
    }>
  }
}

async function pushSchema(): Promise<void> {
  if (!(process.env.PAYLOAD_SECRET || '').trim()) {
    if (isVercel) {
      throw new Error(
        'PAYLOAD_SECRET is required on Vercel. Set it in Project → Settings → Environment Variables for Production and Preview.',
      )
    }
    process.env.PAYLOAD_SECRET = 'schema-ensure-temporary-secret'
  }

  // Ensure Payload/drizzle see the SSL-compat URI too.
  process.env.DATABASE_URI = normalizeDatabaseUri(process.env.DATABASE_URI || '')

  // Skip Payload's interactive pushDevSchema on connect; we push ourselves below.
  process.env.PAYLOAD_MIGRATING = 'true'

  patchNextEnvInterop()

  const { getPayload } = await import('payload')
  const { default: payloadConfig } = await import('@payload-config')
  const payload = await getPayload({ config: payloadConfig })
  const adapter = payload.db as unknown as PushableAdapter

  if (typeof adapter.requireDrizzleKit !== 'function') {
    throw new Error('Postgres adapter does not expose requireDrizzleKit(); cannot sync schema.')
  }

  const { pushSchema: drizzlePushSchema } = adapter.requireDrizzleKit()
  const { apply, hasDataLoss, warnings } = await drizzlePushSchema(
    adapter.schema,
    adapter.drizzle,
    adapter.schemaName ? [adapter.schemaName] : undefined,
    adapter.tablesFilter,
    adapter.extensions?.postgis ? ['postgis'] : undefined,
  )

  if (warnings.length > 0) {
    console.warn(`Schema sync warnings (${warnings.length}):`)
    for (const warning of warnings) console.warn(`  - ${warning}`)
  }
  if (hasDataLoss) {
    console.warn(
      'Possible data loss flagged by Drizzle — applying anyway (develop/staging auto-sync).',
    )
  }

  await apply()
}

async function main() {
  if (skipPush) {
    console.log('PAYLOAD_SKIP_SCHEMA_PUSH=true — skipping database schema sync.')
    process.exit(0)
  }

  // Vercel build (iad1 etc.) often cannot reach Neon in time — don't block next build.
  if (isVercel && !requireSchemaPush) {
    console.log(
      'Vercel build detected — skipping database schema sync (default).\n' +
        'Schema is synced locally via `npm run db:push` / `npm run build` on your machine.\n' +
        'Set PAYLOAD_REQUIRE_SCHEMA_PUSH=true only if you need sync during Vercel builds.',
    )
    process.exit(0)
  }

  const rawUri = process.env.DATABASE_URI
  if (!rawUri) {
    console.error('Missing DATABASE_URI. Set it to your Postgres/Neon/RDS connection string.')
    process.exit(1)
  }

  const databaseUri = normalizeDatabaseUri(rawUri)
  process.env.DATABASE_URI = databaseUri
  console.log(`Schema sync target host: ${databaseHost(databaseUri)}`)

  const reachable = await assertDatabaseReachable(databaseUri)
  if (!reachable) {
    process.exit(1)
  }

  if (onlyIfEmpty) {
    const exists = await usersTableExists(databaseUri)
    if (exists) {
      console.log('users table already exists (--only-if-empty). Skipping push.')
      process.exit(0)
    }
    console.log('No users table found — creating Payload schema…')
  } else {
    console.log('Syncing Payload schema (adds missing tables/columns if needed)…')
  }

  await pushSchema()
  console.log('Database schema is up to date.')
  await ensureAtLeastOneAdmin(databaseUri)
  process.exit(0)
}

main().catch((error) => {
  console.error('Database schema sync failed:', error)
  process.exit(1)
})
