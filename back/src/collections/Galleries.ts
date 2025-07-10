import type { CollectionConfig } from 'payload'

const Galleries: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: "Galerie d'image",
    plural: "Galeries d'images",
  },
  admin: {
    useAsTitle: 'gallery_name',
    group: 'Contenu',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'gallery_name',
      label: 'Nom de la galerie',
      type: 'text',
    },
    {
      name: 'gallery_images',
      label: 'Images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },

    /* ------------------------ Options de publication ------------------------ */
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'site',
          type: 'relationship',
          relationTo: 'settings',
          required: true,
          multiple: true,
        },
      ],
    },
  ],
}

export default Galleries
