export interface LegalNotice {
    editeur: {
        identite: string
        capital: string
        coordonnees: {
            adresse: string
            email: string
            telephone: string
        }
    }
    concepteur: {
        nom: string
        site: string
    }
    hebergeur: {
        nom: string
        adresse: string
        site: string
    },
    other: {
        proprieteIntellectuelle: string
    }
}