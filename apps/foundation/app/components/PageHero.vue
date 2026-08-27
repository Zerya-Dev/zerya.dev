<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description?: string
  dark?: boolean
}>()
</script>

<template>
  <UPageHero
    as="section"
    :class="dark ? 'bg-space text-white' : 'bg-white'"
    :ui="{
      container: 'flex flex-col lg:flex max-w-7xl px-4 sm:px-4 md:px-6 lg:px-6 py-16 sm:py-16 md:py-24 lg:py-24 gap-0 sm:gap-0',
      wrapper: 'w-full text-left',
      header: 'flex flex-col gap-4 lg:gap-8',
    }"
  >
    <template #header>
      <div v-if="!$slots.label" class="flex flex-wrap justify-between items-center gap-4">
        <p :class="dark ? 'text-zerya-400' : 'text-zerya-700'" class="text-sm font-extrabold tracking-widest uppercase">
          {{ label }}
        </p>
        <div v-if="$slots.actions" class="flex flex-wrap gap-4">
          <slot name="actions" />
        </div>
      </div>
      <slot name="label" />
      <div class="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <h1 class="min-w-0 text-5xl font-extrabold tracking-tighter md:text-7xl md:flex-6">
          {{ title }}
        </h1>
        <p v-if="description" :class="dark ? 'text-slate-300' : 'text-slate-500'" class="min-w-0 text-md text-justify md:flex-4">
          {{ description }}
        </p>
      </div>
    </template>
  </UPageHero>
</template>
