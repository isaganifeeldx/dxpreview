import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Articles } from './collections/Articles'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { vercelBlobClientUploadEndpoint } from './endpoints/vercelBlobClientUpload'
import { ArticlesPage } from './globals/ArticlesPage'
import { Contact } from './globals/Contact'
import { Faq } from './globals/Faq'
import { Home } from './globals/Home'
import { PrivacyPolicy } from './globals/PrivacyPolicy'
import { Settings } from './globals/Settings'
import { TermsOfService } from './globals/TermsOfService'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const blobToken = (process.env.BLOB_READ_WRITE_TOKEN || '').trim()
/** Accept real Vercel Blob RW tokens; avoid disabling the plugin on minor format drift. */
const hasValidBlobToken = blobToken.startsWith('vercel_blob_rw_')
const isVercel = process.env.VERCEL === '1'

if (isVercel && !hasValidBlobToken) {
  console.warn(
    '[payload] BLOB_READ_WRITE_TOKEN is missing or invalid. Media will use local disk and break on Vercel — connect a Blob store and set the token for Production + Preview.',
  )
}

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '')
}

function toAbsoluteUrl(hostOrUrl: string): string {
  if (/^https?:\/\//i.test(hostOrUrl)) return normalizeUrl(hostOrUrl)
  return normalizeUrl(`https://${hostOrUrl}`)
}

/** Prefer explicit site URL; fall back to the current Vercel deployment host. */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? toAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL)
  : ''

const vercelOrigins = [
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
  .filter((value): value is string => Boolean(value))
  .map(toAbsoluteUrl)

const serverURL = configuredSiteUrl || vercelOrigins[0] || ''

/** Whitelist every host the admin might be opened from (preview + production). */
const trustedOrigins = [...new Set([serverURL, configuredSiteUrl, ...vercelOrigins].filter(Boolean))]

export default buildConfig({
  ...(serverURL ? { serverURL } : {}),
  csrf: trustedOrigins,
  cors: trustedOrigins,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— DXI CMS',
    },
    components: {
      graphics: {
        Logo: '/components/payload/Logo',
        Icon: '/components/payload/Icon',
      },
    },
    // Avoid noisy hydration warnings from theme/CSS and browser extensions on /admin
    suppressHydrationWarning: true,
  },
  collections: [Articles, Media, Users],
  // Alphabetical by admin label within the Globals sidebar.
  globals: [
    ArticlesPage,
    Contact,
    Faq,
    Home,
    PrivacyPolicy,
    Settings,
    TermsOfService,
  ],
  endpoints: hasValidBlobToken ? [vercelBlobClientUploadEndpoint] : [],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      // Required on Vercel — local disk uploads do not persist in serverless.
      enabled: hasValidBlobToken,
      collections: {
        media: true,
      },
      token: blobToken,
      // Bypass Vercel serverless 4.5MB body limit for larger images/videos.
      clientUploads: true,
      // Numbered suffixes (article-1.webp) via NumberedBlobUploadHandler — not random.
      addRandomSuffix: false,
    }),
    // Runs after Blob plugin providers so our numbered uploader wins setUploadHandler.
    ((config) => {
      if (!hasValidBlobToken) return config
      config.admin ??= {}
      config.admin.components ??= {}
      config.admin.components.providers ??= []
      config.admin.components.providers.push({
        path: '/components/payload/NumberedBlobUploadHandler#NumberedBlobUploadHandler',
        clientProps: {
          collectionSlug: 'media',
          enabled: true,
          extra: {
            addRandomSuffix: false,
            useCompositePrefixes: false,
          },
          // Custom route enables allowOverwrite for validation retries (e.g. missing alt).
          serverHandlerPath: '/vercel-blob-client-upload-route-overwrite',
        },
      })
      return config
    }) satisfies Plugin,
  ],
  // Schedule publish jobs. autoRun is for long-lived servers only — not Vercel serverless.
  jobs: {
    access: {
      run: ({ req }) => Boolean(req.user),
    },
    ...(isVercel
      ? {}
      : {
          autoRun: [
            {
              cron: '* * * * *',
            },
          ],
        }),
  },
  sharp,
})
