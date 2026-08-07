import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access'

const isProd = process.env.NODE_ENV === 'production'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    // Required for HTTPS admin sessions on Vercel; keep lax for same-site admin+API.
    cookies: {
      sameSite: 'Lax',
      secure: isProd,
    },
  },
  // No public self-registration. First user still works via /admin create-first-user
  // (Payload uses overrideAccess). Extra CMS users can only be added while logged in.
  access: {
    admin: authenticated,
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
    unlock: authenticated,
  },
  fields: [
    // Email added by default
  ],
}
