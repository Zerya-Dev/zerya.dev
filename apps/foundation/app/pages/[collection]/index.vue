<script setup lang="ts">
const collection = String(useRoute().params.collection)

definePageMeta({
  validate: route => isFoundationContentRoute(String(route.params.collection)),
})
</script>

<template>
  <ContentCollectionPage :route="collection as FoundationContentRoute" />
</template>
