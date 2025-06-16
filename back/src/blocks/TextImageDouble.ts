import type { Block } from "payload";

const TextImageDouble: Block = {
    slug: 'text-double-image',
    labels: {
        singular: 'text-double-image-block',
        plural: 'text-double-image-blocks',
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
            name: 'image1',
            label: 'Image 1',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'image2',
            label: 'Image 2',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ]
}

export default TextImageDouble;