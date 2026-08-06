import type { Access } from 'payload'

/** Public site can read; only logged-in CMS users can write. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Globals: public read + authenticated update. */
export const publicReadAuthenticatedUpdate = {
  read: () => true as boolean | Promise<boolean>,
  update: ({ req: { user } }: { req: { user?: unknown } }) => Boolean(user),
}
