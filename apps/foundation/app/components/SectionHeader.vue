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
  <UPageSection
    as="header"
    class="mb-10 max-w-180 md:mb-16"
    :ui="{ container: 'flex flex-col lg:flex px-0 sm:px-0 lg:px-0 py-0 sm:py-0 lg:py-0 gap-0 sm:gap-0' }"
  >
    <template #header>
      <h2 :id="titleId" class="mt-4 max-w-2xl text-4xl leading-tight font-extrabold tracking-tighter md:text-6xl">
        {{ title }}
      </h2>
      <p v-if="description" :class="dark ? 'text-slate-300' : 'text-slate-500'" class="mt-4 max-w-2xl text-base leading-6">
        {{ description }}
      </p>
    </template>
  </UPageSection>
</template>
