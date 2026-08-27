<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} | Fundacja Zerya` : 'Fundacja Zerya',
  htmlAttrs: {
    lang: 'pl',
  },
  meta: [
    { name: 'theme-color', content: '#8f27c3' },
  ],
})

useSchemaOrg([
  defineWebSite({
    name: 'Zerya Foundation',
    alternateName: ['Fundacja Zerya', 'Zerya'],
    inLanguage: 'pl-PL',
  }),
])

useSeoMeta({
  ogType: 'website',
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
