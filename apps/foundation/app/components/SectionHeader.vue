<script setup lang="ts">
defineProps<{
  label?: string
  title: string
  description?: string
  titleId?: string
  dark?: boolean
}>()
</script>

<template>
  <header class="mb-10 max-w-180 md:mb-16">
    <h2 :id="titleId" class="mt-4 max-w-2xl text-4xl leading-tight font-extrabold tracking-tighter md:text-6xl">
      {{ title }}
    </h2>
    <p v-if="description" :class="dark ? 'text-slate-300' : 'text-slate-500'" class="mt-4 max-w-2xl text-base leading-6">
      {{ description }}
    </p>
  </header>
</template>
