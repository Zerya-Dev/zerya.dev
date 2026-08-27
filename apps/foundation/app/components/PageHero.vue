<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description?: string
  dark?: boolean
}>()
</script>

<template>
  <section :class="dark ? 'bg-space text-white' : 'bg-white'" class="py-16 md:py-24">
    <div class="mx-auto flex flex-col w-full max-w-7xl gap-4 px-4 md:px-6 lg:gap-8">
      <div v-if="!$slots.label" class="flex justify-between items-center">
        <p :class="dark ? 'text-zerya-400' : 'text-zerya-700'" class="text-sm font-extrabold tracking-widest uppercase">
          {{ label }}
        </p>
        <div v-if="$slots.actions" class="flex flex-wrap gap-4">
          <slot name="actions" />
        </div>
      </div>
      <slot name="label" />
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-5xl font-extrabold tracking-tighter md:text-7xl flex-6">
          {{ title }}
        </h1>
        <p v-if="description" :class="dark ? 'text-slate-300' : 'text-slate-500'" class="text-md text-justify flex-4">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>
