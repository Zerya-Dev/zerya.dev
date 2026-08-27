<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex items-start gap-4 rounded-md bg-mint p-6">
    <UIcon :name="icon" class="size-8 shrink-0 text-zerya-700" aria-hidden="true" />
    <div>
      <h2 class="text-xl font-extrabold">
        {{ title }}
      </h2>
      <p class="mt-2 leading-7 text-slate-600">
        {{ description }}
      </p>
    </div>
  </div>
</template>
