import type { Block } from "payload";

const TextImage: Block = {
    slug: 'text-image',
    labels: {
        singular: 'text-image-block',
        plural: 'text-image-blocks',
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
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ]
}

export default TextImage;