export interface AccessSituation {
    data: {
        id: number
        phone: string
        mail: string
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        adress: string
        postal_code: string
        city: string
        map: {
            lat: number
            lon: number
        }
    }
}