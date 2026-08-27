<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>

<template>
  <div class="rounded-md bg-white p-8 md:p-10">
    <UIcon :name="icon" class="size-8 text-zerya-600" aria-hidden="true" />
    <h3 class="mt-6 text-2xl font-extrabold tracking-tight">
      {{ title }}
    </h3>
    <p class="mt-3 leading-7 text-slate-500">
      {{ description }}
    </p>
  </div>
</template>
