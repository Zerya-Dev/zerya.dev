<script setup lang="ts">
const route = useRoute()
const collection = String(route.params.collection)
const slug = String(route.params.slug)

definePageMeta({
  validate: route => isContentRoute(String(route.params.collection)),
})
</script>

<template>
  <ContentDetailPage :route="collection as ContentRoute" :slug="slug" />
</template>
