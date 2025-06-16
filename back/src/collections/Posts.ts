import type { CollectionConfig } from 'payload'
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // ou gère selon ton besoin
  },
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        condition: (data) => data.config?.published === '2',
      },
    },
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            readOnly: true,
          },
          hooks: {
            beforeChange: [
              ({ req, value }) => {
                if (value) return value
                if (req.user) return req.user.id
                return value
              },
            ],
          },
        },
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'À relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
        },
      ],
    },
  ],

  hooks: {
    afterRead: [
      async ({ doc }) => {
        // Convertir le champ richText en HTML dans un champ `html`
        if (doc?.content) {
          doc.html = convertRichTextToHTML(doc.content)
        }
        return doc
      },
    ],
  },
}

export default Posts
