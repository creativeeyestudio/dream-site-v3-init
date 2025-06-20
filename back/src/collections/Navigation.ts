import { CollectionConfig, Field } from 'payload'
import { v4 as uuidv4 } from 'uuid'

// Réutilisable : structure commune pour les liens
const linkFields = (): Field[] => [
  {
    name: 'type',
    type: 'radio',
    options: [
      { label: 'Page', value: 'page' },
      { label: 'Article', value: 'post' },
      { label: 'Lien personnalisé', value: 'external' },
    ],
    defaultValue: 'page',
    required: true,
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_data, sibling) => sibling.type === 'page',
    },
  },
  {
    name: 'post',
    type: 'relationship',
    relationTo: 'posts',
    admin: {
      condition: (_data, sibling) => sibling.type === 'post',
    },
  },
  {
    name: 'label',
    type: 'text',
    required: true,
    localized: true,
    admin: {
      condition: (_data, sibling) => sibling.type === 'external',
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_data, sibling) => sibling.type === 'external',
    },
  },
  {
    name: 'image',
    label: 'Image',
    type: 'relationship',
    relationTo: 'media',
    required: false,
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Ouvrir dans un nouvel onglet',
  },
]

const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Menu',
    plural: 'Menus',
  },
  admin: {
    group: 'Contenu',
    useAsTitle: 'menuId',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  fields: [
    {
      name: 'menuId',
      type: 'select',
      label: 'Position du menu',
      required: true,
      unique: true,
      options: [
        { label: 'Menu principal', value: 'main-menu' },
        { label: 'Menu secondaire', value: 'secondary-menu' },
        { label: 'Menu pied de page', value: 'footer-menu' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Liens du menu',
      fields: [
        ...linkFields(),
        {
          name: 'children',
          type: 'array',
          label: 'Sous-menus',
          fields: linkFields(),
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.menuId) data.menuId = uuidv4()
        return data
      },
    ],
  },
}

export default Navigation
