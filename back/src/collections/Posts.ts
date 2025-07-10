import type { CollectionConfig } from 'payload'
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'
import { accessPosts } from '@/access/postsAccess'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
  },
  access: accessPosts,
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du post',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'URL du post',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      label: 'Introduction',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'coverImage',
      label: 'Image du post',
      type: 'upload',
      relationTo: 'media',
    },
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
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          defaultValue: '0',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'À relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
          access: {
            create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
            read: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
            update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
          },
        },
        {
          name: 'createdBy',
          label: 'Auteur',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            hidden: true,
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
      ],
    },
  ],

  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        // Convertir le champ richText en HTML dans un champ `html`
        if (doc?.content) {
          doc.html = convertRichTextToHTML(doc.content)
        }
        // Marque si l'utilisateur est propriétaire de l'article
        if (req?.user) {
          doc.isOwner =
            typeof doc?.config?.createdBy?.equals === 'function'
              ? doc.config.createdBy.equals(req.user.id)
              : doc.config?.createdBy === req.user.id
        }
        return doc
      },
    ],
  },
}

export default Posts
