import { mediaAccess } from '@/access/mediaAccess'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Contenu',
  },
  access: mediaAccess,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: true,
}
