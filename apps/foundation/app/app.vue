<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} — Fundacja Zerya` : 'Fundacja Zerya — edukacja przez rywalizację',
  htmlAttrs: {
    lang: 'pl',
  },
  meta: [
    { name: 'theme-color', content: '#0f1720' },
  ],
})

useSeoMeta({
  ogType: 'website',
})
</script>

<template>
  <UApp>
    <a href="#main-content" class="sr-only z-100 rounded-sm bg-white p-4 font-bold text-space focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
      Przejdź do treści
    </a>
    <FoundationHeader />
    <NuxtPage />
    <FoundationFooter />
  </UApp>
</template>
