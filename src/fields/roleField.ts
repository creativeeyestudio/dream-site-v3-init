import { Field } from 'payload/types'
import { ROLE_OPTIONS } from '../constants/roles'

export const roleField: Field = {
  name: 'role',
  type: 'select',
  required: true,
  defaultValue: 'contributor',
  options: ROLE_OPTIONS,
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  admin: {
    position: 'sidebar',
  },
}
