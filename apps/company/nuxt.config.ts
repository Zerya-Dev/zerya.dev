// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '../../packages/base',
  ],
  modules: [
    '@nustackjs/lint',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@compodium/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  content: {
    experimental: { nativeSqlite: true },
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },
  experimental: {
    componentIslands: true,
    typedPages: true,
    sharedPrerenderData: true,
  },
  compatibilityDate: '2026-10-14',

  future: {
    compatibilityVersion: 5,
  },

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
  linkChecker: {
    runOnBuild: false,
  },
  // https://nuxtseo.com/docs/schema-org/getting-started/introduction
  schemaOrg: {
    enabled: false,
  },
})
