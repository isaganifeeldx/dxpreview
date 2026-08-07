import type {
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  Where,
} from 'payload'
import {
  adminOnlyApiView,
  isAdmin,
  isAdminBoolean,
  isAdminUser,
  isLoggedInBoolean,
  type AuthUser,
  type UserRole,
} from '@/access'

const isProd = process.env.NODE_ENV === 'production'

const ensureFirstUserIsAdmin: CollectionBeforeValidateHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!data) return data

  if (operation === 'create') {
    const existing = await req.payload.find({
      collection: 'users',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.totalDocs === 0) {
      data.role = 'admin'
    } else if (!data.role) {
      data.role = 'editor'
    }
    return data
  }

  // Existing accounts created before roles existed → treat as admin once.
  if (operation === 'update' && !data.role && !originalDoc?.role) {
    data.role = 'admin'
  }

  return data
}

/** Non-admins cannot change roles; only admins create users (except first user). */
const protectRoleChanges: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
  originalDoc,
}) => {
  if (!data) return data

  const actor = req.user as AuthUser | null

  if (operation === 'create') {
    const existing = await req.payload.find({
      collection: 'users',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.totalDocs === 0) {
      data.role = 'admin'
      return data
    }

    if (!isAdminUser(actor)) {
      throw new Error('Only admins can create users.')
    }

    const role = data.role as UserRole | undefined
    if (role !== 'admin' && role !== 'editor') {
      data.role = 'editor'
    }
    return data
  }

  if (operation === 'update' && !isAdminUser(actor)) {
    // Preserve existing role; editors can update their own profile/password only.
    data.role = originalDoc?.role ?? 'editor'
  }

  return data
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
    // Editors manage content only; user management stays in the admin nav for admins.
    hidden: ({ user }) => !isAdminUser(user as AuthUser | null),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  auth: {
    // Required for HTTPS admin sessions on Vercel; keep lax for same-site admin+API.
    cookies: {
      sameSite: 'Lax',
      secure: isProd,
    },
  },
  hooks: {
    beforeValidate: [ensureFirstUserIsAdmin],
    beforeChange: [protectRoleChanges],
  },
  // No public self-registration. First user still works via /admin create-first-user
  // (Payload uses overrideAccess). Extra users: admins only, with role admin | editor.
  access: {
    admin: isLoggedInBoolean,
    create: isAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (isAdminUser(user as AuthUser)) return true
      // Editors may read their own account (password / profile).
      return { id: { equals: user.id } } satisfies Where
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (isAdminUser(user as AuthUser)) return true
      return String(user.id) === String(id)
    },
    delete: isAdmin,
    unlock: isAdminBoolean,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Admins choose role when creating/editing users. Editors never see or change it.
        create: ({ req: { user } }) => isAdminUser(user as AuthUser | null),
        read: ({ req: { user } }) => isAdminUser(user as AuthUser | null),
        update: ({ req: { user } }) => isAdminUser(user as AuthUser | null),
      },
      admin: {
        description:
          'Admins can manage users and all content. Editors can edit content but not manage users.',
        position: 'sidebar',
      },
    },
  ],
}
