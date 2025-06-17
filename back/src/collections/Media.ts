import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Contenu',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: true,
}
