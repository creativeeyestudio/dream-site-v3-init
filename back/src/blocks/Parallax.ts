import { Block } from "payload";

const Parallax: Block = {
    slug: 'parallax',
    labels: {
        singular: 'parallax',
        plural: 'parallaxes'
    },
    fields: [
        {
            name: 'parallax_image',
            label: 'Image du Parallax',
            type: 'upload',
            relationTo: 'media',
            required: true, 
        },
        {
            name: 'parallax_speed',
            label: 'Vitesse',
            type: 'number',
            required: true,
            defaultValue: 1.5
        }
    ]
}

export default Parallax