<script setup lang="ts">
import { pl } from '@nuxt/ui/locale'

useHead({
  htmlAttrs: { lang: 'pl' },
  title: 'Zerya.dev',
  titleTemplate: null,
  meta: [
    { name: 'description', content: 'Zerya tworzy własne produkty cyfrowe i oprogramowanie dla firm.' },
    { name: 'theme-color', content: '#05080a' },
  ],
  link: [
    { rel: 'preload', as: 'image', href: '/img/aurora-loop.webp', media: '(prefers-reduced-motion: no-preference)' },
  ],
})
</script>

<template>
  <UApp :locale="pl">
    <main>
      <HeroSection />
    </main>
  </UApp>
</template>
