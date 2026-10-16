<script setup lang="ts">
import { pl } from '@nuxt/ui/locale'
</script>

<template>
  <UApp :locale="pl">
    <NuxtPage />
    <ContactDialog />
  </UApp>
</template>
