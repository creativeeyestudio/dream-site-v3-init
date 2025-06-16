import { Block } from "payload";

const HtmlContent: Block = {
    slug: 'html-content',
    labels: {
        singular: 'html-content',
        plural: 'html-contents',
    },
    fields: [
        {
            name: 'content',
            label: 'Code HTML',
            type: 'code',
            required: true,
            admin: {
                language: 'html'
            }
        }
    ]
}

export default HtmlContent;