'use client'

import { createClientUploadHandler, getFileKey } from '@payloadcms/plugin-cloud-storage/client'
import { upload } from '@vercel/blob/client'
import { formatAdminURL } from 'payload/shared'

function posixBasename(key: string): string {
  const normalized = key.replace(/^\/+/, '')
  const lastSlash = normalized.lastIndexOf('/')
  return lastSlash === -1 ? normalized : normalized.slice(lastSlash + 1)
}

/**
 * Like Payload's Vercel Blob client uploader, but uses numbered suffixes
 * (`article-1.webp`) instead of long random suffixes.
 */
export const NumberedBlobUploadHandler = createClientUploadHandler({
  handler: async ({
    apiRoute,
    collectionSlug,
    docPrefix,
    extra,
    file,
    prefix,
    serverHandlerPath,
    serverURL,
    updateFilename,
  }) => {
    const useCompositePrefixes = Boolean(extra?.useCompositePrefixes)

    const uniqueRoute = formatAdminURL({
      apiRoute,
      path: '/media/unique-filename',
      serverURL,
    })

    const uniqueRes = await fetch(uniqueRoute, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name }),
    })

    if (!uniqueRes.ok) {
      throw new Error('Could not reserve a unique media filename.')
    }

    const { filename: uniqueFilename } = (await uniqueRes.json()) as { filename?: string }
    if (!uniqueFilename) {
      throw new Error('Unique filename response was empty.')
    }

    if (uniqueFilename !== file.name) {
      updateFilename(uniqueFilename)
    }

    const endpointRoute = formatAdminURL({
      apiRoute,
      path: serverHandlerPath,
      serverURL,
    })

    const { fileKey: pathname, sanitizedDocPrefix } = getFileKey({
      collectionPrefix: prefix,
      docPrefix,
      filename: uniqueFilename,
      useCompositePrefixes,
    })

    const result = await upload(pathname, file, {
      access: 'public',
      clientPayload: collectionSlug,
      contentType: file.type,
      handleUploadUrl: endpointRoute,
    })

    const pathnameFromBlob = result.pathname.replace(/^\/+/, '')
    updateFilename(decodeURIComponent(posixBasename(pathnameFromBlob)))

    return {
      prefix: sanitizedDocPrefix,
    }
  },
})
