import { head } from '@vercel/blob'
import { getSafeFileName } from 'payload/internal'
import type { PayloadRequest } from 'payload'

async function blobExists(pathname: string, token: string): Promise<boolean> {
  try {
    await head(pathname, { token })
    return true
  } catch {
    return false
  }
}

function incrementFilename(name: string): string {
  const dot = name.lastIndexOf('.')
  const base = dot === -1 ? name : name.slice(0, dot)
  const ext = dot === -1 ? '' : name.slice(dot)
  const match = base.match(/^(.*)-(\d+)$/)
  if (!match) return `${base}-1${ext}`
  return `${match[1]}-${Number(match[2]) + 1}${ext}`
}

/**
 * Prefer `article.webp`, then `article-1.webp`, `article-2.webp`, …
 * Uses Payload DB uniqueness, then skips names that already exist as Blob orphans.
 */
export async function getUniqueMediaFilename({
  desiredFilename,
  req,
  token,
}: {
  desiredFilename: string
  req: PayloadRequest
  token?: string
}): Promise<string> {
  let candidate = await getSafeFileName({
    collectionSlug: 'media',
    desiredFilename,
    req,
  })

  if (!token) return candidate

  let guard = 0
  while (guard < 100 && (await blobExists(candidate, token))) {
    candidate = incrementFilename(candidate)
    // Re-run DB check from this candidate so we don't collide with saved docs either.
    candidate = await getSafeFileName({
      collectionSlug: 'media',
      desiredFilename: candidate,
      req,
    })
    guard += 1
  }

  return candidate
}
