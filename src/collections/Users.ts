import type { CollectionConfig } from 'payload'

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
  fields: [
    // Email added by default
  ],
}
