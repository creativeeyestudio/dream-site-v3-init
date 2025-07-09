import { CollectionConfig, Field } from 'payload'
import crypto from 'crypto'

// DATAS
// ----------------------------------------------
const hotelData: Field = {
  name: 'hotelData',
  label: "Infos de l'hôtel",
  type: 'group',
  fields: [
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'settings',
      required: true,
    },
  ],
}

// THAIS PMS
// ----------------------------------------------
const ThaisPMS: Field = {
  name: 'thais',
  label: 'Thais PMS',
  type: 'group',
  fields: [
    {
      name: 'apiUrl',
      label: "Lien de l'API",
      type: 'text',
      admin: { placeholder: "URL d'API fournie par Thais" },
    },
    {
      name: 'username',
      label: "Nom d'utilisateur",
      type: 'text',
      defaultValue: undefined,
      admin: { placeholder: 'Identifiant fourni par Thais' },
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'text',
      admin: {
        placeholder: 'Mot de passe fourni par Thais',
        condition: (data) => !data?.thais?.passwordHash,
      },
    },
    {
      name: 'passwordHash',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'resetPassword',
      type: 'ui',
      admin: {
        condition: ({ thais }) => Boolean(thais?.passwordHash),
        components: {
          Field: {
            path: '/components/ResetPasswordButton',
            clientProps: {
              label: 'Changer mon mot de passe',
              fieldPath: 'thais.password',
              hashPath: 'thais.passwordHash',
            },
          },
        },
      },
    },
  ],
}

// SITEMINDER
// ----------------------------------------------
const SiteMinder: Field = {
  name: 'siteminder',
  label: 'SiteMinder',
  type: 'group',
  fields: [
    {
      name: 'apiUrl',
      label: "Lien de l'API",
      type: 'text',
      admin: { placeholder: "URL d'API fournie par SiteMinder" },
    },
    {
      name: 'password',
      label: 'API Key',
      type: 'text',
      admin: {
        placeholder: 'API Key fournie par SiteMinder',
        condition: (data) => !data?.siteminder?.passwordHash,
      },
    },
    {
      name: 'passwordHash',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'resetPassword',
      type: 'ui',
      admin: {
        condition: ({ siteminder }) => Boolean(siteminder?.passwordHash),
        components: {
          Field: {
            path: '/components/ResetPasswordButton',
            clientProps: {
              label: 'Changer mon API Token',
              fieldPath: 'siteminder.password',
              hashPath: 'siteminder.passwordHash',
            },
          },
        },
      },
    },
  ],
}

// ZENCHEF
// ----------------------------------------------
const ZenChef: Field = {
  name: 'zenchef',
  label: 'ZenChef',
  type: 'group',
  fields: [
    {
      name: 'widget',
      label: 'Lien vers le widget de moteur de recherche',
      type: 'text',
      admin: { placeholder: 'Lien du Widget fourni par ZenChef' },
    },
  ],
}

const ChrConnectConfig: CollectionConfig = {
  slug: 'chr-config',
  labels: {
    singular: 'CHR Connect',
    plural: 'CHR Connect',
  },
  admin: {
    group: 'Plugins',
  },
  fields: [hotelData, ThaisPMS, SiteMinder, ZenChef],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const hashPasswordFor = (group: any) => {
          if (group?.password) {
            return {
              ...group,
              passwordHash: encrypt(group.password),
              password: undefined,
            }
          }

          return {
            ...group,
            passwordHash: undefined,
            password: undefined,
          }
        }

        return {
          ...data,
          thais: hashPasswordFor(data.thais),
          siteminder: hashPasswordFor(data.siteminder),
        }
      },
    ],
  },
}

function encrypt(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export default ChrConnectConfig
