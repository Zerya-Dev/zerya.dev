export default defineNuxtConfig({
  extends: [
    '../../packages/shared',
  ],
  devServer: {
    port: 3001,
  },
  compatibilityDate: '2026-03-16',
  typescript: {
    typeCheck: true,
  },
})
