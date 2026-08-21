import config from '@payload-config'
import { createHash, timingSafeEqual } from 'crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { databaseHost, normalizeDatabaseUri } from '@/lib/cms/databaseUri'

export const dynamic = 'force-dynamic'
export const maxDuration = 60
/** Run next to Neon Ohio (us-east-2), not Singapore (sin1). */
export const preferredRegion = ['iad1']

function secretsEqual(provided: string, expected: string): boolean {
  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

function extractBearerOrHeader(headerStore: Headers): string | null {
  const headerSecret = headerStore.get('x-cms-health-secret')?.trim()
  if (headerSecret) return headerSecret

  const auth = headerStore.get('authorization')?.trim()
  if (!auth) return null
  const match = /^Bearer\s+(.+)$/i.exec(auth)
  return match?.[1]?.trim() || null
}

function resolveExpectedSecret(): string | null {
  const dedicated = (process.env.CMS_HEALTH_SECRET || '').trim()
  if (dedicated) return dedicated
  // Optional fallback used by some Vercel cron setups.
  const cron = (process.env.CRON_SECRET || '').trim()
  return cron || null
}

async function isAuthorized(): Promise<boolean> {
  const expected = resolveExpectedSecret()
  if (!expected) return false

  const headerStore = await headers()
  const provided = extractBearerOrHeader(headerStore)
  if (!provided) return false

  return secretsEqual(provided, expected)
}

/**
 * Protected CMS/DB health check for operators.
 * Requires `Authorization: Bearer <CMS_HEALTH_SECRET>` or `x-cms-health-secret`.
 * Does not return user ids, emails, or roles.
 */
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const uri = normalizeDatabaseUri(process.env.DATABASE_URI || '')
  const host = uri ? databaseHost(uri) : '(missing DATABASE_URI)'

  try {
    const payload = await getPayload({ config })
    const users = await payload.find({
      collection: 'users',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const hasUsers = users.totalDocs > 0

    return NextResponse.json({
      ok: true,
      host,
      hasUsers,
      firstUserFlow: !hasUsers,
      serverURL: payload.config.serverURL || null,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[health/cms]', message)
    return NextResponse.json(
      {
        ok: false,
        host,
        error: 'CMS health check failed',
      },
      { status: 500 },
    )
  }
}
