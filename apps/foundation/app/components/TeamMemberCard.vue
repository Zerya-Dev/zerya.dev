<script setup lang="ts">
defineProps<{
  name: string
  role: string
  description?: string
}>()
</script>

<template>
  <UCard class="group overflow-hidden rounded-md bg-canvas" :ui="{ body: 'p-0 sm:p-0' }">
    <div class="aspect-4/3 overflow-hidden">
      <ImagePlaceholder :label="`Portret — ${name}`" tone="mint" class="transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div class="p-6 md:p-8">
      <p class="text-xs font-extrabold tracking-widest text-zerya-700 uppercase">
        {{ role }}
      </p>
      <h3 class="mt-2 text-xl font-bold tracking-tight">
        {{ name }}
      </h3>
      <p v-if="description" class="mt-3 text-sm leading-6 text-slate-500">
        {{ description }}
      </p>
    </div>
  </UCard>
</template>
