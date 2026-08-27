<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} — Fundacja Zerya` : 'Fundacja Zerya — edukacja przez rywalizację',
  htmlAttrs: {
    lang: 'pl',
  },
  meta: [
    { name: 'theme-color', content: '#8f27c3' },
  ],
})

useSeoMeta({
  ogType: 'website',
})
</script>

<template>
  <UApp>
    <FoundationHeader />
    <NuxtPage />
    <FoundationFooter />
  </UApp>
</template>
