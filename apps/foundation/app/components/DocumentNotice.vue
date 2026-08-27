<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <UAlert
    :icon="icon"
    variant="soft"
    class="items-start gap-4 rounded-md bg-mint p-6 text-space"
    :ui="{
      icon: 'size-8 shrink-0 text-zerya-700',
      title: 'text-xl font-extrabold',
      description: 'mt-2 text-base leading-7 text-slate-600 opacity-100',
    }"
  >
    <template #title>
      <h2>{{ title }}</h2>
    </template>
    <template #description>
      <p>{{ description }}</p>
    </template>
  </UAlert>
</template>
