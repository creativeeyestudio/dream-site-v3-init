// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { fr } from '@payloadcms/translations/languages/fr'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import Galleries from './collections/Galleries'
import Navigation from './collections/Navigation'
import Posts from './collections/Posts'

import { seoPlugin } from '@payloadcms/plugin-seo'
import LegalNotice from './globals/LegalNotice'
import Confidentiality from './globals/Confidentiality'
import Cgv from './globals/Cgv'
import Settings from '@/collections/Settings'
import ChrConnectConfig from './plugins/ChrConnectConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts, Galleries, Navigation, Settings, ChrConnectConfig],
  globals: [LegalNotice, Confidentiality, Cgv],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
    }),
  ],
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { en, fr, es },
  },
  localization: {
    locales: ['fr', 'en', 'es'], // required
    defaultLocale: 'fr', // required
  },
})
