import type { CollectionConfig } from 'payload'
import Text from '@/blocks/Text'
import TextIntro from '@/blocks/TextIntro'
import HtmlContent from '@/blocks/HtmlContent'
import Heroscreen from '@/blocks/Heroscreen'
import Parallax from '@/blocks/Parallax'
import TextDoubleImage from '@/blocks/TextImageDouble'
import TextImage from '@/blocks/TextImage'
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'

async function enrichLayoutWithHTML(layout = []) {
  return layout.map((block) => {
    // Supposons que les blocs avec un champ "content" de type richText soient les seuls à traiter
    if (block.content) {
      return {
        ...block,
        html: convertRichTextToHTML(block.content),
      }
    }
    return block
  })
}

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenu',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  fields: [
    // Titre
    {
      name: 'title',
      label: 'Titre de la page',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'URL',
      type: 'text',
      required: true,
      unique: true,
    },

    // Contenu
    {
      name: 'content',
      label: 'Contenu de la page',
      type: 'group',
      fields: [
        {
          name: 'layout',
          label: 'Blocks de la page',
          type: 'blocks',
          blocks: [Text, TextIntro, TextImage, TextDoubleImage, Parallax, HtmlContent, Heroscreen],
          required: false,
          localized: true,
        },
      ],
    },

    // Publication et Homepage
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'A relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
        },
        {
          name: 'homepage',
          type: 'checkbox',
          label: "Page d'accueil",
          defaultValue: false,
          unique: true,
        },
      ],
    },
  ],

  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc?.content?.layout) {
          doc.content.layout = await enrichLayoutWithHTML(doc.content.layout)
        }
        return doc
      },
    ],
  },
}

export default Pages
