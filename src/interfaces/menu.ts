import PageContentProps from "./page"

export interface MenuItem {
    id: number
    title: string
    type: 'INTERNAL' | 'EXTERNAL'
    path: string
    externalPath: string
    order: number
    related: PageContentProps
    items?: MenuItem[]
    additionalFields: {
        external: boolean
    }
}