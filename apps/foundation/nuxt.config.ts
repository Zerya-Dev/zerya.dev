export default defineNuxtConfig({
  extends: [
    '../../packages/base',
  ],
  devServer: {
    port: 3001,
  },
  compatibilityDate: '2026-10-14',

  future: {
    compatibilityVersion: 5,
  },
  typescript: {
    typeCheck: true,
  },
})
