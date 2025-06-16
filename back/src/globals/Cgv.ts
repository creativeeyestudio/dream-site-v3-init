import { GlobalConfig } from 'payload'

const Cgv: GlobalConfig = {
  slug: 'cgv',
  label: 'Conditions générales de vente (CGV)',
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  admin: {
    group: 'Infos juridiques',
  },
  fields: [
    {
      name: 'user_data',
      label: 'Identité du vendeur',
      type: 'group',
      fields: [
        {
          name: 'user_name',
          label: 'Raison sociale, forme juridique',
          type: 'text',
          required: true,
        },
        {
          name: 'user_adress',
          label: 'Adresse',
          type: 'textarea',
          required: true,
        },
        {
          name: 'user_email',
          label: 'E-Mail',
          type: 'email',
          required: true,
        },
        {
          name: 'user_siret',
          label: 'RCS / SIRET / N° TVA intracommunautaire',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'services_data',
      label: 'Descriptions des services proposés',
      type: 'array',
      fields: [
        {
          name: 'service',
          label: false,
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'payments_data',
      label: 'Moyens de paiement',
      type: 'group',
      fields: [
        {
          name: 'payment',
          label: 'Types de paiements',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'payment_item',
              label: false,
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'prepayment',
          label: 'Acompte ou prépaiement exigé',
          type: 'checkbox',
        },
        {
          name: 'payment_place',
          label: 'Paiement sur place possible',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'cancel_conditions',
      label: "Conditions d'annulation / modification",
      type: 'group',
      fields: [
        {
          name: 'cancel_delay',
          label: 'Délai d’annulation sans frais',
          type: 'text',
          required: true,
        },
        {
          name: 'cancel_fees',
          label: 'Frais d’annulation',
          type: 'text',
          required: true,
        },
        {
          name: 'special_cancel_conditions',
          label: 'Conditions particulières pour tarifs non remboursables',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
}

export default Cgv
