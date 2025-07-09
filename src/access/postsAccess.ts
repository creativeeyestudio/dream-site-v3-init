import { Access } from 'payload/types'
import { hasRole } from './roles'

const canCreate: Access = ({ req: { user } }) => hasRole(user?.role, 'contributor')

const canUpdate: Access = async ({ req: { user }, doc }) => {
  if (hasRole(user?.role, 'editor')) return true
  if (user?.role === 'author') {
    // Vérifie la propriété author du document
    if (!doc || !('author' in doc)) return false
    // Si author est une relation MongoDB, utilise equals
    //@ts-ignore
    return typeof doc.author?.equals === 'function'
      ? doc.author.equals(user.id)
      : doc.author === user.id
  }
  return false
}

const canDelete: Access = async ({ req: { user }, doc }) => {
  if (hasRole(user?.role, 'editor')) return true
  if (user?.role === 'author') {
    if (!doc || !('author' in doc)) return false
    //@ts-ignore
    return typeof doc.author?.equals === 'function'
      ? doc.author.equals(user.id)
      : doc.author === user.id
  }
  return false
}

export const accessPosts = {
  read: () => true,
  create: canCreate,
  update: canUpdate,
  delete: canDelete,
}
