import { handleUpload } from '@vercel/blob/client'
import { APIError, Forbidden } from 'payload'
import type { Endpoint } from 'payload'

const blobToken = (process.env.BLOB_READ_WRITE_TOKEN || '').trim()

/**
 * Same as Payload's Vercel Blob client-upload route, but allows overwrite so a
 * failed create (e.g. missing required alt) can be saved again without
 * "blob already exists".
 */
export const vercelBlobClientUploadEndpoint: Endpoint = {
  path: '/vercel-blob-client-upload-route-overwrite',
  method: 'post',
  handler: async (req) => {
    if (!blobToken.startsWith('vercel_blob_rw_')) {
      throw new APIError('Vercel Blob is not configured', 500)
    }

    const body = await (req as Request).json()

    try {
      const jsonResponse = await handleUpload({
        body,
        // PayloadRequest is a Request subclass at runtime; Blob SDK types are stricter.
        request: req as unknown as Request,
        token: blobToken,
        onBeforeGenerateToken: async (_pathname, collectionSlug) => {
          if (!collectionSlug) {
            throw new APIError('No payload was provided')
          }
          if (!req.user) {
            throw new Forbidden()
          }
          return {
            addRandomSuffix: false,
            allowOverwrite: true,
            cacheControlMaxAge: 60 * 60 * 24 * 365,
          }
        },
        onUploadCompleted: async () => {},
      })

      return Response.json(jsonResponse)
    } catch (error) {
      req.payload.logger.error(error)
      throw new APIError('storage-vercel-blob client upload route error')
    }
  },
}
