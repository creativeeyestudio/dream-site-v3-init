import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      label: 'Rôle',
      type: 'select',
      options: [
        {
          label: 'Administrateur',
          value: 'admin',
        },
        {
          label: 'Editeur',
          value: 'editor',
        },
        {
          label: 'Rédacteur',
          value: 'publisher',
        },
      ],
    },
  ],
}
