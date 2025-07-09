import { hasRole } from './roles'

export const mediaAccess = {
  read: () => true,
  create: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  update: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  delete: ({ req: { user } }) => hasRole(user?.role, 'editor'),
}
