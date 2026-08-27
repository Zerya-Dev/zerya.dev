export default defineNuxtConfig({
  extends: [
    '../../packages/shared',
  ],
  modules: [
    '@nuxt/ui',
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
        'lucide:map-pin',
        'lucide:megaphone',
        'lucide:message-square',
        'lucide:shield-check',
        'lucide:timer',
        'lucide:users',
        'lucide:wrench',
      ],
    },
  },
  devServer: {
    port: 3001,
  },
  compatibilityDate: '2026-03-16',
  typescript: {
    typeCheck: true,
  },
})
