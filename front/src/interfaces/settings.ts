import { ImageDataProps } from "./image"
import { Page } from "./page"

export interface SettingsProps {
    createdAt: string
    updatedAt: string
    title: string
    identityGroup: {
        logo: ImageDataProps
        favicon: ImageDataProps
        homepage: Page
    }
    maintenanceGroup: {
        maintenance: boolean
    }

} 