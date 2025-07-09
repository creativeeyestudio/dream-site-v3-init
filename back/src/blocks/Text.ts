import type { Block } from 'payload'

const Text: Block = {
  slug: 'text',
  labels: {
    singular: 'text-block',
    plural: 'text-blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      required: true,
      hidden: false,
    },
  ],
}

export default Text
