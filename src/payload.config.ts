import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Articles } from './collections/Articles'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { ArticlesPage } from './globals/ArticlesPage'
import { Contact } from './globals/Contact'
import { Faq } from './globals/Faq'
import { Home } from './globals/Home'
import { PrivacyPolicy } from './globals/PrivacyPolicy'
import { TermsOfService } from './globals/TermsOfService'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const blobToken = process.env.BLOB_READ_WRITE_TOKEN || ''
const hasValidBlobToken = /^vercel_blob_rw_[a-z0-9]+_[a-z0-9]+$/i.test(blobToken)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
const isVercel = process.env.VERCEL === '1'

export default buildConfig({
  // Required for correct admin cookies / API URLs on deployed hosts (Vercel).
  ...(siteUrl ? { serverURL: siteUrl } : {}),
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
  collections: [Users, Media, Articles],
  globals: [Home, Faq, TermsOfService, PrivacyPolicy, Contact, ArticlesPage],
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
      // Keep local disk uploads when no valid Blob token (local/AWS path).
      enabled: hasValidBlobToken,
      collections: {
        media: true,
      },
      token: blobToken,
      // Bypass Vercel serverless 4.5MB body limit for larger images/videos.
      clientUploads: true,
    }),
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
