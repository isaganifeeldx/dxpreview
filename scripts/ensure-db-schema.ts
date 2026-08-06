/**
 * Sync Payload Postgres schema to whatever DATABASE_URI points at
 * (local, Neon, future RDS).
 *
 * Default (develop/staging): always push so new collections/fields are added
 * automatically — avoids "relation/column does not exist" while iterating.
 *
 * Flags / env:
 *   --only-if-empty                 Only push when `users` table is missing
 *   PAYLOAD_SKIP_SCHEMA_PUSH=true   Skip entirely (lock schema for real production later)
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

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

const onlyIfEmpty = process.argv.includes('--only-if-empty')
const skipPush = process.env.PAYLOAD_SKIP_SCHEMA_PUSH === 'true'
const require = createRequire(import.meta.url)

/**
 * Payload's loadEnv does `import x from '@next/env'` then reads `x.loadEnvConfig`.
 * Under tsx on Vercel that default export is undefined — patch CJS interop first.
 */
function patchNextEnvInterop(): void {
  const moduleApi = Module as typeof Module & {
    _load: (...args: unknown[]) => unknown
    __dxiNextEnvPatched?: boolean
  }

  if (!moduleApi.__dxiNextEnvPatched) {
    const originalLoad = moduleApi._load
    moduleApi._load = function patchedLoad(request: string, ...rest: unknown[]) {
      const exported = originalLoad.call(this, request, ...rest) as {
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

async function usersTableExists(connectionString: string): Promise<boolean> {
  const client = new pg.Client({
    connectionString,
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : undefined,
  })

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
  if (!process.env.PAYLOAD_SECRET) {
    process.env.PAYLOAD_SECRET = 'schema-ensure-temporary-secret'
  }

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

  const databaseUri = process.env.DATABASE_URI
  if (!databaseUri) {
    console.error('Missing DATABASE_URI. Set it to your Postgres/Neon/RDS connection string.')
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
  process.exit(0)
}

main().catch((error) => {
  console.error('Database schema sync failed:', error)
  process.exit(1)
})
