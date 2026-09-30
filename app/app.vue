<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'pl' },
  title: 'Zerya.dev | Home',
  titleTemplate: '%s',
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
  <UApp>
    <main class="bg-ink">
      <HeroSection />
    </main>
  </UApp>
</template>
