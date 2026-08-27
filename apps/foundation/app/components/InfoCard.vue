<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>

<template>
  <UPageCard
    :icon="icon"
    variant="naked"
    class="rounded-md bg-white"
    :ui="{
      container: 'flex flex-col lg:flex p-8 sm:p-8 md:p-10',
      leading: 'mb-6',
      leadingIcon: 'size-8 text-zerya-600',
      title: 'text-2xl font-extrabold tracking-tight text-inherit',
      description: 'mt-3 text-base leading-7 text-slate-500',
    }"
  >
    <template #title>
      <h3>{{ title }}</h3>
    </template>
    <template #description>
      <p>{{ description }}</p>
    </template>
  </UPageCard>
</template>
