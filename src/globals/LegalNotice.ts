import { GlobalConfig } from 'payload'

const LegalNotice: GlobalConfig = {
  slug: 'legal-notice',
  label: 'Mentions légales',
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  admin: {
    group: 'Infos juridiques',
  },
  fields: [
    {
      name: 'editeur',
      label: 'Éditeur du site',
      type: 'group',
      fields: [
        {
          name: 'identite',
          label: 'Identité (raison sociale, forme juridique)',
          type: 'text',
          required: true,
        },
        {
          name: 'capital',
          label: 'Capital social',
          type: 'text',
        },
        {
          name: 'coordonnees',
          label: 'Coordonnées',
          type: 'group',
          fields: [
            {
              name: 'adresse',
              label: 'Adresse',
              type: 'textarea',
            },
            {
              name: 'email',
              label: 'Email',
              type: 'email',
            },
            {
              name: 'telephone',
              label: 'Téléphone',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'concepteur',
      label: 'Conception / Réalisation',
      type: 'group',
      fields: [
        {
          name: 'nom',
          label: 'Nom ou société',
          type: 'text',
          required: true,
        },
        {
          name: 'site',
          label: 'Site web',
          type: 'text',
        },
      ],
    },
    {
      name: 'hebergeur',
      label: 'Hébergeur',
      type: 'group',
      fields: [
        {
          name: 'nom',
          label: "Nom de l'hébergeur",
          type: 'text',
          required: true,
        },
        {
          name: 'adresse',
          label: 'Adresse',
          type: 'textarea',
        },
        {
          name: 'site',
          label: 'Site web',
          type: 'text',
        },
      ],
    },
    {
      name: 'other',
      label: 'Autres informations',
      type: 'group',
      fields: [
        {
          name: 'proprieteIntellectuelle',
          label: 'Mentions relatives à la propriété intellectuelle',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
}

export default LegalNotice
