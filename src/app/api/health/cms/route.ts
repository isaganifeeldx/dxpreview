import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { databaseHost, normalizeDatabaseUri } from '@/lib/cms/databaseUri'

export const dynamic = 'force-dynamic'
export const maxDuration = 60
/** Run next to Neon Ohio (us-east-2), not Singapore (sin1). */
export const preferredRegion = ['iad1']

/** Lightweight CMS/DB check for Vercel debugging (no secrets). */
export async function GET() {
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

    return NextResponse.json({
      ok: true,
      host,
      userCount: users.totalDocs,
      firstUserFlow: users.totalDocs === 0,
      serverURL: payload.config.serverURL || null,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[health/cms]', message)
    return NextResponse.json(
      {
        ok: false,
        host,
        error: message,
      },
      { status: 500 },
    )
  }
}
