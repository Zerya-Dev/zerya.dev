import { CONTACT_EMAIL, SITE_URL, SOCIAL_LINKS } from './shared/utils/site'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Keep Nitro 2's generated types outside node_modules, alongside the build.
  buildDir: '.nuxt',
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@compodium/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/turnstile',
  ],
  devtools: { enabled: true },
  site: {
    url: SITE_URL,
    name: 'Zerya',
    description: 'Zerya projektuje i buduje rozwiązania, które usuwają konkretny problem Twojej firmy. Porozmawiajmy o Twoim projekcie.',
    defaultLocale: 'pl',
  },
  app: {
    head: {
      meta: [{ name: 'theme-color', content: '#0a0a0a' }],
    },
  },
  css: ['~/assets/css/main.css'],
  // `global` exposes the fonts to the OG image renderer
  fonts: {
    families: [
      { name: 'Outfit', weights: [400, 500], global: true },
    ],
  },
  ui: {
    colorMode: false,
    experimental: {
      componentDetection: true,
    },
  },
  runtimeConfig: {
    resendApiKey: '',
    contact: {
      to: 'contact+{tag}@zerya.dev',
      from: 'Zerya Web <formularz@zerya.dev>',
      allowedHostnames: ['zerya.dev', 'www.zerya.dev'],
      // Exact socket IPs of proxies that overwrite X-Forwarded-For with the client's IP
      trustedProxyIPs: [] as string[],
    },
  },
  experimental: {
    componentIslands: true,
    typedPages: true,
    sharedPrerenderData: true,
  },
  compatibilityDate: '2026-03-16',

  nitro: {
    prerender: {
      routes: [
        '/',
      ],
    },
  },
  typescript: { typeCheck: true },

  // Module configuration

  // https://eslint.nuxt.com/
  eslint: {
    config: {
      standalone: false,
    },
  },
  sitemap: {
    zeroRuntime: true,
  },
  ogImage: {
    zeroRuntime: true,
    defaults: { height: 630 },
  },
  linkChecker: {
    runOnBuild: false,
  },
  // https://nuxtseo.com/docs/schema-org/getting-started/introduction
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Zerya',
      url: SITE_URL,
      email: CONTACT_EMAIL,
      founder: [
        { '@type': 'Person', 'name': 'Wiktor Popiołek', 'alternateName': 'wikipop' },
        { '@type': 'Person', 'name': 'Norbert Szeremet', 'alternateName': 'Norbiros' },
      ],
      sameAs: Object.values(SOCIAL_LINKS),
    },
  },
})
