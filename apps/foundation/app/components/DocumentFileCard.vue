<script setup lang="ts">
defineProps<{
  title: string
  description: string
  file: string
  pages: number
}>()
</script>

<template>
  <UCard class="rounded-md bg-white ring-slate-200" :ui="{ body: 'flex flex-col items-start gap-8 p-8 sm:p-8 md:flex-row md:items-center md:p-12' }">
    <UIcon name="i-lucide-file-text" class="size-10 shrink-0 text-zerya-600" aria-hidden="true" />
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-extrabold tracking-tight">
        {{ title }}
      </h2>
      <p class="mt-3 leading-7 text-slate-500">
        {{ description }}
      </p>
      <p class="mt-2 text-sm text-slate-400">
        PDF · {{ pages }} str.
      </p>
    </div>
    <UButton :to="file" external target="_blank" rel="noopener" color="primary" size="xl" trailing-icon="i-lucide-arrow-up-right" class="shrink-0 rounded-md px-6 font-bold text-white">
      Otwórz dokument
      <span class="sr-only">(PDF, otwiera się w nowej karcie)</span>
    </UButton>
  </UCard>
</template>
