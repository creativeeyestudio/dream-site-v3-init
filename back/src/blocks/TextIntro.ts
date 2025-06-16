import type { Block } from "payload";

const TextIntro: Block = {
    slug: 'text-intro',
    labels: {
        singular: 'text-intro-block',
        plural: 'text-intro-blocks',
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
    ]
}

export default TextIntro;