<script setup lang="ts">
import logoUrl from '#layers/shared/app/assets/logo.svg'

withDefaults(defineProps<{
  dark?: boolean
}>(), {
  dark: false,
})
</script>

<template>
  <span class="inline-flex" aria-label="Fundacja Zerya">
    <img :src="logoUrl" alt="" class="h-auto w-32 max-md:w-24" :class="{ 'brightness-0': dark }">
  </span>
</template>
