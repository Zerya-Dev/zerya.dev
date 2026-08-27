import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineOrganization } from 'nuxt-schema-org/schema'

const contentRoutes = [
  ['news', 'aktualnosci'],
  ['projects', 'projekty'],
].flatMap(([directory, route]) => readdirSync(resolve(import.meta.dirname, 'content', directory!))
  .filter(file => file.endsWith('.md'))
  .map(file => `/${route}/${file.slice(0, -3)}`))

export default defineNuxtConfig({
  extends: [
    '../../packages/shared',
  ],
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/seo',
  ],
  vite: {
    server: {
      allowedHosts: ['localhost', 'local.sanielia.dev'],
    },
  },
  css: ['~/assets/css/main.css'],
  icon: {
    clientBundle: {
      icons: [
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:arrow-up-right',
        'lucide:accessibility',
        'lucide:blocks',
        'lucide:building-2',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:chevron-up',
        'lucide:file-text',
        'lucide:handshake',
        'lucide:heart-handshake',
        'lucide:image',
        'lucide:mail',
        'lucide:menu',
        'lucide:map-pin',
        'lucide:megaphone',
        'lucide:message-square',
        'lucide:shield-check',
        'lucide:timer',
        'lucide:users',
        'lucide:wrench',
        'lucide:x',
      ],
    },
  },
  devServer: {
    port: 3001,
  },
  nitro: {
    devStorage: {
      cache: {
        driver: 'memory',
      },
    },
    serverAssets: [
      {
        baseName: 'foundation-content',
        dir: resolve(import.meta.dirname, 'content'),
      },
      {
        baseName: 'foundation-data',
        dir: resolve(import.meta.dirname, 'data'),
      },
    ],
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/o-nas',
        '/projekty',
        '/aktualnosci',
        '/galeria',
        '/wsparcie',
        '/kontakt',
        '/statut',
        '/polityka-prywatnosci',
        ...contentRoutes,
      ],
    },
  },
  // https://nuxtseo.com/docs/schema-org/getting-started/introduction
  schemaOrg: {
    identity: defineOrganization({
      name: 'Zerya Foundation',
      description: 'Zerya Foundation jest organizacją non-profit zajmującą się organizacją wydarzeń i inicjatyw edukacyjnych w zakresie IT i technologii w formie rywalizacji i praktyki.',
      url: 'https://foundation.zerya.dev',
      logo: '/img/logo.png',

      email: 'foundation@zerya.dev',
      foundingDate: '2026-07-29',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        'minValue': 10,
        'maxValue': 25,
      },

      legalAddress: {
        addressCountry: 'PL',
        addressLocality: 'Kraków',
        addressRegion: 'Województwo małopolskie',
        postalCode: '31-457',
        streetAddress: 'ul. Janusza Meissnera 4/78',
      },
      companyRegistration: {
        auditDate: '2026-07-29',
        certificationIdentification: '0001257372',
        certificationStatus: 'active',
        datePublished: '2026-07-29',
        issuedBy: 'SĄD REJONOWY DLA KRAKOWA-ŚRÓDMIEŚCIA W KRAKOWIE, XI WYDZIAŁ GOSPODARCZY KRAJOWEGO REJESTRU SĄDOWEGO',
      },

      sameAs: [
        'https://www.linkedin.com/company/zerya-foundation/',
      ],
    }),
  },
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      ],
    },
  },
  compatibilityDate: '2026-03-16',
  typescript: {
    typeCheck: true,
  },
  // https://nuxtseo.com/docs/site-config/guides/setting-site-config
  site: {
    url: 'https://foundation.zerya.dev',
    name: 'Zerya Foundation',
    description: 'Zerya Foundation jest organizacją non-profit zajmującą się organizacją wydarzeń i inicjatyw edukacyjnych w zakresie IT i technologii w formie rywalizacji i praktyki.',
    defaultLocale: 'pl',
  },
})
