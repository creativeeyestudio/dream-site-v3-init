import { GlobalConfig } from 'payload'

const Confidentiality: GlobalConfig = {
  slug: 'confidentiality',
  label: 'Politique de confidentialité',
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  admin: {
    group: 'Infos juridiques',
  },
  fields: [
    // Identité
    {
      name: 'identity',
      label: 'Identité du responsable',
      type: 'group',
      fields: [
        {
          name: 'id_name',
          label: "Nom de l'entreprise",
          type: 'text',
          required: true,
        },
        {
          name: 'id_adress',
          label: 'Adresse',
          type: 'textarea',
          required: true,
        },
        {
          name: 'id_email',
          label: 'E-Mail',
          type: 'email',
          required: true,
        },
        {
          name: 'id_tel',
          label: 'Téléphone',
          type: 'text',
        },
      ],
    },
    {
      name: 'personal_data',
      label: 'Données personnelles collectées',
      type: 'group',
      fields: [
        {
          name: 'data_collected',
          label: 'Données collectées',
          type: 'array',
          fields: [
            {
              name: 'data_collect',
              label: false,
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default Confidentiality
